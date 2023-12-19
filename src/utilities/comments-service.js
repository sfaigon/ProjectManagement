import * as commentsAPI from "./comments-api";

export async function createComment(commentData) {
  const comment = await commentsAPI.createComment(commentData);
  return comment;
}
