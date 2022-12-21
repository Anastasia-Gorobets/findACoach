export default {
    namespaced:true,
    state() {
        return{
            lastFetch : null,
            coaches:[
             /*   {
                    id: 'c1',
                    firstName: 'Maximilian',
                    lastName: 'Schwarzmüller',
                    areas: ['frontend', 'backend', 'career'],
                    description:
                        "I'm Maximilian and I've worked as a freelance web developer for years. Let me help you become a developer as well!",
                    hourlyRate: 30
                },
                {
                    id: 'c2',
                    firstName: 'Julie',
                    lastName: 'Jones',
                    areas: ['frontend', 'career'],
                    description:
                        'I am Julie and as a senior developer in a big tech company, I can help you get your first job or progress in your current role.',
                    hourlyRate: 30
                }*/
            ]
        }

    },
    mutations:{
        addCoach(state,payload){
            state.coaches.push(payload);
        },

        setCoaches(state,payload){
            state.coaches = payload;
        },

        setFetchTimestamp(state){
            state.lastFetch = new Date().getTime();
        }
    },

    actions:{

        async loadCoaches(context, payload){

            if(!context.getters.shouldUpdate && !payload.fetch){
                return;
            }

           const response = await fetch('https://vue-http-791fd-default-rtdb.firebaseio.com/coaches/.json');

           const responseData = await response.json();

           console.log('response');
           console.log(response);

           if(response.ok){

               const coaches = [];
               for (let key in responseData){
                   const coach = {
                       id: key,
                       firstName:responseData[key].firstName,
                       lastName:responseData[key].lastName,
                       areas: responseData[key].areas,
                       description:responseData[key].description,
                       hourlyRate:responseData[key].hourlyRate
                   };

                   coaches.push(coach);
               }
               context.commit('setCoaches',coaches);
               context.commit('setFetchTimestamp');
           }else{
               const error = new Error(responseData.message || 'Faild to fetch!');
               throw error;

           }

        },

       async addCoach(context,payload){

            const userId = context.rootGetters.userId;
            const coachData = {
                firstName:payload.first,
                lastName:payload.last,
                areas:payload.areas,
                description:payload.description,
                hourlyRate:payload.rate,
            }

           const token = context.rootGetters.token;

            console.log(token);
            console.log(context);

           const response = await fetch('https://vue-http-791fd-default-rtdb.firebaseio.com/coaches/'+userId+'.json?auth='+token, {
                method:'PUT',
                body:JSON.stringify(coachData)
            }).then();

           // const responseData = await response.json();

            if(!response.ok){
                //const error = new Error(responseData.message || 'Faild to fetch!');

            }
            context.commit('addCoach',{
                ...coachData,
                id:userId
            });

        }



    },
    getters:{

        coaches(state){
            return state.coaches;
        },

        hasCoaches(state){
            return state.coaches.length > 0;
        },

        isCoach(_,getters, _2, rootGetters){
            console.log(rootGetters.userId);
            return getters.coaches.some(coach => coach.id === rootGetters.userId);
        },

        shouldUpdate(state){

            const lastFetch = state.lastFetch;
            if(!lastFetch){
                return true;
            }

            const currentTime = new Date().getTime();

            return (currentTime - lastFetch) / 1000 > 60; //more then 1 minute ago

        }

    }
}