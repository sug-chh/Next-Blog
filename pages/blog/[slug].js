import fs from "fs";
import path from "path";
import Link from "next/link";
import Layout from "../../components/Layout";
import CategoryLabel from "../../components/CategoryLabel";
import marked from "marked";

import matter from "gray-matter";

export default function PostPage({ post }) {

  return (
    <Layout description={post.excerpt} title={post.title}>
      <Link href="/blog">
        <a className=" border-2 p-1">Go Back</a>
      </Link>
      <div className="w-full px-10 py-6 bg-white rounded-lg shadow-md mt-6">
        <img
          width={1000}
          height={580}
          src={post.cover_image}
          className="rounded-md"
          alt={post.title}
        />
        <div className="flex justify-between items-center mt-4">
          <h1 className="text-5xl mb-7 mt-5">{post.title}</h1>
          <CategoryLabel>{post.category}</CategoryLabel>
        </div>
        <div className="flex justify-between items-center bg-gray-100 p-2 my-8">
          <div className="flex items-center">
            <img
              className="mx-4 w-10 h-10  object-cover rounded-full hidden sm:block"
              src={post.author_image}
              alt={post.title}
            />
            <h4>{post.author}</h4>
          </div>
          <div className="mr-4">{post.date}</div>
        </div>
        <div className="blog-text mt-2">
          <div dangerouslySetInnerHTML={{ __html: marked(post.content) }}></div>
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticPaths() {
  const files = fs.readdirSync(path.join("posts"));
  const paths = files.map((filename) => {
    return {
      params: {
        slug: filename.replace(".md", ""),
      },
    };
  });

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params: { slug } }) {
  const markdownWithMeta = fs.readFileSync(
    path.join("posts", slug + ".md"),
    "utf-8"
  );

  const { data: frontmatter, content } = matter(markdownWithMeta);

  return {
    props: {
      post: {
        ...frontmatter,
        content,
        slug,
      },
    },
  };
}
