export const drawRectangle = (canvas: HTMLCanvasElement):void => {
    const context = canvas.getContext("2d");
    if (context === null || typeof context === "undefined") {
        console.log("context canvas is null or undefined");
        return;
    }
    let element: any;
    let isDragging: boolean = false;
    let startX: number = 0;
    let startY: number = 0;
    let currentX: number = 0;
    let currentY: number = 0;

    context.canvas.width = window.innerWidth;
    context.canvas.height = window.innerHeight;

    canvas.addEventListener("mousedown", handleMouseDown);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseup", handleMouseUp);

    function handleMouseDown(event: MouseEvent): void {
        startX = event.offsetX;
        startY = event.offsetY;
        isDragging = true;
    }
    function handleMouseMove(event: MouseEvent): void {
        currentX = event.offsetX;
        currentY = event.offsetY;
        context!.clearRect(0, 0, canvas.width, canvas.height);
        if (isDragging) {
            drawRectangle();
        }
    }
    function handleMouseUp(event: MouseEvent): void {
        isDragging = false;
        context!.clearRect(0, 0, canvas.width, canvas.height);
    }
    function drawRectangle(): void {
        const width = Math.abs(currentX - startX);
        const height = Math.abs(currentY - startY);
        const x = Math.min(startX, currentX);
        const y = Math.min(startY, currentY);
        context!.strokeStyle = "#222222";
        context!.setLineDash([2, 1]);
        context!.strokeRect(x, y, width, height);

        // element = document.querySelector('.app-wrapper')
        // const elementRect = element!.getBoundingClientRect();
        // if ((startX <= elementRect.left && currentX >= elementRect.right && startY <= elementRect.top && currentY >= elementRect.bottom) ||
        // (startX >= elementRect.left && currentX <= elementRect.right && startY <= elementRect.top && currentY >= elementRect.bottom) ||
        // (startX <= elementRect.left && currentX >= elementRect.right && startY >= elementRect.top && currentY <= elementRect.bottom) ||
        // (startX >= elementRect.left && currentX <= elementRect.right && startY >= elementRect.top && currentY <= elementRect.bottom)) {
        //     element.style.background = 'red';
        //     console.log('asd')
        // }
    }
}
