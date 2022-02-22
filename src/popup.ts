import App from './components/App.svelte'
import type { IStorage } from './types'

chrome.storage.sync.get({ notionAPIToken: '', dbID: '' }  as IStorage, ({ notionAPIToken, dbID }: IStorage) => {
    new App({
        target: document.body,
        props: { notionAPIToken, dbID },
    })
})
