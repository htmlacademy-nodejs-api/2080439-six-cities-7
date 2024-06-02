import { CityType } from '../../../types/city.type.js';
import { CoordinatesType, FacilitiesEnum, OfferTypeEnum } from '../../../types/offer.type.js';

export class CreateOfferDto {
  public title: string;
  public description: string;
  public publishDate: Date;
  public city: CityType;
  public previewImage: string;
  public photos: string[];
  public isPremium: boolean;
  public isFavorite: boolean;
  public rating: number;
  public type: OfferTypeEnum;
  public roomsCount: number;
  public questsQuantity: number;
  public price: number;
  public facilities: Array<FacilitiesEnum>;
  public offerAuthor: string;
  public commentsCount: number;
  public coordinates: CoordinatesType;
}
