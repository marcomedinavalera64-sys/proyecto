from zipfile import ZipFile
from pathlib import Path
from lxml import etree
z=ZipFile(r'C:\Users\marco\Downloads\Grupo1_Informe.docx')
p=Path('work/source_images');p.mkdir(exist_ok=True)
for n in z.namelist():
 if n.startswith('word/media/'):
  p.joinpath(Path(n).name).write_bytes(z.read(n)); print(n)
