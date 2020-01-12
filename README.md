# ext-import

provides import completion for files with any extension

<img src="https://raw.githubusercontent.com/sodiac/ext-import/master/demo/ext-import.gif" alt="demo gif" />

## Features

- supports items import via the `ext-import.import` option

## Installation

Install it from the [marketplace](https://marketplace.visualstudio.com/items?itemName=sodiac.ext-import).
`ext install ext-import`

## Options

- `ext-import.import` - [array] allow wich extensions show in the suggestions

.ts and .tsx extensions are still handled by visual studio code

> default: [".json", ".txt", ".html"]

- `ext-import.tsconfig` - [string] path to the tsconfig.json in the current code-workspace

> default: "./tsconfig"

## Tips

- you need a [name].d.ts file to import the desired extension

```
declare module "*.json" {
    const content: any;
    export default content;
}
````

## Release Notes

### 1.1.0
* support baseUrl from tsconfig.json
* support relative and absolute path

### 1.0.1

* update readme

### 1.0.0

* initial release

## Author
marcel armada-castellon

+ [github/sodiac](https://github.com/sodiac)

## Credits
This extension is based on [path-autocomplete](https://github.com/ionutvmi/path-autocomplete)
