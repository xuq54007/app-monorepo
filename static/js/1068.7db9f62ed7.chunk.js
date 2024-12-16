!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},t=(new e.Error).stack;t&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[t]="13d76b85-a856-4c6e-b9fc-2b1be6725609",e._sentryDebugIdIdentifier="sentry-dbid-13d76b85-a856-4c6e-b9fc-2b1be6725609")}catch(e){}}();var _global="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{};_global.SENTRY_RELEASE={id:"5.5.0 (2024121652)"},(self.webpackChunkweb=self.webpackChunkweb||[]).push([[1068],{940916:(e,t,r)=>{r.d(t,{G:()=>b});var n=r(482451),i=r.n(n),a=r(324586),o=r(586330),s=r(230414),u=r(507140),c=r(606777),p=r(401349),f=r(404727),l=r(180556),d=r(929296),y=r(195309),v=r(972715),h=r(901048).Buffer;function _createSuper(e){var t=_isNativeReflectConstruct();return function _createSuperInternal(){var r,n=(0,v.A)(e);if(t){var i=(0,v.A)(this).constructor;r=Reflect.construct(n,arguments,i)}else r=n.apply(this,arguments);return(0,y.A)(this,r)}}function _isNativeReflectConstruct(){try{var e=!Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){})))}catch(e){}return(_isNativeReflectConstruct=function(){return!!e})()}var g=function(e){(0,d.A)(ChainSigner,e);var t=_createSuper(ChainSigner);function ChainSigner(e,r,n){var i,a=(0,p.N)(n,{key:e,chainCode:h.alloc(32)},r).key.toString("hex");return(i=t.call(this,a,n)).encryptedPrivateKey=e,i.password=r,i.curve=n,i}var r,n=ChainSigner.prototype;return n.getPrvkey=function getPrvkey(){return Promise.resolve((0,p.Yc)(this.password,this.encryptedPrivateKey))},n.getPrvkeyHex=(r=(0,o.A)((function*(){return c.A.bytesToHex(yield this.getPrvkey())})),function getPrvkeyHex(){return r.apply(this,arguments)}),n.sign=function sign(e){var t=(0,p._S)(this.curve,this.encryptedPrivateKey,e,this.password);return"secp256k1"===this.curve?Promise.resolve([t.slice(0,-1),t[t.length-1]]):Promise.resolve([t,0])},(0,s.A)(ChainSigner)}(function(){function Verifier(e,t){this.curve=t,this.compressedPublicKey=h.from(e,"hex"),this.uncompressedPublicKey=(0,p.sA)(t,this.compressedPublicKey)}var e,t=Verifier.prototype;return t.getPubkey=function getPubkey(e){return Promise.resolve(e?this.compressedPublicKey:this.uncompressedPublicKey)},t.getPubkeyHex=(e=(0,o.A)((function*(e){return c.A.bytesToHex(yield this.getPubkey(e))})),function getPubkeyHex(t){return e.apply(this,arguments)}),t.verify=function verify(){return Promise.resolve(h.from([]))},t.verifySignature=function verifySignature({publicKey:e,digest:t,signature:r}){var n=c.A.toBuffer(e),i=c.A.toBuffer(t),a=c.A.toBuffer(r),{curve:o}=this,s=(0,p.MX)(o,n,i,a);return Promise.resolve(s)},(0,s.A)(Verifier)}());function ownKeys(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function _objectSpread(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?ownKeys(Object(r),!0).forEach((function(t){(0,a.A)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):ownKeys(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var b=function(){function CoreChainApiBase(){}var e,t,r,n,a,d,y,v,h=CoreChainApiBase.prototype;return h.baseGetCurve=function baseGetCurve(e){switch(e){case"ed25519":return p.ev;case"secp256k1":return p.bI;case"nistp256":return p.OX;default:throw new u.He("Unsupported curve")}},h.baseCreateSigner=(e=(0,o.A)((function*({curve:e,privateKey:t,password:r}){if(void 0===r)throw new u.He("Software signing requires a password.");var n=c.A.toBuffer(t);return Promise.resolve(new g(n,r,e))})),function baseCreateSigner(t){return e.apply(this,arguments)}),h.baseGetSingleSigner=(t=(0,o.A)((function*({payload:e,curve:t}){var r=yield this.getPrivateKeys(e),n=e.account.path,i=r[n],a=e?.relPaths?.[0];if(!i&&a&&(i=r[[n,a].join("/")]),!i)throw new Error(`No private key found: ${n}`);return this.baseCreateSigner({curve:t,privateKey:i,password:e.password})})),function baseGetSingleSigner(e){return t.apply(this,arguments)}),h.baseGetPrivateKeys=(r=(0,o.A)((function*({payload:e,curve:t}){var{credentials:r,account:n,password:i,relPaths:a}=e,o={};if(r.hd&&r.imported)throw new u.He("getPrivateKeys ERROR: hd and imported credentials can NOT both set.");if(r.hd&&(o=yield this.baseGetPrivateKeysHd({curve:t,account:n,hdCredential:r.hd,password:i,relPaths:a})),r.imported){var{privateKey:s}=(0,p.VV)({password:i,credential:r.imported}),f=c.A.bytesToHex((0,p.w)(i,s));o[n.path]=f,o[""]=f}if(!Object.keys(o).length)throw new Error("No private keys found");return o})),function baseGetPrivateKeys(e){return r.apply(this,arguments)}),h.baseGetPrivateKeysHd=(n=(0,o.A)((function*({curve:e,password:t,account:r,relPaths:n,hdCredential:i}){var{path:a}=r,o=a.split("/"),s=n||[o.pop()],f=o.join("/");if(0===s.length)throw new u.He("getPrivateKeysHd ERROR: relPaths is empty.");return(0,p.Wu)(e,i,t,f,s).reduce((function(e,t){return _objectSpread(_objectSpread({},e),{},{[t.path]:c.A.bytesToHex(t.extendedKey.key)})}),{})})),function baseGetPrivateKeysHd(e){return n.apply(this,arguments)}),h.baseGetAddressesFromHd=(a=(0,o.A)((function*(e,t){var r=this,{curve:n,generateFrom:a}=t,{template:s,hdCredential:f,password:d,indexes:y}=e,{pathPrefix:v,pathSuffix:h}=(0,l.Ah)(s),g=y.map((function(e){return h.replace("{index}",e.toString())})),b="privateKey"===a,w=[],P=[];b?P=(0,p.Wu)(n,f,d,v,g):w=yield(0,p.MJ)({curveName:n,hdCredential:f,password:d,prefix:v,relPaths:g});var A=b?P:w;if(A.length!==y.length)throw new u.He("Unable to get publick key.");var m,C=yield Promise.all(A.map((m=(0,o.A)((function*(t){var n,a,{path:o,extendedKey:{key:s}}=t;if(b){var u=c.A.bytesToHex((0,p.Yc)(d,s));a=yield r.getAddressFromPrivate({networkInfo:e.networkInfo,privateKeyRaw:u,privateKeyInfo:t})}else n=s.toString("hex"),a=yield r.getAddressFromPublic({networkInfo:e.networkInfo,publicKey:n,publicKeyInfo:t});return i()({publicKey:n,path:o},a)})),function(e){return m.apply(this,arguments)})));return{addresses:C}})),function baseGetAddressesFromHd(e,t){return a.apply(this,arguments)}),h.baseGetCredentialsType=function baseGetCredentialsType({credentials:e}){if(e.hd&&e.imported)throw new u.He("getCredentialsType ERROR: hd and imported credentials can NOT both set.");if(e.hd)return f.ECoreCredentialType.hd;if(e.imported)return f.ECoreCredentialType.imported;throw new u.He("getCredentialsType ERROR: no credentials found")},h.baseGetDefaultPrivateKey=(d=(0,o.A)((function*(e){var t=yield this.getPrivateKeys(e),[r]=Object.values(t);return{privateKeyRaw:r}})),function baseGetDefaultPrivateKey(e){return d.apply(this,arguments)}),h.validateXpub=(y=(0,o.A)((function*(e){throw new u.MS})),function validateXpub(e){return y.apply(this,arguments)}),h.validateXprvt=(v=(0,o.A)((function*(e){throw new u.MS})),function validateXprvt(e){return v.apply(this,arguments)}),(0,s.A)(CoreChainApiBase)}()},101068:(e,t,r)=>{r.r(t),r.d(t,{default:()=>s});var n=r(230414),i=r(929296),a=r(195309),o=r(972715);function _createSuper(e){var t=_isNativeReflectConstruct();return function _createSuperInternal(){var r,n=(0,o.A)(e);if(t){var i=(0,o.A)(this).constructor;r=Reflect.construct(n,arguments,i)}else r=n.apply(this,arguments);return(0,a.A)(this,r)}}function _isNativeReflectConstruct(){try{var e=!Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){})))}catch(e){}return(_isNativeReflectConstruct=function(){return!!e})()}var s=function(e){(0,i.A)(CoreChainHd,e);var t=_createSuper(CoreChainHd);function CoreChainHd(){return t.apply(this,arguments)}return(0,n.A)(CoreChainHd)}(r(912077).A)},912077:(e,t,r)=>{r.d(t,{A:()=>b});var n=r(230414),i=r(929296),a=r(195309),o=r(972715),s=r(586330),u=r(398532),c=r(939216),p=r.n(c),f=r(825145),l=r(606777),d=r(940916),y=r(401349),v=r(404727),h=r(901048).Buffer;function _createSuper(e){var t=_isNativeReflectConstruct();return function _createSuperInternal(){var r,n=(0,o.A)(e);if(t){var i=(0,o.A)(this).constructor;r=Reflect.construct(n,arguments,i)}else r=n.apply(this,arguments);return(0,a.A)(this,r)}}function _isNativeReflectConstruct(){try{var e=!Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){})))}catch(e){}return(_isNativeReflectConstruct=function(){return!!e})()}var g="ed25519";function _signTransaction(){return(_signTransaction=(0,s.A)((function*({nativeTx:e,feePayer:t,signer:r,encodedTx:n}){var i=e,a=i instanceof u.Kt,[o]=yield r.sign(a?h.from(i.message.serialize()):i.serializeMessage());return i.addSignature(t,o),{encodedTx:n,txid:p().encode(o),rawTx:h.from(i.serialize({requireAllSignatures:!1})).toString("base64")}}))).apply(this,arguments)}function _signMessage(){return(_signMessage=(0,s.A)((function*(e,t){var[r]=yield t.sign(h.from(e));return p().encode(r)}))).apply(this,arguments)}var b=function(e){(0,i.A)(CoreChainSoftware,e);var t=_createSuper(CoreChainSoftware);function CoreChainSoftware(){return t.apply(this,arguments)}var r,a,o,c,d,b,w,P=CoreChainSoftware.prototype;return P.getExportedSecretKey=(r=(0,s.A)((function*(e){var t,{password:r,keyType:n,credentials:i,account:a}=e,{privateKeyRaw:o}=yield this.baseGetDefaultPrivateKey(e);if(!o)throw new Error("privateKeyRaw is required");if(n===v.ECoreApiExportedSecretKeyType.privateKey)return p().encode(h.concat([(0,y.Yc)(r,o),p().decode(null!=(t=a.pub)?t:"")]));throw new Error(`SecretKey type not support: ${n}`)})),function getExportedSecretKey(e){return r.apply(this,arguments)}),P.getPrivateKeys=(a=(0,s.A)((function*(e){return this.baseGetPrivateKeys({payload:e,curve:g})})),function getPrivateKeys(e){return a.apply(this,arguments)}),P.signTransaction=(o=(0,s.A)((function*(e){var{unsignedTx:t,account:r}=e,n=yield this.baseGetSingleSigner({payload:e,curve:g}),i=t.encodedTx,a=yield function parseToNativeTx(e){if(!e)return Promise.resolve(null);var t=p().decode(e);try{return Promise.resolve(u.ZX.from(t))}catch(e){return Promise.resolve(u.Kt.deserialize(t))}}(i),o=new u.J3((0,f.wT)(r.pub||r.pubKey));if(!a)throw new Error("nativeTx is null");return function _signTransaction2(e){return _signTransaction.apply(this,arguments)}({nativeTx:a,feePayer:o,signer:n,encodedTx:t.encodedTx})})),function signTransaction(e){return o.apply(this,arguments)}),P.signMessage=(c=(0,s.A)((function*(e){var{unsignedMsg:t}=e,r=yield this.baseGetSingleSigner({payload:e,curve:g});return function _signMessage2(e,t){return _signMessage.apply(this,arguments)}(t.message,r)})),function signMessage(e){return c.apply(this,arguments)}),P.getAddressFromPrivate=(d=(0,s.A)((function*(e){var{privateKeyRaw:t}=e,r=l.A.toBuffer(t),n=this.baseGetCurve(g).publicFromPrivate(r);return this.getAddressFromPublic({publicKey:l.A.bytesToHex(n),networkInfo:e.networkInfo})})),function getAddressFromPrivate(e){return d.apply(this,arguments)}),P.getAddressFromPublic=(b=(0,s.A)((function*(e){var{publicKey:t}=e,r=l.A.toBuffer(t),n=new u.J3(r).toBase58();return Promise.resolve({address:n,publicKey:n})})),function getAddressFromPublic(e){return b.apply(this,arguments)}),P.getAddressesFromHd=(w=(0,s.A)((function*(e){return this.baseGetAddressesFromHd(e,{curve:g})})),function getAddressesFromHd(e){return w.apply(this,arguments)}),(0,n.A)(CoreChainSoftware)}(d.G)},180556:(e,t,r)=>{r.d(t,{Ac:()=>estimateTxSize,Ah:()=>slicePathTemplate,vN:()=>getUtxoAccountPrefixPath,zf:()=>getBIP44Path});var n=r(451661),i=r.n(n),a=r(491180);function slicePathTemplate(e){return a.A.slicePathTemplate(e)}function getUtxoAccountPrefixPath({fullPath:e}){var t=e.split("/");return t.pop(),t.pop(),t.join("/")}function getBIP44Path(e,t){var r="";for(var[n,i]of Object.entries(e.addresses))if(i===t){r=n;break}return`${e.path}/${r}`}function estimateTxSize(e,t){return i().transactionBytes(e,t)}}}]);
//# sourceMappingURL=1068.7db9f62ed7.chunk.js.map