<template>
    <div class="a-post-wrapper">
      <div class="a-post" v-if="post">
        <h2>{{ post.title }}</h2>
        <p>{{ post.date }}</p>
        <p>Likes: {{ post.likes }}</p>
        
        <!-- If the post is being edited, show a textarea -->
        <div v-if="isEditing">
          <textarea v-model="editedContent" rows="4" cols="50"></textarea>
          <button @click="savePost">Save</button>
          <button @click="cancelEdit">Cancel</button>
        </div>
  
        <!-- If the post is not being edited, show the content -->
        <div v-else>
          <p>{{ post.content }}</p>
          <button @click="editPost">Edit Post</button>
          <button @click="deletePost">Delete Post</button>
        </div>
      </div>
      <div v-else>
        <p>Post not found.</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      id: String,
    },
    data() {
      return {
        isEditing: false, // Track if we are editing the post
        editedContent: '', // Store the edited content
      };
    },
    computed: {
      post() {
        return this.$store.getters.getPostById(this.id); // Get the post by ID from Vuex
      },
    },
    methods: {
      editPost() {
        this.isEditing = true;
        this.editedContent = this.post.title; // Pre-fill the textarea with the current post title
      },
      cancelEdit() {
        this.isEditing = false;
        this.editedContent = ''; // Clear the textarea when canceling
      },
      savePost() {
  // Dispatch the update to Vuex
  this.$store.dispatch('updatePost', { id: this.id, title: this.editedContent });

  // Send the updated post title to the server
  fetch(`http://localhost:3000/edit-post/${this.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title: this.editedContent }), // Send the updated title in the body
  })
  .then(response => {
    if (response.ok) {
      this.isEditing = false; // Hide the editing UI
      console.log('Post updated successfully');
      
      // Redirect back to the homepage after a successful update
      this.$router.push('/'); // This assumes you have Vue Router set up

      // Optionally, you can refetch the posts if necessary
      this.$store.dispatch('fetchPosts');
    } else {
      console.error('Failed to update post');
    }
  })
  .catch(error => {
    console.error('Error updating post:', error);
  });
},
      deletePost() {
        this.$store.dispatch('deletePost', this.id); // Delete the post from Vuex state
      },
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
  