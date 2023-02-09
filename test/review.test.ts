import { generateReviewUrl } from "../src/review";

test("レビューページURLを生成できること", () => {
  const country = "jp";
  const id = "1475196715";
  const page = 1;
  const sortby = "mostRecent";
  const url = `https://itunes.apple.com/${country}/rss/customerreviews/page=${page}/id=${id}/sortdy=${sortby}/json`;
  expect(generateReviewUrl(country, id, page, sortby)).toBe(url);
});

test("ページ番号を1より下にすると失敗すること", () => {
  const country = "jp";
  const id = "1475196715";
  const page = 0;
  const sortby = "mostRecent";
  expect(() => generateReviewUrl(country, id, page, sortby)).toThrow();
});

test("ページ番号を10より上にすると失敗すること", () => {
  const country = "jp";
  const id = "1475196715";
  const page = 11;
  const sortby = "mostRecent";
  expect(() => generateReviewUrl(country, id, page, sortby)).toThrow();
});
