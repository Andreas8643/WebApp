<template>
  <div>
    <!-- Laadimisindikaator -->
    <div v-if="loading" class="loading-container">
      <p>Loading posts...</p>
    </div>

    <!-- Postituste konteiner -->
    <div v-else class="posts-container">
      <div v-for="post in posts" :key="post.id">
        <Post :post="post" /> <!-- Pass each post as a prop to the Post component -->
      </div>
    </div>

    <!-- Nupp, et resettida "likes" -->
    <div class="reset-container">
      <button @click="resetLikes">Reset All Likes</button>
    </div>
  </div>
</template>

<script>
import Post from "@/components/PostComp.vue"; // Import the Post component

export default {
  name: "HomeView",
  components: {
    Post, // Register the Post component
  },
  data() {
    return {
      loading: true, // Laadimisindikaator
    };
  },
  computed: {
    posts() {
      return this.$store.getters.allPosts; // Access posts from Vuex
    },
  },
  methods: {
    resetLikes() {
      this.$store.dispatch('resetLikes'); // Dispatch action to reset all likes
    },
  },
  watch: {
    posts(newPosts) {
      // Kui postitused muutuvad, kontrolli, kas laadimine lõppes
      if (newPosts.length > 0) {
        this.loading = false;
      }
    },
  },
  mounted() {
    // Laadi postitused kohe, kui komponent monteeritakse
    if (this.posts.length === 0) {
      this.$store.dispatch('fetchPosts').then(() => {
        this.loading = false; // Lõpeta laadimine pärast postituste toomist
      });
    } else {
      this.loading = false; // Kui postitused on juba saadaval, lõpeta laadimine
    }
  },
};
</script>

<style scoped>
/* Container for the reset button */
.reset-container {
  position: fixed;
  bottom: calc(100px); /* Position above the bottom bar */
  left: 50%; /* Horizontal centering */
  transform: translateX(-50%); /* Adjust for centering */
  text-align: center;
  z-index: 10; /* Ensures it appears above other elements */
}

button {
  padding: 10px 20px;
  background-color: #728c96;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #919191;
}
</style>
