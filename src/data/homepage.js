const projects = require('./projects');

module.exports = () => {
	return {
		header: {
			title: 'Creating for the users',
			subline: 'Accessibility and general user experience are the fundamental principles guiding all our work from start to finish',
			cta: 'let\'s talk!',
		},
		usp: {
			title: 'The how',
		},
		portfolio: {
			title: 'The what',
			projects: projects(),
		},
	};
};
