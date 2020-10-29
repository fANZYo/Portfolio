const selectiveJS = () => {
	const modules = [
		{ class: '.js-test', path: '/js/test.js' },
	];

	modules.forEach((module) => {
		const element = document.querySelector(module.class);

		if (element) {
			const scriptTag = document.createElement('script');
			scriptTag.src = module.path;

			document.body.appendChild(scriptTag);
		}
	});
};

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

selectiveJS();

window.onload = () => {
	const lazyIMGs = document.querySelectorAll('.js-lazy-img');
	lazyIMG(lazyIMGs);
};
