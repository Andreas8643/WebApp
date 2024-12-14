<template>
  <header class="top-bar">
    <h1><router-link to="/" class="text">Home</router-link></h1>
    <h1><router-link to="/addPost" class="text">Add Post</router-link></h1>
    <a>
      <img
        id="profile-picture"
        src="@/assets/user-interface.png"
        alt="login"
        class="login"
        @click="toggleDropdown"
      />
    </a>
    <!-- Use v-if to toggle the dropdown visibility -->
    <div v-if="isDropdownVisible" id="dropdown-menu" class="dropdown-content">
      <p v-if="userEmail">{{ userEmail }}</p> <!-- Show user email -->
      <!-- Use a router-link to navigate to the login page -->
      <router-link to="/login" @click="logout">Log out</router-link>
    </div>
  </header>
</template>

<script>
import { getLoggedInUser, logoutUser } from "@/utils/auth";

export default {
  name: "AppHeader",
  data() {
    return {
      isDropdownVisible: false, // Controls dropdown visibility
      userEmail: null, // Stores the logged-in user's email
    };
  },
  methods: {
    toggleDropdown() {
      this.isDropdownVisible = !this.isDropdownVisible;
    },
    logout() {
      logoutUser(); // Clear token and log out user
      this.userEmail = null; // Reset email
      this.$router.push("/login"); // Redirect to login page
    },
  },
  mounted() {
    const loggedInUser = getLoggedInUser(); // Fetch user data from JWT
    if (loggedInUser) {
      this.userEmail = loggedInUser.email; // Display user's email
    }
  },
};
</script>

<style scoped>
/* Add your header-specific styles here */
.dropdown-content {
  display: block; /* Ensuring dropdown is shown when toggled */
  position: absolute;
  top: 50px; /* Position the dropdown below the profile picture */
  right: 10px;
  background-color: #fff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 10px;
  border-radius: 5px;
  width: 200px;
}

.dropdown-content p {
  margin: 5px 0;
  cursor: pointer;
}

.dropdown-content p:hover {
  background-color: #f0f0f0;
}
</style>
