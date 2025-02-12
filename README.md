# Flux - A Minimal Package Manager

Flux is a lightweight package manager designed to simplify dependency management for JavaScript projects. Currently, Flux supports basic installation and uninstallation of packages, with more features coming soon.

🚧 **Alpha Version**: Flux is still in its early development phase and not yet ready for production use. We welcome contributors to help shape its future!

---

## 🚀 Features

### ✅ Implemented

-   **Install Packages**: Download and add packages to `node_modules`.
    ```sh
    flux install package-name
    ```
-   **Uninstall Packages**: Remove installed packages from `node_modules`.
    ```sh
    flux uninstall package-name
    ```

### 🔜 Upcoming Features

-   **List Installed Packages** (`flux list`): Show all installed dependencies.
-   **Update Package** (`flux update package-name`): Update specific or all packages.
-   **Search for Packages** (`flux search package-name`): Find packages from the registry.
-   **Check for Updates** (`flux outdated`): List packages with newer versions.
-   **Reinstall All Packages** (`flux reinstall`): Remove `node_modules` and reinstall dependencies.
-   **Global Package Management** (`flux global install package-name`): Install packages globally.
-   **Dependency Tree Viewer** (`flux tree`): View package dependency hierarchy.
-   **Lockfile Support**: Ensure deterministic installs.
-   **Alias Support**: Shortcuts for common commands.
-   **Custom Registry Support**: Use alternative registries instead of npm.

---

## 💡 Contributing

Flux is open for contributions! If you have ideas, bug fixes, or feature requests, feel free to open an issue or submit a pull request.

1. Fork the repository.
2. Create a new branch for your feature.
3. Submit a pull request for review.

We appreciate your support in making Flux better!

---

## 📜 License

Flux is open-source and licensed under [MIT License](LICENSE).

---

⚠️ **Note**: Flux is still in its **alpha phase**, so expect changes and improvements before the first stable release.
