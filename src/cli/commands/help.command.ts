import chalk from 'chalk';
import { Command } from './command.interface.js';

export class HeplCommand implements Command {
  public getName(): string {
    return '--help';
  }

  public async execute(..._parametres: string[]): Promise<void> {
    console.info(`
      Программа для подготовки данных для REST API сервера.
      Пример:
          cli.js --<command> [--arguments]
      Команды:
          ${chalk.red('--version')}:                   # показывает номер версии программы
          ${chalk.red('--help')}:                      # показывает все доступные команды
          ${chalk.red('--import <path>')}:             # импортирует данные из TSV
          ${chalk.red('--generate <n> <path> <url>')}  # генерирует произвольное количество тестовых данных
    `);
  }
}
