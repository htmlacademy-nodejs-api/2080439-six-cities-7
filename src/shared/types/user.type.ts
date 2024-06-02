export enum UserType {
  Regular = 'regular',
  Pro = 'pro',
}

export type User = {
  name: string;
  mail: string;
  avatar: string;
  type: UserType;
}
