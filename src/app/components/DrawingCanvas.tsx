'use client';

import { faCircle, faEraser, faFloppyDisk, faFontAwesome, faPen, faRotateRight, faSquare, faSquareCaretUp, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useRef, useState } from 'react';
import { ButtonStyle, IconButton, InputStyle } from './Forms';
import Tooltip from './Tooltip';
// import url from '@/assets/images/wdc.jpg';
// import Image from 'next/image';

type DrawMode = 'free' | 'rectangle' | 'circle' | 'triangle' | 'erase';

const DrawingCanvas: React.FC = () => {
    const colorDefault = '#555555';
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const tempCanvasRef = useRef<HTMLCanvasElement | null>(null);
    const [drawing, setDrawing] = useState(false);
    const [color, setColor] = useState(colorDefault);
    const [isErase, setIsErase] = useState(false);
    const [overlay, setOverlay] = useState(true);
    const [lineWidth, setLineWidth] = useState(10);
    const [drawMode, setDrawMode] = useState<DrawMode>('free');
    const startX = useRef(0);
    const startY = useRef(0);

    useEffect(() => {
        const canvas = canvasRef.current;
        const tempCanvas = tempCanvasRef.current;
        if (!canvas || !tempCanvas) return;

        const ctx = canvas.getContext("2d");
        const tempCtx = tempCanvas.getContext("2d");
        if (!ctx || !tempCtx) return;

        ctx.lineWidth = lineWidth;
        ctx.lineCap = "round";

        const startDrawing = (e: MouseEvent) => {
            setDrawing(true);
            startX.current = e.offsetX;
            startY.current = e.offsetY;

            if (drawMode === "free") {
                ctx.beginPath();
                ctx.moveTo(e.offsetX, e.offsetY);
            }
        };

        const draw = (e: MouseEvent) => {
            if (!drawing || !ctx || !tempCtx) return;
            ctx.globalCompositeOperation = isErase ? "destination-out" : "source-over"; // Xóa thực sự
            tempCtx.globalCompositeOperation = isErase ? "destination-out" : "source-over"; // Xóa thực sự
            tempCtx.clearRect(0, 0, tempCanvas.width, tempCanvas.height); // Xóa hình cũ trên temp canvas
            tempCtx.strokeStyle = drawMode === "erase" && isErase ? "rgba(0,0,0,1)" : color; // Nếu xóa, dùng màu "trong suốt"
            ctx.strokeStyle = drawMode === "erase" && isErase ? "rgba(0,0,0,1)" : color;
            tempCtx.lineWidth = lineWidth;

            const x = startX.current;
            const y = startY.current;
            const width = e.offsetX - x;
            const height = e.offsetY - y;

            if (drawMode === "free") {
                ctx.lineTo(e.offsetX, e.offsetY);
                ctx.stroke();
            } else if (drawMode === "rectangle") {
                tempCtx.strokeRect(x, y, width, height);
            } else if (drawMode === "circle") {
                tempCtx.beginPath();
                tempCtx.arc(x + width / 2, y + height / 2, Math.abs(width) / 2, 0, 2 * Math.PI);
                tempCtx.stroke();
            } else if (drawMode === "triangle") {
                tempCtx.beginPath();
                tempCtx.moveTo(x + width / 2, y); // Đỉnh trên
                tempCtx.lineTo(x, y + height); // Góc trái dưới
                tempCtx.lineTo(x + width, y + height); // Góc phải dưới
                tempCtx.closePath();
                tempCtx.stroke();
            }
        };

        const stopDrawing = (e: MouseEvent) => {
            if (!drawing || !ctx || !tempCtx) return;
            setDrawing(false);

            const x = startX.current;
            const y = startY.current;
            const width = e.offsetX - x;
            const height = e.offsetY - y;

            if (drawMode === "rectangle") {
                ctx.strokeRect(x, y, width, height);
            } else if (drawMode === "circle") {
                ctx.beginPath();
                ctx.arc(x + width / 2, y + height / 2, Math.abs(width) / 2, 0, 2 * Math.PI);
                ctx.stroke();
            }

            else if (drawMode === "triangle") {
                ctx.beginPath();
                ctx.moveTo(x + width / 2, y);
                ctx.lineTo(x, y + height);
                ctx.lineTo(x + width, y + height);
                ctx.closePath();
                ctx.stroke();
            }

            tempCtx.clearRect(0, 0, tempCanvas.width, tempCanvas.height); // Xóa temp canvas sau khi hoàn thành
        };

        canvas.addEventListener("mousedown", startDrawing);
        canvas.addEventListener("mousemove", draw);
        canvas.addEventListener("mouseup", stopDrawing);
        canvas.addEventListener("mouseleave", stopDrawing);

        return () => {
            canvas.removeEventListener("mousedown", startDrawing);
            canvas.removeEventListener("mousemove", draw);
            canvas.removeEventListener("mouseup", stopDrawing);
            canvas.removeEventListener("mouseleave", stopDrawing);
        };
    }, [drawing, color, lineWidth, drawMode, isErase]);

    // Hàm xóa canvas
    const clearCanvas = () => {
        const canvas = canvasRef.current;
        const tempCanvas = tempCanvasRef.current;
        if (!canvas || !tempCanvas) return;
        const ctx = canvas.getContext('2d');
        const tempCtx = tempCanvas.getContext('2d');
        if (!ctx || !tempCtx) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        tempCtx.clearRect(0, 0, tempCanvas.width, tempCanvas.height);
    };

    const saveCanvasAsImage = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const image = canvas.toDataURL("image/jpg"); // Chuyển canvas thành PNG
        const link = document.createElement("a");
        link.href = image;
        link.download = "drawing.png";
        link.click();
    };

    const handleErase = () => {
        // setDrawMode('erase')
        setIsErase(prev => !prev);
    }

    const setColorDefault = () => {
        setColor(colorDefault);
    }

    const resetCanvas = () => {
        clearCanvas();
        setOverlay(true);
        setColor(colorDefault);
        setLineWidth(5);
        setDrawMode('free');
    }

    const handlesetDrawMode = (mode: DrawMode) => {
        setDrawMode(mode);
        setIsErase(false);
    }

    return (
        <div className="text-center">
            <div className='action w-[1202px] mb-8 mx-auto flex items-center gap-4'>
                <div className='flex-1 flex items-center gap-4'>
                    <Tooltip content='Color' position='top'>
                        <InputStyle
                            type="color"
                            value={color}
                            onChange={(e) => setColor(e.target.value)}
                            disabled={isErase}
                            className={`${isErase ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                            small
                        />
                    </Tooltip>
                    <Tooltip content='Line Width' position='top'>
                        <InputStyle type="number" value={lineWidth} middle onChange={(e) => setLineWidth(Number(e.target.value))} />
                    </Tooltip>
                </div>
                <div className='flex-1 flex items-center justify-end gap-4'>
                    <Tooltip content='Line' position='top'>
                        <IconButton buttontype={`${drawMode === 'free' && !isErase ? 'warning' : 'secondary'}`} icon={<FontAwesomeIcon icon={faPen} />} onClick={() => handlesetDrawMode("free")} />
                    </Tooltip>
                    <Tooltip content='Rectangle' position='top'>
                        <IconButton buttontype={`${drawMode === 'rectangle' && !isErase ? 'warning' : 'secondary'}`} icon={<FontAwesomeIcon icon={faSquare} />} onClick={() => handlesetDrawMode("rectangle")} />
                    </Tooltip>
                    <Tooltip content='Circle' position='top'>

                        <IconButton buttontype={`${drawMode === 'circle' && !isErase ? 'warning' : 'secondary'}`} icon={<FontAwesomeIcon icon={faCircle} />} onClick={() => handlesetDrawMode("circle")} />
                    </Tooltip>
                    <Tooltip content='Triangle' position='top'>
                        <IconButton buttontype={`${drawMode === 'triangle' && !isErase ? 'warning' : 'secondary'}`} icon={<FontAwesomeIcon icon={faSquareCaretUp} fontSize={20} />} onClick={() => handlesetDrawMode("triangle")} />
                    </Tooltip>
                    <Tooltip content='SaveImage' position='top'>
                        <IconButton buttontype='tertiary' icon={<FontAwesomeIcon icon={faFloppyDisk} />} onClick={saveCanvasAsImage} />
                    </Tooltip>
                    <Tooltip content='Erase' position='top'>
                        <IconButton icon={< FontAwesomeIcon icon={faEraser} />} buttontype={`${isErase ? 'primary' : 'secondary'}`} onClick={handleErase} />
                    </Tooltip>
                    <Tooltip content='ColorDefault' position='top'>
                        <IconButton icon={<FontAwesomeIcon icon={faFontAwesome} />} buttontype='secondary' onClick={setColorDefault} />
                    </Tooltip>
                    <Tooltip content='Clear' position='top'>
                        <IconButton buttontype='danger' icon={<FontAwesomeIcon icon={faTrashCan} />} onClick={clearCanvas} />
                    </Tooltip>
                    <Tooltip content='Reset' position='top'>
                        <IconButton buttontype='primary' icon={<FontAwesomeIcon icon={faRotateRight} />} onClick={resetCanvas} />
                    </Tooltip>
                </div>
            </div>
            <div className="relative w-[1202px] h-[602px] mx-auto">
                {overlay && (
                    <div className="absolute w-full h-full bg-slate-200 flex items-center justify-center">
                        {/* <Image src={url} alt="File icon" className='min-w-[50px]' /> */}
                        <ButtonStyle className="animate-bounce" text='Start Drawing' buttontype="secondary" onClick={() => setOverlay(false)}></ButtonStyle>
                    </div>
                )}
                <canvas ref={canvasRef} width={1200} height={600} className={`${isErase ? 'cursor-crosshair' : 'cursor-default'} mx-auto border shadow-2xl`} />
                <canvas ref={tempCanvasRef} width={1200} height={600} className="absolute top-0 left-0 pointer-events-none" />
            </div>
            <div className="flex flex-col items-center mt-8 gap-4">
                {/* <div className="flex items-center mt-4 gap-8">
                    <div className="flex items-center gap-4">
                        <InputStyle
                            type="color"
                            value={color}
                            onChange={(e) => setColor(e.target.value)}
                            disabled={isErase}
                            className={`${isErase ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                            small
                        />
                        <ButtonStyle text='Set ColorDefault' buttontype="secondary" onClick={setColorDefault}></ButtonStyle>
                    </div>
                    <InputStyle label='Set LineWidth' type="number" value={lineWidth} onChange={(e) => setLineWidth(Number(e.target.value))} />
                </div> */}
                {/* <div className="flex items-center gap-4 mt-4">
                    <ButtonStyle text='Reset' buttontype="secondary" onClick={resetCanvas} startIcon={<FontAwesomeIcon icon={faRotateRight} />}></ButtonStyle>
                    <ButtonStyle text='Clear Drawing' buttontype="danger" onClick={clearCanvas}></ButtonStyle>
                    <ButtonStyle text='Save Drawing' buttontype="tertiary" onClick={saveCanvasAsImage}></ButtonStyle>
                    <IconButton icon={< FontAwesomeIcon icon={faEraser} />} buttontype={`${isErase ? 'primary' : 'secondary'}`} onClick={handleErase} />
                    <ButtonStyle
                        text="Free Draw"
                        buttontype={drawMode === "free" ? "primary" : "secondary"}
                        onClick={() => handlesetDrawMode("free")}
                        startIcon={<FontAwesomeIcon icon={faPen} />}
                    />
                    <ButtonStyle
                        text="Rectangle"
                        buttontype={drawMode === "rectangle" ? "primary" : "secondary"}
                        onClick={() => handlesetDrawMode("rectangle")}
                        startIcon={<FontAwesomeIcon icon={faSquare} />}
                    />
                    <ButtonStyle
                        text="Circle"
                        buttontype={drawMode === "circle" ? "primary" : "secondary"}
                        onClick={() => handlesetDrawMode("circle")}
                        startIcon={<FontAwesomeIcon icon={faCircle} />}
                    />
                </div> */}
            </div>
        </div >
    );
};

export default DrawingCanvas;