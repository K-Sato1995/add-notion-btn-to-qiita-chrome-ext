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

export namespace Qiita {
    export interface User {
        "description": string,
        "facebook_id": string,
        "followees_count": number,
        "followers_count": number,
        "github_login_name": string,
        "id": string,
        "items_count": number,
        "linkedin_id": string,
        "location": string,
        "name": string,
        "organization": string,
        "permanent_id": number,
        "profile_image_url": string,
        "team_only": boolean,
        "twitter_screen_name": string,
        "website_url": string
    }
}