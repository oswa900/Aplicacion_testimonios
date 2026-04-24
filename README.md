# Proyecto de Testimonios (React + Vite)

Aplicación para mostrar testimonios de clientes con controles de navegación, soporte de accesibilidad, manejo de atajos de teclado y animaciones en las transiciones.

## Instalación y ejecución
1. Ejecuta `npm install`
2. Ejecuta `npm run dev`

### Aspectos de la implementación
El aspecto que me costó un poco más comprender fue el manejo de setInterval dentro del hook useEffect. Entender por qué es estrictamente necesario retornar la función de limpieza (clearInterval) para evitar múltiples intervalos corriendo en segundo plano (fugas de memoria) fue un reto interesante. También tuve que tener cuidado de usar la actualización funcional del estado (setIndex(prev => ...)) para no trabajar con un estado desactualizado dentro del intervalo.
