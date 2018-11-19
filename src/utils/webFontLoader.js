/**
 * Web Font Loader takes care of Vue Design System’s font loading.
 * For full documentation, see: https://github.com/typekit/webfontloader
 */
import WebFont from 'webfontloader';

WebFont.load({
  google: {
    families: ['Fira+Sans:300,400,400i,600,700'],
  },
  custom: {
    families: ['Museo:300,500,700'],
    urls: ['/assets/fonts/fonts.css', '/fonts/fonts.css'],
  },
});
