import axios from 'axios';
import fs from 'fs';
import path from 'path';
import getPackageInformation from './packageInfo.js';
import extractPackage from './extract.js';

const currentDir = process.cwd();

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
        const filePath = path.join(currentDir, `${packageName}-${version}.tgz`);
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

export default downloadPackage;
