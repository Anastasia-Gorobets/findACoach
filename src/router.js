import { createRouter,createWebHistory } from 'vue-router';
import {  defineAsyncComponent} from 'vue';


import CoachesList from "./pages/coaches/CoachesList";
//import CoachDetail from "./pages/coaches/CoachDetail";
//import CoachRegistration from "./pages/coaches/CoachRegistration";
//import ContactCoach from "./pages/requests/ContactCoach";
//import RequestsReceive from "./pages/requests/RequestsReceive";
import UserAuth from "./pages/auth/UserAuth";
import NotFound from "./pages/NotFound";

import store from "./store/index";

//these pages may never be visited
const CoachDetail = defineAsyncComponent(()=>import('./pages/coaches/CoachDetail'));
const CoachRegistration = defineAsyncComponent(()=>import('./pages/coaches/CoachRegistration'));
const ContactCoach = defineAsyncComponent(()=>import('./pages/requests/ContactCoach'));
const RequestsReceive = defineAsyncComponent(()=>import('./pages/requests/RequestsReceive'));

const router = createRouter({
    history: createWebHistory(),
    routes:[
        {path:'/', redirect:'/coaches'},
        {path:'/coaches', component:CoachesList},
        {path:'/coaches/:id', component:CoachDetail,
            props:true,
            children:[
                {path:'contact', component:ContactCoach},
            ]},
        {path:'/register', component:CoachRegistration, meta:{
            requiresAuth: true
            }},
        {path:'/requests', component:RequestsReceive, meta:{
                requiresAuth: true
            }},
        {path:'/auth', component:UserAuth, meta:{
                requiresUnauth: true
            }},
        {path:'/:notFound(.*)', component:NotFound},

    ]
});

router.beforeEach(function (to, from, next){
if(to.meta.requiresAuth && !store.getters.isAuth){
    next('/auth');
}else if(to.meta.requiresUnauth && store.getters.isAuth){
    next('/coaches');
}else{
    next();
}
});

export default router;