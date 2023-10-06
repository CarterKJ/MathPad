let editor = document.getElementById('editor');
let MQ = MathQuill.getInterface(2);
let lastCtrlPressTime = 0;

editor.addEventListener('keydown', function(e) {
    // Check for Shift double pres
    // Mathquill docs tho.....
    if (e.key === 'Shift') {
        let currentTime = new Date().getTime();
        if (currentTime - lastCtrlPressTime < 300) { // Double press within 300ms (why no inbuilt, idk)
            e.preventDefault();

            let selection = window.getSelection();
            if (selection.anchorNode && selection.anchorNode.parentNode.classList.contains('mq-math-mode')) {
                selection.anchorNode.parentNode.blur();
                editor.focus();
            } else {
                createMathBox();
            }
        }
        lastCtrlPressTime = currentTime;
    }
});

// 3rd times a charm... squared
function createMathBox() {
    let mathSpan = document.createElement('span');
    mathSpan.className = 'mq-math-mode';
    insertAtCursor(mathSpan);

let mathField = MQ.MathField(mathSpan, {
    autoCommands: 'alpha beta gamma delta epsilon zeta eta theta iota kappa lambda mu nu xi omicron pi rho sigma tau upsilon phi chi psi omega Gamma Delta Theta Lambda Xi Pi Sigma Upsilon Phi Psi Omega sum prod int sqrt nthroot vec times div pm circ',
    handlers: {
        edit: function(mathField) {
            let latex = mathField.latex();
            if (latex.includes('->')) {
                mathField.latex(latex.replace('->', '\\rightarrow '));
            } else if (latex.includes('=>')) {
                mathField.latex(latex.replace('=>', '\\Rightarrow '));
            }
        }
    }
});


    setTimeout(() => {
        mathSpan.addEventListener('blur', function() {
            mathSpan.remove();
        }, { once: true });
    }, 10);

    editor.blur();
    mathField.focus();
}

function insertAtCursor(node) {
    let selection = window.getSelection();
    let range = selection.getRangeAt(0);
    range.insertNode(node);
    range.setStartAfter(node);
    selection.removeAllRanges();
    range = document.createRange();
    range.setStart(node, 0);
    selection.addRange(range);
}
