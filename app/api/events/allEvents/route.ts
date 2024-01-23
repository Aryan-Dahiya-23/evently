import { getAllEvents } from "@/lib/actions/event.actions";

import { NextResponse } from "next/server";

export async function GET(request: Request) {

    const { searchParams } = new URL(request.url);

    const query = searchParams.get('query') as string;
    const category = searchParams.get('category') as string;
    const page = searchParams.get('page') as any;

    const events = await getAllEvents({
        query,
        category,
        page,
        limit: 6
    })

    return NextResponse.json(events);
}