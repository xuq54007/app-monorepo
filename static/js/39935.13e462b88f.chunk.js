!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},t=(new e.Error).stack;t&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[t]="b3cc4949-afab-4633-8514-783d13937dd4",e._sentryDebugIdIdentifier="sentry-dbid-b3cc4949-afab-4633-8514-783d13937dd4")}catch(e){}}();var _global="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{};_global.SENTRY_RELEASE={id:"5.5.0 (2024121652)"},(self.webpackChunkweb=self.webpackChunkweb||[]).push([[39935],{451661:e=>{var t=10,r=41,n=107,i=9,a=25,o=10;function inputBytes(e){return r+(e.script?e.script.length:n)}function outputBytes(e){return e.script?o+e.script.length+(e.script.length>=74?2:1):i+(e.script?e.script.length:a)}function dustThreshold(e,t){return inputBytes({})*t}function transactionBytes(e,r){return t+e.reduce((function(e,t){return e+inputBytes(t)}),0)+r.reduce((function(e,t){return e+outputBytes(t)}),0)}function uintOrNaN(e){return"number"!=typeof e?NaN:isFinite(e)?Math.floor(e)!==e||e<0?NaN:e:NaN}function sumOrNaN(e){return e.reduce((function(e,t){return e+uintOrNaN(t.value)}),0)}var s=outputBytes({});e.exports={dustThreshold,finalize:function finalize(e,t,r){var n=transactionBytes(e,t),i=r*(n+s),a=sumOrNaN(e)-(sumOrNaN(t)+i);a>dustThreshold(0,r)&&(t=t.concat({value:a}));var o=sumOrNaN(e)-sumOrNaN(t);return isFinite(o)?{inputs:e,outputs:t,fee:o}:{fee:r*n}},inputBytes,outputBytes,sumOrNaN,sumForgiving:function sumForgiving(e){return e.reduce((function(e,t){return e+(isFinite(t.value)?t.value:0)}),0)},transactionBytes,uintOrNaN}},940916:(e,t,r)=>{"use strict";r.d(t,{G:()=>b});var n=r(482451),i=r.n(n),a=r(324586),o=r(586330),s=r(230414),u=r(507140),c=r(606777),p=r(401349),f=r(404727),d=r(180556),l=r(929296),y=r(195309),h=r(972715),v=r(901048).Buffer;function _createSuper(e){var t=_isNativeReflectConstruct();return function _createSuperInternal(){var r,n=(0,h.A)(e);if(t){var i=(0,h.A)(this).constructor;r=Reflect.construct(n,arguments,i)}else r=n.apply(this,arguments);return(0,y.A)(this,r)}}function _isNativeReflectConstruct(){try{var e=!Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){})))}catch(e){}return(_isNativeReflectConstruct=function(){return!!e})()}var g=function(e){(0,l.A)(ChainSigner,e);var t=_createSuper(ChainSigner);function ChainSigner(e,r,n){var i,a=(0,p.N)(n,{key:e,chainCode:v.alloc(32)},r).key.toString("hex");return(i=t.call(this,a,n)).encryptedPrivateKey=e,i.password=r,i.curve=n,i}var r,n=ChainSigner.prototype;return n.getPrvkey=function getPrvkey(){return Promise.resolve((0,p.Yc)(this.password,this.encryptedPrivateKey))},n.getPrvkeyHex=(r=(0,o.A)((function*(){return c.A.bytesToHex(yield this.getPrvkey())})),function getPrvkeyHex(){return r.apply(this,arguments)}),n.sign=function sign(e){var t=(0,p._S)(this.curve,this.encryptedPrivateKey,e,this.password);return"secp256k1"===this.curve?Promise.resolve([t.slice(0,-1),t[t.length-1]]):Promise.resolve([t,0])},(0,s.A)(ChainSigner)}(function(){function Verifier(e,t){this.curve=t,this.compressedPublicKey=v.from(e,"hex"),this.uncompressedPublicKey=(0,p.sA)(t,this.compressedPublicKey)}var e,t=Verifier.prototype;return t.getPubkey=function getPubkey(e){return Promise.resolve(e?this.compressedPublicKey:this.uncompressedPublicKey)},t.getPubkeyHex=(e=(0,o.A)((function*(e){return c.A.bytesToHex(yield this.getPubkey(e))})),function getPubkeyHex(t){return e.apply(this,arguments)}),t.verify=function verify(){return Promise.resolve(v.from([]))},t.verifySignature=function verifySignature({publicKey:e,digest:t,signature:r}){var n=c.A.toBuffer(e),i=c.A.toBuffer(t),a=c.A.toBuffer(r),{curve:o}=this,s=(0,p.MX)(o,n,i,a);return Promise.resolve(s)},(0,s.A)(Verifier)}());function ownKeys(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function _objectSpread(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?ownKeys(Object(r),!0).forEach((function(t){(0,a.A)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):ownKeys(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var b=function(){function CoreChainApiBase(){}var e,t,r,n,a,l,y,h,v=CoreChainApiBase.prototype;return v.baseGetCurve=function baseGetCurve(e){switch(e){case"ed25519":return p.ev;case"secp256k1":return p.bI;case"nistp256":return p.OX;default:throw new u.He("Unsupported curve")}},v.baseCreateSigner=(e=(0,o.A)((function*({curve:e,privateKey:t,password:r}){if(void 0===r)throw new u.He("Software signing requires a password.");var n=c.A.toBuffer(t);return Promise.resolve(new g(n,r,e))})),function baseCreateSigner(t){return e.apply(this,arguments)}),v.baseGetSingleSigner=(t=(0,o.A)((function*({payload:e,curve:t}){var r=yield this.getPrivateKeys(e),n=e.account.path,i=r[n],a=e?.relPaths?.[0];if(!i&&a&&(i=r[[n,a].join("/")]),!i)throw new Error(`No private key found: ${n}`);return this.baseCreateSigner({curve:t,privateKey:i,password:e.password})})),function baseGetSingleSigner(e){return t.apply(this,arguments)}),v.baseGetPrivateKeys=(r=(0,o.A)((function*({payload:e,curve:t}){var{credentials:r,account:n,password:i,relPaths:a}=e,o={};if(r.hd&&r.imported)throw new u.He("getPrivateKeys ERROR: hd and imported credentials can NOT both set.");if(r.hd&&(o=yield this.baseGetPrivateKeysHd({curve:t,account:n,hdCredential:r.hd,password:i,relPaths:a})),r.imported){var{privateKey:s}=(0,p.VV)({password:i,credential:r.imported}),f=c.A.bytesToHex((0,p.w)(i,s));o[n.path]=f,o[""]=f}if(!Object.keys(o).length)throw new Error("No private keys found");return o})),function baseGetPrivateKeys(e){return r.apply(this,arguments)}),v.baseGetPrivateKeysHd=(n=(0,o.A)((function*({curve:e,password:t,account:r,relPaths:n,hdCredential:i}){var{path:a}=r,o=a.split("/"),s=n||[o.pop()],f=o.join("/");if(0===s.length)throw new u.He("getPrivateKeysHd ERROR: relPaths is empty.");return(0,p.Wu)(e,i,t,f,s).reduce((function(e,t){return _objectSpread(_objectSpread({},e),{},{[t.path]:c.A.bytesToHex(t.extendedKey.key)})}),{})})),function baseGetPrivateKeysHd(e){return n.apply(this,arguments)}),v.baseGetAddressesFromHd=(a=(0,o.A)((function*(e,t){var r=this,{curve:n,generateFrom:a}=t,{template:s,hdCredential:f,password:l,indexes:y}=e,{pathPrefix:h,pathSuffix:v}=(0,d.Ah)(s),g=y.map((function(e){return v.replace("{index}",e.toString())})),b="privateKey"===a,w=[],P=[];b?P=(0,p.Wu)(n,f,l,h,g):w=yield(0,p.MJ)({curveName:n,hdCredential:f,password:l,prefix:h,relPaths:g});var A=b?P:w;if(A.length!==y.length)throw new u.He("Unable to get publick key.");var m,S=yield Promise.all(A.map((m=(0,o.A)((function*(t){var n,a,{path:o,extendedKey:{key:s}}=t;if(b){var u=c.A.bytesToHex((0,p.Yc)(l,s));a=yield r.getAddressFromPrivate({networkInfo:e.networkInfo,privateKeyRaw:u,privateKeyInfo:t})}else n=s.toString("hex"),a=yield r.getAddressFromPublic({networkInfo:e.networkInfo,publicKey:n,publicKeyInfo:t});return i()({publicKey:n,path:o},a)})),function(e){return m.apply(this,arguments)})));return{addresses:S}})),function baseGetAddressesFromHd(e,t){return a.apply(this,arguments)}),v.baseGetCredentialsType=function baseGetCredentialsType({credentials:e}){if(e.hd&&e.imported)throw new u.He("getCredentialsType ERROR: hd and imported credentials can NOT both set.");if(e.hd)return f.ECoreCredentialType.hd;if(e.imported)return f.ECoreCredentialType.imported;throw new u.He("getCredentialsType ERROR: no credentials found")},v.baseGetDefaultPrivateKey=(l=(0,o.A)((function*(e){var t=yield this.getPrivateKeys(e),[r]=Object.values(t);return{privateKeyRaw:r}})),function baseGetDefaultPrivateKey(e){return l.apply(this,arguments)}),v.validateXpub=(y=(0,o.A)((function*(e){throw new u.MS})),function validateXpub(e){return y.apply(this,arguments)}),v.validateXprvt=(h=(0,o.A)((function*(e){throw new u.MS})),function validateXprvt(e){return h.apply(this,arguments)}),(0,s.A)(CoreChainApiBase)}()},639935:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>s});var n=r(230414),i=r(929296),a=r(195309),o=r(972715);function _createSuper(e){var t=_isNativeReflectConstruct();return function _createSuperInternal(){var r,n=(0,o.A)(e);if(t){var i=(0,o.A)(this).constructor;r=Reflect.construct(n,arguments,i)}else r=n.apply(this,arguments);return(0,a.A)(this,r)}}function _isNativeReflectConstruct(){try{var e=!Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){})))}catch(e){}return(_isNativeReflectConstruct=function(){return!!e})()}var s=function(e){(0,i.A)(CoreChainHd,e);var t=_createSuper(CoreChainHd);function CoreChainHd(){return t.apply(this,arguments)}return(0,n.A)(CoreChainHd)}(r(267658).A)},267658:(e,t,r)=>{"use strict";r.d(t,{A:()=>b});var n=r(230414),i=r(929296),a=r(195309),o=r(972715),s=r(586330),u=r(332858),c=r(930671),p=r(401349),f=r(507140),d=r(606777),l=r(424754),y=r(940916),h=r(404727),v=r(901048).Buffer;function _createSuper(e){var t=_isNativeReflectConstruct();return function _createSuperInternal(){var r,n=(0,o.A)(e);if(t){var i=(0,o.A)(this).constructor;r=Reflect.construct(n,arguments,i)}else r=n.apply(this,arguments);return(0,a.A)(this,r)}}function _isNativeReflectConstruct(){try{var e=!Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){})))}catch(e){}return(_isNativeReflectConstruct=function(){return!!e})()}var g="ed25519";function _buildSignedTx(){return(_buildSignedTx=(0,s.A)((function*(e,t,r,n){var i=new u.kN5(d.A.hexToBytes(r)),a=new u.hbh(new u.Gdf(d.A.hexToBytes(l.A.stripHexPrefix(t))),i),o=new u.ZjB(e.rawTransaction,a).bcsToHex();return Promise.resolve({txid:"",rawTx:o.toStringWithoutPrefix(),encodedTx:n})}))).apply(this,arguments)}var b=function(e){(0,i.A)(CoreChainSoftware,e);var t=_createSuper(CoreChainSoftware);function CoreChainSoftware(){return t.apply(this,arguments)}var r,a,o,y,b,w,P,A=CoreChainSoftware.prototype;return A.getExportedSecretKey=(r=(0,s.A)((function*(e){var{password:t,keyType:r,credentials:n}=e,{privateKeyRaw:i}=yield this.baseGetDefaultPrivateKey(e);if(!i)throw new Error("privateKeyRaw is required");if(r===h.ECoreApiExportedSecretKeyType.privateKey)return`0x${(0,p.Yc)(t,i).toString("hex")}`;throw new Error(`SecretKey type not support: ${r}`)})),function getExportedSecretKey(e){return r.apply(this,arguments)}),A.getPrivateKeys=(a=(0,s.A)((function*(e){return this.baseGetPrivateKeys({payload:e,curve:g})})),function getPrivateKeys(e){return a.apply(this,arguments)}),A.signTransaction=(o=(0,s.A)((function*(e){var{unsignedTx:t,account:r}=e,n=yield this.baseGetSingleSigner({payload:e,curve:g}),{rawTxUnsigned:i,encodedTx:a}=t;if(!i)throw new Error("rawTxUnsigned is undefined");var o=r.pub;if(!o)throw new f.He("Unable to get sender public key.");var s=u.po4.deserialize(new u.g6s(v.from(i,"hex"))),c=(0,u.LT1)(s),[p]=yield n.sign(d.A.toBuffer(c));return function buildSignedTx(e,t,r,n){return _buildSignedTx.apply(this,arguments)}(s,o,l.A.hexlify(p,{noPrefix:!0}),a)})),function signTransaction(e){return o.apply(this,arguments)}),A.signMessage=(y=(0,s.A)((function*(e){var t=e.unsignedMsg,r=yield this.baseGetSingleSigner({payload:e,curve:g}),[n]=yield r.sign(v.from(t.message));return l.A.addHexPrefix(n.toString("hex"))})),function signMessage(e){return y.apply(this,arguments)}),A.getAddressFromPublic=(b=(0,s.A)((function*(e){var{publicKey:t}=e,r=d.A.toBuffer(t),n=c.sha3_256.create();n.update(r),n.update("\0");var i=l.A.addHexPrefix(n.hex());return Promise.resolve({address:i,publicKey:t})})),function getAddressFromPublic(e){return b.apply(this,arguments)}),A.getAddressFromPrivate=(w=(0,s.A)((function*(e){var{privateKeyRaw:t}=e,r=d.A.toBuffer(t);if(32!==r.length)throw new f.He("Invalid private key.");var n=p.ev.publicFromPrivate(r);return this.getAddressFromPublic({publicKey:d.A.bytesToHex(n),networkInfo:e.networkInfo})})),function getAddressFromPrivate(e){return w.apply(this,arguments)}),A.getAddressesFromHd=(P=(0,s.A)((function*(e){return this.baseGetAddressesFromHd(e,{curve:g})})),function getAddressesFromHd(e){return P.apply(this,arguments)}),(0,n.A)(CoreChainSoftware)}(y.G)},180556:(e,t,r)=>{"use strict";r.d(t,{Ac:()=>estimateTxSize,Ah:()=>slicePathTemplate,vN:()=>getUtxoAccountPrefixPath,zf:()=>getBIP44Path});var n=r(451661),i=r.n(n),a=r(491180);function slicePathTemplate(e){return a.A.slicePathTemplate(e)}function getUtxoAccountPrefixPath({fullPath:e}){var t=e.split("/");return t.pop(),t.pop(),t.join("/")}function getBIP44Path(e,t){var r="";for(var[n,i]of Object.entries(e.addresses))if(i===t){r=n;break}return`${e.path}/${r}`}function estimateTxSize(e,t){return i().transactionBytes(e,t)}}}]);
//# sourceMappingURL=39935.13e462b88f.chunk.js.map