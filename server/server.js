const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware for parsing JSON
app.use(express.json());

// Enable CORS
app.use(cors());

// Define the path to the JSON file
const filePath = path.join(__dirname, 'json.json');  // Path to your JSON file

// Endpoint to fetch the JSON data
app.get('/json.json', (req, res) => {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading JSON file:', err);
      return res.status(500).send('Error reading JSON file');
    }
    res.json(JSON.parse(data)); // Send the file content as JSON
  });
});

// Endpoint to delete a post from the JSON file
app.delete('/delete-post/:id', (req, res) => {
  const postId = req.params.id;

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading JSON file:', err);
      return res.status(500).send('Error reading JSON file');
    }

    let posts = JSON.parse(data);

    // Filter out the post with the given ID
    posts = posts.filter(post => String(post.id) !== postId);

    // Write the updated posts back to the file
    fs.writeFile(filePath, JSON.stringify(posts, null, 2), (err) => {
      if (err) {
        console.error('Error writing to JSON file:', err);
        return res.status(500).send('Error writing to JSON file');
      }
      res.send('Post deleted successfully');
    });
  });
});

// Endpoint to edit a post's title
app.put('/edit-post/:id', (req, res) => {
  const { id } = req.params; // Get the post id from the URL
  const { title } = req.body; // Get the new title from the request body

  if (!title) {
    return res.status(400).send('Title is required'); // Ensure title is provided
  }

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).send('Error reading JSON file');
    }
    const posts = JSON.parse(data);
    const post = posts.find(p => String(p.id) === String(id)); // Find the post by ID
    if (!post) {
      return res.status(404).send('Post not found');
    }

    post.title = title; // Update the post title

    fs.writeFile(filePath, JSON.stringify(posts, null, 2), (err) => {
      if (err) {
        return res.status(500).send('Error writing to JSON file');
      }
      res.send('Post updated successfully');
    });
  });
});
app.put('/reset-likes', (req, res) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        return res.status(500).send('Error reading JSON file');
      }
  
      let posts = JSON.parse(data);
  
      // Set likes to 0 for all posts
      posts = posts.map(post => ({ ...post, likes: 0 }));
  
      fs.writeFile(filePath, JSON.stringify(posts, null, 2), (err) => {
        if (err) {
          return res.status(500).send('Error writing to JSON file');
        }
        res.send('All likes reset successfully');
      });
    });
  });
  
  // Endpoint to delete all posts
  app.delete('/delete-all-posts', (req, res) => {
    fs.writeFile(filePath, JSON.stringify([], null, 2), (err) => {
      if (err) {
        return res.status(500).send('Error writing to JSON file');
      }
      res.send('All posts deleted successfully');
    });
  });

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
