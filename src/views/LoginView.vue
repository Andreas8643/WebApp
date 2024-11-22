<template>
    <div class="container">
      <div class="login-box">
        <h2>Welcome to PostIt</h2>
        <a href="#">Create an account</a>
        <p>or</p>
        <p>Please login</p>
        <form @submit.prevent="login">
          <input class="input-field" type="email" placeholder="Email" v-model="email" required />
          <input class="input-field" type="password" placeholder="Password" v-model="password" required />
          <button class="login-btn" type="submit">Log in</button>
        </form>
        <a href="#">Forget password</a>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "LoginView",
    data() {
      return {
        email: "",
        password: "",
      };
    },
    methods: {
      login() {
        console.log("Logging in with", this.email, this.password);
        this.$router.push("/");
      },
    },
  };
  </script>
  
  <style>
  @import "@/assets/login.css";
  </style>
  