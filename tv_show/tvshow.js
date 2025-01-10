
const form = document.querySelector("#searchform");

form.addEventListener("submit", async function (e) {
    e.preventDefault();
    const searchTerm = form.elements.query.value;
    const config = { params: { q: searchTerm } };
    const res = await axios.get("https://api.tvmaze.com/search/shows", config);
    displayResults(res.data);
    form.elements.query.value = '';
});

const displayResults = (shows) => {
    const resultsContainer = document.querySelector("#results");
    resultsContainer.innerHTML = '';
    for (let result of shows) {
        if (result.show.image) {
            const imgContainer = document.createElement("div");
            imgContainer.classList.add("img-container");

            const img = document.createElement("img");
            img.src = result.show.image.medium;
            img.alt = result.show.name;

            const title = document.createElement("div");
            title.classList.add("img-title");
            title.innerText = result.show.name;

            img.addEventListener("click", () => {
                const wikiUrl = `https://en.wikipedia.org/wiki/${encodeURIComponent(result.show.name)}`;
                window.open(wikiUrl, "_blank");
            });

            imgContainer.appendChild(img);
            imgContainer.appendChild(title);
            resultsContainer.appendChild(imgContainer);
        }
    }
};
