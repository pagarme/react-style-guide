<img src="https://cdn.rawgit.com/pagarme/brand/9ec30d3d4a6dd8b799bca1c25f60fb123ad66d5b/logo-circle.svg" width="127px" height="127px" align="left"/>

# React Code Style Guide

The patterns we have been using in our projects

<br>

# Introduction

This guide was created to be a quick start for new developers understand
the React code style we adopted here at Pagar.me and some practices
considered good.

As this guide is an extension of our [JavaScript style guide](js-style-guide)
we higly recommend to read it prior to this document.

# Installing

The rules described in this repository are also available as a NPM package.
To install the package and its dependencies:

```shell
$ npm install --save-dev eslint@4.3.0 \
                         eslint-plugin-jsx-a11y@5.1.1 \
                         eslint-plugin-import@2.7.0 \
                         eslint-plugin-react@7.1.0 \
                         eslint-config-pagarme-react
```

> The peer dependencies specified above have hardcoded versions.
> If you prefer you can use the command
> `npm info eslint-config-pagarme-react@latest peerDependencies`
> to find the exact peer dependencies to install.

To include in the project, create an `.eslintrc` file with at least the
following contents:

```json
{
  "extends": ["pagarme-react"],
  "env": {
    "browser": true
  }
}
```

# Table of contents

- [Component definition](#component-definition)
- [Project organization](#project-organization)
  - [Presentational Components](#components)
  - [Container Components](#containers)
  - [Page Containers](#pages)
- [Formatting CSS](#formatting-css)
  - [80 columns, soft tabs of 2 spaces](#80-columns-soft-tabs-of-2-spaces)
  - [Camel case instead of dash-case for class names](#camel-case-instead-of-dash-case-for-class-names)
  - [Never use ID and tag name as root selectors!](#never-use-id-and-tag-name-as-root-selectors)
  - [When using multiple selectors, give each selector its own line](#when-using-multiple-selectors-give-each-selector-its-own-line)
  - [Break lines in CSS function arguments, keep a dangling comma](#break-lines-in-css-function-arguments-keep-a-dangling-comma)
  - [When writing rules, be sure to](#when-writing-rules-be-sure-to)
- [Design Patterns](#css-design-patterns)
  - [The parent constrains the child](#the-parent-constrains-the-child)
  - [The parent doesn't assume child structure](#the-parent-doesnt-assume-child-structure)
  - [Components never leak margin](#components-never-leak-margin)
  - [The parent spaces the children](#the-parent-spaces-the-children)
  - [Nested classes are useless](#nested-classes-are-useless)
  - [Variables, lots of variables!](#variables-lots-of-variables)

# Component definition

All components (presentation, containers or pages) should **always** be
defined as a directory, named with pascal casing. The main component file
should be `index.js` and main stylesheet `style.css`. E.g.:

```
AwesomeCard/
├── index.js
└── style.css
```

* Styles should always be defined in a separate CSS file
* Avoid prefixing or suffixing component names
  - E.g.: `lib/pages/UserPage` or `lib/container/LoginContainer`

[:arrow_up: Back to top][table-of-contents]

# Project organization

Components should be divided in at least three directories:

```
awesome-react-project/
└── lib/
   ├── components/
   ├── containers/
   └── pages/
```

Each of these directories have special types of components:

### `components/`

Stateless components. Shouldn't store state. Most components in this
directory will be function-based components. Stuff like buttons, inputs,
labels and all presentational components goes here. This components can
also accept functions as props and dispatch events, but no state should
be held inside.

### `containers/`

Container components can store state. Containers are built mostly from
the composition of presentational components with some styles to layout
them together. Containers can also store internal state and access refs
to provide additional logic, but all actions should be accepted as
component callbacks.

### `pages/`

Page components can store state, receive route parameters and dispatch
Redux actions when applicable. Pages are the highest level of application's
components. They represent the application routes and most times are
displayed by a router. Pages are also responsible to handle container
components callbacks and flow data into children containers.

[:arrow_up: Back to top][table-of-contents]

# CSS are modules!

We use CSS modules everywhere. CSS modules are great because they provide
scope to CSS, and allows to create compartmentalized style that doesn't
leak to global scope. Here are our good practices of doing CSS modules:

## Formatting CSS

### 80 columns, soft tabs of 2 spaces

Keep at 80 columns. This helps when opening multiple splits.
Use soft tabs of 2 spaces to save space! :stuck_out_tongue:

### Camel case instead of dash-case for class names

With CSS modules, camel case makes much more sense:

<table>
<thead>
<th colspan="2"><strong>GOOD</strong></th>
</thead>
<thead>
<th><code>lib/components/Input/index.js</code></th>
<th><code>lib/components/Input/style.css</code></th>
</thead>
<tbody>
<tr>
<td>

```js
import style from './style.css'

const Item = ({ children }) =>
  <li className={style.circleBullet}>
    {children}
  </li>

export default Item
```

</td>
<td>

```css
.circleBullet {
  list-style-type: disc;
}
```

</td>
</tr>
</tbody>
</table>

[:arrow_up: Back to top][table-of-contents]

### Never use ID and tag name as root selectors!

Using ID and tag name at the selector's root makes the rule to be applied
globally.

<table>
<thead>
<th colspan="2"><strong>GOOD</strong></th>
</thead>
<thead>
<th><code>lib/components/Item/index.js</code></th>
<th><code>lib/components/Item/style.css</code></th>
</thead>
<tbody>
<tr>
<td>

```js
import style from './style.css'

const Item = ({ title, thumbnail }) =>
  <div className={style.container}>
    <img src={thumbnail} alt={title} />
  </div>

export default Item
```

</td>
<td>

```css
.container > img {
  background-color: #CCCCCC;
}
```

</td>
</tr>
</tbody>
<th colspan="2"><strong>BAD</strong></th>
</thead>
<thead>
<th><code>lib/components/Item/index.js</code></th>
<th><code>lib/components/Item/style.css</code></th>
</thead>
<tbody>
<tr>
<td>

```js
import style from './style.css'

const Item = ({ title, thumbnail }) =>
  <div className={style.container}>
    <img src={thumbnail} alt={title} />
  </div>

export default Item
```

</td>
<td>

```css
img {
  background-color: #CCCCCC;
}
```

</td>
</tr>
</tbody>
</table>

[:arrow_up: Back to top][table-of-contents]

### When using multiple selectors, give each selector its own line

Organize one selector per line, even when placing at the same line doesn't
exceed the limit of 80 columns.

<table>
<thead>
<th><strong>GOOD</strong></th>
<th><strong>BAD</strong></th>
</thead>
<tbody>
<tr>
<td>

```css
.container > img,
.container > div,
.container > section {
  background-color: #CCCCCC;
}
```

</td>
<td>

```css
.container > img, .container > div, .container > section {
  background-color: #CCCCCC;
}
```

</td>
</tr>
</tbody>
</table>

[:arrow_up: Back to top][table-of-contents]

### Break lines in CSS function arguments, keep a dangling comma

With 80 columns and CSS variables comes the need to break lines. When
breaking, keep one argument per line, and leave a dangling comma at the
last argument.

<table>
<thead>
<th><strong>GOOD</strong></th>
<th><strong>BAD</strong></th>
</thead>
<tbody>
<tr>
<td>

```css
.container {
  background-color: linear-gradient(
    0deg,
    var(--color-light-yellow-12),
    var(--color-light-yellow-10),
  );
}
```

</td>
<td>

```css
.container {
  background-color: linear-gradient(0deg, --color-light...
}

.container {
  background-color: linear-gradient(
    0deg, var(--color-light-yellow-12), var(--color-lig...
}
```

</td>
</tr>
</tbody>
</table>

[:arrow_up: Back to top][table-of-contents]

### When writing rules, be sure to

* Put a space before the opening brace `{` in rule declarations
* In properties put a space after (but not before) the `:` character
* Put closing braces `}` of rule declarations on a new line
* Put **ONE** blank line between rule declarations

<table>
<thead>
<th><strong>GOOD</strong></th>
<th><strong>BAD</strong></th>
</thead>
<tbody>
<tr>
<td>

```css
.container {
  font-size: 12pt;
}

.thumbnail {
  width: 160px;
  height: 90px;
}
```

</td>
<td>

```css

.container{
  font-size:12pt;}
.thumbnail{
  width:160px;
  height:90px;}

```

</td>
</tr>
</thead>
<tbody>
</table>

[:arrow_up: Back to top][table-of-contents]

## CSS Design Patterns

### The parent constrains the child

Leaf components shouldn't constrain width or height (unless it makes
sense). That said, most components should default to fill the parent:

<table>
<thead>
<th colspan="2"><strong>GOOD</strong></th>
</thead>
<thead>
<th><code>lib/components/Input/index.js</code></th>
<th><code>lib/components/Input/style.css</code></th>
</thead>
<tbody>
<tr>
<td>

```js
import style from './style.css'

const Input = ({ children }) =>
  <input className={style.input}>
    {children}
  </input>

export default Input
```

</td>
<td>

```css
.input {
  box-sizing: border-box;
  padding: 10px;
  width: 100%;
}
```

</td>
</tr>
</tbody>
</table>

[:arrow_up: Back to top][table-of-contents]

### The parent doesn't assume child structure

Sometimes we don't want to fill the whole width by default. An example is
the button component, which we want to resize itself based on title width.

In this cases, we should allow the parent component to inject styles into
the child component's container. The child is responsible for choosing where
parent styles are injected.

For merging styles, always use [`classnames`][classnames] package. The
rightmost arguments overrides the leftmost ones.

<table>
<thead>
<th colspan="2"><strong>GOOD</strong></th>
</thead>
<thead>
<th><code>lib/components/Button/index.js</code></th>
<th><code>lib/components/Button/style.css</code></th>
</thead>
<tbody>
<tr>
<td>

```js
import classNames from 'classnames'
import style from './style.css'

const Button = ({ children, className }) =>
  <button className={classNames(style.button, className)}>
    {children}
  </button>

export default Button
```

</td>
<td>

```css
.button {
  box-sizing: border-box;
  padding: 10px;
  width: 100%;
}
```

</td>
</tr>
</tbody>
</table>

[:arrow_up: Back to top][table-of-contents]

### Components never leak margin

All components are self-contained and their final size should never suffer
margin leakage! This allows the components to be much more reusable!

<table>
<thead>
  <th><strong>BAD</strong></th>
  <th><strong>GOOD</strong></th>
</thead>
<tbody>
<tr>
<td>

```
|--|-content size-|--| margin
 ____________________
|   ______________   | | margin
|  |              |  |
|  |              |  |
|  |              |  |
|  |______________|  |
|____________________| | margin

|---container size---|
```

</td>

<td>

```

   |-content size-|
    ______________
   |              |
   |              |
   |              |
   |______________|



```

</td>
</tr>
</tbody>
</table>

[:arrow_up: Back to top][table-of-contents]

### The parent spaces the children

When building lists or grids:

* Build list/grid items as separate components
* Use the the list/grid container to space children
* To space them horizontally, use `margin-left`
* To space them vertically, use `margin-top`
* Select the `first-child` to reset margins

<table>
<thead>
<th colspan="2"><strong>GOOD</strong></th>
</thead>
<thead>
<th><code>lib/containers/Reviews/index.js</code></th>
<th><code>lib/containers/Reviews/style.css</code></th>
</thead>
<tbody>
<tr>
<td>

```js
import style from './style.css'

const Reviews = ({ items }) =>
  <div className={style.container}>
    {items.map(item =>
      <img src={item.image} alt={item.title} />
    )}
  </button>

export default Reviews
```

</td>
<td>

```css
.container > img {
  margin-left: 10px;
}

.container > img:first-child {
  margin-left: unset;
}
```

</td>
</tr>
</tbody>
</table>

[:arrow_up: Back to top][table-of-contents]

### Nested classes are useless

CSS modules already provides us scope. We don't need to use nested classes.

<table>
<thead>
<th colspan="2"><strong>BAD</strong></th>
</thead>
<thead>
<th><code>lib/components/Button/index.js</code></th>
<th><code>lib/components/Button/style.css</code></th>
</thead>
<tbody>
<tr>
<td>

```js
import style from './style.css'

const Button = ({ children }) =>
  <button className={style.button}>
    <img className={style.icon} />
    {children}
  </button>

export default Button
```

</td>
<td>

```css
.button {
  box-sizing: border-box;
  padding: 10px;
  width: 100%;
}

.button .icon {
  width: 22px;
  height: 22px;
}
```

</td>
</tr>
</tbody>
<thead>
<th colspan="2"><strong>GOOD</strong></th>
</thead>
<tbody>
<thead>
<th><code>lib/components/Button/index.js</code></th>
<th><code>lib/components/Button/style.css</code></th>
</thead>
<tbody>
<tr>
<td>

```js
import style from './style.css'

const Button = ({ children }) =>
  <button className={style.button}>
    <img className={style.icon} />
    {children}
  </button>

export default Button
```

</td>
<td>

```css
.button {
  box-sizing: border-box;
  padding: 10px;
  width: 100%;
}

.icon {
  width: 22px;
  height: 22px;
}
```

</td>
</tr>
</tbody>
</table>

[:arrow_up: Back to top][table-of-contents]

### Variables, lots of variables!

We encourage the "variabilification". Always define variables to increase
reuse and make styles more consistent. The CSS specification defines a way
to declare native variables that are very interesting. We adopted them as
the standard.

To define a variable accessible globally:

<table>
<thead>
<th colspan="2"><strong>GOOD</strong></th>
</thead>
<thead>
<th><code>app/App/variables.css</code></th>
<th><code>app/components/Button/styles.css</code></th>
</thead>
<tbody>
<tr>
<td>

```css
:root {
  --color-green-1: #6CCFAE;
  --color-green-2: #6B66B5;
  --color-green-3: #AAC257;
  --color-green-4: #68B5C1;
}
```

</td>
<td>

```css
.container {
  background-color: linear-gradient(
    0deg,
    var(--color-green-1),
    var(--color-green-2),
  );
}
```

</td>
</tr>
</tbody>
</table>

[:arrow_up: Back to top][table-of-contents]

---

[table-of-contents]: #table-of-contents
[classnames]: https://www.npmjs.com/package/classnames
[js-style-guide]: https://github.com/pagarme/javascript-style-guide

