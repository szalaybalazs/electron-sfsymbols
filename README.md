<p align="center">
 <!-- <img width="100px" src="https://raw.githubusercontent.com/szalaybalazs/electron-sfsymbols/main/.github/images/favicon512x512-npm.png" align="center" alt=":package: ts-npm-package-boilerplate" /> -->
 <h2 align="center">:package: electron-sfsymbols</h2>
 <p align="center">Use SF Symbols in electron applications</p>
  <p align="center">
    <a href="https://github.com/szalaybalazs/electron-sfsymbols/issues">
      <img alt="Issues" src="https://img.shields.io/github/issues/szalaybalazs/electron-sfsymbols?style=flat&color=336791" />
    </a>
    <a href="https://github.com/szalaybalazs/electron-sfsymbols/pulls">
      <img alt="GitHub pull requests" src="https://img.shields.io/github/issues-pr/szalaybalazs/electron-sfsymbols?style=flat&color=336791" />
    </a>
     <a href="https://github.com/szalaybalazs/electron-sfsymbols">
      <img alt="GitHub Downloads" src="https://img.shields.io/npm/dw/electron-sf-symbol?style=flat&color=336791" />
    </a>
    <a href="https://github.com/szalaybalazs/electron-sfsymbols">
      <img alt="GitHub Total Downloads" src="https://img.shields.io/npm/dt/electron-sf-symbol?color=336791&label=Total%20downloads" />
    </a>
    <!-- <a href="https://github.com/szalaybalazs/electron-sfsymbols">
      <img alt="GitHub release" src="https://img.shields.io/github/release/szalaybalazs/electron-sfsymbols.svg?style=flat&color=336791" />
    </a> -->
    <br />
    <br />
  <a href="https://github.com/szalaybalazs/electron-sfsymbols/issues/new/choose">Report Bug</a>
  <a href="https://github.com/szalaybalazs/electron-sfsymbols/issues/new/choose">Request Feature</a>
  </p>
 <!-- <h3 align="center">Systems on which it has been tested:</h3>
 <p align="center">
   <a href="https://www.apple.com/br/macos/">
      <img alt="Macos" src="https://img.shields.io/badge/mac%20os-000000?style=for-the-badge&logo=apple&logoColor=white&style=flat" />
    </a>
    <a href="https://ubuntu.com/download">
      <img alt="Ubuntu" src="https://img.shields.io/badge/Ubuntu-E95420?style=for-the-badge&logo=ubuntu&logoColor=white&style=flat" />
    </a>
    <a href="https://www.microsoft.com/pt-br/windows/">
      <img alt="Windows" src="https://img.shields.io/badge/Windows-0078D6?style=for-the-badge&logo=windows&logoColor=white&style=flat" />
    </a>
  </p> -->
<!-- <p align="center">Did you like the project? Please
, considerate <a href="https://www.buymeacoffee.com/hebertcisco">a donation</a> to help improve!
</p> -->

<p align="center"><strong>Electron SF Symbols</strong>✨</p>

# Getting started

Use any of the over 5,000 icons provided by  Apple in your macOS application.

**Please note**: the package is only responsible to give you access to SF symbols on electron on macOS - the package does not handle different platforms and will likely produce errors on any other operating system than macOS.

⚠️ **Legal** ⚠️: SF Symbols are strictly copyrighted by Apple ([read more here](https://developer.apple.com/design/human-interface-guidelines/sf-symbols)). This package is not intented to use the icons on any other platforms or in conflict with the guidelines provided by Apple Inc. This package generates the symbols on the fly, using rougly the same logic as the `Electron.NativeImage.fromNamedImage` API.

## Installation

Install using your go-to package manager:

`yarn add electron-sfsymbols`

or

`npm i -S electron-sfsymbols`

Since the package uses a binary to generate the symbols, for it to work correctly the build options have to be updated.

```yaml
# electron-builder.yaml

extraResources:
  - ./resources/**
  - from: node_modules/electron-sfsymbols/lib/bin/sfsymbol
    to: bin/sfsymbol
```

The package will look for the binary at `resourcesPath/bin/sfsymbol` - this path can be manually changed by passing a third argument to any of the methods.

## Usage

### Basic usage with Electron's NativeImage

Create a 24x24 pixel NativeImage from the specified SF Symbol

```ts
import { getSfSymbolAsNativeImage } from 'electron-sfsymbols';

// ...

const image = getSfSymbolAsNativeImage('folder', { mode: 'palette', weight: 'black' });
```

### Usage with custom binary

Specify the path to the binary

```ts
import { getSfSymbolAsNativeImage } from 'electron-sfsymbols';

// ...

const image = getSfSymbolAsNativeImage(
  'folder',
  { mode: 'palette', weight: 'black' },
  join(getResourcesDirectory(), 'sfsymbol'),
);
```

### Advance Usage

This package gives you access to all the basic options of SfSymbols:

| Parameter | Description                                                                                              |      Type       |   Default    |
| :-------- | :------------------------------------------------------------------------------------------------------- | :-------------: | :----------: |
| size      | Size of the Symbol in pixels                                                                             |       Int       |     `24`     |
| scale     | Scale of the Symbol, for retina displays. The resulting image will have the dimensions of `size * scale` |       Int       |     `3`      |
| weight    |  Weight of the Symbol                                                                                    |  SfSymbolWeight |  `regular`   |
| mode      |  Rendering mode of the symbol                                                                            |   SfSymbolMode  | `monochrome` |
| variable  | Controls the variable property of the symbol                                                             |   Float (0-1)   |    `1.0 `    |
| primary   |  Primary color of the symbol                                                                             |  SfSymbolColor  |  `#0000000`  |
| secondary | Secondary color of the symbol                                                                            |  SfSymbolColor  |  `#0000000`  |
| Tertiary  | Tertiary color of the symbol                                                                             |  SfSymbolColor  |  `#0000000`  |

### Colors

The symbols can accept either `rgba` colors, hex or css colors.

**Please note:** For unrecognised or malformed colors the package throws an `UNRECOGNISED_COLOR` error.

|       Primary Color        |           Secondary Color          |  Tertiary Color |                  Result                  |
| :------------------------: | :--------------------------------: | :-------------: | :--------------------------------------: |
|         `#EF2D56`          |            `#ED7D3A33`             |        -        |  ![Hex](/images/example-colors-hex.png)  |
| `{ r: 239, g: 45, b: 86 }` | `{ r: 237, g: 125, b:58, a: 0.4 }` |        -        |  ![Rgb](/images/example-colors-rgb.png)  |
|      `[239, 45, 86]`       |       `[237, 125, 58, 0.4]`        |        -        | ![Rgb](/images/example-colors-array.png) |
|           `red`            |              `orange`              |        -        | ![Rgb](/images/example-colors-named.png) |

### Modes

| Mode code        |  Description                                       |                      Example                      |
| :--------------- | :------------------------------------------------- | :-----------------------------------------------: |
| **monochrome**   | The default rendering mode for the symbols         |   ![Monochrome](/images/example-monochrome.png)   |
| **palette**      | Define a range of colors for the symbol            |      ![Palette](/images/example-palette.png)      |
| **hierarchical** | Let the symbol decide the hierarchy of the colors  | ![Hierarchical](/images/example-hierarchical.png) |
| **multicolor**   | Use the multicolor version of the symbol           |   ![Multicolor](/images/example-multicolor.png)   |

**Configurations used for the examples:**

Monochrome:

```ts
const options: SfSymbolOptions = {
  mode: 'monochrome',
  primary: '00000000',
};
```

Palette:

```ts
const options: SfSymbolOptions = {
  mode: 'palette',
  primary: 'FFFFFFFF',
  secondary: '00FF00FF',
  tertiary: '00FF00FF',
};
```

Hierarchical:

```ts
const options: SfSymbolOptions = {
  mode: 'multicolor',
  primary: '00000000',
};
```

Multicolor

```ts
const options: SfSymbolOptions = {
  mode: 'multicolor',
};
```

### Variable Symbols

Many of the SF Symbols are variable icons - these symbols can be controlled using the `variable` option; a float between 0 and 1.

**Examples:**

| Variable |                      Example                      |
| :------- | :-----------------------------------------------: |
| `1.0`    |   ![Variable-1](/images/example-variable-100.png) |
| `0.5`    |   ![Variable-1](/images/example-variable-50.png)  |
| `0.0`    |    ![Variable-1](/images/example-variable-0.png)  |

### Weights

Sf Symbols support 8 weights other than the regular one

| Weight       |                    Example                     |
| :----------- | :--------------------------------------------: |
| `ultralight` |  ![ultralight](/images/example-ultralight.png) |
| `thin`       |        ![thin](/images/example-thin.png)       |
| `light`      |       ![light](/images/example-light.png)      |
| `regular`    |     ![regular](/images/example-regular.png)    |
| `medium`     |      ![medium](/images/example-medium.png)     |
| `semibold`   |    ![semibold](/images/example-semibold.png)   |
| `bold`       |        ![bold](/images/example-bold.png)       |
| `heavy`      |       ![heavy](/images/example-heavy.png)      |
| `black`      |       ![black](/images/example-black.png)      |

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](issues).

## Show your support

Give a ⭐️ if this project helped you!

Or buy me a coffee 🙌🏾

<!--
<a href="https://www.buymeacoffee.com/hebertcisco">
    <img src="https://img.buymeacoffee.com/button-api/?text=Buy me a coffee&emoji=&slug=hebertcisco&button_colour=FFDD00&font_colour=000000&font_family=Inter&outline_colour=000000&coffee_colour=ffffff" />
</a> -->

## 📝 License

Copyright © 2022 [Balázs Szalay](https://github.com/szalaybalazs).<br />
This project is [MIT](LICENSE) licensed.
