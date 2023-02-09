const BASE_URL = "https://itunes.apple.com";

type Label = {
  label: string;
};

type Author = {
  name: Label;
  uri: Label;
  label?: string;
};

type Content = {
  label: string;
  attributes: Label;
};

type Attributes = {
  rel: string;
  type?: string;
  href: string;
};

type Link = {
  attributes: Attributes;
};

type ContentTypeAttributes = {
  term: string;
  label: string;
};

type ContentType = {
  attributes: ContentTypeAttributes;
};

type Entry = {
  author: Author;
  updated: Label;
  "im:rating": Label;
  "im:version": Label;
  id: Label;
  title: Label;
  content: Content;
  link: Link;
  "im:voteSum": Label; // このコメントが役に立ったと思った人数
  "im:contentType": ContentType;
  "im:voteCount": Label; // コメントに対する投票総数
};

export type Feed = {
  author: Author;
  entry: Entry[];
  update: Label;
  rights: Label;
  title: Label;
  icon: Label;
  link: Link[];
  id: Label;
};

export type CustomerReviews = {
  feed: Feed;
};

/**
 * mostRecent: 最新順, mostHelpful: 参考になった順
 */
export type SortBy = "mostRecent" | "mostHelpful";

/**
 * レビューページURLを作成する
 * @param country 国コード（jp）
 * @param id iTunesトラックID
 * @param page ページ番号（1〜10）
 * @param sortby mostRecent: 最新順, mostHelpful: 参考になった順
 * @returns レビューページのURL
 */
export const generateReviewUrl = (
  country: string,
  id: string,
  page: number,
  sortby: SortBy
) => {
  if (page < 1 || 10 < page) throw new Error("idは1から10で指定してください");
  return `${BASE_URL}/${country}/rss/customerreviews/page=${page}/id=${id}/sortby=${sortby}/json`;
};
