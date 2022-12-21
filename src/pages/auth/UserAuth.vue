<template>
  <base-card>
    <base-spinner v-if="isLoading && formIsValid"></base-spinner>
    <base-dialog :show="!!error" @close="close">
      <p>{{error}}</p>
    </base-dialog>
    <form @submit.prevent="submitForm">
      <div class="form-control">
        <label for="email">Email</label>
        <input type="text" id="email" v-model.trim="email">
      </div>

      <div class="form-control">
        <label for="password">Password</label>
        <input type="password" id="password" v-model.trim="password">
      </div>
      <div class="form-control">
        <base-button>{{submitButtonCaption}}</base-button>
        <base-button @click="switchAuthMode" type="button" mode="flat">{{switchModeButtonCaption}}</base-button>
      </div>
    </form>
    <p v-if="!formIsValid">Password must have at least 6 symbols, email must be in email format</p>
  </base-card>
</template>

<script>
import BaseButton from "../../components/ui/BaseButton";
import BaseCard from "../../components/ui/BaseCard";
import BaseDialog from "../../components/ui/BaseDialog";
export default {
  name: "UserAuth",
  components: {BaseDialog, BaseCard, BaseButton},
  data(){
    return{
      email:'',
      password:'',
      formIsValid:true,
      mode:'login',
      isLoading:false,
      error:null
    }

  },

  computed:{
    submitButtonCaption(){
      if(this.mode === 'login'){
        return 'Login';
      }else{
        return 'Sign up';
      }
    } ,
    switchModeButtonCaption(){
      if(this.mode === 'login'){
        return 'Sign up instead';
      }else{
        return 'Login instead';
      }
    }
  },
  methods:{
    close(){
      this.isLoading = false;
      this.error = null;
    },
   async submitForm(){
     this.isLoading = true;
     this.formIsValid = true;
      console.log(!this.email.includes('@'));
      if(this.email === '' || !this.email.includes('@') || this.password.length < 6){
        this.formIsValid = false;
        return;
      }



       try{
         if(this.mode === 'login'){
           await this.$store.dispatch('login', {email: this.email, password: this.password});
           const redirectUrl = '/'+ (this.$route.query.redirect || 'coaches');

           this.$router.replace(redirectUrl);
         }else {
           await this.$store.dispatch('signup', {email: this.email, password: this.password});
         }
         this.error = null;
       }catch (error){
         this.error = error;
       }

        this.isLoading = false;



    },

    switchAuthMode(){

      if(this.mode === 'login'){
        this.mode = 'signup'
      }else{
        this.mode = 'login'
      }
    }
  }
}
</script>

<style scoped>
form {
  margin: 1rem;
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