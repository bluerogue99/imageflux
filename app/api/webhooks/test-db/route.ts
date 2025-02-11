import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/database/mongoose";
import User from "@/lib/database/models/user.model";

export async function GET() {
    try {
        await connectToDatabase();
        const users = await User.find();
        console.log("Users:", users);
        return NextResponse.json(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
    }
}
