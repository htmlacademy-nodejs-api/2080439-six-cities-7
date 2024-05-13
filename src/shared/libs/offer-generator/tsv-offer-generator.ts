import dayjs from 'dayjs';

import { OfferGenerator } from './offer-generator.interface.js';
import { MockServerData } from '../../types/mock-server-data.type.js';
import { FacilitiesEnum, OfferTypeEnum } from '../../types/offer.type.js';
import { UserType } from '../../types/user.type.js';

import {
  generateRandomValue,
  getRandomItem,
  getRandomItems,
  getRandomUniqueItemsByCount
} from '../../helpers/index.js';

import { CityName } from '../../types/city.type.js';

const MIN_RATING = 1;
const MAX_RATING = 5;

const MIN_PRICE = 100;
const MAX_PRICE = 100000;

const MIN_ROOMS = 1;
const MAX_ROOMS = 8;

const MIN_GUESTS = 1;
const MAX_GUESTS = 10;

const FIRST_WEEK_DAY = 1;
const LAST_WEEK_DAY = 7;

const PHOTOS_COUNT = 6;

export class TSVOfferGenerator implements OfferGenerator {
  constructor(private readonly mockData: MockServerData) {}

  public generate(): string {
    const title = getRandomItem<string>(this.mockData.titles);
    const description = getRandomItem<string>(this.mockData.descriptions);
    const city = getRandomItem<string>((Object.values(CityName)));
    const previewPhoto = getRandomItem<string>(this.mockData.images);
    const offerPhotos = getRandomUniqueItemsByCount<string>(this.mockData.images, PHOTOS_COUNT).join(';');
    const isPremium = Boolean(generateRandomValue(0, 1));
    const isFavorite = Boolean(generateRandomValue(0, 1));
    const rating = generateRandomValue(MIN_RATING, MAX_RATING).toString();
    const type = getRandomItem(Object.values(OfferTypeEnum));
    const roomsCount = generateRandomValue(MIN_ROOMS, MAX_ROOMS).toString();
    const guestsCount = generateRandomValue(MIN_GUESTS, MAX_GUESTS).toString();
    const price = generateRandomValue(MIN_PRICE, MAX_PRICE).toString();
    const facilities = getRandomItems<string>(Object.values(FacilitiesEnum)).join(';');
    const author = getRandomItem(this.mockData.users);
    const userId = generateRandomValue(0, 100000);
    const email = getRandomItem(this.mockData.emails);
    const avatar = getRandomItem(this.mockData.avatars);
    const password = generateRandomValue(0, 100000);
    const authorType = getRandomItem(Object.values(UserType));
    const commentsCount = generateRandomValue(0, 10);
    const latitude = generateRandomValue(1, 100, 6);
    const longitude = generateRandomValue(1, 100, 6);

    const createdDate = dayjs()
      .subtract(generateRandomValue(FIRST_WEEK_DAY, LAST_WEEK_DAY), 'day')
      .toISOString();

    // const getCity = () => {
    //   const randomCity = getRandomItem(Object.values(CityName));
    //   const coordinates = Cities[randomCity];

    //   return {
    //     name: randomCity,
    //     coordinates: coordinates
    //   };
    // };

    const offerAuthor = [
      author,
      userId,
      email,
      avatar,
      password,
      authorType,
    ].join(';');

    const coordinates = `${latitude};${longitude}`;

    return [
      title, description, createdDate, city,
      previewPhoto, offerPhotos, isPremium, isFavorite,
      rating, type, roomsCount, guestsCount, price,
      facilities, offerAuthor, commentsCount, coordinates,
    ].join('\t');
  }
}

