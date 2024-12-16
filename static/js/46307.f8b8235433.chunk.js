!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},t=(new e.Error).stack;t&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[t]="c0fd50a6-3938-401d-8edd-ffefbe1346cb",e._sentryDebugIdIdentifier="sentry-dbid-c0fd50a6-3938-401d-8edd-ffefbe1346cb")}catch(e){}}();var _global="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{};_global.SENTRY_RELEASE={id:"5.5.0 (2024121652)"},(self.webpackChunkweb=self.webpackChunkweb||[]).push([[46307],{882105:(e,t,r)=>{r.d(t,{Hr:()=>useMarketTradeNetworkId,KY:()=>useMarketTradeNetwork,z6:()=>useLazyMarketTradeActions,zl:()=>useMarketTradeActions});var o=r(324586),n=r(586330),a=r(514041),s=r(908867),c=r(490343),d=r(334439),i=r(296827),l=r(193068),p=r(180706),u=r(628380),y=r(117746),k=r(584186),f=r(317192),A=r(507192),w=r(619390),b=r(643087),m=r(498356),S=r(162616),g=r(831085);function ownKeys(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,o)}return r}function _objectSpread(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?ownKeys(Object(r),!0).forEach((function(t){(0,o.A)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):ownKeys(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var useMarketTradeNetwork=function(e){var{detailPlatforms:t,name:r}=e||{};return(0,a.useMemo)((function(){return t&&"Toncoin"===r?t["the-open-network"]:t?Object.values(t)[0]:null}),[t,r])},useMarketTradeNetworkId=function(e,t){return(0,a.useMemo)((function(){var{onekeyNetworkId:r}=e||{};return null!=r?r:(0,A.V)(t)}),[e,t])},useMarketTradeActions=function(e){var t,r,{symbol:o="",name:k}=e||{},v=(0,s.A)(),M=useMarketTradeNetwork(e),h=useMarketTradeNetworkId(M,o),I=(0,m.A)(),{activeAccount:O}=(0,S.LH)({num:0}),C=(0,a.useMemo)((function(){var e;return null!=(e=M?.contract_address)?e:""}),[M]),j=(0,a.useCallback)((function(e,t=!0){i.U.market.token.unsupportedToken({name:o,action:e}),t&&c.Dialog.confirm({title:v.formatMessage({id:d.ETranslations.earn_unsupported_token}),tone:"warning",icon:"ErrorOutline",renderContent:(0,g.jsx)(c.SizableText,{size:"$bodyLg",children:v.formatMessage({id:d.ETranslations.earn_unsupported_token_desc})}),onConfirmText:v.formatMessage({id:d.ETranslations.explore_got_it})})}),[v,o]),T=(0,a.useCallback)((t=(0,n.A)((function*(e){if(O.account&&h){var{isNative:t}=(0,A.J)({networkId:h,tokenSymbol:o,contractAddress:C})||{};if(yield b.A.serviceFiatCrypto.isTokenSupported({networkId:h,tokenAddress:t?"":C,type:e})){var r=yield b.A.serviceNetwork.getGlobalDeriveTypeOfNetwork({networkId:h}),n=yield b.A.serviceAccount.getNetworkAccount({accountId:void 0,indexedAccountId:O.account.indexedAccountId,networkId:h,deriveType:r}),{url:a,build:s}=yield b.A.serviceFiatCrypto.generateWidgetUrl({networkId:h,tokenAddress:"",accountId:n.id,type:e});a&&s?(0,y.Dr)(a):j(e)}else j(e)}})),function(e){return t.apply(this,arguments)}),[O.account,C,h,j,o]),x=(0,a.useCallback)((r=(0,n.A)((function*(e){var navigateToSwapPage=function(t){"modal"===e?I.replace(u.u.SwapMainLand,t):I.pushModal(p.r.SwapModal,{screen:u.u.SwapMainLand,params:t})};if(!h)return j("trade",!1),void navigateToSwapPage({importNetworkId:"unknown"});var{isNative:t,realContractAddress:r=""}=(0,A.J)({networkId:h,tokenSymbol:o,contractAddress:C})||{},{isSupportSwap:n,isSupportCrossChain:a}=yield b.A.serviceSwap.checkSupportSwap({networkId:h,contractAddress:t?r:C});if(!n&&!a)return j("trade",!1),void navigateToSwapPage({importNetworkId:h});var s=yield b.A.serviceNetwork.getNetwork({networkId:h});navigateToSwapPage({importFromToken:_objectSpread(_objectSpread({},s),{},{logoURI:t?s.logoURI:void 0,contractAddress:t?"":C,networkId:h,isNative:t,networkLogoURI:s.logoURI,symbol:o.toUpperCase(),name:k}),swapTabSwitchType:n?w.qX.SWAP:w.qX.BRIDGE})})),function(e){return r.apply(this,arguments)}),[C,k,I,h,j,o]),P=(0,a.useCallback)((function(){h&&O.account&&I.pushModal(p.r.StakingModal,{screen:l.Ax.AssetProtocolList,params:{networkId:h,accountId:O.account?.id,indexedAccountId:O.indexedAccount?.id,symbol:o}})}),[O.account,O.indexedAccount,I,h,o]),L=(0,a.useMemo)((function(){return(0,f.r)(o)}),[o]);return(0,a.useMemo)((function(){return{onSwap:x,onStaking:P,onBuy:function(){return T("buy")},onSell:function(){return T("sell")},canStaking:L}}),[L,T,P,x])},useLazyMarketTradeActions=function(e){var[t,r]=(0,a.useState)(null),o=(0,a.useCallback)((0,n.A)((function*(){var t=yield b.A.serviceMarket.fetchMarketTokenDetail(e);r(t)})),[e]),s=useMarketTradeActions(t),c=(0,a.useRef)(s);c.current=s;var d,i=(0,a.useCallback)((d=(0,n.A)((function*(e){yield o(),yield k.A.wait(80),yield c.current[e]("modal")})),function(e){return d.apply(this,arguments)}),[o]),l=(0,m.A)(),y=(0,a.useCallback)((function(){l.pushModal(p.r.SwapModal,{screen:u.u.SwapLazyMarketModal,params:{coinGeckoId:e}})}),[e,l]);return(0,a.useMemo)((function(){return{onSwap:function(){return i("onSwap")},onSwapLazyModal:y,onStaking:function(){return i("onStaking")},onBuy:function(){return i("onBuy")},onSell:function(){return i("onSell")}}}),[i,y])}},46307:(e,t,r)=>{r.r(t),r.d(t,{default:()=>SwapLazyMarketModal});var o=r(324586),n=r(514041),a=r(908867),s=r(490343),c=r(325809),d=r(882105),i=r(334439),l=r(714191),p=r(831085);function ownKeys(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,o)}return r}function _objectSpread(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?ownKeys(Object(r),!0).forEach((function(t){(0,o.A)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):ownKeys(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function BaseSwapLazyMarketModalModal({route:e}){var{coinGeckoId:t}=e.params,r=(0,a.A)(),{onSwap:o}=(0,d.z6)(t);return(0,n.useLayoutEffect)((function(){o()}),[o]),(0,p.jsxs)(s.Page,{"data-sentry-element":"Page","data-sentry-component":"BaseSwapLazyMarketModalModal","data-sentry-source-file":"/home/runner/work/app-monorepo/app-monorepo/packages/kit/src/views/Swap/pages/modal/SwapLazyMarketModal.tsx",children:[(0,p.jsx)(s.Page.Header,{title:r.formatMessage({id:i.ETranslations.global_trade}),"data-sentry-element":"unknown","data-sentry-source-file":"/home/runner/work/app-monorepo/app-monorepo/packages/kit/src/views/Swap/pages/modal/SwapLazyMarketModal.tsx"}),(0,p.jsx)(s.Page.Body,{"data-sentry-element":"unknown","data-sentry-source-file":"/home/runner/work/app-monorepo/app-monorepo/packages/kit/src/views/Swap/pages/modal/SwapLazyMarketModal.tsx",children:(0,p.jsx)(s.Stack,{flex:1,ai:"center",jc:"center","data-sentry-element":"Stack","data-sentry-source-file":"/home/runner/work/app-monorepo/app-monorepo/packages/kit/src/views/Swap/pages/modal/SwapLazyMarketModal.tsx",children:(0,p.jsx)(s.Spinner,{size:"large","data-sentry-element":"Spinner","data-sentry-source-file":"/home/runner/work/app-monorepo/app-monorepo/packages/kit/src/views/Swap/pages/modal/SwapLazyMarketModal.tsx"})})})]})}function SwapLazyMarketModal(e){return(0,p.jsx)(c.b8,{config:{sceneName:l.Zs.home,sceneUrl:""},enabledNum:[0],"data-sentry-element":"AccountSelectorProviderMirror","data-sentry-component":"SwapLazyMarketModal","data-sentry-source-file":"/home/runner/work/app-monorepo/app-monorepo/packages/kit/src/views/Swap/pages/modal/SwapLazyMarketModal.tsx",children:(0,p.jsx)(BaseSwapLazyMarketModalModal,_objectSpread(_objectSpread({},e),{},{"data-sentry-element":"BaseSwapLazyMarketModalModal","data-sentry-source-file":"/home/runner/work/app-monorepo/app-monorepo/packages/kit/src/views/Swap/pages/modal/SwapLazyMarketModal.tsx"}))})}},317192:(e,t,r)=>{r.d(t,{J:()=>getImportFromToken,r:()=>isSupportStaking});var o=r(625931),n=r(619390),a={networkId:"evm--1",contractAddress:"",name:"Ethereum",symbol:"ETH",decimals:18,isNative:!0,networkLogoURI:"https://uni.onekey-asset.com/static/chain/eth.png"},s={networkId:"evm--1",contractAddress:"0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",name:"USD Coin",symbol:"USDC",decimals:6,isNative:!1,isPopular:!0,networkLogoURI:"https://uni.onekey-asset.com/static/chain/eth.png"},c={networkId:"sol--101",contractAddress:"EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",name:"USDC",symbol:"USDC",decimals:6,isNative:!1,networkLogoURI:"https://uni.onekey-asset.com/static/chain/sol.png"},isSupportStaking=function(e){return["BTC","SBTC","ETH","SOL","APT","ATOM","MATIC"].includes(e.toUpperCase())};function getImportFromToken({networkId:e,tokenSymbol:t,isSupportSwap:r=!0}){var d,i=r?n.qX.SWAP:n.qX.BRIDGE,l=(0,o.V)();switch(e){case l.btc:case l.sbtc:d=a,i=n.qX.BRIDGE;break;case l.eth:case l.holesky:case l.sepolia:d="MATIC"===t?a:s,i=n.qX.SWAP;break;case l.sol:d=c,i=n.qX.SWAP;break;case l.apt:d=a,i=n.qX.BRIDGE}return{importFromToken:d,swapTabSwitchType:i}}},507192:(e,t,r)=>{r.d(t,{J:()=>getImportFromToken,V:()=>s});var o=r(657355),n=r(625931),a=(0,o.EO)((function(){var e=(0,n.V)();return{[e.btc]:{contractAddress:"",symbol:"BTC",realContractAddress:""},[e.eth]:{contractAddress:"0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",symbol:"ETH",realContractAddress:""},[e.sol]:{contractAddress:"So11111111111111111111111111111111111111112",symbol:"SOL",realContractAddress:""},[e.bsc]:{contractAddress:"0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c",symbol:"BNB",realContractAddress:""},[e.polygon]:{contractAddress:"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",symbol:"POL",realContractAddress:""},[e.avalanche]:{contractAddress:"0x0000000000000000000000000000000000000000",symbol:"AVAX",realContractAddress:""},[e.apt]:{contractAddress:"0x1::aptos_coin::AptosCoin",symbol:"APT",realContractAddress:""},[e.kaspa]:{contractAddress:"",symbol:"KAS",realContractAddress:""},[e.ton]:{contractAddress:"EQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAM9c",symbol:"TON",realContractAddress:""},[e.sui]:{contractAddress:"0x2::sui::SUI",symbol:"SUI",realContractAddress:"0x2::sui::SUI"}}})),s=(0,o.EO)((function(e){var t=(0,n.V)();if("btc"===e)return t.btc}));function getImportFromToken({networkId:e,tokenSymbol:t,contractAddress:r}){var o=a()[e];if(o)return{isNative:t.toUpperCase()===o.symbol&&o.contractAddress===r,realContractAddress:o.realContractAddress}}}}]);
//# sourceMappingURL=46307.f8b8235433.chunk.js.map