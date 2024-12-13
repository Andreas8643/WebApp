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
        <button type="submit">Create Post</button>
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
    submitPost() {
      const newPost = {
        id: Date.now(),
        title: this.postBody,
        date: new Date().toISOString().split("T")[0],
        likes: 0,
      };

      fetch("http://localhost:3000/add-post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer YOUR_TOKEN_HERE`, // If authentication is required
        },
        body: JSON.stringify(newPost),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to add post");
          }
          return response.json();
        })
        .then((post) => {
          this.$store.dispatch("addPost", post); // Add post to Vuex store
          this.$router.push("/"); // Redirect back to HomeView
        })
        .catch((error) => {
          console.error("Error adding post:", error);
        });
    },
  },
};
</script>

<style scoped>
/* Only unique styles, most reused from universal.css */
.form-container {
  max-width: 600px;
  width: 90%;
  margin: 200px auto;
}
.form-row label {
  margin-top: 10px;
}
textarea {
  resize: none; /* Universal.css covers most of the styling */
}
</style>
