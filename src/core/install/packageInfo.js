import axios from 'axios';
import config from '../../utils/config.js';

const getPackageInformation = async (packageName) => {
    try {
        const url = `${config.registry}${packageName}`;
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        logger.error(`Error while fetching package information: ${error}`);
        process.exit(1);
    }
};

export default getPackageInformation;
