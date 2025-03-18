import DashboardHtml from '../public/dashboard.html';
import asyncAPIRPCProxyHandler from './rpc-proxy';
import { BunRoutes } from './types';

/**
 * @see https://bun.sh/docs/bundler/fullstack#html-imports-are-routes
 *
 * As of right now, it would appear that there is no manner to coerce Fullstack Bun HTML Routes with middlewares
 * like CORS, or appending Cache Control headers
 * This is an obvious gap for production level projects,
 * If you intend to expand this project beyond the scope of personal use,
 * I'd advise you to switch to a more flexible server framework,
 * my personal suggestion is [Actix-Web](https://actix.rs/)
 * */
const routes: BunRoutes = {
  '/': DashboardHtml,
  '/api/rpc/proxy': asyncAPIRPCProxyHandler
};

export default routes;
