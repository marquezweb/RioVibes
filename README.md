# Rio Vibes Tour

Demo estática basada en el diseño de Stitch. Abrí `index.html` en el navegador para verla; no requiere servidor ni conexión para mostrar estilos, tipografías, íconos e imágenes.

Los enlaces de WhatsApp, email e Instagram abren sus servicios externos. El formulario de cotización prepara el mensaje para WhatsApp y el de novedades prepara un correo para solicitar la suscripción. No se guardan datos en un servidor.

Los archivos necesarios para mostrar la web están en la raíz del proyecto. Los ajustes visuales actuales están en `editorial.css`; `styles.css` ya está generado y listo para publicar. Las fotos alternativas, la captura de referencia y los archivos de trabajo de Tailwind quedaron en `_no_subir/`, que Git ignora.

Para publicarla en GitHub Pages, subí solo los archivos de la raíz a la rama `main` (incluido `index.html`), sin la carpeta `_no_subir/`, y activá **Settings → Pages → Deploy from a branch → main → /(root)**. La web publicada no necesita ejecutar un build en GitHub.
