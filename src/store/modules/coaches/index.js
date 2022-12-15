export default {
    namespaced:true,
    state() {
        return{
            coaches:[
               /* {
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
        }
    },

    actions:{

        async loadCoaches(context){

           const response = await fetch('https://vue-http-791fd-default-rtdb.firebaseio.com/coaches/.json');

           const responseData = await response.json();

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


           const response = await fetch('https://vue-http-791fd-default-rtdb.firebaseio.com/coaches/'+userId+'.json', {
                method:'PUT',
                body:JSON.stringify(coachData)
            }).then();

            //const responseData = await response.json();

            if(!response.ok){
                //error...
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
        }

    }
}