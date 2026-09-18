"use client";
import Navbar from "../../components/Navbar";
import { FormEvent, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";

function CreateResumeForm() {

  const router = useRouter();
  const searchParams = useSearchParams();

  const selectedTemplate =
    searchParams.get("template") || "classic";


  /* ================= PERSONAL DETAILS ================= */

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const[summary,setSummary]=useState("");
  const[location,setLocation]=useState("");

  const [linkedin, setLinkedin] = useState("");
  const [github, setGithub] = useState("");
  const [portfolio, setPortfolio] = useState("");


  /* ================= EDUCATION ================= */

  const [degree, setDegree] = useState("");
  const [fieldOfStudy, setFieldOfStudy] = useState("");
  const [university, setUniversity] = useState("");

  const [startYear, setStartYear] = useState("");
  const [endYear, setEndYear] = useState("");
  const [cgpa, setCgpa] = useState("");


  /* ================= EXPERIENCE ================= */

  const [experience, setExperience] = useState<Array<{
    company: string;
    position: string;
    startDate: string;
    endDate: string;
    points: string[];
  }>>([{
    company: "",
    position: "",
    startDate: "",
    endDate: "",
    points: [""]
  }]);


  /* ================= PROJECTS ================= */

  const [projects, setProjects] = useState<Array<{
    name: string;
    description: string;
  }>>([{
    name: "",
    description: ""
  }]);


  /* ================= SKILLS ================= */

  const [skills, setSkills] = useState("");


  /* ================= EXPERIENCE HANDLERS ================= */

  const addExperience = () => {
    setExperience([
      ...experience,
      {
        company: "",
        position: "",
        startDate: "",
        endDate: "",
        points: [""]
      }
    ]);
  };

  const updateExperience = (index: number, field: string, value: any) => {
    const updated = [...experience];
    updated[index] = { ...updated[index], [field]: value };
    setExperience(updated);
  };

  const removeExperience = (index: number) => {
    setExperience(experience.filter((_, i) => i !== index));
  };

  const updateExperiencePoint = (expIndex: number, pointIndex: number, value: string) => {
    const updated = [...experience];
    updated[expIndex].points[pointIndex] = value;
    setExperience(updated);
  };

  const addExperiencePoint = (expIndex: number) => {
    const updated = [...experience];
    updated[expIndex].points.push("");
    setExperience(updated);
  };

  const removeExperiencePoint = (expIndex: number, pointIndex: number) => {
    const updated = [...experience];
    updated[expIndex].points = updated[expIndex].points.filter((_, i) => i !== pointIndex);
    setExperience(updated);
  };


  /* ================= PROJECTS HANDLERS ================= */

  const addProject = () => {
    setProjects([...projects, { name: "", description: "" }]);
  };

  const updateProject = (index: number, field: string, value: string) => {
    const updated = [...projects];
    updated[index] = { ...updated[index], [field]: value };
    setProjects(updated);
  };

  const removeProject = (index: number) => {
    setProjects(projects.filter((_, i) => i !== index));
  };


  /* ================= SUBMIT ================= */

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {

    e.preventDefault();

    const resumeData = {

      template: selectedTemplate,

      personal: {
        name,
        email,
        phone,
        summary,
        location,   
        linkedin,
        github,
        portfolio,
      },

      education: [
        {
          degree,
          fieldOfStudy,
          university,
          startYear,
          endYear,
          cgpa,
        }
      ],

      experience: experience.filter(exp => 
        exp.company || exp.position || exp.points.some(p => p)
      ),

      projects: projects.filter(proj => 
        proj.name || proj.description
      ),

      skills: skills
        .split(",")
        .map((skill) => skill.trim())
        .filter(Boolean),

    };


    console.log("Resume Data:", resumeData);


    /*
      For now we store it in localStorage.

      Later we can send this data to your
      Node/Express backend and MongoDB.
    */

    localStorage.setItem(
      "resumeData",
      JSON.stringify(resumeData)
    );


    /* Go to resume editor */

    router.push(
     `/template/create/preview?template=${selectedTemplate}`
    );
  };


  return (

    <main className="min-h-screen bg-[#f7f6fc]">
        <Navbar/>


      {/* ================= FORM ================= */}

      <div className="mx-auto max-w-4xl px-6 py-10 text-black">

        <div className="mb-8">

          <h1 className="text-3xl font-bold">
            Create Your Resume
          </h1>

          <p className="mt-2 text-gray-500">
            Fill in your details to generate your resume.
          </p>

        </div>


        <form
          onSubmit={handleSubmit}
          className="space-y-8"
        >


          {/* ================= PERSONAL INFORMATION ================= */}

          <FormSection
            title="Personal Information"
            description="Enter your basic contact information."
          >

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

              <Input
                label="Full Name"
                placeholder="Full Name"
                value={name}
                onChange={setName}
                required
              />


              <Input
                label="Email"
                type="email"
                placeholder="yourname@gmail.com"
                value={email}
                onChange={setEmail}
                required
              />


              <Input
                label="Phone Number"
                placeholder="+91 **********"
                value={phone}
                onChange={setPhone}
                required
              />
              <Input
                label="Summary "
                placeholder="write about yourself"
                value={summary}
                onChange={setSummary}
                required
              /> 
              <Input
                label="Location"
                placeholder="Bhubaneswar,Odisha"
                value={location}
                onChange={setLocation}
                required
              />

            </div>

          </FormSection>


          {/* ================= LINKS ================= */}

          <FormSection
            title="Professional Links"
            description="Add links that you want to display on your resume."
          >

            <div className="space-y-5">

              <Input
                label="LinkedIn"
                placeholder="https://linkedin.com/in/yourname"
                value={linkedin}
                onChange={setLinkedin}
              />


              <Input
                label="GitHub"
                placeholder="https://github.com/yourname"
                value={github}
                onChange={setGithub}
              />


              <Input
                label="Portfolio"
                placeholder="https://yourportfolio.com"
                value={portfolio}
                onChange={setPortfolio}
              />

            </div>

          </FormSection>


          {/* ================= EDUCATION ================= */}

          <FormSection
            title="Education"
            description="Add your most recent educational qualification."
          >

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

              <Input
                label="Degree"
                placeholder="B.Tech"
                value={degree}
                onChange={setDegree}
                required
              />


              <Input
                label="Field of Study"
                placeholder="Robotics & Ai"
                value={fieldOfStudy}
                onChange={setFieldOfStudy}
                required
              />


              <Input
                label="University / College"
                placeholder="Odisha University of Technology and Research"
                value={university}
                onChange={setUniversity}
                required
              />


              <Input
                label="CGPA"
                placeholder=""
                value={cgpa}
                onChange={setCgpa}
              />


              <div>

                <label className="mb-2 block text-sm font-medium">
                  Start Year
                </label>

                <select
                  value={startYear}
                  onChange={(e) =>
                    setStartYear(e.target.value)
                  }
                  required
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none focus:border-[#5146e5] focus:ring-2 focus:ring-[#5146e5]/20"
                >

                  <option value="">
                    Select year
                  </option>

                  {Array.from(
                    { length: 15 },
                    (_, i) => 2020 + i
                  ).map((year) => (

                    <option
                      key={year}
                      value={year}
                    >
                      {year}
                    </option>

                  ))}

                </select>

              </div>


              <div>

                <label className="mb-2 block text-sm font-medium">
                  End Year
                </label>

                <select
                  value={endYear}
                  onChange={(e) =>
                    setEndYear(e.target.value)
                  }
                  required
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none focus:border-[#5146e5] focus:ring-2 focus:ring-[#5146e5]/20"
                >

                  <option value="">
                    Select year
                  </option>

                  {Array.from(
                    { length: 15 },
                    (_, i) => 2020 + i
                  ).map((year) => (

                    <option
                      key={year}
                      value={year}
                    >
                      {year}
                    </option>

                  ))}

                </select>

              </div>

            </div>

          </FormSection>


          {/* ================= SKILLS ================= */}

          <FormSection
            title="Skills"
            description="Add your technical and professional skills."
          >

            <div>

              <label className="mb-2 block text-sm font-medium">
                Skills
              </label>

              <input
                type="text"
                placeholder="JavaScript, React, Node.js, MongoDB"
                value={skills}
                onChange={(e) =>
                  setSkills(e.target.value)
                }
                required
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none focus:border-[#5146e5] focus:ring-2 focus:ring-[#5146e5]/20"
              />

              <p className="mt-2 text-xs text-gray-400">
                Separate each skill with a comma.
              </p>

            </div>

          </FormSection>


          {/* ================= EXPERIENCE ================= */}

          <FormSection
            title="Experience"
            description="Add your professional work experience."
          >

            <div className="space-y-6">

              {experience.map((exp, index) => (
                <div key={index} className="rounded-lg border border-gray-200 p-5 bg-gray-50">

                  <div className="mb-4 flex items-center justify-between">
                    <h3 className="font-semibold">
                      Experience {index + 1}
                    </h3>
                    {experience.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeExperience(index)}
                        className="text-red-500 text-sm hover:text-red-700"
                      >
                        Remove
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

                    <Input
                      label="Company"
                      placeholder="e.g., Tech Corp"
                      value={exp.company}
                      onChange={(val) => updateExperience(index, "company", val)}
                    />

                    <Input
                      label="Position"
                      placeholder="e.g., Software Engineer"
                      value={exp.position}
                      onChange={(val) => updateExperience(index, "position", val)}
                    />

                    <Input
                      label="Start Date"
                      placeholder="Jan 2020"
                      value={exp.startDate}
                      onChange={(val) => updateExperience(index, "startDate", val)}
                    />

                    <Input
                      label="End Date"
                      placeholder="Present"
                      value={exp.endDate}
                      onChange={(val) => updateExperience(index, "endDate", val)}
                    />

                  </div>

                  <div className="mt-4">
                    <label className="mb-3 block text-sm font-medium">
                      Key Responsibilities / Achievements
                    </label>

                    <div className="space-y-2">
                      {exp.points.map((point, pointIndex) => (
                        <div key={pointIndex} className="flex gap-2">
                          <input
                            type="text"
                            placeholder="e.g., Led development of feature X"
                            value={point}
                            onChange={(e) => updateExperiencePoint(index, pointIndex, e.target.value)}
                            className="flex-1 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm outline-none focus:border-[#5146e5] focus:ring-2 focus:ring-[#5146e5]/20"
                          />
                          {exp.points.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeExperiencePoint(index, pointIndex)}
                              className="text-red-500 hover:text-red-700"
                            >
                              ✕
                            </button>
                          )}
                        </div>
                      ))}
                    </div>

                    <button
                      type="button"
                      onClick={() => addExperiencePoint(index)}
                      className="mt-2 text-sm text-[#5146e5] hover:text-[#4036cc]"
                    >
                      + Add Point
                    </button>

                  </div>

                </div>
              ))}

              <button
                type="button"
                onClick={addExperience}
                className="rounded-lg border border-dashed border-gray-300 px-4 py-2 text-sm text-gray-600 hover:border-[#5146e5] hover:text-[#5146e5]"
              >
                + Add Experience
              </button>

            </div>

          </FormSection>


          {/* ================= PROJECTS ================= */}

          <FormSection
            title="Projects"
            description="Showcase your key projects and accomplishments."
          >

            <div className="space-y-6">

              {projects.map((project, index) => (
                <div key={index} className="rounded-lg border border-gray-200 p-5 bg-gray-50">

                  <div className="mb-4 flex items-center justify-between">
                    <h3 className="font-semibold">
                      Project {index + 1}
                    </h3>
                    {projects.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeProject(index)}
                        className="text-red-500 text-sm hover:text-red-700"
                      >
                        Remove
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 gap-4">

                    <Input
                      label="Project Name"
                      placeholder="e.g., Portfolio Website"
                      value={project.name}
                      onChange={(val) => updateProject(index, "name", val)}
                    />

                    <div>
                      <label className="mb-2 block text-sm font-medium">
                        Project Description
                      </label>
                      <textarea
                        placeholder="Describe your project, technologies used, and your contribution"
                        value={project.description}
                        onChange={(e) => updateProject(index, "description", e.target.value)}
                        rows={4}
                        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none focus:border-[#5146e5] focus:ring-2 focus:ring-[#5146e5]/20"
                      />
                    </div>

                  </div>

                </div>
              ))}

              <button
                type="button"
                onClick={addProject}
                className="rounded-lg border border-dashed border-gray-300 px-4 py-2 text-sm text-gray-600 hover:border-[#5146e5] hover:text-[#5146e5]"
              >
                + Add Project
              </button>

            </div>

          </FormSection>


          {/* ================= BUTTON ================= */}

          <div className="flex justify-end border-t border-gray-200 pt-6">

            <button
            onClick={() =>{
                router.push(`/template/create/preview?template=${selectedTemplate}`);
            }}
              type="submit"
              className="rounded-lg bg-[#5146e5] px-8 py-3 font-semibold text-white shadow-lg shadow-indigo-200 transition hover:bg-[#4036cc]"
            >
              Continue to Resume
            </button>

          </div>

        </form>

      </div>

    </main>
  );
}

export default function CreateResumePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#f7f6fc] flex items-center justify-center text-gray-500">Loading...</div>}>
      <CreateResumeForm />
    </Suspense>
  );
}


/* ======================================================
   FORM SECTION
====================================================== */

function FormSection({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {

  return (

    <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">

      <div className="mb-6">

        <h2 className="text-lg font-semibold">
          {title}
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          {description}
        </p>

      </div>

      {children}

    </section>
  );
}


/* ======================================================
   INPUT
====================================================== */

function Input({
  label,
  placeholder,
  value,
  onChange,
  type = "text",
  required = false,
}: {
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  required?: boolean;
}) {

  return (

    <div>

      <label className="mb-2 block text-sm font-medium">

        {label}

        {required && (
          <span className="ml-1 text-red-500">
            *
          </span>
        )}

      </label>

      <input
        type={type}
        placeholder={placeholder}
        value={value}
        required={required}
        onChange={(e) =>
          onChange(e.target.value)
        }
        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#5146e5] focus:ring-2 focus:ring-[#5146e5]/20"
      />

    </div>
  );
}