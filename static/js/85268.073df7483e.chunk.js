!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},t=(new e.Error).stack;t&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[t]="43eee17e-bb1a-4a4d-9653-2e976be6f8d2",e._sentryDebugIdIdentifier="sentry-dbid-43eee17e-bb1a-4a4d-9653-2e976be6f8d2")}catch(e){}}();var _global="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{};_global.SENTRY_RELEASE={id:"5.5.0 (2024121652)"},(self.webpackChunkweb=self.webpackChunkweb||[]).push([[85268],{451661:e=>{var t=10,r=41,n=107,i=9,a=25,s=10;function inputBytes(e){return r+(e.script?e.script.length:n)}function outputBytes(e){return e.script?s+e.script.length+(e.script.length>=74?2:1):i+(e.script?e.script.length:a)}function dustThreshold(e,t){return inputBytes({})*t}function transactionBytes(e,r){return t+e.reduce((function(e,t){return e+inputBytes(t)}),0)+r.reduce((function(e,t){return e+outputBytes(t)}),0)}function uintOrNaN(e){return"number"!=typeof e?NaN:isFinite(e)?Math.floor(e)!==e||e<0?NaN:e:NaN}function sumOrNaN(e){return e.reduce((function(e,t){return e+uintOrNaN(t.value)}),0)}var o=outputBytes({});e.exports={dustThreshold,finalize:function finalize(e,t,r){var n=transactionBytes(e,t),i=r*(n+o),a=sumOrNaN(e)-(sumOrNaN(t)+i);a>dustThreshold(0,r)&&(t=t.concat({value:a}));var s=sumOrNaN(e)-sumOrNaN(t);return isFinite(s)?{inputs:e,outputs:t,fee:s}:{fee:r*n}},inputBytes,outputBytes,sumOrNaN,sumForgiving:function sumForgiving(e){return e.reduce((function(e,t){return e+(isFinite(t.value)?t.value:0)}),0)},transactionBytes,uintOrNaN}},940916:(e,t,r)=>{"use strict";r.d(t,{G:()=>b});var n=r(482451),i=r.n(n),a=r(324586),s=r(586330),o=r(230414),u=r(507140),c=r(606777),p=r(401349),f=r(404727),l=r(180556),d=r(929296),y=r(195309),v=r(972715),h=r(901048).Buffer;function _createSuper(e){var t=_isNativeReflectConstruct();return function _createSuperInternal(){var r,n=(0,v.A)(e);if(t){var i=(0,v.A)(this).constructor;r=Reflect.construct(n,arguments,i)}else r=n.apply(this,arguments);return(0,y.A)(this,r)}}function _isNativeReflectConstruct(){try{var e=!Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){})))}catch(e){}return(_isNativeReflectConstruct=function(){return!!e})()}var g=function(e){(0,d.A)(ChainSigner,e);var t=_createSuper(ChainSigner);function ChainSigner(e,r,n){var i,a=(0,p.N)(n,{key:e,chainCode:h.alloc(32)},r).key.toString("hex");return(i=t.call(this,a,n)).encryptedPrivateKey=e,i.password=r,i.curve=n,i}var r,n=ChainSigner.prototype;return n.getPrvkey=function getPrvkey(){return Promise.resolve((0,p.Yc)(this.password,this.encryptedPrivateKey))},n.getPrvkeyHex=(r=(0,s.A)((function*(){return c.A.bytesToHex(yield this.getPrvkey())})),function getPrvkeyHex(){return r.apply(this,arguments)}),n.sign=function sign(e){var t=(0,p._S)(this.curve,this.encryptedPrivateKey,e,this.password);return"secp256k1"===this.curve?Promise.resolve([t.slice(0,-1),t[t.length-1]]):Promise.resolve([t,0])},(0,o.A)(ChainSigner)}(function(){function Verifier(e,t){this.curve=t,this.compressedPublicKey=h.from(e,"hex"),this.uncompressedPublicKey=(0,p.sA)(t,this.compressedPublicKey)}var e,t=Verifier.prototype;return t.getPubkey=function getPubkey(e){return Promise.resolve(e?this.compressedPublicKey:this.uncompressedPublicKey)},t.getPubkeyHex=(e=(0,s.A)((function*(e){return c.A.bytesToHex(yield this.getPubkey(e))})),function getPubkeyHex(t){return e.apply(this,arguments)}),t.verify=function verify(){return Promise.resolve(h.from([]))},t.verifySignature=function verifySignature({publicKey:e,digest:t,signature:r}){var n=c.A.toBuffer(e),i=c.A.toBuffer(t),a=c.A.toBuffer(r),{curve:s}=this,o=(0,p.MX)(s,n,i,a);return Promise.resolve(o)},(0,o.A)(Verifier)}());function ownKeys(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function _objectSpread(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?ownKeys(Object(r),!0).forEach((function(t){(0,a.A)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):ownKeys(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var b=function(){function CoreChainApiBase(){}var e,t,r,n,a,d,y,v,h=CoreChainApiBase.prototype;return h.baseGetCurve=function baseGetCurve(e){switch(e){case"ed25519":return p.ev;case"secp256k1":return p.bI;case"nistp256":return p.OX;default:throw new u.He("Unsupported curve")}},h.baseCreateSigner=(e=(0,s.A)((function*({curve:e,privateKey:t,password:r}){if(void 0===r)throw new u.He("Software signing requires a password.");var n=c.A.toBuffer(t);return Promise.resolve(new g(n,r,e))})),function baseCreateSigner(t){return e.apply(this,arguments)}),h.baseGetSingleSigner=(t=(0,s.A)((function*({payload:e,curve:t}){var r=yield this.getPrivateKeys(e),n=e.account.path,i=r[n],a=e?.relPaths?.[0];if(!i&&a&&(i=r[[n,a].join("/")]),!i)throw new Error(`No private key found: ${n}`);return this.baseCreateSigner({curve:t,privateKey:i,password:e.password})})),function baseGetSingleSigner(e){return t.apply(this,arguments)}),h.baseGetPrivateKeys=(r=(0,s.A)((function*({payload:e,curve:t}){var{credentials:r,account:n,password:i,relPaths:a}=e,s={};if(r.hd&&r.imported)throw new u.He("getPrivateKeys ERROR: hd and imported credentials can NOT both set.");if(r.hd&&(s=yield this.baseGetPrivateKeysHd({curve:t,account:n,hdCredential:r.hd,password:i,relPaths:a})),r.imported){var{privateKey:o}=(0,p.VV)({password:i,credential:r.imported}),f=c.A.bytesToHex((0,p.w)(i,o));s[n.path]=f,s[""]=f}if(!Object.keys(s).length)throw new Error("No private keys found");return s})),function baseGetPrivateKeys(e){return r.apply(this,arguments)}),h.baseGetPrivateKeysHd=(n=(0,s.A)((function*({curve:e,password:t,account:r,relPaths:n,hdCredential:i}){var{path:a}=r,s=a.split("/"),o=n||[s.pop()],f=s.join("/");if(0===o.length)throw new u.He("getPrivateKeysHd ERROR: relPaths is empty.");return(0,p.Wu)(e,i,t,f,o).reduce((function(e,t){return _objectSpread(_objectSpread({},e),{},{[t.path]:c.A.bytesToHex(t.extendedKey.key)})}),{})})),function baseGetPrivateKeysHd(e){return n.apply(this,arguments)}),h.baseGetAddressesFromHd=(a=(0,s.A)((function*(e,t){var r=this,{curve:n,generateFrom:a}=t,{template:o,hdCredential:f,password:d,indexes:y}=e,{pathPrefix:v,pathSuffix:h}=(0,l.Ah)(o),g=y.map((function(e){return h.replace("{index}",e.toString())})),b="privateKey"===a,w=[],P=[];b?P=(0,p.Wu)(n,f,d,v,g):w=yield(0,p.MJ)({curveName:n,hdCredential:f,password:d,prefix:v,relPaths:g});var A=b?P:w;if(A.length!==y.length)throw new u.He("Unable to get publick key.");var m,S=yield Promise.all(A.map((m=(0,s.A)((function*(t){var n,a,{path:s,extendedKey:{key:o}}=t;if(b){var u=c.A.bytesToHex((0,p.Yc)(d,o));a=yield r.getAddressFromPrivate({networkInfo:e.networkInfo,privateKeyRaw:u,privateKeyInfo:t})}else n=o.toString("hex"),a=yield r.getAddressFromPublic({networkInfo:e.networkInfo,publicKey:n,publicKeyInfo:t});return i()({publicKey:n,path:s},a)})),function(e){return m.apply(this,arguments)})));return{addresses:S}})),function baseGetAddressesFromHd(e,t){return a.apply(this,arguments)}),h.baseGetCredentialsType=function baseGetCredentialsType({credentials:e}){if(e.hd&&e.imported)throw new u.He("getCredentialsType ERROR: hd and imported credentials can NOT both set.");if(e.hd)return f.ECoreCredentialType.hd;if(e.imported)return f.ECoreCredentialType.imported;throw new u.He("getCredentialsType ERROR: no credentials found")},h.baseGetDefaultPrivateKey=(d=(0,s.A)((function*(e){var t=yield this.getPrivateKeys(e),[r]=Object.values(t);return{privateKeyRaw:r}})),function baseGetDefaultPrivateKey(e){return d.apply(this,arguments)}),h.validateXpub=(y=(0,s.A)((function*(e){throw new u.MS})),function validateXpub(e){return y.apply(this,arguments)}),h.validateXprvt=(v=(0,s.A)((function*(e){throw new u.MS})),function validateXprvt(e){return v.apply(this,arguments)}),(0,o.A)(CoreChainApiBase)}()},385268:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>o});var n=r(230414),i=r(929296),a=r(195309),s=r(972715);function _createSuper(e){var t=_isNativeReflectConstruct();return function _createSuperInternal(){var r,n=(0,s.A)(e);if(t){var i=(0,s.A)(this).constructor;r=Reflect.construct(n,arguments,i)}else r=n.apply(this,arguments);return(0,a.A)(this,r)}}function _isNativeReflectConstruct(){try{var e=!Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){})))}catch(e){}return(_isNativeReflectConstruct=function(){return!!e})()}var o=function(e){(0,i.A)(CoreChainImported,e);var t=_createSuper(CoreChainImported);function CoreChainImported(){return t.apply(this,arguments)}return(0,n.A)(CoreChainImported)}(r(900393).A)},900393:(e,t,r)=>{"use strict";r.d(t,{A:()=>y});var n=r(586330),i=r(230414),a=r(929296),s=r(195309),o=r(972715),u=r(606777),c=r(940916),p=r(401349),f=r(404727),l=r(722095);function _createSuper(e){var t=_isNativeReflectConstruct();return function _createSuperInternal(){var r,n=(0,o.A)(e);if(t){var i=(0,o.A)(this).constructor;r=Reflect.construct(n,arguments,i)}else r=n.apply(this,arguments);return(0,s.A)(this,r)}}function _isNativeReflectConstruct(){try{var e=!Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){})))}catch(e){}return(_isNativeReflectConstruct=function(){return!!e})()}var d="secp256k1",y=function(e){(0,a.A)(CoreChainSoftware,e);var t=_createSuper(CoreChainSoftware);function CoreChainSoftware(){return t.apply(this,arguments)}var r,s,o,c,y,v,h,g,b,w=CoreChainSoftware.prototype;return w.getExportedSecretKey=(r=(0,n.A)((function*(e){var{password:t,keyType:r,credentials:n}=e,{privateKeyRaw:i}=yield this.baseGetDefaultPrivateKey(e);if(!i)throw new Error("privateKeyRaw is required");if(r===f.ECoreApiExportedSecretKeyType.privateKey){var a=(0,p.Yc)(t,i);return(0,l._R)(a)}throw new Error(`SecretKey type not support: ${r}`)})),function getExportedSecretKey(e){return r.apply(this,arguments)}),w.getPrivateKeys=(s=(0,n.A)((function*(e){return this.baseGetPrivateKeys({payload:e,curve:d})})),function getPrivateKeys(e){return s.apply(this,arguments)}),w.signTransaction=(o=(0,n.A)((function*(e){var{unsignedTx:t}=e,r=yield this.baseGetSingleSigner({payload:e,curve:d}),n=(yield r.getPrvkey()).toString("hex"),{event:i}=t.encodedTx,a=(0,l.a2)(i,n);i.sig=a;var s=JSON.stringify(i);return{encodedTx:t.encodedTx,txid:"",rawTx:s}})),function signTransaction(e){return o.apply(this,arguments)}),w.signMessage=(c=(0,n.A)((function*(e){var t=e.unsignedMsg,r=yield this.baseGetSingleSigner({payload:e,curve:d}),n=(yield r.getPrvkey()).toString("hex");return(0,l.V0)(n,t.message)})),function signMessage(e){return c.apply(this,arguments)}),w.getAddressFromPrivate=(y=(0,n.A)((function*(e){var{privateKeyRaw:t}=e,r=u.A.toBuffer(t),n=this.baseGetCurve(d).publicFromPrivate(r);return this.getAddressFromPublic({publicKey:u.A.bytesToHex(n),networkInfo:e.networkInfo})})),function getAddressFromPrivate(e){return y.apply(this,arguments)}),w.getAddressFromPublic=(v=(0,n.A)((function*(e){var{publicKey:t}=e,r=u.A.toBuffer(t,"hex").slice(1,33),n=u.A.bytesToHex(r),i=(0,l.Qz)(n);return Promise.resolve({address:i,publicKey:n})})),function getAddressFromPublic(e){return v.apply(this,arguments)}),w.getAddressesFromHd=(h=(0,n.A)((function*(e){return this.baseGetAddressesFromHd(e,{curve:d})})),function getAddressesFromHd(e){return h.apply(this,arguments)}),w.encrypt=(g=(0,n.A)((function*(e){var t=yield this.baseGetSingleSigner({payload:e,curve:d}),r=(yield t.getPrvkey()).toString("hex");return(0,l.w)(r,e.data.pubkey,e.data.plaintext)})),function encrypt(e){return g.apply(this,arguments)}),w.decrypt=(b=(0,n.A)((function*(e){var t=yield this.baseGetSingleSigner({payload:e,curve:d}),r=(yield t.getPrvkey()).toString("hex");return(0,l.Yc)(r,e.data.pubkey,e.data.ciphertext)})),function decrypt(e){return b.apply(this,arguments)}),(0,i.A)(CoreChainSoftware)}(c.G)},180556:(e,t,r)=>{"use strict";r.d(t,{Ac:()=>estimateTxSize,Ah:()=>slicePathTemplate,vN:()=>getUtxoAccountPrefixPath,zf:()=>getBIP44Path});var n=r(451661),i=r.n(n),a=r(491180);function slicePathTemplate(e){return a.A.slicePathTemplate(e)}function getUtxoAccountPrefixPath({fullPath:e}){var t=e.split("/");return t.pop(),t.pop(),t.join("/")}function getBIP44Path(e,t){var r="";for(var[n,i]of Object.entries(e.addresses))if(i===t){r=n;break}return`${e.path}/${r}`}function estimateTxSize(e,t){return i().transactionBytes(e,t)}}}]);
//# sourceMappingURL=85268.073df7483e.chunk.js.map