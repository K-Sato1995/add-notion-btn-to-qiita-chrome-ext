import Options from "./components/Options.svelte";
import type { IStorage } from "./types";

function restoreOptions() {
    chrome.storage.sync.get({ notionAPIToken: '', dbID: '' } as IStorage, ({ notionAPIToken, dbID }: IStorage) => {
        const app = new Options({
            target: document.body,
            props: { notionAPIToken, dbID },
        });
    });
}

document.addEventListener("DOMContentLoaded", restoreOptions);
