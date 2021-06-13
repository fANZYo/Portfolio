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

window.onload = () => {
	const lazyIMGs = document.querySelectorAll('.js-lazy-img');
	lazyIMG(lazyIMGs);
};
