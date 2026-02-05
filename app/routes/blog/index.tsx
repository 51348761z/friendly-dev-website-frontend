import { PostCard } from "~/components/PostCard";
import type { Route } from "./+types/index";

export async function loader({ request }: Route.LoaderArgs) {
  const url = new URL("posts-meta.json", request.url);
  const res = await fetch(url);
  if (!res.ok) {
    throw new Response("Failed to fetch blog posts", { status: res.status });
  }

  const data: PostMeta[] = await res.json();
  return data;
}

const BlogPage = ({ loaderData: posts }: Route.ComponentProps) => {
  return (
    <div className="mx-auto mt-10 max-w-3xl bg-gray-900 px-6 py-6">
      <h2 className="mb-8 text-3xl font-bold text-white">📝 Blog</h2>

      <ul>
        {posts.map((post) => (
          <li key={post.slug} className="mb-4">
            <PostCard post={post} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BlogPage;
