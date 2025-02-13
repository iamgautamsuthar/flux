import removeDependency from '../core/uninstall/removeDependency.js';
import logger from '../utils/logger.js';

const uninstall = async (packageName) => {
    logger.info(`Uninstalling package: ${packageName}...`);
    removeDependency(packageName);
};

export default uninstall;
