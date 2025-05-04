import os

# Definir las rutas de los archivos
html_path = os.path.join(os.path.dirname(__file__), 'sobre-nosotros.html')
css_files = [
    os.path.join(os.path.dirname(__file__), 'cssjs', 'style.css'),
    os.path.join(os.path.dirname(__file__), 'cssjs', 'navbar.css'),
    os.path.join(os.path.dirname(__file__), 'cssjs', 'footer.css'),
    os.path.join(os.path.dirname(__file__), 'cssjs', 'sobrenosotros.css')
]
output_path = os.path.join(os.path.dirname(__file__), 'contenido_combinado.txt')

def leer_archivo(ruta):
    try:
        with open(ruta, 'r', encoding='utf-8') as f:
            return f.read()
    except FileNotFoundError:
        return f"Archivo no encontrado: {ruta}"
    except Exception as e:
        return f"Error al leer {ruta}: {str(e)}"

def generar_reporte():
    contenido = []
    
    # Leer HTML
    contenido.append("=== CONTENIDO HTML ===\n")
    contenido.append(leer_archivo(html_path))
    contenido.append("\n\n")
    
    # Leer archivos CSS
    for css in css_files:
        nombre_css = os.path.basename(css)
        contenido.append(f"=== CONTENIDO CSS: {nombre_css} ===\n")
        contenido.append(leer_archivo(css))
        contenido.append("\n\n")
    
    # Escribir en el archivo de salida
    with open(output_path, 'w', encoding='utf-8') as f:
        f.writelines(contenido)
    
    print(f"Reporte generado exitosamente en: {output_path}")

if __name__ == "__main__":
    generar_reporte()