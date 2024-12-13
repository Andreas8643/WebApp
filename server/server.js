const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = 3000;
const SECRET_KEY = 'your-secret-key';

// Middleware for parsing JSON
app.use(express.json());

// Enable CORS
app.use(cors());

// Define the path to the JSON file
const filePath = path.join(__dirname, '../public/json.json');  // Path to your JSON file

// Middleware to authenticate user
const authenticateToken = (req, res, next) => {


  const token = req.headers['authorization']; // Token tuleb requesti päisest
  if (!token) return res.status(401).send('Access Denied');

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.status(403).send('Invalid Token');
    req.user = user; // Salvestab kasutaja info requesti
    next();
  }); 
};

// Simuleeritud sisselogimise lõpp-punkt
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  // Kontrolli kasutajat (siin võid lisada päris andmebaasi kontrolli)
  if (email === 'test@example.com' && password === 'password123') {
    // Genereeri token
    const token = jwt.sign({ email }, SECRET_KEY, { expiresIn: '1h' }); // Token kehtib 1 tund
    return res.json({ token });
  } else {
    return res.status(401).send('Invalid email or password');
  }
});

app.post('/add-post', (req, res) => {
  console.log('ADD-POST')
  try {
    const { title, body, likes } = req.body;

    let newFilePath = path.join(__dirname, '../public/json.json');

  fs.readFile(newFilePath, 'utf8', (err, data) => {
    if (err) {
      console.log(err)
      return res.status(500).send('Error reading JSON file');
    }

    let posts = JSON.parse(data);
    const newPost = {
      id: Date.now(),
      title,
     // body,
      date: new Date().toISOString().split('T')[0],
      likes: likes || 0,
    };

    console.log(newPost)

    posts.push(newPost);

    fs.writeFile(newFilePath, JSON.stringify(posts, null, 2), (err) => {
      if (err) {
        return res.status(500).send('Error writing to JSON file');
      }
      res.status(201).json(newPost);
    });
  });
  } catch (error) {
    console.log(error);
    return res.status(201).json(newPost);
  }
});

// Endpoint to fetch the JSON data
app.get('/json.json', (req, res) => {
  console.log
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
  
  // Endpoint to delete a post (ainult autentitud kasutajatele)
app.delete('/delete-post/:id', (req, res) => {
  const postId = req.params.id;

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).send('Error reading JSON file');
    }

    let posts = JSON.parse(data);

    // Filter out the post with the given ID
    posts = posts.filter(post => String(post.id) !== postId);

    fs.writeFile(filePath, JSON.stringify(posts, null, 2), (err) => {
      if (err) {
        return res.status(500).send('Error writing to JSON file');
      }
      res.send('Post deleted successfully');
    });
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
