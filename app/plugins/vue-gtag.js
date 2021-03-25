import Vue from 'vue';
import VueGtag from 'vue-gtag';

export default ({ app }) => {
  if (process.browser) {
    let enableGtag = true;
    const localGDPR = localStorage.getItem('GDPR:accepted');
    if (localGDPR !== null && localGDPR !== 'true') {
      enableGtag = false;
    }

    Vue.use(VueGtag, {
      config: { id: 'UA-31271352-1' },
      appName: 'Devools',
      pageTrackerScreenviewEnabled: true,
      enabled: enableGtag,
      bootstrap: enableGtag,
    }, app.router);
  }
}
