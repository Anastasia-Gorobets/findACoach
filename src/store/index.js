import { createStore } from 'vuex';

import coachModules from './modules/coaches/index';

export default createStore({
    modules:{
        'coaches':coachModules,
    },
    state(){
        return {
            userId:'c3',
        }
    },
    getters:{
        userId(state){
            return state.userId;
        }
    }
});