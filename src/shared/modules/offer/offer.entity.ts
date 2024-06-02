import { defaultClasses, getModelForClass, modelOptions, prop } from '@typegoose/typegoose';
import { CoordinatesType, FacilitiesEnum, Offer, OfferTypeEnum } from '../../types/offer.type.js';
import { CityType } from '../../types/city.type.js';
import { User } from '../../types/user.type.js';
import { UserEntity } from '../user/index.js';


// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface OfferEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'offers',
    timestamps: true,
  }
})
// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class OfferEntity extends defaultClasses.TimeStamps implements Offer {
  @prop({required: true, trim: true})
  public title: string;

  @prop({trim: true})
  public description: string;

  @prop()
  public publishDate: Date;

  @prop()
  public city: CityType;

  @prop()
  public previewImage: string;

  @prop()
  public photos: string[];

  @prop()
  public isPremium: boolean;

  @prop()
  public isFavorite: boolean;

  @prop()
  public rating: number;

  @prop({
    type: () => String,
    enum: OfferTypeEnum,
  })
  public type: OfferTypeEnum;

  @prop()
  public roomsCount: number;

  @prop()
  public guestsQuantity: number;

  @prop()
  public price: number;

  @prop()
  public facilities: Array<FacilitiesEnum>;

  @prop({
    ref: UserEntity,
    required: true,
  })
  public offerAuthor: User;

  @prop()
  public commentsCount: number;

  @prop()
  public coordinates: CoordinatesType;
}

export const OfferModel = getModelForClass(OfferEntity);
