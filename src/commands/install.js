import downloadPackage from '../utils/download.js';

const install = (packageName) => {
    console.log(`Installing package: ${packageName}...`);
    downloadPackage(packageName);
};

export default install;
