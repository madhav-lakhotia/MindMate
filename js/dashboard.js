// JS for dashboard page
/* =========================
   GLOBAL
========================= */

*{
    margin:0;
    padding:0;
    box-sizing:border-box;
    font-family:'Poppins',sans-serif;
}

body{

    background:linear-gradient(
        135deg,
        #fffcff 0%,
        #faf5ff 50%,
        #f7fffb 100%
    );

    min-height:100vh;
    overflow-x:hidden;
    color:#34355f;
    position:relative;
}

/* =========================
   BACKGROUND BLOBS
========================= */

.blob{
    position:fixed;
    border-radius:50%;
    filter:blur(120px);
    z-index:-1;
}

.blob1{
    width:350px;
    height:350px;
    background:#ead9ff;
    top:-120px;
    left:-120px;
}

.blob2{
    width:400px;
    height:400px;
    background:#ffe1ef;
    right:-120px;
    top:150px;
}

.blob3{
    width:350px;
    height:350px;
    background:#dffbf0;
    bottom:-120px;
    left:35%;
}

/* =========================
   LAYOUT
========================= */

.dashboard-container{
    display:flex;
    min-height:100vh;
}

/* =========================
   SIDEBAR
========================= */

.sidebar{

    width:270px;

    background:rgba(255,255,255,.7);

    backdrop-filter:blur(15px);

    border-right:1px solid rgba(255,255,255,.5);

    padding:30px 20px;

    position:sticky;
    top:0;
    height:100vh;
}

.logo-section{

    display:flex;
    align-items:center;
    gap:12px;

    margin-bottom:50px;
}

.logo-icon{
    font-size:40px;
}

.logo-text h2{
    font-size:24px;
    font-weight:700;
}

.logo-text p{
    font-size:12px;
    color:#777;
}

.menu{
    list-style:none;
}

.menu li{

    display:flex;
    align-items:center;

    gap:15px;

    padding:16px 18px;

    margin-bottom:12px;

    border-radius:16px;

    cursor:pointer;

    font-weight:500;

    transition:.3s;
}

.menu li:hover{

    background:#f5efff;

    color:#8d66ff;
}

.menu li.active{

    background:linear-gradient(
        135deg,
        #9c7fff,
        #b38fff
    );

    color:white;
}

/* =========================
   MAIN CONTENT
========================= */

.main-content{

    flex:1;

    padding:35px;
}

/* =========================
   HEADER
========================= */

.top-header{

    display:flex;
    justify-content:space-between;
    align-items:center;

    margin-bottom:35px;
}

.top-header h1{

    font-size:34px;
    font-weight:700;
}

.top-header p{

    margin-top:8px;

    font-size:18px;

    font-weight:600;
}

.top-header span{

    color:#777;
    font-size:14px;
}

.profile-section{

    display:flex;
    align-items:center;
    gap:18px;
}

.notification{

    width:48px;
    height:48px;

    border-radius:50%;

    background:white;

    display:flex;
    justify-content:center;
    align-items:center;

    font-size:18px;

    box-shadow:
    0 10px 25px rgba(0,0,0,.05);
}

.user-info{

    display:flex;
    align-items:center;
    gap:12px;

    background:white;

    padding:8px 15px;

    border-radius:50px;

    box-shadow:
    0 10px 25px rgba(0,0,0,.05);
}

.user-info span{
    font-weight:600;
}

.user-info img{

    width:42px;
    height:42px;

    border-radius:50%;
}

.logout-btn{

    border:none;

    padding:12px 20px;

    border-radius:15px;

    cursor:pointer;

    color:white;

    font-weight:600;

    background:linear-gradient(
        135deg,
        #9c7fff,
        #ff93cc
    );

    transition:.3s;
}

.logout-btn:hover{

    transform:translateY(-2px);
}

/* =========================
   SCORE CARDS
========================= */

.cards-grid{

    display:grid;

    grid-template-columns:
    repeat(4,1fr);

    gap:20px;

    margin-bottom:30px;
}

.score-card{

    background:white;

    padding:25px;

    border-radius:25px;

    box-shadow:
    0 10px 25px rgba(0,0,0,.05);
}

.score-card h4{

    color:#777;

    margin-bottom:12px;
}

.score-card h2{

    font-size:34px;

    font-weight:700;
}

.score-card p{

    color:#999;
}

.good{

    color:#4caf50;

    font-weight:600;
}

.medium{

    color:#ff9800;

    font-weight:600;
}

.excellent{

    color:#8d66ff;

    font-weight:600;
}

/* =========================
   WEEKLY OVERVIEW
========================= */

.overview-wrapper{

    display:grid;

    grid-template-columns:2.2fr 1fr;

    gap:25px;

    margin-bottom:30px;
}

.overview-card{

    background:white;

    padding:25px;

    border-radius:28px;

    box-shadow:
    0 10px 25px rgba(0,0,0,.05);
}

.overview-card h3{

    font-size:22px;

    margin-bottom:20px;
}

.graph-box{

    width:100%;
}

.graph-header{

    display:flex;

    gap:25px;

    margin-bottom:25px;
}

.legend{

    display:flex;

    align-items:center;

    gap:8px;

    font-size:14px;

    color:#666;
}

.dot{

    width:12px;
    height:12px;

    border-radius:50%;
}

.purple{
    background:#8d66ff;
}

.blue{
    background:#5f9dff;
}

.pink{
    background:#ff7eb9;
}

.fake-graph{

    width:100%;
    height:260px;

    background:#faf8ff;

    border-radius:20px;

    padding:15px;
}

.fake-graph svg{

    width:100%;
    height:100%;
}

.line1{

    fill:none;
    stroke:#8d66ff;
    stroke-width:5;
}

.line2{

    fill:none;
    stroke:#5f9dff;
    stroke-width:5;
}

.line3{

    fill:none;
    stroke:#ff7eb9;
    stroke-width:5;
}

/* =========================
   AI INSIGHT CARD
========================= */

.insight-card{

    background:white;

    padding:28px;

    border-radius:28px;

    box-shadow:
    0 10px 25px rgba(0,0,0,.05);

    display:flex;

    flex-direction:column;

    justify-content:center;
}

.brain-icon{

    width:70px;
    height:70px;

    border-radius:20px;

    background:#f4ecff;

    display:flex;

    justify-content:center;
    align-items:center;

    font-size:32px;

    margin-bottom:20px;
}

.insight-card h4{

    font-size:22px;

    margin-bottom:15px;
}

.insight-card p{

    line-height:1.8;

    color:#555;

    margin-bottom:15px;
}

.insight-card span{

    color:#8d66ff;

    font-weight:600;
}

/* =========================
   BOTTOM GRID
========================= */

.bottom-grid{

    display:grid;

    grid-template-columns:1.5fr 1fr;

    gap:25px;

    margin-bottom:30px;
}

/* =========================
   KEY INDICATORS
========================= */

.indicator-card{

    background:white;

    padding:28px;

    border-radius:28px;

    box-shadow:
    0 10px 25px rgba(0,0,0,.05);
}

.indicator-card h3{

    margin-bottom:20px;

    font-size:22px;
}

.indicator{

    display:flex;

    justify-content:space-between;
    align-items:center;

    padding:18px 0;

    border-bottom:1px solid #f1f1f1;
}

.indicator:last-child{

    border-bottom:none;
}

.indicator span{

    color:#555;
}

.indicator strong{

    color:#8d66ff;
}

/* =========================
   ACHIEVEMENT CARD
========================= */

.achievement-card{

    background:linear-gradient(
        135deg,
        #fff8eb,
        #fff2d6
    );

    padding:30px;

    border-radius:28px;

    box-shadow:
    0 10px 25px rgba(0,0,0,.05);

    display:flex;

    flex-direction:column;

    justify-content:center;
}

.achievement-icon{

    font-size:55px;

    margin-bottom:15px;
}

.achievement-card h3{

    margin-bottom:12px;
}

.achievement-card p{

    color:#666;

    line-height:1.8;
}

/* =========================
   WELLNESS TWIN
========================= */

.twin-card{

    background:white;

    padding:30px;

    border-radius:30px;

    box-shadow:
    0 10px 25px rgba(0,0,0,.05);
}

.twin-card h2{

    margin-bottom:25px;
}

.twin-grid{

    display:grid;

    grid-template-columns:1fr 1fr;

    gap:25px;
}

.current-you,
.future-you{

    padding:25px;

    border-radius:25px;
}

.current-you{

    background:#faf7ff;
}

.future-you{

    background:#eefcf5;
}

.current-you h3,
.future-you h3{

    margin-bottom:15px;
}

.current-you ul,
.future-you ul{

    list-style:none;

    line-height:2.4;
}

.current-you li,
.future-you li{

    color:#555;
}

/* =========================
   RESPONSIVE
========================= */

@media(max-width:1200px){

    .cards-grid{

        grid-template-columns:
        repeat(2,1fr);
    }

    .overview-wrapper{

        grid-template-columns:1fr;
    }

    .bottom-grid{

        grid-template-columns:1fr;
    }
}

@media(max-width:900px){

    .dashboard-container{

        flex-direction:column;
    }

    .sidebar{

        width:100%;
        height:auto;
        position:relative;
    }

    .main-content{

        padding:20px;
    }

    .twin-grid{

        grid-template-columns:1fr;
    }
}

@media(max-width:600px){

    .cards-grid{

        grid-template-columns:1fr;
    }

    .top-header{

        flex-direction:column;

        gap:20px;

        align-items:flex-start;
    }

    .profile-section{

        flex-wrap:wrap;
    }

    .graph-header{

        flex-direction:column;

        gap:10px;
    }
}
.menu li{
    cursor:pointer;
}x