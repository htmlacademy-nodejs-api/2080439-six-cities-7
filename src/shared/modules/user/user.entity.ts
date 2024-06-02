import { defaultClasses, getModelForClass, modelOptions, prop } from '@typegoose/typegoose';
import { User, UserType } from '../../types/user.type.js';
import { createSHA256 } from '../../helpers/index.js';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface UserEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'users',
    timestamps: true,
  },
})
// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class UserEntity extends defaultClasses.TimeStamps implements User {
  @prop({required: true, default: ''})
  public name: string;

  @prop({required: true, unique:true})
  public mail: string;

  @prop({required: false, default: ''})
  public avatar: string;

  @prop({required: true})
  public type: UserType;

  @prop({required: true, default: ''})
  private password?: string;

  constructor(userData: User) {
    super();

    this.name = userData.name;
    this.mail = userData.mail;
    this.avatar = userData.avatar;
    this.type = userData.type;
  }

  public setPassword(password: string, salt: string) {
    this.password = createSHA256(password, salt);
  }

  public getPassword() {
    return this.password;
  }
}

export const UserModel = getModelForClass(UserEntity);

