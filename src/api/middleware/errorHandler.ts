// deno-lint-ignore-file no-explicit-any
import { Context, Next } from "oak";

const errorHandler = async (
  ctx: Context<Record<string, any>, Record<string, any>>,
  next: Next
) => {
  try {
    await next();
  } catch (err) {
    ctx.response.body = { message: err.message };
    ctx.response.status = err.status || 500;
  }
};

export default errorHandler;
