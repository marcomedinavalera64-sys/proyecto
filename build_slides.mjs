import fs from 'node:fs/promises';
import path from 'node:path';
import {pathToFileURL} from 'node:url';
import {Presentation,PresentationFile} from '@oai/artifact-tool';
const root=path.resolve('work');
const p=Presentation.create({slideSize:{width:1280,height:720}});
const ink='#142E36',muted='#43535A',accent='#996325';
function text(s,t,x,y,w,h,size=30,bold=false,color=ink){
 const a=s.shapes.add({geometry:'textbox',position:{left:x,top:y,width:w,height:h},fill:'none',line:{fill:'none',width:0}});
 a.text=t;a.text.style={typeface:'Arial',fontSize:size,bold,color};return a;
}
function slide(title,notes=''){
 const s=p.slides.add();s.background.fill='#FAFAF6';
 text(s,title,65,45,1145,100,43,true);
 text(s,String(p.slides.items.length).padStart(2,'0'),1150,664,65,26,18,false,muted);
 s.speakerNotes.text=notes;return s;
}
function para(s,label,body,y){text(s,label,68,y,1100,44,29,true,accent);text(s,body,68,y+49,1100,110,28,false,ink);}
let s=slide('Pedidos e inventario\nQuesería Los Alpes','Caso comercial autorizado por el docente según el grupo. Fuente: informe base y desafío CIIN1205P. Integrantes por completar en el informe.');
text(s,'Prototipo en Python',68,245,1100,75,48,true);
text(s,'Grupo 1  ·  Fundamentos de Programación\nCIIN1205P  ·  Cajamarca  ·  2026-2',68,360,1100,110,28);
text(s,'Registro, búsqueda y conservación de las ventas',68,550,1100,60,28,false,accent);
s=slide('El proceso y el problema','El informe base describe la atención presencial y telefónica. Las estimaciones de tiempos no se presentan como mediciones verificadas. La evidencia de visita y fotografías está pendiente del grupo.');
para(s,'Atención actual','Recibir el pedido, consultar existencias, anotar, preparar, cobrar y actualizar el cuaderno.',170);
para(s,'Riesgo principal','Un registro incompleto puede producir un cobro incorrecto o comprometer productos que ya no están disponibles.',370);
s=slide('Alcance de la solución','No sustituye el pesaje, la entrega ni un comprobante tributario. El catálogo inicial es de demostración, tomado de los ejemplos del Word.');
para(s,'Operaciones incluidas','Registrar y validar pedidos; buscar por código; ordenar; consultar stock y resumen diario; guardar en archivos.',165);
para(s,'Condiciones de uso','Cuatro productos, una computadora y una instancia. Reposición, anulaciones y varias cajas quedan para una siguiente versión.',370);
s=slide('Entradas y resultados','Explicar que el precio se toma del catálogo, no se digita libremente al vender. La cantidad admite hasta tres decimales.');
para(s,'Datos de entrada','Cliente, canal, producto y cantidad en kilogramos. El catálogo aporta el precio y las existencias.',165);
para(s,'Reglas y salidas','Validar antes de modificar. Calcular cantidad × precio. Emitir código, detalle e importe; descontar stock solo si se guarda.',370);
s=slide('Alternativas consideradas','La evaluación detallada está en la sección 4 del informe. No hay cotización de un proveedor. Los puntajes son valoración de diseño, no mediciones de campo.');
para(s,'A  Lista y búsqueda lineal','Seleccionada: facilita explicar los algoritmos y verificar las reglas del pedido con los recursos del curso.',145);
para(s,'B  Índice y búsqueda binaria','Consulta más eficiente, pero exige mantener el orden y añade complejidad a las actualizaciones.',315);
text(s,'Tercerizar exige cotización, soporte y condiciones de acceso a los datos.',68,560,1100,70,27,false,muted);
s=slide('Secuencia de una venta','Corresponde al diagrama y pseudocódigo del informe. Demostrar que un producto repetido se agrupa antes de validar stock.');
const steps=['1  Leer cliente, canal y productos','2  Validar y agrupar cantidades repetidas','3  Comprobar stock y calcular sobre una copia','4  Guardar el pedido y el nuevo inventario','5  Actualizar memoria y mostrar la constancia'];
steps.forEach((t,i)=>text(s,t,78,165+i*82,1100,60,30,i===3));
s=slide('Funciones y estructuras utilizadas','Fuentes: negocio.py, archivos.py y main.py del prototipo. Se utilizan arreglos paralelos para crear el catálogo y listas de registros para pedidos y detalles.');
para(s,'Módulos','main.py atiende el menú; negocio.py resuelve las reglas; archivos.py conserva el estado; test_prototipo.py lo verifica.',160);
para(s,'Algoritmos visibles','Búsqueda lineal O(n), inserción O(n²) en el peor caso, listas y cadenas normalizadas. Las funciones reciben parámetros explícitos.',365);
s=slide('Persistencia y precisión','Fuentes oficiales: https://docs.python.org/3/library/json.html ; https://docs.python.org/3/library/decimal.html ; https://docs.python.org/3/library/os.html#os.replace .');
para(s,'Importes con Decimal','Los valores se construyen desde texto. Cada subtotal se redondea a dos decimales antes de sumar el pedido.',160);
para(s,'Archivo JSON','Se escribe un temporal y se reemplaza el destino. Si falla el guardado, la venta no se confirma ni altera el stock en memoria.',365);
s=slide('Demostración del prototipo','Abrir python main.py. Registrar a Daniel, presencial, producto 1, cantidad 15; terminar líneas con 0. Buscar PED-000001, consultar inventario y reiniciar. Usar una copia limpia del proyecto para repetir.');
text(s,'15 kg × S/ 18 = S/ 270,00',68,180,1120,80,50,true);
text(s,'Stock inicial 20 kg  →  stock final 5 kg',68,290,1120,70,36);
text(s,'Código PED-000001\nLa búsqueda recupera el pedido.\nEl reinicio conserva los datos guardados.',68,405,1100,150,31);
text(s,'Datos de demostración del informe base.',68,602,1100,40,22,false,muted);
s=slide('Resultados de las pruebas','Ejecución: python -m unittest -v. Se probaron 18 métodos con estados aislados. Fuente: test_prototipo.py y salida de pruebas adjunta. No son pruebas de campo con clientes reales.');
text(s,'18 pruebas aprobadas',68,165,1100,90,56,true);
text(s,'Pruebas reproducibles',68,300,470,50,29,true,accent);
text(s,'Ventas, límites de stock,\nbúsqueda y ordenamiento.\n\nEntradas inválidas, archivos\ndañados y fallos de escritura.',68,360,490,230,27);
const pb=await fs.readFile(path.join(root,'pruebas.png'));
s.images.add({blob:pb.buffer.slice(pb.byteOffset,pb.byteOffset+pb.byteLength),contentType:'image/png',alt:'Salida real de las 18 pruebas aprobadas',fit:'contain',position:{left:590,top:285,width:620,height:330}});
s=slide('Aprendizaje y responsabilidad','Fuentes: documentación oficial de Decimal, JSON, os.replace y unittest en las referencias del informe. Completar el registro individual y la declaración oficial de IA.');
para(s,'Conocimientos complementarios','Precisión decimal, persistencia con reemplazo de archivo y pruebas automatizadas. El grupo debe explicar y verificar su uso.',165);
para(s,'Cuidado de la información','Usar datos de demostración en GitHub; proteger nombres y compras. Declarar la asistencia de IA y revisar cada resultado.',370);
s=slide('Conclusiones y siguientes pasos','Completar nombres, visita, fotos fechadas, pruebas con datos de campo e historial auténtico de GitHub. No atribuir aportes o entrevistas que no estén documentados.');
para(s,'Resultado técnico','El prototipo registra, valida, busca, ordena y conserva pedidos. Las pruebas respaldan los casos documentados.',150);
para(s,'Mejoras prioritarias','Incorporar reposiciones y anulaciones trazables; medir tiempos reales y revisar concurrencia antes de utilizar varias cajas.',335);
text(s,'Completar evidencias de campo, GitHub y declaración oficial de IA.',68,575,1100,65,25,false,muted);

await fs.mkdir(path.join(root,'slides'),{recursive:true});
for(let i=0;i<p.slides.items.length;i++){
 const b=await p.export({slide:p.slides.items[i],format:'png',scale:1});
 await fs.writeFile(path.join(root,'slides',`slide-${i+1}.png`),new Uint8Array(await b.arrayBuffer()));
}
const candidatePath=path.join(root,'candidate.pptx');
await(await PresentationFile.exportPptx(p)).save(candidatePath);
const skill='C:/Users/marco/.codex/plugins/cache/openai-primary-runtime/presentations/26.1013.11914/skills/presentations';
const {finalizePresentation}=await import(pathToFileURL(path.join(skill,'container_tools/artifact_tool_utils.mjs')).href);
const result=await finalizePresentation({workspaceDir:path.resolve('.'),candidatePath,finalPath:path.resolve('outputs/Grupo1_FundamentosDeProgramacion_EF.pptx'),pythonExecutable:'C:/Users/marco/.cache/codex-runtimes/codex-primary-runtime/dependencies/python/python.exe',integrityValidatorPath:path.join(skill,'container_tools/inspect_presentation_package_integrity.py'),layoutValidatorPath:path.join(skill,'container_tools/inspect_presentation_layout_geometry.py'),layoutArgs:['--expected-slide-size-emu','12192000,6858000','--validate-heading-fit'],explicitTotalSlideCount:12,fontPolicy:{basis:'design',families:['Arial']},verifyArtifactToolImport:true,receiptPath:path.join(root,'slides-validation.json')});
console.log(JSON.stringify(result));

