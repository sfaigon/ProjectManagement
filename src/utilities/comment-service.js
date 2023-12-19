import * as commentsAPI from "./comment-api";

export async function createComment(commentData) {
  const comment = await commentsAPI.createComment(commentData);
  return comment;
}
