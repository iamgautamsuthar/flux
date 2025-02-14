import { readPackageJson } from '../../utils/fileSystem.js';
import logger from '../../utils/logger.js';
import reinstallPackage from './reinstallPackage.js';

const reinstallAllPackages = async () => {
    const packageJSON = readPackageJson();
    const dependencies = packageJSON.dependencies;
    logger.info('Reinstalling all packages ...');

    for (const packageName in dependencies) {
        reinstallPackage(packageName);
    }
};

export default reinstallAllPackages;
