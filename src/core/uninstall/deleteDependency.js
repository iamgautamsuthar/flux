import path from 'path';
import fs from 'fs';
import logger from '../../utils/logger.js';

const currentDir = process.cwd();
const deleteDependency = async (packageName) => {
    const packagePath = path.join(currentDir, 'node_modules', packageName);

    if (fs.existsSync(packagePath)) {
        fs.rmSync(packagePath, { recursive: true });
        logger.success(`Uninstalled ${packageName} successfully.`);
    }
};

export default deleteDependency;
