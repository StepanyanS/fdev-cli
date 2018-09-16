import { statSync } from 'fs';

export function fileExists (filename: string): boolean {
    try {
        return statSync(filename).isFile();
    } catch (err) {
        return false;
    }
}

export function dirExists (dirname: string): boolean {
    try {
        return statSync(dirname).isDirectory();
    } catch (err) {
        return false;
    }
}

export function capitalize (str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
}