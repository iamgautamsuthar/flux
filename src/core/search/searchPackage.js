import logger from '../../utils/logger.js';
import getPackageInformation from '../install/packageInfo.js';

const searchPackage = async (packageName) => {
    try {
        const packageInfo = getPackageInformation(packageName);
        if (!packageInfo) {
            logger.error(`${packageName} does not exists.`);
            process.exit(1);
        }
        const description = packageInfo['description'];
        const version = packageInfo['dist-tags'].latest;

        logger.info(`${packageName} @ ${version} - ${description}`);
    } catch (error) {
        logger.error('Error while fetching data...');
    }
};

export default searchPackage;
