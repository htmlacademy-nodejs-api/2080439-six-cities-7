export interface Command {
  getName(): string;

  execute(...parametres: string[]): void;
}
