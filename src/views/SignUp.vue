<template>
  <div class="container">
    <div class="signup-box">
      <h2>Create an Account</h2>
      <form @submit.prevent="validateSignup">
        <!-- Email Input -->
        <input
          class="input-field"
          type="email"
          placeholder="Email"
          v-model="email"
          required
        />

        <!-- Password Input -->
        <input
          class="input-field"
          type="password"
          placeholder="Password"
          v-model="password"
          required
        />

        <!-- Error Message Display -->
        <p class="error-message" v-if="errorMessage">{{ errorMessage }}</p>

        <!-- Signup Button -->
        <button class="signup-btn" type="submit">Sign Up</button>
      </form>

      <!-- Link to Login Page -->
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
      this.errorMessage = ""; // Clear previous error messages
      const conditions = [];

      // Password Validation Rules
      if (this.password.length < 8 || this.password.length > 14) {
        conditions.push("Password must be 8-14 characters long.");
      }
      if (!/[A-ZÖÄÜÕ]/.test(this.password)) {
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

      // If any condition fails, show error
      if (conditions.length > 0) {
        this.errorMessage = `The password is not valid - ${conditions.join(" ")}`;
        return;
      }

      // Proceed to signup if password is valid
      this.signup();
    },
    async signup() {
      try {
        const response = await fetch("http://localhost:3000/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: this.email, password: this.password }),
        });

        if (!response.ok) {
          const { message } = await response.json();
          throw new Error(message || "Failed to sign up. Please try again.");
        }

        // Redirect to login page after successful signup
        this.$router.push("/login");
      } catch (error) {
        this.errorMessage = error.message;
      }
    },
  },
};
</script>

<style>
/* Style follows signup.css for consistency */
@import "@/assets/signup.css";
</style>
