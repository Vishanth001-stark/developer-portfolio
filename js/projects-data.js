/**
 * Vishanth R — Developer Portfolio
 * Featured Engineering Projects Dataset
 */

const filterCategories = [
  { id: "all", label: "All Projects" },
  { id: "java", label: "Java & OOP" },
  { id: "python", label: "Python & Data" },
  { id: "web", label: "Web Systems" },
  { id: "dsa", label: "Algorithms" }
];

const projectsData = [
  {
    index: "01",
    id: "student-management-system",
    title: "Student Management System",
    category: "java",
    badge: "Java / OOP",
    summary: "An interactive academic record console application engineered in Java 17 adhering to strict OOP principles with atomic CSV persistence.",
    description: "An academic administration console engineered in Java 17. Built around core Object-Oriented design patterns: abstract class contracts (Person) providing encapsulation and polymorphic behavior, concrete extension (Student) implementing dynamic GPA computation on a 10.0 scale, and an atomic file storage manager that prevents CSV state corruption across application executions.",
    technologies: ["Java 17", "OOP Architecture", "File I/O", "CSV Storage", "Automated Testing"],
    highlights: [
      "Strict OOP implementation utilizing Abstraction, Inheritance, and Encapsulation with defensive copying.",
      "Engineered full CRUD operations enabling search by roll number, record modification, and formatted tabular display.",
      "Integrated atomic persistent CSV file handling (FileStorageManager) guaranteeing data integrity on disk.",
      "Built-in automated test suite with 33 unit and integration test assertions (all passing)."
    ],
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
    index: "02",
    id: "expense-budget-tracker",
    title: "Personal Expense & Budget Tracker",
    category: "python",
    badge: "Python / Data",
    summary: "An automated personal finance CLI tracker enabling daily expenditure logging, category spending aggregation, and threshold analytics.",
    description: "A robust personal finance engine written in Python 3. Features modular separation of concerns between domain models, boundary validators, persistence, and analytics. Computes category percentage allocations, renders dynamic ASCII distribution meters directly in the terminal, and triggers instant early-warning alerts when monthly consumption crosses 80% or exceeds budget caps.",
    technologies: ["Python 3", "CSV Persistence", "CLI Analytics", "Data Validation", "Unit Testing"],
    highlights: [
      "Automated expense ingestion with strict format validation for dates, positive amounts, and categories.",
      "Dynamic category aggregation with percentage share calculation and terminal ASCII progress bars.",
      "Real-time monthly budget tracking with early warnings at 80% threshold and critical alerts if exceeded.",
      "Modular CSV storage manager with atomic saving, corrupted record recovery, and automated .backup snapshots."
    ],
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
    index: "03",
    id: "portfolio-platform",
    title: "Personal Developer Portfolio Website",
    category: "web",
    badge: "Web Systems",
    summary: "An interactive, responsive portfolio showcasing software projects, academic milestones, and core competencies with smooth cross-browser performance.",
    description: "A clean, modern portfolio engineered with semantic HTML5, pure CSS3 variables for flawless dark/light transitions, dynamic DOM manipulation for instant project filtering and search, client-side contact validation, and an automated GitHub Actions CI/CD deployment pipeline.",
    technologies: ["HTML5", "CSS3", "JavaScript (ES6+)", "GitHub Pages", "CI/CD"],
    highlights: [
      "Clean, modern aesthetic interface with zero blur clutter or purple gradients.",
      "Dynamic DOM manipulation for live category filtering and instantaneous keyword search.",
      "Functional asynchronous contact transmission with client-side validation and direct mail fallback.",
      "Zero-downtime continuous deployment configured via GitHub Pages CI/CD workflow (.github/workflows/deploy.yml)."
    ],
    architecture: `// CLIENT-SIDE ARCHITECTURE:
├── index.html       -> Semantic HTML5 markup with ARIA landmarks
├── css/style.css    -> Responsive layout, CSS custom properties, clean dark/light themes
├── js/projects-data.js -> Structured dataset with architectural specifications and commands
├── js/main.js       -> Modular controllers: theme state, project filters, search, modal, copy system
└── .github/workflows/deploy.yml -> Automated zero-downtime GitHub Pages deployment on push to main`,
    quickStart: `# Clone repository
git clone https://github.com/Vishanth001-stark/developer-portfolio.git
cd developer-portfolio

# Start lightweight local server
python -m http.server 8080

# Or open index.html directly in any browser!`,
    github: "https://github.com/Vishanth001-stark/developer-portfolio"
  },
  {
    index: "04",
    id: "algorithmic-problem-solving",
    title: "Competitive Algorithmic Solutions (100+ Solved)",
    category: "dsa",
    badge: "Algorithms / DSA",
    summary: "Curated collection of 100+ optimized algorithmic solutions across LeetCode and GeeksforGeeks platforms.",
    description: "Rigorous repository documenting competitive programming solutions focused on optimal time and space complexity (Big-O analysis). Covers fundamental data structures and algorithmic paradigms including Two Pointers, Sliding Window, Prefix Sums, Recursion, Dynamic Programming foundations, and Linked List pointer manipulations in Python, Java, and C.",
    technologies: ["Data Structures", "Algorithms", "Python", "Java", "C", "Complexity Analysis"],
    highlights: [
      "100+ solved problems across LeetCode and GeeksforGeeks with verified complexity bounds.",
      "Documented Big-O runtime and auxiliary space analysis for every implementation.",
      "Strong foundation in arrays, strings, recursion, two-pointer techniques, and linked list traversal.",
      "Active participant in collegiate hackathons and algorithmic competitions."
    ],
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
