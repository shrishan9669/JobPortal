#  YuvaJobs – Job Portal Platform

YuvaJobs is a full-stack web-based job portal designed to bridge the gap between **job seekers (employees)** and **recruiters (employers)**.  
The platform streamlines the hiring process by enabling job seekers to explore opportunities and recruiters to efficiently manage applicants, shortlisting, and interviews.

This project is developed as a **college major project** with a strong focus on **modern web technologies, security, scalability, and real-world usability**.

---

##  Features

###  Employee (Job Seeker)
- User registration & secure login
- JWT-based authentication
- Browse and search job listings
- Apply for jobs
- View application status:
  - Pending
  - Shortlisted
  - Rejected
- Score-based profile evaluation visibility
- Receive interview notifications
- View interview schedules and updates
- Profile management
- Track applied jobs history

---

###  Employer (Recruiter)
- Recruiter authentication & authorization
- Post and manage job openings
- View all applicants for a specific job post
- Shortlist suitable candidates
- Reject unsuitable applications
- Maintain application status for each applicant
- Score-based evaluation of applicant profiles
- Rank candidates based on:
  - Skills
  - Experience
  - Education
  - Profile completeness
- Schedule, reschedule, or cancel interviews
- Receive notifications for:
  - New job applications
  - Candidate interview confirmations

---

### Score-Based Applicant Evaluation
- Each applicant is assigned a **score-based profile**
- Scoring helps recruiters:
  - Compare multiple candidates easily
  - Make objective hiring decisions
  - Reduce bias during shortlisting
- Scores are calculated using predefined evaluation criteria

---

###  Notification System
The platform includes a built-in notification system to ensure smooth communication.

####  Employee Notifications
- Application shortlisted
- Application rejected
- Interview scheduled
- Interview rescheduled or cancelled

####  Recruiter Notifications
- New job application received
- Interview confirmation from candidates
- Interview status updates

---

###  Security
- Password hashing using **bcrypt**
- Authentication & authorization using **JWT (JSON Web Tokens)**
- Role-based protected routes for employees and recruiters
- Secure handling of sensitive user data

---

###  UI & UX
- Modern and responsive user interface
- Smooth animations using **Framer Motion**
- Clean and intuitive navigation
- Optimized for multiple screen sizes

---

## 🛠 Tech Stack

###  Frontend
- **React.js**
- **Framer Motion** (animations)
- **CSS / Tailwind CSS**
- **Axios** for API communication

###  Backend
- **Node.js**
- **Express.js**
- **JWT** – Authentication & Authorization
- **bcrypt** – Password hashing

###  Database
- **PostgreSQL**
- Relational database design
- Secure and optimized data storage

---


##  Authentication Flow

1. User registers → password hashed using **bcrypt**
2. User logs in → JWT token generated
3. Token stored on client side
4. Protected routes verified using JWT middleware
5. Role-based access provided to Employee or Recruiter


