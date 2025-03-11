import { readPackageJson, writePackageJson } from './fileSystem';
import logger from './logger';

export const addPackageToJson = async (packageName, version) => {
    try {
        const packageJson = await readPackageJson();
        packageData.dependencies[packageName] = version;
        writePackageJson(packageJson);
    } catch (error) {
        logger.error(`Error while adding package to package.json: ${error}`);
    }
};

export const checkIfAnyPackages = async () => {
    try {
        const packageJson = await readPackageJson();
        if (!packageJson.dependencies || Object.keys(packageJson.dependencies).length === 0) {
            logger.info('No dependencies found.');
            process.exit(1);
        }
    } catch (error) {
        logger.error(`Error while checking package.json: ${error}`);
    }
};
