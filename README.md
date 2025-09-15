# 📦 Sistema de Inventario

[![CI/CD Pipeline](https://github.com/programmer15424/sistema_inventario/actions/workflows/ci-cd.yml/badge.svg)](https://github.com/programmer15424/sistema_inventario/actions/workflows/ci-cd.yml)
[![Development Workflow](https://github.com/programmer15424/sistema_inventario/actions/workflows/development.yml/badge.svg)](https://github.com/programmer15424/sistema_inventario/actions/workflows/development.yml)

Sistema web moderno para gestión de inventarios desarrollado con React + Vite, implementando GitFlow y CI/CD.

## 🚀 Demo en vivo
**[Ver aplicación desplegada](https://programmer15424.github.io/sistema_inventario/)**

## ✨ Funcionalidades

- **📊 Dashboard**: Panel de control con estadísticas del inventario
- **📋 Gestión de Productos**: Agregar, editar, eliminar y visualizar productos
- **🔍 Filtros**: Búsqueda por nombre y categorización
- **📈 Reportes**: Estadísticas avanzadas y alertas de stock bajo
- **💾 Persistencia**: Almacenamiento local con localStorage
- **📱 Responsive**: Diseño adaptable a diferentes dispositivos

## 🛠️ Tecnologías

- **Frontend**: React 19.1.1, Vite 7.1.2
- **Estilos**: CSS3 personalizado
- **Control de versiones**: Git + GitFlow
- **CI/CD**: GitHub Actions
- **Despliegue**: GitHub Pages

## 🔄 CI/CD Pipeline

### Integración Continua
- ✅ Linting automático con ESLint
- 🏗️ Build automático en múltiples versiones de Node.js
- 📦 Generación de artefactos de build
- 🧪 Ejecución en cada push y pull request

### Despliegue Continuo
- 🚀 Despliegue automático a GitHub Pages desde rama `main`
- 🔄 Actualización automática del sitio en producción
- 📊 Monitoreo de estado con badges

## 🌱 GitFlow Implementado

- **main**: Rama de producción estable
- **develop**: Rama principal de desarrollo
- **feature/***: Ramas para nuevas funcionalidades
- **release/***: Ramas para preparación de versiones
- **hotfix/***: Ramas para correcciones urgentes

## 🚀 Instalación y Uso

```bash
# Clonar el repositorio
git clone https://github.com/programmer15424/sistema_inventario.git

# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Build para producción
npm run build

# Previsualizar build
npm run preview

# Linting
npm run lint
```

## 📝 Convenciones de Commits

- `feat:` Nueva funcionalidad
- `fix:` Corrección de bugs
- `docs:` Documentación
- `style:` Cambios de formato
- `refactor:` Refactorización
- `chore:` Tareas de mantenimiento

## 🏷️ Versiones

- **v1.1.0**: Módulo de reportes y CI/CD
- **v1.0.0**: Versión inicial del sistema

## 📄 Licencia

Este proyecto está bajo la Licencia MIT.
