---
title: MindMate
emoji: 🧠
colorFrom: indigo
colorTo: purple
sdk: docker
app_port: 7860
pinned: false
---

# 🧠 MindMate: Your Personal AI-Powered Wellness Companion

![MindMate Banner](https://img.shields.io/badge/Status-Active-brightgreen)
![Python](https://img.shields.io/badge/Python-3.9+-blue)
![Flask](https://img.shields.io/badge/Flask-Framework-lightgrey)

MindMate is an intelligent, AI-driven mental wellness tracking platform designed to help students and individuals monitor their stress, burnout, and overall mental wellness through data-driven insights.

---

## 🚀 Key Features

*   **AI-Powered Analysis:** Predicts wellness scores using custom Machine Learning models.
*   **Dynamic Dashboard:** Real-time visualization of stress and burnout trends using interactive charts.
*   **Personalized Insights:** Smart recommendations based on individual lifestyle metrics.
*   **Check-in Engine:** Daily assessment tools to keep track of your mental health journey[cite: 1].
*   **Secure Authentication:** User-specific profiles with encrypted login sessions[cite: 1].

---

## 🛠️ Tech Stack

*   **Backend:** Python, Flask[cite: 1]
*   **Database:** SQLite3 (Portable & Persistent)[cite: 1]
*   **ML Engine:** Scikit-Learn/Joblib for predictive modeling[cite: 1]
*   **Frontend:** HTML5, CSS3, JavaScript (Jinja2 Templates)[cite: 1]
*   **Deployment:** Hugging Face Spaces

---

## 📦 Project Structure

```text
├── backend/
│   ├── app.py            # Core Flask Logic & API Routes
│   ├── mindmate_model.pkl # AI Prediction Model
│   └── mindmate.db       # User & History Database
├── pages/                # HTML Templates
├── static/               # CSS, JS, and Assets
└── README.md             # Documentation