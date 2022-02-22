<script lang="ts">
  import Options from "./Options.svelte";

  export let notionAPIToken: string = null;
  export let dbID: string = null;
</script>

<main>
  <div class="container">
    <h1>Qiita Enhancer</h1>
    <Options {notionAPIToken} {dbID} />
  </div>
</main>

<style>
  .container {
    color: #333;
    box-sizing: border-box;
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
      Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
  }
  h1 {
    color: var(--main-color);
    font-size: 2em;
    font-weight: 100;
  }
</style>
