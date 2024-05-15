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
    "/application/adapters/services",
    "/domain/entities",
    "/domain/value objects",
    "/infra/dtos",
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
    async (uri: vscode.Uri) => {
      vscode.window
        .showInputBox({ prompt: "Enter Feature Name:" })
        .then(async (featureName: string | undefined) => {
          if (!featureName) {
            vscode.window.showInformationMessage("Feature creation cancelled.");
            return;
          }
          await createDirectories(uri, featureName);

          vscode.window.showInformationMessage(
            `Feature ${featureName} created successfully`
          );
        });
    }
  );

  context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
