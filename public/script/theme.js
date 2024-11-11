/* ASSIGN REQUIRED VARIABLES */
let dark_mode_toggle_btn = document.getElementById("toggle-btn-chk-box");

/* DARK MODE */
const setTheme = () => {
    let theme_src = document.getElementById("theme-src");
    let theme = localStorage.getItem("theme");

    if (theme == "dark-mode") {
        document.getElementById("toggle-btn-chk-box").checked = true;
        theme_src.href = "./public/css/dark-mode.css";
    }
    else {
        document.getElementById("toggle-btn-chk-box").checked = false;
        theme_src.href = "./public/css/light-mode.css";
    }
}

/* SET DARK MODE IF ENABLED ON PAGE-LOAD */
setTheme();

/* TOGGLE DARK MODE WHEN TOGGLE-BUTTON IS CLICKED */
dark_mode_toggle_btn.addEventListener("click", (e) => {
    let toggleDarkMode = document.getElementById("toggle-btn-chk-box").checked;

    // set theme mode value in local-storage
    if(toggleDarkMode){
        localStorage.setItem("theme", "dark-mode");
    }
    else{
        localStorage.setItem("theme", "light-mode");
    }

    // apply theme
    setTheme();
});