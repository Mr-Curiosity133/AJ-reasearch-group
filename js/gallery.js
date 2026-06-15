// 照片数据配置（按年份分组）
const galleryData = {
  graduation: {
    2019: [
      { src: 'images/gallery/graduation/2019/2019年毕业留念.jpg', name: '2019年毕业留念' },
      { src: 'images/gallery/graduation/2019/2019年毕业留念2.jpg', name: '2019年毕业留念2' }
    ],
    2018: [
      { src: 'images/gallery/graduation/2018/2018年毕业留念.jpg', name: '2018年毕业留念' },
      { src: 'images/gallery/graduation/2018/2018年毕业留念2.jpg', name: '2018年毕业留念2' }
    ],
    2017: [
      { src: 'images/gallery/graduation/2017/2017年毕业留念.jpg', name: '2017年毕业留念' }
    ]
  },
  conference: [],
  daily: [
    { src: 'images/gallery/daily/环球影城！！！.jpg', name: '环球影城！！！' },
    { src: 'images/gallery/daily/颐和园游览.jpg', name: '颐和园游览' }
  ]
};

// 渲染照片网格
function renderGallery(category) {
  const grid = document.getElementById('galleryGrid');

  if (category === 'graduation') {
    const years = Object.keys(galleryData.graduation).sort((a, b) => b - a);
    if (years.length === 0) {
      grid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: var(--text-secondary);">暂无照片</p>';
      return;
    }

    grid.innerHTML = years.map(year => {
      const photos = galleryData.graduation[year];
      return `
        <figure class="gallery-item-large" data-year="${year}" data-category="graduation">
          <img src="${photos[0].src}" alt="${year}年毕业留念" />
          <figcaption>${year}年毕业留念</figcaption>
        </figure>
      `;
    }).join('');

    grid.querySelectorAll('.gallery-item-large').forEach(item => {
      item.addEventListener('click', () => {
        const year = item.dataset.year;
        openLightbox(0, 'graduation', year);
      });
    });
  } else {
    const photos = galleryData[category];
    if (photos.length === 0) {
      grid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: var(--text-secondary);">暂无照片</p>';
      return;
    }

    grid.innerHTML = photos.map((photo, index) => `
      <figure class="gallery-item-large" data-index="${index}">
        <img src="${photo.src}" alt="${photo.name}" />
        <figcaption>${photo.name}</figcaption>
      </figure>
    `).join('');

    grid.querySelectorAll('.gallery-item-large').forEach((img, idx) => {
      img.addEventListener('click', () => openLightbox(idx, category));
    });
  }
}

// 灯箱功能
let currentCategory = 'graduation';
let currentIndex = 0;
let currentYear = null;

function openLightbox(index, category, year = null) {
  currentIndex = index;
  currentCategory = category;
  currentYear = year;

  const lightbox = document.getElementById('lightbox');
  let photos;

  if (category === 'graduation' && year) {
    photos = galleryData.graduation[year];
  } else {
    photos = galleryData[category];
  }

  lightbox.setAttribute('aria-hidden', 'false');
  lightbox.querySelector('img').src = photos[index].src;
  lightbox.querySelector('.lightbox-caption').textContent = photos[index].name;
}

function closeLightbox() {
  document.getElementById('lightbox').setAttribute('aria-hidden', 'true');
}

function navigateLightbox(direction) {
  let photos;

  if (currentCategory === 'graduation' && currentYear) {
    photos = galleryData.graduation[currentYear];
  } else {
    photos = galleryData[currentCategory];
  }

  currentIndex = (currentIndex + direction + photos.length) % photos.length;
  openLightbox(currentIndex, currentCategory, currentYear);
}

// 初始化
document.addEventListener('DOMContentLoaded', () => {
  const navItems = document.querySelectorAll('.gallery-nav-item');

  navItems.forEach(item => {
    item.addEventListener('click', () => {
      navItems.forEach(i => i.classList.remove('active'));
      item.classList.add('active');
      const category = item.dataset.category;
      renderGallery(category);
    });
  });

  renderGallery('graduation');

  document.querySelector('.lightbox-close')?.addEventListener('click', closeLightbox);
  document.querySelector('.lightbox-prev')?.addEventListener('click', () => navigateLightbox(-1));
  document.querySelector('.lightbox-next')?.addEventListener('click', () => navigateLightbox(1));
  document.getElementById('lightbox')?.addEventListener('click', (e) => {
    if (e.target.id === 'lightbox') closeLightbox();
  });
});
