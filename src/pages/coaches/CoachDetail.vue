<template>
  <div>
    <section>
      <base-card>
        <h2>{{fullName}}</h2>
        <h3>${{selectedCoach.hourlyRate}}/hour</h3>
      </base-card>
    </section>
    <section>
      <base-card>
        <base-button  link :to="contactLink">Contact</base-button>
        <router-view></router-view>
      </base-card>
    </section>

    <section>
      <base-card>
        <base-badge  v-for="area in selectedCoach.areas" :key="area"  :title="area" :type="area"></base-badge>
        <p>{{selectedCoach.description}}</p>
      </base-card>
    </section>
  </div>
</template>

<script>
export default {
  name: "CoachDetail",
  props:['id'],
  data(){
    return{
      selectedCoach:null
    }
  },
  created(){
    console.log(this.$store.getters['coaches/coaches']);


    this.selectedCoach = this.$store.getters['coaches/coaches'].find(coach => coach.id === this.id);
  },

  computed:{
    fullName(){
      return this.selectedCoach.firstName + ' '+this.selectedCoach.lastName;
    },

    contactLink(){
      return this.$route.path+'/'+this.id+'/contact';
    },
  }

}
</script>

<style scoped>

</style>