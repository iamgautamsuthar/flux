import removeDependency from '../utils/uninstall/removeDependency.js';

const uninstall = async (packageName) => {
    console.log(`Uninstalling package: ${packageName}...`);
    removeDependency(packageName);
};

export default uninstall;
