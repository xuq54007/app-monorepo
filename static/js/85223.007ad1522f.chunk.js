!function(){try{var t="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},e=(new t.Error).stack;e&&(t._sentryDebugIds=t._sentryDebugIds||{},t._sentryDebugIds[e]="6e613ce2-d3d6-477b-9659-43482d2e0077",t._sentryDebugIdIdentifier="sentry-dbid-6e613ce2-d3d6-477b-9659-43482d2e0077")}catch(t){}}();var _global="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{};_global.SENTRY_RELEASE={id:"5.5.0 (2024121652)"},(self.webpackChunkweb=self.webpackChunkweb||[]).push([[85223],{585223:(t,e,r)=>{r.r(e),r.d(e,{default:()=>v});var n=r(230414),c=r(929296),i=r(195309),a=r(972715),o=r(508977),u=r(432917),l=r(586330);function _createSuper(t){var e=_isNativeReflectConstruct();return function _createSuperInternal(){var r,n=(0,a.A)(t);if(e){var c=(0,a.A)(this).constructor;r=Reflect.construct(n,arguments,c)}else r=n.apply(this,arguments);return(0,i.A)(this,r)}}function _isNativeReflectConstruct(){try{var t=!Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){})))}catch(t){}return(_isNativeReflectConstruct=function(){return!!t})()}var f=function(t){(0,c.A)(KeyringHardware,t);var e,r=_createSuper(KeyringHardware);function KeyringHardware(...t){var e;return(e=r.call(this,...t)).coreApi=o.A.ltc.hd,e.hwSdkNetwork="ltc",e}return KeyringHardware.prototype.buildHwAllNetworkPrepareAccountsParams=(e=(0,l.A)((function*({template:t,index:e}){return{network:this.hwSdkNetwork,path:this.buildPrepareAccountsPrefixedPath({template:t,index:e}),showOnOneKey:!1}})),function buildHwAllNetworkPrepareAccountsParams(t){return e.apply(this,arguments)}),(0,n.A)(KeyringHardware)}(r(895646).y);function KeyringHd_createSuper(t){var e=KeyringHd_isNativeReflectConstruct();return function _createSuperInternal(){var r,n=(0,a.A)(t);if(e){var c=(0,a.A)(this).constructor;r=Reflect.construct(n,arguments,c)}else r=n.apply(this,arguments);return(0,i.A)(this,r)}}function KeyringHd_isNativeReflectConstruct(){try{var t=!Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){})))}catch(t){}return(KeyringHd_isNativeReflectConstruct=function(){return!!t})()}var s=function(t){(0,c.A)(KeyringHd,t);var e=KeyringHd_createSuper(KeyringHd);function KeyringHd(...t){var r;return(r=e.call(this,...t)).coreApi=o.A.ltc.hd,r}return(0,n.A)(KeyringHd)}(r(368390).M);function KeyringImported_createSuper(t){var e=KeyringImported_isNativeReflectConstruct();return function _createSuperInternal(){var r,n=(0,a.A)(t);if(e){var c=(0,a.A)(this).constructor;r=Reflect.construct(n,arguments,c)}else r=n.apply(this,arguments);return(0,i.A)(this,r)}}function KeyringImported_isNativeReflectConstruct(){try{var t=!Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){})))}catch(t){}return(KeyringImported_isNativeReflectConstruct=function(){return!!t})()}var p=function(t){(0,c.A)(KeyringImported,t);var e=KeyringImported_createSuper(KeyringImported);function KeyringImported(...t){var r;return(r=e.call(this,...t)).coreApi=o.A.ltc.imported,r}return(0,n.A)(KeyringImported)}(r(884882).e);function KeyringQr_createSuper(t){var e=KeyringQr_isNativeReflectConstruct();return function _createSuperInternal(){var r,n=(0,a.A)(t);if(e){var c=(0,a.A)(this).constructor;r=Reflect.construct(n,arguments,c)}else r=n.apply(this,arguments);return(0,i.A)(this,r)}}function KeyringQr_isNativeReflectConstruct(){try{var t=!Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){})))}catch(t){}return(KeyringQr_isNativeReflectConstruct=function(){return!!t})()}var y=function(t){(0,c.A)(KeyringQr,t);var e=KeyringQr_createSuper(KeyringQr);function KeyringQr(){return e.apply(this,arguments)}return(0,n.A)(KeyringQr)}(r(38613).v);function KeyringWatching_createSuper(t){var e=KeyringWatching_isNativeReflectConstruct();return function _createSuperInternal(){var r,n=(0,a.A)(t);if(e){var c=(0,a.A)(this).constructor;r=Reflect.construct(n,arguments,c)}else r=n.apply(this,arguments);return(0,i.A)(this,r)}}function KeyringWatching_isNativeReflectConstruct(){try{var t=!Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){})))}catch(t){}return(KeyringWatching_isNativeReflectConstruct=function(){return!!t})()}var d=function(t){(0,c.A)(KeyringWatching,t);var e=KeyringWatching_createSuper(KeyringWatching);function KeyringWatching(){return e.apply(this,arguments)}return(0,n.A)(KeyringWatching)}(r(887895).r);function Vault_createSuper(t){var e=Vault_isNativeReflectConstruct();return function _createSuperInternal(){var r,n=(0,a.A)(t);if(e){var c=(0,a.A)(this).constructor;r=Reflect.construct(n,arguments,c)}else r=n.apply(this,arguments);return(0,i.A)(this,r)}}function Vault_isNativeReflectConstruct(){try{var t=!Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){})))}catch(t){}return(Vault_isNativeReflectConstruct=function(){return!!t})()}var v=function(t){(0,c.A)(Vault,t);var e=Vault_createSuper(Vault);function Vault(...t){var r;return(r=e.call(this,...t)).coreApi=o.A.ltc.hd,r.keyringMap={hd:s,qr:y,hw:f,imported:p,watching:d,external:d},r}return Vault.prototype.getBlockbookCoinName=function getBlockbookCoinName(){return"Litecoin"},(0,n.A)(Vault)}(u.default)}}]);
//# sourceMappingURL=85223.007ad1522f.chunk.js.map