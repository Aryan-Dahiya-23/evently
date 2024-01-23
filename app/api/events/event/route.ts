import { getEventById } from "@/lib/actions/event.actions";

import { NextResponse } from "next/server";

export async function GET(request: Request) {   

    const { searchParams } = new URL(request.url);

    const id = searchParams.get('id') as string;

    const event = await getEventById(id);

    return NextResponse.json(event);
}