#!/usr/bin/env node

import { Command } from 'commander';
import {
    install,
    uninstall,
    list,
    update,
    updateAll,
    reinstall,
} from '../src/index.js';

const program = new Command();

program
    .name('flux')
    .description('A minimal package manager for JavaScript')
    .version('0.1.0');

program
    .command('install <package>')
    .aliases(['i', 'add'])
    .description('Install a package from npm registry')
    .action(install);

program
    .command('uninstall <package>')
    .aliases(['remove', 'rm', 'delete'])
    .description('Uninstall a package')
    .action(uninstall);

program
    .command('list')
    .aliases(['ls', 'show'])
    .description('List installed packages')
    .action(list);

program
    .command('update <package>')
    .aliases(['up', 'upgrade'])
    .description('Update a package')
    .action((packageName) => {
        if (packageName === 'all') {
            updateAll();
        } else {
            update(packageName);
        }
    });

program
    .command('reinstall <package>')
    .aliases(['re', 're-i'])
    .description('Reinstall a package')
    .action(reinstall);

program.parse(process.argv);
