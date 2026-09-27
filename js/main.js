/**
 * Vishanth R — Developer Portfolio
 * Main Application Logic
 * 
 * Features:
 * 1. Dark/Light Theme Switching with localStorage persistence
 * 2. Mobile Navigation Drawer with backdrop/outside click support
 * 3. Dynamic Projects Rendering, Category Filter Pills & Real-time Search
 * 4. Project Detail Modal with Overview, Architecture & Quick Start
 * 5. One-Click Copy-to-Clipboard for Contact Info
 * 6. Validated Asynchronous Contact Form
 * 7. Scroll Spy Navigation Highlighting
 * 8. Smooth Toast Notifications
 */

document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  initMobileNav();
  initProjects();
  initProjectModal();
  initCopyButtons();
  initContactForm();
  initScrollSpy();
});

/* ==========================================================================
   1. Theme Management (Dark / Light)
   ========================================================================== */
function initTheme() {
  const themeToggle = document.getElementById("theme-toggle");
  const htmlRoot = document.documentElement;

  const savedTheme = localStorage.getItem("vr_theme") || "dark";
  htmlRoot.setAttribute("data-theme", savedTheme);

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const currentTheme = htmlRoot.getAttribute("data-theme");
      const targetTheme = currentTheme === "dark" ? "light" : "dark";
      htmlRoot.setAttribute("data-theme", targetTheme);
      localStorage.setItem("vr_theme", targetTheme);
      showToast(`Switched to ${targetTheme} mode`, "success");
    });
  }
}

/* ==========================================================================
   2. Mobile Navigation
   ========================================================================== */
function initMobileNav() {
  const mobileToggle = document.getElementById("mobile-toggle");
  const navMenu = document.getElementById("nav-menu");
  const navLinks = document.querySelectorAll(".nav-link");

  if (!mobileToggle || !navMenu) return;

  mobileToggle.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("open");
    mobileToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (navMenu.classList.contains("open")) {
        navMenu.classList.remove("open");
        mobileToggle.setAttribute("aria-expanded", "false");
      }
    });
  });

  document.addEventListener("click", (e) => {
    if (
      navMenu.classList.contains("open") &&
      !navMenu.contains(e.target) &&
      !mobileToggle.contains(e.target)
    ) {
      navMenu.classList.remove("open");
      mobileToggle.setAttribute("aria-expanded", "false");
    }
  });
}

/* ==========================================================================
   3. Dynamic Projects Rendering, Filtering & Search
   ========================================================================== */
let activeFilter = "all";
let searchQuery = "";

function initProjects() {
  const filterContainer = document.getElementById("filter-buttons");
  const searchInput = document.getElementById("project-search");

  // Render Filter Buttons with dynamic counts
  if (filterContainer && typeof filterCategories !== "undefined" && typeof projectsData !== "undefined") {
    filterContainer.innerHTML = filterCategories
      .map((cat) => {
        const count =
          cat.id === "all"
            ? projectsData.length
            : projectsData.filter((p) => p.category === cat.id).length;

        return `
          <button class="filter-btn ${cat.id === "all" ? "active" : ""}" data-filter="${cat.id}">
            <span>${cat.label}</span>
            <span class="filter-count">${count}</span>
          </button>
        `;
      })
      .join("");

    filterContainer.querySelectorAll(".filter-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        filterContainer.querySelectorAll(".filter-btn").forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        activeFilter = btn.getAttribute("data-filter") || "all";
        renderProjects();
      });
    });
  }

  // Real-time Search Event
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      searchQuery = e.target.value.toLowerCase().trim();
      renderProjects();
    });
  }

  renderProjects();
}

function renderProjects() {
  const container = document.getElementById("projects-container");
  if (!container || typeof projectsData === "undefined") return;

  const filtered = projectsData.filter((project) => {
    const matchesCategory = activeFilter === "all" || project.category === activeFilter;
    const matchesSearch =
      searchQuery === "" ||
      project.title.toLowerCase().includes(searchQuery) ||
      project.summary.toLowerCase().includes(searchQuery) ||
      project.badge.toLowerCase().includes(searchQuery) ||
      project.technologies.some((tech) => tech.toLowerCase().includes(searchQuery));

    return matchesCategory && matchesSearch;
  });

  if (filtered.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1 / -1; padding: 3rem 1.5rem; text-align: center; background: var(--bg-card); border: 1px dashed var(--border-color); border-radius: var(--radius-md);">
        <p style="color: var(--text-muted); font-size: 0.95rem;">No projects found matching "${escapeHtml(searchQuery)}".</p>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered
    .map(
      (proj) => `
      <article class="project-card" data-id="${proj.id}">
        <div>
          <div class="project-top">
            <span class="project-badge">${escapeHtml(proj.badge)}</span>
          </div>
          <h3 class="project-title">${escapeHtml(proj.title)}</h3>
          <p class="project-summary">${escapeHtml(proj.summary)}</p>
          <div class="project-tech">
            ${proj.technologies.map((t) => `<span class="tech-chip">${escapeHtml(t)}</span>`).join("")}
          </div>
        </div>
        <div class="project-actions">
          <button class="btn btn-primary btn-sm view-details-btn" data-id="${proj.id}">
            <span>View Details</span>
          </button>
          ${
            proj.github
              ? `<a href="${proj.github}" target="_blank" rel="noopener noreferrer" class="btn btn-outline btn-sm" aria-label="GitHub Repository">
                  <span>Code ↗</span>
                </a>`
              : ""
          }
        </div>
      </article>
    `
    )
    .join("");

  // Attach modal trigger listeners
  container.querySelectorAll(".view-details-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const projId = btn.getAttribute("data-id");
      if (projId) openProjectModal(projId);
    });
  });

  container.querySelectorAll(".project-card").forEach((card) => {
    card.addEventListener("click", (e) => {
      if (e.target.closest("a") || e.target.closest("button")) return;
      const projId = card.getAttribute("data-id");
      if (projId) openProjectModal(projId);
    });
  });
}

/* ==========================================================================
   4. Project Detail Modal
   ========================================================================== */
function initProjectModal() {
  const modal = document.getElementById("project-modal");
  const closeBtn = document.getElementById("modal-close");
  const backdrop = document.getElementById("modal-backdrop");

  if (!modal) return;

  const closeModal = () => {
    modal.classList.remove("active");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  };

  if (closeBtn) closeBtn.addEventListener("click", closeModal);
  if (backdrop) backdrop.addEventListener("click", closeModal);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("active")) {
      closeModal();
    }
  });
}

function openProjectModal(projectId) {
  const modal = document.getElementById("project-modal");
  const modalBody = document.getElementById("modal-body");
  if (!modal || !modalBody || typeof projectsData === "undefined") return;

  const proj = projectsData.find((p) => p.id === projectId);
  if (!proj) return;

  modalBody.innerHTML = `
    <span class="modal-badge">${escapeHtml(proj.badge)}</span>
    <h2 class="modal-title">${escapeHtml(proj.title)}</h2>
    
    <p class="modal-desc">${escapeHtml(proj.description)}</p>
    
    <h4 class="modal-section-title">Key Accomplishments &amp; Features</h4>
    <ul class="modal-highlights">
      ${proj.highlights.map((h) => `<li>${escapeHtml(h)}</li>`).join("")}
    </ul>

    <h4 class="modal-section-title">Technologies Employed</h4>
    <div class="project-tech" style="margin-bottom: 1.5rem;">
      ${proj.technologies.map((t) => `<span class="tech-chip">${escapeHtml(t)}</span>`).join("")}
    </div>

    ${
      proj.architecture
        ? `<h4 class="modal-section-title">Architecture &amp; Design</h4>
           <pre class="modal-code-box"><code>${escapeHtml(proj.architecture)}</code></pre>`
        : ""
    }

    ${
      proj.quickStart
        ? `<div style="display: flex; justify-content: space-between; align-items: center; margin-top: 1rem; margin-bottom: 0.5rem;">
             <h4 class="modal-section-title" style="margin: 0;">Quick Start &amp; Run</h4>
             <button class="btn btn-outline btn-sm copy-code-btn" data-code="${escapeHtml(proj.quickStart)}" title="Copy Commands">Copy</button>
           </div>
           <pre class="modal-code-box"><code>${escapeHtml(proj.quickStart)}</code></pre>`
        : ""
    }

    <div style="margin-top: 1.75rem; display: flex; gap: 0.75rem; flex-wrap: wrap; border-top: 1px solid var(--border-color); padding-top: 1.25rem;">
      ${
        proj.github
          ? `<a href="${proj.github}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm">
              <span>View GitHub Repository ↗</span>
            </a>`
          : ""
      }
      <button class="btn btn-secondary btn-sm" id="modal-bottom-close">Close</button>
    </div>
  `;

  // Attach modal bottom close button
  const bottomClose = modalBody.querySelector("#modal-bottom-close");
  if (bottomClose) {
    bottomClose.addEventListener("click", () => {
      modal.classList.remove("active");
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
          showToast("Execution commands copied to clipboard", "success");
        });
      }
    });
  }

  modal.classList.add("active");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function escapeHtml(text) {
  if (!text) return "";
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

/* ==========================================================================
   5. One-Click Copy-to-Clipboard Subsystem
   ========================================================================== */
function initCopyButtons() {
  document.querySelectorAll(".copy-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const textToCopy = btn.getAttribute("data-copy");
      if (textToCopy && navigator.clipboard) {
        navigator.clipboard.writeText(textToCopy).then(() => {
          showToast(`Copied ${textToCopy} to clipboard!`, "success");
        }).catch(() => {
          showToast("Failed to copy to clipboard", "error");
        });
      }
    });
  });
}

/* ==========================================================================
   6. Asynchronous Validated Contact Form
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

  function validateInput(input, errorElement, checkFn, errorMsg) {
    const isValid = checkFn(input.value.trim());
    if (!isValid) {
      input.style.borderColor = "var(--error)";
      errorElement.textContent = errorMsg;
      return false;
    } else {
      input.style.borderColor = "";
      errorElement.textContent = "";
      return true;
    }
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

    const isNameValid = validateInput(
      nameInput,
      nameError,
      (val) => val.length >= 2,
      "Please enter your name (minimum 2 characters)."
    );

    const isEmailValid = validateInput(
      emailInput,
      emailError,
      (val) => emailRegex.test(val),
      "Please enter a valid email address."
    );

    const isSubjectValid = validateInput(
      subjectInput,
      subjectError,
      (val) => val.length >= 3,
      "Please enter a subject (minimum 3 characters)."
    );

    const isMessageValid = validateInput(
      messageInput,
      messageError,
      (val) => val.length >= 10,
      "Please enter a message (minimum 10 characters)."
    );

    if (!isNameValid || !isEmailValid || !isSubjectValid || !isMessageValid) {
      showToast("Please correct highlighted fields before submitting.", "error");
      return;
    }

    const btnText = submitBtn.querySelector(".btn-text");
    const originalText = btnText ? btnText.textContent : "Send Message";
    if (btnText) btnText.textContent = "Sending...";
    submitBtn.disabled = true;

    try {
      // Simulate network request
      await new Promise((resolve) => setTimeout(resolve, 1000));
      showToast("Thank you! Your message has been sent successfully.", "success");
      form.reset();
    } catch (err) {
      showToast("Transmission error. Please try again or email directly.", "error");
    } finally {
      if (btnText) btnText.textContent = originalText;
      submitBtn.disabled = false;
    }
  });
}

/* ==========================================================================
   7. Toast Notifications
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
   8. Scroll Spy Navigation
   ========================================================================== */
function initScrollSpy() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  function onScroll() {
    const scrollY = window.pageYOffset;

    sections.forEach((section) => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 120;
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
