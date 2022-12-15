<template>

<section>

  <base-card>
    <ul  v-for="request in requests" :key="request.id">
      <request-item :coach-id="request.coachId" :message="request.message" :userEmail="request.userEmail" :coach-name="coachName(request.coachId)"></request-item>
    </ul>

    <h3 v-if="!hasRequsts">There are no requestes</h3>
  </base-card>
</section>

</template>

<script>
import RequestItem from "./RequestItem";
export default {
name: "RequestsReceive",
  components:{RequestItem},
  computed:{
    requests(){
      return this.$store.getters['requests/requests'];
    },

    hasRequsts(){
      return this.$store.getters['requests/requests'].length > 0 ? true :false;
    },
    coaches(){
      return this.$store.getters['coaches/coaches'];
    },

  },

  methods:{

    coachName(coachId){
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