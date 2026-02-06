import { useState } from "react";
import { Pagination } from "~/components/Pagination";
import { PostCard } from "~/components/PostCard";
import { PostFilter } from "~/components/PostFilter";
import { fetchPosts } from "~/services/posts";
import type { Post } from "~/type";
import type { Route } from "./+types/index";

export async function loader({}: Route.LoaderArgs) {
  const posts = await fetchPosts({ sort: "date:desc" });
  return posts satisfies Post[];
}

const BlogPage = ({ loaderData: posts }: Route.ComponentProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const filterPosts = posts.filter((p) => {
    const query = searchQuery.toLowerCase();
    return (
      p.title.toLowerCase().includes(query) ||
      p.excerpt.toLowerCase().includes(query) ||
      new Date(p.date).toDateString().toLowerCase().includes(query)
    );
  });

  const postsPerPage = 3;
  const totalPages = Math.ceil(filterPosts.length / postsPerPage);
  // Calculate current page posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const postsOfCurrentPage = filterPosts.slice(
    indexOfFirstPost,
    indexOfLastPost,
  );

  return (
    <div className="mx-auto mt-10 max-w-3xl bg-gray-900 px-6 py-6">
      <h2 className="mb-8 text-3xl font-bold text-white">📝 Blog</h2>

      <PostFilter
        searchQuery={searchQuery}
        onSearchChange={(query) => {
          setSearchQuery(query);
          setCurrentPage(1); // Reset to first page on search
        }}
      ></PostFilter>

      <ul>
        {postsOfCurrentPage.length > 0 ? (
          postsOfCurrentPage.map((post) => (
            <li key={post.slug} className="mb-4">
              <PostCard post={post} />
            </li>
          ))
        ) : (
          <p className="m-10 text-center text-gray-400">No posts found</p>
        )}
      </ul>

      {totalPages > 1 && (
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
};

export default BlogPage;
