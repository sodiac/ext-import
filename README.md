# ext-import

provides import completion for files with any extension

<img src="https://raw.githubusercontent.com/sodiac/ext-import/master/demo/ext-import.gif" alt="demo gif" />

## Features

- it supports items include via the `ext-import.import` option

## Installation

You can install it from the [marketplace](https://marketplace.visualstudio.com/items?itemName=sodiac.ext-import).
`ext install ext-import`

## Options

- `ext-import.import` - array this option allows to define wich extensions show in the suggestions

.ts and .tsx extensions are still handled by visual studio code

> default: [".json", ".txt", ".html"]

## Tips

- you need a [name].d.ts file to import the desired extension

```
declare module "*.json" {
    const content: any;
    export default content;
}
````

## Release Notes

### 1.0.1

update readme

### 1.0.0

initial release

## Author
marcel armada-castellon

+ [github/sodiac](https://github.com/sodiac)

## Credits
This extension is based on [path-autocomplete](https://github.com/ionutvmi/path-autocomplete)
