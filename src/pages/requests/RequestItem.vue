<template>
  <li>
    <p>
      <base-button mode="flat" link :to="detailLink">{{coachName}}</base-button>
    </p>
    <p>{{userEmail}}</p>
    <p>{{message}}</p>
  </li>
</template>

<script>
import BaseButton from "../../components/ui/BaseButton";
export default {
  name: "RequestItem",
  components: {BaseButton},
  props:['coachName','userEmail','message', 'coachId'],
  computed:{
    detailLink(){
      return '/coaches/'+this.coachId;
    }
  }
}
</script>

<style scoped>
li {
  margin: 1rem 0;
  border: 1px solid #ccc;
  padding: 1rem;
}

a {
  color: #3d008d;
  text-decoration: none;
  font-weight: bold;
}

a:hover,
a:active {
  color: #8d007a;
}

p {
  margin: 0.5rem 0 0 0;
}
</style>