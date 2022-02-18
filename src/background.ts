import type { IStorage } from "./types";
import { insertItem } from './notionAPI'
import { MESSAGE_KEY_INSERT_TO_DB } from './consts'
  
chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.get({ count: 0 } as IStorage, ({ count }: IStorage) => {
        console.log(count);
    });
});

chrome.runtime.onMessage.addListener(
    function(request, _sender, _sendResponse){
        if(request.msg == MESSAGE_KEY_INSERT_TO_DB) {
          insertItem();
        }
    }
);