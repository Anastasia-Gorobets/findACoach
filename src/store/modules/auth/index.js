let timer;
export default {
    store() {
        return {
            userId:null,
            token:null,
            tokenExpiration:null,
            didAutoLogout:false,
        }
    },

    mutations:{

        setUser(state, payload){
            state.token = payload.token;
            state.userId = payload.userId;
            state.tokenExpiration = payload.tokenExpiration;

            state.didAutoLogout = false;
        },

        didAutoLogout(state){
            console.log('didAutoLogout set...');
            state.didAutoLogout = true;
        }

    },

    actions:{

        async login(context, payload){
          return context.dispatch('auth',{
                ...payload,
                mode:'login'
            });

        },

        async signup(context, payload){

            return  context.dispatch('auth',{
                ...payload,
                mode:'signup'
            });
        },

        logout(context){
            localStorage.removeItem('token');
            localStorage.removeItem('userId');
            localStorage.removeItem('expirationDate');

            clearTimeout(timer);

            context.commit('setUser', {token:null,userId:null,tokenExpiration:null});
        },

       async auth(context, payload){
            const mode = payload.mode;
            let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBxNdmD8vYcmKfkdZ6eMBFo3V1KG9_B9Ys';

            if(mode ==='signup'){
                url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBxNdmD8vYcmKfkdZ6eMBFo3V1KG9_B9Ys';
            }

            const response = await fetch(url, {
                method:'POST',
                body:JSON.stringify({
                    email:payload.email,
                    password:payload.password,
                    returnSecureToken:true
                })
            });

            const responseData = await response.json();

            if(response.ok){
                console.log(responseData);
            }else{
                const error = new Error(responseData.message);
                throw  error;
            }

            const expiresIn = +responseData.expiresIn * 1000;
            const expirationDate = new Date().getTime() + expiresIn;

           timer = setTimeout(function (){
               context.dispatch('autoLogout');
           },expirationDate);


            localStorage.setItem('token',responseData.idToken);
            localStorage.setItem('userId',responseData.localId);
            localStorage.setItem('expirationDate',expirationDate);

            context.dispatch('tryLogin');


        },

        tryLogin(context){

           const token =  localStorage.getItem('token');
           const userId =  localStorage.getItem('userId');
           const expirationDate =  localStorage.getItem('expirationDate');

           const expiresIn = +expirationDate - new Date().getTime();

           if(expiresIn < 0){
               return;
           }

           timer = setTimeout(function (){
               context.dispatch('autoLogout');
           },expiresIn);

           if(token && userId){
               context.commit('setUser',{
                   token:token,
                   userId:userId,
                   tokenExpiration:null
               })
           }


        },

        autoLogout(context){
            context.dispatch('logout');
            context.commit('didAutoLogout');
        }
    },

    getters:{

        didAutoLogout(state){
          return state.didAutoLogout;
        },
        userId(state){
            return state.userId;
        },

        token(state){
            return state.token;
        },

        isAuth(state){
            return !!state.token;
        }

    }
}