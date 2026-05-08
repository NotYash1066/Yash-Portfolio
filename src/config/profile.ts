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
    "I build robust systems, optimize backend performance, and write clear technical documentation.",

  heroDescription:
    "Computer Engineering student focused on building scalable backend systems, AI applications, and robust APIs.",

  heroSubtext:
    "Currently in my 3rd year of Computer Engineering at DDU, Nadiad. I specialize in backend development, system design, and building reliable production software.",

  currentFocus:
    "Developing scalable backend systems and implementing practical AI workflows using modern tools.",

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
    "Currently exploring advanced system design, distributed architectures, and LLM optimization.",

  currentStruggle:
    "Balancing core academic coursework with building production-grade projects and learning cloud deployment.",

  currentObsession:
    "Rapid prototyping with AI, optimizing database queries, and improving system reliability.",

  currentImproving:
    "Writing cleaner, more maintainable code and improving my understanding of complex system architectures.",

  nextMilestone:
    "Secure a Software Engineering internship to gain hands-on experience with high-scale production systems.",

  openTo: [
    "Internships",
    "Full-time roles",
    "Startup opportunities",
    "Open-source collaboration",
  ],

  beliefs: [
    "Good engineers write clear documentation.",
    "Bugs are just unhandled edge cases.",
    "Optimize for readability and maintainability.",
    "Learn in public through consistent iteration.",
    "Every system should be observable and scalable.",
    "Ship early, test often, and iterate.",
  ],

  operatingPrinciples: [
    "Build the simplest working version first.",
    "Prefer clarity over cleverness in code.",
    "Document architectural decisions thoroughly.",
    "Write tests for critical paths.",
    "Finish core features before adding complexity.",
    "Deployment is the ultimate reality check.",
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

  quotes: [
    "Focus on shipping reliable software — one build, one bug, one commit at a time.",
    "Bugs are not interruptions. They are the strict curriculum of a better engineer.",
    "Good systems are built on clarity, not cleverness. Make the architecture easy for the next person.",
    "We don't just write code for machines. We write code to communicate intent to other engineers.",
    "Complex systems fail in complex ways. The goal is to recover gracefully, not just prevent failure.",
    "If it works locally but fails in production, it's not done. Deployment is the ultimate reality check.",
  ],

  closingLine:
    "Focus on shipping reliable software — one build, one bug, one commit at a time.",

  footerLine: "Built as a technical archive and portfolio.",
} as const;

export type ProfileConfig = typeof profile;
