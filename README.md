# 👨‍💻 Portfolio Website - Subhapreet Patro

![Portfolio Banner](https://img.shields.io/badge/Status-Active-success?style=flat-square)

Welcome to the personal portfolio website of **Subhapreet Patro**, a passionate **Computer Science Student** and **Full Stack Developer**. This interactive and responsive website serves as a digital showcase of my technical skills, software projects, certifications, and professional journey.

## 🚀 Live Demo

[**View Live Portfolio**](https://subhapreetpatro.vercel.app/)

---

## ✨ Key Features

-   **🎨 Modern & Dynamic UI**: Built with **React** and **Material UI (MUI)** for a sleek, professional look.
-   **🌓 Dark/Light Mode**: Fully supported theme switching with persistent state.
-   **📱 Responsive Design**: Optimized layout for Mobiles, Tablets, and Desktops.
-   **⚡ Smooth Animations**: Powered by **Framer Motion** for engaging entrance and hover effects.
-   **📜 Smooth Scrolling**: Integrated **Lenis** for a premium scrolling experience.
-   **📂 Project Showcase**: detailed cards with expandable details and GitHub links.
-   **🏆 Certification Gallery**: A visual grid of professional certifications with PDF previews.
-   **📩 Working Contact Form**: Integrated with **EmailJS** for direct messaging.

---

## 🛠️ Technical Skills

My technical expertise spans across various domains of software development:

### **Programming Languages**
![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white) ![Java](https://img.shields.io/badge/Java-007396?style=for-the-badge&logo=openjdk&logoColor=white) ![HTML](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white) ![CSS](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white) ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

### **Software and Technologies**
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black) ![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white) ![NodeJS](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white) ![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white) ![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white) ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-336791?style=for-the-badge&logo=postgresql&logoColor=white) ![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white) ![Salesforce](https://img.shields.io/badge/Salesforce-%2300A1E0.svg?style=for-the-badge&logo=salesforce&logoColor=white) ![Arduino](https://img.shields.io/badge/Arduino-00979D?style=for-the-badge&logo=arduino&logoColor=white) ![Material UI](https://img.shields.io/badge/Material%20UI-007FFF?style=for-the-badge&logo=mui&logoColor=white) ![Bootstrap](https://img.shields.io/badge/Bootstrap-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white) ![Android Studio](https://img.shields.io/badge/Android%20Studio-3DDC84?style=for-the-badge&logo=android-studio&logoColor=white) ![Jupyter](https://img.shields.io/badge/Jupyter-F37626?style=for-the-badge&logo=jupyter&logoColor=white) ![AutoCAD](https://img.shields.io/badge/AutoCAD-0696D7?style=for-the-badge&logo=autocad&logoColor=white)

---

## 💻 Featured Projects

Here are some of the key projects showcased in this portfolio:

| Project Name | Description | Tech Stack |
| :--- | :--- | :--- |
| **Admin Dashboard** | A responsive MERN-based admin panel with role-based access and financial visualization charts. | React, Node.js, Mui, Nivo Charts |
| **Crop Advisor** | ML-powered agriculture assistant for crop recommendation and disease detection. | Python, Streamlit, ML (Random Forest) |
| **Heart Disease Prediction** | GUI-based medical app using Logistic Regression for heart disease risk analysis. | Python, Tkinter, Matplotlib |
| **Student Management System** | A GUI-based system for managing student records and performance tracking. | Python, Tkinter, MySQL |
| **AI Chatbot** | Real-time chat app using Gemini API with voice input support. | React, Gemini API |
| **Cargo Tracking System** | Web app for cargo/inventory management with QR code generation. | React, Node.js, MongoDB |
| **LMS SaaS App** | AI-driven learning platform with subject-specific companions and progress tracking. | Next.js, AI Integration |
| **Voice-to-Notes Generator** | AI tool converting lecture audio into notes, summaries, and flashcards. | Streamlit, OpenAI Whisper |
| **Apex Assistant** | Privacy-first, offline voice assistant for system control and app launching. | Java, Vosk |
| **Currency Converter** | Native Android app for real-time exchange rate conversions. | Java, Android SDK |

---

## 📜 Certifications

I have continuously upskilled myself through various certifications:

-   **Salesforce Certified Agentforce Specialist** (Dec 2025)
-   **Deloitte Australia - Data Analytics Job Simulation** (May 2025)
-   **Accenture Nordics - Software Engineering Job Simulation** (May 2025)
-   **AI For Everyone** - DeepLearning.AI (Nov 2023)
-   **Google Data Analytics Foundations** (Jun 2023)
-   **Introduction to Generative AI** - AWS (Jun 2025)
-   **GitHub Foundations & Fundamentals** (Aug 2025)
-   *And many more...*

---

## ⚙️ Installation & Setup

To run this project locally on your machine:

1.  **Clone the Repository**
    ```bash
    git clone https://github.com/Subhapreet21/Portfolio-Website.git
    cd Portfolio-Website
    ```

2.  **Install Dependencies**
    ```bash
    npm install
    ```

3.  **Configure Environment Variables**
    Create a `.env` file in the root directory:
    ```env
    VITE_EMAILJS_SERVICE_ID=your_service_id
    VITE_EMAILJS_TEMPLATE_ID=your_template_id
    VITE_EMAILJS_PUBLIC_KEY=your_public_key
    ```

4.  **Run Development Server**
    ```bash
    npm run dev
    ```

5.  **Build for Production**
    ```bash
    npm run build
    ```

---

## 📂 Project Structure

```bash
portfolio/
├── public/              # Static assets (favicons, manifest)
├── src/
│   ├── assets/          # Images, PDFs (Certificates, Projects)
│   ├── components/      # React Components
│   │   ├── Hero.jsx     # Landing section
│   │   ├── Skills.jsx   # Skills grid with icons
│   │   ├── Projects.jsx # Project carousel/grid
│   │   ├── Certifications.jsx # Certificate cards
│   │   ├── Contact.jsx  # Contact form
│   │   └── ...
│   ├── MainLayout/      # Layout wrappers
│   ├── App.jsx          # Main App Logic & Theme Setup
│   └── main.jsx         # Entry Point
├── package.json         # Dependencies & Scripts
└── vite.config.js       # Vite Configuration
```

---

## 🤝 Contact Me

I am always open to discussing new projects, creative ideas, or opportunities to be part of your visions.

-   **LinkedIn**: [Subhapreet Patro](https://www.linkedin.com/in/subhapreet-patro-444a02277)
-   **GitHub**: [Subhapreet21](https://github.com/Subhapreet21)
-   **Email**: subhapreetpatro2004@gmail.com

---
*Built with ❤️ by Subhapreet Patro*
