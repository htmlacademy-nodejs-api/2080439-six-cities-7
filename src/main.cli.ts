#!/usr/bin/env node

import { CLIApplication, HeplCommand, ImportCommand, VersionCommand } from './cli/index.js';

function bootstrap() {
  const cliApplication = new CLIApplication();
  cliApplication.registerCommands([
    new HeplCommand,
    new VersionCommand,
    new ImportCommand,
  ]);

  cliApplication.processComand(process.argv);
}

bootstrap();
