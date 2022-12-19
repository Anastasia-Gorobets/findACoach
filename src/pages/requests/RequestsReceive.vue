<template>
<div>
<section>
  <base-spinner v-if="isLoading"></base-spinner>
  <base-card v-else>
    <ul  v-for="request in requests" :key="request.id">
      <request-item :coach-id="request.coachId" :message="request.message" :userEmail="request.userEmail" :coach-name="coachName(request.coachId)"></request-item>
    </ul>

    <h3 v-if="!hasRequests">There are no requestes</h3>
  </base-card>
</section>
</div>
</template>
<script>
import RequestItem from "./RequestItem";
import BaseSpinner from "../../components/ui/BaseSpinner";
export default {
name: "RequestsReceive",
  data(){
  return{
    error:null,
    isLoading:false
  }
  },
  components:{BaseSpinner, RequestItem},
  computed:{
     requests(){
      return this.$store.getters['requests/requestsForCurrentUser'];
    },

    hasRequests(){
      return this.requests.length > 0;
    },
    coaches(){
      return this.$store.getters['coaches/coaches'];
    },
  },


  created() {
     this.refresh();
  },

  methods:{

    async refresh(){
      this.isLoading = true;

      try{
        await this.$store.dispatch('coaches/loadCoaches');
      }catch (error){
        this.error = error.message || 'Something went wrong';
      }

      try {
        await this.$store.dispatch('requests/loadRequests');
        this.error = null;
        this.isLoading = false;
      }catch (error){
        this.error = error || 'Faild to fetch';
        this.isLoading = false;
      }
    },

    coachName(coachId){
      console.log('this.coaches');
      console.log(this.coaches);

      const coach = this.coaches.find(coach => coach.id === coachId);
      return coach ? coach.firstName + ' ' + coach.lastName : '';
    },

  }
}
</script>

<style scoped>
header {
  text-align: center;
}

ul {
  list-style: none;
  margin: 2rem auto;
  padding: 0;
  max-width: 30rem;
}

h3 {
  text-align: center;
}
</style>