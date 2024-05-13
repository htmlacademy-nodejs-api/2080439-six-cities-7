#!/usr/bin/env node

import { CLIApplication, HeplCommand, ImportCommand, VersionCommand, GenerateCommand } from './cli/index.js';

function bootstrap() {
  const cliApplication = new CLIApplication();
  cliApplication.registerCommands([
    new HeplCommand,
    new VersionCommand,
    new ImportCommand,
    new GenerateCommand,
  ]);

  cliApplication.processComand(process.argv);
}

bootstrap();
