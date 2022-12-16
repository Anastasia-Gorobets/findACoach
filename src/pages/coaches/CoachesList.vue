<template>
<section>
  <coach-filter @change-filter="applyFilter"></coach-filter>
</section>
<section>
<base-card>
    <div class="controls">
      <base-button @click="refresh">Refresh</base-button>
      <base-button v-if="!isCoach && !isLoading"  link to="/register">Register</base-button>
    </div>

    <base-spinner v-if="isLoading"></base-spinner>
    <div v-else>
      <ul v-if="hasCoaches">
        <coach-item :key="coach.id" v-for="coach in filteredCoaches" :id="coach.id" :rate="coach.hourlyRate" :areas="coach.areas" :first-name="coach.firstName" :last-name="coach.lastName"></coach-item>
      </ul>
      <h3 v-else>No coaches found</h3>
    </div>

</base-card>
</section>
</template>

<script>
import CoachItem from "../../components/coaches/CoachItem";
import CoachFilter from "../../components/coaches/CoachFilter";
import BaseSpinner from "../../components/ui/BaseSpinner";
export default {
  name: "Coaches",
  components:{BaseSpinner, CoachItem,CoachFilter},
  data(){
    return{
      activeFilters:{
        frontend:true,
        backend:true,
        career:true
      },

      isLoading:false,
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
      return !this.isLoading && this.$store.getters['coaches/hasCoaches'];
    },

    isCoach(){
      return this.$store.getters['coaches/isCoach'];
    }
  },

  created() {
    this.isLoading = false;
    this.refresh();
  },
  methods:{
    applyFilter(updatedFilters){
      this.activeFilters = updatedFilters;
    },

    async refresh(){
      this.isLoading = true;
      await this.$store.dispatch('coaches/loadCoaches');
      this.isLoading = false;
    },
  }
}
</script>

<style scoped>

</style>