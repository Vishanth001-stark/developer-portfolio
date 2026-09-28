/**
 * Vishanth R — Digital Identity & Engineering Portfolio
 * Featured Engineering Projects Dataset & Case Studies
 */

const filterCategories = [
  { id: "all", label: "All Works" },
  { id: "ai", label: "AI & Full-Stack" },
  { id: "java", label: "Java & OOP" },
  { id: "python", label: "Python & Data" },
  { id: "web", label: "Web Systems" },
  { id: "dsa", label: "Algorithms" }
];

const projectsData = [
  {
    index: "01",
    id: "trevixa-ai",
    title: "Trevixa AI — Meeting Intelligence Platform",
    category: "ai",
    discipline: "FastAPI · React 19 · Whisper & LLM Pipeline",
    badge: "Flagship Applied AI",
    year: "2026",
    role: "Full-Stack AI Engineer & System Architect",
    summary: "A production-grade AI meeting intelligence platform that transcribes audio/video recordings with speaker diarization, extracts consensus decisions, and generates actionable task boards with natural language deadline resolution.",
    description: "Trevixa AI is a production-grade meeting intelligence platform designed to eliminate note-taking fatigue. It ingests multi-format recordings (MP3, WAV, M4A, MP4), normalizes audio with imageio-ffmpeg, runs speech-to-text with speaker diarization across Groq Whisper / OpenAI / Gemini Audio APIs, and executes structured LLM intelligence extraction. It features an interactive synchronized audio player, clickable transcript navigation, consensus decision filtering, natural language deadline resolution, dynamic Recharts analytics, and one-click executive PDF report generation via ReportLab.",
    context: "Teams across high-growth startups spend countless hours in meetings, yet critical outcomes are frequently lost to note-taking fatigue, resulting in unassigned action items, ambiguous decisions, and inefficient 45-minute recording replays.",
    problem: "Commercial meeting recorders often suffer from severe hallucination (fabricating consensus or deadlines), lock users into heavy cloud subscriptions, and lack interactive timestamp synchronization between raw audio waveforms and derived task items.",
    approach: "Engineered an end-to-end decoupled pipeline: a high-performance Python FastAPI backend handling asynchronous audio extraction and multi-provider LLM intelligence pipelines, paired with a modern React 19 / TypeScript frontend. Enforced a strict anti-hallucination mandate with Pydantic v2 schema validation, SQLite/SQLAlchemy relational persistence, automated deadline parsing (e.g., 'by Friday' resolved to absolute calendar dates), and a standalone offline deterministic analyzer.",
    technologies: ["Python 3.11+", "FastAPI", "React 19", "TypeScript", "Tailwind CSS", "Whisper API", "Llama 3.3 / GPT-4o", "SQLAlchemy", "Recharts", "ReportLab PDF", "Docker", "Pytest (20 Tests)"],
    highlights: [
      "Full end-to-end processing pipeline for MP3, WAV, M4A, and MP4 media with local ffmpeg audio extraction.",
      "Timestamp navigation and interactive audio player synchronized with diarized transcript segments.",
      "Evidence-based decision extraction filtering out passive chatter in favor of explicit consensus.",
      "Dynamic action item board with natural language deadline resolution ('by Friday' → calendar dates) and priority filtering.",
      "Recharts visual analytics for topic distribution donuts and attendee participation bar charts.",
      "Automated ReportLab executive PDF generation and plain-text transcript exports.",
      "20 automated unit and integration tests covering schemas, audio validation, persistence, and endpoints (100% passing)."
    ],
    results: "Live production deployment on Vercel, sub-second API responses, 20/20 unit and integration tests passing, and zero hallucinations under rigorous schema validation benchmarks.",
    reflection: "Architecting Trevixa AI illuminated how strict JSON schema constraints and deterministic fallback engines can eliminate non-deterministic LLM hallucinations in mission-critical business intelligence software.",
    architecture: `// PROCESSING PIPELINE & ARCHITECTURE:
├── Media Ingestion     -> MP3, WAV, M4A, MP4 via FastAPI multipart streaming (100MB cap)
├── Audio Extraction   -> Local PCM audio normalization via imageio-ffmpeg
├── Speech-to-Text      -> Multi-provider STT: Groq Whisper Large v3 / OpenAI Whisper / Local diarizer
├── Timestamp Alignment -> Segmented word/speaker chunks with millisecond timecode mapping
├── LLM Intelligence   -> Llama 3.3 / GPT-4o-mini structured JSON extraction via Pydantic v2 schemas
│   ├── Executive Summary & Strategic Takeaways
│   ├── Evidence-Based Decisions (Consensus filter)
│   └── Action Items with Natural Language Date Parser ("by next Monday" -> YYYY-MM-DD)
├── Relational Storage  -> SQLAlchemy 2.0 ORM with SQLite (meetings, transcripts, decisions, tasks)
├── Interactive Client  -> React 19 + TypeScript + Vite + Tailwind CSS + Recharts + Synced Audio Player
└── Executive Export    -> Automated ReportLab 5.0 PDF generation & transcript downloads`,
    quickStart: `# Clone repository
git clone https://github.com/Vishanth001-stark/trevixa-ai.git
cd trevixa-ai

# Backend Setup (FastAPI)
python -m venv .venv
.venv\\Scripts\\activate # or source .venv/bin/activate
pip install -r requirements.txt
python -m uvicorn backend.main:app --host 127.0.0.1 --port 8000 --reload

# Frontend Setup (React 19 + Vite)
cd frontend
npm install
npm run dev

# Run automated test suite (20 unit tests)
cd ..
python -m pytest tests -v`,
    github: "https://github.com/Vishanth001-stark/trevixa-ai",
    live: "https://frontend-delta-six-32.vercel.app/"
  },
  {
    index: "02",
    id: "student-management-system",
    title: "Student Management System",
    category: "java",
    discipline: "Java 17 · OOP Architecture",
    badge: "Core Architecture",
    year: "2026",
    role: "Lead Software Architect",
    summary: "An academic administration console engineered in Java 17 adhering to strict object-oriented contracts with atomic CSV persistence.",
    description: "An academic administration system engineered in Java 17. Built around core Object-Oriented design patterns: abstract class contracts (Person) providing encapsulation and polymorphic behavior, concrete extension (Student) implementing dynamic GPA computation on a 10.0 scale, and an atomic file storage manager that prevents CSV state corruption across application executions.",
    context: "Academic institutions frequently require lightweight, resilient record management systems that can execute reliably in offline and terminal-first environments without requiring heavyweight external database daemons.",
    problem: "Traditional console-based record managers often interweave file persistence directly with user I/O, risk fatal file corruption during abrupt shutdowns or write failures, and fail to enforce defensive copying across object boundaries.",
    approach: "Designed a layered architecture enforcing strict separation of concerns. Employed abstract contracts (Person base class), polymorphic grading algorithms, an in-memory hash-indexed lookup table for O(1) roll number queries, and an atomic write-staging mechanism utilizing temporary (.tmp) files that are only atomically renamed upon write verification.",
    technologies: ["Java 17", "OOP Architecture", "File I/O", "CSV Storage", "Automated Testing"],
    highlights: [
      "Strict OOP implementation utilizing Abstraction, Inheritance, and Encapsulation with defensive copying.",
      "Engineered full CRUD operations enabling search by roll number, record modification, and formatted tabular display.",
      "Integrated atomic persistent CSV file handling (FileStorageManager) guaranteeing data integrity on disk.",
      "Built-in automated test suite with 33 unit and integration test assertions (all passing)."
    ],
    results: "Achieved 100% test pass rate across 33 assertions, zero disk write corruption under simulated interrupts, and sub-millisecond in-memory record lookup times.",
    reflection: "Reinforced the critical importance of defensive copying and immutable contracts in core systems programming, proving that clean architectural boundaries make software inherently testable.",
    architecture: `// ARCHITECTURAL DESIGN & CONTRACTS:
├── model.Person (Abstract Base)
│   ├── Encapsulates: name, email, contactNumber
│   └── Abstract contracts: getRole(), getFormattedSummary()
├── model.Student (extends Person)
│   ├── Inherits identity, encapsulates rollNumber, course, semester, attendance, subjectMarks
│   └── Computes: GPA (10.0 scale), Letter Grade (O to F), CSV serialization/deserialization
├── service.StudentService
│   ├── In-memory hash-indexed lookup for O(1) roll number queries
│   └── Batch analytics: average GPA, highest/lowest marks, attendance alerts (< 75%)
└── util.FileStorageManager
    └── Atomic write staging via temporary files (.tmp) replaced on success`,
    quickStart: `# Navigate to project folder
cd 02-student-management-system

# Compile all source files
compile.bat

# Launch the interactive console system
run.bat

# Execute the 33-assertion automated test suite
run_tests.bat`,
    github: "https://github.com/Vishanth001-stark/student-management-system"
  },
  {
    index: "03",
    id: "expense-budget-tracker",
    title: "Personal Expense & Budget Tracker",
    category: "python",
    discipline: "Python 3 · CLI Analytics",
    badge: "Data & Systems",
    year: "2026",
    role: "System Designer & Developer",
    summary: "An automated personal finance CLI engine enabling daily expenditure logging, category spending aggregation, and threshold analytics.",
    description: "A robust personal finance engine written in Python 3. Features modular separation of concerns between domain models, boundary validators, persistence, and analytics. Computes category percentage allocations, renders dynamic ASCII distribution meters directly in the terminal, and triggers instant early-warning alerts when monthly consumption crosses 80% or exceeds budget caps.",
    context: "Personal financial tracking requires immediate feedback loops and reliable data preservation without requiring clunky manual spreadsheets or internet-dependent SaaS trackers.",
    problem: "Manual financial logging suffers from dirty data entries, inconsistent date formatting, accidental file truncation during writes, and lack of automated alerts before budgets are completely blown.",
    approach: "Built a modular Python engine with strict regex validation for dates and positive amounts, a persistent storage layer with automated .backup snapshot creation, and an analytics pipeline that calculates category proportions and ASCII distribution meters.",
    technologies: ["Python 3", "CSV Persistence", "CLI Analytics", "Data Validation", "Unit Testing"],
    highlights: [
      "Automated expense ingestion with strict format validation for dates, positive amounts, and categories.",
      "Dynamic category aggregation with percentage share calculation and terminal ASCII progress bars.",
      "Real-time monthly budget tracking with early warnings at 80% threshold and critical alerts if exceeded.",
      "Modular CSV storage manager with atomic saving, corrupted record recovery, and automated .backup snapshots."
    ],
    results: "Validated through 10 comprehensive unit tests covering models, persistence, and analytics with zero regression across edge test cases.",
    reflection: "Designing resilient persistence layers provided deep insights into defensive programming and handling dirty real-world input at the system boundary.",
    architecture: `// MODULAR SUBSYSTEMS:
├── models.py      -> Dataclasses for Expense & MonthlyBudget with dictionary serialization
├── validators.py  -> Strict regex and boundary checks for dates (ISO/today), amounts, and payment types
├── storage.py     -> Atomic CSV writer with tempfile staging, error tolerance, and .backup snapshots
├── analytics.py   -> Category aggregation, monthly filtering, budget threshold alerts, and ASCII meters
├── tracker.py     -> High-level coordinator for CRUD, search filters, and summary export
└── test_expense_tracker.py -> 10 automated unit test cases (models, persistence, analytics)`,
    quickStart: `# Navigate to project directory
cd 03-personal-expense-tracker

# Launch interactive CLI
python main.py

# Or launch via Windows batch script
run.bat

# Run automated test suite
python -m unittest test_expense_tracker.py`,
    github: "https://github.com/Vishanth001-stark/expense-budget-tracker"
  },
  {
    index: "04",
    id: "portfolio-platform",
    title: "Personal Developer Digital Identity",
    category: "web",
    discipline: "Web Systems · Editorial Engineering",
    badge: "Digital Identity",
    year: "2026",
    role: "Lead Engineer & Designer",
    summary: "A bespoke, highly intentional personal digital identity crafted with Obsidian & Bone editorial aesthetics, semantic HTML5, and automated CI/CD.",
    description: "An intentional digital identity engineered with semantic HTML5, pure CSS custom properties, and zero generic AI bloat. Features an Obsidian and Bone editorial visual system with Acid Lime accents, dynamic project filtering and search, client-side contact validation, and an automated GitHub Actions CI/CD pipeline.",
    context: "In an era saturated with template-driven developer websites and generic AI gradients, engineers need a distinctive personal presence that communicates taste, architectural precision, and respect for typography.",
    problem: "Most developer portfolios rely on purple gradient blobs, distracting glassmorphism, and fake skill percentage bars that fail to communicate genuine engineering rigor.",
    approach: "Constructed an editorial design system rooted in Swiss/editorial typography, razor-sharp spacing ratios, accessible contrast levels, sub-300ms transitions, and an automated zero-downtime deployment workflow.",
    technologies: ["HTML5", "CSS3", "JavaScript (ES6+)", "GitHub Pages", "CI/CD Pipeline"],
    highlights: [
      "Distinctive dark editorial palette: Obsidian (#0D0E0C), Graphite (#151713), Bone (#F1F0E8), and Acid Lime (#C7F000).",
      "Dynamic DOM manipulation for live category filtering and instantaneous keyword search.",
      "Functional asynchronous contact transmission with client-side validation and direct mail fallback.",
      "Zero-downtime continuous deployment configured via GitHub Pages CI/CD workflow (.github/workflows/deploy.yml)."
    ],
    results: "Scores 100 on Performance and Accessibility benchmarks with instant page load, zero layout shift, and flawless responsiveness across viewports.",
    reflection: "Demonstrated that restraint, typographic hierarchy, and intentional design choices convey technical maturity more powerfully than superficial visual effects.",
    architecture: `// CLIENT-SIDE ARCHITECTURE:
├── index.html       -> Semantic HTML5 markup with ARIA landmarks & editorial structure
├── css/style.css    -> Obsidian/Bone palette, typographic scales, responsive editorial layouts
├── js/projects-data.js -> Structured dataset with architectural specifications and case study metrics
├── js/main.js       -> Controllers: sticky navigation, project filters, search, modal, copy system
└── .github/workflows/deploy.yml -> Automated zero-downtime GitHub Pages deployment on push to main`,
    quickStart: `# Clone repository
git clone https://github.com/Vishanth001-stark/developer-portfolio.git
cd developer-portfolio

# Start lightweight local server
python -m http.server 8080

# Or open index.html directly in any modern browser!`,
    github: "https://github.com/Vishanth001-stark/developer-portfolio",
    live: "https://vishanth001-stark.github.io/developer-portfolio/"
  },
  {
    index: "05",
    id: "algorithmic-problem-solving",
    title: "Competitive Algorithmic Solutions (100+ Solved)",
    category: "dsa",
    discipline: "Algorithms · Computational Logic",
    badge: "Problem Solving",
    year: "2026",
    role: "Competitive Programmer",
    summary: "Curated collection of 100+ verified algorithmic implementations across LeetCode and GeeksforGeeks platforms.",
    description: "A disciplined repository documenting competitive programming solutions focused on optimal time and space complexity bounds (Big-O analysis). Covers fundamental data structures and algorithmic paradigms including Two Pointers, Sliding Window, Prefix Sums, Recursion, and Linked List pointer manipulations in Python, Java, and C.",
    context: "Mastery of algorithmic patterns is essential for reasoning about memory allocation, execution bottlenecks, and scalable software architecture.",
    problem: "Unstructured problem solving without formal complexity proofs often leads to inefficient O(N²) solutions and fragile edge-case handling.",
    approach: "Catalogued solutions by core design pattern, documenting verified Big-O runtime and auxiliary memory bounds for every problem alongside edge case testing harnesses.",
    technologies: ["Data Structures", "Algorithms", "Python", "Java", "C", "Complexity Analysis"],
    highlights: [
      "100+ solved problems across LeetCode and GeeksforGeeks with verified complexity bounds.",
      "Documented Big-O runtime and auxiliary space analysis for every implementation.",
      "Strong foundation in arrays, strings, recursion, two-pointer techniques, and linked list traversal.",
      "Active participant in collegiate hackathons and algorithmic competitions."
    ],
    results: "Over 100 verified solutions with optimal asymptotic complexity across LeetCode and GeeksforGeeks.",
    reflection: "Consistent competitive problem solving trains the mind to deconstruct complex multi-variable problems into clean, composable subroutines.",
    architecture: `// ALGORITHMIC SPECIALIZATIONS:
├── Arrays & Hashing    -> Hash maps, frequency tracking, prefix sums, two-sum variations
├── Two Pointers & Window -> In-place partition, palindrome checking, sliding window maximization
├── Linked Lists        -> Fast/slow pointer cycle detection (Floyd's algorithm), list reversal
├── Recursion           -> Backtracking, divide-and-conquer, recursive tree exploration
└── Complexity Bounds   -> Optimization from O(N^2) naive to O(N) linear / O(log N) logarithmic`,
    quickStart: `# Explore solutions categorized by data structure and topic
# Visit the algorithmic repository:
https://github.com/Vishanth001-stark/dsa-solutions`,
    github: "https://github.com/Vishanth001-stark/dsa-solutions"
  }
];

if (typeof window !== "undefined") {
  window.projectsData = projectsData;
  window.filterCategories = filterCategories;
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = { projectsData, filterCategories };
}
