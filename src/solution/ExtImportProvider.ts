import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';

export default class ExtImportProvider implements vscode.CompletionItem{
    public label : string = '/';
    private homeDirectory : string | null = null;
    private codeConfiguration : any | null = null;
    private currentLine : string | null = null;
    private workspaceFolder : any | null = null;
    private workspaceFolderPath : string | null = null;
    private currentDir : string | null = null;

    public provideCompletionItems(document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken): Thenable<vscode.CompletionItem[]> {
        var that = this;

        this.homeDirectory = process.env[(process.platform === 'win32') ? 'USERPROFILE' : 'HOME'] || '/';
        this.codeConfiguration = vscode.workspace.getConfiguration('ext-import', document.uri || null);
        this.currentLine = document.getText(document.lineAt(position).range);
        this.workspaceFolder = vscode.workspace.getWorkspaceFolder(document.uri) || (vscode.workspace.workspaceFolders ? vscode.workspace.workspaceFolders[0] : null);
        this.workspaceFolderPath = this.workspaceFolder && this.workspaceFolder.uri.fsPath;
        this.currentDir = path.parse(document.fileName).dir || '/';

        return this.GetItems()
        .then((items) => {
            if(items && items.length){
                return items
                .filter((item : string) => {
                    if(fs.lstatSync(path.join(that.currentDir as string, item)).isFile()){
                        var ext = path.extname(item);

                        return ext !== '.ts' && ext !== 'tsx' && that.codeConfiguration.import.includes(ext);
                    }
                })
                .map((item : string) => {
                    var completion = new vscode.CompletionItem(item);

                    completion.insertText = item;
                    completion.sortText = 'f';
                    completion.kind = vscode.CompletionItemKind.File;

                    return completion;
                });
            }

            return [];
        });
    }

    private GetItems() : Thenable<any>{
        var that : ExtImportProvider = this;
        var importMatch : RegExpExecArray | null = /^import\s.*\sfrom\s[\'|\"](.*)[\"|\']/gm.exec(that.currentLine as string);

        if(importMatch && importMatch[1]){
            var importItem =  importMatch[1].replace(/\'|\;/g, '');

            if(importMatch[1].startsWith('/')){
                that.currentDir = that.workspaceFolderPath;
                importItem = importItem.substring(1);
            } else if(importMatch[1].startsWith('~')){
                that.currentDir = that.homeDirectory;
                importItem = importItem.substring(2);
            }

            that.currentDir = path.resolve(that.currentDir as string, importItem);
        }

        return Promise
        .all([that.currentDir].map(() => {
            return new Promise((resolve, reject) => {
                fs.stat(that.currentDir as string, (err, stat) => {
                    if (err) {
                        return reject(err);
                    }

                    fs.readdir(that.currentDir as string, (err, items) => {
                        if(err){
                            return reject(err);
                        }

                        resolve(items);
                    });
                });
            });
        }))
        .then((results) => {
            return results.reduce((stack: any, current: any) => {
                return stack.concat(current);
            }, []);
        });
    }
}