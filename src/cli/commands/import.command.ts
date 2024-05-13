import { TSVFileReader } from '../../shared/libs/file-reader/tsv-file-reader.js';
import { Command } from './command.interface.js';
import { Offer } from '../../shared/types/offer.type.js';
import { getErrorMessage } from '../../shared/helpers/index.js';

export class ImportCommand implements Command {
  private onImportedOffer(offer: Offer): void {
    console.info(offer);
  }

  private onCompleteImport(count: number) {
    console.info(`${count} rows imported.`);
  }

  public getName(): string {
    return '--import';
  }

  public async execute(...parametres: string[]): Promise<void> {

    const [filename] = parametres;
    const fileReader = new TSVFileReader(filename.trim());

    fileReader.on('line', this.onImportedOffer);
    fileReader.on('end', this.onCompleteImport);

    try {
      fileReader.read();
    } catch (error) {
      console.error(getErrorMessage(error));
      console.error(`Can't import data from file: ${filename}`);
    }
  }
}
