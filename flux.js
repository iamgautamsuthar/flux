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
