# Coding conventions

## Typescript

The following is mostly a copy from [here](https://www.itwinjs.org/learning/guidelines/typescript-coding-guidelines/) but adapted to my tastes.

### Names

- Use PascalCase for type names
- Do not use I as a prefix for interface names
- Use PascalCase for enum values
- Use camelCase for function names
- Use camelCase for property names and local variables
- Use \_ as a prefix for private properties
- Use whole words in names when possible. Only use abbreviations where their use is common and obvious.
- We use `Id`, `3d`, `2d` rather than capital D.

### Files

- Use the .ts file extension for TypeScript files
- TypeScript file names should be PascalCase

### Types

- Do not export types/functions unless you need to share it across multiple components
- Do not introduce new types/values to the global namespace
- Within a file, type definitions should come first
- Do not use `null`. Use `undefined`. Do not use `null` except where external libraries require it.

### `===` and `!==` Operators

- Use `===` and `!==` operators whenever possible.
- The `==` and `!=` operators do type coercion, which is both inefficient and can lead to unexpected behavior.

### Strings

Use single quotes for strings

### General Constructs

- Do not use semicolons. JavaScript does not require a semicolon when it thinks it can safely infer its existence
- Use curly braces `{}` instead of `new Object()`
- Use brackets `[]` instead of `new Array()`
- Make judicious use of vertical screen space
- Programmer monitors are almost always wider than they are tall. It is common for widths to be at least 120 columns but heights to be less than 100. Therefore to make the greatest use of screen real estate, it is desireable to preserve vertical screen space wherever possible.
- On the other hand, vertical whitespace can contribute significantly to code readability by making the logical structure clearer. The following guidelines are intended to strike a balance between readability and code density.
- Some codebases advocate breaking lines at 80 columns. With current screen sizes, this is silly and wasteful. Don't break lines before 120 columns
- Don't use blank lines unnecessarily. For example the first line of a function not should be a blank line
- There should never be more than one blank line in a row
- Don't put each import in an import statement on a separate line. If you use Visual Studio Code as your editor, use the TypeScript Import Sorter extension with its default settings to automatically format import statements.

## CSS

The following is mostly an adapted copy from [here](https://www.freecodecamp.org/news/css-naming-conventions-that-will-save-you-hours-of-debugging-35cea737d849/).

### Class Names

- Be consistent with the CSS property names, don't use `javascriptConventions`
- Don't use the javascript camelCase, instead use `kebab-case` (use hyphens to separate words)
- Use BEM whenever possible (see below)

### The BEM Naming Convention

Generally, there are 3 problems that CSS naming conventions try to solve:

- To know what a selector does, just by looking at its name
- To have an idea of where a selector can be used, just by looking at it
- To know the relationships between class names, just by looking at them

BEM attempts to divide the overall user interface into small reusable components.

```css
Block__Element--modifier {
  border: 1px solid red;
}
```

#### Example

1. Imagine that you have a stick man. The main class (the "block") will be `.stick-man`
2. Each part (the "elements") of the stick man could be styled further, so for example you could target the `head`, `arms` or `legs` with the following CSS classes: `.stick-man__head`, `.stick-man__arms`, `.stick-man__feet`
3. What if the stick man was modified and we could have a blue or a red stick man? Modifier class names are derived by adding two hyphens like so: `.stick-man--blue`, `.stick-man--red`,
4. What if we had stick-men of different `head` sizes? The `.stick-man` represents the Block , `.stick-man__head` the element. So we would use something like `.stick-man__head--small`, `.stick-man__head--medium` and so on...

That’s basically how the BEM naming convention works.
