/* ==========================================================================
   theme.js · Mejoras de interfaz (no modifica la lógica de app.js)
   - Modo claro / oscuro (recuerda la preferencia)
   - Menú lateral desplegable en móvil
   - Buscador de plantillas en el menú (Ctrl/Cmd + K)
   - Resalta en el menú la sección que se está viendo (scrollspy)
   ========================================================================== */
(function () {
    'use strict';

    var root = document.documentElement;
    var STORAGE_KEY = 'hitss-theme';

    function $(sel, ctx) { return (ctx || document).querySelector(sel); }
    function $$(sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); }
    function norm(s) {
        return String(s || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    }

    /* ------------------------------------------------------------------
       1. Modo claro / oscuro
       ------------------------------------------------------------------ */
    function currentTheme() {
        return root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
    }

    function paintThemeButton() {
        var btn = $('#theme-toggle');
        if (!btn) return;
        var icon = $('.material-symbols-outlined', btn);
        var dark = currentTheme() === 'dark';
        if (icon) icon.textContent = dark ? 'light_mode' : 'dark_mode';
        btn.setAttribute('aria-label', dark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro');
        btn.setAttribute('title', dark ? 'Modo claro' : 'Modo oscuro');
    }

    function setTheme(theme) {
        root.setAttribute('data-theme', theme);
        try { localStorage.setItem(STORAGE_KEY, theme); } catch (e) { /* sin storage */ }
        var meta = $('meta[name="theme-color"]');
        if (meta) meta.setAttribute('content', theme === 'dark' ? '#0c0e15' : '#f4f5f9');
        paintThemeButton();
    }

    function initTheme() {
        if (!root.getAttribute('data-theme')) {
            var dark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
            root.setAttribute('data-theme', dark ? 'dark' : 'light');
        }
        paintThemeButton();
        var btn = $('#theme-toggle');
        if (btn) {
            btn.addEventListener('click', function () {
                setTheme(currentTheme() === 'dark' ? 'light' : 'dark');
            });
        }
    }

    /* ------------------------------------------------------------------
       1b. Tema Halloween (solo en octubre; se puede apagar con el botón 🎃)
       ------------------------------------------------------------------ */
    function initSeason() {
        var btn = $('#season-toggle');
        if (!btn) return;
        if (new Date().getMonth() !== 9) { btn.hidden = true; return; }
        btn.hidden = false;
        function paint() {
            var on = root.getAttribute('data-season') === 'halloween';
            btn.setAttribute('aria-pressed', on ? 'true' : 'false');
            btn.setAttribute('title', on ? 'Desactivar tema Halloween' : 'Activar tema Halloween');
        }
        paint();
        btn.addEventListener('click', function () {
            var on = root.getAttribute('data-season') === 'halloween';
            if (on) root.removeAttribute('data-season');
            else root.setAttribute('data-season', 'halloween');
            try { localStorage.setItem('hitss-season', on ? 'off' : 'on'); } catch (e) { }
            paint();
        });
    }

    /* ------------------------------------------------------------------
       2. Menú lateral en móvil
       ------------------------------------------------------------------ */
    function openNav() { document.body.classList.add('nav-open'); }
    function closeNav() { document.body.classList.remove('nav-open'); }

    function initDrawer() {
        var toggle = $('#menu-toggle');
        var backdrop = $('#nav-backdrop');
        if (toggle) {
            toggle.addEventListener('click', function () {
                document.body.classList.toggle('nav-open');
            });
        }
        if (backdrop) backdrop.addEventListener('click', closeNav);

        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') closeNav();
        });

        // Cierra el menú al elegir una plantilla (pero no al desplegar un grupo)
        var nav = $('.nav');
        if (nav) {
            nav.addEventListener('click', function (e) {
                var link = e.target.closest ? e.target.closest('a.nav__link') : null;
                if (!link) return;
                var isSub = !!link.closest('.list__show');
                var button = link.closest('.list__button');
                var isGroup = button && button.classList.contains('list__button--click');
                if (isSub || !isGroup) closeNav();
            });
        }

        window.addEventListener('resize', function () {
            if (window.innerWidth > 960) closeNav();
        });
    }

    /* ------------------------------------------------------------------
       3. Buscador del menú
       ------------------------------------------------------------------ */
    function initSearch() {
        var input = $('#nav-search');
        var list = $('.nav .list');
        if (!input || !list) return;

        var empty = $('#nav-empty');
        var items = $$('.list > .list__item', list);
        var separators = $$('.list > div', list);
        var footerItem = items[items.length - 1];

        function labelOf(item) {
            var a = $('.list__button .nav__link', item);
            return a ? a.textContent : '';
        }

        function apply() {
            var q = norm(input.value.trim());
            var anyVisible = false;

            items.forEach(function (item) {
                if (item === footerItem) {
                    item.style.display = q ? 'none' : '';
                    return;
                }
                var menu = $('.list__show', item);
                var button = $('.list__button', item);
                var subs = menu ? $$('.list__inside', menu) : [];
                var groupMatch = !q || norm(labelOf(item)).indexOf(q) !== -1;
                var visibleSubs = 0;

                subs.forEach(function (li) {
                    var show = !q || groupMatch || norm(li.textContent).indexOf(q) !== -1;
                    li.style.display = show ? '' : 'none';
                    if (show) visibleSubs++;
                });

                var visible = !q || groupMatch || visibleSubs > 0;
                item.style.display = visible ? '' : 'none';
                if (visible) anyVisible = true;

                if (menu && button) {
                    if (q && visible) {
                        button.classList.add('arrow');
                        menu.style.height = menu.scrollHeight + 'px';
                    } else {
                        button.classList.remove('arrow');
                        menu.style.height = '0px';
                    }
                }
            });

            separators.forEach(function (s) { s.style.display = q ? 'none' : ''; });
            if (empty) empty.classList.toggle('show', !!q && !anyVisible);
        }

        input.addEventListener('input', apply);

        input.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') {
                input.value = '';
                apply();
                input.blur();
            } else if (e.key === 'Enter') {
                var first = null;
                var all = $$('.list__inside a.nav__link, .list__button .nav__link', list);
                for (var i = 0; i < all.length; i++) {
                    var li = all[i].closest('.list__item');
                    var sub = all[i].closest('.list__inside');
                    if (li && li.style.display === 'none') continue;
                    if (sub && sub.style.display === 'none') continue;
                    if (all[i].getAttribute('href') && all[i].getAttribute('href').length > 1) { first = all[i]; break; }
                }
                if (first) {
                    first.click();
                    closeNav();
                }
            }
        });

        document.addEventListener('keydown', function (e) {
            if ((e.ctrlKey || e.metaKey) && (e.key === 'k' || e.key === 'K')) {
                e.preventDefault();
                if (window.innerWidth <= 960) openNav();
                input.focus();
                input.select();
            }
        });
    }

    /* ------------------------------------------------------------------
       4. Scrollspy: resalta la sección visible en el menú
       ------------------------------------------------------------------ */
    function initScrollSpy() {
        var scroller = $('main aside');
        if (!scroller) return;

        var links = $$('.nav a.nav__link[href^="#"]').filter(function (a) {
            return a.getAttribute('href').length > 1;
        });
        var targets = links.map(function (a) {
            return { a: a, el: document.getElementById(a.getAttribute('href').slice(1)) };
        }).filter(function (t) { return t.el; });

        targets.sort(function (x, y) {
            if (x.el === y.el) return 0;
            return (x.el.compareDocumentPosition(y.el) & Node.DOCUMENT_POSITION_FOLLOWING) ? -1 : 1;
        });

        var ticking = false;

        function update() {
            ticking = false;
            var limit = scroller.getBoundingClientRect().top + 110;
            var current = null;
            for (var i = 0; i < targets.length; i++) {
                if (targets[i].el.getBoundingClientRect().top <= limit) current = targets[i];
                else break;
            }

            $$('.nav .is-active').forEach(function (n) { n.classList.remove('is-active'); });
            $$('.nav .is-current').forEach(function (n) { n.classList.remove('is-current'); });
            if (!current) return;

            current.a.classList.add('is-active');
            var item = current.a.closest('.list__item');
            var button = item ? $('.list__button', item) : null;
            if (button) button.classList.add('is-current');
        }

        scroller.addEventListener('scroll', function () {
            if (!ticking) {
                ticking = true;
                window.requestAnimationFrame(update);
            }
        }, { passive: true });

        update();
    }

    /* ------------------------------------------------------------------ */
    function init() {
        try { initTheme(); } catch (e) { console.warn('theme:', e); }
        try { initSeason(); } catch (e) { console.warn('season:', e); }
        try { initDrawer(); } catch (e) { console.warn('drawer:', e); }
        try { initSearch(); } catch (e) { console.warn('search:', e); }
        try { initScrollSpy(); } catch (e) { console.warn('scrollspy:', e); }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
