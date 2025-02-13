import updatePackage from '../core/update/updatePackage.js';
import logger from '../utils/logger.js';

const update = (packageName) => {
    updatePackage(packageName);
};

export default update;
