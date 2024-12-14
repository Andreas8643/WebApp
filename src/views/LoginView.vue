<template>
  <div class="container">
    <div class="login-box">
      <h2>Welcome to PostIt</h2>
      <form @submit.prevent="login">
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
        <button class="login-btn" type="submit">Log In</button>
      </form>
      <p>Don't have an account?</p>
      <router-link to="/signup">
        <button class="signup-btn">Sign Up</button>
      </router-link>
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
      errorMessage: "",
    };
  },
  methods: {
    async login() {
      this.errorMessage = "";

      try {
        const response = await fetch("http://localhost:3000/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: this.email, password: this.password }),
        });

        if (!response.ok) {
          throw new Error("Invalid email or password");
        }

        const { token } = await response.json();
        localStorage.setItem("userToken", token); // Save JWT for authentication
        this.$router.push("/"); // Redirect to home after login
      } catch (error) {
        this.errorMessage = error.message;
      }
    },
  },
};
</script>
  
  <style>
  @import "@/assets/login.css";
  </style>
  
