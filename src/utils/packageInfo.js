import axios from 'axios';

const getPackageInformation = async (packageName) => {
    try {
        const url = `https://registry.npmjs.org/${packageName}`;
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.log(`Error while fetching package information: ${error}`);
        process.exit(1);
    }
};

export default getPackageInformation;
