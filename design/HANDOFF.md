# Arreglo — Handoff de diseño para implementación

App móvil de **subasta inversa de reparaciones** (México, MXN). El cliente pide un servicio (hidráulica o eléctrica), la app sugiere una cuota mínima según servicios similares, el cliente sube o baja su oferta y los contratistas cercanos **aceptan o contraofertan durante una ventana de 5 min**. Después: rastreo, servicio, pago y calificación.

Archivo de referencia visual: `arreglo-diseno.html` (en esta misma carpeta).

---

## 1. Cómo leer `arreglo-diseno.html`

- Viene de una herramienta de diseño; **no se abre tal cual en el navegador** (depende de un runtime propio). Úsalo como fuente de valores exactos: todos los estilos están inline.
- Cada pantalla es un `<div class="dv-opt" id="1a">` … `id="1f"`.
- Cada pantalla está dentro de un **marco de iPhone de 390×844** (borde negro de 10px, radio 56px) con una **barra de estado falsa** (9:41, notch, batería). **No implementar el marco ni la barra de estado**: son solo maqueta. El área útil es el `div` interior (fondo `#FAF8F4` o `#15171C`).
- Sintaxis del runtime:
  - `{{ variable }}` → valor calculado en la clase `Component` al final del archivo (`renderVals()`).
  - `onClick="{{ fn }}"` → manejador de evento.
  - `<sc-for list="{{ stars }}" as="s">` → un bucle (map).
  - `style-hover="..."` → estilo en `:hover`.
- El texto en español y los datos (nombres, precios, direcciones) son **mock**: úsalos como datos de prueba.

---

## 2. Design tokens

### Colores
| Token | Valor | Uso |
|---|---|---|
| `ink` | `#15171C` | Texto principal, botones primarios, fondo de la pantalla de oferta (tema oscuro) |
| `paper` | `#FAF8F4` | Fondo de pantallas claras; texto sobre oscuro |
| `card` | `#FFFFFF` | Tarjetas, campo de texto |
| `surface-muted` | `#EFEBE3` | Segmented control, filas "Tu oferta", método de pago, estrellas inactivas |
| `accent` | `#FF5B23` | Naranja de marca: CTA de publicar, cursor, ruta del mapa, "Editar", "Cambiar" |
| `accent-hover` | `#FF7340` | Hover del botón + |
| `accent-strong` | `#D9420F` | Texto "CONTRAOFERTA", badge de cuenta regresiva, hover de links |
| `accent-tint` | `#FFE6DC` | Fondo del badge "CIERRA EN" |
| `plumbing` | `#2F6BFF` | Categoría Hidráulica |
| `plumbing-tint` | `#E3EAFF` | Ícono hidráulica en listas |
| `electric` | `#F5B700` | Categoría Eléctrica; estrellas activas; probabilidad media |
| `electric-tint` | `#FFF1C2` | Ícono eléctrica en listas |
| `electric-strong` | `#A67C00` | Trazo del ícono eléctrico en listas |
| `success` | `#1E9E5A` | "ACEPTA TU PRECIO", check de servicio terminado |
| `live` | `#3DDC84` | Punto "disponibles", probabilidad alta, delta positivo |
| `danger` | `#FF6B5B` | Probabilidad baja, delta negativo |
| `text-secondary` | `#6B6862` | Texto secundario sobre claro |
| `text-muted` | `#8A867E` | Etiquetas mono, metadatos, tab inactiva |
| `text-on-dark` | `#A9A59C` | Texto secundario sobre oscuro |
| `icon-inactive` | `#B9B4AA` | Íconos de tab inactivos, estrella inactiva |
| `border` | `#DCD6CA` | Bordes de chips y botones secundarios |
| `border-dashed` | `#C9C3B7` | Botón "+" de fotos, puntos de "esperando" |
| `divider` | `#E7E2D8` | Separadores, bordes de tarjetas, tab bar |
| `dark-surface` | `#22252C` | Tarjeta de probabilidad (tema oscuro) |
| `dark-border` | `#3A3D45` | Bordes y pista del slider en tema oscuro |
| `dark-hover` | `#24272E` | Hover del botón − |
| `dark-muted` | `#5A5D64` | Etiquetas $300 / $900 del slider |
| `placeholder` | rayas 135° `#E2DDD2` / `#ECE8DF` | Placeholders de fotos y avatares |

### Tipografía
- **Bricolage Grotesque** (Google Fonts, pesos 400–800): todo el texto de UI.
- **JetBrains Mono** (500, 700): precios, contadores, códigos y etiquetas en MAYÚSCULAS.

| Estilo | Fuente | Tamaño / interlineado | Peso | Tracking |
|---|---|---|---|---|
| H1 (saludo inicio) | Bricolage | 40 / 0.98 | 800 | -0.035em |
| Título éxito (1f) | Bricolage | 34 / 1 | 800 | -0.035em |
| H2 (títulos de paso) | Bricolage | 30 / 1.02 | 800 | -0.03em |
| ETA grande (1e) | Bricolage | 44 / 0.9 | 800 | -0.04em |
| Título tarjeta categoría | Bricolage | 24 | 700 | -0.02em |
| Sección | Bricolage | 17 | 700 | — |
| CTA | Bricolage | 17 | 700 | — |
| Cuerpo | Bricolage | 15 / 1.4 | 500–600 | — |
| Secundario | Bricolage | 12–14 | 400–600 | — |
| Tab bar | Bricolage | 11 | 600 | — |
| Monto de oferta (1c) | JetBrains Mono | 60 / 1 | 700 | -0.04em |
| Precio en tarjeta | JetBrains Mono | 20 | 700 | — |
| Etiqueta mono | JetBrains Mono | 12 | 500 | 0.04em, MAYÚSCULAS |
| Código de verificación | JetBrains Mono | 22 | 700 | 0.12em |

### Radios
- Tarjeta de categoría: 28 · Tarjeta de oferta: 24 · Tarjetas/paneles: 22 · CTA principal: 20 (alto 58) · Campo de texto: 18 · Chips de problema / fotos / botones de tarjeta: 14–16 · Íconos de lista: 12 · Pills/badges: 99 · Bottom sheet: 32 arriba.

### Espaciado
- Margen lateral de pantalla: **22px**.
- Gaps habituales: 8, 10, 12, 14px.
- CTA fijo inferior: `left/right 22px`, `bottom 34px`.
- Tab bar: alto 84px, borde superior `divider`.

---

## 3. Pantallas

### 1a · Inicio — elegir categoría
- Encabezado: etiqueta mono "ENTREGAR EN" + dirección con chevron (selector de dirección) · avatar circular 42px con iniciales (fondo `ink`).
- H1: "¿Qué hay que arreglar, {nombre}?"
- Grid 2 columnas de **tarjetas de categoría** (alto 212, radio 28) con ícono, nombre y subtítulo, y un círculo decorativo semitransparente abajo a la derecha:
  - Hidráulica (`plumbing`, texto blanco): "Fugas, tuberías, WC, calentador".
  - Eléctrica (`electric`, texto `ink`): "Cortos, contactos, lámparas, centro de carga".
- **Banner de urgencia** (fondo `ink`): "¿Urgencia? Pide en 3 toques" + "Contratistas a menos de 4 km ahora: {n}" + botón circular naranja con flecha.
- "Servicios recientes" + "Ver todo": lista con ícono por categoría, título, fecha · contratista, precio en mono.
- Tab bar: Inicio (activa) · Servicios · Cuenta.

### 1b · Describir el problema (Paso 1 de 3)
- Botón atrás circular (40px, borde) · "PASO 1 DE 3" en mono.
- Chip de la categoría elegida.
- H2 "¿Qué está pasando?"
- **Chips de problema, selección única** (seleccionado = fondo `ink`, texto blanco; no seleccionado = borde 1.5px `border`). Opciones hidráulica: Fuga de agua, Tubería tapada, WC, Calentador, Tinaco / bomba, Instalación.
- Campo de texto libre (mín. 92px de alto, cursor naranja).
- "Fotos · ayudan a cotizar mejor": grid de 3 columnas, cuadradas, con miniaturas + botón "+" punteado para agregar.
- "¿Cuándo?": **segmented control** Ahora / Hoy / Programar.
- CTA fijo "Continuar".

### 1c · Tu oferta — subasta (Paso 2 de 3) · TEMA OSCURO · INTERACTIVA
- Fondo `ink`, texto `paper`.
- H2 "¿Cuánto quieres ofrecer?" + "Cuota mínima sugerida: **$450**, basada en {n} reparaciones similares en tu zona."
- **Stepper**: botón − (58px, borde `dark-border`) · monto grande mono · botón + (58px, `accent`). Bajo el monto, texto de delta vs. mínimo.
- **Slider visual** (no arrastrable en el diseño): pista de 6px con degradado (gris hasta el mínimo, luego naranja → amarillo), thumb de 26px con halo naranja, marcas "$300", "MÍN $450", "$900". Transición de `left` 0.2s.
- **Tarjeta de probabilidad** (`dark-surface`): "Probabilidad de que acepten" + porcentaje en color, barra de progreso de 8px (transición 0.25s), texto de ayuda.
- "● {n} plomeros disponibles a menos de 4 km".
- Nota: "Solo pagas al terminar. La materia prima se cotiza aparte."
- CTA naranja fijo: "Publicar por ${oferta}".

**Lógica (del diseño):**
```js
const base = 450, min = 300, max = 900, step = 50;   // base = cuota mínima sugerida
// estado inicial: offer = 500
const d = offer - base;
const prob = clamp(8, 97, Math.round(62 + (d / base) * 160));
const probColor = prob >= 75 ? '#3DDC84' : prob >= 45 ? '#F5B700' : '#FF6B5B';
const hint = prob >= 75 ? 'Buena oferta: los contratistas mejor calificados suelen aceptar rápido.'
           : prob >= 45 ? 'Oferta justa. Puede que recibas contraofertas.'
           :              'Por debajo del mínimo sugerido: es probable que nadie acepte o recibas contraofertas.';
const deltaText  = d === 0 ? 'IGUAL AL MÍNIMO' : (d > 0 ? `+$${d}` : `−$${-d}`) + ' VS. MÍNIMO';
const deltaColor = d < 0 ? '#FF6B5B' : d > 0 ? '#3DDC84' : '#8A867E';
const thumbLeft  = ((offer - min) / (max - min)) * 100 + '%';
// −  → offer = clamp(min, max, offer - step);  + → offer = clamp(min, max, offer + step)
```
La fórmula de probabilidad es un placeholder del prototipo; en producción debe venir del backend.

### 1d · Ofertas de contratistas (Paso 3 de 3)
- "PASO 3 DE 3" + **badge de cuenta regresiva** "● CIERRA EN mm:ss" (fondo `accent-tint`, texto `accent-strong`) — ventana de 5 min.
- H2 "{n} ofertas para tu {problema}".
- Fila "Tu oferta $500 · Editar".
- **Tarjetas de oferta** (radio 24, fondo blanco), cada una con avatar 48px, nombre, "★ calificación · servicios · distancia", precio mono y estado:
  - **Acepta tu precio** (mejor opción): borde 2px `ink`, etiqueta verde "ACEPTA TU PRECIO", un solo botón negro "Aceptar · llega en {eta}".
  - **Contraoferta**: borde 1.5px `divider`, etiqueta "CONTRAOFERTA +$X" en `accent-strong`, comentario opcional entre comillas, botones "Rechazar" (borde) y "Aceptar · {eta}" (fondo `surface-muted`).
  - **Oferta compacta/atenuada** (opacidad 0.75, sin botones): "+$X · {eta}".
- "Esperando más ofertas…" con tres puntos (animar).

### 1e · Rastreo — contratista en camino
- Mapa a pantalla completa (en el diseño es ilustrado; en la app usar un mapa real): ruta en `accent` 5px, tramo recorrido punteado, marcador del contratista (círculo negro con flecha, borde blanco) y pin "Tu casa".
- **Bottom sheet** (radio 32 arriba, handle de 40×5):
  - "LLEGA EN" + "12 min" (44px) · "CÓDIGO" + código de 4 dígitos (para verificar al contratista).
  - **Barra de progreso de 4 pasos**: Aceptado · En camino · Llegó · Terminado (paso actual en naranja con avance parcial).
  - Tarjeta del contratista: avatar, nombre, "★ calificación · vehículo · placas".
  - Botones "Mensaje" (negro) y "Llamar" (borde).
  - "Precio acordado $500" · "Compartir viaje".

### 1f · Servicio terminado — pago y calificación
- Check verde (56px, `success`), título "Listo. Tu {problema} quedó reparada." + "{contratista} · {duración} de trabajo".
- **Desglose**: Mano de obra (subasta) · Materiales (p. ej. "Llave de paso ½″") · Tarifa de servicio · separador · **Total** (mono 24px). Montos con 2 decimales.
- Método de pago: ícono de tarjeta + "Visa ·· 4417" + "Cambiar".
- "¿Cómo te fue con {nombre}?": **5 estrellas interactivas** (botones 52px, radio 16; activas `electric`/texto `ink`, inactivas `surface-muted`/`icon-inactive`; valor inicial 5).
- Tags de reseña (selección múltiple): Puntual · Limpio · Explicó el problema.
- CTA fijo "Pagar ${total}".

---

## 4. Flujo de navegación
`1a Inicio` → (tarjeta de categoría o banner de urgencia) → `1b Describir` → Continuar → `1c Oferta` → Publicar → `1d Ofertas` → Aceptar → `1e Rastreo` → (estado Terminado) → `1f Pago y calificación` → Pagar → `1a Inicio`.
"Editar" en 1d regresa a 1c. Atrás en 1b/1c regresa al paso anterior.

## 5. Modelo de datos sugerido (mínimo, para mocks)
- `ServiceRequest`: categoría (hidraulica | electrica), problema, descripción, fotos[], cuándo (ahora | hoy | programado + fecha), dirección, cuotaMinimaSugerida, oferta, estado (borrador | publicada | asignada | en_camino | llego | terminada | pagada), cierraEn.
- `Bid`: contratistaId, precio, tipo (acepta | contraoferta), comentario?, etaMin.
- `Contractor`: nombre, calificación, servicios, distanciaKm, vehículo, placas, avatar.
- `Payment`: manoDeObra, materiales[{concepto, monto}], tarifaServicio, total, método.

## 6. Fuera de este diseño (pendiente de definir)
- Pantalla de contrapropuesta cuando ningún contratista acepta.
- App del contratista.
- Variantes del control de oferta (1c).
- Backend, pagos reales, mapas en vivo, notificaciones, autenticación.
