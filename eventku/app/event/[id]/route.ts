
import { events } from "@/data/events";
import { NextRequest } from "next/server";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(
  request: NextRequest,
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

  return Response.json(event, { status: 200 });
}
