# Vishanth R — Personal Developer Portfolio

An aesthetic, intuitive developer portfolio for **Vishanth R** (B.Tech in CSE — Artificial Intelligence & Data Engineering, Jain University). Engineered with pure semantic HTML5, modern responsive CSS3, and dynamic vanilla JavaScript (ES6+).

> **Aesthetic Design Principles:** Clean obsidian & slate palette (`#0a0e17` / `#141c2c`) with crisp ice-blue (`#38bdf8`) and emerald (`#10b981`) accents. **Zero purple gradients. Zero glowing blur blobs. Simple, elegant, and focused on clean software craftsmanship.**

---

## 🗂️ Project Layout

```
01-developer-portfolio/
├── .github/workflows/
│   └── deploy.yml          # Automated zero-downtime GitHub Pages deployment
├── assets/
│   └── Vishanth-Resume.pdf # Downloadable verified resume PDF
├── css/
│   └── style.css           # Aesthetic dark/light stylesheet (zero blur, zero purple gradients)
├── js/
│   ├── projects-data.js    # Structured resume projects catalog & filter tags
│   └── main.js             # Client logic: theme toggle, filter/search, modal, copy system, form
├── index.html              # Clean, semantic, accessible single-page layout
└── README.md               # Documentation & execution guide
```

---

## ✨ Features & Architecture

- **Navbar (`<Vishanth.R />`):** Clean brand monogram, smooth anchor links (About, Skills, Projects, Certifications, Contact), downloadable resume link, and responsive dark/light mode toggle.
- **Hero Section:**
  - Status badge: `● Available for Internships & Projects`.
  - Headline: `Hi, I'm Vishanth R` with clean subtitle.
  - Interactive Action CTAs: `Explore Projects`, `Download Resume`, `Contact Me`, and `GitHub`.
  - Quick Stats Grid: 100+ Algorithmic Problems Solved, 7.17 CGPA, 3+ Core Projects, 2026 Hackathon Innovator.
  - Interactive Code Window: Syntax-highlighted developer object with window dots (🔴 🟡 🟢).
- **About Me & Education:**
  - Bio with key focus areas (AI, Data Engineering, OOP, Web Systems).
  - Personal info chips: Location (Bengaluru), Phone (`+91 96777 30223`), Email (`vishantra@gmail.com`), Languages, DOB, Nationality.
  - Academic Journey Timeline: Jain University (CGPA 7.17), Sri Chaitanya PU College (Class XII, 63.2%), Mount Litera Zee School (Class X, 74%).
  - Undergraduate Key Coursework chips.
- **Technical Skills:**
  - 4 clean categorized cards: Programming Languages, Web Technologies, Databases & Tools, Core Concepts.
- **Featured Projects:**
  - Dynamic filter pills: `All Projects`, `Java & OOP`, `Python & Data`, `Web Systems`, `Algorithms`.
  - Real-time search filter by title, summary, or technology keyword.
  - Project cards featuring:
    1. Student Management System (Java 17 OOP, CSV, 33 automated tests)
    2. Personal Expense & Budget Tracker (Python 3 CLI, CSV, 10 automated tests)
    3. Personal Developer Portfolio Website (HTML5, CSS3, ES6+, GitHub Actions CI/CD)
    4. Competitive Algorithmic Solutions (100+ LeetCode & GFG problems)
  - Detail Modal: Complete feature list, architectural breakdown, and copyable local run commands.
- **Certifications & Achievements:**
  - Verified certs from University of Michigan, freeCodeCamp, and Johns Hopkins University.
  - Key achievements: LeetCode/GFG problem solving, Hackathon 2026, Coding Club, Tech Fest Coordinator.
- **Direct Contact:**
  - Contact cards with **one-click copy buttons** for Email, Phone (`+91 96777 30223`), and GitHub.
  - Validated client-side contact form with simulated network transmission and toast feedback.

---

## 🚀 Running Locally

Because this project uses vanilla web standards with zero compile steps, you can run it instantly:

```powershell
cd "C:\Users\VISHANTH R\resume-projects\01-developer-portfolio"
python -m http.server 8080
```
Then visit **`http://localhost:8080`** in any web browser, or double-click `index.html`.
