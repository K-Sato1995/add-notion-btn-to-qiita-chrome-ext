import type { IStorage, RequestResult } from "../types";
import type { Client } from '@notionhq/client'
import { insertItem, initaializeNotionClient } from './notionAPI'
import { MESSAGE_KEY_INSERT_TO_DB, FETCH_USER_DATA, EXTENSION_ACTIONS } from '../consts'
import { QiitaAPIClient } from './qiitaAPI'

let notionClient: Client;
let qiitaClient: QiitaAPIClient;

const sendMsgToContentScript = (response: RequestResult) => {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        chrome.tabs.sendMessage(tabs[0].id, response, function() {});  
    });
}

// Listen to the content script
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
            sendMsgToContentScript({ action: EXTENSION_ACTIONS.NOTION_QIITA, type: "OK", msg: 'Successfuly inserted the item!!' })
          } catch(error) {
            sendMsgToContentScript({ action: EXTENSION_ACTIONS.NOTION_QIITA, type: "ERROR", msg: `ERROR: ${error.message}` })
          }
        } else if(request.msg === FETCH_USER_DATA) {
            const { userID } = request;

            if(!qiitaClient) {
                qiitaClient = QiitaAPIClient.initializeClient('')
            }
            try {
                const result = await qiitaClient.fetchUser(userID)
                console.log(result)
            } catch(error) {
                sendMsgToContentScript({ action: EXTENSION_ACTIONS.USER_PROFILE, type: "ERROR", msg: `ERROR: ${error.message}` })
            }
        } else {
            sendMsgToContentScript({ action: EXTENSION_ACTIONS.USER_PROFILE, type: "ERROR", msg: `ERROR: Non registred msg.` })
        }
    }
);