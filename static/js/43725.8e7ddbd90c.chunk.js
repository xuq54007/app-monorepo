!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},t=(new e.Error).stack;t&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[t]="de4e4f99-827c-475c-9120-e2085878a270",e._sentryDebugIdIdentifier="sentry-dbid-de4e4f99-827c-475c-9120-e2085878a270")}catch(e){}}();var _global="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{};_global.SENTRY_RELEASE={id:"5.5.0 (2024121652)"},(self.webpackChunkweb=self.webpackChunkweb||[]).push([[43725],{743725:(e,t,s)=>{s.r(t),s.d(t,{default:()=>__WEBPACK_DEFAULT_EXPORT__});var a=s(490343),n=s(654004),o=s(831085);const __WEBPACK_DEFAULT_EXPORT__=function(){return(0,o.jsx)(n.P,{description:"",suggestions:[],boundaryConditions:[],elements:[{title:"load Image via source",element:(0,o.jsxs)(a.YStack,{gap:10,children:[(0,o.jsx)(a.Image,{height:"$10",width:"$10",source:s(686065)}),(0,o.jsx)(a.Image,{height:"$10",width:"$10",source:{uri:"https://uni.onekey-asset.com/static/chain/btc.png"}})]})},{title:"load Image via src",element:(0,o.jsx)(a.YStack,{gap:10,children:(0,o.jsx)(a.Image,{height:"$10",width:"$10",src:"https://uni.onekey-asset.com/static/chain/btc.png"})})},{title:"uri is empty string",element:(0,o.jsx)(a.YStack,{gap:10,children:(0,o.jsx)(a.Image,{w:"$5",h:"$5",children:(0,o.jsx)(a.Image.Source,{source:{uri:""}})})})},{title:"base64 Image",element:(0,o.jsx)(a.YStack,{gap:10,children:(0,o.jsx)(a.Image,{size:"$10",source:{uri:"\ndata:image/png;base64,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\n"}})})},{title:"Loading Fallback",element:(0,o.jsxs)(a.YStack,{gap:10,children:[(0,o.jsxs)(a.Image,{height:"$10",width:"$10",children:[(0,o.jsx)(a.Image.Source,{source:{uri:"https://uni.onekey-asset.com/static/chain/btc.png"}}),(0,o.jsx)(a.Image.Fallback,{children:(0,o.jsx)(a.Skeleton,{width:"100%",height:"100%"})})]}),(0,o.jsxs)(a.Image,{height:"$10",width:"$10",children:[(0,o.jsx)(a.Image.Source,{delayMs:2500,source:{uri:"https://uni.onekey-asset.com/static/chain/btc.png"}}),(0,o.jsx)(a.Image.Fallback,{children:(0,o.jsx)(a.Skeleton,{width:"100%",height:"100%"})})]}),(0,o.jsxs)(a.Image,{height:"$10",width:"$10",children:[(0,o.jsx)(a.Image.Source,{delayMs:2500,source:{uri:"https://uni.onekey-asset.com/static/chain/btc.png"}}),(0,o.jsx)(a.Image.Fallback,{children:(0,o.jsx)(a.Icon,{name:"ImageMountainsOutline",size:"$8"})})]}),(0,o.jsxs)(a.Image,{height:"$10",width:"$10",children:[(0,o.jsx)(a.Image.Source,{delayMs:2500,source:{uri:"https://uni.onekey-asset.com/static/chain/btc.png"}}),(0,o.jsx)(a.Image.Skeleton,{})]}),(0,o.jsxs)(a.Image,{height:"$10",width:"$10",children:[(0,o.jsx)(a.Image.Source,{source:{uri:"https://uni.onekey-asset.com/static/chain/btc.png"}}),(0,o.jsx)(a.Image.Fallback,{delayMs:2500,children:(0,o.jsx)(a.Skeleton,{width:"100%",height:"100%"})})]})]})},{title:"Loading Fallback",element:(0,o.jsxs)(a.YStack,{gap:"$4",children:[(0,o.jsxs)(a.Image,{height:"$10",width:"$10",children:[(0,o.jsx)(a.Image.Source,{delayMs:2500,src:"https://uni.onekey-asset.com/static/chain/btc.png"}),(0,o.jsx)(a.Image.Skeleton,{})]}),(0,o.jsxs)(a.Image,{size:"$14",borderRadius:"$3",$gtLg:{w:"$12",h:"$12"},children:[(0,o.jsx)(a.Image.Source,{source:{uri:"https://dev.onekey-asset.com/dashboard/dapp/upload_1706684476225.0.17899416707349025.0.jpeg"}}),(0,o.jsx)(a.Image.Fallback,{children:(0,o.jsx)(a.Icon,{size:"$14",$gtLg:{size:"$12"},name:"GlobusOutline"})})]})]})},{title:"onError",element:(0,o.jsxs)(a.YStack,{gap:"$4",children:[(0,o.jsxs)(a.Image,{height:"$10",width:"$10",children:[(0,o.jsx)(a.Image.Source,{src:"https://uni.onekey-asset.com/static/chain/btc.pn"}),(0,o.jsx)(a.Image.Skeleton,{})]}),(0,o.jsxs)(a.Image,{size:"$14",borderRadius:"$3",$gtLg:{w:"$12",h:"$12"},children:[(0,o.jsx)(a.Image.Source,{source:{uri:"https://uni.onekey-asset.com/static/chain/btc.pn"}}),(0,o.jsx)(a.Image.Fallback,{children:(0,o.jsx)(a.Icon,{size:"$14",$gtLg:{size:"$12"},name:"GlobusOutline"})})]}),(0,o.jsxs)(a.Image,{size:"$14",borderRadius:"$3",$gtLg:{w:"$12",h:"$12"},children:[(0,o.jsx)(a.Image.Source,{delayMs:1e4,source:{uri:"https://uni.onekey-asset.com/static/chain/btc.pn"}}),(0,o.jsx)(a.Image.Fallback,{children:(0,o.jsx)(a.Icon,{size:"$14",$gtLg:{size:"$12"},name:"GlobusOutline"})}),(0,o.jsx)(a.Image.Loading,{children:(0,o.jsx)(a.Skeleton,{width:"100%",height:"100%"})})]})]})}],"data-sentry-element":"Layout","data-sentry-component":"ImageGallery","data-sentry-source-file":"/home/runner/work/app-monorepo/app-monorepo/packages/kit/src/views/Developer/pages/Gallery/Components/stories/Image.tsx"})}},654004:(e,t,s)=>{s.d(t,{P:()=>Layout});var a=s(586330),n=s(654266),o=s(490343),r=s(765388),i=s(643087),l=s(498356),c=s(193068),p=s(831085),FormattedText=function({text:e}){return"string"==typeof e?(0,p.jsx)(o.Stack,{children:(0,p.jsxs)(o.SizableText,{children:[e,"。 "]})}):Array.isArray(e)&&0===e.length?null:(0,p.jsx)(o.Stack,{"data-sentry-element":"Stack","data-sentry-component":"FormattedText","data-sentry-source-file":"/home/runner/work/app-monorepo/app-monorepo/packages/kit/src/views/Developer/pages/Gallery/Components/stories/utils/Layout.tsx",children:(0,p.jsx)(o.Stack,{gap:"$1","data-sentry-element":"Stack","data-sentry-source-file":"/home/runner/work/app-monorepo/app-monorepo/packages/kit/src/views/Developer/pages/Gallery/Components/stories/utils/Layout.tsx",children:e.map((function(t,s){return(0,p.jsx)(o.Stack,{children:(0,p.jsxs)(o.SizableText,{children:[s+1,". ",t,s===e.length-1?"。":"；"]})},s.toString())}))})})};function Layout({description:e="",suggestions:t=[],boundaryConditions:s=[],elements:d=[],scrollEnabled:g=!0,contentInsetAdjustmentBehavior:u="never",skipLoading:m=!1,children:h}){var x=(0,r.U6)(),k=(0,l.A)();return(0,p.jsx)(o.Page,{skipLoading:m,"data-sentry-element":"Page","data-sentry-component":"Layout","data-sentry-source-file":"/home/runner/work/app-monorepo/app-monorepo/packages/kit/src/views/Developer/pages/Gallery/Components/stories/utils/Layout.tsx",children:(0,p.jsx)(o.ScrollView,{maxWidth:"100%",scrollEnabled:g,flex:1,marginBottom:x,paddingHorizontal:"$5",contentContainerStyle:{paddingTop:20,paddingBottom:280},keyboardDismissMode:"on-drag",contentInsetAdjustmentBehavior:u,"data-sentry-element":"ScrollView","data-sentry-source-file":"/home/runner/work/app-monorepo/app-monorepo/packages/kit/src/views/Developer/pages/Gallery/Components/stories/utils/Layout.tsx",children:(0,p.jsxs)(o.Stack,{marginHorizontal:"auto",maxWidth:"100%",width:576,gap:"$6","data-sentry-element":"Stack","data-sentry-source-file":"/home/runner/work/app-monorepo/app-monorepo/packages/kit/src/views/Developer/pages/Gallery/Components/stories/utils/Layout.tsx",children:[(0,p.jsxs)(o.XStack,{"data-sentry-element":"XStack","data-sentry-source-file":"/home/runner/work/app-monorepo/app-monorepo/packages/kit/src/views/Developer/pages/Gallery/Components/stories/utils/Layout.tsx",children:[(0,p.jsx)(o.IconButton,{icon:"HomeLineOutline",onPress:function(){k.dispatch(n.y9.replace(c.WP.Main,{screen:c.V4.Developer,params:{screen:c.f$.TabDeveloper}}))},"data-sentry-element":"IconButton","data-sentry-source-file":"/home/runner/work/app-monorepo/app-monorepo/packages/kit/src/views/Developer/pages/Gallery/Components/stories/utils/Layout.tsx"}),(0,p.jsx)(o.Button,{ml:"$4",onPress:(0,a.A)((function*(){yield i.A.serviceSetting.setTheme("light")})),"data-sentry-element":"Button","data-sentry-source-file":"/home/runner/work/app-monorepo/app-monorepo/packages/kit/src/views/Developer/pages/Gallery/Components/stories/utils/Layout.tsx",children:"Light Theme"}),(0,p.jsx)(o.Button,{ml:"$4",variant:"primary",onPress:(0,a.A)((function*(){yield i.A.serviceSetting.setTheme("dark")})),"data-sentry-element":"Button","data-sentry-source-file":"/home/runner/work/app-monorepo/app-monorepo/packages/kit/src/views/Developer/pages/Gallery/Components/stories/utils/Layout.tsx",children:"Dark Theme"})]}),e?(0,p.jsxs)(o.Stack,{gap:"$2",children:[(0,p.jsx)(o.Stack,{children:(0,p.jsx)(o.SizableText,{size:"$headingXl",children:"使用说明"})}),(0,p.jsx)(o.Stack,{children:(0,p.jsx)(FormattedText,{text:e})})]}):null,t?(0,p.jsxs)(o.Stack,{gap:"$2",children:[(0,p.jsx)(o.Stack,{children:(0,p.jsx)(o.SizableText,{size:"$headingXl",children:"使用建议"})}),(0,p.jsx)(FormattedText,{text:t})]}):null,s?.length>0?(0,p.jsxs)(o.Stack,{gap:"$2",children:[(0,p.jsx)(o.Stack,{children:(0,p.jsx)(o.SizableText,{size:"$headingXl",children:"注意事项"})}),(0,p.jsx)(FormattedText,{text:s})]}):null,(0,p.jsxs)(o.Stack,{gap:"$2","data-sentry-element":"Stack","data-sentry-source-file":"/home/runner/work/app-monorepo/app-monorepo/packages/kit/src/views/Developer/pages/Gallery/Components/stories/utils/Layout.tsx",children:[(0,p.jsx)(o.Stack,{"data-sentry-element":"Stack","data-sentry-source-file":"/home/runner/work/app-monorepo/app-monorepo/packages/kit/src/views/Developer/pages/Gallery/Components/stories/utils/Layout.tsx",children:(0,p.jsx)(o.SizableText,{size:"$headingXl","data-sentry-element":"SizableText","data-sentry-source-file":"/home/runner/work/app-monorepo/app-monorepo/packages/kit/src/views/Developer/pages/Gallery/Components/stories/utils/Layout.tsx",children:"组件案例"})}),(0,p.jsx)(o.Stack,{"data-sentry-element":"Stack","data-sentry-source-file":"/home/runner/work/app-monorepo/app-monorepo/packages/kit/src/views/Developer/pages/Gallery/Components/stories/utils/Layout.tsx",children:d?.map((function(e,t){return(0,p.jsxs)(o.Stack,{gap:"$2",pb:"$8",mb:"$8",borderBottomWidth:"$px",borderBottomColor:"$borderSubdued",children:[(0,p.jsxs)(o.Stack,{flexDirection:"column",children:[(0,p.jsx)(o.SizableText,{size:"$headingLg",children:e.title}),e.description?(0,p.jsx)(o.Stack,{paddingTop:1,children:(0,p.jsxs)(o.SizableText,{children:[e.description,"。"]})}):null]}),(0,p.jsx)(o.Stack,{children:"function"==typeof e.element?(0,p.jsx)(e.element,{}):e.element})]},`elements-${t}`)}))}),(0,p.jsx)(o.Stack,{"data-sentry-element":"Stack","data-sentry-source-file":"/home/runner/work/app-monorepo/app-monorepo/packages/kit/src/views/Developer/pages/Gallery/Components/stories/utils/Layout.tsx",children:h?(0,p.jsx)(o.Stack,{gap:"$3",children:h}):null})]})]})})})}},686065:(e,t,s)=>{e.exports=s.p+"static/media/cosmos_keplr.0444b850b1aef9e13a57.png"}}]);
//# sourceMappingURL=43725.8e7ddbd90c.chunk.js.map