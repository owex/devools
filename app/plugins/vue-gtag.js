import Vue from 'vue';
import VueGtag from 'vue-gtag';

const getGDPR = localStorage.getItem('GDPR:accepted');

Vue.use(VueGtag, {
  config: { id: 'UA-31271352-1' },
  bootstrap: getGDPR === 'true',
  appName: 'Devools',
  enabled: getGDPR === 'true',
});
