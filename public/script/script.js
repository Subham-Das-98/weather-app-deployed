import main from "./main.js";

/* ASSIGN REQUIRED VARIABLES */
let search_btn = document.getElementById("search-btn");
let search_box = document.getElementById("search-box");

/* DISPLAY WEATHER REPORT WHEN SEARCH-BUTTON IS CLICKED */
search_btn.addEventListener("click", (event) => {
    main();
});

/* DISPLAY WEATHER REPORT WHEN KEYBOARD 'ENTER KEY' IS PRESSED */
search_box.addEventListener("keydown", (event) => {
    if (event.key === 'Enter') {
        main();
    }
});
