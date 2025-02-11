import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/database/mongoose"; // Adjust the path if needed

export async function GET() {
    try {
        // Establish the database connection
        await connectToDatabase();

        // Respond with a success message
        return NextResponse.json({ message: "Database connected successfully" });
    } catch (error) {
        console.error("Error connecting to database:", error);
        return NextResponse.json({ error: "Failed to connect to the database" }, { status: 500 });
    }
}
