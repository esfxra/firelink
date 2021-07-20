export interface Link {
  _id: string;
  title: string;
  url: string;
  published: boolean;
}

export interface LinkUpdates {
  title?: string;
  url?: string;
  published?: boolean;
}
