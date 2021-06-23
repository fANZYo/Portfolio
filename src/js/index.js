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

	let darkMode = window.localStorage.getItem('WI_theme') === 'dark'
		|| window.matchMedia('(prefers-color-scheme: dark)').matches;

	const setTheme = () => {
		if (darkMode) {
			document.documentElement.setAttribute('data-theme', 'dark');
			toggler.setAttribute('aria-label', 'Switch to light mode');
			window.localStorage.setItem('WI_theme', 'dark');
		} else {
			document.documentElement.setAttribute('data-theme', 'light');
			toggler.setAttribute('aria-label', 'Switch to dark mode');
			window.localStorage.setItem('WI_theme', 'light');
		}
	}

	toggler.addEventListener('click', () => {
		darkMode = !darkMode;

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
