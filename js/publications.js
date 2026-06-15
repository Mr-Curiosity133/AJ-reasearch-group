/**
 * Publications 页面：从 publications.json 加载数据并渲染
 * - isFeatured === true 作为代表性成果，显示为左右结构卡片
 * - 其它作为“更多发表成果”，按给定顺序文本列出（HTML 中 start=11）
 */
(function () {
  "use strict";

  function createFeaturedCard(pub) {
    var el = document.createElement(pub.doi ? "a" : "div");
    el.className = "pub-featured-card";
    if (pub.doi) {
      el.href = pub.doi;
      el.target = "_blank";
      el.rel = "noopener";
    }

    var cover = document.createElement("div");
    cover.className = "pub-featured-cover";
    if (pub.image) {
      var img = document.createElement("img");
      img.src = pub.image;
      img.alt = "TOC image: " + pub.title;
      cover.appendChild(img);
    }

    var info = document.createElement("div");
    info.className = "pub-featured-info";

    var titleEl = document.createElement("h3");
    titleEl.className = "pub-featured-title";
    titleEl.textContent = pub.title;

    var meta = document.createElement("p");
    meta.className = "pub-featured-meta";
    // Authors — Journal. Year, Volume, Pages.
    meta.textContent = pub.authors + " — " + pub.citation;

    info.appendChild(titleEl);
    info.appendChild(meta);

    el.appendChild(cover);
    el.appendChild(info);
    return el;
  }

  function createMoreItem(pub) {
    var li = document.createElement("li");
    var text = pub.authors + " " + pub.title + " " + pub.citation;
    if (pub.doi) {
      var a = document.createElement("a");
      a.href = pub.doi;
      a.target = "_blank";
      a.rel = "noopener";
      a.textContent = text;
      li.appendChild(a);
    } else {
      li.textContent = text;
    }
    return li;
  }

  function init() {
    var featuredContainer = document.getElementById("featuredPublications");
    var moreContainer = document.getElementById("morePublications");
    if (!featuredContainer || !moreContainer) return;

    fetch("data/publications.json")
      .then(function (res) {
        if (!res.ok) throw new Error("Failed to load publications.json");
        return res.json();
      })
      .then(function (data) {
        if (!Array.isArray(data)) return;

        var featured = data.filter(function (p) { return p.isFeatured; });
        var more = data.filter(function (p) { return !p.isFeatured; });

        featured.forEach(function (pub) {
          featuredContainer.appendChild(createFeaturedCard(pub));
        });

        more.forEach(function (pub) {
          moreContainer.appendChild(createMoreItem(pub));
        });
      })
      .catch(function (err) {
        console.error(err);
      });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();

