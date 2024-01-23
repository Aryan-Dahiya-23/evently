import { getEventsByUser } from "@/lib/actions/event.actions";
import { NextResponse } from "next/server";

export async function GET(request: Request) {

    const { searchParams } = new URL(request.url);

    const userId = searchParams.get('userId') as string;
    const page = searchParams.get('page') as any;

    const events = await getEventsByUser({
        userId,
        page,
    })

    return NextResponse.json(events);
}