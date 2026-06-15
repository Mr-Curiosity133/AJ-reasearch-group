/**
 * 简易中英文切换：通过 data-i18n 与 data-i18n-placeholder 指定键名
 */
(function () {
  const translations = {
    zh: {
      nav: {
        home: "首页",
        anjie: "安杰",
        research: "研究方向",
        publications: "已发表成果",
        news: "新闻",
        gallery: "课题组照片",
        contact: "联系我们",
      },
      home: {
        overviewTitle: "实验室概况",
        overviewText: "【此处填写实验室简介：成立时间、所属单位、主要研究领域、团队规模等概况性描述。】",
        pubCarouselTitle: "已发表成果",
        viewAllPublications: "查看全部已发表成果 →",
        viewContactPage: "地图与加入我们 →",
      },
      hero: {
        slogan: "探索未知 · 创新未来",
      },
      pi: {
        title: "Prof. Jie An 丨 安杰",
        subtitle: "中国农业大学有机化学教授",
        emailLabel: "电子邮箱",
        sectionEducation: "教育经历",
        sectionWork: "工作经历",
        sectionResearch: "研究兴趣",
        sectionPubs: "代表性成果",
        edu1role: "合成化学 博士",
        edu1org: "诺丁汉大学，英国",
        edu2role: "理学 学士",
        edu2org: "中国农业大学",
        work1role: "教授、青年科学家创新团队负责人",
        work1org: "中国农业大学",
        work2role: "副教授",
        work2org: "中国农业大学",
        work3role: "合成化学 博士后",
        work3org: "曼彻斯特大学，英国",
        interest1: "新材料与人类健康：生物医用水凝胶、抗菌表面、超疏水材料",
        interest2: "绿色化学与药物研发：氘标记化合物合成、氘代药物开发",
        timeline1: "2019.01 至今：中国农业大学 教授、青年科学家创新团队负责人",
        timeline2: "2015.04-2018.12：中国农业大学 副教授",
        timeline3: "2013.08-2015.04：曼彻斯特大学 合成化学博士后",
        timeline4: "2009.09-2013.07：诺丁汉大学 合成化学博士",
        timeline5: "2005.09-2009.07：中国农业大学 理学学士",
      },
      news: {
        title: "课题组新闻",
        lead: "最新发表论文、获奖、会议活动与组内动态。",
        card1: { title: "论文标题占位", desc: "期刊名称 · 年份" },
        card2: { title: "实验室新闻占位", desc: "简要描述" },
        card3: { title: "成果/会议占位", desc: "简要描述" },
      },
      research: {
        title: "研究方向",
        lead: "课题组核心研究课题概览",
        item1: {
          title: "新材料与人类健康",
          desc: "利用 Click Chemistry、光催化反应等最新合成技术制备生物医用材料与功能表面材料。研究方向包括组织修复用水凝胶材料、柔性可植入智能材料、抗菌表面以及超疏水表面等，侧重材料设计、表面功能化与生物相容性评估。"
        },
        item2: {
          title: "绿色化学与药物研发",
          desc: "构建符合绿色化学理念的新型合成方法，重点发展高效、选择性且原子经济的新型氘标记化合物合成路线；基于新合成方法推进氘代药物与疾病诊断试剂的开发，兼顾工艺可放大性与环境友好性。"
        },
      },
      publications: {
        title: "已发表成果",
        lead: "点击卡片跳转至论文原文（DOI）",
        featuredTitle: "代表性成果",
        moreList: "更多发表成果",
      },
      libraries: {
        title: "氘代化合物库",
        lead: "实验室合成的氘代化合物，支持按名称或 CAS 号检索",
        searchPlaceholder: "搜索化合物名称或 CAS 号",
        filterAll: "全部",
      },
      gallery: {
        title: "课题组照片",
        lead: "科研、会议与团建活动精选",
      },
      contact: {
        title: "联系我们",
        lead: "地址、地图与人才招募",
        mapPlaceholder: "地图占位：请嵌入百度地图或 Google Maps",
        address: "通讯地址",
        addressValue: "北京市海淀区清华东路17号（中国农业大学营养与健康研究院）",
        email: "PI 邮箱",
        joinTitle: "加入我们",
        joinEnquiry: "非正式咨询：jie_an@cau.edu.cn",
        joinUgTitle: "本科生",
        joinUgDesc: "如果你是勤奋自主的本科生，希望在我们实验室进行实习研究，欢迎联系我们。",
        joinMasterTitle: "硕士生",
        joinMasterDesc: "课题组每年提供若干有资助的硕士研究生名额。",
        joinPhdTitle: "博士生",
        joinPhdDesc: "欢迎国际博士生加入课题组。我们很乐意协助申请国家留学基金委（CSC）奖学金。请发送您的简历，我们将为您提供申请指导。",
      },
      footer: {
        rights: "保留所有权利",
      },
    },
    en: {
      nav: {
        home: "Home",
        anjie: "An Jie",
        research: "Research",
        publications: "Publications",
        news: "News",
        gallery: "Group Pictures",
        contact: "Contact",
      },
      home: {
        overviewTitle: "Lab Overview",
        overviewText: "[Lab introduction: establishment, affiliation, research areas, team size, etc.]",
        pubCarouselTitle: "Publications",
        viewAllPublications: "View all publications →",
        viewContactPage: "Map & Join Us →",
      },
      hero: {
        slogan: "Explore the Unknown · Innovate the Future",
      },
      pi: {
        title: "Prof. Jie An 丨 安杰",
        subtitle: "Professor in Organic Chemistry at China Agricultural University",
        emailLabel: "E-mail",
        timeline1: "2019.01–present: Professor, China Agricultural University; Leader of Young Scientists Innovation Team.",
        timeline2: "2015.04–2018.12: Associate Professor, China Agricultural University.",
        timeline3: "2013.08–2015.04: Postdoctoral Researcher in Synthetic Chemistry, The University of Manchester.",
        timeline4: "2009.09–2013.07: PhD in Synthetic Chemistry, The University of Nottingham.",
        timeline5: "2005.09–2009.07: B.Sc. in Chemistry, China Agricultural University.",
      },
      news: {
        title: "Group News",
        lead: "Recent publications, awards, conferences and internal updates.",
        card1: { title: "Paper Title Placeholder", desc: "Journal · Year" },
        card2: { title: "Lab News Placeholder", desc: "Brief description" },
        card3: { title: "Achievement / Conference", desc: "Brief description" },
      },
      research: {
        title: "Research",
        lead: "Overview of our core research topics",
        item1: {
          title: "Materials for Health",
          desc: "Develop biomedical and functional surface materials using Click Chemistry, photocatalysis and other modern synthetic techniques. Areas include tissue-regenerative hydrogels, flexible implantable smart materials, antibacterial surfaces, and superhydrophobic coatings, with emphasis on materials design, surface functionalization and biocompatibility."
        },
        item2: {
          title: "Green Chemistry & Drug Discovery",
          desc: "Develop green, efficient synthetic methods—especially for novel deuterium-labeled compounds—and apply these methods to the discovery and development of deuterated drugs and diagnostic reagents, with attention to scalability and environmental impact."
        },
      },
      publications: {
        title: "Publications",
        lead: "Click a card to open the paper (DOI).",
        featuredTitle: "Featured Publications",
        moreList: "More Publications",
      },
      libraries: {
        title: "Libraries of Deuterium Labeled Compound",
        lead: "Deuterium-labeled compounds synthesized in our lab. Search by name or CAS number.",
        searchPlaceholder: "Search by name or CAS number",
        filterAll: "All",
      },
      gallery: {
        title: "Group Pictures",
        lead: "Research, conferences, and team activities",
      },
      contact: {
        title: "Contact Us",
        lead: "Address, map, and recruitment",
        mapPlaceholder: "Map: Embed Baidu Map or Google Maps here",
        address: "Address",
        addressValue: "No. 17 Qinghua East Road, Haidian District, Beijing (College of Nutrition and Health, China Agricultural University)",
        email: "PI Email",
        joinTitle: "Join Us",
        joinEnquiry: "Informal Enquiries: jie_an@cau.edu.cn",
        joinUgTitle: "Undergraduate Students",
        joinUgDesc: "If you are a hard-working and self-motivated undergraduate student and you would like to carry out a placement in our laboratory, please contact us.",
        joinMasterTitle: "Master Students",
        joinMasterDesc: "Funded master studentships are available in the group each year.",
        joinPhdTitle: "PhD Students",
        joinPhdDesc: "International PhD students are welcome in our group. We would be happy to help with the application of the China Scholarship Council Scholarship. Send us a copy of your CV, and we will advise you on how to apply for scholarship.",
      },
      footer: {
        rights: "All rights reserved.",
      },
    },
  };

  const STORAGE_KEY = "lab-site-lang";

  function getLang() {
    return localStorage.getItem(STORAGE_KEY) || "zh";
  }

  function setLang(lang) {
    localStorage.setItem(STORAGE_KEY, lang);
    document.documentElement.setAttribute("lang", lang === "zh" ? "zh-CN" : "en");
    document.body.setAttribute("data-lang", lang);
    applyTranslations(lang);
  }

  function getNested(obj, path) {
    return path.split(".").reduce(function (o, k) {
      return (o && o[k]) ? o[k] : "";
    }, obj);
  }

  function applyTranslations(lang) {
    const t = translations[lang] || translations.zh;
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var key = el.getAttribute("data-i18n");
      var value = getNested(t, key);
      if (value) el.textContent = value;
    });
    document.querySelectorAll("[data-i18n-placeholder]").forEach(function (el) {
      var key = el.getAttribute("data-i18n-placeholder");
      var value = getNested(t, key);
      if (value) el.setAttribute("placeholder", value);
    });
  }

  function init() {
    var lang = getLang();
    document.documentElement.setAttribute("lang", lang === "zh" ? "zh-CN" : "en");
    document.body.setAttribute("data-lang", lang);
    applyTranslations(lang);

    var btn = document.getElementById("langToggle");
    if (btn) {
      btn.addEventListener("click", function () {
        var next = getLang() === "zh" ? "en" : "zh";
        setLang(next);
      });
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  window.i18n = { getLang: getLang, setLang: setLang, apply: applyTranslations };
})();
