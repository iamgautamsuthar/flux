#!/usr/bin/env node

import axios from 'axios';
import tar from 'tar';
import yargs from 'yargs';
import fs from 'fs';
import path from 'path';

const getPackageInformation = async (packageName) => {
    try {
        const url = `https://registry.npmjs.org/${pkgName}`;
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
            `https://registry.npmjs.org/${pkgName}/-/` +
            `${pkgName}-${version}.tgz`;

        const response = await axios({
            url: tarballUrl,
            responseType: 'stream',
        });
        const filePath = path.join(__dirname, `${packageName}-${version}.tgz`);
        const writer = fs.createWriteStream(filePath);
        response.data.pipe(writer);

        writer.on('finish', () => {
            console.log(`Package ${packageName} downloaded successfully.`);
            extractPackage(packageName, filePath);
        });
    } catch (error) {
        console.log(`Error while downloading package: ${error}`);
        process.exit(1);
    }
};

const extractPackage = async (packageName, filePath) => {
    try {
        const extractPath = path.join(__dirname, 'node_modules', packageName);
        await tar.x({ file: filePath, C: extractPath, strip: 1 });
        console.log(`Package ${packageName} extracted successfully.`);
    } catch (error) {
        console.log(`Error while extracting package: ${error}`);
        process.exit(1);
    }
};
