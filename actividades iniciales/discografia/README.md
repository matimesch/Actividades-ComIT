# Empezamos con CSS

## Antes que nada: Markdown

Lo primero: esto, como les mencioné, es un documento escrito en un lenguaje que se llama "Markdown" (y el archivo se guarda con extensión .md), y sirve para crear lo que se llama "texto enriquecido" (es decir, texto que además de tener letras, tiene un formato). Si abren este documento con un editor de texto que no lee Markdown, van a ver texto plano. En VSCode creo que por default hay un visor de Markdown (si no pueden agregar una extensión que se llama "Markdown Preview Enhanced" y se ve mejor). Para abrir el panel de Preview tienen que tener un ícono así ![Preview panel](https://i.ibb.co/4T7ZLGB/vscode-preview.png) arriba a la derecha.

También pegar el texto en dillinger.io, que es una web donde también pueden editar Markdown para probar o armar sus documentos. Todos los README de gitHub están en Markdown.

Y hasta se pueden poner GIFs animados
![Good job](https://media.giphy.com/media/JQQwgVUMDIyAM/giphy.gif)

Les dejo una guía sencilla sobre este formato: https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet

## Algo nuevo de HTML

En todos los lenguajes de programación existen los _comentarios_. Un comentario es un pedazo de texto que no queremos que sea interpretado como código, sino que lo escribimos para aclarar (para nosotros y para quien lea nuestro código después) cosas del código.

En HTML un comentario es todo lo que vaya entre `<!--` y `-->`. Puede ir en una línea propia o al lado de otro elemento, y puede ocupar una sola línea o varias. Por ejemplo:

```html
<body>

    <h1>Albums</h1>

    <!--
    Tabla para la discografía. Actualmente se está completando
    a mano, pero después estos datos vendrán de un servidor.
    -->
    <table>
        <thead>
            <tr>
                <th>Year</th><!--Este es el año de lanzamiento-->
                <th>Band</th>
```

En el ejemplo uso comentarios para aclarar algunas cosas.

## CSS

### Generalidades

Vimos lo que es CSS y empezamos a ver cómo utilizarlo. Vimos cómo se estructuran los estilos en CSS: selectores + reglas. Un selector es el que indica a qué elemento aplicar los estilos que definimos y las reglas son la definición de los estilos en sí. Cada regla aplica un valor a alguna propiedad de CSS.

```css
selector {
    propiedad1: valor;
    propiedad2: valor;
    propiedad3: valor;
}
```

### Selectores

Vimos dos formas de armar selectores:

- Indicando el tipo de elemento. Un estilo definido así aplica a todos los elementos de ese tipo. Por ejemplo "body", "table", "h2".
- Indicando el nombre de la _clase_ antecedido por un punto ("."). Aplica a todos los elementos que tengan esa clase. Lo detallo [en otra sección](#clases) un poco más abajo.

### Referencias

Para que chusmeen, les dejo acá algunos links para referencia (la mayoría de lo que hay ahí todavía no lo vimos, y muchas cosas tampoco las vamos a ver, pero uds. las podrán trabajar después por su cuenta).

- Lista de reglas de CSS en W3Schools: https://www.w3schools.com/cssref/
- Referencia rápida de construcción de selectores en W3Schools: https://www.w3schools.com/cssref/css_selectors.asp
- CSS en MDN: https://developer.mozilla.org/es/docs/Web/CSS

### Comentarios en CSS

Como decía antes, todos los lenguajes tienen comentarios y CSS no es la excepción. Los comentarios en CSS se escriben entre `/*` y `*/`, y también pueden ir en una sola línea o en varias. Ejemplo:

```css
table, td {
    /* Esto estaba como atributos de la tabla:
    cellspacing=0 cellpadding="4px" border="1" */
    border: 1px solid black;
    border-collapse: collapse;
}
```

### Font fallback

**font-family**: estoy seteando (para el elemento `body`, o sea para toda la página) la fuente a Segoe UI. Como vimos, la familia de tipografías se define con varias opciones por si acaso una tipografía no está disponible en el equipo desde donde se está accediendo. Ponemos varias opciones similares y, como última opción, una de las tipografías _genéricas_, que siempre existen. Esto es lo que se conoce como _"font fallback"_. Las tipografías genéricas son serif, sans-serif, cursive fantasy y monospace.

### Pseudoclases

Se indican con ":" y extienden la capacidad de los selectores para referirse no solo a un elemento sino a un estado en particular. Vimos algunos (y agrego otros):

- `:hover` que se aplica cuando el puntero del mouse pasa sobre el elemento.
- `:nth-child(N)` que es para aplicar el estilo al n-ésimo item del grupo de elementos a los que se refiera. Ese N que indicamos entre paréntesis puede ser un número (por ejemplo, 2 si queremos aplicar el estilo al 2do elemento) o una palabra clave como ODD (par) o EVEN (impar) para aplicar alternadamente. Hay formas más complejas, pueden ver una referencia en https://www.w3schools.com/cssref/sel_nth-child.asp.
- `:link` aplica a un link no visitado (por default es subrayado y azul)
- `:visited` aplica a un link ya visitado (por default es subrayado y violeta)
- `:active` aplica al elemento (puede ser un link u otro tipo de elemento) cuando se está clickeando sobre él.

Ejemplo para que cuando pase el mouse sobre un elemento de tipo h1, el texto se ponga azul:
```css
h1:hover {
    color: blue;
}
```


## Clases:

Lo vimos muy por encima y lo trabajaremos bastante en clase, pero básicamente vimos que "class" es un atributo que se puede definir para cualquier elemento en HTML, y que podemos usar eso como selector en nuestro CSS (también vamos a usar las clases en JavaScript, pero para eso falta). Una misma clase se puede aplicar a varios elementos, incluso de distinto tipo.

Por ejemplo, supongamos que tengo una tabla de comidas y quiero que las comidas aptas para veganxs tengan un verde claro de fondo. Puedo agregarle una clase a los elementos que quiero estilar. Una fila de ejemplo:

```html
<tr>
    <td class="vegan">Comida 1</td>
    <td>Comida 2</td>
    <td class="vegan">Comida 3</td>
    <td>Comida 4</td>
    <td>Comida 5</td>
<tr>
```

y luego dar un estilo especial a esas celdas, que se aplique adicionalmente al estilo de base del elemento td:

```css
td {
    padding: 2px;
    margin: 4px;
}

.vegan {
    background-color: greenyellow;
}
```

Como decía, lo veremos más en clase. Pero pueden empezar a intentar usarlo.


## Consigna para resolver

Les propongo lo siguiente (no sobr esta versión que estoy mandando sino sobre la que cada unx de uds. armó):

- Agreguen un par de discos más, que tengan por lo menos 6 filas además de la de encabezados.
- No queremos estilos en el HTML, pero todavía nos queda el `height` en los elementos `img`. Saquen eso del HTML y apliquen esa regla de 100 píxeles de altura en la sección de CSS.
- Agreguen además que al pasar el mouse sobre una imagen, esta se ponga levemente transparente. Para eso vamos a usar la propiedad `opacity`. Esta propiedad puede tener como valor cualquier número entre 0 y 1 (con sus valores decimales intermedios). Un valor 0 implica 0 opacidad (o sea, no se ve nada) y 1 significa 100% de opacidad (o sea que se ve normal, es el valor por defecto). Para este caso, hagamos que al pasar el mouse por encima, la propiedad `opacity` tenga un valor de `0.8`.

##### Consigna extra - un poco más complicada
Como mencioné en la clase, algunos valores de tamaño se pueden expresar como porcentaje respecto al tamaño "total" (de la pantalla o del elemento contenedor si lo hay). Esto es particularmente útil para que nuestro diseño se adapte a distintos dispositivos (lo que se llama diseño _"responsive"_). Para eso, así como un ancho de 200 píxeles lo expresamos como `200px`, un acho de 30% lo expresamos así, como `30%`. Sobre esa idea, les pido que:
- Apliquen a la tabla completa un acho (`width`) de 100%. Esto va a hacer que la tabla ocupe todo el tamaño de la ventana. Prueben achicar la ventana y verán cómo acompaña.
- Apliquen a las columnas del año y de la tapa un ancho de 10%. Pueden aplicarlo a los elementos th 1 y 4, el resto de la tabla acompaña (también funcionaría si lo aplican a los td 1 y 4, pero tiene más lógica hacerlo en los th, lo detallaremos en clase). Al hacer esto, las otras 2 columnas van a repartirse el espacio que queda (40% cada una).

Esto, por supuesto, súbanlo a su repo en gitHub.
