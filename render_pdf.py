from pathlib import Path
import pypdfium2 as pdfium
from pypdf import PdfReader
p=Path('outputs/Grupo1_FundamentosDeProgramacion_EF.pdf')
r=PdfReader(p)
for i,page in enumerate(r.pages):
 t=page.extract_text()
 print(i+1,len(t),t[:85].replace('\n',' '))
out=Path('work/render');out.mkdir(exist_ok=True)
d=pdfium.PdfDocument(str(p))
for i in range(len(d)):
 d[i].render(scale=1.3).to_pil().save(out/f'page-{i+1}.png')
