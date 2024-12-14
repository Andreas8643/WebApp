<template>
    <div class="a-post-wrapper">
      <div class="a-post" v-if="post">
        <h2>A Post</h2>
        <p>Body</p>        
        <!-- If the post is being edited, show a textarea -->
        <div v-if="isEditing">
          <textarea v-model="editedContent" rows="4" cols="50"></textarea>
          <button @click="savePost">Save</button>
          <button @click="cancelEdit">Cancel</button>
        </div>
  
        <!-- If the post is not being edited, show the content -->
        <div v-else>
          <p>{{ post.title }}</p>
          <button @click="editPost">Update</button>
          <button @click="deletePost">Delete</button>
        </div>
      </div>
      <div v-else>
        <p>Post not found.</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
  data() {
    return {
      post: null, // Store the post data
      isEditing: false, // Track if the user is editing the post
      editedContent: "", // Store the edited content
    };
  },
  methods: {
    async fetchPost() {
      const postId = this.$route.params.id;

      try {
        const response = await fetch(`http://localhost:3000/json.json`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch the post");
        }

        const posts = await response.json();
        this.post = posts.find((p) => String(p.id) === postId);

        if (this.post) {
          this.editedContent = this.post.title; // Pre-fill the edit field
        } else {
          console.error("Post not found");
        }
      } catch (error) {
        console.error("Error fetching post:", error);
        this.$router.push("/login"); // Redirect to login if unauthorized
      }
    },
    editPost() {
      this.isEditing = true;
    },
    cancelEdit() {
      this.isEditing = false;
      this.editedContent = this.post.title; // Reset the edit field
    },
    async savePost() {
      try {
        const response = await fetch(`http://localhost:3000/edit-post/${this.post.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
          body: JSON.stringify({ title: this.editedContent }),
        });

        if (!response.ok) {
          throw new Error("Failed to update post");
        }

        // Update Vuex and UI
        this.post.title = this.editedContent;
        this.isEditing = false;

        alert("Post updated successfully!");
      } catch (error) {
        console.error("Error updating post:", error);
      }
    },
    async deletePost() {
      try {
        const response = await fetch(`http://localhost:3000/delete-post/${this.post.id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to delete post");
        }

        alert("Post deleted successfully!");
        this.$router.push("/"); // Redirect to home page
      } catch (error) {
        console.error("Error deleting post:", error);
      }
    },
  },
  mounted() {
    this.fetchPost();
  },
};
</script>
  
  <style scoped>
  .a-post-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }
  
  .a-post {
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 10px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
    width: 90%;
    max-width: 600px;
    text-align: center;
  }
  
  button {
    margin-top: 10px;
    padding: 10px 20px;
    background-color: #4b647e;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    display: inline-block;
  }
  
  button:hover {
    background-color: #002040;
  }
  </style>
  
