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

export const isDesktop = (): boolean => {
    return window.innerWidth > 768;
}