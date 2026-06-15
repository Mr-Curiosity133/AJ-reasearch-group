/**
 * 实验室网站交互：导航、灯箱、化合物筛选与搜索
 */
(function () {
  "use strict";

  // ---------- 首页：滚动显示导航栏 ----------
  var header = document.querySelector(".site-header");
  var scrollIndicator = document.getElementById("scrollIndicator");

  if (document.body.classList.contains("page-home")) {
    // 页面加载时隐藏导航栏
    var scrolled = false;

    // 监听滚动事件
    window.addEventListener("scroll", function() {
      if (window.scrollY > 100 && !scrolled) {
        header.classList.add("visible");
        scrolled = true;
      }
    });

    // 点击箭头平滑滚动
    if (scrollIndicator) {
      scrollIndicator.addEventListener("click", function() {
        var overview = document.querySelector(".section-overview");
        if (overview) {
          overview.scrollIntoView({ behavior: "smooth" });
        }
      });
    }
  } else {
    // 其他页面直接显示导航栏
    if (header) {
      header.classList.add("visible");
    }
  }

  // ---------- 移动端导航折叠 ----------
  var nav = document.querySelector(".nav-container");
  var toggle = document.querySelector(".nav-toggle");
  if (nav && toggle) {
    toggle.addEventListener("click", function () {
      nav.classList.toggle("nav-open");
    });
    document.querySelectorAll(".nav-links a").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("nav-open");
      });
    });
  }

  // ---------- 灯箱（点击图片放大、左右切换） ----------
  var lightbox = document.getElementById("lightbox");
  var lightboxImg = lightbox && lightbox.querySelector(".lightbox-content img");
  var lightboxCaption = lightbox && lightbox.querySelector(".lightbox-caption");
  var items = document.querySelectorAll(".gallery-item img");
  var currentIndex = 0;

  function openLightbox(index) {
    if (!items.length || !lightbox) return;
    currentIndex = index >= 0 ? index : 0;
    if (currentIndex >= items.length) currentIndex = items.length - 1;
    var img = items[currentIndex];
    var src = img.getAttribute("src");
    var alt = img.getAttribute("alt");
    var caption = img.getAttribute("data-caption") || alt || "";
    if (lightboxImg) {
      lightboxImg.setAttribute("src", src);
      lightboxImg.setAttribute("alt", alt);
    }
    if (lightboxCaption) lightboxCaption.textContent = caption;
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    if (lightbox) {
      lightbox.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
    }
  }

  function prevImage() {
    currentIndex = currentIndex <= 0 ? items.length - 1 : currentIndex - 1;
    openLightbox(currentIndex);
  }

  function nextImage() {
    currentIndex = currentIndex >= items.length - 1 ? 0 : currentIndex + 1;
    openLightbox(currentIndex);
  }

  if (items.length && lightbox) {
    items.forEach(function (img, i) {
      img.closest(".gallery-item").addEventListener("click", function (e) {
        e.preventDefault();
        openLightbox(i);
      });
    });

    lightbox.querySelector(".lightbox-close").addEventListener("click", closeLightbox);
    lightbox.querySelector(".lightbox-prev").addEventListener("click", prevImage);
    lightbox.querySelector(".lightbox-next").addEventListener("click", nextImage);

    lightbox.addEventListener("click", function (e) {
      if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener("keydown", function (e) {
      if (lightbox.getAttribute("aria-hidden") === "true") return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") prevImage();
      if (e.key === "ArrowRight") nextImage();
    });
  }

  // ---------- 氘代化合物库：搜索与筛选 ----------
  var searchInput = document.querySelector(".library-search");
  var filterBtns = document.querySelectorAll(".library-filters .filter-btn");
  var compoundCards = document.querySelectorAll(".compound-card");

  function filterCompounds() {
    var query = (searchInput && searchInput.value.trim().toLowerCase()) || "";
    var activeFilter = document.querySelector(".library-filters .filter-btn.active");
    var filterValue = (activeFilter && activeFilter.getAttribute("data-filter")) || "all";

    compoundCards.forEach(function (card) {
      var text = (card.textContent || "").toLowerCase();
      var matchSearch = !query || text.indexOf(query) !== -1;
      var cardCategory = card.getAttribute("data-category") || "all";
      var matchFilter = filterValue === "all" || cardCategory === filterValue;
      card.style.display = matchSearch && matchFilter ? "" : "none";
    });
  }

  if (searchInput) {
    searchInput.addEventListener("input", filterCompounds);
  }

  if (filterBtns.length) {
    filterBtns.forEach(function (btn) {
      btn.addEventListener("click", function () {
        filterBtns.forEach(function (b) {
          b.classList.remove("active");
        });
        btn.classList.add("active");
        filterCompounds();
      });
    });
  }
})();
