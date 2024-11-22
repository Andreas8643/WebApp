<template>
  <section class="posts-container" id="posts-container">
    <PostComp 
      v-for="post in posts" 
      :key="post.id" 
      :post="post" 
    />
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import PostComp from "@/components/PostComp.vue";

export default {
  name: "PostsContainer",
  components: { PostComp },
  computed: {
    ...mapGetters(["allPosts"]), // Use Vuex getter to access posts
    posts() {
      return this.allPosts; // Bind the posts from Vuex state
    },
  },
  mounted() {
    this.$store.dispatch("fetchPosts"); // Fetch posts when the component is mounted
  },
};
</script>

<style scoped>
/* Styles specific to posts container */
</style>
