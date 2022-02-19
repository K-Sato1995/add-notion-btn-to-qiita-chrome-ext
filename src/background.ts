import type { IStorage } from "./types";
import { insertItem } from './notionAPI'
import { MESSAGE_KEY_INSERT_TO_DB } from './consts'


let apiToken;
let notionDbID;

chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.get({ notionAPIToken: '', dbID: '' }  as IStorage, ({ notionAPIToken, dbID }: IStorage) => {
        apiToken = notionAPIToken;
        notionDbID = dbID
    });
});

// https://stackoverflow.com/questions/5443202/call-a-function-in-background-from-popup
chrome.runtime.onMessage.addListener(
    function(request, _sender, _sendResponse){
        if(request.msg == MESSAGE_KEY_INSERT_TO_DB) {
          const { currentURL, qiitaTitle, tags } = request;
          insertItem(
            currentURL,
            qiitaTitle,
            tags,
            apiToken,
            notionDbID,
          );
        }
    }
);