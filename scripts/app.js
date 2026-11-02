const PER_PAGE = 3;

const q = document.getElementById('q');
const empty = document.getElementById('empty');
const pager = document.getElementById('pager');
const cards = [...document.querySelectorAll('.card')];

let matches = cards;
let page = 1;

function render() {
  const pages = Math.max(1, Math.ceil(matches.length / PER_PAGE));
  page = Math.min(page, pages);
  const start = (page - 1) * PER_PAGE;

  cards.forEach(c => c.hidden = true);
  matches.slice(start, start + PER_PAGE).forEach(c => c.hidden = false);
  empty.hidden = matches.length > 0;

  pager.replaceChildren();
  pager.hidden = pages <= 1;

  const add = (label, target, disabled, current) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.textContent = label;
    b.disabled = disabled;
    if (current) b.setAttribute('aria-current', 'page');
    b.addEventListener('click', () => { page = target; render(); });
    pager.append(b);
  };

  add('‹ Prev', page - 1, page === 1);
  for (let i = 1; i <= pages; i++) add(String(i), i, false, i === page);
  add('Next ›', page + 1, page === pages);
}

q.addEventListener('input', () => {
  const t = q.value.toLowerCase();
  matches = cards.filter(c => c.textContent.toLowerCase().includes(t));
  page = 1;
  render();
});

render();

const btn = document.getElementById('theme');
const label = () => btn.textContent =
  document.documentElement.dataset.theme === 'dark' ? 'Light' : 'Dark';
label();
btn.addEventListener('click', () => {
  const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  document.documentElement.dataset.theme = next;
  localStorage.setItem('theme', next);
  label();
});