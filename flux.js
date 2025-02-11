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
