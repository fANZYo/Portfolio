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
				mobile: {
					xsmall: {
						url: 'assets/self.jpg?nf_resize=fit&w=300',
						size: '300',
					},
					small: {
						url: 'assets/self.jpg?nf_resize=fit&w=425',
						size: '425',
					},
					medium: {
						url: 'assets/self.jpg?nf_resize=fit&w=638',
						size: '638',
					},
					large: {
						url: 'assets/self.jpg?nf_resize=fit&w=850',
						size: '850',
					},
				},
				tablet: {
					small: {
						url: 'assets/self-portrait.jpg?nf_resize=fit&w=245',
						size: '245',
					},
					medium: {
						url: 'assets/self-portrait.jpg?nf_resize=fit&w=368',
						size: '368',
					},
					large: {
						url: 'assets/self-portrait.jpg?nf_resize=fit&w=490',
						size: '490',
					},
				},
				desktop: {
					small: {
						url: 'assets/self-portrait.jpg?nf_resize=fit&w=310',
						size: '310',
					},
					medium: {
						url: 'assets/self-portrait.jpg?nf_resize=fit&w=465',
						size: '465',
					},
					large: {
						url: 'assets/self-portrait.jpg?nf_resize=fit&w=620',
						size: '620',
					},
				},
				alt: 'A portrait picture of William',
			},
		},
		projects: {
			title: 'Selected work',
			items: projects(),
		},
		testimonials: {
			title: 'What has been said about me',
			items: [
				{
					content: '<p>&#8220;William is a hugely talented front end developer, he is passionate about his craft whether it is about the architecture of the solution or its accessibility compliance.</p><p>He is focused, reliable and hard working.&#8221;</p>',
					author: 'Guillaume Buat-Ménard',
					role: 'CEO of Aqueduct',
				},
				{
					content: '<p>&#8220;I worked with William on the Scope website. He is one of the best front-end developers I have worked with. He has incredible attention to detail and actively sets out to build the best, fully accessible website, with the fastest load time – and he is always seeking further enhancements.</p><p>The quality of William\'s work is second to none. He has a positive can do attitude and is a well-valued team player; I highly recommend William as a front-end developer.&#8221;</p>',
					author: 'Sam Morrison',
					role: 'Senior Sitecore developer',
				},
			],
			cta: {
				label: "Hire Me",
				url: '/hire-me',
			}
		},
	};
};
