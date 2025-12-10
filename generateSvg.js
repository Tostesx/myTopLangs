async function generateSvg() {

    const user = "Tostesx";
    const url = `https://api.github.com/users/${user}/repos`;
    const response = await fetch(url);
    const repos = await response.json();

    const langCount = {};
    let total = 0;

    repos.forEach(repo => {
        if (!repo.language) return;
        langCount[repo.language] = (langCount[repo.language] || 0) + 1;
        total++;
    });

    const rows = Object.entries(langCount)
        .sort((a, b) => b[1] - a[1])
        .map(([lang, count]) => {
            const percent = ((count / total) * 100).toFixed(1);
            return `
                <g>
                    <text x="10" y="${35 + percent * 2}" fill="#ffdfff" font-size="12">${lang} ${percent}%</text>
                    <rect x="120" y="${25 + percent * 2}" width="${percent * 3}" height="12" rx="4"
                        fill="url(#grad)"/>
                </g>
            `;
        }).join("");

    return `
<svg width="340" height="200" xmlns="http://www.w3.org/2000/svg">
    <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#ff8800"/>
            <stop offset="100%" stop-color="#ff00ff"/>
        </linearGradient>
    </defs>
    
    <rect width="100%" height="100%" fill="#1a0033"/>
    <text x="50%" y="28" text-anchor="middle" fill="#ffb3ff" font-size="16" font-weight="bold">Top Languages</text>
    ${rows}
</svg>`;
}

export { generateSvg };
