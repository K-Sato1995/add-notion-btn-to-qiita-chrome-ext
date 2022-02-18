import { Client } from '@notionhq/client'

const initaializeNotionClient = (apiToken) => {
    if (!apiToken) {
      console.log("Set Notion API TOKEN");
    }
    const notion = new Client({
      auth: apiToken,
    });
    return notion;
  };
  
export const insertItem = async (path, apiToken, dbID) => {
  const notionClient = initaializeNotionClient(apiToken);
  console.log(apiToken)
  console.log(dbID)
  try {
    await notionClient.pages.create({
      parent: { database_id: dbID },
      properties: {
        Name: {
          title: [
            {
              text: {
                content: "Title here",
              },
            },
          ],
        },
        URL: {
          url: path,
        },
      },
    });
    console.log("Success!!");
  } catch (error) {
    console.log(error.message)
  }
};
