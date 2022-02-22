import App from './components/App.svelte'
import type { IStorage } from './types'

function restoreOptions() {
    chrome.storage.sync.get({ notionAPIToken: '', dbID: '' } as IStorage, ({ notionAPIToken, dbID }: IStorage) => {
        new App({
            target: document.body,
            props: { notionAPIToken, dbID },
        })
    })
}

document.addEventListener('DOMContentLoaded', restoreOptions)
