import { CustomerReviews, Feed, generateReviewUrl } from "./review";
import axios from "axios";

const main = async () => {
  const url = generateReviewUrl("jp", "1475196715", 1, "mostHelpful");

  try {
    const res = await axios.get(url);
    const data: CustomerReviews = res.data;
    const feed: Feed = data.feed;

    // レビューの取得に失敗したらエラー
    if (!feed || !feed.entry) throw new Error("レビューの取得に失敗しました");

    // レビュー0件なら終了
    if (feed.entry.length === 0) return;

    console.log("url: ", url);
    feed.entry.forEach((entry) => {
      const id = entry.id.label;
      const author = entry.author.name.label;
      const updated = entry.updated.label;
      const rating = entry["im:rating"].label;
      const version = entry["im:version"].label;
      const title = entry.title.label;
      const content = entry.content.label;
      const voteSum = entry["im:voteSum"].label;
      const voteCount = entry["im:voteCount"].label;

      console.log(id, updated, `version: ${version}`);
      console.log(title, `☆ ${rating}`);
      console.log(`${author} さん`);
      console.log(content);
      console.log(`役に立ったと思った人数: ${voteSum} / ${voteCount}`);

      console.log("--------------------");
    });
  } catch (error) {
    console.log(error);
  }
};

main();
