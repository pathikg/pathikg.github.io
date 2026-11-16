(() => {
  const stats = document.querySelector('.gallery-stats');
  const views = stats.querySelector('.gallery-views');
  const likes = stats.querySelector('.gallery-likes');
  const button = stats.querySelector('button');
  const message = stats.querySelector('[role="status"]');
  const preview = location.hostname !== 'pathikg.github.io';
  const prefix = 'pathikg-github-io-gallery-' + (preview ? 'preview-' : '');
  const likedKey = prefix + 'liked';

  async function count(action, metric) {
    const response = await fetch('https://countapi.mileshilliard.com/api/v1/' + action + '/' + prefix + metric, {
      cache: 'no-store', credentials: 'omit', referrerPolicy: 'no-referrer',
      signal: AbortSignal.timeout(10000)
    });
    const data = await response.json();
    if (action === 'get' && response.status === 404 && data.error === 'Key not found') return 0;
    if (!response.ok || !Number.isSafeInteger(data.value) || data.value < 0) throw new Error('Count unavailable');
    return data.value;
  }

  function alreadyLiked() {
    try { return localStorage.getItem(likedKey) === '1'; } catch { return false; }
  }

  function showLiked() {
    button.querySelector('.heart').textContent = '♥';
    button.setAttribute('aria-label', 'Gallery liked');
    button.title = 'You liked this gallery';
    button.disabled = true;
  }

  stats.hidden = false;
  count('hit', 'views').then(total => {
    views.textContent = total.toLocaleString() + (total === 1 ? ' view' : ' views');
  }).catch(() => { views.textContent = 'Views unavailable'; });

  async function readLikes() {
    try {
      const total = await count('get', 'likes');
      likes.textContent = total.toLocaleString() + (total === 1 ? ' like' : ' likes');
    } catch {
      likes.textContent = 'Likes unavailable';
    }
    if (alreadyLiked()) showLiked();
    else button.disabled = false;
  }

  async function like() {
    if (alreadyLiked()) {
      showLiked();
      return;
    }
    const total = await count('hit', 'likes');
    try { localStorage.setItem(likedKey, '1'); } catch { /* The disabled button lasts for this visit. */ }
    likes.textContent = total.toLocaleString() + (total === 1 ? ' like' : ' likes');
    showLiked();
    message.textContent = 'You liked the gallery.';
  }

  button.addEventListener('click', async () => {
    button.disabled = true;
    message.textContent = '';
    try {
      if (navigator.locks) await navigator.locks.request(likedKey, like);
      else await like();
    } catch {
      message.textContent = 'Couldn’t confirm your like. Try again.';
      button.disabled = false;
    }
  });
  window.addEventListener('storage', event => {
    if (event.key === likedKey && event.newValue === '1') readLikes();
  });
  readLikes();
})();
