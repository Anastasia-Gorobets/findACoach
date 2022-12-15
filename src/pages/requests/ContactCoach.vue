<template>
<form @submit.prevent="sendMessage">
  <div class="form-control">
    <label for="email">Your E-mail</label>
    <input v-model.trim="email" type="email" id="email">
  </div>

  <div class="form-control">
    <label for="message">Message</label>
    <textarea rows="5" v-model.trim="message" id="message"></textarea>
  </div>

  <div class="actions">
    <base-button>Send Message</base-button>
  </div>


</form>
</template>

<script>
import BaseButton from "../../components/ui/BaseButton";
export default {
  name: "ContactCoach",
  components: {BaseButton},
  data(){
    return{
      email:'',
      message:'',
      isValid:true
    }
  },

  methods:{

    sendMessage(){
      this.isValid = true;

      if(this.email === '' || this.message === ''){
        this.isValid = false;
        return;
      }else{
        console.log('send');
        console.log(this.$route.params.id);



        this.$store.dispatch('requests/contactCoach',{email:this.email,message:this.message, coachId:this.$route.params.id});

        this.$router.replace('/coaches');
      }
    }

  }

}
</script>

<style scoped>
form {
  margin: 1rem;
  border: 1px solid #ccc;
  border-radius: 12px;
  padding: 1rem;
}

.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: block;
}

input,
textarea {
  display: block;
  width: 100%;
  font: inherit;
  border: 1px solid #ccc;
  padding: 0.15rem;
}

input:focus,
textarea:focus {
  border-color: #3d008d;
  background-color: #faf6ff;
  outline: none;
}

.errors {
  font-weight: bold;
  color: red;
}

.actions {
  text-align: center;
}
</style>