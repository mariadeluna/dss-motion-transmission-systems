import { loadCSV } from "./data.js";
import { initUI,showData } from "./ui.js";

document.addEventListener('DOMContentLoaded', async () => {
    const ok = await loadCSV();
    if (ok) {
        initUI();
        showData();
    } else {

        const output = document.getElementById('output');
        output.innerHTML = `<p> The data of csv files couldn't been loaded correctly </p>`;
    }
        

});