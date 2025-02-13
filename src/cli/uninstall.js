import removeDependency from '../core/uninstall/removeDependency.js';

const uninstall = async (packageName) => {
    removeDependency(packageName);
};

export default uninstall;
