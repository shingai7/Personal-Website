/* Portfolio scripts: theme toggle, greeting, back to top, and the Projects page (fetch + filter + search) */

// ---------- Dark / light mode ----------
function getSavedTheme() {
  try { return localStorage.getItem('theme'); } catch (e) { return null; }
}
function saveTheme(theme) {
  try { localStorage.setItem('theme', theme); } catch (e) { /* storage unavailable, ignore */ }
}
function applyTheme(theme) {
  document.documentElement.setAttribute('data-bs-theme', theme);
  const btn = document.getElementById('themeToggle');
  if (btn) {
    btn.textContent = theme === 'dark' ? 'Light mode' : 'Dark mode';
    btn.setAttribute('aria-pressed', theme === 'dark');
  }
}
function initTheme() {
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  applyTheme(getSavedTheme() || (prefersDark ? 'dark' : 'light'));
  const btn = document.getElementById('themeToggle');
  if (btn) {
    btn.addEventListener('click', () => {
      const next = document.documentElement.getAttribute('data-bs-theme') === 'dark' ? 'light' : 'dark';
      applyTheme(next);
      saveTheme(next);
    });
  }
}

// ---------- Greeting based on time of day (Home page) ----------
function initGreeting() {
  const el = document.getElementById('greeting');
  if (!el) return;
  const hour = new Date().getHours();
  const part = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';
  el.textContent = part + ', welcome to my portfolio';
}

// ---------- Back to top button ----------
function initBackToTop() {
  const btn = document.getElementById('backToTop');
  if (!btn) return;
  window.addEventListener('scroll', () => {
    btn.style.display = window.scrollY > 300 ? 'block' : 'none';
  });
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

// ---------- Projects page ----------
function makeEl(tag, className, text) {
  const e = document.createElement(tag);
  if (className) e.className = className;
  if (text !== undefined) e.textContent = text;
  return e;
}

function initProjects() {
  const grid = document.getElementById('projects');
  if (!grid) return;

  const filterBar = document.getElementById('filters');
  const searchBox = document.getElementById('projectSearch');
  const status = document.getElementById('projectStatus');
  let projects = [];
  let activeCategory = 'All';

  function buildCard(p) {
    const col = makeEl('div', 'col-md-6 col-lg-4');
    const card = makeEl('div', 'card h-100');
    const body = makeEl('div', 'card-body d-flex flex-column');

    const badges = makeEl('div', 'mb-3');
    p.technologies.forEach(t => badges.append(makeEl('span', 'badge badge-brand me-1', t)));

    const link = makeEl('a', 'btn btn-outline-brand btn-sm stretched-link', 'View on GitHub');
    link.href = p.link;
    link.target = '_blank';
    link.rel = 'noopener';
    const linkWrap = makeEl('div', 'mt-auto');
    linkWrap.append(link);

    body.append(makeEl('h2', 'card-title h5', p.title), makeEl('p', 'card-text', p.description), badges, linkWrap);

    const footer = makeEl('div', 'card-footer');
    footer.append(makeEl('small', 'text-muted', p.category));

    card.append(body, footer);
    col.append(card);
    return col;
  }

  function render() {
    const term = searchBox ? searchBox.value.trim().toLowerCase() : '';
    const visible = projects.filter(p => {
      const inCategory = activeCategory === 'All' || p.category === activeCategory;
      const haystack = (p.title + ' ' + p.description + ' ' + p.technologies.join(' ')).toLowerCase();
      return inCategory && haystack.includes(term);
    });
    grid.replaceChildren(...visible.map(buildCard));
    if (status) {
      status.textContent = visible.length === 0 ? 'No projects match your search.' : '';
    }
  }

  function buildFilters() {
    const categories = ['All', ...new Set(projects.map(p => p.category))];
    filterBar.replaceChildren(...categories.map(cat => {
      const b = makeEl('button', 'btn btn-outline-brand' + (cat === 'All' ? ' active' : ''), cat);
      b.type = 'button';
      b.addEventListener('click', () => {
        activeCategory = cat;
        filterBar.querySelectorAll('button').forEach(x => x.classList.remove('active'));
        b.classList.add('active');
        render();
      });
      return b;
    }));
  }

  fetch('data/projects.json')
    .then(response => {
      if (!response.ok) throw new Error('HTTP ' + response.status);
      return response.json();
    })
    .then(data => {
      projects = data;
      buildFilters();
      render();
    })
    .catch(err => {
      console.error('Could not load data/projects.json:', err);
      const alert = makeEl('div', 'alert alert-warning');
      alert.setAttribute('role', 'alert');
      alert.textContent = 'Projects could not be loaded. Open this site through a local web server (for example Live Server) instead of opening the file directly.';
      grid.replaceChildren(alert);
    });

  if (searchBox) searchBox.addEventListener('input', render);
}

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initGreeting();
  initBackToTop();
  initProjects();
});
