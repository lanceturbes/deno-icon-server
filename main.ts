const PORT = 4200;
const API_URL = `http://localhost:${PORT}/api`;

const server = Deno.listen({ port: PORT });
console.log(`File server running at ${API_URL}`);

const setCorsHeader = (response: Response) => {
  response.headers.set("Access-Control-Allow-Origin", "*");
};

const setSvgHeader = (response: Response) => {
  response.headers.set("Content-Type", "image/svg+xml");
};

const handle404 = async (requestEvent: Deno.RequestEvent) => {
  const notFoundResponse = new Response("404 Not Found", { status: 404 });
  setCorsHeader(notFoundResponse);
  await requestEvent.respondWith(notFoundResponse);
};

for await (const conn of server) {
  handleHttp(conn).catch(console.error);
}

type IconListEntry = { name: string; url: string };

async function handleHttp(conn: Deno.Conn) {
  const httpConn = Deno.serveHttp(conn);
  for await (const requestEvent of httpConn) {
    const url = new URL(requestEvent.request.url);
    const pathname = decodeURIComponent(url.pathname);

    if (pathname === "/api") {
      const response = new Response("Welcome to the File Server");
      setCorsHeader(response);
      await requestEvent.respondWith(response);
      continue;
    }

    if (pathname === "/api/icons") {
      const iconList: IconListEntry[] = [];
      for await (const icon of Deno.readDir("./icons")) {
        iconList.push({
          name: icon.name.split(".")[0],
          url: `${API_URL}/icons/${icon.name}`,
        });
      }
      const data = JSON.stringify(iconList);
      const response = new Response(data);
      setCorsHeader(response);
      await requestEvent.respondWith(response);
      continue;
    }

    if (pathname.startsWith("/api/icons/")) {
      // Get the icon name from the URL
      const iconName = pathname.split("/").pop();
      if (!iconName) {
        await handle404(requestEvent);
        continue;
      }

      // Open the file if it exists
      const filepath = `./icons/${iconName}`;
      let file;
      try {
        file = await Deno.open(filepath, { read: true });
      } catch {
        await handle404(requestEvent);
        continue;
      }

      // Respond with the file
      const readableStream = file.readable;
      const response = new Response(readableStream);
      setCorsHeader(response);
      setSvgHeader(response);
      await requestEvent.respondWith(response);
      continue;
    }

    // If we didn't match any of the above, return a 404
    await handle404(requestEvent);
  }
}
