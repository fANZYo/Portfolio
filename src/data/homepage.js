const projects = require('./projects');

module.exports = () => {
	return {
		header: {
			title: 'Ensuring Seamless Experiences',
			titleHL: 'For Everyone',
			blurb: 'Hi, I\'m William — a freelance Web UI engineer.<br/>I help companies and organizations create modern, inclusive, and resilient web user interfaces and design systems with a strong focus on accessibility, performance, and maintainability.',
		},
		projects: {
			title: 'Selected work',
			items: projects(),
		},
		subscribe: {
			title: 'Subscribe',
			label: 'Get <em>Accessibility</em> and <em>Performance</em> tips',
			placeholder: 'Email',
		},
	};
};
