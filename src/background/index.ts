import type { IStorage, RequestResult } from "../types";
import type { Client } from '@notionhq/client'
import { insertItem, initaializeNotionClient } from '../notionAPI'
import { MESSAGE_KEY_INSERT_TO_DB } from '../consts'

let notionClient: Client;

// Listen to the content script
const sendMsgToContentScript = (response: RequestResult) => {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        chrome.tabs.sendMessage(tabs[0].id, response, function() {});  
    });
}

// https://stackoverflow.com/questions/5443202/call-a-function-in-background-from-popup
chrome.runtime.onMessage.addListener(
    async function(request, _sender, _sendResponse){
        if(request.msg == MESSAGE_KEY_INSERT_TO_DB) {
          const { currentURL, qiitaTitle, tagsText, postedDate } = request;
          try { 
            await chrome.storage.sync.get({ notionAPIToken: '', dbID: '' } as IStorage, ({ notionAPIToken, dbID }: IStorage) => {
                if(!notionClient) { 
                    notionClient = initaializeNotionClient(notionAPIToken);
                }
                insertItem(notionClient, {
                    path: currentURL,
                    qiitaTitle,
                    tagsText,
                    dbID: dbID,
                    postedDate
                });
            });
            sendMsgToContentScript({ type: "OK", msg: '' })
          } catch(error) {
            sendMsgToContentScript({ type: "ERROR", msg: `ERROR: ${error.message}` })
          }
        }
    }
);