<template>
  <section>
    <div class="form-container">
      <h2>Add Post</h2>
      <form @submit.prevent="submitPost">
        <div class="form-row">
          <label for="post-body">Body</label>
          <textarea
            id="post-body"
            name="post-body"
            placeholder="Enter your content here..."
            v-model="postBody"
            required
          ></textarea>
        </div>
        <button type="submit">Add</button>
      </form>
    </div>
  </section>
</template>

<script>
export default {
  name: "AddPost",
  data() {
    return {
      postBody: "", // Stores the text content of the post
    };
  },
  methods: {
    async submitPost() {
      try {
        const newPost = {
          title: this.postBody,
          date: new Date().toISOString().split("T")[0],
          likes: 0,
        };

        console.log("Submitting post:", newPost); // Debug log

        // Use Vuex action to add the post
        await this.$store.dispatch("addPost", newPost);

        // Redirect back to the Home page after successful addition
        this.$router.push("/");
      } catch (error) {
        console.error("Error adding post:", error);
      }
    },
  },
};
</script>

<style scoped>
.form-container {
  max-width: 600px;
  width: 90%;
  margin: 200px auto;
}
.form-row label {
  margin-top: 10px;
}
textarea {
  resize: none;
}
</style>
