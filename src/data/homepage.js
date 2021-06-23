const projects = require('./projects');

module.exports = () => {
	return {
		header: {
			title: [
				'Ensuring',
				'Seamless',
				'Experiences',
				'For Everyone',
			],
			blurb: 'Hi, I\'m William — a freelance Web UI engineer.<br/>I help companies and organizations create modern, inclusive, and resilient web user interfaces and design systems with a strong focus on accessibility, performance, and maintainability.',
			img: {
				large: 'assets/self-portrait.jpg',
				small: 'assets/self.jpg?nf_resize=fit&w=720',
				alt: "A portrait picture of William",
			},
		},
		projects: {
			title: 'Selected work',
			items: projects(),
		},
	};
};
