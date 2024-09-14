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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ MyApp)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_font_google_target_css_path_pages_app_js_import_Poppins_arguments_weight_300_400_500_600_700_800_subsets_latin_display_swap_variableName_poppins___WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! next/font/google/target.css?{\"path\":\"pages\\\\_app.js\",\"import\":\"Poppins\",\"arguments\":[{\"weight\":[\"300\",\"400\",\"500\",\"600\",\"700\",\"800\"],\"subsets\":[\"latin\"],\"display\":\"swap\"}],\"variableName\":\"poppins\"} */ \"./node_modules/next/font/google/target.css?{\\\"path\\\":\\\"pages\\\\\\\\_app.js\\\",\\\"import\\\":\\\"Poppins\\\",\\\"arguments\\\":[{\\\"weight\\\":[\\\"300\\\",\\\"400\\\",\\\"500\\\",\\\"600\\\",\\\"700\\\",\\\"800\\\"],\\\"subsets\\\":[\\\"latin\\\"],\\\"display\\\":\\\"swap\\\"}],\\\"variableName\\\":\\\"poppins\\\"}\");\n/* harmony import */ var next_font_google_target_css_path_pages_app_js_import_Poppins_arguments_weight_300_400_500_600_700_800_subsets_latin_display_swap_variableName_poppins___WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(next_font_google_target_css_path_pages_app_js_import_Poppins_arguments_weight_300_400_500_600_700_800_subsets_latin_display_swap_variableName_poppins___WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _app_globals_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/app/globals.css */ \"./src/app/globals.css\");\n/* harmony import */ var _app_globals_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_app_globals_css__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/head */ \"next/head\");\n/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_head__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var next_script__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! next/script */ \"./node_modules/next/script.js\");\n/* harmony import */ var next_script__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_script__WEBPACK_IMPORTED_MODULE_3__);\n\n\n // Import your global styles\n\n\nfunction MyApp({ Component, pageProps }) {\n    /*\r\n  google_analytics: {\r\n        enabled: {\r\n            type: Boolean,\r\n            trim: true,\r\n            default: false\r\n        },\r\n        field: {\r\n            type: String,\r\n            trim: true,\r\n            default: \"\"\r\n        },\r\n    },\r\n    google_ads: {\r\n        enabled: {\r\n            type: Boolean,\r\n            trim: true,\r\n            default: false\r\n        },\r\n        field: {\r\n            type: String,\r\n            trim: true,\r\n            default: \"\"\r\n        },\r\n    },\r\n  */ var settings = pageProps.upcoming == undefined || pageProps == undefined ? null : pageProps.upcoming.settings;\n    if (settings != null) console.log(settings.google_ads.enabled);\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        className: (next_font_google_target_css_path_pages_app_js_import_Poppins_arguments_weight_300_400_500_600_700_800_subsets_latin_display_swap_variableName_poppins___WEBPACK_IMPORTED_MODULE_4___default().className),\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Component, {\n                ...pageProps\n            }, void 0, false, {\n                fileName: \"D:\\\\codedtag.com\\\\public\\\\views\\\\pages\\\\_app.js\",\n                lineNumber: 47,\n                columnNumber: 9\n            }, this),\n            // Google Analytics \n            settings != null && settings.google_analytics.enabled && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((next_script__WEBPACK_IMPORTED_MODULE_3___default()), {\n                        src: `https://www.googletagmanager.com/gtag/js?id=${settings.google_analytics.field}`,\n                        strategy: \"afterInteractive\",\n                        crossOrigin: \"anonymous\"\n                    }, void 0, false, {\n                        fileName: \"D:\\\\codedtag.com\\\\public\\\\views\\\\pages\\\\_app.js\",\n                        lineNumber: 54,\n                        columnNumber: 15\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((next_script__WEBPACK_IMPORTED_MODULE_3___default()), {\n                        id: \"google-analytics-init\",\n                        strategy: \"afterInteractive\",\n                        dangerouslySetInnerHTML: {\n                            __html: `\r\n                    window.dataLayer = window.dataLayer || [];\r\n                    function gtag(){dataLayer.push(arguments);}\r\n                    gtag('js', new Date());\r\n                    gtag('config', '${settings.google_analytics.field}');\r\n                  `\n                        }\n                    }, void 0, false, {\n                        fileName: \"D:\\\\codedtag.com\\\\public\\\\views\\\\pages\\\\_app.js\",\n                        lineNumber: 60,\n                        columnNumber: 15\n                    }, this)\n                ]\n            }, void 0, true),\n            settings != null && settings.google_ads.enabled && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((next_script__WEBPACK_IMPORTED_MODULE_3___default()), {\n                async: true,\n                src: `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${settings.google_ads.field}`,\n                strategy: \"afterInteractive\",\n                crossOrigin: \"anonymous\"\n            }, void 0, false, {\n                fileName: \"D:\\\\codedtag.com\\\\public\\\\views\\\\pages\\\\_app.js\",\n                lineNumber: 79,\n                columnNumber: 13\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((next_head__WEBPACK_IMPORTED_MODULE_2___default()), {\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"link\", {\n                        rel: \"manifest\",\n                        href: \"/icons/manifest.json\"\n                    }, void 0, false, {\n                        fileName: \"D:\\\\codedtag.com\\\\public\\\\views\\\\pages\\\\_app.js\",\n                        lineNumber: 92,\n                        columnNumber: 13\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"meta\", {\n                        name: \"theme-color\",\n                        content: \"#000000\"\n                    }, void 0, false, {\n                        fileName: \"D:\\\\codedtag.com\\\\public\\\\views\\\\pages\\\\_app.js\",\n                        lineNumber: 93,\n                        columnNumber: 13\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"link\", {\n                        rel: \"icon\",\n                        href: \"/icons/favicon.ico\"\n                    }, void 0, false, {\n                        fileName: \"D:\\\\codedtag.com\\\\public\\\\views\\\\pages\\\\_app.js\",\n                        lineNumber: 94,\n                        columnNumber: 13\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"link\", {\n                        rel: \"apple-touch-icon\",\n                        href: \"/icons/logo192.png\"\n                    }, void 0, false, {\n                        fileName: \"D:\\\\codedtag.com\\\\public\\\\views\\\\pages\\\\_app.js\",\n                        lineNumber: 95,\n                        columnNumber: 13\n                    }, this)\n                ]\n            }, void 0, true, {\n                fileName: \"D:\\\\codedtag.com\\\\public\\\\views\\\\pages\\\\_app.js\",\n                lineNumber: 91,\n                columnNumber: 9\n            }, this)\n        ]\n    }, void 0, true, {\n        fileName: \"D:\\\\codedtag.com\\\\public\\\\views\\\\pages\\\\_app.js\",\n        lineNumber: 46,\n        columnNumber: 5\n    }, this);\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWdlcy9fYXBwLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUlNQTtBQUhxQixDQUFDLDRCQUE0QjtBQUMzQjtBQUNJO0FBT2xCLFNBQVNHLE1BQU0sRUFBRUMsU0FBUyxFQUFFQyxTQUFTLEVBQUU7SUFFcEQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7RUF5QkEsR0FFQSxJQUFJQyxXQUFXLFVBQVdDLFFBQVEsSUFBSUMsYUFBYUgsYUFBYUcsWUFBYSxPQUFNSCxVQUFVRSxRQUFRLENBQUNELFFBQVE7SUFFOUcsSUFBSUEsWUFBWSxNQUNoQkcsUUFBUUMsR0FBRyxDQUFDSixTQUFTSyxVQUFVLENBQUNDLE9BQU87SUFFdkMscUJBQ0UsOERBQUNDO1FBQUlDLFdBQVdkLHlNQUFpQjs7MEJBQzdCLDhEQUFDSTtnQkFBVyxHQUFHQyxTQUFTOzs7Ozs7WUFJdEIsb0JBQW9CO1lBQ25CQyxZQUFZLFFBQVFBLFNBQVNTLGdCQUFnQixDQUFDSCxPQUFPLGtCQUNwRDs7a0NBQ0UsOERBQUNWLG9EQUFNQTt3QkFDTGMsS0FBSyxDQUFDLDRDQUE0QyxFQUFFVixTQUFTUyxnQkFBZ0IsQ0FBQ0UsS0FBSyxDQUFDLENBQUM7d0JBQ3JGQyxVQUFTO3dCQUNUQyxhQUFZOzs7Ozs7a0NBR2QsOERBQUNqQixvREFBTUE7d0JBQ0xrQixJQUFHO3dCQUNIRixVQUFTO3dCQUNURyx5QkFBeUI7NEJBQ3ZCQyxRQUFRLENBQUM7Ozs7b0NBSVMsRUFBRWhCLFNBQVNTLGdCQUFnQixDQUFDRSxLQUFLLENBQUM7a0JBQ3BELENBQUM7d0JBQ0g7Ozs7Ozs7O1lBUUpYLFlBQVksUUFBUUEsU0FBU0ssVUFBVSxDQUFDQyxPQUFPLGtCQUMvQyw4REFBQ1Ysb0RBQU1BO2dCQUNMcUIsS0FBSztnQkFDTFAsS0FBSyxDQUFDLHNFQUFzRSxFQUFFVixTQUFTSyxVQUFVLENBQUNNLEtBQUssQ0FBQyxDQUFDO2dCQUN6R0MsVUFBUztnQkFDVEMsYUFBWTs7Ozs7OzBCQVFsQiw4REFBQ2xCLGtEQUFJQTs7a0NBQ0QsOERBQUN1Qjt3QkFBS0MsS0FBSTt3QkFBV0MsTUFBSzs7Ozs7O2tDQUMxQiw4REFBQ0M7d0JBQUtDLE1BQUs7d0JBQWNDLFNBQVE7Ozs7OztrQ0FDakMsOERBQUNMO3dCQUFLQyxLQUFJO3dCQUFPQyxNQUFLOzs7Ozs7a0NBQ3RCLDhEQUFDRjt3QkFBS0MsS0FBSTt3QkFBbUJDLE1BQUs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUk5QyIsInNvdXJjZXMiOlsid2VicGFjazovL21haW4vLi9wYWdlcy9fYXBwLmpzP2UwYWQiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUG9wcGlucyB9IGZyb20gJ25leHQvZm9udC9nb29nbGUnO1xyXG5pbXBvcnQgXCJAL2FwcC9nbG9iYWxzLmNzc1wiOyAvLyBJbXBvcnQgeW91ciBnbG9iYWwgc3R5bGVzXHJcbmltcG9ydCBIZWFkIGZyb20gJ25leHQvaGVhZCc7XHJcbmltcG9ydCBTY3JpcHQgZnJvbSAnbmV4dC9zY3JpcHQnO1xyXG5jb25zdCBwb3BwaW5zID0gUG9wcGlucyh7XHJcbiAgd2VpZ2h0OiBbJzMwMCcsICc0MDAnLCAnNTAwJywgJzYwMCcsICc3MDAnLCAnODAwJ10sXHJcbiAgc3Vic2V0czogWydsYXRpbiddLFxyXG4gIGRpc3BsYXk6ICdzd2FwJyxcclxufSk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBNeUFwcCh7IENvbXBvbmVudCwgcGFnZVByb3BzIH0pIHtcclxuICBcclxuICAvKlxyXG4gIGdvb2dsZV9hbmFseXRpY3M6IHtcclxuICAgICAgICBlbmFibGVkOiB7XHJcbiAgICAgICAgICAgIHR5cGU6IEJvb2xlYW4sXHJcbiAgICAgICAgICAgIHRyaW06IHRydWUsXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IGZhbHNlXHJcbiAgICAgICAgfSxcclxuICAgICAgICBmaWVsZDoge1xyXG4gICAgICAgICAgICB0eXBlOiBTdHJpbmcsXHJcbiAgICAgICAgICAgIHRyaW06IHRydWUsXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IFwiXCJcclxuICAgICAgICB9LFxyXG4gICAgfSxcclxuICAgIGdvb2dsZV9hZHM6IHtcclxuICAgICAgICBlbmFibGVkOiB7XHJcbiAgICAgICAgICAgIHR5cGU6IEJvb2xlYW4sXHJcbiAgICAgICAgICAgIHRyaW06IHRydWUsXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IGZhbHNlXHJcbiAgICAgICAgfSxcclxuICAgICAgICBmaWVsZDoge1xyXG4gICAgICAgICAgICB0eXBlOiBTdHJpbmcsXHJcbiAgICAgICAgICAgIHRyaW06IHRydWUsXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IFwiXCJcclxuICAgICAgICB9LFxyXG4gICAgfSxcclxuICAqL1xyXG4gIFxyXG4gIHZhciBzZXR0aW5ncyA9IChwYWdlUHJvcHMudXBjb21pbmcgPT0gdW5kZWZpbmVkIHx8IHBhZ2VQcm9wcyA9PSB1bmRlZmluZWQpID8gbnVsbDogcGFnZVByb3BzLnVwY29taW5nLnNldHRpbmdzOyBcclxuIFxyXG4gIGlmKCBzZXR0aW5ncyAhPSBudWxsIClcclxuICBjb25zb2xlLmxvZyhzZXR0aW5ncy5nb29nbGVfYWRzLmVuYWJsZWQpO1xyXG5cclxuICByZXR1cm4gKFxyXG4gICAgPGRpdiBjbGFzc05hbWU9e3BvcHBpbnMuY2xhc3NOYW1lfT5cclxuICAgICAgICA8Q29tcG9uZW50IHsuLi5wYWdlUHJvcHN9IC8+XHJcbiAgICAgICAgXHJcblxyXG4gICAgICAgIHtcclxuICAgICAgICAgIC8vIEdvb2dsZSBBbmFseXRpY3MgXHJcbiAgICAgICAgICAoc2V0dGluZ3MgIT0gbnVsbCAmJiBzZXR0aW5ncy5nb29nbGVfYW5hbHl0aWNzLmVuYWJsZWQpICYmIChcclxuICAgICAgICAgICAgPD5cclxuICAgICAgICAgICAgICA8U2NyaXB0XHJcbiAgICAgICAgICAgICAgICBzcmM9e2BodHRwczovL3d3dy5nb29nbGV0YWdtYW5hZ2VyLmNvbS9ndGFnL2pzP2lkPSR7c2V0dGluZ3MuZ29vZ2xlX2FuYWx5dGljcy5maWVsZH1gfVxyXG4gICAgICAgICAgICAgICAgc3RyYXRlZ3k9XCJhZnRlckludGVyYWN0aXZlXCJcclxuICAgICAgICAgICAgICAgIGNyb3NzT3JpZ2luPVwiYW5vbnltb3VzXCIgXHJcbiAgICAgICAgICAgICAgLz5cclxuXHJcbiAgICAgICAgICAgICAgPFNjcmlwdFxyXG4gICAgICAgICAgICAgICAgaWQ9XCJnb29nbGUtYW5hbHl0aWNzLWluaXRcIlxyXG4gICAgICAgICAgICAgICAgc3RyYXRlZ3k9XCJhZnRlckludGVyYWN0aXZlXCJcclxuICAgICAgICAgICAgICAgIGRhbmdlcm91c2x5U2V0SW5uZXJIVE1MPXt7XHJcbiAgICAgICAgICAgICAgICAgIF9faHRtbDogYFxyXG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdy5kYXRhTGF5ZXIgPSB3aW5kb3cuZGF0YUxheWVyIHx8IFtdO1xyXG4gICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uIGd0YWcoKXtkYXRhTGF5ZXIucHVzaChhcmd1bWVudHMpO31cclxuICAgICAgICAgICAgICAgICAgICBndGFnKCdqcycsIG5ldyBEYXRlKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIGd0YWcoJ2NvbmZpZycsICcke3NldHRpbmdzLmdvb2dsZV9hbmFseXRpY3MuZmllbGR9Jyk7XHJcbiAgICAgICAgICAgICAgICAgIGAsXHJcbiAgICAgICAgICAgICAgICB9fVxyXG4gICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgIDwvPlxyXG4gICAgICAgICAgKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgXHJcbiAgICAgICAgeyBcclxuICAgICAgICAgICggc2V0dGluZ3MgIT0gbnVsbCAmJiBzZXR0aW5ncy5nb29nbGVfYWRzLmVuYWJsZWQgKSAmJiAoXHJcbiAgICAgICAgICAgIDxTY3JpcHRcclxuICAgICAgICAgICAgICBhc3luY1xyXG4gICAgICAgICAgICAgIHNyYz17YGh0dHBzOi8vcGFnZWFkMi5nb29nbGVzeW5kaWNhdGlvbi5jb20vcGFnZWFkL2pzL2Fkc2J5Z29vZ2xlLmpzP2NsaWVudD0ke3NldHRpbmdzLmdvb2dsZV9hZHMuZmllbGR9YH1cclxuICAgICAgICAgICAgICBzdHJhdGVneT1cImFmdGVySW50ZXJhY3RpdmVcIlxyXG4gICAgICAgICAgICAgIGNyb3NzT3JpZ2luPVwiYW5vbnltb3VzXCJcclxuICAgICAgICAgICAgIC8vIG9uTG9hZD17KCkgPT4gKGFkc2J5Z29vZ2xlID0gd2luZG93LmFkc2J5Z29vZ2xlIHx8IFtdKS5wdXNoKHt9KX1cclxuICAgICAgICAgICAgLz5cclxuICAgICAgICAgICkgIFxyXG4gICAgICAgIH0gXHJcblxyXG4gICAgICAgIFxyXG5cclxuICAgICAgICA8SGVhZD5cclxuICAgICAgICAgICAgPGxpbmsgcmVsPVwibWFuaWZlc3RcIiBocmVmPVwiL2ljb25zL21hbmlmZXN0Lmpzb25cIiAvPlxyXG4gICAgICAgICAgICA8bWV0YSBuYW1lPVwidGhlbWUtY29sb3JcIiBjb250ZW50PVwiIzAwMDAwMFwiIC8+XHJcbiAgICAgICAgICAgIDxsaW5rIHJlbD1cImljb25cIiBocmVmPVwiL2ljb25zL2Zhdmljb24uaWNvXCIgLz5cclxuICAgICAgICAgICAgPGxpbmsgcmVsPVwiYXBwbGUtdG91Y2gtaWNvblwiIGhyZWY9XCIvaWNvbnMvbG9nbzE5Mi5wbmdcIiAvPlxyXG4gICAgICAgIDwvSGVhZD5cclxuICAgIDwvZGl2PlxyXG4gICk7XHJcbn1cclxuXHJcbiAiXSwibmFtZXMiOlsicG9wcGlucyIsIkhlYWQiLCJTY3JpcHQiLCJNeUFwcCIsIkNvbXBvbmVudCIsInBhZ2VQcm9wcyIsInNldHRpbmdzIiwidXBjb21pbmciLCJ1bmRlZmluZWQiLCJjb25zb2xlIiwibG9nIiwiZ29vZ2xlX2FkcyIsImVuYWJsZWQiLCJkaXYiLCJjbGFzc05hbWUiLCJnb29nbGVfYW5hbHl0aWNzIiwic3JjIiwiZmllbGQiLCJzdHJhdGVneSIsImNyb3NzT3JpZ2luIiwiaWQiLCJkYW5nZXJvdXNseVNldElubmVySFRNTCIsIl9faHRtbCIsImFzeW5jIiwibGluayIsInJlbCIsImhyZWYiLCJtZXRhIiwibmFtZSIsImNvbnRlbnQiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./pages/_app.js\n");

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