<template>
<section>
FILTER
</section>
<section>
<base-card>
    <div class="controls">
      <base-button>Refresh</base-button>
      <base-button  link to="/register">Register</base-button>
    </div>

    <ul v-if="hasCoaches">
      <coach-item :key="coach.id" v-for="coach in filteredCoaches" :id="coach.id" :rate="coach.hourlyRate" :areas="coach.areas" :first-name="coach.firstName" :last-name="coach.lastName"></coach-item>
    </ul>
    <h3 v-else>No coaches found</h3>
</base-card>
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