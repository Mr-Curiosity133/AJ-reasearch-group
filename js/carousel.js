/**
 * 首页已发表成果轮播：从 publications.json 取前 4 条，自动滚动 + 左右按钮 + 圆点
 */
(function () {
  "use strict";

  var wrap = document.querySelector(".pub-carousel-wrap");
  if (!wrap) return;

  var carousel = wrap.querySelector(".pub-carousel");
  var dotsContainer = wrap.querySelector(".carousel-dots");
  var prevBtn = wrap.querySelector(".carousel-prev");
  var nextBtn = wrap.querySelector(".carousel-next");
  if (!carousel) return;

  function buildSlide(pub) {
    var a = document.createElement("a");
    a.className = "pub-slide";
    a.target = "_blank";
    a.rel = "noopener";
    a.href = pub.doi || "#";

    var cover = document.createElement("div");
    cover.className = "pub-slide-cover" + (pub.image ? "" : " pub-slide-cover--empty");
    if (pub.image) {
      var img = document.createElement("img");
      img.src = pub.image;
      img.alt = "";
      cover.appendChild(img);
    }
    a.appendChild(cover);

    var info = document.createElement("div");
    info.className = "pub-slide-info";
    var h3 = document.createElement("h3");
    h3.textContent = pub.title;
    var p = document.createElement("p");
    p.className = "pub-slide-journal";
    p.textContent = pub.citation || "";
    info.appendChild(h3);
    info.appendChild(p);
    a.appendChild(info);

    return a;
  }

  function initCarousel() {
    var slides = wrap.querySelectorAll(".pub-slide");
    if (!slides.length) return;

    var current = 0;
    var total = slides.length;
    var autoplayInterval = 5000;
    var timer = null;

    function goTo(index) {
      current = (index + total) % total;
      slides.forEach(function (slide, i) {
        slide.classList.toggle("active", i === current);
      });
      var dots = wrap.querySelectorAll(".carousel-dot");
      dots.forEach(function (dot, i) {
        dot.classList.toggle("active", i === current);
      });
    }

    function startAutoplay() {
      stopAutoplay();
      timer = setInterval(function () {
        goTo(current + 1);
      }, autoplayInterval);
    }

    function stopAutoplay() {
      if (timer) {
        clearInterval(timer);
        timer = null;
      }
    }

    slides[0].classList.add("active");

    if (dotsContainer) {
      dotsContainer.innerHTML = "";
      for (var i = 0; i < total; i++) {
        var btn = document.createElement("button");
        btn.type = "button";
        btn.className = "carousel-dot" + (i === 0 ? " active" : "");
        btn.setAttribute("aria-label", "第" + (i + 1) + "篇");
        btn.addEventListener("click", function (e) {
          var dots = dotsContainer.querySelectorAll(".carousel-dot");
          var idx = Array.prototype.indexOf.call(dots, e.target);
          if (idx >= 0) {
            goTo(idx);
            startAutoplay();
          }
        });
        dotsContainer.appendChild(btn);
      }
    }

    if (prevBtn) {
      prevBtn.addEventListener("click", function () {
        goTo(current - 1);
        startAutoplay();
      });
    }
    if (nextBtn) {
      nextBtn.addEventListener("click", function () {
        goTo(current + 1);
        startAutoplay();
      });
    }

    wrap.addEventListener("mouseenter", stopAutoplay);
    wrap.addEventListener("mouseleave", startAutoplay);

    startAutoplay();
  }

  var slides = wrap.querySelectorAll(".pub-slide");
  if (slides.length > 0) {
    initCarousel();
    return;
  }

  // 无静态幻灯片时：从 publications.json 取前 4 条（与 publications 页一致）
  fetch("data/publications.json")
    .then(function (res) {
      if (!res.ok) throw new Error("Failed to load publications.json");
      return res.json();
    })
    .then(function (data) {
      if (!Array.isArray(data)) return;
      var list = data.slice(0, 4);
      list.forEach(function (pub) {
        carousel.appendChild(buildSlide(pub));
      });
      initCarousel();
    })
    .catch(function (err) {
      console.error("Home carousel:", err);
    });
})();
