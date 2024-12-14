<template>
  <div>
    <div class="posts-container">
      <div v-for="post in posts" :key="post.id" class="post-item">
        <!-- The Post component renders the post -->
        <Post :post="post" />
        <!-- Add a clickable title for navigation -->
      
      </div>
    </div>
    <div class="reset-container">
      <button @click="resetLikes">Reset All Likes</button>
      <button @click="resetPosts">Delete All</button>
    </div>
  </div>
</template>

<script>
import Post from "@/components/PostComp.vue"; // Import the Post component
import { isTokenValid } from "@/utils/auth"; // Check for authentication

export default {
  name: "HomeView",
  components: {
    Post, // Register the Post component
  },
  computed: {
    posts() {
      return this.$store.getters.allPosts; // Get posts from Vuex
    },
  },
  methods: {
    goToPost(id) {
      this.$router.push(`/post/${id}`); // Navigate to the aPost page
    },
    resetLikes() {
      this.$store.dispatch("resetLikes") // Dispatch action to reset all likes
        .then(() => alert("All likes have been reset"))
        .catch((error) => console.error("Error resetting likes:", error));
    },
    resetPosts() {
      this.$store.dispatch("resetPosts") // Dispatch action to delete all posts
        .then(() => alert("All posts have been deleted"))
        .catch((error) => console.error("Error deleting posts:", error));
    },
  },
  mounted() {
    // Check if the user is logged in
    if (!isTokenValid()) {
      this.$router.push("/login"); // Redirect to login if the user is not authenticated
      return;
    }

    // Fetch posts immediately when the component is mounted
    if (this.posts.length === 0) {
      this.$store.dispatch("fetchPosts") // Fetch posts from the server
        .catch((error) => console.error("Error fetching posts:", error));
    }
  },
};
</script>

<style scoped>
/* Container for the reset buttons */
.reset-container {
  position: fixed;
  bottom: calc(100px); /* Position above the bottom bar */
  left: 50%; /* Horizontal centering */
  transform: translateX(-50%); /* Adjust for centering */
  text-align: center;
  z-index: 10; /* Ensures it appears above other elements */
  display: flex; /* Ensures the buttons are displayed next to each other */
  gap: 20px; /* Space between the buttons */
}

button:hover {
  background-color: #919191;
}

/* Add hover styling for the clickable title */
.post-title {
  cursor: pointer;
  color: #4b647e;
  text-decoration: underline;
}

.post-title:hover {
  color: #002040;
}
</style>
