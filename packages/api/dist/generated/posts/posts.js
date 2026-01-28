import {
  customInstance
} from "../mutator.js";

// generated/posts/posts.ts
var getPosts = () => {
  const postsGetPostBySlug = (slug, options) => {
    return customInstance({
      url: `/api/post/${slug}`,
      method: "GET"
    }, options);
  };
  const postsListPosts = (params, options) => {
    return customInstance({
      url: `/api/posts`,
      method: "GET",
      params
    }, options);
  };
  return { postsGetPostBySlug, postsListPosts };
};
export {
  getPosts
};

export { getPosts };
