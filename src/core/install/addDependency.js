import logger from '../../utils/logger';
import { readPackageJson, writePackageJson } from '../../utils/fileSystem';

const addDependency = (packageName, version) => {
    const packageData = readPackageJson();

    packageData.dependencies[packageName] = version;

    writePackageJson(packageData);

    logger.info(`Added ${packageName}@${version} to dependencies.`);
    logger.success('Package installed successfully.');
};

export default addDependency;
