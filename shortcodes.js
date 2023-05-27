module.exports = (config) => {
  config.addNunjucksShortcode('GTAG', () => {
    if (process.env.GA_ENABLED) {
      return `
        <!-- Google tag (gtag.js) -->
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-HBKYQBZNK7"></script>
        <script>
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-HBKYQBZNK7');
        </script>
      `;
    }

    return '';
  });
};
