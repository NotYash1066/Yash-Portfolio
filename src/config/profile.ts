export const profile = {
  name: "Yash Karthiya",
  role: "3rd-Year Computer Engineering Student",
  location: "Nadiad, Gujarat, India",
  university: "Dharmsinh Desai University",
  cgpa: "8.29 / 10.0",
  graduationYear: "2027",
  email: "yash.karthiya.1066@gmail.com",
  phone: "+91 87990 06562",
  github: "https://github.com/NotYash1066",
  linkedin: "https://www.linkedin.com/in/yash-karthiya-b03906336/",
  resumeVariants: [
    {
      label: "Backend Intern",
      filename: "Yash_Karthiya_Backend_Intern_Candidate.pdf",
      description: "Java/Spring Boot, Node.js, FastAPI — backend systems focus",
    },
    {
      label: "GenAI / RAG",
      filename: "Yash_Karthiya_GenAI_Resume.pdf",
      description: "RAG pipelines, LLM evaluation, retrieval optimization",
    },
    {
      label: "Software Engineering",
      filename: "Yash_karthiya_Software_Engineering_Intern_Resume.pdf",
      description: "Full-stack, backend-leaning — end-to-end product features",
    },
  ],
  resumeLastUpdated: "March 28, 2026",

  signatureLine:
    "I build systems, document the process, and turn bugs into field notes.",

  heroDescription:
    "Computer Engineering student building systems, studying the messy middle, and documenting the lessons bugs leave behind.",

  heroSubtext:
    "I'm in my third year of Computer Engineering at DDU, Nadiad. I build software, break assumptions, write field notes, and turn unfinished understanding into shipped projects.",

  currentFocus:
    "Building backend-heavy systems and learning how to ship AI applications that actually work beyond the tutorial.",

  currentLearning: [
    "AI agents & applied AI",
    "RAG & embedding models",
    "System design",
    "Better engineering writing",
  ],

  currentBuilding: [
    "Living Engineering Archive",
    "Exploring AI agent workflows",
  ],

  currentReading:
    "Currently exploring AI agents, backend systems, system design, and better engineering writing. Recommendations welcome.",

  currentStruggle:
    "Balancing DSA, academics, and building polished portfolio projects while learning modern tools like AI, GitHub, and deployment workflows.",

  currentObsession:
    "Vibe coding — using AI to rapidly prototype ideas, debug faster, and turn rough concepts into working apps while still understanding and cleaning up the code myself.",

  currentImproving:
    "Consistency, communication, and the ability to take feedback well — not just building projects, but explaining my thinking clearly and keeping at it through practice.",

  nextMilestone:
    "Land a strong internship or entry-level role — and eventually use that experience to build something startup-worthy of my own.",

  openTo: [
    "Internships",
    "Full-time roles",
    "Startup opportunities",
    "Open-source collaboration",
  ],

  beliefs: [
    "Good engineers write things down.",
    "Bugs are not interruptions. They are the curriculum.",
    "Make the work easy to understand for the next person.",
    "Learn in public, but with taste.",
    "Every project should leave a trace.",
    "I am still becoming, but I am serious.",
  ],

  operatingPrinciples: [
    "Build the smallest honest version first.",
    "Prefer clarity over cleverness.",
    "Document while the confusion is still fresh.",
    "Let projects expose weak spots.",
    "Finish before starting something new.",
    "If it works locally, it's not done.",
  ],

  favoriteTools: [
    "Java",
    "Spring Boot",
    "Python",
    "FastAPI",
    "TypeScript",
    "React",
    "Next.js",
    "Node.js",
    "PostgreSQL",
    "MongoDB",
    "Redis",
    "Docker",
    "Linux",
    "Git",
  ],

  languages: ["English (Professional)", "Hindi (Native)", "Gujarati (Native)"],

  closingLine:
    "I'm not trying to look perfect. I'm trying to become undeniable — one build, one bug, one note at a time.",

  footerLine: "Built as a living archive, not a static resume.",
} as const;

export type ProfileConfig = typeof profile;
