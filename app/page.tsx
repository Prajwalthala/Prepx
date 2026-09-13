"use client";
import Navbar from "./components/Navbar";
import Link from "next/link";

const features = [
  {
    icon: "💻",
    title: "ATS Checker",
    description:
      "Check your resume for ATS compatibility and get suggestions to improve it.",
    href: "/Ats",
  },

  {
    icon: "📄",
    title: "Resume Builder",
    description:
      "Create a professional and ATS-friendly resume to stand out to recruiters.",
    href: "/template",
  },
 
  {
    icon: "📊",
    title: "Track Progress",
    description:
      "Track your preparation and see how close you are to becoming placement ready.",
    href: "/roadmap",
  },
];

const roadmap = [
  {
    number: "01",
    title: "Programming Fundamentals",
    description: "Build a strong programming foundation.",
  },
  {
    number: "02",
    title: "Data Structures & Algorithms",
    description: "Master DSA for coding rounds.",
  },
  {
    number: "03",
    title: "Core Computer Science",
    description: "Prepare DBMS, OS, CN and OOP.",
  },
  {
    number: "04",
    title: "Development",
    description: "Build real-world applications.",
  },
  {
    number: "05",
    title: "Aptitude",
    description: "Prepare quantitative and logical reasoning.",
  },
  {
    number: "06",
    title: "Projects",
    description: "Build and deploy strong projects.",
  },
  {
    number: "07",
    title: "Resume & Profile",
    description: "Create a strong professional profile.",
  },
  {
    number: "08",
    title: "Interview Preparation",
    description: "Become confident for interviews.",
  },
];

export default function HomePage() {
  return (

    <main className="min-h-screen bg-white text-gray-900">
      <Navbar/>
      {/* =====================================================
          HERO SECTION
      ===================================================== */}

      <section className="relative overflow-hidden bg-gray-50">

        {/* Background decoration */}

        <div className="absolute -right-32 -top-32 h-80 w-80 rounded-full bg-blue-100 blur-3xl" />

        <div className="absolute -bottom-32 -left-32 h-80 w-80 rounded-full bg-blue-50 blur-3xl" />


        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 lg:grid-cols-2 lg:py-28">

          {/* =================================================
              HERO CONTENT
          ================================================= */}

          <div>

            <div className="mb-6 inline-flex rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-600">
              🚀 Your placement preparation platform
            </div>


            <h1 className="max-w-3xl text-4xl font-bold leading-tight tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">

              Prepare smarter.

              <span className="block text-blue-600">
                Get placement ready.
              </span>

            </h1>


            <p className="mt-6 max-w-xl text-base leading-7 text-gray-600 sm:text-lg">
              Prepx helps students prepare for placements with a
              structured roadmap, DSA practice, resume building
             — all in one place.
            </p>


            {/* BUTTONS */}

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">

              <Link
                href="/roadmap"
                className="rounded-xl bg-blue-600 px-6 py-3 text-center text-sm font-bold text-white shadow-sm transition hover:bg-blue-700"
              >
                Start Preparing →
              </Link>

              <Link
                href="/roadmap"
                className="rounded-xl border border-gray-300 bg-white px-6 py-3 text-center text-sm font-bold text-gray-700 transition hover:bg-gray-50"
              >
                Explore Roadmap
              </Link>

            </div>


            {/* STATS */}

            <div className="mt-10 flex flex-wrap gap-8">

              <div>
                <p className="text-2xl font-bold text-gray-900">
                  8+
                </p>

                <p className="text-xs text-gray-500">
                  Preparation Stages
                </p>
              </div>


              <div>
                <p className="text-2xl font-bold text-gray-900">
                  100+
                </p>

                <p className="text-xs text-gray-500">
                  Practice Topics
                </p>
              </div>


              <div>
                <p className="text-2xl font-bold text-gray-900">
                  1
                </p>

                <p className="text-xs text-gray-500">
                  Complete Platform
                </p>
              </div>

            </div>

          </div>


          {/* =================================================
              DASHBOARD PREVIEW
          ================================================= */}

          <div className="relative">

            <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-xl sm:p-7">

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-xs font-medium text-gray-400">
                    PREPX DASHBOARD
                  </p>

                  <h2 className="mt-1 text-xl font-bold text-gray-900">
                    Your Preparation
                  </h2>

                </div>


                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 text-xl">
                  🎯
                </div>

              </div>


              {/* Overall progress */}

              <div className="mt-7 rounded-2xl bg-gray-50 p-5">

                <div className="flex items-center justify-between">

                  <div>

                    <p className="text-sm font-semibold text-gray-900">
                      Overall Progress
                    </p>

                    <p className="mt-1 text-xs text-gray-500">
                      Keep going — you're doing great!
                    </p>

                  </div>


                  <p className="text-2xl font-bold text-blue-600">
                    68%
                  </p>

                </div>


                <div className="mt-4 h-3 overflow-hidden rounded-full bg-gray-200">

                  <div
                    className="h-full rounded-full bg-blue-600"
                    style={{
                      width: "68%",
                    }}
                  />

                </div>

              </div>


              {/* Preparation progress */}

              <div className="mt-5 space-y-3">

                <DashboardItem
                  icon="💻"
                  title="DSA"
                  progress="75%"
                />

                <DashboardItem
                  icon="🧠"
                  title="Core CS"
                  progress="60%"
                />

                <DashboardItem
                  icon="🚀"
                  title="Development"
                  progress="80%"
                />

                <DashboardItem
                  icon="📄"
                  title="Resume"
                  progress="100%"
                />

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          FEATURES
      ===================================================== */}

      <section className="px-6 py-20">

        <div className="mx-auto max-w-7xl">

          <div className="mx-auto max-w-2xl text-center">

            <p className="text-sm font-bold uppercase tracking-widest text-blue-600">
              Everything you need
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              One platform for your placement preparation
            </h2>

            <p className="mt-4 text-sm leading-6 text-gray-600 sm:text-base">
              Stop jumping between different resources. Prepx brings
              your placement preparation together in one structured platform.
            </p>

          </div>


          {/* Feature cards */}

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

            {features.map((feature) => (

              <Link
                key={feature.title}
                href={feature.href}
                className="group rounded-2xl border border-gray-200 bg-white p-6 transition duration-200 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg"
              >

                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-2xl">
                  {feature.icon}
                </div>


                <h3 className="mt-5 text-lg font-bold text-gray-900">
                  {feature.title}
                </h3>


                <p className="mt-2 text-sm leading-6 text-gray-600">
                  {feature.description}
                </p>


                <p className="mt-5 text-sm font-semibold text-blue-600 transition group-hover:translate-x-1">
                  Explore →
                </p>

              </Link>

            ))}

          </div>

        </div>

      </section>


      {/* =====================================================
          ROADMAP PREVIEW
      ===================================================== */}

      <section className="bg-gray-50 px-6 py-20">

        <div className="mx-auto max-w-5xl">

          <div className="text-center">

            <p className="text-sm font-bold uppercase tracking-widest text-blue-600">
              Placement Roadmap
            </p>


            <h2 className="mt-3 text-3xl font-bold text-gray-900 sm:text-4xl">
              Know what to prepare and when
            </h2>


            <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-gray-600">
              Follow the Prepx roadmap from programming fundamentals
              all the way to interview preparation.
            </p>

          </div>


          {/* Roadmap cards */}

          <div className="mt-12 grid gap-4 sm:grid-cols-2">

            {roadmap.map((item) => (

              <div
                key={item.number}
                className="flex gap-4 rounded-2xl border border-gray-200 bg-white p-5 transition hover:border-blue-200 hover:shadow-sm"
              >

                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blue-50 text-sm font-bold text-blue-600">
                  {item.number}
                </div>


                <div>

                  <h3 className="font-bold text-gray-900">
                    {item.title}
                  </h3>

                  <p className="mt-1 text-sm text-gray-500">
                    {item.description}
                  </p>

                </div>

              </div>

            ))}

          </div>


          {/* Roadmap button */}

          <div className="mt-10 text-center">

            <Link
              href="/roadmap"
              className="inline-flex rounded-xl bg-blue-600 px-6 py-3 text-sm font-bold text-white transition hover:bg-blue-700"
            >
              View Complete Roadmap →
            </Link>

          </div>

        </div>

      </section>


      {/* =====================================================
          WHY PREPX
      ===================================================== */}

      <section className="px-6 py-20">

        <div className="mx-auto max-w-6xl">

          <div className="grid items-center gap-12 lg:grid-cols-2">

            {/* LEFT */}

            <div>

              <p className="text-sm font-bold uppercase tracking-widest text-blue-600">
                Why Prepx?
              </p>


              <h2 className="mt-3 text-3xl font-bold text-gray-900 sm:text-4xl">
                Your preparation should have a direction.
              </h2>


              <p className="mt-5 text-sm leading-7 text-gray-600 sm:text-base">
                Preparing for placements can feel overwhelming when you
                don't know what to study, where to practice or whether
                you're actually making progress.
              </p>


              <p className="mt-4 text-sm leading-7 text-gray-600 sm:text-base">
                Prepx gives you a structured path so you can focus on
                learning, practicing and improving instead of wondering
                what to do next.
              </p>

            </div>


            {/* RIGHT */}

            <div className="grid gap-4 sm:grid-cols-2">

              <Benefit
                icon="✓"
                title="Structured"
                text="Follow a clear preparation roadmap."
              />

              <Benefit
                icon="⚡"
                title="Focused"
                text="Practice topics that matter for placements."
              />

              <Benefit
                icon="📈"
                title="Trackable"
                text="See your preparation progress."
              />

              <Benefit
                icon="🎯"
                title="Placement Ready"
                text="Prepare for every stage of the process."
              />

            </div>

          </div>

        </div>

      </section>





      {/* =====================================================
          FOOTER
      ===================================================== */}

      <footer className="border-t border-gray-200 bg-white px-6 py-10">

        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 sm:flex-row">

          <div>

            <Link
              href="/"
              className="text-xl font-bold text-gray-900"
            >
              Prep<span className="text-blue-600">x</span>
            </Link>

            <p className="mt-1 text-xs text-gray-500">
              Prepare • Practice • Perform
            </p>

          </div>


          <div className="flex gap-6 text-sm text-gray-500">

            <Link
              href="/roadmap"
              className="transition hover:text-gray-900"
            >
              Roadmap
            </Link>

            <Link
              href="/dsa"
              className="transition hover:text-gray-900"
            >
              DSA
            </Link>

            <Link
              href="/template"
              className="transition hover:text-gray-900"
            >
              Resume
            </Link>


          </div>

        </div>

      </footer>

    </main>
  );
}


/* =========================================================
   DASHBOARD ITEM
========================================================= */

function DashboardItem({
  icon,
  title,
  progress,
}: {
  icon: string;
  title: string;
  progress: string;
}) {
  return (
    <div className="flex items-center gap-4 rounded-xl border border-gray-100 p-3">

      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-50">
        {icon}
      </div>


      <div className="flex-1">

        <div className="mb-1 flex items-center justify-between">

          <span className="text-sm font-medium text-gray-700">
            {title}
          </span>

          <span className="text-xs font-semibold text-gray-500">
            {progress}
          </span>

        </div>


        <div className="h-1.5 overflow-hidden rounded-full bg-gray-100">

          <div
            className="h-full rounded-full bg-blue-600"
            style={{
              width: progress,
            }}
          />

        </div>

      </div>

    </div>
  );
}


/* =========================================================
   BENEFIT CARD
========================================================= */

function Benefit({
  icon,
  title,
  text,
}: {
  icon: string;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5">

      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 font-bold text-blue-600">
        {icon}
      </div>


      <h3 className="mt-4 font-bold text-gray-900">
        {title}
      </h3>


      <p className="mt-1 text-sm leading-5 text-gray-500">
        {text}
      </p>

    </div>
  );
}
