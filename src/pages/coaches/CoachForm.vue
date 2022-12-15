<template>
  <form @submit.prevent="submitForm">
    <div :class="{invalid:!firstName.isValid}" class="form-control">
      <label  for="firstName">First name</label>
      <input v-model.trim="firstName.val" type="text" id="firstName" @blur="clearValidate('firstName')">
    </div>

    <div :class="{invalid:!lastName.isValid}"  class="form-control">
      <label for="lastName">Last name</label>
      <input v-model.trim="lastName.val" type="text" id="lastName" @blur="clearValidate('lastName')">
    </div>

    <div  :class="{invalid:!description.isValid}"  class="form-control">
      <label for="description">Description</label>
      <textarea v-model.trim="description.val"  id="description" rows="3" @blur="clearValidate('description')"></textarea>
    </div>

    <div :class="{invalid:!rate.isValid}" class="form-control">
      <label for="rate">Hourly rate</label>
      <input   v-model.number="rate.val" type="number" id="rate" @blur="clearValidate('rate')">
    </div>

    <div class="form-control" :class="{invalid:!areas.isValid}">

      <h3>Areas</h3>
      <div>
        <input v-model="areas.val" type="checkbox" id="frontend" name="area" value="frontend" @blur="clearValidate('areas')" >
        <label for="frontend">Frontend</label>
      </div>

      <div>
      <input v-model="areas.val" type="checkbox" id="backend" name="area" value="backend"  @blur="clearValidate('areas')">
      <label for="backend">Backend</label>
      </div>

      <div>
      <input v-model="areas.val" type="checkbox" id="caree" name="area" value="caree"  @blur="clearValidate('areas')">
      <label for="caree">Caree</label>
      </div>


    </div>

    <div class="form-control">
      <button type="submit">Save</button>
    </div>


  </form>
</template>

<script>
export default {
  emits:['save-coach'],
  name: "CoachForm",
  data(){
    return {
      firstName:{
        val:'',
        isValid:true
      },
      lastName:{
        val:'',
        isValid:true
      },
      description:{
        val:'',
        isValid:true
      },
      rate:{
        val:null,
        isValid:true
      },
      areas:{
        val:[],
        isValid:true
      },
      formIsValid : true,
    }
  },

  methods:{

    clearValidate(input){
      console.log('clearValidate');
      console.log(input);
      this[input].isValid = true;
    },

    validate(){

      this.formIsValid = true;
      if(this.firstName.val === ''){
        this.formIsValid = false;
        this.firstName.isValid = false;
      }
      if(this.lastName.val === ''){
        this.formIsValid = false;
        this.lastName.isValid = false;
      }

      if(this.description.val === ''){
        this.formIsValid = false;
        this.description.isValid = false;
      }
      if(this.rate.val <= 0){
        this.formIsValid = false;
        this.rate.isValid = false;
      }

      if(this.areas.val.length === 0){
        this.formIsValid = false;
        this.areas.isValid = false;
      }

    },
    submitForm(){

      this.validate();

      if (this.formIsValid){

        const  formData={
          first:this.firstName.val,
          last:this.lastName.val,
          description:this.description.val,
          rate:this.rate.val,
          areas:this.areas.val,
        };


        this.$emit('save-coach',formData);

      }




    }
  }
}
</script>

<style scoped>
.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
}

input[type='checkbox'] + label {
  font-weight: normal;
  display: inline;
  margin: 0 0 0 0.5rem;
}

input,
textarea {
  display: block;
  width: 100%;
  border: 1px solid #ccc;
  font: inherit;
}

input:focus,
textarea:focus {
  background-color: #f0e6fd;
  outline: none;
  border-color: #3d008d;
}

input[type='checkbox'] {
  display: inline;
  width: auto;
  border: none;
}

input[type='checkbox']:focus {
  outline: #3d008d solid 1px;
}

h3 {
  margin: 0.5rem 0;
  font-size: 1rem;
}

.invalid label {
  color: red;
}

.invalid input,
.invalid textarea {
  border: 1px solid red;
}
</style>