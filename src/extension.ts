import * as vscode from "vscode";

const { workspace } = vscode;

async function createDirectories(baseUri: vscode.Uri, featureName: string) {
  const folders = [
    "/presentation/views",
    "/presentation/components",
    "/presentation/layout",
    "/application/usecases",
    "/application/repositories",
    "/application/adapters",
    "/domain/entities",
    "/domain/value objects",
    "/infra/dto's",
    "/infra/services",
  ];

  for (const folder of folders) {
    const folderPath = vscode.Uri.joinPath(
      baseUri,
      featureName.toLowerCase(),
      folder
    );
    await workspace.fs.createDirectory(folderPath);
  }
}
export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand(
    "clean-ddd.createFeature",
    (uri: vscode.Uri) => {
      vscode.window
        .showInputBox({ prompt: "Enter Feature Name:" })
        .then((featureName: string) => {
          if (!featureName) {
            vscode.window.showInformationMessage("Feature creation cancelled.");
            return;
          }
          createDirectories(uri, featureName);
        });
      vscode.window.showInformationMessage(
        "Feature structure created successfully!"
      );
    }
  );

  context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
