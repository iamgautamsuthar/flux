import * as tar from 'tar';
import fs from 'fs';
import path from 'path';
import addDependency from './addDependency.js';

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
        // console.log(`Package ${packageName} extracted successfully.`);
        addDependency(packageName, version);
        try {
            fs.unlinkSync(filePath);
            // console.log('File deleted successfully.');
        } catch (err) {
            console.error('Error deleting file:', err);
        }
    } catch (error) {
        console.log(`Error while extracting package: ${error}`);
        process.exit(1);
    }
};

export default extractPackage;
