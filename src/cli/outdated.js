import { fetchPackageInformation } from '../../utils/fetchPackageInformation.js';
import { readPackageJson } from '../../utils/fileSystem.js';
import logger from '../../utils/logger.js';
import { checkIfAnyPackages } from '../../utils/packageJson.js';

const outdated = () => {
    try {
        checkIfAnyPackages();
        let isAnyUpdate = false;
        const packageJson = readPackageJson();

        Object.keys(packageJson.dependencies).forEach((packageName) => {
            const packageInfo = fetchPackageInformation(packageName);
            const latestVersion = packageInfo['dist-tags'].latest;
            const currentVersion = packageJson.dependencies[packageName];

            if (currentVersion != latestVersion) {
                logger.info(
                    `${packageName}@${packageJson.dependencies[packageName]} -> ${packageName}@${latestVersion}`
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

export default outdated;
