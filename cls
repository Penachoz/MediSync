[1mdiff --git a/frontend/package-lock.json b/frontend/package-lock.json[m
[1mindex a8588dc..6728df5 100644[m
[1m--- a/frontend/package-lock.json[m
[1m+++ b/frontend/package-lock.json[m
[36m@@ -19,7 +19,8 @@[m
         "web-vitals": "^1.1.0"[m
       },[m
       "devDependencies": {[m
[31m-        "@babel/plugin-transform-modules-commonjs": "^7.12.13"[m
[32m+[m[32m        "@babel/plugin-transform-modules-commonjs": "^7.12.13",[m
[32m+[m[32m        "@babel/preset-react": "^7.27.1"[m
       }[m
     },[m
     "node_modules/@adobe/css-tools": {[m
[36m@@ -54,14 +55,13 @@[m
       }[m
     },[m
     "node_modules/@babel/code-frame": {[m
[31m-      "version": "7.26.2",[m
[31m-      "resolved": "https://registry.npmjs.org/@babel/code-frame/-/code-frame-7.26.2.tgz",[m
[31m-      "integrity": "sha512-RJlIHRueQgwWitWgF8OdFYGZX328Ax5BCemNGlqHfplnRT9ESi8JkFlvaVYbS+UubVY6dpv87Fs2u5M29iNFVQ==",[m
[31m-      "license": "MIT",[m
[32m+[m[32m      "version": "7.27.1",[m
[32m+[m[32m      "resolved": "https://registry.npmjs.org/@babel/code-frame/-/code-frame-7.27.1.tgz",[m
[32m+[m[32m      "integrity": "sha512-cjQ7ZlQ0Mv3b47hABuTevyTuYN4i+loJKGeV9flcCgIK37cCXRh+L1bd3iBHlynerhQ7BhCkn2BPbQUL+rGqFg==",[m
       "dependencies": {[m
[31m-        "@babel/helper-validator-identifier": "^7.25.9",[m
[32m+[m[32m        "@babel/helper-validator-identifier": "^7.27.1",[m
         "js-tokens": "^4.0.0",[m
[31m-        "picocolors": "^1.0.0"[m
[32m+[m[32m        "picocolors": "^1.1.1"[m
       },[m
       "engines": {[m
         "node": ">=6.9.0"[m
[36m@@ -134,13 +134,12 @@[m
       }[m
     },[m
     "node_modules/@babel/generator": {[m
[31m-      "version": "7.27.0",[m
[31m-      "resolved": "https://registry.npmjs.org/@babel/generator/-/generator-7.27.0.tgz",[m
[31m-      "integrity": "sha512-VybsKvpiN1gU1sdMZIp7FcqphVVKEwcuj02x73uvcHE0PTihx1nlBcowYWhDwjpoAXRv43+gDzyggGnn1XZhVw==",[m
[31m-      "license": "MIT",[m
[32m+[m[32m      "version": "7.27.1",[m
[32m+[m[32m      "resolved": "https://registry.npmjs.org/@babel/generator/-/generator-7.27.1.tgz",[m
[32m+[m[32m      "integrity": "sha512-UnJfnIpc/+JO0/+KRVQNGU+y5taA5vCbwN8+azkX6beii/ZF+enZJSOKo11ZSzGJjlNfJHfQtmQT8H+9TXPG2w==",[m
       "dependencies": {[m
[31m-        "@babel/parser": "^7.27.0",[m
[31m-        "@babel/types": "^7.27.0",[m
[32m+[m[32m        "@babel/parser": "^7.27.1",[m
[32m+[m[32m        "@babel/types": "^7.27.1",[m
         "@jridgewell/gen-mapping": "^0.3.5",[m
         "@jridgewell/trace-mapping": "^0.3.25",[m
         "jsesc": "^3.0.2"[m
[36m@@ -150,12 +149,11 @@[m
       }[m
     },[m
     "node_modules/@babel/helper-annotate-as-pure": {[m
[31m-      "version": "7.25.9",[m
[31m-      "resolved": "https://registry.npmjs.org/@babel/helper-annotate-as-pure/-/helper-annotate-as-pure-7.25.9.tgz",[m
[31m-      "integrity": "sha512-gv7320KBUFJz1RnylIg5WWYPRXKZ884AGkYpgpWW02TH66Dl+HaC1t1CKd0z3R4b6hdYEcmrNZHUmfCP+1u3/g==",[m
[31m-      "license": "MIT",[m
[32m+[m[32m      "version": "7.27.1",[m
[32m+[m[32m      "resolved": "https://registry.npmjs.org/@babel/helper-annotate-as-pure/-/helper-annotate-as-pure-7.27.1.tgz",[m
[32m+[m[32m      "integrity": "sha512-WnuuDILl9oOBbKnb4L+DyODx7iC47XfzmNCpTttFsSp6hTG7XZxu60+4IO+2/hPfcGOoKbFiwoI/+zwARbNQow==",[m
       "dependencies": {[m
[31m-        "@babel/types": "^7.25.9"[m
[32m+[m[32m        "@babel/types": "^7.27.1"[m
       },[m
       "engines": {[m
         "node": ">=6.9.0"[m
[36m@@ -245,13 +243,12 @@[m
       }[m
     },[m
     "node_modules/@babel/helper-module-imports": {[m
[31m-      "version": "7.25.9",[m
[31m-      "resolved": "https://registry.npmjs.org/@babel/helper-module-imports/-/helper-module-imports-7.25.9.tgz",[m
[31m-      "integrity": "sha512-tnUA4RsrmflIM6W6RFTLFSXITtl0wKjgpnLgXyowocVPrbYrLUXSBXDgTs8BlbmIzIdlBySRQjINYs2BAkiLtw==",[m
[31m-      "license": "MIT",[m
[32m+[m[32m      "version": "7.27.1",[m
[32m+[m[32m      "resolved": "https://registry.npmjs.org/@b