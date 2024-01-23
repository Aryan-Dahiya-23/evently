import { getOrdersByUser } from "@/lib/actions/order.actions";
import { NextResponse } from "next/server";

export async function GET(request: Request) {

    const { searchParams } = new URL(request.url);

    const userId = searchParams.get('userId') as string;
    const page = searchParams.get('page') as string;

    const orders = await getOrdersByUser({
        userId,
        page,
    })

    return NextResponse.json(orders);
}