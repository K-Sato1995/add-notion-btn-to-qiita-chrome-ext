export type IStorage = {
    notionAPIToken: string;
    dbID: string;
};

export interface NotionProperty {
    path: string
    qiitaTitle: string
    tagsText: string
    postedDate: string
    apiToken: string
    dbID: string
}