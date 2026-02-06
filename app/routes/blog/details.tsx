import ReactMarkdown from "react-markdown";
import { Link } from "react-router";
import { API_ENDPOINTS } from "~/config/api";
import type { StrapiPostAttributes } from "~/type";
import type { Route } from "./+types/details";

export const loader = async ({ request, params }: Route.LoaderArgs) => {
  const { slug } = params;
  const res = await fetch(`${API_ENDPOINTS.post(slug)}?populate=*`);

  if (!res.ok) {
    throw new Response("Failed to fetch blog posts", { status: res.status });
  }

  const { data }: { data: StrapiPostAttributes } = await res.json();
  const post = {
    id: data.id,
    documentId: data.documentId,
    slug: data.slug,
    title: data.title,
    body: data.body,
    excerpt: data.excerpt,
    date: data.date,
    image: data.image?.url ? data.image.url : "/images/no-image.png",
  };

  return post;
};

const BlogPostDetailsPage = ({ loaderData: post }: Route.ComponentProps) => {
  return (
    <div className="mx-auto max-w-3xl bg-gray-900 px-6 py-12">
      <h1 className="mb-2 text-3xl font-bold text-blue-400">{post.title}</h1>
      <time className="mb-6 block text-sm text-gray-400" dateTime={post.date}>
        {new Date(post.date).toDateString()}
      </time>

      <img
        src={post.image}
        alt={post.title}
        className="mb-6 h-64 w-full rounded-md object-cover"
      />

      <div className="prose prose-invert mb-12 max-w-none">
        <ReactMarkdown>{post.body}</ReactMarkdown>
      </div>

      <Link
        to="/blog"
        className="inline-block rounded-lg bg-blue-600 px-6 py-2 text-white transition hover:bg-blue-700"
      >
        👈 Back to Blog
      </Link>
    </div>
  );
};

export default BlogPostDetailsPage;
