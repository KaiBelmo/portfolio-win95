export type Coordinates = {
    currentX: number;
    currentY: number;
    initialX: number;
    initialY: number;
    offsetX: number;
    offsetY: number;
    x: number;
    y: number;
};
export const openLink = (link: string, target: string): void => {
    window.open(link, target);
}
