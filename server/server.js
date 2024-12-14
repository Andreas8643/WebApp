const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = 3000;
const SECRET_KEY = 'your-secret-key';
const users = []; // Temporary array for storing users (replace with DB in production)


// Middleware for parsing JSON
app.use(express.json());

// Enable CORS
app.use(cors());

// Define the path to the JSON file
const filePath = path.join(__dirname, '../public/json.json');  // Path to your JSON file

// Middleware to authenticate user
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization']; // Example: 'Bearer <token>'
  const token = authHeader && authHeader.split(' ')[1]; // Extract the token

  if (!token) return res.status(401).send('Access Denied'); // No token provided

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) {
      console.error('Token verification error:', err);
      return res.status(403).send('Invalid Token'); // Token verification failed
    }
    req.user = user; // Attach the user to the request
    next(); // Proceed to the next middleware
  });
};

app.post("/signup", (req, res) => {
  const { email, password } = req.body;

  const userExists = users.some((user) => user.email === email);
  if (userExists) {
    return res.status(400).send("User already exists");
  }

  users.push({ email, password }); // Save user (for demonstration purposes)
  res.status(201).send({ message: "User registered successfully" });
});


// Login Endpoint
app.post("/login", (req, res) => {
  console.log("Login Request Body:", req.body);

  const { email, password } = req.body;

  const user = users.find((user) => user.email === email);
  if (!user || user.password !== password) {
    return res.status(401).send("Invalid email or password");
  }

  // Generate a JWT token
  const token = jwt.sign({ email }, SECRET_KEY, { expiresIn: "1h" });
  res.status(200).json({ token });
});

app.post('/add-post', authenticateToken, (req, res) => {
  console.log('Request User:', req.user); // Log the user data from the token
  const { title } = req.body;

  if (!title) {
    return res.status(400).send('Title is required'); // Validate request body
  }

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('File read error:', err);
      return res.status(500).send('Error reading JSON file');
    }

    let posts = JSON.parse(data);
    const newPost = {
      id: Date.now(),
      title,
      date: new Date().toISOString().split('T')[0],
      likes: 0,
    };

    posts.push(newPost);

    fs.writeFile(filePath, JSON.stringify(posts, null, 2), (err) => {
      if (err) {
        console.error('File write error:', err);
        return res.status(500).send('Error writing to JSON file');
      }
      console.log('Post added:', newPost); // Log the added post
      res.status(201).json(newPost);
    });
  });
});

// Endpoint to fetch the JSON data
app.get("/json.json", authenticateToken, (req, res) => {
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading JSON file:", err);
      return res.status(500).json({ message: "Error reading JSON file" });
    }

    try {
      const posts = JSON.parse(data);
      res.json(posts);
    } catch (parseError) {
      console.error("Error parsing JSON:", parseError);
      res.status(500).json({ message: "Error parsing JSON file" });
    }
  });
});

// Endpoint to edit a post's title
app.put('/edit-post/:id', authenticateToken, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  if (!title) {
    return res.status(400).send('Title is required');
  }

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).send('Error reading JSON file');
    }
    const posts = JSON.parse(data);
    const post = posts.find((p) => String(p.id) === String(id));
    if (!post) {
      return res.status(404).send('Post not found');
    }

    post.title = title;

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

  // Endpoint to delete all posts from the JSON file
  app.delete('/delete-all-posts', authenticateToken, (req, res) => {
    console.log('Delete All Posts Endpoint Hit');
    console.log('Authenticated User:', req.user);
  
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        console.error('Error reading JSON file:', err);
        return res.status(500).send('Error reading JSON file');
      }
  
      let posts = []; // Reset posts to an empty array
  
      // Write the empty array back to the file
      fs.writeFile(filePath, JSON.stringify(posts, null, 2), (err) => {
        if (err) {
          console.error('Error writing to JSON file:', err);
          return res.status(500).send('Error writing to JSON file');
        }
        console.log('All posts deleted successfully');
        res.status(200).send('All posts deleted successfully');
      });
  });
});
  
  // Endpoint to delete a post (ainult autentitud kasutajatele)
  app.delete('/delete-post/:id', authenticateToken, (req, res) => {
    const { id } = req.params;
  
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        return res.status(500).send('Error reading JSON file');
      }
      let posts = JSON.parse(data);
      posts = posts.filter((post) => String(post.id) !== id);
  
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
