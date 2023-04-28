module.exports = (config) => {
  config.addNunjucksShortcode('GTAG', () => {
    if (process.env.GA_ENABLED) {
      return `
        <!-- Global site tag (gtag.js) - Google Analytics -->
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-K9NHEFPWPW"></script>
        <script>
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-K9NHEFPWPW');
        </script>
      `;
    }

    return '';
  });
};
