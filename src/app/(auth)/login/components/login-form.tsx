
"use client";

import { useAuth } from "@/context/AuthContext";
import { authClient, signInWithGoogle } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginForm() {
  const router = useRouter();
  const [signing, setSinging] = useState(false);
  const [socialLoading, setSocialLoading] = useState("");
  const { getUser } = useAuth() || {};

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setSinging(true);

      const formData = new FormData(e.currentTarget);
      const email = formData.get("email");
      const password = formData.get("password");

      if (!email || !password) return;

      await authClient.signIn.email({
        email: email as string,
        password: password as string,
      });

      await getUser();
      router.push("/");
    } catch (error) {
      console.log(error);
    } finally {
      setSinging(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setSocialLoading("google");
      await signInWithGoogle();
    } catch (error) {
      console.log("Google login failed:", error);
      setSocialLoading("");
    }
  };

  const handleGithubLogin = async () => {
    try {
      setSocialLoading("github");

      await authClient.signIn.social({
        provider: "github",
      });
    } catch (error) {
      console.log("Github login failed:", error);
      setSocialLoading("");
    }
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Email address
          </label>

          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@example.com"
            className="block w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-green-500 focus:bg-white focus:ring-4 focus:ring-green-100"
          />
        </div>

        {/* Password */}
        <div>
          <div className="mb-2 flex items-center justify-between">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>

            <a
              href="#"
              className="text-sm font-medium text-green-600 transition hover:text-green-700"
            >
              Forgot password?
            </a>
          </div>

          <input
            id="password"
            name="password"
            type="password"
            required
            autoComplete="current-password"
            placeholder="Enter your password"
            className="block w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-green-500 focus:bg-white focus:ring-4 focus:ring-green-100"
          />
        </div>

        {/* Login Button */}
        <button
          type="submit"
          disabled={signing}
          className="flex w-full items-center justify-center rounded-xl bg-green-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-100 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {signing ? (
            <span className="flex items-center gap-2">
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              Logging in...
            </span>
          ) : (
            "Login"
          )}
        </button>
      </form>

      {/* Divider */}
      <div className="my-7 flex items-center gap-4">
        <div className="h-px flex-1 bg-gray-200" />

        <span className="text-xs font-medium uppercase tracking-wider text-gray-400">
          Or continue with
        </span>

        <div className="h-px flex-1 bg-gray-200" />
      </div>

      {/* Social Login */}
      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={handleGoogleLogin}
          disabled={socialLoading !== ""}
          className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {socialLoading === "google" ? (
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-gray-400 border-t-transparent" />
          ) : (
            "Google"
          )}
        </button>

        <button
          type="button"
          onClick={handleGithubLogin}
          disabled={socialLoading !== ""}
          className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {socialLoading === "github" ? (
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-gray-400 border-t-transparent" />
          ) : (
            "GitHub"
          )}
        </button>
      </div>

      {/* Register */}
      <p className="mt-7 text-center text-sm text-gray-500">
        Don't have an account?{" "}
        <a
          href="/register"
          className="font-semibold text-green-600 transition hover:text-green-700"
        >
          Create an account
        </a>
      </p>
    </div>
  );
}

