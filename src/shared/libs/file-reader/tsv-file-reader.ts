
import { EventEmitter } from 'node:events';
import { createReadStream } from 'node:fs';

import { FileReader } from './file-reader.interface.js';
import { Offer, OfferTypeEnum, CoordinatesType, FacilitiesEnum } from '../../types/offer.type.js';
import { CityType, CityName, Cities } from '../../types/city.type.js';
import { User, UserType } from '../../types/user.type.js';

export class TSVFileReader extends EventEmitter implements FileReader {
  private CHUNK_SIZE = 16384;

  constructor(
    private filename: string
  ) {
    super();
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
    const [name, mail, avatar, type] = author.split(';');

    return {
      name,
      mail,
      avatar,
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

  private parseFacilities(facilities: string): Array<FacilitiesEnum> {
    const facilitiesArray = facilities.split(';');
    return facilitiesArray.map((facility) => facility as FacilitiesEnum);
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

  public async read(): Promise<void> {
    const readStream = createReadStream(this.filename, {
      highWaterMark: this.CHUNK_SIZE,
      encoding: 'utf-8',
    });

    let remainingData = '';
    let nextLinePosition = -1;
    let importedRowCount = 0;

    for await (const chunk of readStream) {
      remainingData += chunk.toString();

      while ((nextLinePosition = remainingData.indexOf('\n')) >= 0) {
        const completeRow = remainingData.slice(0, nextLinePosition + 1);
        remainingData = remainingData.slice(++nextLinePosition);
        importedRowCount++;

        const parsedOffer = this.parseLineToOffer(completeRow);
        await new Promise((resolve) => {
          this.emit('line', parsedOffer, resolve);
        });
      }
    }

    this.emit('end', importedRowCount);
  }
}
