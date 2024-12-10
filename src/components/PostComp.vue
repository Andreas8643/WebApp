<template>
  <div class="post">
    <div class="post-header">
      <span class="post-date">{{ post.date }}</span>
    </div>
    <router-link :to="{ name: 'aPost', params: { id: post.id } }" class="post-link">
      <h3>{{ post.title }}</h3>
      <img v-if="post.image" :src="post.image" alt="Post Image" class="post-image" />
    </router-link>
    <div class="post-footer">
      <buttona @click="likePost">❤️ Like</buttona>
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
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.post-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.post-link {
  text-decoration: none;
  color: black;
}

.post-link h3 {
  margin: 0;
}

.post-link:hover h3 {
  text-decoration: underline;
}

.post-image {
  width: 100%;
  height: auto;
  margin-top: 10px;
  border-radius: 5px;
}

.post-footer {
  display: flex;
  justify-content: space-between; /* Like nupp vasakul, Likes paremal */
  align-items: center;
  margin-top: 10px;
  border-top: 1px solid #ddd;
  padding-top: 10px;
}

buttona {
  padding: 8px 15px;
  background-color: #9e9e9e;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s;
}

buttona:hover {
  background-color: #919191;
}

.post-footer span {
  font-size: 14px;
  color: #555;
}
</style>
