from flask import Flask, request, jsonify, render_template, session
import sqlite3
import joblib
import pandas as pd
import numpy as np
import os
import pickle
from jinja2 import ChoiceLoader, FileSystemLoader
from werkzeug.security import generate_password_hash, check_password_hash
import webbrowser

# ====================================================
# 🔥 FIXED DETAILED PATH ENGINE (Hugging Face Fixed)
# ====================================================
BASE_DIR = os.path.dirname(os.path.abspath(__file__))  # /app/backend
backend_dir = BASE_DIR
project_root = os.path.dirname(BASE_DIR)              # /app

# Folders ke sahi absolute paths
PAGES_DIR = os.path.join(project_root, "pages")        # /app/pages
STATIC_DIR = project_root                              # /app (Main folder jahan css/js hain)
MODEL_PATH = os.path.join(backend_dir, 'mindmate_model.pkl') 

# Flask ko direct aur clear instructions do
app = Flask(__name__, 
            template_folder=PAGES_DIR,
            static_folder=STATIC_DIR,
            static_url_path="")

app.secret_key = "mindmate_premium_ultra_secret_key_encryption"

# Jinja Fallback Loader - Yeh pages dhoondhne mein kabhi fail nahi hoga
possible_template_dirs = [PAGES_DIR, project_root]
app.jinja_env.loader = ChoiceLoader([
    FileSystemLoader(d) for d in possible_template_dirs if os.path.exists(d)
])
# ====================================================
# PORTABLE SQLITE ENGINE (WITH HISTORY TRACKING TABLE)
# ====================================================
db_path = os.path.join(backend_dir, "mindmate.db")

def init_sqlite_db():
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    
    # 1. Base Users Table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        fullname TEXT NOT NULL,
        username TEXT UNIQUE NOT NULL,
        email TEXT NOT NULL,
        phone TEXT NOT NULL,
        password TEXT NOT NULL
    )
    """)
    
    # 2. FIXED HISTORY ENGINE: Stores historic logs for plots tracking
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS assessment_history (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL,
        wellness_score REAL NOT NULL,
        stress_score REAL NOT NULL,
        burnout_score REAL NOT NULL,
        anxiety_score REAL,
        depression_score REAL,
        sleep_disorder_score REAL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
    """)
    
    conn.commit()
    conn.close()

# Initialize database schemas
init_sqlite_db()

# ====================================================
# MACHINE LEARNING MODEL LOADING CORE
# ====================================================
model = None
try:
    model = joblib.load(MODEL_PATH)
    print("\n[AI MODEL]: MindMate Brain Model Loaded Successfully! (Status: OK)")
except Exception as e:
    print(f"[AI MODEL ERROR]: Could not load pkl file via joblib. Reason: {e}")
    # Fallback to pickle if joblib fails
    try:
        with open(MODEL_PATH, 'rb') as f:
            model = pickle.load(f)
        print("\n[AI MODEL]: MindMate Brain Model Loaded Successfully via Pickle! (Status: OK)")
    except Exception as e2:
        print(f"[AI MODEL ERROR]: Could not load pkl file via pickle either. Reason: {e2}")
        model = None

def get_level(score):
    if score < 4: return "Low"
    elif score < 7: return "Medium"
    else: return "High"

# ====================================================
# HTML PAGES ROUTING SYSTEM (WITH JINJA DATA & GRAPH RENDERING)
# ====================================================
@app.route("/")
@app.route("/welcome")
def welcome():
    return render_template("welcome.html")

@app.route("/dashboard")
def dashboard():
    username = session.get('logged_user', 'User')
    
    # FETCH TIMELINE: Database se pichle max 7 records uthao chart paths coordinates ke liye
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    cursor.execute("""
        SELECT wellness_score, stress_score, burnout_score 
        FROM assessment_history 
        WHERE username=? 
        ORDER BY id DESC LIMIT 7
    """, (username,))
    history_rows = cursor.fetchall()
    conn.close()
    
    # Graph engine default points structures (fallbacks standard arrays)
    wellness_pts, stress_pts, burnout_pts = [7,7,7,7,7,7,7], [3,3,3,3,3,3,3], [2,2,2,2,2,2,2]
    
    if history_rows:
        # Purane rows records list array reverse sync karo taaki graphs left to right clean load ho
        history_rows.reverse()
        wellness_pts = [row[0] for row in history_rows]
        stress_pts = [row[1] for row in history_rows]
        burnout_pts = [row[2] for row in history_rows]

    # ====================================================
    # DYNAMIC AI INSIGHT ENGINE LOGIC
    # ====================================================
    current_stress = session.get('stress_score', 0)
    current_wellness = session.get('wellness_score', 100)
    
    ai_headline = "Analysis Pending"
    ai_suggestion = "Complete your daily check-in to generate insights."

    # Rules basis engine evaluation
    if current_stress > 6:
        ai_headline = "High Stress Alert detected!"
        ai_suggestion = "Your matrix shows high workload strains. Take a 15-minute screen break, prioritize deep breathing, and sleep on time."
    elif current_stress > 4:
        ai_headline = "Moderate stress fluctuations noticed."
        ai_suggestion = "Academic or financial scores are causing mild strain. Try listening to calming music or going for a short walk."
    elif current_wellness > 7:
        ai_headline = "Excellent mental wellness matrix! ✨"
        ai_suggestion = "Your lifestyle metrics are completely balanced. Keep up this amazing consistency in sleep and activity routines."
    elif current_wellness > 0:
        ai_headline = "Stable Wellness Summary."
        ai_suggestion = "Your recovery parameters are on track. Continue focusing on healthy daily check-in tasks."

    return render_template(
        "dashboard.html",
        stress_score=current_stress,
        stress_level=session.get('stress_level', "No Data"),
        anxiety_score=session.get('anxiety_score', 0),
        anxiety_level=session.get('anxiety_level', "No Data"),
        depression_score=session.get('depression_score', 0),
        depression_level=session.get('depression_level', "No Data"),
        burnout_score=session.get('burnout_score', 0),
        burnout_level=session.get('burnout_level', "No Data"),
        sleep_disorder_score=session.get('sleep_disorder_score', 0),
        sleep_disorder_level=session.get('sleep_disorder_level', "No Data"),
        wellness_score=current_wellness,
        wellness_level=session.get('wellness_level', "Good"),
        
        # Array packages passed into ChartJS canvas
        wellness_history=wellness_pts,
        stress_history=stress_pts,
        burnout_history=burnout_pts,
        
        # NLP insights bindings
        ai_headline=ai_headline,
        ai_suggestion=ai_suggestion
    )

@app.route("/about")
def about():
    return render_template("about.html")

@app.route("/contact")
def contact():
    return render_template("contact.html")

@app.route("/feature")
def feature():
    return render_template("feature.html")

@app.route("/emergency")
def emergency():
    return render_template("emergency.html")

@app.route("/questionnaire")
def questionnaire():
    return render_template("questionnaire.html")

@app.route("/wellness-twin")
def wellness_twin():
    return render_template("wellness-twin.html")

@app.route("/recovery-board")
def recovery_board():
    return render_template("recovery-board.html")

@app.route("/trigger-analysis")
def trigger_analysis():
    return render_template("trigger-analysis.html")

@app.route("/profile")
def profile():
    return render_template("profile.html")

@app.route("/help")
def help():
    return render_template("help.html")

# ====================================================
# BACKEND AUTHENTICATION APIS
# ====================================================
@app.route("/register", methods=["POST"])
def register():
    try:
        data = request.json
        fullname = data["fullname"]
        username = data["username"]
        email = data["email"]
        phone = data["phone"]
        password = data["password"]

        conn = sqlite3.connect(db_path)
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM users WHERE username=?", (username,))
        if cursor.fetchone():
            conn.close()
            return jsonify({"success": False, "message": "Username already exists"})

        hashed_password = generate_password_hash(password)
        cursor.execute("""
            INSERT INTO users (fullname, username, email, phone, password)
            VALUES (?, ?, ?, ?, ?)
        """, (fullname, username, email, phone, hashed_password))
        
        conn.commit()
        conn.close()
        return jsonify({"success": True, "message": "Registration Successful"})
    except Exception as e:
        return jsonify({"success": False, "message": str(e)})

@app.route("/login", methods=["POST"])
def login():
    try:
        data = request.json
        username = data["username"]
        password = data["password"]

        conn = sqlite3.connect(db_path)
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM users WHERE username=?", (username,))
        user = cursor.fetchone()
        conn.close()

        if user and check_password_hash(user[5], password):
            session['logged_user'] = username 
            return jsonify({"success": True, "username": username})
        else:
            return jsonify({"success": False, "message": "Invalid Username or Password"})
    except Exception as e:
        return jsonify({"success": False, "message": str(e)})
    
# ====================================================
# 🔥 PERMANENT SYNC: DROP UNSEEN FEATURES FOR MODEL FIT
# ====================================================
@app.route("/api/submit-assessment", methods=["POST"])
def submit_assessment():
    if model is None:
        return jsonify({"success": False, "message": "ML Model pkl file not loaded on server."}), 500
    try:
        data = request.json
        if not data:
            return jsonify({"success": False, "message": "No input payload received"}), 400

        username = session.get('logged_user', 'GuestUser') 
        
        raw_features = [
            int(data.get("age", 22)),                           # 1. age
            int(data.get("gender", 1)),                         # 2. gender
            int(data.get("course", 1)),                         # 3. course
            int(data.get("year", 3)),                           # 4. year
            float(data.get("study_hours", 6.0)),                # 5. daily_study_hours
            float(data.get("sleep_hours", 7.0)),                # 6. daily_sleep_hours
            float(data.get("screen_time", 4.0)),                # 7. screen_time_hours
            float(data.get("physical_activity", 1.0)),          # 8. physical_activity_hours
            float(data.get("attendance", 75.0)),                # 9. attendance_percentage
            float(data.get("cgpa", 7.5)),                       # 10. cgpa
            float(data.get("academic_pressure", 5.0)),          # 11. academic_pressure_score
            float(data.get("financial_stress", 4.0)),           # 12. financial_stress_score
            float(data.get("social_support", 6.0)),             # 13. social_support_score
            float(data.get("family_support", 7.0)),             # 14. family_support_score
            float(data.get("peer_relationship", 6.0)),          # 15. peer_relationship_score
            float(data.get("career_uncertainty", 5.0)),         # 16. career_uncertainty_score
            float(data.get("sleep_quality", 6.0)),              # 17. sleep_quality
            float(data.get("internet_quality", 4.0)),           # 18. internet_quality
            float(data.get("caffeine_intake", 2.0)),            # 19. caffeine_intake_per_day
            float(data.get("part_time_job_hours", 0.0)),        # 20. part_time_job_hours
            float(data.get("extracurricular", 3.0))             # 21. extracurricular_hours
        ]

        feature_names = [
            'age', 'gender', 'course', 'year', 'daily_study_hours',
            'daily_sleep_hours', 'screen_time_hours', 'physical_activity_hours',
            'attendance_percentage', 'cgpa', 'academic_pressure_score',
            'financial_stress_score', 'social_support_score',
            'family_support_score', 'peer_relationship_score',
            'career_uncertainty_score', 'sleep_quality', 'internet_quality',
            'caffeine_intake_per_day', 'part_time_job_hours', 'extracurricular_hours'
        ]
        
        input_data = pd.DataFrame([raw_features], columns=feature_names)
        
        prediction = model.predict(input_data)
        scores = prediction[0]

        s_score = round(float(scores[0]), 2)
        anx_score = round(float(scores[1]), 2)
        dep_score = round(float(scores[2]), 2)
        b_score = round(float(scores[3]), 2)
        sleep_score = round(float(scores[4]), 2)
        w_score = round(float(scores[5]), 2)
        
        session['stress_score'] = s_score
        session['stress_level'] = get_level(scores[0])
        session['anxiety_score'] = anx_score
        session['anxiety_level'] = get_level(scores[1])
        session['depression_score'] = dep_score
        session['depression_level'] = get_level(scores[2])
        session['burnout_score'] = b_score
        session['burnout_level'] = get_level(scores[3])
        session['sleep_disorder_score'] = sleep_score
        session['sleep_disorder_level'] = get_level(scores[4])
        session['wellness_score'] = w_score
        session['wellness_level'] = get_level(scores[5])

        conn = sqlite3.connect(db_path)
        cursor = conn.cursor()
        cursor.execute("""
            INSERT INTO assessment_history 
            (username, wellness_score, stress_score, burnout_score, anxiety_score, depression_score, sleep_disorder_score)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        """, (username, w_score, s_score, b_score, anx_score, dep_score, sleep_score))
        conn.commit()
        conn.close()

        print(f"\n[AI MATRIX ENGINE PERFECT SYNC]: Log committed for user: {username}")
        return jsonify({"success": True, "message": "AI metrics computed successfully"}), 200

    except Exception as e:
        print(f"\n[CRITICAL PIPELINE EXCEPTION ERROR]: {str(e)}")
        return jsonify({"success": False, "message": str(e)}), 500
    
@app.route("/predict", methods=["POST"])
def legacy_predict():
    return submit_assessment()

# ====================================================
# 🔥 DYNAMIC PROFILE PICTURE UPDATE ENGINE
# ====================================================
@app.route("/api/update-profile-pic", methods=["POST"])
def update_profile_pic():
    try:
        data = request.json
        if not data or "image_url" not in data:
            return jsonify({"success": False, "message": "No image source found"}), 400
            
        session['profile_pic'] = data["image_url"]
        return jsonify({"success": True, "message": "Profile picture synchronized globally!"}), 200
    except Exception as e:
        return jsonify({"success": False, "message": str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=7860, debug=False)