(function () {
  "use strict";

  var container = document.getElementById("newsTimeline");
  if (!container) return;

  // Lightbox
  var lb = document.createElement("div");
  lb.className = "lightbox";
  var lbImg = document.createElement("img");
  lb.appendChild(lbImg);
  document.body.appendChild(lb);
  lb.addEventListener("click", function () { lb.classList.remove("open"); });

  function groupByYear(items) {
    var map = {};
    items.forEach(function (item) {
      var year = (item.date || "").slice(0, 4) || "未知";
      if (!map[year]) map[year] = [];
      map[year].push(item);
    });
    return map;
  }

  function createCard(item) {
    var el = document.createElement(item.link ? "a" : "div");
    el.className = "tl-card";
    if (item.link) { el.href = item.link; el.target = "_blank"; el.rel = "noopener"; }

    var body = document.createElement("div");
    body.className = "tl-card-body";

    if (item.image) {
      var img = document.createElement("img");
      img.src = item.image;
      img.alt = item.title || "";
      img.className = "tl-card-img";
      img.addEventListener("click", function (e) {
        e.preventDefault();
        lbImg.src = img.src;
        lb.classList.add("open");
      });
      body.appendChild(img);
    }

    var info = document.createElement("div");
    info.className = "tl-card-info";

    var h3 = document.createElement("h3");
    h3.textContent = item.title || "";
    info.appendChild(h3);

    if (item.date) {
      var date = document.createElement("p");
      date.className = "tl-card-date";
      date.textContent = item.date;
      info.appendChild(date);
    }

    if (item.excerpt) {
      var p = document.createElement("p");
      p.className = "tl-card-excerpt";
      p.textContent = item.excerpt;
      info.appendChild(p);
    }

    body.appendChild(info);
    el.appendChild(body);
    return el;
  }

  fetch("data/news.json")
    .then(function (res) { return res.json(); })
    .then(function (items) {
      if (!Array.isArray(items)) return;
      items.sort(function (a, b) { return (b.date || "").localeCompare(a.date || ""); });

      var grouped = groupByYear(items);
      var years = Object.keys(grouped).sort(function (a, b) { return b - a; });

      years.forEach(function (year) {
        var group = document.createElement("div");
        group.className = "tl-group";

        var yearLabel = document.createElement("div");
        yearLabel.className = "tl-year";
        yearLabel.textContent = year;
        group.appendChild(yearLabel);

        var entries = document.createElement("div");
        entries.className = "tl-entries";

        grouped[year].forEach(function (item) {
          var row = document.createElement("div");
          row.className = "tl-entry";

          var dot = document.createElement("div");
          dot.className = "tl-dot";
          row.appendChild(dot);

          row.appendChild(createCard(item));
          entries.appendChild(row);
        });

        group.appendChild(entries);
        container.appendChild(group);
      });
    })
    .catch(function (err) { console.error("News:", err); });
})();
