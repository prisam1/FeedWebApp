**Deployed link-"https://reliable-eclair-8f791a.netlify.app"**

- **Project description**
 
This project is based on feed where any user can post caption with photo and task management to create task 

- **Features implemented**
1. register and login with authentication(JSON web token)
2. forgot password by providing registered email the user will receive 6 digit otp and user have to enter the otp then user can easily set new password.
3. google OAuth is implemented but unfortunately showing access blocked.
4. user can create a task and also manage those task by drag and drop between columns "Pending","Completed","Done" to update any task and user also can delete the task via click on delete icon. When a user tries to delete any task then a confirmation will be displayed to delete the task, if user confirmed to delete the task then that task will be deleted.
4. All users can post content and each post containing a photo and a caption. I have used cloudinary for storing and retrieving photos. For image uploading I used to convert image to Base64 for faster performance.
 
- **Steps to run the project**
 1. clone the project.
 2. npm i 
 3. npm start  
 4. register 
 5. login 
 6. then post content create task and manage those task by drag and drop to update any task and user also can delete the task. 
