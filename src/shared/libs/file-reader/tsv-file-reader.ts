import { readFileSync } from 'node:fs';
import { FileReader } from './file-reader.interface.js';
import { Offer, OfferTypeEnum, CoordinatesType } from '../../types/offer.type.js';
import { CityType, CityName, Cities } from '../../types/city.type.js';
import { User, UserType } from '../../types/user.type.js';

export class TSVFileReader implements FileReader {
  private rawData = '';

  constructor(
    private filename: string
  ) {}

  private parseRawDataToOffers(): Offer[] {
    return this.rawData
      .split('\n')
      .filter((row) => row.trim().length > 0)
      .map((line) => this.parseLineToOffer(line));
  }

  private parseLineToOffer(line: string): Offer {
    const [
      title,
      description,
      publishDate,
      city,
      previewImage,
      photos,
      isPremium,
      isFavorite,
      rating,
      type,
      roomsCount,
      guestsQuantity,
      price,
      facilities,
      offerAuthor,
      commentsCount,
      coordinates
    ] = line.split('\t');

    return {
      title,
      description,
      publishDate: new Date(publishDate),
      city: this.parseCity(city as CityName),
      previewImage,
      photos: this.parsePhotos(photos),
      isPremium: this.parseBoolean(isPremium),
      isFavorite: this.parseBoolean(isFavorite),
      rating: parseFloat(rating),
      type: type as OfferTypeEnum,
      roomsCount: Number.parseInt(roomsCount, 10),
      guestsQuantity: Number.parseInt(guestsQuantity, 10),
      price: Number.parseFloat(price),
      facilities: this.parseFacilities(facilities),
      offerAuthor: this.parseOfferAuthor(offerAuthor),
      commentsCount: Number.parseInt(commentsCount, 10),
      coordinates: this.parseCoordinates(coordinates)
    };
  }

  private parseOfferAuthor(author: string): User {
    const [name, id, mail, avatar, password, type] = author.split(';');

    return {
      name,
      id: Number.parseInt(id, 10),
      mail,
      avatar,
      password,
      type: type as UserType,
    };
  }

  private parseCoordinates(str: string): CoordinatesType {
    const [latitude, longitude] = str.split(';');

    return {
      latitude: Number.parseFloat(latitude),
      longitude: Number.parseFloat(longitude),
    };
  }

  private parseFacilities(facilities: string): string[] {
    return facilities.split(';');
  }

  private parseBoolean(parseString: string): boolean {
    return parseString === 'true';
  }

  private parseCity(parseCity: CityName): CityType {
    const isValidCity = Object.keys(Cities).some((city) => city === parseCity);

    if (isValidCity) {
      return {
        name: parseCity,
        coordinates: Cities[parseCity],
      };
    }

    return {
      name: parseCity,
      coordinates: {
        latitude: 0,
        longitude: 0,
      }
    };
  }

  private parsePhotos(parsePhotos: string): string[] {
    return parsePhotos.split(';');
  }

  private validateRawData(): void {
    if (!this.rawData) {
      throw new Error('File was not read.');
    }
  }

  public read(): void {
    this.rawData = readFileSync(this.filename, 'utf-8');
  }

  public toArray(): Offer[] {
    this.validateRawData();
    return this.parseRawDataToOffers();
  }
}
