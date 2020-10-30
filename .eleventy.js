const htmlmin = require('html-minifier');
const terser = require('terser');
const sass = require('node-sass');
const cleanCSS = require('clean-css');
const { preBuild, postBuild } = require('./gulpfile');

module.exports = (config) => {
	config.addWatchTarget('./src/js/');
	config.addWatchTarget('./src/scss/');
	config.addWatchTarget('./src/img/');
	config.addPassthroughCopy({ 'src/img': 'img' });
	config.addPassthroughCopy({ 'src/data/assets': 'assets' });

	config.on('beforeBuild', () => {
		 preBuild(); 
	});

	config.on('afterBuild', () => {
		 postBuild(); 
	});

	config.addNunjucksAsyncFilter('sass', async (code, callback) => {
		try {
			const compiled = sass.renderSync({ data: code });

			callback(null, compiled.css);
		} catch (err) {
			console.error('Terser error: ', err);
			callback(null, code);
		}
	});

	config.addNunjucksAsyncFilter('cssmin', async (code, callback) => {
		try {
			const minified = await new cleanCSS({ level: 2 }).minify(code).styles;

			callback(null, minified);
		} catch (err) {
			console.error('Terser error: ', err);
			callback(null, code);
		}
	});

	config.addNunjucksAsyncFilter('jsmin', async (code, callback) => {
		try {
			const minified = await terser.minify(code);
			callback(null, minified.code);
		} catch (err) {
			console.error('Terser error: ', err);
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

	config.setTemplateFormats('njk');

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
