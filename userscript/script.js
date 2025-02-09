// ==UserScript==
// @name         Figma Korean
// @namespace    https://github.com/v1bt/Figma-Korean
// @version      1.0
// @description  피그마 한국어 번역 확장프로그램
// @author       Virtual Byte
// @match        *://*.figma.com/*
// @grant        none
// @run-at       document-start
// @license      MIT
// @icon          https://rawcdn.githack.com/v1bt/Figma-Korean/a8a21cd6f572bf069fad375eaeea794b567498a3/userscript/icon64.png
// ==/UserScript==

(function() {
    'use strict';

    const DICTIONARY_URLS = {
        dictionaryUrl: 'https://figma-korean.vercel.app/i18n-artifacts/1.json',
        dbDictionaryUrl: 'https://figma-korean.vercel.app/i18n-artifacts/2.json'
    };

    function updateResourceUrls() {
        Object.entries(DICTIONARY_URLS).forEach(([id, url]) => {
            const link = document.querySelector(`link#${id}`);
            if (link) {
                link.href = url;
            }
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

    function init() {
        updateResourceUrls();
        updateMainLabel();
        updateAccountLabel();
    }

    new MutationObserver((mutations, observer) => {
        init();
    }).observe(document.documentElement || document.body, {
        childList: true,
        subtree: true
    });

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
