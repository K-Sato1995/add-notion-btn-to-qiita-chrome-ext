import { MESSAGE_KEY_INSERT_TO_DB, QIITA_ARTICLE_TITLE_TAG, QIITA_ARTICLE_TAG_HREF, QIITA_POSTED_DATE_TAG } from '../consts'
import type { NotionQiitaResponse } from '../types'

// Access to the DOMs and get necessary resources
const qiitaTitle = document.getElementsByTagName(QIITA_ARTICLE_TITLE_TAG)[0].innerText
const qiitaTags = document.querySelectorAll(`[href*="${QIITA_ARTICLE_TAG_HREF}"]`)
const postedDate = document.getElementsByTagName(QIITA_POSTED_DATE_TAG)[0].innerHTML

const tagTexts: string[] = []

for(let i = 0; i < qiitaTags.length; i++) {
  tagTexts.push(qiitaTags[i].innerHTML)
}

export const insertNotionBtnToQiita = () => {
  const currentURL = document.location.href
  const logo = document.createElement('button') 
  logo.setAttribute('id', 'notion-btn-to-qiita-btn')
  logo.innerText='N'
  logo.onclick = () => { 
      chrome.runtime.sendMessage({ msg: MESSAGE_KEY_INSERT_TO_DB, currentURL, qiitaTitle, tagsText: tagTexts.join(' '), postedDate })
  }
  document.body.appendChild(logo)
}

export const handleNotionQiitaResponse = (response: NotionQiitaResponse) => {
  if (response.type === 'OK') {
    alert(response.msg)
  } else {
    alert(response.msg)
  }
}
