import { addPackageToJson } from '../utils/packageJson.js';
import { downloadPackage } from '../utils/downloadPackage.js';
import { extractPackage } from '../utils/fileSystem.js';
import { fetchPackageInformation } from '../utils/fetchPackageInformation.js';
import logger from '../utils/logger.js';

const install = async (packageName) => {
    const data = await fetchPackageInformation(packageName);
    const version = data['dist-tags'].latest;
    const filePath = await downloadPackage(packageName, version);
    await extractPackage(packageName, filePath);
    await addPackageToJson(packageName, version);
    logger.success(`Package ${packageName}@${version} installed successfully.`);
};

export default install;
