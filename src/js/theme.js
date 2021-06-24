(() => {
	const themes = {
		light: {
			'background': 'hsl(0, 0%, 99%)',
			'background-offset': 'hsl(180, 11%, 93%)',
			'background-contrast': 'hsl(231, 15%, 18%)',
			'color': 'hsl(0, 0%, 9%)',
			'off-color': 'hsl(0, 0%, 34%)',
			'highlight': 'hsl(234, 61%, 50%)',
			'link-color': 'hsl(234, 61%, 50%)',
		},
		dark: {
			'background': 'hsl(0, 0%, 9%)',
			'background-offset': 'hsl(231, 15%, 18%)',
			'background-contrast': 'hsl(180, 11%, 93%)',
			'color': 'hsl(0, 0%, 99%)',
			'off-color': 'hsl(0, 0%, 64%)',
			'highlight': 'hsl(185, 100%, 50%)',
			'link-color': 'hsl(185, 100%, 50%)',
		}
	};

	const preferedTheme = window.localStorage.getItem('WI_theme')
		|| (window.matchMedia('(prefers-color-scheme: dark)') ? 'dark' : 'light');

	window.__setTheme = (theme, cb) => {
		Object.keys(themes[theme]).forEach((key) => {
			document.documentElement.style.setProperty('--' + key, themes[theme][key]);
		});

		document.documentElement.setAttribute('data-theme', theme);

		cb && cb();
	};

	window.__setTheme(preferedTheme);
})();
