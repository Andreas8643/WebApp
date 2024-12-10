<template>
    <div class="contact-container">
      <div class="contact-form">
        <h2>Contact Us</h2>
        <form @submit.prevent="sendMessage">
          <div class="form-group">
            <label for="name">Name:</label>
            <input type="text" id="name" v-model="formData.name" placeholder="Enter your name" required />
          </div>
  
          <div class="form-group">
            <label for="email">Email:</label>
            <input type="email" id="email" v-model="formData.email" placeholder="Enter your email" required />
          </div>
  
          <div class="form-group">
            <label for="message">Message:</label>
            <textarea id="message" v-model="formData.message" placeholder="Write your message here..." required></textarea>
          </div>
  
          <div class="button-group">
            <button type="submit">Send</button>
            <button type="button" @click="resetForm">Reset</button>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "ContactUs",
    data() {
      return {
        formData: {
          name: "",
          email: "",
          message: "",
        },
      };
    },
    methods: {
      sendMessage() {
        if (this.formData.name && this.formData.email && this.formData.message) {
          alert("Message sent successfully!");
          this.resetForm();
        }
      },
      resetForm() {
        this.formData.name = "";
        this.formData.email = "";
        this.formData.message = "";
      },
    },
  };
  </script>
  
  <style scoped>
  .contact-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh; /* Täidab kogu ekraani kõrguse */
  }
  
  .contact-form {
    max-width: 400px;
    padding: 20px;
    background-color: white;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  
  .contact-form h2 {
    text-align: center;
    margin-bottom: 20px;
    color: #333;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
    color: #555;
  }
  
  input,
  textarea {
    width: 90%;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 5px;
    outline: none;
    transition: border-color 0.3s;
  }
  
  input:focus,
  textarea:focus {
    border-color: #728c96; /* Fookuse korral */
  }
  
  textarea {
    height: 100px;
    resize: none;
  }
  
  .button-group {
    display: flex;
    justify-content: space-between;
  }
  
  button {
    padding: 10px 20px;
    background-color: #728c96;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.3s;
  }
  
  button:hover {
    background-color: #5a6f7b;
  }
  </style>
  