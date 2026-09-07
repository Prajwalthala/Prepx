"use client";

import { useState } from "react";
import Link from "next/link";
import Image from 'next/image';

export default function LoginPage() {
 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const handleSignup = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

   

    console.log({
 
      email,
      password,
    });
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
            Login to your account
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
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-white border border-slate-700 rounded-lg outline-none focus:border-blue-500"
                required
              />
            </div>

            

            {/* Button */}
            <button
              type="submit"
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition"
            >
              Login
            </button>

          </form>

          {/* Login */}
          
         

        </div>

      </div>

    </main>
  );
}