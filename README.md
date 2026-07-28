# Willay — Landing page

Landing page del sistema de asistencia escolar Willay.

## Estructura

```
willay-landing/
├── index.html      # Estructura y contenido de la página
├── css/
│   └── style.css   # Estilos, tokens de color/tipografía, animaciones
├── js/
│   └── script.js   # Menú móvil, scroll reveal, header y formulario
└── README.md
```

## Uso

Abre `index.html` directamente en el navegador, o sirve la carpeta con
cualquier servidor estático (por ejemplo `npx serve .`).

No requiere build ni dependencias: es HTML/CSS/JS puro, sin frameworks.

## Personalizar

- Colores y tipografía: variables `:root` al inicio de `css/style.css`.
- Textos y contenido: `index.html`.
- Correo, WhatsApp y ubicación reales: sección `<footer>` de `index.html`.
- El formulario de "Solicitar demo" solo muestra un mensaje de éxito en el
  navegador (`js/script.js`); para que envíe datos de verdad hay que
  conectarlo a un backend o servicio de formularios.
