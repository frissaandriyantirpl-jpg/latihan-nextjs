import { events } from "@/data/events";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(
  _request: Request,
  context: RouteContext
) {
  const { id } = await context.params;

  const event = events.find(
    (item) => item.id === Number(id)
  );

  if (!event) {
    return Response.json(
      { pesan: "Event tidak ditemukan" },
      { status: 404 }
    );
  }

  return Response.json(event);
}
