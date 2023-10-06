const STORAGE_KEY = 'editorState';
const NOTEBOOKS_KEY = 'notebooks';
let currentNotebook = null;

document.addEventListener("DOMContentLoaded", function() {
    const sidebarMenu = document.getElementById('sidebarMenu');
    const editor = document.getElementById('editor');

    document.addEventListener('mousemove', function(e) {
        if (window.innerWidth - e.clientX < 50) {
            sidebarMenu.style.right = '0';
        } else if (e.clientX < window.innerWidth - 300) {
            sidebarMenu.style.right = '-290px';
        }
    });

    // Load notebooks from local storage
    updateNotebookList();

    document.getElementById('createNotebook').addEventListener('click', function() {
        const name = document.getElementById('notebookName').value;
        const notebooks = JSON.parse(localStorage.getItem(NOTEBOOKS_KEY) || '{}');
        if (name && !notebooks[name]) {
            notebooks[name] = '';
            localStorage.setItem(NOTEBOOKS_KEY, JSON.stringify(notebooks));
            updateNotebookList();
        }
    });

    // Load saved state if no notebook is selected
    if (!currentNotebook) {
        let savedState = localStorage.getItem(STORAGE_KEY);
        editor.innerHTML = savedState || '';
    }
});

function updateNotebookList() {
    const notebooks = JSON.parse(localStorage.getItem(NOTEBOOKS_KEY) || '{}');
    const notebookList = document.getElementById('notebookList');
    notebookList.innerHTML = '';
    for (let name in notebooks) {
        const li = document.createElement('li');
        li.textContent = name;
        li.addEventListener('click', function() {
            currentNotebook = name;
            editor.innerHTML = notebooks[name] || '';
            headerTitle.textContent = currentNotebook;

            // Force re-render of the editor content
            editor.style.display = 'none';
            setTimeout(() => {
                editor.style.display = 'block';
            }, 0);
        });
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            const updatedNotebooks = JSON.parse(localStorage.getItem(NOTEBOOKS_KEY) || '{}');
            delete updatedNotebooks[name];
            localStorage.setItem(NOTEBOOKS_KEY, JSON.stringify(updatedNotebooks));
            updateNotebookList();
        });
        li.appendChild(deleteBtn);
        notebookList.appendChild(li);
    }
}

// Modify the save state function
editor.addEventListener('input', function() {
    const notebooks = JSON.parse(localStorage.getItem(NOTEBOOKS_KEY) || '{}');
    if (currentNotebook) {
        notebooks[currentNotebook] = editor.innerHTML;
        localStorage.setItem(NOTEBOOKS_KEY, JSON.stringify(notebooks));
    } else {
        localStorage.setItem(STORAGE_KEY, editor.innerHTML);
    }
});
