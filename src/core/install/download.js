import axios from 'axios';
import fs from 'fs';
import path from 'path';
import getPackageInformation from './packageInfo.js';
import extractPackage from './extract.js';
import logger from '../../utils/logger.js';
import config from '../../utils/config.js';

const currentDir = process.cwd();

const downloadPackage = async (packageName) => {
    try {
        const data = await getPackageInformation(packageName);
        const version = data['dist-tags'].latest;
        const tarballUrl =
            `${config.registry}${packageName}/-/` +
            `${packageName}-${version}.tgz`;

        const response = await axios({
            url: tarballUrl,
            responseType: 'stream',
        });
        const filePath = path.join(currentDir, `${packageName}-${version}.tgz`);
        const writer = fs.createWriteStream(filePath);
        response.data.pipe(writer);

        logger.info(`Installing package: ${packageName}...`);

        writer.on('finish', () => {
            extractPackage(packageName, version, filePath);
        });
    } catch (error) {
        logger.error(`Error while downloading package: ${error}`);
        process.exit(1);
    }
};

export default downloadPackage;
