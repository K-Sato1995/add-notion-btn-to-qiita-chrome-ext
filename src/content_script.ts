import type { IStorage } from "./types";
import { MESSAGE_KEY_INSERT_TO_DB } from './consts'

chrome.storage.sync.get({ count: 0 } as IStorage, ({ count }: IStorage) => {
    console.log(count);
});

const currentURL = document.location.href;
const logo = document.createElement("button"); 
logo.setAttribute("id", "notion-btn-to-qiita-btn");
logo.innerText="N";
logo.onclick = () => { 
    chrome.runtime.sendMessage({ msg: MESSAGE_KEY_INSERT_TO_DB });
}
document.body.appendChild(logo);
