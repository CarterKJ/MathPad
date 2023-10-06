
let history = [""];
let historyIndex = 0;

// Event listeners for header buttons
document.getElementById('undo').addEventListener('click', undo);
document.getElementById('redo').addEventListener('click', redo);
document.getElementById('print').addEventListener('click', printContent);
document.getElementById('save').addEventListener('click', saveContent);
document.getElementById('clear').addEventListener('click', clearContent);


editor.addEventListener('input', function() {
    if (historyIndex < history.length - 1) {
        history = history.slice(0, historyIndex + 1);
    }
    history.push(editor.innerHTML);
    historyIndex++;
});

function undo() {
    if (historyIndex > 0) {
        historyIndex--;
        editor.innerHTML = history[historyIndex];
    }
}

function redo() {
    if (historyIndex < history.length - 1) {
        historyIndex++;
        editor.innerHTML = history[historyIndex];
    }
}

// Latex rendering moment
function printContent() {
    const printWindow = window.open('', '_blank');
    const stylesheets = Array.from(document.querySelectorAll('link[rel="stylesheet"]'));
    stylesheets.forEach(stylesheet => {
        printWindow.document.write('<link rel="stylesheet" href="' + stylesheet.href + '">');
    });

    printWindow.document.write('<html><head><title>Print</title></head><body>');
    printWindow.document.write(editor.innerHTML);
    printWindow.document.write('</body></html>');
    printWindow.document.close();

    printWindow.onload = function() {
        printWindow.print();
    };
}


function saveContent() {
    const blob = new Blob([editor.innerText], { type: 'text/plain' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'content.txt';
    a.click();
}

function clearContent() {
    editor.innerHTML = '';
    localStorage.removeItem(STORAGE_KEY);

    history = [""];
    historyIndex = 0;
}

