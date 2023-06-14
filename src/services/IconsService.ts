import { IconListEntry } from "@/types";
import { API_URL, ASSETS_DIR } from "@/config";

const getIconList = async () => {
  const iconList: IconListEntry[] = [];
  for await (const icon of Deno.readDir(`${ASSETS_DIR}/icons`)) {
    iconList.push({
      name: icon.name.split(".")[0],
      url: `${API_URL}/icons/${icon.name.split(".")[0]}`,
    });
  }
  return iconList;
};

const getIconByName = async (iconName: string) => {
  const filepath = `${ASSETS_DIR}/icons/${iconName}.svg`;
  const file = await Deno.open(filepath, { read: true });
  return file;
};

export default { getIconList, getIconByName };
