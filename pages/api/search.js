// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import fs from "fs";
import matter from "gray-matter";
import path from "path";
import { sortedPosts } from "../../lib/posts";

export default function handler(req, res) {
  let posts;
  if (process.env.NODE_ENV === "production") {
  } else {
    posts = sortedPosts();
  }
  const results = posts.filter(
    (post) =>
      post.title.toLowerCase().indexOf(req.query.q) != -1 ||
      post.excerpt.toLowerCase().indexOf(req.query.q) != -1 ||
      post.category.toLowerCase().indexOf(req.query.q) != -1
  );

  res.status(200).json(JSON.stringify({ results }));
}
