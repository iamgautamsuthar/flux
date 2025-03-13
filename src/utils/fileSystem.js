import fs from 'fs';
import * as tar from 'tar';
import path from 'path';
import logger from './logger.js';

const packageJsonPath = path.join(process.cwd(), 'package.json');
const currentDir = process.cwd();

export const readPackageJson = async () => {
    try {
        const fileContent = await fs.promises.readFile(packageJsonPath, 'utf8');
        const packageData = JSON.parse(fileContent);
        return { ...packageData, dependencies: packageData.dependencies || {} };
    } catch (error) {
        if (error.code === 'ENOENT') {
            logger.error('package.json not found in the current directory.');
        } else {
            logger.error(`Error while reading package.json: ${error}`);
        }
        process.exit(1);
    }
};

export const writePackageJson = async (packageData) => {
    try {
        const formattedData = JSON.stringify(packageData, null, 2);
        await fs.promises.writeFile(packageJsonPath, formattedData, 'utf8');
    } catch (error) {
        logger.error(`Error while writing package.json: ${error}`);
        process.exit(1);
    }
};

export const extractPackage = async (packageName, filePath) => {
    try {
        const extractionPath = path.join(currentDir, 'node_modules', packageName);
        const nodeModulesPath = path.join(currentDir, 'node_modules');

        await fs.promises.mkdir(nodeModulesPath, { recursive: true });
        await fs.promises.mkdir(extractionPath, { recursive: true });

        await tar.x({ file: filePath, C: extractionPath, strip: 1 });
    } catch (error) {
        logger.error(`Error while extracting package: ${error}`);
        process.exit(1);
    } finally {
        try {
            await fs.unlink(filePath);
        } catch (err) {
            logger.warn(`Could not delete tarball ${filePath}: ${err.message}`);
            process.exit(1);
        }
    }
};

export const removePackageFromModule = async (packageName) => {
    try {
        const packagePath = path.join(currentDir, 'node_modules', packageName);
        try {
            await fs.access(packagePath);
        } catch (error) {
            logger.error(`Package ${packageName} is not found.`);
            process.exit(1);
        }

        await fs.promises.rm(packagePath, { recursive: true, force: true });
    } catch (error) {
        logger.error(`Error while deleting package: ${error}`);
        process.exit(1);
    }
};
