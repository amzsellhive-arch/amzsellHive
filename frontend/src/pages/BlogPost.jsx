import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Home, ChevronRight, Clock, ArrowLeft, Linkedin, Link2, Check } from 'lucide-react';
import SiteLayout from '@/components/site/SiteLayout';
import { Container, YellowButton, CtaBand, Hl } from '@/components/site/ui';
import BlogMarkdown from '@/components/site/BlogMarkdown';
import PostCard from '@/components/site/PostCard';
import { getPost } from '@/services/blogService';
import { formatDate } from '@/lib/format';
import useSeo from '@/hooks/useSeo';
import NotFound from './NotFound';

export default function BlogPostPage() {
  const { slug } = useParams();
  const [state, setState] = useState({ loading: true, notFound: false, error: false, post: null, related: [] });
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let alive = true;
    setState({ loading: true, notFound: false, error: false, post: null, related: [] });
    getPost(slug)
      .then((res) => alive && setState({ loading: false, notFound: false, error: false, post: res.data.post, related: res.data.related || [] }))
      .catch((err) => {
        if (!alive) return;
        const nf = err?.response?.status === 404;
        setState({ loading: false, notFound: nf, error: !nf, post: null, related: [] });
      });
    return () => {
      alive = false;
    };
  }, [slug]);

  const post = state.post;
  useSeo(
    post
      ? {
          title: post.meta_title || post.title,
          description: post.meta_description || post.excerpt,
          image: post.cover_image || undefined,
        }
      : { title: 'Resources' }
  );

  if (state.notFound) return <NotFound />;

  const url = typeof window !== 'undefined' ? window.location.href : '';
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable */
    }
  };

  return (
    <SiteLayout>
      {state.loading ? (
        <Container className="py-16" aria-busy="true">
          <div className="max-w-3xl mx-auto space-y-4 animate-pulse">
            <div className="h-4 w-40 bg-slate-200 rounded" />
            <div className="h-12 w-full bg-slate-200 rounded" />
            <div className="h-72 w-full bg-slate-100 rounded-2xl" />
          </div>
        </Container>
      ) : state.error ? (
        <Container className="py-24 text-center">
          <h1 className="font-jakarta text-2xl font-extrabold text-navy">This article couldn’t be loaded.</h1>
          <p className="mt-2 text-slate-600">Check your connection and refresh the page.</p>
          <Link to="/blog" className="mt-6 inline-block font-bold text-brandblue hover:underline">Back to Resources</Link>
        </Container>
      ) : (
        <article>
          <Container className="pt-8 pb-12">
            <div className="max-w-3xl mx-auto">
              <nav aria-label="Breadcrumb" className="text-sm text-brandblue">
                <ol className="flex items-center gap-1.5 flex-wrap">
                  <li><Link to="/" aria-label="Home" className="flex"><Home size={15} /></Link></li>
                  <ChevronRight size={14} className="text-slate-400" aria-hidden="true" />
                  <li><Link to="/blog" className="hover:underline">Resources</Link></li>
                  {post.category && (
                    <>
                      <ChevronRight size={14} className="text-slate-400" aria-hidden="true" />
                      <li><Link to={`/blog?category=${encodeURIComponent(post.category)}`} className="hover:underline">{post.category}</Link></li>
                    </>
                  )}
                </ol>
              </nav>

              <header className="mt-6">
                <h1 className="font-jakarta text-3xl sm:text-4xl lg:text-[2.9rem] font-extrabold tracking-tight leading-[1.12] text-navy">
                  {post.title}
                </h1>
                {post.excerpt && <p className="mt-4 text-xl text-slate-600 leading-relaxed">{post.excerpt}</p>}
                <p className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-slate-500">
                  {post.author && <span className="font-semibold text-navy">By {post.author}</span>}
                  <time dateTime={post.published_at}>{formatDate(post.published_at)}</time>
                  <span className="flex items-center gap-1"><Clock size={14} aria-hidden="true" /> {post.reading_minutes || 1} min read</span>
                </p>
              </header>
            </div>

            {post.cover_image && (
              <img
                src={post.cover_image}
                alt={post.cover_alt || ''}
                className="mt-8 w-full max-w-4xl mx-auto rounded-2xl object-cover max-h-[520px]"
              />
            )}

            <div className="mt-10 max-w-3xl mx-auto">
              <BlogMarkdown>{post.content}</BlogMarkdown>

              {Array.isArray(post.tags) && post.tags.length > 0 && (
                <ul className="mt-10 flex flex-wrap gap-2" aria-label="Tags">
                  {post.tags.map((t) => (
                    <li key={t} className="rounded-full bg-mist border border-slate-200 px-3 py-1 text-sm text-slate-600">#{t}</li>
                  ))}
                </ul>
              )}

              <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-slate-200 pt-6">
                <Link to="/blog" className="inline-flex items-center gap-2 font-bold text-brandblue hover:underline">
                  <ArrowLeft size={17} aria-hidden="true" /> All articles
                </Link>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-slate-500">Share</span>
                  <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Share on LinkedIn"
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 hover:bg-mist"
                  >
                    <Linkedin size={16} className="text-navy" />
                  </a>
                  <button
                    type="button"
                    onClick={copy}
                    aria-label="Copy link"
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 hover:bg-mist"
                  >
                    {copied ? <Check size={16} className="text-green-600" /> : <Link2 size={16} className="text-navy" />}
                  </button>
                  <span className="sr-only" role="status">{copied ? 'Link copied' : ''}</span>
                </div>
              </div>
            </div>
          </Container>

          {state.related.length > 0 && (
            <section className="py-14 bg-mist" aria-labelledby="related-heading">
              <Container>
                <h2 id="related-heading" className="font-jakarta text-2xl sm:text-3xl font-extrabold text-navy">Keep reading</h2>
                <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {state.related.map((p) => <PostCard key={p.id} post={p} />)}
                </div>
              </Container>
            </section>
          )}
        </article>
      )}

      <CtaBand
        eyebrow="Ready to improve your Amazon account?"
        title={<>Get a Free <Hl>Amazon Account Audit</Hl></>}
        body="We’ll review your account and share actionable opportunities to lower ACoS and increase profitable sales."
        primary={<YellowButton to="/audit">Get a Free Account Audit</YellowButton>}
      />
    </SiteLayout>
  );
}
