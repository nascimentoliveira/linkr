/* const POSTS_ROUTE = 'https://linkr-api-irly.onrender.com/posts';
const SIGN_IN_ROUTE = 'https://linkr-api-irly.onrender.com/';
const SIGN_UP_ROUTE = 'https://linkr-api-irly.onrender.com/signup';
const TIMELINE_ROUTE = 'https://linkr-api-irly.onrender.com/timeline';
const HASTAGS_ROUTE = 'https://linkr-api-irly.onrender.com/hashtag';
const URL = 'https://linkr-api-irly.onrender.com'; */

const POSTS_ROUTE = 'http://localhost:4000/posts';
const SIGN_IN_ROUTE = 'http://localhost:4000/';
const SIGN_UP_ROUTE = 'http://localhost:4000/signup';
const TIMELINE_ROUTE = 'http://localhost:4000/timeline';
const HASTAGS_ROUTE = 'http://localhost:4000/hashtag';
const POST_DELETE_ROUTE = 'http://localhost:4000/deletepost';
const URL = 'http://localhost:4000';
const COMMENTS = 'http://localhost:4000/comments';

const ROUTES = {
  SIGN_UP_ROUTE,
  SIGN_IN_ROUTE,
  POSTS_ROUTE,
  TIMELINE_ROUTE,
  HASTAGS_ROUTE,
  POST_DELETE_ROUTE,
  URL,
  COMMENTS
};

export default ROUTES;

export const POSTS_PER_PAGE = 10;