YouTube MERN Clone:

A full-stack YouTube-inspired web application built using the MERN stack (MongoDB, Express.js, React.js, and Node.js). This app offers features like video browsing, user authentication, channel management, search and filter functionality, and a video player with a comment system.

🚀 Features

1. Home Page
   
Displays a responsive YouTube Header.

Static sidebar with a toggle feature activated by a hamburger menu.

Filter buttons to display videos by category.

A grid layout showcasing video thumbnails.

Each video card includes:

Title

Thumbnail

Channel Name

View Count

3. User Authentication
   
Register and Login features with:

Username

Email

Password

Authentication powered by JWT (JSON Web Tokens).

Sign-in Workflow:

Before sign-in:

Header shows a Sign In button.

Clicking Sign In redirects to a Google Form-based Login and Registration page.

After successful sign-in:

User's name is displayed in the header.

Home page is displayed with full access to features.

5. Search and Filter Functionality
   
Search Bar (in the header):

Search videos by title.

Category Filters:

Filter videos by specific categories.

7. Video Player Page
   
Displays a selected video with the following:

Video player

Title and description

Channel Name

Like and Dislike Buttons

Comment Section:

Add, edit, and delete comments.

New comments are stored in the database.

9. Channel Page
    
Channel Creation:

Only available to signed-in users.

Displays a list of videos for the particular channel.

Allows users to edit or delete their videos.

🛠️ Technology Stack

Frontend

React.js (with React Router for navigation)

CSS Modules for styling

Backend

Node.js

Express.js

Database

MongoDB (via Mongoose)

Authentication

JWT (JSON Web Tokens)

⚙️ Installation
Clone the repository:


git clone https://github.com/Toufik353/youtube-mern.git

Navigate to the project directory:

cd youtube-mern

Install dependencies for the backend:

cd backend  

npm install  

Install dependencies for the frontend:

cd ../frontend  

npm install  

Create a .env file in the backend directory and add:

makefile

PORT=5000

MONGO_URI=<Your MongoDB connection string>

JWT_SECRET=<Your JWT secret>

Start the backend server:

cd backend  

npm start  

Start the frontend server:

cd ../frontend  

npm start  

🔍 API Endpoints

User Authentication

POST /auth/register: Register a new user.

POST /auth/login: Log in a user and return a JWT.

Videos

GET /videos: Fetch all videos or filter by category.

GET /videos/:id: Fetch a specific video.

POST /videos: Upload a video (authenticated users only).

PUT /videos/:id: Edit a video (owner only).

DELETE /videos/:id: Delete a video (owner only).

Channels

GET /channel/:id: Fetch channel details.

POST /channel: Create a new channel (authenticated users only).

🤝 Contributing

Contributions are welcome! To contribute:

Fork this repository.

Create a feature branch:

git checkout -b feature-name

Commit your changes:


git commit -m "Add a new feature"  

Push your changes:

git push origin feature-name

Open a pull request.

Hostet Link : https://youtube-mern-frontned.onrender.com/

Backend Hosted API's : https://youtube-mern-backend-api.onrender.com/

