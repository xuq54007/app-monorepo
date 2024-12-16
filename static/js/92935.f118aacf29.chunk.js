!function(){try{var t="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},e=(new t.Error).stack;e&&(t._sentryDebugIds=t._sentryDebugIds||{},t._sentryDebugIds[e]="e0c453f9-2010-4f52-9fbe-c649ce468636",t._sentryDebugIdIdentifier="sentry-dbid-e0c453f9-2010-4f52-9fbe-c649ce468636")}catch(t){}}();var _global="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{};_global.SENTRY_RELEASE={id:"5.5.0 (2024121652)"},(self.webpackChunkweb=self.webpackChunkweb||[]).push([[92935],{630420:(t,e,n)=>{"use strict";n.d(e,{_:()=>f});var r=n(646123),i=n.n(r),s=n(586330),a=n(230414),o=n(21756),u=n(507140),c=n(334439),p=n(545179),f=function(){function RestAPIClient(t){this.axios=o.A.create({baseURL:t,timeout:3e4})}var t,e,n,r,f,d,l,y,g=RestAPIClient.prototype;return g.getBlockdag=(t=(0,s.A)((function*(){try{return(yield this.axios.get("/info/blockdag",{headers:{"Content-Type":"application/json"}})).data}catch(t){return{networkName:"",blockCount:"0",headerCount:"0",virtualDaaScore:"0"}}})),function getBlockdag(){return t.apply(this,arguments)}),g.getNetworkInfo=(e=(0,s.A)((function*(){try{return(yield this.axios.get("/info/network",{headers:{"Content-Type":"application/json"}})).data}catch(t){return{networkName:"",blockCount:"0",headerCount:"0",virtualDaaScore:"0"}}})),function getNetworkInfo(){return e.apply(this,arguments)}),g.queryBalance=(n=(0,s.A)((function*(t){try{return(yield this.axios.get(`/addresses/${t}/balance`,{headers:{"Content-Type":"application/json"}})).data.balance}catch(t){return 0n}})),function queryBalance(t){return n.apply(this,arguments)}),g.queryUtxos=(r=(0,s.A)((function*(t){try{return(yield this.axios.get(`/addresses/${t}/utxos`,{headers:{"Content-Type":"application/json"}})).data}catch(t){return[]}})),function queryUtxos(t){return r.apply(this,arguments)}),g.sendRawTransaction=(f=(0,s.A)((function*(t){var e=(0,p.UW)(t);return this.axios.post("/transactions",e,{headers:{"Content-Type":"application/json"}}).then((function(t){return t.data.transactionId})).catch((function(t){var e=i()(t,"response.data.error","");if(e.match(/payment of \d+ is dust/))throw new u.He({message:e,key:c.ETranslations.send_amount_too_small});if(-1!==e.toLowerCase().indexOf("insufficient balance"))throw new u.He({message:e,key:c.ETranslations.earn_insufficient_balance});throw new u.He(e)}))})),function sendRawTransaction(t){return f.apply(this,arguments)}),g.getTransaction=(d=(0,s.A)((function*(t){return(yield this.axios.get(`/transactions/${t}?inputs=true&outputs=true&resolve_previous_outpoints=light`,{headers:{"Content-Type":"application/json"}})).data})),function getTransaction(t){return d.apply(this,arguments)}),g.getTransactions=(l=(0,s.A)((function*(t){return(yield this.axios.post("/transactions/search?resolve_previous_outpoints=light",{transactionIds:[...t]},{headers:{"Content-Type":"application/json"}})).data})),function getTransactions(t){return l.apply(this,arguments)}),g.getTransactionsByAddress=(y=(0,s.A)((function*(t){return(yield this.axios.get(`/addresses/${t}/full-transactions?limit=50&offset=0&resolve_previous_outpoints=light`,{headers:{"Content-Type":"application/json"}})).data})),function getTransactionsByAddress(t){return y.apply(this,arguments)}),(0,a.A)(RestAPIClient)}()},729047:(t,e,n)=>{"use strict";n.d(e,{CI:()=>o,H2:()=>u,Wu:()=>r,aF:()=>a,du:()=>s,uR:()=>i});var r=10,i=2e7,s=1e6,a=1e5,o=1,u=0},603508:(t,e,n)=>{"use strict";n.d(e,{CONFIRMATION_COUNT:()=>s.Wu,DEFAULT_FEE_RATE:()=>s.CI,DUST_AMOUNT:()=>s.uR,EKaspaSignType:()=>p,MAX_BLOCK_SIZE:()=>s.du,MAX_ORPHAN_TX_MASS:()=>s.aF,SignatureType:()=>f.D7,SigningMethodType:()=>f.Ne,addressFromPublicKey:()=>addressFromPublicKey,isValidAddress:()=>isValidAddress,privateKeyFromBuffer:()=>privateKeyFromBuffer,privateKeyFromOriginPrivateKey:()=>privateKeyFromOriginPrivateKey,privateKeyFromWIF:()=>privateKeyFromWIF,publicKeyFromOriginPubkey:()=>publicKeyFromOriginPubkey,publicKeyFromX:()=>publicKeyFromX,selectUTXOs:()=>selectUTXOs,signTransaction:()=>f.Wg,toTransaction:()=>f.EX});var r=n(387473),i=function(t){return t.PayToPublicKey="pubkey",t.PayToScriptHash="scripthash",t}({});function addressFromPublicKey(t,e){return r.Address.fromPublicKey(t,e).toString()}function isValidAddress(t,e,n=i.PayToPublicKey){return r.Address.isValid(t,e,n)}n(630420);var s=n(729047),a=n(830036),o=n(894191),u=n(209188);function privateKeyFromWIF(t){return r.PrivateKey.fromWIF(t)}function privateKeyFromBuffer(t,e){return r.PrivateKey.fromBuffer(t,e)}function privateKeyFromOriginPrivateKey(t,e,n){var i=new Uint8Array(t),s=e;if(3===s[0]&&(i=u.A.privateNegate(i)),!i)throw new Error("Private key is required for tweaking signer!");var c=u.A.privateAdd(i,(0,o.q)(s.slice(1),void 0));return new r.PrivateKey((0,a.My)(c),n)}var c=n(901048).Buffer,p=function(t){return t.Schnorr="schnorr",t.ECDSA="ecdsa",t}({});function publicKeyFromX(t,e){var n=t?`02${e}`:`03${e}`;return r.PublicKey.fromString(n)}function publicKeyFromOriginPubkey(t){var e=(0,o.z)(c.from(t.slice(1)));if(!e)throw new Error("Public key tweak failed");var{parity:n,x:r}=e;return publicKeyFromX(0===n,(0,a.My)(r))}var f=n(545179),d=n(414637),l=n(241440),y=new l.A("18446744073709551615"),g=n(507140);function selectUTXOs(t,e,n){var r=function sortUXTO(t){return t.sort((function(t,e){return t.blockDaaScore-e.blockDaaScore||new l.g(e.satoshis).minus(t.satoshis).toNumber()||t.txid.localeCompare(e.txid)||t.vout-e.vout}))}(t),i=[],s=[],a=new l.g(0),o=0;for(var u of r){var c=new d.UnspentOutput(u);if(s.push(c.id),i.push(u),o+=c.mass,(a=a.plus(c.satoshis)).isGreaterThanOrEqualTo(e))break}if(a.isLessThan(e))throw new g.Cm;if(a.isGreaterThan(y))throw new Error("utxo amount is too large");return{utxoIds:s,utxos:i,mass:o}}},545179:(t,e,n)=>{"use strict";n.d(e,{D7:()=>y,EX:()=>toTransaction,Ne:()=>g,UW:()=>submitTransactionFromString,Wg:()=>signTransaction});var r=n(586330),i=n(830036),s=n(332084),a=n(387473),o=n(241440),u=n(507140),c=n(334439),p=n(424754),f=n(209188),d=n(729047),l=n(414637),y=function(t){return t[t.SIGHASH_ALL=1]="SIGHASH_ALL",t[t.SIGHASH_NONE=2]="SIGHASH_NONE",t[t.SIGHASH_SINGLE=3]="SIGHASH_SINGLE",t[t.SIGHASH_FORKID=64]="SIGHASH_FORKID",t[t.SIGHASH_ANYONECANPAY=128]="SIGHASH_ANYONECANPAY",t}({}),g=function(t){return t.ECDSA="ecdsa",t.Schnorr="schnorr",t}({});function toTransaction(t){var e,{inputs:n,outputs:r,mass:i}=t,{address:s}=n[0]||{},{address:p,value:f}=r[0],y=new o.A(f),g=new o.A(null!=(e=t.feeInfo?.price)?e:d.CI).multipliedBy(i).toFixed();if(t.hasMaxSend&&(y=y.minus(g)),y.isLessThan(0))throw new u.He({message:"Insufficient Balance.",key:c.ETranslations.swap_page_button_insufficient_balance});var h=(new a.Transaction).from(n.map((function(t){return new l.UnspentOutput(t)}))).to(p,y.toFixed()).setVersion(0).fee(parseInt(g,10)).change(s?.toString());return h.inputs.forEach((function(t){t.sequenceNumber=d.H2})),h}function _sign2(){return(_sign2=(0,r.A)((function*(t,e,n,r,o,u,c,d){var l=a.Transaction.Sighash.sighash(t,n,r,o,u,c);if("schnorr"===d){var y=(yield e.getPrivateKey()).toBuffer(),g=f.A.signSchnorr(l,y),h=(0,i.My)(g),S=a.crypto.Signature.fromString(p.A.stripHexPrefix(h)),v=S.toBuffer("schnorr").toString("hex");if(v.length<128)throw new Error(`Invalid Signature\nsecp256k1 sig:${p.A.hexlify(h)}\nSignature.fromString:${v}`);return S.compressed=!0,S.nhashtype=n,S}if("ecdsa"===d){var A=yield s._S(l,(yield e.getPrivateKey()).toBuffer()),b=p.A.hexlify(A),T=a.crypto.Signature.fromString(p.A.stripHexPrefix(b));return T.compressed=!0,T.nhashtype=n,T}}))).apply(this,arguments)}function getSignaturesWithInput(t,e,n,r){return _getSignaturesWithInput.apply(this,arguments)}function _getSignaturesWithInput(){return _getSignaturesWithInput=(0,r.A)((function*(t,e,n,r,i=y.SIGHASH_ALL|y.SIGHASH_FORKID,s=g.Schnorr){if(e instanceof a.Transaction.Input.PublicKey){var o=r.getPublicKey();if(o.toString()===p.A.hexlify(e?.output?.script?.getPublicKey(),{noPrefix:!0})){var u=yield function sign(t,e,n,r,i,s,a,o){return _sign2.apply(this,arguments)}(t,r,i,n,e.output?.script,e.output?.satoshis,void 0,s);return[new a.Transaction.Signature({publicKey:o,prevTxId:e.prevTxId,outputIndex:e.outputIndex,inputIndex:n,signature:u,sigtype:i})]}return[]}})),_getSignaturesWithInput.apply(this,arguments)}function _getSignatures(){return(_getSignatures=(0,r.A)((function*(t,e,n,r=y.SIGHASH_ALL|y.SIGHASH_FORKID,i=g.Schnorr){var s,a=[];for(var{input:o,index:u}of e)s=(yield getSignaturesWithInput(n,o,u,t,r,i))||[],a.push(...s);return a}))).apply(this,arguments)}function _sign3(){return _sign3=(0,r.A)((function*(t,e,n,r,i=g.ECDSA){var s=(yield function getSignatures(t,e,n){return _getSignatures.apply(this,arguments)}(t,e,n,r,i))||[];for(var a of s)n.inputs[a.inputIndex].addSignature(n,a,i);return n.toBuffer().toString("hex")})),_sign3.apply(this,arguments)}function signTransaction(t,e){for(var n=[],r=0;r<t.inputs.length;r+=1){var i=t.inputs[r];n.push({input:i,index:r})}return function _sign(t,e,n,r){return _sign3.apply(this,arguments)}(e,n,t,y.SIGHASH_ALL,g.Schnorr)}function submitTransactionFromString(t){var e=new a.Transaction(t),{nLockTime:n,version:r}=e;return{transaction:{version:r,inputs:e.inputs.map((function(t){return{previousOutpoint:{transactionId:t.prevTxId.toString("hex"),index:t.outputIndex},signatureScript:t.script.toBuffer().toString("hex"),sequence:d.H2,sigOpCount:1}})),outputs:e.outputs.map((function(t){return{amount:new o.A(t.satoshis).toFixed(),scriptPublicKey:{scriptPublicKey:t.script.toBuffer().toString("hex"),version:0}}})),lockTime:n,fee:e.fee,subnetworkId:"0000000000000000000000000000000000000000"}}}},187826:()=>{},414637:(t,e,n)=>{"use strict";n.d(e,{UnspentOutput:()=>i.f});var r=n(187826);n.o(r,"UnspentOutput")&&n.d(e,{UnspentOutput:function(){return r.UnspentOutput}}),n.o(r,"selectUTXOs")&&n.d(e,{selectUTXOs:function(){return r.selectUTXOs}});var i=n(829933)},829933:(t,e,n)=>{"use strict";n.d(e,{f:()=>u});var r=n(230414),i=n(929296),s=n(195309),a=n(972715),o=n(387473);function _createSuper(t){var e=_isNativeReflectConstruct();return function _createSuperInternal(){var n,r=(0,a.A)(t);if(e){var i=(0,a.A)(this).constructor;n=Reflect.construct(r,arguments,i)}else n=r.apply(this,arguments);return(0,s.A)(this,n)}}function _isNativeReflectConstruct(){try{var t=!Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){})))}catch(t){}return(_isNativeReflectConstruct=function(){return!!t})()}var u=function(t){(0,i.A)(UnspentOutput,t);var e=_createSuper(UnspentOutput);function UnspentOutput(t){var n;return(n=e.call(this,t)).blockDaaScore=t.blockDaaScore,n.scriptPublicKeyVersion=t.scriptPublicKeyVersion,n.id=`${n.txId}${n.outputIndex}`,n.signatureOPCount=n.script.getSignatureOperationsCount(),n.mass=n.signatureOPCount*o.Transaction.MassPerSigOp,n.mass+=151*o.Transaction.MassPerTxByte,n.scriptPubKey=t.scriptPubKey,n}return UnspentOutput.prototype.toJSON=function toJSON(){return{txid:this.txId,address:this.address.toString(),vout:this.outputIndex,scriptPubKey:this.scriptPubKey,satoshis:this.satoshis,blockDaaScore:this.blockDaaScore,scriptPublicKeyVersion:this.scriptPublicKeyVersion}},UnspentOutput.fromJSON=function fromJSON(t){return new UnspentOutput(t)},(0,r.A)(UnspentOutput)}(o.Transaction.UnspentOutput)},29301:(t,e,n)=>{"use strict";n.r(e),n.d(e,{default:()=>f});var r=n(241440),i=n(603508),s=n(404727),a=n(928557),o=n(334439),u=n(746661),c={default:{namePrefix:"KASPA",labelKey:o.ETranslations.bip44__standard,template:`m/44'/${a.TN}'/0'/0/${a.h2}`,coinType:a.TN}},p={impl:a._9,coinTypeDefault:a.TN,accountType:u.rX.SIMPLE,importedAccountEnabled:!0,hardwareAccountEnabled:!0,externalAccountEnabled:!1,watchingAccountEnabled:!0,supportExportedSecretKeys:[s.ECoreApiExportedSecretKeyType.privateKey],defaultFeePresetIndex:1,isUtxo:!1,isSingleToken:!0,NFTEnabled:!1,nonceRequired:!1,feeUTXORequired:!1,editFeeEnabled:!0,replaceTxEnabled:!1,estimatedFeePollingInterval:300,customRpcEnabled:!0,accountDeriveInfo:c,networkInfo:{default:{curve:"secp256k1",addressPrefix:""}},minTransferAmount:new r.A(i.DUST_AMOUNT).shiftedBy(-8).toString(),isNativeTokenContractAddressEmpty:!0};const f=Object.freeze(p)},937130:()=>{},527852:()=>{}}]);
//# sourceMappingURL=92935.f118aacf29.chunk.js.map