import {
  getPortfolios
} from "../generated/portfolios/portfolios.js";
import {
  getPosts
} from "../generated/posts/posts.js";
import {
  customInstance
} from "../generated/mutator.js";

// src/clients/posts.ts
var postsClient = getPosts();
var listPosts = (params) => {
  return postsClient.postsListPosts(params);
};
var getPostBySlug = (slug) => {
  return postsClient.postsGetPostBySlug(slug);
};
var posts = {
  list: listPosts,
  getBySlug: getPostBySlug
};
// src/clients/portfolios.ts
var portfoliosClient = getPortfolios();
var listPortfolios = (params) => {
  return portfoliosClient.portfoliosListPortfolios(params);
};
var getPortfolioBySlug = (slug) => {
  return portfoliosClient.portfoliosGetPortfolioBySlug(slug);
};
var portfolios = {
  list: listPortfolios,
  getBySlug: getPortfolioBySlug
};
export {
  posts,
  portfolios,
  listPosts,
  listPortfolios,
  getPostBySlug,
  getPortfolioBySlug,
  customInstance
};
