"""
Parse the PNLE Mock Board .docx into structured JSON (one file per module).

The PNLE mock is a full 500-item simulation = 5 Nursing Practice tests of 100
items each (mirrors the PRC Board of Nursing structure). Question numbers RESTART
at 1 in every module, so we key per (module, item_no).

Output goes to private/mock-board/pnle-np{1..5}.json (git-ignored — paid content
must NEVER be committed to the PUBLIC repo). scripts/seed_pnle_mock.mjs pushes it
into Supabase, from which the gated API serves it.

Run:  python scripts/parse_pnle_mock.py
"""
import json, re, os, sys
import docx

sys.stdout.reconfigure(encoding="utf-8")

SOURCE = "Articles/PNLE_MockBoard_Set1.docx"
OUT_DIR = "private/mock-board"

ROMAN = {"I": 1, "II": 2, "III": 3, "IV": 4, "V": 5}

# Each module's product + display subject (used for the 5-subject general average).
MODULES = {
    1: {"product": "mock-pnle-np1", "subject": "Nursing Practice I"},
    2: {"product": "mock-pnle-np2", "subject": "Nursing Practice II"},
    3: {"product": "mock-pnle-np3", "subject": "Nursing Practice III"},
    4: {"product": "mock-pnle-np4", "subject": "Nursing Practice IV"},
    5: {"product": "mock-pnle-np5", "subject": "Nursing Practice V"},
}

# Headers are "NURSING PRACTICE <ROMAN> — <suffix>" (em-dash separator). The
# content headers carry topic lists; the answer-key subsections end in
# "Quick Answer Grid" / "Rationales". Longest roman first so III/IV don't
# get shadowed by I/V.
HEADER_RE = re.compile(r"^NURSING PRACTICE\s+(V|IV|III|II|I)\b(?!.*(?:Quick Answer Grid|Rationales))", re.I)
GRID_HEAD_RE = re.compile(r"^NURSING PRACTICE\s+(V|IV|III|II|I)\b.*Quick Answer Grid", re.I)
RAT_HEAD_RE = re.compile(r"^NURSING PRACTICE\s+(V|IV|III|II|I)\b.*Rationales", re.I)

Q_RE = re.compile(r"^(\d+)\.\s+(.*)$")
OPT_RE = re.compile(r"^([A-D])\.\s+(.*)$")
ANSWER_RE = re.compile(r"^Answer:\s*([A-D])\.\s*(.*)$", re.I)
RATIONALE_RE = re.compile(r"^Rationale:\s*(.*)$", re.I)
GRID_RE = re.compile(r"(\d+)\.\s*([A-D])")

LOCK_PATTERNS = [
    "all of the above", "none of the above", "all of these", "none of these",
    "both a and b", "both b and c", "both a and c", "a and b only",
    "b and c only", "a and c only", "both of the above", "all of the choices",
    "none of the choices",
]


def clean(s):
    return re.sub(r"\s+", " ", s).strip()


def is_noise(s):
    low = s.strip().lower()
    if low.startswith("© lisensyaprep") or low.startswith("lisensyaprep.com"):
        return True
    if low.startswith("philippine nurse licensure") or low.startswith("full 500-item"):
        return True
    return False


def parse_questions(paras):
    """Return {module_no: {num: {stem, options}}} from the exam region."""
    out = {}
    module = None
    cur = None
    field = None
    cur_opt = None
    for raw in paras:
        t = raw.strip()
        if not t or is_noise(t):
            continue
        mh = HEADER_RE.match(t)
        if mh:
            module = ROMAN[mh.group(1).upper()]
            out.setdefault(module, {})
            cur, field, cur_opt = None, None, None
            continue
        if module is None:
            continue  # skip INSTRUCTIONS before first module header
        mo = OPT_RE.match(t)
        if mo and cur is not None:
            letter, otext = mo.group(1), clean(mo.group(2))
            cur["options"][letter] = otext
            field, cur_opt = "opt", letter
            continue
        mq = Q_RE.match(t)
        if mq and (not cur or len(cur["options"]) >= 1 or field == "opt"):
            num = int(mq.group(1))
            cur = {"stem": clean(mq.group(2)), "options": {}}
            out[module][num] = cur
            field, cur_opt = "stem", None
            continue
        if cur is not None:
            if field == "opt" and cur_opt:
                cur["options"][cur_opt] = clean(cur["options"][cur_opt] + " " + t)
            elif field == "stem":
                cur["stem"] = clean(cur["stem"] + " " + t)
    return out


def parse_grids(paras):
    """Return {module_no: {num: letter}} from the Quick Answer Grid subsections."""
    out = {}
    module = None
    for raw in paras:
        t = raw.strip()
        if not t:
            continue
        mg = GRID_HEAD_RE.match(t)
        if mg:
            module = ROMAN[mg.group(1).upper()]
            out.setdefault(module, {})
            continue
        if RAT_HEAD_RE.match(t) or HEADER_RE.match(t):
            module = None
            continue
        if module is not None:
            for num, letter in GRID_RE.findall(t):
                out[module][int(num)] = letter.upper()
    return out


def parse_rationales(paras):
    """Return {module_no: {num: {answer, rationale}}} from the Rationales subsections."""
    out = {}
    module = None
    cur = None
    mode = None
    for raw in paras:
        t = raw.strip()
        if not t or is_noise(t):
            continue
        mr = RAT_HEAD_RE.match(t)
        if mr:
            module = ROMAN[mr.group(1).upper()]
            out.setdefault(module, {})
            cur, mode = None, None
            continue
        if GRID_HEAD_RE.match(t):
            module = None
            continue
        if module is None:
            continue
        ma = ANSWER_RE.match(t)
        if ma and cur is not None:
            cur["answer"] = ma.group(1).upper()
            mode = None
            continue
        mrat = RATIONALE_RE.match(t)
        if mrat and cur is not None:
            cur["rationale"] = clean(mrat.group(1))
            mode = "rat"
            continue
        mq = Q_RE.match(t)
        if mq:
            num = int(mq.group(1))
            cur = out[module].setdefault(num, {"answer": None, "rationale": ""})
            mode = None
            continue
        if mode == "rat" and cur is not None:
            cur["rationale"] = clean(cur["rationale"] + " " + t)
    return out


def main():
    os.makedirs(OUT_DIR, exist_ok=True)
    paras = [p.text for p in docx.Document(SOURCE).paragraphs]

    ak_idx = next(i for i, t in enumerate(paras)
                  if t.strip().upper() == "ANSWER KEY WITH RATIONALES")
    exam_region = paras[:ak_idx]
    key_region = paras[ak_idx:]

    questions = parse_questions(exam_region)
    grids = parse_grids(key_region)
    rationales = parse_rationales(key_region)

    problems = []
    for module in sorted(MODULES):
        meta = MODULES[module]
        qmap = questions.get(module, {})
        gmap = grids.get(module, {})
        rmap = rationales.get(module, {})
        items = []
        for num in sorted(qmap):
            q = qmap[num]
            opts = q["options"]
            r = rmap.get(num, {})
            ans = r.get("answer") or gmap.get(num)
            rat = (r.get("rationale") or "").strip()
            lock = any(p in v.lower() for v in opts.values() for p in LOCK_PATTERNS)

            if sorted(opts) != ["A", "B", "C", "D"]:
                problems.append(f"{meta['product']} Q{num}: options != A-D ({sorted(opts)})")
            if ans not in ("A", "B", "C", "D"):
                problems.append(f"{meta['product']} Q{num}: missing/invalid answer ({ans})")
            elif ans not in opts:
                problems.append(f"{meta['product']} Q{num}: answer {ans} has no option")
            if not rat:
                problems.append(f"{meta['product']} Q{num}: missing rationale")
            if num in gmap and r.get("answer") and gmap[num] != r["answer"]:
                problems.append(f"{meta['product']} Q{num}: grid={gmap[num]} != answer-line={r['answer']}")

            items.append({
                "id": num,
                "product": meta["product"],
                "subject": meta["subject"],
                "stem": q["stem"],
                "options": opts,
                "answer": ans,
                "rationale": rat,
                "lockOptions": lock,
            })

        if len(items) != 100:
            problems.append(f"{meta['product']}: expected 100 items, got {len(items)}")

        out = {"product": meta["product"], "title": f"PNLE Mock Board — {meta['subject']}",
               "count": len(items), "items": items}
        with open(f"{OUT_DIR}/{meta['product'].replace('mock-', '')}.json", "w",
                  encoding="utf-8") as f:
            json.dump(out, f, ensure_ascii=False, indent=2)

        locks = [it["id"] for it in items if it["lockOptions"]]
        print(f"=== {meta['product']} — {len(items)} items  (lockOptions: {locks}) ===")

    print("\n" + "=" * 60)
    if problems:
        print(f"⚠️  {len(problems)} VALIDATION PROBLEMS:")
        for p in problems:
            print("   -", p)
    else:
        print("✅ All validations passed (5×100 items, options, answers, rationales, grid match).")


if __name__ == "__main__":
    main()
