# PTG · Play The Game

Plataforma web educativa de finanzas personales para Colombia.

**PTG informa, compara y conecta.** No custodia dinero, no ejecuta operaciones y no da recomendaciones de inversión.

## Cómo funciona

La plataforma sigue un recorrido de cinco pasos:

1. **Aprende:** lees una pieza corta que explica una sola idea (qué es la TRM, qué es el spread, cuánto cuesta un fondo) y respondes un quiz.
2. **Mercado:** consultas la TRM y otros indicadores, cada uno con su fuente y su fecha.
3. **Compara:** ves en la misma pantalla cuánto cobra cada entidad por encima de la TRM, o comparas un FIC con un CDT.
4. **Elige:** con los números a la vista, la decisión es tuya. PTG no elige por ti.
5. **Conecta:** si quieres seguir, abres la ficha de la entidad y sales hacia ella. El registro y el dinero se manejan en la entidad, nunca en PTG.

## Secciones

| Sección | Qué encuentras |
|---|---|
| **Inicio** | Qué es PTG, sus reglas y el acceso demo |
| **Aprende** | Piezas de una sola idea, cada una con quiz |
| **Mercado** | La TRM con fuente y hora, el precio de venta al público y un tablero básico |
| **Compara** | Dólar vs TRM (spread y costo en pesos según el monto) y FIC vs CDT |
| **Ficha de entidad** | Quién es, si está vigilada por la Superintendencia Financiera, la comisión que recibe PTG y la salida hacia la entidad |
| **Perfil** | Tu nivel, tu racha y las piezas aprobadas |
| **Metodología** | Cómo se calcula cada número y de dónde salen los datos |

## Reglas de la plataforma

- **Cada dato muestra su fuente y su fecha.**
- **Todas las páginas llevan un aviso** de que el contenido es educativo y no es asesoría.
- **Las entidades se muestran lado a lado**, sin decir cuál es "la mejor".
- **La comisión de PTG siempre está visible** en la ficha de cada entidad aliada. La paga la entidad y no cambia tu precio.
- **Las entidades no vigiladas aparecen solo como dato de comparación**, sin salida hacia ellas.

## Acceso demo y progreso

- Se entra sin registro: el nombre es opcional y no se piden datos personales.
- Cada quiz aprobado sube un nivel. La racha cuenta los días seguidos de visita.
- El progreso se guarda solo en el navegador de cada persona. No hay servidor ni base de datos.
- Si se borran los datos del navegador o se usa una ventana de incógnito, el progreso se pierde.
- El botón «Salir de la demo» en Perfil lo borra a propósito.

## Datos

Es un prototipo: **todas las cifras son de ejemplo y las entidades son ficticias**. Los datos están en `assets/js/data.js`. Para una demostración, se reemplaza la TRM por la del día, publicada por el Banco de la República.

## Cómo abrirla

- **En local:** abrir `index.html` en el navegador. No requiere instalación.
- **En línea:** es un sitio estático. Se publica en Vercel con el preset **Other** y sin comando de build.
