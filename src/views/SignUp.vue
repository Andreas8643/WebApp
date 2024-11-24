<template>
    <div class="container">
      <div class="signup-box">
        <h2>Create an Account</h2>
        <form @submit.prevent="validateSignup">
          <input
            class="input-field"
            type="email"
            placeholder="Email"
            v-model="email"
            required
          />
          <input
            class="input-field"
            type="password"
            placeholder="Password"
            v-model="password"
            required
          />
          <p class="error-message" v-if="errorMessage">{{ errorMessage }}</p>
          <button class="signup-btn" type="submit">Sign Up</button>
        </form>
        <router-link to="/login">Already have an account? Log in</router-link>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "SignUp",
    data() {
      return {
        email: "",
        password: "",
        errorMessage: "",
      };
    },
    methods: {
      validateSignup() {
        console.log("Sign up submitted")
        this.errorMessage = "";
        const conditions = [];
  
        if (this.password.length < 8 || this.password.length >= 15) {
          conditions.push("Password must be 8-14 characters long.");
        }
        
        if (!/[A-Z]/.test(this.password)) {
          conditions.push("Password must include at least one uppercase character.");
        }
        
        if (!/[a-z].*[a-z]/.test(this.password)) {
          conditions.push("Password must include at least two lowercase characters.");
        }
        if (!/[0-9]/.test(this.password)) {
          conditions.push("Password must include at least one numeric value.");
        }
        if (!/^([A-Z])/.test(this.password)) {
          conditions.push("Password must start with an uppercase character.");
        }
        if (!/_/.test(this.password)) {
          conditions.push("Password must include the character '_'.");
        }
        if (conditions.length > 0) {
          this.errorMessage = `The password is not valid - ${conditions.join(" ")}`;
        } else {
          console.log("Signing up with", this.email, this.password);
          this.$router.push("/"); 
        }
      },
    },
  };
  </script>
    <style>
    @import "@/assets/signup.css";
    </style>
    