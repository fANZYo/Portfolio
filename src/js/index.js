const lazyIMG = (imgs) => {
	const loadIMG = (entries, observer) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				observer.unobserve(entry.target);
				entry.target.setAttribute('srcset', entry.target.dataset.srcset);
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
	const contrast = document.querySelector('.js-contrast');

	let open = false;

	menu.addEventListener('click', () => {
		open = !open;

		if (open) {
			nav.classList.add('Navigation--open');
			nav.setAttribute('aria-expanded', true);
			contrast.focus();
		} else {
			nav.classList.remove('Navigation--open');
			nav.setAttribute('aria-expanded', false);
			menu.focus();
		}
	});
};

window.onload = () => {
	initHamburgerMenu();
	initThemeToggle();

	const lazyIMGs = document.querySelectorAll('.js-lazy-img');
	lazyIMG(lazyIMGs);
};
