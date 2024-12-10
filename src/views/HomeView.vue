<template>
  <div>
    <div class="posts-container">
      <div v-for="post in posts" :key="post.id">
        <Post :post="post" /> <!-- Pass each post as a prop to the Post component -->
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

export default {
  name: "HomeView",
  components: {
    Post, // Register the Post component
  },
  computed: {
    posts() {
        const posts = this.$store.getters.allPosts;
        console.log('Posts in component:', posts); // Kontroll
        return posts;
    },
  },
  methods: {
    resetLikes() {
      this.$store.dispatch('resetLikes');  // Dispatch action to reset all likes
    },
    resetPosts() {
      this.$store.dispatch('resetPosts');  // Dispatch action to reset all posts
    },
  },
  mounted() {
    // Fetch posts immediately when the component is mounted, if not already loaded
    if (this.posts.length === 0) {
      this.$store.dispatch('fetchPosts');  // Fetch posts if they are not already in Vuex state
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
  gap: 100px; /* Space between the buttons */
}



button:hover {
  background-color: #919191;
}
</style>

