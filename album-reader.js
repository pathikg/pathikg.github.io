(() => {
  const reader = document.querySelector('#album-reader');
  if (typeof reader?.showModal !== 'function') return;
  const spread = reader.querySelector('.reader-spread');
  const closeButton = reader.querySelector('button');

  function getPanels(album) {
    const panels = Array.from(album.querySelectorAll('.photo-grid figure'));
    const cover = album.querySelector('summary img');
    if (cover && !panels.some(panel => panel.querySelector('img')?.src === cover.src)) {
      const figure = document.createElement('figure');
      const link = document.createElement('a');
      link.href = cover.src;
      link.append(cover.cloneNode());
      figure.append(link);
      panels.unshift(figure);
    }
    return panels;
  }

  function isPortrait(panel) {
    const image = panel.querySelector('img');
    return Number(image.getAttribute('height')) > Number(image.getAttribute('width'));
  }

  function layOut(panels, title, layout) {
    if (layout === 'award' && panels.length === 4) {
      const feature = document.createElement('div');
      feature.className = 'reader-row';
      feature.dataset.shape = 'award';
      feature.append(...panels);
      return feature;
    }
    // Keep the same gutters on repeat visits and preserve the author's photo order.
    let variation = Array.from(title).reduce((hash, char) => (hash * 31 + char.codePointAt(0)) >>> 0, 0);
    const page = document.createDocumentFragment();
    let start = 0;
    while (start < panels.length) {
      const remaining = panels.length - start;
      let count = Math.min(2, remaining);
      if (start === 0 && remaining >= 4 && !isPortrait(panels[start])) count = 1;
      else if (remaining === 3 || (remaining >= 5 && variation % 3 === 0)) count = 3;

      const row = document.createElement('div');
      row.className = 'reader-row';
      const group = panels.slice(start, start + count);
      let shape = 'pair';
      if (count === 1) shape = isPortrait(group[0]) ? 'portrait' : 'splash';
      if (count === 3) shape = group.every(isPortrait) ? 'strip' : 'stack';
      row.dataset.shape = shape;
      row.style.setProperty('--split', (46 + variation % 11) + '%');
      row.append(...group);
      page.append(row);
      start += count;
      variation = (Math.imul(variation, 1664525) + 1013904223) >>> 0;
    }
    return page;
  }

  for (const album of document.querySelectorAll('details.album')) {
    const summary = album.querySelector('summary');
    const panels = getPanels(album);
    if (!panels.length) continue;
    const label = summary.querySelector('.when-closed');
    if (label) label.textContent = `Open album · ${panels.length} ${panels.length === 1 ? 'picture' : 'pictures'}`;
    summary.setAttribute('aria-haspopup', 'dialog');
    summary.addEventListener('click', event => {
      if (event.defaultPrevented) return;
      event.preventDefault();
      const title = summary.querySelector('strong').textContent;
      reader.querySelector('h2').textContent = title;
      reader.querySelector('.reader-date').textContent = summary.querySelector('.album-date')?.textContent || '';
      spread.replaceChildren(layOut(panels.map(panel => panel.cloneNode(true)), title, album.dataset.layout));
      reader.showModal();
      reader.scrollTop = 0;
      closeButton.focus({ preventScroll: true });
    });
  }

  closeButton.addEventListener('click', () => reader.close());
  reader.addEventListener('close', () => {
    if (!reader.open) spread.replaceChildren();
  });
})();
