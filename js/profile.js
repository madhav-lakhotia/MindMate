// ====================================================
// 🧠 MINDMATE - GLOBAL PROFILE SYSTEM (ANTI-GLITCH)
// ====================================================

document.addEventListener("DOMContentLoaded", () => {
    // Elements Selector
    const cameraBtn = document.getElementById('cameraBtn');
    const avatarInput = document.getElementById('avatarInput');
    const userAvatarImg = document.getElementById('userAvatar');
    const avatarModalElement = document.getElementById('avatarModal');
    const avatarLargeImg = document.getElementById('avatarLarge');

    // ==========================================
    // 1. BROWSE & LIVE PROFILE PICTURE UPLOAD
    // ==========================================
    if (cameraBtn && avatarInput) {
        cameraBtn.style.cursor = "pointer";
        
        cameraBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation(); // Zoom event trigger hone se rokega
            avatarInput.click(); // Hidden input file browser kholega
        });
    }

    if (avatarInput) {
        avatarInput.addEventListener('change', function(e) {
            const file = e.target.files && e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(evt) {
                    const base64Image = evt.target.result;
                    
                    // Frontend par image turant update karo
                    if (userAvatarImg) userAvatarImg.src = base64Image;
                    
                    // Flask backend (`app.py`) ko safe Base64 string bhej rahe hain
                    fetch('/update_avatar', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ avatar_url: base64Image })
                    })
                    .then(res => res.json())
                    .then(data => {
                        if (data.success) {
                            alert("Profile picture updated successfully!");
                            // Direct force refresh taaki SQL database se aayi image load ho
                            window.location.href = "/profile"; 
                        } else {
                            alert("Error: " + data.message);
                        }
                    })
                    .catch(err => {
                        console.error("Upload error:", err);
                        alert("Server connection failed. Image not saved.");
                    });
                };
                reader.readAsDataURL(file);
            }
        });
    }

    // ==========================================
    // 2. IMAGE ENLARGE (ZOOM POP-UP MODAL)
    // ==========================================
    if (userAvatarImg && avatarModalElement && avatarLargeImg) {
        userAvatarImg.style.cursor = "pointer";

        userAvatarImg.addEventListener('click', function() {
            avatarLargeImg.src = this.src; // Choti image ka source bade modal me copy
            
            if (typeof bootstrap !== 'undefined') {
                const bootstrapModal = new bootstrap.Modal(avatarModalElement);
                bootstrapModal.show(); // Zoom Modal popup display karega
            } else {
                console.error("Bootstrap is not defined! HTML check karo.");
            }
        });
    }
});

// ==========================================
// 3. GLOBAL LOGOUT SYSTEM
// ==========================================
function logout() {
    localStorage.clear(); // Saare purane frontend cache ko delete karne ke liye
    window.location.href = "/";
}