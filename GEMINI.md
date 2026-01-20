# DrupalDeveloper Project Overview

## Project Description
**DrupalDeveloper** is a comprehensive knowledge base and practical guide designed to facilitate the development of robust web applications using **Drupal 8 and 9**. Unlike theoretical documentation, this project focuses on pragmatic, "to-the-point" content, providing ready-to-use code snippets, command-line instructions, and best practices for Drupal developers.

The repository serves as both a reference manual and a collection of utilities, covering the entire development stack from Back-end APIs to Front-end theming and DevOps infrastructure.

## Directory Structure Overview

*   **`Back-end/`**: Contains detailed documentation and code examples for Drupal's server-side APIs (Entities, Forms, Database, Rest, etc.).
*   **`Front-end/`**: Covers client-side technologies in the context of Drupal, including Twig templates, SASS/CSS, JavaScript, and theming.
*   **`DevOps/`**: Guides for setting up development and production environments, including Docker, Lando, Apache, MySQL, and generic Linux administration.
*   **`Modulos/`**: Holds example custom modules. Currently features `drupal_vuejs`, demonstrating the integration of Vue.js with Drupal.
*   **`Contribucion/`**: Instructions on how to contribute to the Drupal community, creating patches, and using GitLab.
*   **`Utiles/`**: General utility guides and helper scripts.
    *   **`jarvis/`**: A collection of bash scripts to automate common administrative tasks (e.g., setting up virtual hosts).
*   **`Ecosistema/`**: Information on the broader Drupal ecosystem, including modules, themes, and distributions.

## Key Components & Usage

### 1. Documentation & Code Snippets
The core of this project is its Markdown documentation. These files are structured to provide immediate solutions.
*   **Usage:** Search for the relevant topic (e.g., `Back-end/Entidades.md` for Entity manipulation) and copy the provided PHP snippets directly into your custom modules.
*   **Example:** `Back-end/Entidades.md` provides copy-paste ready code for creating, loading, and querying entities.

### 2. Custom Modules (`Modulos/`)
This directory contains fully functional example modules.
*   **`drupal_vuejs`**: Demonstrates how to embed a Vue.js application within a Drupal module, including routing, permissions, and library definitions.
    *   **Key Files:** `drupal_vuejs.info.yml`, `drupal_vuejs.module`, `src/Controller/drupalVuejsController.php`.

### 3. Jarvis Utilities (`Utiles/jarvis/`)
"Jarvis" is a set of shell scripts to speed up environment configuration.
*   **Location:** `/Utiles/jarvis`
*   **Example Script:** `initHostVirtual` automates the creation of Apache virtual hosts.
*   **Usage:**
    ```bash
    # Example: Create a virtual host for myproject.local
    # Usage: ./Utiles/jarvis/initHostVirtual {domain} {extension}
    sudo ./Utiles/jarvis/initHostVirtual myproject local
    ```
    *Note: Ensure scripts have execution permissions and run with appropriate privileges (e.g., `sudo` for modifying web server config).*

## Development Conventions
*   **Language:** Documentation is primarily in Spanish.
*   **Code Style:** PHP code follows Drupal coding standards.
*   **Pragmatism:** Content prioritizes practical examples over deep theoretical explanations.
