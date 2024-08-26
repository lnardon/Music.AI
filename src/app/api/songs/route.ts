import payload from "../../../../server-payload.json";

export async function GET(request: Request) {
  const songs = payload.songs.map((song) => ({
    id: song.id,
    song: song.song,
    related: song.related,
  }));

  return new Response(JSON.stringify({ songs }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
