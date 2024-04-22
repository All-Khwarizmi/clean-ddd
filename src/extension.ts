// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";

const { workspace } = vscode;

async function createDirectories(baseUri: vscode.Uri) {
  const folders = [
    "feature/presentation/views",
    "feature/presentation/components",
    "feature/presentation/layout",
    "feature/application/usecases",
    "feature/application/repositories",
    "feature/application/adapters",
    "feature/domain/entities",
    "feature/domain/value objects",
    "feature/infra/dto's",
    "feature/infra/services",
  ];

  for (const folder of folders) {
    const folderPath = vscode.Uri.joinPath(baseUri, folder);
    await workspace.fs.createDirectory(folderPath);
  }
}
export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand(
    "clean-ddd.createFeature",
    (uri: vscode.Uri) => {
      createDirectories(uri);
      vscode.window.showInformationMessage(
        "Feature structure created successfully!"
      );
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
