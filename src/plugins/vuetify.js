import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import th from 'vuetify/lib/locale/th';

Vue.use(Vuetify);

export default new Vuetify({
    lang: {
      locales: { th },
      current: 'th',
    },
});
