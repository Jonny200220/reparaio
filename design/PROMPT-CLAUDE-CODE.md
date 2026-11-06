Copia este texto en Claude Code (ajusta lo que está entre corchetes):

---

Quiero implementar la app "Arreglo" a partir de un diseño ya terminado.

En la carpeta `design/` tienes:
- `HANDOFF.md`: especificación completa (tokens de color, tipografía, radios, espaciado, las 6 pantallas 1a–1f, navegación, lógica de la subasta y modelo de datos).
- `arreglo-diseno.html`: el archivo del diseño original. Úsalo como fuente de valores exactos (los estilos están inline). No se abre tal cual en el navegador; la sección 1 de HANDOFF.md explica cómo leerlo. No implementes el marco del iPhone ni la barra de estado falsa.

Stack: [React Native con Expo + TypeScript]  ← o el que prefieras: Flutter, Next.js PWA, SwiftUI, etc.

Instrucciones:
1. Lee los dos archivos completos antes de escribir código.
2. Proponme un plan: estructura de carpetas, archivo de tokens (colores, tipografía, radios, espaciado), componentes reutilizables (CTA fijo, chip, tarjeta de oferta, stepper, segmented control, barra de progreso, estrellas, tab bar) y navegación entre pantallas. Espera mi OK antes de implementar.
3. Implementa las 6 pantallas con datos mock y la navegación del flujo completo. La pantalla 1c debe funcionar igual que en el diseño (stepper de $50, rango $300–$900, probabilidad y colores según la fórmula de HANDOFF.md). Las estrellas de 1f deben ser interactivas.
4. Respeta los valores exactos del diseño (hex, tamaños, pesos, tracking, radios). Carga Bricolage Grotesque y JetBrains Mono.
5. Al terminar, dime cómo correrlo y lista cualquier punto donde te hayas desviado del diseño.
