'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import AdPlaceholder from '@/components/ui/AdPlaceholder';
import { BLOG_POSTS } from '@/lib/blogData';

const TAG_COLORS = {
  'Study Tips': 'bg-yellow-400/10 text-yellow-400',
  'Soil Science': 'bg-amber-500/10 text-amber-400',
  'Economics': 'bg-blue-500/10 text-blue-400',
  'Crop Science': 'bg-green-500/10 text-green-400',
  'Board Exam Guide': 'bg-purple-500/10 text-purple-400',
  'Nursing': 'bg-pink-500/10 text-pink-400',
  'Criminology': 'bg-red-500/10 text-red-400',
};

const CATEGORIES = [
  'All',
  'Board Exam Guides',
  'Nursing',
  'Criminology',
  'Education',
  'Agriculture',
  'Pharmacy',
  'Medical Technology',
];

const CATEGORY_TAG_MAP = {
  'Board Exam Guides': ['Board Exam Guide'],
  'Nursing': ['Nursing'],
  'Criminology': ['Criminology'],
  'Education': ['Education'],
  'Agriculture': ['Study Tips', 'Soil Science', 'Economics', 'Crop Science'],
  'Pharmacy': ['Pharmacy'],
  'Medical Technology': ['Medical Technology'],
};

const POSTS_PER_PAGE = 9;

const SORTED_POSTS = [...BLOG_POSTS].sort(
  (a, b) => new Date(b.date) - new Date(a.date)
);

export default function BlogClient() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const filteredPosts = useMemo(() => {
    return SORTED_POSTS.filter((post) => {
      const matchesCategory =
        activeCategory === 'All' ||
        CATEGORY_TAG_MAP[activeCategory]?.includes(post.tag);
      const matchesSearch =
        !searchQuery ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  function handleCategoryChange(cat) {
    setActiveCategory(cat);
    setCurrentPage(1);
  }

  function handleSearch(e) {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  }

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <p className="text-yellow-400 text-sm font-semibold uppercase tracking-widest mb-2">Study Resources</p>
          <h1 className="text-4xl font-extrabold text-white mb-3">PRC Board Exam Review Blog</h1>
          <p className="text-gray-400 max-w-xl mx-auto">
            Free study guides, exam tips, and board exam application guides for Nursing, Criminology, Agriculture, Education, and more.
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-5">
          <input
            type="text"
            placeholder="Search articles by title..."
            value={searchQuery}
            onChange={handleSearch}
            className="w-full bg-[#0f1629] border border-white/10 text-white placeholder-gray-500 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-yellow-400/50 transition-colors"
          />
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`text-xs font-semibold px-4 py-2 rounded-full transition-all ${
                activeCategory === cat
                  ? 'bg-yellow-400 text-gray-900'
                  : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Posts list */}
          <div className="lg:col-span-2 space-y-6">
            {paginatedPosts.length > 0 ? (
              paginatedPosts.map((post) => (
                <Link key={post.slug} href={`/blog/${post.slug}`} className="group block">
                  <article className="bg-[#0f1629] border border-white/10 hover:border-yellow-400/30 rounded-2xl p-6 transition-all">
                    <div className="flex items-center justify-between mb-3">
                      <span className={`text-xs font-semibold px-3 py-1 rounded-full ${TAG_COLORS[post.tag] || 'bg-white/10 text-gray-300'}`}>
                        {post.tag}
                      </span>
                      <span className="text-gray-600 text-xs">{post.readTime}</span>
                    </div>
                    <h2 className="text-white font-bold text-xl mb-2 group-hover:text-yellow-400 transition-colors leading-snug">
                      {post.title}
                    </h2>
                    <p className="text-gray-400 text-sm mb-4 line-clamp-2">{post.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 text-xs">{post.date} • {post.author}</span>
                      <span className="text-yellow-400 text-sm font-semibold group-hover:translate-x-1 transition-transform">
                        Read more →
                      </span>
                    </div>
                  </article>
                </Link>
              ))
            ) : (
              <div className="bg-[#0f1629] border border-white/10 rounded-2xl p-12 text-center">
                <p className="text-gray-500">No articles found matching your search.</p>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 pt-4">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 rounded-lg text-sm font-semibold bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all border border-white/10"
                >
                  ← Prev
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-9 h-9 rounded-lg text-sm font-semibold transition-all ${
                      currentPage === page
                        ? 'bg-yellow-400 text-gray-900'
                        : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/10'
                    }`}
                  >
                    {page}
                  </button>
                ))}
                <button
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 rounded-lg text-sm font-semibold bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all border border-white/10"
                >
                  Next →
                </button>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-[#0f1629] border border-white/10 rounded-2xl p-5">
              <h3 className="text-white font-bold mb-4">Start Reviewing</h3>
              <p className="text-gray-400 text-sm mb-4">
                Reading is good, but practice is better. Test your knowledge with our gamified quiz!
              </p>
              <Link
                href="/agriculture"
                className="block w-full bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-bold py-3 rounded-xl text-center text-sm transition-colors"
              >
                ⚔️ Start Quiz
              </Link>
            </div>

            <div className="bg-[#0f1629] border border-white/10 rounded-2xl p-5">
              <h3 className="text-white font-bold mb-3">Topics</h3>
              <div className="flex flex-wrap gap-2">
                {Object.keys(TAG_COLORS).map((tag) => (
                  <span key={tag} className={`text-xs font-semibold px-3 py-1 rounded-full ${TAG_COLORS[tag]}`}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <AdPlaceholder slot="sidebar" />
          </div>
        </div>
      </div>
    </div>
  );
}
