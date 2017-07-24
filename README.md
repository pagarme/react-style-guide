<img src="https://cdn.rawgit.com/pagarme/brand/9ec30d3d4a6dd8b799bca1c25f60fb123ad66d5b/logo-circle.svg" width="127px" height="127px" align="left"/>

# React Code Style Guide

The patterns we have been using in our projects

<br>

# Introduction

This guide was created to be a quick start for new developers understand
the React code style we adopted here at Pagar.me and some practices
considered good.

# Project organization

Components should be divided in, at least, three directories:

```
awesome-react-project/
└── lib/
   ├── components/
   ├── containers/
   └── pages/
```

Each of these directories have special types of components:

### `components/`

Stateless components, shouldn't store state. Most components in this
directory will be function-based components. Stuff like buttons, inputs,
labels and all presentational components goes here. This components can
also accept functions as props and dispatch events, but no state should
be held inside.

### `containers/`

Container components, can store state. Containers are built mostly from
the composition of presentational components with some styles to layout
them together. Containers can also store internal state and access refs
to provide additional logic, but all top-level actions should be accepted
as component callbacks.

### `pages/`

Page components, can store state and dispatch actions. Pages are the
highest level of components from the application. They represent the
application routes and most times are displayed by a router. Pages are
also responsible to handle container components callbacks and flow data
into children containers.

# Component definition

All components (presentation, containers or pages) should **always** be
defined as a directory, named with pascal casing. E.g.:

```
SomeAwesomeComponent/
├── index.js
└── style.css
```

* Styles should always be defined in a separate CSS file
* Avoid prefixing or suffixing component names
  - E.g.: `lib/pages/UserPage` or `lib/container/LoginContainer`

# CSS are modules!

We use CSS modules everywhere. CSS modules are great because they provide
scope to CSS, and allows to create compartmentalized style that doesn't
leak to global scope. Here are our good practices of doing CSS modules:

## The parent constrains the child

Leaf components shouldn't constrain width or height (unless it makes
sense). Most components should fill the parent:

<table>
  <thead>
    <th><code>lib/components/Button/index.js</th>
    <th><code>lib/components/Button/style.css</th>
  </thead>
  <tbody>
    <tr>
      <td>
        <pre lang="jsx">
import style from './style.css'
<br />

const Button = ({ children }) =>
&nbsp;&nbsp;&lt;button className={style.button}&gt;
&nbsp;&nbsp;&nbsp;&nbsp;{children}
&nbsp;&nbsp;&lt;/button&gt;
<br />
export default Button
        </pre>
      </td>
      <td>
        <pre lang="css">
.button {
&nbsp;&nbsp;box-sizing: border-box;
&nbsp;&nbsp;padding: 10px;
&nbsp;&nbsp;width: 100%;
}
        </pre>
      </td>
    </tr>
  </tbody>
</table>


## Don't use nested classes

With CSS modules we don't have to use nested classes.

<table>
  <thead>
    <th colspan="2">
      <span style="color:red;">
        DON'T do this way
      </span>
    </th>
  </thead>
  <thead>
    <th><code>lib/components/Button/index.js</th>
    <th><code>lib/components/Button/style.css</th>
  </thead>
  <tbody>
    <tr>
      <td>
        <pre lang="jsx">
import style from './style.css'
<br />

const Button = ({ icon, children }) =>
&nbsp;&nbsp;&lt;button className={style.button}&gt;
&nbsp;&nbsp;&nbsp;&nbsp;<img src={icon} alt={children} />
&nbsp;&nbsp;&nbsp;&nbsp;{children}
&nbsp;&nbsp;&lt;/button&gt;
<br />
export default Button
        </pre>
      </td>
      <td>
        <pre lang="css">
.button {
&nbsp;&nbsp;box-sizing: border-box;
&nbsp;&nbsp;padding: 10px;
&nbsp;&nbsp;width: 100%;
}
        </pre>
      </td>
    </tr>
  </tbody>
  <thead>
    <th><code>lib/components/Button/index.js</th>
    <th><code>lib/components/Button/style.css</th>
  </thead>
</table>
