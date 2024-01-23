import { getRelatedEventsByCategory } from "@/lib/actions/event.actions";

import { NextResponse } from "next/server";

export async function GET(request: Request) {

    const { searchParams } = new URL(request.url);

    const categoryId = searchParams.get('categoryId') as string;
    const eventId = searchParams.get('eventId') as string;
    const page = searchParams.get('page') as string;

    const events = await getRelatedEventsByCategory({
        categoryId,
        eventId,
        page
    })

    return NextResponse.json(events);
}