CSS
========

CSS stands for Cascading Style Sheets
It controls how HTML elements look: their colors, fonts, sizes, layouts. etc.

Basic example
===
index.html
```html
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <h1>Hello CSS</h1>
  <p class="intro">This is my first styled page!</p>
  <div id="box">I’m in a box!</div>
</body>
</html>
```
styles.css
```css
body {
  background: #f4f4f4;
  font-family: sans-serif;
}

h1 {
  color: darkblue;
}

.intro {
  color: green;
  font-size: 18px;
}

#box {
  background: white;
  border: 1px solid #ccc;
  padding: 20px;
  margin-top: 10px;
}
```

Common selector examples
===
| Selector  | Selects                                        |
| --------- | ---------------------------------------------- |
| `p`       | All `<p>` tags                                 |
| `.box`    | All elements with class="box"                  |
| `#main`   | The element with id="main"                     |
| `div > p` | `<p>` tags that are direct children of `<div>` |

Common properties
===
| Property           | Description           | Example                    |
| ------------------ | --------------------- | -------------------------- |
| `color`            | Text color            | `color: red;`              |
| `background`       | Background color      | `background: #eee;`        |
| `font-size`        | Size of text          | `font-size: 16px;`         |
| `font-family`      | Font style            | `font-family: Arial;`      |
| `padding`          | Inside space          | `padding: 10px;`           |
| `margin`           | Outside space         | `margin: 20px;`            |
| `border`           | Border of the element | `border: 1px solid black;` |
| `width` / `height` | Size of box           | `width: 200px;`            |

Responsive Design
===
styles.css
```css
@media (max-width: 600px) {
  body {
    background: lightgray;
  }

  #box {
    font-size: 14px;
  }
}
```
Box Model
===
```
+-------------------------------+
|         margin                |  ← Margin
|  +------------------------+   |
|  |      border            |  |  ← Border
|  |  +------------------+  |  |
|  |  |   padding         |  |  |  ← Padding
|  |  |  +------------+   |  |  |
|  |  |  |  content    |   |  |  |  ← Content (text, image, etc.)
|  |  |  +------------+   |  |  |
|  |  +------------------+  |  |
|  +------------------------+  |
+-------------------------------+
````

Example
Total width = content width + padding + border + margin
= 200 + (10*2) + (5*2) + (20*2) = 270px (from outside edge to outside edge)
```css
.box {
  width: 200px;
  padding: 10px;
  border: 5px solid black;
  margin: 20px;
}
Tip: You can use box-sizing: border-box; to include padding & border inside the width. 
```css
.box {
  box-sizing: border-box;
}
```
Positioning
===
| `position` Type | Relative To                 | Takes Up Space? | Scrolls With Page?    | Use Case / Description                                                                |
| --------------- | --------------------------- | --------------- | --------------------- | ------------------------------------------------------------------------------------- |
| `static`        | Normal document flow        | ✅ Yes           | ✅ Yes                 | Default. Elements are placed as they appear in the HTML.                              |
| `relative`      | Its original position       | ✅ Yes           | ✅ Yes                 | Moves element relative to where it normally would be.                                 |
| `absolute`      | Nearest positioned ancestor | ❌ No            | ✅ Yes                 | Removed from flow. Positioned exactly where you want it inside its container.         |
| `fixed`         | Browser viewport            | ❌ No            | ❌ No (stays in place) | Useful for sticky headers, navbars, floating action buttons.                          |
| `sticky`        | Nearest scrollable ancestor | ✅ Yes           | ➖ Depends (sticks)    | Scrolls until a certain point, then becomes fixed. Great for headers while scrolling. |

Example use cases:

| Position   | Example Scenario                                |
| ---------- | ----------------------------------------------- |
| `static`   | Default for paragraphs, divs, etc.              |
| `relative` | Slightly shift an icon inside a button          |
| `absolute` | Tooltip on hover, dropdown menus                |
| `fixed`    | Chat button fixed at bottom-right of screen     |
| `sticky`   | Table headers that stay visible while scrolling |

Look the css
```css
div {
  position: static;
}
```

Flexbox
====
Flexbox (Flexible Box Layout) is a layout model that makes it easy to design flexible and responsive layout structures without using floats or positioning.

# Flex container properties
| Property          | What it does                                |
| ----------------- | ------------------------------------------- |
| `flex-direction`  | Sets the direction of the main axis         |
| `justify-content` | Aligns items along the main axis            |
| `align-items`     | Aligns items along the cross axis           |
| `align-content`   | Aligns multiple rows of items (if wrapping) |
| `flex-wrap`       | Controls whether items wrap to next line    |

## 1 flex-direction
| Value            | Description             |
| ---------------- | ----------------------- |
| `row`            | (default) Left to right |
| `row-reverse`    | Right to left           |
| `column`         | Top to bottom           |
| `column-reverse` | Bottom to top           |

```css
.container {
  flex-direction: row;
}
```

## 2 justify-content
Aligns items horizontally (main axis)

| Value           | Description                   |
| --------------- | ----------------------------- |
| `flex-start`    | Start of the container        |
| `flex-end`      | End of the container          |
| `center`        | Centered                      |
| `space-between` | Equal space between           |
| `space-around`  | Equal space around            |
| `space-evenly`  | Even space between and around |

```css
.container {
  justify-content: center;
}
```

## 3 align-items
Aligns items vertically(cross axis)
| Value        | Description                               |
| ------------ | ----------------------------------------- |
| `stretch`    | (default) Items stretch to fill container |
| `flex-start` | Aligned to start of cross axis            |
| `flex-end`   | Aligned to end of cross axis              |
| `center`     | Centered                                  |
| `baseline`   | Aligned by text baseline                  |

```css
.container {
  align-items: center;
}
```

## 4 flex-wrap
Allows items to wrap to the next line
| Value          | Description            |
| -------------- | ---------------------- |
| `nowrap`       | (default) No wrapping  |
| `wrap`         | Wraps to next line     |
| `wrap-reverse` | Wraps in reverse order |

```css
.container {
  flex-wrap: wrap;
}
```

## Flex item properties
| Property      | What it does                             |
| ------------- | ---------------------------------------- |
| `flex-grow`   | Grow to fill space                       |
| `flex-shrink` | Shrink to fit space                      |
| `flex-basis`  | Initial size before growing/shrinking    |
| `flex`        | Shorthand for grow, shrink, basis        |
| `align-self`  | Override `align-items` for a single item |
| `order`       | Changes the visual order of items        |

# Basic Example.

index.html
```html
<div class="container">
  <div class="item">1</div>
  <div class="item">2</div>
  <div class="item">3</div>
</div>
```

styles.css
```css
.container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
}

.item {
  flex: 1;
  padding: 10px;
  background: lightblue;
  margin: 5px;
}
```

# Flex 1 1 0
```html
<div class="flex-container">
  <div class="box">A</div>
  <div class="box">B</div>
  <div class="box">C</div>
</div>
```

```css
.flex-container {
  display: flex;
  width: 600px;
}

.box {
  flex: 1 1 0;
  padding: 10px;
  border: 1px solid black;
  text-align: center;
}
```

