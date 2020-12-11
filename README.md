Modified repro with fix from @Billy- 's apollo-client-test
https://github.com/Billy-/apollo-client-test/blob/master/webpack.config.js


Issue Repro for @apollo/client with TypeScript and Webpack

```
git clone git@github.com:Billy-/apollo-client-test.git
npm i
npm run dev
```

Main issue:

0. The client crashes due to `React` being undefined at https://github.com/apollographql/apollo-client/blob/d470c964db46728d8a5dfc63990859c550fa1656/src/react/context/ApolloContext.ts#L32
    - Only thing I could find about this: https://spectrum.chat/apollo/react-apollo/error-when-integrating-with-existing-project~9ff0b660-6ed5-41a4-9e02-307019cc8e67

I noticed that in the webpack output all the React imports inside `@apollo/client` are importing from `@apollo/client/react/index.js` for some reason:

<details>
<summary>Webpacked output for ApolloContext</summary>

```js

/***/ "../node_modules/@apollo/client/react/context/ApolloContext.js":
/*!*********************************************************************!*\
  !*** ../node_modules/@apollo/client/react/context/ApolloContext.js ***!
  \*********************************************************************/
/*! exports provided: getApolloContext, resetApolloContext */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getApolloContext", function() { return getApolloContext; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "resetApolloContext", function() { return resetApolloContext; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/@apollo/client/react/index.js");


var contextSymbol = typeof Symbol === 'function' && Symbol.for ?
    Symbol.for('__APOLLO_CONTEXT__') :
    '__APOLLO_CONTEXT__';
function resetApolloContext() {
    Object.defineProperty(react__WEBPACK_IMPORTED_MODULE_0__["default"], contextSymbol, {
        value: react__WEBPACK_IMPORTED_MODULE_0__["default"].createContext({}),
        enumerable: false,
        configurable: true,
        writable: false,
    });
}
function getApolloContext() {
    if (!react__WEBPACK_IMPORTED_MODULE_0__["default"][contextSymbol]) {
        resetApolloContext();
    }
    return react__WEBPACK_IMPORTED_MODULE_0__["default"][contextSymbol];
}




/***/ }),
```
</details>
