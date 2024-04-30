export enum UserType {
  Regular = 'regular',
  Pro = 'pro',
}

export type User = {
  name: string;
  id: number;
  mail: string;
  avatar?: string;
  password: string;
  type: UserType;
}
