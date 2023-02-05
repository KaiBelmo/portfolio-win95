export interface IApp {
    appName: string;
    appIcon: string;
    componentName: any;
    openWindow: boolean;
    inDesktop: boolean;
    isProgram: boolean;
    notepadContent?: string;
    recycleBinContent?: IRecycleBin[];
}

export interface IRecycleBin {
    name: string;
    originalLocation: string;
    deletedDate: string;
    type: string;
    size: string;
}

export let initRecycleBin = (): IRecycleBin[] => {
    return [
        {
            name: "php", originalLocation: "php.net", deletedDate: "2015", type: "programming language", size: "19,643kb"
        },
        {
            name: "java", originalLocation: "java.com", deletedDate: "2017", type: "programming language", size: "84,5mb"
        },
    ]
}
