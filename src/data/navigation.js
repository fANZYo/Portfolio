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
					navigationBlockCollection(limit:1){
						items{
							linksCollection{
								items{
									url,
									label,
								}
							}
						}
					}
				}
			`
		}),
	});

	const { data } = await response.json();
	const navigationItems = data.navigationBlockCollection.items[0].linksCollection.items.map((link) => ({
		label: link.label,
		url: link.url,
	}));

	return {
		items: navigationItems,
	};
};
