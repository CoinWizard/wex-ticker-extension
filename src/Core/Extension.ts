import CreateProperties = chrome.tabs.CreateProperties;
import Manifest = chrome.runtime.Manifest;
import ExtensionMessageEvent = chrome.runtime.ExtensionMessageEvent;


import ExtensionInstance from 'Core/ExtensionInstance';
const extension: ExtensionInstance = new ExtensionInstance();


declare global {
    const VERSION: string;
}

interface RuntimeInterface {
    onMessage: ExtensionMessageEvent
    onInstalled: ExtensionMessageEvent
}

export default class ExtensionPlatform {
    
        static getExtension(): ExtensionInstance {
            return extension;
        }

        /**
         * Extract Tabs function
         */
        static getTabs(): any {
            return extension.tabs;
        }
    
        /**
         * extract Runtime object function
         */
        static getRuntime(): RuntimeInterface {
            return extension.runtime;
        }
    
        static reload() {
            extension.runtime.reload();
        }
    
        static openWindow(createProperties: CreateProperties, callback: Function = null) {
            extension.tabs.create(createProperties, callback);
        }
    
        static getManifest(): Manifest {
            return extension.runtime.getManifest();
        }
    
        static getNotifications(): any {
            return extension.notifications;
        }
    }
    