# **Flux - A Minimal Package Manager**

Flux is a lightweight package manager designed to simplify dependency management for JavaScript projects. With support for basic package installation, uninstallation, listing installed packages, and now updating packages, Flux is steadily evolving. More features are on the way!

🚧 **Alpha Version**: Flux is still in its early development phase and not yet ready for production use. We welcome contributors to help shape its future!

---

## **✨ Features**

### ✅ **Implemented**

-   **Install Packages**: Download and add packages to `node_modules`.

    ```sh
    flux install package-name
    ```

-   **Uninstall Packages**: Remove installed packages from `node_modules`.

    ```sh
    flux uninstall package-name
    ```

-   **List Installed Packages**: Display all installed dependencies.

    ```sh
    flux list
    ```

-   **Update a Package**: Update a specific package to its latest version.

    ```sh
    flux update package-name
    ```

### 🔜 **Upcoming Features**

-   **Search for Packages** (`flux search package-name`): Find packages from the registry.
-   **Check for Updates** (`flux outdated`): List packages with newer versions.
-   **Reinstall All Packages** (`flux reinstall`): Remove `node_modules` and reinstall dependencies.
-   **Global Package Management** (`flux global install package-name`): Install packages globally.
-   **Dependency Tree Viewer** (`flux tree`): View package dependency hierarchy.
-   **Lockfile Support**: Ensure deterministic installs.
-   **Alias Support**: Shortcuts for common commands.
-   **Custom Registry Support**: Use alternative registries instead of npm.

---

## **🚀 Beta Version**

If you'd like to try the beta version of Flux, you can download the installer `.exe` from the repository or directly from this link:

-   **Exe Location in Repo**: `flux/install/install_flux.exe`
-   **Download Link**: [Flux Installer](https://github.com/iamgautamsuthar/flux/releases/download/v0.1.0-alpha/install_flux.exe)

### How to Install:

1. Download the `.exe` file from the link or repository.
2. **Run it as Admin**. If Windows Defender blocks it, simply click on **"Run anyway"**.
    - Please note that this warning occurs because we don't have a publisher license. It's completely safe, and you can review the installation script (`install_flux.ps1`) to verify its safety.

### To Update:

-   To get the latest version of Flux, just **reinstall the installer**, and it will automatically update to the latest version.

---

## 💡 **Contributing**

Flux is open for contributions! If you have ideas, bug fixes, or feature requests, feel free to open an issue or submit a pull request.

1. Fork the repository.
2. Create a new branch for your feature.
3. Submit a pull request for review.

We appreciate your support in making Flux better!

---

## 📜 **License**

Flux is open-source and licensed under the [MIT License](LICENSE).

---

⚠️ **Note**: Flux is still in its **alpha phase**, so expect changes and improvements before the first stable release.
