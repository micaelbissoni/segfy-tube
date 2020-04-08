export class Id {
    videoId: string;
    kind: string;
}

export class Media {
    url: string;
    width: number;
    height: number;
}

export class Thumbnails {
    medium: Media;
}

export class Video {
    id: Id;
    title: string;
    description: string;
    channelTitle: string;
    thumbnails: Thumbnails;
}

export class Query {
    query: string;
    result: [Video];
}

export class QueryTag {
    queriesSaved: [Query];
}
