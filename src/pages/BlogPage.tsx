import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { CalendarDays, Loader2, Newspaper } from "lucide-react";
import SEO from "@/components/SEO";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import CTABanner from "@/components/CTABanner";
import { supabase } from "@/integrations/supabase/client";

export interface BlogPostListItem {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  cover_image_url: string | null;
  published_at: string | null;
  created_at: string;
  author_name: string;
}

export const formatPostDate = (value: string | null) => {
  if (!value) return "";
  return new Date(value).toLocaleDateString("en-IE", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPostListItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from("blog_posts")
        .select("id, slug, title, excerpt, cover_image_url, published_at, created_at, author_name")
        .eq("published", true)
        .order("published_at", { ascending: false, nullsFirst: false })
        .order("created_at", { ascending: false });
      setPosts((data as BlogPostListItem[] | null) ?? []);
      setLoading(false);
    })();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <SEO
        title="AED News & Insights — Smart Defibs LTD Blog"
        description="Practical guidance on defibrillators, CPR training and workplace readiness in Ireland, written by the Smart Defibs LTD team."
        path="/blog"
      />
      <SiteHeader />
      <main className="flex-1">
        <section className="bg-secondary section-padding-hero">
          <div className="container mx-auto">
            <div className="inline-flex items-center gap-2 bg-background/10 border border-accent/40 px-3 py-1.5 rounded-full mb-4">
              <Newspaper className="h-4 w-4 text-accent" />
              <span className="text-xs font-semibold uppercase tracking-wider text-secondary-foreground">Blog</span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-5xl text-secondary-foreground mb-3 sm:mb-4">
              AED news & <span className="text-accent">insights</span>
            </h1>
            <p className="text-base sm:text-lg text-secondary-foreground/70 max-w-2xl">
              Guidance on defibrillator readiness, CPR training and life-saving best practice across Ireland.
            </p>
          </div>
        </section>

        <section className="section-padding bg-surface-soft">
          <div className="container mx-auto max-w-6xl">
            {loading ? (
              <div className="flex items-center justify-center py-16 text-muted-foreground">
                <Loader2 className="h-5 w-5 animate-spin mr-2" /> Loading articles…
              </div>
            ) : posts.length === 0 ? (
              <div className="clinical-card p-10 text-center">
                <h2 className="font-heading font-extrabold text-xl mb-2">Articles coming soon</h2>
                <p className="text-muted-foreground text-sm">
                  We're working on our first posts. In the meantime, get in touch with any AED questions.
                </p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map((post, i) => (
                  <motion.article
                    key={post.id}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.06 }}
                    className="group flex flex-col bg-card border-2 border-border rounded-2xl overflow-hidden shadow-md hover:shadow-2xl hover:border-accent hover:-translate-y-1 transition-all duration-300"
                  >
                    <Link to={`/blog/${post.slug}`} className="flex flex-col flex-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                      {post.cover_image_url && (
                        <div className="aspect-[16/9] bg-muted overflow-hidden">
                          <img
                            src={post.cover_image_url}
                            alt={post.title}
                            loading="lazy"
                            className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                      )}
                      <div className="flex flex-col flex-1 p-6">
                        <p className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                          <CalendarDays className="h-3.5 w-3.5" />
                          {formatPostDate(post.published_at ?? post.created_at)}
                        </p>
                        <h2 className="font-heading font-extrabold text-xl text-card-foreground mb-2 group-hover:text-primary transition-colors">
                          {post.title}
                        </h2>
                        {post.excerpt && <p className="text-sm text-muted-foreground flex-1">{post.excerpt}</p>}
                        <span className="mt-4 text-sm font-semibold text-primary">Read article →</span>
                      </div>
                    </Link>
                  </motion.article>
                ))}
              </div>
            )}
          </div>
        </section>

        <CTABanner />
      </main>
      <SiteFooter />
    </div>
  );
}
