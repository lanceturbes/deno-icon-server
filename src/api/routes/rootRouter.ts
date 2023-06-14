import { Router } from "https://deno.land/x/oak@v12.5.0/mod.ts";

const rootRouter = new Router({ prefix: "/api" });

rootRouter.get("/", (ctx) => {
  ctx.response.body = "Welcome to Deno Land! 🦕";
});

export default rootRouter;
