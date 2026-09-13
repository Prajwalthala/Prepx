"use client";

import { useState } from "react";
import Navbar from "../components/Navbar";

type Keyword = {
  name: string;
  found: boolean;
};

type Section = {
  name: string;
  found: boolean;
};

type ATSResult = {
  success: boolean;
  score: number;

  scoreInfo: {
    label: string;
    description: string;
  };

  keywords: Keyword[];

  sections: Section[];

  suggestions: string[];

  stats: {
    characters: number;
    words: number;
    matchedKeywords: number;
    totalKeywords: number;
    matchedSections: number;
    totalSections: number;
  };
};

export default function ATSPage() {
  const [file, setFile] =
    useState<File | null>(null);

  const [result, setResult] =
    useState<ATSResult | null>(null);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  /* =====================================================
     FILE SELECT
  ===================================================== */

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selectedFile =
      event.target.files?.[0];

    if (!selectedFile) {
      return;
    }

    const fileName =
      selectedFile.name.toLowerCase();

    const isPDF =
      fileName.endsWith(".pdf");

    const isDOCX =
      fileName.endsWith(".docx");

    if (!isPDF && !isDOCX) {
      setError(
        "Please upload a PDF or DOCX file."
      );

      setFile(null);
      return;
    }

    if (
      selectedFile.size >
      5 * 1024 * 1024
    ) {
      setError(
        "File size must be less than 5 MB."
      );

      setFile(null);
      return;
    }

    setError("");

    setFile(selectedFile);

    setResult(null);
  };

  /* =====================================================
     ANALYZE
  ===================================================== */

  const handleAnalyze = async () => {
    if (!file) {
      setError(
        "Please upload your resume first."
      );

      return;
    }

    setLoading(true);

    setError("");

    setResult(null);

    try {
      const formData =
        new FormData();

      formData.append(
        "resume",
        file
      );

      const response =
        await fetch("/api/ats", {
          method: "POST",
          body: formData,
        });

      const data =
        await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message ||
            "Failed to analyze resume."
        );
      }

      setResult(data);
    } catch (error) {
      console.error(
        "ATS ERROR:",
        error
      );

      setError(
        error instanceof Error
          ? error.message
          : "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  };

  /* =====================================================
     REMOVE FILE
  ===================================================== */

  const handleRemove = () => {
    setFile(null);

    setResult(null);

    setError("");
  };

  return (
    <div className="min-h-screen bg-gray-50 text-black">

      <Navbar />

      <main className="mx-auto max-w-6xl px-6 py-12">

        {/* =================================================
            HEADER
        ================================================= */}

        <div className="mb-10 text-center">

          <div className="mb-4 inline-flex rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-sm text-blue-400">
            PrepX ATS Resume Checker
          </div>

          <h1 className="text-4xl font-bold md:text-5xl">

            Check Your Resume

            <span className="text-blue-500">
              {" "}ATS Score
            </span>

          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-gray-700">

            Upload your resume and let PrepX
            analyze its ATS compatibility,
            structure and content.

          </p>

        </div>


        {/* =================================================
            UPLOAD CARD
        ================================================= */}

        <div className="mx-auto max-w-3xl text-white">

          <div className="rounded-2xl border border-gray-800 bg-gray-900 p-8">

            <div className="text-center">

              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-500/10 text-3xl">
                📄
              </div>

              <h2 className="text-2xl font-semibold">
                Upload Your Resume
              </h2>

              <p className="mt-2 text-sm text-gray-500">
                Supported formats: PDF and DOCX
              </p>

            </div>


            {/* =================================================
                UPLOAD AREA
            ================================================= */}

            {!file ? (

              <label className="mt-8 flex min-h-[220px] cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-700 bg-gray-950 px-6 transition hover:border-blue-500">

                <div className="mb-4 text-5xl">
                  ⬆️
                </div>

                <p className="font-medium">
                  Click to upload your resume
                </p>

                <p className="mt-2 text-sm text-gray-500">
                  PDF or DOCX • Maximum 5 MB
                </p>

                <input
                  type="file"
                  accept=".pdf,.docx"
                  onChange={
                    handleFileChange
                  }
                  className="hidden"
                />

              </label>

            ) : (

              <div className="mt-8 rounded-xl border border-gray-800 bg-gray-950 p-5">

                <div className="flex items-center justify-between gap-4">

                  <div className="flex min-w-0 items-center gap-4">

                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-xl">
                      📄
                    </div>

                    <div className="min-w-0">

                      <p className="truncate font-medium">
                        {file.name}
                      </p>

                      <p className="mt-1 text-xs text-gray-500">
                        {(file.size / 1024).toFixed(1)} KB
                      </p>

                    </div>

                  </div>

                  <button
                    type="button"
                    onClick={
                      handleRemove
                    }
                    className="rounded-lg px-3 py-2 text-sm text-red-400 hover:bg-red-500/10"
                  >
                    Remove
                  </button>

                </div>

              </div>

            )}


            {/* =================================================
                ERROR
            ================================================= */}

            {error && (

              <div className="mt-4 rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-400">
                {error}
              </div>

            )}


            {/* =================================================
                ANALYZE BUTTON
            ================================================= */}

            <button
              type="button"
              onClick={
                handleAnalyze
              }
              disabled={
                !file || loading
              }
              className="mt-6 w-full rounded-xl bg-blue-600 px-6 py-4 font-semibold transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-40 text-white"
            >

              {loading
                ? "Analyzing Resume..."
                : "Analyze ATS Score"}

            </button>

          </div>

        </div>


        {/* =================================================
            RESULTS
        ================================================= */}

        {result && (

          <section className="mt-12">

            {/* =================================================
                SCORE
            ================================================= */}

            <div className="rounded-2xl border border-gray-800 bg-gray-900 p-8 text-white">

              <div className="grid items-center gap-8 md:grid-cols-3">

                {/* SCORE CIRCLE */}

                <div className="flex justify-center">

                  <div className="flex h-44 w-44 items-center justify-center rounded-full border-8 border-blue-500/20">

                    <div className="text-center">

                      <p className="text-5xl font-bold text-blue-400">
                        {result.score}
                      </p>

                      <p className="text-sm text-gray-500">
                        / 100
                      </p>

                    </div>

                  </div>

                </div>


                {/* SCORE INFO */}

                <div className="md:col-span-2 text-white">

                  <p className="text-sm uppercase tracking-wider text-gray-500">
                    ATS Score
                  </p>

                  <h2 className="mt-2 text-3xl font-bold">
                    {result.scoreInfo.label}
                  </h2>

                  <p className="mt-3 text-gray-400">
                    {result.scoreInfo.description}
                  </p>

                  <div className="mt-6 h-3 overflow-hidden rounded-full bg-gray-800">

                    <div
                      className="h-full rounded-full bg-blue-500 transition-all duration-700"
                      style={{
                        width: `${result.score}%`,
                      }}
                    />

                  </div>

                </div>

              </div>

            </div>


            {/* =================================================
                STATS
            ================================================= */}

            <div className="mt-6 grid gap-4 sm:grid-cols-3">

              <div className="rounded-xl border border-gray-800 bg-gray-900 p-5">

                <p className="text-sm text-white">
                  Keywords
                </p>

                <p className="mt-2 text-3xl font-bold text-green-400">
                  {result.stats.matchedKeywords}
                  <span className="text-lg text-gray-600">
                    {" "}/ {result.stats.totalKeywords}
                  </span>
                </p>

              </div>


              <div className="rounded-xl border border-gray-800 bg-gray-900 p-5">

                <p className="text-sm text-white">
                  Resume Sections
                </p>

                <p className="mt-2 text-3xl font-bold text-blue-400">
                  {result.stats.matchedSections}
                  <span className="text-lg text-gray-600">
                    {" "}/ {result.stats.totalSections}
                  </span>
                </p>

              </div>


              <div className="rounded-xl border border-gray-800 bg-gray-900 p-5">

                <p className="text-sm text-white">
                  Resume Words
                </p>

                <p className="mt-2 text-3xl text-yellow-400 font-bold">
                  {result.stats.words}
                </p>

              </div>

            </div>


            {/* =================================================
                RESUME SECTIONS
            ================================================= */}

            <div className="mt-6 rounded-2xl border border-gray-800 bg-gray-900 p-6 text-white">

              <h3 className="text-xl font-semibold">
                Resume Sections
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                Important resume sections detected by PrepX.
              </p>

              <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">

                {result.sections.map(
                  (section) => (

                    <div
                      key={
                        section.name
                      }
                      className="flex items-center justify-between rounded-xl border border-gray-800 bg-gray-950 p-4"
                    >

                      <span className="capitalize">
                        {section.name}
                      </span>

                      <span
                        className={
                          section.found
                            ? "text-green-400"
                            : "text-red-400"
                        }
                      >

                        {section.found
                          ? "✓ Found"
                          : "✕ Missing"}

                      </span>

                    </div>

                  )
                )}

              </div>

            </div>


            {/* =================================================
                KEYWORDS
            ================================================= */}

            <div className="mt-6 rounded-2xl border border-gray-800 bg-gray-900 p-6 text-white">

              <h3 className="text-xl font-semibold">
                Skills & Keywords
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                Common skills detected in your resume.
              </p>

              <div className="mt-5 flex flex-wrap gap-2">

                {result.keywords
                  .filter(
                    (keyword) =>
                      keyword.found
                  )
                  .map((keyword) => (

                    <span
                      key={
                        keyword.name
                      }
                      className="rounded-full bg-green-500/10 px-3 py-2 text-sm text-green-400"
                    >
                      ✓ {keyword.name}
                    </span>

                  ))}

              </div>

            </div>


            {/* =================================================
                SUGGESTIONS
            ================================================= */}

            <div className="mt-6 rounded-2xl border border-gray-800 bg-gray-900 p-6 text-white">

              <h3 className="text-xl font-semibold">
                💡 Improvement Suggestions
              </h3>

              <div className="mt-5 space-y-3">

                {result.suggestions.map(
                  (
                    suggestion,
                    index
                  ) => (

                    <div
                      key={index}
                      className="flex gap-3 rounded-xl border border-gray-800 bg-gray-950 p-4"
                    >

                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-500/10 text-sm text-blue-400">
                        {index + 1}
                      </div>

                      <p className="text-sm leading-6 text-gray-300">
                        {suggestion}
                      </p>

                    </div>

                  )
                )}

              </div>

            </div>

          </section>

        )}

      </main>

    </div>
  );
}