import { defineStore } from "pinia";
import type { IApp } from "@/assets/ts/apps";
import { initRecycleBin } from "@/assets/ts/apps";
import Notepad from '@/components/apps/notepad.vue';
import RecycleBin from '@/components/apps/recycleBin.vue';
import textFile from '@/components/apps/textFile.vue';
import AboutMe from '@/components/apps/aboutMe.vue';
import cmd from '@/components/apps/cmd.vue';

import NotepadIcon from '@/assets/notepad.png'
import TrashIcon from '@/assets/trash.png'
import aboutMeIcon from '@/assets/aboutme.png'
import textFileIcon from '@/assets/text_file.png'
import cmdIcon from '@/assets/cmd.png'

interface IStateApp {
    apps: IApp[];
    index: number;
}

export const useAppStore = defineStore({
    id: "appStore",
    state: (): IStateApp => ({
        index: 0,
        apps: [
            {
                appName: "recycle bin", appIcon: TrashIcon,
                componentName: RecycleBin, openWindow: false, recycleBinContent: initRecycleBin(), inDesktop: true, isProgram: true
            }, {
                appName: "about me", appIcon: aboutMeIcon,
                componentName: AboutMe, openWindow: false, inDesktop: true, isProgram: true
            }, {
                appName: "notepad", appIcon: NotepadIcon,
                componentName: Notepad, openWindow: false, inDesktop: true, isProgram: true
            }, {
                appName: "readme", appIcon: textFileIcon,
                componentName: textFile, openWindow: false, 
                notepadContent: "technologies that I used: Typescript, Vue.js, Pinia, HTML, Canvas, SCSS", inDesktop: true, isProgram: false
            }, {
                appName: "cmd", appIcon: cmdIcon,
                componentName: cmd, openWindow: false, inDesktop: false, isProgram: true
            },
        ]
    }), getters: {
        openedApps(): any {
            return this.apps.filter(app => (app.openWindow === true && app.notepadContent === undefined));
        }, DesktopApps(): any {
            return this.apps.filter(app => (app.inDesktop === true));
        }, executables(): any {
            return this.apps.filter(app => (app.isProgram === true));
        }, textFiles(): any {
            return this.apps.filter(app => (app.isProgram !== true));
        }
    }, actions: {
        pushTextFile(fileName: string, content: string, isInDesktop: boolean): void {
            this.apps.push(
                {
                    appName: fileName, appIcon: textFileIcon,
                    componentName: Notepad, openWindow: false, notepadContent: content, inDesktop: isInDesktop, isProgram: false
                }
            )
        }
    }
})