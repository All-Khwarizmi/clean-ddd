// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  //   let disposable = vscode.commands.registerCommand("clean-ddd.activate", () => {
  //     vscode.window.showInformationMessage("Hello World from Clean DDD!");
  //   });

  let disposable = vscode.commands.registerCommand(
    "clean-ddd.createFeature",
    (uri: vscode.Uri) => {
      // `uri` is the file or folder path on which the user right-clicked
      vscode.window.showInformationMessage(`Creating feature at ${uri.fsPath}`);
      createFeature(uri);
    }
  );

  function createFeature(uri: vscode.Uri) {
    // Add your logic here to create folders and files
    console.log({ uri });
  }

  context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
