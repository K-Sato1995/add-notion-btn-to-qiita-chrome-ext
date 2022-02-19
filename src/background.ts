import type { IStorage, RequestResult } from "./types";
import { insertItem } from './notionAPI'
import { MESSAGE_KEY_INSERT_TO_DB } from './consts'

let apiToken;
let notionDbID;


const sendMsgToContentScript = (response: RequestResult) => {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        chrome.tabs.sendMessage(tabs[0].id, response, function() {});  
    });
}

// Listen to the content script
chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.get({ notionAPIToken: '', dbID: '' }  as IStorage, ({ notionAPIToken, dbID }: IStorage) => {
        apiToken = notionAPIToken;
        notionDbID = dbID
    });
});

// https://stackoverflow.com/questions/5443202/call-a-function-in-background-from-popup
chrome.runtime.onMessage.addListener(
    async function(request, _sender, _sendResponse){
        if(request.msg == MESSAGE_KEY_INSERT_TO_DB) {
          const { currentURL, qiitaTitle, tagsText, postedDate } = request;
          const result = await insertItem({
                path: currentURL,
                qiitaTitle,
                tagsText,
                apiToken,
                dbID: notionDbID,
                postedDate
            });
            sendMsgToContentScript(result)
        }
    }
);