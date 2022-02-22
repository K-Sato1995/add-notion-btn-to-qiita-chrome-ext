import Options from './components/Options.svelte'
import type { IStorage } from './types'

chrome.storage.sync.get({ notionAPIToken: '', dbID: '' }  as IStorage, ({ notionAPIToken, dbID }: IStorage) => {
    new Options({
        target: document.body,
        props: { notionAPIToken, dbID },
    })
})
