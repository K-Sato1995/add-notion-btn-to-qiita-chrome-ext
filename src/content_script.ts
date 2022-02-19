import type { IStorage } from "./types";
import { MESSAGE_KEY_INSERT_TO_DB, QIITA_ARTICLE_TITLE_TAG, QIITA_ARTICLE_TAG_HREF } from './consts'

// chrome.storage.sync.get({ count: 0 } as IStorage, ({ count }: IStorage) => {
//     console.log(count);
// });

const qiitaTitle = document.getElementsByTagName(QIITA_ARTICLE_TITLE_TAG)[0].innerText
const qiitaTags = document.querySelectorAll(`[href*="${QIITA_ARTICLE_TAG_HREF}"]`);
let tagTexts: string[] = []

for(let i = 0; i < qiitaTags.length; i++) {
  tagTexts.push(qiitaTags[i].innerHTML)
}

if(!qiitaTitle) {
    throw new Error('The title is not defined');
}

const currentURL = document.location.href;
const logo = document.createElement("button"); 
logo.setAttribute("id", "notion-btn-to-qiita-btn");
logo.innerText="N";
logo.onclick = () => { 
    chrome.runtime.sendMessage({ msg: MESSAGE_KEY_INSERT_TO_DB, currentURL, qiitaTitle, tagsText: tagTexts.join(' ') });
}
document.body.appendChild(logo);
