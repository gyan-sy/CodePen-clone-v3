function saveDataToLocalStorage() {
    const htmlCode = document.getElementById("html-code").value;
    const cssCode = document.getElementById("css-code").value;
    const jsCode = document.getElementById("js-code").value;

    localStorage.setItem("savedHTMLCode", htmlCode);
    localStorage.setItem("savedCSSCode", cssCode);
    localStorage.setItem("savedJSCode", jsCode);
}

function loadSavedData() {
    const savedHTMLCode = localStorage.getItem("savedHTMLCode");
    const savedCSSCode = localStorage.getItem("savedCSSCode");
    const savedJSCode = localStorage.getItem("savedJSCode");

    if (savedHTMLCode !== null) {
        document.getElementById("html-code").value = savedHTMLCode;
    }

    if (savedCSSCode !== null) {
        document.getElementById("css-code").value = savedCSSCode;
    }

    if (savedJSCode !== null) {
        document.getElementById("js-code").value = savedJSCode;
    }
}

function run() {
    saveDataToLocalStorage();

    let htmlCode = document.getElementById("html-code").value;
    let cssCode = document.getElementById("css-code").value;
    let jsCode = document.getElementById("js-code").value;
    let output = document.getElementById("output");

    output.contentDocument.body.innerHTML = htmlCode + "<style>"+cssCode+"</style>";
    output.contentWindow.eval(jsCode);
}

function downloadCode(codeType) {
    const code = document.getElementById(codeType).value;
    const blob = new Blob([code], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    
    if (codeType === 'html-code') {
        link.download = "html-code.txt";
    } else if (codeType === 'css-code') {
        link.download = "css-code.txt";
    } else if (codeType === 'js-code') {
        link.download = "js-code.txt";
    }
    
    link.click();

    URL.revokeObjectURL(url);
}




// JavaScript to toggle the visibility of textareas and adjust their size
function toggleTextarea(codeType) {
    const textarea = document.getElementById(codeType);
    textarea.classList.toggle('collapsed');

    const visibleTextareas = document.querySelectorAll('.code-textarea:not(.collapsed)').length;

    const newHeight = 85 / visibleTextareas + '%';

    document.querySelectorAll('.code-textarea:not(.collapsed)').forEach(textarea => {
        textarea.style.height = newHeight;
    });

    saveDataToLocalStorage();
}

function loadAndApplyState() {
    const codeTypes = ["html-code", "css-code", "js-code"];

    for (const codeType of codeTypes) {
        const textarea = document.getElementById(codeType);
        const isCollapsed = localStorage.getItem(codeType + "-state") === "collapsed";

        const isMobile = window.innerWidth < 768;

        if ((isMobile && codeType !== "html-code") || isCollapsed) {
            textarea.classList.add("collapsed");
        }
    }

    loadSavedData();
    run();
}

window.onload = function () {
    loadAndApplyState();
};
