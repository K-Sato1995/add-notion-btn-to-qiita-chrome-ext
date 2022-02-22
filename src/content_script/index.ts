import type { RequestResult } from "../types";
import { insertNotionBtnToQiita, handleNotionQiitaResponse } from './notionBtn'
import { insertUserProfile } from './userProfile'
import { FETCH_USER_DATA, QIITA_USER_ID_INDEX, EXTENSION_ACTIONS } from '../consts'

const currentURL = document.location.href;
const userID = currentURL.split("/")[QIITA_USER_ID_INDEX]
chrome.runtime.sendMessage({ msg: FETCH_USER_DATA, userID });

// Listen to the msg from background script
chrome.runtime.onMessage.addListener((response: RequestResult, _sender, _sendResponse) => {
    switch(response.action) {
        case EXTENSION_ACTIONS.NOTION_QIITA:
            handleNotionQiitaResponse(response);
            break;
        case EXTENSION_ACTIONS.USER_PROFILE:
            handleNotionQiitaResponse(response);
            break;
        default:
            alert("ERROR: NON REGISTERED ACTION")
    }
    return true
});

insertNotionBtnToQiita()
insertUserProfile("teest")