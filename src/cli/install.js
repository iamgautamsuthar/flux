import downloadPackage from '../core/install/download.js';
import logger from '../utils/logger.js';

const install = (packageName) => {
    logger.info(`Installing package: ${packageName}...`);
    downloadPackage(packageName);
};

export default install;
