#!/usr/bin/env node

import { Command } from 'commander';
import { install, uninstall } from '../src/index.js';
import logger from '../src/utils/logger.js';

const program = new Command();

program
    .name('flux')
    .description('A minimal package manager for JavaScript')
    .version('0.1.0');

program
    .command('install <package>')
    .description('Install a package from npm registry')
    .action(install);

program
    .command('uninstall <package>')
    .description('Uninstall a package')
    .action(uninstall);

program.parse(process.argv);
