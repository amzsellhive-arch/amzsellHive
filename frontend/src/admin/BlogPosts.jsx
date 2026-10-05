import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Pencil, Trash2, ExternalLink, Search, FileText, Star } from 'lucide-react';
import AdminShell, { adminPrimary, adminInput } from './AdminShell';
import { adminGetPosts, adminDeletePost } from '../services/blogService';
import { useToast } from '../hooks/use-toast';
import { formatDate } from '../lib/format';

const STATUS = {
  published: 'bg-green-50 text-green-700 border-green-200',
  draft: 'bg-gray-50 text-gray-600 border-gray-200',
  scheduled: 'bg-blue-50 text-blue-700 border-blue-200',
};

const statusOf = (p) =>
  p.status === 'published' && p.published_at && new Date(p.published_at) > new Date() ? 'scheduled' : p.status;

export default function BlogPosts() {
  const { toast } = useToast();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [q, setQ] = useState('');

  useEffect(() => {
    adminGetPosts()
      .then((res) => setPosts(res.data))
      .catch(() => toast({ title: 'Failed to load posts', description: 'Check that the backend is running and migrated.', variant: 'destructive' }))
      .finally(() => setLoading(false));
  }, []);

  const visible = useMemo(
    () =>
      posts.filter(
        (p) =>
          (filter === 'all' || statusOf(p) === filter) &&
          (!q || p.title.toLowerCase().includes(q.toLowerCase()))
      ),
    [posts, filter, q]
  );

  const handleDelete = async (p) => {
    if (!confirm(`Delete "${p.title}"? This cannot be undone.`)) return;
    try {
      await adminDeletePost(p.id);
      setPosts((prev) => prev.filter((x) => x.id !== p.id));
      toast({ title: 'Post deleted' });
    } catch {
      toast({ title: 'Failed to delete post', variant: 'destructive' });
    }
  };

  const counts = {
    all: posts.length,
    published: posts.filter((p) => statusOf(p) === 'published').length,
    scheduled: posts.filter((p) => statusOf(p) === 'scheduled').length,
    draft: posts.filter((p) => statusOf(p) === 'draft').length,
  };

  return (
    <AdminShell
      title="Blog Posts"
      actions={
        <Link to="/admin/blog/new" className={adminPrimary}>
          <Plus size={15} /> New Post
        </Link>
      }
    >
      <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between mb-6">
        <div className="flex flex-wrap gap-2">
          {['all', 'published', 'scheduled', 'draft'].map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              className={`rounded-full px-3.5 py-1.5 text-sm font-semibold border capitalize ${
                filter === f ? 'bg-[hsl(16,80%,52%)] text-white border-transparent' : 'bg-white border-border text-muted-foreground'
              }`}
            >
              {f} ({counts[f]})
            </button>
          ))}
        </div>
        <div className="relative sm:w-72">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search by title" className={`${adminInput} pl-9`} aria-label="Search posts" />
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-border overflow-hidden">
        {loading ? (
          <div className="text-center py-20 text-muted-foreground">Loading posts...</div>
        ) : visible.length === 0 ? (
          <div className="text-center py-20">
            <FileText size={36} className="mx-auto text-muted-foreground" />
            <p className="mt-3 font-semibold">{posts.length ? 'No posts match this filter.' : 'No posts yet.'}</p>
            {!posts.length && (
              <Link to="/admin/blog/new" className={`${adminPrimary} mt-4`}>
                <Plus size={15} /> Write your first post
              </Link>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-gray-50 text-left">
                  <th className="px-5 py-3 font-semibold">Title</th>
                  <th className="px-5 py-3 font-semibold">Category</th>
                  <th className="px-5 py-3 font-semibold">Status</th>
                  <th className="px-5 py-3 font-semibold">Published</th>
                  <th className="px-5 py-3 font-semibold">Updated</th>
                  <th className="px-5 py-3 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {visible.map((p) => {
                  const st = statusOf(p);
                  return (
                    <tr key={p.id} className="border-b border-border/50 hover:bg-gray-50">
                      <td className="px-5 py-4">
                        <Link to={`/admin/blog/${p.id}`} className="font-medium hover:text-[hsl(16,80%,52%)] flex items-center gap-1.5">
                          {p.is_featured && <Star size={13} className="text-amber-500 fill-amber-400 shrink-0" aria-label="Featured" />}
                          {p.title}
                        </Link>
                        <div className="text-xs text-muted-foreground">/blog/{p.slug}</div>
                      </td>
                      <td className="px-5 py-4 text-muted-foreground">{p.category || '—'}</td>
                      <td className="px-5 py-4">
                        <span className={`inline-block px-2.5 py-1 rounded-full border text-xs font-semibold capitalize ${STATUS[st]}`}>{st}</span>
                      </td>
                      <td className="px-5 py-4 text-xs text-muted-foreground">{formatDate(p.published_at) || '—'}</td>
                      <td className="px-5 py-4 text-xs text-muted-foreground">{formatDate(p.updated_at)}</td>
                      <td className="px-5 py-4">
                        <div className="flex justify-end gap-1">
                          {st === 'published' && (
                            <a href={`/blog/${p.slug}`} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg hover:bg-gray-100" aria-label="View on site">
                              <ExternalLink size={15} />
                            </a>
                          )}
                          <Link to={`/admin/blog/${p.id}`} className="p-2 rounded-lg hover:bg-gray-100" aria-label="Edit">
                            <Pencil size={15} />
                          </Link>
                          <button type="button" onClick={() => handleDelete(p)} className="p-2 rounded-lg text-red-600 hover:bg-red-50" aria-label="Delete">
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AdminShell>
  );
}
