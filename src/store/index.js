import { createStore } from 'vuex';

export default createStore({
  state: {
    posts: [], // Initially empty, will be populated with data
  },
  mutations: {
    setPosts(state, posts) {
      state.posts = posts; // Set posts fetched from the server
    },
    incrementLike(state, postId) {
      const post = state.posts.find((p) => p.id === postId);
      if (post) {
        post.likes += 1; // Increment likes for the post
      }
    },
    updatePost(state, { id, title }) {
      const post = state.posts.find(post => String(post.id) === String(id));
      if (post) {
        post.title = title; // Uuendame postituse sisu
      }
    },
    deletePost(state, postId) {
      state.posts = state.posts.filter(post => String(post.id) !== String(postId));
    },
    SET_POSTS(state, posts) {
      console.log('Setting posts:', posts); // Kontroll
      state.posts = posts; // Ensure state posts are updated after mutation
    },
    resetLikes(state) {
      state.posts.forEach(post => post.likes = 0);  // Reset all likes
    },
  },

  actions: {
    async resetLikes({ commit }) {
      try {
        const response = await fetch('http://localhost:3000/reset-likes', {
          method: 'PUT',
        });
        if (!response.ok) {
          throw new Error(`Failed to reset likes: ${response.statusText}`);
        }
        commit('resetLikes'); // Update Vuex state
      } catch (error) {
        console.error('Error resetting likes:', error);
      }
    },
    async resetPosts({ commit }) {
      try {
        const response = await fetch('http://localhost:3000/delete-all-posts', {
          method: 'DELETE',
        });
        if (!response.ok) {
          throw new Error(`Failed to delete all posts: ${response.statusText}`);
        }
        commit('setPosts', []); // Clear posts in Vuex state
      } catch (error) {
        console.error('Error deleting all posts:', error);
      }
    },
    async fetchPosts({ commit }) {
      try {
          const jsonUrl = 'http://localhost:3000/json.json'; // Fetch posts from the Express server
          const response = await fetch(jsonUrl);
          if (!response.ok) {
              throw new Error(`Network response was not ok: ${response.statusText}`);
          }
          const posts = await response.json();
          commit('setPosts', posts);
      } catch (error) {
          console.error('Error fetching posts:', error);
      }
    },
    deletePost({ commit }, postId) {
      // First, update Vuex state by removing the post
      commit('deletePost', postId);

      // Then send a request to the server to delete the post from the JSON file
      fetch(`http://localhost:3000/delete-post/${postId}`, {
        method: 'DELETE',
      })
        .then(response => {
          if (response.ok) {
            console.log('Post deleted successfully from the server');
          } else {
            console.error('Failed to delete post from the server');
          }
        })
        .catch(error => {
          console.error('Error deleting post from server:', error);
        });
    },
    updatePost({ commit }, { id, content }) {
      commit('updatePost', { id, content });
    },
    incrementLike({ commit }, postId) {
      commit('incrementLike', postId); // Increment like for the post
    },
  },

  getters: {
    allPosts(state) {
      return state.posts; // Return all posts from Vuex state
    },
    getPostById: (state) => (id) => {
      return state.posts.find((post) => String(post.id) === id) || undefined; // Return undefined if not found
    },
  },
});
