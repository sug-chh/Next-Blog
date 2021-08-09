import matter from "gray-matter";
import Layout from "../../../components/Layout";
import Post from "../../../components/Post";
import { sortedPosts } from "../../../lib/posts";
import fs from "fs";
import path from "path";
import CategoryList from "../../../components/CategoryList";

export default function CategoryBlogPage({ posts, categories }) {

  return (
    <Layout title={`Devspace | ${posts[0].category}`}>
      <div className="flex justify-between">
        <div className="w-3/4">
          <h1 className="text-5xl border-b-4 p-5 font-bold">
            {posts[0].category}
          </h1>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {posts.map((post, index) => (
              <Post key={index} post={post} />
            ))}
          </div>
        </div>
        <div className="w-1/4">
          <CategoryList categories={categories} />
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticPaths() {
  const files = fs.readdirSync(path.join("posts"));
  const categories_paths = files.map((filename) => {
    const markdownWithMeta = fs.readFileSync(
      path.join("posts", filename),
      "utf-8"
    );
    const { data: frontmatter } = matter(markdownWithMeta);
    return {
      params: { category_name: frontmatter.category.toLowerCase() },
    };
  });

  return {
    paths: categories_paths,
    fallback: false,
  };
}

export async function getStaticProps({ params: { category_name } }) {
  const posts = sortedPosts();

  // Get categories for sidebar
  const categories = posts.map((post) => post.category);

  const uniqueCategories = [...new Set(categories)];

  // Filter posts by catetory

  const categoryPosts = posts.filter(
    (post) => post.category.toLowerCase() === category_name
  );

  return {
    props: {
      posts: categoryPosts,
      categories: uniqueCategories,
    },
  };
}
