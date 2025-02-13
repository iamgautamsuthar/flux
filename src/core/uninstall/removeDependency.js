import deleteDependency from './deleteDependency.js';
import logger from '../../utils/logger.js';
import { readPackageJson, writePackageJson } from '../../utils/fileSystem.js';

const removeDependency = (packageName) => {
    const packageData = readPackageJson();

    if (!packageData.dependencies || !packageData.dependencies[packageName]) {
        logger.error(`Package ${packageName} is not found.`);
        process.exit(1);
    }

    logger.info(`Uninstalling package: ${packageName}...`);

    delete packageData.dependencies[packageName];
    writePackageJson(packageData);

    deleteDependency(packageName);
};

export default removeDependency;
