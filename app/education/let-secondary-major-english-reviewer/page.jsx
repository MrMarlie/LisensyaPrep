import Link from 'next/link';
import Image from 'next/image';
import Script from 'next/script';
import AdPlaceholder from '@/components/ui/AdPlaceholder';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'LET Secondary Major English Reviewer 2026 Philippines (Complete Guide)',
  description:
    'Taking the LET for Secondary English? This reviewer covers literature, grammar, communication, language acquisition theories, and English teaching methods tested in the LET major subject.',
  path: '/education/let-secondary-major-english-reviewer',
  image: '/images/articles/hero-let-secondary-english.jpg',
});

const SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'LET Secondary Major English Reviewer 2026 Philippines',
  description:
    'Complete LET Secondary Major English reviewer covering language acquisition theories, literary genres, grammar and linguistics, approaches to teaching literature, and English teaching methods.',
  image: 'https://lisensyaprep.com/images/articles/hero-let-secondary-english.jpg',
  author: { '@type': 'Organization', name: 'LisensyaPrep Team', url: 'https://lisensyaprep.com/about' },
  publisher: {
    '@type': 'Organization',
    name: 'LisensyaPrep',
    logo: { '@type': 'ImageObject', url: 'https://lisensyaprep.com/images/logo.png' },
  },
  datePublished: '2026-04-25',
  dateModified: '2026-04-25',
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': 'https://lisensyaprep.com/education/let-secondary-major-english-reviewer',
  },
};

const RELATED_ARTICLES = [
  { text: 'How to Pass the LET on Your First Take', href: '/education/how-to-pass-let-first-take' },
  { text: 'Professional Education Reviewer LET 2026', href: '/education/professional-education-reviewer' },
  { text: 'General Education Reviewer LET 2026', href: '/education/general-education-reviewer' },
  { text: 'LET Secondary Major Math Reviewer 2026', href: '/education/let-secondary-major-math-reviewer' },
  { text: 'PRC Board Exam Schedule 2026', href: '/blog/prc-board-exam-schedule-2026' },
];

function formatInline(text) {
  let result = text
    .replace(
      /\[([^\]]+)\]\((https?:\/\/[^)]+|\/[^)]*)\)/g,
      (_, t, url) =>
        `<a href="${url}"${url.startsWith('http') ? ' target="_blank" rel="noopener noreferrer"' : ''} class="text-yellow-400 hover:text-yellow-300 underline underline-offset-2">${t}</a>`
    )
    .replace(/\*\*(.+?)\*\*/g, '<strong class="text-white font-semibold">$1</strong>')
    .replace(/\*([^*]+)\*/g, '<em class="text-gray-400 italic">$1</em>')
    .replace(/`(.+?)`/g, '<code class="bg-white/10 px-1 rounded text-yellow-300 text-xs">$1</code>');
  return result.replace(
    /(?<![">])\b((?:https?:\/\/)?(?:www\.)?[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*\.(?:gov\.ph|com\.ph|edu\.ph|org\.ph|com|net|org|ph)(?:\/[^\s<>"']*)?)\b/g,
    (url) => {
      const href = /^https?:\/\//.test(url) ? url : `https://${url}`;
      return `<a href="${href}" target="_blank" rel="noopener noreferrer" class="text-yellow-400 hover:text-yellow-300 underline underline-offset-2">${url}</a>`;
    }
  );
}

function renderContent(content) {
  const lines = content.trim().split('\n');
  const elements = [];
  let key = 0;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.startsWith('## ')) {
      elements.push(<h2 key={key++} className="text-2xl font-extrabold text-white mt-8 mb-4">{line.slice(3)}</h2>);
    } else if (line.startsWith('### ')) {
      elements.push(<h3 key={key++} className="text-lg font-bold text-yellow-400 mt-6 mb-3">{line.slice(4)}</h3>);
    } else if (line.trim() === '---') {
      elements.push(<hr key={key++} className="border-white/10 my-6" />);
    } else if (line.startsWith('- ')) {
      elements.push(
        <li key={key++} className="text-gray-300 text-sm ml-4 mb-1 flex items-start gap-2">
          <span className="text-yellow-400 mt-1 flex-shrink-0">•</span>
          <span dangerouslySetInnerHTML={{ __html: formatInline(line.slice(2)) }} />
        </li>
      );
    } else if (line.startsWith('| ') && line.endsWith(' |')) {
      const cells = line.split('|').filter((c) => c.trim() && !c.match(/^[-\s]+$/));
      const isHeader = i > 0 && lines[i + 1]?.includes('---');
      if (isHeader) {
        elements.push(
          <tr key={key++} className="border-b border-white/10">
            {cells.map((cell, ci) => (
              <th key={ci} className="px-4 py-2 text-left text-yellow-400 font-semibold text-sm">{cell.trim()}</th>
            ))}
          </tr>
        );
      } else if (!line.match(/^\|[-\s|]+\|$/)) {
        elements.push(
          <tr key={key++} className="border-b border-white/5">
            {cells.map((cell, ci) => (
              <td key={ci} className="px-4 py-2 text-gray-300 text-sm" dangerouslySetInnerHTML={{ __html: formatInline(cell.trim()) }} />
            ))}
          </tr>
        );
      }
    } else if (line.trim().startsWith('**') && line.includes('**')) {
      elements.push(
        <p key={key++} className="text-gray-300 text-sm my-2 leading-relaxed" dangerouslySetInnerHTML={{ __html: formatInline(line) }} />
      );
    } else if (line.trim() === '') {
      elements.push(<div key={key++} className="h-2" />);
    } else {
      elements.push(
        <p key={key++} className="text-gray-300 text-sm my-2 leading-relaxed" dangerouslySetInnerHTML={{ __html: formatInline(line) }} />
      );
    }
  }
  const wrapped = [];
  let tableBuffer = [];
  let inTable = false;
  for (const el of elements) {
    if (el.type === 'tr') {
      inTable = true;
      tableBuffer.push(el);
    } else {
      if (inTable) {
        wrapped.push(
          <div key={`tbl-${key++}`} className="overflow-x-auto my-4">
            <table className="w-full bg-[#0a1022] border border-white/10 rounded-xl overflow-hidden">
              <tbody>{tableBuffer}</tbody>
            </table>
          </div>
        );
        tableBuffer = [];
        inTable = false;
      }
      wrapped.push(el);
    }
  }
  if (inTable && tableBuffer.length) {
    wrapped.push(
      <div key="tbl-final" className="overflow-x-auto my-4">
        <table className="w-full bg-[#0a1022] border border-white/10 rounded-xl overflow-hidden">
          <tbody>{tableBuffer}</tbody>
        </table>
      </div>
    );
  }
  return wrapped;
}

const SECTION_1 = `
*By LisensyaPrep Team | Last Updated: April 2026 | 10-minute read*

---

The LET Secondary Major in English tests your content knowledge of the English language and literature alongside your ability to teach it effectively. This is not just about knowing grammar rules. The exam expects you to understand how language is acquired, how literature is analyzed, and how both are taught in the secondary classroom.

This reviewer covers the major topic areas of the LET English major subject with focus on the concepts that appear most consistently across exam cycles.

---

## Language Acquisition Theories

Understanding how people learn language is foundational for the LET English major. These theories appear both in the major subject and in Professional Education questions.
`;

const SECTION_2 = `
---

## Literary Genres and Forms

### Major Literary Genres

**Fiction** includes all invented narratives. Major forms include the short story, novel, novella, and fable.

**Non-fiction** covers factual writing including essays, biographies, autobiographies, memoirs, and journalistic writing.

**Poetry** uses condensed language, imagery, rhythm, and sound to express meaning. Major forms include the sonnet, haiku, ode, elegy, and ballad.

**Drama** is literature written to be performed. It includes tragedy, comedy, tragicomedy, and farce.

### Elements of Fiction

**Plot** is the sequence of events in a story. The structure typically follows: exposition, rising action, climax, falling action, and resolution (denouement).

**Character** includes the protagonist (main character), antagonist (opposing force), and supporting characters. Characters are developed through their actions, dialogue, thoughts, and how others respond to them.

**Setting** covers the time and place of the story. Setting contributes to mood and often influences character behavior and plot.

**Point of view** refers to the narrative perspective. First person uses "I" and is limited to one character's perspective. Third person limited focuses on one character while using "he/she/they." Third person omniscient knows all characters' thoughts and feelings.

**Theme** is the central message or insight about human experience that the work communicates.

**Conflict** is the central struggle. Types: person vs person, person vs self, person vs nature, person vs society, person vs fate.

---

## Approaches to Teaching Literature

### Reader-Response Approach

Reader-response theory holds that meaning is created through the interaction between the text and the reader. Each reader brings different experiences to a text and may arrive at different but equally valid interpretations.

Classroom application: ask students to connect the text to their own experiences before discussing textual evidence.

### New Criticism (Close Reading)

New Criticism focuses attention exclusively on the text itself, examining language, imagery, irony, paradox, and tension without reference to the author's life or historical context.

Classroom application: guided close reading activities where students analyze specific passages for literary devices.

### Historical and Cultural Approach

This approach situates a literary work within its historical and cultural context to understand how the time and place of writing influenced its meaning.

Classroom application: provide background information about the period before reading the text.

---

## Grammar and Linguistics

### Parts of Speech

Know the eight parts of speech and their functions: noun, pronoun, verb, adjective, adverb, preposition, conjunction, interjection.

**Common LET question types on grammar:**

Identifying the correct form of a word in context, choosing the correct verb tense based on time markers, identifying errors in pronoun-antecedent agreement, and correcting misplaced modifiers.

### Levels of Language

**Phonology** is the study of sound systems in language.

**Morphology** is the study of word structure and formation. Morphemes are the smallest units of meaning. Free morphemes can stand alone (run, book). Bound morphemes must be attached to another morpheme (pre-, -tion, -ing).

**Syntax** is the study of sentence structure and the rules that govern how words combine into sentences.

**Semantics** is the study of meaning in language.

**Pragmatics** is the study of how context influences meaning. What a speaker means may differ from what the words literally say.

---

## English Teaching Methods

### Communicative Language Teaching (CLT)

CLT emphasizes using language for real communication rather than focusing on grammar rules in isolation. Students learn language by using it in meaningful, purposeful activities.

### Task-Based Language Teaching (TBLT)

Students complete meaningful tasks (giving directions, writing a letter, making a plan) as the vehicle for language learning. Grammar is addressed in the context of what is needed to complete the task.

### Content-Based Instruction (CBI)

Academic content is taught through the target language. Students learn English while simultaneously learning content in another subject area.

### The Direct Method

Instruction is conducted entirely in the target language. Translation is not used. Grammar is taught inductively through examples.

---

## Practice What You Just Learned

The LET Secondary Major English exam tests both your content knowledge and your ability to apply it in teaching contexts. Practice questions that combine language knowledge with pedagogical application are the most useful preparation.

Head to LisensyaPrep and practice now. No registration required.

**[Practice LET Secondary English Questions at LisensyaPrep](https://lisensyaprep.com)**
`;

export default function SecondaryEnglishReviewerPage() {
  return (
    <div className="min-h-screen py-10">
      <Script id="schema-let-eng" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          <article className="lg:col-span-2">
            <nav className="flex items-center gap-2 text-sm mb-6" aria-label="Breadcrumb">
              <Link href="/" className="text-gray-500 hover:text-gray-300 transition-colors">Home</Link>
              <span className="text-gray-700">/</span>
              <Link href="/education" className="text-gray-500 hover:text-gray-300 transition-colors">Education</Link>
              <span className="text-gray-700">/</span>
              <span className="text-gray-400 truncate">Secondary Major English Reviewer</span>
            </nav>

            <header className="mb-8">
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-violet-500/10 text-violet-400">
                Education (LET)
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-4 mb-3 leading-tight">
                LET Secondary Major English Reviewer 2026 Philippines
              </h1>
              <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
                <span>LisensyaPrep Team</span>
                <span>•</span>
                <span>April 25, 2026</span>
                <span>•</span>
                <span>10 min read</span>
              </div>
            </header>

            <div className="mb-8 rounded-xl overflow-hidden">
              <Image
                src="/images/articles/hero-let-secondary-english.jpg"
                alt="Person writing and studying English literature for LET secondary major English reviewer Philippines 2026"
                width={1200}
                height={630}
                className="w-full h-auto"
                priority
              />
            </div>

            <div className="prose-content">
              {renderContent(SECTION_1)}

              <figure style={{ margin: '2rem 0' }}>
                <svg viewBox="0 0 760 300" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: 'auto', borderRadius: '10px' }}>
                  <rect width="760" height="300" fill="#0f172a" rx="10"/>
                  <text x="380" y="26" textAnchor="middle" fill="#f8fafc" fontSize="15" fontWeight="700" fontFamily="Georgia,serif">Language Acquisition Theories for LET English</text>
                  <line x1="40" y1="38" x2="720" y2="38" stroke="#334155" strokeWidth="1"/>
                  <rect x="40" y="48" width="680" height="46" fill="#1e3a5f" rx="6"/>
                  <text x="210" y="68" textAnchor="middle" fill="#f59e0b" fontSize="12" fontWeight="700" fontFamily="Arial,sans-serif">BEHAVIORIST THEORY</text>
                  <text x="210" y="84" textAnchor="middle" fill="#93c5fd" fontSize="10" fontFamily="Arial,sans-serif">B.F. Skinner</text>
                  <text x="490" y="64" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontFamily="Arial,sans-serif">Language is learned through imitation, repetition, and reinforcement.</text>
                  <text x="490" y="80" textAnchor="middle" fill="#94a3b8" fontSize="10" fontFamily="Arial,sans-serif">Classroom: drills, pattern practice, audio-lingual method.</text>
                  <rect x="40" y="100" width="680" height="46" fill="#172033" rx="6"/>
                  <text x="210" y="120" textAnchor="middle" fill="#f59e0b" fontSize="12" fontWeight="700" fontFamily="Arial,sans-serif">NATIVIST THEORY</text>
                  <text x="210" y="136" textAnchor="middle" fill="#93c5fd" fontSize="10" fontFamily="Arial,sans-serif">Noam Chomsky</text>
                  <text x="490" y="116" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontFamily="Arial,sans-serif">Humans are born with a Language Acquisition Device (LAD).</text>
                  <text x="490" y="132" textAnchor="middle" fill="#94a3b8" fontSize="10" fontFamily="Arial,sans-serif">Universal Grammar: all languages share underlying rules.</text>
                  <rect x="40" y="152" width="680" height="46" fill="#1e3a5f" rx="6"/>
                  <text x="210" y="172" textAnchor="middle" fill="#f59e0b" fontSize="12" fontWeight="700" fontFamily="Arial,sans-serif">INTERACTIONIST THEORY</text>
                  <text x="210" y="188" textAnchor="middle" fill="#93c5fd" fontSize="10" fontFamily="Arial,sans-serif">Vygotsky, Bruner</text>
                  <text x="490" y="168" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontFamily="Arial,sans-serif">Language develops through social interaction and communication.</text>
                  <text x="490" y="184" textAnchor="middle" fill="#94a3b8" fontSize="10" fontFamily="Arial,sans-serif">ZPD applies to language: learners need interaction with more proficient speakers.</text>
                  <rect x="40" y="204" width="680" height="46" fill="#14532d" rx="6"/>
                  <text x="210" y="224" textAnchor="middle" fill="#86efac" fontSize="12" fontWeight="700" fontFamily="Arial,sans-serif">{"KRASHEN'S MONITOR MODEL"}</text>
                  <text x="210" y="240" textAnchor="middle" fill="#d1fae5" fontSize="10" fontFamily="Arial,sans-serif">Stephen Krashen</text>
                  <text x="490" y="220" textAnchor="middle" fill="#d1fae5" fontSize="11" fontFamily="Arial,sans-serif">Acquisition (subconscious) vs Learning (conscious). Input Hypothesis:</text>
                  <text x="490" y="236" textAnchor="middle" fill="#d1fae5" fontSize="11" fontFamily="Arial,sans-serif">comprehensible input slightly above current level (i+1) drives acquisition.</text>
                  <text x="380" y="290" textAnchor="middle" fill="#475569" fontSize="10" fontFamily="Arial,sans-serif">LisensyaPrep.com | LET Secondary Major English Reviewer 2026</text>
                </svg>
                <figcaption style={{ textAlign: 'center', fontSize: '0.8rem', color: '#64748b', marginTop: '0.5rem' }}>Language acquisition theories tested in LET Secondary English major</figcaption>
              </figure>

              <AdPlaceholder slot="banner" className="my-6" />

              {renderContent(SECTION_2)}
            </div>

            <div className="mt-10 bg-gradient-to-br from-blue-900/20 to-blue-900/10 border border-blue-500/30 rounded-2xl p-6 text-center">
              <p className="text-blue-400 font-extrabold text-lg mb-2">Ready to Test Your Knowledge?</p>
              <p className="text-gray-400 text-sm mb-4">
                Practice LET Secondary English questions with instant feedback. No registration required.
              </p>
              <Link
                href="/education"
                className="inline-block bg-blue-500 hover:bg-blue-400 text-white font-bold px-6 py-3 rounded-xl transition-colors"
              >
                Start LET Practice at LisensyaPrep →
              </Link>
            </div>

            <AdPlaceholder slot="banner" className="mt-8" />

            <div className="mt-10">
              <h2 className="text-xl font-extrabold text-white mb-4">Related LET Articles</h2>
              <ul className="space-y-3">
                {RELATED_ARTICLES.map(({ text, href }) => (
                  <li key={href}>
                    <Link href={href} className="text-yellow-400 hover:text-yellow-300 underline underline-offset-2 text-sm transition-colors">
                      {text}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </article>

          <aside className="space-y-6">
            <div className="bg-[#0f1629] border border-white/10 rounded-2xl p-5">
              <h3 className="text-white font-bold mb-4">LET Study Guides</h3>
              <div className="space-y-4">
                {RELATED_ARTICLES.map(({ text, href }) => (
                  <Link key={href} href={href} className="group block">
                    <p className="text-gray-300 text-sm group-hover:text-yellow-400 transition-colors leading-snug">
                      {text}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
            <AdPlaceholder slot="sidebar" />
          </aside>

        </div>
      </div>
    </div>
  );
}
