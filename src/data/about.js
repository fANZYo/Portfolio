const fetch = require('node-fetch');

module.exports = async () => {
	const response = await fetch(`https://graphql.contentful.com/content/v1/spaces/${process.env.SPACE_ID}/environments/master`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${process.env.CDA_ACCESS_TOKEN}`,
		},
		body: JSON.stringify({
			query: `
				query {
					aboutPageCollection{
						items{
							title,
							content,
							imageLandscape,
							imagePortrait,
							imageAlt,
						}
					}
				}
			`
		}),
	});

	const { data } = await response.json();
	const [aboutPage] = data.aboutPageCollection.items.map((page) => ({
		title: page.title,
		content: page.content,
		img: {
				mobile: {
					xsmall: {
						url: `${page.imageLandscape}?nf_resize=fit&w=300`,
						size: '300',
					},
					small: {
						url: `${page.imageLandscape}?nf_resize=fit&w=450`,
						size: '450',
					},
					medium: {
						url: `${page.imageLandscape}?nf_resize=fit&w=600`,
						size: '600',
					},
					large: {
						url: `${page.imageLandscape}?nf_resize=fit&w=1000`,
						size: '1000',
					},
				},
				tablet: {
					small: {
						url: `${page.imageLandscape}?nf_resize=fit&w=500`,
						size: '500',
					},
					medium: {
						url: `${page.imageLandscape}?nf_resize=fit&w=750`,
						size: '750',
					},
					large: {
						url: `${page.imageLandscape}?nf_resize=fit&w=1000`,
						size: '1000',
					},
				},
				desktop: {
					small: {
						url: `${page.imagePortrait}?nf_resize=fit&w=500`,
						size: '500',
					},
					medium: {
						url: `${page.imagePortrait}?nf_resize=fit&w=750`,
						size: '750',
					},
					large: {
						url: `${page.imagePortrait}?nf_resize=fit&w=1000`,
						size: '1000',
					},
				},
			alt: page.imageAlt,
		},
	}));

	return aboutPage;
};
