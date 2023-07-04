export interface User {
  uid: string;
  displayName: string;
  email: string;
  likedProblems: Array<string>;
  dislikedProblems: Array<string>;
  solvedProblems: Array<string>;
  starredProblems: Array<string>;
  createdAt: number;
  updatedAt: number;
}
