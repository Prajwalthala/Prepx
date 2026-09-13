"use client";

import { useState } from "react";
import Navbar from "../components/Navbar";
import {useRouter} from "next/navigation"
const templates = [
  {
    id: 1,
    name: "Classic ATS",
    type: "ATS-ready",
    premium: false,
    style: "classic",
  },
  {
    id: 2,
    name: "Modern Professional",
    type: "ATS-ready",
    premium: true,
    style: "modern",
  },
  
];

export default function TemplatesPage() {
  const [search, setSearch] = useState("");
  

  const filteredTemplates = templates.filter((template) =>
    template.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#f7f6fc] text-[#25233a]">

      {/* NAVBAR */}
      <Navbar />

      <div className="flex">
        {/* ================= MAIN ================= */}

        <main className=" w-full">

          <section className="mx-auto max-w-[1400px] px-10 py-12">


            {/* HEADING */}

            <div className="mx-auto mb-8 max-w-2xl text-center">

              <h1 className="mb-3 text-3xl font-bold">
                Resume Templates
              </h1>

              <p className="text-sm leading-6 text-gray-500">
                Choose a professionally designed template to
                build your resume. You can switch templates
                anytime without losing your content.
              </p>

            </div>
            {/* FILTERS */}

            <div className="mb-8 flex justify-center gap-2">

              <button className="rounded-full bg-[#5146e5] px-5 py-2 text-sm font-medium text-white">
                All Templates
              </button>
            </div>


            <div className="grid grid-cols-1 gap-8 xl:grid-cols-2">

              {filteredTemplates.map((template) => (

                <TemplateCard
                  key={template.id}
                  template={template}
                />

              ))}

            </div>

          </section>

        </main>

      </div>

    </div>
  );
}


/* ================= NAV ITEM ================= */

function NavItem({
  icon,
  text,
  active = false,
  lock = false,
}: {
  icon: string;
  text: string;
  active?: boolean;
  lock?: boolean;
}) {

  return (
    <div
      className={`
        flex h-11 items-center gap-3 rounded-lg px-3
        text-sm cursor-pointer
        ${
          active
            ? "bg-[#eeebff] font-semibold text-[#5146e5]"
            : "text-gray-500 hover:bg-gray-50"
        }
      `}
    >

      <span className="w-5 text-center text-lg">
        {icon}
      </span>

      <span>
        {text}
      </span>

      {lock && (
        <span className="ml-auto text-xs">
          🔒
        </span>
      )}

    </div>
  );
}


/* ================= TEMPLATE CARD ================= */

function TemplateCard({
  template,
  
}: {
  template: (typeof templates)[number];
}) {
 const router=useRouter()
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white transition hover:-translate-y-1 hover:border-[#5146e5] hover:shadow-xl">


      {/* PREVIEW */}

      <div className="relative flex min-h-[600px] justify-center overflow-hidden bg-[#eeeeef] p-10">



        <ResumePreview
          style={template.style}
        />

      </div>


      {/* CARD FOOTER */}

      <div className="flex items-center justify-between gap-5 p-5">

        <div>

          <h3 className="font-semibold">
            {template.name}
          </h3>

          <p className="mt-1 text-xs text-gray-400">
            Professional resume template
          </p>

        </div>


        <button
          onClick={() =>{
            router.push(`/template/create?template=${template.style}`);

          }
        }
          className="whitespace-nowrap rounded-lg bg-[#5146e5] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#4036cc]"
        >
          Use Template
        </button>

      </div>

    </div>
  );
}


/* ================= RESUME PREVIEW ================= */

function ResumePreview({
  style,
}: {
  style: string;
}) {

  if (style === "modern") {

    return (
      <div className="flex min-h-[600px] w-[430px] bg-white shadow-xl">

        <div className="w-[125px] bg-[#082d4d] p-5 text-white">

          <h2 className="text-lg font-bold">
            Prajwal
            <br />
            Agrawal
          </h2>

          <p className="mt-4 text-[7px]">
            Bhubneswar, Odisha
          </p>

          <p className="mt-2 text-[7px]">
            prajwalagarwal200y@gmail.com
          </p>

          <p className="mt-2 text-[7px]">
            +91 7735870278
          </p>

          <h3 className="mt-8 border-b border-white pb-2 text-[8px]">
            SKILLS
          </h3>

          <p className="mt-3 text-[7px] leading-5">
            JavaScript
            <br />
            React
            <br />
            Node.js
            <br />
            MongoDB
            <br />
            Python
          </p>

        </div>


        <div className="flex-1 p-5">

          <ResumeContent />

        </div>

      </div>
    );
  }


  return (
    <div className="min-h-[600px] w-[430px] bg-white p-8 shadow-xl">

      <h1 className="text-center text-xl font-bold">
        Prajwal Agrawal
      </h1>

      <p className="mt-1 text-center text-[7px] text-gray-500">
        Bhubneswar, Odisha |
        prajwalagarwal200y@gmail.com |
        +91 7735870278 |
        LinkedIn | GitHub
      </p>

      <div className="my-3 h-px bg-black" />

      <ResumeContent />

    </div>
  );
}


/* ================= RESUME CONTENT ================= */

function ResumeContent() {

  return (
    <div className="text-black">

      <ResumeSection title="SUMMARY">

        <p>
          Results-driven Robotics-undergraduate with
          a strong foundation in full-stack web development
          and a passion for building scalable applications.
        </p>

      </ResumeSection>


      <ResumeSection title="EXPERIENCE">

        <p className="font-bold">
          Web Development Intern
        </p>

        <p className="text-gray-500">
          Odizo
        </p>

        <ul className="mt-1 list-disc pl-4">

          <li>
            Built responsive web applications using React/Next.
          </li>

          <li>
            Enhanced the features of the web applications.
          </li>

          <li>
            Built the website for Safe Academy
          </li>

        </ul>

      </ResumeSection>


      <ResumeSection title="EDUCATION">

        <p className="font-bold">
          B.Tech – Robotics & Ai
        </p>

        <p className="text-gray-500">
          Odisha University of technology and research, Bhubneswar
        </p>

      </ResumeSection>


      <ResumeSection title="SKILLS">

        <p>
          JavaScript, React, Next.js, Node.js,
          Express, MongoDB, Python, Git, Docker
        </p>

      </ResumeSection>


      <ResumeSection title="PROJECTS">

        <p className="font-bold">
          Prepx
        </p>

        <p>
          AI-powered resume preparation platform
          helping students prepare for placements.
        </p>

      </ResumeSection>

    </div>
  );
}


/* ================= RESUME SECTION ================= */

function ResumeSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {

  return (
    <section className="mb-4">

      <h2 className="mb-2 border-b border-black pb-1 text-[9px] font-bold">
        {title}
      </h2>

      <div className="text-[7px] leading-[1.45] text-gray-700">
        {children}
      </div>

    </section>
  );
}