import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, X } from 'lucide-react';
import SiteLayout from '@/components/site/SiteLayout';
import { Container, Eyebrow, YellowButton, CtaBand, Hl } from '@/components/site/ui';
import PostCard from '@/components/site/PostCard';
import { getPosts } from '@/services/blogService';
import useSeo from '@/hooks/useSeo';

export default function BlogPage() {
  const [params, setParams] = useSearchParams();
  const category = params.get('category') || '';
  const q = params.get('q') || '';
  const page = Number(params.get('page') || 1);

  const [state, setState] = useState({ loading: true, error: false, posts: [], categories: [], meta: null });
  const [search, setSearch] = useState(q);

  useSeo({
    title: 'Resources — Amazon Growth Insights',
    description:
      'Practical guides on Amazon PPC, ACOS, listings, Brand Stores and account growth from the SellHive team.',
  });

  useEffect(() => setSearch(q), [q]);

  useEffect(() => {
    let alive = true;
    setState((s) => ({ ...s, loading: true, error: false }));
    getPosts({ category: category || undefined, q: q || undefined, page })
      .then((res) => {
        if (!alive) return;
        setState({
          loading: false,
          error: false,
          posts: res.data.data || [],
          categories: res.data.categories || [],
          meta: res.data.meta,
        });
      })
      .catch(() => alive && setState((s) => ({ ...s, loading: false, error: true, posts: [] })));
    return () => {
      alive = false;
    };
  }, [category, q, page]);

  const update = (next) => {
    const p = new URLSearchParams(params);
    Object.entries(next).forEach(([k, v]) => (v ? p.set(k, v) : p.delete(k)));
    if (!('page' in next)) p.delete('page');
    setParams(p);
  };

  const onSearch = (e) => {
    e.preventDefault();
    update({ q: search.trim() });
  };

  const showFeatured = page === 1 && !q && !category && state.posts.length > 0;
  const [featured, ...rest] = state.posts;
  const gridPosts = showFeatured ? rest : state.posts;

  return (
    <SiteLayout>
      <section className="bg-navy-deep text-white">
        <Container className="py-14 sm:py-16">
          <Eyebrow tone="yellow" className="mb-3">Resources</Eyebrow>
          <h1 className="font-jakarta text-4xl sm:text-5xl font-extrabold tracking-tight leading-[1.08] max-w-3xl">
            Amazon Growth <Hl>Insights.</Hl>
          </h1>
          <p className="mt-4 text-lg text-white/80 max-w-2xl">
            Practical guides on PPC, listings, Brand Stores and profitable growth — written by people who manage Amazon accounts every day.
          </p>
          <form onSubmit={onSearch} role="search" className="mt-8 flex max-w-lg rounded-lg bg-white p-1.5">
            <label htmlFor="blog-search" className="sr-only">Search articles</label>
            <input
              id="blog-search"
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search articles"
              className="flex-1 min-w-0 bg-transparent px-3 text-navy placeholder:text-slate-400 focus:outline-none"
            />
            <button type="submit" className="flex items-center gap-2 rounded-md bg-hive px-4 py-2 font-bold text-navy hover:bg-hive-dark">
              <Search size={17} aria-hidden="true" /> Search
            </button>
          </form>
        </Container>
      </section>

      <section className="py-12 bg-mist min-h-[50vh]">
        <Container>
          {state.categories.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-8" role="group" aria-label="Filter by category">
              {['', ...state.categories].map((c) => {
                const active = c === category;
                return (
                  <button
                    key={c || 'all'}
                    type="button"
                    aria-pressed={active}
                    onClick={() => update({ category: c })}
                    className={`rounded-full px-4 py-2 text-sm font-semibold border transition-colors ${
                      active ? 'bg-navy text-white border-navy' : 'bg-white text-navy border-slate-200 hover:border-navy'
                    }`}
                  >
                    {c || 'All articles'}
                  </button>
                );
              })}
            </div>
          )}

          {q && (
            <p className="mb-6 flex items-center gap-2 text-slate-600">
              Results for “<strong className="text-navy">{q}</strong>”
              <button type="button" onClick={() => update({ q: '' })} className="inline-flex items-center gap-1 text-sm font-semibold text-brandblue hover:underline">
                <X size={14} aria-hidden="true" /> Clear search
              </button>
            </p>
          )}

          {state.loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" aria-busy="true" aria-label="Loading articles">
              {[0, 1, 2].map((i) => (
                <div key={i} className="h-80 rounded-2xl bg-white border border-slate-200 animate-pulse" />
              ))}
            </div>
          ) : state.error ? (
            <div className="rounded-2xl bg-white border border-slate-200 p-10 text-center">
              <p className="font-bold text-navy text-lg">Articles couldn’t be loaded.</p>
              <p className="mt-2 text-slate-600">Check your connection and refresh the page.</p>
            </div>
          ) : state.posts.length === 0 ? (
            <div className="rounded-2xl bg-white border border-slate-200 p-10 text-center">
              <p className="font-bold text-navy text-lg">{q || category ? 'No articles match that filter.' : 'New articles are on the way.'}</p>
              <p className="mt-2 text-slate-600">
                {q || category ? 'Try another search or browse all articles.' : 'In the meantime, see how we’ve grown real Amazon accounts.'}
              </p>
              <div className="mt-6">
                {q || category ? (
                  <button type="button" onClick={() => setParams(new URLSearchParams())} className="font-bold text-brandblue hover:underline">
                    Show all articles
                  </button>
                ) : (
                  <YellowButton to="/results" size="md">See Our Results</YellowButton>
                )}
              </div>
            </div>
          ) : (
            <>
              {showFeatured && <div className="mb-8"><PostCard post={featured} featured /></div>}
              {gridPosts.length > 0 && (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {gridPosts.map((p) => <PostCard key={p.id} post={p} />)}
                </div>
              )}
              {state.meta && state.meta.last_page > 1 && (
                <nav className="mt-10 flex items-center justify-center gap-3" aria-label="Pagination">
                  <button
                    type="button"
                    disabled={page <= 1}
                    onClick={() => update({ page: String(page - 1) })}
                    className="rounded-lg border border-slate-300 bg-white px-4 py-2 font-semibold text-navy disabled:opacity-40"
                  >
                    Previous
                  </button>
                  <span className="text-sm text-slate-600">Page {page} of {state.meta.last_page}</span>
                  <button
                    type="button"
                    disabled={page >= state.meta.last_page}
                    onClick={() => update({ page: String(page + 1) })}
                    className="rounded-lg border border-slate-300 bg-white px-4 py-2 font-semibold text-navy disabled:opacity-40"
                  >
                    Next
                  </button>
                </nav>
              )}
            </>
          )}
        </Container>
      </section>

      <CtaBand
        eyebrow="Ready to improve your Amazon account?"
        title={<>Get a Free <Hl>Amazon Account Audit</Hl></>}
        body="We’ll review your account and share actionable opportunities to lower ACoS and increase profitable sales."
        primary={<YellowButton to="/audit">Get a Free Account Audit</YellowButton>}
      />
    </SiteLayout>
  );
}
