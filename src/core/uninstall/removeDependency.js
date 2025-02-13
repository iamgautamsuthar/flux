import deleteDependency from './deleteDependency.js';
import logger from '../../utils/logger.js';
import { readPackageJson, writePackageJson } from '../../utils/fileSystem.js';

const removeDependency = (packageName) => {
    const packageData = readPackageJson();

    if (!packageData.dependencies || !packageData.dependencies[packageName]) {
        logger.error(`Package ${packageName} not found in dependencies.`);
        process.exit(1);
    }

    delete packageData.dependencies[packageName];

    writePackageJson(packageData);

    logger.info(`Package ${packageName} removed from dependencies.`);

    deleteDependency(packageName);
};

export default removeDependency;
