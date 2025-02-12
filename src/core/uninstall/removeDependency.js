import path from 'path';
import fs from 'fs';
import deleteDependency from './deleteDependency.js';

const currentDir = process.cwd();

const removeDependency = (packageName) => {
    const packageJsonPath = path.join(currentDir, 'package.json');

    let packageData = {};

    if (fs.existsSync(packageJsonPath)) {
        const fileContent = fs.readFileSync(packageJsonPath, 'utf8');
        packageData = JSON.parse(fileContent);
    }

    if (!packageData.dependencies || !packageData.dependencies[packageName]) {
        console.log(`Package ${packageName} not found in dependencies.`);
        process.exit(1);
    }

    delete packageData.dependencies[packageName];

    fs.writeFileSync(
        packageJsonPath,
        JSON.stringify(packageData, null, 2),
        'utf8'
    );
    console.log(`Removed ${packageName} from dependencies.`);
    deleteDependency(packageName);
};

export default removeDependency;
