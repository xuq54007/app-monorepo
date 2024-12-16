!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="558cd9d3-5974-4abf-8927-f9350bf10065",e._sentryDebugIdIdentifier="sentry-dbid-558cd9d3-5974-4abf-8927-f9350bf10065")}catch(e){}}();var _global="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{};_global.SENTRY_RELEASE={id:"5.5.0 (2024121652)"},(self.webpackChunkweb=self.webpackChunkweb||[]).push([[7885],{82506:(e,n,o)=>{o.d(n,{d:()=>useDebounce});var t=o(578104);function useDebounce(e,n,o){var[r]=(0,t.d7)(e,n,o);return r}},278484:(e,n,o)=>{o.d(n,{wI:()=>DAppAccountListItem,ZY:()=>DAppAccountListStandAloneItem,X1:()=>DAppAccountListStandAloneItemForHomeScene,VV:()=>WalletConnectAccountTriggerList});var t=o(460986),r=o.n(t),a=o(324586),s=o(586330),c=o(514041),i=o(908867),p=o(17617),u=o(490343),l=o(643087),d=o(325809),m=o(237532),A=o(24284),g=o(911998),f=o(162616),w=o(226952),k=o(334439),h=(o(663522),o(584186)),y=o(714191),b=o(82506);var v=o(831085);function ownKeys(e,n){var o=Object.keys(e);if(Object.getOwnPropertySymbols){var t=Object.getOwnPropertySymbols(e);n&&(t=t.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),o.push.apply(o,t)}return o}function _objectSpread(e){for(var n=1;n<arguments.length;n++){var o=null!=arguments[n]?arguments[n]:{};n%2?ownKeys(Object(o),!0).forEach((function(n){(0,a.A)(e,n,o[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(o)):ownKeys(Object(o)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(o,n))}))}return e}function DAppAccountListInitFromHome({num:e,shouldSyncFromHome:n}){var[,o]=(0,f.K7)(),t=(0,f.z$)();return(0,c.useEffect)((function(){return(0,s.A)((function*(){try{o((function(n){return _objectSpread(_objectSpread({},n),{},{[e]:{isLoading:!0}})})),yield h.A.wait(600),n&&(yield t.current.syncFromScene({from:{sceneName:y.Zs.home,sceneNum:0},num:e}))}finally{n&&(yield h.A.wait(300)),o((function(n){return _objectSpread(_objectSpread({},n),{},{[e]:{isLoading:!1}})}))}}))(),function(){o((function(n){return _objectSpread(_objectSpread({},n),{},{[e]:{isLoading:!1}})}))}}),[t,e,o,n]),null}function DAppAccountListItem({num:e,handleAccountChanged:n,readonly:o,networkReadonly:t,compressionUiMode:r,initFromHome:a,beforeShowTrigger:s,skeletonRenderDuration:i}){!function useHandleDiscoveryAccountChanged({num:e,handleAccountChanged:n}){var{activeAccount:o}=(0,f.LH)({num:e}),{selectedAccount:t}=(0,f.wz)({num:e}),r=(0,b.d)(o,200),a=(0,b.d)(t,200),s=(0,c.useRef)(o),i=(0,c.useRef)(t);(0,c.useEffect)((function(){s.current=o,i.current=t}),[o,t]),(0,c.useEffect)((function(){n&&(r.isOthersWallet&&r.account?.id===a.othersWalletAccountId||r.indexedAccount?.id===a.indexedAccountId)&&n({activeAccount:s.current,selectedAccount:i.current},e)}),[r,a,n,e])}({num:e,handleAccountChanged:n});var l=Boolean(a&&!o);return(0,v.jsxs)(v.Fragment,{children:[(0,v.jsxs)(u.YGroup,{bg:"$bg",borderRadius:"$3",borderColor:"$borderSubdued",borderWidth:p.A.hairlineWidth,separator:(0,v.jsx)(u.Divider,{}),disabled:o,"data-sentry-element":"YGroup","data-sentry-source-file":"/home/runner/work/app-monorepo/app-monorepo/packages/kit/src/views/DAppConnection/components/DAppAccountList/DAppAccountListItem.tsx",children:[(0,v.jsx)(u.YGroup.Item,{"data-sentry-element":"unknown","data-sentry-source-file":"/home/runner/work/app-monorepo/app-monorepo/packages/kit/src/views/DAppConnection/components/DAppAccountList/DAppAccountListItem.tsx",children:(0,v.jsx)(d.jY,{num:e,beforeShowTrigger:s,disabled:t||o,loadingDuration:0,"data-sentry-element":"NetworkSelectorTriggerDappConnection","data-sentry-source-file":"/home/runner/work/app-monorepo/app-monorepo/packages/kit/src/views/DAppConnection/components/DAppAccountList/DAppAccountListItem.tsx"})}),(0,v.jsx)(u.YGroup.Item,{"data-sentry-element":"unknown","data-sentry-source-file":"/home/runner/work/app-monorepo/app-monorepo/packages/kit/src/views/DAppConnection/components/DAppAccountList/DAppAccountListItem.tsx",children:(0,v.jsx)(m.Up,{num:e,compressionUiMode:r,beforeShowTrigger:s,loadingDuration:0,"data-sentry-element":"AccountSelectorTriggerDappConnection","data-sentry-source-file":"/home/runner/work/app-monorepo/app-monorepo/packages/kit/src/views/DAppConnection/components/DAppAccountList/DAppAccountListItem.tsx"})})]}),(0,v.jsx)(DAppAccountListInitFromHome,{num:e,shouldSyncFromHome:l,"data-sentry-element":"DAppAccountListInitFromHome","data-sentry-source-file":"/home/runner/work/app-monorepo/app-monorepo/packages/kit/src/views/DAppConnection/components/DAppAccountList/DAppAccountListItem.tsx"})]})}function DAppAccountListStandAloneItem({readonly:e,handleAccountChanged:n,onConnectedAccountInfoChanged:o}){var t=(0,i.A)(),{serviceDApp:a,serviceNetwork:p}=l.A,{$sourceInfo:m}=(0,A.A)(),{result:f}=(0,g.yk)((0,s.A)((function*(){var e,n;if(!m?.origin||!m.scope)return{accountSelectorNum:null,networkIds:null};var o=(0,w.zg)(m.scope),t=o?(yield p.getNetworkIdsByImpls({impls:o})).networkIds:null,r=yield a.getConnectedAccountsInfo({origin:m.origin,scope:null!=(e=m.scope)?e:"",isWalletConnectRequest:m.isWalletConnectRequest});return Array.isArray(r)&&r.length>0&&"number"==typeof r[0]?.num?{accountSelectorNum:r[0].num,networkIds:t,existConnectedAccount:!0}:{accountSelectorNum:yield a.getAccountSelectorNum({origin:m.origin,scope:null!=(n=m.scope)?n:"",isWalletConnectRequest:m.isWalletConnectRequest}),networkIds:t,existConnectedAccount:!1}})),[m?.origin,m?.scope,m?.isWalletConnectRequest,a,p]);return(0,c.useEffect)((function(){r()(f?.accountSelectorNum)&&o&&o({num:f.accountSelectorNum,existConnectedAccount:f.existConnectedAccount})}),[f?.accountSelectorNum,f?.existConnectedAccount,o]),(0,v.jsxs)(u.YStack,{gap:"$2",testID:"DAppAccountListStandAloneItem","data-sentry-element":"YStack","data-sentry-component":"DAppAccountListStandAloneItem","data-sentry-source-file":"/home/runner/work/app-monorepo/app-monorepo/packages/kit/src/views/DAppConnection/components/DAppAccountList/DAppAccountListItem.tsx",children:[(0,v.jsx)(u.SizableText,{size:"$headingMd",color:"$text","data-sentry-element":"SizableText","data-sentry-source-file":"/home/runner/work/app-monorepo/app-monorepo/packages/kit/src/views/DAppConnection/components/DAppAccountList/DAppAccountListItem.tsx",children:t.formatMessage({id:k.ETranslations.global_accounts})}),"number"==typeof f?.accountSelectorNum&&Array.isArray(f?.networkIds)?(0,v.jsx)(d.b8,{config:{sceneName:y.Zs.discover,sceneUrl:m?.origin},enabledNum:[f.accountSelectorNum],availableNetworksMap:{[f.accountSelectorNum]:{networkIds:f.networkIds}},children:(0,v.jsx)(DAppAccountListItem,{initFromHome:!f?.existConnectedAccount,num:f?.accountSelectorNum,handleAccountChanged:n,readonly:e})}):null]})}function DAppAccountListStandAloneItemForHomeScene(){var e=(0,i.A)();return(0,v.jsxs)(u.YStack,{gap:"$2",testID:"DAppAccountListStandAloneItem","data-sentry-element":"YStack","data-sentry-component":"DAppAccountListStandAloneItemForHomeScene","data-sentry-source-file":"/home/runner/work/app-monorepo/app-monorepo/packages/kit/src/views/DAppConnection/components/DAppAccountList/DAppAccountListItem.tsx",children:[(0,v.jsx)(u.SizableText,{size:"$headingMd",color:"$text","data-sentry-element":"SizableText","data-sentry-source-file":"/home/runner/work/app-monorepo/app-monorepo/packages/kit/src/views/DAppConnection/components/DAppAccountList/DAppAccountListItem.tsx",children:e.formatMessage({id:k.ETranslations.global_accounts})}),(0,v.jsx)(d.b8,{config:{sceneName:y.Zs.home},enabledNum:[0],"data-sentry-element":"AccountSelectorProviderMirror","data-sentry-source-file":"/home/runner/work/app-monorepo/app-monorepo/packages/kit/src/views/DAppConnection/components/DAppAccountList/DAppAccountListItem.tsx",children:(0,v.jsx)(DAppAccountListItem,{initFromHome:!1,num:0,readonly:!0,"data-sentry-element":"DAppAccountListItem","data-sentry-source-file":"/home/runner/work/app-monorepo/app-monorepo/packages/kit/src/views/DAppConnection/components/DAppAccountList/DAppAccountListItem.tsx"})})]})}function WalletConnectAccountTriggerList({sceneUrl:e,sessionAccountsInfo:n,handleAccountChanged:o}){var t=n.map((function(e){return e.accountSelectorNum})),r=n.reduce((function(e,n){var o=n.networkIds.filter(Boolean);return e[n.accountSelectorNum]={networkIds:o,defaultNetworkId:o[0]},e}),{});return(0,v.jsxs)(u.YStack,{gap:"$2","data-sentry-element":"YStack","data-sentry-component":"WalletConnectAccountTriggerList","data-sentry-source-file":"/home/runner/work/app-monorepo/app-monorepo/packages/kit/src/views/DAppConnection/components/DAppAccountList/DAppAccountListItem.tsx",children:[(0,v.jsx)(u.SizableText,{size:"$headingMd",color:"$text","data-sentry-element":"SizableText","data-sentry-source-file":"/home/runner/work/app-monorepo/app-monorepo/packages/kit/src/views/DAppConnection/components/DAppAccountList/DAppAccountListItem.tsx",children:"Accounts"}),Array.isArray(n)&&n.length?(0,v.jsx)(d.b8,{config:{sceneName:y.Zs.discover,sceneUrl:e},enabledNum:t,availableNetworksMap:r,children:(0,v.jsx)(u.YStack,{gap:"$2",children:n.map((function(e){return(0,v.jsx)(u.Stack,{children:(0,v.jsx)(DAppAccountListItem,{initFromHome:!0,num:e.accountSelectorNum,handleAccountChanged:o})},e.accountSelectorNum)}))})}):null]})}},980342:(e,n,o)=>{o.d(n,{A:()=>s,z:()=>useDappCloseHandler});var t=o(490343),r=o(42484),a=o(831085);function useDappCloseHandler(e,n){return function(o){o?.flag!==r.nd.Confirmed&&e.reject(),"function"==typeof n&&n(o)}}const s=function DappOpenModalPage({children:e,onClose:n,dappApprove:o}){var r=useDappCloseHandler(o,n);return(0,a.jsxs)(t.Page,{scrollEnabled:!0,onClose:r,"data-sentry-element":"Page","data-sentry-component":"DappOpenModalPage","data-sentry-source-file":"/home/runner/work/app-monorepo/app-monorepo/packages/kit/src/views/DAppConnection/pages/DappOpenModalPage.tsx",children:[(0,a.jsx)(t.Page.Header,{headerShown:!1,"data-sentry-element":"unknown","data-sentry-source-file":"/home/runner/work/app-monorepo/app-monorepo/packages/kit/src/views/DAppConnection/pages/DappOpenModalPage.tsx"}),e]})}},646433:(e,n,o)=>{o.d(n,{A:()=>l});var t=o(514041),r=o(241440),a=o(908867),s=o(490343),c=o(334439),i=o(643087),p=o(911998),u=o(831085);const l=function LNMakeInvoiceForm(e){var{networkId:n,useFormReturn:o,amount:l,minimumAmount:d,maximumAmount:m,descriptionLabelId:A,memo:g,amountReadOnly:f}=e,w=(0,a.A)(),{result:k}=(0,p.yk)((function(){return i.A.serviceLightning.getInvoiceConfig({networkId:n})}),[n]),h=new r.A(null!=d?d:0).toNumber(),y=new r.A(null!=m?m:0).toNumber(),b=(0,t.useMemo)((function(){var e;return y&&y>0&&y>h&&y<Number(k?.maxReceiveAmount)&&(e=y),{min:{value:h,message:w.formatMessage({id:c.ETranslations.dapp_connect_amount_should_be_at_least},{0:h})},max:e?{value:e,message:w.formatMessage({id:c.ETranslations.dapp_connect_amount_should_not_exceed},{0:e})}:void 0,pattern:{value:/^[0-9]*$/,message:w.formatMessage({id:c.ETranslations.send_field_only_integer})},validate:function(e){if(!(h<=0)||e){var n=new r.A(e);return n.isInteger()?k?.maxReceiveAmount&&n.isGreaterThan(k?.maxReceiveAmount)?w.formatMessage({id:c.ETranslations.dapp_connect_amount_should_not_exceed},{0:k?.maxReceiveAmount}):void 0:w.formatMessage({id:c.ETranslations.send_field_only_integer})}}}}),[h,y,k,w]),v=(0,t.useMemo)((function(){if(!(Number(l)>0||h>0&&h===y))return h>0&&y>0?w.formatMessage({id:c.ETranslations.dapp_connect_sats_between},{min:h,max:y<h?k?.maxReceiveAmount:Math.min(y,Number(k?.maxReceiveAmount))}):void 0}),[l,h,y,k,w]);return(0,u.jsxs)(s.Form,{form:o,"data-sentry-element":"Form","data-sentry-component":"LNMakeInvoiceForm","data-sentry-source-file":"/home/runner/work/app-monorepo/app-monorepo/packages/kit/src/views/LightningNetwork/components/LNMakeInvoiceForm.tsx",children:[(0,u.jsx)(s.Form.Field,{label:w.formatMessage({id:c.ETranslations.send_amount}),name:"amount",rules:b,labelAddon:v,"data-sentry-element":"unknown","data-sentry-source-file":"/home/runner/work/app-monorepo/app-monorepo/packages/kit/src/views/LightningNetwork/components/LNMakeInvoiceForm.tsx",children:(0,u.jsx)(s.Input,{editable:!f,readonly:f,placeholder:w.formatMessage({id:c.ETranslations.dapp_connect_enter_amount}),flex:1,addOns:[{label:w.formatMessage({id:c.ETranslations.global_sats})}],"data-sentry-element":"Input","data-sentry-source-file":"/home/runner/work/app-monorepo/app-monorepo/packages/kit/src/views/LightningNetwork/components/LNMakeInvoiceForm.tsx"})}),(0,u.jsx)(s.Form.Field,{label:w.formatMessage({id:null!=A?A:c.ETranslations.global_description}),name:"description",rules:{maxLength:{value:40,message:w.formatMessage({id:c.ETranslations.dapp_connect_msg_description_can_be_up_to_int_characters},{number:"40"})}},defaultValue:"","data-sentry-element":"unknown","data-sentry-source-file":"/home/runner/work/app-monorepo/app-monorepo/packages/kit/src/views/LightningNetwork/components/LNMakeInvoiceForm.tsx",children:(0,u.jsx)(s.TextArea,{editable:!g,"data-sentry-element":"TextArea","data-sentry-source-file":"/home/runner/work/app-monorepo/app-monorepo/packages/kit/src/views/LightningNetwork/components/LNMakeInvoiceForm.tsx"})})]})}},307885:(e,n,o)=>{o.r(n),o.d(n,{default:()=>b});var t=o(586330),r=o(514041),a=o(654266),s=o(241440),c=o(908867),i=o(490343),p=o(643087),u=o(796895),l=o(24284),d=o(980342),m=o(507140),A=o(334439),g=o(42484),f=o(278484),w=o(864961),k=o(905710),h=o(646433),y=o(831085);const b=function LnurlWithdrawModal(){var e,n,o,b,v=(0,c.A)(),x=(0,a.lq)().params,{isSendFlow:D}=x,L=(0,l.A)(),{$sourceInfo:I}=L,{accountId:S,networkId:C,lnurlDetails:_}=D?x:L,j=(0,r.useMemo)((function(){if(_?.url)return new URL(_.url).origin}),[_?.url]),N=(0,u.A)({id:null!=(e=I?.id)?e:"",closeWindowAfterResolved:!0}),[M,T]=(0,r.useState)(!1),{showContinueOperate:F,continueOperate:O,setContinueOperate:R,riskLevel:E,urlSecurityInfo:W}=(0,k.q)({origin:null!=j?j:""}),P=Math.floor(Number(null!=(n=_?.minWithdrawable)?n:0)/1e3),H=Math.floor(Number(null!=(o=_?.maxWithdrawable)?o:0)/1e3),$=(0,i.useForm)({defaultValues:{amount:P>0&&P===H?`${P}`:"",description:_.defaultDescription}}),Y=(0,r.useCallback)((b=(0,t.A)((function*(e){if(_&&!M&&(yield $.trigger())){T(!0);var{serviceLightning:n}=p.A,o=$.getValues(),t=new s.A(o.amount).times(1e3).toNumber();try{var r=yield n.createInvoice({networkId:C,accountId:S,amount:new s.A(t).toString(),description:_.defaultDescription}),{callback:a,k1:c}=_;yield n.fetchLnurlWithdrawRequestResult({callback:a,k1:c,pr:r.payment_request}),D||N.resolve(),i.Toast.success({title:"Withdrawer success"}),e?.({flag:g.nd.Confirmed})}catch(n){var u=n?.message;throw D||setTimeout((function(){N.resolve({close:function(){e?.({flag:g.nd.Confirmed})},result:{status:"ERROR",reason:u}})}),1500),new m.oZ({message:u,autoToast:!0})}finally{T(!1)}}})),function(e){return b.apply(this,arguments)}),[$,M,_,C,S,N,D]);return(0,y.jsx)(d.A,{dappApprove:N,"data-sentry-element":"DappOpenModalPage","data-sentry-component":"LnurlWithdrawModal","data-sentry-source-file":"/home/runner/work/app-monorepo/app-monorepo/packages/kit/src/views/LightningNetwork/pages/Send/LnurlWithdrawModal.tsx",children:(0,y.jsxs)(y.Fragment,{children:[(0,y.jsx)(i.Page.Header,{headerShown:!1,"data-sentry-element":"unknown","data-sentry-source-file":"/home/runner/work/app-monorepo/app-monorepo/packages/kit/src/views/LightningNetwork/pages/Send/LnurlWithdrawModal.tsx"}),(0,y.jsx)(i.Page.Body,{"data-sentry-element":"unknown","data-sentry-source-file":"/home/runner/work/app-monorepo/app-monorepo/packages/kit/src/views/LightningNetwork/pages/Send/LnurlWithdrawModal.tsx",children:(0,y.jsxs)(w.HJ,{title:v.formatMessage({id:A.ETranslations.dapp_connect_lnurl_withdraw_request}),subtitleShown:!1,origin:null!=j?j:"",urlSecurityInfo:W,"data-sentry-element":"DAppRequestLayout","data-sentry-source-file":"/home/runner/work/app-monorepo/app-monorepo/packages/kit/src/views/LightningNetwork/pages/Send/LnurlWithdrawModal.tsx",children:[D?(0,y.jsx)(f.X1,{}):(0,y.jsx)(f.ZY,{readonly:!0}),(0,y.jsx)(h.A,{accountId:S,networkId:C,useFormReturn:$,amount:P===H?P:void 0,amountReadOnly:P===H,minimumAmount:P,maximumAmount:H,memo:_.defaultDescription,"data-sentry-element":"LNMakeInvoiceForm","data-sentry-source-file":"/home/runner/work/app-monorepo/app-monorepo/packages/kit/src/views/LightningNetwork/pages/Send/LnurlWithdrawModal.tsx"})]})}),(0,y.jsx)(i.Page.Footer,{"data-sentry-element":"unknown","data-sentry-source-file":"/home/runner/work/app-monorepo/app-monorepo/packages/kit/src/views/LightningNetwork/pages/Send/LnurlWithdrawModal.tsx",children:(0,y.jsx)(w.OS,{confirmText:v.formatMessage({id:A.ETranslations.global_withdraw}),continueOperate:O,setContinueOperate:function(e){R(!!e)},onConfirm:Y,onCancel:function(){D||N.reject()},confirmButtonProps:{loading:M,disabled:!O},showContinueOperateCheckbox:F,riskLevel:E,"data-sentry-element":"DAppRequestFooter","data-sentry-source-file":"/home/runner/work/app-monorepo/app-monorepo/packages/kit/src/views/LightningNetwork/pages/Send/LnurlWithdrawModal.tsx"})})]})})}}}]);
//# sourceMappingURL=7885.2f89f0eb0c.chunk.js.map