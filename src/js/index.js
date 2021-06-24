const lazyIMG = (imgs) => {
	const loadIMG = (entries, observer) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				observer.unobserve(entry.target);
				entry.target.closest('picture')
					.querySelectorAll('source')
					.forEach((source) => {
						source.setAttribute('srcset', source.dataset.srcset);
					});
			}
		});
	};

	const observer = new IntersectionObserver(loadIMG);
	imgs.forEach((img) => observer.observe(img));
};

const initThemeToggle = () => {
	const toggler = document.querySelector('.js-contrast');

	const themes = {
		light: {
			label: 'Switch to dark mode',
			next: 'dark',
		},
		dark: {
			label: 'Switch to light mode',
			next: 'light',
		},
	};
	toggler.setAttribute('aria-label', themes[document.documentElement.dataset.theme].label);

	const setTheme = () => {
		const { theme } = document.documentElement.dataset;

		window.__setTheme(themes[theme].next, () => {
			window.localStorage.setItem('WI_theme', themes[theme].next);
			toggler.setAttribute('aria-label', themes[theme].label);
		});
	}

	toggler.addEventListener('click', () => {
		setTheme();
	});
};

const initHamburgerMenu = () => {
	const menu = document.querySelector('.js-menu');
	const nav = document.querySelector('.js-nav');
	const lastElement = document.querySelector('.js-nav-last');

	let open = false;

	const closeMenu = () => {
		nav.classList.remove('Navigation--open');
		menu.setAttribute('aria-expanded', false);
		menu.focus();
		document.body.classList.remove('noscroll');

		open = false;
	};

	const openMenu = () => {
		nav.classList.add('Navigation--open');
		menu.setAttribute('aria-expanded', true);
		document.body.classList.add('noscroll');

		open = true;
	};

	nav.addEventListener('keydown', (e) => {
		if (open && e.key === 'Escape') {
			closeMenu();
		} else if (open && e.key === 'Tab' && !e.shiftKey && document.activeElement === lastElement) {
			e.preventDefault();
			menu.focus();
		}
	});

	menu.addEventListener('keydown', (e) => {
		if (e.key === 'Escape') {
			closeMenu();
		} else if (open && e.key === 'Tab' && e.shiftKey && document.activeElement === menu) {
			e.preventDefault();
			lastElement.focus();
		}
	});

	menu.addEventListener('click', () => {
		if (!open) {
			openMenu();
		} else {
			closeMenu();
		}
	});
};

window.onload = () => {
	initHamburgerMenu();
	initThemeToggle();

	const lazyIMGs = document.querySelectorAll('.js-lazy-img');
	lazyIMG(lazyIMGs);
};
