const projects = require('./projects');

module.exports = () => {
	return {
		header: {
			title: 'Creating for the users', // The WHY
			subline: 'Making something your users will love to use, no matter who your users are.',
			ctas: {
				more: 'Read more',
				talk: 'Let\'s talk!',
			},
		},
		blurb: {
			title: 'The how', // The HOW

		},
		portfolio: {
			title: 'Check our work', // The WHAT
			projects: projects(),
		},
	};
};
