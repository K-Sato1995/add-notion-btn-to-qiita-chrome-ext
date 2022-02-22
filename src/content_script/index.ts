import type { NotionQiitaResponse, UserProfileResponse } from '../types'
import { insertNotionBtnToQiita, handleNotionQiitaResponse } from './notionBtn'
import { handleUserProfileResponse } from './userProfile'
import { FETCH_USER_DATA, QIITA_USER_ID_INDEX, EXTENSION_ACTIONS } from '../consts'

const currentURL = document.location.href
const userID = currentURL.split('/')[QIITA_USER_ID_INDEX]
chrome.runtime.sendMessage({ msg: FETCH_USER_DATA, userID })

// Listen to the msg from background script
chrome.runtime.onMessage.addListener((response: NotionQiitaResponse | UserProfileResponse, _sender, _sendResponse) => {
    if(isUserProfileAction(response)) {
        handleUserProfileResponse(response)
    } else if(isNotionQiitaAction(response)) {
        handleNotionQiitaResponse(response)
    } else {
        alert('ERROR: NON REGISTERED ACTION')
    }
    return true
})


const isUserProfileAction = (action: NotionQiitaResponse | UserProfileResponse): action is UserProfileResponse => {
    return (action as UserProfileResponse).userData !== undefined
}

const isNotionQiitaAction = (action: NotionQiitaResponse | UserProfileResponse): action is NotionQiitaResponse => {
    return (action as UserProfileResponse).userData === undefined
}

insertNotionBtnToQiita()