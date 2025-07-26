document.addEventListener("DOMContentLoaded", function () {
  /*
    ============================================
    SECTION: STATE MANAGEMENT & DATABASE
    ============================================
    */
  const initialData = {
    admin: { username: "admin", password: "admin123" },
    content: {
      farmName: "Pak Budi Farm",
      ownerName: "Budi Santoso",
      farmLocation: "Jl. Raya Tumpang No. 123, Malang, Jawa Timur",
      farmWhatsapp: "+62 812-3456-7890",
      farmEmail: "kontak@pakbudifarm.com",
      profileImage: "src/img/profil.jpg",
      heroImage: "src/img/sawah3.jpg",
      heroTitle: "Kesegaran Langsung dari Sawah",
      heroSubtitle:
        "Menyediakan hasil tani organik berkualitas tinggi dari tanah subur Jawa Timur untuk Anda.",
      aboutTitle: "Dedikasi untuk Pertanian Organik",
      aboutDescription:
        "Selama lebih dari 15 tahun, saya, [ownerName], telah mengabdikan diri pada pertanian organik di Malang. Komitmen saya adalah menghasilkan produk yang tidak hanya lezat, tetapi juga sehat dan ramah lingkungan, langsung dari sawah ke meja Anda.",
      excellence1Title: "100% Organik Tersertifikasi",
      excellence1Desc:
        "Proses tanam tanpa bahan kimia, memastikan produk aman dan menyehatkan.",
      excellence2Title: "Dipanen Saat Segar",
      excellence2Desc:
        "Kami memanen sesuai pesanan untuk menjaga kesegaran dan nutrisi maksimal.",
      excellence3Title: "Dukungan Petani Lokal",
      excellence3Desc:
        "Bermitra dengan kami berarti mendukung keberlanjutan ekonomi petani lokal.",
      testimonial1Name: "Bu Sari",
      testimonial1Title: "Owner, Warung Sehat",
      testimonial1Quote:
        "Kualitas sayuran dari [farmNameShort] tidak pernah mengecewakan. Pelanggan kami selalu memuji kesegarannya.",
      testimonial2Name: "Pak Agus",
      testimonial2Title: "Manager Resto",
      testimonial2Quote:
        "Pasokan selalu tepat waktu dan kualitasnya konsisten. [farmNameShort] adalah mitra terbaik kami.",
      galleryImg1: "src/img/padi.jpg",
      galleryImg2: "src/img/stroberi.jpg",
      galleryImg3: "src/img/selada.jpg",
      galleryImg4: "src/img/kangkung.jpg",
      galleryImg5: "src/img/beras.jpg",
      galleryImg6: "src/img/tomat.jpg",
      galleryImg7: "src/img/bayam.jpg",
      galleryImg8: "src/img/sawah1.jpg",
    },
  };

  let appData = {};
  let isLoggedIn = false;

  function loadData() {
    try {
      const savedData = JSON.parse(localStorage.getItem("pakBudiFarmData"));
      if (savedData && savedData.content) {
        appData = {
          ...initialData,
          ...savedData,
          content: { ...initialData.content, ...savedData.content },
        };
      } else {
        appData = JSON.parse(JSON.stringify(initialData));
      }
    } catch (e) {
      console.error("Could not parse localStorage data, using defaults.", e);
      appData = JSON.parse(JSON.stringify(initialData));
    }
  }

  function saveData() {
    try {
      localStorage.setItem("pakBudiFarmData", JSON.stringify(appData));
    } catch (e) {
      console.error("Could not save data to localStorage.", e);
      showToast("Gagal menyimpan data!", "error");
    }
  }

  /*
    ============================================
    SECTION: UI UPDATE & RENDERING
    ============================================
    */
  function updatePageContent() {
    const content = appData.content;
    const farmNameShort = content.farmName || "Pak " + content.ownerName;

    const renderTemplate = (templateString) =>
      templateString
        .replace(
          /\[ownerName\]/g,
          `<strong class="text-[var(--text-dark)]">${content.ownerName}</strong>`
        )
        .replace(
          /\[farmNameShort\]/g,
          `<strong class="text-[var(--text-dark)]">${farmNameShort}</strong>`
        );

    // Update text content
    document.getElementById(
      "page-title"
    ).textContent = `${content.farmName} - Pertanian Organik Jawa Timur`;
    document
      .querySelectorAll(
        "#nav-farm-name, #footer-farm-name, #footer-farm-name-2"
      )
      .forEach((el) => (el.textContent = content.farmName));
    document.getElementById("excellence-farm-name").textContent = farmNameShort;
    document.getElementById("hero-title-display").innerHTML = renderTemplate(
      content.heroTitle
    );
    document.getElementById("hero-subtitle-display").innerHTML = renderTemplate(
      content.heroSubtitle
    );
    document.getElementById("about-title-display").innerHTML = renderTemplate(
      content.aboutTitle
    );
    document.getElementById("about-description-display").innerHTML =
      renderTemplate(content.aboutDescription);
    document.getElementById("excellence1-title-display").innerHTML =
      renderTemplate(content.excellence1Title);
    document.getElementById("excellence1-desc-display").innerHTML =
      renderTemplate(content.excellence1Desc);
    document.getElementById("excellence2-title-display").innerHTML =
      renderTemplate(content.excellence2Title);
    document.getElementById("excellence2-desc-display").innerHTML =
      renderTemplate(content.excellence2Desc);
    document.getElementById("excellence3-title-display").innerHTML =
      renderTemplate(content.excellence3Title);
    document.getElementById("excellence3-desc-display").innerHTML =
      renderTemplate(content.excellence3Desc);
    document.getElementById("testimonial1-initial").textContent =
      content.testimonial1Name.charAt(0);
    document.getElementById("testimonial1-name").textContent =
      content.testimonial1Name;
    document.getElementById("testimonial1-title").textContent =
      content.testimonial1Title;
    document.getElementById("testimonial1-quote").innerHTML = renderTemplate(
      content.testimonial1Quote
    );
    document.getElementById("testimonial2-initial").textContent =
      content.testimonial2Name.charAt(0);
    document.getElementById("testimonial2-name").textContent =
      content.testimonial2Name;
    document.getElementById("testimonial2-title").textContent =
      content.testimonial2Title;
    document.getElementById("testimonial2-quote").innerHTML = renderTemplate(
      content.testimonial2Quote
    );
    document.getElementById("contact-location").textContent =
      content.farmLocation;
    document.getElementById("contact-whatsapp").textContent =
      content.farmWhatsapp;
    document.getElementById("contact-email").textContent = content.farmEmail;

    // Update images
    document.getElementById("hero-bg-image").src = content.heroImage;
    document.getElementById("profile-image-display").src = content.profileImage;
    for (let i = 1; i <= 8; i++) {
      const imgElement = document.getElementById(`gallery-img-${i}`);
      if (imgElement) {
        imgElement.src =
          content[`galleryImg${i}`] ||
          `https://placehold.co/400x400/fefae0/283618?text=Gbr+${i}`;
      }
    }

    // Update form fields if logged in
    if (isLoggedIn) {
      for (const key in content) {
        const input = document.getElementById(`edit-${key}`);
        if (input && input.type !== "file") {
          input.value = content[key];
        }
      }
    }
    updateEditableState();
  }

  function updateEditableState() {
    document
      .querySelectorAll(".editable-content")
      .forEach((el) => el.classList.toggle("editing", isLoggedIn));
  }

  /*
    ============================================
    SECTION: NOTIFICATION SYSTEM
    ============================================
    */
  const toast = document.getElementById("toast-notification");
  let toastTimeout;

  function showToast(message, type = "success") {
    clearTimeout(toastTimeout);
    toast.textContent = message;
    toast.className = "show";
    toast.classList.add(type);
    toastTimeout = setTimeout(() => {
      toast.className = toast.className.replace("show", "");
    }, 3000);
  }

  /*
    ============================================
    SECTION: EVENT LISTENERS & HANDLERS
    ============================================
    */
  const adminPanel = document.getElementById("admin-panel");
  const adminOverlay = document.getElementById("admin-overlay");
  const loginForm = document.getElementById("login-form");
  const adminControls = document.getElementById("admin-controls");

  // --- Admin Panel Toggle ---
  document.getElementById("admin-toggle").addEventListener("click", () => {
    adminPanel.classList.toggle("open");
    adminOverlay.classList.toggle("active");
  });
  adminOverlay.addEventListener("click", () => {
    adminPanel.classList.remove("open");
    adminOverlay.classList.remove("active");
  });

  // --- Click-to-Edit Functionality ---
  document.body.addEventListener("click", function (e) {
    if (!isLoggedIn) return;
    const targetElement = e.target.closest(".editable-content");
    if (targetElement) {
      const targetInputId = targetElement.dataset.editTarget;
      const targetInput = document.querySelector(targetInputId);
      if (targetInput) {
        adminPanel.classList.add("open");
        adminOverlay.classList.add("active");
        // Open accordion if needed
        const accordionContent = targetInput.closest(".accordion-content");
        if (accordionContent && accordionContent.style.display === "none") {
          accordionContent.previousElementSibling.click();
        }
        targetInput.focus();
        targetInput.classList.add("highlight-focus");
        setTimeout(() => targetInput.classList.remove("highlight-focus"), 1500);
      }
    }
  });

  // --- Admin Login ---
  document
    .getElementById("admin-login-form")
    .addEventListener("submit", function (e) {
      e.preventDefault();
      const loginError = document.getElementById("login-error");
      loginError.textContent = "";
      const username = document.getElementById("admin-username").value;
      const password = document.getElementById("admin-password").value;

      if (
        username === appData.admin.username &&
        password === appData.admin.password
      ) {
        isLoggedIn = true;
        loginForm.classList.add("hidden");
        adminControls.classList.remove("hidden");
        updatePageContent();
        showToast("Login berhasil!", "success");
        adminPanel.classList.remove("open");
        adminOverlay.classList.remove("active");
      } else {
        isLoggedIn = false;
        loginError.textContent = "Username atau password salah.";
        e.target.classList.add("shake");
        setTimeout(() => e.target.classList.remove("shake"), 300);
      }
    });

  // --- Admin Logout ---
  document
    .getElementById("admin-logout")
    .addEventListener("click", function () {
      isLoggedIn = false;
      loginForm.classList.remove("hidden");
      adminControls.classList.add("hidden");
      document.getElementById("admin-login-form").reset();
      document.getElementById("login-error").textContent = "";
      updateEditableState();
      showToast("Anda telah logout.", "success");
    });

  // --- Accordion for Admin Panel ---
  document.querySelectorAll(".accordion-toggle").forEach((button) => {
    button.addEventListener("click", () => {
      const content = button.nextElementSibling;
      const icon = button.querySelector("i");
      button.parentElement.classList.toggle("bg-gray-100");
      icon.classList.toggle("fa-chevron-down");
      icon.classList.toggle("fa-chevron-up");
      content.style.display =
        content.style.display === "block" ? "none" : "block";
    });
  });

  // --- Main Image & Gallery File Upload Handlers ---
  function setupImageUpload(inputId, contentKey, displayId) {
    document.getElementById(inputId).addEventListener("change", function (e) {
      const file = e.target.files[0];
      if (file && file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = function (event) {
          const dataUrl = event.target.result;
          appData.content[contentKey] = dataUrl; // Store as base64
          if (displayId) {
            document.getElementById(displayId).src = dataUrl;
          }
          showToast(
            `Gambar untuk ${contentKey} diperbarui. Jangan lupa simpan.`,
            "success"
          );
        };
        reader.readAsDataURL(file);
      }
    });
  }

  setupImageUpload(
    "edit-profileImage",
    "profileImage",
    "profile-image-display"
  );
  setupImageUpload("edit-heroImage", "heroImage", "hero-bg-image");

  for (let i = 1; i <= 8; i++) {
    setupImageUpload(
      `edit-galleryImg${i}`,
      `galleryImg${i}`,
      `gallery-img-${i}`
    );
  }

  // --- Save & Reset Changes ---
  document
    .getElementById("save-changes")
    .addEventListener("click", function () {
      if (!isLoggedIn) return;
      for (const key in appData.content) {
        const input = document.getElementById(`edit-${key}`);
        if (input && input.type !== "file") {
          appData.content[key] = input.value;
        }
      }
      saveData();
      updatePageContent();
      showToast("Perubahan berhasil disimpan!", "success");
    });

  document
    .getElementById("reset-changes")
    .addEventListener("click", function () {
      if (!isLoggedIn) return;
      if (
        window.confirm(
          "Yakin ingin mengembalikan semua konten ke pengaturan awal? Perubahan yang belum disimpan akan hilang."
        )
      ) {
        appData = JSON.parse(JSON.stringify(initialData));
        saveData();
        updatePageContent();
        // Reset file inputs visually
        document
          .querySelectorAll('input[type="file"]')
          .forEach((input) => (input.value = ""));
        showToast("Pengaturan telah direset ke default.", "success");
      }
    });

  // --- Navbar & Mobile Menu ---
  const header = document.getElementById("header");
  window.addEventListener("scroll", () =>
    header.classList.toggle("scrolled", window.scrollY > 50)
  );
  const mobileMenuButton = document.getElementById("mobile-menu-button");
  const mobileMenu = document.getElementById("mobile-menu");
  const menuIcon = mobileMenuButton.querySelector("i");
  mobileMenuButton.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
    menuIcon.classList.toggle("fa-bars");
    menuIcon.classList.toggle("fa-times");
  });
  mobileMenu.querySelectorAll("a").forEach((link) =>
    link.addEventListener("click", () => {
      mobileMenu.classList.add("hidden");
      menuIcon.classList.replace("fa-times", "fa-bars");
    })
  );

  // --- Contact Form ---
  document
    .getElementById("contactForm")
    .addEventListener("submit", function (e) {
      e.preventDefault();
      showToast("Terima kasih! Pesan Anda telah terkirim.", "success");
      this.reset();
    });

  // --- Scroll Reveal Animation ---
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("visible");
      });
    },
    { threshold: 0.1 }
  );
  document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

  // --- Initial Load ---
  loadData();
  updatePageContent();
});
