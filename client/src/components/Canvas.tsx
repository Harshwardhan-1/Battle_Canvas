import '../styles/Canvas.css';
import { useState,useRef } from 'react';
export default function Canvas() {
    const canvasRef=useRef<HTMLCanvasElement | null>(null);
    const [tool,setTool]=useState("pencil");
    const [isDrawing,setIsDrawing]=useState(false);
    const [color,setColor]=useState('#000000');

    const [history,setHistory]=useState<ImageData[]>([]);
    const [redoHistory,setRedoHistory]=useState<ImageData[]>([]);

    const startDrawing=(e:React.MouseEvent<HTMLCanvasElement>)=>{
        e.preventDefault();
        if(tool!=="pencil" && tool!=='brush' && tool!== 'eraser'){
            return;
        }
        const canvas=canvasRef.current;
        if(!canvas){
            return;
        }
        const ctx=canvas.getContext('2d');
        if(!ctx){
            return;
        }
        ctx.strokeStyle=color;
        ctx.globalCompositeOperation='source-over';
        if(tool=== 'pencil'){
          ctx.lineWidth=2;
        }else if(tool=== 'brush'){
          ctx.lineWidth=15;
        }else if(tool=== 'eraser'){
          ctx.globalCompositeOperation="destination-out";
          ctx.lineWidth=20;
        }
        ctx.lineCap="round";
        ctx.beginPath();
        ctx.moveTo(e.nativeEvent.offsetX,e.nativeEvent.offsetY);
        setIsDrawing(true);
    }

    const draw=(e:React.MouseEvent<HTMLCanvasElement>)=>{
        e.preventDefault();
        if(!isDrawing || (tool!=="pencil" && tool!== 'brush' && tool!== 'eraser'))return;
        const canvas=canvasRef.current;
        if(!canvas)return;
        const ctx=canvas.getContext('2d');
        if(!ctx){
            return;
        }
        ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
        ctx.stroke();
    }

    const stopDrawing=()=>{
        setIsDrawing(false);
        const canvas=canvasRef.current;
        if(!canvas) return;
        const ctx=canvas.getContext('2d');
        if(!ctx) return;
        const snapshot=ctx.getImageData(0,0,canvas.width,canvas.height);
        setHistory(prev=>[...prev,snapshot]);
    }

const handleUndo=()=>{
  const canvas=canvasRef.current;
  if(!canvas)return;
  const ctx=canvas.getContext('2d');
  if(!ctx)return;
  if(history.length===0)return;
  //redo
  const snapshot=ctx.getImageData(0,0,canvas.width,canvas.height);
  setRedoHistory(prev=>[...prev,snapshot]);
//redo
  const newHistory=[...history];
  newHistory.pop();
  const previousState=newHistory[newHistory.length-1];
  ctx.clearRect(0,0,canvas.width,canvas.height);
  if(previousState){
     ctx.putImageData(previousState,0,0);
  }
  setHistory(newHistory);
}



const handleRedo=()=>{
  const canvas=canvasRef.current;
  if(!canvas)return;
  const ctx=canvas.getContext('2d');
  if(!ctx) return;
  const showImage=[...redoHistory];
  if(showImage.length===0)return;
  const showImageToCanvas=showImage.pop();
  if(!showImageToCanvas)return;
 const currentState=ctx.getImageData(0,0,canvas.width,canvas.height);
 setHistory(prev=>[...prev,currentState]);

 ctx.clearRect(0,0,canvas.width,canvas.height);
 ctx.putImageData(showImageToCanvas,0,0);

 setRedoHistory(showImage);
}
    
  return (
    <>
    <div className="toolbar">
      <ul className="tool-options">
        <li className="option" onClick={()=>setTool("pencil")}><i className="fa-solid fa-pencil"></i></li>
        <li className="option"><i onClick={()=>setTool('brush')} className="fa-solid fa-paint-brush"></i></li>
        <li className="option"><i onClick={()=>setTool('eraser')} className="fa-solid fa-eraser"></i></li>
        <li className="option"><i onClick={handleUndo} className="fa-solid fa-undo"></i></li>
        <li className="option"><i onClick={handleRedo} className="fa-solid fa-redo"></i></li>
      </ul>


      <div className="shape-section">
        <label className="fill-option">
          <input type="checkbox" />
          <span>Fill Colors</span>
        </label>

        <ul className="shape-options">
          <li className="shapes">
            <i className="fa-regular fa-square"></i>
            <span>Rectangle</span>
          </li>

          <li className="shapes">
            <i className="fa-regular fa-circle"></i>
            <span>Circle</span>
          </li>

          <li className="shapes">
            <i className="fa-solid fa-play triangle-icon"></i>
            <span>Triangle</span>
          </li>

          <li className='shapes'>
            <i className='fa-solid fa-hexagon'></i>
            <span>Hexagon</span>
          </li>

          <li className="shapes">
            <i className="fa-solid fa-minus"></i>
            <span>Line</span>
          </li>

          <li className="shapes">
            <i className="fa-solid fa-arrow-right"></i>
            <span>Arrow</span>
          </li>
        </ul>
      </div>
      <div className="row-colors">
        <label>Colors</label>
        <ul className="color-options">
          <li></li>
          <li className="selected"></li>
          <li></li>
          <li></li>
          <li></li>
          <li>
            <input type="color" value={color} onChange={(e)=>setColor(e.target.value)}  />
          </li>
        </ul>
      </div>
    </div>



    <canvas
        className="canvas-area"
        ref={canvasRef}
        width={1220}
        height={300}
        onMouseDown={startDrawing}
        onMouseLeave={stopDrawing}
        onMouseUp={stopDrawing}
        onMouseMove={draw}
        >
    </canvas>
    </>
  );
}