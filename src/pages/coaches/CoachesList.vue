<template>
<section>
  <coach-filter @change-filter="applyFilter"></coach-filter>
</section>
<section>
<base-card>
    <div class="controls">
      <base-button>Refresh</base-button>
      <base-button v-if="!isCoach"  link to="/register">Register</base-button>
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
import CoachFilter from "../../components/coaches/CoachFilter";
export default {
  name: "Coaches",
  components:{CoachItem,CoachFilter},
  data(){
    return{
      activeFilters:{
        frontend:true,
        backend:true,
        career:true
      }
    }
  },
  computed:{
    filteredCoaches(){
      const coaches = this.$store.getters['coaches/coaches'];

      return coaches.filter(coach => {
        if(this.activeFilters.frontend && coach.areas.includes('frontend')){
          return true;
        }

        if(this.activeFilters.backend && coach.areas.includes('backend')){
          return true;
        }

        if(this.activeFilters.career && coach.areas.includes('career')){
          return true;
        }
      });



    } ,
    hasCoaches(){
      return this.$store.getters['coaches/hasCoaches'];
    },

    isCoach(){
      return this.$store.getters['coaches/isCoach'];
    }
  },

  methods:{
    applyFilter(updatedFilters){

      console.log(updatedFilters);

      this.activeFilters = updatedFilters;

     // this.$store.commit('coaches/filter',updatedFilters)





    }
  }
}
</script>

<style scoped>

</style>