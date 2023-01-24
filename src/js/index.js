const lazyIMG = (imgs) => {
	const loadIMG = (entries, observer) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				const img = entry.target;

				observer.unobserve(img);
				img.setAttribute('src', img.dataset.src);
			}
		});
	};

	const observer = new IntersectionObserver(loadIMG, { rootMargin: '100px' });
	imgs.forEach((img) => observer.observe(img));
};

const initHamburgerMenu = () => {
	const menu = document.querySelector('.js-menu');
	const nav = document.querySelector('.js-nav');
	const lastElement = document.querySelector('.js-nav-last');

	let open = false;

	const closeMenu = () => {
		nav.classList.remove('Navigation--open');
		document.querySelector('.js-content').removeAttribute('aria-hidden');
		document.querySelector('.js-footer').removeAttribute('aria-hidden');
		document.querySelector('.js-skipnav').removeAttribute('aria-hidden');
		menu.setAttribute('aria-expanded', false);
		menu.focus();
		document.documentElement.classList.remove('noscroll');

		open = false;
	};

	const openMenu = () => {
		nav.classList.add('Navigation--open');
		document.querySelector('.js-content').setAttribute('aria-hidden', true);
		document.querySelector('.js-footer').setAttribute('aria-hidden', true);
		document.querySelector('.js-skipnav').setAttribute('aria-hidden', true);
		menu.setAttribute('aria-expanded', true);
		document.documentElement.classList.add('noscroll');

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

	const lazyIMGs = document.querySelectorAll('.js-lazy-img');
	lazyIMG(lazyIMGs);
};
