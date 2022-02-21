export type IStorage = {
    notionAPIToken: string;
    dbID: string;
};

export interface NotionProperty {
    path: string
    qiitaTitle: string
    tagsText: string
    postedDate: string
    dbID: string
}

export type RequestResult = {
    type: "ERROR" | "OK",
    msg: string
}