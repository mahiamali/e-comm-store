export interface LoginResponse {
  token: string;
  user: any; // or replace `any` with a `User` interface
}