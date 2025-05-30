const DICTIONARY_URLS = {
    dictionaryUrl: 'https://figma-korean.vercel.app/i18n-artifacts/1.json',
    dbDictionaryUrl: 'https://figma-korean.vercel.app/i18n-artifacts/2.json'
};

function updateResourceUrls() {
    Object.entries(DICTIONARY_URLS).forEach(([id, url]) => {
        const link = document.querySelector(`link#${id}`);
        if (link) link.href = url;
    });
}

function updateMainLabel() {
    const xpath = '/html/body/div[2]/div/div/div/div[5]/div/div[2]/section/form/div/div[2]/div/fieldset/div/div[2]/label';
    const result = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
    const targetLabel = result.singleNodeValue;
    if (targetLabel) {
        targetLabel.textContent = '한국어';
    }
}

function updateAccountLabel() {
    const xpath = '/html/body/div[2]/div/div/div/div[4]/div/div[2]/section/div[1]/div[2]/div/div/div/div/div/div/div/div[2]/div/div[2]/div[2]';
    const result = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
    const accountSettingsLabel = result.singleNodeValue;
    if (accountSettingsLabel && accountSettingsLabel.textContent === '日本語') {
        accountSettingsLabel.textContent = '한국어';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    updateResourceUrls();
    updateMainLabel();
    updateAccountLabel();
});

new MutationObserver(mutations => {
    if (mutations.some(m => m.addedNodes.length)) {
        updateResourceUrls();
        updateMainLabel();
        updateAccountLabel();
    }
}).observe(document.documentElement, {
    childList: true,
    subtree: true
}); 
