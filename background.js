chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: "saveWord",
        title: "Save word for later",
        contexts: ["selection"]
    });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "saveWord") {
        chrome.storage.sync.get({ savedWords: [] }, (data) => {
            let words = data.savedWords;
            words.push(info.selectionText);
            chrome.storage.sync.set({ savedWords: words });
        });
    }
});
