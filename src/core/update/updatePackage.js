import { readPackageJson } from '../../utils/fileSystem.js';
import logger from '../../utils/logger.js';
import downloadPackage from '../install/download.js';
import getPackageInformation from '../install/packageInfo.js';

const updatePackage = async (packageName) => {
    const packageInfo = await getPackageInformation(packageName);
    const version = packageInfo['dist-tags'].latest;

    const dependencyInfo = readPackageJson();

    if (!dependencyInfo.dependencies[packageName]) {
        logger.error(`Package ${packageName} is not installed.`);
        return;
    }

    if (dependencyInfo.dependencies[packageName] == version) {
        logger.info(`Package ${packageName} is already up to date.`);
        return;
    }

    logger.info(`Updating package ${packageName} ...`);

    downloadPackage(packageName);
};

export default updatePackage;
