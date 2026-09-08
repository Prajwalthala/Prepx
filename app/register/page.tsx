"use client";

import { useState } from "react";
import Link from "next/link";
import Image from 'next/image';

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (password !== confirmPassword && confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });
      const data = await response.json();
      if (!response.ok || !data.success) {
        setError(data.message || "Registration failed");
      } else {
        setSuccess("Registration successful! You can now log in.");
        setName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
      }
    } catch (err) {
      console.error(err);
      setError("Failed to connect to the server. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-white text-black flex items-center justify-center px-6">

      <div className="w-full max-w-md">

        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="text-3xl font-bold">
            Prep<span className="text-blue-500">X</span>
          </Link>

          <p className="text-slate-400 mt-2">
            Start your placement journey
          </p>
        </div>
        

        {/* Signup Card */}
        <div className="bg-white ">

          <h1 className="  text-center   font-caacupe text-4xl 
  ">
            Create your account
          </h1>

          <p className="text-slate-400 text-center mt-2 mb-8">
            Get started with PrepX
          </p>
    <button

    type="button"

    className="w-full flex items-center border-2 border-black justify-center gap-3 bg-white text-gray-900 py-3 rounded-lg font-medium hover:bg-blue-50 transition">
    <Image
  src="https://fonts.gstatic.com/s/i/productlogos/googleg/v6/24px.svg"
  alt="Google G Logo"
  width={20}
  height={20}
/>
    Continue with Google
  </button>

  <div className="flex items-center gap-4">
    <div className="h-px flex-1 bg-slate-700"></div>
    <span className="text-sm text-slate-500">

      OR

    </span>
    <div className="h-px flex-1 bg-slate-700"></div>
  </div>
          

          <form onSubmit={handleSignup} className="space-y-5">
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg">
                {error}
              </div>
            )}
            {success && (
              <div className="p-3 bg-green-50 border border-green-200 text-green-700 text-sm rounded-lg">
                {success}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium mb-2">
                Full Name
              </label>

              <input
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 bg-white border border-slate-700 rounded-lg outline-none focus:border-blue-500"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Email
              </label>

              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-white border border-slate-700 rounded-lg outline-none focus:border-blue-500"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Password
              </label>

              <input
                type="password"
                placeholder="Create a password (min 6 characters)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-white border border-slate-700 rounded-lg outline-none focus:border-blue-500"
                required
              />
            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-lg font-semibold transition"
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>

          </form>

          {/* Login */}
          <p className="text-center text-slate-400 mt-6">
            Already have an account?{" "}

            <Link
              href="/login"
              className="text-blue-500 hover:text-blue-400 font-medium"
            >
              Login
            </Link>
          </p>

        </div>

      </div>

    </main>
  );
}