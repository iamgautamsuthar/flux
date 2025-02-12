import fs from 'fs';
import path from 'path';

const currentDir = process.cwd();

const addDependency = (packageName, version) => {
    const packageJsonPath = path.join(currentDir, 'package.json');
    let packageData = {};

    if (fs.existsSync(packageJsonPath)) {
        const fileContent = fs.readFileSync(packageJsonPath, 'utf8');
        packageData = JSON.parse(fileContent);
    }

    if (!packageData.dependencies) {
        packageData.dependencies = {};
    }

    packageData.dependencies[packageName] = version;

    fs.writeFileSync(
        packageJsonPath,
        JSON.stringify(packageData, null, 2),
        'utf8'
    );
    console.log(`Added ${packageName}@${version} to dependencies.`);
};

export default addDependency;
