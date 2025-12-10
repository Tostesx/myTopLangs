async function getLanguages() {
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

    const chart = document.getElementById("chart");
    chart.innerHTML = "";

    Object.entries(langCount)
        .sort((a, b) => b[1] - a[1])
        .forEach(([lang, count]) => {
            const percent = ((count / total) * 100).toFixed(1);

            const row = document.createElement("div");
            row.className = "langRow";

            row.innerHTML = `
                <div class="langLabel">${lang} (${percent}%)</div>
                <div class="bar" style="width:${percent}%"></div>
            `;

            chart.appendChild(row);
        });
}

getLanguages();
