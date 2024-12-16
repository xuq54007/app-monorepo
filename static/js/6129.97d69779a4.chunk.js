!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},t=(new e.Error).stack;t&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[t]="40baa89f-254d-45ca-9ca0-15194b2f947d",e._sentryDebugIdIdentifier="sentry-dbid-40baa89f-254d-45ca-9ca0-15194b2f947d")}catch(e){}}();var _global="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{};_global.SENTRY_RELEASE={id:"5.5.0 (2024121652)"},(self.webpackChunkweb=self.webpackChunkweb||[]).push([[6129],{451661:e=>{var t=10,r=41,n=107,i=9,o=25,a=10;function inputBytes(e){return r+(e.script?e.script.length:n)}function outputBytes(e){return e.script?a+e.script.length+(e.script.length>=74?2:1):i+(e.script?e.script.length:o)}function dustThreshold(e,t){return inputBytes({})*t}function transactionBytes(e,r){return t+e.reduce((function(e,t){return e+inputBytes(t)}),0)+r.reduce((function(e,t){return e+outputBytes(t)}),0)}function uintOrNaN(e){return"number"!=typeof e?NaN:isFinite(e)?Math.floor(e)!==e||e<0?NaN:e:NaN}function sumOrNaN(e){return e.reduce((function(e,t){return e+uintOrNaN(t.value)}),0)}var s=outputBytes({});e.exports={dustThreshold,finalize:function finalize(e,t,r){var n=transactionBytes(e,t),i=r*(n+s),o=sumOrNaN(e)-(sumOrNaN(t)+i);o>dustThreshold(0,r)&&(t=t.concat({value:o}));var a=sumOrNaN(e)-sumOrNaN(t);return isFinite(a)?{inputs:e,outputs:t,fee:a}:{fee:r*n}},inputBytes,outputBytes,sumOrNaN,sumForgiving:function sumForgiving(e){return e.reduce((function(e,t){return e+(isFinite(t.value)?t.value:0)}),0)},transactionBytes,uintOrNaN}},940916:(e,t,r)=>{"use strict";r.d(t,{G:()=>g});var n=r(482451),i=r.n(n),o=r(324586),a=r(586330),s=r(230414),u=r(507140),c=r(606777),p=r(401349),f=r(404727),l=r(180556),d=r(929296),y=r(195309),h=r(972715),v=r(901048).Buffer;function _createSuper(e){var t=_isNativeReflectConstruct();return function _createSuperInternal(){var r,n=(0,h.A)(e);if(t){var i=(0,h.A)(this).constructor;r=Reflect.construct(n,arguments,i)}else r=n.apply(this,arguments);return(0,y.A)(this,r)}}function _isNativeReflectConstruct(){try{var e=!Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){})))}catch(e){}return(_isNativeReflectConstruct=function(){return!!e})()}var b=function(e){(0,d.A)(ChainSigner,e);var t=_createSuper(ChainSigner);function ChainSigner(e,r,n){var i,o=(0,p.N)(n,{key:e,chainCode:v.alloc(32)},r).key.toString("hex");return(i=t.call(this,o,n)).encryptedPrivateKey=e,i.password=r,i.curve=n,i}var r,n=ChainSigner.prototype;return n.getPrvkey=function getPrvkey(){return Promise.resolve((0,p.Yc)(this.password,this.encryptedPrivateKey))},n.getPrvkeyHex=(r=(0,a.A)((function*(){return c.A.bytesToHex(yield this.getPrvkey())})),function getPrvkeyHex(){return r.apply(this,arguments)}),n.sign=function sign(e){var t=(0,p._S)(this.curve,this.encryptedPrivateKey,e,this.password);return"secp256k1"===this.curve?Promise.resolve([t.slice(0,-1),t[t.length-1]]):Promise.resolve([t,0])},(0,s.A)(ChainSigner)}(function(){function Verifier(e,t){this.curve=t,this.compressedPublicKey=v.from(e,"hex"),this.uncompressedPublicKey=(0,p.sA)(t,this.compressedPublicKey)}var e,t=Verifier.prototype;return t.getPubkey=function getPubkey(e){return Promise.resolve(e?this.compressedPublicKey:this.uncompressedPublicKey)},t.getPubkeyHex=(e=(0,a.A)((function*(e){return c.A.bytesToHex(yield this.getPubkey(e))})),function getPubkeyHex(t){return e.apply(this,arguments)}),t.verify=function verify(){return Promise.resolve(v.from([]))},t.verifySignature=function verifySignature({publicKey:e,digest:t,signature:r}){var n=c.A.toBuffer(e),i=c.A.toBuffer(t),o=c.A.toBuffer(r),{curve:a}=this,s=(0,p.MX)(a,n,i,o);return Promise.resolve(s)},(0,s.A)(Verifier)}());function ownKeys(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function _objectSpread(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?ownKeys(Object(r),!0).forEach((function(t){(0,o.A)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):ownKeys(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var g=function(){function CoreChainApiBase(){}var e,t,r,n,o,d,y,h,v=CoreChainApiBase.prototype;return v.baseGetCurve=function baseGetCurve(e){switch(e){case"ed25519":return p.ev;case"secp256k1":return p.bI;case"nistp256":return p.OX;default:throw new u.He("Unsupported curve")}},v.baseCreateSigner=(e=(0,a.A)((function*({curve:e,privateKey:t,password:r}){if(void 0===r)throw new u.He("Software signing requires a password.");var n=c.A.toBuffer(t);return Promise.resolve(new b(n,r,e))})),function baseCreateSigner(t){return e.apply(this,arguments)}),v.baseGetSingleSigner=(t=(0,a.A)((function*({payload:e,curve:t}){var r=yield this.getPrivateKeys(e),n=e.account.path,i=r[n],o=e?.relPaths?.[0];if(!i&&o&&(i=r[[n,o].join("/")]),!i)throw new Error(`No private key found: ${n}`);return this.baseCreateSigner({curve:t,privateKey:i,password:e.password})})),function baseGetSingleSigner(e){return t.apply(this,arguments)}),v.baseGetPrivateKeys=(r=(0,a.A)((function*({payload:e,curve:t}){var{credentials:r,account:n,password:i,relPaths:o}=e,a={};if(r.hd&&r.imported)throw new u.He("getPrivateKeys ERROR: hd and imported credentials can NOT both set.");if(r.hd&&(a=yield this.baseGetPrivateKeysHd({curve:t,account:n,hdCredential:r.hd,password:i,relPaths:o})),r.imported){var{privateKey:s}=(0,p.VV)({password:i,credential:r.imported}),f=c.A.bytesToHex((0,p.w)(i,s));a[n.path]=f,a[""]=f}if(!Object.keys(a).length)throw new Error("No private keys found");return a})),function baseGetPrivateKeys(e){return r.apply(this,arguments)}),v.baseGetPrivateKeysHd=(n=(0,a.A)((function*({curve:e,password:t,account:r,relPaths:n,hdCredential:i}){var{path:o}=r,a=o.split("/"),s=n||[a.pop()],f=a.join("/");if(0===s.length)throw new u.He("getPrivateKeysHd ERROR: relPaths is empty.");return(0,p.Wu)(e,i,t,f,s).reduce((function(e,t){return _objectSpread(_objectSpread({},e),{},{[t.path]:c.A.bytesToHex(t.extendedKey.key)})}),{})})),function baseGetPrivateKeysHd(e){return n.apply(this,arguments)}),v.baseGetAddressesFromHd=(o=(0,a.A)((function*(e,t){var r=this,{curve:n,generateFrom:o}=t,{template:s,hdCredential:f,password:d,indexes:y}=e,{pathPrefix:h,pathSuffix:v}=(0,l.Ah)(s),b=y.map((function(e){return v.replace("{index}",e.toString())})),g="privateKey"===o,w=[],P=[];g?P=(0,p.Wu)(n,f,d,h,b):w=yield(0,p.MJ)({curveName:n,hdCredential:f,password:d,prefix:h,relPaths:b});var A=g?P:w;if(A.length!==y.length)throw new u.He("Unable to get publick key.");var m,C=yield Promise.all(A.map((m=(0,a.A)((function*(t){var n,o,{path:a,extendedKey:{key:s}}=t;if(g){var u=c.A.bytesToHex((0,p.Yc)(d,s));o=yield r.getAddressFromPrivate({networkInfo:e.networkInfo,privateKeyRaw:u,privateKeyInfo:t})}else n=s.toString("hex"),o=yield r.getAddressFromPublic({networkInfo:e.networkInfo,publicKey:n,publicKeyInfo:t});return i()({publicKey:n,path:a},o)})),function(e){return m.apply(this,arguments)})));return{addresses:C}})),function baseGetAddressesFromHd(e,t){return o.apply(this,arguments)}),v.baseGetCredentialsType=function baseGetCredentialsType({credentials:e}){if(e.hd&&e.imported)throw new u.He("getCredentialsType ERROR: hd and imported credentials can NOT both set.");if(e.hd)return f.ECoreCredentialType.hd;if(e.imported)return f.ECoreCredentialType.imported;throw new u.He("getCredentialsType ERROR: no credentials found")},v.baseGetDefaultPrivateKey=(d=(0,a.A)((function*(e){var t=yield this.getPrivateKeys(e),[r]=Object.values(t);return{privateKeyRaw:r}})),function baseGetDefaultPrivateKey(e){return d.apply(this,arguments)}),v.validateXpub=(y=(0,a.A)((function*(e){throw new u.MS})),function validateXpub(e){return y.apply(this,arguments)}),v.validateXprvt=(h=(0,a.A)((function*(e){throw new u.MS})),function validateXprvt(e){return h.apply(this,arguments)}),(0,s.A)(CoreChainApiBase)}()},806129:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>s});var n=r(230414),i=r(929296),o=r(195309),a=r(972715);function _createSuper(e){var t=_isNativeReflectConstruct();return function _createSuperInternal(){var r,n=(0,a.A)(e);if(t){var i=(0,a.A)(this).constructor;r=Reflect.construct(n,arguments,i)}else r=n.apply(this,arguments);return(0,o.A)(this,r)}}function _isNativeReflectConstruct(){try{var e=!Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){})))}catch(e){}return(_isNativeReflectConstruct=function(){return!!e})()}var s=function(e){(0,i.A)(CoreChainHd,e);var t=_createSuper(CoreChainHd);function CoreChainHd(){return t.apply(this,arguments)}return(0,n.A)(CoreChainHd)}(r(411736).A)},411736:(e,t,r)=>{"use strict";r.d(t,{A:()=>g});var n=r(324586),i=r(230414),o=r(929296),a=r(195309),s=r(972715),u=r(586330),c=r(89729),p=r(192594),f=r(401349),l=r(507140),d=r(606777),y=r(940916),h=r(404727),v=r(901048).Buffer;function ownKeys(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function _objectSpread(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?ownKeys(Object(r),!0).forEach((function(t){(0,n.A)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):ownKeys(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function _createSuper(e){var t=_isNativeReflectConstruct();return function _createSuperInternal(){var r,n=(0,s.A)(e);if(t){var i=(0,s.A)(this).constructor;r=Reflect.construct(n,arguments,i)}else r=n.apply(this,arguments);return(0,a.A)(this,r)}}function _isNativeReflectConstruct(){try{var e=!Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){})))}catch(e){}return(_isNativeReflectConstruct=function(){return!!e})()}var b="secp256k1";function _signTransaction(){return(_signTransaction=(0,u.A)((function*(e,t){var r=e.encodedTx,[n,i]=yield t.sign(v.from(r.txID,"hex")),o={encodedTx:e.encodedTx,txid:r.txID,rawTx:JSON.stringify(_objectSpread(_objectSpread({},r),{},{signature:[v.concat([n,v.from([i])]).toString("hex")]}))};return Promise.resolve(o)}))).apply(this,arguments)}var g=function(e){(0,o.A)(CoreChainSoftware,e);var t=_createSuper(CoreChainSoftware);function CoreChainSoftware(){return t.apply(this,arguments)}var r,n,a,s,y,g,w,P=CoreChainSoftware.prototype;return P.getExportedSecretKey=(r=(0,u.A)((function*(e){var{password:t,keyType:r,credentials:n}=e,{privateKeyRaw:i}=yield this.baseGetDefaultPrivateKey(e);if(!i)throw new Error("privateKeyRaw is required");if(r===h.ECoreApiExportedSecretKeyType.privateKey)return(0,f.Yc)(t,i).toString("hex");throw new Error(`SecretKey type not support: ${r}`)})),function getExportedSecretKey(e){return r.apply(this,arguments)}),P.getPrivateKeys=(n=(0,u.A)((function*(e){return this.baseGetPrivateKeys({payload:e,curve:b})})),function getPrivateKeys(e){return n.apply(this,arguments)}),P.signTransaction=(a=(0,u.A)((function*(e){var{unsignedTx:t}=e;return function _signTransaction2(e,t){return _signTransaction.apply(this,arguments)}(t,yield this.baseGetSingleSigner({payload:e,curve:b}))})),function signTransaction(e){return a.apply(this,arguments)}),P.signMessage=(s=(0,u.A)((function*(){throw new l.MS})),function signMessage(){return s.apply(this,arguments)}),P.getAddressFromPrivate=(y=(0,u.A)((function*(e){var{privateKeyRaw:t}=e,r=d.A.toBuffer(t),n=this.baseGetCurve(b).publicFromPrivate(r);return this.getAddressFromPublic({publicKey:d.A.bytesToHex(n),networkInfo:e.networkInfo})})),function getAddressFromPrivate(e){return y.apply(this,arguments)}),P.getAddressFromPublic=(g=(0,u.A)((function*(e){var{publicKey:t}=e,r=function publicKeyToAddress(e){var t=(0,f.sA)(b,v.from(e,"hex"));return p.Ay.utils.address.fromHex(`41${(0,c.keccak256)(t.slice(-64)).slice(-40)}`)}(t);return Promise.resolve({address:r,publicKey:t})})),function getAddressFromPublic(e){return g.apply(this,arguments)}),P.getAddressesFromHd=(w=(0,u.A)((function*(e){return this.baseGetAddressesFromHd(e,{curve:b})})),function getAddressesFromHd(e){return w.apply(this,arguments)}),(0,i.A)(CoreChainSoftware)}(y.G)},180556:(e,t,r)=>{"use strict";r.d(t,{Ac:()=>estimateTxSize,Ah:()=>slicePathTemplate,vN:()=>getUtxoAccountPrefixPath,zf:()=>getBIP44Path});var n=r(451661),i=r.n(n),o=r(491180);function slicePathTemplate(e){return o.A.slicePathTemplate(e)}function getUtxoAccountPrefixPath({fullPath:e}){var t=e.split("/");return t.pop(),t.pop(),t.join("/")}function getBIP44Path(e,t){var r="";for(var[n,i]of Object.entries(e.addresses))if(i===t){r=n;break}return`${e.path}/${r}`}function estimateTxSize(e,t){return i().transactionBytes(e,t)}}}]);
//# sourceMappingURL=6129.97d69779a4.chunk.js.map