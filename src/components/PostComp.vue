<template>
  <div class="post">
    <div class="post-header">
      <img :src="post.profile_picture" alt="User" class="user-icon" />
      <span class="post-date">{{ post.date }}</span>
    </div>
    <h3>{{ post.title }}</h3>
    <img v-if="post.image" :src="post.image" alt="Post Image" class="post-image" />
    <div class="post-footer">
      <button @click="likePost">❤️ Like</button>
      <span>{{ post.likes }} Likes</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    post: Object, // Post data passed from parent component
  },
  methods: {
    likePost() {
  console.log(this.post.id); // Debugging: Log the post id
  this.$store.dispatch('incrementLike', this.post.id);
}
,
  },
};
</script>

<style scoped>
.post {
  padding: 15px;
  background-color: #f4f4f4;
  border-radius: 5px;
  margin-bottom: 15px;
}

.user-icon {
  width: 30px;
  height: 30px;
  border-radius: 50%;
}

.post-footer {
  display: flex;
  align-items: center;
}

button {
  margin-right: 10px;
  padding: 5px 10px;
  background-color: #ccc;
  color: rgb(0, 0, 0);
  border: none;
  border-radius: 5px;
}

button:hover {
  background-color: #888888;
}
</style>
