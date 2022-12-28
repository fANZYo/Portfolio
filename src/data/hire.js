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
					hireMePageCollection{
						items{
							title,
							content
						}
					}
				}
			`
		}),
	});

	const { data } = await response.json();
	const [hireMePage] = data.hireMePageCollection.items.map((page) => ({
		title: page.title,
		content: page.content,
	}));

	return hireMePage;
};
