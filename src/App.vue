<template>
  <the-header></the-header>
  <router-view v-slot="slotProps">
    <transition name="route" mode="out-in">
      <component :is="slotProps.Component"></component>
    </transition>
  </router-view>
</template>

<script>
import TheHeader from "./components/TheHeader";
export default {
  name: "App",
  components: {TheHeader},
  computed:{
    didAutoLogout(){
      return this.$store.getters.didAutoLogout;
    }
  },
  created() {
    this.$store.dispatch('tryLogin');
  },
  watch:{
    didAutoLogout(currValue, oldValue){
      console.log('didAutoLogout');
      console.log(currValue);
      console.log(oldValue);
      console.log(currValue !== oldValue);

      if(currValue && currValue !== oldValue){
        this.$router.replace('/coaches');
      }
    }
  }
}
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap");

* {
  box-sizing: border-box;
}

html {
  font-family: "Roboto", sans-serif;
}

body {
  margin: 0;
}


.route-enter-from,.route-leave-to{
  opacity: 0;
  transform: scale(0.8);
}

.route-enter-active{
  transition: all 0.3s ease-out;
}
.route-leave-active{
  transition: all 0.3s ease-in;
}


.route-enter-to,.route-leave-from{
  opacity: 1;
  transform: scale(1);
}



ul{
  list-style: none;
  padding-left: 0;
}


</style>