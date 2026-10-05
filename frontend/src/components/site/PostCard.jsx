import { Link } from 'react-router-dom';
import { ArrowRight, Clock } from 'lucide-react';
import { formatDate } from '@/lib/format';

export function PostCover({ post, className = '' }) {
  if (post.cover_image) {
    return <img src={post.cover_image} alt={post.cover_alt || ''} loading="lazy" className={`w-full object-cover ${className}`} />;
  }
  return (
    <div className={`relative w-full overflow-hidden bg-navy-deep ${className}`} aria-hidden="true">
      <div className="absolute -right-10 -bottom-10 h-40 w-40 rounded-full bg-hive/20 blur-2xl" />
      <span className="absolute left-5 bottom-4 font-jakarta text-2xl font-extrabold text-white/90">
        Sell<span className="text-hive">Hive</span>
      </span>
    </div>
  );
}

export default function PostCard({ post, featured = false }) {
  const meta = (
    <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-slate-500">
      {post.category && <span className="font-semibold text-brandblue">{post.category}</span>}
      <time dateTime={post.published_at}>{formatDate(post.published_at)}</time>
      <span className="flex items-center gap-1"><Clock size={14} aria-hidden="true" /> {post.reading_minutes || 1} min read</span>
    </p>
  );

  if (featured) {
    return (
      <article className="group grid md:grid-cols-2 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_12px_40px_-28px_rgba(8,35,63,0.5)]">
        <Link to={`/blog/${post.slug}`} tabIndex={-1} aria-hidden="true">
          <PostCover post={post} className="h-60 md:h-full min-h-[260px]" />
        </Link>
        <div className="p-6 sm:p-8 flex flex-col justify-center">
          <span className="w-fit rounded-full bg-hive px-3 py-1 text-xs font-bold text-navy mb-4">Featured</span>
          {meta}
          <h2 className="mt-3 font-jakarta text-2xl sm:text-3xl font-extrabold text-navy leading-tight">
            <Link to={`/blog/${post.slug}`} className="hover:text-brandblue focus-visible:outline-none focus-visible:underline">{post.title}</Link>
          </h2>
          {post.excerpt && <p className="mt-3 text-slate-600 leading-relaxed">{post.excerpt}</p>}
          <Link to={`/blog/${post.slug}`} className="mt-5 inline-flex w-fit items-center gap-2 font-bold text-brandblue hover:underline" aria-hidden="true" tabIndex={-1}>
            Read article <ArrowRight size={16} />
          </Link>
        </div>
      </article>
    );
  }

  return (
    <article className="flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white">
      <Link to={`/blog/${post.slug}`} tabIndex={-1} aria-hidden="true">
        <PostCover post={post} className="h-48" />
      </Link>
      <div className="flex flex-1 flex-col p-5">
        {meta}
        <h3 className="mt-2 font-jakarta text-lg font-extrabold text-navy leading-snug">
          <Link to={`/blog/${post.slug}`} className="hover:text-brandblue focus-visible:outline-none focus-visible:underline">{post.title}</Link>
        </h3>
        {post.excerpt && <p className="mt-2 text-[15px] text-slate-600 line-clamp-3 flex-1">{post.excerpt}</p>}
      </div>
    </article>
  );
}
