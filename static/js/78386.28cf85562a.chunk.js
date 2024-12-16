!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},t=(new e.Error).stack;t&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[t]="765ad56f-26ab-4c03-bccb-54095475cf1b",e._sentryDebugIdIdentifier="sentry-dbid-765ad56f-26ab-4c03-bccb-54095475cf1b")}catch(e){}}();var _global="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{};_global.SENTRY_RELEASE={id:"5.5.0 (2024121652)"},(self.webpackChunkweb=self.webpackChunkweb||[]).push([[78386],{451661:e=>{var t=10,r=41,n=107,i=9,o=25,s=10;function inputBytes(e){return r+(e.script?e.script.length:n)}function outputBytes(e){return e.script?s+e.script.length+(e.script.length>=74?2:1):i+(e.script?e.script.length:o)}function dustThreshold(e,t){return inputBytes({})*t}function transactionBytes(e,r){return t+e.reduce((function(e,t){return e+inputBytes(t)}),0)+r.reduce((function(e,t){return e+outputBytes(t)}),0)}function uintOrNaN(e){return"number"!=typeof e?NaN:isFinite(e)?Math.floor(e)!==e||e<0?NaN:e:NaN}function sumOrNaN(e){return e.reduce((function(e,t){return e+uintOrNaN(t.value)}),0)}var a=outputBytes({});e.exports={dustThreshold,finalize:function finalize(e,t,r){var n=transactionBytes(e,t),i=r*(n+a),o=sumOrNaN(e)-(sumOrNaN(t)+i);o>dustThreshold(0,r)&&(t=t.concat({value:o}));var s=sumOrNaN(e)-sumOrNaN(t);return isFinite(s)?{inputs:e,outputs:t,fee:s}:{fee:r*n}},inputBytes,outputBytes,sumOrNaN,sumForgiving:function sumForgiving(e){return e.reduce((function(e,t){return e+(isFinite(t.value)?t.value:0)}),0)},transactionBytes,uintOrNaN}},940916:(e,t,r)=>{"use strict";r.d(t,{G:()=>g});var n=r(482451),i=r.n(n),o=r(324586),s=r(586330),a=r(230414),u=r(507140),c=r(606777),p=r(401349),f=r(404727),d=r(180556),l=r(929296),y=r(195309),v=r(972715),h=r(901048).Buffer;function _createSuper(e){var t=_isNativeReflectConstruct();return function _createSuperInternal(){var r,n=(0,v.A)(e);if(t){var i=(0,v.A)(this).constructor;r=Reflect.construct(n,arguments,i)}else r=n.apply(this,arguments);return(0,y.A)(this,r)}}function _isNativeReflectConstruct(){try{var e=!Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){})))}catch(e){}return(_isNativeReflectConstruct=function(){return!!e})()}var b=function(e){(0,l.A)(ChainSigner,e);var t=_createSuper(ChainSigner);function ChainSigner(e,r,n){var i,o=(0,p.N)(n,{key:e,chainCode:h.alloc(32)},r).key.toString("hex");return(i=t.call(this,o,n)).encryptedPrivateKey=e,i.password=r,i.curve=n,i}var r,n=ChainSigner.prototype;return n.getPrvkey=function getPrvkey(){return Promise.resolve((0,p.Yc)(this.password,this.encryptedPrivateKey))},n.getPrvkeyHex=(r=(0,s.A)((function*(){return c.A.bytesToHex(yield this.getPrvkey())})),function getPrvkeyHex(){return r.apply(this,arguments)}),n.sign=function sign(e){var t=(0,p._S)(this.curve,this.encryptedPrivateKey,e,this.password);return"secp256k1"===this.curve?Promise.resolve([t.slice(0,-1),t[t.length-1]]):Promise.resolve([t,0])},(0,a.A)(ChainSigner)}(function(){function Verifier(e,t){this.curve=t,this.compressedPublicKey=h.from(e,"hex"),this.uncompressedPublicKey=(0,p.sA)(t,this.compressedPublicKey)}var e,t=Verifier.prototype;return t.getPubkey=function getPubkey(e){return Promise.resolve(e?this.compressedPublicKey:this.uncompressedPublicKey)},t.getPubkeyHex=(e=(0,s.A)((function*(e){return c.A.bytesToHex(yield this.getPubkey(e))})),function getPubkeyHex(t){return e.apply(this,arguments)}),t.verify=function verify(){return Promise.resolve(h.from([]))},t.verifySignature=function verifySignature({publicKey:e,digest:t,signature:r}){var n=c.A.toBuffer(e),i=c.A.toBuffer(t),o=c.A.toBuffer(r),{curve:s}=this,a=(0,p.MX)(s,n,i,o);return Promise.resolve(a)},(0,a.A)(Verifier)}());function ownKeys(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function _objectSpread(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?ownKeys(Object(r),!0).forEach((function(t){(0,o.A)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):ownKeys(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var g=function(){function CoreChainApiBase(){}var e,t,r,n,o,l,y,v,h=CoreChainApiBase.prototype;return h.baseGetCurve=function baseGetCurve(e){switch(e){case"ed25519":return p.ev;case"secp256k1":return p.bI;case"nistp256":return p.OX;default:throw new u.He("Unsupported curve")}},h.baseCreateSigner=(e=(0,s.A)((function*({curve:e,privateKey:t,password:r}){if(void 0===r)throw new u.He("Software signing requires a password.");var n=c.A.toBuffer(t);return Promise.resolve(new b(n,r,e))})),function baseCreateSigner(t){return e.apply(this,arguments)}),h.baseGetSingleSigner=(t=(0,s.A)((function*({payload:e,curve:t}){var r=yield this.getPrivateKeys(e),n=e.account.path,i=r[n],o=e?.relPaths?.[0];if(!i&&o&&(i=r[[n,o].join("/")]),!i)throw new Error(`No private key found: ${n}`);return this.baseCreateSigner({curve:t,privateKey:i,password:e.password})})),function baseGetSingleSigner(e){return t.apply(this,arguments)}),h.baseGetPrivateKeys=(r=(0,s.A)((function*({payload:e,curve:t}){var{credentials:r,account:n,password:i,relPaths:o}=e,s={};if(r.hd&&r.imported)throw new u.He("getPrivateKeys ERROR: hd and imported credentials can NOT both set.");if(r.hd&&(s=yield this.baseGetPrivateKeysHd({curve:t,account:n,hdCredential:r.hd,password:i,relPaths:o})),r.imported){var{privateKey:a}=(0,p.VV)({password:i,credential:r.imported}),f=c.A.bytesToHex((0,p.w)(i,a));s[n.path]=f,s[""]=f}if(!Object.keys(s).length)throw new Error("No private keys found");return s})),function baseGetPrivateKeys(e){return r.apply(this,arguments)}),h.baseGetPrivateKeysHd=(n=(0,s.A)((function*({curve:e,password:t,account:r,relPaths:n,hdCredential:i}){var{path:o}=r,s=o.split("/"),a=n||[s.pop()],f=s.join("/");if(0===a.length)throw new u.He("getPrivateKeysHd ERROR: relPaths is empty.");return(0,p.Wu)(e,i,t,f,a).reduce((function(e,t){return _objectSpread(_objectSpread({},e),{},{[t.path]:c.A.bytesToHex(t.extendedKey.key)})}),{})})),function baseGetPrivateKeysHd(e){return n.apply(this,arguments)}),h.baseGetAddressesFromHd=(o=(0,s.A)((function*(e,t){var r=this,{curve:n,generateFrom:o}=t,{template:a,hdCredential:f,password:l,indexes:y}=e,{pathPrefix:v,pathSuffix:h}=(0,d.Ah)(a),b=y.map((function(e){return h.replace("{index}",e.toString())})),g="privateKey"===o,w=[],P=[];g?P=(0,p.Wu)(n,f,l,v,b):w=yield(0,p.MJ)({curveName:n,hdCredential:f,password:l,prefix:v,relPaths:b});var A=g?P:w;if(A.length!==y.length)throw new u.He("Unable to get publick key.");var m,S=yield Promise.all(A.map((m=(0,s.A)((function*(t){var n,o,{path:s,extendedKey:{key:a}}=t;if(g){var u=c.A.bytesToHex((0,p.Yc)(l,a));o=yield r.getAddressFromPrivate({networkInfo:e.networkInfo,privateKeyRaw:u,privateKeyInfo:t})}else n=a.toString("hex"),o=yield r.getAddressFromPublic({networkInfo:e.networkInfo,publicKey:n,publicKeyInfo:t});return i()({publicKey:n,path:s},o)})),function(e){return m.apply(this,arguments)})));return{addresses:S}})),function baseGetAddressesFromHd(e,t){return o.apply(this,arguments)}),h.baseGetCredentialsType=function baseGetCredentialsType({credentials:e}){if(e.hd&&e.imported)throw new u.He("getCredentialsType ERROR: hd and imported credentials can NOT both set.");if(e.hd)return f.ECoreCredentialType.hd;if(e.imported)return f.ECoreCredentialType.imported;throw new u.He("getCredentialsType ERROR: no credentials found")},h.baseGetDefaultPrivateKey=(l=(0,s.A)((function*(e){var t=yield this.getPrivateKeys(e),[r]=Object.values(t);return{privateKeyRaw:r}})),function baseGetDefaultPrivateKey(e){return l.apply(this,arguments)}),h.validateXpub=(y=(0,s.A)((function*(e){throw new u.MS})),function validateXpub(e){return y.apply(this,arguments)}),h.validateXprvt=(v=(0,s.A)((function*(e){throw new u.MS})),function validateXprvt(e){return v.apply(this,arguments)}),(0,a.A)(CoreChainApiBase)}()},278386:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>a});var n=r(230414),i=r(929296),o=r(195309),s=r(972715);function _createSuper(e){var t=_isNativeReflectConstruct();return function _createSuperInternal(){var r,n=(0,s.A)(e);if(t){var i=(0,s.A)(this).constructor;r=Reflect.construct(n,arguments,i)}else r=n.apply(this,arguments);return(0,o.A)(this,r)}}function _isNativeReflectConstruct(){try{var e=!Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){})))}catch(e){}return(_isNativeReflectConstruct=function(){return!!e})()}var a=function(e){(0,i.A)(CoreChainImported,e);var t=_createSuper(CoreChainImported);function CoreChainImported(){return t.apply(this,arguments)}return(0,n.A)(CoreChainImported)}(r(980403).A)},980403:(e,t,r)=>{"use strict";r.d(t,{A:()=>w});var n=r(324586),i=r(586330),o=r(230414),s=r(929296),a=r(195309),u=r(972715),c=r(552001),p=r(507140),f=r(606777),d=r(424754),l=r(940916),y=r(401349),v=r(404727),h=r(266655),b=r(901048).Buffer;function ownKeys(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function _objectSpread(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?ownKeys(Object(r),!0).forEach((function(t){(0,n.A)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):ownKeys(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function _createSuper(e){var t=_isNativeReflectConstruct();return function _createSuperInternal(){var r,n=(0,u.A)(e);if(t){var i=(0,u.A)(this).constructor;r=Reflect.construct(n,arguments,i)}else r=n.apply(this,arguments);return(0,a.A)(this,r)}}function _isNativeReflectConstruct(){try{var e=!Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){})))}catch(e){}return(_isNativeReflectConstruct=function(){return!!e})()}var g="secp256k1",w=function(e){(0,s.A)(CoreChainSoftware,e);var t=_createSuper(CoreChainSoftware);function CoreChainSoftware(){return t.apply(this,arguments)}var r,n,a,u,l,w,P,A=CoreChainSoftware.prototype;return A.getExportedSecretKey=(r=(0,i.A)((function*(e){var{password:t,keyType:r,credentials:n}=e,{privateKeyRaw:i}=yield this.baseGetDefaultPrivateKey(e);if(!i)throw new Error("privateKeyRaw is required");if(r===v.ECoreApiExportedSecretKeyType.privateKey)return`0x${(0,y.Yc)(t,i).toString("hex")}`;throw new Error(`SecretKey type not support: ${r}`)})),function getExportedSecretKey(e){return r.apply(this,arguments)}),A.getPrivateKeys=(n=(0,i.A)((function*(e){return this.baseGetPrivateKeys({payload:e,curve:g})})),function getPrivateKeys(e){return n.apply(this,arguments)}),A.signTransaction=(a=(0,i.A)((function*(e){var{unsignedTx:t}=e,r=yield this.baseGetSingleSigner({payload:e,curve:g}),n=t.encodedTx,i=new h.kQ(n.signDoc,n.msg),o=f.A.toBuffer((0,c.s)((0,h.O5)(i))),[s]=yield r.sign(o),a=yield r.getPubkeyHex(!0);if(!a)throw new p.He("Unable to get sender public key.");var u=(0,h.b1)({txWrapper:i,signature:{signatures:[s]},publicKey:{pubKey:a}});return{encodedTx:t.encodedTx,txid:"",rawTx:b.from(u).toString("base64")}})),function signTransaction(e){return a.apply(this,arguments)}),A.signMessage=(u=(0,i.A)((function*(e){var{data:t,signer:r}=JSON.parse(e.unsignedMsg.message),[n]=b.from(t).toString("base64"),i=(0,h.My)(r,n),o=h.kQ.fromAminoSignDoc(i,void 0),{rawTx:s}=yield this.signTransaction(_objectSpread(_objectSpread({},e),{},{unsignedTx:{encodedTx:o}}));return s})),function signMessage(e){return u.apply(this,arguments)}),A.getAddressFromPrivate=(l=(0,i.A)((function*(e){var{privateKeyRaw:t}=e;if(!d.A.isHexString(t))throw new Error("Invalid private key.");var r=f.A.toBuffer(t),n=this.baseGetCurve(g).publicFromPrivate(r);return this.getAddressFromPublic({publicKey:f.A.bytesToHex(n),networkInfo:e.networkInfo})})),function getAddressFromPrivate(e){return l.apply(this,arguments)}),A.getAddressFromPublic=(w=(0,i.A)((function*(e){var{publicKey:t,networkInfo:r}=e,{baseAddress:n,address:i}=(0,h.Ho)({curve:g,publicKey:t,addressPrefix:r?.addressPrefix});return Promise.resolve({address:"",addresses:{[r.networkId]:i},publicKey:t})})),function getAddressFromPublic(e){return w.apply(this,arguments)}),A.getAddressesFromHd=(P=(0,i.A)((function*(e){return this.baseGetAddressesFromHd(e,{curve:g,generateFrom:"publicKey"})})),function getAddressesFromHd(e){return P.apply(this,arguments)}),(0,o.A)(CoreChainSoftware)}(l.G)},180556:(e,t,r)=>{"use strict";r.d(t,{Ac:()=>estimateTxSize,Ah:()=>slicePathTemplate,vN:()=>getUtxoAccountPrefixPath,zf:()=>getBIP44Path});var n=r(451661),i=r.n(n),o=r(491180);function slicePathTemplate(e){return o.A.slicePathTemplate(e)}function getUtxoAccountPrefixPath({fullPath:e}){var t=e.split("/");return t.pop(),t.pop(),t.join("/")}function getBIP44Path(e,t){var r="";for(var[n,i]of Object.entries(e.addresses))if(i===t){r=n;break}return`${e.path}/${r}`}function estimateTxSize(e,t){return i().transactionBytes(e,t)}}}]);
//# sourceMappingURL=78386.28cf85562a.chunk.js.map