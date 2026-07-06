// ====================================================
// MINDMATE ASSESSMENT FORM LOGIC ENGINE WITH AUTO-SAVE & BUBBLES
// ====================================================

// REFRESH ENGINE: Load previously saved step, or default to 1
let currentSection = parseInt(localStorage.getItem("assessmentCurrentStep")) || 1;
const totalSections = 4;

const sliders = [
    { id: 'slide_study', badge: 'val_study', suffix: ' hrs' },
    { id: 'slide_sleep', badge: 'val_sleep', suffix: ' hrs' },
    { id: 'slide_screen', badge: 'val_screen', suffix: ' hrs' },
    { id: 'slide_physical', badge: 'val_physical', suffix: '/10' },
    { id: 'slide_attendance', badge: 'val_attendance', suffix: '%' },
    { id: 'slide_cgpa', badge: 'val_cgpa', suffix: '' },
    { id: 'slide_pressure', badge: 'val_pressure', suffix: '/10' },
    { id: 'slide_career', badge: 'val_career', suffix: '/10' },
    { id: 'slide_social', badge: 'val_social', suffix: '/10' },
    { id: 'slide_family', badge: 'val_family', suffix: '/10' },
    { id: 'slide_peer', badge: 'val_peer', suffix: '/10' },
    { id: 'slide_finance', badge: 'val_finance', suffix: '/10' },
    { id: 'slide_sleep_qual', badge: 'val_sleep_qual', suffix: '/10' },
    { id: 'slide_caffeine', badge: 'val_caffeine', suffix: ' cups' },
    { id: 'slide_extra', badge: 'val_extra', suffix: ' hrs' }
];

document.addEventListener("DOMContentLoaded", () => {
    // 1. Restore previously saved slider values if they exist
    sliders.forEach(item => {
        const sliderEl = document.getElementById(item.id);
        const badgeEl = document.getElementById(item.badge);
        
        if (sliderEl && badgeEl) {
            // Check if there's a saved value for this slider
            const savedValue = localStorage.getItem(`saved_${item.id}`);
            if (savedValue !== null) {
                sliderEl.value = savedValue;
                badgeEl.textContent = savedValue + item.suffix;
            }

            // Real-time tracking + Auto-save value on change
            sliderEl.addEventListener('input', (e) => {
                badgeEl.textContent = e.target.value + item.suffix;
                localStorage.setItem(`saved_${item.id}`, e.target.value); 
            });
        }
    });

    // 2. Initialize the correct section view on load/refresh
    initAssessmentView();
});

// Setup the initial view based on saved currentSection state
function initAssessmentView() {
    for (let i = 1; i <= totalSections; i++) {
        document.getElementById(`section${i}`).classList.remove('active-section');
    }
    
    const activeTarget = document.getElementById(`section${currentSection}`);
    if (activeTarget) {
        activeTarget.classList.add('active-section');
    }
    
    updateMetricsUI();
}

function navigateSection(direction) {
    const activeCurrent = document.getElementById(`section${currentSection}`);
    activeCurrent.classList.remove('active-section');
    
    setTimeout(() => {
        currentSection += direction;
        if (currentSection < 1) currentSection = 1;
        if (currentSection > totalSections) currentSection = totalSections;

        // Save current step to localStorage on navigation change
        localStorage.setItem("assessmentCurrentStep", currentSection);

        const activeTarget = document.getElementById(`section${currentSection}`);
        activeTarget.classList.add('active-section');

        updateMetricsUI();
    }, 200);
}

function updateMetricsUI() {
    document.getElementById('stepIndicator').textContent = `Step ${currentSection} of ${totalSections}`;
    const currentPercentage = (currentSection / totalSections) * 100;
    document.getElementById('percentageLabel').textContent = `${currentPercentage}% Completed`;
    document.getElementById('progressBarFill').style.width = `${currentPercentage}%`;

    const btnPrev = document.getElementById('btnPrev');
    const btnNext = document.getElementById('btnNext');
    const btnSubmit = document.getElementById('btnSubmit');

    btnPrev.disabled = currentSection === 1;

    if (currentSection === totalSections) {
        btnNext.classList.add('d-none');
        btnSubmit.classList.remove('d-none');
    } else {
        btnNext.classList.remove('d-none');
        btnSubmit.classList.add('d-none');
    }
}

// ====================================================
// 🔥 REAL AI MODEL LINKED SUBMISSION PROCESSOR (REPLACE THIS)
// ====================================================
function submitAssessment() {
    // 1. Clear assessment cache if needed
    if (typeof clearAssessmentCache === "function") {
        clearAssessmentCache();
    }

    // 2. Sliders ka saara real data collect karo object mein
    const assessmentData = {
        study_hours: parseFloat(document.getElementById('slide_study')?.value || 0),
        sleep_hours: parseFloat(document.getElementById('slide_sleep')?.value || 0),
        screen_time: parseFloat(document.getElementById('slide_screen')?.value || 0),
        physical_activity: parseFloat(document.getElementById('slide_physical')?.value || 0),
        attendance: parseFloat(document.getElementById('slide_attendance')?.value || 0),
        cgpa: parseFloat(document.getElementById('slide_cgpa')?.value || 0),
        academic_pressure: parseFloat(document.getElementById('slide_pressure')?.value || 0),
        career_uncertainty: parseFloat(document.getElementById('slide_career')?.value || 0),
        social_support: parseFloat(document.getElementById('slide_social')?.value || 0),
        family_support: parseFloat(document.getElementById('slide_family')?.value || 0),
        peer_relationship: parseFloat(document.getElementById('slide_peer')?.value || 0),
        financial_stress: parseFloat(document.getElementById('slide_finance')?.value || 0),
        sleep_quality: parseFloat(document.getElementById('slide_sleep_qual')?.value || 0),
        caffeine_intake: parseFloat(document.getElementById('slide_caffeine')?.value || 0),
        extracurricular: parseFloat(document.getElementById('slide_extra')?.value || 0)
    };

    // ====================================================
    // 🚀 NEW: TIMELINE HISTORY STORAGE ENGINE (Bina Purana Code Chhede)
    // ====================================================
    try {
        // Pehle se saved saare check-ins pull karo, nahi to khali array
        let checkInHistory = JSON.parse(localStorage.getItem('checkInHistory')) || [];

        // Naya timestamped record taiyar karo
        const newRecord = {
            id: 'checkin_' + Date.now(), 
            date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }),
            metrics: assessmentData 
        };

        // Sabse upar naya record dalo aur save kar do
        checkInHistory.unshift(newRecord); 
        localStorage.setItem('checkInHistory', JSON.stringify(checkInHistory));
        
        // Dashboard aur purane pages ke support ke liye userData bhi lock kar do
        localStorage.setItem('userData', JSON.stringify(assessmentData));
        console.log("Timeline history successfully updated!");
    } catch(e) {
        console.error("History tracking logged an error:", e);
    }
    // ====================================================
    // 🏁 END OF HISTORY STORAGE
    // ====================================================


    // 3. UI switch karo (Heart loading screen active karo) - UNTOUCHED ORIGINAL CODE
    document.getElementById('assessmentCoreContainer').classList.add('d-none');
    const resultView = document.getElementById('assessmentResultContainer');
    if (resultView) resultView.classList.remove('d-none');

    let currentPct = 0;
    const barFill = document.getElementById('overviewBarFill');
    const txtPercentage = document.getElementById('overviewPercentage');
    const statusText = document.getElementById('loadingStatusText');
    const heartSvg = document.getElementById('processingHeart');

    // 4. Progress bar simulation (90% tak normal chalega fast) - UNTOUCHED ORIGINAL CODE
    const progressTimer = setInterval(() => {
        if (currentPct < 90) {
            currentPct += 1;
            if (barFill) barFill.style.width = currentPct + '%';
            if (txtPercentage) txtPercentage.textContent = currentPct + '%';

            if (statusText) {
                if (currentPct === 35) {
                    statusText.textContent = "Analyzing academic pressures and study strains...";
                } else if (currentPct === 70) {
                    statusText.textContent = "Compiling support systems and lifestyle matrix...";
                } else if (currentPct === 85) {
                    statusText.textContent = "Connecting to MindMate AI Prediction Engine...";
                }
            }
        }
    }, 30);
    
    // 5. ASLI API FETCH CALL: Python Backend Models to connect
    fetch('/api/submit-assessment', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(assessmentData)
    })
    .then(response => {
        if (!response.ok) throw new Error("Backend connection failed");
        return response.json();
    })
    .then(data => {
        // Data successfully sent and processed by Model! Now complete the bar fast to 100%
        clearInterval(progressTimer);
        
        const finalTimer = setInterval(() => {
            if (currentPct < 100) {
                currentPct += 2;
                if (barFill) barFill.style.width = currentPct + '%';
                if (txtPercentage) txtPercentage.textContent = currentPct + '%';
            } else {
                clearInterval(finalTimer);
                
                // 100% Success States Trigger
                statusText.textContent = "Profile Compiled Successfully!";
                statusText.style.color = "#ec4899";
                if (heartSvg) heartSvg.classList.add('complete-heart');
                
                const step5 = document.getElementById('step5Node');
                if (step5) {
                    step5.classList.remove('current-active');
                    step5.classList.add('finished');
                }

                // Smoothly reveal the "Go to Dashboard" button container card
                const successCard = document.getElementById('successBoxCard');
                if (successCard) {
                    successCard.classList.remove('d-none'); 
                    setTimeout(() => {
                        successCard.classList.add('show-success');
                        successCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                    }, 100);
                }
            }
        }, 15);
    })
    .catch(error => {
        clearInterval(progressTimer);
        console.error("Error sending data to AI Model:", error);
        statusText.textContent = "❌ Model Connection Error. Please refresh and try again.";
        statusText.style.color = "#ff4d4d";
    });
}

// Utility function to clear current assessment data cache upon full completion
function clearAssessmentCache() {
    localStorage.removeItem("assessmentCurrentStep");
    sliders.forEach(item => {
        localStorage.removeItem(`saved_${item.id}`);
    });
}
