import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  Save, Eye, Pencil, Bold, Italic, Heading2, Heading3, List, ListOrdered, Quote, Link2,
  Image as ImageIcon, Upload, X, Loader2, ExternalLink,
} from 'lucide-react';
import AdminShell, { adminPrimary, adminGhost, adminLabel, adminInput } from './AdminShell';
import BlogMarkdown from '@/components/site/BlogMarkdown';
import { adminGetPost, adminCreatePost, adminUpdatePost, adminGetPosts, uploadImage } from '../services/blogService';
import { useToast } from '../hooks/use-toast';

const EMPTY = {
  title: '', slug: '', excerpt: '', content: '', cover_image: '', cover_alt: '', category: '',
  tags: [], author: 'SellHive Team', status: 'draft', published_at: '', is_featured: false,
  meta_title: '', meta_description: '',
};

const slugify = (s) =>
  s.toLowerCase().normalize('NFKD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 120);

// "2026-10-05T14:30" for <input type="datetime-local">
const toLocalInput = (iso) => {
  if (!iso) return '';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '';
  const pad = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
};

function Counter({ value, max }) {
  const n = value?.length || 0;
  return <span className={`text-xs ${n > max ? 'text-red-600' : 'text-muted-foreground'}`}>{n}/{max}</span>;
}

function FieldError({ msg }) {
  return msg ? <p className="mt-1 text-xs text-red-600">{msg}</p> : null;
}

export default function BlogEditor() {
  const { id } = useParams();
  const isNew = !id || id === 'new';
  const navigate = useNavigate();
  const { toast } = useToast();
  const textRef = useRef(null);
  const inlineImgRef = useRef(null);

  const [post, setPost] = useState(EMPTY);
  const [tagsText, setTagsText] = useState('');
  const [slugTouched, setSlugTouched] = useState(false);
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(null); // 'cover' | 'inline'
  const [tab, setTab] = useState('write');
  const [errors, setErrors] = useState({});
  const [categories, setCategories] = useState([]);
  const [dirty, setDirty] = useState(false);

  useEffect(() => {
    adminGetPosts()
      .then((res) => setCategories([...new Set(res.data.map((p) => p.category).filter(Boolean))]))
      .catch(() => {});
    if (isNew) return;
    adminGetPost(id)
      .then((res) => {
        const p = { ...EMPTY, ...res.data };
        Object.keys(p).forEach((k) => p[k] === null && (p[k] = EMPTY[k] ?? ''));
        p.published_at = toLocalInput(res.data.published_at);
        setPost(p);
        setTagsText((p.tags || []).join(', '));
        setSlugTouched(true);
      })
      .catch(() => toast({ title: 'Post not found', variant: 'destructive' }))
      .finally(() => setLoading(false));
  }, [id]);

  // Warn before leaving with unsaved changes
  useEffect(() => {
    const fn = (e) => {
      if (dirty) {
        e.preventDefault();
        e.returnValue = '';
      }
    };
    window.addEventListener('beforeunload', fn);
    return () => window.removeEventListener('beforeunload', fn);
  }, [dirty]);

  const set = (field, value) => {
    setDirty(true);
    setPost((p) => {
      const next = { ...p, [field]: value };
      if (field === 'title' && !slugTouched) next.slug = slugify(value);
      return next;
    });
  };

  // --- Markdown toolbar helpers ---
  const wrap = (before, after = before, placeholder = 'text') => {
    const el = textRef.current;
    if (!el) return;
    const { selectionStart: s, selectionEnd: e, value } = el;
    const selected = value.slice(s, e) || placeholder;
    const next = value.slice(0, s) + before + selected + after + value.slice(e);
    set('content', next);
    requestAnimationFrame(() => {
      el.focus();
      el.setSelectionRange(s + before.length, s + before.length + selected.length);
    });
  };

  const linePrefix = (prefix) => {
    const el = textRef.current;
    if (!el) return;
    const { selectionStart: s, selectionEnd: e, value } = el;
    const lineStart = value.lastIndexOf('\n', s - 1) + 1;
    const block = value.slice(lineStart, e) || 'Text';
    const prefixed = block
      .split('\n')
      .map((l, i) => (prefix === '1. ' ? `${i + 1}. ` : prefix) + l)
      .join('\n');
    const next = value.slice(0, lineStart) + prefixed + value.slice(e);
    set('content', next);
    requestAnimationFrame(() => el.focus());
  };

  const insertAtCursor = (text) => {
    const el = textRef.current;
    const value = post.content || '';
    const s = el ? el.selectionStart : value.length;
    set('content', value.slice(0, s) + text + value.slice(s));
  };

  const doUpload = async (file, kind) => {
    if (!file) return null;
    if (file.size > 5 * 1024 * 1024) {
      toast({ title: 'Image too large', description: 'Use an image under 5 MB.', variant: 'destructive' });
      return null;
    }
    setUploading(kind);
    try {
      const res = await uploadImage(file);
      return res.data.url;
    } catch (err) {
      const msg = err?.response?.data?.errors?.file?.[0] || 'Upload failed. Try a JPG, PNG or WebP under 5 MB.';
      toast({ title: 'Upload failed', description: msg, variant: 'destructive' });
      return null;
    } finally {
      setUploading(null);
    }
  };

  const onCover = async (e) => {
    const url = await doUpload(e.target.files?.[0], 'cover');
    e.target.value = '';
    if (url) set('cover_image', url);
  };

  const onInlineImage = async (e) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    const url = await doUpload(file, 'inline');
    if (url) insertAtCursor(`\n![${(file?.name || 'image').replace(/\.[^.]+$/, '')}](${url})\n`);
  };

  const save = async (statusOverride) => {
    const status = statusOverride || post.status;
    const tags = tagsText.split(',').map((t) => t.trim()).filter(Boolean);
    const payload = {
      ...post,
      status,
      tags,
      slug: post.slug || undefined,
      published_at: post.published_at ? new Date(post.published_at).toISOString() : null,
    };
    if (!payload.title.trim()) {
      setErrors({ title: 'Add a title before saving.' });
      return;
    }
    setSaving(true);
    setErrors({});
    try {
      const res = isNew ? await adminCreatePost(payload) : await adminUpdatePost(id, payload);
      const saved = res.data.post;
      setDirty(false);
      setPost((p) => ({ ...p, status: saved.status, slug: saved.slug, published_at: toLocalInput(saved.published_at) }));
      toast({ title: status === 'published' ? 'Post published' : 'Draft saved' });
      if (isNew) navigate(`/admin/blog/${saved.id}`, { replace: true });
    } catch (err) {
      if (err?.response?.status === 422) {
        const e = {};
        Object.entries(err.response.data.errors || {}).forEach(([k, v]) => (e[k] = v[0]));
        setErrors(e);
        toast({ title: 'Fix the highlighted fields', variant: 'destructive' });
      } else {
        toast({ title: 'Save failed', description: 'Check your connection and try again.', variant: 'destructive' });
      }
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <AdminShell title="Edit Post" back="/admin/blog"><div className="text-center py-20 text-muted-foreground">Loading post...</div></AdminShell>;
  }

  const tools = [
    { icon: Heading2, label: 'Heading 2', fn: () => linePrefix('## ') },
    { icon: Heading3, label: 'Heading 3', fn: () => linePrefix('### ') },
    { icon: Bold, label: 'Bold', fn: () => wrap('**') },
    { icon: Italic, label: 'Italic', fn: () => wrap('_') },
    { icon: List, label: 'Bulleted list', fn: () => linePrefix('- ') },
    { icon: ListOrdered, label: 'Numbered list', fn: () => linePrefix('1. ') },
    { icon: Quote, label: 'Quote', fn: () => linePrefix('> ') },
    { icon: Link2, label: 'Link', fn: () => wrap('[', '](https://)', 'link text') },
  ];

  const isPublished = post.status === 'published';

  return (
    <AdminShell
      title={isNew ? 'New Post' : 'Edit Post'}
      back="/admin/blog"
      actions={
        <>
          {!isNew && isPublished && (
            <a href={`/blog/${post.slug}`} target="_blank" rel="noopener noreferrer" className={adminGhost}>
              <ExternalLink size={14} /> View
            </a>
          )}
          <button type="button" disabled={saving} onClick={() => save('draft')} className={adminGhost}>
            {isPublished ? 'Unpublish' : 'Save draft'}
          </button>
          <button type="button" disabled={saving} onClick={() => save('published')} className={adminPrimary}>
            {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
            {isPublished ? 'Update' : 'Publish'}
          </button>
        </>
      }
    >
      <div className="grid lg:grid-cols-[1fr_340px] gap-6 items-start">
        {/* Main column */}
        <div className="space-y-5">
          <div className="bg-white rounded-2xl border border-border p-5 space-y-4">
            <div>
              <label htmlFor="title" className={adminLabel}>Title *</label>
              <input id="title" value={post.title} onChange={(e) => set('title', e.target.value)} className={`${adminInput} text-lg font-semibold`} placeholder="e.g. How to lower ACOS without losing sales" />
              <FieldError msg={errors.title} />
            </div>
            <div>
              <label htmlFor="slug" className={adminLabel}>URL slug</label>
              <div className="flex items-center rounded-xl border border-input bg-gray-50 pl-3 text-sm">
                <span className="text-muted-foreground whitespace-nowrap">sellhive.net/blog/</span>
                <input
                  id="slug"
                  value={post.slug}
                  onChange={(e) => {
                    setSlugTouched(true);
                    set('slug', slugify(e.target.value));
                  }}
                  className="flex-1 min-w-0 bg-white rounded-r-xl px-2 py-2 focus:outline-none"
                />
              </div>
              <FieldError msg={errors.slug} />
            </div>
            <div>
              <div className="flex justify-between">
                <label htmlFor="excerpt" className={adminLabel}>Excerpt (shown on cards and under the title)</label>
                <Counter value={post.excerpt} max={600} />
              </div>
              <textarea id="excerpt" rows={2} value={post.excerpt} onChange={(e) => set('excerpt', e.target.value)} className={adminInput} />
              <FieldError msg={errors.excerpt} />
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-border overflow-hidden">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border px-3 py-2 bg-gray-50">
              <div className="flex gap-1" role="tablist" aria-label="Editor mode">
                {[
                  { k: 'write', label: 'Write', icon: Pencil },
                  { k: 'preview', label: 'Preview', icon: Eye },
                ].map(({ k, label, icon: Icon }) => (
                  <button
                    key={k}
                    type="button"
                    role="tab"
                    aria-selected={tab === k}
                    onClick={() => setTab(k)}
                    className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-semibold ${tab === k ? 'bg-white shadow-sm' : 'text-muted-foreground'}`}
                  >
                    <Icon size={14} /> {label}
                  </button>
                ))}
              </div>
              {tab === 'write' && (
                <div className="flex flex-wrap gap-0.5">
                  {tools.map(({ icon: Icon, label, fn }) => (
                    <button key={label} type="button" onClick={fn} title={label} aria-label={label} className="p-2 rounded-lg hover:bg-white">
                      <Icon size={16} />
                    </button>
                  ))}
                  <button
                    type="button"
                    onClick={() => inlineImgRef.current?.click()}
                    title="Insert image"
                    aria-label="Insert image"
                    className="p-2 rounded-lg hover:bg-white"
                    disabled={uploading === 'inline'}
                  >
                    {uploading === 'inline' ? <Loader2 size={16} className="animate-spin" /> : <ImageIcon size={16} />}
                  </button>
                  <input ref={inlineImgRef} type="file" accept="image/png,image/jpeg,image/webp,image/gif" className="hidden" onChange={onInlineImage} />
                </div>
              )}
            </div>
            {tab === 'write' ? (
              <textarea
                ref={textRef}
                value={post.content}
                onChange={(e) => set('content', e.target.value)}
                rows={24}
                aria-label="Article content (Markdown)"
                placeholder={'Write in Markdown.\n\n## A section heading\n\nA paragraph with **bold** text and a [link](https://sellhive.net).\n\n- A bullet point'}
                className="w-full px-5 py-4 font-mono text-[14px] leading-7 focus:outline-none resize-y min-h-[480px]"
              />
            ) : (
              <div className="px-6 py-6 min-h-[480px]">
                {post.content ? <BlogMarkdown>{post.content}</BlogMarkdown> : <p className="text-muted-foreground">Nothing to preview yet.</p>}
              </div>
            )}
            <p className="border-t border-border px-4 py-2 text-xs text-muted-foreground">
              Markdown supported: ## headings, **bold**, _italic_, lists, &gt; quotes, [links](url), tables and images.
            </p>
          </div>
        </div>

        {/* Sidebar */}
        <aside className="space-y-5 lg:sticky lg:top-24">
          <div className="bg-white rounded-2xl border border-border p-5 space-y-4">
            <h2 className="font-bold">Publishing</h2>
            <div>
              <span className={adminLabel}>Status</span>
              <span className={`inline-block px-2.5 py-1 rounded-full border text-xs font-semibold capitalize ${isPublished ? 'bg-green-50 text-green-700 border-green-200' : 'bg-gray-50 text-gray-600 border-gray-200'}`}>
                {post.status}
              </span>
            </div>
            <div>
              <label htmlFor="published_at" className={adminLabel}>Publish date</label>
              <input id="published_at" type="datetime-local" value={post.published_at} onChange={(e) => set('published_at', e.target.value)} className={adminInput} />
              <p className="mt-1 text-xs text-muted-foreground">Leave empty to publish now. A future date schedules the post.</p>
            </div>
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={!!post.is_featured} onChange={(e) => set('is_featured', e.target.checked)} className="h-4 w-4 accent-[hsl(16,80%,52%)]" />
              Feature this post at the top of the blog
            </label>
            <div>
              <label htmlFor="author" className={adminLabel}>Author</label>
              <input id="author" value={post.author} onChange={(e) => set('author', e.target.value)} className={adminInput} />
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-border p-5 space-y-3">
            <h2 className="font-bold">Cover image</h2>
            {post.cover_image ? (
              <div className="relative">
                <img src={post.cover_image} alt="" className="w-full h-40 object-cover rounded-xl border border-border" />
                <button
                  type="button"
                  onClick={() => set('cover_image', '')}
                  className="absolute top-2 right-2 p-1.5 rounded-full bg-white/90 shadow hover:bg-white"
                  aria-label="Remove cover image"
                >
                  <X size={14} />
                </button>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center gap-2 h-36 rounded-xl border-2 border-dashed border-border text-sm text-muted-foreground cursor-pointer hover:bg-gray-50">
                {uploading === 'cover' ? <Loader2 size={20} className="animate-spin" /> : <Upload size={20} />}
                {uploading === 'cover' ? 'Uploading…' : 'Upload image (1200×630 recommended)'}
                <input type="file" accept="image/png,image/jpeg,image/webp,image/gif" className="sr-only" onChange={onCover} />
              </label>
            )}
            <div>
              <label htmlFor="cover_alt" className={adminLabel}>Image description (alt text)</label>
              <input id="cover_alt" value={post.cover_alt} onChange={(e) => set('cover_alt', e.target.value)} className={adminInput} placeholder="Describe the image for screen readers" />
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-border p-5 space-y-4">
            <h2 className="font-bold">Organize</h2>
            <div>
              <label htmlFor="category" className={adminLabel}>Category</label>
              <input id="category" list="blog-categories" value={post.category} onChange={(e) => set('category', e.target.value)} className={adminInput} placeholder="e.g. Amazon PPC" />
              <datalist id="blog-categories">
                {categories.map((c) => <option key={c} value={c} />)}
              </datalist>
            </div>
            <div>
              <label htmlFor="tags" className={adminLabel}>Tags (comma separated)</label>
              <input id="tags" value={tagsText} onChange={(e) => { setTagsText(e.target.value); setDirty(true); }} className={adminInput} placeholder="ppc, acos, listings" />
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-border p-5 space-y-4">
            <h2 className="font-bold">SEO</h2>
            <div>
              <div className="flex justify-between">
                <label htmlFor="meta_title" className={adminLabel}>Meta title</label>
                <Counter value={post.meta_title} max={60} />
              </div>
              <input id="meta_title" value={post.meta_title} onChange={(e) => set('meta_title', e.target.value)} className={adminInput} placeholder={post.title || 'Defaults to the post title'} />
            </div>
            <div>
              <div className="flex justify-between">
                <label htmlFor="meta_description" className={adminLabel}>Meta description</label>
                <Counter value={post.meta_description} max={160} />
              </div>
              <textarea id="meta_description" rows={3} value={post.meta_description} onChange={(e) => set('meta_description', e.target.value)} className={adminInput} placeholder="Defaults to the excerpt" />
              <FieldError msg={errors.meta_description} />
            </div>
            <div className="rounded-xl bg-gray-50 p-3 text-sm">
              <p className="text-[#1a0dab] font-medium truncate">{post.meta_title || post.title || 'Post title'} | SellHive</p>
              <p className="text-green-700 text-xs truncate">sellhive.net/blog/{post.slug || 'post-url'}</p>
              <p className="text-muted-foreground text-xs line-clamp-2">{post.meta_description || post.excerpt || 'Your description will appear here in search results.'}</p>
            </div>
          </div>

          <Link to="/admin/blog" className="block text-center text-sm text-muted-foreground hover:underline">Back to all posts</Link>
        </aside>
      </div>
    </AdminShell>
  );
}
