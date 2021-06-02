let state = {
	initialized: false,
	pointer: null,
	halo: null,
	haloInner: null,
	timer: null,
};

const setState = (newState) => {
	state = {
		...state,
		...newState,
	};
};

const throttle = (cb, time) => {
	let enabled = true;

	return (...args) => {
		if (!enabled) {
			return;
		}

		enabled = false;
		cb(...args);
		setTimeout(() => enabled = true, time);
	};
};

const initPointer = () => {
	const pointer = document.querySelector('.js-cursor-pointer');

	pointer.style.setProperty('opacity', 1);

	return pointer;
};

const initHalo = () => {
	const halo = document.querySelector('.js-cursor-halo');
	const haloInner = document.querySelector('.js-cursor-halo-inner');

	const circle = document.querySelector('circle').getBoundingClientRect();

	halo.style.setProperty('width', `${circle.width}px`);
	halo.style.setProperty('height', `${circle.height}px`);
	halo.style.setProperty('opacity', 0.5);

	haloInner.style.setProperty('transition', null);

	return { halo, haloInner };
};

const initCursor = () => {
	const pointer = initPointer();
	const { halo, haloInner } = initHalo();

	setState({
		initialized: true,
		pointer,
		halo,
		haloInner,
	});
};

const mouseMoveHandler = (e) => {
	if (!state.initialized) {
		initCursor();
	} else {
		initHalo();
	}

	clearTimeout(state.timer);

	const { pointer, halo, haloInner } = state;

	const {
		width: pointerWidth,
		height: pointerHeight,
		left: pointerLeft,
		top: pointerTop,
	} = pointer.getBoundingClientRect();
	const {
		width: haloWidth,
		height: haloHeight,
		left: haloLeft,
		top: haloTop,
	} = halo.getBoundingClientRect();

	const pointerPos = {
		x: e.clientX - pointerWidth / 2,
		y: e.clientY - pointerHeight / 2 + window.scrollY,
	};

	const haloPos = {
		x: e.clientX - haloWidth / 2,
		y: e.clientY - haloHeight / 2 + window.scrollY,
	};

	gsap.to(pointer, { duration: 0, x: pointerPos.x, y: pointerPos.y });
	gsap.to(halo, { x: haloPos.x, y: haloPos.y });
	gsap.to(haloInner, { duration: 0.1, scale: 1 });

	const circles = document.querySelectorAll('.js-halo');

	circles.forEach((circle) => {
		const { top, left } = circle.closest('svg').getBoundingClientRect();
		const ratio = 100 / circle.getBoundingClientRect().width;

		gsap.to(circle, { cx: (e.clientX - left) * ratio, cy: (e.clientY - top) * ratio, opacity: 1 });
	});

	const timer = setTimeout(() => {
		gsap.to(haloInner, { duration: 2/3, scale: 0.1 });
	}, 100);

	setState({ timer });

	// const diffTop = Math.abs(pointerTop - haloTop);
	// const diffLeft = Math.abs(pointerLeft - haloLeft);
	// const hypotenuse = Math.sqrt(Math.pow(diffTop, 2) + Math.pow(diffLeft, 2));
  //
	// const cursorSkew = {
	// 	x: 1 - diffTop / window.innerHeight,
	// 	y: 1 - diffLeft / window.innerWidth,
	// 	sX: 90 - 2 * (180 - 90 - Math.asin(diffTop / hypotenuse) * (180 / Math.PI)),
	// 	sY: (Math.asin(diffTop / hypotenuse) * (180 / Math.PI)),
	// };
  //
	// cursor.style.setProperty('transform', `scale(${cursorSkew.x}, ${cursorSkew.y}) skew(${cursorSkew.sX}deg, -${cursorSkew.sX}deg)`);
};

document.addEventListener('mousemove', mouseMoveHandler);
window.addEventListener('resize', initCursor);
