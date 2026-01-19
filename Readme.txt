# 🏛️ Atlas QA - Playwright Automation Framework

**Atlas QA** es un framework de automatización robusto diseñado para pruebas End-to-End (E2E) utilizando **Playwright** y **TypeScript**. Este proyecto sigue los estándares de ingeniería más altos, priorizando la mantenibilidad, la velocidad y la resiliencia.

## 🚀 Características Principales
* **Arquitectura POM:** Implementación estricta de *Page Object Model*.
* **Locators Resilientes:** Prioridad en locators de accesibilidad y `data-testid`.
* **TypeScript:** Tipado fuerte para un desarrollo seguro y autodocumentado.
* **Reportes Integrados:** Configuración lista para trazas y capturas de pantalla en fallos.

## 🛠️ Requisitos Previos
* [Node.js](https://nodejs.org/) (v18 o superior)
* [VS Code](https://code.visualstudio.com/) (Recomendado con la extensión oficial de Playwright)

## 📦 Instalación

1.  Clona el repositorio:
    ```bash
    git clone [https://github.com/JSmarulandaB/AtlasQA.git](https://github.com/JSmarulandaB/AtlasQA.git)
    cd atlas-qa
    ```
2.  Instala las dependencias:
    ```bash
    npm install
    ```
3.  Instala los navegadores de Playwright:
    ```bash
    npx playwright install
    ```

## 📂 Estructura del Proyecto
* `src/pages/`: Clases de Page Object Model.
* `src/tests/`: Suites de pruebas técnicas y funcionales.
* `src/utils/`: Funciones auxiliares y manejo de datos.
* `playwright.config.ts`: Configuración global del framework.

## 🧪 Ejecución de Pruebas

| Comando | Acción |
| :--- | :--- |
| `npx playwright test` | Ejecuta todos los tests en modo headless |
| `npx playwright test --ui` | Abre la interfaz interactiva de Playwright (UI Mode) |
| `npx playwright test --project=chromium` | Ejecuta tests solo en Chrome |
| `npx playwright show-report` | Visualiza el reporte de la última ejecución |

## 📏 Estándares de Código
Este framework se rige por el documento `estandares_qa.md`. Algunos puntos clave:
* Uso obligatorio de `async/await`.
* Prohibido el uso de `waitForTimeout`.
* Los locators deben ser privados dentro de sus clases de página.

---
Creado con ❤️ por el equipo de QA.
