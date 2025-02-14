import { readPackageJson } from '../../utils/fileSystem.js';
import logger from '../../utils/logger.js';
import updatePackage from './updatePackage.js';

const updateAllPackages = async () => {
    const packageJSON = readPackageJson();
    const dependencies = packageJSON.dependencies;

    logger.info('Updating all packages ...');

    for (const packageName in dependencies) {
        updatePackage(packageName);
    }
};

export default updateAllPackages;
