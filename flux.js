#!/usr/bin/env node

import axios from 'axios';
import * as tar from 'tar';
import { Command } from 'commander';

const program = new Command();
import fs from 'fs';
import path from 'path';

import { fileURLToPath } from 'url';
import { dirname } from 'path';

console.log('Hello from flux.js');

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getPackageInformation = async (packageName) => {
    try {
        const url = `https://registry.npmjs.org/${packageName}`;
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.log(`Error while fetching package information: ${error}`);
        process.exit(1);
    }
};

const downloadPackage = async (packageName) => {
    try {
        const data = await getPackageInformation(packageName);
        const version = data['dist-tags'].latest;
        const tarballUrl =
            `https://registry.npmjs.org/${packageName}/-/` +
            `${packageName}-${version}.tgz`;

        const response = await axios({
            url: tarballUrl,
            responseType: 'stream',
        });
        const filePath = path.join(__dirname, `${packageName}-${version}.tgz`);
        const writer = fs.createWriteStream(filePath);
        response.data.pipe(writer);

        writer.on('finish', () => {
            console.log(`Package ${packageName} downloaded successfully.`);
            extractPackage(packageName, version, filePath);
        });
    } catch (error) {
        console.log(`Error while downloading package: ${error}`);
        process.exit(1);
    }
};

const extractPackage = async (packageName, version, filePath) => {
    try {
        const extractPath = path.join(__dirname, 'node_modules', packageName);

        const nodeModulesPath = path.join(__dirname, 'node_modules');
        if (!fs.existsSync(nodeModulesPath)) {
            fs.mkdirSync(nodeModulesPath);
        }

        if (!fs.existsSync(extractPath)) {
            fs.mkdirSync(extractPath);
        }

        await tar.x({ file: filePath, C: extractPath, strip: 1 });
        console.log(`Package ${packageName} extracted successfully.`);
        addDependency(packageName, version);
        try {
            fs.unlinkSync(filePath);
            console.log('File deleted successfully.');
        } catch (err) {
            console.error('Error deleting file:', err);
        }
    } catch (error) {
        console.log(`Error while extracting package: ${error}`);
        process.exit(1);
    }
};

const addDependency = (packageName, version) => {
    const packageJsonPath = path.join(__dirname, 'package.json');
    let packageData = {};

    if (fs.existsSync(packageJsonPath)) {
        const fileContent = fs.readFileSync(packageJsonPath, 'utf8');
        packageData = JSON.parse(fileContent);
    }

    if (!packageData.dependencies) {
        packageData.dependencies = {};
    }

    packageData.dependencies[packageName] = version;

    fs.writeFileSync(
        packageJsonPath,
        JSON.stringify(packageData, null, 2),
        'utf8'
    );

    console.log(`Added ${packageName}@${version} to dependencies.`);
};

program
    .command('install <package>')
    .description('Install a package from npm registry')
    .action((packageName) => {
        console.log(`Installing package: ${packageName}...`);
        downloadPackage(packageName);
    });

program.parse(process.argv);
