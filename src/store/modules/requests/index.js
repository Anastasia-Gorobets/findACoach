export default {
    namespaced:true,
    state() {
        return{

            requests:[]

        }

    },
    mutations:{
        addRequest(state, payload){
            state.requests.push(payload);
        },

        setRequests(state,payload){
            state.requests = payload;
            console.log(state.requests);
        }
    },

    actions:{

       async contactCoach(context, payload){

           const requestId = Date.now();
            const newRequest = {
                id:requestId,
                coachId:payload.coachId,
                userEmail : payload.email,
                message : payload.message,
            };


            const response = await fetch('https://vue-http-791fd-default-rtdb.firebaseio.com/requests/'+payload.coachId+'.json', {
                method:'POST',
                body:JSON.stringify(newRequest)
            }).then();


            if(!response.ok){
                const responseData = await response.json();
                const error = new Error(responseData.message || 'Faild to add!');
                throw error;

            }else{

                const responseData = await response.json();
                newRequest.id = responseData.name;

                console.log(responseData.name);

                context.commit('addRequest',{
                    ...newRequest,
                });


            }


        },

        async loadRequests(context){

            const response = await fetch('https://vue-http-791fd-default-rtdb.firebaseio.com/requests/.json');

            const responseData = await response.json();

            if(response.ok){

                console.log('responseData');
                console.log(responseData);

                const requests = [];
                for (let key in responseData){
                    for(let key2 in  responseData[key]){
                        const request = {
                            id: responseData[key][key2].id,
                            coachId:responseData[key][key2].coachId,
                            userEmail:responseData[key][key2].userEmail,
                            message: responseData[key][key2].message,
                        };

                        requests.push(request);
                    }

                }

                context.commit('setRequests',requests);
            }else{
                if(!response.ok){
                    const error = new Error(responseData.message || 'Faild to fetch!');
                    throw error;
                }
            }
        },




    },
    getters:{

        requests(state){
            return state.requests;
        },
        requestsForCurrentUser(state, _,_2,rootGetters){
            return state.requests.filter(request => request.coachId === rootGetters.userId);
        }


    }
}