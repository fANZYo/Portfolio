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
