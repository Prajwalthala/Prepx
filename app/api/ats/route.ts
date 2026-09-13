import { NextRequest, NextResponse } from "next/server";
import mammoth from "mammoth";
import PDFParser from "pdf2json";

export const runtime = "nodejs";

/* =====================================================
   ATS KEYWORDS
===================================================== */

const keywords = [
  "javascript",
  "typescript",
  "react",
  "next.js",
  "nextjs",
  "node.js",
  "nodejs",
  "express",
  "python",
  "java",
  "c++",
  "html",
  "css",
  "tailwind",
  "mongodb",
  "mysql",
  "postgresql",
  "sql",
  "git",
  "github",
  "docker",
  "aws",
  "api",
  "rest api",
  "redux",
  "figma",
  "dsa",
  "data structures",
  "algorithms",
  "problem solving",
];

/* =====================================================
   RESUME SECTIONS
===================================================== */

const sections = [
  "summary",
  "experience",
  "education",
  "skills",
  "projects",
  "certifications",
];

/* =====================================================
   PDF TEXT EXTRACTION
===================================================== */

function extractPdfText(
  buffer: Buffer
): Promise<string> {
  return new Promise((resolve, reject) => {
    const pdfParser = new PDFParser();

    pdfParser.on(
      "pdfParser_dataError",
      (error: any) => {
        reject(
          error?.parserError ||
            error ||
            new Error(
              "Unable to parse PDF."
            )
        );
      }
    );

    pdfParser.on(
      "pdfParser_dataReady",
      (pdfData: any) => {
        try {
          let text = "";

          for (
            const page of pdfData.Pages || []
          ) {
            for (
              const textObject of page.Texts || []
            ) {
              for (
                const textRun of textObject.R || []
              ) {
                if (textRun.T) {
                  try {
                    text +=
                      decodeURIComponent(
                        textRun.T
                      ) + " ";
                  } catch {
                    text +=
                      textRun.T + " ";
                  }
                }
              }
            }

            text += "\n";
          }

          resolve(text);
        } catch (error) {
          reject(error);
        }
      }
    );

    pdfParser.parseBuffer(buffer);
  });
}

/* =====================================================
   ATS ANALYSIS
===================================================== */

function analyzeResume(text: string) {
  const normalizedText =
    text.toLowerCase();

  /* =================================================
     KEYWORDS
  ================================================= */

  const keywordResults =
    keywords.map((keyword) => ({
      name: keyword,

      found:
        normalizedText.includes(
          keyword.toLowerCase()
        ),
    }));

  const matchedKeywords =
    keywordResults.filter(
      (keyword) => keyword.found
    ).length;

  /* =================================================
     SECTIONS
  ================================================= */

  const sectionResults =
    sections.map((section) => ({
      name: section,

      found:
        normalizedText.includes(
          section
        ),
    }));

  const matchedSections =
    sectionResults.filter(
      (section) => section.found
    ).length;

  /* =================================================
     SCORE
  ================================================= */

  let score = 0;

  // Keywords = 40 points

  score +=
    (matchedKeywords /
      keywords.length) *
    40;

  // Sections = 30 points

  score +=
    (matchedSections /
      sections.length) *
    30;

  // Resume length = 10 points

  if (text.length >= 500) {
    score += 5;
  }

  if (text.length >= 1000) {
    score += 5;
  }

  // Email = 5 points

  const hasEmail =
    /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i.test(
      text
    );

  if (hasEmail) {
    score += 5;
  }

  // Phone = 5 points

  const hasPhone =
    /(?:\+91[\s-]?)?[6-9]\d{9}/.test(
      text
    );

  if (hasPhone) {
    score += 5;
  }

  // Action verbs = 5 points

  const hasActionVerbs =
    /developed|created|built|implemented|designed|improved|optimized|managed|led|engineered/i.test(
      text
    );

  if (hasActionVerbs) {
    score += 5;
  }

  score = Math.min(
    100,
    Math.round(score)
  );

  /* =================================================
     SCORE LABEL
  ================================================= */

  let label = "Poor";

  let description =
    "Your resume needs significant improvement.";

  if (score >= 80) {
    label = "Excellent";

    description =
      "Your resume has a strong ATS-friendly structure.";
  } else if (score >= 60) {
    label = "Good";

    description =
      "Your resume is reasonably ATS-friendly but can be improved.";
  } else if (score >= 40) {
    label = "Needs Improvement";

    description =
      "There are several areas you should improve.";
  }

  /* =================================================
     SUGGESTIONS
  ================================================= */

  const suggestions: string[] = [];

  const missingSections =
    sectionResults
      .filter(
        (section) => !section.found
      )
      .map(
        (section) => section.name
      );

  if (missingSections.length > 0) {
    suggestions.push(
      `Consider adding these sections: ${missingSections.join(
        ", "
      )}.`
    );
  }

  const missingKeywords =
    keywordResults
      .filter(
        (keyword) => !keyword.found
      )
      .map(
        (keyword) => keyword.name
      );

  if (missingKeywords.length > 0) {
    suggestions.push(
      `Consider adding relevant skills such as ${missingKeywords
        .slice(0, 6)
        .join(
          ", "
        )} if you genuinely have those skills.`
    );
  }

  if (text.length < 500) {
    suggestions.push(
      "Your resume appears short. Add relevant projects, experience, education and skills."
    );
  }

  if (!hasEmail) {
    suggestions.push(
      "Add a professional email address."
    );
  }

  if (!hasPhone) {
    suggestions.push(
      "Add a phone number to your contact information."
    );
  }

  const hasNumbers =
    /\d+%|\d+\+|\d+ users|\d+ projects|\d+ years/i.test(
      text
    );

  if (!hasNumbers) {
    suggestions.push(
      "Add measurable achievements such as percentages, users, projects or performance improvements."
    );
  }

  if (suggestions.length === 0) {
    suggestions.push(
      "Your resume looks ATS-friendly. Keep your formatting simple and relevant."
    );
  }

  return {
    score,

    scoreInfo: {
      label,
      description,
    },

    keywords: keywordResults,

    sections: sectionResults,

    suggestions,

    stats: {
      characters: text.length,

      words: text
        .split(/\s+/)
        .filter(Boolean).length,

      matchedKeywords,

      totalKeywords:
        keywords.length,

      matchedSections,

      totalSections:
        sections.length,
    },
  };
}

/* =====================================================
   POST /api/ats
===================================================== */

export async function POST(
  request: NextRequest
) {
  try {
    console.log(
      "======================================"
    );

    console.log(
      "ATS API REQUEST RECEIVED"
    );

    /* =================================================
       FORM DATA
    ================================================= */

    const formData =
      await request.formData();

    const file =
      formData.get("resume");

    /* =================================================
       CHECK FILE
    ================================================= */

    if (!(file instanceof File)) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Resume file was not received.",
        },
        { status: 400 }
      );
    }

    console.log(
      "File:",
      file.name
    );

    /* =================================================
       CHECK SIZE
    ================================================= */

    if (
      file.size >
      5 * 1024 * 1024
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Resume must be smaller than 5 MB.",
        },
        { status: 400 }
      );
    }

    /* =================================================
       CHECK EXTENSION
    ================================================= */

    const fileName =
      file.name.toLowerCase();

    const isPDF =
      fileName.endsWith(".pdf");

    const isDOCX =
      fileName.endsWith(".docx");

    if (!isPDF && !isDOCX) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Only PDF and DOCX files are supported.",
        },
        { status: 400 }
      );
    }

    /* =================================================
       BUFFER
    ================================================= */

    const arrayBuffer =
      await file.arrayBuffer();

    const buffer =
      Buffer.from(arrayBuffer);

    let resumeText = "";

    /* =================================================
       PDF
    ================================================= */

    if (isPDF) {
      console.log(
        "Extracting PDF text..."
      );

      resumeText =
        await extractPdfText(
          buffer
        );
    }

    /* =================================================
       DOCX
    ================================================= */

    if (isDOCX) {
      console.log(
        "Extracting DOCX text..."
      );

      const result =
        await mammoth.extractRawText(
          {
            buffer,
          }
        );

      resumeText =
        result.value;
    }

    /* =================================================
       CLEAN
    ================================================= */

    resumeText = resumeText
      .replace(/\s+/g, " ")
      .trim();

    console.log(
      "Extracted characters:",
      resumeText.length
    );

    /* =================================================
       EMPTY TEXT
    ================================================= */

    if (!resumeText) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Could not extract text from this resume. If this is a scanned PDF, OCR is required.",
        },
        { status: 400 }
      );
    }

    /* =================================================
       ANALYZE
    ================================================= */

    const analysis =
      analyzeResume(
        resumeText
      );

    console.log(
      "ATS SCORE:",
      analysis.score
    );

    console.log(
      "======================================"
    );

    /* =================================================
       RESPONSE
    ================================================= */

    return NextResponse.json({
      success: true,

      file: {
        name: file.name,
        size: file.size,
        type: file.type,
      },

      ...analysis,
    });
  } catch (error) {
    console.error(
      "======================================"
    );

    console.error(
      "ATS SERVER ERROR:"
    );

    console.error(error);

    console.error(
      "======================================"
    );

    return NextResponse.json(
      {
        success: false,

        message:
          error instanceof Error
            ? error.message
            : "Failed to analyze resume.",
      },
      { status: 500 }
    );
  }
}