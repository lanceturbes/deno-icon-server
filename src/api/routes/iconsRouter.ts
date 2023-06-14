import { Router } from "oak";
import { IconsService } from "@/services";

const router = new Router({ prefix: "/api/icons" });

router.get("/", async (ctx) => {
  const iconList = await IconsService.getIconList();
  ctx.response.body = JSON.stringify(iconList);
});

router.get("/:iconName", async (ctx) => {
  const iconName = ctx.params.iconName;
  const iconFile = await IconsService.getIconByName(iconName);
  ctx.response.body = iconFile.readable;
  ctx.response.headers.set("Content-Type", "image/svg+xml");
});

export default router;
