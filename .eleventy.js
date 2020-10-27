const htmlmin = require('html-minifier');
const terser = require('terser');

module.exports = (config) => {
	config.addPassthroughCopy({ 'src/js': 'js' });

	// TODO: Add scss to css

	config.addNunjucksAsyncFilter('jsmin', async (code, callback) => {
		try {
			const minified = await terser.minify(code);
			callback(null, minified.code);
		} catch (err) {
			console.error("Terser error: ", err);
			callback(null, code);
		}
	});

	config.addTransform('htmlmin', (content, outputPath) => {
		if(outputPath.endsWith('.html')) {
			const minified = htmlmin.minify(content, {
				useShortDoctype: true,
				removeComments: true,
				collapseWhitespace: true
			});

			return minified;
		}

		return content;
	});

	config.setTemplateFormats('njk,js,css');

	return {
		dir: {
			input: 'src/pages',
			layouts: '../layouts',
			includes: '../components',
			data: '../data',
			output: 'dist',
		}
	}
};
