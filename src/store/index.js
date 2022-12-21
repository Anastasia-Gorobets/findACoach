import { createStore } from 'vuex';

import coachModules from './modules/coaches/index';
import requestsModules from './modules/requests/index';
import authModules from './modules/auth/index';

export default createStore({
    modules:{
        'coaches':coachModules,
        'requests':requestsModules,
        'auth':authModules,

    },
    state(){
        return {

        }
    },

});