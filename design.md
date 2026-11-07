# kjstudio.dev · Guía de diseño

## La portada

El primer vistazo debe responder quién desarrolla el software, en qué puede ayudar y cómo iniciar una conversación. La composición toma como referencia el portátil de la lámina de marca: texto claro a la izquierda y un volumen arquitectónico a la derecha. La cara azul del edificio repite el acento del monograma. En móvil se lee primero la propuesta, después las acciones y por último la imagen.

La portada presenta dos servicios, los productos disponibles, los dos fundadores y el contacto. Dedicar una fila a cada servicio, con un ejemplo concreto del trabajo. Mantener el vínculo al portafolio junto a la biografía a la que corresponde. Atribuir la experiencia previa a cada fundador.

## Color y tipografía

| Token | Valor | Aplicación |
| --- | --- | --- |
| Tinta | `#0B1220` | Texto principal, pie de página y variante oscura del favicon. El hero usa una derivación más oscura, `#050A14`, para integrarse con la fotografía. |
| Azul | `#2563EB` | Botón principal con texto blanco, punto del monograma y pequeños acentos. Para enlaces de texto sobre fondos claros usar `#184EBC`. |
| Divisor | `#E5E7EB` | Separaciones de contenido sobre fondos claros. Sobre tinta, usar blanco con un 20 % de opacidad. |
| Papel | `#FAFAFC` | Superficie de lectura y texto de alto contraste sobre tinta. |
| Texto secundario | `#525D6B` / `#BDC7D6` | Descripciones sobre papel / sobre tinta. |

Instrument Serif en peso regular para titulares. Reservar su cursiva para el énfasis del titular principal. DM Sans para cuerpo, navegación, formularios de selección y botones. Ambas familias se sirven con la aplicación. El titular de escritorio escala aproximadamente de 77 a 128 px y usa interlineado cercano a 1. El texto de lectura parte de 16 px con interlineado de 1,55. Usar mayúsculas espaciadas solo para identificadores breves de sección.

## Firma y monograma

La firma horizontal combina el monograma con **kjstudio.dev** en minúsculas. El nombre usa DM Sans de peso 720 y el dominio usa peso 380. La versión web del monograma se ha redibujado desde la referencia. Su caja mide 64 × 60 unidades, con un punto azul de 14 × 14. Mantener la proporción y reservar alrededor de la firma, como mínimo, el ancho de ese punto a la escala de uso.

- **Cabecera y pie.** Usar el componente Brand. En escritorio, monograma a 34 px de ancho y separación de 10 px respecto al nombre. En móvil, mínimo 28 px y separación de 8 px.
- **Fondos.** En papel, usar el monograma en tinta. Sobre superficies oscuras, usar el cuerpo claro con el mismo punto azul. En una aplicación monocroma, asignar un único color de alto contraste a ambas partes.
- **Espacios pequeños.** Usar solo el monograma. El favicon incorpora un fondo tinta propio para funcionar en pestañas claras y oscuras. Comprobar su lectura a 16 y 32 px.

## Composición e interacción

La retícula usa un contenedor de hasta 1376 px y márgenes fluidos. La columna introductoria de servicios ocupa el 42 % del ancho disponible. Reservar los separadores para distinguir entradas de una lista. La sección de productos introduce una superficie gris suave y más espacio para la muestra visual.

Mantener una sola acción rellena por bloque. En la portada conduce al contacto general y la acción secundaria lleva al producto destacado. La navegación de escritorio pasa a un menú desplegable por debajo de 681 px. El selector ES / EN permanece visible. En móvil, las columnas se apilan conservando el orden de lectura.

Los enlaces deben tener un destino inequívoco, foco visible y texto legible al ampliar la página. Usar botones para cambiar una vista y enlaces para navegar. Dar un nombre accesible a los controles que solo muestran un icono. Las ilustraciones decorativas pueden llevar texto alternativo vacío. Las transiciones de color duran alrededor de 180 ms. Respetar la preferencia de movimiento reducido al navegar entre secciones.

## Landings de productos

Cada ficha del catálogo incluye un identificador estable, el nombre, una muestra visual y contenido en español e inglés. Mantener las dos traducciones juntas. El catálogo alimenta tanto la lista de portada como las rutas individuales. El primer producto de la lista ocupa la acción secundaria de la portada.

Cada landing explica el problema, el público, la propuesta y el siguiente paso disponible. LoyaltyClub usa dos tarjetas de puntos de marcas ilustrativas, Oliva y Mesa, con logotipos, colores y tratamientos propios. Los datos de puntos son ejemplos. El selector permite comparar la personalización y el contacto sirve para solicitar información.

Distinguir las consultas mediante el nombre del producto en el asunto del correo y en el texto sugerido de WhatsApp. Para comparar demanda, contar las conversaciones recibidas por producto en ambos canales y agrupar las dos traducciones. Un clic solo abre el canal elegido.

## Verificación y ejecución

Instalar dependencias con `npm ci`. Usar `npm run dev` durante la edición, `npm run typecheck` para los tipos y `npm run preview` para compilar con OpenNext y navegar en Workers local. `npm run build:worker` genera el Worker. El despliegue se ejecuta desde una cuenta de Cloudflare configurada con `npm run deploy`.

Antes de publicar, revisar portada y producto en ambos idiomas a 360, 768 y 1440 px. Comprobar la ruta raíz, el idioma del documento, la URL alternativa, el foco, el mensaje de cada canal y la respuesta 404 para un producto desconocido.
