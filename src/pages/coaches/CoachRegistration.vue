<template>
  <section>
    <base-card>
      <h2>Coach Registration</h2>
     <coach-form @save-coach="saveCoach"></coach-form>
    </base-card>
  </section>



</template>

<script>
import CoachForm from "./CoachForm";
export default {
  components:{CoachForm},
  name: "CoachRegistration",
  methods:{
    saveCoach(formData){
      console.log(formData);

      this.$store.dispatch('coaches/addCoach',formData);
      this.$router.replace('/coaches');


    }
  }
}
</script>

<style scoped>

</style>