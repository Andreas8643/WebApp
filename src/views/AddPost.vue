<template>
    <section>
      <div class="form-container">
        <form @submit.prevent="submitPost">
          <div class="form-row">
            <label for="post-body">Post body</label>
            <textarea id="post-body" name="post-body" placeholder="textarea" v-model="postBody" required></textarea>
          </div>
          <div class="form-row">
            <label for="file-upload">Select file</label>
            <input type="file" id="file-upload" @change="handleFileUpload" />
          </div>
          <button type="submit">Create post</button>
        </form>
      </div>
    </section>
  </template>
  
  <script>
  export default {
    name: "AddPost",
    data() {
      return {
        postBody: "",
        file: null,
      };
    },
    methods: {
      handleFileUpload(event) {
        this.file = event.target.files[0];
      },
      submitPost() {
        console.log("Post created:", this.postBody, this.file);
        this.$router.push("/");
      },
    },
  };
  </script>
  
  <style>
  @import "@/assets/universal.css";
  </style>
  