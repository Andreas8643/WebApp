document.addEventListener("DOMContentLoaded", function() {
    const json1 = './json.json';

    fetch(json1)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(posts => {
            console.log(posts);
            const postsContainer = document.getElementById('posts-container');
            posts.forEach(post => {
                const article = document.createElement('article');
                article.classList.add('post');

                // Create post header
                const postHeader = document.createElement('div');
                postHeader.classList.add('post-header');

                const userIcon = document.createElement('img');
                userIcon.src = post.profile_picture; 
                userIcon.alt = 'user';
                userIcon.classList.add('user-icon');

                const postDate = document.createElement('span');
                postDate.classList.add('post-date');
                postDate.textContent = post.date;

                postHeader.appendChild(userIcon);
                postHeader.appendChild(postDate);
                article.appendChild(postHeader);

                // Create post image if it exists
                if (post.image) {
                    const postImage = document.createElement('img');
                    postImage.src = post.image;
                    postImage.classList.add('post-image');
                    postImage.alt = `Image for ${post.title}`;
                    postImage.onerror = function() {
                        this.remove(); // Remove the image element if it fails to load
                    };
                    article.appendChild(postImage);
                }

                // Create post description
                const postDescription = document.createElement('p');
                postDescription.classList.add('post-description');
                postDescription.textContent = post.title;
                article.appendChild(postDescription);

                // Create post footer
                const postFooter = document.createElement('div');
                postFooter.classList.add('post-footer');

                const postLikes = document.createElement('span');
                postLikes.classList.add('post-likes');
                postLikes.innerHTML = `❤️ ${post.likes} Likes`;

                postFooter.appendChild(postLikes);
                article.appendChild(postFooter);

                // Append article to posts container
                postsContainer.appendChild(article);
            });
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
        });
});
// document.addEventListener("DOMContentLoaded", function() {
//     const jsonUrl = 'https://gist.githubusercontent.com/Andreas8643/da28d2469ed83268cd0ed849a7414910/raw/posts_data.json'; 

//     fetch(jsonUrl)
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error('Network response was not ok');
//             }
//             return response.json();
//         })
//         .then(posts => {
//             const postsContainer = document.getElementById('posts-container');
//             posts.forEach(post => {
//                 const article = document.createElement('article');
//                 article.classList.add('post');

//                 // Create post header
//                 const postHeader = document.createElement('div');
//                 postHeader.classList.add('post-header');

//                 const userIcon = document.createElement('img');
//                 userIcon.src = post.profile_picture; // URL of profile picture
//                 userIcon.alt = 'user';
//                 userIcon.classList.add('user-icon');

//                 const postDate = document.createElement('span');
//                 postDate.classList.add('post-date');
//                 postDate.textContent = post.date;

//                 postHeader.appendChild(userIcon);
//                 postHeader.appendChild(postDate);
//                 article.appendChild(postHeader);

//                 // Create post image if it exists
//                 if (post.image) {
//                     const postImage = document.createElement('img');
//                     postImage.src = post.image;
//                     postImage.classList.add('post-image');
//                     article.appendChild(postImage);
//                 }

//                 // Create post description
//                 const postDescription = document.createElement('p');
//                 postDescription.classList.add('post-description');
//                 postDescription.textContent = post.title; // Or a more detailed description if available
//                 article.appendChild(postDescription);

//                 // Create post footer
//                 const postFooter = document.createElement('div');
//                 postFooter.classList.add('post-footer');

//                 const postLikes = document.createElement('span');
//                 postLikes.classList.add('post-likes');
//                 postLikes.innerHTML = `❤️ ${post.likes} Likes`;

//                 postFooter.appendChild(postLikes);
//                 article.appendChild(postFooter);

//                 // Append article to posts container
//                 postsContainer.appendChild(article);
//             });
//         })
//         .catch(error => {
//             console.error('There has been a problem with your fetch operation:', error);
//         });
// });
