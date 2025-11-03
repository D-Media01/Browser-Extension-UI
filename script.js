document.addEventListener("DOMContentLoaded", () => {
  // ======= DARK MODE ======= //
  let darkmode = localStorage.getItem("darkmode");
  const modeIconWrap = document.getElementById("mode-icon-wrap");

  const enableDarkMode = () => {
    document.body.classList.add("darkmode");
    localStorage.setItem("darkmode", "active");
  };

  const disableDarkMode = () => {
    document.body.classList.remove("darkmode");
    localStorage.setItem("darkmode", null);
  };

  if (darkmode === "active") enableDarkMode();

  modeIconWrap?.addEventListener("click", () => {
    darkmode = localStorage.getItem("darkmode");
    darkmode !== "active" ? enableDarkMode() : disableDarkMode();
  });

  // ======= TOGGLES ======= //
  const toggleWraps = document.querySelectorAll(".toggle-wrap");
  const toggles = document.querySelectorAll(".toggle");

  toggleWraps.forEach((wrap, index) => {
    wrap.addEventListener("click", () => {
      toggles[index].classList.toggle("move");
      wrap.style.backgroundColor =
        wrap.style.backgroundColor === "var(--mode-background-hover)"
          ? ""
          : "var(--mode-background-hover)";
      const extensionItem = wrap.closest(".extension-item");
      const currentStatus = extensionItem.dataset.status || "active";
      const newStatus = currentStatus === "active" ? "inactive" : "active";
      extensionItem.dataset.status = newStatus;
      wrap.dataset.status = newStatus;
    });
  });

  // ======= FILTERS ======= //
  const filters = document.querySelectorAll(".filter-item");
  const extensions = document.querySelectorAll(".extension-item");

  filters.forEach((filter, i) => {
    filter.addEventListener("click", () => {
      filters.forEach(f => f.classList.remove("active"));
      filter.classList.add("active");
      extensions.forEach(item => {
        const status = item.dataset.status;
        if (i === 0) item.style.display = "";
        if (i === 1) item.style.display = status === "active" ? "" : "none";
        if (i === 2) item.style.display = status === "inactive" ? "" : "none";
      });
    });
  });

  // ======= REMOVE EXTENSIONS ======= //
  const extensionListWrap = document.querySelector(".extension-list-wrap");

  extensionListWrap.addEventListener("click", (e) => {
    if (e.target.classList.contains("remove")) {
      const extensionItem = e.target.closest(".extension-item");
      if (extensionItem) {
        extensionItem.style.transition = "opacity 0.3s ease";
        extensionItem.style.opacity = "0";
        setTimeout(() => extensionItem.remove(), 300);
      }
    }
  });
});
