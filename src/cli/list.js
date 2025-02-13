import listPackages from '../core/list/listPackages.js';
import logger from '../utils/logger.js';

const list = () => {
    logger.info(`Listing packages...`);
    listPackages();
};

export default list;
