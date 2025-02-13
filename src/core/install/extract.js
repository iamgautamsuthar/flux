import * as tar from 'tar';
import fs from 'fs';
import path from 'path';
import addDependency from './addDependency.js';
import logger from '../../utils/logger.js';

const currentDir = process.cwd();

const extractPackage = async (packageName, version, filePath) => {
    try {
        const extractPath = path.join(currentDir, 'node_modules', packageName);

        const nodeModulesPath = path.join(currentDir, 'node_modules');
        if (!fs.existsSync(nodeModulesPath)) {
            fs.mkdirSync(nodeModulesPath);
        }

        if (!fs.existsSync(extractPath)) {
            fs.mkdirSync(extractPath);
        }

        await tar.x({ file: filePath, C: extractPath, strip: 1 });
        addDependency(packageName, version);
        try {
            fs.unlinkSync(filePath);
        } catch (err) {
            logger.error(`Error while deleting package: ${err}`);
        }
    } catch (error) {
        logger.error(`Error while extracting package: ${error}`);
        process.exit(1);
    }
};

export default extractPackage;
