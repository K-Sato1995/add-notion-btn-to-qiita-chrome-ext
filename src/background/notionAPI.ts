import { Client } from '@notionhq/client'
import type { NotionProperty, RequestResult } from '../types'

export const initaializeNotionClient = (apiToken) => {
    if (!apiToken) {
      throw new Error("Set Notion API TOKEN")
    }
    const notion = new Client({
      auth: apiToken,
    });
    return notion;
};
  
export const insertItem = async (NotionClient: Client, NotionProperty: NotionProperty) => {
  const { path, qiitaTitle, tagsText, dbID, postedDate } = NotionProperty
  const today = new Date().toISOString().slice(0, 10)
  const tagObj = []
  
  tagsText.split(' ').forEach(ele => {
    tagObj.push({'name': ele})
  });
  
  await NotionClient.pages.create({
    parent: { database_id: dbID },
    properties: {
      Name: {
        title: [
          {
            text: {
              content: qiitaTitle,
            },      
          },
        ],
      },
      URL: {
        url: path,
      },
      PostedDate: {
        date: {
          start: postedDate,
        }
      },
      InsertedDate: {
        date: {
          start: today,
        }
      },
      Tags: {
        multi_select: tagObj,
      },
    },
  });
};
