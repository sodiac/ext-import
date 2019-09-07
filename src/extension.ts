import * as vscode from 'vscode';
import ExtImportProvider from './solution/ExtImportProvider';

export function activate(context: vscode.ExtensionContext) {
	context.subscriptions.push(
		vscode.languages.registerCompletionItemProvider({ language: 'typescript', scheme: 'file' }, new ExtImportProvider(), '/')
	);
}
