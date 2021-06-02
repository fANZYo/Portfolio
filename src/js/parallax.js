if (history.scrollRestoration) {
	history.scrollRestoration = 'manual';
}

let state = {
	scrollTop: 0,
};

const setState = (newState) => {
	state = {
		...state,
		...newState,
	};
};

const handleParallax = () => {
	const container = document.querySelector('.js-about-container');
	const img = container.querySelector('.js-about-img');
	const blurb = document.querySelector('.js-about-blurb');

	const cTop = container.getBoundingClientRect().top;
	const tr = (window.innerHeight - cTop) / 2;

	gsap.to(img, { duration: 0, y: 0 - tr });

	const {
		top: bTop,
		width: bWidth,
		height: bHeight,
	} = blurb.getBoundingClientRect();

	const ratio = (window.innerWidth / 2 - bWidth) / (window.innerHeight + bHeight);
	gsap.to(blurb, { duration: 0, x: (window.innerHeight - bTop) * ratio });
};

const handleScroll = (e) => {
	const offset = state.scrollTop + e.deltaY;
	const pageContent = document.querySelector('.js-content')

	if (offset <= 0 || offset >= (pageContent.scrollHeight - window.innerHeight)) {
		return;
	}

	setState({
		scrollTop: state.scrollTop + e.deltaY / 2,
	});

	gsap.to(pageContent, { y: 0 - state.scrollTop, onUpdate: handleParallax });
};

window.addEventListener('wheel', handleScroll, { passive: true });
