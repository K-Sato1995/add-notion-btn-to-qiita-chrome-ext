<script lang="ts">
  import type { IStorage } from "../types";

  export let notionAPIToken: string = null;
  export let dbID: string = null;

  let successMessage: string = null;

  function save() {
    const storage: IStorage = {
      notionAPIToken,
      dbID,
    };

    chrome.storage.sync.set(storage, () => {
      successMessage = "Data saved!";

      setTimeout(() => {
        successMessage = null;
      }, 1500);
    });
  }
</script>

<div>
  <input placeholder="Notion API Token" bind:value={notionAPIToken} />
  <input placeholder="Database ID" bind:value={dbID} />
  <div>
    <button on:click={save}>Save</button>
    {#if successMessage}<span class="success">{successMessage}</span>{/if}
  </div>
</div>

<style>
  :root {
    --main-color: #ff3e00;
  }

  input,
  button {
    font-family: inherit;
    font-size: inherit;
    -webkit-padding: 0.4em 0;
    padding: 0.4em;
    margin: 0 0 0.5em 0;
    box-sizing: border-box;
    border: 1px solid #ccc;
    border-radius: 2px;
    outline: none;
  }

  input:disabled {
    color: #ccc;
  }

  input:focus {
    border: 2px solid var(--main-color);
  }

  button:focus {
    border-color: #666;
  }

  button {
    border-radius: 2px;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.6);
    background-color: var(--main-color);
    color: #ecf0f1;
    transition: background-color 0.3s;
    padding: 5px 10px;
    border: none;
    cursor: pointer;
  }

  button:hover,
  button:focus {
    background-color: var(--main-color);
  }

  .success {
    display: block;
    color: var(--main-color);
    font-weight: bold;
  }
</style>
