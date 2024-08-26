import payload from "../../../../server-payload.json";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const id = url.searchParams.get("id") || "";
  const song = payload.songs.find((song) => song.id === parseInt(id));

  if (!song) {
    return new Response(null, { status: 404 });
  }

  return new Response(
    JSON.stringify({
      id: song.id,
      song: song.song,
      related: song.related,
    }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    }
  );
}
