!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="f35205c6-11a5-426b-ace6-c27f65c3f740",e._sentryDebugIdIdentifier="sentry-dbid-f35205c6-11a5-426b-ace6-c27f65c3f740")}catch(e){}}();var _global="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{};_global.SENTRY_RELEASE={id:"5.5.0 (2024121652)"},(self.webpackChunkweb=self.webpackChunkweb||[]).push([[13427],{413427:(e,n,t)=>{t.r(n),t.d(n,{default:()=>__WEBPACK_DEFAULT_EXPORT__});var o=t(586330),r=t(514041),a=t(490343),s=t(643087),i=t(162616),c=t(714191),p=t(161024),d=t(465732),u=t(325809),l=t(831085),SignMessageButton=function(){var e=(0,r.useRef)(0),n=(0,r.useCallback)((0,o.A)((function*(){a.Dialog.show({title:"Sign Message",confirmButtonProps:{variant:"destructive"},onConfirm:function(){e.current+=1,s.A.serviceSignature.addSignedMessage({networkId:"evm--1",address:"0x76f3f64cb3cD19debEE51436dF630a342B736C24",message:"hello world",contentType:"text",title:`Sign Message Test ${e.current}`})}})})),[]);return(0,l.jsx)(a.Button,{onPress:n,"data-sentry-element":"Button","data-sentry-component":"SignMessageButton","data-sentry-source-file":"/home/runner/work/app-monorepo/app-monorepo/packages/kit/src/views/Developer/pages/SignatureRecord.tsx",children:"Sign Message"})},SignTransactionButton=function(){var e=(0,r.useRef)(0),n=(0,r.useCallback)((0,o.A)((function*(){a.Dialog.show({title:"Sign Transaction",confirmButtonProps:{variant:"destructive"},onConfirm:function(){e.current+=1,s.A.serviceSignature.addSignedTransaction({networkId:"evm--1",title:`OneKey Wallet ${e.current}`,hash:"0x866c4749db18695e4359f4e3f121a835d7715638315427e5521bcd078724d0d1",address:"0x76f3f64cb3cD19debEE51436dF630a342B736C24",data:{type:d.w.SEND,amount:"100000",token:{name:"USD Coin",symbol:"USDC",address:"0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48"}}})}})})),[]);return(0,l.jsx)(a.Button,{onPress:n,"data-sentry-element":"Button","data-sentry-component":"SignTransactionButton","data-sentry-source-file":"/home/runner/work/app-monorepo/app-monorepo/packages/kit/src/views/Developer/pages/SignatureRecord.tsx",children:"Sign Transaction"})},ConnectSiteButton=function(){var e=(0,r.useCallback)((0,o.A)((function*(){a.Dialog.show({title:"Connect Site",confirmButtonProps:{variant:"destructive"},onConfirm:function(){s.A.serviceSignature.addConnectedSite({url:"https://app.uniswap.org/swap",items:[{networkId:"evm--1",address:"0x76f3f64cb3cD19debEE51436dF630a342B736C24"},{networkId:"evm--56",address:"0x76f3f64cb3cD19debEE51436dF630a342B736C24"}]})}})})),[]);return(0,l.jsx)(a.Button,{onPress:e,"data-sentry-element":"Button","data-sentry-component":"ConnectSiteButton","data-sentry-source-file":"/home/runner/work/app-monorepo/app-monorepo/packages/kit/src/views/Developer/pages/SignatureRecord.tsx",children:"Connected Site"})},CustomSignMessage=function({num:e}){var[n,t]=(0,r.useState)(""),[c,d]=(0,r.useState)(!1),{activeAccount:{account:u,network:g}}=(0,i.LH)({num:e}),m=(0,r.useCallback)((0,o.A)((function*(){if(u&&g)try{d(!0),yield s.A.serviceDApp.openSignMessageModal({accountId:u.id,networkId:g.id,request:{origin:"https://www.onekey.so",scope:"ethereum"},unsignedMessage:{type:p.$.PERSONAL_SIGN,message:n}})}finally{d(!1)}})),[n,u,g]);return(0,l.jsxs)(a.YStack,{gap:"$4","data-sentry-element":"YStack","data-sentry-component":"CustomSignMessage","data-sentry-source-file":"/home/runner/work/app-monorepo/app-monorepo/packages/kit/src/views/Developer/pages/SignatureRecord.tsx",children:[(0,l.jsx)(a.Input,{value:n,onChangeText:t,placeholder:"message","data-sentry-element":"Input","data-sentry-source-file":"/home/runner/work/app-monorepo/app-monorepo/packages/kit/src/views/Developer/pages/SignatureRecord.tsx"}),(0,l.jsx)(a.Button,{onPress:m,loading:c,disabled:!n.trim(),"data-sentry-element":"Button","data-sentry-source-file":"/home/runner/work/app-monorepo/app-monorepo/packages/kit/src/views/Developer/pages/SignatureRecord.tsx",children:"Sign Message"})]})};const __WEBPACK_DEFAULT_EXPORT__=function(){return(0,l.jsx)(a.Page,{"data-sentry-element":"Page","data-sentry-component":"DevHomeStack2","data-sentry-source-file":"/home/runner/work/app-monorepo/app-monorepo/packages/kit/src/views/Developer/pages/SignatureRecord.tsx",children:(0,l.jsxs)(a.YStack,{px:"$4",gap:"$4","data-sentry-element":"YStack","data-sentry-source-file":"/home/runner/work/app-monorepo/app-monorepo/packages/kit/src/views/Developer/pages/SignatureRecord.tsx",children:[(0,l.jsx)(SignMessageButton,{"data-sentry-element":"SignMessageButton","data-sentry-source-file":"/home/runner/work/app-monorepo/app-monorepo/packages/kit/src/views/Developer/pages/SignatureRecord.tsx"}),(0,l.jsx)(SignTransactionButton,{"data-sentry-element":"SignTransactionButton","data-sentry-source-file":"/home/runner/work/app-monorepo/app-monorepo/packages/kit/src/views/Developer/pages/SignatureRecord.tsx"}),(0,l.jsx)(ConnectSiteButton,{"data-sentry-element":"ConnectSiteButton","data-sentry-source-file":"/home/runner/work/app-monorepo/app-monorepo/packages/kit/src/views/Developer/pages/SignatureRecord.tsx"}),(0,l.jsx)(u.b8,{config:{sceneName:c.Zs.home,sceneUrl:""},enabledNum:[0],"data-sentry-element":"AccountSelectorProviderMirror","data-sentry-source-file":"/home/runner/work/app-monorepo/app-monorepo/packages/kit/src/views/Developer/pages/SignatureRecord.tsx",children:(0,l.jsx)(CustomSignMessage,{num:0,"data-sentry-element":"CustomSignMessage","data-sentry-source-file":"/home/runner/work/app-monorepo/app-monorepo/packages/kit/src/views/Developer/pages/SignatureRecord.tsx"})})]})})}}}]);
//# sourceMappingURL=13427.53640fe7fe.chunk.js.map