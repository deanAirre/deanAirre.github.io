
       const q = document.getElementById('q');
    q.addEventListener('input', () => {
      const t = q.value.toLowerCase();
      let shown = 0;
      document.querySelectorAll('.card').forEach(c => {
        const match = c.textContent.toLowerCase().includes(t);
        c.hidden = !match;
        if (match) shown++;
      });
      document.getElementById('empty').hidden = shown > 0;
    });
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