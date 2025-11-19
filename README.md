# Freelance Marketplace - TaskVerse

[![Live Site](https://img.shields.io/badge/Live%20Site-Visit-blue)](https://taskverse-0.web.app/)  
[![Client Repo](https://img.shields.io/badge/Client%20Repo-GitHub-black?logo=github)](https://github.com/MehediHasanRafi00/TaskVerse-Client)  
[![Server Repo](https://img.shields.io/badge/Server%20Repo-GitHub-black?logo=github)](https://github.com/MehediHasanRafi00/TaskVerse-Server)  

---

## Project Overview

**TaskVerse** is a full-stack Freelance Marketplace application where users can explore, post, update, and manage jobs or tasks. Authenticated users can manage their own jobs, accept jobs from others, and update their profile information. The project demonstrates integration of **Node.js + Express.js**, **MongoDB**, **Firebase Authentication**, and a **React** frontend with modern animations.

**Live Site:** [https://taskverse-0.web.app/](https://taskverse-0.web.app/)  
**Server API:** [https://taskverse-server.vercel.app/](https://taskverse-server.vercel.app/)

---

## Features

- **User Authentication:** Email/password and Google login.
- **Profile Section:** Update user information including name, photo, and email.
- **Job Management (CRUD):** Users can add, update, and delete their own jobs.
- **Task Acceptance:** Users can accept jobs posted by others.
- **Dynamic Job Display:** Latest jobs displayed dynamically on the homepage and All Jobs page.
- **Private Routes:** Add Job, Update Job, My Added Jobs, My Accepted Tasks protected for authenticated users.
- **Responsive Design:** Works seamlessly on mobile, tablet, and desktop.
- **Dark/Light Mode Toggle:** Switch themes easily.
- **Sorting & Filtering:** Sort jobs by posted date or category.
- **Toast Notifications:** Success and error messages via `react-hot-toast` and `SweetAlert2`.
- **Animations:** Smooth transitions with **Framer Motion** and **React Bits**.
- **Custom 404 Page:** Friendly error page for invalid routes.

---

## Pages & Routes

| Route                | Description                                                    |
| -------------------- | -------------------------------------------------------------- |
| `/`                  | Homepage with banner, latest jobs, and dynamic/static sections |
| `/allJobs`           | View all jobs in grid/table format                             |
| `/allJobs/:id`       | View single job details and accept job                         |
| `/addJob`            | Add a new job (private route)                                  |
| `/updateJob/:id`     | Update an existing job (private route)                         |
| `/deleteJob/:id`     | Delete a job (private route)                                   |
| `/myAddedJobs`       | View jobs added by logged-in user (private route)              |
| `/my-accepted-tasks` | View accepted jobs (private route)                             |
| `/login`             | User login page                                                |
| `/register`          | User registration page                                         |

---

## Tech Stack & Packages

**Frontend:**

- React.js, React DOM, React Router
- Tailwind CSS, DaisyUI
- Framer Motion, React Bits
- Axios, React-hot-toast, SweetAlert2
- Firebase, React Icons, Lucide-react

**Backend:**

- Node.js, Express.js, CORS, Dotenv
- MongoDB Atlas
- Firebase Admin

---

## Environment Variables

**Client-side (.env):**

```bash
VITE_FIREBASE_API_KEY
VITE_FIREBASE_AUTH_DOMAIN
VITE_FIREBASE_PROJECT_ID
VITE_FIREBASE_STORAGE_BUCKET
VITE_FIREBASE_MESSAGING_SENDER_ID
```

**server-side (.env):**

```bash
DB_USER
DB_PASS
FIREBASE_SERVICE_KEY
```

## Deployment

- **Client:** Firebase Hosting ([Live Site](https://taskverse-0.web.app/))
- **Server:** Vercel ([API Server](https://taskverse-server.vercel.app/))
- All private routes are fully protected; users remain logged in after refreshing.

---

## Challenges & Advanced Features

- Users cannot accept their own jobs
- Sort and filter jobs by posted date
- Dark/light theme toggle
- Profile section with update functionality
- Smooth animations with Framer Motion & React Bits
- Toast notifications for all success/error events

---

## Screenshots

**Homepage**  
[![Homepage Screenshot](./screenshots/homepage.png)](./screenshots/homepage.png)

**Add Job Page**  
[![Add Job Screenshot](./screenshots/add-job.png)](./screenshots/add-job.png)

**My Added Jobs Page**  
[![My Added Jobs Screenshot](./screenshots/my-added-jobs.png)](./screenshots/my-added-jobs.png)

**Job Details Page**  
[![Job Details Screenshot](./screenshots/job-details.png)](./screenshots/job-details.png)


---

## License

This project is open-source and intended for educational purposes.
