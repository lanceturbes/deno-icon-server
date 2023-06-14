import { IconListEntry } from "@/types";
import { API_URL, ASSETS_DIR } from "@/config";

class IconsService {
  public static async getIconList() {
    const iconList: IconListEntry[] = [];
    for await (const icon of Deno.readDir(`${ASSETS_DIR}/icons`)) {
      iconList.push({
        name: icon.name.split(".")[0],
        url: `${API_URL}/icons/${icon.name}`,
      });
    }
    return iconList;
  }

  public static async getIconByName(iconName: string) {
    const filepath = `${ASSETS_DIR}/icons/${iconName}.svg`;
    const file = await Deno.open(filepath, { read: true });
    return file;
  }
}

export default IconsService;
