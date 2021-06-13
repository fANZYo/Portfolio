const { src, dest, parallel, series } = require('gulp');
const sass = require('gulp-sass');
const cleanCSS = require('gulp-clean-css');
const critical = require('critical').stream;
const babel = require('gulp-babel');
const terser = require('gulp-terser');

const css = () => {
	return src('src/scss/styles.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(cleanCSS({ level: 2 }))
		.pipe(dest('dist/css'))
};

const criticalCSS = () => {
	return src('dist/**/*.html')
		.pipe(
			critical({
				base: 'dist/**/',
				inline: true,
				width: 1300,
				height: 900,
				ignore: {
					atrule: ['@font-face'],
				},
			})
		)
		.on('error', err => {
			console.error(err.message);
		})
		.pipe(dest('dist'));
};

const js = () => {
	return src('src/js/*.js')
		.pipe(babel({
			presets: ['@babel/env']
		}))
		.pipe(terser())
		.pipe(dest('dist/js'))
};

exports.preBuild = parallel(js, css);
exports.postBuild = series(criticalCSS);
