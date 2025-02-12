import path from 'path';
import fs from 'fs';

const currentDir = process.cwd();
const deleteDependency = async (packageName) => {
    const packagePath = path.join(currentDir, 'node_modules', packageName);

    if (fs.existsSync(packagePath)) {
        fs.rmSync(packagePath, { recursive: true });
        console.log(`Deleted ${packageName} from node_modules.`);
    }
};

export default deleteDependency;
