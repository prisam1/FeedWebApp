**Deployed link-"https://reliable-eclair-8f791a.netlify.app"**

***FeeDTask***

**Project Description**

This project is a social feed and task management application where users can:

Post content with captions and photos.

Create, manage, and update tasks using a drag-and-drop feature.

 **Features Implemented**

**Authentication & Security**

User registration and login with JWT authentication.

Password reset via email OTP (6-digit verification before setting a new password).

Google OAuth implemented (currently facing an "Access Blocked" issue).

**Task Management**

Users can create, update, and delete tasks.

Tasks can be dragged and dropped between the following columns:

Pending

Completed

Done

A confirmation modal appears before deleting any task.

**Feed Posting**

All users can post content, each containing a caption and a photo.

Cloudinary is used for storing and retrieving photos.

Images are converted to Base64 format for faster performance.

Tailwind CSS is used for styling.

**Steps to Run the Project**

Clone the project:

git clone - https://github.com/prisam1/FeedWebApp.git
cd FeedWebApp

Install dependencies:

npm install

Start the project:

npm start

User Workflow:

Register an account

Log in to the application

Post content with images and captions

Create and manage tasks using the drag-and-drop feature

Delete tasks if necessary

**Technologies Used**

Frontend: React.js, Tailwind CSS

Backend: Node.js, Express.js

Database: MongoDB

Authentication: JWT, Google OAuth, Cookies

Storage: Cloudinary (for images)

**Known Issues**

Google OAuth access is currently blocked.

**Future Enhancements**

Fix Google OAuth issue.

Improve UI/UX with additional features.

Implement notifications for task updates.