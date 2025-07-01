SASS
========

SASS (Syntactically Awesome Stylesheets) is a CSS preprocessor. It lets you write cleaner, more powerful CSS with features like:

- Variables
- Nesting
- Partials
- Mixins
- Functions
- Inheritance (via @extend)
- Operators

# Install sass
```bash
# Install sass
npm install -D sass

# Compile SASS to CSS
npx sass styles.scss styles.css --watch
```

# Variables 
```scss
$primary-color: #3490dc;
$padding: 1rem;

.button {
  background-color: $primary-color;
  padding: $padding;
}
```
# Nesting
```scss
.navbar {
  background: #fff;

  ul {
    list-style: none;

    li {
      display: inline-block;

      a {
        color: blue;
      }
    }
  }
}
```
# Partials and Imports
```scss
// _variables.scss
$color: red;

// main.scss
@import "variables"; // no need for underscore or .scss
```
In newer Sass, prefer @use instead of @import for better scoping.

# Mixins
Reusable chunks of code
```scss
@mixin center-flex {
  display: flex;
  justify-content: center;
  align-items: center;
}

.box {
  @include center-flex;
}
```
# Estending Styles 
Share base styles.
```scss
%button-base {
  padding: 10px;
  border-radius: 5px;
}

.btn {
  @extend %button-base;
  background: blue;
}
```
# Math & Operations
```scss
.container {
  width: 100% / 3;
}

.box {
  margin: $padding * 2;
}
```
# Example
```scss
$color-primary: #4caf50;

.card {
  border: 1px solid $color-primary;
  padding: 1rem;

  &:hover {
    background-color: lighten($color-primary, 20%);
  }
}
```

Tools
========
- https://sass-lang.com/
- VSCode extension: Live Sass Compiler