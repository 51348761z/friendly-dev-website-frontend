import { Link } from "react-router";
import type { Post } from "~/type";

type LatestPostsProp = {
  posts: Post[];
  limit?: number;
};

export const LatestPosts = ({ posts, limit = 3 }: LatestPostsProp) => {
  const latestPosts = [...posts]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit);

  return (
    <section className="mx-auto max-w-6xl px-6 py-12">
      <h2 className="mb-6 text-2xl font-bold text-white">🆕 Latest Posts</h2>

      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {latestPosts.map((post) => (
          <li key={post.slug} className="h-full">
            <Link
              to={`/posts/${post.documentId}`}
              className="flex h-full flex-col rounded-lg border border-gray-700 bg-gray-800 p-4 transition hover:shadow-md"
            >
              <h3 className="mb-1 text-lg font-semibold text-blue-400">
                {post.title}
              </h3>

              <p className="mb-auto text-sm text-gray-300">{post.excerpt}</p>
              <time
                dateTime={post.date}
                className="mt-3 block text-right text-xs text-gray-400"
              >
                {new Date(post.date).toDateString()}
              </time>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};
