import { readPackageJson } from '../../utils/fileSystem.js';
import logger from '../../utils/logger.js';
import removeDependency from './removeDependency.js';

const uninstallAllPackages = async () => {
    const packageJSON = readPackageJson();
    const dependencies = packageJSON.dependencies;
    logger.info('Uninstalling all packages...');
    for (const dependency in dependencies) {
        removeDependency(dependency);
    }
};

export default uninstallAllPackages;
