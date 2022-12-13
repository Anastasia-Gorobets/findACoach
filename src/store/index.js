import { createStore } from 'vuex';

import coachModules from './modules/coaches/index';

export default createStore({
    modules:{
        'coaches':coachModules
    }
});