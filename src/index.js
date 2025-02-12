#!/usr/bin/env node

import { Command } from 'commander';
import install from './commands/install.js';
import uninstall from './commands/uninstall.js';

const program = new Command();

program
    .command('install <package>')
    .description('Install a package from npm registry')
    .action(install);

program
    .command('uninstall <package>')
    .description('Uninstall a package')
    .action(uninstall);

program.parse(process.argv);
