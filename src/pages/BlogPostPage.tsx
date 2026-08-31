import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSanitize from "rehype-sanitize";
import { ArrowLeft, CalendarDays, Loader2 } from "lucide-react";
import SEO from "@/components/SEO";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import CTABanner from "@/components/CTABanner";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { formatPostDate } from "./BlogPage";

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  cover_image_url: string | null;
  content: string;
  published_at: string | null;
  created_at: string;
  author_name: string;
}

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    (async () => {
      const { data } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("slug", slug)
        .eq("published", true)
        .maybeSingle();
      setPost((data as BlogPost | null) ?? null);
      setLoading(false);
    })();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <SiteHeader />
        <main className="flex-1 flex items-center justify-center text-muted-foreground">
          <Loader2 className="h-5 w-5 animate-spin mr-2" /> Loading article…
        </main>
        <SiteFooter />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col">
        <SEO title="Article not found — Smart Defibs LTD" description="This article could not be found." path={`/blog/${slug ?? ""}`} />
        <SiteHeader />
        <main className="flex-1 section-padding">
          <div className="container mx-auto max-w-3xl text-center">
            <h1 className="font-heading font-extrabold text-3xl mb-4">Article not found</h1>
            <Button asChild>
              <Link to="/blog"><ArrowLeft className="h-4 w-4 mr-2" /> Back to blog</Link>
            </Button>
          </div>
        </main>
        <SiteFooter />
      </div>
    );
  }

  const date = post.published_at ?? post.created_at;

  return (
    <div className="min-h-screen flex flex-col">
      <SEO
        title={`${post.title} — Smart Defibs LTD`.slice(0, 60)}
        description={(post.excerpt ?? post.title).slice(0, 155)}
        path={`/blog/${post.slug}`}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: post.title,
          description: post.excerpt ?? undefined,
          datePublished: date,
          author: { "@type": "Organization", name: post.author_name },
          publisher: { "@type": "Organization", name: "Smart Defibs LTD" },
          mainEntityOfPage: `https://smartdefibs.com/blog/${post.slug}`,
        }}
      />
      <SiteHeader />
      <main className="flex-1">
        <article className="section-padding">
          <div className="container mx-auto max-w-3xl">
            <Link to="/blog" className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline mb-6">
              <ArrowLeft className="h-4 w-4" /> All articles
            </Link>
            <p className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-3">
              <CalendarDays className="h-3.5 w-3.5" /> {formatPostDate(date)} · {post.author_name}
            </p>
            <h1 className="font-heading font-extrabold text-3xl md:text-4xl text-foreground mb-5">{post.title}</h1>
            {post.excerpt && <p className="text-lg text-muted-foreground mb-8">{post.excerpt}</p>}
            {post.cover_image_url && (
              <img
                src={post.cover_image_url}
                alt={post.title}
                className="w-full rounded-2xl border border-border mb-10 object-cover"
              />
            )}
            <div className="prose prose-neutral dark:prose-invert max-w-none prose-headings:font-heading prose-headings:font-extrabold prose-a:text-primary">
              <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeSanitize]}>
                {post.content}
              </ReactMarkdown>
            </div>
          </div>
        </article>
        <CTABanner />
      </main>
      <SiteFooter />
    </div>
  );
}
