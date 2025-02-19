document.addEventListener("DOMContentLoaded", () => {
    chrome.storage.sync.get({ savedWords: [] }, (data) => {
        let list = document.getElementById("wordList");
        data.savedWords.forEach(word => {
            let li = document.createElement("li");
            li.textContent = word;
            list.appendChild(li);
        });
    });
});
