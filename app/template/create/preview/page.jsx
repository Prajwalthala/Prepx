"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";

function PreviewContent() {
  const searchParams = useSearchParams();

  const template = searchParams.get("template") || "classic";

  const [resumeData, setResumeData] = useState(null);

  useEffect(() => {
    const savedData = localStorage.getItem("resumeData");

    if (savedData) {
      setResumeData(JSON.parse(savedData));
    }
  }, []);

  if (!resumeData) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-200 px-6 py-10">

      {/* TOP BAR */}

      <div className="mx-auto mb-8 flex max-w-[900px] items-center justify-between">

        <h1 className="text-xl font-bold">
          Resume Preview
        </h1>

        <button
          onClick={() => window.print()}
          className="rounded-lg bg-[#5146e5] px-5 py-2.5 text-sm font-semibold text-white"
        >
          Download / Print
        </button>

      </div>


      {/* RESUME */}

      <div className="flex justify-center">

        {template === "classic" ? (
          <ClassicTemplate data={resumeData} />
        ) : (
          <ModernTemplate data={resumeData} />
        )}

      </div>

    </main>
  );
}

export default function PreviewPage() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center">Loading...</div>}>
      <PreviewContent />
    </Suspense>
  );
}


/* ================================================= */
/* CLASSIC TEMPLATE */
/* ================================================= */

function ClassicTemplate({ data }) {
  return (
    <div className="min-h-[1120px] w-[794px] bg-white p-[55px] text-black shadow-xl">

      {/* HEADER */}

      <header className="border-b-2 border-black pb-4">

        <h1 className="text-3xl font-bold">
          {data.personal?.name}
        </h1>

        <p className="mt-2 text-sm text-gray-600">
          {data.personal?.location}
        </p>

        <p className="text-sm text-gray-600">
          {data.personal?.email}
          {" | "}
          {data.personal?.phone}
        </p>

        <p className="text-sm text-gray-600">
          {data.personal?.linkedin}
          {data.personal?.github && " | "}
          {data.personal?.github}
        </p>

      </header>


      {/* SUMMARY */}

      {data.personal?.summary && (
        <section className="mt-6">

          <SectionTitle title="SUMMARY" />

          <p className="text-sm leading-6 text-gray-700">
            {data.personal.summary}
          </p>

        </section>
      )}


      {/* EXPERIENCE */}

      {data.experience?.length > 0 && (
        <section className="mt-6">

          <SectionTitle title="EXPERIENCE" />

          {data.experience.map((job, index) => (

            <div
              key={index}
              className="mb-4"
            >

              <h3 className="font-bold">
                {job.position}
              </h3>

              <p className="text-sm text-gray-500">
                {job.company}
                {job.startDate && ` | ${job.startDate}`}
                {job.endDate && ` - ${job.endDate}`}
              </p>

              <ul className="mt-2 list-disc pl-5 text-sm leading-6">
                {job.points?.filter(p => p).map((point, i) => (
                  <li key={i}>
                    {point}
                  </li>
                ))}
              </ul>

            </div>

          ))}

        </section>
      )}


      {/* EDUCATION */}

      {data.education?.length > 0 && (
        <section className="mt-6">

          <SectionTitle title="EDUCATION" />

          {data.education.map((edu, index) => (

            <div
              key={index}
              className="mb-3"
            >

              <h3 className="font-bold">
                {edu.degree}
                {edu.fieldOfStudy && ` in ${edu.fieldOfStudy}`}
              </h3>

              <p className="text-sm text-gray-600">
                {edu.university}
              </p>

              <p className="text-xs text-gray-500">
                {edu.startYear && edu.endYear && `${edu.startYear} - ${edu.endYear}`}
                {edu.cgpa && ` | CGPA: ${edu.cgpa}`}
              </p>

            </div>

          ))}

        </section>
      )}


      {/* SKILLS */}

      {data.skills?.length > 0 && (
        <section className="mt-6">

          <SectionTitle title="SKILLS" />

          <p className="text-sm leading-6 text-gray-700">
            {data.skills.join(", ")}
          </p>

        </section>
      )}


      {/* PROJECTS */}

      {data.projects?.length > 0 && (
        <section className="mt-6">

          <SectionTitle title="PROJECTS" />

          {data.projects.map((project, index) => (

            <div
              key={index}
              className="mb-4"
            >

              <h3 className="font-bold">
                {project.name}
              </h3>

              <p className="text-sm leading-6 text-gray-700">
                {project.description}
              </p>

            </div>

          ))}

        </section>
      )}

    </div>
  );
}


/* ================================================= */
/* MODERN TEMPLATE */
/* ================================================= */

function ModernTemplate({ data }) {
  return (
    <div className="flex min-h-[1120px] w-[794px] bg-white text-black shadow-xl">

      {/* LEFT SIDEBAR */}

      <aside className="w-[230px] bg-[#082d4d] p-8 text-white">

        <h1 className="text-3xl font-bold">
          {data.personal?.name}
        </h1>

        <div className="mt-8">

          <h2 className="border-b border-white/40 pb-2 text-sm font-bold">
            CONTACT
          </h2>

          <p className="mt-3 text-xs leading-5">
            {data.personal?.location}
          </p>

          <p className="mt-2 break-words text-xs leading-5">
            {data.personal?.email}
          </p>

          <p className="mt-2 text-xs">
            {data.personal?.phone}
          </p>

        </div>


        {/* SKILLS */}

        {data.skills?.length > 0 && (
          <div className="mt-8">

            <h2 className="border-b border-white/40 pb-2 text-sm font-bold">
              SKILLS
            </h2>

            <ul className="mt-3 space-y-2 text-xs">

              {data.skills.map((skill, index) => (
                <li key={index}>
                  {skill}
                </li>
              ))}

            </ul>

          </div>
        )}

      </aside>


      {/* RIGHT CONTENT */}

      <div className="flex-1 p-10">

        {/* SUMMARY */}

        {data.personal?.summary && (
          <section className="mb-7">

            <ModernTitle title="PROFILE" />

            <p className="text-sm leading-6 text-gray-600">
              {data.personal.summary}
            </p>

          </section>
        )}


        {/* EXPERIENCE */}

        {data.experience?.length > 0 && (
          <section className="mb-7">

            <ModernTitle title="EXPERIENCE" />

            {data.experience.map((job, index) => (

              <div
                key={index}
                className="mb-5"
              >

                <h3 className="font-bold">
                  {job.position}
                </h3>

                <p className="text-sm text-gray-500">
                  {job.company}
                  {job.startDate && ` | ${job.startDate}`}
                  {job.endDate && ` - ${job.endDate}`}
                </p>

                <ul className="mt-2 list-disc pl-5 text-sm leading-6">
                  {job.points?.filter(p => p).map((point, i) => (
                    <li key={i}>
                      {point}
                    </li>
                  ))}
                </ul>

              </div>

            ))}

          </section>
        )}


        {/* EDUCATION */}

        {data.education?.length > 0 && (
          <section className="mb-7">

            <ModernTitle title="EDUCATION" />

            {data.education.map((edu, index) => (

              <div
                key={index}
                className="mb-4"
              >

                <h3 className="font-bold">
                  {edu.degree}
                  {edu.fieldOfStudy && ` in ${edu.fieldOfStudy}`}
                </h3>

                <p className="text-sm text-gray-500">
                  {edu.university}
                </p>

                <p className="text-xs text-gray-500">
                  {edu.startYear && edu.endYear && `${edu.startYear} - ${edu.endYear}`}
                  {edu.cgpa && ` | CGPA: ${edu.cgpa}`}
                </p>

              </div>

            ))}

          </section>
        )}


        {/* PROJECTS */}

        {data.projects?.length > 0 && (
          <section>

            <ModernTitle title="PROJECTS" />

            {data.projects.map((project, index) => (

              <div
                key={index}
                className="mb-4"
              >

                <h3 className="font-bold">
                  {project.name}
                </h3>

                <p className="text-sm leading-6 text-gray-600">
                  {project.description}
                </p>

              </div>

            ))}

          </section>
        )}

      </div>

    </div>
  );
}


/* ================================================= */
/* HELPERS */
/* ================================================= */

function SectionTitle({ title }) {
  return (
    <h2 className="mb-3 border-b border-black pb-1 text-sm font-bold">
      {title}
    </h2>
  );
}


function ModernTitle({ title }) {
  return (
    <h2 className="mb-4 border-b-2 border-[#082d4d] pb-2 text-lg font-bold text-[#082d4d]">
      {title}
    </h2>
  );
}
