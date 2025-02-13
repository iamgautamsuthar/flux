import { readPackageJson } from '../../utils/fileSystem.js';
import logger from '../../utils/logger.js';

const listPackages = async () => {
    try {
        const packageData = readPackageJson();

        if (!packageData.dependencies) {
            logger.info('No dependencies found.');
            return;
        }

        packageData.dependencies.forEach((dependency) => {
            logger.info(`${dependency}`);
        });

        logger.success('Packages listed successfully.');
    } catch (error) {
        logger.error(`Error while listing packages: ${error}`);
        process.exit(1);
    }
};

export default listPackages;
