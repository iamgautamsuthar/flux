#!/usr/bin/env node

import { Command } from 'commander';
import {
    install,
    uninstall,
    list,
    update,
    updateAll,
    reinstall,
    reinstallAll,
    uninstallAll,
    outdated,
    search,
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
    .action((packageName) => {
        if (packageName === 'all') {
            uninstallAll();
        } else {
            uninstall(packageName);
        }
    });

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
    .action((packageName) => {
        if (packageName === 'all') {
            reinstallAll();
            return;
        } else {
            reinstall(packageName);
        }
    });

program
    .command('outdated')
    .aliases(['out, old, new'])
    .description('List outdated packages')
    .action(outdated);

program
    .command('search <package>')
    .aliases(['s, sr'])
    .description('Search info about package')
    .action(search);
program.parse(process.argv);
