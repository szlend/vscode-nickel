# unofficial-nickel-vscode

Unofficial Visual Stuido Code extension for the [Nickel](https://github.com/tweag/nickel) language v1.0.

- Syntax based on: [kubukoz/vscode-nickel-syntax](https://github.com/kubukoz/vscode-nickel-syntax)
- LSP client based on: [tweag/nickel](https://github.com/tweag/nickel/tree/master/lsp/client-extension)

⚠️ This is just a quickly hacked together extension for my convenience. I cannot provide support for it, nor do I intend to develop this into something more concrete. I'm happy to accept contributions or extend maintainer rights if someone would like to have a go at it though.

## Features

- Basic syntax highlighting: parentheses, brackets, comments, keywords, operators
- Language server support using the official [Nickel](https://github.com/tweag/nickel) LSP server
- Code formatting using [Topiary](https://github.com/tweag/topiary)

## Prerequsites

### Install `nickel`, `nls` and `topiary`

```
nix profile install nixpkgs#{nickel,nls,topiary}
```

## Compiling

```
$ nix develop
$ npm install
$ vsce package
```
