import { readPackageJson } from '../../utils/fileSystem.js';
import logger from '../../utils/logger.js';
import getPackageInformation from '../install/packageInfo.js';

const listOutdated = async () => {
    try {
        const isAnyUpdate = false;
        const packageData = readPackageJson();

        if (!packageData.dependencies) {
            logger.info('No dependencies found.');
            return;
        }

        Object.keys(packageData.dependencies).forEach((packageName) => {
            const packageInfo = getPackageInformation(packageName);
            const version = packageInfo['dist-tags'].latest;

            if (packageData.dependencies[packageName] != version) {
                logger.info(
                    `${packageName}@${packageData.dependencies[packageName]} -> ${packageName}@${version}`
                );
                isAnyUpdate = true;
            }
        });

        if (!isAnyUpdate) {
            logger.info('All packages are up to date.');
        }
    } catch (error) {
        logger.error(`Error while listing outdated packages: ${error}`);
        process.exit(1);
    }
};

export default listOutdated;
