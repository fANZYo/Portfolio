const projects = require('./projects');

module.exports = () => {
	return {
		header: {
			title: 'Creating for the users',
			subline: 'Making something your users will love to use, no matter who your users are.',
			ctas: {
				more: 'Read more',
				talk: 'Let\'s talk!',
			},
		},
		usp: {
			title: 'Working with us',
			sections: [
				{
					title: 'Genuine user empathy',
					text: 'With the web being such an integral part of everyday life, there is nothing worse than a painful or even unusable online experience. Your users and their needs are at the center of our attention to guarantee they have the best user experience the web can offer.',
					illustation: 'https://placekitten.com/160/90',
				},
				{
					title: 'Uncompromised quality',
					text: 'Whether it is user experience, reliability, or maintainability, it is all underpinned by quality. We pride ourselves in delivery quality work that exceeds expectations.',
					illustation: 'https://placekitten.com/160/90',
				},
				{
					title: 'Shared interests',
					text: 'What matters to you matters to us, whether it is cattering for a new audience or improving on some metrics, we\'ve got you.',
					illustation: 'https://placekitten.com/160/90',
				},
				{
					more: 'Read more about us',
				},
			],
		},
		portfolio: {
			title: 'The what',
			projects: projects(),
		},
	};
};
