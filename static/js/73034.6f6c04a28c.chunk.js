/*! For license information please see 73034.6f6c04a28c.chunk.js.LICENSE.txt */
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},t=(new e.Error).stack;t&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[t]="385223bb-91ea-4820-8a19-03cabfec0f47",e._sentryDebugIdIdentifier="sentry-dbid-385223bb-91ea-4820-8a19-03cabfec0f47")}catch(e){}}();var _global="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{};_global.SENTRY_RELEASE={id:"5.5.0 (2024121652)"},(self.webpackChunkweb=self.webpackChunkweb||[]).push([[73034],{651446:e=>{"use strict";var t={white:37,black:30,blue:34,cyan:36,green:32,magenta:35,red:31,yellow:33,brightBlack:90,brightRed:91,brightGreen:92,brightYellow:93,brightBlue:94,brightMagenta:95,brightCyan:96,brightWhite:97},r={bgBlack:40,bgRed:41,bgGreen:42,bgYellow:43,bgBlue:44,bgMagenta:45,bgCyan:46,bgWhite:47,bgBrightBlack:100,bgBrightRed:101,bgBrightGreen:102,bgBrightYellow:103,bgBrightBlue:104,bgBrightMagenta:105,bgBrightCyan:106,bgBrightWhite:107},n={},o={},s={};Object.keys(t).forEach((function(e){var r=n[e]="["+t[e]+"m",i=o[e]="[39m";s[e]=function(e){return r+e+i}})),Object.keys(r).forEach((function(e){var t=n[e]="["+r[e]+"m",i=o[e]="[49m";s[e]=function(e){return t+e+i}})),e.exports=s,s.open=n,s.close=o},553511:(e,t,r)=>{"use strict";var n=r(901048).Buffer;class Layout{constructor(e,t){if(!Number.isInteger(e))throw new TypeError("span must be an integer");this.span=e,this.property=t}makeDestinationObject(){return{}}decode(e,t){throw new Error("Layout is abstract")}encode(e,t,r){throw new Error("Layout is abstract")}getSpan(e,t){if(0>this.span)throw new RangeError("indeterminate span");return this.span}replicate(e){const t=Object.create(this.constructor.prototype);return Object.assign(t,this),t.property=e,t}fromArray(e){}}function nameWithProperty(e,t){return t.property?e+"["+t.property+"]":e}t.Layout=Layout,t.nameWithProperty=nameWithProperty,t.bindConstructorLayout=function bindConstructorLayout(e,t){if("function"!=typeof e)throw new TypeError("Class must be constructor");if(e.hasOwnProperty("layout_"))throw new Error("Class is already bound to a layout");if(!(t&&t instanceof Layout))throw new TypeError("layout must be a Layout");if(t.hasOwnProperty("boundConstructor_"))throw new Error("layout is already bound to a constructor");e.layout_=t,t.boundConstructor_=e,t.makeDestinationObject=()=>new e,Object.defineProperty(e.prototype,"encode",{value:function(e,r){return t.encode(this,e,r)},writable:!0}),Object.defineProperty(e,"decode",{value:function(e,r){return t.decode(e,r)},writable:!0})};class ExternalLayout extends Layout{isCount(){throw new Error("ExternalLayout is abstract")}}class GreedyCount extends ExternalLayout{constructor(e,t){if(void 0===e&&(e=1),!Number.isInteger(e)||0>=e)throw new TypeError("elementSpan must be a (positive) integer");super(-1,t),this.elementSpan=e}isCount(){return!0}decode(e,t){void 0===t&&(t=0);const r=e.length-t;return Math.floor(r/this.elementSpan)}encode(e,t,r){return 0}}class OffsetLayout extends ExternalLayout{constructor(e,t,r){if(!(e instanceof Layout))throw new TypeError("layout must be a Layout");if(void 0===t)t=0;else if(!Number.isInteger(t))throw new TypeError("offset must be integer or undefined");super(e.span,r||e.property),this.layout=e,this.offset=t}isCount(){return this.layout instanceof UInt||this.layout instanceof UIntBE}decode(e,t){return void 0===t&&(t=0),this.layout.decode(e,t+this.offset)}encode(e,t,r){return void 0===r&&(r=0),this.layout.encode(e,t,r+this.offset)}}class UInt extends Layout{constructor(e,t){if(super(e,t),6<this.span)throw new RangeError("span must not exceed 6 bytes")}decode(e,t){return void 0===t&&(t=0),e.readUIntLE(t,this.span)}encode(e,t,r){return void 0===r&&(r=0),t.writeUIntLE(e,r,this.span),this.span}}class UIntBE extends Layout{constructor(e,t){if(super(e,t),6<this.span)throw new RangeError("span must not exceed 6 bytes")}decode(e,t){return void 0===t&&(t=0),e.readUIntBE(t,this.span)}encode(e,t,r){return void 0===r&&(r=0),t.writeUIntBE(e,r,this.span),this.span}}class Int extends Layout{constructor(e,t){if(super(e,t),6<this.span)throw new RangeError("span must not exceed 6 bytes")}decode(e,t){return void 0===t&&(t=0),e.readIntLE(t,this.span)}encode(e,t,r){return void 0===r&&(r=0),t.writeIntLE(e,r,this.span),this.span}}class IntBE extends Layout{constructor(e,t){if(super(e,t),6<this.span)throw new RangeError("span must not exceed 6 bytes")}decode(e,t){return void 0===t&&(t=0),e.readIntBE(t,this.span)}encode(e,t,r){return void 0===r&&(r=0),t.writeIntBE(e,r,this.span),this.span}}const o=Math.pow(2,32);function divmodInt64(e){const t=Math.floor(e/o);return{hi32:t,lo32:e-t*o}}function roundedInt64(e,t){return e*o+t}class NearUInt64 extends Layout{constructor(e){super(8,e)}decode(e,t){void 0===t&&(t=0);const r=e.readUInt32LE(t);return roundedInt64(e.readUInt32LE(t+4),r)}encode(e,t,r){void 0===r&&(r=0);const n=divmodInt64(e);return t.writeUInt32LE(n.lo32,r),t.writeUInt32LE(n.hi32,r+4),8}}class NearUInt64BE extends Layout{constructor(e){super(8,e)}decode(e,t){void 0===t&&(t=0);return roundedInt64(e.readUInt32BE(t),e.readUInt32BE(t+4))}encode(e,t,r){void 0===r&&(r=0);const n=divmodInt64(e);return t.writeUInt32BE(n.hi32,r),t.writeUInt32BE(n.lo32,r+4),8}}class NearInt64 extends Layout{constructor(e){super(8,e)}decode(e,t){void 0===t&&(t=0);const r=e.readUInt32LE(t);return roundedInt64(e.readInt32LE(t+4),r)}encode(e,t,r){void 0===r&&(r=0);const n=divmodInt64(e);return t.writeUInt32LE(n.lo32,r),t.writeInt32LE(n.hi32,r+4),8}}class NearInt64BE extends Layout{constructor(e){super(8,e)}decode(e,t){void 0===t&&(t=0);return roundedInt64(e.readInt32BE(t),e.readUInt32BE(t+4))}encode(e,t,r){void 0===r&&(r=0);const n=divmodInt64(e);return t.writeInt32BE(n.hi32,r),t.writeUInt32BE(n.lo32,r+4),8}}class Float extends Layout{constructor(e){super(4,e)}decode(e,t){return void 0===t&&(t=0),e.readFloatLE(t)}encode(e,t,r){return void 0===r&&(r=0),t.writeFloatLE(e,r),4}}class FloatBE extends Layout{constructor(e){super(4,e)}decode(e,t){return void 0===t&&(t=0),e.readFloatBE(t)}encode(e,t,r){return void 0===r&&(r=0),t.writeFloatBE(e,r),4}}class Double extends Layout{constructor(e){super(8,e)}decode(e,t){return void 0===t&&(t=0),e.readDoubleLE(t)}encode(e,t,r){return void 0===r&&(r=0),t.writeDoubleLE(e,r),8}}class DoubleBE extends Layout{constructor(e){super(8,e)}decode(e,t){return void 0===t&&(t=0),e.readDoubleBE(t)}encode(e,t,r){return void 0===r&&(r=0),t.writeDoubleBE(e,r),8}}class Sequence extends Layout{constructor(e,t,r){if(!(e instanceof Layout))throw new TypeError("elementLayout must be a Layout");if(!(t instanceof ExternalLayout&&t.isCount()||Number.isInteger(t)&&0<=t))throw new TypeError("count must be non-negative integer or an unsigned integer ExternalLayout");let n=-1;!(t instanceof ExternalLayout)&&0<e.span&&(n=t*e.span),super(n,r),this.elementLayout=e,this.count=t}getSpan(e,t){if(0<=this.span)return this.span;void 0===t&&(t=0);let r=0,n=this.count;if(n instanceof ExternalLayout&&(n=n.decode(e,t)),0<this.elementLayout.span)r=n*this.elementLayout.span;else{let o=0;for(;o<n;)r+=this.elementLayout.getSpan(e,t+r),++o}return r}decode(e,t){void 0===t&&(t=0);const r=[];let n=0,o=this.count;for(o instanceof ExternalLayout&&(o=o.decode(e,t));n<o;)r.push(this.elementLayout.decode(e,t)),t+=this.elementLayout.getSpan(e,t),n+=1;return r}encode(e,t,r){void 0===r&&(r=0);const n=this.elementLayout,o=e.reduce(((e,o)=>e+n.encode(o,t,r+e)),0);return this.count instanceof ExternalLayout&&this.count.encode(e.length,t,r),o}}class Structure extends Layout{constructor(e,t,r){if(!Array.isArray(e)||!e.reduce(((e,t)=>e&&t instanceof Layout),!0))throw new TypeError("fields must be array of Layout instances");"boolean"==typeof t&&void 0===r&&(r=t,t=void 0);for(const t of e)if(0>t.span&&void 0===t.property)throw new Error("fields cannot contain unnamed variable-length layout");let n=-1;try{n=e.reduce(((e,t)=>e+t.getSpan()),0)}catch(e){}super(n,t),this.fields=e,this.decodePrefixes=!!r}getSpan(e,t){if(0<=this.span)return this.span;void 0===t&&(t=0);let r=0;try{r=this.fields.reduce(((r,n)=>{const o=n.getSpan(e,t);return t+=o,r+o}),0)}catch(e){throw new RangeError("indeterminate span")}return r}decode(e,t){void 0===t&&(t=0);const r=this.makeDestinationObject();for(const n of this.fields)if(void 0!==n.property&&(r[n.property]=n.decode(e,t)),t+=n.getSpan(e,t),this.decodePrefixes&&e.length===t)break;return r}encode(e,t,r){void 0===r&&(r=0);const n=r;let o=0,s=0;for(const n of this.fields){let i=n.span;if(s=0<i?i:0,void 0!==n.property){const o=e[n.property];void 0!==o&&(s=n.encode(o,t,r),0>i&&(i=n.getSpan(t,r)))}o=r,r+=i}return o+s-n}fromArray(e){const t=this.makeDestinationObject();for(const r of this.fields)void 0!==r.property&&0<e.length&&(t[r.property]=e.shift());return t}layoutFor(e){if("string"!=typeof e)throw new TypeError("property must be string");for(const t of this.fields)if(t.property===e)return t}offsetOf(e){if("string"!=typeof e)throw new TypeError("property must be string");let t=0;for(const r of this.fields){if(r.property===e)return t;0>r.span?t=-1:0<=t&&(t+=r.span)}}}class UnionDiscriminator{constructor(e){this.property=e}decode(){throw new Error("UnionDiscriminator is abstract")}encode(){throw new Error("UnionDiscriminator is abstract")}}class UnionLayoutDiscriminator extends UnionDiscriminator{constructor(e,t){if(!(e instanceof ExternalLayout&&e.isCount()))throw new TypeError("layout must be an unsigned integer ExternalLayout");super(t||e.property||"variant"),this.layout=e}decode(e,t){return this.layout.decode(e,t)}encode(e,t,r){return this.layout.encode(e,t,r)}}class Union extends Layout{constructor(e,t,r){const n=e instanceof UInt||e instanceof UIntBE;if(n)e=new UnionLayoutDiscriminator(new OffsetLayout(e));else if(e instanceof ExternalLayout&&e.isCount())e=new UnionLayoutDiscriminator(e);else if(!(e instanceof UnionDiscriminator))throw new TypeError("discr must be a UnionDiscriminator or an unsigned integer layout");if(void 0===t&&(t=null),!(null===t||t instanceof Layout))throw new TypeError("defaultLayout must be null or a Layout");if(null!==t){if(0>t.span)throw new Error("defaultLayout must have constant span");void 0===t.property&&(t=t.replicate("content"))}let o=-1;t&&(o=t.span,0<=o&&n&&(o+=e.layout.span)),super(o,r),this.discriminator=e,this.usesPrefixDiscriminator=n,this.defaultLayout=t,this.registry={};let s=this.defaultGetSourceVariant.bind(this);this.getSourceVariant=function(e){return s(e)},this.configGetSourceVariant=function(e){s=e.bind(this)}}getSpan(e,t){if(0<=this.span)return this.span;void 0===t&&(t=0);const r=this.getVariant(e,t);if(!r)throw new Error("unable to determine span for unrecognized variant");return r.getSpan(e,t)}defaultGetSourceVariant(e){if(e.hasOwnProperty(this.discriminator.property)){if(this.defaultLayout&&e.hasOwnProperty(this.defaultLayout.property))return;const t=this.registry[e[this.discriminator.property]];if(t&&(!t.layout||e.hasOwnProperty(t.property)))return t}else for(const t in this.registry){const r=this.registry[t];if(e.hasOwnProperty(r.property))return r}throw new Error("unable to infer src variant")}decode(e,t){let r;void 0===t&&(t=0);const n=this.discriminator,o=n.decode(e,t);let s=this.registry[o];if(void 0===s){let i=0;s=this.defaultLayout,this.usesPrefixDiscriminator&&(i=n.layout.span),r=this.makeDestinationObject(),r[n.property]=o,r[s.property]=this.defaultLayout.decode(e,t+i)}else r=s.decode(e,t);return r}encode(e,t,r){void 0===r&&(r=0);const n=this.getSourceVariant(e);if(void 0===n){const n=this.discriminator,o=this.defaultLayout;let s=0;return this.usesPrefixDiscriminator&&(s=n.layout.span),n.encode(e[n.property],t,r),s+o.encode(e[o.property],t,r+s)}return n.encode(e,t,r)}addVariant(e,t,r){const n=new VariantLayout(this,e,t,r);return this.registry[e]=n,n}getVariant(e,t){let r=e;return n.isBuffer(e)&&(void 0===t&&(t=0),r=this.discriminator.decode(e,t)),this.registry[r]}}class VariantLayout extends Layout{constructor(e,t,r,n){if(!(e instanceof Union))throw new TypeError("union must be a Union");if(!Number.isInteger(t)||0>t)throw new TypeError("variant must be a (non-negative) integer");if("string"==typeof r&&void 0===n&&(n=r,r=null),r){if(!(r instanceof Layout))throw new TypeError("layout must be a Layout");if(null!==e.defaultLayout&&0<=r.span&&r.span>e.defaultLayout.span)throw new Error("variant span exceeds span of containing union");if("string"!=typeof n)throw new TypeError("variant must have a String property")}let o=e.span;0>e.span&&(o=r?r.span:0,0<=o&&e.usesPrefixDiscriminator&&(o+=e.discriminator.layout.span)),super(o,n),this.union=e,this.variant=t,this.layout=r||null}getSpan(e,t){if(0<=this.span)return this.span;void 0===t&&(t=0);let r=0;return this.union.usesPrefixDiscriminator&&(r=this.union.discriminator.layout.span),r+this.layout.getSpan(e,t+r)}decode(e,t){const r=this.makeDestinationObject();if(void 0===t&&(t=0),this!==this.union.getVariant(e,t))throw new Error("variant mismatch");let n=0;return this.union.usesPrefixDiscriminator&&(n=this.union.discriminator.layout.span),this.layout?r[this.property]=this.layout.decode(e,t+n):this.property?r[this.property]=!0:this.union.usesPrefixDiscriminator&&(r[this.union.discriminator.property]=this.variant),r}encode(e,t,r){void 0===r&&(r=0);let n=0;if(this.union.usesPrefixDiscriminator&&(n=this.union.discriminator.layout.span),this.layout&&!e.hasOwnProperty(this.property))throw new TypeError("variant lacks property "+this.property);this.union.discriminator.encode(this.variant,t,r);let o=n;if(this.layout&&(this.layout.encode(e[this.property],t,r+n),o+=this.layout.getSpan(t,r+n),0<=this.union.span&&o>this.union.span))throw new Error("encoded variant overruns containing union");return o}fromArray(e){if(this.layout)return this.layout.fromArray(e)}}function fixBitwiseResult(e){return 0>e&&(e+=4294967296),e}class BitStructure extends Layout{constructor(e,t,r){if(!(e instanceof UInt||e instanceof UIntBE))throw new TypeError("word must be a UInt or UIntBE layout");if("string"==typeof t&&void 0===r&&(r=t,t=void 0),4<e.span)throw new RangeError("word cannot exceed 32 bits");super(e.span,r),this.word=e,this.msb=!!t,this.fields=[];let n=0;this._packedSetValue=function(e){return n=fixBitwiseResult(e),this},this._packedGetValue=function(){return n}}decode(e,t){const r=this.makeDestinationObject();void 0===t&&(t=0);const n=this.word.decode(e,t);this._packedSetValue(n);for(const e of this.fields)void 0!==e.property&&(r[e.property]=e.decode(n));return r}encode(e,t,r){void 0===r&&(r=0);const n=this.word.decode(t,r);this._packedSetValue(n);for(const t of this.fields)if(void 0!==t.property){const r=e[t.property];void 0!==r&&t.encode(r)}return this.word.encode(this._packedGetValue(),t,r)}addField(e,t){const r=new BitField(this,e,t);return this.fields.push(r),r}addBoolean(e){const t=new Boolean(this,e);return this.fields.push(t),t}fieldFor(e){if("string"!=typeof e)throw new TypeError("property must be string");for(const t of this.fields)if(t.property===e)return t}}class BitField{constructor(e,t,r){if(!(e instanceof BitStructure))throw new TypeError("container must be a BitStructure");if(!Number.isInteger(t)||0>=t)throw new TypeError("bits must be positive integer");const n=8*e.span,o=e.fields.reduce(((e,t)=>e+t.bits),0);if(t+o>n)throw new Error("bits too long for span remainder ("+(n-o)+" of "+n+" remain)");this.container=e,this.bits=t,this.valueMask=(1<<t)-1,32===t&&(this.valueMask=4294967295),this.start=o,this.container.msb&&(this.start=n-o-t),this.wordMask=fixBitwiseResult(this.valueMask<<this.start),this.property=r}decode(){return fixBitwiseResult(this.container._packedGetValue()&this.wordMask)>>>this.start}encode(e){if(!Number.isInteger(e)||e!==fixBitwiseResult(e&this.valueMask))throw new TypeError(nameWithProperty("BitField.encode",this)+" value must be integer not exceeding "+this.valueMask);const t=this.container._packedGetValue(),r=fixBitwiseResult(e<<this.start);this.container._packedSetValue(fixBitwiseResult(t&~this.wordMask)|r)}}class Boolean extends BitField{constructor(e,t){super(e,1,t)}decode(e,t){return!!BitField.prototype.decode.call(this,e,t)}encode(e){return"boolean"==typeof e&&(e=+e),BitField.prototype.encode.call(this,e)}}class Blob extends Layout{constructor(e,t){if(!(e instanceof ExternalLayout&&e.isCount()||Number.isInteger(e)&&0<=e))throw new TypeError("length must be positive integer or an unsigned integer ExternalLayout");let r=-1;e instanceof ExternalLayout||(r=e),super(r,t),this.length=e}getSpan(e,t){let r=this.span;return 0>r&&(r=this.length.decode(e,t)),r}decode(e,t){void 0===t&&(t=0);let r=this.span;return 0>r&&(r=this.length.decode(e,t)),e.slice(t,t+r)}encode(e,t,r){let o=this.length;if(this.length instanceof ExternalLayout&&(o=e.length),!n.isBuffer(e)||o!==e.length)throw new TypeError(nameWithProperty("Blob.encode",this)+" requires (length "+o+") Buffer as src");if(r+o>t.length)throw new RangeError("encoding overruns Buffer");return t.write(e.toString("hex"),r,o,"hex"),this.length instanceof ExternalLayout&&this.length.encode(o,t,r),o}}class CString extends Layout{constructor(e){super(-1,e)}getSpan(e,t){if(!n.isBuffer(e))throw new TypeError("b must be a Buffer");void 0===t&&(t=0);let r=t;for(;r<e.length&&0!==e[r];)r+=1;return 1+r-t}decode(e,t,r){void 0===t&&(t=0);let n=this.getSpan(e,t);return e.slice(t,t+n-1).toString("utf-8")}encode(e,t,r){void 0===r&&(r=0),"string"!=typeof e&&(e=e.toString());const o=new n(e,"utf8"),s=o.length;if(r+s>t.length)throw new RangeError("encoding overruns Buffer");return o.copy(t,r),t[r+s]=0,s+1}}class UTF8 extends Layout{constructor(e,t){if("string"==typeof e&&void 0===t&&(t=e,e=void 0),void 0===e)e=-1;else if(!Number.isInteger(e))throw new TypeError("maxSpan must be an integer");super(-1,t),this.maxSpan=e}getSpan(e,t){if(!n.isBuffer(e))throw new TypeError("b must be a Buffer");return void 0===t&&(t=0),e.length-t}decode(e,t,r){void 0===t&&(t=0);let n=this.getSpan(e,t);if(0<=this.maxSpan&&this.maxSpan<n)throw new RangeError("text length exceeds maxSpan");return e.slice(t,t+n).toString("utf-8")}encode(e,t,r){void 0===r&&(r=0),"string"!=typeof e&&(e=e.toString());const o=new n(e,"utf8"),s=o.length;if(0<=this.maxSpan&&this.maxSpan<s)throw new RangeError("text length exceeds maxSpan");if(r+s>t.length)throw new RangeError("encoding overruns Buffer");return o.copy(t,r),s}}class Constant extends Layout{constructor(e,t){super(0,t),this.value=e}decode(e,t,r){return this.value}encode(e,t,r){return 0}}t.ExternalLayout=ExternalLayout,t.GreedyCount=GreedyCount,t.OffsetLayout=OffsetLayout,t.UInt=UInt,t.UIntBE=UIntBE,t.Int=Int,t.IntBE=IntBE,t.Float=Float,t.FloatBE=FloatBE,t.Double=Double,t.DoubleBE=DoubleBE,t.Sequence=Sequence,t.Structure=Structure,t.UnionDiscriminator=UnionDiscriminator,t.UnionLayoutDiscriminator=UnionLayoutDiscriminator,t.Union=Union,t.VariantLayout=VariantLayout,t.BitStructure=BitStructure,t.BitField=BitField,t.Boolean=Boolean,t.Blob=Blob,t.CString=CString,t.UTF8=UTF8,t.Constant=Constant,t.greedy=(e,t)=>new GreedyCount(e,t),t.offset=(e,t,r)=>new OffsetLayout(e,t,r),t.u8=e=>new UInt(1,e),t.u16=e=>new UInt(2,e),t.u24=e=>new UInt(3,e),t.u32=e=>new UInt(4,e),t.u40=e=>new UInt(5,e),t.u48=e=>new UInt(6,e),t.nu64=e=>new NearUInt64(e),t.u16be=e=>new UIntBE(2,e),t.u24be=e=>new UIntBE(3,e),t.u32be=e=>new UIntBE(4,e),t.u40be=e=>new UIntBE(5,e),t.u48be=e=>new UIntBE(6,e),t.nu64be=e=>new NearUInt64BE(e),t.s8=e=>new Int(1,e),t.s16=e=>new Int(2,e),t.s24=e=>new Int(3,e),t.s32=e=>new Int(4,e),t.s40=e=>new Int(5,e),t.s48=e=>new Int(6,e),t.ns64=e=>new NearInt64(e),t.s16be=e=>new IntBE(2,e),t.s24be=e=>new IntBE(3,e),t.s32be=e=>new IntBE(4,e),t.s40be=e=>new IntBE(5,e),t.s48be=e=>new IntBE(6,e),t.ns64be=e=>new NearInt64BE(e),t.f32=e=>new Float(e),t.f32be=e=>new FloatBE(e),t.f64=e=>new Double(e),t.f64be=e=>new DoubleBE(e),t.struct=(e,t,r)=>new Structure(e,t,r),t.bits=(e,t,r)=>new BitStructure(e,t,r),t.seq=(e,t,r)=>new Sequence(e,t,r),t.union=(e,t,r)=>new Union(e,t,r),t.unionLayoutDiscriminator=(e,t)=>new UnionLayoutDiscriminator(e,t),t.blob=(e,t)=>new Blob(e,t),t.cstr=e=>new CString(e),t.utf8=(e,t)=>new UTF8(e,t),t.const=(e,t)=>new Constant(e,t)},675832:e=>{"use strict";const camelCase=(e,t)=>{if("string"!=typeof e&&!Array.isArray(e))throw new TypeError("Expected the input to be `string | string[]`");t=Object.assign({pascalCase:!1},t);if(e=Array.isArray(e)?e.map((e=>e.trim())).filter((e=>e.length)).join("-"):e.trim(),0===e.length)return"";if(1===e.length)return t.pascalCase?e.toUpperCase():e.toLowerCase();return e!==e.toLowerCase()&&(e=(e=>{let t=!1,r=!1,n=!1;for(let o=0;o<e.length;o++){const s=e[o];t&&/[a-zA-Z]/.test(s)&&s.toUpperCase()===s?(e=e.slice(0,o)+"-"+e.slice(o),t=!1,n=r,r=!0,o++):r&&n&&/[a-zA-Z]/.test(s)&&s.toLowerCase()===s?(e=e.slice(0,o-1)+"-"+e.slice(o-1),n=r,r=!1,t=!0):(t=s.toLowerCase()===s&&s.toUpperCase()!==s,n=r,r=s.toUpperCase()===s&&s.toLowerCase()!==s)}return e})(e)),e=e.replace(/^[_.\- ]+/,"").toLowerCase().replace(/[_.\- ]+(\w|$)/g,((e,t)=>t.toUpperCase())).replace(/\d+(\w|$)/g,(e=>e.toUpperCase())),r=e,t.pascalCase?r.charAt(0).toUpperCase()+r.slice(1):r;var r};e.exports=camelCase,e.exports.default=camelCase},728437:e=>{var t=1e3,r=60*t,n=60*r,o=24*n,s=7*o,i=365.25*o;function plural(e,t,r,n){var o=t>=1.5*r;return Math.round(e/r)+" "+n+(o?"s":"")}e.exports=function(e,a){a=a||{};var u=typeof e;if("string"===u&&e.length>0)return function parse(e){if((e=String(e)).length>100)return;var a=/^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(e);if(!a)return;var u=parseFloat(a[1]);switch((a[2]||"ms").toLowerCase()){case"years":case"year":case"yrs":case"yr":case"y":return u*i;case"weeks":case"week":case"w":return u*s;case"days":case"day":case"d":return u*o;case"hours":case"hour":case"hrs":case"hr":case"h":return u*n;case"minutes":case"minute":case"mins":case"min":case"m":return u*r;case"seconds":case"second":case"secs":case"sec":case"s":return u*t;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return u;default:return}}(e);if("number"===u&&isFinite(e))return a.long?function fmtLong(e){var s=Math.abs(e);if(s>=o)return plural(e,s,o,"day");if(s>=n)return plural(e,s,n,"hour");if(s>=r)return plural(e,s,r,"minute");if(s>=t)return plural(e,s,t,"second");return e+" ms"}(e):function fmtShort(e){var s=Math.abs(e);if(s>=o)return Math.round(e/o)+"d";if(s>=n)return Math.round(e/n)+"h";if(s>=r)return Math.round(e/r)+"m";if(s>=t)return Math.round(e/t)+"s";return e+"ms"}(e);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(e))}},720124:(e,t,r)=>{t.formatArgs=function formatArgs(t){if(t[0]=(this.useColors?"%c":"")+this.namespace+(this.useColors?" %c":" ")+t[0]+(this.useColors?"%c ":" ")+"+"+e.exports.humanize(this.diff),!this.useColors)return;const r="color: "+this.color;t.splice(1,0,r,"color: inherit");let n=0,o=0;t[0].replace(/%[a-zA-Z%]/g,(e=>{"%%"!==e&&(n++,"%c"===e&&(o=n))})),t.splice(o,0,r)},t.save=function save(e){try{e?t.storage.setItem("debug",e):t.storage.removeItem("debug")}catch(e){}},t.load=function load(){let e;try{e=t.storage.getItem("debug")}catch(e){}!e&&"env"in{env:{ONEKEY_PROXY:void 0,NODE_ENV:"production",TAMAGUI_TARGET:"web"}}&&(e={ONEKEY_PROXY:void 0,NODE_ENV:"production",TAMAGUI_TARGET:"web"}.DEBUG);return e},t.useColors=function useColors(){if("undefined"!=typeof window&&window.process&&("renderer"===window.process.type||window.process.__nwjs))return!0;if("undefined"!=typeof navigator&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))return!1;return"undefined"!=typeof document&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||"undefined"!=typeof window&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||"undefined"!=typeof navigator&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)&&parseInt(RegExp.$1,10)>=31||"undefined"!=typeof navigator&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/)},t.storage=function localstorage(){try{return localStorage}catch(e){}}(),t.destroy=(()=>{let e=!1;return()=>{e||(e=!0,console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."))}})(),t.colors=["#0000CC","#0000FF","#0033CC","#0033FF","#0066CC","#0066FF","#0099CC","#0099FF","#00CC00","#00CC33","#00CC66","#00CC99","#00CCCC","#00CCFF","#3300CC","#3300FF","#3333CC","#3333FF","#3366CC","#3366FF","#3399CC","#3399FF","#33CC00","#33CC33","#33CC66","#33CC99","#33CCCC","#33CCFF","#6600CC","#6600FF","#6633CC","#6633FF","#66CC00","#66CC33","#9900CC","#9900FF","#9933CC","#9933FF","#99CC00","#99CC33","#CC0000","#CC0033","#CC0066","#CC0099","#CC00CC","#CC00FF","#CC3300","#CC3333","#CC3366","#CC3399","#CC33CC","#CC33FF","#CC6600","#CC6633","#CC9900","#CC9933","#CCCC00","#CCCC33","#FF0000","#FF0033","#FF0066","#FF0099","#FF00CC","#FF00FF","#FF3300","#FF3333","#FF3366","#FF3399","#FF33CC","#FF33FF","#FF6600","#FF6633","#FF9900","#FF9933","#FFCC00","#FFCC33"],t.log=console.debug||console.log||(()=>{}),e.exports=r(827891)(t);const{formatters:n}=e.exports;n.j=function(e){try{return JSON.stringify(e)}catch(e){return"[UnexpectedJSONParseError]: "+e.message}}},827891:(e,t,r)=>{e.exports=function setup(e){function createDebug(e){let t,r,n,o=null;function debug(...e){if(!debug.enabled)return;const r=debug,n=Number(new Date),o=n-(t||n);r.diff=o,r.prev=t,r.curr=n,t=n,e[0]=createDebug.coerce(e[0]),"string"!=typeof e[0]&&e.unshift("%O");let s=0;e[0]=e[0].replace(/%([a-zA-Z%])/g,((t,n)=>{if("%%"===t)return"%";s++;const o=createDebug.formatters[n];if("function"==typeof o){const n=e[s];t=o.call(r,n),e.splice(s,1),s--}return t})),createDebug.formatArgs.call(r,e);(r.log||createDebug.log).apply(r,e)}return debug.namespace=e,debug.useColors=createDebug.useColors(),debug.color=createDebug.selectColor(e),debug.extend=extend,debug.destroy=createDebug.destroy,Object.defineProperty(debug,"enabled",{enumerable:!0,configurable:!1,get:()=>null!==o?o:(r!==createDebug.namespaces&&(r=createDebug.namespaces,n=createDebug.enabled(e)),n),set:e=>{o=e}}),"function"==typeof createDebug.init&&createDebug.init(debug),debug}function extend(e,t){const r=createDebug(this.namespace+(void 0===t?":":t)+e);return r.log=this.log,r}function toNamespace(e){return e.toString().substring(2,e.toString().length-2).replace(/\.\*\?$/,"*")}return createDebug.debug=createDebug,createDebug.default=createDebug,createDebug.coerce=function coerce(e){if(e instanceof Error)return e.stack||e.message;return e},createDebug.disable=function disable(){const e=[...createDebug.names.map(toNamespace),...createDebug.skips.map(toNamespace).map((e=>"-"+e))].join(",");return createDebug.enable(""),e},createDebug.enable=function enable(e){let t;createDebug.save(e),createDebug.namespaces=e,createDebug.names=[],createDebug.skips=[];const r=("string"==typeof e?e:"").split(/[\s,]+/),n=r.length;for(t=0;t<n;t++)r[t]&&("-"===(e=r[t].replace(/\*/g,".*?"))[0]?createDebug.skips.push(new RegExp("^"+e.slice(1)+"$")):createDebug.names.push(new RegExp("^"+e+"$")))},createDebug.enabled=function enabled(e){if("*"===e[e.length-1])return!0;let t,r;for(t=0,r=createDebug.skips.length;t<r;t++)if(createDebug.skips[t].test(e))return!1;for(t=0,r=createDebug.names.length;t<r;t++)if(createDebug.names[t].test(e))return!0;return!1},createDebug.humanize=r(728437),createDebug.destroy=function destroy(){console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.")},Object.keys(e).forEach((t=>{createDebug[t]=e[t]})),createDebug.names=[],createDebug.skips=[],createDebug.formatters={},createDebug.selectColor=function selectColor(e){let t=0;for(let r=0;r<e.length;r++)t=(t<<5)-t+e.charCodeAt(r),t|=0;return createDebug.colors[Math.abs(t)%createDebug.colors.length]},createDebug.enable(createDebug.load()),createDebug}}}]);
//# sourceMappingURL=73034.6f6c04a28c.chunk.js.map