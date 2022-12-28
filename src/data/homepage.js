const fetch = require('node-fetch');
const projects = require('./projects');

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
					homePageCollection(limit: 1){
						items{
							hero{
								headline,
								blurb,
								portrait,
								portraitMobile,
							},
							projects{
								title,
								projectsCollection(limit: 3){
									items{
										title,
										blurb,
										url,
										image,
									}
								}
							},
							testimonials{
								title,
								testimonialsCollection(limit: 2){
									items {
										content,
										author,
										role,
									}
								},
								cta {
									label,
									url,
								},
							}
						}
					}
				}
			`
		}),
	});

	const { data } = await response.json();
	const [homepage] = data.homePageCollection.items.map((homepage) => ({
		header: {
			title: homepage.hero.headline,
			blurb: homepage.hero.blurb,
			img: {
				mobile: {
					xsmall: {
						url: `${homepage.hero.portraitMobile}?nf_resize=fit&w=300`,
						size: '300',
					},
					small: {
						url: `${homepage.hero.portraitMobile}?nf_resize=fit&w=425`,
						size: '425',
					},
					medium: {
						url: `${homepage.hero.portraitMobile}?nf_resize=fit&w=638`,
						size: '638',
					},
					large: {
						url: `${homepage.hero.portraitMobile}?nf_resize=fit&w=850`,
						size: '850',
					},
				},
				tablet: {
					small: {
						url: `${homepage.hero.portrait}?nf_resize=fit&w=245`,
						size: '245',
					},
					medium: {
						url: `${homepage.hero.portrait}?nf_resize=fit&w=368`,
						size: '368',
					},
					large: {
						url: `${homepage.hero.portrait}?nf_resize=fit&w=490`,
						size: '490',
					},
				},
				desktop: {
					small: {
						url: `${homepage.hero.portrait}?nf_resize=fit&w=310`,
						size: '310',
					},
					medium: {
						url: `${homepage.hero.portrait}?nf_resize=fit&w=465`,
						size: '465',
					},
					large: {
						url: `${homepage.hero.portrait}?nf_resize=fit&w=620`,
						size: '620',
					},
				},
			},
			alt: 'A portrait picture of William',
		},
		projects: {
			title: homepage.projects.title,
			items: homepage.projects.projectsCollection.items.map((project) => ({
				title: project.title,
				blurb: project.blurb,
				url: project.url,
				img: project.image,
			})),
		},
		testimonials: {
			title: homepage.testimonials.title,
			items: homepage.testimonials.testimonialsCollection.items,
			cta: homepage.testimonials.cta,
		},
	}));

	return homepage;
};
