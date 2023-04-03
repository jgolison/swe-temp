import { fabric } from "fabric";
let erasingRemovesErasedObjects = false;
let currentColor = '#000000'
let currentWidth = 30;
function changeAction(target) {
    ['erase','black-pen','brown-pen','gray-pen', 'white-pen','red-pen', 'orange-pen', 'yellow-pen', 'green-pen', 'blue-pen', 'purple-pen', 'pink-pen', 'thin-width', 'medium-width', 'thick-width', 'clear'].forEach(action => {
      const t = document.getElementById(action);
      t.classList.remove('active');
    });
  if(typeof target==='string') target = document.getElementById(target);
    target.classList.add('active');
    switch (target.id) {
      case "erase":
        canvas.freeDrawingBrush = new fabric.EraserBrush(canvas);
        canvas.freeDrawingBrush.width = 50;
        canvas.isDrawingMode = true;
        break;
      case "clear":
        canvas.clear();
        break;
        
      case "undo":
        canvas.freeDrawingBrush = new fabric.EraserBrush(canvas);
        canvas.freeDrawingBrush.inverted = true;
        canvas.isDrawingMode = true;
        break;
      case "black-pen":
        canvas.freeDrawingBrush = new fabric.PencilBrush(canvas);
        canvas.isDrawingMode = true;
        currentColor = '#000000';
        break;
      case "brown-pen":
        canvas.freeDrawingBrush = new fabric.PencilBrush(canvas);
        canvas.isDrawingMode = true;
        currentColor = '#8f5b43';
        break;
      case "gray-pen":
        canvas.freeDrawingBrush = new fabric.PencilBrush(canvas);
        canvas.isDrawingMode = true;
        currentColor = '#707070';
        break;
      case "white-pen":
        canvas.freeDrawingBrush = new fabric.PencilBrush(canvas);
        canvas.isDrawingMode = true;
        currentColor = '#FFFFFF';
        break;
      case "red-pen":
        canvas.freeDrawingBrush = new fabric.PencilBrush(canvas);
        canvas.isDrawingMode = true;
        currentColor = '#cf3025';
        break;
      case "orange-pen":
        canvas.freeDrawingBrush = new fabric.PencilBrush(canvas);
        canvas.isDrawingMode = true;
        currentColor = '#d68a20';
        break;
      case "yellow-pen":
        canvas.freeDrawingBrush = new fabric.PencilBrush(canvas);
        canvas.isDrawingMode = true;
        currentColor = '#e3c936';
        break;
      case "green-pen":
        canvas.freeDrawingBrush = new fabric.PencilBrush(canvas);
        canvas.isDrawingMode = true;
        currentColor = '#6cbf52';
        break;
      case "blue-pen":
        canvas.freeDrawingBrush = new fabric.PencilBrush(canvas);
        canvas.isDrawingMode = true;
        currentColor = '#3e81b5';
        break;
      case "purple-pen":
        canvas.freeDrawingBrush = new fabric.PencilBrush(canvas);
        canvas.isDrawingMode = true;
        currentColor = '#8451ad';
        break;
      case "pink-pen":
        canvas.freeDrawingBrush = new fabric.PencilBrush(canvas);
        canvas.isDrawingMode = true;
        currentColor = '#cc62aa';
        break;

      case "thin-width":
       
        currentWidth = 5;
      
        canvas.isDrawingMode = true;
        break;
      case "medium-width":
        currentWidth = 30;
       
        canvas.isDrawingMode = true;
        break;
      case "thick-width":
     
        currentWidth = 50;
 canvas.isDrawingMode = true;
        break;
      default:
        break;
    }
  canvas.freeDrawingBrush.color = currentColor;
  canvas.freeDrawingBrush.width = currentWidth;
  }
  function init() {
    canvas.setOverlayColor("rgba(0,0,0,0)",undefined,{erasable:false});

    function animate() {
      try {
        canvas
          .item(0)
          .animate("top", canvas.item(0).get("top") === 500 ? "100" : "500", {
            duration: 1000,
            onChange: canvas.renderAll.bind(canvas),
            onComplete: animate
          });
      } catch (error) {
        setTimeout(animate, 500);
      }
    }
  }

  const setDrawableErasableProp = (drawable, value) => {
    canvas.get(drawable)?.set({ erasable: value });
    changeAction('erase');
  };

  const setBgImageErasableProp = (input) =>
    setDrawableErasableProp("backgroundImage", input.checked);

  const setErasingRemovesErasedObjects = (input) =>
    (erasingRemovesErasedObjects = input.checked);

  const downloadImage = () => {
    const ext = "png";
    const base64 = canvas.toDataURL({
      format: ext,
      enableRetinaScaling: true
    });
    const link = document.createElement("a");
    link.href = base64;
    link.download = `eraser_example.${ext}`;
    link.click();
  };

  const downloadSVG = () => {
    const svg = canvas.toSVG();
    const a = document.createElement("a");
    const blob = new Blob([svg], { type: "image/svg+xml" });
    const blobURL = URL.createObjectURL(blob);
    a.href = blobURL;
    a.download = "eraser_example.svg";
    a.click();
    URL.revokeObjectURL(blobURL);
  };

  const toJSON = async () => {
    const json = canvas.toDatalessJSON(["clipPath", "eraser"]);
    const out = JSON.stringify(json, null, "\t");
    const blob = new Blob([out], { type: "text/plain" });
    const clipboardItemData = { [blob.type]: blob };
    try {
      navigator.clipboard &&
        (await navigator.clipboard.write([
          new ClipboardItem(clipboardItemData)
        ]));
    } catch (error) {
      console.log(error);
    }
    const blobURL = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = blobURL;
    a.download = "eraser_example.json";
    a.click();
    URL.revokeObjectURL(blobURL);
  };
  const canvas = this.__canvas = new fabric.Canvas('c');
  init();
  changeAction('erase');
