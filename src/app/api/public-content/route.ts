import { NextResponse } from "next/server";
import { getPublicEvents, getPublicMembers, getPublicClubInfo } from "@/lib/data/data-service";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const [events, members, info] = await Promise.all([
      getPublicEvents(),
      getPublicMembers(),
      getPublicClubInfo(),
    ]);

    return NextResponse.json({
      events,
      members,
      info,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
