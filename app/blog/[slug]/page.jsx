import { notFound, redirect } from 'next/navigation';
import Link from 'next/link';
import AdPlaceholder from '@/components/ui/AdPlaceholder';
import { BLOG_POSTS } from '@/lib/blogData';
import { buildMetadata } from '@/lib/seo';

export async function generateStaticParams() {
  return BLOG_POSTS.filter((p) => !p.url).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const post = BLOG_POSTS.find((p) => p.slug === params.slug);
  if (!post) return {};
  return buildMetadata({
    title: post.metaTitle || post.title,
    description: post.metaDescription || post.excerpt,
    path: `/blog/${post.slug}`,
  });
}

function formatInline(text) {
  return text
    .replace(
      /\[([^\]]+)\]\((https?:\/\/[^)]+|\/[^)]*)\)/g,
      (_, t, url) => `<a href="${url}"${url.startsWith('http') ? ' target="_blank" rel="noopener noreferrer"' : ''} class="text-yellow-400 hover:text-yellow-300 underline underline-offset-2">${t}</a>`
    )
    .replace(/\*\*(.+?)\*\*/g, '<strong class="text-white font-semibold">$1</strong>')
    .replace(/\*([^*]+)\*/g, '<em class="text-gray-400 italic">$1</em>')
    .replace(/`(.+?)`/g, '<code class="bg-white/10 px-1 rounded text-yellow-300 text-xs">$1</code>');
}

// Simple markdown-like content renderer (no external deps)
function renderContent(content) {
  const lines = content.trim().split('\n');
  const elements = [];
  let key = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (line.startsWith('## ')) {
      elements.push(
        <h2 key={key++} className="text-2xl font-extrabold text-white mt-8 mb-4">
          {line.slice(3)}
        </h2>
      );
    } else if (line.startsWith('### ')) {
      elements.push(
        <h3 key={key++} className="text-lg font-bold text-yellow-400 mt-6 mb-3">
          {line.slice(4)}
        </h3>
      );
    } else if (line.trim() === '---') {
      elements.push(
        <hr key={key++} className="border-white/10 my-6" />
      );
    } else if (line.startsWith('**') && line.endsWith('**')) {
      elements.push(
        <p key={key++} className="font-bold text-white my-2">
          {line.slice(2, -2)}
        </p>
      );
    } else if (line.startsWith('- ')) {
      elements.push(
        <li key={key++} className="text-gray-300 text-sm ml-4 mb-1 flex items-start gap-2">
          <span className="text-yellow-400 mt-1 flex-shrink-0">•</span>
          <span dangerouslySetInnerHTML={{ __html: formatInline(line.slice(2)) }} />
        </li>
      );
    } else if (line.startsWith('- [ ] ')) {
      elements.push(
        <li key={key++} className="text-gray-300 text-sm ml-4 mb-1 flex items-center gap-2">
          <span className="w-4 h-4 border border-gray-600 rounded flex-shrink-0 inline-block" />
          {line.slice(6)}
        </li>
      );
    } else if (line.startsWith('| ') && line.endsWith(' |')) {
      const cells = line.split('|').filter((c) => c.trim() && !c.match(/^[-\s]+$/));
      const isHeader = i > 0 && lines[i + 1]?.includes('---');
      if (isHeader) {
        elements.push(
          <tr key={key++} className="border-b border-white/10">
            {cells.map((cell, ci) => (
              <th key={ci} className="px-4 py-2 text-left text-yellow-400 font-semibold text-sm">
                {cell.trim()}
              </th>
            ))}
          </tr>
        );
      } else if (!line.match(/^\|[-\s|]+\|$/)) {
        elements.push(
          <tr key={key++} className="border-b border-white/5">
            {cells.map((cell, ci) => (
              <td
                key={ci}
                className="px-4 py-2 text-gray-300 text-sm"
                dangerouslySetInnerHTML={{ __html: formatInline(cell.trim()) }}
              />
            ))}
          </tr>
        );
      }
    } else if (line.trim().startsWith('**Example:**')) {
      elements.push(
        <div key={key++} className="bg-blue-500/10 border border-blue-400/20 rounded-lg px-4 py-3 my-3">
          <p className="text-gray-300 text-sm">
            <strong className="text-blue-400">Example:</strong>{' '}
            {line.replace('**Example:**', '').trim()}
          </p>
        </div>
      );
    } else if (line.trim().startsWith('**Key formula:**') || line.trim().startsWith('**formula:**')) {
      elements.push(
        <div key={key++} className="bg-yellow-400/5 border border-yellow-400/20 rounded-lg px-4 py-3 my-3 font-mono text-sm text-yellow-300">
          {line.replace(/\*\*[^*]+\*\*/, '').trim()}
        </div>
      );
    } else if (line.trim().startsWith('**') && line.includes('**')) {
      elements.push(
        <p key={key++} className="text-gray-300 text-sm my-2 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: formatInline(line) }}
        />
      );
    } else if (line.trim() === '') {
      elements.push(<div key={key++} className="h-2" />);
    } else {
      elements.push(
        <p key={key++} className="text-gray-300 text-sm my-2 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: formatInline(line) }}
        />
      );
    }
  }

  // Wrap table rows
  const wrappedElements = [];
  let tableBuffer = [];
  let inTable = false;

  for (const el of elements) {
    if (el.type === 'tr') {
      inTable = true;
      tableBuffer.push(el);
    } else {
      if (inTable) {
        wrappedElements.push(
          <div key={`table-${key++}`} className="overflow-x-auto my-4">
            <table className="w-full bg-[#0a1022] border border-white/10 rounded-xl overflow-hidden">
              <tbody>{tableBuffer}</tbody>
            </table>
          </div>
        );
        tableBuffer = [];
        inTable = false;
      }
      wrappedElements.push(el);
    }
  }

  if (inTable && tableBuffer.length) {
    wrappedElements.push(
      <div key={`table-final`} className="overflow-x-auto my-4">
        <table className="w-full bg-[#0a1022] border border-white/10 rounded-xl overflow-hidden">
          <tbody>{tableBuffer}</tbody>
        </table>
      </div>
    );
  }

  return wrappedElements;
}

const TAG_COLORS = {
  'Board Exam Guide': 'bg-blue-500/10 text-blue-400',
  'Study Tips':       'bg-yellow-400/10 text-yellow-400',
  'Soil Science':     'bg-amber-500/10 text-amber-400',
  'Economics':        'bg-emerald-500/10 text-emerald-400',
  'Crop Science':     'bg-green-500/10 text-green-400',
  'Nursing':          'bg-sky-500/10 text-sky-400',
  'Criminology':      'bg-red-500/10 text-red-400',
  'Education':        'bg-violet-500/10 text-violet-400',
  'Agriculture':      'bg-lime-500/10 text-lime-400',
};

// Determine the best quiz CTA destination based on article tag
function getCtaHref(tag) {
  if (tag === 'Criminology') return '/criminology';
  if (tag === 'Education') return '/education';
  if (tag === 'Agriculture' || tag === 'Soil Science' || tag === 'Crop Science' || tag === 'Economics') return '/agriculture';
  return '/';
}

export default function BlogPostPage({ params }) {
  const post = BLOG_POSTS.find((p) => p.slug === params.slug);
  if (!post) return notFound();
  if (post.url) redirect(post.url);

  const otherPosts = BLOG_POSTS.filter((p) => p.slug !== params.slug);
  const ctaHref = getCtaHref(post.tag);

  return (
    <div className="min-h-screen py-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Article */}
          <article className="lg:col-span-2">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm mb-6" aria-label="Breadcrumb">
              <Link href="/" className="text-gray-500 hover:text-gray-300">Home</Link>
              <span className="text-gray-700">/</span>
              <Link href="/blog" className="text-gray-500 hover:text-gray-300">Blog</Link>
              <span className="text-gray-700">/</span>
              <span className="text-gray-400 truncate">{post.title}</span>
            </nav>

            <header className="mb-8">
              <span className={`text-xs font-semibold px-3 py-1 rounded-full ${TAG_COLORS[post.tag] || 'bg-white/10 text-gray-300'}`}>
                {post.tag}
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-4 mb-3 leading-tight">
                {post.title}
              </h1>
              <p className="text-gray-400 text-base mb-4">{post.excerpt}</p>
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <span>{post.author}</span>
                <span>•</span>
                <span>{post.date}</span>
                <span>•</span>
                <span>{post.readTime}</span>
              </div>
            </header>

            <div className="prose-content">
              {renderContent(post.content)}
            </div>

            {/* CTA */}
            <div className="mt-10 bg-gradient-to-br from-yellow-900/20 to-amber-900/10 border border-yellow-400/30 rounded-2xl p-6 text-center">
              <p className="text-yellow-400 font-extrabold text-lg mb-2">Test Your Knowledge!</p>
              <p className="text-gray-400 text-sm mb-4">
                Put what you learned into practice with our gamified quiz. Battle the boss and earn your license piece.
              </p>
              <Link
                href={ctaHref}
                className="inline-block bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-bold px-6 py-3 rounded-xl transition-colors"
              >
                ⚔️ Start Quiz →
              </Link>
            </div>

            <AdPlaceholder slot="banner" className="mt-8" />
          </article>

          {/* Sidebar */}
          <aside className="space-y-6">
            <div className="bg-[#0f1629] border border-white/10 rounded-2xl p-5">
              <h3 className="text-white font-bold mb-4">More Articles</h3>
              <div className="space-y-4">
                {otherPosts.map((p) => (
                  <Link key={p.slug} href={p.url || `/blog/${p.slug}`} className="group block">
                    <p className="text-gray-300 text-sm group-hover:text-yellow-400 transition-colors leading-snug mb-1">
                      {p.title}
                    </p>
                    <p className="text-gray-600 text-xs">{p.readTime}</p>
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
