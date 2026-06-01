(function () {
  const fallbackData = window.BFA_LOCAL_DATA || {};
  const menuButton = document.querySelector('[data-menu-button]');
  const primaryNav = document.querySelector('[data-primary-nav]');

  if (menuButton && primaryNav) {
    menuButton.addEventListener('click', function () {
      const isOpen = document.body.classList.toggle('nav-open');
      menuButton.setAttribute('aria-expanded', String(isOpen));
    });

    document.addEventListener('click', function (event) {
      if (!document.body.classList.contains('nav-open')) {
        return;
      }

      const target = event.target;
      if (!(target instanceof Node)) {
        return;
      }

      if (!primaryNav.contains(target) && !menuButton.contains(target)) {
        document.body.classList.remove('nav-open');
        menuButton.setAttribute('aria-expanded', 'false');
      }
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && document.body.classList.contains('nav-open')) {
        document.body.classList.remove('nav-open');
        menuButton.setAttribute('aria-expanded', 'false');
        menuButton.focus();
      }
    });
  }

  const yearSpans = document.querySelectorAll('[data-current-year]');
  yearSpans.forEach(function (el) {
    el.textContent = String(new Date().getFullYear());
  });

  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length > 0) {
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    revealEls.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    revealEls.forEach(function (el) {
      el.classList.add('is-visible');
    });
  }

  loadPostsLists();
  loadWorkLists();
  loadOfferingsLists();

  function loadPostsLists() {
    const postsLists = document.querySelectorAll('[data-posts-list]');
    postsLists.forEach(function (postsList) {
      const dataPath = postsList.getAttribute('data-source') || 'data/posts.json';
      const linkPrefix = postsList.getAttribute('data-post-link-prefix') || 'posts/';
      const limit = toLimit(postsList.getAttribute('data-limit'));

      loadCollection(dataPath, 'posts')
        .then(function (posts) {
          if (!Array.isArray(posts) || posts.length === 0) {
            postsList.innerHTML = '<li class="post-list-item">No published posts yet.</li>';
            return;
          }

          const visiblePosts = limit ? posts.slice(0, limit) : posts;
          postsList.innerHTML = visiblePosts
            .map(function (post) {
              const tags = (post.tags || [])
                .map(function (tag) {
                  return '<span class="chip">' + escapeHtml(tag) + '</span>';
                })
                .join('');

              return [
                '<li class="post-list-item">',
                '<h3><a href="' + escapeHtml(linkPrefix + post.slug + '.html') + '">' + escapeHtml(post.title) + '</a></h3>',
                '<p class="muted">' + escapeHtml(post.date) + '</p>',
                '<p>' + escapeHtml(post.excerpt) + '</p>',
                '<div class="card-meta">' + tags + '</div>',
                '</li>'
              ].join('');
            })
            .join('');
        })
        .catch(function () {
          postsList.innerHTML = '<li class="post-list-item">Posts are unavailable right now.</li>';
        });
    });
  }

  function loadWorkLists() {
    const workLists = document.querySelectorAll('[data-work-list]');
    workLists.forEach(function (workList) {
      const dataPath = workList.getAttribute('data-source') || 'data/work.json';
      const limit = toLimit(workList.getAttribute('data-limit'));
      const imagePrefix = workList.getAttribute('data-image-prefix') || '';
      const sortMode = workList.getAttribute('data-work-sort') || 'year-desc';
      const filterTargetId = workList.getAttribute('data-work-filter-target');
      const materialFilter = filterTargetId ? document.getElementById(filterTargetId) : null;

      loadCollection(dataPath, 'work')
        .then(function (items) {
          if (!Array.isArray(items) || items.length === 0) {
            workList.innerHTML = '<p class="muted">No work items available right now.</p>';
            return;
          }

          const sortedItems = sortWorkItems(items, sortMode);

          if (materialFilter) {
            hydrateMaterialFilter(materialFilter, sortedItems);
            const initialFilter = materialFilter.value || 'all';
            renderWorkCards(initialFilter);

            if (materialFilter.dataset.bound !== 'true') {
              materialFilter.addEventListener('change', function () {
                renderWorkCards(materialFilter.value || 'all');
              });
              materialFilter.dataset.bound = 'true';
            }
          } else {
            renderWorkCards('all');
          }

          function renderWorkCards(materialValue) {
            const filteredItems =
              materialValue && materialValue !== 'all'
                ? sortedItems.filter(function (item) {
                    return (item.materials || []).some(function (material) {
                      return toFilterValue(material) === materialValue;
                    });
                  })
                : sortedItems;

            if (filteredItems.length === 0) {
              workList.innerHTML = '<p class="muted">No work items match this filter.</p>';
              return;
            }

            const visibleItems = limit ? filteredItems.slice(0, limit) : filteredItems;
            workList.innerHTML = visibleItems
              .map(function (item) {
                const stageChips = (item.stages || [])
                  .map(function (stage) {
                    return '<span class="chip">' + escapeHtml(stage) + '</span>';
                  })
                  .join('');

                const materialChips = (item.materials || [])
                  .map(function (material) {
                    return '<span class="chip">' + escapeHtml(material) + '</span>';
                  })
                  .join('');

                const imageSrc = joinPath(imagePrefix, item.image || '');
                const imageBlock = item.image
                  ? '<img src="' +
                    escapeHtml(imageSrc) +
                    '" alt="' +
                    escapeHtml(item.imageAlt || item.title || 'Work image') +
                    '" />'
                  : '';

                return [
                  '<article class="card">',
                  imageBlock,
                  '<div class="card-body">',
                  '<h3>' + escapeHtml(item.title || 'Untitled work') + '</h3>',
                  '<p>' + escapeHtml(item.summary || '') + '</p>',
                  '<p class="card-meta">' + stageChips + materialChips + '</p>',
                  '</div>',
                  '</article>'
                ].join('');
              })
              .join('');
          }
        })
        .catch(function () {
          workList.innerHTML = '<p class="muted">Work data is unavailable right now.</p>';
        });
    });
  }

  function loadOfferingsLists() {
    const offeringsLists = document.querySelectorAll('[data-offerings-list]');
    offeringsLists.forEach(function (offeringsList) {
      const dataPath = offeringsList.getAttribute('data-source') || 'data/offerings.json';
      const limit = toLimit(offeringsList.getAttribute('data-limit'));

      loadCollection(dataPath, 'offerings')
        .then(function (items) {
          if (!Array.isArray(items) || items.length === 0) {
            offeringsList.innerHTML = '<p class="muted">No offerings are listed right now.</p>';
            return;
          }

          const visibleItems = limit ? items.slice(0, limit) : items;
          offeringsList.innerHTML = visibleItems
            .map(function (item) {
              const tags = (item.tags || [])
                .map(function (tag) {
                  return '<span class="chip">' + escapeHtml(tag) + '</span>';
                })
                .join('');

              return [
                '<article class="card">',
                '<div class="card-body">',
                '<h3>' + escapeHtml(item.title || 'Untitled offering') + '</h3>',
                '<p>' + escapeHtml(item.summary || '') + '</p>',
                '<p class="card-meta">' + tags + '</p>',
                '</div>',
                '</article>'
              ].join('');
            })
            .join('');
        })
        .catch(function () {
          offeringsList.innerHTML = '<p class="muted">Offerings data is unavailable right now.</p>';
        });
    });
  }

  function loadCollection(path, key) {
    return fetch(path)
      .then(function (res) {
        if (!res.ok) {
          throw new Error('Failed to load ' + key + ' data');
        }
        return res.json();
      })
      .catch(function (err) {
        if (Array.isArray(fallbackData[key])) {
          return fallbackData[key];
        }
        throw err;
      });
  }

  function toLimit(value) {
    const parsed = Number.parseInt(value || '', 10);
    return Number.isFinite(parsed) && parsed > 0 ? parsed : null;
  }

  function sortWorkItems(items, mode) {
    const sorted = [...items];
    sorted.sort(function (a, b) {
      const aYear = toYearValue(a);
      const bYear = toYearValue(b);

      if (Number.isFinite(aYear) && Number.isFinite(bYear) && aYear !== bYear) {
        return mode === 'year-asc' ? aYear - bYear : bYear - aYear;
      }

      if (Number.isFinite(aYear) && !Number.isFinite(bYear)) {
        return -1;
      }

      if (!Number.isFinite(aYear) && Number.isFinite(bYear)) {
        return 1;
      }

      return String(a.title || '').localeCompare(String(b.title || ''));
    });

    return sorted;
  }

  function toYearValue(item) {
    const directYear = Number.parseInt(item.year || '', 10);
    if (Number.isFinite(directYear)) {
      return directYear;
    }

    const dateText = String(item.date || '');
    const dateYear = Number.parseInt(dateText.slice(0, 4), 10);
    return Number.isFinite(dateYear) ? dateYear : Number.NaN;
  }

  function hydrateMaterialFilter(selectEl, items) {
    const current = selectEl.value || 'all';
    const materialSet = new Set();

    items.forEach(function (item) {
      (item.materials || []).forEach(function (material) {
        const clean = String(material || '').trim();
        if (clean) {
          materialSet.add(clean);
        }
      });
    });

    const options = ['<option value="all">All materials</option>'];
    [...materialSet]
      .sort(function (a, b) {
        return a.localeCompare(b);
      })
      .forEach(function (material) {
        options.push(
          '<option value="' + escapeHtml(toFilterValue(material)) + '">' + escapeHtml(material) + '</option>'
        );
      });

    selectEl.innerHTML = options.join('');

    const values = [...selectEl.options].map(function (option) {
      return option.value;
    });

    selectEl.value = values.includes(current) ? current : 'all';
  }

  function toFilterValue(value) {
    return String(value || '')
      .trim()
      .toLowerCase()
      .replace(/\s+/g, '-');
  }

  function joinPath(prefix, filePath) {
    if (!prefix) {
      return filePath;
    }

    if (/^(https?:|data:|\/)/.test(filePath)) {
      return filePath;
    }

    return prefix + filePath;
  }

  function escapeHtml(value) {
    return String(value)
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;')
      .replaceAll("'", '&#39;');
  }
})();
