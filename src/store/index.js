import { createStore } from 'vuex';

export default createStore({
  state: {
    posts: [],  // Initially empty, will be populated with data
  },
  mutations: {
    setPosts(state, posts) {
      state.posts = posts;  // Set posts fetched from the server
    },
    incrementLike(state, postId) {
      const post = state.posts.find(p => p.id === postId);
      if (post) {
        post.likes += 1;  // Increment likes for the post
      }
    },
    resetLikes(state) {
      state.posts.forEach(post => post.likes = 0);  // Reset all likes
    },
  },
  actions: {
    fetchPosts({ commit }) {
      const jsonUrl = '/json.json';  // Path to the JSON file
      fetch(jsonUrl)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(posts => {
          commit('setPosts', posts);  // Commit the fetched posts to Vuex state
        })
        .catch(error => {
          console.error('Error fetching posts:', error);
        });
    },
    incrementLike({ commit }, postId) {
      commit('incrementLike', postId);  // Increment like for the post
    },
    resetLikes({ commit }) {
      commit('resetLikes');  // Reset likes for all posts
    },
  },
  getters: {
    allPosts(state) {
      return state.posts;  // Return all posts from Vuex state
    },
  },
});
