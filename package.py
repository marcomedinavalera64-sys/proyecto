from zipfile import ZipFile, ZIP_DEFLATED
from pathlib import Path
p=Path('work/prototipo')
with ZipFile('outputs/Grupo1_Prototipo_Los_Alpes.zip','w',ZIP_DEFLATED) as z:
 for f in p.iterdir():
  if f.is_file(): z.write(f,'Los_Alpes/'+f.name)
 for n in ['pruebas.txt','consola.txt','pruebas.png','consola.png']:
  z.write(Path('work')/n,'Los_Alpes/evidencias/'+n)
print('Paquete creado')
