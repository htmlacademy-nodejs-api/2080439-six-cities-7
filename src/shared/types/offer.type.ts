import { CityType } from './city.type.js';
import { User } from './user.type.js';

export enum OfferTypeEnum {
  Apartment = 'apartment',
  House = 'house',
  Room = 'room',
  Hotel = 'hotel',
}

export type CoordinatesType = {
  latitude: number;
  longitude: number;
}

export type Offer = {
  title: string;
  description: string;
  publishDate: Date;
  city: CityType;
  previewImage: string;
  photos: string[];
  isPremium: boolean;
  isFavorite: boolean;
  rating: number;
  type: OfferTypeEnum;
  roomsCount: number;
  guestsQuantity: number;
  price: number;
  facilities: string[],
  offerAuthor: User,
  commentsCount: number,
  coordinates: CoordinatesType,
}
