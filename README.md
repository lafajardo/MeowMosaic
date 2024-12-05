# MeowMosaic

MeowMosaic is a web application where users can create, view, and interact with posts featuring pictures of cats spotted on campus. The platform includes features like creating accounts, uploading cat pictures, interacting with posts through likes or dislikes, and viewing leaderboards of the top-rated cat pictures.

## Video


## Features

- **User Management**: 
  - User registration and login system.
  - Email verification when signing up
  - Profile editing and account deletion.

- **Post Management**: 
  - Users can create, update, and delete posts with images of campus cats.
  - View all posts in a feed.
  - Leaderboard showcasing the top-rated cat posts.

- **Interactions**: 
  - Like or dislike posts.
  - View individual profiles and their posts.

- **Responsive UI**: Built using Angular and Material Design for a seamless and visually appealing experience.

## Technologies Used

### Backend
- **Node.js**: Core runtime environment for backend development.
- **Express.js**: Framework for building RESTful APIs.
- **Passport.js**: Authentication middleware for user login/logout.
- **Prisma**: ORM for interacting with a PostgreSQL database.
- **PostgreSQL**: Database for storing user and post data.
- **Supabase**: Backend services including database hosting.

### Frontend
- **Angular**: Framework for building a dynamic, single-page application.
- **Angular Material**: UI component library for consistent design and layout.
- **HTML/CSS**: For structuring and styling web pages.

### Other Tools and Libraries
- **TypeScript**: Strongly typed superset of JavaScript.
- **MatDialog**: Angular Material component for dialogs.
- **ReactiveFormsModule**: For building dynamic, interactive forms.

## Folder Structure

### Backend
- `app/`: Entry point for the Express application.
- `service/`: Contains business logic for user and post operations.
- `api/`: API endpoints for users and posts.
- `prisma/schema.prisma`: Defines the database schema.

### Frontend
- `src/app/`: Angular application modules and components.
- `src/app/models`: Objects and models for Angular frontend use
- `src/app/shared/widgets/`: Reusable components like navigation and post widgets.
- `src/app/shared/dialogs/`: Resultable components for presenting dialog such as a signup prompt
- `src/app/posts/`: Components for feed, leaderboard, and post management.
- `src/app/profile/`: Components for user profile and account management.

## Core Components

### Backend APIs
- **Post APIs**:
  - `/create-post`: Create a new post.
  - `/feed`: Retrieve all posts.
  - `/leaderboard`: Fetch top-rated posts.
  - `/:id`: Update or delete a post.
- **User APIs**:
  - `/login`: User login.
  - `/create-acct`: Register a new user.
  - `verify-email`: Verifies that the email the user is attempting to signup is real by sending a request to a 3rd party api and returning back whether it is real or not.
  - `/posts/:id`: Fetch posts created by a specific user.
  - `/logout`: Logout the user.
  - `/:id`: Update or delete a user.

### Angular Components
- **Post Management**:
  - `PostWidget`: Displays individual posts.
  - `PostsPageComponent`: Main feed and leaderboard navigation.
  - `PostCreatorComponent`: Form for creating new posts.
  - `PostsLeaderboardComponent`: Displays top posts.
- **User Management**:
  - `ProfileWidget`: Displays user details and edit options.
  - `LoginComponent`: Handles login and account creation.
  - `UserEditorComponent`: Dialog for editing user details.
  - `DeleteAccountComponent`: Dialog for account deletion.

## Setup and Installation

### 1. Install Node.js
Node.js is required to run the backend and manage dependencies.

- **Download**: [Node.js Official Website](https://nodejs.org/).
- Install the **LTS version** for stability.
- Verify the installation by running:
  ```bash
  node -v
  npm -v
  ```

### 2. Install Angualar
Angular CLI is a command-line interface for managing Angular projects
- Install Angular CLI globally using npm
```npm install -g @angular/cli```
- verify the installation:
```ng version```

### 3. Install PostgreSQL
- **Download**: [PostgreSQL Official Website](https://www.postgresql.org/download/).
- Follow the installation instructions, and create a username and password during setup.
- Verify the installation:
```psql --version```

### 4. Install Prisma CLI
Prisma is used for managing the database schema and migrations.

- Install Primsa CLI globally:
```npm install -g prisma```
- Verify the installation:
```prisma -v```

### 5. Clone the repository
```
git clone https://github.com/ptong123/Comp426-final.git
cd meowmosaic
```

### 6. Backend Setup
```
cd backend
npm install
```
1. Create a ```.env``` file in the ```backend``` directory and paste the following and make sure to save:

2. Then start the backend
```npm start```

### 7. Frontend Setup
```
cd ../frontend
ng serve
```
The application should be available at ```http://localhost:4200```