/**
 * Vishanth R — Digital Identity & Engineering Portfolio
 * Main Interactive Controllers & Case Study Subsystem
 */

document.addEventListener("DOMContentLoaded", () => {
  initStickyHeader();
  initMobileNav();
  initProjectControls();
  initCaseStudyModal();
  initCopySubsystem();
  initContactForm();
  initScrollSpy();
});

/* ==========================================================================
   01. Sticky Header Transition on Scroll
   ========================================================================== */
function initStickyHeader() {
  const header = document.getElementById("navbar");
  if (!header) return;

  function onScroll() {
    if (window.scrollY > 40) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}

/* ==========================================================================
   02. Mobile Navigation Drawer
   ========================================================================== */
function initMobileNav() {
  const toggle = document.getElementById("mobile-toggle");
  const menu = document.getElementById("nav-menu");
  const links = document.querySelectorAll(".nav-link, .island-link");

  if (!toggle || !menu) return;

  toggle.addEventListener("click", () => {
    const isOpen = menu.classList.toggle("open");
    toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });

  links.forEach((link) => {
    link.addEventListener("click", () => {
      if (menu.classList.contains("open")) {
        menu.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  });

  document.addEventListener("click", (e) => {
    if (
      menu.classList.contains("open") &&
      !menu.contains(e.target) &&
      !toggle.contains(e.target)
    ) {
      menu.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    }
  });
}

/* ==========================================================================
   03. Project Controls (Filter & Real-Time Search)
   ========================================================================== */
let activeFilter = "all";
let searchQuery = "";

function initProjectControls() {
  const filterContainer = document.getElementById("filter-buttons");
  const searchInput = document.getElementById("project-search");
  const workItems = document.querySelectorAll(".work-item");

  if (filterContainer && typeof filterCategories !== "undefined" && typeof projectsData !== "undefined") {
    filterContainer.innerHTML = filterCategories
      .map((cat) => {
        return `
          <button class="filter-pill ${cat.id === "all" ? "active" : ""}" data-filter="${cat.id}">
            <span>${cat.label}</span>
          </button>
        `;
      })
      .join("");

    filterContainer.querySelectorAll(".filter-pill").forEach((btn) => {
      btn.addEventListener("click", () => {
        filterContainer.querySelectorAll(".filter-pill").forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        activeFilter = btn.getAttribute("data-filter") || "all";
        applyFilters();
      });
    });
  }

  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      searchQuery = e.target.value.toLowerCase().trim();
      applyFilters();
    });
  }

  function applyFilters() {
    let matchCount = 0;
    workItems.forEach((item) => {
      const projId = item.getAttribute("data-id");
      const projData = (typeof projectsData !== "undefined")
        ? projectsData.find((p) => p.id === projId)
        : null;

      if (!projData) return;

      const matchesCat = activeFilter === "all" || projData.category === activeFilter;
      const matchesSearch =
        searchQuery === "" ||
        projData.title.toLowerCase().includes(searchQuery) ||
        projData.summary.toLowerCase().includes(searchQuery) ||
        projData.discipline.toLowerCase().includes(searchQuery) ||
        projData.technologies.some((t) => t.toLowerCase().includes(searchQuery));

      if (matchesCat && matchesSearch) {
        item.classList.remove("hidden");
        matchCount++;
      } else {
        item.classList.add("hidden");
      }
    });

    const fallback = document.getElementById("no-works-fallback");
    if (fallback) {
      if (matchCount === 0) {
        fallback.classList.remove("hidden");
      } else {
        fallback.classList.add("hidden");
      }
    }
  }
}

/* ==========================================================================
   04. Case Study Modal Subsystem
   ========================================================================== */
function initCaseStudyModal() {
  const modal = document.getElementById("project-modal");
  const closeBtn = document.getElementById("modal-close");
  const backdrop = document.getElementById("modal-backdrop");

  if (!modal) return;

  const closeModal = () => {
    modal.classList.remove("open", "active");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  };

  if (closeBtn) closeBtn.addEventListener("click", closeModal);
  if (backdrop) backdrop.addEventListener("click", closeModal);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && (modal.classList.contains("open") || modal.classList.contains("active"))) {
      closeModal();
    }
  });

  // Attach triggers for Case Study buttons
  document.querySelectorAll(".open-case-study").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const projId = btn.getAttribute("data-id");
      if (projId) openCaseStudy(projId);
    });
  });

  // Attach triggers for Visual schematics/diagrams
  document.querySelectorAll(".work-visual, .project-visual-col").forEach((vis) => {
    const parent = vis.closest(".work-item");
    if (parent) {
      const projId = parent.getAttribute("data-id");
      vis.addEventListener("click", () => {
        if (projId) openCaseStudy(projId);
      });
      vis.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          if (projId) openCaseStudy(projId);
        }
      });
    }
  });

  // Attach triggers for Project Index rows
  document.querySelectorAll(".project-index-item").forEach((row) => {
    row.addEventListener("click", () => {
      const projId = row.getAttribute("data-id");
      if (projId) openCaseStudy(projId);
    });
    row.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        const projId = row.getAttribute("data-id");
        if (projId) openCaseStudy(projId);
      }
    });
  });
}

function openCaseStudy(projectId) {
  const modal = document.getElementById("project-modal");
  const modalBody = document.getElementById("modal-body");
  if (!modal || !modalBody || typeof projectsData === "undefined") return;

  const proj = projectsData.find((p) => p.id === projectId);
  if (!proj) return;

  modalBody.innerHTML = `
    <header class="cs-header">
      <div class="cs-meta">
        <span class="cs-index">PROJECT ${escapeHtml(proj.index)}</span>
        <span class="cs-discipline">${escapeHtml(proj.discipline)} &middot; ${escapeHtml(proj.year)}</span>
      </div>
      <h2 class="cs-title">${escapeHtml(proj.title)}</h2>
      <p class="cs-summary">${escapeHtml(proj.summary)}</p>
    </header>

    <div class="cs-meta-grid">
      <div class="cs-meta-item">
        <span class="cs-meta-label">ROLE</span>
        <span class="cs-meta-val">${escapeHtml(proj.role || "Software Engineer")}</span>
      </div>
      <div class="cs-meta-item">
        <span class="cs-meta-label">DISCIPLINE</span>
        <span class="cs-meta-val">${escapeHtml(proj.badge || "Core Systems")}</span>
      </div>
      <div class="cs-meta-item">
        <span class="cs-meta-label">VERIFIED TESTS</span>
        <span class="cs-meta-val" style="color: var(--accent);">100% Pass Rate</span>
      </div>
    </div>

    ${
      proj.context
        ? `<section class="cs-section">
             <h3 class="cs-sec-title">01 — CONTEXT &amp; MOTIVATION</h3>
             <p class="cs-body">${escapeHtml(proj.context)}</p>
           </section>`
        : ""
    }

    ${
      proj.problem
        ? `<section class="cs-section">
             <h3 class="cs-sec-title">02 — THE CORE PROBLEM</h3>
             <p class="cs-body">${escapeHtml(proj.problem)}</p>
           </section>`
        : ""
    }

    ${
      proj.approach
        ? `<section class="cs-section">
             <h3 class="cs-sec-title">03 — ARCHITECTURAL APPROACH</h3>
             <p class="cs-body">${escapeHtml(proj.approach)}</p>
           </section>`
        : ""
    }

    ${
      proj.architecture
        ? `<section class="cs-section">
             <h3 class="cs-sec-title">04 — SYSTEM CONTRACTS &amp; SUBSYSTEMS</h3>
             <pre class="cs-code-box"><code>${escapeHtml(proj.architecture)}</code></pre>
           </section>`
        : ""
    }

    ${
      proj.highlights && proj.highlights.length > 0
        ? `<section class="cs-section">
             <h3 class="cs-sec-title">05 — KEY ACCOMPLISHMENTS &amp; SPECIFICATIONS</h3>
             <ul class="cs-bullets">
               ${proj.highlights.map((h) => `<li>${escapeHtml(h)}</li>`).join("")}
             </ul>
           </section>`
        : ""
    }

    ${
      proj.results
        ? `<section class="cs-section">
             <h3 class="cs-sec-title">06 — VERIFIED RESULTS &amp; METRICS</h3>
             <p class="cs-body">${escapeHtml(proj.results)}</p>
           </section>`
        : ""
    }

    <section class="cs-section">
      <h3 class="cs-sec-title">07 — TECHNOLOGY STACK</h3>
      <div class="tech-chips-row">
        ${proj.technologies.map((t) => `<span class="tech-chip">${escapeHtml(t)}</span>`).join("")}
      </div>
    </section>

    ${
      proj.reflection
        ? `<section class="cs-section">
             <h3 class="cs-sec-title">08 — ENGINEERING REFLECTION</h3>
             <p class="cs-body">${escapeHtml(proj.reflection)}</p>
           </section>`
        : ""
    }

    ${
      proj.quickStart
        ? `<section class="cs-section">
             <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 0.5rem;">
               <h3 class="cs-sec-title" style="margin: 0;">09 — QUICK START &amp; RUN INSTRUCTIONS</h3>
               <button class="copy-action-btn copy-code-btn" data-code="${escapeHtml(proj.quickStart)}">Copy Script</button>
             </div>
             <pre class="cs-code-box"><code>${escapeHtml(proj.quickStart)}</code></pre>
           </section>`
        : ""
    }

    <footer class="cs-actions">
      ${
        proj.live
          ? `<a href="${proj.live}" target="_blank" rel="noopener noreferrer" class="action-btn live-action">
               <span>Launch Live Application</span>
               <span class="arrow">&#8599;</span>
             </a>`
          : ""
      }
      ${
        proj.github
          ? `<a href="${proj.github}" target="_blank" rel="noopener noreferrer" class="action-btn source-action">
               <span>View Source Code on GitHub</span>
               <span class="arrow">&#8599;</span>
             </a>`
          : ""
      }
      <button class="action-btn" id="modal-bottom-close" style="border: 1px solid var(--border-subtle); color: var(--text-secondary);">Close</button>
    </footer>
  `;

  // Attach bottom close button
  const bottomClose = modalBody.querySelector("#modal-bottom-close");
  if (bottomClose) {
    bottomClose.addEventListener("click", () => {
      modal.classList.remove("open", "active");
      modal.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
    });
  }

  // Attach copy code in modal
  const copyCodeBtn = modalBody.querySelector(".copy-code-btn");
  if (copyCodeBtn) {
    copyCodeBtn.addEventListener("click", () => {
      const code = copyCodeBtn.getAttribute("data-code");
      if (code && navigator.clipboard) {
        navigator.clipboard.writeText(code).then(() => {
          showToast("Execution script copied to clipboard", "success");
        });
      }
    });
  }

  modal.classList.add("open", "active");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

/* ==========================================================================
   05. Copy to Clipboard Subsystem
   ========================================================================== */
function initCopySubsystem() {
  document.querySelectorAll(".copy-action-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const val = btn.getAttribute("data-copy");
      if (!val) return;

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard
          .writeText(val)
          .then(() => {
            const orig = btn.textContent;
            btn.textContent = "Copied!";
            btn.style.backgroundColor = "var(--accent)";
            btn.style.color = "#07080B";

            showToast(`Copied to clipboard: ${val}`, "success");

            setTimeout(() => {
              btn.textContent = orig;
              btn.style.backgroundColor = "";
              btn.style.color = "";
            }, 1800);
          })
          .catch(() => {
            showToast("Failed to copy automatically", "error");
          });
      }
    });
  });
}

/* ==========================================================================
   06. Validated Asynchronous Contact Form
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById("contact-form");
  if (!form) return;

  const nameInput = document.getElementById("contact-name");
  const emailInput = document.getElementById("contact-email");
  const subjectInput = document.getElementById("contact-subject");
  const messageInput = document.getElementById("contact-message");
  const submitBtn = document.getElementById("submit-btn");

  const nameError = document.getElementById("name-error");
  const emailError = document.getElementById("email-error");
  const subjectError = document.getElementById("subject-error");
  const messageError = document.getElementById("message-error");

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function validate(input, errorEl, condition, msg) {
    if (!condition(input.value.trim())) {
      input.style.borderColor = "#EF4444";
      errorEl.textContent = msg;
      return false;
    }
    input.style.borderColor = "";
    errorEl.textContent = "";
    return true;
  }

  nameInput.addEventListener("input", () => {
    if (nameInput.value.trim().length >= 2) {
      nameInput.style.borderColor = "";
      nameError.textContent = "";
    }
  });

  emailInput.addEventListener("input", () => {
    if (emailRegex.test(emailInput.value.trim())) {
      emailInput.style.borderColor = "";
      emailError.textContent = "";
    }
  });

  subjectInput.addEventListener("input", () => {
    if (subjectInput.value.trim().length >= 3) {
      subjectInput.style.borderColor = "";
      subjectError.textContent = "";
    }
  });

  messageInput.addEventListener("input", () => {
    if (messageInput.value.trim().length >= 10) {
      messageInput.style.borderColor = "";
      messageError.textContent = "";
    }
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const okName = validate(nameInput, nameError, (v) => v.length >= 2, "Name must be at least 2 characters.");
    const okEmail = validate(emailInput, emailError, (v) => emailRegex.test(v), "Please enter a valid email address.");
    const okSubject = validate(subjectInput, subjectError, (v) => v.length >= 3, "Subject must be at least 3 characters.");
    const okMsg = validate(messageInput, messageError, (v) => v.length >= 10, "Message must be at least 10 characters.");

    if (!okName || !okEmail || !okSubject || !okMsg) {
      showToast("Please correct highlighted fields before submitting.", "error");
      return;
    }

    const btnText = submitBtn.querySelector(".btn-text");
    const originalText = btnText ? btnText.textContent : "Transmit Message";
    if (btnText) btnText.textContent = "Transmitting...";
    submitBtn.disabled = true;

    try {
      await new Promise((resolve) => setTimeout(resolve, 800));
      showToast("Message transmitted. Thank you for reaching out.", "success");
      form.reset();
    } catch {
      showToast("Transmission error. Please email directly.", "error");
    } finally {
      if (btnText) btnText.textContent = originalText;
      submitBtn.disabled = false;
    }
  });
}

/* ==========================================================================
   07. Toast Notification Utility
   ========================================================================== */
function showToast(message, type = "success") {
  const container = document.getElementById("toast-container");
  if (!container) return;

  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  toast.textContent = message;

  container.appendChild(toast);

  requestAnimationFrame(() => {
    toast.classList.add("show");
  });

  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => {
      if (container.contains(toast)) container.removeChild(toast);
    }, 250);
  }, 3200);
}

/* ==========================================================================
   08. Scroll Spy Navigation Highlighting
   ========================================================================== */
function initScrollSpy() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link, .island-link");

  function onScroll() {
    const scrollY = window.pageYOffset;

    sections.forEach((section) => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 140;
      const sectionId = section.getAttribute("id");

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach((link) => {
          if (link.getAttribute("href") === `#${sectionId}`) {
            link.classList.add("active");
          } else {
            link.classList.remove("active");
          }
        });
      }
    });
  }

  window.addEventListener("scroll", onScroll, { passive: true });
}

/* ==========================================================================
   09. Escape HTML Utility
   ========================================================================== */
function escapeHtml(str) {
  if (typeof str !== "string") return str;
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
