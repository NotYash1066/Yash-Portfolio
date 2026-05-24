"""Portfolio data module — single source of truth for the TUI portfolio.

Mirrors the web portfolio's src/config/profile.ts and content/projects/*.
"""

PROFILE = {
    "name": "Yash Karthiya",
    "role": "3rd-Year Computer Engineering Student",
    "location": "Nadiad, Gujarat, India",
    "university": "Dharmsinh Desai University",
    "cgpa": "8.29 / 10.0",
    "graduationYear": "2027",
    "email": "yash.karthiya.1066@gmail.com",
    "phone": "+91 87990 06562",
    "github": "https://github.com/NotYash1066",
    "linkedin": "https://www.linkedin.com/in/yash-karthiya-b03906336/",
    "signatureLine": (
        "I build robust systems, optimize backend performance, "
        "and write clear technical documentation."
    ),
    "heroDescription": (
        "Computer Engineering student focused on building scalable "
        "backend systems, AI applications, and robust APIs."
    ),
    "heroSubtext": (
        "Currently in my 3rd year of Computer Engineering at DDU, Nadiad. "
        "I specialize in backend development, system design, "
        "and building reliable production software."
    ),
    "currentFocus": (
        "Developing scalable backend systems and implementing "
        "practical AI workflows using modern tools."
    ),
    "closingLine": (
        "Focus on shipping reliable software — "
        "one build, one bug, one commit at a time."
    ),
}

CURRENT = {
    "learning": [
        "AI agents & applied AI",
        "RAG & embedding models",
        "System design",
        "Better engineering writing",
    ],
    "building": [
        "Living Engineering Archive",
        "Exploring AI agent workflows",
    ],
    "reading": (
        "Currently exploring advanced system design, distributed "
        "architectures, and LLM optimization."
    ),
    "struggle": (
        "Balancing core academic coursework with building "
        "production-grade projects and learning cloud deployment."
    ),
    "obsession": (
        "Rapid prototyping with AI, optimizing database queries, "
        "and improving system reliability."
    ),
    "improving": (
        "Writing cleaner, more maintainable code and improving "
        "my understanding of complex system architectures."
    ),
    "nextMilestone": (
        "Secure a Software Engineering internship to gain hands-on "
        "experience with high-scale production systems."
    ),
}

BELIEFS = [
    "Good engineers write clear documentation.",
    "Bugs are just unhandled edge cases.",
    "Optimize for readability and maintainability.",
    "Learn in public through consistent iteration.",
    "Every system should be observable and scalable.",
    "Ship early, test often, and iterate.",
]

OPERATING_PRINCIPLES = [
    "Build the simplest working version first.",
    "Prefer clarity over cleverness in code.",
    "Document architectural decisions thoroughly.",
    "Write tests for critical paths.",
    "Finish core features before adding complexity.",
    "Deployment is the ultimate reality check.",
]

FAVORITE_TOOLS = [
    ("Languages", ["Java", "Python", "TypeScript"]),
    ("Backend", ["Spring Boot", "FastAPI", "Node.js", "Express"]),
    ("Frontend", ["React", "Next.js"]),
    ("Databases", ["PostgreSQL", "MongoDB", "Redis"]),
    ("DevOps", ["Docker", "Linux", "Git"]),
    ("AI/ML", ["LangChain", "Google Gemini", "pgvector"]),
]

LANGUAGES = [
    ("English", "Professional"),
    ("Hindi", "Native"),
    ("Gujarati", "Native"),
]

QUOTES = [
    "Focus on shipping reliable software — one build, one bug, one commit at a time.",
    ("Bugs are not interruptions. They are the strict curriculum "
     "of a better engineer."),
    ("Good systems are built on clarity, not cleverness. "
     "Make the architecture easy for the next person."),
    ("We don't just write code for machines. "
     "We write code to communicate intent to other engineers."),
    "Complex systems fail in complex ways. The goal is to recover gracefully, not just prevent failure.",
    "If it works locally but fails in production, it's not done. Deployment is the ultimate reality check.",
]

PROJECTS = [
    {
        "title": "CollegeInfo-Agent",
        "summary": (
            "A multi-college RAG assistant that ingests syllabi, "
            "placement notices, and calendars — then answers student "
            "queries with source-backed responses."
        ),
        "stack": [
            "FastAPI", "React", "Supabase", "pgvector",
            "LangChain", "Google Gemini", "Python",
        ],
        "role": "Full-stack Developer",
        "github": "https://github.com/NotYash1066",
        "status": "Completed",
        "featured": True,
    },
    {
        "title": "Safe Plate",
        "summary": (
            "A food ingredient scanner that reads packaging labels via OCR, "
            "classifies ingredients by health impact, and scores products "
            "— built in 36 hours at DUHacks 5.0 (Top 10 Finalist)."
        ),
        "stack": [
            "FastAPI", "React", "Tesseract OCR", "OpenCV",
            "Google Gemini", "Python", "Tailwind CSS",
        ],
        "role": "Full-stack Developer",
        "github": "https://github.com/NotYash1066",
        "status": "Completed",
        "featured": True,
    },
    {
        "title": "Shop Management System",
        "summary": (
            "A Spring Boot inventory system with sub-50ms Redis caching, "
            "PostgreSQL schema design, and a REST API handling products, "
            "categories, suppliers, and employees."
        ),
        "stack": [
            "Spring Boot", "Java 17", "PostgreSQL",
            "Redis", "Docker", "JUnit", "Mockito",
        ],
        "role": "Backend Developer",
        "github": "https://github.com/NotYash1066/shop-management-system",
        "status": "Completed",
        "featured": True,
    },
    {
        "title": "SkillSwap",
        "summary": (
            "A peer-to-peer skill exchange platform with real-time video calls, "
            "algorithm-based matching, and collaborative whiteboard — "
            "built solo with WebRTC signaling from scratch."
        ),
        "stack": [
            "Node.js", "Express", "React", "MongoDB",
            "Socket.io", "WebRTC", "JWT",
        ],
        "role": "Full-stack Developer",
        "github": "https://github.com/NotYash1066/Skill-Swap",
        "status": "Completed",
        "featured": True,
    },
]
