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
    addPost(state, post) {
      state.posts.push(post); // Add the new post to the state
    },
  },

  actions: {
    async resetLikes({ commit }) {
      try {
        const response = await fetch("http://localhost:3000/reset-likes", {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        });
    
        if (!response.ok) {
          throw new Error("Failed to reset likes");
        }
    
        commit("resetLikes"); // Update Vuex state after successful reset
      } catch (error) {
        console.error("Error resetting likes:", error);
        throw error;
      }
    },
    async addPost({ commit }, post) {
      try {
        const response = await fetch('http://localhost:3000/add-post', {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem('userToken')}`,
          },
          body: JSON.stringify(post),
        });
        if (!response.ok) {
          throw new Error('Failed to add post');
        }
        const addedPost = await response.json();
        commit('addPost', addedPost); // Add the post to Vuex state
        return addedPost;
      } catch (error) {
        console.error('Error adding post:', error);
        throw error;
      }
    },
    async resetPosts({ commit }) {
      try {
        const response = await fetch('http://localhost:3000/delete-all-posts', {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('userToken')}`, // Include JWT for authentication
          },
        });
    
        if (!response.ok) {
          const error = await response.text();
          throw new Error(`Failed to delete all posts: ${error}`);
        }
    
        commit('setPosts', []); // Clear posts in Vuex state after successful deletion
        console.log('All posts deleted successfully');
      } catch (error) {
        console.error('Error deleting posts:', error.message);
        throw error; // Pass the error to the component if needed
      }
    },
    async fetchPosts({ commit }) {
      try {
        const response = await fetch("http://localhost:3000/json.json", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        });
    
        if (!response.ok) {
          throw new Error(`Failed to fetch posts: ${response.statusText}`);
        }
    
        const posts = await response.json();
        commit("setPosts", posts); // Update the Vuex store with fetched posts
      } catch (error) {
        console.error("Error fetching posts:", error);
        throw error; // Re-throw the error for further debugging or handling
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
