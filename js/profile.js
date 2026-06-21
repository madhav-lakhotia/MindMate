// =========================
// LOAD USER DATA
// =========================
let user = JSON.parse(localStorage.getItem("userData")) || {
    name: "lal singh",
    email: "lal@gmail.com",
    role: "TEACHER",
    age: 23,
    gender: "Male",
    height: "175 cm",
    weight: "65 kg",
    location: "India",

    branch: "AI & DS",
    year: "3rd Year",
    semester: "5th Semester",
    

    sleepGoal: "7-8 Hrs",
    waterGoal: "2.5 L/day",
    stepsGoal: "7000 Steps",
    screenGoal: "< 4 hrs",
    stressGoal: "Daily",
    memberSince: "May 2024"
};

function renderProfile() {
    document.getElementById("userName").textContent = user.name;
    document.getElementById("userEmail").textContent = user.email;
    document.getElementById("userRole").textContent = user.role;

    document.getElementById("age").textContent = user.age;
    document.getElementById("gender").textContent = user.gender;
    document.getElementById("height").textContent = user.height.includes("cm") ? user.height : user.height + " cm";
    document.getElementById("weight").textContent = user.weight.includes("kg") ? user.weight : user.weight + " kg";
    document.getElementById("location").textContent = user.location;

    if (document.getElementById("branch"))
    document.getElementById("branch").textContent = user.branch;

    if (document.getElementById("year"))
    document.getElementById("year").textContent = user.year;

    if (document.getElementById("semester"))
    document.getElementById("semester").textContent = user.semester;

    if (document.getElementById("academicLoad"))
    document.getElementById("academicLoad").textContent = user.academicLoad;

    if (document.getElementById("examStatus"))
    document.getElementById("examStatus").textContent = user.examStatus;

    document.getElementById("sleepGoal").textContent = user.sleepGoal;
    document.getElementById("waterGoal").textContent = user.waterGoal;
    document.getElementById("stepsGoal").textContent = user.stepsGoal;
    document.getElementById("screenGoal").textContent = user.screenGoal;
    document.getElementById("stressGoal").textContent = user.stressGoal;
    document.getElementById("memberSince").textContent = user.memberSince;
}

function openEditProfile() {
    document.getElementById("editName").value = user.name;
    document.getElementById("editEmail").value = user.email;
    document.getElementById("editAge").value = user.age;
    document.getElementById("editGender").value = user.gender;
    document.getElementById("editHeight").value = parseInt(user.height) || "";
    document.getElementById("editWeight").value = parseInt(user.weight) || "";
    document.getElementById("editRole").value = user.role;
    document.getElementById("editLocation").value = user.location;
}

function saveProfile() {
    user.name = document.getElementById("editName").value;
    user.email = document.getElementById("editEmail").value;
    user.age = document.getElementById("editAge").value;
    user.gender = document.getElementById("editGender").value;

    const height = document.getElementById("editHeight").value;
    const weight = document.getElementById("editWeight").value;

    user.height = height ? height + " cm" : "cm";
    user.weight = weight ? weight + " kg" : "kg";
    user.role = document.getElementById("editRole").value;
    user.location = document.getElementById("editLocation").value;

    localStorage.setItem("userData", JSON.stringify(user));
    renderProfile();

    bootstrap.Modal.getInstance(document.getElementById("editProfileModal")).hide();
}

function openAcademicModal() {
    document.getElementById("editBranch").value = user.branch || "";
    document.getElementById("editYear").value = user.year || "";
    document.getElementById("editSemester").value = user.semester || "";
}

function saveAcademicInfo() {
    user.branch = document.getElementById("editBranch").value;
    user.year = document.getElementById("editYear").value;
    user.semester = document.getElementById("editSemester").value;
    user.academicLoad = document.getElementById("editAcademicLoad").value;
    user.examStatus = document.getElementById("editExamStatus").value;

    localStorage.setItem("userData", JSON.stringify(user));

    renderProfile();

    bootstrap.Modal.getInstance(
        document.getElementById("editAcademicModal")
    ).hide();
}
function openGoalsModal() {
    document.getElementById("editSleepGoal").value = user.sleepGoal;
    document.getElementById("editWaterGoal").value = user.waterGoal;
    document.getElementById("editStepsGoal").value = user.stepsGoal;
    document.getElementById("editScreenGoal").value = user.screenGoal;
    document.getElementById("editStressGoal").value = user.stressGoal;
}

function saveGoals() {
    user.sleepGoal = document.getElementById("editSleepGoal").value;
    user.waterGoal = document.getElementById("editWaterGoal").value;
    user.stepsGoal = document.getElementById("editStepsGoal").value;
    user.screenGoal = document.getElementById("editScreenGoal").value;
    user.stressGoal = document.getElementById("editStressGoal").value;

    localStorage.setItem("userData", JSON.stringify(user));
    renderProfile();

    bootstrap.Modal.getInstance(document.getElementById("editGoalsModal")).hide();
}


// ====================================================
// 🔥 100% FIXED GLOBAL SYNC AVATAR HANDLING ENGINE
// ====================================================
document.addEventListener("DOMContentLoaded", () => {
    const cameraBtn = document.getElementById('cameraBtn');
    const avatarInput = document.getElementById('avatarInput');
    const avatarImg = document.getElementById('userAvatar');
    const avatarModalEl = document.getElementById('avatarModal');
    const avatarLarge = document.getElementById('avatarLarge');

    // 1. Desktop fallback image loader
    if (localStorage.getItem('userData')) {
        try {
            const localUser = JSON.parse(localStorage.getItem('userData'));
            if (localUser && localUser.avatar && avatarImg) {
                avatarImg.src = localUser.avatar;
            }
        } catch(e) { console.log("Local user cache bypass."); }
    }

    if (cameraBtn && avatarInput) {
        cameraBtn.addEventListener('click', (e) => {
            e.preventDefault(); // Form reload check block
            avatarInput.click();
        });
    }

    if (avatarInput) {
        avatarInput.addEventListener('change', (e) => {
            const file = e.target.files && e.target.files[0];
            if (!file) return;
            
            const reader = new FileReader();
            reader.onload = function(evt) {
                const base64Image = evt.target.result;
                
                // Live visual swap on desktop viewports
                if (avatarImg) avatarImg.src = base64Image;
                
                // Write backend cache payload safely
                try {
                    let userObj = JSON.parse(localStorage.getItem('userData')) || {};
                    userObj.avatar = base64Image;
                    localStorage.setItem('userData', JSON.stringify(userObj));
                } catch(err) { console.log("localStorage backup mute."); }

                // 2. 🔥 LIVE FLASK SESSION SYNC PIPELINE (FIXED)
                fetch('/api/update-profile-pic', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ "image_url": base64Image })
                })
                .then(res => res.json())
                .then(data => {
                    if (data.success) {
                        console.log("Profile picture synchronized globally in Flask Session!");
                    } else {
                        console.error("Session sync failed:", data.message);
                    }
                })
                .catch(err => console.error("Global avatar sync API crashed:", err));
            };
            reader.readAsDataURL(file);
        });
    }

    if (avatarImg && avatarModalEl && avatarLarge) {
        avatarImg.addEventListener('click', () => {
            avatarLarge.src = avatarImg.src;
            if (typeof bootstrap !== 'undefined') {
                new bootstrap.Modal(avatarModalEl).show();
            }
        });
    }
});