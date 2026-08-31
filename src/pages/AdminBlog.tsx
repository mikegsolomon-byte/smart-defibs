import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Loader2, Plus, Save, Trash2, PenLine, ExternalLink } from "lucide-react";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface Post {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  cover_image_url: string | null;
  content: string;
  published: boolean;
  published_at: string | null;
  author_name: string;
  created_at: string;
}

type Draft = Omit<Post, "id" | "created_at" | "published_at"> & { id?: string };

const emptyDraft: Draft = {
  slug: "",
  title: "",
  excerpt: "",
  cover_image_url: "",
  content: "",
  published: false,
  author_name: "Smart Defibs LTD",
};

const slugify = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 80);

export default function AdminBlog() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [draft, setDraft] = useState<Draft>(emptyDraft);

  const load = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) toast.error("Could not load articles");
    setPosts((data as Post[] | null) ?? []);
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const save = async () => {
    if (!draft.title.trim() || !draft.content.trim()) {
      toast.error("Add a title and some content first");
      return;
    }
    setSaving(true);
    const slug = draft.slug.trim() ? slugify(draft.slug) : slugify(draft.title);
    const payload = {
      slug,
      title: draft.title.trim(),
      excerpt: draft.excerpt?.trim() || null,
      cover_image_url: draft.cover_image_url?.trim() || null,
      content: draft.content,
      published: draft.published,
      author_name: draft.author_name.trim() || "Smart Defibs LTD",
      published_at: draft.published ? new Date().toISOString() : null,
    };

    const { error } = draft.id
      ? await supabase.from("blog_posts").update(payload).eq("id", draft.id)
      : await supabase.from("blog_posts").insert(payload);

    setSaving(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success(draft.id ? "Article updated" : "Article created");
    setDraft(emptyDraft);
    load();
  };

  const togglePublished = async (post: Post) => {
    const { error } = await supabase
      .from("blog_posts")
      .update({
        published: !post.published,
        published_at: !post.published ? new Date().toISOString() : null,
      })
      .eq("id", post.id);
    if (error) toast.error(error.message);
    else load();
  };

  const remove = async (post: Post) => {
    if (!window.confirm(`Delete "${post.title}"? This cannot be undone.`)) return;
    const { error } = await supabase.from("blog_posts").delete().eq("id", post.id);
    if (error) toast.error(error.message);
    else {
      toast.success("Article deleted");
      if (draft.id === post.id) setDraft(emptyDraft);
      load();
    }
  };

  return (
    <div className="min-h-screen bg-surface-soft">
      <SEO title="Blog admin — Smart Defibs LTD" description="Write and publish Smart Defibs articles." path="/admin/blog" />
      <header className="bg-secondary text-secondary-foreground">
        <div className="container mx-auto py-6 flex items-center justify-between gap-4">
          <div>
            <h1 className="font-heading font-extrabold text-2xl">Blog admin</h1>
            <p className="text-sm text-secondary-foreground/70">Write, edit and publish articles.</p>
          </div>
          <Button asChild variant="outline" size="sm" className="bg-transparent border-accent/40 text-secondary-foreground hover:bg-accent/10">
            <Link to="/blog"><ExternalLink className="h-4 w-4 mr-1.5" /> View blog</Link>
          </Button>
        </div>
      </header>

      <main className="container mx-auto py-8 grid lg:grid-cols-[1.4fr_1fr] gap-8 items-start">
        <section className="clinical-card p-6">
          <h2 className="font-heading font-extrabold text-xl mb-5 flex items-center gap-2">
            {draft.id ? <PenLine className="h-5 w-5 text-primary" /> : <Plus className="h-5 w-5 text-primary" />}
            {draft.id ? "Edit article" : "New article"}
          </h2>

          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input id="title" value={draft.title} onChange={(e) => setDraft({ ...draft, title: e.target.value })} placeholder="Why every gym needs an AED" />
            </div>
            <div>
              <Label htmlFor="slug">URL slug (optional)</Label>
              <Input id="slug" value={draft.slug} onChange={(e) => setDraft({ ...draft, slug: e.target.value })} placeholder="auto-generated from the title" />
            </div>
            <div>
              <Label htmlFor="excerpt">Short summary</Label>
              <Textarea id="excerpt" rows={2} value={draft.excerpt ?? ""} onChange={(e) => setDraft({ ...draft, excerpt: e.target.value })} placeholder="One or two sentences shown on the blog list and in search results." />
            </div>
            <div>
              <Label htmlFor="cover">Cover image URL (optional)</Label>
              <Input id="cover" value={draft.cover_image_url ?? ""} onChange={(e) => setDraft({ ...draft, cover_image_url: e.target.value })} placeholder="https://…" />
            </div>
            <div>
              <Label htmlFor="author">Author</Label>
              <Input id="author" value={draft.author_name} onChange={(e) => setDraft({ ...draft, author_name: e.target.value })} />
            </div>
            <div>
              <Label htmlFor="content">Content (Markdown supported)</Label>
              <Textarea id="content" rows={16} className="font-mono text-sm" value={draft.content} onChange={(e) => setDraft({ ...draft, content: e.target.value })} placeholder={"## Heading\n\nWrite your article here. **Bold**, _italic_, lists and links all work."} />
            </div>
            <div className="flex items-center justify-between gap-4 pt-2 border-t border-border">
              <div className="flex items-center gap-3">
                <Switch id="published" checked={draft.published} onCheckedChange={(v) => setDraft({ ...draft, published: v })} />
                <Label htmlFor="published" className="cursor-pointer">Publish immediately</Label>
              </div>
              <div className="flex gap-2">
                {draft.id && (
                  <Button variant="outline" onClick={() => setDraft(emptyDraft)}>Cancel</Button>
                )}
                <Button onClick={save} disabled={saving} className="font-bold">
                  {saving ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
                  {draft.id ? "Save changes" : "Create article"}
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="clinical-card p-6">
          <h2 className="font-heading font-extrabold text-xl mb-5">Articles</h2>
          {loading ? (
            <div className="flex items-center text-muted-foreground text-sm"><Loader2 className="h-4 w-4 animate-spin mr-2" /> Loading…</div>
          ) : posts.length === 0 ? (
            <p className="text-sm text-muted-foreground">No articles yet — create your first one.</p>
          ) : (
            <ul className="space-y-3">
              {posts.map((post) => (
                <li key={post.id} className="border border-border rounded-xl p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="font-heading font-bold text-sm truncate">{post.title}</p>
                      <p className="text-xs text-muted-foreground truncate">/blog/{post.slug}</p>
                    </div>
                    <Badge variant="outline" className={post.published ? "border-primary/20 bg-primary/10 text-primary" : "text-muted-foreground"}>
                      {post.published ? "Live" : "Draft"}
                    </Badge>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-3">
                    <Button size="sm" variant="outline" onClick={() => setDraft({ ...post })}>
                      <PenLine className="h-3.5 w-3.5 mr-1.5" /> Edit
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => togglePublished(post)}>
                      {post.published ? "Unpublish" : "Publish"}
                    </Button>
                    <Button size="sm" variant="ghost" className="text-destructive hover:text-destructive" onClick={() => remove(post)}>
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>
    </div>
  );
}
