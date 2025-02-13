import logger from '../../utils/logger.js';
import { readPackageJson, writePackageJson } from '../../utils/fileSystem.js';

const addDependency = (packageName, version) => {
    const packageData = readPackageJson();

    packageData.dependencies[packageName] = version;

    writePackageJson(packageData);

    logger.info(`Added ${packageName}@${version} to dependencies.`);
    logger.success('Package installed successfully.');
};

export default addDependency;
