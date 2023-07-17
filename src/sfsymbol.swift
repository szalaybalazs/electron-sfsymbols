//  swiftc sfsymbol.swift -o ../../resources/bin/sfsymbol

import AppKit

// 1. symbol.name (string)
// 2. size (int)
// 3. weight (enum)
// 4. variable (double)
// 5. mode
// 6. primary color
// 7. secondary color
// 8. ternary color


// todo: implement colors
func hexColor(hexString: String) -> NSColor {
    var hex = hexString.hasPrefix("#")
        ? String(hexString.dropFirst())
        : hexString
    
    while hex.count < 6 {
        hex += "0"
    }

    let scanner = Scanner(string: hex)
    var color: UInt32 = 0
    scanner.scanHexInt32(&color)

    let r = CGFloat((color & 0xFF000000) >> 24) / 255.0
    let g = CGFloat((color & 0x00FF0000) >> 16) / 255.0
    let b = CGFloat((color & 0x0000FF00) >> 8) / 255.0
    let a: CGFloat

    if hex.count == 8 {
        a = CGFloat(color & 0x000000FF) / 255.0
    } else {
        a = 1.0
    }


    return NSColor(red: r, green: g, blue: b, alpha: a)

}

func tint(image: NSImage, color: NSColor) -> NSImage {
    let tinted = image.copy() as! NSImage
    tinted.lockFocus()
    color.set()

    let imageRect = NSRect(origin: .zero, size: tinted.size)
    imageRect.fill(using: .sourceAtop)

    tinted.unlockFocus()
    return tinted
}

func makeRect(aspectRatio: NSSize, insideRect rect: NSRect) -> NSRect {
    let widthRatio = rect.width / aspectRatio.width
    let heightRatio = rect.height / aspectRatio.height
    let ratio = min(widthRatio, heightRatio)

    let newWidth = aspectRatio.width * ratio
    let newHeight = aspectRatio.height * ratio
    let newX = rect.origin.x + (rect.width - newWidth) / 2
    let newY = rect.origin.y + (rect.height - newHeight) / 2

    return NSRect(x: newX, y: newY, width: newWidth, height: newHeight)
}

enum Mode {
  case monochrome, multicolor, palette, hierarchical
}

func weightFromString(weight: String) -> NSFont.Weight {
    switch weight.lowercased() {
    case "ultralight":
        return .ultraLight
    case "thin":
        return .thin
    case "light":
        return .light
    case "medium":
        return .medium
    case "semibold":
        return .semibold
    case "bold":
        return .bold
    case "heavy":
        return .heavy
    case "black":
        return .black
    default:
        return .regular
    }
}
func modeFromString(mode: String) -> Mode {
    switch mode.lowercased() {
    case "multi":
        return .multicolor
    case "multicolor":
        return .multicolor
    case "mono":
        return .monochrome
    case "monochrome":
        return .monochrome
    case "palette":
        return .palette
    case "hierarchical":
        return .hierarchical
    case "hierarchy":
        return .hierarchical
    default:
        return .palette
    }
}

if CommandLine.argc < 2 {
    print("Please provide an SF icon name as a parameter.")
    exit(1)
}

let iconName = CommandLine.arguments[1]
let iconSize: Int = CommandLine.arguments.count > 2 ? Int(CommandLine.arguments[2]) ?? 32 : 32
let iconWeight: NSFont.Weight = CommandLine.arguments.count > 3 ? weightFromString(weight: CommandLine.arguments[3]) : .regular
let iconVariable: Double = CommandLine.arguments.count > 4 ? Double(CommandLine.arguments[4])! : Double(1.0)
let iconMode: Mode = CommandLine.arguments.count > 5 ? modeFromString(mode:CommandLine.arguments[5]) : .palette
let primaryColor: NSColor = CommandLine.arguments.count > 6 ? hexColor(hexString: CommandLine.arguments[6]) : NSColor.black
let secondaryColor: NSColor = CommandLine.arguments.count > 7 ? hexColor(hexString: CommandLine.arguments[7]) : NSColor.white
let ternaryColor: NSColor = CommandLine.arguments.count > 8 ? hexColor(hexString: CommandLine.arguments[8]) : secondaryColor

if let image = NSImage(
  systemSymbolName: iconName, 
  variableValue: iconVariable, 
  accessibilityDescription: "A multiply symbol inside a filled circle"
)  {
    let size = NSSize(width: iconSize, height: iconSize)
    let rect = NSRect(origin: .zero, size: size)


    var config = NSImage.SymbolConfiguration(pointSize: CGFloat(iconSize), weight: iconWeight)

    guard let bitmap = NSBitmapImageRep(bitmapDataPlanes: nil,
                                        pixelsWide: Int(size.width),
                                        pixelsHigh: Int(size.height),
                                        bitsPerSample: 8,
                                        samplesPerPixel: 4,
                                        hasAlpha: true,
                                        isPlanar: false,
                                        colorSpaceName: .calibratedRGB,
                                        bytesPerRow: 0,
                                        bitsPerPixel: 0) else {
        fatalError("Failed to create NSBitmapImageRep")
    }

    bitmap.size = size
    NSGraphicsContext.current = NSGraphicsContext(bitmapImageRep: bitmap)

    var symbolImage = image
    if iconMode == .multicolor {
        config = config.applying(.preferringMulticolor())
    } else if (iconMode == .hierarchical) {
        config = config.applying(.init(hierarchicalColor: primaryColor))
    } else if (iconMode == .monochrome) {
        config = config.applying(.preferringMonochrome())
    } else if (iconMode == .palette) {
        config = config.applying(.init(paletteColors: [primaryColor, secondaryColor, ternaryColor]))
    }

    bitmap.size = size
    NSGraphicsContext.current = NSGraphicsContext(bitmapImageRep: bitmap)


    symbolImage = image.withSymbolConfiguration(config)!
    if iconMode == .monochrome {
        symbolImage = tint(image: symbolImage, color: primaryColor)
    }

    let symbolRect = makeRect(aspectRatio: symbolImage.size, insideRect: rect)
    symbolImage.draw(in: symbolRect)


    if let data = bitmap.representation(using: .png, properties: [:]) {
        let base64String = data.base64EncodedString()
        print("data:image/png;base64,\(base64String)")
    } else {
        print("Unable to convert image data to PNG format.")
        exit(1)
    }
}