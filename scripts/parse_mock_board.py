"""
Parse the LET Mock Board .docx files into structured JSON.

Output goes to private/mock-board/{gened,profed}.json (git-ignored — the paid
questions must NEVER be committed to the PUBLIC repo). A separate seed script
pushes this JSON into Supabase, from which the gated API serves it.

Run:  python scripts/parse_mock_board.py
"""
import json, re, sys, os
import docx

sys.stdout.reconfigure(encoding="utf-8")

SOURCES = {
    "mock-gened": {
        "file": "Articles/LET_GenEd_MockBoard_Set1.docx",
        "title": "LET Mock Board Exam — General Education (Set 1)",
    },
    "mock-profed": {
        "file": "Articles/LET_ProfEd_MockBoard_Set1.docx",
        "title": "LET Mock Board Exam — Professional Education (Set 1)",
    },
}

OUT_DIR = "private/mock-board"

PART_RE = re.compile(r"^PART\s+[IVXLC]+\s*[—\-]\s*(.+)$", re.I)
Q_RE = re.compile(r"^(\d+)\.\s+(.*)$")
OPT_RE = re.compile(r"^([A-D])\.\s+(.*)$")
CORRECT_RE = re.compile(r"^Correct Answer:\s*([A-D])\.\s*(.*)$", re.I)
RATIONALE_RE = re.compile(r"^Rationale:\s*(.*)$", re.I)
GRID_RE = re.compile(r"(\d+)\.\s*([A-D])")

# Option text patterns that break when options are shuffled -> lock their order.
LOCK_PATTERNS = [
    "all of the above", "none of the above", "all of these", "none of these",
    "both a and b", "both b and c", "both a and c", "a and b only",
    "b and c only", "a and c only", "both of the above", "all of the choices",
    "none of the choices",
]

SKIP_EXACT = {
    "lisensyaprep.com",
    "© lisensyaprep.com  •  for personal review only.",
}

def clean(s: str) -> str:
    return re.sub(r"\s+", " ", s).strip()

def is_noise(s: str) -> bool:
    low = s.strip().lower()
    if low in SKIP_EXACT:
        return True
    if low.startswith("© lisensyaprep") or low.startswith("mock board examination"):
        return True
    return False

def parse_file(path):
    paras = [p.text for p in docx.Document(path).paragraphs]

    # Split: exam region (before answer key) / rationale region (after DETAILED RATIONALES)
    ak_idx = next(i for i, t in enumerate(paras)
                  if t.strip().upper() == "ANSWER KEY WITH RATIONALES")
    det_idx = next(i for i, t in enumerate(paras)
                   if t.strip().upper() == "DETAILED RATIONALES")

    exam = paras[:ak_idx]
    grid_region = paras[ak_idx:det_idx]
    detail = paras[det_idx:]

    # ---- Parse questions (stem + options + subject) ----
    questions = {}   # num -> dict
    subject = None
    cur = None
    field = None     # 'stem' | 'opt'
    cur_opt = None
    for raw in exam:
        t = raw.strip()
        if not t or is_noise(t):
            continue
        m = PART_RE.match(t)
        if m:
            subject = clean(m.group(1)); continue
        # Ignore everything before the first PART header (e.g. the numbered
        # INSTRUCTIONS block) — real questions only appear under a subject.
        if subject is None:
            continue
        mo = OPT_RE.match(t)
        if mo and cur is not None:
            letter, otext = mo.group(1), clean(mo.group(2))
            cur["options"][letter] = otext
            field, cur_opt = "opt", letter
            continue
        mq = Q_RE.match(t)
        if mq and (not cur or len(cur["options"]) >= 1 or field == "opt"):
            # start a new question only when the previous one has begun collecting options
            num = int(mq.group(1))
            cur = {"num": num, "subject": subject, "stem": clean(mq.group(2)),
                   "options": {}}
            questions[num] = cur
            field, cur_opt = "stem", None
            continue
        # continuation line
        if cur is not None:
            if field == "opt" and cur_opt:
                cur["options"][cur_opt] = clean(cur["options"][cur_opt] + " " + t)
            elif field == "stem":
                cur["stem"] = clean(cur["stem"] + " " + t)

    # ---- Parse answers + rationales ----
    answers = {}     # num -> {answer, rationale}
    cur = None
    mode = None
    for raw in detail:
        t = raw.strip()
        if not t or is_noise(t):
            continue
        if PART_RE.match(t):
            continue
        mc = CORRECT_RE.match(t)
        if mc and cur is not None:
            cur["answer"] = mc.group(1).upper()
            mode = None
            continue
        mr = RATIONALE_RE.match(t)
        if mr and cur is not None:
            cur["rationale"] = clean(mr.group(1)); mode = "rat"
            continue
        mq = Q_RE.match(t)
        if mq:
            num = int(mq.group(1))
            cur = answers.setdefault(num, {"answer": None, "rationale": ""})
            mode = None
            continue
        if mode == "rat" and cur is not None:
            cur["rationale"] = clean(cur["rationale"] + " " + t)

    # ---- Quick answer grid (validation) ----
    grid = {}
    for line in grid_region:
        for num, letter in GRID_RE.findall(line):
            grid[int(num)] = letter.upper()

    return questions, answers, grid

def main():
    os.makedirs(OUT_DIR, exist_ok=True)
    problems = []
    for product, meta in SOURCES.items():
        questions, answers, grid = parse_file(meta["file"])
        items = []
        for num in sorted(questions):
            q = questions[num]
            a = answers.get(num, {})
            opts = q["options"]
            ans = a.get("answer")
            rat = a.get("rationale", "").strip()
            lock = any(p in v.lower() for v in opts.values() for p in LOCK_PATTERNS)

            # validations
            if sorted(opts) != ["A", "B", "C", "D"]:
                problems.append(f"{product} Q{num}: options != A-D ({sorted(opts)})")
            if ans not in ("A", "B", "C", "D"):
                problems.append(f"{product} Q{num}: missing/invalid answer ({ans})")
            elif ans not in opts:
                problems.append(f"{product} Q{num}: answer {ans} has no option")
            if not rat:
                problems.append(f"{product} Q{num}: missing rationale")
            if num in grid and grid[num] != ans:
                problems.append(f"{product} Q{num}: grid={grid[num]} != detailed={ans}")

            items.append({
                "id": num,
                "product": product,
                "subject": q["subject"],
                "stem": q["stem"],
                "options": opts,
                "answer": ans,
                "rationale": rat,
                "lockOptions": lock,
            })

        out = {"product": product, "title": meta["title"], "count": len(items),
               "items": items}
        with open(f"{OUT_DIR}/{product.replace('mock-','')}.json", "w",
                  encoding="utf-8") as f:
            json.dump(out, f, ensure_ascii=False, indent=2)

        subj_counts = {}
        for it in items:
            subj_counts[it["subject"]] = subj_counts.get(it["subject"], 0) + 1
        locks = [it["id"] for it in items if it["lockOptions"]]
        print(f"\n=== {product} — {len(items)} items ===")
        for s, c in subj_counts.items():
            print(f"   {c:>3}  {s}")
        print(f"   lockOptions items ({len(locks)}): {locks}")

    print("\n" + "=" * 60)
    if problems:
        print(f"⚠️  {len(problems)} VALIDATION PROBLEMS:")
        for p in problems:
            print("   -", p)
    else:
        print("✅ All validations passed (counts, options, answers, rationales, grid match).")

if __name__ == "__main__":
    main()
