import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import connectToDatabase from "@/lib/mongodb";
import User from "@/models/User"

export async function POST(req: Request) {
    try {
        const { email, password } = await req.json();

        if (!email || !password) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Email and password are required",
                },
                { status: 400 }
            );
        }

        await connectToDatabase();

        const normalizedEmail = email.toLowerCase().trim();

        // Find user by email
        const user = await User.findOne({ email: normalizedEmail });

        if (!user) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Invalid email or password",
                },
                { status: 401 }
            );
        }

        if (!user.password) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Please sign in using your OAuth provider",
                },
                { status: 401 }
            );
        }

        // Compare password hash
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Invalid email or password",
                },
                { status: 401 }
            );
        }

        return NextResponse.json(
            {
                success: true,
                message: "Login successful",
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                },
            },
            { status: 200 }
        );
    } catch (error: unknown) {
        console.error("Login error:", error);
        const errorMessage =
            error instanceof Error ? error.message : "Login failed";
        return NextResponse.json(
            {
                success: false,
                message: errorMessage,
            },
            { status: 500 }
        );
    }
}
