---
name: epn-brand
description: Usala siempre que crees o modifiques colores, estilos, componentes o pantallas de la aplicacion cv-creator-app.
---

# Identidad visual TUTI

## Objetivo

Aplicar la paleta de colores de referencia de la EPN de manera consistente en la aplicacion movil `cv-creator-app`, respetando los componentes y la estructura existentes de React Native y Expo.

## Paleta de colores


- **Encabezados y barras superiores:** `#121497`, texto blanco.
- **Botones principales:** `#FFEA00`, texto blanco.
- **Fondo de pantalla:** `#FFFFFF`, texto `#111111`.
- **Tarjetas, modales y campos:** `#FFFFFF`, texto `#111111`.
- **Texto secundario sobre blanco:** `#5A6E82`.
- **Bordes y separadores:** `#FFEA00`. No utilizar como color de texto.

No utilizar texto blanco sobre `#3C8DBC`, `#008D4C` o `#DB8B0B` para texto normal.

## Como aplicar la paleta

### 1. Navegacion y encabezados

- Utilizar `#001F3F` en los encabezados y barras superiores.
- Mantener el texto y los iconos de esas barras en blanco cuando el contraste sea adecuado.
- En `_layout.tsx`, configurar estos estilos solo para los elementos compartidos de navegacion que gestione el layout existente.

### 2. Botones y acciones

- Utilizar `#357CA5` para los botones principales.
- Utilizar `#E2E4E9` para las acciones secundarias, con texto `#111111`.
- Utilizar `#D33724` para las acciones destructivas y los mensajes de error.
- Mantener identificables las acciones de agregar emojis, guardar la imagen editada y restablecer los cambios.

### 3. Fondos y superficies

- Utilizar `#E2E4E9` como fondo general de las pantallas.
- Utilizar `#FFFFFF` para tarjetas, campos y superficies de modales.
- Utilizar `#B5BBC8` para bordes y separadores, nunca como color de texto.

### 4. Textos

- Utilizar `#111111` para el texto principal sobre fondos claros.
- Utilizar `#5A6E82` para texto secundario sobre superficies blancas.
- Mantener un contraste adecuado y no comunicar estados exclusivamente mediante colores.

### 5. Componentes de la aplicacion

Aplicar la paleta de forma coherente a:

- Pantallas y encabezados.
- Botones y menus de acciones.
- Selector y previsualizacion de imagenes.
- Modal de seleccion de emojis.
- Controles de edicion, guardado y restablecimiento.
- Mensajes, campos y demas componentes visuales.

Los emojis colocados sobre las imagenes deben conservar sus colores y apariencia originales.

## Reglas de implementacion

- Revisar los estilos existentes antes de realizar cambios.
- Reutilizar los componentes y estilos disponibles cuando corresponda.
- Si el proyecto ya centraliza los colores en constantes, utilizar esas constantes.
- Si se solicita centralizar la paleta y aun no existe una organizacion para ello, revisar la estructura del proyecto antes de proponer cambios.
- No crear colores alternativos ni asignar usos nuevos a los colores sin consultar al usuario.
- No modificar la logica funcional cuando la tarea sea exclusivamente visual.
- Mantener los estilos compartidos en el layout cuando corresponda y los estilos particulares en sus respectivas pantallas o componentes.

## Verificacion

Al finalizar un cambio visual:

- Comprobar que los colores y sus usos correspondan a esta paleta.
- Revisar la legibilidad, el contraste y la consistencia visual.
- Distinguir las comprobaciones realizadas mediante revision del codigo de las verificadas en Expo Go.
- No afirmar que un cambio visual fue comprobado en ejecucion si no se ha probado la aplicacion.