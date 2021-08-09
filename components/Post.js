import Link from "next/link";

import CategoryLabel from "./CategoryLabel";
export default function Post({ post, compact }) {
  return (
    <div className="w-full px-10  py-6 bg-white rounded-lg shadow-md mt-6">
      {!compact && (
        <img
          src={post.cover_image}
          alt={post.title}
          height={420}
          width={600}
          className="mb-3 rounded"
        />
      )}

      <div className="flex justify-between items-center">
        <span className="font-light text-gray-600">{post.date}</span>
        <CategoryLabel>{post.category}</CategoryLabel>
      </div>
      <div className="mt-2">
        <Link href={`/blog/${post.slug}`}>
          <a className="text-xl text-gray-700 font-bold hover:underline">
            {post.title}
          </a>
        </Link>
        <p className="mt-2 text-gray-600">{post.excerpt}</p>
      </div>
      {!compact &&
        <div className="flex justify-between items-center mt-6">
          <Link href={`/blog/${post.slug}`}>
            <a className="text-gray-900 hover:text-blue-600">Read More</a>
          </Link>
          <div className="flex items-center">
            <img
              className="mx-1 object-cover w-10 h-10 rounded-full hidden sm:block"
              width={30}
              height={30}
              src={post.author_image}
              alt={post.title}
            />
            <h3 className="text-gray-700">{post.author}</h3>
          </div>
        </div>
      }
    </div>
  );
}
