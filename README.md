# Proyecto: UNACHAT

Este proyecto utiliza herramientas de análisis de código estático (SonarLint y ESLint) para ayudar a mantener un código limpio, seguro y de alta calidad. Asegúrate de configurar correctamente el entorno de desarrollo después de hacer `pull` del repositorio.

## Configuración de SonarLint y ESLint

Para que SonarLint y ESLint funcionen correctamente en tu entorno local, sigue estos pasos:

### 1. Requisitos Previos

- **Node.js**: Asegúrate de tener instalada la última versión de Node.js (o al menos la versión 20.x). Puedes descargarlo desde [nodejs.org](https://nodejs.org/).
- **Visual Studio Code (VS Code)**: Recomendado para usar SonarLint y ESLint con las configuraciones preestablecidas.

### 2. Instalar Dependencias

1. Abre una terminal en el directorio raíz del proyecto.
2. Ejecuta el siguiente comando para instalar las dependencias del proyecto:

   ```bash
   npm install

### 3. Instalar la Extensión de SonarLint en Visual Studio Code

Para realizar el análisis de código en tiempo real con SonarLint en Visual Studio Code, sigue estos pasos:

1. Abre Visual Studio Code.
2. Ve a la pestaña de Extensiones (icono de cuadrados en la barra lateral o presiona Ctrl+Shift+X).
3. Busca "SonarLint" en la barra de búsqueda.
4. Haz clic en Instalar junto a la extensión SonarLint de SonarSource.

Con SonarLint instalado, podrás ver advertencias y recomendaciones de seguridad y calidad del código mientras editas los archivos en el proyecto.

### 4. Configuración de ESLint
1. ESLint ya está configurado en el proyecto y debería ejecutarse automáticamente cuando guardes tus archivos en VS Code. También puedes ejecutar ESLint manualmente en la terminal para revisar todos los archivos: npm run lint

