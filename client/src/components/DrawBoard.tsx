export default function DrawBoard(){
    return(
        <>
        <section className="drawingarea">
            <canvas></canvas>
        </section>

        
        <div className="buttons">
            <button>Clear Canvas</button>
            <button>Save as Image</button>
        </div>
        </>
    );
}