import subprocess,sys,tempfile,shutil
from pathlib import Path
with tempfile.TemporaryDirectory() as td:
 for x in Path('work/prototipo').glob('*.py'): shutil.copy(x,td)
 data='1\nDaniel\npresencial\n1\n15\n0\n2\nPED-000001\n4\n5\n0\n'
 r=subprocess.run([sys.executable,str(Path(td)/'main.py')],input=data,text=True,capture_output=True,encoding='utf-8',env={**__import__('os').environ,'PYTHONIOENCODING':'utf-8'})
 Path('work/consola.txt').write_text(r.stdout,encoding='utf-8')
 print(r.stdout)
