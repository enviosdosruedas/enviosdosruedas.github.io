import os

# Definir las rutas de los archivos CSS
css_files = [
    os.path.join('cssjs', 'style.css'),
    os.path.join('cssjs', 'navbar.css'),
    os.path.join('cssjs', 'hero.css'),
    os.path.join('cssjs', 'section.css'),
    os.path.join('cssjs', 'footer.css'),
    os.path.join('cssjs', 'visionglobal.css'),
    os.path.join('cssjs', 'cotizador.css'),
    os.path.join('cssjs', 'emprendedores.css'),
    os.path.join('cssjs', 'serviciosdestacados.css'),
    os.path.join('cssjs', 'bannercarrusel.css')
]
output_file = 'combinado_css.txt'

def leer_archivo(ruta):
    try:
        with open(ruta, 'r', encoding='utf-8') as f:
            return f.read()
    except FileNotFoundError:
        return f"/* Archivo no encontrado: {ruta} */\n"
    except Exception as e:
        return f"/* Error al leer {ruta}: {str(e)} */\n"

def combinar_css():
    contenido = []
    
    # Leer cada archivo CSS y agregar encabezado
    for css in css_files:
        nombre_css = os.path.basename(css)
        contenido.append(f"/* === INICIO {nombre_css} === */\n")
        contenido.append(leer_archivo(css))
        contenido.append(f"\n/* === FIN {nombre_css} === */\n\n")
    
    # Escribir en el archivo de salida
    with open(output_file, 'w', encoding='utf-8') as f:
        f.writelines(contenido)
    
    print(f"Archivos CSS combinados exitosamente en: {output_file}")

if __name__ == "__main__":
    combinar_css()