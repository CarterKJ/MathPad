$(function() {

    const symbols = {
        'pi': '\\pi',
        'alpha': '\\alpha',
        'beta': '\\beta',
        'gamma': '\\gamma',
        'delta': '\\delta',
        'epsilon': '\\epsilon',
        'zeta': '\\zeta',
        'eta': '\\eta',
        'theta': '\\theta',
        'iota': '\\iota',
        'kappa': '\\kappa',
        'lambda': '\\lambda',
        'mu': '\\mu',
        'nu': '\\nu',
        'xi': '\\xi',
        'rho': '\\rho',
        'sigma': '\\sigma',
        'tau': '\\tau',
        'upsilon': '\\upsilon',
        'phi': '\\phi',
        'chi': '\\chi',
        'psi': '\\psi',
        'omega': '\\omega',
        'Gamma': '\\Gamma',
        'Delta': '\\Delta',
        'Theta': '\\Theta',
        'Lambda': '\\Lambda',
        'Xi': '\\Xi',
        'Pi': '\\Pi',
        'Sigma': '\\Sigma',
        'Upsilon': '\\Upsilon',
        'Phi': '\\Phi',
        'Psi': '\\Psi',
        'Omega': '\\Omega',
        'sqrt': '\\sqrt{x}',
        'nthroot': '\\sqrt[ ]',
        'times': '\\times',
        'div': '\\div',
        'pm': '\\pm',
        'circ': '\\circ',
        'int': '\\int',
        'sum': '\\sum',
        'prod': '\\prod',
        '->': '\\rightarrow',
        '=>': '\\Rightarrow'
    };

    const table = document.querySelector('table');
    let MQ = MathQuill.getInterface(2);

    // Generate table header
    table.innerHTML = `<thead>
        <tr>
            <th>Symbol</th>
            <th>Keyword</th>
        </tr>
    </thead>`;

    const tbody = document.createElement('tbody');

    for (let keyword in symbols) {
        const row = document.createElement('tr');

        const symbolCell = document.createElement('td');
        symbolCell.classList.add('mq-math-mode');
        symbolCell.innerText = symbols[keyword];
        MQ.StaticMath(symbolCell);

        const keywordCell = document.createElement('td');
        keywordCell.innerText = keyword;

        row.appendChild(symbolCell);
        row.appendChild(keywordCell);
        tbody.appendChild(row);
    }

    table.appendChild(tbody);
});
