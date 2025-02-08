const DICTIONARY_URLS = {
    dictionaryUrl: 'https://figma-korean.vercel.app/i18n-artifacts/31a60d9d84fed15751df85d5f360ce90319b50db.json',
    dbDictionaryUrl: 'https://figma-korean.vercel.app/i18n-artifacts/8ef8c2fc7ae316c399b776f1ca67c2e0e78a5046.json'
};

function updateResourceUrls() {
    Object.entries(DICTIONARY_URLS).forEach(([id, url]) => {
        const link = document.querySelector(`link#${id}`);
        if (link) link.href = url;
    });
}

document.addEventListener('DOMContentLoaded', updateResourceUrls);

new MutationObserver(mutations => 
    mutations.some(m => m.addedNodes.length) && updateResourceUrls()
).observe(document.documentElement, {
    childList: true,
    subtree: true
}); 