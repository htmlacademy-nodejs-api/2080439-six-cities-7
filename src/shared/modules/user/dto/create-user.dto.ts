import { UserType } from '../../../types/user.type.js';

export class CreateUserDto {
  public name: string;
  public mail: string;
  public avatar: string;
  public type: UserType;
  public password: string;
}
