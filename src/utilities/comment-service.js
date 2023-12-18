import * as commentsAPI from "./comment-ai";

export async function createComment(commentData) {
  const comment = await commentsAPI.createComment(commentData);
  return comment;
}
