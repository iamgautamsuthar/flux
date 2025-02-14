import logger from '../../utils/logger.js';
import downloadPackage from '../install/download.js';
import removeDependency from '../uninstall/removeDependency.js';

const reinstallPackage = async (packageName) => {
    logger.info(`Reinstalling ${packageName}...`);
    removeDependency(packageName);
    downloadPackage(packageName);
};
export default reinstallPackage;
