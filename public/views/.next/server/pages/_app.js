/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/_app";
exports.ids = ["pages/_app"];
exports.modules = {

/***/ "./pages/_app.js":
/*!***********************!*\
  !*** ./pages/_app.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ MyApp)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_font_google_target_css_path_pages_app_js_import_Poppins_arguments_weight_300_400_500_600_700_800_subsets_latin_display_swap_variableName_poppins___WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! next/font/google/target.css?{\"path\":\"pages\\\\_app.js\",\"import\":\"Poppins\",\"arguments\":[{\"weight\":[\"300\",\"400\",\"500\",\"600\",\"700\",\"800\"],\"subsets\":[\"latin\"],\"display\":\"swap\"}],\"variableName\":\"poppins\"} */ \"./node_modules/next/font/google/target.css?{\\\"path\\\":\\\"pages\\\\\\\\_app.js\\\",\\\"import\\\":\\\"Poppins\\\",\\\"arguments\\\":[{\\\"weight\\\":[\\\"300\\\",\\\"400\\\",\\\"500\\\",\\\"600\\\",\\\"700\\\",\\\"800\\\"],\\\"subsets\\\":[\\\"latin\\\"],\\\"display\\\":\\\"swap\\\"}],\\\"variableName\\\":\\\"poppins\\\"}\");\n/* harmony import */ var next_font_google_target_css_path_pages_app_js_import_Poppins_arguments_weight_300_400_500_600_700_800_subsets_latin_display_swap_variableName_poppins___WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(next_font_google_target_css_path_pages_app_js_import_Poppins_arguments_weight_300_400_500_600_700_800_subsets_latin_display_swap_variableName_poppins___WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _app_globals_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/app/globals.css */ \"./src/app/globals.css\");\n/* harmony import */ var _app_globals_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_app_globals_css__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/head */ \"next/head\");\n/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_head__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var next_script__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! next/script */ \"./node_modules/next/script.js\");\n/* harmony import */ var next_script__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_script__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_4__);\n\n\n // Import your global styles\n\n\n\nfunction MyApp({ Component, pageProps }) {\n    var settings = pageProps.upcoming == undefined || pageProps == undefined ? null : pageProps.upcoming.settings;\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        className: (next_font_google_target_css_path_pages_app_js_import_Poppins_arguments_weight_300_400_500_600_700_800_subsets_latin_display_swap_variableName_poppins___WEBPACK_IMPORTED_MODULE_5___default().className),\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Component, {\n                ...pageProps\n            }, void 0, false, {\n                fileName: \"D:\\\\codedtag.com\\\\public\\\\views\\\\pages\\\\_app.js\",\n                lineNumber: 19,\n                columnNumber: 9\n            }, this),\n            // Google Analytics \n            settings != null && settings.google_analytics.enabled && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((next_script__WEBPACK_IMPORTED_MODULE_3___default()), {\n                        src: `https://www.googletagmanager.com/gtag/js?id=${settings.google_analytics.field}`,\n                        strategy: \"lazyOnload\",\n                        crossOrigin: \"anonymous\"\n                    }, void 0, false, {\n                        fileName: \"D:\\\\codedtag.com\\\\public\\\\views\\\\pages\\\\_app.js\",\n                        lineNumber: 26,\n                        columnNumber: 15\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((next_script__WEBPACK_IMPORTED_MODULE_3___default()), {\n                        id: \"google-analytics-init\",\n                        strategy: \"lazyOnload\",\n                        dangerouslySetInnerHTML: {\n                            __html: `\r\n                    window.dataLayer = window.dataLayer || [];\r\n                    function gtag(){dataLayer.push(arguments);}\r\n                    gtag('js', new Date());\r\n                    gtag('config', '${settings.google_analytics.field}');\r\n                  `\n                        }\n                    }, void 0, false, {\n                        fileName: \"D:\\\\codedtag.com\\\\public\\\\views\\\\pages\\\\_app.js\",\n                        lineNumber: 32,\n                        columnNumber: 15\n                    }, this)\n                ]\n            }, void 0, true),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((next_head__WEBPACK_IMPORTED_MODULE_2___default()), {\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"link\", {\n                        rel: \"manifest\",\n                        href: \"/icons/manifest.json\"\n                    }, void 0, false, {\n                        fileName: \"D:\\\\codedtag.com\\\\public\\\\views\\\\pages\\\\_app.js\",\n                        lineNumber: 49,\n                        columnNumber: 13\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"meta\", {\n                        name: \"theme-color\",\n                        content: \"#000000\"\n                    }, void 0, false, {\n                        fileName: \"D:\\\\codedtag.com\\\\public\\\\views\\\\pages\\\\_app.js\",\n                        lineNumber: 50,\n                        columnNumber: 13\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"link\", {\n                        rel: \"icon\",\n                        href: \"/icons/favicon.ico\"\n                    }, void 0, false, {\n                        fileName: \"D:\\\\codedtag.com\\\\public\\\\views\\\\pages\\\\_app.js\",\n                        lineNumber: 51,\n                        columnNumber: 13\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"link\", {\n                        rel: \"apple-touch-icon\",\n                        href: \"/icons/logo192.png\"\n                    }, void 0, false, {\n                        fileName: \"D:\\\\codedtag.com\\\\public\\\\views\\\\pages\\\\_app.js\",\n                        lineNumber: 52,\n                        columnNumber: 13\n                    }, this),\n                    settings != null && settings.google_ads.enabled && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"script\", {\n                        async: true,\n                        id: \"adsbygoogle-script-tag\",\n                        src: `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${settings.google_ads.field}`,\n                        crossOrigin: \"anonymous\"\n                    }, void 0, false, {\n                        fileName: \"D:\\\\codedtag.com\\\\public\\\\views\\\\pages\\\\_app.js\",\n                        lineNumber: 56,\n                        columnNumber: 17\n                    }, this)\n                ]\n            }, void 0, true, {\n                fileName: \"D:\\\\codedtag.com\\\\public\\\\views\\\\pages\\\\_app.js\",\n                lineNumber: 48,\n                columnNumber: 9\n            }, this)\n        ]\n    }, void 0, true, {\n        fileName: \"D:\\\\codedtag.com\\\\public\\\\views\\\\pages\\\\_app.js\",\n        lineNumber: 18,\n        columnNumber: 5\n    }, this);\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWdlcy9fYXBwLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBS01BO0FBSnFCLENBQUMsNEJBQTRCO0FBQzNCO0FBQ0k7QUFDVztBQU83QixTQUFTSyxNQUFNLEVBQUVDLFNBQVMsRUFBRUMsU0FBUyxFQUFFO0lBR3BELElBQUlDLFdBQVcsVUFBV0MsUUFBUSxJQUFJQyxhQUFhSCxhQUFhRyxZQUFhLE9BQU1ILFVBQVVFLFFBQVEsQ0FBQ0QsUUFBUTtJQUU5RyxxQkFDRSw4REFBQ0c7UUFBSUMsV0FBV1oseU1BQWlCOzswQkFDN0IsOERBQUNNO2dCQUFXLEdBQUdDLFNBQVM7Ozs7OztZQUl0QixvQkFBb0I7WUFDbkJDLFlBQVksUUFBUUEsU0FBU0ssZ0JBQWdCLENBQUNDLE9BQU8sa0JBQ3BEOztrQ0FDRSw4REFBQ1osb0RBQU1BO3dCQUNMYSxLQUFLLENBQUMsNENBQTRDLEVBQUVQLFNBQVNLLGdCQUFnQixDQUFDRyxLQUFLLENBQUMsQ0FBQzt3QkFDckZDLFVBQVM7d0JBQ1RDLGFBQVk7Ozs7OztrQ0FHZCw4REFBQ2hCLG9EQUFNQTt3QkFDTGlCLElBQUc7d0JBQ0hGLFVBQVM7d0JBQ1RHLHlCQUF5Qjs0QkFDdkJDLFFBQVEsQ0FBQzs7OztvQ0FJUyxFQUFFYixTQUFTSyxnQkFBZ0IsQ0FBQ0csS0FBSyxDQUFDO2tCQUNwRCxDQUFDO3dCQUNIOzs7Ozs7OzswQkFNUiw4REFBQ2Ysa0RBQUlBOztrQ0FDRCw4REFBQ3FCO3dCQUFLQyxLQUFJO3dCQUFXQyxNQUFLOzs7Ozs7a0NBQzFCLDhEQUFDQzt3QkFBS0MsTUFBSzt3QkFBY0MsU0FBUTs7Ozs7O2tDQUNqQyw4REFBQ0w7d0JBQUtDLEtBQUk7d0JBQU9DLE1BQUs7Ozs7OztrQ0FDdEIsOERBQUNGO3dCQUFLQyxLQUFJO3dCQUFtQkMsTUFBSzs7Ozs7O29CQUc5QmhCLFlBQVksUUFBUUEsU0FBU29CLFVBQVUsQ0FBQ2QsT0FBTyxrQkFDL0MsOERBQUNlO3dCQUNDQyxLQUFLO3dCQUNMWCxJQUFHO3dCQUNISixLQUFLLENBQUMsc0VBQXNFLEVBQUVQLFNBQVNvQixVQUFVLENBQUNaLEtBQUssQ0FBQyxDQUFDO3dCQUN6R0UsYUFBWTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBUTlCIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbWFpbi8uL3BhZ2VzL19hcHAuanM/ZTBhZCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQb3BwaW5zIH0gZnJvbSAnbmV4dC9mb250L2dvb2dsZSc7XHJcbmltcG9ydCBcIkAvYXBwL2dsb2JhbHMuY3NzXCI7IC8vIEltcG9ydCB5b3VyIGdsb2JhbCBzdHlsZXNcclxuaW1wb3J0IEhlYWQgZnJvbSAnbmV4dC9oZWFkJztcclxuaW1wb3J0IFNjcmlwdCBmcm9tICduZXh0L3NjcmlwdCc7XHJcbmltcG9ydCB7IHVzZUVmZmVjdCwgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCc7XHJcbmNvbnN0IHBvcHBpbnMgPSBQb3BwaW5zKHtcclxuICB3ZWlnaHQ6IFsnMzAwJywgJzQwMCcsICc1MDAnLCAnNjAwJywgJzcwMCcsICc4MDAnXSxcclxuICBzdWJzZXRzOiBbJ2xhdGluJ10sXHJcbiAgZGlzcGxheTogJ3N3YXAnLFxyXG59KTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIE15QXBwKHsgQ29tcG9uZW50LCBwYWdlUHJvcHMgfSkge1xyXG4gICBcclxuICBcclxuICB2YXIgc2V0dGluZ3MgPSAocGFnZVByb3BzLnVwY29taW5nID09IHVuZGVmaW5lZCB8fCBwYWdlUHJvcHMgPT0gdW5kZWZpbmVkKSA/IG51bGw6IHBhZ2VQcm9wcy51cGNvbWluZy5zZXR0aW5nczsgXHJcbiAgXHJcbiAgcmV0dXJuIChcclxuICAgIDxkaXYgY2xhc3NOYW1lPXtwb3BwaW5zLmNsYXNzTmFtZX0+XHJcbiAgICAgICAgPENvbXBvbmVudCB7Li4ucGFnZVByb3BzfSAvPlxyXG4gICAgICAgIFxyXG5cclxuICAgICAgICB7XHJcbiAgICAgICAgICAvLyBHb29nbGUgQW5hbHl0aWNzIFxyXG4gICAgICAgICAgKHNldHRpbmdzICE9IG51bGwgJiYgc2V0dGluZ3MuZ29vZ2xlX2FuYWx5dGljcy5lbmFibGVkKSAmJiAoXHJcbiAgICAgICAgICAgIDw+XHJcbiAgICAgICAgICAgICAgPFNjcmlwdFxyXG4gICAgICAgICAgICAgICAgc3JjPXtgaHR0cHM6Ly93d3cuZ29vZ2xldGFnbWFuYWdlci5jb20vZ3RhZy9qcz9pZD0ke3NldHRpbmdzLmdvb2dsZV9hbmFseXRpY3MuZmllbGR9YH1cclxuICAgICAgICAgICAgICAgIHN0cmF0ZWd5PVwibGF6eU9ubG9hZFwiXHJcbiAgICAgICAgICAgICAgICBjcm9zc09yaWdpbj1cImFub255bW91c1wiIFxyXG4gICAgICAgICAgICAgIC8+XHJcblxyXG4gICAgICAgICAgICAgIDxTY3JpcHRcclxuICAgICAgICAgICAgICAgIGlkPVwiZ29vZ2xlLWFuYWx5dGljcy1pbml0XCJcclxuICAgICAgICAgICAgICAgIHN0cmF0ZWd5PVwibGF6eU9ubG9hZFwiXHJcbiAgICAgICAgICAgICAgICBkYW5nZXJvdXNseVNldElubmVySFRNTD17e1xyXG4gICAgICAgICAgICAgICAgICBfX2h0bWw6IGBcclxuICAgICAgICAgICAgICAgICAgICB3aW5kb3cuZGF0YUxheWVyID0gd2luZG93LmRhdGFMYXllciB8fCBbXTtcclxuICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbiBndGFnKCl7ZGF0YUxheWVyLnB1c2goYXJndW1lbnRzKTt9XHJcbiAgICAgICAgICAgICAgICAgICAgZ3RhZygnanMnLCBuZXcgRGF0ZSgpKTtcclxuICAgICAgICAgICAgICAgICAgICBndGFnKCdjb25maWcnLCAnJHtzZXR0aW5ncy5nb29nbGVfYW5hbHl0aWNzLmZpZWxkfScpO1xyXG4gICAgICAgICAgICAgICAgICBgLFxyXG4gICAgICAgICAgICAgICAgfX1cclxuICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICA8Lz5cclxuICAgICAgICAgIClcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgPEhlYWQ+XHJcbiAgICAgICAgICAgIDxsaW5rIHJlbD1cIm1hbmlmZXN0XCIgaHJlZj1cIi9pY29ucy9tYW5pZmVzdC5qc29uXCIgLz5cclxuICAgICAgICAgICAgPG1ldGEgbmFtZT1cInRoZW1lLWNvbG9yXCIgY29udGVudD1cIiMwMDAwMDBcIiAvPlxyXG4gICAgICAgICAgICA8bGluayByZWw9XCJpY29uXCIgaHJlZj1cIi9pY29ucy9mYXZpY29uLmljb1wiIC8+XHJcbiAgICAgICAgICAgIDxsaW5rIHJlbD1cImFwcGxlLXRvdWNoLWljb25cIiBocmVmPVwiL2ljb25zL2xvZ28xOTIucG5nXCIgLz4gXHJcblxyXG4gICAgICAgICAgICB7IFxyXG4gICAgICAgICAgICAgICggc2V0dGluZ3MgIT0gbnVsbCAmJiBzZXR0aW5ncy5nb29nbGVfYWRzLmVuYWJsZWQgKSAmJiAoXHJcbiAgICAgICAgICAgICAgICA8c2NyaXB0XHJcbiAgICAgICAgICAgICAgICAgIGFzeW5jXHJcbiAgICAgICAgICAgICAgICAgIGlkPVwiYWRzYnlnb29nbGUtc2NyaXB0LXRhZ1wiXHJcbiAgICAgICAgICAgICAgICAgIHNyYz17YGh0dHBzOi8vcGFnZWFkMi5nb29nbGVzeW5kaWNhdGlvbi5jb20vcGFnZWFkL2pzL2Fkc2J5Z29vZ2xlLmpzP2NsaWVudD0ke3NldHRpbmdzLmdvb2dsZV9hZHMuZmllbGR9YH1cclxuICAgICAgICAgICAgICAgICAgY3Jvc3NPcmlnaW49XCJhbm9ueW1vdXNcIiBcclxuICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgICAgKSAgXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgPC9IZWFkPlxyXG4gICAgPC9kaXY+XHJcbiAgKTtcclxufVxyXG5cclxuICJdLCJuYW1lcyI6WyJwb3BwaW5zIiwiSGVhZCIsIlNjcmlwdCIsInVzZUVmZmVjdCIsInVzZVN0YXRlIiwiTXlBcHAiLCJDb21wb25lbnQiLCJwYWdlUHJvcHMiLCJzZXR0aW5ncyIsInVwY29taW5nIiwidW5kZWZpbmVkIiwiZGl2IiwiY2xhc3NOYW1lIiwiZ29vZ2xlX2FuYWx5dGljcyIsImVuYWJsZWQiLCJzcmMiLCJmaWVsZCIsInN0cmF0ZWd5IiwiY3Jvc3NPcmlnaW4iLCJpZCIsImRhbmdlcm91c2x5U2V0SW5uZXJIVE1MIiwiX19odG1sIiwibGluayIsInJlbCIsImhyZWYiLCJtZXRhIiwibmFtZSIsImNvbnRlbnQiLCJnb29nbGVfYWRzIiwic2NyaXB0IiwiYXN5bmMiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./pages/_app.js\n");

/***/ }),

/***/ "./src/app/globals.css":
/*!*****************************!*\
  !*** ./src/app/globals.css ***!
  \*****************************/
/***/ (() => {



/***/ }),

/***/ "next/dist/compiled/next-server/pages.runtime.dev.js":
/*!**********************************************************************!*\
  !*** external "next/dist/compiled/next-server/pages.runtime.dev.js" ***!
  \**********************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/pages.runtime.dev.js");

/***/ }),

/***/ "next/head":
/*!****************************!*\
  !*** external "next/head" ***!
  \****************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/head");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("react");

/***/ }),

/***/ "react-dom":
/*!****************************!*\
  !*** external "react-dom" ***!
  \****************************/
/***/ ((module) => {

"use strict";
module.exports = require("react-dom");

/***/ }),

/***/ "react/jsx-dev-runtime":
/*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-dev-runtime");

/***/ }),

/***/ "react/jsx-runtime":
/*!************************************!*\
  !*** external "react/jsx-runtime" ***!
  \************************************/
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-runtime");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/@swc"], () => (__webpack_exec__("./pages/_app.js")));
module.exports = __webpack_exports__;

})();