import { createStore } from 'vuex';

import coachModules from './modules/coaches/index';
import requestsModules from './modules/requests/index';

export default createStore({
    modules:{
        'coaches':coachModules,
        'requests':requestsModules,
    },
    state(){
        return {
            userId:'c1',
        }
    },
    getters:{
        userId(state){
            return state.userId;
        }
    }
});