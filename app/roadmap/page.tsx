"use client";

import { useState } from "react";
import Navbar from "@/app/components/Navbar";
type Topic = {
  id: string;
  name: string;
};

type RoadmapStep = {
  id: number;
  title: string;
  description: string;
  topics: Topic[];
};

const roadmapSteps: RoadmapStep[] = [
  {
    id: 1,
    title: "Programming Fundamentals",
    description:
      "Build a strong programming foundation before moving to advanced placement topics.",
    topics: [
      {
        id: "programming-language",
        name: "Choose a Programming Language",
      },
      {
        id: "variables-data-types",
        name: "Variables & Data Types",
      },
      {
        id: "functions",
        name: "Functions",
      },
      {
        id: "loops-conditions",
        name: "Loops & Conditions",
      },
      {
        id: "oops-fundamentals",
        name: "OOP Concepts",
      },
      {
        id: "git-github",
        name: "Git & GitHub",
      },
    ],
  },

  {
    id: 2,
    title: "Data Structures & Algorithms",
    description:
      "Master the most important DSA topics commonly asked in placement coding rounds.",
    topics: [
      {
        id: "arrays",
        name: "Arrays",
      },
      {
        id: "strings",
        name: "Strings",
      },
      {
        id: "linked-list",
        name: "Linked List",
      },
      {
        id: "stack-queue",
        name: "Stack & Queue",
      },
      {
        id: "recursion",
        name: "Recursion",
      },
      {
        id: "binary-tree",
        name: "Binary Tree",
      },
      {
        id: "bst",
        name: "Binary Search Tree",
      },
      {
        id: "heap",
        name: "Heap / Priority Queue",
      },
      {
        id: "hashing",
        name: "Hashing",
      },
      {
        id: "graphs",
        name: "Graphs",
      },
      {
        id: "greedy",
        name: "Greedy Algorithms",
      },
      {
        id: "dynamic-programming",
        name: "Dynamic Programming",
      },
      {
        id: "sorting",
        name: "Sorting",
      },
      {
        id: "searching",
        name: "Searching",
      },
    ],
  },

  {
    id: 3,
    title: "Core Computer Science",
    description:
      "Prepare the core CS subjects that are frequently asked in technical interviews.",
    topics: [
      {
        id: "dbms",
        name: "DBMS",
      },
      {
        id: "sql",
        name: "SQL",
      },
      {
        id: "operating-system",
        name: "Operating Systems",
      },
      {
        id: "computer-networks",
        name: "Computer Networks",
      },
      {
        id: "oops",
        name: "Object Oriented Programming",
      },
      {
        id: "computer-architecture",
        name: "Computer Architecture",
      },
    ],
  },

  {
    id: 4,
    title: "Development",
    description:
      "Learn how to build real-world applications and strengthen your development skills.",
    topics: [
      {
        id: "html",
        name: "HTML",
      },
      {
        id: "css",
        name: "CSS",
      },
      {
        id: "javascript",
        name: "JavaScript",
      },
      {
        id: "typescript",
        name: "TypeScript",
      },
      {
        id: "react",
        name: "React",
      },
      {
        id: "nextjs",
        name: "Next.js",
      },
      {
        id: "backend",
        name: "Backend Development",
      },
      {
        id: "rest-api",
        name: "REST APIs",
      },
      {
        id: "database-development",
        name: "Databases",
      },
    ],
  },

  {
    id: 5,
    title: "Aptitude",
    description:
      "Prepare for quantitative aptitude, logical reasoning and verbal ability rounds.",
    topics: [
      {
        id: "number-system",
        name: "Number System",
      },
      {
        id: "percentages",
        name: "Percentages",
      },
      {
        id: "profit-loss",
        name: "Profit & Loss",
      },
      {
        id: "time-work",
        name: "Time & Work",
      },
      {
        id: "speed-distance",
        name: "Speed, Time & Distance",
      },
      {
        id: "probability",
        name: "Probability",
      },
      {
        id: "logical-reasoning",
        name: "Logical Reasoning",
      },
      {
        id: "verbal-ability",
        name: "Verbal Ability",
      },
    ],
  },

  {
    id: 6,
    title: "Projects",
    description:
      "Build practical projects that demonstrate your technical skills to recruiters.",
    topics: [
      {
        id: "project-1",
        name: "Build Your First Project",
      },
      {
        id: "project-2",
        name: "Build a Full-Stack Project",
      },
      {
        id: "project-3",
        name: "Build a Strong Major Project",
      },
      {
        id: "github-projects",
        name: "Upload Projects to GitHub",
      },
      {
        id: "deploy-projects",
        name: "Deploy Your Projects",
      },
      {
        id: "project-documentation",
        name: "Write Project Documentation",
      },
      {
        id: "project-explanation",
        name: "Prepare Project Explanation",
      },
    ],
  },

  {
    id: 7,
    title: "Resume & Profile",
    description:
      "Create a professional profile that makes a strong first impression on recruiters.",
    topics: [
      {
        id: "build-resume",
        name: "Build Your Resume",
      },
      {
        id: "resume-ats",
        name: "Make Resume ATS Friendly",
      },
      {
        id: "resume-projects",
        name: "Add Strong Projects",
      },
      {
        id: "resume-skills",
        name: "Add Technical Skills",
      },
      {
        id: "github-profile",
        name: "Improve GitHub Profile",
      },
      {
        id: "linkedin-profile",
        name: "Improve LinkedIn Profile",
      },
    ],
  },

  {
    id: 8,
    title: "Interview Preparation",
    description:
      "Prepare for technical, coding and HR interviews with focused practice.",
    topics: [
      {
        id: "technical-interview",
        name: "Technical Interview Questions",
      },
      {
        id: "coding-interview",
        name: "Coding Interview Questions",
      },
      {
        id: "dsa-interview",
        name: "DSA Interview Questions",
      },
      {
        id: "core-interview",
        name: "Core CS Interview Questions",
      },
      {
        id: "project-interview",
        name: "Project-Based Questions",
      },
      {
        id: "hr-interview",
        name: "HR Interview Questions",
      },
      {
        id: "mock-interview",
        name: "Mock Interviews",
      },
    ],
  },
];

export default function RoadmapPage() {
  /*
    Stores the IDs of completed topics.

    Example:

    [
      "arrays",
      "strings",
      "linked-list"
    ]
  */

  const [completedTopics, setCompletedTopics] = useState<string[]>([]);

  /*
    Toggle a topic between completed and incomplete.
  */

  const toggleTopic = (topicId: string) => {
    setCompletedTopics((previous) => {
      if (previous.includes(topicId)) {
        return previous.filter((id) => id !== topicId);
      }

      return [...previous, topicId];
    });
  };

  /*
    Count total topics in the entire roadmap.
  */

  const totalTopics = roadmapSteps.reduce(
    (total, step) => total + step.topics.length,
    0
  );

  /*
    Count completed topics.
  */

  const completedCount = completedTopics.length;

  /*
    Calculate overall progress.
  */

  const overallProgress =
    totalTopics === 0
      ? 0
      : Math.round((completedCount / totalTopics) * 100);

  return (
    
    <main className="min-h-screen bg-gray-50   sm:px-6 lg:px-8">
       <Navbar/>
      <div className="mx-auto max-w-5xl">


        <div className="mb-10 text-center">

         

          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Placement Roadmap
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-gray-600 sm:text-base">
            Follow the Prepx roadmap step by step and prepare yourself
            for coding rounds, technical interviews and placements.
          </p>

        </div>



        <section className="mb-10 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

          <div className="flex items-center justify-between gap-4">

            <div>
              <h2 className="text-lg font-bold text-gray-900">
                Your Progress
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                {completedCount} of {totalTopics} topics completed
              </p>
            </div>

            <div className="text-right">
              <p className="text-3xl font-bold text-blue-600">
                {overallProgress}%
              </p>

              <p className="text-xs text-gray-400">
                Overall
              </p>
            </div>

          </div>


       

          <div className="mt-5 h-3 overflow-hidden rounded-full bg-gray-200">

            <div
              className="h-full rounded-full bg-blue-600 transition-all duration-500"
              style={{
                width: `${overallProgress}%`,
              }}
            />

          </div>



          <div className="mt-4 text-sm text-gray-500">

            {overallProgress === 0 && (
              <p>
                Start your preparation journey 🚀
              </p>
            )}

            {overallProgress > 0 && overallProgress < 50 && (
              <p>
                Good start! Keep building your skills 💪
              </p>
            )}

            {overallProgress >= 50 && overallProgress < 100 && (
              <p>
                You're more than halfway there. Keep going! 🔥
              </p>
            )}

            {overallProgress === 100 && (
              <p className="font-semibold text-green-600">
                🎉 Congratulations! You completed the roadmap.
              </p>
            )}

          </div>

        </section>


       
        <div className="relative">


          <div className="absolute left-6 top-6 hidden h-[calc(100%-48px)] w-px bg-gray-300 md:block" />


          <div className="space-y-8">

            {roadmapSteps.map((step) => {

             

              const sectionCompleted = step.topics.filter((topic) =>
                completedTopics.includes(topic.id)
              ).length;

              const sectionTotal = step.topics.length;

              const sectionProgress =
                sectionTotal === 0
                  ? 0
                  : Math.round(
                      (sectionCompleted / sectionTotal) * 100
                    );

              const sectionComplete =
                sectionCompleted === sectionTotal;


              return (
                <section
                  key={step.id}
                  className="relative flex gap-4 md:gap-6"
                >

                  <div
                    className={`relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-4 border-gray-50 text-sm font-bold shadow-sm ${
                      sectionComplete
                        ? "bg-green-500 text-white"
                        : "bg-blue-600 text-white"
                    }`}
                  >
                    {sectionComplete ? "✓" : step.id}
                  </div>



                  <div
                    className={`flex-1 rounded-2xl border bg-white p-5 shadow-sm transition sm:p-6 ${
                      sectionComplete
                        ? "border-green-200"
                        : "border-gray-200"
                    }`}
                  >

                

                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">

                      <div>

                        <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
                          Step {step.id}
                        </p>

                        <h2 className="mt-1 text-xl font-bold text-gray-900">
                          {step.title}
                        </h2>

                        <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-600">
                          {step.description}
                        </p>

                      </div>


                      {/* SECTION STATUS */}

                      <div
                        className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${
                          sectionComplete
                            ? "bg-green-100 text-green-700"
                            : "bg-blue-50 text-blue-600"
                        }`}
                      >
                        {sectionCompleted}/{sectionTotal} completed
                      </div>

                    </div>


                  

                    <div className="mt-6">

                      <div className="mb-2 flex items-center justify-between">

                        <span className="text-xs font-medium text-gray-500">
                          Section Progress
                        </span>

                        <span
                          className={`text-xs font-bold ${
                            sectionComplete
                              ? "text-green-600"
                              : "text-blue-600"
                          }`}
                        >
                          {sectionProgress}%
                        </span>

                      </div>


                      <div className="h-2 overflow-hidden rounded-full bg-gray-200">

                        <div
                          className={`h-full rounded-full transition-all duration-500 ${
                            sectionComplete
                              ? "bg-green-500"
                              : "bg-blue-600"
                          }`}
                          style={{
                            width: `${sectionProgress}%`,
                          }}
                        />

                      </div>

                    </div>


                   

                    <div className="mt-6 grid gap-3 sm:grid-cols-2">

                      {step.topics.map((topic) => {

                        const completed = completedTopics.includes(
                          topic.id
                        );

                        return (
                          <label
                            key={topic.id}
                            className={`flex cursor-pointer items-center gap-3 rounded-xl border p-4 transition ${
                              completed
                                ? "border-green-200 bg-green-50"
                                : "border-gray-200 bg-gray-50 hover:border-blue-200 hover:bg-blue-50"
                            }`}
                          >

                           

                            <input
                              type="checkbox"
                              checked={completed}
                              onChange={() =>
                                toggleTopic(topic.id)
                              }
                              className="h-5 w-5 cursor-pointer accent-blue-600"
                            />


                            

                            <span
                              className={`text-sm transition ${
                                completed
                                  ? "font-medium text-green-700 line-through"
                                  : "text-gray-700"
                              }`}
                            >
                              {topic.name}
                            </span>

                          </label>
                        );

                      })}

                    </div>


                  

                    {sectionComplete && (
                      <div className="mt-6 rounded-xl border border-green-200 bg-green-50 p-4">

                        <p className="text-sm font-semibold text-green-700">
                          🎉 Section completed!
                        </p>

                        <p className="mt-1 text-xs text-green-600">
                          Great work. Continue to the next stage of your
                          placement preparation.
                        </p>

                      </div>
                    )}

                  </div>

                </section>
              );
            })}

          </div>

        </div>
      
      </div>
    </main>
  );
}

