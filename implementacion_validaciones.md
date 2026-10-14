# Estrategia de Validacion en Tiempo Real

Para lograr que los formularios muestren errores de inmediato al escribir, usaremos 3 herramientas clave:

## 1. Dependencias Necesarias
Ejecuta el siguiente comando en tu proyecto:
`npx expo install react-hook-form zod @hookform/resolvers`

## 2. Componentes de la Solucion

*   **Zod (Las Reglas):** 
    Sirve para crear un "esquema". Aqui dictas que el telefono solo lleve numeros o que el email tenga el formato correcto (`z.object(...)`).
*   **React Hook Form (El Motor):** 
    Controla el formulario sin volver lenta la aplicacion. La clave es usarlo con la configuracion `mode: "onChange"` para que reaccione a cada tecla presionada.
*   **Resolvers (El Puente):** 
    Une Zod con React Hook Form para que los errores fluyan automaticamente.

## 3. Pasos de Implementacion

1.  **Importar dependencias** en tu pantalla (ej. `personal-info.tsx`).
2.  **Crear el esquema Zod** fuera del componente principal.
3.  **Llamar a useForm** con el esquema y el modo "onChange".
4.  **Envolver cada InputField** con el componente `<Controller />` de React Hook Form.
5.  **Inyectar el error** mandando `errors.campo?.message` a la propiedad `error` que ya tiene tu `InputField`.

De esta forma, si el usuario escribe una letra en el telefono, la pantalla pintara el error en rojo en ese mismo instante.