!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="d0e6eab3-675b-4ac2-bab9-3590db24d664",e._sentryDebugIdIdentifier="sentry-dbid-d0e6eab3-675b-4ac2-bab9-3590db24d664")}catch(e){}}();var _global="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{};_global.SENTRY_RELEASE={id:"5.5.0 (2024121652)"},(self.webpackChunkweb=self.webpackChunkweb||[]).push([[80144,15882],{880144:(e,n,t)=>{t.r(n),t.d(n,{default:()=>i});var a=t(324586),d=t(404727),r=t(928557),o=t(215882);function ownKeys(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);n&&(a=a.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,a)}return t}function _objectSpread(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?ownKeys(Object(t),!0).forEach((function(n){(0,a.A)(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):ownKeys(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}var s={default:{namePrefix:"BCH",label:"Legacy",template:`m/44'/${r.ul}'/${r.h2}'/0/0`,coinType:r.ul,coinName:r.P1,addressEncoding:d.EAddressEncodings.P2PKH,desc:"BIP44, P2PKH, Base58."}},c=_objectSpread(_objectSpread({},o.default),{},{accountDeriveInfo:s,impl:r.N,coinTypeDefault:r.ul,minTransferAmount:"0.00000546",hasFrozenBalance:!1,showAddressType:!1,dappInteractionEnabled:!1,mergeDeriveAssetsEnabled:!1,qrAccountEnabled:!1});const i=Object.freeze(c)},215882:(e,n,t)=>{t.r(n),t.d(n,{default:()=>b});var a=t(404727),d=t(625931),r=t(250765),o=t(928557),s=t(334439),c=t(73197),i=t(746661),l={default:{namePrefix:"BTC Nested SegWit",label:"Nested SegWit",template:`m/49'/${o.$t}'/${o.h2}'/0/0`,coinType:o.$t,coinName:o.Ly,addressEncoding:a.EAddressEncodings.P2SH_P2WPKH,descI18n:{id:s.ETranslations.p2wpkh_desc,data:{}}},BIP86:{namePrefix:"BTC Taproot",label:"Taproot",template:`m/86'/${o.$t}'/${o.h2}'/0/0`,coinType:o.$t,coinName:o.Ly,addressEncoding:a.EAddressEncodings.P2TR,descI18n:{id:s.ETranslations.p2tr_desc,data:{}}},BIP84:{namePrefix:"BTC Native SegWit",label:"Native SegWit",template:`m/84'/${o.$t}'/${o.h2}'/0/0`,coinType:o.$t,coinName:o.Ly,addressEncoding:a.EAddressEncodings.P2WPKH,descI18n:{id:s.ETranslations.p2sh_p2wpkh_desc,data:{}}},BIP44:{namePrefix:"BTC Legacy",label:"Legacy",template:`m/44'/${o.$t}'/${o.h2}'/0/0`,coinType:o.$t,coinName:o.Ly,addressEncoding:a.EAddressEncodings.P2PKH,descI18n:{id:s.ETranslations.p2pkh_desc,data:{}}}},p={impl:o.PA,coinTypeDefault:o.$t,accountType:i.rX.UTXO,importedAccountEnabled:!0,hardwareAccountEnabled:!0,externalAccountEnabled:!1,watchingAccountEnabled:!0,qrAccountEnabled:!0,publicKeyExportEnabled:!0,supportExportedSecretKeys:[a.ECoreApiExportedSecretKeyType.xprvt,a.ECoreApiExportedSecretKeyType.xpub],isUtxo:!0,isSingleToken:!0,NFTEnabled:!1,nonceRequired:!1,feeUTXORequired:!0,editFeeEnabled:!0,replaceTxEnabled:!1,estimatedFeePollingInterval:120,minTransferAmount:"0.00000546",defaultFeePresetIndex:1,accountDeriveInfo:l,networkInfo:{default:{curve:"secp256k1",addressPrefix:""}},hasFrozenBalance:!0,showAddressType:!0,dappInteractionEnabled:!0,customRpcEnabled:!0,mergeDeriveAssetsEnabled:!0,preCheckDappTxFeeInfoRequired:!0,isNativeTokenContractAddressEmpty:!0,stakingConfig:{[(0,d.V)().btc]:{providers:{[c.e.Babylon]:{supportedSymbols:["BTC"],configs:{BTC:{enabled:!0,tokenAddress:r.Fu,displayProfit:!1,withdrawWithTx:!0,claimWithTx:!0,usePublicKey:!0,withdrawSignOnly:!0}}}}}}};const b=Object.freeze(p)}}]);
//# sourceMappingURL=80144.4ba475c437.chunk.js.map