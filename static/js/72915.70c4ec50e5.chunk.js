!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},t=(new e.Error).stack;t&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[t]="96cf5d02-041d-4ce6-a8b4-cd7b55b9f435",e._sentryDebugIdIdentifier="sentry-dbid-96cf5d02-041d-4ce6-a8b4-cd7b55b9f435")}catch(e){}}();var _global="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{};_global.SENTRY_RELEASE={id:"5.5.0 (2024121652)"},(self.webpackChunkweb=self.webpackChunkweb||[]).push([[72915],{72915:(e,t,n)=>{n.r(t),n.d(t,{default:()=>__WEBPACK_DEFAULT_EXPORT__});var r=n(324586),o=n(514041),i=n(908867),a=n(490343),s=n(643087),c=n(575995),p=n(791088),d=n(911998),l=n(318822),u=n(334439),f=n(831085);function ownKeys(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function _objectSpread(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?ownKeys(Object(n),!0).forEach((function(t){(0,r.A)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):ownKeys(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var g={mainAxis:-4,crossAxis:-10},AccountDerivationListItem=function({title:e,icon:t,networkId:n,setDeriveTypes:r}){return(0,f.jsx)(c.Vq,{networkId:n,placement:"bottom-end",offset:g,onChange:function({type:e,originalDeriveType:t}){r((function(r){return _objectSpread(_objectSpread({},r),{},{[n]:{type:e,originalDeriveType:t}})}))},renderTrigger:function({label:n}){return(0,f.jsx)(p.c,{userSelect:"none",title:e,avatarProps:{src:t,size:"$8"},children:(0,f.jsxs)(a.XStack,{children:[(0,f.jsx)(a.SizableText,{mr:"$3",children:n}),(0,f.jsx)(p.c.DrillIn,{name:"ChevronDownSmallSolid"})]})})},"data-sentry-element":"DeriveTypeSelectorTriggerGlobalStandAlone","data-sentry-component":"AccountDerivationListItem","data-sentry-source-file":"/home/runner/work/app-monorepo/app-monorepo/packages/kit/src/views/Setting/pages/AccountDerivation/index.tsx"})};const __WEBPACK_DEFAULT_EXPORT__=function(){var[e,t]=(0,o.useState)({}),{result:{items:n},isLoading:r}=(0,d.yk)((function(){return s.A.serviceSetting.getAccountDerivationConfig()}),[],{initResult:{enabledNum:[],availableNetworksMap:{},items:[]},watchLoading:!0}),c=(0,i.A)();return(0,f.jsxs)(a.Page,{scrollEnabled:!0,onClose:function(){Object.values(e).some((function({originalDeriveType:e,type:t}){return e!==t}))&&l.iL.emit(l.Tu.NetworkDeriveTypeChanged,void 0)},"data-sentry-element":"Page","data-sentry-component":"AccountDerivation","data-sentry-source-file":"/home/runner/work/app-monorepo/app-monorepo/packages/kit/src/views/Setting/pages/AccountDerivation/index.tsx",children:[(0,f.jsx)(a.Page.Header,{title:c.formatMessage({id:u.ETranslations.settings_account_derivation_path}),"data-sentry-element":"unknown","data-sentry-source-file":"/home/runner/work/app-monorepo/app-monorepo/packages/kit/src/views/Setting/pages/AccountDerivation/index.tsx"}),(0,f.jsx)(a.Stack,{px:"$5",py:"$3","data-sentry-element":"Stack","data-sentry-source-file":"/home/runner/work/app-monorepo/app-monorepo/packages/kit/src/views/Setting/pages/AccountDerivation/index.tsx",children:(0,f.jsx)(a.SizableText,{size:"$bodyLg","data-sentry-element":"SizableText","data-sentry-source-file":"/home/runner/work/app-monorepo/app-monorepo/packages/kit/src/views/Setting/pages/AccountDerivation/index.tsx",children:c.formatMessage({id:u.ETranslations.settings_account_derivation_path_desc})})}),r?null:(0,f.jsx)(a.Stack,{children:n.map((function(e){return(0,f.jsx)(AccountDerivationListItem,{title:e.title,icon:e.icon,networkId:e.defaultNetworkId,setDeriveTypes:t},e.icon)}))})]})}}}]);
//# sourceMappingURL=72915.70c4ec50e5.chunk.js.map