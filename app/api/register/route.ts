import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import connectToDatabase from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const {
            name,
            email,
            password,
       
        } = body;

        if (!name || !email || !password) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Name, email, and password are required",
                },
                { status: 400 }
            );
        }

        if (password.length < 6) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Password must be at least 6 characters long",
                },
                { status: 400 }
            );
        }

        await connectToDatabase();

        const normalizedEmail = email.toLowerCase().trim();

        // Check if user already exists
        const existingUser = await User.findOne({ email: normalizedEmail });
        if (existingUser) {
            return NextResponse.json(
                {
                    success: false,
                    message: "User with this email already exists",
                },
                { status: 409 }
            );
        }

        // Hash password
        const saltRounds = 12;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Create new user
        const newUser = await User.create({
            name: name.trim(),
            email: normalizedEmail,
            password: hashedPassword,
           
        });

        return NextResponse.json(
            {
                success: true,
                message: "Registration successful",
                user: {
                    id: newUser._id,
                    name: newUser.name,
                    email: newUser.email,
                    role: newUser.role,
                    createdAt: newUser.createdAt,
                },
            },
            { status: 201 }
        );
    } catch (error: unknown) {
        console.error("Registration error:", error);
        const errorMessage =
            error instanceof Error ? error.message : "Registration failed";
        return NextResponse.json(
            {
                success: false,
                message: errorMessage,
            },
            { status: 500 }
        );
    }
}
