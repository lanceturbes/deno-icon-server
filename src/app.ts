import { Application } from "oak";
import { oakCors } from "cors";

import { iconsRouter, rootRouter } from "@/api/routes";
import { PORT } from "@/config";
import { errorHandler } from "@/api/middleware";

const app = new Application();

app.use(oakCors());
app.use(rootRouter.routes());
app.use(iconsRouter.routes());
app.use(errorHandler);

console.info(`CORS-enabled web server listening on port ${PORT}`);
console.info(`http://localhost:${PORT}/api`);
await app.listen({ port: PORT });
