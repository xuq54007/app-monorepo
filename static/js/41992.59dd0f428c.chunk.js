!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},t=(new e.Error).stack;t&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[t]="3abb0f1e-fba0-499f-a57b-9e59a5b78b69",e._sentryDebugIdIdentifier="sentry-dbid-3abb0f1e-fba0-499f-a57b-9e59a5b78b69")}catch(e){}}();var _global="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{};_global.SENTRY_RELEASE={id:"5.5.0 (2024121652)"},(self.webpackChunkweb=self.webpackChunkweb||[]).push([[41992],{341992:(e,t,n)=>{n.r(t),n.d(t,{default:()=>List});var a=n(324586),r=n(586330),o=n(514041),s=n(654266),i=n(908867),p=n(490343),c=n(643087),u=n(791088),d=n(498356),l=n(911998),b=n(153763),f=n(334439),m=n(663522),y=n(193068),k=n(567807),w=n(831085);function ownKeys(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function _objectSpread(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?ownKeys(Object(n),!0).forEach((function(t){(0,a.A)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):ownKeys(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function List(){var e=(0,i.A)(),t=(0,d.A)(),n=(0,s.lq)(),{deviceInfo:a}=n.params,{result:g,run:_}=(0,l.yk)((0,r.A)((function*(){return(yield c.A.serviceCloudBackup.getBackupListFromDevice(a)).map((function(t){return _objectSpread(_objectSpread({},t),{},{title:(0,k.Yq)(new Date(t.backupTime)),detail:e.formatMessage({id:f.ETranslations.backup_number_wallets_number_accounts},{number0:t.walletCount,number1:t.accountCount})})}))})),[e,a]),j=(0,b.E)();return(0,o.useEffect)((function(){j&&_()}),[j,_]),(0,w.jsxs)(p.Page,{"data-sentry-element":"Page","data-sentry-component":"List","data-sentry-source-file":"/home/runner/work/app-monorepo/app-monorepo/packages/kit/src/views/CloudBackup/pages/List/index.tsx",children:[(0,w.jsx)(p.Page.Header,{title:a.deviceName,"data-sentry-element":"unknown","data-sentry-source-file":"/home/runner/work/app-monorepo/app-monorepo/packages/kit/src/views/CloudBackup/pages/List/index.tsx"}),(0,w.jsx)(p.Page.Body,{"data-sentry-element":"unknown","data-sentry-source-file":"/home/runner/work/app-monorepo/app-monorepo/packages/kit/src/views/CloudBackup/pages/List/index.tsx",children:(0,w.jsx)(p.ListView,{data:g,renderItem:function({item:e}){return(0,w.jsx)(u.c,{onPress:function(){t.pushModal(y.ry.CloudBackupModal,{screen:y.pc.CloudBackupDetail,params:{item:e}})},title:e.title,subtitle:e.detail,drillIn:!0})},estimatedItemSize:"$16",ListFooterComponent:(0,w.jsx)(p.SizableText,{size:"$bodySm",color:"$textSubdued",px:"$5",pt:"$3",children:e.formatMessage({id:f.ETranslations.backup_securely_store_recent_backups})}),ListEmptyComponent:(0,w.jsx)(p.Empty,{icon:"SearchOutline",title:e.formatMessage({id:f.ETranslations.backup_no_data}),description:e.formatMessage({id:m.Ay.isNativeAndroid?f.ETranslations.backup_no_available_google_drive_backups_to_import:f.ETranslations.backup_no_available_icloud_backups_to_import})}),"data-sentry-element":"ListView","data-sentry-source-file":"/home/runner/work/app-monorepo/app-monorepo/packages/kit/src/views/CloudBackup/pages/List/index.tsx"})})]})}}}]);
//# sourceMappingURL=41992.59dd0f428c.chunk.js.map