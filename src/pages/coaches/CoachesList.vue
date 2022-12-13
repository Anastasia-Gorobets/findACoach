<template>
<section>
FILTER
</section>
<section>

  <div class="controls">
    <button>Refresh</button>
    <router-link to="/register">Register</router-link>
  </div>

  <ul v-if="hasCoaches">
    <coach-item :key="coach.id" v-for="coach in filteredCoaches" :id="coach.id" :rate="coach.hourlyRate" :areas="coach.areas" :first-name="coach.firstName" :last-name="coach.lastName"></coach-item>
  </ul>
  <h3 v-else>No coaches found</h3>
</section>
</template>

<script>
import CoachItem from "../../components/coaches/CoachItem";
export default {
  name: "Coaches",
  components:{CoachItem},
  computed:{
    filteredCoaches(){
      return this.$store.getters['coaches/coaches'];
    } ,
    hasCoaches(){
      return this.$store.getters['coaches/hasCoaches'];
    }
  }
}
</script>

<style scoped>

</style>