const MENU_ITEMS = [
  { name: 'Mezgit', price: '₺500', category: 'Balık', page: 'balik.html', icon: '🐟', desc: 'Porsiyon + salata.' },
  { name: 'Çalar', price: '₺360', category: 'Balık', page: 'balik.html', icon: '🐟', desc: 'Porsiyon + salata.' },
  { name: 'Barbun', price: '₺600', category: 'Balık', page: 'balik.html', icon: '🐟', desc: 'Porsiyon + salata.' },
  { name: 'Levrek Buğlama', price: '₺600', category: 'Balık', page: 'balik.html', icon: '🍲', desc: 'Buğulama + salata.' },
  { name: 'Levrek Kızartma', price: '₺600', category: 'Balık', page: 'balik.html', icon: '🍳', desc: 'Kızartma + salata.' },
  { name: 'İstavrit Tava', price: '₺500', category: 'Balık', page: 'balik.html', icon: '🍳', desc: 'Tava + salata.' },
  { name: 'Hamsi Tava', price: '₺400', category: 'Balık', page: 'balik.html', icon: '🍳', desc: 'Tava + salata.' },
  { name: 'Pancar Çorbası', price: '₺140', category: 'Çorbalar', page: 'corba.html', icon: '🍲', desc: 'Pancar çorbası.' },
  { name: 'Balık Çorbası', price: '₺150', category: 'Çorbalar', page: 'corba.html', icon: '🍲', desc: 'Balık çorbası.' },
  { name: 'Mercimek Çorbası', price: '₺130', category: 'Çorbalar', page: 'corba.html', icon: '🍲', desc: 'Mercimek çorbası.' },
  { name: 'Köfte Ekmek', price: '₺240', category: 'Yiyecekler', page: 'yiyecekler.html', icon: '🥪', desc: 'Ekmek arası köfte.' },
  { name: 'Balık Ekmek', price: '₺220', category: 'Yiyecekler', page: 'yiyecekler.html', icon: '🥪', desc: 'Ekmek arası balık.' },
  { name: 'Sucuk Ekmek', price: '₺220', category: 'Yiyecekler', page: 'yiyecekler.html', icon: '🥪', desc: 'Ekmek arası sucuk.' },
  { name: 'Hamburger', price: '₺220', category: 'Yiyecekler', page: 'yiyecekler.html', icon: '🍔', desc: 'Hamburger.' },
  { name: 'Ordu Tostu Çeşitleri', price: '₺200', category: 'Yiyecekler', page: 'yiyecekler.html', icon: '🍞', desc: 'Ordu tostu çeşitleri.' },
  { name: 'Tabak Köfte', price: '₺400', category: 'Yiyecekler', page: 'yiyecekler.html', icon: '🍽️', desc: 'Cips, sebze ve kızarmış ekmek ile.' },
  { name: 'Günün Ev Tatlısı', price: '₺200', category: 'Yiyecekler', page: 'yiyecekler.html', icon: '🍰', desc: 'Her gün değişen ev yapımı tatlı.' },
  { name: 'Çay', price: '₺40', category: 'İçecekler', page: 'icecekler.html', icon: '🍵', desc: 'Çay.' },
  { name: 'Türk Kahvesi', price: '₺120', category: 'İçecekler', page: 'icecekler.html', icon: '☕', desc: 'Türk kahvesi.' },
  { name: 'Latte', price: '₺130', category: 'İçecekler', page: 'icecekler.html', icon: '☕', desc: 'Sütlü kahve.' },
  { name: 'Kutu İçecekler', price: '₺80', category: 'İçecekler', page: 'icecekler.html', icon: '🥤', desc: 'Kola, Fanta, Ice Tea.' },
  { name: 'Şalgam', price: '₺50', category: 'İçecekler', page: 'icecekler.html', icon: '🥤', desc: 'Şalgam.' },
  { name: 'Ayran', price: '₺50', category: 'İçecekler', page: 'icecekler.html', icon: '🧊', desc: 'Ayran.' },
  { name: 'Su', price: '₺20', category: 'İçecekler', page: 'icecekler.html', icon: '💧', desc: 'Su.' },
];

const searchInput = document.getElementById('menuSearch');
const searchResults = document.getElementById('searchResults');
const searchClear = document.getElementById('searchClear');
const homeContent = document.getElementById('homeContent');
const featuredSpotlight = document.getElementById('featuredSpotlight');
const categoryIntro = document.getElementById('categoryIntro');
const categoryGrid = document.getElementById('categoryGrid');
const contactSection = document.getElementById('contactSection');

function normalize(text) {
  return text.toLocaleLowerCase('tr').normalize('NFD').replace(/\p{M}/gu, '');
}

function searchMenu(query) {
  const q = normalize(query.trim());
  if (!q) return [];

  return MENU_ITEMS.filter((item) => {
    const haystack = normalize(`${item.name} ${item.category} ${item.desc}`);
    return haystack.includes(q);
  });
}

function renderResults(results) {
  if (results.length === 0) {
    searchResults.innerHTML = `
      <p class="search-empty">Sonuç bulunamadı. Farklı bir kelime deneyin.</p>
    `;
    return;
  }

  searchResults.innerHTML = results.map((item, i) => `
    <a href="${item.page}" class="search-result-item" style="animation-delay: ${i * 0.05}s">
      <span class="search-result-icon">${item.icon}</span>
      <div class="search-result-info">
        <strong>${item.name}</strong>
        <span>${item.category} · ${item.desc}</span>
      </div>
      <span class="search-result-price">${item.price}</span>
    </a>
  `).join('');
}

function toggleSearchMode(active) {
  searchResults.hidden = !active;
  homeContent.hidden = active;
  if (featuredSpotlight) featuredSpotlight.hidden = active;
  categoryIntro.hidden = active;
  categoryGrid.hidden = active;
  if (contactSection) contactSection.hidden = active;
  searchClear.hidden = !active;
}

searchInput.addEventListener('input', () => {
  const query = searchInput.value;

  if (!query.trim()) {
    toggleSearchMode(false);
    searchResults.innerHTML = '';
    return;
  }

  toggleSearchMode(true);
  renderResults(searchMenu(query));
});

searchClear.addEventListener('click', () => {
  searchInput.value = '';
  searchInput.focus();
  toggleSearchMode(false);
  searchResults.innerHTML = '';
});

searchInput.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    searchInput.value = '';
    toggleSearchMode(false);
    searchResults.innerHTML = '';
    searchInput.blur();
  }
});
