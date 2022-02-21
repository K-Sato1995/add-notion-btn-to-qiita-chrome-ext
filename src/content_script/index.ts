import type { RequestResult } from "../types";
import { appendNotionBtnToQiita } from './notionBtn'

// Listen to the msg from background script
chrome.runtime.onMessage.addListener((response: RequestResult, _sender, _sendResponse) => {
    if (response.type == 'OK') {
        alert("Successfuly inserted the item!!");
    } else {
        alert(response.msg)
    }
    return true
});

appendNotionBtnToQiita()