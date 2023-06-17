import { PathLike } from 'fs';
import { workspace, ExtensionContext } from 'vscode';
import { lookupInPath } from './toolchain';

import {
    LanguageClient,
    LanguageClientOptions,
    ServerOptions,
} from 'vscode-languageclient/node';

let client: LanguageClient;

export async function activate(context: ExtensionContext) {
    const serverConfigutration = workspace.getConfiguration("nls.server");
    const enableDebug: boolean = serverConfigutration.get("debugLog");
    const traceFile: PathLike = serverConfigutration.get("trace");
    let serverPath: string = serverConfigutration.get("path") || "nls";

    if (!serverPath.startsWith("/")) {
        serverPath = await lookupInPath(serverPath) || serverPath;
    }

    console.log(serverPath);

    const options = { env: process.env };
    const debugOptions = { env: Object.assign(options.env, { "RUST_LOG": "trace" }) };

    // If the extension is launched in debug mode then the debug server options are used
    // Otherwise the run options are used
    const serverOptions: ServerOptions = {
        run: {
            command: serverPath,
            args: traceFile ? ["--trace", traceFile.toString()] : [],
            options: (enableDebug ? debugOptions : options),
        },
        debug: {
            command: serverPath,
            args: traceFile ? ["--trace", traceFile.toString()] : [],
            options: debugOptions
        }
    };

    // Options to control the language client
    const clientOptions: LanguageClientOptions = {
        // Register the server for nickel files
        documentSelector: [{ scheme: 'file', language: 'nickel' }],
        synchronize: {
            // Notify the server about file changes to .ncl files contained in the workspace
            fileEvents: workspace.createFileSystemWatcher('**/*.ncl')
        }
    };

    // Create the language client and start the client.
    client = new LanguageClient(
        'nickelLanguageServerClient',
        'Nickel Language Server',
        serverOptions,
        clientOptions
    );

    // Start the client. This will also launch the server
    await client.start();
}

export async function deactivate() {
    if (!client) {
        return undefined;
    }
    return await client.stop();
}
