import { PAGE_SEO } from '@/lib/seo';
import BlogClient from './BlogClient';

export const metadata = PAGE_SEO.blog;

export default function BlogPage() {
  return <BlogClient />;
}
