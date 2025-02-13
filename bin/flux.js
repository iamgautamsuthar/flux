#!/usr/bin/env node

import { Command } from 'commander';
import { install, uninstall, list, update } from '../src/index.js';

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

program.command('list').description('List installed packages').action(list);

program
    .command('update <package>')
    .description('Update a package')
    .action(update);

program.parse(process.argv);
