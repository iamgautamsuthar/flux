import fs from 'fs';
import path from 'path';

const readPackageJson = () => {
    const currentDir = process.cwd();
    const packageJsonPath = path.join(currentDir, 'package.json');
    let packageData = {};

    if (fs.existsSync(packageJsonPath)) {
        const fileContent = fs.readFileSync(packageJsonPath, 'utf8');
        packageData = JSON.parse(fileContent);
    }

    if (!packageData.dependencies) {
        packageData.dependencies = {};
    }

    return packageData;
};

const writePackageJson = (packageData) => {
    const currentDir = process.cwd();
    const packageJsonPath = path.join(currentDir, 'package.json');

    fs.writeFileSync(
        packageJsonPath,
        JSON.stringify(packageData, null, 2),
        'utf8'
    );
};

export { readPackageJson, writePackageJson };
