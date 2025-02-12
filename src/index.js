#!/usr/bin/env node

import { Command } from 'commander';
import install from './commands/install.js';

const program = new Command();

program
    .command('install <package>')
    .description('Install a package from npm registry')
    .action(install);

program.parse(process.argv);
