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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ MyApp)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_font_google_target_css_path_pages_app_js_import_Poppins_arguments_weight_300_400_500_600_700_800_subsets_latin_display_swap_variableName_poppins___WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! next/font/google/target.css?{\"path\":\"pages\\\\_app.js\",\"import\":\"Poppins\",\"arguments\":[{\"weight\":[\"300\",\"400\",\"500\",\"600\",\"700\",\"800\"],\"subsets\":[\"latin\"],\"display\":\"swap\"}],\"variableName\":\"poppins\"} */ \"./node_modules/next/font/google/target.css?{\\\"path\\\":\\\"pages\\\\\\\\_app.js\\\",\\\"import\\\":\\\"Poppins\\\",\\\"arguments\\\":[{\\\"weight\\\":[\\\"300\\\",\\\"400\\\",\\\"500\\\",\\\"600\\\",\\\"700\\\",\\\"800\\\"],\\\"subsets\\\":[\\\"latin\\\"],\\\"display\\\":\\\"swap\\\"}],\\\"variableName\\\":\\\"poppins\\\"}\");\n/* harmony import */ var next_font_google_target_css_path_pages_app_js_import_Poppins_arguments_weight_300_400_500_600_700_800_subsets_latin_display_swap_variableName_poppins___WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(next_font_google_target_css_path_pages_app_js_import_Poppins_arguments_weight_300_400_500_600_700_800_subsets_latin_display_swap_variableName_poppins___WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _app_globals_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/app/globals.css */ \"./src/app/globals.css\");\n/* harmony import */ var _app_globals_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_app_globals_css__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/head */ \"next/head\");\n/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_head__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var next_script__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! next/script */ \"./node_modules/next/script.js\");\n/* harmony import */ var next_script__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_script__WEBPACK_IMPORTED_MODULE_3__);\n\n\n // Import your global styles\n\n\nfunction MyApp({ Component, pageProps }) {\n    /*\r\n  google_analytics: {\r\n        enabled: {\r\n            type: Boolean,\r\n            trim: true,\r\n            default: false\r\n        },\r\n        field: {\r\n            type: String,\r\n            trim: true,\r\n            default: \"\"\r\n        },\r\n    },\r\n    google_ads: {\r\n        enabled: {\r\n            type: Boolean,\r\n            trim: true,\r\n            default: false\r\n        },\r\n        field: {\r\n            type: String,\r\n            trim: true,\r\n            default: \"\"\r\n        },\r\n    },\r\n  */ var settings = pageProps.upcoming.settings;\n    var adBlocks = pageProps.upcoming.ads;\n    console.log(settings.google_analytics);\n    console.log(settings.google_ads);\n    console.log(adBlocks);\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        className: (next_font_google_target_css_path_pages_app_js_import_Poppins_arguments_weight_300_400_500_600_700_800_subsets_latin_display_swap_variableName_poppins___WEBPACK_IMPORTED_MODULE_4___default().className),\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Component, {\n                ...pageProps\n            }, void 0, false, {\n                fileName: \"D:\\\\codedtag.com\\\\public\\\\views\\\\pages\\\\_app.js\",\n                lineNumber: 47,\n                columnNumber: 9\n            }, this),\n            // Google Analytics \n            settings.google_analytics.enabled && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((next_script__WEBPACK_IMPORTED_MODULE_3___default()), {\n                        src: `https://www.googletagmanager.com/gtag/js?id=${settings.google_analytics.field}`,\n                        strategy: \"afterInteractive\",\n                        crossOrigin: \"anonymous\"\n                    }, void 0, false, {\n                        fileName: \"D:\\\\codedtag.com\\\\public\\\\views\\\\pages\\\\_app.js\",\n                        lineNumber: 54,\n                        columnNumber: 15\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((next_script__WEBPACK_IMPORTED_MODULE_3___default()), {\n                        id: \"google-analytics-init\",\n                        strategy: \"afterInteractive\",\n                        dangerouslySetInnerHTML: {\n                            __html: `\r\n                    window.dataLayer = window.dataLayer || [];\r\n                    function gtag(){dataLayer.push(arguments);}\r\n                    gtag('js', new Date());\r\n                    gtag('config', '${settings.google_analytics.field}');\r\n                  `\n                        }\n                    }, void 0, false, {\n                        fileName: \"D:\\\\codedtag.com\\\\public\\\\views\\\\pages\\\\_app.js\",\n                        lineNumber: 60,\n                        columnNumber: 15\n                    }, this)\n                ]\n            }, void 0, true),\n            settings.google_ads.enabled && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((next_script__WEBPACK_IMPORTED_MODULE_3___default()), {\n                async: true,\n                src: `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${settings.google_ads.field}`,\n                strategy: \"lazyOnload\",\n                crossOrigin: \"anonymous\",\n                onLoad: ()=>window.adsbygoogle.push({})\n            }, void 0, false, {\n                fileName: \"D:\\\\codedtag.com\\\\public\\\\views\\\\pages\\\\_app.js\",\n                lineNumber: 79,\n                columnNumber: 13\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((next_head__WEBPACK_IMPORTED_MODULE_2___default()), {\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"link\", {\n                        rel: \"manifest\",\n                        href: \"/icons/manifest.json\"\n                    }, void 0, false, {\n                        fileName: \"D:\\\\codedtag.com\\\\public\\\\views\\\\pages\\\\_app.js\",\n                        lineNumber: 90,\n                        columnNumber: 13\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"meta\", {\n                        name: \"theme-color\",\n                        content: \"#000000\"\n                    }, void 0, false, {\n                        fileName: \"D:\\\\codedtag.com\\\\public\\\\views\\\\pages\\\\_app.js\",\n                        lineNumber: 91,\n                        columnNumber: 13\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"link\", {\n                        rel: \"icon\",\n                        href: \"/icons/favicon.ico\"\n                    }, void 0, false, {\n                        fileName: \"D:\\\\codedtag.com\\\\public\\\\views\\\\pages\\\\_app.js\",\n                        lineNumber: 92,\n                        columnNumber: 13\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"link\", {\n                        rel: \"apple-touch-icon\",\n                        href: \"/icons/logo192.png\"\n                    }, void 0, false, {\n                        fileName: \"D:\\\\codedtag.com\\\\public\\\\views\\\\pages\\\\_app.js\",\n                        lineNumber: 93,\n                        columnNumber: 13\n                    }, this)\n                ]\n            }, void 0, true, {\n                fileName: \"D:\\\\codedtag.com\\\\public\\\\views\\\\pages\\\\_app.js\",\n                lineNumber: 89,\n                columnNumber: 9\n            }, this)\n        ]\n    }, void 0, true, {\n        fileName: \"D:\\\\codedtag.com\\\\public\\\\views\\\\pages\\\\_app.js\",\n        lineNumber: 46,\n        columnNumber: 5\n    }, this);\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWdlcy9fYXBwLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUlNQTtBQUhxQixDQUFDLDRCQUE0QjtBQUMzQjtBQUNJO0FBT2xCLFNBQVNHLE1BQU0sRUFBRUMsU0FBUyxFQUFFQyxTQUFTLEVBQUU7SUFFcEQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7RUF5QkEsR0FFQSxJQUFJQyxXQUFXRCxVQUFVRSxRQUFRLENBQUNELFFBQVE7SUFDMUMsSUFBSUUsV0FBV0gsVUFBVUUsUUFBUSxDQUFDRSxHQUFHO0lBQ3JDQyxRQUFRQyxHQUFHLENBQUNMLFNBQVNNLGdCQUFnQjtJQUNyQ0YsUUFBUUMsR0FBRyxDQUFDTCxTQUFTTyxVQUFVO0lBQy9CSCxRQUFRQyxHQUFHLENBQUNIO0lBQ1oscUJBQ0UsOERBQUNNO1FBQUlDLFdBQVdmLHlNQUFpQjs7MEJBQzdCLDhEQUFDSTtnQkFBVyxHQUFHQyxTQUFTOzs7Ozs7WUFJdEIsb0JBQW9CO1lBQ3BCQyxTQUFTTSxnQkFBZ0IsQ0FBQ0ksT0FBTyxrQkFDL0I7O2tDQUNFLDhEQUFDZCxvREFBTUE7d0JBQ0xlLEtBQUssQ0FBQyw0Q0FBNEMsRUFBRVgsU0FBU00sZ0JBQWdCLENBQUNNLEtBQUssQ0FBQyxDQUFDO3dCQUNyRkMsVUFBUzt3QkFDVEMsYUFBWTs7Ozs7O2tDQUdkLDhEQUFDbEIsb0RBQU1BO3dCQUNMbUIsSUFBRzt3QkFDSEYsVUFBUzt3QkFDVEcseUJBQXlCOzRCQUN2QkMsUUFBUSxDQUFDOzs7O29DQUlTLEVBQUVqQixTQUFTTSxnQkFBZ0IsQ0FBQ00sS0FBSyxDQUFDO2tCQUNwRCxDQUFDO3dCQUNIOzs7Ozs7OztZQVFOWixTQUFTTyxVQUFVLENBQUNHLE9BQU8sa0JBQ3pCLDhEQUFDZCxvREFBTUE7Z0JBQ0xzQixLQUFLO2dCQUNMUCxLQUFLLENBQUMsc0VBQXNFLEVBQUVYLFNBQVNPLFVBQVUsQ0FBQ0ssS0FBSyxDQUFDLENBQUM7Z0JBQ3pHQyxVQUFTO2dCQUNUQyxhQUFZO2dCQUNaSyxRQUFRLElBQU1DLE9BQU9DLFdBQVcsQ0FBQ0MsSUFBSSxDQUFDLENBQUM7Ozs7OzswQkFLN0MsOERBQUMzQixrREFBSUE7O2tDQUNELDhEQUFDNEI7d0JBQUtDLEtBQUk7d0JBQVdDLE1BQUs7Ozs7OztrQ0FDMUIsOERBQUNDO3dCQUFLQyxNQUFLO3dCQUFjQyxTQUFROzs7Ozs7a0NBQ2pDLDhEQUFDTDt3QkFBS0MsS0FBSTt3QkFBT0MsTUFBSzs7Ozs7O2tDQUN0Qiw4REFBQ0Y7d0JBQUtDLEtBQUk7d0JBQW1CQyxNQUFLOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFJOUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9tYWluLy4vcGFnZXMvX2FwcC5qcz9lMGFkIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBvcHBpbnMgfSBmcm9tICduZXh0L2ZvbnQvZ29vZ2xlJztcclxuaW1wb3J0IFwiQC9hcHAvZ2xvYmFscy5jc3NcIjsgLy8gSW1wb3J0IHlvdXIgZ2xvYmFsIHN0eWxlc1xyXG5pbXBvcnQgSGVhZCBmcm9tICduZXh0L2hlYWQnO1xyXG5pbXBvcnQgU2NyaXB0IGZyb20gJ25leHQvc2NyaXB0JztcclxuY29uc3QgcG9wcGlucyA9IFBvcHBpbnMoe1xyXG4gIHdlaWdodDogWyczMDAnLCAnNDAwJywgJzUwMCcsICc2MDAnLCAnNzAwJywgJzgwMCddLFxyXG4gIHN1YnNldHM6IFsnbGF0aW4nXSxcclxuICBkaXNwbGF5OiAnc3dhcCcsXHJcbn0pO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gTXlBcHAoeyBDb21wb25lbnQsIHBhZ2VQcm9wcyB9KSB7XHJcbiAgXHJcbiAgLypcclxuICBnb29nbGVfYW5hbHl0aWNzOiB7XHJcbiAgICAgICAgZW5hYmxlZDoge1xyXG4gICAgICAgICAgICB0eXBlOiBCb29sZWFuLFxyXG4gICAgICAgICAgICB0cmltOiB0cnVlLFxyXG4gICAgICAgICAgICBkZWZhdWx0OiBmYWxzZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZmllbGQ6IHtcclxuICAgICAgICAgICAgdHlwZTogU3RyaW5nLFxyXG4gICAgICAgICAgICB0cmltOiB0cnVlLFxyXG4gICAgICAgICAgICBkZWZhdWx0OiBcIlwiXHJcbiAgICAgICAgfSxcclxuICAgIH0sXHJcbiAgICBnb29nbGVfYWRzOiB7XHJcbiAgICAgICAgZW5hYmxlZDoge1xyXG4gICAgICAgICAgICB0eXBlOiBCb29sZWFuLFxyXG4gICAgICAgICAgICB0cmltOiB0cnVlLFxyXG4gICAgICAgICAgICBkZWZhdWx0OiBmYWxzZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZmllbGQ6IHtcclxuICAgICAgICAgICAgdHlwZTogU3RyaW5nLFxyXG4gICAgICAgICAgICB0cmltOiB0cnVlLFxyXG4gICAgICAgICAgICBkZWZhdWx0OiBcIlwiXHJcbiAgICAgICAgfSxcclxuICAgIH0sXHJcbiAgKi9cclxuICBcclxuICB2YXIgc2V0dGluZ3MgPSBwYWdlUHJvcHMudXBjb21pbmcuc2V0dGluZ3M7XHJcbiAgdmFyIGFkQmxvY2tzID0gcGFnZVByb3BzLnVwY29taW5nLmFkcztcclxuICBjb25zb2xlLmxvZyhzZXR0aW5ncy5nb29nbGVfYW5hbHl0aWNzKVxyXG4gIGNvbnNvbGUubG9nKHNldHRpbmdzLmdvb2dsZV9hZHMpXHJcbiAgY29uc29sZS5sb2coYWRCbG9ja3MpIFxyXG4gIHJldHVybiAoXHJcbiAgICA8ZGl2IGNsYXNzTmFtZT17cG9wcGlucy5jbGFzc05hbWV9PlxyXG4gICAgICAgIDxDb21wb25lbnQgey4uLnBhZ2VQcm9wc30gLz5cclxuICAgICAgICBcclxuXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgLy8gR29vZ2xlIEFuYWx5dGljcyBcclxuICAgICAgICAgIHNldHRpbmdzLmdvb2dsZV9hbmFseXRpY3MuZW5hYmxlZCAmJiAoXHJcbiAgICAgICAgICAgIDw+XHJcbiAgICAgICAgICAgICAgPFNjcmlwdFxyXG4gICAgICAgICAgICAgICAgc3JjPXtgaHR0cHM6Ly93d3cuZ29vZ2xldGFnbWFuYWdlci5jb20vZ3RhZy9qcz9pZD0ke3NldHRpbmdzLmdvb2dsZV9hbmFseXRpY3MuZmllbGR9YH1cclxuICAgICAgICAgICAgICAgIHN0cmF0ZWd5PVwiYWZ0ZXJJbnRlcmFjdGl2ZVwiXHJcbiAgICAgICAgICAgICAgICBjcm9zc09yaWdpbj1cImFub255bW91c1wiIFxyXG4gICAgICAgICAgICAgIC8+XHJcblxyXG4gICAgICAgICAgICAgIDxTY3JpcHRcclxuICAgICAgICAgICAgICAgIGlkPVwiZ29vZ2xlLWFuYWx5dGljcy1pbml0XCJcclxuICAgICAgICAgICAgICAgIHN0cmF0ZWd5PVwiYWZ0ZXJJbnRlcmFjdGl2ZVwiXHJcbiAgICAgICAgICAgICAgICBkYW5nZXJvdXNseVNldElubmVySFRNTD17e1xyXG4gICAgICAgICAgICAgICAgICBfX2h0bWw6IGBcclxuICAgICAgICAgICAgICAgICAgICB3aW5kb3cuZGF0YUxheWVyID0gd2luZG93LmRhdGFMYXllciB8fCBbXTtcclxuICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbiBndGFnKCl7ZGF0YUxheWVyLnB1c2goYXJndW1lbnRzKTt9XHJcbiAgICAgICAgICAgICAgICAgICAgZ3RhZygnanMnLCBuZXcgRGF0ZSgpKTtcclxuICAgICAgICAgICAgICAgICAgICBndGFnKCdjb25maWcnLCAnJHtzZXR0aW5ncy5nb29nbGVfYW5hbHl0aWNzLmZpZWxkfScpO1xyXG4gICAgICAgICAgICAgICAgICBgLFxyXG4gICAgICAgICAgICAgICAgfX1cclxuICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICA8Lz5cclxuICAgICAgICAgIClcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIHNldHRpbmdzLmdvb2dsZV9hZHMuZW5hYmxlZCAmJiAoXHJcbiAgICAgICAgICAgIDxTY3JpcHRcclxuICAgICAgICAgICAgICBhc3luY1xyXG4gICAgICAgICAgICAgIHNyYz17YGh0dHBzOi8vcGFnZWFkMi5nb29nbGVzeW5kaWNhdGlvbi5jb20vcGFnZWFkL2pzL2Fkc2J5Z29vZ2xlLmpzP2NsaWVudD0ke3NldHRpbmdzLmdvb2dsZV9hZHMuZmllbGR9YH1cclxuICAgICAgICAgICAgICBzdHJhdGVneT1cImxhenlPbmxvYWRcIlxyXG4gICAgICAgICAgICAgIGNyb3NzT3JpZ2luPVwiYW5vbnltb3VzXCJcclxuICAgICAgICAgICAgICBvbkxvYWQ9eygpID0+IHdpbmRvdy5hZHNieWdvb2dsZS5wdXNoKHt9KX1cclxuICAgICAgICAgICAgLz5cclxuICAgICAgICAgIClcclxuICAgICAgICB9IFxyXG5cclxuICAgICAgICA8SGVhZD5cclxuICAgICAgICAgICAgPGxpbmsgcmVsPVwibWFuaWZlc3RcIiBocmVmPVwiL2ljb25zL21hbmlmZXN0Lmpzb25cIiAvPlxyXG4gICAgICAgICAgICA8bWV0YSBuYW1lPVwidGhlbWUtY29sb3JcIiBjb250ZW50PVwiIzAwMDAwMFwiIC8+XHJcbiAgICAgICAgICAgIDxsaW5rIHJlbD1cImljb25cIiBocmVmPVwiL2ljb25zL2Zhdmljb24uaWNvXCIgLz5cclxuICAgICAgICAgICAgPGxpbmsgcmVsPVwiYXBwbGUtdG91Y2gtaWNvblwiIGhyZWY9XCIvaWNvbnMvbG9nbzE5Mi5wbmdcIiAvPlxyXG4gICAgICAgIDwvSGVhZD5cclxuICAgIDwvZGl2PlxyXG4gICk7XHJcbn1cclxuXHJcbiAiXSwibmFtZXMiOlsicG9wcGlucyIsIkhlYWQiLCJTY3JpcHQiLCJNeUFwcCIsIkNvbXBvbmVudCIsInBhZ2VQcm9wcyIsInNldHRpbmdzIiwidXBjb21pbmciLCJhZEJsb2NrcyIsImFkcyIsImNvbnNvbGUiLCJsb2ciLCJnb29nbGVfYW5hbHl0aWNzIiwiZ29vZ2xlX2FkcyIsImRpdiIsImNsYXNzTmFtZSIsImVuYWJsZWQiLCJzcmMiLCJmaWVsZCIsInN0cmF0ZWd5IiwiY3Jvc3NPcmlnaW4iLCJpZCIsImRhbmdlcm91c2x5U2V0SW5uZXJIVE1MIiwiX19odG1sIiwiYXN5bmMiLCJvbkxvYWQiLCJ3aW5kb3ciLCJhZHNieWdvb2dsZSIsInB1c2giLCJsaW5rIiwicmVsIiwiaHJlZiIsIm1ldGEiLCJuYW1lIiwiY29udGVudCJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./pages/_app.js\n");

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