var U5=Object.create;var{getPrototypeOf:E5,defineProperty:g7,getOwnPropertyNames:jK,getOwnPropertyDescriptor:q5}=Object,vK=Object.prototype.hasOwnProperty;function yK(J){return this[J]}var N5,O5,R5=(J,Q,Z)=>{var $=J!=null&&typeof J==="object";if($){var W=Q?N5??=/*@__PURE__*/new WeakMap:O5??=/*@__PURE__*/new WeakMap,Y=W.get(J);if(Y)return Y}Z=J!=null?U5(E5(J)):{};let X=Q||!J||!J.__esModule?g7(Z,"default",{value:J,enumerable:!0}):Z;for(let H of jK(J))if(!vK.call(X,H))g7(X,H,{get:yK.bind(J,H),enumerable:!0});if($)W.set(J,X);return X},XB=(J)=>{var Q=(SK??=/*@__PURE__*/new WeakMap).get(J),Z;if(Q)return Q;if(Q=g7({},"__esModule",{value:!0}),J&&typeof J==="object"||typeof J==="function"){for(var $ of jK(J))if(!vK.call(Q,$))g7(Q,$,{get:yK.bind(J,$),enumerable:!(Z=q5(J,$))||Z.enumerable})}return SK.set(J,Q),Q},SK,k5=(J,Q)=>()=>(Q||J((Q={exports:{}}).exports,Q),Q.exports);var V5=(J)=>J;function F5(J,Q){this[J]=V5.bind(null,Q)}var xK=(J,Q)=>{for(var Z in Q)g7(J,Z,{get:Q[Z],enumerable:!0,configurable:!0,set:F5.bind(Q,Z)})};var D5=(J,Q)=>()=>(J&&(Q=J(J=0)),Q);var HB=/*@__PURE__*/((J)=>typeof require<"u"?require:typeof Proxy<"u"?new Proxy(J,{get:(Q,Z)=>(typeof require<"u"?require:Q)[Z]}):J)(function(J){if(typeof require<"u")return require.apply(this,arguments);throw Error('Dynamic require of "'+J+'" is not supported')});var dE=k5((qB,oW)=>{/*!
 * The following is a version of the struct-fu library
 * fork by ariankordi: https://github.com/ariankordi/struct-fu
 * with the following changes made for code size:
 * Added: _.uintptr, mapping to _.uint32le (with WASM in mind)
 * Added (TODO): add JSDoc StructInstance template
 * Removed: Polyfills Function.prototype.bind, TextEncoder/TextDecoder
 * Removed: bitfield, bitfieldLE...
 * Removed: char16be, swapBytesPairs
 * Removed: 64-bit types, 16-bit float
 * Modified: addField (no bit handling), _.struct (rm "aligned bitfield" message)
 */var _0={};function aW(J){return new Uint8Array(new ArrayBuffer(J))}function aH(J){var Q=Array.prototype.slice.call(arguments,1);return Q.forEach(function(Z){Object.keys(Z).forEach(function($){J[$]=Z[$]})}),J}function g9(J,Q){return J.bytes+=Q.size,J}function rW(J,Q){var Z=typeof Q==="number"?aH({name:J.name,field:J,valueFromBytes:function($,W){W||(W={bytes:0,bits:0});var Y=Array(Q);for(var X=0,H=Y.length;X<H;X+=1)Y[X]=J.valueFromBytes($,W);return Y},bytesFromValue:function($,W,Y){$||($=Array(Q)),W||(W=aW(this.size)),Y||(Y={bytes:0,bits:0});for(var X=0,H=Math.min($.length,Q);X<H;X+=1)J.bytesFromValue($[X],W,Y);while(X++<Q)g9(Y,J);return W}},"width"in J?{width:J.width*Q}:{size:J.size*Q}):J;return Z.pack=Z.bytesFromValue,Z.unpack=Z.valueFromBytes,Z}_0.struct=function(J,Q,Z){if(typeof J!=="string")Z=Q,Q=J,J=null;var $={bytes:0,bits:0},W=Object.create(null),Y=Q.reduce(function(X,H){if("_padTo"in H){H._id||(H._id="id"+Math.random().toFixed(20).slice(2));var K=W[H._id]=$.bits?{width:8*(H._padTo-$.bytes)-$.bits}:{size:H._padTo-$.bytes};if(K.width!==void 0&&K.width<0||K.size!==void 0&&K.size<0){var G=$.bits?" and "+$.bits+" bits":"";throw Error("Invalid .padTo("+H._padTo+") field, struct is already "+$.bytes+" byte(s)"+G+"!")}H=K}else if(H._hoistFields)Object.keys(H._hoistFields).forEach(function(U){var E=Object.create(H._hoistFields[U]);if("width"in E)E.offset={bytes:E.offset.bytes+$.bytes,bits:E.offset.bits};else E.offset+=$.bytes;X[U]=E});else if(H.name)H=Object.create(H),H.offset="width"in H?{bytes:$.bytes,bits:$.bits}:$.bytes,X[H.name]=H;return g9($,H),X},{});if($.bits)throw Error("Improperly aligned bitfield at end of struct: "+J);return rW({valueFromBytes:function(X,H){H||(H={bytes:0,bits:0});var K={};return Q.forEach(function(G){if("_padTo"in G)return g9(H,W[G._id]);var U=G.valueFromBytes(X,H);if(G.name)K[G.name]=U;else if(typeof U==="object")aH(K,U)}),K},bytesFromValue:function(X,H,K){return X||(X={}),H||(H=aW(this.size)),K||(K={bytes:0,bits:0}),Q.forEach(function(G){if("_padTo"in G)return g9(K,W[G._id]);var U=G.name?X[G.name]:X;G.bytesFromValue(U,H,K)}),H},_hoistFields:!J?Y:null,fields:Y,size:$.bytes,name:J},Z)};_0.padTo=function(J){return{_padTo:J}};function rH(J,Q,Z){if(typeof J!=="string")Z=Q,Q=J,J=null;Q=typeof Q==="number"?Q:1;var $=this;return rW({valueFromBytes:function(W,Y){Y||(Y={bytes:0,bits:0});var X=W instanceof ArrayBuffer?new Uint8Array(W):W,H=X.subarray(Y.bytes,Y.bytes+this.size);return g9(Y,this),$.b2v.call(this,H)},bytesFromValue:function(W,Y,X){Y||(Y=aW(this.size)),X||(X={bytes:0,bits:0});var H=Y instanceof ArrayBuffer?new Uint8Array(Y):Y,K=H.subarray(X.bytes,X.bytes+this.size);return $.vTb.call(this,W,K),g9(X,this),Y},size:Q,name:J},Z)}_0.byte=rH.bind({b2v:function(J){return J},vTb:function(J,Q){if(!J)return 0;return Q.set(new Uint8Array(J)),J.byteLength}});_0.char=rH.bind({b2v:function(J){var Q=new TextDecoder("utf-8"),Z=Q.decode(J),$=Z.indexOf("\x00");return~$?Z.slice(0,$):Z},vTb:function(J,Q){J||(J="");var Z=new TextEncoder("utf-8"),$=Z.encode(J);for(var W=0;W<$.length&&W<Q.length;W++)Q[W]=$[W];return $.length}});_0.char16le=rH.bind({b2v:function(J){var Q=new TextDecoder("utf-16le"),Z=Q.decode(J),$=Z.indexOf("\x00");return~$?Z.slice(0,$):Z},vTb:function(J,Q){J||(J="");var Z=0;for(var $=0;$<J.length&&Z+1<Q.length;$++){var W=J.charCodeAt($);Q[Z++]=W&255,Q[Z++]=W>>8&255}return Z}});function w8(J,Q,Z){var $="get"+J,W="set"+J;return Q||(Q=+J.match(/\d+/)[0]/8),function(Y,X){if(typeof Y!=="string")X=Y,Y=null;return rW({valueFromBytes:function(H,K){K||(K={bytes:0});var G=H instanceof ArrayBuffer?new Uint8Array(H):H,U=new DataView(G.buffer,G.byteOffset,G.byteLength),E=U[$](K.bytes,Z);return g9(K,this),E},bytesFromValue:function(H,K,G){H||(H=0),K||(K=aW(this.size)),G||(G={bytes:0});var U=K instanceof ArrayBuffer?new Uint8Array(K):K,E=new DataView(U.buffer,U.byteOffset,U.byteLength);return E[W](G.bytes,H,Z),g9(G,this),K},size:Q,name:Y},X)}}_0.uint8=w8("Uint8",1,!1);_0.uint16=w8("Uint16",2,!1);_0.uint32=w8("Uint32",4,!1);_0.uint16le=w8("Uint16",2,!0);_0.uint32le=w8("Uint32",4,!0);_0.uintptr=_0.uint32le;_0.int8=w8("Int8",1,!1);_0.int16=w8("Int16",2,!1);_0.int32=w8("Int32",4,!1);_0.int16le=w8("Int16",2,!0);_0.int32le=w8("Int32",4,!0);_0.float32=w8("Float32",4,!1);_0.float32le=w8("Float32",4,!0);_0.derive=function(J,Q,Z){return function($,W){if(typeof $!=="string")W=$,$=null;return rW(aH({valueFromBytes:function(Y,X){return Z(J.valueFromBytes(Y,X))},bytesFromValue:function(Y,X,H){return J.bytesFromValue(Q(Y),X,H)},name:$},"width"in J?{width:J.width}:{size:J.size}),W)}};if(typeof oW<"u"&&oW.exports)oW.exports=_0;else window._=_0});var Q5={};xK(Q5,{default:()=>WB});function AF(J){if(f.locateFile)return f.locateFile(J,_9);return _9+J}function sq(){var J=YY.buffer;f.HEAP8=TF=new Int8Array(J),f.HEAP16=SF=new Int16Array(J),f.HEAPU8=LK=new Uint8Array(J),f.HEAPU16=jF=new Uint16Array(J),f.HEAP32=vF=new Int32Array(J),f.HEAPU32=yF=new Uint32Array(J),f.HEAPF32=xF=new Float32Array(J),f.HEAPF64=bF=new Float64Array(J)}function fF(){if(f.preRun){if(typeof f.preRun=="function")f.preRun=[f.preRun];while(f.preRun.length)mF(f.preRun.shift())}zK(iq)}function gF(){hF=!0,zK(oq)}function pF(){if(f.postRun){if(typeof f.postRun=="function")f.postRun=[f.postRun];while(f.postRun.length)uF(f.postRun.shift())}zK(aq)}function mF(J){iq.unshift(J)}function lF(J){oq.unshift(J)}function uF(J){aq.unshift(J)}function dF(J){x6++,f.monitorRunDependencies?.(x6)}function cF(J){if(x6--,f.monitorRunDependencies?.(x6),x6==0){if(BK!==null)clearInterval(BK),BK=null;if(kZ){var Q=kZ;kZ=null,Q()}}}function rq(J){f.onAbort?.(J),J="Aborted("+J+")",VZ(J),nq=!0,PF=1,J+=". Build with -sASSERTIONS for more info.";var Q=new WebAssembly.RuntimeError(J);throw Q}function sF(){var J="/dist/ffl-emscripten.wasm";if(!tq(J))return AF(J);return J}function pq(J){if(J==WY&&FZ)return new Uint8Array(FZ);if(gq)return gq(J);throw"both async and sync fetching of the wasm failed"}function iF(J){if(!FZ)return cq(J).then((Q)=>new Uint8Array(Q),()=>pq(J));return Promise.resolve().then(()=>pq(J))}function mq(J,Q,Z){return iF(J).then(($)=>WebAssembly.instantiate($,Q)).then(Z,($)=>{VZ(`failed to asynchronously prepare wasm: ${$}`),rq($)})}function oF(J,Q,Z,$){if(!J&&typeof WebAssembly.instantiateStreaming=="function"&&!tq(Q)&&typeof fetch=="function")return fetch(Q,{credentials:"same-origin"}).then((W)=>{var Y=WebAssembly.instantiateStreaming(W,Z);return Y.then($,function(X){return VZ(`wasm streaming compile failed: ${X}`),VZ("falling back to ArrayBuffer instantiation"),mq(Q,Z,$)})});return mq(Q,Z,$)}function aF(){return{a:qD}}function rF(){var J=aF();function Q($,W){return bJ=$.exports,YY=bJ.e,sq(),b6=bJ.O,lF(bJ.f),cF("wasm-instantiate"),bJ}dF("wasm-instantiate");function Z($){Q($.instance)}if(f.instantiateWasm)try{return f.instantiateWasm(J,Q)}catch($){return VZ(`Module.instantiateWasm callback failed with error: ${$}`),!1}if(!WY)WY=sF();return oF(FZ,WY,J,Z),{}}function J5(){if(x6>0)return;if(fF(),x6>0)return;function J(){if(XY)return;if(XY=!0,f.calledRun=!0,nq)return;gF(),f.onRuntimeInitialized?.(),pF()}if(f.setStatus)f.setStatus("Running..."),setTimeout(function(){setTimeout(function(){f.setStatus("")},1),J()},1);else J()}var f,_F=!0,fq=!1,dq,MF,IF="./this.program",wF=(J,Q)=>{throw Q},_9="",cq,gq,UL,VZ,FZ,YY,nq=!1,PF,TF,LK,SF,jF,vF,yF,xF,bF,iq,oq,aq,hF=!1,x6=0,BK=null,kZ=null,nF="data:application/octet-stream;base64,",tq=(J)=>J.startsWith(nF),WY,zK=(J)=>{while(J.length>0)J.shift()(f)},EL,tF=()=>{rq("")},eF=(J,Q,Z)=>LK.copyWithin(J,Q,Q+Z),JD=()=>Math.random(),QD=()=>2147483648,ZD=(J)=>{var Q=YY.buffer,Z=(J-Q.byteLength+65535)/65536;try{return YY.grow(Z),sq(),1}catch($){}},$D=(J)=>{var Q=LK.length;J>>>=0;var Z=QD();if(J>Z)return!1;var $=(K,G)=>K+(G-K%G)%G;for(var W=1;W<=4;W*=2){var Y=Q*(1+0.2/W);Y=Math.min(Y,J+100663296);var X=Math.min(Z,$(Math.max(J,Y),65536)),H=ZD(X);if(H)return!0}return!1},eq=(J,Q)=>{if(J<128)Q.push(J);else Q.push(J%128|128,J>>7)},WD=(J)=>{var Q={i:"i32",j:"i64",f:"f32",d:"f64",e:"externref",p:"i32"},Z={parameters:[],results:J[0]=="v"?[]:[Q[J[0]]]};for(var $=1;$<J.length;++$)Z.parameters.push(Q[J[$]]);return Z},YD=(J,Q)=>{var Z=J.slice(0,1),$=J.slice(1),W={i:127,p:127,j:126,f:125,d:124,e:111};Q.push(96),eq($.length,Q);for(var Y=0;Y<$.length;++Y)Q.push(W[$[Y]]);if(Z=="v")Q.push(0);else Q.push(1,W[Z])},XD=(J,Q)=>{if(typeof WebAssembly.Function=="function")return new WebAssembly.Function(WD(Q),J);var Z=[1];YD(Q,Z);var $=[0,97,115,109,1,0,0,0,1];eq(Z.length,$),$.push(...Z),$.push(2,7,1,1,101,1,102,0,0,7,5,1,1,102,0,0);var W=new WebAssembly.Module(new Uint8Array($)),Y=new WebAssembly.Instance(W,{e:{f:J}}),X=Y.exports.f;return X},RZ,b6,HD=(J)=>{var Q=RZ[J];if(!Q){if(J>=RZ.length)RZ.length=J+1;RZ[J]=Q=b6.get(J)}return Q},KD=(J,Q)=>{if(h7)for(var Z=J;Z<J+Q;Z++){var $=HD(Z);if($)h7.set($,Z)}},h7,GD=(J)=>{if(!h7)h7=/*@__PURE__*/new WeakMap,KD(0,b6.length);return h7.get(J)||0},lq,UD=()=>{if(lq.length)return lq.pop();try{b6.grow(1)}catch(J){if(!(J instanceof RangeError))throw J;throw"Unable to grow wasm table. Set ALLOW_TABLE_GROWTH."}return b6.length-1},uq=(J,Q)=>{b6.set(J,Q),RZ[J]=b6.get(J)},ED=(J,Q)=>{var Z=GD(J);if(Z)return Z;var $=UD();try{uq($,J)}catch(Y){if(!(Y instanceof TypeError))throw Y;var W=XD(J,Q);uq($,W)}return h7.set(J,$),$},qD,bJ,ND,OD,RD,kD,VD,FD,DD,BD,LD,zD,CD,_D,MD,ID,wD,AD,PD,TD,SD,jD,vD,yD,xD,bD,hD,fD,gD,pD,mD,lD,uD,dD,cD,nD,sD,iD,oD,aD,rD,tD,eD,JB,QB,ZB,$B,XY,WB;var Z5=D5(()=>{f=typeof f<"u"?f:{},dq=Object.assign({},f),MF=[];if(_F||fq){if(fq)_9=self.location.href;else if(typeof document<"u"&&document.currentScript)_9=document.currentScript.src;if(_9.startsWith("blob:"))_9="";else _9=_9.substr(0,_9.replace(/[?#].*/,"").lastIndexOf("/")+1);cq=(J)=>fetch(J,{credentials:"same-origin"}).then((Q)=>{if(Q.ok)return Q.arrayBuffer();return Promise.reject(Error(Q.status+" : "+Q.url))})}UL=f.print||console.log.bind(console),VZ=f.printErr||console.error.bind(console);Object.assign(f,dq);dq=null;if(f.arguments)MF=f.arguments;if(f.thisProgram)IF=f.thisProgram;if(f.quit)wF=f.quit;if(f.wasmBinary)FZ=f.wasmBinary;iq=[],oq=[],aq=[];EL=f.noExitRuntime||!0,RZ=[],lq=[],qD={a:tF,c:eF,d:JD,b:$D},bJ=rF(),ND=f._FFLInitCharModelCPUStepWithCallback=(J,Q,Z,$)=>(ND=f._FFLInitCharModelCPUStepWithCallback=bJ.g)(J,Q,Z,$),OD=f._FFLInitCharModelCPUStep=(J,Q,Z)=>(OD=f._FFLInitCharModelCPUStep=bJ.h)(J,Q,Z),RD=f._FFLDeleteCharModel=(J)=>(RD=f._FFLDeleteCharModel=bJ.i)(J),kD=f._FFLGetDrawParamOpaFaceline=(J)=>(kD=f._FFLGetDrawParamOpaFaceline=bJ.j)(J),VD=f._FFLGetDrawParamOpaBeard=(J)=>(VD=f._FFLGetDrawParamOpaBeard=bJ.k)(J),FD=f._FFLGetDrawParamOpaNose=(J)=>(FD=f._FFLGetDrawParamOpaNose=bJ.l)(J),DD=f._FFLGetDrawParamOpaForehead=(J)=>(DD=f._FFLGetDrawParamOpaForehead=bJ.m)(J),BD=f._FFLGetDrawParamOpaHair=(J)=>(BD=f._FFLGetDrawParamOpaHair=bJ.n)(J),LD=f._FFLGetDrawParamOpaCap=(J)=>(LD=f._FFLGetDrawParamOpaCap=bJ.o)(J),zD=f._FFLGetDrawParamXluMask=(J)=>(zD=f._FFLGetDrawParamXluMask=bJ.p)(J),CD=f._FFLGetDrawParamXluNoseLine=(J)=>(CD=f._FFLGetDrawParamXluNoseLine=bJ.q)(J),_D=f._FFLGetDrawParamXluGlass=(J)=>(_D=f._FFLGetDrawParamXluGlass=bJ.r)(J),MD=f._FFLSetExpression=(J,Q)=>(MD=f._FFLSetExpression=bJ.s)(J,Q),ID=f._FFLGetExpression=(J)=>(ID=f._FFLGetExpression=bJ.t)(J),wD=f._FFLSetViewModelType=(J,Q)=>(wD=f._FFLSetViewModelType=bJ.u)(J,Q),AD=f._FFLGetBoundingBox=(J,Q)=>(AD=f._FFLGetBoundingBox=bJ.v)(J,Q),PD=f._FFLIsAvailableExpression=(J,Q)=>(PD=f._FFLIsAvailableExpression=bJ.w)(J,Q),TD=f._FFLSetCoordinate=(J,Q)=>(TD=f._FFLSetCoordinate=bJ.x)(J,Q),SD=f._FFLSetScale=(J)=>(SD=f._FFLSetScale=bJ.y)(J),jD=f._FFLiGetRandomCharInfo=(J,Q,Z,$)=>(jD=f._FFLiGetRandomCharInfo=bJ.z)(J,Q,Z,$),vD=f._FFLpGetStoreDataFromCharInfo=(J,Q)=>(vD=f._FFLpGetStoreDataFromCharInfo=bJ.A)(J,Q),yD=f._FFLpGetCharInfoFromStoreData=(J,Q)=>(yD=f._FFLpGetCharInfoFromStoreData=bJ.B)(J,Q),xD=f._FFLGetAdditionalInfo=(J,Q,Z,$,W)=>(xD=f._FFLGetAdditionalInfo=bJ.C)(J,Q,Z,$,W),bD=f._FFLInitRes=(J,Q)=>(bD=f._FFLInitRes=bJ.D)(J,Q),hD=f._FFLInitResGPUStep=()=>(hD=f._FFLInitResGPUStep=bJ.E)(),fD=f._FFLExit=()=>(fD=f._FFLExit=bJ.F)(),gD=f._FFLIsAvailable=()=>(gD=f._FFLIsAvailable=bJ.G)(),pD=f._FFLGetFavoriteColor=(J,Q)=>(pD=f._FFLGetFavoriteColor=bJ.H)(J,Q),mD=f._FFLSetLinearGammaMode=(J)=>(mD=f._FFLSetLinearGammaMode=bJ.I)(J),lD=f._FFLGetFacelineColor=(J,Q)=>(lD=f._FFLGetFacelineColor=bJ.J)(J,Q),uD=f._FFLSetTextureFlipY=(J)=>(uD=f._FFLSetTextureFlipY=bJ.K)(J),dD=f._FFLSetNormalIsSnorm8_8_8_8=(J)=>(dD=f._FFLSetNormalIsSnorm8_8_8_8=bJ.L)(J),cD=f._FFLSetFrontCullForFlipX=(J)=>(cD=f._FFLSetFrontCullForFlipX=bJ.M)(J),nD=f._FFLSetTextureCallback=(J)=>(nD=f._FFLSetTextureCallback=bJ.N)(J),sD=f._FFLiDeleteTempObjectMaskTextures=(J,Q,Z)=>(sD=f._FFLiDeleteTempObjectMaskTextures=bJ.P)(J,Q,Z),iD=f._FFLiDeleteTempObjectFacelineTexture=(J,Q,Z)=>(iD=f._FFLiDeleteTempObjectFacelineTexture=bJ.Q)(J,Q,Z),oD=f._FFLiDeleteTextureTempObject=(J)=>(oD=f._FFLiDeleteTextureTempObject=bJ.R)(J),aD=f._FFLiiGetEyeRotateOffset=(J)=>(aD=f._FFLiiGetEyeRotateOffset=bJ.S)(J),rD=f._FFLiiGetEyebrowRotateOffset=(J)=>(rD=f._FFLiiGetEyebrowRotateOffset=bJ.T)(J),tD=f._FFLiInvalidateTempObjectFacelineTexture=(J)=>(tD=f._FFLiInvalidateTempObjectFacelineTexture=bJ.U)(J),eD=f._FFLiInvalidatePartsTextures=(J)=>(eD=f._FFLiInvalidatePartsTextures=bJ.V)(J),JB=f._FFLiInvalidateRawMask=(J)=>(JB=f._FFLiInvalidateRawMask=bJ.W)(J),QB=f._FFLiVerifyCharInfoWithReason=(J,Q)=>(QB=f._FFLiVerifyCharInfoWithReason=bJ.X)(J,Q),ZB=f._malloc=(J)=>(ZB=f._malloc=bJ.Y)(J),$B=f._free=(J)=>($B=f._free=bJ.Z)(J);f.addFunction=ED;kZ=function J(){if(!XY)J5();if(!XY)kZ=J};if(f.preInit){if(typeof f.preInit=="function")f.preInit=[f.preInit];while(f.preInit.length>0)f.preInit.pop()()}J5();WB={Module:f}});var XZ={};xK(XZ,{createCanvasElement:()=>mX,ZeroStencilOp:()=>OU,ZeroSlopeEnding:()=>HU,ZeroFactor:()=>ZX,ZeroCurvatureEnding:()=>XU,WrapAroundEnding:()=>KU,WireframeGeometry:()=>RW,WebXRController:()=>V7,WebGPUCoordinateSystem:()=>pU,WebGLUtils:()=>mE,WebGLRenderer:()=>iW,WebGLRenderTarget:()=>H8,WebGLCubeRenderTarget:()=>$W,WebGLCoordinateSystem:()=>fX,WebGLArrayRenderTarget:()=>lX,WebGL3DRenderTarget:()=>uX,VideoTexture:()=>HW,VideoFrameTexture:()=>aX,VectorKeyframeTrack:()=>c8,Vector4:()=>XJ,Vector3:()=>I,Vector2:()=>i,VSMShadowMap:()=>h8,UnsignedShortType:()=>K7,UnsignedShort5551Type:()=>D$,UnsignedShort4444Type:()=>F$,UnsignedIntType:()=>q6,UnsignedInt5999Type:()=>_X,UnsignedInt248Type:()=>N6,UnsignedByteType:()=>X8,UniformsUtils:()=>oX,UniformsLib:()=>qJ,UniformsGroup:()=>DH,Uniform:()=>pW,Uint8ClampedBufferAttribute:()=>dX,Uint8BufferAttribute:()=>MQ,Uint32BufferAttribute:()=>IQ,Uint16BufferAttribute:()=>D6,UVMapping:()=>aG,TubeGeometry:()=>sQ,TrianglesDrawMode:()=>a$,TriangleStripDrawMode:()=>E7,TriangleFanDrawMode:()=>k6,Triangle:()=>r0,TorusKnotGeometry:()=>nQ,TorusGeometry:()=>cQ,TimestampQuery:()=>mU,TextureUtils:()=>HE,TextureLoader:()=>eQ,Texture:()=>R0,TetrahedronGeometry:()=>dQ,TangentSpaceNormalMap:()=>PX,TOUCH:()=>cG,SubtractiveBlending:()=>R$,SubtractEquation:()=>tY,StringKeyframeTrack:()=>L9,StreamReadUsage:()=>xU,StreamDrawUsage:()=>jU,StreamCopyUsage:()=>fU,StereoCamera:()=>UH,StaticReadUsage:()=>vU,StaticDrawUsage:()=>TU,StaticCopyUsage:()=>bU,SrcColorFactor:()=>$X,SrcAlphaSaturateFactor:()=>HX,SrcAlphaFactor:()=>V8,SpriteMaterial:()=>PQ,Sprite:()=>WW,SpotLightHelper:()=>wH,SpotLight:()=>w7,SplineCurve:()=>xQ,SphericalHarmonics3:()=>SW,Spherical:()=>CH,SphereGeometry:()=>I7,Sphere:()=>A0,Source:()=>G9,SkinnedMesh:()=>F7,SkeletonHelper:()=>AH,Skeleton:()=>C6,ShortType:()=>CX,ShapeUtils:()=>y8,ShapePath:()=>pH,ShapeGeometry:()=>uQ,Shape:()=>E9,ShadowMaterial:()=>kW,ShaderMaterial:()=>l0,ShaderLib:()=>p8,ShaderChunk:()=>rJ,Scene:()=>k9,SRGBTransfer:()=>q0,SRGBColorSpace:()=>f8,SIGNED_RED_RGTC1_Format:()=>n$,SIGNED_RED_GREEN_RGTC2_Format:()=>i$,RingGeometry:()=>lQ,ReverseSubtractEquation:()=>eY,ReplaceStencilOp:()=>kU,RepeatWrapping:()=>U6,RenderTargetArray:()=>FH,RenderTarget3D:()=>VH,RenderTarget:()=>q7,ReinhardToneMapping:()=>kX,RedIntegerFormat:()=>B$,RedFormat:()=>R6,RectAreaLight:()=>TW,Raycaster:()=>zH,Ray:()=>b9,RawShaderMaterial:()=>VW,RGIntegerFormat:()=>L$,RGFormat:()=>FQ,RGDepthPacking:()=>NU,RGB_S3TC_DXT1_Format:()=>DQ,RGB_PVRTC_4BPPV1_Format:()=>C$,RGB_PVRTC_2BPPV1_Format:()=>_$,RGB_ETC2_Format:()=>A$,RGB_ETC1_Format:()=>w$,RGB_BPTC_UNSIGNED_Format:()=>c$,RGB_BPTC_SIGNED_Format:()=>d$,RGBIntegerFormat:()=>QU,RGBFormat:()=>IX,RGBDepthPacking:()=>qU,RGBA_S3TC_DXT5_Format:()=>zQ,RGBA_S3TC_DXT3_Format:()=>LQ,RGBA_S3TC_DXT1_Format:()=>BQ,RGBA_PVRTC_4BPPV1_Format:()=>M$,RGBA_PVRTC_2BPPV1_Format:()=>I$,RGBA_ETC2_EAC_Format:()=>P$,RGBA_BPTC_Format:()=>CQ,RGBA_ASTC_8x8_Format:()=>h$,RGBA_ASTC_8x6_Format:()=>b$,RGBA_ASTC_8x5_Format:()=>x$,RGBA_ASTC_6x6_Format:()=>y$,RGBA_ASTC_6x5_Format:()=>v$,RGBA_ASTC_5x5_Format:()=>j$,RGBA_ASTC_5x4_Format:()=>S$,RGBA_ASTC_4x4_Format:()=>T$,RGBA_ASTC_12x12_Format:()=>u$,RGBA_ASTC_12x10_Format:()=>l$,RGBA_ASTC_10x8_Format:()=>p$,RGBA_ASTC_10x6_Format:()=>g$,RGBA_ASTC_10x5_Format:()=>f$,RGBA_ASTC_10x10_Format:()=>m$,RGBAIntegerFormat:()=>z$,RGBAFormat:()=>F8,RGBADepthPacking:()=>AX,REVISION:()=>j9,RED_RGTC1_Format:()=>wX,RED_GREEN_RGTC2_Format:()=>s$,QuaternionLinearInterpolant:()=>IW,QuaternionKeyframeTrack:()=>o8,Quaternion:()=>P0,QuadraticBezierCurve3:()=>yQ,QuadraticBezierCurve:()=>vQ,PropertyMixer:()=>fW,PropertyBinding:()=>Y0,PositionalAudio:()=>qH,PolyhedronGeometry:()=>V9,PolarGridHelper:()=>jH,PointsMaterial:()=>M6,Points:()=>L7,PointLightHelper:()=>PH,PointLight:()=>A7,PlaneHelper:()=>hH,PlaneGeometry:()=>F9,Plane:()=>l8,PerspectiveCamera:()=>O0,Path:()=>$6,PMREMGenerator:()=>nW,PCFSoftShadowMap:()=>rY,PCFShadowMap:()=>N$,OrthographicCamera:()=>r8,OneMinusSrcColorFactor:()=>WX,OneMinusSrcAlphaFactor:()=>O9,OneMinusDstColorFactor:()=>XX,OneMinusDstAlphaFactor:()=>K6,OneMinusConstantColorFactor:()=>GX,OneMinusConstantAlphaFactor:()=>EX,OneFactor:()=>k8,OctahedronGeometry:()=>M7,ObjectSpaceNormalMap:()=>TX,ObjectLoader:()=>KH,Object3D:()=>$0,NumberKeyframeTrack:()=>d8,NotEqualStencilFunc:()=>wU,NotEqualDepth:()=>EQ,NotEqualCompare:()=>xX,NormalBlending:()=>Y7,NormalAnimationBlendMode:()=>GU,NoToneMapping:()=>n8,NoColorSpace:()=>x9,NoBlending:()=>N9,NeverStencilFunc:()=>zU,NeverDepth:()=>YQ,NeverCompare:()=>SX,NeutralToneMapping:()=>LX,NearestMipmapNearestFilter:()=>RQ,NearestMipmapLinearFilter:()=>y9,NearestMipMapNearestFilter:()=>rG,NearestMipMapLinearFilter:()=>tG,NearestFilter:()=>i8,MultiplyOperation:()=>qX,MultiplyBlending:()=>k$,MixOperation:()=>NX,MirroredRepeatWrapping:()=>s8,MinEquation:()=>JX,MeshToonMaterial:()=>DW,MeshStandardMaterial:()=>f9,MeshPhysicalMaterial:()=>e0,MeshPhongMaterial:()=>FW,MeshNormalMaterial:()=>BW,MeshMatcapMaterial:()=>zW,MeshLambertMaterial:()=>LW,MeshDistanceMaterial:()=>oQ,MeshDepthMaterial:()=>iQ,MeshBasicMaterial:()=>b0,Mesh:()=>N0,MaxEquation:()=>QX,Matrix4:()=>SJ,Matrix3:()=>nJ,Matrix2:()=>mW,MathUtils:()=>JW,MaterialLoader:()=>JZ,Material:()=>C0,MOUSE:()=>dG,LuminanceFormat:()=>O6,LuminanceAlphaFormat:()=>kQ,LoopRepeat:()=>$U,LoopPingPong:()=>WU,LoopOnce:()=>ZU,LoadingManager:()=>tQ,LoaderUtils:()=>b8,Loader:()=>h0,LinearTransfer:()=>r$,LinearToneMapping:()=>RX,LinearSRGBColorSpace:()=>x0,LinearMipmapNearestFilter:()=>E6,LinearMipmapLinearFilter:()=>M8,LinearMipMapNearestFilter:()=>eG,LinearMipMapLinearFilter:()=>JU,LinearInterpolant:()=>aQ,LinearFilter:()=>m0,LineSegments:()=>K8,LineLoop:()=>B7,LineDashedMaterial:()=>CW,LineCurve3:()=>EW,LineCurve:()=>jQ,LineBasicMaterial:()=>S0,Line3:()=>IH,Line:()=>_8,LightProbe:()=>jW,Light:()=>a8,LessStencilFunc:()=>CU,LessEqualStencilFunc:()=>MU,LessEqualDepth:()=>X7,LessEqualCompare:()=>t$,LessDepth:()=>HQ,LessCompare:()=>jX,Layers:()=>O7,LatheGeometry:()=>_7,LOD:()=>YW,KeyframeTrack:()=>B8,KeepStencilOp:()=>RU,InvertStencilOp:()=>LU,InterpolateSmooth:()=>YU,InterpolateLinear:()=>_Q,InterpolateDiscrete:()=>o$,Interpolant:()=>D9,InterleavedBufferAttribute:()=>O8,InterleavedBuffer:()=>g8,IntType:()=>V$,Int8BufferAttribute:()=>R7,Int32BufferAttribute:()=>nX,Int16BufferAttribute:()=>cX,InstancedMesh:()=>D7,InstancedInterleavedBuffer:()=>BH,InstancedBufferGeometry:()=>vW,InstancedBufferAttribute:()=>x8,IncrementWrapStencilOp:()=>DU,IncrementStencilOp:()=>VU,ImageUtils:()=>QW,ImageLoader:()=>Y6,ImageBitmapLoader:()=>QZ,IcosahedronGeometry:()=>mQ,HemisphereLightHelper:()=>TH,HemisphereLight:()=>wW,HalfFloatType:()=>G7,Group:()=>$8,GridHelper:()=>SH,GreaterStencilFunc:()=>IU,GreaterEqualStencilFunc:()=>AU,GreaterEqualDepth:()=>GQ,GreaterEqualCompare:()=>bX,GreaterDepth:()=>UQ,GreaterCompare:()=>yX,GLSL3:()=>e$,GLSL1:()=>gU,GLBufferAttribute:()=>LH,Frustum:()=>_6,FrontSide:()=>t0,FramebufferTexture:()=>rX,FogExp2:()=>wQ,Fog:()=>AQ,FloatType:()=>R9,Float32BufferAttribute:()=>zJ,Float16BufferAttribute:()=>sX,FileLoader:()=>Y8,ExtrudeGeometry:()=>pQ,EventDispatcher:()=>I8,Euler:()=>W8,EquirectangularRefractionMapping:()=>NQ,EquirectangularReflectionMapping:()=>qQ,EqualStencilFunc:()=>_U,EqualDepth:()=>KQ,EqualCompare:()=>vX,EllipseCurve:()=>C7,EdgesGeometry:()=>NW,DynamicReadUsage:()=>yU,DynamicDrawUsage:()=>SU,DynamicCopyUsage:()=>hU,DstColorFactor:()=>YX,DstAlphaFactor:()=>H6,DoubleSide:()=>T0,DodecahedronGeometry:()=>gQ,DiscreteInterpolant:()=>MW,DirectionalLightHelper:()=>vH,DirectionalLight:()=>P7,DetachedBindMode:()=>oG,DepthTexture:()=>TQ,DepthStencilFormat:()=>U7,DepthFormat:()=>VQ,DefaultLoadingManager:()=>$H,DecrementWrapStencilOp:()=>BU,DecrementStencilOp:()=>FU,DataUtils:()=>nU,DataTextureLoader:()=>HH,DataTexture:()=>p0,DataArrayTexture:()=>F6,Data3DTexture:()=>N7,Cylindrical:()=>_H,CylinderGeometry:()=>I6,CustomToneMapping:()=>DX,CustomBlending:()=>R8,CurvePath:()=>qW,Curve:()=>D8,CullFaceNone:()=>oY,CullFaceFrontBack:()=>nG,CullFaceFront:()=>aY,CullFaceBack:()=>q$,CubicInterpolant:()=>_W,CubicBezierCurve3:()=>UW,CubicBezierCurve:()=>SQ,CubeUVReflectionMapping:()=>H7,CubeTextureLoader:()=>XH,CubeTexture:()=>L6,CubeRefractionMapping:()=>v9,CubeReflectionMapping:()=>G6,CubeCamera:()=>ZW,Controls:()=>mH,ConstantColorFactor:()=>KX,ConstantAlphaFactor:()=>UX,ConeGeometry:()=>fQ,CompressedTextureLoader:()=>YH,CompressedTexture:()=>z7,CompressedCubeTexture:()=>eX,CompressedArrayTexture:()=>tX,ColorManagement:()=>aJ,ColorKeyframeTrack:()=>rQ,Color:()=>u,Clock:()=>bW,ClampToEdgeWrapping:()=>OQ,CircleGeometry:()=>hQ,CineonToneMapping:()=>VX,CatmullRomCurve3:()=>GW,CapsuleGeometry:()=>bQ,CanvasTexture:()=>JH,CameraHelper:()=>yH,Camera:()=>k7,Cache:()=>u8,ByteType:()=>zX,BufferGeometryLoader:()=>yW,BufferGeometry:()=>gJ,BufferAttribute:()=>X0,BoxHelper:()=>xH,BoxGeometry:()=>h9,Box3Helper:()=>bH,Box3:()=>z0,Box2:()=>MH,BooleanKeyframeTrack:()=>B9,Bone:()=>z6,BatchedMesh:()=>XW,BasicShadowMap:()=>sG,BasicDepthPacking:()=>EU,BackSide:()=>n0,AxesHelper:()=>gH,AudioLoader:()=>GH,AudioListener:()=>EH,AudioContext:()=>ZZ,AudioAnalyser:()=>NH,Audio:()=>hW,AttachedBindMode:()=>iG,ArrowHelper:()=>fH,ArrayCamera:()=>xW,ArcCurve:()=>KW,AnimationUtils:()=>JE,AnimationObjectGroup:()=>kH,AnimationMixer:()=>$Z,AnimationLoader:()=>WH,AnimationClip:()=>q9,AnimationAction:()=>gW,AmbientLight:()=>PW,AlwaysStencilFunc:()=>PU,AlwaysDepth:()=>XQ,AlwaysCompare:()=>hX,AlphaFormat:()=>MX,AgXToneMapping:()=>BX,AdditiveBlending:()=>O$,AdditiveAnimationBlendMode:()=>UU,AddOperation:()=>OX,AddEquation:()=>X6,ACESFilmicToneMapping:()=>FX});var j9="173",dG={LEFT:0,MIDDLE:1,RIGHT:2,ROTATE:0,DOLLY:1,PAN:2},cG={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},oY=0,q$=1,aY=2,nG=3,sG=0,N$=1,rY=2,h8=3,t0=0,n0=1,T0=2,N9=0,Y7=1,O$=2,R$=3,k$=4,R8=5,X6=100,tY=101,eY=102,JX=103,QX=104,ZX=200,k8=201,$X=202,WX=203,V8=204,O9=205,H6=206,K6=207,YX=208,XX=209,HX=210,KX=211,GX=212,UX=213,EX=214,YQ=0,XQ=1,HQ=2,X7=3,KQ=4,GQ=5,UQ=6,EQ=7,qX=0,NX=1,OX=2,n8=0,RX=1,kX=2,VX=3,FX=4,DX=5,BX=6,LX=7,iG="attached",oG="detached",aG=300,G6=301,v9=302,qQ=303,NQ=304,H7=306,U6=1000,OQ=1001,s8=1002,i8=1003,RQ=1004,rG=1004,y9=1005,tG=1005,m0=1006,E6=1007,eG=1007,M8=1008,JU=1008,X8=1009,zX=1010,CX=1011,K7=1012,V$=1013,q6=1014,R9=1015,G7=1016,F$=1017,D$=1018,N6=1020,_X=35902,MX=1021,IX=1022,F8=1023,O6=1024,kQ=1025,VQ=1026,U7=1027,R6=1028,B$=1029,FQ=1030,L$=1031,QU=1032,z$=1033,DQ=33776,BQ=33777,LQ=33778,zQ=33779,C$=35840,_$=35841,M$=35842,I$=35843,w$=36196,A$=37492,P$=37496,T$=37808,S$=37809,j$=37810,v$=37811,y$=37812,x$=37813,b$=37814,h$=37815,f$=37816,g$=37817,p$=37818,m$=37819,l$=37820,u$=37821,CQ=36492,d$=36494,c$=36495,wX=36283,n$=36284,s$=36285,i$=36286,ZU=2200,$U=2201,WU=2202,o$=2300,_Q=2301,YU=2302,XU=2400,HU=2401,KU=2402,GU=2500,UU=2501,a$=0,E7=1,k6=2,EU=3200,AX=3201,qU=3202,NU=3203,PX=0,TX=1,x9="",f8="srgb",x0="srgb-linear",r$="linear",q0="srgb",OU=0,RU=7680,kU=7681,VU=7682,FU=7683,DU=34055,BU=34056,LU=5386,zU=512,CU=513,_U=514,MU=515,IU=516,wU=517,AU=518,PU=519,SX=512,jX=513,vX=514,t$=515,yX=516,xX=517,bX=518,hX=519,TU=35044,SU=35048,jU=35040,vU=35045,yU=35049,xU=35041,bU=35046,hU=35050,fU=35042,gU="100",e$="300 es",fX=2000,pU=2001,mU={COMPUTE:"compute",RENDER:"render"};class I8{addEventListener(J,Q){if(this._listeners===void 0)this._listeners={};let Z=this._listeners;if(Z[J]===void 0)Z[J]=[];if(Z[J].indexOf(Q)===-1)Z[J].push(Q)}hasEventListener(J,Q){let Z=this._listeners;if(Z===void 0)return!1;return Z[J]!==void 0&&Z[J].indexOf(Q)!==-1}removeEventListener(J,Q){let Z=this._listeners;if(Z===void 0)return;let $=Z[J];if($!==void 0){let W=$.indexOf(Q);if(W!==-1)$.splice(W,1)}}dispatchEvent(J){let Q=this._listeners;if(Q===void 0)return;let Z=Q[J.type];if(Z!==void 0){J.target=this;let $=Z.slice(0);for(let W=0,Y=$.length;W<Y;W++)$[W].call(this,J);J.target=null}}}var u0=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],bK=1234567,Q6=Math.PI/180,Z6=180/Math.PI;function N8(){let J=Math.random()*4294967295|0,Q=Math.random()*4294967295|0,Z=Math.random()*4294967295|0,$=Math.random()*4294967295|0;return(u0[J&255]+u0[J>>8&255]+u0[J>>16&255]+u0[J>>24&255]+"-"+u0[Q&255]+u0[Q>>8&255]+"-"+u0[Q>>16&15|64]+u0[Q>>24&255]+"-"+u0[Z&63|128]+u0[Z>>8&255]+"-"+u0[Z>>16&255]+u0[Z>>24&255]+u0[$&255]+u0[$>>8&255]+u0[$>>16&255]+u0[$>>24&255]).toLowerCase()}function cJ(J,Q,Z){return Math.max(Q,Math.min(Z,J))}function gX(J,Q){return(J%Q+Q)%Q}function B5(J,Q,Z,$,W){return $+(J-Q)*(W-$)/(Z-Q)}function L5(J,Q,Z){if(J!==Q)return(Z-J)/(Q-J);else return 0}function e7(J,Q,Z){return(1-Z)*J+Z*Q}function z5(J,Q,Z,$){return e7(J,Q,1-Math.exp(-Z*$))}function C5(J,Q=1){return Q-Math.abs(gX(J,Q*2)-Q)}function _5(J,Q,Z){if(J<=Q)return 0;if(J>=Z)return 1;return J=(J-Q)/(Z-Q),J*J*(3-2*J)}function M5(J,Q,Z){if(J<=Q)return 0;if(J>=Z)return 1;return J=(J-Q)/(Z-Q),J*J*J*(J*(J*6-15)+10)}function I5(J,Q){return J+Math.floor(Math.random()*(Q-J+1))}function w5(J,Q){return J+Math.random()*(Q-J)}function A5(J){return J*(0.5-Math.random())}function P5(J){if(J!==void 0)bK=J;let Q=bK+=1831565813;return Q=Math.imul(Q^Q>>>15,Q|1),Q^=Q+Math.imul(Q^Q>>>7,Q|61),((Q^Q>>>14)>>>0)/4294967296}function T5(J){return J*Q6}function S5(J){return J*Z6}function j5(J){return(J&J-1)===0&&J!==0}function v5(J){return Math.pow(2,Math.ceil(Math.log(J)/Math.LN2))}function y5(J){return Math.pow(2,Math.floor(Math.log(J)/Math.LN2))}function x5(J,Q,Z,$,W){let{cos:Y,sin:X}=Math,H=Y(Z/2),K=X(Z/2),G=Y((Q+$)/2),U=X((Q+$)/2),E=Y((Q-$)/2),q=X((Q-$)/2),N=Y(($-Q)/2),k=X(($-Q)/2);switch(W){case"XYX":J.set(H*U,K*E,K*q,H*G);break;case"YZY":J.set(K*q,H*U,K*E,H*G);break;case"ZXZ":J.set(K*E,K*q,H*U,H*G);break;case"XZX":J.set(H*U,K*k,K*N,H*G);break;case"YXY":J.set(K*N,H*U,K*k,H*G);break;case"ZYZ":J.set(K*k,K*N,H*U,H*G);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+W)}}function a0(J,Q){switch(Q.constructor){case Float32Array:return J;case Uint32Array:return J/4294967295;case Uint16Array:return J/65535;case Uint8Array:return J/255;case Int32Array:return Math.max(J/2147483647,-1);case Int16Array:return Math.max(J/32767,-1);case Int8Array:return Math.max(J/127,-1);default:throw Error("Invalid component type.")}}function iJ(J,Q){switch(Q.constructor){case Float32Array:return J;case Uint32Array:return Math.round(J*4294967295);case Uint16Array:return Math.round(J*65535);case Uint8Array:return Math.round(J*255);case Int32Array:return Math.round(J*2147483647);case Int16Array:return Math.round(J*32767);case Int8Array:return Math.round(J*127);default:throw Error("Invalid component type.")}}var JW={DEG2RAD:Q6,RAD2DEG:Z6,generateUUID:N8,clamp:cJ,euclideanModulo:gX,mapLinear:B5,inverseLerp:L5,lerp:e7,damp:z5,pingpong:C5,smoothstep:_5,smootherstep:M5,randInt:I5,randFloat:w5,randFloatSpread:A5,seededRandom:P5,degToRad:T5,radToDeg:S5,isPowerOfTwo:j5,ceilPowerOfTwo:v5,floorPowerOfTwo:y5,setQuaternionFromProperEuler:x5,normalize:iJ,denormalize:a0};class i{constructor(J=0,Q=0){i.prototype.isVector2=!0,this.x=J,this.y=Q}get width(){return this.x}set width(J){this.x=J}get height(){return this.y}set height(J){this.y=J}set(J,Q){return this.x=J,this.y=Q,this}setScalar(J){return this.x=J,this.y=J,this}setX(J){return this.x=J,this}setY(J){return this.y=J,this}setComponent(J,Q){switch(J){case 0:this.x=Q;break;case 1:this.y=Q;break;default:throw Error("index is out of range: "+J)}return this}getComponent(J){switch(J){case 0:return this.x;case 1:return this.y;default:throw Error("index is out of range: "+J)}}clone(){return new this.constructor(this.x,this.y)}copy(J){return this.x=J.x,this.y=J.y,this}add(J){return this.x+=J.x,this.y+=J.y,this}addScalar(J){return this.x+=J,this.y+=J,this}addVectors(J,Q){return this.x=J.x+Q.x,this.y=J.y+Q.y,this}addScaledVector(J,Q){return this.x+=J.x*Q,this.y+=J.y*Q,this}sub(J){return this.x-=J.x,this.y-=J.y,this}subScalar(J){return this.x-=J,this.y-=J,this}subVectors(J,Q){return this.x=J.x-Q.x,this.y=J.y-Q.y,this}multiply(J){return this.x*=J.x,this.y*=J.y,this}multiplyScalar(J){return this.x*=J,this.y*=J,this}divide(J){return this.x/=J.x,this.y/=J.y,this}divideScalar(J){return this.multiplyScalar(1/J)}applyMatrix3(J){let Q=this.x,Z=this.y,$=J.elements;return this.x=$[0]*Q+$[3]*Z+$[6],this.y=$[1]*Q+$[4]*Z+$[7],this}min(J){return this.x=Math.min(this.x,J.x),this.y=Math.min(this.y,J.y),this}max(J){return this.x=Math.max(this.x,J.x),this.y=Math.max(this.y,J.y),this}clamp(J,Q){return this.x=cJ(this.x,J.x,Q.x),this.y=cJ(this.y,J.y,Q.y),this}clampScalar(J,Q){return this.x=cJ(this.x,J,Q),this.y=cJ(this.y,J,Q),this}clampLength(J,Q){let Z=this.length();return this.divideScalar(Z||1).multiplyScalar(cJ(Z,J,Q))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(J){return this.x*J.x+this.y*J.y}cross(J){return this.x*J.y-this.y*J.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(J){let Q=Math.sqrt(this.lengthSq()*J.lengthSq());if(Q===0)return Math.PI/2;let Z=this.dot(J)/Q;return Math.acos(cJ(Z,-1,1))}distanceTo(J){return Math.sqrt(this.distanceToSquared(J))}distanceToSquared(J){let Q=this.x-J.x,Z=this.y-J.y;return Q*Q+Z*Z}manhattanDistanceTo(J){return Math.abs(this.x-J.x)+Math.abs(this.y-J.y)}setLength(J){return this.normalize().multiplyScalar(J)}lerp(J,Q){return this.x+=(J.x-this.x)*Q,this.y+=(J.y-this.y)*Q,this}lerpVectors(J,Q,Z){return this.x=J.x+(Q.x-J.x)*Z,this.y=J.y+(Q.y-J.y)*Z,this}equals(J){return J.x===this.x&&J.y===this.y}fromArray(J,Q=0){return this.x=J[Q],this.y=J[Q+1],this}toArray(J=[],Q=0){return J[Q]=this.x,J[Q+1]=this.y,J}fromBufferAttribute(J,Q){return this.x=J.getX(Q),this.y=J.getY(Q),this}rotateAround(J,Q){let Z=Math.cos(Q),$=Math.sin(Q),W=this.x-J.x,Y=this.y-J.y;return this.x=W*Z-Y*$+J.x,this.y=W*$+Y*Z+J.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class nJ{constructor(J,Q,Z,$,W,Y,X,H,K){if(nJ.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],J!==void 0)this.set(J,Q,Z,$,W,Y,X,H,K)}set(J,Q,Z,$,W,Y,X,H,K){let G=this.elements;return G[0]=J,G[1]=$,G[2]=X,G[3]=Q,G[4]=W,G[5]=H,G[6]=Z,G[7]=Y,G[8]=K,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(J){let Q=this.elements,Z=J.elements;return Q[0]=Z[0],Q[1]=Z[1],Q[2]=Z[2],Q[3]=Z[3],Q[4]=Z[4],Q[5]=Z[5],Q[6]=Z[6],Q[7]=Z[7],Q[8]=Z[8],this}extractBasis(J,Q,Z){return J.setFromMatrix3Column(this,0),Q.setFromMatrix3Column(this,1),Z.setFromMatrix3Column(this,2),this}setFromMatrix4(J){let Q=J.elements;return this.set(Q[0],Q[4],Q[8],Q[1],Q[5],Q[9],Q[2],Q[6],Q[10]),this}multiply(J){return this.multiplyMatrices(this,J)}premultiply(J){return this.multiplyMatrices(J,this)}multiplyMatrices(J,Q){let Z=J.elements,$=Q.elements,W=this.elements,Y=Z[0],X=Z[3],H=Z[6],K=Z[1],G=Z[4],U=Z[7],E=Z[2],q=Z[5],N=Z[8],k=$[0],V=$[3],R=$[6],O=$[1],D=$[4],F=$[7],C=$[2],P=$[5],M=$[8];return W[0]=Y*k+X*O+H*C,W[3]=Y*V+X*D+H*P,W[6]=Y*R+X*F+H*M,W[1]=K*k+G*O+U*C,W[4]=K*V+G*D+U*P,W[7]=K*R+G*F+U*M,W[2]=E*k+q*O+N*C,W[5]=E*V+q*D+N*P,W[8]=E*R+q*F+N*M,this}multiplyScalar(J){let Q=this.elements;return Q[0]*=J,Q[3]*=J,Q[6]*=J,Q[1]*=J,Q[4]*=J,Q[7]*=J,Q[2]*=J,Q[5]*=J,Q[8]*=J,this}determinant(){let J=this.elements,Q=J[0],Z=J[1],$=J[2],W=J[3],Y=J[4],X=J[5],H=J[6],K=J[7],G=J[8];return Q*Y*G-Q*X*K-Z*W*G+Z*X*H+$*W*K-$*Y*H}invert(){let J=this.elements,Q=J[0],Z=J[1],$=J[2],W=J[3],Y=J[4],X=J[5],H=J[6],K=J[7],G=J[8],U=G*Y-X*K,E=X*H-G*W,q=K*W-Y*H,N=Q*U+Z*E+$*q;if(N===0)return this.set(0,0,0,0,0,0,0,0,0);let k=1/N;return J[0]=U*k,J[1]=($*K-G*Z)*k,J[2]=(X*Z-$*Y)*k,J[3]=E*k,J[4]=(G*Q-$*H)*k,J[5]=($*W-X*Q)*k,J[6]=q*k,J[7]=(Z*H-K*Q)*k,J[8]=(Y*Q-Z*W)*k,this}transpose(){let J,Q=this.elements;return J=Q[1],Q[1]=Q[3],Q[3]=J,J=Q[2],Q[2]=Q[6],Q[6]=J,J=Q[5],Q[5]=Q[7],Q[7]=J,this}getNormalMatrix(J){return this.setFromMatrix4(J).invert().transpose()}transposeIntoArray(J){let Q=this.elements;return J[0]=Q[0],J[1]=Q[3],J[2]=Q[6],J[3]=Q[1],J[4]=Q[4],J[5]=Q[7],J[6]=Q[2],J[7]=Q[5],J[8]=Q[8],this}setUvTransform(J,Q,Z,$,W,Y,X){let H=Math.cos(W),K=Math.sin(W);return this.set(Z*H,Z*K,-Z*(H*Y+K*X)+Y+J,-$*K,$*H,-$*(-K*Y+H*X)+X+Q,0,0,1),this}scale(J,Q){return this.premultiply(GY.makeScale(J,Q)),this}rotate(J){return this.premultiply(GY.makeRotation(-J)),this}translate(J,Q){return this.premultiply(GY.makeTranslation(J,Q)),this}makeTranslation(J,Q){if(J.isVector2)this.set(1,0,J.x,0,1,J.y,0,0,1);else this.set(1,0,J,0,1,Q,0,0,1);return this}makeRotation(J){let Q=Math.cos(J),Z=Math.sin(J);return this.set(Q,-Z,0,Z,Q,0,0,0,1),this}makeScale(J,Q){return this.set(J,0,0,0,Q,0,0,0,1),this}equals(J){let Q=this.elements,Z=J.elements;for(let $=0;$<9;$++)if(Q[$]!==Z[$])return!1;return!0}fromArray(J,Q=0){for(let Z=0;Z<9;Z++)this.elements[Z]=J[Z+Q];return this}toArray(J=[],Q=0){let Z=this.elements;return J[Q]=Z[0],J[Q+1]=Z[1],J[Q+2]=Z[2],J[Q+3]=Z[3],J[Q+4]=Z[4],J[Q+5]=Z[5],J[Q+6]=Z[6],J[Q+7]=Z[7],J[Q+8]=Z[8],J}clone(){return new this.constructor().fromArray(this.elements)}}var GY=/*@__PURE__*/new nJ;function pX(J){for(let Q=J.length-1;Q>=0;--Q)if(J[Q]>=65535)return!0;return!1}var b5={Int8Array,Uint8Array,Uint8ClampedArray,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array};function Q7(J,Q){return new b5[J](Q)}function W7(J){return document.createElementNS("http://www.w3.org/1999/xhtml",J)}function mX(){let J=W7("canvas");return J.style.display="block",J}var hK={};function V6(J){if(J in hK)return;hK[J]=!0,console.warn(J)}function lU(J,Q,Z){return new Promise(function($,W){function Y(){switch(J.clientWaitSync(Q,J.SYNC_FLUSH_COMMANDS_BIT,0)){case J.WAIT_FAILED:W();break;case J.TIMEOUT_EXPIRED:setTimeout(Y,Z);break;default:$()}}setTimeout(Y,Z)})}function uU(J){let Q=J.elements;Q[2]=0.5*Q[2]+0.5*Q[3],Q[6]=0.5*Q[6]+0.5*Q[7],Q[10]=0.5*Q[10]+0.5*Q[11],Q[14]=0.5*Q[14]+0.5*Q[15]}function dU(J){let Q=J.elements;if(Q[11]===-1)Q[10]=-Q[10]-1,Q[14]=-Q[14];else Q[10]=-Q[10],Q[14]=-Q[14]+1}var fK=/*@__PURE__*/new nJ().set(0.4123908,0.3575843,0.1804808,0.212639,0.7151687,0.0721923,0.0193308,0.1191948,0.9505322),gK=/*@__PURE__*/new nJ().set(3.2409699,-1.5373832,-0.4986108,-0.9692436,1.8759675,0.0415551,0.0556301,-0.203977,1.0569715);function h5(){let J={enabled:!0,workingColorSpace:"srgb-linear",spaces:{},convert:function(W,Y,X){if(this.enabled===!1||Y===X||!Y||!X)return W;if(this.spaces[Y].transfer==="srgb")W.r=U9(W.r),W.g=U9(W.g),W.b=U9(W.b);if(this.spaces[Y].primaries!==this.spaces[X].primaries)W.applyMatrix3(this.spaces[Y].toXYZ),W.applyMatrix3(this.spaces[X].fromXYZ);if(this.spaces[X].transfer==="srgb")W.r=$7(W.r),W.g=$7(W.g),W.b=$7(W.b);return W},fromWorkingColorSpace:function(W,Y){return this.convert(W,this.workingColorSpace,Y)},toWorkingColorSpace:function(W,Y){return this.convert(W,Y,this.workingColorSpace)},getPrimaries:function(W){return this.spaces[W].primaries},getTransfer:function(W){if(W==="")return"linear";return this.spaces[W].transfer},getLuminanceCoefficients:function(W,Y=this.workingColorSpace){return W.fromArray(this.spaces[Y].luminanceCoefficients)},define:function(W){Object.assign(this.spaces,W)},_getMatrix:function(W,Y,X){return W.copy(this.spaces[Y].toXYZ).multiply(this.spaces[X].fromXYZ)},_getDrawingBufferColorSpace:function(W){return this.spaces[W].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(W=this.workingColorSpace){return this.spaces[W].workingColorSpaceConfig.unpackColorSpace}},Q=[0.64,0.33,0.3,0.6,0.15,0.06],Z=[0.2126,0.7152,0.0722],$=[0.3127,0.329];return J.define({["srgb-linear"]:{primaries:Q,whitePoint:$,transfer:"linear",toXYZ:fK,fromXYZ:gK,luminanceCoefficients:Z,workingColorSpaceConfig:{unpackColorSpace:"srgb"},outputColorSpaceConfig:{drawingBufferColorSpace:"srgb"}},["srgb"]:{primaries:Q,whitePoint:$,transfer:"srgb",toXYZ:fK,fromXYZ:gK,luminanceCoefficients:Z,outputColorSpaceConfig:{drawingBufferColorSpace:"srgb"}}}),J}var aJ=/*@__PURE__*/h5();function U9(J){return J<0.04045?J*0.0773993808:Math.pow(J*0.9478672986+0.0521327014,2.4)}function $7(J){return J<0.0031308?J*12.92:1.055*Math.pow(J,0.41666)-0.055}var f6;class QW{static getDataURL(J){if(/^data:/i.test(J.src))return J.src;if(typeof HTMLCanvasElement>"u")return J.src;let Q;if(J instanceof HTMLCanvasElement)Q=J;else{if(f6===void 0)f6=W7("canvas");f6.width=J.width,f6.height=J.height;let Z=f6.getContext("2d");if(J instanceof ImageData)Z.putImageData(J,0,0);else Z.drawImage(J,0,0,J.width,J.height);Q=f6}return Q.toDataURL("image/png")}static sRGBToLinear(J){if(typeof HTMLImageElement<"u"&&J instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&J instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&J instanceof ImageBitmap){let Q=W7("canvas");Q.width=J.width,Q.height=J.height;let Z=Q.getContext("2d");Z.drawImage(J,0,0,J.width,J.height);let $=Z.getImageData(0,0,J.width,J.height),W=$.data;for(let Y=0;Y<W.length;Y++)W[Y]=U9(W[Y]/255)*255;return Z.putImageData($,0,0),Q}else if(J.data){let Q=J.data.slice(0);for(let Z=0;Z<Q.length;Z++)if(Q instanceof Uint8Array||Q instanceof Uint8ClampedArray)Q[Z]=Math.floor(U9(Q[Z]/255)*255);else Q[Z]=U9(Q[Z]);return{data:Q,width:J.width,height:J.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),J}}var f5=0;class G9{constructor(J=null){this.isSource=!0,Object.defineProperty(this,"id",{value:f5++}),this.uuid=N8(),this.data=J,this.dataReady=!0,this.version=0}set needsUpdate(J){if(J===!0)this.version++}toJSON(J){let Q=J===void 0||typeof J==="string";if(!Q&&J.images[this.uuid]!==void 0)return J.images[this.uuid];let Z={uuid:this.uuid,url:""},$=this.data;if($!==null){let W;if(Array.isArray($)){W=[];for(let Y=0,X=$.length;Y<X;Y++)if($[Y].isDataTexture)W.push(UY($[Y].image));else W.push(UY($[Y]))}else W=UY($);Z.url=W}if(!Q)J.images[this.uuid]=Z;return Z}}function UY(J){if(typeof HTMLImageElement<"u"&&J instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&J instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&J instanceof ImageBitmap)return QW.getDataURL(J);else if(J.data)return{data:Array.from(J.data),width:J.width,height:J.height,type:J.data.constructor.name};else return console.warn("THREE.Texture: Unable to serialize Texture."),{}}var g5=0;class R0 extends I8{constructor(J=R0.DEFAULT_IMAGE,Q=R0.DEFAULT_MAPPING,Z=1001,$=1001,W=1006,Y=1008,X=1023,H=1009,K=R0.DEFAULT_ANISOTROPY,G=""){super();this.isTexture=!0,Object.defineProperty(this,"id",{value:g5++}),this.uuid=N8(),this.name="",this.source=new G9(J),this.mipmaps=[],this.mapping=Q,this.channel=0,this.wrapS=Z,this.wrapT=$,this.magFilter=W,this.minFilter=Y,this.anisotropy=K,this.format=X,this.internalFormat=null,this.type=H,this.offset=new i(0,0),this.repeat=new i(1,1),this.center=new i(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new nJ,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=G,this.userData={},this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(J=null){this.source.data=J}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(J){return this.name=J.name,this.source=J.source,this.mipmaps=J.mipmaps.slice(0),this.mapping=J.mapping,this.channel=J.channel,this.wrapS=J.wrapS,this.wrapT=J.wrapT,this.magFilter=J.magFilter,this.minFilter=J.minFilter,this.anisotropy=J.anisotropy,this.format=J.format,this.internalFormat=J.internalFormat,this.type=J.type,this.offset.copy(J.offset),this.repeat.copy(J.repeat),this.center.copy(J.center),this.rotation=J.rotation,this.matrixAutoUpdate=J.matrixAutoUpdate,this.matrix.copy(J.matrix),this.generateMipmaps=J.generateMipmaps,this.premultiplyAlpha=J.premultiplyAlpha,this.flipY=J.flipY,this.unpackAlignment=J.unpackAlignment,this.colorSpace=J.colorSpace,this.renderTarget=J.renderTarget,this.isRenderTargetTexture=J.isRenderTargetTexture,this.userData=JSON.parse(JSON.stringify(J.userData)),this.needsUpdate=!0,this}toJSON(J){let Q=J===void 0||typeof J==="string";if(!Q&&J.textures[this.uuid]!==void 0)return J.textures[this.uuid];let Z={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(J).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};if(Object.keys(this.userData).length>0)Z.userData=this.userData;if(!Q)J.textures[this.uuid]=Z;return Z}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(J){if(this.mapping!==300)return J;if(J.applyMatrix3(this.matrix),J.x<0||J.x>1)switch(this.wrapS){case 1000:J.x=J.x-Math.floor(J.x);break;case 1001:J.x=J.x<0?0:1;break;case 1002:if(Math.abs(Math.floor(J.x)%2)===1)J.x=Math.ceil(J.x)-J.x;else J.x=J.x-Math.floor(J.x);break}if(J.y<0||J.y>1)switch(this.wrapT){case 1000:J.y=J.y-Math.floor(J.y);break;case 1001:J.y=J.y<0?0:1;break;case 1002:if(Math.abs(Math.floor(J.y)%2)===1)J.y=Math.ceil(J.y)-J.y;else J.y=J.y-Math.floor(J.y);break}if(this.flipY)J.y=1-J.y;return J}set needsUpdate(J){if(J===!0)this.version++,this.source.needsUpdate=!0}set needsPMREMUpdate(J){if(J===!0)this.pmremVersion++}}R0.DEFAULT_IMAGE=null;R0.DEFAULT_MAPPING=300;R0.DEFAULT_ANISOTROPY=1;class XJ{constructor(J=0,Q=0,Z=0,$=1){XJ.prototype.isVector4=!0,this.x=J,this.y=Q,this.z=Z,this.w=$}get width(){return this.z}set width(J){this.z=J}get height(){return this.w}set height(J){this.w=J}set(J,Q,Z,$){return this.x=J,this.y=Q,this.z=Z,this.w=$,this}setScalar(J){return this.x=J,this.y=J,this.z=J,this.w=J,this}setX(J){return this.x=J,this}setY(J){return this.y=J,this}setZ(J){return this.z=J,this}setW(J){return this.w=J,this}setComponent(J,Q){switch(J){case 0:this.x=Q;break;case 1:this.y=Q;break;case 2:this.z=Q;break;case 3:this.w=Q;break;default:throw Error("index is out of range: "+J)}return this}getComponent(J){switch(J){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw Error("index is out of range: "+J)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(J){return this.x=J.x,this.y=J.y,this.z=J.z,this.w=J.w!==void 0?J.w:1,this}add(J){return this.x+=J.x,this.y+=J.y,this.z+=J.z,this.w+=J.w,this}addScalar(J){return this.x+=J,this.y+=J,this.z+=J,this.w+=J,this}addVectors(J,Q){return this.x=J.x+Q.x,this.y=J.y+Q.y,this.z=J.z+Q.z,this.w=J.w+Q.w,this}addScaledVector(J,Q){return this.x+=J.x*Q,this.y+=J.y*Q,this.z+=J.z*Q,this.w+=J.w*Q,this}sub(J){return this.x-=J.x,this.y-=J.y,this.z-=J.z,this.w-=J.w,this}subScalar(J){return this.x-=J,this.y-=J,this.z-=J,this.w-=J,this}subVectors(J,Q){return this.x=J.x-Q.x,this.y=J.y-Q.y,this.z=J.z-Q.z,this.w=J.w-Q.w,this}multiply(J){return this.x*=J.x,this.y*=J.y,this.z*=J.z,this.w*=J.w,this}multiplyScalar(J){return this.x*=J,this.y*=J,this.z*=J,this.w*=J,this}applyMatrix4(J){let Q=this.x,Z=this.y,$=this.z,W=this.w,Y=J.elements;return this.x=Y[0]*Q+Y[4]*Z+Y[8]*$+Y[12]*W,this.y=Y[1]*Q+Y[5]*Z+Y[9]*$+Y[13]*W,this.z=Y[2]*Q+Y[6]*Z+Y[10]*$+Y[14]*W,this.w=Y[3]*Q+Y[7]*Z+Y[11]*$+Y[15]*W,this}divide(J){return this.x/=J.x,this.y/=J.y,this.z/=J.z,this.w/=J.w,this}divideScalar(J){return this.multiplyScalar(1/J)}setAxisAngleFromQuaternion(J){this.w=2*Math.acos(J.w);let Q=Math.sqrt(1-J.w*J.w);if(Q<0.0001)this.x=1,this.y=0,this.z=0;else this.x=J.x/Q,this.y=J.y/Q,this.z=J.z/Q;return this}setAxisAngleFromRotationMatrix(J){let Q,Z,$,W,Y=0.01,X=0.1,H=J.elements,K=H[0],G=H[4],U=H[8],E=H[1],q=H[5],N=H[9],k=H[2],V=H[6],R=H[10];if(Math.abs(G-E)<0.01&&Math.abs(U-k)<0.01&&Math.abs(N-V)<0.01){if(Math.abs(G+E)<0.1&&Math.abs(U+k)<0.1&&Math.abs(N+V)<0.1&&Math.abs(K+q+R-3)<0.1)return this.set(1,0,0,0),this;Q=Math.PI;let D=(K+1)/2,F=(q+1)/2,C=(R+1)/2,P=(G+E)/4,M=(U+k)/4,w=(N+V)/4;if(D>F&&D>C)if(D<0.01)Z=0,$=0.707106781,W=0.707106781;else Z=Math.sqrt(D),$=P/Z,W=M/Z;else if(F>C)if(F<0.01)Z=0.707106781,$=0,W=0.707106781;else $=Math.sqrt(F),Z=P/$,W=w/$;else if(C<0.01)Z=0.707106781,$=0.707106781,W=0;else W=Math.sqrt(C),Z=M/W,$=w/W;return this.set(Z,$,W,Q),this}let O=Math.sqrt((V-N)*(V-N)+(U-k)*(U-k)+(E-G)*(E-G));if(Math.abs(O)<0.001)O=1;return this.x=(V-N)/O,this.y=(U-k)/O,this.z=(E-G)/O,this.w=Math.acos((K+q+R-1)/2),this}setFromMatrixPosition(J){let Q=J.elements;return this.x=Q[12],this.y=Q[13],this.z=Q[14],this.w=Q[15],this}min(J){return this.x=Math.min(this.x,J.x),this.y=Math.min(this.y,J.y),this.z=Math.min(this.z,J.z),this.w=Math.min(this.w,J.w),this}max(J){return this.x=Math.max(this.x,J.x),this.y=Math.max(this.y,J.y),this.z=Math.max(this.z,J.z),this.w=Math.max(this.w,J.w),this}clamp(J,Q){return this.x=cJ(this.x,J.x,Q.x),this.y=cJ(this.y,J.y,Q.y),this.z=cJ(this.z,J.z,Q.z),this.w=cJ(this.w,J.w,Q.w),this}clampScalar(J,Q){return this.x=cJ(this.x,J,Q),this.y=cJ(this.y,J,Q),this.z=cJ(this.z,J,Q),this.w=cJ(this.w,J,Q),this}clampLength(J,Q){let Z=this.length();return this.divideScalar(Z||1).multiplyScalar(cJ(Z,J,Q))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(J){return this.x*J.x+this.y*J.y+this.z*J.z+this.w*J.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(J){return this.normalize().multiplyScalar(J)}lerp(J,Q){return this.x+=(J.x-this.x)*Q,this.y+=(J.y-this.y)*Q,this.z+=(J.z-this.z)*Q,this.w+=(J.w-this.w)*Q,this}lerpVectors(J,Q,Z){return this.x=J.x+(Q.x-J.x)*Z,this.y=J.y+(Q.y-J.y)*Z,this.z=J.z+(Q.z-J.z)*Z,this.w=J.w+(Q.w-J.w)*Z,this}equals(J){return J.x===this.x&&J.y===this.y&&J.z===this.z&&J.w===this.w}fromArray(J,Q=0){return this.x=J[Q],this.y=J[Q+1],this.z=J[Q+2],this.w=J[Q+3],this}toArray(J=[],Q=0){return J[Q]=this.x,J[Q+1]=this.y,J[Q+2]=this.z,J[Q+3]=this.w,J}fromBufferAttribute(J,Q){return this.x=J.getX(Q),this.y=J.getY(Q),this.z=J.getZ(Q),this.w=J.getW(Q),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class q7 extends I8{constructor(J=1,Q=1,Z={}){super();this.isRenderTarget=!0,this.width=J,this.height=Q,this.depth=1,this.scissor=new XJ(0,0,J,Q),this.scissorTest=!1,this.viewport=new XJ(0,0,J,Q);let $={width:J,height:Q,depth:1};Z=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:1006,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},Z);let W=new R0($,Z.mapping,Z.wrapS,Z.wrapT,Z.magFilter,Z.minFilter,Z.format,Z.type,Z.anisotropy,Z.colorSpace);W.flipY=!1,W.generateMipmaps=Z.generateMipmaps,W.internalFormat=Z.internalFormat,this.textures=[];let Y=Z.count;for(let X=0;X<Y;X++)this.textures[X]=W.clone(),this.textures[X].isRenderTargetTexture=!0,this.textures[X].renderTarget=this;this.depthBuffer=Z.depthBuffer,this.stencilBuffer=Z.stencilBuffer,this.resolveDepthBuffer=Z.resolveDepthBuffer,this.resolveStencilBuffer=Z.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=Z.depthTexture,this.samples=Z.samples}get texture(){return this.textures[0]}set texture(J){this.textures[0]=J}set depthTexture(J){if(this._depthTexture!==null)this._depthTexture.renderTarget=null;if(J!==null)J.renderTarget=this;this._depthTexture=J}get depthTexture(){return this._depthTexture}setSize(J,Q,Z=1){if(this.width!==J||this.height!==Q||this.depth!==Z){this.width=J,this.height=Q,this.depth=Z;for(let $=0,W=this.textures.length;$<W;$++)this.textures[$].image.width=J,this.textures[$].image.height=Q,this.textures[$].image.depth=Z;this.dispose()}this.viewport.set(0,0,J,Q),this.scissor.set(0,0,J,Q)}clone(){return new this.constructor().copy(this)}copy(J){this.width=J.width,this.height=J.height,this.depth=J.depth,this.scissor.copy(J.scissor),this.scissorTest=J.scissorTest,this.viewport.copy(J.viewport),this.textures.length=0;for(let Z=0,$=J.textures.length;Z<$;Z++)this.textures[Z]=J.textures[Z].clone(),this.textures[Z].isRenderTargetTexture=!0,this.textures[Z].renderTarget=this;let Q=Object.assign({},J.texture.image);if(this.texture.source=new G9(Q),this.depthBuffer=J.depthBuffer,this.stencilBuffer=J.stencilBuffer,this.resolveDepthBuffer=J.resolveDepthBuffer,this.resolveStencilBuffer=J.resolveStencilBuffer,J.depthTexture!==null)this.depthTexture=J.depthTexture.clone();return this.samples=J.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class H8 extends q7{constructor(J=1,Q=1,Z={}){super(J,Q,Z);this.isWebGLRenderTarget=!0}}class F6 extends R0{constructor(J=null,Q=1,Z=1,$=1){super(null);this.isDataArrayTexture=!0,this.image={data:J,width:Q,height:Z,depth:$},this.magFilter=1003,this.minFilter=1003,this.wrapR=1001,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=/*@__PURE__*/new Set}addLayerUpdate(J){this.layerUpdates.add(J)}clearLayerUpdates(){this.layerUpdates.clear()}}class lX extends H8{constructor(J=1,Q=1,Z=1,$={}){super(J,Q,$);this.isWebGLArrayRenderTarget=!0,this.depth=Z,this.texture=new F6(null,J,Q,Z),this.texture.isRenderTargetTexture=!0}}class N7 extends R0{constructor(J=null,Q=1,Z=1,$=1){super(null);this.isData3DTexture=!0,this.image={data:J,width:Q,height:Z,depth:$},this.magFilter=1003,this.minFilter=1003,this.wrapR=1001,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class uX extends H8{constructor(J=1,Q=1,Z=1,$={}){super(J,Q,$);this.isWebGL3DRenderTarget=!0,this.depth=Z,this.texture=new N7(null,J,Q,Z),this.texture.isRenderTargetTexture=!0}}class P0{constructor(J=0,Q=0,Z=0,$=1){this.isQuaternion=!0,this._x=J,this._y=Q,this._z=Z,this._w=$}static slerpFlat(J,Q,Z,$,W,Y,X){let H=Z[$+0],K=Z[$+1],G=Z[$+2],U=Z[$+3],E=W[Y+0],q=W[Y+1],N=W[Y+2],k=W[Y+3];if(X===0){J[Q+0]=H,J[Q+1]=K,J[Q+2]=G,J[Q+3]=U;return}if(X===1){J[Q+0]=E,J[Q+1]=q,J[Q+2]=N,J[Q+3]=k;return}if(U!==k||H!==E||K!==q||G!==N){let V=1-X,R=H*E+K*q+G*N+U*k,O=R>=0?1:-1,D=1-R*R;if(D>Number.EPSILON){let C=Math.sqrt(D),P=Math.atan2(C,R*O);V=Math.sin(V*P)/C,X=Math.sin(X*P)/C}let F=X*O;if(H=H*V+E*F,K=K*V+q*F,G=G*V+N*F,U=U*V+k*F,V===1-X){let C=1/Math.sqrt(H*H+K*K+G*G+U*U);H*=C,K*=C,G*=C,U*=C}}J[Q]=H,J[Q+1]=K,J[Q+2]=G,J[Q+3]=U}static multiplyQuaternionsFlat(J,Q,Z,$,W,Y){let X=Z[$],H=Z[$+1],K=Z[$+2],G=Z[$+3],U=W[Y],E=W[Y+1],q=W[Y+2],N=W[Y+3];return J[Q]=X*N+G*U+H*q-K*E,J[Q+1]=H*N+G*E+K*U-X*q,J[Q+2]=K*N+G*q+X*E-H*U,J[Q+3]=G*N-X*U-H*E-K*q,J}get x(){return this._x}set x(J){this._x=J,this._onChangeCallback()}get y(){return this._y}set y(J){this._y=J,this._onChangeCallback()}get z(){return this._z}set z(J){this._z=J,this._onChangeCallback()}get w(){return this._w}set w(J){this._w=J,this._onChangeCallback()}set(J,Q,Z,$){return this._x=J,this._y=Q,this._z=Z,this._w=$,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(J){return this._x=J.x,this._y=J.y,this._z=J.z,this._w=J.w,this._onChangeCallback(),this}setFromEuler(J,Q=!0){let{_x:Z,_y:$,_z:W,_order:Y}=J,X=Math.cos,H=Math.sin,K=X(Z/2),G=X($/2),U=X(W/2),E=H(Z/2),q=H($/2),N=H(W/2);switch(Y){case"XYZ":this._x=E*G*U+K*q*N,this._y=K*q*U-E*G*N,this._z=K*G*N+E*q*U,this._w=K*G*U-E*q*N;break;case"YXZ":this._x=E*G*U+K*q*N,this._y=K*q*U-E*G*N,this._z=K*G*N-E*q*U,this._w=K*G*U+E*q*N;break;case"ZXY":this._x=E*G*U-K*q*N,this._y=K*q*U+E*G*N,this._z=K*G*N+E*q*U,this._w=K*G*U-E*q*N;break;case"ZYX":this._x=E*G*U-K*q*N,this._y=K*q*U+E*G*N,this._z=K*G*N-E*q*U,this._w=K*G*U+E*q*N;break;case"YZX":this._x=E*G*U+K*q*N,this._y=K*q*U+E*G*N,this._z=K*G*N-E*q*U,this._w=K*G*U-E*q*N;break;case"XZY":this._x=E*G*U-K*q*N,this._y=K*q*U-E*G*N,this._z=K*G*N+E*q*U,this._w=K*G*U+E*q*N;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+Y)}if(Q===!0)this._onChangeCallback();return this}setFromAxisAngle(J,Q){let Z=Q/2,$=Math.sin(Z);return this._x=J.x*$,this._y=J.y*$,this._z=J.z*$,this._w=Math.cos(Z),this._onChangeCallback(),this}setFromRotationMatrix(J){let Q=J.elements,Z=Q[0],$=Q[4],W=Q[8],Y=Q[1],X=Q[5],H=Q[9],K=Q[2],G=Q[6],U=Q[10],E=Z+X+U;if(E>0){let q=0.5/Math.sqrt(E+1);this._w=0.25/q,this._x=(G-H)*q,this._y=(W-K)*q,this._z=(Y-$)*q}else if(Z>X&&Z>U){let q=2*Math.sqrt(1+Z-X-U);this._w=(G-H)/q,this._x=0.25*q,this._y=($+Y)/q,this._z=(W+K)/q}else if(X>U){let q=2*Math.sqrt(1+X-Z-U);this._w=(W-K)/q,this._x=($+Y)/q,this._y=0.25*q,this._z=(H+G)/q}else{let q=2*Math.sqrt(1+U-Z-X);this._w=(Y-$)/q,this._x=(W+K)/q,this._y=(H+G)/q,this._z=0.25*q}return this._onChangeCallback(),this}setFromUnitVectors(J,Q){let Z=J.dot(Q)+1;if(Z<Number.EPSILON)if(Z=0,Math.abs(J.x)>Math.abs(J.z))this._x=-J.y,this._y=J.x,this._z=0,this._w=Z;else this._x=0,this._y=-J.z,this._z=J.y,this._w=Z;else this._x=J.y*Q.z-J.z*Q.y,this._y=J.z*Q.x-J.x*Q.z,this._z=J.x*Q.y-J.y*Q.x,this._w=Z;return this.normalize()}angleTo(J){return 2*Math.acos(Math.abs(cJ(this.dot(J),-1,1)))}rotateTowards(J,Q){let Z=this.angleTo(J);if(Z===0)return this;let $=Math.min(1,Q/Z);return this.slerp(J,$),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(J){return this._x*J._x+this._y*J._y+this._z*J._z+this._w*J._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let J=this.length();if(J===0)this._x=0,this._y=0,this._z=0,this._w=1;else J=1/J,this._x=this._x*J,this._y=this._y*J,this._z=this._z*J,this._w=this._w*J;return this._onChangeCallback(),this}multiply(J){return this.multiplyQuaternions(this,J)}premultiply(J){return this.multiplyQuaternions(J,this)}multiplyQuaternions(J,Q){let{_x:Z,_y:$,_z:W,_w:Y}=J,X=Q._x,H=Q._y,K=Q._z,G=Q._w;return this._x=Z*G+Y*X+$*K-W*H,this._y=$*G+Y*H+W*X-Z*K,this._z=W*G+Y*K+Z*H-$*X,this._w=Y*G-Z*X-$*H-W*K,this._onChangeCallback(),this}slerp(J,Q){if(Q===0)return this;if(Q===1)return this.copy(J);let Z=this._x,$=this._y,W=this._z,Y=this._w,X=Y*J._w+Z*J._x+$*J._y+W*J._z;if(X<0)this._w=-J._w,this._x=-J._x,this._y=-J._y,this._z=-J._z,X=-X;else this.copy(J);if(X>=1)return this._w=Y,this._x=Z,this._y=$,this._z=W,this;let H=1-X*X;if(H<=Number.EPSILON){let q=1-Q;return this._w=q*Y+Q*this._w,this._x=q*Z+Q*this._x,this._y=q*$+Q*this._y,this._z=q*W+Q*this._z,this.normalize(),this}let K=Math.sqrt(H),G=Math.atan2(K,X),U=Math.sin((1-Q)*G)/K,E=Math.sin(Q*G)/K;return this._w=Y*U+this._w*E,this._x=Z*U+this._x*E,this._y=$*U+this._y*E,this._z=W*U+this._z*E,this._onChangeCallback(),this}slerpQuaternions(J,Q,Z){return this.copy(J).slerp(Q,Z)}random(){let J=2*Math.PI*Math.random(),Q=2*Math.PI*Math.random(),Z=Math.random(),$=Math.sqrt(1-Z),W=Math.sqrt(Z);return this.set($*Math.sin(J),$*Math.cos(J),W*Math.sin(Q),W*Math.cos(Q))}equals(J){return J._x===this._x&&J._y===this._y&&J._z===this._z&&J._w===this._w}fromArray(J,Q=0){return this._x=J[Q],this._y=J[Q+1],this._z=J[Q+2],this._w=J[Q+3],this._onChangeCallback(),this}toArray(J=[],Q=0){return J[Q]=this._x,J[Q+1]=this._y,J[Q+2]=this._z,J[Q+3]=this._w,J}fromBufferAttribute(J,Q){return this._x=J.getX(Q),this._y=J.getY(Q),this._z=J.getZ(Q),this._w=J.getW(Q),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(J){return this._onChangeCallback=J,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class I{constructor(J=0,Q=0,Z=0){I.prototype.isVector3=!0,this.x=J,this.y=Q,this.z=Z}set(J,Q,Z){if(Z===void 0)Z=this.z;return this.x=J,this.y=Q,this.z=Z,this}setScalar(J){return this.x=J,this.y=J,this.z=J,this}setX(J){return this.x=J,this}setY(J){return this.y=J,this}setZ(J){return this.z=J,this}setComponent(J,Q){switch(J){case 0:this.x=Q;break;case 1:this.y=Q;break;case 2:this.z=Q;break;default:throw Error("index is out of range: "+J)}return this}getComponent(J){switch(J){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw Error("index is out of range: "+J)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(J){return this.x=J.x,this.y=J.y,this.z=J.z,this}add(J){return this.x+=J.x,this.y+=J.y,this.z+=J.z,this}addScalar(J){return this.x+=J,this.y+=J,this.z+=J,this}addVectors(J,Q){return this.x=J.x+Q.x,this.y=J.y+Q.y,this.z=J.z+Q.z,this}addScaledVector(J,Q){return this.x+=J.x*Q,this.y+=J.y*Q,this.z+=J.z*Q,this}sub(J){return this.x-=J.x,this.y-=J.y,this.z-=J.z,this}subScalar(J){return this.x-=J,this.y-=J,this.z-=J,this}subVectors(J,Q){return this.x=J.x-Q.x,this.y=J.y-Q.y,this.z=J.z-Q.z,this}multiply(J){return this.x*=J.x,this.y*=J.y,this.z*=J.z,this}multiplyScalar(J){return this.x*=J,this.y*=J,this.z*=J,this}multiplyVectors(J,Q){return this.x=J.x*Q.x,this.y=J.y*Q.y,this.z=J.z*Q.z,this}applyEuler(J){return this.applyQuaternion(pK.setFromEuler(J))}applyAxisAngle(J,Q){return this.applyQuaternion(pK.setFromAxisAngle(J,Q))}applyMatrix3(J){let Q=this.x,Z=this.y,$=this.z,W=J.elements;return this.x=W[0]*Q+W[3]*Z+W[6]*$,this.y=W[1]*Q+W[4]*Z+W[7]*$,this.z=W[2]*Q+W[5]*Z+W[8]*$,this}applyNormalMatrix(J){return this.applyMatrix3(J).normalize()}applyMatrix4(J){let Q=this.x,Z=this.y,$=this.z,W=J.elements,Y=1/(W[3]*Q+W[7]*Z+W[11]*$+W[15]);return this.x=(W[0]*Q+W[4]*Z+W[8]*$+W[12])*Y,this.y=(W[1]*Q+W[5]*Z+W[9]*$+W[13])*Y,this.z=(W[2]*Q+W[6]*Z+W[10]*$+W[14])*Y,this}applyQuaternion(J){let Q=this.x,Z=this.y,$=this.z,W=J.x,Y=J.y,X=J.z,H=J.w,K=2*(Y*$-X*Z),G=2*(X*Q-W*$),U=2*(W*Z-Y*Q);return this.x=Q+H*K+Y*U-X*G,this.y=Z+H*G+X*K-W*U,this.z=$+H*U+W*G-Y*K,this}project(J){return this.applyMatrix4(J.matrixWorldInverse).applyMatrix4(J.projectionMatrix)}unproject(J){return this.applyMatrix4(J.projectionMatrixInverse).applyMatrix4(J.matrixWorld)}transformDirection(J){let Q=this.x,Z=this.y,$=this.z,W=J.elements;return this.x=W[0]*Q+W[4]*Z+W[8]*$,this.y=W[1]*Q+W[5]*Z+W[9]*$,this.z=W[2]*Q+W[6]*Z+W[10]*$,this.normalize()}divide(J){return this.x/=J.x,this.y/=J.y,this.z/=J.z,this}divideScalar(J){return this.multiplyScalar(1/J)}min(J){return this.x=Math.min(this.x,J.x),this.y=Math.min(this.y,J.y),this.z=Math.min(this.z,J.z),this}max(J){return this.x=Math.max(this.x,J.x),this.y=Math.max(this.y,J.y),this.z=Math.max(this.z,J.z),this}clamp(J,Q){return this.x=cJ(this.x,J.x,Q.x),this.y=cJ(this.y,J.y,Q.y),this.z=cJ(this.z,J.z,Q.z),this}clampScalar(J,Q){return this.x=cJ(this.x,J,Q),this.y=cJ(this.y,J,Q),this.z=cJ(this.z,J,Q),this}clampLength(J,Q){let Z=this.length();return this.divideScalar(Z||1).multiplyScalar(cJ(Z,J,Q))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(J){return this.x*J.x+this.y*J.y+this.z*J.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(J){return this.normalize().multiplyScalar(J)}lerp(J,Q){return this.x+=(J.x-this.x)*Q,this.y+=(J.y-this.y)*Q,this.z+=(J.z-this.z)*Q,this}lerpVectors(J,Q,Z){return this.x=J.x+(Q.x-J.x)*Z,this.y=J.y+(Q.y-J.y)*Z,this.z=J.z+(Q.z-J.z)*Z,this}cross(J){return this.crossVectors(this,J)}crossVectors(J,Q){let{x:Z,y:$,z:W}=J,Y=Q.x,X=Q.y,H=Q.z;return this.x=$*H-W*X,this.y=W*Y-Z*H,this.z=Z*X-$*Y,this}projectOnVector(J){let Q=J.lengthSq();if(Q===0)return this.set(0,0,0);let Z=J.dot(this)/Q;return this.copy(J).multiplyScalar(Z)}projectOnPlane(J){return EY.copy(this).projectOnVector(J),this.sub(EY)}reflect(J){return this.sub(EY.copy(J).multiplyScalar(2*this.dot(J)))}angleTo(J){let Q=Math.sqrt(this.lengthSq()*J.lengthSq());if(Q===0)return Math.PI/2;let Z=this.dot(J)/Q;return Math.acos(cJ(Z,-1,1))}distanceTo(J){return Math.sqrt(this.distanceToSquared(J))}distanceToSquared(J){let Q=this.x-J.x,Z=this.y-J.y,$=this.z-J.z;return Q*Q+Z*Z+$*$}manhattanDistanceTo(J){return Math.abs(this.x-J.x)+Math.abs(this.y-J.y)+Math.abs(this.z-J.z)}setFromSpherical(J){return this.setFromSphericalCoords(J.radius,J.phi,J.theta)}setFromSphericalCoords(J,Q,Z){let $=Math.sin(Q)*J;return this.x=$*Math.sin(Z),this.y=Math.cos(Q)*J,this.z=$*Math.cos(Z),this}setFromCylindrical(J){return this.setFromCylindricalCoords(J.radius,J.theta,J.y)}setFromCylindricalCoords(J,Q,Z){return this.x=J*Math.sin(Q),this.y=Z,this.z=J*Math.cos(Q),this}setFromMatrixPosition(J){let Q=J.elements;return this.x=Q[12],this.y=Q[13],this.z=Q[14],this}setFromMatrixScale(J){let Q=this.setFromMatrixColumn(J,0).length(),Z=this.setFromMatrixColumn(J,1).length(),$=this.setFromMatrixColumn(J,2).length();return this.x=Q,this.y=Z,this.z=$,this}setFromMatrixColumn(J,Q){return this.fromArray(J.elements,Q*4)}setFromMatrix3Column(J,Q){return this.fromArray(J.elements,Q*3)}setFromEuler(J){return this.x=J._x,this.y=J._y,this.z=J._z,this}setFromColor(J){return this.x=J.r,this.y=J.g,this.z=J.b,this}equals(J){return J.x===this.x&&J.y===this.y&&J.z===this.z}fromArray(J,Q=0){return this.x=J[Q],this.y=J[Q+1],this.z=J[Q+2],this}toArray(J=[],Q=0){return J[Q]=this.x,J[Q+1]=this.y,J[Q+2]=this.z,J}fromBufferAttribute(J,Q){return this.x=J.getX(Q),this.y=J.getY(Q),this.z=J.getZ(Q),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let J=Math.random()*Math.PI*2,Q=Math.random()*2-1,Z=Math.sqrt(1-Q*Q);return this.x=Z*Math.cos(J),this.y=Q,this.z=Z*Math.sin(J),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}var EY=/*@__PURE__*/new I,pK=/*@__PURE__*/new P0;class z0{constructor(J=new I(1/0,1/0,1/0),Q=new I(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=J,this.max=Q}set(J,Q){return this.min.copy(J),this.max.copy(Q),this}setFromArray(J){this.makeEmpty();for(let Q=0,Z=J.length;Q<Z;Q+=3)this.expandByPoint(S8.fromArray(J,Q));return this}setFromBufferAttribute(J){this.makeEmpty();for(let Q=0,Z=J.count;Q<Z;Q++)this.expandByPoint(S8.fromBufferAttribute(J,Q));return this}setFromPoints(J){this.makeEmpty();for(let Q=0,Z=J.length;Q<Z;Q++)this.expandByPoint(J[Q]);return this}setFromCenterAndSize(J,Q){let Z=S8.copy(Q).multiplyScalar(0.5);return this.min.copy(J).sub(Z),this.max.copy(J).add(Z),this}setFromObject(J,Q=!1){return this.makeEmpty(),this.expandByObject(J,Q)}clone(){return new this.constructor().copy(this)}copy(J){return this.min.copy(J.min),this.max.copy(J.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(J){return this.isEmpty()?J.set(0,0,0):J.addVectors(this.min,this.max).multiplyScalar(0.5)}getSize(J){return this.isEmpty()?J.set(0,0,0):J.subVectors(this.max,this.min)}expandByPoint(J){return this.min.min(J),this.max.max(J),this}expandByVector(J){return this.min.sub(J),this.max.add(J),this}expandByScalar(J){return this.min.addScalar(-J),this.max.addScalar(J),this}expandByObject(J,Q=!1){J.updateWorldMatrix(!1,!1);let Z=J.geometry;if(Z!==void 0){let W=Z.getAttribute("position");if(Q===!0&&W!==void 0&&J.isInstancedMesh!==!0)for(let Y=0,X=W.count;Y<X;Y++){if(J.isMesh===!0)J.getVertexPosition(Y,S8);else S8.fromBufferAttribute(W,Y);S8.applyMatrix4(J.matrixWorld),this.expandByPoint(S8)}else{if(J.boundingBox!==void 0){if(J.boundingBox===null)J.computeBoundingBox();LZ.copy(J.boundingBox)}else{if(Z.boundingBox===null)Z.computeBoundingBox();LZ.copy(Z.boundingBox)}LZ.applyMatrix4(J.matrixWorld),this.union(LZ)}}let $=J.children;for(let W=0,Y=$.length;W<Y;W++)this.expandByObject($[W],Q);return this}containsPoint(J){return J.x>=this.min.x&&J.x<=this.max.x&&J.y>=this.min.y&&J.y<=this.max.y&&J.z>=this.min.z&&J.z<=this.max.z}containsBox(J){return this.min.x<=J.min.x&&J.max.x<=this.max.x&&this.min.y<=J.min.y&&J.max.y<=this.max.y&&this.min.z<=J.min.z&&J.max.z<=this.max.z}getParameter(J,Q){return Q.set((J.x-this.min.x)/(this.max.x-this.min.x),(J.y-this.min.y)/(this.max.y-this.min.y),(J.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(J){return J.max.x>=this.min.x&&J.min.x<=this.max.x&&J.max.y>=this.min.y&&J.min.y<=this.max.y&&J.max.z>=this.min.z&&J.min.z<=this.max.z}intersectsSphere(J){return this.clampPoint(J.center,S8),S8.distanceToSquared(J.center)<=J.radius*J.radius}intersectsPlane(J){let Q,Z;if(J.normal.x>0)Q=J.normal.x*this.min.x,Z=J.normal.x*this.max.x;else Q=J.normal.x*this.max.x,Z=J.normal.x*this.min.x;if(J.normal.y>0)Q+=J.normal.y*this.min.y,Z+=J.normal.y*this.max.y;else Q+=J.normal.y*this.max.y,Z+=J.normal.y*this.min.y;if(J.normal.z>0)Q+=J.normal.z*this.min.z,Z+=J.normal.z*this.max.z;else Q+=J.normal.z*this.max.z,Z+=J.normal.z*this.min.z;return Q<=-J.constant&&Z>=-J.constant}intersectsTriangle(J){if(this.isEmpty())return!1;this.getCenter(p7),zZ.subVectors(this.max,p7),g6.subVectors(J.a,p7),p6.subVectors(J.b,p7),m6.subVectors(J.c,p7),M9.subVectors(p6,g6),I9.subVectors(m6,p6),u9.subVectors(g6,m6);let Q=[0,-M9.z,M9.y,0,-I9.z,I9.y,0,-u9.z,u9.y,M9.z,0,-M9.x,I9.z,0,-I9.x,u9.z,0,-u9.x,-M9.y,M9.x,0,-I9.y,I9.x,0,-u9.y,u9.x,0];if(!qY(Q,g6,p6,m6,zZ))return!1;if(Q=[1,0,0,0,1,0,0,0,1],!qY(Q,g6,p6,m6,zZ))return!1;return CZ.crossVectors(M9,I9),Q=[CZ.x,CZ.y,CZ.z],qY(Q,g6,p6,m6,zZ)}clampPoint(J,Q){return Q.copy(J).clamp(this.min,this.max)}distanceToPoint(J){return this.clampPoint(J,S8).distanceTo(J)}getBoundingSphere(J){if(this.isEmpty())J.makeEmpty();else this.getCenter(J.center),J.radius=this.getSize(S8).length()*0.5;return J}intersect(J){if(this.min.max(J.min),this.max.min(J.max),this.isEmpty())this.makeEmpty();return this}union(J){return this.min.min(J.min),this.max.max(J.max),this}applyMatrix4(J){if(this.isEmpty())return this;return Z9[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(J),Z9[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(J),Z9[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(J),Z9[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(J),Z9[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(J),Z9[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(J),Z9[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(J),Z9[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(J),this.setFromPoints(Z9),this}translate(J){return this.min.add(J),this.max.add(J),this}equals(J){return J.min.equals(this.min)&&J.max.equals(this.max)}}var Z9=[/*@__PURE__*/new I,/*@__PURE__*/new I,/*@__PURE__*/new I,/*@__PURE__*/new I,/*@__PURE__*/new I,/*@__PURE__*/new I,/*@__PURE__*/new I,/*@__PURE__*/new I],S8=/*@__PURE__*/new I,LZ=/*@__PURE__*/new z0,g6=/*@__PURE__*/new I,p6=/*@__PURE__*/new I,m6=/*@__PURE__*/new I,M9=/*@__PURE__*/new I,I9=/*@__PURE__*/new I,u9=/*@__PURE__*/new I,p7=/*@__PURE__*/new I,zZ=/*@__PURE__*/new I,CZ=/*@__PURE__*/new I,d9=/*@__PURE__*/new I;function qY(J,Q,Z,$,W){for(let Y=0,X=J.length-3;Y<=X;Y+=3){d9.fromArray(J,Y);let H=W.x*Math.abs(d9.x)+W.y*Math.abs(d9.y)+W.z*Math.abs(d9.z),K=Q.dot(d9),G=Z.dot(d9),U=$.dot(d9);if(Math.max(-Math.max(K,G,U),Math.min(K,G,U))>H)return!1}return!0}var p5=/*@__PURE__*/new z0,m7=/*@__PURE__*/new I,NY=/*@__PURE__*/new I;class A0{constructor(J=new I,Q=-1){this.isSphere=!0,this.center=J,this.radius=Q}set(J,Q){return this.center.copy(J),this.radius=Q,this}setFromPoints(J,Q){let Z=this.center;if(Q!==void 0)Z.copy(Q);else p5.setFromPoints(J).getCenter(Z);let $=0;for(let W=0,Y=J.length;W<Y;W++)$=Math.max($,Z.distanceToSquared(J[W]));return this.radius=Math.sqrt($),this}copy(J){return this.center.copy(J.center),this.radius=J.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(J){return J.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(J){return J.distanceTo(this.center)-this.radius}intersectsSphere(J){let Q=this.radius+J.radius;return J.center.distanceToSquared(this.center)<=Q*Q}intersectsBox(J){return J.intersectsSphere(this)}intersectsPlane(J){return Math.abs(J.distanceToPoint(this.center))<=this.radius}clampPoint(J,Q){let Z=this.center.distanceToSquared(J);if(Q.copy(J),Z>this.radius*this.radius)Q.sub(this.center).normalize(),Q.multiplyScalar(this.radius).add(this.center);return Q}getBoundingBox(J){if(this.isEmpty())return J.makeEmpty(),J;return J.set(this.center,this.center),J.expandByScalar(this.radius),J}applyMatrix4(J){return this.center.applyMatrix4(J),this.radius=this.radius*J.getMaxScaleOnAxis(),this}translate(J){return this.center.add(J),this}expandByPoint(J){if(this.isEmpty())return this.center.copy(J),this.radius=0,this;m7.subVectors(J,this.center);let Q=m7.lengthSq();if(Q>this.radius*this.radius){let Z=Math.sqrt(Q),$=(Z-this.radius)*0.5;this.center.addScaledVector(m7,$/Z),this.radius+=$}return this}union(J){if(J.isEmpty())return this;if(this.isEmpty())return this.copy(J),this;if(this.center.equals(J.center)===!0)this.radius=Math.max(this.radius,J.radius);else NY.subVectors(J.center,this.center).setLength(J.radius),this.expandByPoint(m7.copy(J.center).add(NY)),this.expandByPoint(m7.copy(J.center).sub(NY));return this}equals(J){return J.center.equals(this.center)&&J.radius===this.radius}clone(){return new this.constructor().copy(this)}}var $9=/*@__PURE__*/new I,OY=/*@__PURE__*/new I,_Z=/*@__PURE__*/new I,w9=/*@__PURE__*/new I,RY=/*@__PURE__*/new I,MZ=/*@__PURE__*/new I,kY=/*@__PURE__*/new I;class b9{constructor(J=new I,Q=new I(0,0,-1)){this.origin=J,this.direction=Q}set(J,Q){return this.origin.copy(J),this.direction.copy(Q),this}copy(J){return this.origin.copy(J.origin),this.direction.copy(J.direction),this}at(J,Q){return Q.copy(this.origin).addScaledVector(this.direction,J)}lookAt(J){return this.direction.copy(J).sub(this.origin).normalize(),this}recast(J){return this.origin.copy(this.at(J,$9)),this}closestPointToPoint(J,Q){Q.subVectors(J,this.origin);let Z=Q.dot(this.direction);if(Z<0)return Q.copy(this.origin);return Q.copy(this.origin).addScaledVector(this.direction,Z)}distanceToPoint(J){return Math.sqrt(this.distanceSqToPoint(J))}distanceSqToPoint(J){let Q=$9.subVectors(J,this.origin).dot(this.direction);if(Q<0)return this.origin.distanceToSquared(J);return $9.copy(this.origin).addScaledVector(this.direction,Q),$9.distanceToSquared(J)}distanceSqToSegment(J,Q,Z,$){OY.copy(J).add(Q).multiplyScalar(0.5),_Z.copy(Q).sub(J).normalize(),w9.copy(this.origin).sub(OY);let W=J.distanceTo(Q)*0.5,Y=-this.direction.dot(_Z),X=w9.dot(this.direction),H=-w9.dot(_Z),K=w9.lengthSq(),G=Math.abs(1-Y*Y),U,E,q,N;if(G>0)if(U=Y*H-X,E=Y*X-H,N=W*G,U>=0)if(E>=-N)if(E<=N){let k=1/G;U*=k,E*=k,q=U*(U+Y*E+2*X)+E*(Y*U+E+2*H)+K}else E=W,U=Math.max(0,-(Y*E+X)),q=-U*U+E*(E+2*H)+K;else E=-W,U=Math.max(0,-(Y*E+X)),q=-U*U+E*(E+2*H)+K;else if(E<=-N)U=Math.max(0,-(-Y*W+X)),E=U>0?-W:Math.min(Math.max(-W,-H),W),q=-U*U+E*(E+2*H)+K;else if(E<=N)U=0,E=Math.min(Math.max(-W,-H),W),q=E*(E+2*H)+K;else U=Math.max(0,-(Y*W+X)),E=U>0?W:Math.min(Math.max(-W,-H),W),q=-U*U+E*(E+2*H)+K;else E=Y>0?-W:W,U=Math.max(0,-(Y*E+X)),q=-U*U+E*(E+2*H)+K;if(Z)Z.copy(this.origin).addScaledVector(this.direction,U);if($)$.copy(OY).addScaledVector(_Z,E);return q}intersectSphere(J,Q){$9.subVectors(J.center,this.origin);let Z=$9.dot(this.direction),$=$9.dot($9)-Z*Z,W=J.radius*J.radius;if($>W)return null;let Y=Math.sqrt(W-$),X=Z-Y,H=Z+Y;if(H<0)return null;if(X<0)return this.at(H,Q);return this.at(X,Q)}intersectsSphere(J){return this.distanceSqToPoint(J.center)<=J.radius*J.radius}distanceToPlane(J){let Q=J.normal.dot(this.direction);if(Q===0){if(J.distanceToPoint(this.origin)===0)return 0;return null}let Z=-(this.origin.dot(J.normal)+J.constant)/Q;return Z>=0?Z:null}intersectPlane(J,Q){let Z=this.distanceToPlane(J);if(Z===null)return null;return this.at(Z,Q)}intersectsPlane(J){let Q=J.distanceToPoint(this.origin);if(Q===0)return!0;if(J.normal.dot(this.direction)*Q<0)return!0;return!1}intersectBox(J,Q){let Z,$,W,Y,X,H,K=1/this.direction.x,G=1/this.direction.y,U=1/this.direction.z,E=this.origin;if(K>=0)Z=(J.min.x-E.x)*K,$=(J.max.x-E.x)*K;else Z=(J.max.x-E.x)*K,$=(J.min.x-E.x)*K;if(G>=0)W=(J.min.y-E.y)*G,Y=(J.max.y-E.y)*G;else W=(J.max.y-E.y)*G,Y=(J.min.y-E.y)*G;if(Z>Y||W>$)return null;if(W>Z||isNaN(Z))Z=W;if(Y<$||isNaN($))$=Y;if(U>=0)X=(J.min.z-E.z)*U,H=(J.max.z-E.z)*U;else X=(J.max.z-E.z)*U,H=(J.min.z-E.z)*U;if(Z>H||X>$)return null;if(X>Z||Z!==Z)Z=X;if(H<$||$!==$)$=H;if($<0)return null;return this.at(Z>=0?Z:$,Q)}intersectsBox(J){return this.intersectBox(J,$9)!==null}intersectTriangle(J,Q,Z,$,W){RY.subVectors(Q,J),MZ.subVectors(Z,J),kY.crossVectors(RY,MZ);let Y=this.direction.dot(kY),X;if(Y>0){if($)return null;X=1}else if(Y<0)X=-1,Y=-Y;else return null;w9.subVectors(this.origin,J);let H=X*this.direction.dot(MZ.crossVectors(w9,MZ));if(H<0)return null;let K=X*this.direction.dot(RY.cross(w9));if(K<0)return null;if(H+K>Y)return null;let G=-X*w9.dot(kY);if(G<0)return null;return this.at(G/Y,W)}applyMatrix4(J){return this.origin.applyMatrix4(J),this.direction.transformDirection(J),this}equals(J){return J.origin.equals(this.origin)&&J.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class SJ{constructor(J,Q,Z,$,W,Y,X,H,K,G,U,E,q,N,k,V){if(SJ.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],J!==void 0)this.set(J,Q,Z,$,W,Y,X,H,K,G,U,E,q,N,k,V)}set(J,Q,Z,$,W,Y,X,H,K,G,U,E,q,N,k,V){let R=this.elements;return R[0]=J,R[4]=Q,R[8]=Z,R[12]=$,R[1]=W,R[5]=Y,R[9]=X,R[13]=H,R[2]=K,R[6]=G,R[10]=U,R[14]=E,R[3]=q,R[7]=N,R[11]=k,R[15]=V,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new SJ().fromArray(this.elements)}copy(J){let Q=this.elements,Z=J.elements;return Q[0]=Z[0],Q[1]=Z[1],Q[2]=Z[2],Q[3]=Z[3],Q[4]=Z[4],Q[5]=Z[5],Q[6]=Z[6],Q[7]=Z[7],Q[8]=Z[8],Q[9]=Z[9],Q[10]=Z[10],Q[11]=Z[11],Q[12]=Z[12],Q[13]=Z[13],Q[14]=Z[14],Q[15]=Z[15],this}copyPosition(J){let Q=this.elements,Z=J.elements;return Q[12]=Z[12],Q[13]=Z[13],Q[14]=Z[14],this}setFromMatrix3(J){let Q=J.elements;return this.set(Q[0],Q[3],Q[6],0,Q[1],Q[4],Q[7],0,Q[2],Q[5],Q[8],0,0,0,0,1),this}extractBasis(J,Q,Z){return J.setFromMatrixColumn(this,0),Q.setFromMatrixColumn(this,1),Z.setFromMatrixColumn(this,2),this}makeBasis(J,Q,Z){return this.set(J.x,Q.x,Z.x,0,J.y,Q.y,Z.y,0,J.z,Q.z,Z.z,0,0,0,0,1),this}extractRotation(J){let Q=this.elements,Z=J.elements,$=1/l6.setFromMatrixColumn(J,0).length(),W=1/l6.setFromMatrixColumn(J,1).length(),Y=1/l6.setFromMatrixColumn(J,2).length();return Q[0]=Z[0]*$,Q[1]=Z[1]*$,Q[2]=Z[2]*$,Q[3]=0,Q[4]=Z[4]*W,Q[5]=Z[5]*W,Q[6]=Z[6]*W,Q[7]=0,Q[8]=Z[8]*Y,Q[9]=Z[9]*Y,Q[10]=Z[10]*Y,Q[11]=0,Q[12]=0,Q[13]=0,Q[14]=0,Q[15]=1,this}makeRotationFromEuler(J){let Q=this.elements,Z=J.x,$=J.y,W=J.z,Y=Math.cos(Z),X=Math.sin(Z),H=Math.cos($),K=Math.sin($),G=Math.cos(W),U=Math.sin(W);if(J.order==="XYZ"){let E=Y*G,q=Y*U,N=X*G,k=X*U;Q[0]=H*G,Q[4]=-H*U,Q[8]=K,Q[1]=q+N*K,Q[5]=E-k*K,Q[9]=-X*H,Q[2]=k-E*K,Q[6]=N+q*K,Q[10]=Y*H}else if(J.order==="YXZ"){let E=H*G,q=H*U,N=K*G,k=K*U;Q[0]=E+k*X,Q[4]=N*X-q,Q[8]=Y*K,Q[1]=Y*U,Q[5]=Y*G,Q[9]=-X,Q[2]=q*X-N,Q[6]=k+E*X,Q[10]=Y*H}else if(J.order==="ZXY"){let E=H*G,q=H*U,N=K*G,k=K*U;Q[0]=E-k*X,Q[4]=-Y*U,Q[8]=N+q*X,Q[1]=q+N*X,Q[5]=Y*G,Q[9]=k-E*X,Q[2]=-Y*K,Q[6]=X,Q[10]=Y*H}else if(J.order==="ZYX"){let E=Y*G,q=Y*U,N=X*G,k=X*U;Q[0]=H*G,Q[4]=N*K-q,Q[8]=E*K+k,Q[1]=H*U,Q[5]=k*K+E,Q[9]=q*K-N,Q[2]=-K,Q[6]=X*H,Q[10]=Y*H}else if(J.order==="YZX"){let E=Y*H,q=Y*K,N=X*H,k=X*K;Q[0]=H*G,Q[4]=k-E*U,Q[8]=N*U+q,Q[1]=U,Q[5]=Y*G,Q[9]=-X*G,Q[2]=-K*G,Q[6]=q*U+N,Q[10]=E-k*U}else if(J.order==="XZY"){let E=Y*H,q=Y*K,N=X*H,k=X*K;Q[0]=H*G,Q[4]=-U,Q[8]=K*G,Q[1]=E*U+k,Q[5]=Y*G,Q[9]=q*U-N,Q[2]=N*U-q,Q[6]=X*G,Q[10]=k*U+E}return Q[3]=0,Q[7]=0,Q[11]=0,Q[12]=0,Q[13]=0,Q[14]=0,Q[15]=1,this}makeRotationFromQuaternion(J){return this.compose(m5,J,l5)}lookAt(J,Q,Z){let $=this.elements;if(E8.subVectors(J,Q),E8.lengthSq()===0)E8.z=1;if(E8.normalize(),A9.crossVectors(Z,E8),A9.lengthSq()===0){if(Math.abs(Z.z)===1)E8.x+=0.0001;else E8.z+=0.0001;E8.normalize(),A9.crossVectors(Z,E8)}return A9.normalize(),IZ.crossVectors(E8,A9),$[0]=A9.x,$[4]=IZ.x,$[8]=E8.x,$[1]=A9.y,$[5]=IZ.y,$[9]=E8.y,$[2]=A9.z,$[6]=IZ.z,$[10]=E8.z,this}multiply(J){return this.multiplyMatrices(this,J)}premultiply(J){return this.multiplyMatrices(J,this)}multiplyMatrices(J,Q){let Z=J.elements,$=Q.elements,W=this.elements,Y=Z[0],X=Z[4],H=Z[8],K=Z[12],G=Z[1],U=Z[5],E=Z[9],q=Z[13],N=Z[2],k=Z[6],V=Z[10],R=Z[14],O=Z[3],D=Z[7],F=Z[11],C=Z[15],P=$[0],M=$[4],w=$[8],v=$[12],L=$[1],_=$[5],j=$[9],p=$[13],l=$[2],c=$[6],r=$[10],n=$[14],WJ=$[3],d=$[7],RJ=$[11],NJ=$[15];return W[0]=Y*P+X*L+H*l+K*WJ,W[4]=Y*M+X*_+H*c+K*d,W[8]=Y*w+X*j+H*r+K*RJ,W[12]=Y*v+X*p+H*n+K*NJ,W[1]=G*P+U*L+E*l+q*WJ,W[5]=G*M+U*_+E*c+q*d,W[9]=G*w+U*j+E*r+q*RJ,W[13]=G*v+U*p+E*n+q*NJ,W[2]=N*P+k*L+V*l+R*WJ,W[6]=N*M+k*_+V*c+R*d,W[10]=N*w+k*j+V*r+R*RJ,W[14]=N*v+k*p+V*n+R*NJ,W[3]=O*P+D*L+F*l+C*WJ,W[7]=O*M+D*_+F*c+C*d,W[11]=O*w+D*j+F*r+C*RJ,W[15]=O*v+D*p+F*n+C*NJ,this}multiplyScalar(J){let Q=this.elements;return Q[0]*=J,Q[4]*=J,Q[8]*=J,Q[12]*=J,Q[1]*=J,Q[5]*=J,Q[9]*=J,Q[13]*=J,Q[2]*=J,Q[6]*=J,Q[10]*=J,Q[14]*=J,Q[3]*=J,Q[7]*=J,Q[11]*=J,Q[15]*=J,this}determinant(){let J=this.elements,Q=J[0],Z=J[4],$=J[8],W=J[12],Y=J[1],X=J[5],H=J[9],K=J[13],G=J[2],U=J[6],E=J[10],q=J[14],N=J[3],k=J[7],V=J[11],R=J[15];return N*(+W*H*U-$*K*U-W*X*E+Z*K*E+$*X*q-Z*H*q)+k*(+Q*H*q-Q*K*E+W*Y*E-$*Y*q+$*K*G-W*H*G)+V*(+Q*K*U-Q*X*q-W*Y*U+Z*Y*q+W*X*G-Z*K*G)+R*(-$*X*G-Q*H*U+Q*X*E+$*Y*U-Z*Y*E+Z*H*G)}transpose(){let J=this.elements,Q;return Q=J[1],J[1]=J[4],J[4]=Q,Q=J[2],J[2]=J[8],J[8]=Q,Q=J[6],J[6]=J[9],J[9]=Q,Q=J[3],J[3]=J[12],J[12]=Q,Q=J[7],J[7]=J[13],J[13]=Q,Q=J[11],J[11]=J[14],J[14]=Q,this}setPosition(J,Q,Z){let $=this.elements;if(J.isVector3)$[12]=J.x,$[13]=J.y,$[14]=J.z;else $[12]=J,$[13]=Q,$[14]=Z;return this}invert(){let J=this.elements,Q=J[0],Z=J[1],$=J[2],W=J[3],Y=J[4],X=J[5],H=J[6],K=J[7],G=J[8],U=J[9],E=J[10],q=J[11],N=J[12],k=J[13],V=J[14],R=J[15],O=U*V*K-k*E*K+k*H*q-X*V*q-U*H*R+X*E*R,D=N*E*K-G*V*K-N*H*q+Y*V*q+G*H*R-Y*E*R,F=G*k*K-N*U*K+N*X*q-Y*k*q-G*X*R+Y*U*R,C=N*U*H-G*k*H-N*X*E+Y*k*E+G*X*V-Y*U*V,P=Q*O+Z*D+$*F+W*C;if(P===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let M=1/P;return J[0]=O*M,J[1]=(k*E*W-U*V*W-k*$*q+Z*V*q+U*$*R-Z*E*R)*M,J[2]=(X*V*W-k*H*W+k*$*K-Z*V*K-X*$*R+Z*H*R)*M,J[3]=(U*H*W-X*E*W-U*$*K+Z*E*K+X*$*q-Z*H*q)*M,J[4]=D*M,J[5]=(G*V*W-N*E*W+N*$*q-Q*V*q-G*$*R+Q*E*R)*M,J[6]=(N*H*W-Y*V*W-N*$*K+Q*V*K+Y*$*R-Q*H*R)*M,J[7]=(Y*E*W-G*H*W+G*$*K-Q*E*K-Y*$*q+Q*H*q)*M,J[8]=F*M,J[9]=(N*U*W-G*k*W-N*Z*q+Q*k*q+G*Z*R-Q*U*R)*M,J[10]=(Y*k*W-N*X*W+N*Z*K-Q*k*K-Y*Z*R+Q*X*R)*M,J[11]=(G*X*W-Y*U*W-G*Z*K+Q*U*K+Y*Z*q-Q*X*q)*M,J[12]=C*M,J[13]=(G*k*$-N*U*$+N*Z*E-Q*k*E-G*Z*V+Q*U*V)*M,J[14]=(N*X*$-Y*k*$-N*Z*H+Q*k*H+Y*Z*V-Q*X*V)*M,J[15]=(Y*U*$-G*X*$+G*Z*H-Q*U*H-Y*Z*E+Q*X*E)*M,this}scale(J){let Q=this.elements,Z=J.x,$=J.y,W=J.z;return Q[0]*=Z,Q[4]*=$,Q[8]*=W,Q[1]*=Z,Q[5]*=$,Q[9]*=W,Q[2]*=Z,Q[6]*=$,Q[10]*=W,Q[3]*=Z,Q[7]*=$,Q[11]*=W,this}getMaxScaleOnAxis(){let J=this.elements,Q=J[0]*J[0]+J[1]*J[1]+J[2]*J[2],Z=J[4]*J[4]+J[5]*J[5]+J[6]*J[6],$=J[8]*J[8]+J[9]*J[9]+J[10]*J[10];return Math.sqrt(Math.max(Q,Z,$))}makeTranslation(J,Q,Z){if(J.isVector3)this.set(1,0,0,J.x,0,1,0,J.y,0,0,1,J.z,0,0,0,1);else this.set(1,0,0,J,0,1,0,Q,0,0,1,Z,0,0,0,1);return this}makeRotationX(J){let Q=Math.cos(J),Z=Math.sin(J);return this.set(1,0,0,0,0,Q,-Z,0,0,Z,Q,0,0,0,0,1),this}makeRotationY(J){let Q=Math.cos(J),Z=Math.sin(J);return this.set(Q,0,Z,0,0,1,0,0,-Z,0,Q,0,0,0,0,1),this}makeRotationZ(J){let Q=Math.cos(J),Z=Math.sin(J);return this.set(Q,-Z,0,0,Z,Q,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(J,Q){let Z=Math.cos(Q),$=Math.sin(Q),W=1-Z,Y=J.x,X=J.y,H=J.z,K=W*Y,G=W*X;return this.set(K*Y+Z,K*X-$*H,K*H+$*X,0,K*X+$*H,G*X+Z,G*H-$*Y,0,K*H-$*X,G*H+$*Y,W*H*H+Z,0,0,0,0,1),this}makeScale(J,Q,Z){return this.set(J,0,0,0,0,Q,0,0,0,0,Z,0,0,0,0,1),this}makeShear(J,Q,Z,$,W,Y){return this.set(1,Z,W,0,J,1,Y,0,Q,$,1,0,0,0,0,1),this}compose(J,Q,Z){let $=this.elements,W=Q._x,Y=Q._y,X=Q._z,H=Q._w,K=W+W,G=Y+Y,U=X+X,E=W*K,q=W*G,N=W*U,k=Y*G,V=Y*U,R=X*U,O=H*K,D=H*G,F=H*U,C=Z.x,P=Z.y,M=Z.z;return $[0]=(1-(k+R))*C,$[1]=(q+F)*C,$[2]=(N-D)*C,$[3]=0,$[4]=(q-F)*P,$[5]=(1-(E+R))*P,$[6]=(V+O)*P,$[7]=0,$[8]=(N+D)*M,$[9]=(V-O)*M,$[10]=(1-(E+k))*M,$[11]=0,$[12]=J.x,$[13]=J.y,$[14]=J.z,$[15]=1,this}decompose(J,Q,Z){let $=this.elements,W=l6.set($[0],$[1],$[2]).length(),Y=l6.set($[4],$[5],$[6]).length(),X=l6.set($[8],$[9],$[10]).length();if(this.determinant()<0)W=-W;J.x=$[12],J.y=$[13],J.z=$[14],j8.copy(this);let K=1/W,G=1/Y,U=1/X;return j8.elements[0]*=K,j8.elements[1]*=K,j8.elements[2]*=K,j8.elements[4]*=G,j8.elements[5]*=G,j8.elements[6]*=G,j8.elements[8]*=U,j8.elements[9]*=U,j8.elements[10]*=U,Q.setFromRotationMatrix(j8),Z.x=W,Z.y=Y,Z.z=X,this}makePerspective(J,Q,Z,$,W,Y,X=2000){let H=this.elements,K=2*W/(Q-J),G=2*W/(Z-$),U=(Q+J)/(Q-J),E=(Z+$)/(Z-$),q,N;if(X===2000)q=-(Y+W)/(Y-W),N=-2*Y*W/(Y-W);else if(X===2001)q=-Y/(Y-W),N=-Y*W/(Y-W);else throw Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+X);return H[0]=K,H[4]=0,H[8]=U,H[12]=0,H[1]=0,H[5]=G,H[9]=E,H[13]=0,H[2]=0,H[6]=0,H[10]=q,H[14]=N,H[3]=0,H[7]=0,H[11]=-1,H[15]=0,this}makeOrthographic(J,Q,Z,$,W,Y,X=2000){let H=this.elements,K=1/(Q-J),G=1/(Z-$),U=1/(Y-W),E=(Q+J)*K,q=(Z+$)*G,N,k;if(X===2000)N=(Y+W)*U,k=-2*U;else if(X===2001)N=W*U,k=-1*U;else throw Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+X);return H[0]=2*K,H[4]=0,H[8]=0,H[12]=-E,H[1]=0,H[5]=2*G,H[9]=0,H[13]=-q,H[2]=0,H[6]=0,H[10]=k,H[14]=-N,H[3]=0,H[7]=0,H[11]=0,H[15]=1,this}equals(J){let Q=this.elements,Z=J.elements;for(let $=0;$<16;$++)if(Q[$]!==Z[$])return!1;return!0}fromArray(J,Q=0){for(let Z=0;Z<16;Z++)this.elements[Z]=J[Z+Q];return this}toArray(J=[],Q=0){let Z=this.elements;return J[Q]=Z[0],J[Q+1]=Z[1],J[Q+2]=Z[2],J[Q+3]=Z[3],J[Q+4]=Z[4],J[Q+5]=Z[5],J[Q+6]=Z[6],J[Q+7]=Z[7],J[Q+8]=Z[8],J[Q+9]=Z[9],J[Q+10]=Z[10],J[Q+11]=Z[11],J[Q+12]=Z[12],J[Q+13]=Z[13],J[Q+14]=Z[14],J[Q+15]=Z[15],J}}var l6=/*@__PURE__*/new I,j8=/*@__PURE__*/new SJ,m5=/*@__PURE__*/new I(0,0,0),l5=/*@__PURE__*/new I(1,1,1),A9=/*@__PURE__*/new I,IZ=/*@__PURE__*/new I,E8=/*@__PURE__*/new I,mK=/*@__PURE__*/new SJ,lK=/*@__PURE__*/new P0;class W8{constructor(J=0,Q=0,Z=0,$=W8.DEFAULT_ORDER){this.isEuler=!0,this._x=J,this._y=Q,this._z=Z,this._order=$}get x(){return this._x}set x(J){this._x=J,this._onChangeCallback()}get y(){return this._y}set y(J){this._y=J,this._onChangeCallback()}get z(){return this._z}set z(J){this._z=J,this._onChangeCallback()}get order(){return this._order}set order(J){this._order=J,this._onChangeCallback()}set(J,Q,Z,$=this._order){return this._x=J,this._y=Q,this._z=Z,this._order=$,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(J){return this._x=J._x,this._y=J._y,this._z=J._z,this._order=J._order,this._onChangeCallback(),this}setFromRotationMatrix(J,Q=this._order,Z=!0){let $=J.elements,W=$[0],Y=$[4],X=$[8],H=$[1],K=$[5],G=$[9],U=$[2],E=$[6],q=$[10];switch(Q){case"XYZ":if(this._y=Math.asin(cJ(X,-1,1)),Math.abs(X)<0.9999999)this._x=Math.atan2(-G,q),this._z=Math.atan2(-Y,W);else this._x=Math.atan2(E,K),this._z=0;break;case"YXZ":if(this._x=Math.asin(-cJ(G,-1,1)),Math.abs(G)<0.9999999)this._y=Math.atan2(X,q),this._z=Math.atan2(H,K);else this._y=Math.atan2(-U,W),this._z=0;break;case"ZXY":if(this._x=Math.asin(cJ(E,-1,1)),Math.abs(E)<0.9999999)this._y=Math.atan2(-U,q),this._z=Math.atan2(-Y,K);else this._y=0,this._z=Math.atan2(H,W);break;case"ZYX":if(this._y=Math.asin(-cJ(U,-1,1)),Math.abs(U)<0.9999999)this._x=Math.atan2(E,q),this._z=Math.atan2(H,W);else this._x=0,this._z=Math.atan2(-Y,K);break;case"YZX":if(this._z=Math.asin(cJ(H,-1,1)),Math.abs(H)<0.9999999)this._x=Math.atan2(-G,K),this._y=Math.atan2(-U,W);else this._x=0,this._y=Math.atan2(X,q);break;case"XZY":if(this._z=Math.asin(-cJ(Y,-1,1)),Math.abs(Y)<0.9999999)this._x=Math.atan2(E,K),this._y=Math.atan2(X,W);else this._x=Math.atan2(-G,q),this._y=0;break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+Q)}if(this._order=Q,Z===!0)this._onChangeCallback();return this}setFromQuaternion(J,Q,Z){return mK.makeRotationFromQuaternion(J),this.setFromRotationMatrix(mK,Q,Z)}setFromVector3(J,Q=this._order){return this.set(J.x,J.y,J.z,Q)}reorder(J){return lK.setFromEuler(this),this.setFromQuaternion(lK,J)}equals(J){return J._x===this._x&&J._y===this._y&&J._z===this._z&&J._order===this._order}fromArray(J){if(this._x=J[0],this._y=J[1],this._z=J[2],J[3]!==void 0)this._order=J[3];return this._onChangeCallback(),this}toArray(J=[],Q=0){return J[Q]=this._x,J[Q+1]=this._y,J[Q+2]=this._z,J[Q+3]=this._order,J}_onChange(J){return this._onChangeCallback=J,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}W8.DEFAULT_ORDER="XYZ";class O7{constructor(){this.mask=1}set(J){this.mask=(1<<J|0)>>>0}enable(J){this.mask|=1<<J|0}enableAll(){this.mask=-1}toggle(J){this.mask^=1<<J|0}disable(J){this.mask&=~(1<<J|0)}disableAll(){this.mask=0}test(J){return(this.mask&J.mask)!==0}isEnabled(J){return(this.mask&(1<<J|0))!==0}}var u5=0,uK=/*@__PURE__*/new I,u6=/*@__PURE__*/new P0,W9=/*@__PURE__*/new SJ,wZ=/*@__PURE__*/new I,l7=/*@__PURE__*/new I,d5=/*@__PURE__*/new I,c5=/*@__PURE__*/new P0,dK=/*@__PURE__*/new I(1,0,0),cK=/*@__PURE__*/new I(0,1,0),nK=/*@__PURE__*/new I(0,0,1),sK={type:"added"},n5={type:"removed"},d6={type:"childadded",child:null},VY={type:"childremoved",child:null};class $0 extends I8{constructor(){super();this.isObject3D=!0,Object.defineProperty(this,"id",{value:u5++}),this.uuid=N8(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=$0.DEFAULT_UP.clone();let J=new I,Q=new W8,Z=new P0,$=new I(1,1,1);function W(){Z.setFromEuler(Q,!1)}function Y(){Q.setFromQuaternion(Z,void 0,!1)}Q._onChange(W),Z._onChange(Y),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:J},rotation:{configurable:!0,enumerable:!0,value:Q},quaternion:{configurable:!0,enumerable:!0,value:Z},scale:{configurable:!0,enumerable:!0,value:$},modelViewMatrix:{value:new SJ},normalMatrix:{value:new nJ}}),this.matrix=new SJ,this.matrixWorld=new SJ,this.matrixAutoUpdate=$0.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=$0.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new O7,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(J){if(this.matrixAutoUpdate)this.updateMatrix();this.matrix.premultiply(J),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(J){return this.quaternion.premultiply(J),this}setRotationFromAxisAngle(J,Q){this.quaternion.setFromAxisAngle(J,Q)}setRotationFromEuler(J){this.quaternion.setFromEuler(J,!0)}setRotationFromMatrix(J){this.quaternion.setFromRotationMatrix(J)}setRotationFromQuaternion(J){this.quaternion.copy(J)}rotateOnAxis(J,Q){return u6.setFromAxisAngle(J,Q),this.quaternion.multiply(u6),this}rotateOnWorldAxis(J,Q){return u6.setFromAxisAngle(J,Q),this.quaternion.premultiply(u6),this}rotateX(J){return this.rotateOnAxis(dK,J)}rotateY(J){return this.rotateOnAxis(cK,J)}rotateZ(J){return this.rotateOnAxis(nK,J)}translateOnAxis(J,Q){return uK.copy(J).applyQuaternion(this.quaternion),this.position.add(uK.multiplyScalar(Q)),this}translateX(J){return this.translateOnAxis(dK,J)}translateY(J){return this.translateOnAxis(cK,J)}translateZ(J){return this.translateOnAxis(nK,J)}localToWorld(J){return this.updateWorldMatrix(!0,!1),J.applyMatrix4(this.matrixWorld)}worldToLocal(J){return this.updateWorldMatrix(!0,!1),J.applyMatrix4(W9.copy(this.matrixWorld).invert())}lookAt(J,Q,Z){if(J.isVector3)wZ.copy(J);else wZ.set(J,Q,Z);let $=this.parent;if(this.updateWorldMatrix(!0,!1),l7.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight)W9.lookAt(l7,wZ,this.up);else W9.lookAt(wZ,l7,this.up);if(this.quaternion.setFromRotationMatrix(W9),$)W9.extractRotation($.matrixWorld),u6.setFromRotationMatrix(W9),this.quaternion.premultiply(u6.invert())}add(J){if(arguments.length>1){for(let Q=0;Q<arguments.length;Q++)this.add(arguments[Q]);return this}if(J===this)return console.error("THREE.Object3D.add: object can't be added as a child of itself.",J),this;if(J&&J.isObject3D)J.removeFromParent(),J.parent=this,this.children.push(J),J.dispatchEvent(sK),d6.child=J,this.dispatchEvent(d6),d6.child=null;else console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",J);return this}remove(J){if(arguments.length>1){for(let Z=0;Z<arguments.length;Z++)this.remove(arguments[Z]);return this}let Q=this.children.indexOf(J);if(Q!==-1)J.parent=null,this.children.splice(Q,1),J.dispatchEvent(n5),VY.child=J,this.dispatchEvent(VY),VY.child=null;return this}removeFromParent(){let J=this.parent;if(J!==null)J.remove(this);return this}clear(){return this.remove(...this.children)}attach(J){if(this.updateWorldMatrix(!0,!1),W9.copy(this.matrixWorld).invert(),J.parent!==null)J.parent.updateWorldMatrix(!0,!1),W9.multiply(J.parent.matrixWorld);return J.applyMatrix4(W9),J.removeFromParent(),J.parent=this,this.children.push(J),J.updateWorldMatrix(!1,!0),J.dispatchEvent(sK),d6.child=J,this.dispatchEvent(d6),d6.child=null,this}getObjectById(J){return this.getObjectByProperty("id",J)}getObjectByName(J){return this.getObjectByProperty("name",J)}getObjectByProperty(J,Q){if(this[J]===Q)return this;for(let Z=0,$=this.children.length;Z<$;Z++){let Y=this.children[Z].getObjectByProperty(J,Q);if(Y!==void 0)return Y}return}getObjectsByProperty(J,Q,Z=[]){if(this[J]===Q)Z.push(this);let $=this.children;for(let W=0,Y=$.length;W<Y;W++)$[W].getObjectsByProperty(J,Q,Z);return Z}getWorldPosition(J){return this.updateWorldMatrix(!0,!1),J.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(J){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(l7,J,d5),J}getWorldScale(J){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(l7,c5,J),J}getWorldDirection(J){this.updateWorldMatrix(!0,!1);let Q=this.matrixWorld.elements;return J.set(Q[8],Q[9],Q[10]).normalize()}raycast(){}traverse(J){J(this);let Q=this.children;for(let Z=0,$=Q.length;Z<$;Z++)Q[Z].traverse(J)}traverseVisible(J){if(this.visible===!1)return;J(this);let Q=this.children;for(let Z=0,$=Q.length;Z<$;Z++)Q[Z].traverseVisible(J)}traverseAncestors(J){let Q=this.parent;if(Q!==null)J(Q),Q.traverseAncestors(J)}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(J){if(this.matrixAutoUpdate)this.updateMatrix();if(this.matrixWorldNeedsUpdate||J){if(this.matrixWorldAutoUpdate===!0)if(this.parent===null)this.matrixWorld.copy(this.matrix);else this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix);this.matrixWorldNeedsUpdate=!1,J=!0}let Q=this.children;for(let Z=0,$=Q.length;Z<$;Z++)Q[Z].updateMatrixWorld(J)}updateWorldMatrix(J,Q){let Z=this.parent;if(J===!0&&Z!==null)Z.updateWorldMatrix(!0,!1);if(this.matrixAutoUpdate)this.updateMatrix();if(this.matrixWorldAutoUpdate===!0)if(this.parent===null)this.matrixWorld.copy(this.matrix);else this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix);if(Q===!0){let $=this.children;for(let W=0,Y=$.length;W<Y;W++)$[W].updateWorldMatrix(!1,!0)}}toJSON(J){let Q=J===void 0||typeof J==="string",Z={};if(Q)J={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},Z.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"};let $={};if($.uuid=this.uuid,$.type=this.type,this.name!=="")$.name=this.name;if(this.castShadow===!0)$.castShadow=!0;if(this.receiveShadow===!0)$.receiveShadow=!0;if(this.visible===!1)$.visible=!1;if(this.frustumCulled===!1)$.frustumCulled=!1;if(this.renderOrder!==0)$.renderOrder=this.renderOrder;if(Object.keys(this.userData).length>0)$.userData=this.userData;if($.layers=this.layers.mask,$.matrix=this.matrix.toArray(),$.up=this.up.toArray(),this.matrixAutoUpdate===!1)$.matrixAutoUpdate=!1;if(this.isInstancedMesh){if($.type="InstancedMesh",$.count=this.count,$.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null)$.instanceColor=this.instanceColor.toJSON()}if(this.isBatchedMesh){if($.type="BatchedMesh",$.perObjectFrustumCulled=this.perObjectFrustumCulled,$.sortObjects=this.sortObjects,$.drawRanges=this._drawRanges,$.reservedRanges=this._reservedRanges,$.visibility=this._visibility,$.active=this._active,$.bounds=this._bounds.map((X)=>({boxInitialized:X.boxInitialized,boxMin:X.box.min.toArray(),boxMax:X.box.max.toArray(),sphereInitialized:X.sphereInitialized,sphereRadius:X.sphere.radius,sphereCenter:X.sphere.center.toArray()})),$.maxInstanceCount=this._maxInstanceCount,$.maxVertexCount=this._maxVertexCount,$.maxIndexCount=this._maxIndexCount,$.geometryInitialized=this._geometryInitialized,$.geometryCount=this._geometryCount,$.matricesTexture=this._matricesTexture.toJSON(J),this._colorsTexture!==null)$.colorsTexture=this._colorsTexture.toJSON(J);if(this.boundingSphere!==null)$.boundingSphere={center:$.boundingSphere.center.toArray(),radius:$.boundingSphere.radius};if(this.boundingBox!==null)$.boundingBox={min:$.boundingBox.min.toArray(),max:$.boundingBox.max.toArray()}}function W(X,H){if(X[H.uuid]===void 0)X[H.uuid]=H.toJSON(J);return H.uuid}if(this.isScene){if(this.background){if(this.background.isColor)$.background=this.background.toJSON();else if(this.background.isTexture)$.background=this.background.toJSON(J).uuid}if(this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0)$.environment=this.environment.toJSON(J).uuid}else if(this.isMesh||this.isLine||this.isPoints){$.geometry=W(J.geometries,this.geometry);let X=this.geometry.parameters;if(X!==void 0&&X.shapes!==void 0){let H=X.shapes;if(Array.isArray(H))for(let K=0,G=H.length;K<G;K++){let U=H[K];W(J.shapes,U)}else W(J.shapes,H)}}if(this.isSkinnedMesh){if($.bindMode=this.bindMode,$.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0)W(J.skeletons,this.skeleton),$.skeleton=this.skeleton.uuid}if(this.material!==void 0)if(Array.isArray(this.material)){let X=[];for(let H=0,K=this.material.length;H<K;H++)X.push(W(J.materials,this.material[H]));$.material=X}else $.material=W(J.materials,this.material);if(this.children.length>0){$.children=[];for(let X=0;X<this.children.length;X++)$.children.push(this.children[X].toJSON(J).object)}if(this.animations.length>0){$.animations=[];for(let X=0;X<this.animations.length;X++){let H=this.animations[X];$.animations.push(W(J.animations,H))}}if(Q){let X=Y(J.geometries),H=Y(J.materials),K=Y(J.textures),G=Y(J.images),U=Y(J.shapes),E=Y(J.skeletons),q=Y(J.animations),N=Y(J.nodes);if(X.length>0)Z.geometries=X;if(H.length>0)Z.materials=H;if(K.length>0)Z.textures=K;if(G.length>0)Z.images=G;if(U.length>0)Z.shapes=U;if(E.length>0)Z.skeletons=E;if(q.length>0)Z.animations=q;if(N.length>0)Z.nodes=N}return Z.object=$,Z;function Y(X){let H=[];for(let K in X){let G=X[K];delete G.metadata,H.push(G)}return H}}clone(J){return new this.constructor().copy(this,J)}copy(J,Q=!0){if(this.name=J.name,this.up.copy(J.up),this.position.copy(J.position),this.rotation.order=J.rotation.order,this.quaternion.copy(J.quaternion),this.scale.copy(J.scale),this.matrix.copy(J.matrix),this.matrixWorld.copy(J.matrixWorld),this.matrixAutoUpdate=J.matrixAutoUpdate,this.matrixWorldAutoUpdate=J.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=J.matrixWorldNeedsUpdate,this.layers.mask=J.layers.mask,this.visible=J.visible,this.castShadow=J.castShadow,this.receiveShadow=J.receiveShadow,this.frustumCulled=J.frustumCulled,this.renderOrder=J.renderOrder,this.animations=J.animations.slice(),this.userData=JSON.parse(JSON.stringify(J.userData)),Q===!0)for(let Z=0;Z<J.children.length;Z++){let $=J.children[Z];this.add($.clone())}return this}}$0.DEFAULT_UP=/*@__PURE__*/new I(0,1,0);$0.DEFAULT_MATRIX_AUTO_UPDATE=!0;$0.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var v8=/*@__PURE__*/new I,Y9=/*@__PURE__*/new I,FY=/*@__PURE__*/new I,X9=/*@__PURE__*/new I,c6=/*@__PURE__*/new I,n6=/*@__PURE__*/new I,iK=/*@__PURE__*/new I,DY=/*@__PURE__*/new I,BY=/*@__PURE__*/new I,LY=/*@__PURE__*/new I,zY=/*@__PURE__*/new XJ,CY=/*@__PURE__*/new XJ,_Y=/*@__PURE__*/new XJ;class r0{constructor(J=new I,Q=new I,Z=new I){this.a=J,this.b=Q,this.c=Z}static getNormal(J,Q,Z,$){$.subVectors(Z,Q),v8.subVectors(J,Q),$.cross(v8);let W=$.lengthSq();if(W>0)return $.multiplyScalar(1/Math.sqrt(W));return $.set(0,0,0)}static getBarycoord(J,Q,Z,$,W){v8.subVectors($,Q),Y9.subVectors(Z,Q),FY.subVectors(J,Q);let Y=v8.dot(v8),X=v8.dot(Y9),H=v8.dot(FY),K=Y9.dot(Y9),G=Y9.dot(FY),U=Y*K-X*X;if(U===0)return W.set(0,0,0),null;let E=1/U,q=(K*H-X*G)*E,N=(Y*G-X*H)*E;return W.set(1-q-N,N,q)}static containsPoint(J,Q,Z,$){if(this.getBarycoord(J,Q,Z,$,X9)===null)return!1;return X9.x>=0&&X9.y>=0&&X9.x+X9.y<=1}static getInterpolation(J,Q,Z,$,W,Y,X,H){if(this.getBarycoord(J,Q,Z,$,X9)===null){if(H.x=0,H.y=0,"z"in H)H.z=0;if("w"in H)H.w=0;return null}return H.setScalar(0),H.addScaledVector(W,X9.x),H.addScaledVector(Y,X9.y),H.addScaledVector(X,X9.z),H}static getInterpolatedAttribute(J,Q,Z,$,W,Y){return zY.setScalar(0),CY.setScalar(0),_Y.setScalar(0),zY.fromBufferAttribute(J,Q),CY.fromBufferAttribute(J,Z),_Y.fromBufferAttribute(J,$),Y.setScalar(0),Y.addScaledVector(zY,W.x),Y.addScaledVector(CY,W.y),Y.addScaledVector(_Y,W.z),Y}static isFrontFacing(J,Q,Z,$){return v8.subVectors(Z,Q),Y9.subVectors(J,Q),v8.cross(Y9).dot($)<0?!0:!1}set(J,Q,Z){return this.a.copy(J),this.b.copy(Q),this.c.copy(Z),this}setFromPointsAndIndices(J,Q,Z,$){return this.a.copy(J[Q]),this.b.copy(J[Z]),this.c.copy(J[$]),this}setFromAttributeAndIndices(J,Q,Z,$){return this.a.fromBufferAttribute(J,Q),this.b.fromBufferAttribute(J,Z),this.c.fromBufferAttribute(J,$),this}clone(){return new this.constructor().copy(this)}copy(J){return this.a.copy(J.a),this.b.copy(J.b),this.c.copy(J.c),this}getArea(){return v8.subVectors(this.c,this.b),Y9.subVectors(this.a,this.b),v8.cross(Y9).length()*0.5}getMidpoint(J){return J.addVectors(this.a,this.b).add(this.c).multiplyScalar(0.3333333333333333)}getNormal(J){return r0.getNormal(this.a,this.b,this.c,J)}getPlane(J){return J.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(J,Q){return r0.getBarycoord(J,this.a,this.b,this.c,Q)}getInterpolation(J,Q,Z,$,W){return r0.getInterpolation(J,this.a,this.b,this.c,Q,Z,$,W)}containsPoint(J){return r0.containsPoint(J,this.a,this.b,this.c)}isFrontFacing(J){return r0.isFrontFacing(this.a,this.b,this.c,J)}intersectsBox(J){return J.intersectsTriangle(this)}closestPointToPoint(J,Q){let Z=this.a,$=this.b,W=this.c,Y,X;c6.subVectors($,Z),n6.subVectors(W,Z),DY.subVectors(J,Z);let H=c6.dot(DY),K=n6.dot(DY);if(H<=0&&K<=0)return Q.copy(Z);BY.subVectors(J,$);let G=c6.dot(BY),U=n6.dot(BY);if(G>=0&&U<=G)return Q.copy($);let E=H*U-G*K;if(E<=0&&H>=0&&G<=0)return Y=H/(H-G),Q.copy(Z).addScaledVector(c6,Y);LY.subVectors(J,W);let q=c6.dot(LY),N=n6.dot(LY);if(N>=0&&q<=N)return Q.copy(W);let k=q*K-H*N;if(k<=0&&K>=0&&N<=0)return X=K/(K-N),Q.copy(Z).addScaledVector(n6,X);let V=G*N-q*U;if(V<=0&&U-G>=0&&q-N>=0)return iK.subVectors(W,$),X=(U-G)/(U-G+(q-N)),Q.copy($).addScaledVector(iK,X);let R=1/(V+k+E);return Y=k*R,X=E*R,Q.copy(Z).addScaledVector(c6,Y).addScaledVector(n6,X)}equals(J){return J.a.equals(this.a)&&J.b.equals(this.b)&&J.c.equals(this.c)}}var cU={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},P9={h:0,s:0,l:0},AZ={h:0,s:0,l:0};function MY(J,Q,Z){if(Z<0)Z+=1;if(Z>1)Z-=1;if(Z<0.16666666666666666)return J+(Q-J)*6*Z;if(Z<0.5)return Q;if(Z<0.6666666666666666)return J+(Q-J)*6*(0.6666666666666666-Z);return J}class u{constructor(J,Q,Z){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(J,Q,Z)}set(J,Q,Z){if(Q===void 0&&Z===void 0){let $=J;if($&&$.isColor)this.copy($);else if(typeof $==="number")this.setHex($);else if(typeof $==="string")this.setStyle($)}else this.setRGB(J,Q,Z);return this}setScalar(J){return this.r=J,this.g=J,this.b=J,this}setHex(J,Q="srgb"){return J=Math.floor(J),this.r=(J>>16&255)/255,this.g=(J>>8&255)/255,this.b=(J&255)/255,aJ.toWorkingColorSpace(this,Q),this}setRGB(J,Q,Z,$=aJ.workingColorSpace){return this.r=J,this.g=Q,this.b=Z,aJ.toWorkingColorSpace(this,$),this}setHSL(J,Q,Z,$=aJ.workingColorSpace){if(J=gX(J,1),Q=cJ(Q,0,1),Z=cJ(Z,0,1),Q===0)this.r=this.g=this.b=Z;else{let W=Z<=0.5?Z*(1+Q):Z+Q-Z*Q,Y=2*Z-W;this.r=MY(Y,W,J+0.3333333333333333),this.g=MY(Y,W,J),this.b=MY(Y,W,J-0.3333333333333333)}return aJ.toWorkingColorSpace(this,$),this}setStyle(J,Q="srgb"){function Z(W){if(W===void 0)return;if(parseFloat(W)<1)console.warn("THREE.Color: Alpha component of "+J+" will be ignored.")}let $;if($=/^(\w+)\(([^\)]*)\)/.exec(J)){let W,Y=$[1],X=$[2];switch(Y){case"rgb":case"rgba":if(W=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(X))return Z(W[4]),this.setRGB(Math.min(255,parseInt(W[1],10))/255,Math.min(255,parseInt(W[2],10))/255,Math.min(255,parseInt(W[3],10))/255,Q);if(W=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(X))return Z(W[4]),this.setRGB(Math.min(100,parseInt(W[1],10))/100,Math.min(100,parseInt(W[2],10))/100,Math.min(100,parseInt(W[3],10))/100,Q);break;case"hsl":case"hsla":if(W=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(X))return Z(W[4]),this.setHSL(parseFloat(W[1])/360,parseFloat(W[2])/100,parseFloat(W[3])/100,Q);break;default:console.warn("THREE.Color: Unknown color model "+J)}}else if($=/^\#([A-Fa-f\d]+)$/.exec(J)){let W=$[1],Y=W.length;if(Y===3)return this.setRGB(parseInt(W.charAt(0),16)/15,parseInt(W.charAt(1),16)/15,parseInt(W.charAt(2),16)/15,Q);else if(Y===6)return this.setHex(parseInt(W,16),Q);else console.warn("THREE.Color: Invalid hex color "+J)}else if(J&&J.length>0)return this.setColorName(J,Q);return this}setColorName(J,Q="srgb"){let Z=cU[J.toLowerCase()];if(Z!==void 0)this.setHex(Z,Q);else console.warn("THREE.Color: Unknown color "+J);return this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(J){return this.r=J.r,this.g=J.g,this.b=J.b,this}copySRGBToLinear(J){return this.r=U9(J.r),this.g=U9(J.g),this.b=U9(J.b),this}copyLinearToSRGB(J){return this.r=$7(J.r),this.g=$7(J.g),this.b=$7(J.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(J="srgb"){return aJ.fromWorkingColorSpace(d0.copy(this),J),Math.round(cJ(d0.r*255,0,255))*65536+Math.round(cJ(d0.g*255,0,255))*256+Math.round(cJ(d0.b*255,0,255))}getHexString(J="srgb"){return("000000"+this.getHex(J).toString(16)).slice(-6)}getHSL(J,Q=aJ.workingColorSpace){aJ.fromWorkingColorSpace(d0.copy(this),Q);let{r:Z,g:$,b:W}=d0,Y=Math.max(Z,$,W),X=Math.min(Z,$,W),H,K,G=(X+Y)/2;if(X===Y)H=0,K=0;else{let U=Y-X;switch(K=G<=0.5?U/(Y+X):U/(2-Y-X),Y){case Z:H=($-W)/U+($<W?6:0);break;case $:H=(W-Z)/U+2;break;case W:H=(Z-$)/U+4;break}H/=6}return J.h=H,J.s=K,J.l=G,J}getRGB(J,Q=aJ.workingColorSpace){return aJ.fromWorkingColorSpace(d0.copy(this),Q),J.r=d0.r,J.g=d0.g,J.b=d0.b,J}getStyle(J="srgb"){aJ.fromWorkingColorSpace(d0.copy(this),J);let{r:Q,g:Z,b:$}=d0;if(J!=="srgb")return`color(${J} ${Q.toFixed(3)} ${Z.toFixed(3)} ${$.toFixed(3)})`;return`rgb(${Math.round(Q*255)},${Math.round(Z*255)},${Math.round($*255)})`}offsetHSL(J,Q,Z){return this.getHSL(P9),this.setHSL(P9.h+J,P9.s+Q,P9.l+Z)}add(J){return this.r+=J.r,this.g+=J.g,this.b+=J.b,this}addColors(J,Q){return this.r=J.r+Q.r,this.g=J.g+Q.g,this.b=J.b+Q.b,this}addScalar(J){return this.r+=J,this.g+=J,this.b+=J,this}sub(J){return this.r=Math.max(0,this.r-J.r),this.g=Math.max(0,this.g-J.g),this.b=Math.max(0,this.b-J.b),this}multiply(J){return this.r*=J.r,this.g*=J.g,this.b*=J.b,this}multiplyScalar(J){return this.r*=J,this.g*=J,this.b*=J,this}lerp(J,Q){return this.r+=(J.r-this.r)*Q,this.g+=(J.g-this.g)*Q,this.b+=(J.b-this.b)*Q,this}lerpColors(J,Q,Z){return this.r=J.r+(Q.r-J.r)*Z,this.g=J.g+(Q.g-J.g)*Z,this.b=J.b+(Q.b-J.b)*Z,this}lerpHSL(J,Q){this.getHSL(P9),J.getHSL(AZ);let Z=e7(P9.h,AZ.h,Q),$=e7(P9.s,AZ.s,Q),W=e7(P9.l,AZ.l,Q);return this.setHSL(Z,$,W),this}setFromVector3(J){return this.r=J.x,this.g=J.y,this.b=J.z,this}applyMatrix3(J){let Q=this.r,Z=this.g,$=this.b,W=J.elements;return this.r=W[0]*Q+W[3]*Z+W[6]*$,this.g=W[1]*Q+W[4]*Z+W[7]*$,this.b=W[2]*Q+W[5]*Z+W[8]*$,this}equals(J){return J.r===this.r&&J.g===this.g&&J.b===this.b}fromArray(J,Q=0){return this.r=J[Q],this.g=J[Q+1],this.b=J[Q+2],this}toArray(J=[],Q=0){return J[Q]=this.r,J[Q+1]=this.g,J[Q+2]=this.b,J}fromBufferAttribute(J,Q){return this.r=J.getX(Q),this.g=J.getY(Q),this.b=J.getZ(Q),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}var d0=/*@__PURE__*/new u;u.NAMES=cU;var s5=0;class C0 extends I8{constructor(){super();this.isMaterial=!0,Object.defineProperty(this,"id",{value:s5++}),this.uuid=N8(),this.name="",this.type="Material",this.blending=1,this.side=0,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=204,this.blendDst=205,this.blendEquation=100,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new u(0,0,0),this.blendAlpha=0,this.depthFunc=3,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=519,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=7680,this.stencilZFail=7680,this.stencilZPass=7680,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(J){if(this._alphaTest>0!==J>0)this.version++;this._alphaTest=J}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(J){if(J===void 0)return;for(let Q in J){let Z=J[Q];if(Z===void 0){console.warn(`THREE.Material: parameter '${Q}' has value of undefined.`);continue}let $=this[Q];if($===void 0){console.warn(`THREE.Material: '${Q}' is not a property of THREE.${this.type}.`);continue}if($&&$.isColor)$.set(Z);else if($&&$.isVector3&&(Z&&Z.isVector3))$.copy(Z);else this[Q]=Z}}toJSON(J){let Q=J===void 0||typeof J==="string";if(Q)J={textures:{},images:{}};let Z={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};if(Z.uuid=this.uuid,Z.type=this.type,this.name!=="")Z.name=this.name;if(this.color&&this.color.isColor)Z.color=this.color.getHex();if(this.roughness!==void 0)Z.roughness=this.roughness;if(this.metalness!==void 0)Z.metalness=this.metalness;if(this.sheen!==void 0)Z.sheen=this.sheen;if(this.sheenColor&&this.sheenColor.isColor)Z.sheenColor=this.sheenColor.getHex();if(this.sheenRoughness!==void 0)Z.sheenRoughness=this.sheenRoughness;if(this.emissive&&this.emissive.isColor)Z.emissive=this.emissive.getHex();if(this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1)Z.emissiveIntensity=this.emissiveIntensity;if(this.specular&&this.specular.isColor)Z.specular=this.specular.getHex();if(this.specularIntensity!==void 0)Z.specularIntensity=this.specularIntensity;if(this.specularColor&&this.specularColor.isColor)Z.specularColor=this.specularColor.getHex();if(this.shininess!==void 0)Z.shininess=this.shininess;if(this.clearcoat!==void 0)Z.clearcoat=this.clearcoat;if(this.clearcoatRoughness!==void 0)Z.clearcoatRoughness=this.clearcoatRoughness;if(this.clearcoatMap&&this.clearcoatMap.isTexture)Z.clearcoatMap=this.clearcoatMap.toJSON(J).uuid;if(this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture)Z.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(J).uuid;if(this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture)Z.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(J).uuid,Z.clearcoatNormalScale=this.clearcoatNormalScale.toArray();if(this.dispersion!==void 0)Z.dispersion=this.dispersion;if(this.iridescence!==void 0)Z.iridescence=this.iridescence;if(this.iridescenceIOR!==void 0)Z.iridescenceIOR=this.iridescenceIOR;if(this.iridescenceThicknessRange!==void 0)Z.iridescenceThicknessRange=this.iridescenceThicknessRange;if(this.iridescenceMap&&this.iridescenceMap.isTexture)Z.iridescenceMap=this.iridescenceMap.toJSON(J).uuid;if(this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture)Z.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(J).uuid;if(this.anisotropy!==void 0)Z.anisotropy=this.anisotropy;if(this.anisotropyRotation!==void 0)Z.anisotropyRotation=this.anisotropyRotation;if(this.anisotropyMap&&this.anisotropyMap.isTexture)Z.anisotropyMap=this.anisotropyMap.toJSON(J).uuid;if(this.map&&this.map.isTexture)Z.map=this.map.toJSON(J).uuid;if(this.matcap&&this.matcap.isTexture)Z.matcap=this.matcap.toJSON(J).uuid;if(this.alphaMap&&this.alphaMap.isTexture)Z.alphaMap=this.alphaMap.toJSON(J).uuid;if(this.lightMap&&this.lightMap.isTexture)Z.lightMap=this.lightMap.toJSON(J).uuid,Z.lightMapIntensity=this.lightMapIntensity;if(this.aoMap&&this.aoMap.isTexture)Z.aoMap=this.aoMap.toJSON(J).uuid,Z.aoMapIntensity=this.aoMapIntensity;if(this.bumpMap&&this.bumpMap.isTexture)Z.bumpMap=this.bumpMap.toJSON(J).uuid,Z.bumpScale=this.bumpScale;if(this.normalMap&&this.normalMap.isTexture)Z.normalMap=this.normalMap.toJSON(J).uuid,Z.normalMapType=this.normalMapType,Z.normalScale=this.normalScale.toArray();if(this.displacementMap&&this.displacementMap.isTexture)Z.displacementMap=this.displacementMap.toJSON(J).uuid,Z.displacementScale=this.displacementScale,Z.displacementBias=this.displacementBias;if(this.roughnessMap&&this.roughnessMap.isTexture)Z.roughnessMap=this.roughnessMap.toJSON(J).uuid;if(this.metalnessMap&&this.metalnessMap.isTexture)Z.metalnessMap=this.metalnessMap.toJSON(J).uuid;if(this.emissiveMap&&this.emissiveMap.isTexture)Z.emissiveMap=this.emissiveMap.toJSON(J).uuid;if(this.specularMap&&this.specularMap.isTexture)Z.specularMap=this.specularMap.toJSON(J).uuid;if(this.specularIntensityMap&&this.specularIntensityMap.isTexture)Z.specularIntensityMap=this.specularIntensityMap.toJSON(J).uuid;if(this.specularColorMap&&this.specularColorMap.isTexture)Z.specularColorMap=this.specularColorMap.toJSON(J).uuid;if(this.envMap&&this.envMap.isTexture){if(Z.envMap=this.envMap.toJSON(J).uuid,this.combine!==void 0)Z.combine=this.combine}if(this.envMapRotation!==void 0)Z.envMapRotation=this.envMapRotation.toArray();if(this.envMapIntensity!==void 0)Z.envMapIntensity=this.envMapIntensity;if(this.reflectivity!==void 0)Z.reflectivity=this.reflectivity;if(this.refractionRatio!==void 0)Z.refractionRatio=this.refractionRatio;if(this.gradientMap&&this.gradientMap.isTexture)Z.gradientMap=this.gradientMap.toJSON(J).uuid;if(this.transmission!==void 0)Z.transmission=this.transmission;if(this.transmissionMap&&this.transmissionMap.isTexture)Z.transmissionMap=this.transmissionMap.toJSON(J).uuid;if(this.thickness!==void 0)Z.thickness=this.thickness;if(this.thicknessMap&&this.thicknessMap.isTexture)Z.thicknessMap=this.thicknessMap.toJSON(J).uuid;if(this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0)Z.attenuationDistance=this.attenuationDistance;if(this.attenuationColor!==void 0)Z.attenuationColor=this.attenuationColor.getHex();if(this.size!==void 0)Z.size=this.size;if(this.shadowSide!==null)Z.shadowSide=this.shadowSide;if(this.sizeAttenuation!==void 0)Z.sizeAttenuation=this.sizeAttenuation;if(this.blending!==1)Z.blending=this.blending;if(this.side!==0)Z.side=this.side;if(this.vertexColors===!0)Z.vertexColors=!0;if(this.opacity<1)Z.opacity=this.opacity;if(this.transparent===!0)Z.transparent=!0;if(this.blendSrc!==204)Z.blendSrc=this.blendSrc;if(this.blendDst!==205)Z.blendDst=this.blendDst;if(this.blendEquation!==100)Z.blendEquation=this.blendEquation;if(this.blendSrcAlpha!==null)Z.blendSrcAlpha=this.blendSrcAlpha;if(this.blendDstAlpha!==null)Z.blendDstAlpha=this.blendDstAlpha;if(this.blendEquationAlpha!==null)Z.blendEquationAlpha=this.blendEquationAlpha;if(this.blendColor&&this.blendColor.isColor)Z.blendColor=this.blendColor.getHex();if(this.blendAlpha!==0)Z.blendAlpha=this.blendAlpha;if(this.depthFunc!==3)Z.depthFunc=this.depthFunc;if(this.depthTest===!1)Z.depthTest=this.depthTest;if(this.depthWrite===!1)Z.depthWrite=this.depthWrite;if(this.colorWrite===!1)Z.colorWrite=this.colorWrite;if(this.stencilWriteMask!==255)Z.stencilWriteMask=this.stencilWriteMask;if(this.stencilFunc!==519)Z.stencilFunc=this.stencilFunc;if(this.stencilRef!==0)Z.stencilRef=this.stencilRef;if(this.stencilFuncMask!==255)Z.stencilFuncMask=this.stencilFuncMask;if(this.stencilFail!==7680)Z.stencilFail=this.stencilFail;if(this.stencilZFail!==7680)Z.stencilZFail=this.stencilZFail;if(this.stencilZPass!==7680)Z.stencilZPass=this.stencilZPass;if(this.stencilWrite===!0)Z.stencilWrite=this.stencilWrite;if(this.rotation!==void 0&&this.rotation!==0)Z.rotation=this.rotation;if(this.polygonOffset===!0)Z.polygonOffset=!0;if(this.polygonOffsetFactor!==0)Z.polygonOffsetFactor=this.polygonOffsetFactor;if(this.polygonOffsetUnits!==0)Z.polygonOffsetUnits=this.polygonOffsetUnits;if(this.linewidth!==void 0&&this.linewidth!==1)Z.linewidth=this.linewidth;if(this.dashSize!==void 0)Z.dashSize=this.dashSize;if(this.gapSize!==void 0)Z.gapSize=this.gapSize;if(this.scale!==void 0)Z.scale=this.scale;if(this.dithering===!0)Z.dithering=!0;if(this.alphaTest>0)Z.alphaTest=this.alphaTest;if(this.alphaHash===!0)Z.alphaHash=!0;if(this.alphaToCoverage===!0)Z.alphaToCoverage=!0;if(this.premultipliedAlpha===!0)Z.premultipliedAlpha=!0;if(this.forceSinglePass===!0)Z.forceSinglePass=!0;if(this.wireframe===!0)Z.wireframe=!0;if(this.wireframeLinewidth>1)Z.wireframeLinewidth=this.wireframeLinewidth;if(this.wireframeLinecap!=="round")Z.wireframeLinecap=this.wireframeLinecap;if(this.wireframeLinejoin!=="round")Z.wireframeLinejoin=this.wireframeLinejoin;if(this.flatShading===!0)Z.flatShading=!0;if(this.visible===!1)Z.visible=!1;if(this.toneMapped===!1)Z.toneMapped=!1;if(this.fog===!1)Z.fog=!1;if(Object.keys(this.userData).length>0)Z.userData=this.userData;function $(W){let Y=[];for(let X in W){let H=W[X];delete H.metadata,Y.push(H)}return Y}if(Q){let W=$(J.textures),Y=$(J.images);if(W.length>0)Z.textures=W;if(Y.length>0)Z.images=Y}return Z}clone(){return new this.constructor().copy(this)}copy(J){this.name=J.name,this.blending=J.blending,this.side=J.side,this.vertexColors=J.vertexColors,this.opacity=J.opacity,this.transparent=J.transparent,this.blendSrc=J.blendSrc,this.blendDst=J.blendDst,this.blendEquation=J.blendEquation,this.blendSrcAlpha=J.blendSrcAlpha,this.blendDstAlpha=J.blendDstAlpha,this.blendEquationAlpha=J.blendEquationAlpha,this.blendColor.copy(J.blendColor),this.blendAlpha=J.blendAlpha,this.depthFunc=J.depthFunc,this.depthTest=J.depthTest,this.depthWrite=J.depthWrite,this.stencilWriteMask=J.stencilWriteMask,this.stencilFunc=J.stencilFunc,this.stencilRef=J.stencilRef,this.stencilFuncMask=J.stencilFuncMask,this.stencilFail=J.stencilFail,this.stencilZFail=J.stencilZFail,this.stencilZPass=J.stencilZPass,this.stencilWrite=J.stencilWrite;let Q=J.clippingPlanes,Z=null;if(Q!==null){let $=Q.length;Z=Array($);for(let W=0;W!==$;++W)Z[W]=Q[W].clone()}return this.clippingPlanes=Z,this.clipIntersection=J.clipIntersection,this.clipShadows=J.clipShadows,this.shadowSide=J.shadowSide,this.colorWrite=J.colorWrite,this.precision=J.precision,this.polygonOffset=J.polygonOffset,this.polygonOffsetFactor=J.polygonOffsetFactor,this.polygonOffsetUnits=J.polygonOffsetUnits,this.dithering=J.dithering,this.alphaTest=J.alphaTest,this.alphaHash=J.alphaHash,this.alphaToCoverage=J.alphaToCoverage,this.premultipliedAlpha=J.premultipliedAlpha,this.forceSinglePass=J.forceSinglePass,this.visible=J.visible,this.toneMapped=J.toneMapped,this.userData=JSON.parse(JSON.stringify(J.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(J){if(J===!0)this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class b0 extends C0{constructor(J){super();this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new u(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new W8,this.combine=0,this.reflectivity=1,this.refractionRatio=0.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(J)}copy(J){return super.copy(J),this.color.copy(J.color),this.map=J.map,this.lightMap=J.lightMap,this.lightMapIntensity=J.lightMapIntensity,this.aoMap=J.aoMap,this.aoMapIntensity=J.aoMapIntensity,this.specularMap=J.specularMap,this.alphaMap=J.alphaMap,this.envMap=J.envMap,this.envMapRotation.copy(J.envMapRotation),this.combine=J.combine,this.reflectivity=J.reflectivity,this.refractionRatio=J.refractionRatio,this.wireframe=J.wireframe,this.wireframeLinewidth=J.wireframeLinewidth,this.wireframeLinecap=J.wireframeLinecap,this.wireframeLinejoin=J.wireframeLinejoin,this.fog=J.fog,this}}var K9=/*@__PURE__*/i5();function i5(){let J=new ArrayBuffer(4),Q=new Float32Array(J),Z=new Uint32Array(J),$=new Uint32Array(512),W=new Uint32Array(512);for(let K=0;K<256;++K){let G=K-127;if(G<-27)$[K]=0,$[K|256]=32768,W[K]=24,W[K|256]=24;else if(G<-14)$[K]=1024>>-G-14,$[K|256]=1024>>-G-14|32768,W[K]=-G-1,W[K|256]=-G-1;else if(G<=15)$[K]=G+15<<10,$[K|256]=G+15<<10|32768,W[K]=13,W[K|256]=13;else if(G<128)$[K]=31744,$[K|256]=64512,W[K]=24,W[K|256]=24;else $[K]=31744,$[K|256]=64512,W[K]=13,W[K|256]=13}let Y=new Uint32Array(2048),X=new Uint32Array(64),H=new Uint32Array(64);for(let K=1;K<1024;++K){let G=K<<13,U=0;while((G&8388608)===0)G<<=1,U-=8388608;G&=-8388609,U+=947912704,Y[K]=G|U}for(let K=1024;K<2048;++K)Y[K]=939524096+(K-1024<<13);for(let K=1;K<31;++K)X[K]=K<<23;X[31]=1199570944,X[32]=2147483648;for(let K=33;K<63;++K)X[K]=2147483648+(K-32<<23);X[63]=3347054592;for(let K=1;K<64;++K)if(K!==32)H[K]=1024;return{floatView:Q,uint32View:Z,baseTable:$,shiftTable:W,mantissaTable:Y,exponentTable:X,offsetTable:H}}function Z8(J){if(Math.abs(J)>65504)console.warn("THREE.DataUtils.toHalfFloat(): Value out of range.");J=cJ(J,-65504,65504),K9.floatView[0]=J;let Q=K9.uint32View[0],Z=Q>>23&511;return K9.baseTable[Z]+((Q&8388607)>>K9.shiftTable[Z])}function t7(J){let Q=J>>10;return K9.uint32View[0]=K9.mantissaTable[K9.offsetTable[Q]+(J&1023)]+K9.exponentTable[Q],K9.floatView[0]}var nU={toHalfFloat:Z8,fromHalfFloat:t7},w0=/*@__PURE__*/new I,PZ=/*@__PURE__*/new i,o5=0;class X0{constructor(J,Q,Z=!1){if(Array.isArray(J))throw TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:o5++}),this.name="",this.array=J,this.itemSize=Q,this.count=J!==void 0?J.length/Q:0,this.normalized=Z,this.usage=35044,this.updateRanges=[],this.gpuType=1015,this.version=0}onUploadCallback(){}set needsUpdate(J){if(J===!0)this.version++}setUsage(J){return this.usage=J,this}addUpdateRange(J,Q){this.updateRanges.push({start:J,count:Q})}clearUpdateRanges(){this.updateRanges.length=0}copy(J){return this.name=J.name,this.array=new J.array.constructor(J.array),this.itemSize=J.itemSize,this.count=J.count,this.normalized=J.normalized,this.usage=J.usage,this.gpuType=J.gpuType,this}copyAt(J,Q,Z){J*=this.itemSize,Z*=Q.itemSize;for(let $=0,W=this.itemSize;$<W;$++)this.array[J+$]=Q.array[Z+$];return this}copyArray(J){return this.array.set(J),this}applyMatrix3(J){if(this.itemSize===2)for(let Q=0,Z=this.count;Q<Z;Q++)PZ.fromBufferAttribute(this,Q),PZ.applyMatrix3(J),this.setXY(Q,PZ.x,PZ.y);else if(this.itemSize===3)for(let Q=0,Z=this.count;Q<Z;Q++)w0.fromBufferAttribute(this,Q),w0.applyMatrix3(J),this.setXYZ(Q,w0.x,w0.y,w0.z);return this}applyMatrix4(J){for(let Q=0,Z=this.count;Q<Z;Q++)w0.fromBufferAttribute(this,Q),w0.applyMatrix4(J),this.setXYZ(Q,w0.x,w0.y,w0.z);return this}applyNormalMatrix(J){for(let Q=0,Z=this.count;Q<Z;Q++)w0.fromBufferAttribute(this,Q),w0.applyNormalMatrix(J),this.setXYZ(Q,w0.x,w0.y,w0.z);return this}transformDirection(J){for(let Q=0,Z=this.count;Q<Z;Q++)w0.fromBufferAttribute(this,Q),w0.transformDirection(J),this.setXYZ(Q,w0.x,w0.y,w0.z);return this}set(J,Q=0){return this.array.set(J,Q),this}getComponent(J,Q){let Z=this.array[J*this.itemSize+Q];if(this.normalized)Z=a0(Z,this.array);return Z}setComponent(J,Q,Z){if(this.normalized)Z=iJ(Z,this.array);return this.array[J*this.itemSize+Q]=Z,this}getX(J){let Q=this.array[J*this.itemSize];if(this.normalized)Q=a0(Q,this.array);return Q}setX(J,Q){if(this.normalized)Q=iJ(Q,this.array);return this.array[J*this.itemSize]=Q,this}getY(J){let Q=this.array[J*this.itemSize+1];if(this.normalized)Q=a0(Q,this.array);return Q}setY(J,Q){if(this.normalized)Q=iJ(Q,this.array);return this.array[J*this.itemSize+1]=Q,this}getZ(J){let Q=this.array[J*this.itemSize+2];if(this.normalized)Q=a0(Q,this.array);return Q}setZ(J,Q){if(this.normalized)Q=iJ(Q,this.array);return this.array[J*this.itemSize+2]=Q,this}getW(J){let Q=this.array[J*this.itemSize+3];if(this.normalized)Q=a0(Q,this.array);return Q}setW(J,Q){if(this.normalized)Q=iJ(Q,this.array);return this.array[J*this.itemSize+3]=Q,this}setXY(J,Q,Z){if(J*=this.itemSize,this.normalized)Q=iJ(Q,this.array),Z=iJ(Z,this.array);return this.array[J+0]=Q,this.array[J+1]=Z,this}setXYZ(J,Q,Z,$){if(J*=this.itemSize,this.normalized)Q=iJ(Q,this.array),Z=iJ(Z,this.array),$=iJ($,this.array);return this.array[J+0]=Q,this.array[J+1]=Z,this.array[J+2]=$,this}setXYZW(J,Q,Z,$,W){if(J*=this.itemSize,this.normalized)Q=iJ(Q,this.array),Z=iJ(Z,this.array),$=iJ($,this.array),W=iJ(W,this.array);return this.array[J+0]=Q,this.array[J+1]=Z,this.array[J+2]=$,this.array[J+3]=W,this}onUpload(J){return this.onUploadCallback=J,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let J={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};if(this.name!=="")J.name=this.name;if(this.usage!==35044)J.usage=this.usage;return J}}class R7 extends X0{constructor(J,Q,Z){super(new Int8Array(J),Q,Z)}}class MQ extends X0{constructor(J,Q,Z){super(new Uint8Array(J),Q,Z)}}class dX extends X0{constructor(J,Q,Z){super(new Uint8ClampedArray(J),Q,Z)}}class cX extends X0{constructor(J,Q,Z){super(new Int16Array(J),Q,Z)}}class D6 extends X0{constructor(J,Q,Z){super(new Uint16Array(J),Q,Z)}}class nX extends X0{constructor(J,Q,Z){super(new Int32Array(J),Q,Z)}}class IQ extends X0{constructor(J,Q,Z){super(new Uint32Array(J),Q,Z)}}class sX extends X0{constructor(J,Q,Z){super(new Uint16Array(J),Q,Z);this.isFloat16BufferAttribute=!0}getX(J){let Q=t7(this.array[J*this.itemSize]);if(this.normalized)Q=a0(Q,this.array);return Q}setX(J,Q){if(this.normalized)Q=iJ(Q,this.array);return this.array[J*this.itemSize]=Z8(Q),this}getY(J){let Q=t7(this.array[J*this.itemSize+1]);if(this.normalized)Q=a0(Q,this.array);return Q}setY(J,Q){if(this.normalized)Q=iJ(Q,this.array);return this.array[J*this.itemSize+1]=Z8(Q),this}getZ(J){let Q=t7(this.array[J*this.itemSize+2]);if(this.normalized)Q=a0(Q,this.array);return Q}setZ(J,Q){if(this.normalized)Q=iJ(Q,this.array);return this.array[J*this.itemSize+2]=Z8(Q),this}getW(J){let Q=t7(this.array[J*this.itemSize+3]);if(this.normalized)Q=a0(Q,this.array);return Q}setW(J,Q){if(this.normalized)Q=iJ(Q,this.array);return this.array[J*this.itemSize+3]=Z8(Q),this}setXY(J,Q,Z){if(J*=this.itemSize,this.normalized)Q=iJ(Q,this.array),Z=iJ(Z,this.array);return this.array[J+0]=Z8(Q),this.array[J+1]=Z8(Z),this}setXYZ(J,Q,Z,$){if(J*=this.itemSize,this.normalized)Q=iJ(Q,this.array),Z=iJ(Z,this.array),$=iJ($,this.array);return this.array[J+0]=Z8(Q),this.array[J+1]=Z8(Z),this.array[J+2]=Z8($),this}setXYZW(J,Q,Z,$,W){if(J*=this.itemSize,this.normalized)Q=iJ(Q,this.array),Z=iJ(Z,this.array),$=iJ($,this.array),W=iJ(W,this.array);return this.array[J+0]=Z8(Q),this.array[J+1]=Z8(Z),this.array[J+2]=Z8($),this.array[J+3]=Z8(W),this}}class zJ extends X0{constructor(J,Q,Z){super(new Float32Array(J),Q,Z)}}var a5=0,C8=/*@__PURE__*/new SJ,IY=/*@__PURE__*/new $0,s6=/*@__PURE__*/new I,q8=/*@__PURE__*/new z0,u7=/*@__PURE__*/new z0,y0=/*@__PURE__*/new I;class gJ extends I8{constructor(){super();this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:a5++}),this.uuid=N8(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(J){if(Array.isArray(J))this.index=new((pX(J))?IQ:D6)(J,1);else this.index=J;return this}setIndirect(J){return this.indirect=J,this}getIndirect(){return this.indirect}getAttribute(J){return this.attributes[J]}setAttribute(J,Q){return this.attributes[J]=Q,this}deleteAttribute(J){return delete this.attributes[J],this}hasAttribute(J){return this.attributes[J]!==void 0}addGroup(J,Q,Z=0){this.groups.push({start:J,count:Q,materialIndex:Z})}clearGroups(){this.groups=[]}setDrawRange(J,Q){this.drawRange.start=J,this.drawRange.count=Q}applyMatrix4(J){let Q=this.attributes.position;if(Q!==void 0)Q.applyMatrix4(J),Q.needsUpdate=!0;let Z=this.attributes.normal;if(Z!==void 0){let W=new nJ().getNormalMatrix(J);Z.applyNormalMatrix(W),Z.needsUpdate=!0}let $=this.attributes.tangent;if($!==void 0)$.transformDirection(J),$.needsUpdate=!0;if(this.boundingBox!==null)this.computeBoundingBox();if(this.boundingSphere!==null)this.computeBoundingSphere();return this}applyQuaternion(J){return C8.makeRotationFromQuaternion(J),this.applyMatrix4(C8),this}rotateX(J){return C8.makeRotationX(J),this.applyMatrix4(C8),this}rotateY(J){return C8.makeRotationY(J),this.applyMatrix4(C8),this}rotateZ(J){return C8.makeRotationZ(J),this.applyMatrix4(C8),this}translate(J,Q,Z){return C8.makeTranslation(J,Q,Z),this.applyMatrix4(C8),this}scale(J,Q,Z){return C8.makeScale(J,Q,Z),this.applyMatrix4(C8),this}lookAt(J){return IY.lookAt(J),IY.updateMatrix(),this.applyMatrix4(IY.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(s6).negate(),this.translate(s6.x,s6.y,s6.z),this}setFromPoints(J){let Q=this.getAttribute("position");if(Q===void 0){let Z=[];for(let $=0,W=J.length;$<W;$++){let Y=J[$];Z.push(Y.x,Y.y,Y.z||0)}this.setAttribute("position",new zJ(Z,3))}else{let Z=Math.min(J.length,Q.count);for(let $=0;$<Z;$++){let W=J[$];Q.setXYZ($,W.x,W.y,W.z||0)}if(J.length>Q.count)console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry.");Q.needsUpdate=!0}return this}computeBoundingBox(){if(this.boundingBox===null)this.boundingBox=new z0;let J=this.attributes.position,Q=this.morphAttributes.position;if(J&&J.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new I(-1/0,-1/0,-1/0),new I(1/0,1/0,1/0));return}if(J!==void 0){if(this.boundingBox.setFromBufferAttribute(J),Q)for(let Z=0,$=Q.length;Z<$;Z++){let W=Q[Z];if(q8.setFromBufferAttribute(W),this.morphTargetsRelative)y0.addVectors(this.boundingBox.min,q8.min),this.boundingBox.expandByPoint(y0),y0.addVectors(this.boundingBox.max,q8.max),this.boundingBox.expandByPoint(y0);else this.boundingBox.expandByPoint(q8.min),this.boundingBox.expandByPoint(q8.max)}}else this.boundingBox.makeEmpty();if(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){if(this.boundingSphere===null)this.boundingSphere=new A0;let J=this.attributes.position,Q=this.morphAttributes.position;if(J&&J.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new I,1/0);return}if(J){let Z=this.boundingSphere.center;if(q8.setFromBufferAttribute(J),Q)for(let W=0,Y=Q.length;W<Y;W++){let X=Q[W];if(u7.setFromBufferAttribute(X),this.morphTargetsRelative)y0.addVectors(q8.min,u7.min),q8.expandByPoint(y0),y0.addVectors(q8.max,u7.max),q8.expandByPoint(y0);else q8.expandByPoint(u7.min),q8.expandByPoint(u7.max)}q8.getCenter(Z);let $=0;for(let W=0,Y=J.count;W<Y;W++)y0.fromBufferAttribute(J,W),$=Math.max($,Z.distanceToSquared(y0));if(Q)for(let W=0,Y=Q.length;W<Y;W++){let X=Q[W],H=this.morphTargetsRelative;for(let K=0,G=X.count;K<G;K++){if(y0.fromBufferAttribute(X,K),H)s6.fromBufferAttribute(J,K),y0.add(s6);$=Math.max($,Z.distanceToSquared(y0))}}if(this.boundingSphere.radius=Math.sqrt($),isNaN(this.boundingSphere.radius))console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let J=this.index,Q=this.attributes;if(J===null||Q.position===void 0||Q.normal===void 0||Q.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let{position:Z,normal:$,uv:W}=Q;if(this.hasAttribute("tangent")===!1)this.setAttribute("tangent",new X0(new Float32Array(4*Z.count),4));let Y=this.getAttribute("tangent"),X=[],H=[];for(let w=0;w<Z.count;w++)X[w]=new I,H[w]=new I;let K=new I,G=new I,U=new I,E=new i,q=new i,N=new i,k=new I,V=new I;function R(w,v,L){K.fromBufferAttribute(Z,w),G.fromBufferAttribute(Z,v),U.fromBufferAttribute(Z,L),E.fromBufferAttribute(W,w),q.fromBufferAttribute(W,v),N.fromBufferAttribute(W,L),G.sub(K),U.sub(K),q.sub(E),N.sub(E);let _=1/(q.x*N.y-N.x*q.y);if(!isFinite(_))return;k.copy(G).multiplyScalar(N.y).addScaledVector(U,-q.y).multiplyScalar(_),V.copy(U).multiplyScalar(q.x).addScaledVector(G,-N.x).multiplyScalar(_),X[w].add(k),X[v].add(k),X[L].add(k),H[w].add(V),H[v].add(V),H[L].add(V)}let O=this.groups;if(O.length===0)O=[{start:0,count:J.count}];for(let w=0,v=O.length;w<v;++w){let L=O[w],_=L.start,j=L.count;for(let p=_,l=_+j;p<l;p+=3)R(J.getX(p+0),J.getX(p+1),J.getX(p+2))}let D=new I,F=new I,C=new I,P=new I;function M(w){C.fromBufferAttribute($,w),P.copy(C);let v=X[w];D.copy(v),D.sub(C.multiplyScalar(C.dot(v))).normalize(),F.crossVectors(P,v);let _=F.dot(H[w])<0?-1:1;Y.setXYZW(w,D.x,D.y,D.z,_)}for(let w=0,v=O.length;w<v;++w){let L=O[w],_=L.start,j=L.count;for(let p=_,l=_+j;p<l;p+=3)M(J.getX(p+0)),M(J.getX(p+1)),M(J.getX(p+2))}}computeVertexNormals(){let J=this.index,Q=this.getAttribute("position");if(Q!==void 0){let Z=this.getAttribute("normal");if(Z===void 0)Z=new X0(new Float32Array(Q.count*3),3),this.setAttribute("normal",Z);else for(let E=0,q=Z.count;E<q;E++)Z.setXYZ(E,0,0,0);let $=new I,W=new I,Y=new I,X=new I,H=new I,K=new I,G=new I,U=new I;if(J)for(let E=0,q=J.count;E<q;E+=3){let N=J.getX(E+0),k=J.getX(E+1),V=J.getX(E+2);$.fromBufferAttribute(Q,N),W.fromBufferAttribute(Q,k),Y.fromBufferAttribute(Q,V),G.subVectors(Y,W),U.subVectors($,W),G.cross(U),X.fromBufferAttribute(Z,N),H.fromBufferAttribute(Z,k),K.fromBufferAttribute(Z,V),X.add(G),H.add(G),K.add(G),Z.setXYZ(N,X.x,X.y,X.z),Z.setXYZ(k,H.x,H.y,H.z),Z.setXYZ(V,K.x,K.y,K.z)}else for(let E=0,q=Q.count;E<q;E+=3)$.fromBufferAttribute(Q,E+0),W.fromBufferAttribute(Q,E+1),Y.fromBufferAttribute(Q,E+2),G.subVectors(Y,W),U.subVectors($,W),G.cross(U),Z.setXYZ(E+0,G.x,G.y,G.z),Z.setXYZ(E+1,G.x,G.y,G.z),Z.setXYZ(E+2,G.x,G.y,G.z);this.normalizeNormals(),Z.needsUpdate=!0}}normalizeNormals(){let J=this.attributes.normal;for(let Q=0,Z=J.count;Q<Z;Q++)y0.fromBufferAttribute(J,Q),y0.normalize(),J.setXYZ(Q,y0.x,y0.y,y0.z)}toNonIndexed(){function J(X,H){let{array:K,itemSize:G,normalized:U}=X,E=new K.constructor(H.length*G),q=0,N=0;for(let k=0,V=H.length;k<V;k++){if(X.isInterleavedBufferAttribute)q=H[k]*X.data.stride+X.offset;else q=H[k]*G;for(let R=0;R<G;R++)E[N++]=K[q++]}return new X0(E,G,U)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let Q=new gJ,Z=this.index.array,$=this.attributes;for(let X in $){let H=$[X],K=J(H,Z);Q.setAttribute(X,K)}let W=this.morphAttributes;for(let X in W){let H=[],K=W[X];for(let G=0,U=K.length;G<U;G++){let E=K[G],q=J(E,Z);H.push(q)}Q.morphAttributes[X]=H}Q.morphTargetsRelative=this.morphTargetsRelative;let Y=this.groups;for(let X=0,H=Y.length;X<H;X++){let K=Y[X];Q.addGroup(K.start,K.count,K.materialIndex)}return Q}toJSON(){let J={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(J.uuid=this.uuid,J.type=this.type,this.name!=="")J.name=this.name;if(Object.keys(this.userData).length>0)J.userData=this.userData;if(this.parameters!==void 0){let H=this.parameters;for(let K in H)if(H[K]!==void 0)J[K]=H[K];return J}J.data={attributes:{}};let Q=this.index;if(Q!==null)J.data.index={type:Q.array.constructor.name,array:Array.prototype.slice.call(Q.array)};let Z=this.attributes;for(let H in Z){let K=Z[H];J.data.attributes[H]=K.toJSON(J.data)}let $={},W=!1;for(let H in this.morphAttributes){let K=this.morphAttributes[H],G=[];for(let U=0,E=K.length;U<E;U++){let q=K[U];G.push(q.toJSON(J.data))}if(G.length>0)$[H]=G,W=!0}if(W)J.data.morphAttributes=$,J.data.morphTargetsRelative=this.morphTargetsRelative;let Y=this.groups;if(Y.length>0)J.data.groups=JSON.parse(JSON.stringify(Y));let X=this.boundingSphere;if(X!==null)J.data.boundingSphere={center:X.center.toArray(),radius:X.radius};return J}clone(){return new this.constructor().copy(this)}copy(J){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let Q={};this.name=J.name;let Z=J.index;if(Z!==null)this.setIndex(Z.clone(Q));let $=J.attributes;for(let K in $){let G=$[K];this.setAttribute(K,G.clone(Q))}let W=J.morphAttributes;for(let K in W){let G=[],U=W[K];for(let E=0,q=U.length;E<q;E++)G.push(U[E].clone(Q));this.morphAttributes[K]=G}this.morphTargetsRelative=J.morphTargetsRelative;let Y=J.groups;for(let K=0,G=Y.length;K<G;K++){let U=Y[K];this.addGroup(U.start,U.count,U.materialIndex)}let X=J.boundingBox;if(X!==null)this.boundingBox=X.clone();let H=J.boundingSphere;if(H!==null)this.boundingSphere=H.clone();return this.drawRange.start=J.drawRange.start,this.drawRange.count=J.drawRange.count,this.userData=J.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}var oK=/*@__PURE__*/new SJ,c9=/*@__PURE__*/new b9,TZ=/*@__PURE__*/new A0,aK=/*@__PURE__*/new I,SZ=/*@__PURE__*/new I,jZ=/*@__PURE__*/new I,vZ=/*@__PURE__*/new I,wY=/*@__PURE__*/new I,yZ=/*@__PURE__*/new I,rK=/*@__PURE__*/new I,xZ=/*@__PURE__*/new I;class N0 extends $0{constructor(J=new gJ,Q=new b0){super();this.isMesh=!0,this.type="Mesh",this.geometry=J,this.material=Q,this.updateMorphTargets()}copy(J,Q){if(super.copy(J,Q),J.morphTargetInfluences!==void 0)this.morphTargetInfluences=J.morphTargetInfluences.slice();if(J.morphTargetDictionary!==void 0)this.morphTargetDictionary=Object.assign({},J.morphTargetDictionary);return this.material=Array.isArray(J.material)?J.material.slice():J.material,this.geometry=J.geometry,this}updateMorphTargets(){let Q=this.geometry.morphAttributes,Z=Object.keys(Q);if(Z.length>0){let $=Q[Z[0]];if($!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let W=0,Y=$.length;W<Y;W++){let X=$[W].name||String(W);this.morphTargetInfluences.push(0),this.morphTargetDictionary[X]=W}}}}getVertexPosition(J,Q){let Z=this.geometry,$=Z.attributes.position,W=Z.morphAttributes.position,Y=Z.morphTargetsRelative;Q.fromBufferAttribute($,J);let X=this.morphTargetInfluences;if(W&&X){yZ.set(0,0,0);for(let H=0,K=W.length;H<K;H++){let G=X[H],U=W[H];if(G===0)continue;if(wY.fromBufferAttribute(U,J),Y)yZ.addScaledVector(wY,G);else yZ.addScaledVector(wY.sub(Q),G)}Q.add(yZ)}return Q}raycast(J,Q){let Z=this.geometry,$=this.material,W=this.matrixWorld;if($===void 0)return;if(Z.boundingSphere===null)Z.computeBoundingSphere();if(TZ.copy(Z.boundingSphere),TZ.applyMatrix4(W),c9.copy(J.ray).recast(J.near),TZ.containsPoint(c9.origin)===!1){if(c9.intersectSphere(TZ,aK)===null)return;if(c9.origin.distanceToSquared(aK)>(J.far-J.near)**2)return}if(oK.copy(W).invert(),c9.copy(J.ray).applyMatrix4(oK),Z.boundingBox!==null){if(c9.intersectsBox(Z.boundingBox)===!1)return}this._computeIntersections(J,Q,c9)}_computeIntersections(J,Q,Z){let $,W=this.geometry,Y=this.material,X=W.index,H=W.attributes.position,K=W.attributes.uv,G=W.attributes.uv1,U=W.attributes.normal,E=W.groups,q=W.drawRange;if(X!==null)if(Array.isArray(Y))for(let N=0,k=E.length;N<k;N++){let V=E[N],R=Y[V.materialIndex],O=Math.max(V.start,q.start),D=Math.min(X.count,Math.min(V.start+V.count,q.start+q.count));for(let F=O,C=D;F<C;F+=3){let P=X.getX(F),M=X.getX(F+1),w=X.getX(F+2);if($=bZ(this,R,J,Z,K,G,U,P,M,w),$)$.faceIndex=Math.floor(F/3),$.face.materialIndex=V.materialIndex,Q.push($)}}else{let N=Math.max(0,q.start),k=Math.min(X.count,q.start+q.count);for(let V=N,R=k;V<R;V+=3){let O=X.getX(V),D=X.getX(V+1),F=X.getX(V+2);if($=bZ(this,Y,J,Z,K,G,U,O,D,F),$)$.faceIndex=Math.floor(V/3),Q.push($)}}else if(H!==void 0)if(Array.isArray(Y))for(let N=0,k=E.length;N<k;N++){let V=E[N],R=Y[V.materialIndex],O=Math.max(V.start,q.start),D=Math.min(H.count,Math.min(V.start+V.count,q.start+q.count));for(let F=O,C=D;F<C;F+=3){let P=F,M=F+1,w=F+2;if($=bZ(this,R,J,Z,K,G,U,P,M,w),$)$.faceIndex=Math.floor(F/3),$.face.materialIndex=V.materialIndex,Q.push($)}}else{let N=Math.max(0,q.start),k=Math.min(H.count,q.start+q.count);for(let V=N,R=k;V<R;V+=3){let O=V,D=V+1,F=V+2;if($=bZ(this,Y,J,Z,K,G,U,O,D,F),$)$.faceIndex=Math.floor(V/3),Q.push($)}}}}function r5(J,Q,Z,$,W,Y,X,H){let K;if(Q.side===1)K=$.intersectTriangle(X,Y,W,!0,H);else K=$.intersectTriangle(W,Y,X,Q.side===0,H);if(K===null)return null;xZ.copy(H),xZ.applyMatrix4(J.matrixWorld);let G=Z.ray.origin.distanceTo(xZ);if(G<Z.near||G>Z.far)return null;return{distance:G,point:xZ.clone(),object:J}}function bZ(J,Q,Z,$,W,Y,X,H,K,G){J.getVertexPosition(H,SZ),J.getVertexPosition(K,jZ),J.getVertexPosition(G,vZ);let U=r5(J,Q,Z,$,SZ,jZ,vZ,rK);if(U){let E=new I;if(r0.getBarycoord(rK,SZ,jZ,vZ,E),W)U.uv=r0.getInterpolatedAttribute(W,H,K,G,E,new i);if(Y)U.uv1=r0.getInterpolatedAttribute(Y,H,K,G,E,new i);if(X){if(U.normal=r0.getInterpolatedAttribute(X,H,K,G,E,new I),U.normal.dot($.direction)>0)U.normal.multiplyScalar(-1)}let q={a:H,b:K,c:G,normal:new I,materialIndex:0};r0.getNormal(SZ,jZ,vZ,q.normal),U.face=q,U.barycoord=E}return U}class h9 extends gJ{constructor(J=1,Q=1,Z=1,$=1,W=1,Y=1){super();this.type="BoxGeometry",this.parameters={width:J,height:Q,depth:Z,widthSegments:$,heightSegments:W,depthSegments:Y};let X=this;$=Math.floor($),W=Math.floor(W),Y=Math.floor(Y);let H=[],K=[],G=[],U=[],E=0,q=0;N("z","y","x",-1,-1,Z,Q,J,Y,W,0),N("z","y","x",1,-1,Z,Q,-J,Y,W,1),N("x","z","y",1,1,J,Z,Q,$,Y,2),N("x","z","y",1,-1,J,Z,-Q,$,Y,3),N("x","y","z",1,-1,J,Q,Z,$,W,4),N("x","y","z",-1,-1,J,Q,-Z,$,W,5),this.setIndex(H),this.setAttribute("position",new zJ(K,3)),this.setAttribute("normal",new zJ(G,3)),this.setAttribute("uv",new zJ(U,2));function N(k,V,R,O,D,F,C,P,M,w,v){let L=F/M,_=C/w,j=F/2,p=C/2,l=P/2,c=M+1,r=w+1,n=0,WJ=0,d=new I;for(let RJ=0;RJ<r;RJ++){let NJ=RJ*_-p;for(let hJ=0;hJ<c;hJ++){let eJ=hJ*L-j;d[k]=eJ*O,d[V]=NJ*D,d[R]=l,K.push(d.x,d.y,d.z),d[k]=0,d[V]=0,d[R]=P>0?1:-1,G.push(d.x,d.y,d.z),U.push(hJ/M),U.push(1-RJ/w),n+=1}}for(let RJ=0;RJ<w;RJ++)for(let NJ=0;NJ<M;NJ++){let hJ=E+NJ+c*RJ,eJ=E+NJ+c*(RJ+1),o=E+(NJ+1)+c*(RJ+1),UJ=E+(NJ+1)+c*RJ;H.push(hJ,eJ,UJ),H.push(eJ,o,UJ),WJ+=6}X.addGroup(q,WJ,v),q+=WJ,E+=n}}copy(J){return super.copy(J),this.parameters=Object.assign({},J.parameters),this}static fromJSON(J){return new h9(J.width,J.height,J.depth,J.widthSegments,J.heightSegments,J.depthSegments)}}function B6(J){let Q={};for(let Z in J){Q[Z]={};for(let $ in J[Z]){let W=J[Z][$];if(W&&(W.isColor||W.isMatrix3||W.isMatrix4||W.isVector2||W.isVector3||W.isVector4||W.isTexture||W.isQuaternion))if(W.isRenderTargetTexture)console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),Q[Z][$]=null;else Q[Z][$]=W.clone();else if(Array.isArray(W))Q[Z][$]=W.slice();else Q[Z][$]=W}}return Q}function s0(J){let Q={};for(let Z=0;Z<J.length;Z++){let $=B6(J[Z]);for(let W in $)Q[W]=$[W]}return Q}function t5(J){let Q=[];for(let Z=0;Z<J.length;Z++)Q.push(J[Z].clone());return Q}function iX(J){let Q=J.getRenderTarget();if(Q===null)return J.outputColorSpace;if(Q.isXRRenderTarget===!0)return Q.texture.colorSpace;return aJ.workingColorSpace}var oX={clone:B6,merge:s0},e5=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,JN=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class l0 extends C0{constructor(J){super();if(this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=e5,this.fragmentShader=JN,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,J!==void 0)this.setValues(J)}copy(J){return super.copy(J),this.fragmentShader=J.fragmentShader,this.vertexShader=J.vertexShader,this.uniforms=B6(J.uniforms),this.uniformsGroups=t5(J.uniformsGroups),this.defines=Object.assign({},J.defines),this.wireframe=J.wireframe,this.wireframeLinewidth=J.wireframeLinewidth,this.fog=J.fog,this.lights=J.lights,this.clipping=J.clipping,this.extensions=Object.assign({},J.extensions),this.glslVersion=J.glslVersion,this}toJSON(J){let Q=super.toJSON(J);Q.glslVersion=this.glslVersion,Q.uniforms={};for(let $ in this.uniforms){let Y=this.uniforms[$].value;if(Y&&Y.isTexture)Q.uniforms[$]={type:"t",value:Y.toJSON(J).uuid};else if(Y&&Y.isColor)Q.uniforms[$]={type:"c",value:Y.getHex()};else if(Y&&Y.isVector2)Q.uniforms[$]={type:"v2",value:Y.toArray()};else if(Y&&Y.isVector3)Q.uniforms[$]={type:"v3",value:Y.toArray()};else if(Y&&Y.isVector4)Q.uniforms[$]={type:"v4",value:Y.toArray()};else if(Y&&Y.isMatrix3)Q.uniforms[$]={type:"m3",value:Y.toArray()};else if(Y&&Y.isMatrix4)Q.uniforms[$]={type:"m4",value:Y.toArray()};else Q.uniforms[$]={value:Y}}if(Object.keys(this.defines).length>0)Q.defines=this.defines;Q.vertexShader=this.vertexShader,Q.fragmentShader=this.fragmentShader,Q.lights=this.lights,Q.clipping=this.clipping;let Z={};for(let $ in this.extensions)if(this.extensions[$]===!0)Z[$]=!0;if(Object.keys(Z).length>0)Q.extensions=Z;return Q}}class k7 extends $0{constructor(){super();this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new SJ,this.projectionMatrix=new SJ,this.projectionMatrixInverse=new SJ,this.coordinateSystem=2000}copy(J,Q){return super.copy(J,Q),this.matrixWorldInverse.copy(J.matrixWorldInverse),this.projectionMatrix.copy(J.projectionMatrix),this.projectionMatrixInverse.copy(J.projectionMatrixInverse),this.coordinateSystem=J.coordinateSystem,this}getWorldDirection(J){return super.getWorldDirection(J).negate()}updateMatrixWorld(J){super.updateMatrixWorld(J),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(J,Q){super.updateWorldMatrix(J,Q),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}var T9=/*@__PURE__*/new I,tK=/*@__PURE__*/new i,eK=/*@__PURE__*/new i;class O0 extends k7{constructor(J=50,Q=1,Z=0.1,$=2000){super();this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=J,this.zoom=1,this.near=Z,this.far=$,this.focus=10,this.aspect=Q,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(J,Q){return super.copy(J,Q),this.fov=J.fov,this.zoom=J.zoom,this.near=J.near,this.far=J.far,this.focus=J.focus,this.aspect=J.aspect,this.view=J.view===null?null:Object.assign({},J.view),this.filmGauge=J.filmGauge,this.filmOffset=J.filmOffset,this}setFocalLength(J){let Q=0.5*this.getFilmHeight()/J;this.fov=Z6*2*Math.atan(Q),this.updateProjectionMatrix()}getFocalLength(){let J=Math.tan(Q6*0.5*this.fov);return 0.5*this.getFilmHeight()/J}getEffectiveFOV(){return Z6*2*Math.atan(Math.tan(Q6*0.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(J,Q,Z){T9.set(-1,-1,0.5).applyMatrix4(this.projectionMatrixInverse),Q.set(T9.x,T9.y).multiplyScalar(-J/T9.z),T9.set(1,1,0.5).applyMatrix4(this.projectionMatrixInverse),Z.set(T9.x,T9.y).multiplyScalar(-J/T9.z)}getViewSize(J,Q){return this.getViewBounds(J,tK,eK),Q.subVectors(eK,tK)}setViewOffset(J,Q,Z,$,W,Y){if(this.aspect=J/Q,this.view===null)this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1};this.view.enabled=!0,this.view.fullWidth=J,this.view.fullHeight=Q,this.view.offsetX=Z,this.view.offsetY=$,this.view.width=W,this.view.height=Y,this.updateProjectionMatrix()}clearViewOffset(){if(this.view!==null)this.view.enabled=!1;this.updateProjectionMatrix()}updateProjectionMatrix(){let J=this.near,Q=J*Math.tan(Q6*0.5*this.fov)/this.zoom,Z=2*Q,$=this.aspect*Z,W=-0.5*$,Y=this.view;if(this.view!==null&&this.view.enabled){let{fullWidth:H,fullHeight:K}=Y;W+=Y.offsetX*$/H,Q-=Y.offsetY*Z/K,$*=Y.width/H,Z*=Y.height/K}let X=this.filmOffset;if(X!==0)W+=J*X/this.getFilmWidth();this.projectionMatrix.makePerspective(W,W+$,Q,Q-Z,J,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(J){let Q=super.toJSON(J);if(Q.object.fov=this.fov,Q.object.zoom=this.zoom,Q.object.near=this.near,Q.object.far=this.far,Q.object.focus=this.focus,Q.object.aspect=this.aspect,this.view!==null)Q.object.view=Object.assign({},this.view);return Q.object.filmGauge=this.filmGauge,Q.object.filmOffset=this.filmOffset,Q}}var i6=-90,o6=1;class ZW extends $0{constructor(J,Q,Z){super();this.type="CubeCamera",this.renderTarget=Z,this.coordinateSystem=null,this.activeMipmapLevel=0;let $=new O0(i6,o6,J,Q);$.layers=this.layers,this.add($);let W=new O0(i6,o6,J,Q);W.layers=this.layers,this.add(W);let Y=new O0(i6,o6,J,Q);Y.layers=this.layers,this.add(Y);let X=new O0(i6,o6,J,Q);X.layers=this.layers,this.add(X);let H=new O0(i6,o6,J,Q);H.layers=this.layers,this.add(H);let K=new O0(i6,o6,J,Q);K.layers=this.layers,this.add(K)}updateCoordinateSystem(){let J=this.coordinateSystem,Q=this.children.concat(),[Z,$,W,Y,X,H]=Q;for(let K of Q)this.remove(K);if(J===2000)Z.up.set(0,1,0),Z.lookAt(1,0,0),$.up.set(0,1,0),$.lookAt(-1,0,0),W.up.set(0,0,-1),W.lookAt(0,1,0),Y.up.set(0,0,1),Y.lookAt(0,-1,0),X.up.set(0,1,0),X.lookAt(0,0,1),H.up.set(0,1,0),H.lookAt(0,0,-1);else if(J===2001)Z.up.set(0,-1,0),Z.lookAt(-1,0,0),$.up.set(0,-1,0),$.lookAt(1,0,0),W.up.set(0,0,1),W.lookAt(0,1,0),Y.up.set(0,0,-1),Y.lookAt(0,-1,0),X.up.set(0,-1,0),X.lookAt(0,0,1),H.up.set(0,-1,0),H.lookAt(0,0,-1);else throw Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+J);for(let K of Q)this.add(K),K.updateMatrixWorld()}update(J,Q){if(this.parent===null)this.updateMatrixWorld();let{renderTarget:Z,activeMipmapLevel:$}=this;if(this.coordinateSystem!==J.coordinateSystem)this.coordinateSystem=J.coordinateSystem,this.updateCoordinateSystem();let[W,Y,X,H,K,G]=this.children,U=J.getRenderTarget(),E=J.getActiveCubeFace(),q=J.getActiveMipmapLevel(),N=J.xr.enabled;J.xr.enabled=!1;let k=Z.texture.generateMipmaps;Z.texture.generateMipmaps=!1,J.setRenderTarget(Z,0,$),J.render(Q,W),J.setRenderTarget(Z,1,$),J.render(Q,Y),J.setRenderTarget(Z,2,$),J.render(Q,X),J.setRenderTarget(Z,3,$),J.render(Q,H),J.setRenderTarget(Z,4,$),J.render(Q,K),Z.texture.generateMipmaps=k,J.setRenderTarget(Z,5,$),J.render(Q,G),J.setRenderTarget(U,E,q),J.xr.enabled=N,Z.texture.needsPMREMUpdate=!0}}class L6 extends R0{constructor(J,Q,Z,$,W,Y,X,H,K,G){J=J!==void 0?J:[],Q=Q!==void 0?Q:301;super(J,Q,Z,$,W,Y,X,H,K,G);this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(J){this.image=J}}class $W extends H8{constructor(J=1,Q={}){super(J,J,Q);this.isWebGLCubeRenderTarget=!0;let Z={width:J,height:J,depth:1},$=[Z,Z,Z,Z,Z,Z];this.texture=new L6($,Q.mapping,Q.wrapS,Q.wrapT,Q.magFilter,Q.minFilter,Q.format,Q.type,Q.anisotropy,Q.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=Q.generateMipmaps!==void 0?Q.generateMipmaps:!1,this.texture.minFilter=Q.minFilter!==void 0?Q.minFilter:1006}fromEquirectangularTexture(J,Q){this.texture.type=Q.type,this.texture.colorSpace=Q.colorSpace,this.texture.generateMipmaps=Q.generateMipmaps,this.texture.minFilter=Q.minFilter,this.texture.magFilter=Q.magFilter;let Z={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},$=new h9(5,5,5),W=new l0({name:"CubemapFromEquirect",uniforms:B6(Z.uniforms),vertexShader:Z.vertexShader,fragmentShader:Z.fragmentShader,side:1,blending:0});W.uniforms.tEquirect.value=Q;let Y=new N0($,W),X=Q.minFilter;if(Q.minFilter===1008)Q.minFilter=1006;return new ZW(1,10,this).update(J,Y),Q.minFilter=X,Y.geometry.dispose(),Y.material.dispose(),this}clear(J,Q,Z,$){let W=J.getRenderTarget();for(let Y=0;Y<6;Y++)J.setRenderTarget(this,Y),J.clear(Q,Z,$);J.setRenderTarget(W)}}class $8 extends $0{constructor(){super();this.isGroup=!0,this.type="Group"}}var QN={type:"move"};class V7{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){if(this._hand===null)this._hand=new $8,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1};return this._hand}getTargetRaySpace(){if(this._targetRay===null)this._targetRay=new $8,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new I,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new I;return this._targetRay}getGripSpace(){if(this._grip===null)this._grip=new $8,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new I,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new I;return this._grip}dispatchEvent(J){if(this._targetRay!==null)this._targetRay.dispatchEvent(J);if(this._grip!==null)this._grip.dispatchEvent(J);if(this._hand!==null)this._hand.dispatchEvent(J);return this}connect(J){if(J&&J.hand){let Q=this._hand;if(Q)for(let Z of J.hand.values())this._getHandJoint(Q,Z)}return this.dispatchEvent({type:"connected",data:J}),this}disconnect(J){if(this.dispatchEvent({type:"disconnected",data:J}),this._targetRay!==null)this._targetRay.visible=!1;if(this._grip!==null)this._grip.visible=!1;if(this._hand!==null)this._hand.visible=!1;return this}update(J,Q,Z){let $=null,W=null,Y=null,X=this._targetRay,H=this._grip,K=this._hand;if(J&&Q.session.visibilityState!=="visible-blurred"){if(K&&J.hand){Y=!0;for(let k of J.hand.values()){let V=Q.getJointPose(k,Z),R=this._getHandJoint(K,k);if(V!==null)R.matrix.fromArray(V.transform.matrix),R.matrix.decompose(R.position,R.rotation,R.scale),R.matrixWorldNeedsUpdate=!0,R.jointRadius=V.radius;R.visible=V!==null}let G=K.joints["index-finger-tip"],U=K.joints["thumb-tip"],E=G.position.distanceTo(U.position),q=0.02,N=0.005;if(K.inputState.pinching&&E>q+N)K.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:J.handedness,target:this});else if(!K.inputState.pinching&&E<=q-N)K.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:J.handedness,target:this})}else if(H!==null&&J.gripSpace){if(W=Q.getPose(J.gripSpace,Z),W!==null){if(H.matrix.fromArray(W.transform.matrix),H.matrix.decompose(H.position,H.rotation,H.scale),H.matrixWorldNeedsUpdate=!0,W.linearVelocity)H.hasLinearVelocity=!0,H.linearVelocity.copy(W.linearVelocity);else H.hasLinearVelocity=!1;if(W.angularVelocity)H.hasAngularVelocity=!0,H.angularVelocity.copy(W.angularVelocity);else H.hasAngularVelocity=!1}}if(X!==null){if($=Q.getPose(J.targetRaySpace,Z),$===null&&W!==null)$=W;if($!==null){if(X.matrix.fromArray($.transform.matrix),X.matrix.decompose(X.position,X.rotation,X.scale),X.matrixWorldNeedsUpdate=!0,$.linearVelocity)X.hasLinearVelocity=!0,X.linearVelocity.copy($.linearVelocity);else X.hasLinearVelocity=!1;if($.angularVelocity)X.hasAngularVelocity=!0,X.angularVelocity.copy($.angularVelocity);else X.hasAngularVelocity=!1;this.dispatchEvent(QN)}}}if(X!==null)X.visible=$!==null;if(H!==null)H.visible=W!==null;if(K!==null)K.visible=Y!==null;return this}_getHandJoint(J,Q){if(J.joints[Q.jointName]===void 0){let Z=new $8;Z.matrixAutoUpdate=!1,Z.visible=!1,J.joints[Q.jointName]=Z,J.add(Z)}return J.joints[Q.jointName]}}class wQ{constructor(J,Q=0.00025){this.isFogExp2=!0,this.name="",this.color=new u(J),this.density=Q}clone(){return new wQ(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class AQ{constructor(J,Q=1,Z=1000){this.isFog=!0,this.name="",this.color=new u(J),this.near=Q,this.far=Z}clone(){return new AQ(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class k9 extends $0{constructor(){super();if(this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new W8,this.environmentIntensity=1,this.environmentRotation=new W8,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u")__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(J,Q){if(super.copy(J,Q),J.background!==null)this.background=J.background.clone();if(J.environment!==null)this.environment=J.environment.clone();if(J.fog!==null)this.fog=J.fog.clone();if(this.backgroundBlurriness=J.backgroundBlurriness,this.backgroundIntensity=J.backgroundIntensity,this.backgroundRotation.copy(J.backgroundRotation),this.environmentIntensity=J.environmentIntensity,this.environmentRotation.copy(J.environmentRotation),J.overrideMaterial!==null)this.overrideMaterial=J.overrideMaterial.clone();return this.matrixAutoUpdate=J.matrixAutoUpdate,this}toJSON(J){let Q=super.toJSON(J);if(this.fog!==null)Q.object.fog=this.fog.toJSON();if(this.backgroundBlurriness>0)Q.object.backgroundBlurriness=this.backgroundBlurriness;if(this.backgroundIntensity!==1)Q.object.backgroundIntensity=this.backgroundIntensity;if(Q.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1)Q.object.environmentIntensity=this.environmentIntensity;return Q.object.environmentRotation=this.environmentRotation.toArray(),Q}}class g8{constructor(J,Q){this.isInterleavedBuffer=!0,this.array=J,this.stride=Q,this.count=J!==void 0?J.length/Q:0,this.usage=35044,this.updateRanges=[],this.version=0,this.uuid=N8()}onUploadCallback(){}set needsUpdate(J){if(J===!0)this.version++}setUsage(J){return this.usage=J,this}addUpdateRange(J,Q){this.updateRanges.push({start:J,count:Q})}clearUpdateRanges(){this.updateRanges.length=0}copy(J){return this.array=new J.array.constructor(J.array),this.count=J.count,this.stride=J.stride,this.usage=J.usage,this}copyAt(J,Q,Z){J*=this.stride,Z*=Q.stride;for(let $=0,W=this.stride;$<W;$++)this.array[J+$]=Q.array[Z+$];return this}set(J,Q=0){return this.array.set(J,Q),this}clone(J){if(J.arrayBuffers===void 0)J.arrayBuffers={};if(this.array.buffer._uuid===void 0)this.array.buffer._uuid=N8();if(J.arrayBuffers[this.array.buffer._uuid]===void 0)J.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer;let Q=new this.array.constructor(J.arrayBuffers[this.array.buffer._uuid]),Z=new this.constructor(Q,this.stride);return Z.setUsage(this.usage),Z}onUpload(J){return this.onUploadCallback=J,this}toJSON(J){if(J.arrayBuffers===void 0)J.arrayBuffers={};if(this.array.buffer._uuid===void 0)this.array.buffer._uuid=N8();if(J.arrayBuffers[this.array.buffer._uuid]===void 0)J.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer));return{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}var o0=/*@__PURE__*/new I;class O8{constructor(J,Q,Z,$=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=J,this.itemSize=Q,this.offset=Z,this.normalized=$}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(J){this.data.needsUpdate=J}applyMatrix4(J){for(let Q=0,Z=this.data.count;Q<Z;Q++)o0.fromBufferAttribute(this,Q),o0.applyMatrix4(J),this.setXYZ(Q,o0.x,o0.y,o0.z);return this}applyNormalMatrix(J){for(let Q=0,Z=this.count;Q<Z;Q++)o0.fromBufferAttribute(this,Q),o0.applyNormalMatrix(J),this.setXYZ(Q,o0.x,o0.y,o0.z);return this}transformDirection(J){for(let Q=0,Z=this.count;Q<Z;Q++)o0.fromBufferAttribute(this,Q),o0.transformDirection(J),this.setXYZ(Q,o0.x,o0.y,o0.z);return this}getComponent(J,Q){let Z=this.array[J*this.data.stride+this.offset+Q];if(this.normalized)Z=a0(Z,this.array);return Z}setComponent(J,Q,Z){if(this.normalized)Z=iJ(Z,this.array);return this.data.array[J*this.data.stride+this.offset+Q]=Z,this}setX(J,Q){if(this.normalized)Q=iJ(Q,this.array);return this.data.array[J*this.data.stride+this.offset]=Q,this}setY(J,Q){if(this.normalized)Q=iJ(Q,this.array);return this.data.array[J*this.data.stride+this.offset+1]=Q,this}setZ(J,Q){if(this.normalized)Q=iJ(Q,this.array);return this.data.array[J*this.data.stride+this.offset+2]=Q,this}setW(J,Q){if(this.normalized)Q=iJ(Q,this.array);return this.data.array[J*this.data.stride+this.offset+3]=Q,this}getX(J){let Q=this.data.array[J*this.data.stride+this.offset];if(this.normalized)Q=a0(Q,this.array);return Q}getY(J){let Q=this.data.array[J*this.data.stride+this.offset+1];if(this.normalized)Q=a0(Q,this.array);return Q}getZ(J){let Q=this.data.array[J*this.data.stride+this.offset+2];if(this.normalized)Q=a0(Q,this.array);return Q}getW(J){let Q=this.data.array[J*this.data.stride+this.offset+3];if(this.normalized)Q=a0(Q,this.array);return Q}setXY(J,Q,Z){if(J=J*this.data.stride+this.offset,this.normalized)Q=iJ(Q,this.array),Z=iJ(Z,this.array);return this.data.array[J+0]=Q,this.data.array[J+1]=Z,this}setXYZ(J,Q,Z,$){if(J=J*this.data.stride+this.offset,this.normalized)Q=iJ(Q,this.array),Z=iJ(Z,this.array),$=iJ($,this.array);return this.data.array[J+0]=Q,this.data.array[J+1]=Z,this.data.array[J+2]=$,this}setXYZW(J,Q,Z,$,W){if(J=J*this.data.stride+this.offset,this.normalized)Q=iJ(Q,this.array),Z=iJ(Z,this.array),$=iJ($,this.array),W=iJ(W,this.array);return this.data.array[J+0]=Q,this.data.array[J+1]=Z,this.data.array[J+2]=$,this.data.array[J+3]=W,this}clone(J){if(J===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let Q=[];for(let Z=0;Z<this.count;Z++){let $=Z*this.data.stride+this.offset;for(let W=0;W<this.itemSize;W++)Q.push(this.data.array[$+W])}return new X0(new this.array.constructor(Q),this.itemSize,this.normalized)}else{if(J.interleavedBuffers===void 0)J.interleavedBuffers={};if(J.interleavedBuffers[this.data.uuid]===void 0)J.interleavedBuffers[this.data.uuid]=this.data.clone(J);return new O8(J.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}}toJSON(J){if(J===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let Q=[];for(let Z=0;Z<this.count;Z++){let $=Z*this.data.stride+this.offset;for(let W=0;W<this.itemSize;W++)Q.push(this.data.array[$+W])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:Q,normalized:this.normalized}}else{if(J.interleavedBuffers===void 0)J.interleavedBuffers={};if(J.interleavedBuffers[this.data.uuid]===void 0)J.interleavedBuffers[this.data.uuid]=this.data.toJSON(J);return{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}}class PQ extends C0{constructor(J){super();this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new u(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(J)}copy(J){return super.copy(J),this.color.copy(J.color),this.map=J.map,this.alphaMap=J.alphaMap,this.rotation=J.rotation,this.sizeAttenuation=J.sizeAttenuation,this.fog=J.fog,this}}var a6,d7=/*@__PURE__*/new I,r6=/*@__PURE__*/new I,t6=/*@__PURE__*/new I,e6=/*@__PURE__*/new i,c7=/*@__PURE__*/new i,sU=/*@__PURE__*/new SJ,hZ=/*@__PURE__*/new I,n7=/*@__PURE__*/new I,fZ=/*@__PURE__*/new I,JG=/*@__PURE__*/new i,AY=/*@__PURE__*/new i,QG=/*@__PURE__*/new i;class WW extends $0{constructor(J=new PQ){super();if(this.isSprite=!0,this.type="Sprite",a6===void 0){a6=new gJ;let Q=new Float32Array([-0.5,-0.5,0,0,0,0.5,-0.5,0,1,0,0.5,0.5,0,1,1,-0.5,0.5,0,0,1]),Z=new g8(Q,5);a6.setIndex([0,1,2,0,2,3]),a6.setAttribute("position",new O8(Z,3,0,!1)),a6.setAttribute("uv",new O8(Z,2,3,!1))}this.geometry=a6,this.material=J,this.center=new i(0.5,0.5)}raycast(J,Q){if(J.camera===null)console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.');if(r6.setFromMatrixScale(this.matrixWorld),sU.copy(J.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(J.camera.matrixWorldInverse,this.matrixWorld),t6.setFromMatrixPosition(this.modelViewMatrix),J.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1)r6.multiplyScalar(-t6.z);let Z=this.material.rotation,$,W;if(Z!==0)W=Math.cos(Z),$=Math.sin(Z);let Y=this.center;gZ(hZ.set(-0.5,-0.5,0),t6,Y,r6,$,W),gZ(n7.set(0.5,-0.5,0),t6,Y,r6,$,W),gZ(fZ.set(0.5,0.5,0),t6,Y,r6,$,W),JG.set(0,0),AY.set(1,0),QG.set(1,1);let X=J.ray.intersectTriangle(hZ,n7,fZ,!1,d7);if(X===null){if(gZ(n7.set(-0.5,0.5,0),t6,Y,r6,$,W),AY.set(0,1),X=J.ray.intersectTriangle(hZ,fZ,n7,!1,d7),X===null)return}let H=J.ray.origin.distanceTo(d7);if(H<J.near||H>J.far)return;Q.push({distance:H,point:d7.clone(),uv:r0.getInterpolation(d7,hZ,n7,fZ,JG,AY,QG,new i),face:null,object:this})}copy(J,Q){if(super.copy(J,Q),J.center!==void 0)this.center.copy(J.center);return this.material=J.material,this}}function gZ(J,Q,Z,$,W,Y){if(e6.subVectors(J,Z).addScalar(0.5).multiply($),W!==void 0)c7.x=Y*e6.x-W*e6.y,c7.y=W*e6.x+Y*e6.y;else c7.copy(e6);J.copy(Q),J.x+=c7.x,J.y+=c7.y,J.applyMatrix4(sU)}var pZ=/*@__PURE__*/new I,ZG=/*@__PURE__*/new I;class YW extends $0{constructor(){super();this._currentLevel=0,this.type="LOD",Object.defineProperties(this,{levels:{enumerable:!0,value:[]},isLOD:{value:!0}}),this.autoUpdate=!0}copy(J){super.copy(J,!1);let Q=J.levels;for(let Z=0,$=Q.length;Z<$;Z++){let W=Q[Z];this.addLevel(W.object.clone(),W.distance,W.hysteresis)}return this.autoUpdate=J.autoUpdate,this}addLevel(J,Q=0,Z=0){Q=Math.abs(Q);let $=this.levels,W;for(W=0;W<$.length;W++)if(Q<$[W].distance)break;return $.splice(W,0,{distance:Q,hysteresis:Z,object:J}),this.add(J),this}removeLevel(J){let Q=this.levels;for(let Z=0;Z<Q.length;Z++)if(Q[Z].distance===J){let $=Q.splice(Z,1);return this.remove($[0].object),!0}return!1}getCurrentLevel(){return this._currentLevel}getObjectForDistance(J){let Q=this.levels;if(Q.length>0){let Z,$;for(Z=1,$=Q.length;Z<$;Z++){let W=Q[Z].distance;if(Q[Z].object.visible)W-=W*Q[Z].hysteresis;if(J<W)break}return Q[Z-1].object}return null}raycast(J,Q){if(this.levels.length>0){pZ.setFromMatrixPosition(this.matrixWorld);let $=J.ray.origin.distanceTo(pZ);this.getObjectForDistance($).raycast(J,Q)}}update(J){let Q=this.levels;if(Q.length>1){pZ.setFromMatrixPosition(J.matrixWorld),ZG.setFromMatrixPosition(this.matrixWorld);let Z=pZ.distanceTo(ZG)/J.zoom;Q[0].object.visible=!0;let $,W;for($=1,W=Q.length;$<W;$++){let Y=Q[$].distance;if(Q[$].object.visible)Y-=Y*Q[$].hysteresis;if(Z>=Y)Q[$-1].object.visible=!1,Q[$].object.visible=!0;else break}this._currentLevel=$-1;for(;$<W;$++)Q[$].object.visible=!1}}toJSON(J){let Q=super.toJSON(J);if(this.autoUpdate===!1)Q.object.autoUpdate=!1;Q.object.levels=[];let Z=this.levels;for(let $=0,W=Z.length;$<W;$++){let Y=Z[$];Q.object.levels.push({object:Y.object.uuid,distance:Y.distance,hysteresis:Y.hysteresis})}return Q}}var $G=/*@__PURE__*/new I,WG=/*@__PURE__*/new XJ,YG=/*@__PURE__*/new XJ,ZN=/*@__PURE__*/new I,XG=/*@__PURE__*/new SJ,mZ=/*@__PURE__*/new I,PY=/*@__PURE__*/new A0,HG=/*@__PURE__*/new SJ,TY=/*@__PURE__*/new b9;class F7 extends N0{constructor(J,Q){super(J,Q);this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode="attached",this.bindMatrix=new SJ,this.bindMatrixInverse=new SJ,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){let J=this.geometry;if(this.boundingBox===null)this.boundingBox=new z0;this.boundingBox.makeEmpty();let Q=J.getAttribute("position");for(let Z=0;Z<Q.count;Z++)this.getVertexPosition(Z,mZ),this.boundingBox.expandByPoint(mZ)}computeBoundingSphere(){let J=this.geometry;if(this.boundingSphere===null)this.boundingSphere=new A0;this.boundingSphere.makeEmpty();let Q=J.getAttribute("position");for(let Z=0;Z<Q.count;Z++)this.getVertexPosition(Z,mZ),this.boundingSphere.expandByPoint(mZ)}copy(J,Q){if(super.copy(J,Q),this.bindMode=J.bindMode,this.bindMatrix.copy(J.bindMatrix),this.bindMatrixInverse.copy(J.bindMatrixInverse),this.skeleton=J.skeleton,J.boundingBox!==null)this.boundingBox=J.boundingBox.clone();if(J.boundingSphere!==null)this.boundingSphere=J.boundingSphere.clone();return this}raycast(J,Q){let Z=this.material,$=this.matrixWorld;if(Z===void 0)return;if(this.boundingSphere===null)this.computeBoundingSphere();if(PY.copy(this.boundingSphere),PY.applyMatrix4($),J.ray.intersectsSphere(PY)===!1)return;if(HG.copy($).invert(),TY.copy(J.ray).applyMatrix4(HG),this.boundingBox!==null){if(TY.intersectsBox(this.boundingBox)===!1)return}this._computeIntersections(J,Q,TY)}getVertexPosition(J,Q){return super.getVertexPosition(J,Q),this.applyBoneTransform(J,Q),Q}bind(J,Q){if(this.skeleton=J,Q===void 0)this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),Q=this.matrixWorld;this.bindMatrix.copy(Q),this.bindMatrixInverse.copy(Q).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){let J=new XJ,Q=this.geometry.attributes.skinWeight;for(let Z=0,$=Q.count;Z<$;Z++){J.fromBufferAttribute(Q,Z);let W=1/J.manhattanLength();if(W!==1/0)J.multiplyScalar(W);else J.set(1,0,0,0);Q.setXYZW(Z,J.x,J.y,J.z,J.w)}}updateMatrixWorld(J){if(super.updateMatrixWorld(J),this.bindMode==="attached")this.bindMatrixInverse.copy(this.matrixWorld).invert();else if(this.bindMode==="detached")this.bindMatrixInverse.copy(this.bindMatrix).invert();else console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(J,Q){let Z=this.skeleton,$=this.geometry;WG.fromBufferAttribute($.attributes.skinIndex,J),YG.fromBufferAttribute($.attributes.skinWeight,J),$G.copy(Q).applyMatrix4(this.bindMatrix),Q.set(0,0,0);for(let W=0;W<4;W++){let Y=YG.getComponent(W);if(Y!==0){let X=WG.getComponent(W);XG.multiplyMatrices(Z.bones[X].matrixWorld,Z.boneInverses[X]),Q.addScaledVector(ZN.copy($G).applyMatrix4(XG),Y)}}return Q.applyMatrix4(this.bindMatrixInverse)}}class z6 extends $0{constructor(){super();this.isBone=!0,this.type="Bone"}}class p0 extends R0{constructor(J=null,Q=1,Z=1,$,W,Y,X,H,K=1003,G=1003,U,E){super(null,Y,X,H,K,G,$,W,U,E);this.isDataTexture=!0,this.image={data:J,width:Q,height:Z},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}var KG=/*@__PURE__*/new SJ,$N=/*@__PURE__*/new SJ;class C6{constructor(J=[],Q=[]){this.uuid=N8(),this.bones=J.slice(0),this.boneInverses=Q,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){let J=this.bones,Q=this.boneInverses;if(this.boneMatrices=new Float32Array(J.length*16),Q.length===0)this.calculateInverses();else if(J.length!==Q.length){console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let Z=0,$=this.bones.length;Z<$;Z++)this.boneInverses.push(new SJ)}}calculateInverses(){this.boneInverses.length=0;for(let J=0,Q=this.bones.length;J<Q;J++){let Z=new SJ;if(this.bones[J])Z.copy(this.bones[J].matrixWorld).invert();this.boneInverses.push(Z)}}pose(){for(let J=0,Q=this.bones.length;J<Q;J++){let Z=this.bones[J];if(Z)Z.matrixWorld.copy(this.boneInverses[J]).invert()}for(let J=0,Q=this.bones.length;J<Q;J++){let Z=this.bones[J];if(Z){if(Z.parent&&Z.parent.isBone)Z.matrix.copy(Z.parent.matrixWorld).invert(),Z.matrix.multiply(Z.matrixWorld);else Z.matrix.copy(Z.matrixWorld);Z.matrix.decompose(Z.position,Z.quaternion,Z.scale)}}}update(){let J=this.bones,Q=this.boneInverses,Z=this.boneMatrices,$=this.boneTexture;for(let W=0,Y=J.length;W<Y;W++){let X=J[W]?J[W].matrixWorld:$N;KG.multiplyMatrices(X,Q[W]),KG.toArray(Z,W*16)}if($!==null)$.needsUpdate=!0}clone(){return new C6(this.bones,this.boneInverses)}computeBoneTexture(){let J=Math.sqrt(this.bones.length*4);J=Math.ceil(J/4)*4,J=Math.max(J,4);let Q=new Float32Array(J*J*4);Q.set(this.boneMatrices);let Z=new p0(Q,J,J,1023,1015);return Z.needsUpdate=!0,this.boneMatrices=Q,this.boneTexture=Z,this}getBoneByName(J){for(let Q=0,Z=this.bones.length;Q<Z;Q++){let $=this.bones[Q];if($.name===J)return $}return}dispose(){if(this.boneTexture!==null)this.boneTexture.dispose(),this.boneTexture=null}fromJSON(J,Q){this.uuid=J.uuid;for(let Z=0,$=J.bones.length;Z<$;Z++){let W=J.bones[Z],Y=Q[W];if(Y===void 0)console.warn("THREE.Skeleton: No bone found with UUID:",W),Y=new z6;this.bones.push(Y),this.boneInverses.push(new SJ().fromArray(J.boneInverses[Z]))}return this.init(),this}toJSON(){let J={metadata:{version:4.6,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};J.uuid=this.uuid;let Q=this.bones,Z=this.boneInverses;for(let $=0,W=Q.length;$<W;$++){let Y=Q[$];J.bones.push(Y.uuid);let X=Z[$];J.boneInverses.push(X.toArray())}return J}}class x8 extends X0{constructor(J,Q,Z,$=1){super(J,Q,Z);this.isInstancedBufferAttribute=!0,this.meshPerAttribute=$}copy(J){return super.copy(J),this.meshPerAttribute=J.meshPerAttribute,this}toJSON(){let J=super.toJSON();return J.meshPerAttribute=this.meshPerAttribute,J.isInstancedBufferAttribute=!0,J}}var J7=/*@__PURE__*/new SJ,GG=/*@__PURE__*/new SJ,lZ=[],UG=/*@__PURE__*/new z0,WN=/*@__PURE__*/new SJ,s7=/*@__PURE__*/new N0,i7=/*@__PURE__*/new A0;class D7 extends N0{constructor(J,Q,Z){super(J,Q);this.isInstancedMesh=!0,this.instanceMatrix=new x8(new Float32Array(Z*16),16),this.instanceColor=null,this.morphTexture=null,this.count=Z,this.boundingBox=null,this.boundingSphere=null;for(let $=0;$<Z;$++)this.setMatrixAt($,WN)}computeBoundingBox(){let J=this.geometry,Q=this.count;if(this.boundingBox===null)this.boundingBox=new z0;if(J.boundingBox===null)J.computeBoundingBox();this.boundingBox.makeEmpty();for(let Z=0;Z<Q;Z++)this.getMatrixAt(Z,J7),UG.copy(J.boundingBox).applyMatrix4(J7),this.boundingBox.union(UG)}computeBoundingSphere(){let J=this.geometry,Q=this.count;if(this.boundingSphere===null)this.boundingSphere=new A0;if(J.boundingSphere===null)J.computeBoundingSphere();this.boundingSphere.makeEmpty();for(let Z=0;Z<Q;Z++)this.getMatrixAt(Z,J7),i7.copy(J.boundingSphere).applyMatrix4(J7),this.boundingSphere.union(i7)}copy(J,Q){if(super.copy(J,Q),this.instanceMatrix.copy(J.instanceMatrix),J.morphTexture!==null)this.morphTexture=J.morphTexture.clone();if(J.instanceColor!==null)this.instanceColor=J.instanceColor.clone();if(this.count=J.count,J.boundingBox!==null)this.boundingBox=J.boundingBox.clone();if(J.boundingSphere!==null)this.boundingSphere=J.boundingSphere.clone();return this}getColorAt(J,Q){Q.fromArray(this.instanceColor.array,J*3)}getMatrixAt(J,Q){Q.fromArray(this.instanceMatrix.array,J*16)}getMorphAt(J,Q){let Z=Q.morphTargetInfluences,$=this.morphTexture.source.data.data,W=Z.length+1,Y=J*W+1;for(let X=0;X<Z.length;X++)Z[X]=$[Y+X]}raycast(J,Q){let Z=this.matrixWorld,$=this.count;if(s7.geometry=this.geometry,s7.material=this.material,s7.material===void 0)return;if(this.boundingSphere===null)this.computeBoundingSphere();if(i7.copy(this.boundingSphere),i7.applyMatrix4(Z),J.ray.intersectsSphere(i7)===!1)return;for(let W=0;W<$;W++){this.getMatrixAt(W,J7),GG.multiplyMatrices(Z,J7),s7.matrixWorld=GG,s7.raycast(J,lZ);for(let Y=0,X=lZ.length;Y<X;Y++){let H=lZ[Y];H.instanceId=W,H.object=this,Q.push(H)}lZ.length=0}}setColorAt(J,Q){if(this.instanceColor===null)this.instanceColor=new x8(new Float32Array(this.instanceMatrix.count*3).fill(1),3);Q.toArray(this.instanceColor.array,J*3)}setMatrixAt(J,Q){Q.toArray(this.instanceMatrix.array,J*16)}setMorphAt(J,Q){let Z=Q.morphTargetInfluences,$=Z.length+1;if(this.morphTexture===null)this.morphTexture=new p0(new Float32Array($*this.count),$,this.count,1028,1015);let W=this.morphTexture.source.data.data,Y=0;for(let K=0;K<Z.length;K++)Y+=Z[K];let X=this.geometry.morphTargetsRelative?1:1-Y,H=$*J;W[H]=X,W.set(Z,H+1)}updateMorphTargets(){}dispose(){if(this.dispatchEvent({type:"dispose"}),this.morphTexture!==null)this.morphTexture.dispose(),this.morphTexture=null;return this}}var SY=/*@__PURE__*/new I,YN=/*@__PURE__*/new I,XN=/*@__PURE__*/new nJ;class l8{constructor(J=new I(1,0,0),Q=0){this.isPlane=!0,this.normal=J,this.constant=Q}set(J,Q){return this.normal.copy(J),this.constant=Q,this}setComponents(J,Q,Z,$){return this.normal.set(J,Q,Z),this.constant=$,this}setFromNormalAndCoplanarPoint(J,Q){return this.normal.copy(J),this.constant=-Q.dot(this.normal),this}setFromCoplanarPoints(J,Q,Z){let $=SY.subVectors(Z,Q).cross(YN.subVectors(J,Q)).normalize();return this.setFromNormalAndCoplanarPoint($,J),this}copy(J){return this.normal.copy(J.normal),this.constant=J.constant,this}normalize(){let J=1/this.normal.length();return this.normal.multiplyScalar(J),this.constant*=J,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(J){return this.normal.dot(J)+this.constant}distanceToSphere(J){return this.distanceToPoint(J.center)-J.radius}projectPoint(J,Q){return Q.copy(J).addScaledVector(this.normal,-this.distanceToPoint(J))}intersectLine(J,Q){let Z=J.delta(SY),$=this.normal.dot(Z);if($===0){if(this.distanceToPoint(J.start)===0)return Q.copy(J.start);return null}let W=-(J.start.dot(this.normal)+this.constant)/$;if(W<0||W>1)return null;return Q.copy(J.start).addScaledVector(Z,W)}intersectsLine(J){let Q=this.distanceToPoint(J.start),Z=this.distanceToPoint(J.end);return Q<0&&Z>0||Z<0&&Q>0}intersectsBox(J){return J.intersectsPlane(this)}intersectsSphere(J){return J.intersectsPlane(this)}coplanarPoint(J){return J.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(J,Q){let Z=Q||XN.getNormalMatrix(J),$=this.coplanarPoint(SY).applyMatrix4(J),W=this.normal.applyMatrix3(Z).normalize();return this.constant=-$.dot(W),this}translate(J){return this.constant-=J.dot(this.normal),this}equals(J){return J.normal.equals(this.normal)&&J.constant===this.constant}clone(){return new this.constructor().copy(this)}}var n9=/*@__PURE__*/new A0,uZ=/*@__PURE__*/new I;class _6{constructor(J=new l8,Q=new l8,Z=new l8,$=new l8,W=new l8,Y=new l8){this.planes=[J,Q,Z,$,W,Y]}set(J,Q,Z,$,W,Y){let X=this.planes;return X[0].copy(J),X[1].copy(Q),X[2].copy(Z),X[3].copy($),X[4].copy(W),X[5].copy(Y),this}copy(J){let Q=this.planes;for(let Z=0;Z<6;Z++)Q[Z].copy(J.planes[Z]);return this}setFromProjectionMatrix(J,Q=2000){let Z=this.planes,$=J.elements,W=$[0],Y=$[1],X=$[2],H=$[3],K=$[4],G=$[5],U=$[6],E=$[7],q=$[8],N=$[9],k=$[10],V=$[11],R=$[12],O=$[13],D=$[14],F=$[15];if(Z[0].setComponents(H-W,E-K,V-q,F-R).normalize(),Z[1].setComponents(H+W,E+K,V+q,F+R).normalize(),Z[2].setComponents(H+Y,E+G,V+N,F+O).normalize(),Z[3].setComponents(H-Y,E-G,V-N,F-O).normalize(),Z[4].setComponents(H-X,E-U,V-k,F-D).normalize(),Q===2000)Z[5].setComponents(H+X,E+U,V+k,F+D).normalize();else if(Q===2001)Z[5].setComponents(X,U,k,D).normalize();else throw Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+Q);return this}intersectsObject(J){if(J.boundingSphere!==void 0){if(J.boundingSphere===null)J.computeBoundingSphere();n9.copy(J.boundingSphere).applyMatrix4(J.matrixWorld)}else{let Q=J.geometry;if(Q.boundingSphere===null)Q.computeBoundingSphere();n9.copy(Q.boundingSphere).applyMatrix4(J.matrixWorld)}return this.intersectsSphere(n9)}intersectsSprite(J){return n9.center.set(0,0,0),n9.radius=0.7071067811865476,n9.applyMatrix4(J.matrixWorld),this.intersectsSphere(n9)}intersectsSphere(J){let Q=this.planes,Z=J.center,$=-J.radius;for(let W=0;W<6;W++)if(Q[W].distanceToPoint(Z)<$)return!1;return!0}intersectsBox(J){let Q=this.planes;for(let Z=0;Z<6;Z++){let $=Q[Z];if(uZ.x=$.normal.x>0?J.max.x:J.min.x,uZ.y=$.normal.y>0?J.max.y:J.min.y,uZ.z=$.normal.z>0?J.max.z:J.min.z,$.distanceToPoint(uZ)<0)return!1}return!0}containsPoint(J){let Q=this.planes;for(let Z=0;Z<6;Z++)if(Q[Z].distanceToPoint(J)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function jY(J,Q){return J-Q}function HN(J,Q){return J.z-Q.z}function KN(J,Q){return Q.z-J.z}class iU{constructor(){this.index=0,this.pool=[],this.list=[]}push(J,Q,Z,$){let W=this.pool,Y=this.list;if(this.index>=W.length)W.push({start:-1,count:-1,z:-1,index:-1});let X=W[this.index];Y.push(X),this.index++,X.start=J,X.count=Q,X.z=Z,X.index=$}reset(){this.list.length=0,this.index=0}}var Q8=/*@__PURE__*/new SJ,GN=/*@__PURE__*/new u(1,1,1),vY=/*@__PURE__*/new _6,dZ=/*@__PURE__*/new z0,s9=/*@__PURE__*/new A0,o7=/*@__PURE__*/new I,EG=/*@__PURE__*/new I,UN=/*@__PURE__*/new I,yY=/*@__PURE__*/new iU,c0=/*@__PURE__*/new N0,cZ=[];function EN(J,Q,Z=0){let $=Q.itemSize;if(J.isInterleavedBufferAttribute||J.array.constructor!==Q.array.constructor){let W=J.count;for(let Y=0;Y<W;Y++)for(let X=0;X<$;X++)Q.setComponent(Y+Z,X,J.getComponent(Y,X))}else Q.array.set(J.array,Z*$);Q.needsUpdate=!0}function i9(J,Q){if(J.constructor!==Q.constructor){let Z=Math.min(J.length,Q.length);for(let $=0;$<Z;$++)Q[$]=J[$]}else{let Z=Math.min(J.length,Q.length);Q.set(new J.constructor(J.buffer,0,Z))}}class XW extends N0{get maxInstanceCount(){return this._maxInstanceCount}get instanceCount(){return this._instanceInfo.length-this._availableInstanceIds.length}get unusedVertexCount(){return this._maxVertexCount-this._nextVertexStart}get unusedIndexCount(){return this._maxIndexCount-this._nextIndexStart}constructor(J,Q,Z=Q*2,$){super(new gJ,$);this.isBatchedMesh=!0,this.perObjectFrustumCulled=!0,this.sortObjects=!0,this.boundingBox=null,this.boundingSphere=null,this.customSort=null,this._instanceInfo=[],this._geometryInfo=[],this._availableInstanceIds=[],this._availableGeometryIds=[],this._nextIndexStart=0,this._nextVertexStart=0,this._geometryCount=0,this._visibilityChanged=!0,this._geometryInitialized=!1,this._maxInstanceCount=J,this._maxVertexCount=Q,this._maxIndexCount=Z,this._multiDrawCounts=new Int32Array(J),this._multiDrawStarts=new Int32Array(J),this._multiDrawCount=0,this._multiDrawInstances=null,this._matricesTexture=null,this._indirectTexture=null,this._colorsTexture=null,this._initMatricesTexture(),this._initIndirectTexture()}_initMatricesTexture(){let J=Math.sqrt(this._maxInstanceCount*4);J=Math.ceil(J/4)*4,J=Math.max(J,4);let Q=new Float32Array(J*J*4),Z=new p0(Q,J,J,1023,1015);this._matricesTexture=Z}_initIndirectTexture(){let J=Math.sqrt(this._maxInstanceCount);J=Math.ceil(J);let Q=new Uint32Array(J*J),Z=new p0(Q,J,J,1029,1014);this._indirectTexture=Z}_initColorsTexture(){let J=Math.sqrt(this._maxInstanceCount);J=Math.ceil(J);let Q=new Float32Array(J*J*4).fill(1),Z=new p0(Q,J,J,1023,1015);Z.colorSpace=aJ.workingColorSpace,this._colorsTexture=Z}_initializeGeometry(J){let Q=this.geometry,Z=this._maxVertexCount,$=this._maxIndexCount;if(this._geometryInitialized===!1){for(let W in J.attributes){let Y=J.getAttribute(W),{array:X,itemSize:H,normalized:K}=Y,G=new X.constructor(Z*H),U=new X0(G,H,K);Q.setAttribute(W,U)}if(J.getIndex()!==null){let W=Z>65535?new Uint32Array($):new Uint16Array($);Q.setIndex(new X0(W,1))}this._geometryInitialized=!0}}_validateGeometry(J){let Q=this.geometry;if(Boolean(J.getIndex())!==Boolean(Q.getIndex()))throw Error('THREE.BatchedMesh: All geometries must consistently have "index".');for(let Z in Q.attributes){if(!J.hasAttribute(Z))throw Error(`THREE.BatchedMesh: Added geometry missing "${Z}". All geometries must have consistent attributes.`);let $=J.getAttribute(Z),W=Q.getAttribute(Z);if($.itemSize!==W.itemSize||$.normalized!==W.normalized)throw Error("THREE.BatchedMesh: All attributes must have a consistent itemSize and normalized value.")}}validateInstanceId(J){let Q=this._instanceInfo;if(J<0||J>=Q.length||Q[J].active===!1)throw Error(`THREE.BatchedMesh: Invalid instanceId ${J}. Instance is either out of range or has been deleted.`)}validateGeometryId(J){let Q=this._geometryInfo;if(J<0||J>=Q.length||Q[J].active===!1)throw Error(`THREE.BatchedMesh: Invalid geometryId ${J}. Geometry is either out of range or has been deleted.`)}setCustomSort(J){return this.customSort=J,this}computeBoundingBox(){if(this.boundingBox===null)this.boundingBox=new z0;let J=this.boundingBox,Q=this._instanceInfo;J.makeEmpty();for(let Z=0,$=Q.length;Z<$;Z++){if(Q[Z].active===!1)continue;let W=Q[Z].geometryIndex;this.getMatrixAt(Z,Q8),this.getBoundingBoxAt(W,dZ).applyMatrix4(Q8),J.union(dZ)}}computeBoundingSphere(){if(this.boundingSphere===null)this.boundingSphere=new A0;let J=this.boundingSphere,Q=this._instanceInfo;J.makeEmpty();for(let Z=0,$=Q.length;Z<$;Z++){if(Q[Z].active===!1)continue;let W=Q[Z].geometryIndex;this.getMatrixAt(Z,Q8),this.getBoundingSphereAt(W,s9).applyMatrix4(Q8),J.union(s9)}}addInstance(J){if(this._instanceInfo.length>=this.maxInstanceCount&&this._availableInstanceIds.length===0)throw Error("THREE.BatchedMesh: Maximum item count reached.");let Z={visible:!0,active:!0,geometryIndex:J},$=null;if(this._availableInstanceIds.length>0)this._availableInstanceIds.sort(jY),$=this._availableInstanceIds.shift(),this._instanceInfo[$]=Z;else $=this._instanceInfo.length,this._instanceInfo.push(Z);let W=this._matricesTexture;Q8.identity().toArray(W.image.data,$*16),W.needsUpdate=!0;let Y=this._colorsTexture;if(Y)GN.toArray(Y.image.data,$*4),Y.needsUpdate=!0;return this._visibilityChanged=!0,$}addGeometry(J,Q=-1,Z=-1){this._initializeGeometry(J),this._validateGeometry(J);let $={vertexStart:-1,vertexCount:-1,reservedVertexCount:-1,indexStart:-1,indexCount:-1,reservedIndexCount:-1,start:-1,count:-1,boundingBox:null,boundingSphere:null,active:!0},W=this._geometryInfo;$.vertexStart=this._nextVertexStart,$.reservedVertexCount=Q===-1?J.getAttribute("position").count:Q;let Y=J.getIndex();if(Y!==null)$.indexStart=this._nextIndexStart,$.reservedIndexCount=Z===-1?Y.count:Z;if($.indexStart!==-1&&$.indexStart+$.reservedIndexCount>this._maxIndexCount||$.vertexStart+$.reservedVertexCount>this._maxVertexCount)throw Error("THREE.BatchedMesh: Reserved space request exceeds the maximum buffer size.");let H;if(this._availableGeometryIds.length>0)this._availableGeometryIds.sort(jY),H=this._availableGeometryIds.shift(),W[H]=$;else H=this._geometryCount,this._geometryCount++,W.push($);return this.setGeometryAt(H,J),this._nextIndexStart=$.indexStart+$.reservedIndexCount,this._nextVertexStart=$.vertexStart+$.reservedVertexCount,H}setGeometryAt(J,Q){if(J>=this._geometryCount)throw Error("THREE.BatchedMesh: Maximum geometry count reached.");this._validateGeometry(Q);let Z=this.geometry,$=Z.getIndex()!==null,W=Z.getIndex(),Y=Q.getIndex(),X=this._geometryInfo[J];if($&&Y.count>X.reservedIndexCount||Q.attributes.position.count>X.reservedVertexCount)throw Error("THREE.BatchedMesh: Reserved space not large enough for provided geometry.");let{vertexStart:H,reservedVertexCount:K}=X;X.vertexCount=Q.getAttribute("position").count;for(let G in Z.attributes){let U=Q.getAttribute(G),E=Z.getAttribute(G);EN(U,E,H);let q=U.itemSize;for(let N=U.count,k=K;N<k;N++){let V=H+N;for(let R=0;R<q;R++)E.setComponent(V,R,0)}E.needsUpdate=!0,E.addUpdateRange(H*q,K*q)}if($){let{indexStart:G,reservedIndexCount:U}=X;X.indexCount=Q.getIndex().count;for(let E=0;E<Y.count;E++)W.setX(G+E,H+Y.getX(E));for(let E=Y.count,q=U;E<q;E++)W.setX(G+E,H);W.needsUpdate=!0,W.addUpdateRange(G,X.reservedIndexCount)}if(X.start=$?X.indexStart:X.vertexStart,X.count=$?X.indexCount:X.vertexCount,X.boundingBox=null,Q.boundingBox!==null)X.boundingBox=Q.boundingBox.clone();if(X.boundingSphere=null,Q.boundingSphere!==null)X.boundingSphere=Q.boundingSphere.clone();return this._visibilityChanged=!0,J}deleteGeometry(J){let Q=this._geometryInfo;if(J>=Q.length||Q[J].active===!1)return this;let Z=this._instanceInfo;for(let $=0,W=Z.length;$<W;$++)if(Z[$].active&&Z[$].geometryIndex===J)this.deleteInstance($);return Q[J].active=!1,this._availableGeometryIds.push(J),this._visibilityChanged=!0,this}deleteInstance(J){return this.validateInstanceId(J),this._instanceInfo[J].active=!1,this._availableInstanceIds.push(J),this._visibilityChanged=!0,this}optimize(){let J=0,Q=0,Z=this._geometryInfo,$=Z.map((Y,X)=>X).sort((Y,X)=>{return Z[Y].vertexStart-Z[X].vertexStart}),W=this.geometry;for(let Y=0,X=Z.length;Y<X;Y++){let H=$[Y],K=Z[H];if(K.active===!1)continue;if(W.index!==null){if(K.indexStart!==Q){let{indexStart:G,vertexStart:U,reservedIndexCount:E}=K,q=W.index,N=q.array,k=J-U;for(let V=G;V<G+E;V++)N[V]=N[V]+k;q.array.copyWithin(Q,G,G+E),q.addUpdateRange(Q,E),K.indexStart=Q}Q+=K.reservedIndexCount}if(K.vertexStart!==J){let{vertexStart:G,reservedVertexCount:U}=K,E=W.attributes;for(let q in E){let N=E[q],{array:k,itemSize:V}=N;k.copyWithin(J*V,G*V,(G+U)*V),N.addUpdateRange(J*V,U*V)}K.vertexStart=J}J+=K.reservedVertexCount,K.start=W.index?K.indexStart:K.vertexStart,this._nextIndexStart=W.index?K.indexStart+K.reservedIndexCount:0,this._nextVertexStart=K.vertexStart+K.reservedVertexCount}return this}getBoundingBoxAt(J,Q){if(J>=this._geometryCount)return null;let Z=this.geometry,$=this._geometryInfo[J];if($.boundingBox===null){let W=new z0,Y=Z.index,X=Z.attributes.position;for(let H=$.start,K=$.start+$.count;H<K;H++){let G=H;if(Y)G=Y.getX(G);W.expandByPoint(o7.fromBufferAttribute(X,G))}$.boundingBox=W}return Q.copy($.boundingBox),Q}getBoundingSphereAt(J,Q){if(J>=this._geometryCount)return null;let Z=this.geometry,$=this._geometryInfo[J];if($.boundingSphere===null){let W=new A0;this.getBoundingBoxAt(J,dZ),dZ.getCenter(W.center);let Y=Z.index,X=Z.attributes.position,H=0;for(let K=$.start,G=$.start+$.count;K<G;K++){let U=K;if(Y)U=Y.getX(U);o7.fromBufferAttribute(X,U),H=Math.max(H,W.center.distanceToSquared(o7))}W.radius=Math.sqrt(H),$.boundingSphere=W}return Q.copy($.boundingSphere),Q}setMatrixAt(J,Q){this.validateInstanceId(J);let Z=this._matricesTexture,$=this._matricesTexture.image.data;return Q.toArray($,J*16),Z.needsUpdate=!0,this}getMatrixAt(J,Q){return this.validateInstanceId(J),Q.fromArray(this._matricesTexture.image.data,J*16)}setColorAt(J,Q){if(this.validateInstanceId(J),this._colorsTexture===null)this._initColorsTexture();return Q.toArray(this._colorsTexture.image.data,J*4),this._colorsTexture.needsUpdate=!0,this}getColorAt(J,Q){return this.validateInstanceId(J),Q.fromArray(this._colorsTexture.image.data,J*4)}setVisibleAt(J,Q){if(this.validateInstanceId(J),this._instanceInfo[J].visible===Q)return this;return this._instanceInfo[J].visible=Q,this._visibilityChanged=!0,this}getVisibleAt(J){return this.validateInstanceId(J),this._instanceInfo[J].visible}setGeometryIdAt(J,Q){return this.validateInstanceId(J),this.validateGeometryId(Q),this._instanceInfo[J].geometryIndex=Q,this}getGeometryIdAt(J){return this.validateInstanceId(J),this._instanceInfo[J].geometryIndex}getGeometryRangeAt(J,Q={}){this.validateGeometryId(J);let Z=this._geometryInfo[J];return Q.vertexStart=Z.vertexStart,Q.vertexCount=Z.vertexCount,Q.reservedVertexCount=Z.reservedVertexCount,Q.indexStart=Z.indexStart,Q.indexCount=Z.indexCount,Q.reservedIndexCount=Z.reservedIndexCount,Q.start=Z.start,Q.count=Z.count,Q}setInstanceCount(J){let Q=this._availableInstanceIds,Z=this._instanceInfo;Q.sort(jY);while(Q[Q.length-1]===Z.length)Z.pop(),Q.pop();if(J<Z.length)throw Error(`BatchedMesh: Instance ids outside the range ${J} are being used. Cannot shrink instance count.`);let $=new Int32Array(J),W=new Int32Array(J);i9(this._multiDrawCounts,$),i9(this._multiDrawStarts,W),this._multiDrawCounts=$,this._multiDrawStarts=W,this._maxInstanceCount=J;let Y=this._indirectTexture,X=this._matricesTexture,H=this._colorsTexture;if(Y.dispose(),this._initIndirectTexture(),i9(Y.image.data,this._indirectTexture.image.data),X.dispose(),this._initMatricesTexture(),i9(X.image.data,this._matricesTexture.image.data),H)H.dispose(),this._initColorsTexture(),i9(H.image.data,this._colorsTexture.image.data)}setGeometrySize(J,Q){let Z=[...this._geometryInfo].filter((X)=>X.active);if(Math.max(...Z.map((X)=>X.vertexStart+X.reservedVertexCount))>J)throw Error(`BatchedMesh: Geometry vertex values are being used outside the range ${Q}. Cannot shrink further.`);if(this.geometry.index){if(Math.max(...Z.map((H)=>H.indexStart+H.reservedIndexCount))>Q)throw Error(`BatchedMesh: Geometry index values are being used outside the range ${Q}. Cannot shrink further.`)}let W=this.geometry;if(W.dispose(),this._maxVertexCount=J,this._maxIndexCount=Q,this._geometryInitialized)this._geometryInitialized=!1,this.geometry=new gJ,this._initializeGeometry(W);let Y=this.geometry;if(W.index)i9(W.index.array,Y.index.array);for(let X in W.attributes)i9(W.attributes[X].array,Y.attributes[X].array)}raycast(J,Q){let Z=this._instanceInfo,$=this._geometryInfo,W=this.matrixWorld,Y=this.geometry;if(c0.material=this.material,c0.geometry.index=Y.index,c0.geometry.attributes=Y.attributes,c0.geometry.boundingBox===null)c0.geometry.boundingBox=new z0;if(c0.geometry.boundingSphere===null)c0.geometry.boundingSphere=new A0;for(let X=0,H=Z.length;X<H;X++){if(!Z[X].visible||!Z[X].active)continue;let K=Z[X].geometryIndex,G=$[K];c0.geometry.setDrawRange(G.start,G.count),this.getMatrixAt(X,c0.matrixWorld).premultiply(W),this.getBoundingBoxAt(K,c0.geometry.boundingBox),this.getBoundingSphereAt(K,c0.geometry.boundingSphere),c0.raycast(J,cZ);for(let U=0,E=cZ.length;U<E;U++){let q=cZ[U];q.object=this,q.batchId=X,Q.push(q)}cZ.length=0}c0.material=null,c0.geometry.index=null,c0.geometry.attributes={},c0.geometry.setDrawRange(0,1/0)}copy(J){if(super.copy(J),this.geometry=J.geometry.clone(),this.perObjectFrustumCulled=J.perObjectFrustumCulled,this.sortObjects=J.sortObjects,this.boundingBox=J.boundingBox!==null?J.boundingBox.clone():null,this.boundingSphere=J.boundingSphere!==null?J.boundingSphere.clone():null,this._geometryInfo=J._geometryInfo.map((Q)=>({...Q,boundingBox:Q.boundingBox!==null?Q.boundingBox.clone():null,boundingSphere:Q.boundingSphere!==null?Q.boundingSphere.clone():null})),this._instanceInfo=J._instanceInfo.map((Q)=>({...Q})),this._maxInstanceCount=J._maxInstanceCount,this._maxVertexCount=J._maxVertexCount,this._maxIndexCount=J._maxIndexCount,this._geometryInitialized=J._geometryInitialized,this._geometryCount=J._geometryCount,this._multiDrawCounts=J._multiDrawCounts.slice(),this._multiDrawStarts=J._multiDrawStarts.slice(),this._matricesTexture=J._matricesTexture.clone(),this._matricesTexture.image.data=this._matricesTexture.image.data.slice(),this._colorsTexture!==null)this._colorsTexture=J._colorsTexture.clone(),this._colorsTexture.image.data=this._colorsTexture.image.data.slice();return this}dispose(){if(this.geometry.dispose(),this._matricesTexture.dispose(),this._matricesTexture=null,this._indirectTexture.dispose(),this._indirectTexture=null,this._colorsTexture!==null)this._colorsTexture.dispose(),this._colorsTexture=null;return this}onBeforeRender(J,Q,Z,$,W){if(!this._visibilityChanged&&!this.perObjectFrustumCulled&&!this.sortObjects)return;let Y=$.getIndex(),X=Y===null?1:Y.array.BYTES_PER_ELEMENT,H=this._instanceInfo,K=this._multiDrawStarts,G=this._multiDrawCounts,U=this._geometryInfo,E=this.perObjectFrustumCulled,q=this._indirectTexture,N=q.image.data;if(E)Q8.multiplyMatrices(Z.projectionMatrix,Z.matrixWorldInverse).multiply(this.matrixWorld),vY.setFromProjectionMatrix(Q8,J.coordinateSystem);let k=0;if(this.sortObjects){Q8.copy(this.matrixWorld).invert(),o7.setFromMatrixPosition(Z.matrixWorld).applyMatrix4(Q8),EG.set(0,0,-1).transformDirection(Z.matrixWorld).transformDirection(Q8);for(let O=0,D=H.length;O<D;O++)if(H[O].visible&&H[O].active){let F=H[O].geometryIndex;this.getMatrixAt(O,Q8),this.getBoundingSphereAt(F,s9).applyMatrix4(Q8);let C=!1;if(E)C=!vY.intersectsSphere(s9);if(!C){let P=U[F],M=UN.subVectors(s9.center,o7).dot(EG);yY.push(P.start,P.count,M,O)}}let V=yY.list,R=this.customSort;if(R===null)V.sort(W.transparent?KN:HN);else R.call(this,V,Z);for(let O=0,D=V.length;O<D;O++){let F=V[O];K[k]=F.start*X,G[k]=F.count,N[k]=F.index,k++}yY.reset()}else for(let V=0,R=H.length;V<R;V++)if(H[V].visible&&H[V].active){let O=H[V].geometryIndex,D=!1;if(E)this.getMatrixAt(V,Q8),this.getBoundingSphereAt(O,s9).applyMatrix4(Q8),D=!vY.intersectsSphere(s9);if(!D){let F=U[O];K[k]=F.start*X,G[k]=F.count,N[k]=V,k++}}q.needsUpdate=!0,this._multiDrawCount=k,this._visibilityChanged=!1}onBeforeShadow(J,Q,Z,$,W,Y){this.onBeforeRender(J,null,$,W,Y)}}class S0 extends C0{constructor(J){super();this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new u(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(J)}copy(J){return super.copy(J),this.color.copy(J.color),this.map=J.map,this.linewidth=J.linewidth,this.linecap=J.linecap,this.linejoin=J.linejoin,this.fog=J.fog,this}}var G$=/*@__PURE__*/new I,U$=/*@__PURE__*/new I,qG=/*@__PURE__*/new SJ,a7=/*@__PURE__*/new b9,nZ=/*@__PURE__*/new A0,xY=/*@__PURE__*/new I,NG=/*@__PURE__*/new I;class _8 extends $0{constructor(J=new gJ,Q=new S0){super();this.isLine=!0,this.type="Line",this.geometry=J,this.material=Q,this.updateMorphTargets()}copy(J,Q){return super.copy(J,Q),this.material=Array.isArray(J.material)?J.material.slice():J.material,this.geometry=J.geometry,this}computeLineDistances(){let J=this.geometry;if(J.index===null){let Q=J.attributes.position,Z=[0];for(let $=1,W=Q.count;$<W;$++)G$.fromBufferAttribute(Q,$-1),U$.fromBufferAttribute(Q,$),Z[$]=Z[$-1],Z[$]+=G$.distanceTo(U$);J.setAttribute("lineDistance",new zJ(Z,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(J,Q){let Z=this.geometry,$=this.matrixWorld,W=J.params.Line.threshold,Y=Z.drawRange;if(Z.boundingSphere===null)Z.computeBoundingSphere();if(nZ.copy(Z.boundingSphere),nZ.applyMatrix4($),nZ.radius+=W,J.ray.intersectsSphere(nZ)===!1)return;qG.copy($).invert(),a7.copy(J.ray).applyMatrix4(qG);let X=W/((this.scale.x+this.scale.y+this.scale.z)/3),H=X*X,K=this.isLineSegments?2:1,G=Z.index,E=Z.attributes.position;if(G!==null){let q=Math.max(0,Y.start),N=Math.min(G.count,Y.start+Y.count);for(let k=q,V=N-1;k<V;k+=K){let R=G.getX(k),O=G.getX(k+1),D=sZ(this,J,a7,H,R,O,k);if(D)Q.push(D)}if(this.isLineLoop){let k=G.getX(N-1),V=G.getX(q),R=sZ(this,J,a7,H,k,V,N-1);if(R)Q.push(R)}}else{let q=Math.max(0,Y.start),N=Math.min(E.count,Y.start+Y.count);for(let k=q,V=N-1;k<V;k+=K){let R=sZ(this,J,a7,H,k,k+1,k);if(R)Q.push(R)}if(this.isLineLoop){let k=sZ(this,J,a7,H,N-1,q,N-1);if(k)Q.push(k)}}}updateMorphTargets(){let Q=this.geometry.morphAttributes,Z=Object.keys(Q);if(Z.length>0){let $=Q[Z[0]];if($!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let W=0,Y=$.length;W<Y;W++){let X=$[W].name||String(W);this.morphTargetInfluences.push(0),this.morphTargetDictionary[X]=W}}}}}function sZ(J,Q,Z,$,W,Y,X){let H=J.geometry.attributes.position;if(G$.fromBufferAttribute(H,W),U$.fromBufferAttribute(H,Y),Z.distanceSqToSegment(G$,U$,xY,NG)>$)return;xY.applyMatrix4(J.matrixWorld);let G=Q.ray.origin.distanceTo(xY);if(G<Q.near||G>Q.far)return;return{distance:G,point:NG.clone().applyMatrix4(J.matrixWorld),index:X,face:null,faceIndex:null,barycoord:null,object:J}}var OG=/*@__PURE__*/new I,RG=/*@__PURE__*/new I;class K8 extends _8{constructor(J,Q){super(J,Q);this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let J=this.geometry;if(J.index===null){let Q=J.attributes.position,Z=[];for(let $=0,W=Q.count;$<W;$+=2)OG.fromBufferAttribute(Q,$),RG.fromBufferAttribute(Q,$+1),Z[$]=$===0?0:Z[$-1],Z[$+1]=Z[$]+OG.distanceTo(RG);J.setAttribute("lineDistance",new zJ(Z,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class B7 extends _8{constructor(J,Q){super(J,Q);this.isLineLoop=!0,this.type="LineLoop"}}class M6 extends C0{constructor(J){super();this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new u(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(J)}copy(J){return super.copy(J),this.color.copy(J.color),this.map=J.map,this.alphaMap=J.alphaMap,this.size=J.size,this.sizeAttenuation=J.sizeAttenuation,this.fog=J.fog,this}}var kG=/*@__PURE__*/new SJ,dY=/*@__PURE__*/new b9,iZ=/*@__PURE__*/new A0,oZ=/*@__PURE__*/new I;class L7 extends $0{constructor(J=new gJ,Q=new M6){super();this.isPoints=!0,this.type="Points",this.geometry=J,this.material=Q,this.updateMorphTargets()}copy(J,Q){return super.copy(J,Q),this.material=Array.isArray(J.material)?J.material.slice():J.material,this.geometry=J.geometry,this}raycast(J,Q){let Z=this.geometry,$=this.matrixWorld,W=J.params.Points.threshold,Y=Z.drawRange;if(Z.boundingSphere===null)Z.computeBoundingSphere();if(iZ.copy(Z.boundingSphere),iZ.applyMatrix4($),iZ.radius+=W,J.ray.intersectsSphere(iZ)===!1)return;kG.copy($).invert(),dY.copy(J.ray).applyMatrix4(kG);let X=W/((this.scale.x+this.scale.y+this.scale.z)/3),H=X*X,K=Z.index,U=Z.attributes.position;if(K!==null){let E=Math.max(0,Y.start),q=Math.min(K.count,Y.start+Y.count);for(let N=E,k=q;N<k;N++){let V=K.getX(N);oZ.fromBufferAttribute(U,V),VG(oZ,V,H,$,J,Q,this)}}else{let E=Math.max(0,Y.start),q=Math.min(U.count,Y.start+Y.count);for(let N=E,k=q;N<k;N++)oZ.fromBufferAttribute(U,N),VG(oZ,N,H,$,J,Q,this)}}updateMorphTargets(){let Q=this.geometry.morphAttributes,Z=Object.keys(Q);if(Z.length>0){let $=Q[Z[0]];if($!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let W=0,Y=$.length;W<Y;W++){let X=$[W].name||String(W);this.morphTargetInfluences.push(0),this.morphTargetDictionary[X]=W}}}}}function VG(J,Q,Z,$,W,Y,X){let H=dY.distanceSqToPoint(J);if(H<Z){let K=new I;dY.closestPointToPoint(J,K),K.applyMatrix4($);let G=W.ray.origin.distanceTo(K);if(G<W.near||G>W.far)return;Y.push({distance:G,distanceToRay:Math.sqrt(H),point:K,index:Q,face:null,faceIndex:null,barycoord:null,object:X})}}class HW extends R0{constructor(J,Q,Z,$,W,Y,X,H,K){super(J,Q,Z,$,W,Y,X,H,K);this.isVideoTexture=!0,this.minFilter=Y!==void 0?Y:1006,this.magFilter=W!==void 0?W:1006,this.generateMipmaps=!1;let G=this;function U(){G.needsUpdate=!0,J.requestVideoFrameCallback(U)}if("requestVideoFrameCallback"in J)J.requestVideoFrameCallback(U)}clone(){return new this.constructor(this.image).copy(this)}update(){let J=this.image;if("requestVideoFrameCallback"in J===!1&&J.readyState>=J.HAVE_CURRENT_DATA)this.needsUpdate=!0}}class aX extends HW{constructor(J,Q,Z,$,W,Y,X,H){super({},J,Q,Z,$,W,Y,X,H);this.isVideoFrameTexture=!0}update(){}clone(){return new this.constructor().copy(this)}setFrame(J){this.image=J,this.needsUpdate=!0}}class rX extends R0{constructor(J,Q){super({width:J,height:Q});this.isFramebufferTexture=!0,this.magFilter=1003,this.minFilter=1003,this.generateMipmaps=!1,this.needsUpdate=!0}}class z7 extends R0{constructor(J,Q,Z,$,W,Y,X,H,K,G,U,E){super(null,Y,X,H,K,G,$,W,U,E);this.isCompressedTexture=!0,this.image={width:Q,height:Z},this.mipmaps=J,this.flipY=!1,this.generateMipmaps=!1}}class tX extends z7{constructor(J,Q,Z,$,W,Y){super(J,Q,Z,W,Y);this.isCompressedArrayTexture=!0,this.image.depth=$,this.wrapR=1001,this.layerUpdates=/*@__PURE__*/new Set}addLayerUpdate(J){this.layerUpdates.add(J)}clearLayerUpdates(){this.layerUpdates.clear()}}class eX extends z7{constructor(J,Q,Z){super(void 0,J[0].width,J[0].height,Q,Z,301);this.isCompressedCubeTexture=!0,this.isCubeTexture=!0,this.image=J}}class JH extends R0{constructor(J,Q,Z,$,W,Y,X,H,K){super(J,Q,Z,$,W,Y,X,H,K);this.isCanvasTexture=!0,this.needsUpdate=!0}}class TQ extends R0{constructor(J,Q,Z,$,W,Y,X,H,K,G=1026){if(G!==1026&&G!==1027)throw Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");if(Z===void 0&&G===1026)Z=1014;if(Z===void 0&&G===1027)Z=1020;super(null,$,W,Y,X,H,G,Z,K);this.isDepthTexture=!0,this.image={width:J,height:Q},this.magFilter=X!==void 0?X:1003,this.minFilter=H!==void 0?H:1003,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(J){return super.copy(J),this.compareFunction=J.compareFunction,this}toJSON(J){let Q=super.toJSON(J);if(this.compareFunction!==null)Q.compareFunction=this.compareFunction;return Q}}class D8{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(J,Q){let Z=this.getUtoTmapping(J);return this.getPoint(Z,Q)}getPoints(J=5){let Q=[];for(let Z=0;Z<=J;Z++)Q.push(this.getPoint(Z/J));return Q}getSpacedPoints(J=5){let Q=[];for(let Z=0;Z<=J;Z++)Q.push(this.getPointAt(Z/J));return Q}getLength(){let J=this.getLengths();return J[J.length-1]}getLengths(J=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===J+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let Q=[],Z,$=this.getPoint(0),W=0;Q.push(0);for(let Y=1;Y<=J;Y++)Z=this.getPoint(Y/J),W+=Z.distanceTo($),Q.push(W),$=Z;return this.cacheArcLengths=Q,Q}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(J,Q){let Z=this.getLengths(),$=0,W=Z.length,Y;if(Q)Y=Q;else Y=J*Z[W-1];let X=0,H=W-1,K;while(X<=H)if($=Math.floor(X+(H-X)/2),K=Z[$]-Y,K<0)X=$+1;else if(K>0)H=$-1;else{H=$;break}if($=H,Z[$]===Y)return $/(W-1);let G=Z[$],E=Z[$+1]-G,q=(Y-G)/E;return($+q)/(W-1)}getTangent(J,Q){let $=J-0.0001,W=J+0.0001;if($<0)$=0;if(W>1)W=1;let Y=this.getPoint($),X=this.getPoint(W),H=Q||(Y.isVector2?new i:new I);return H.copy(X).sub(Y).normalize(),H}getTangentAt(J,Q){let Z=this.getUtoTmapping(J);return this.getTangent(Z,Q)}computeFrenetFrames(J,Q){let Z=new I,$=[],W=[],Y=[],X=new I,H=new SJ;for(let q=0;q<=J;q++){let N=q/J;$[q]=this.getTangentAt(N,new I)}W[0]=new I,Y[0]=new I;let K=Number.MAX_VALUE,G=Math.abs($[0].x),U=Math.abs($[0].y),E=Math.abs($[0].z);if(G<=K)K=G,Z.set(1,0,0);if(U<=K)K=U,Z.set(0,1,0);if(E<=K)Z.set(0,0,1);X.crossVectors($[0],Z).normalize(),W[0].crossVectors($[0],X),Y[0].crossVectors($[0],W[0]);for(let q=1;q<=J;q++){if(W[q]=W[q-1].clone(),Y[q]=Y[q-1].clone(),X.crossVectors($[q-1],$[q]),X.length()>Number.EPSILON){X.normalize();let N=Math.acos(cJ($[q-1].dot($[q]),-1,1));W[q].applyMatrix4(H.makeRotationAxis(X,N))}Y[q].crossVectors($[q],W[q])}if(Q===!0){let q=Math.acos(cJ(W[0].dot(W[J]),-1,1));if(q/=J,$[0].dot(X.crossVectors(W[0],W[J]))>0)q=-q;for(let N=1;N<=J;N++)W[N].applyMatrix4(H.makeRotationAxis($[N],q*N)),Y[N].crossVectors($[N],W[N])}return{tangents:$,normals:W,binormals:Y}}clone(){return new this.constructor().copy(this)}copy(J){return this.arcLengthDivisions=J.arcLengthDivisions,this}toJSON(){let J={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return J.arcLengthDivisions=this.arcLengthDivisions,J.type=this.type,J}fromJSON(J){return this.arcLengthDivisions=J.arcLengthDivisions,this}}class C7 extends D8{constructor(J=0,Q=0,Z=1,$=1,W=0,Y=Math.PI*2,X=!1,H=0){super();this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=J,this.aY=Q,this.xRadius=Z,this.yRadius=$,this.aStartAngle=W,this.aEndAngle=Y,this.aClockwise=X,this.aRotation=H}getPoint(J,Q=new i){let Z=Q,$=Math.PI*2,W=this.aEndAngle-this.aStartAngle,Y=Math.abs(W)<Number.EPSILON;while(W<0)W+=$;while(W>$)W-=$;if(W<Number.EPSILON)if(Y)W=0;else W=$;if(this.aClockwise===!0&&!Y)if(W===$)W=-$;else W=W-$;let X=this.aStartAngle+J*W,H=this.aX+this.xRadius*Math.cos(X),K=this.aY+this.yRadius*Math.sin(X);if(this.aRotation!==0){let G=Math.cos(this.aRotation),U=Math.sin(this.aRotation),E=H-this.aX,q=K-this.aY;H=E*G-q*U+this.aX,K=E*U+q*G+this.aY}return Z.set(H,K)}copy(J){return super.copy(J),this.aX=J.aX,this.aY=J.aY,this.xRadius=J.xRadius,this.yRadius=J.yRadius,this.aStartAngle=J.aStartAngle,this.aEndAngle=J.aEndAngle,this.aClockwise=J.aClockwise,this.aRotation=J.aRotation,this}toJSON(){let J=super.toJSON();return J.aX=this.aX,J.aY=this.aY,J.xRadius=this.xRadius,J.yRadius=this.yRadius,J.aStartAngle=this.aStartAngle,J.aEndAngle=this.aEndAngle,J.aClockwise=this.aClockwise,J.aRotation=this.aRotation,J}fromJSON(J){return super.fromJSON(J),this.aX=J.aX,this.aY=J.aY,this.xRadius=J.xRadius,this.yRadius=J.yRadius,this.aStartAngle=J.aStartAngle,this.aEndAngle=J.aEndAngle,this.aClockwise=J.aClockwise,this.aRotation=J.aRotation,this}}class KW extends C7{constructor(J,Q,Z,$,W,Y){super(J,Q,Z,Z,$,W,Y);this.isArcCurve=!0,this.type="ArcCurve"}}function QH(){let J=0,Q=0,Z=0,$=0;function W(Y,X,H,K){J=Y,Q=H,Z=-3*Y+3*X-2*H-K,$=2*Y-2*X+H+K}return{initCatmullRom:function(Y,X,H,K,G){W(X,H,G*(H-Y),G*(K-X))},initNonuniformCatmullRom:function(Y,X,H,K,G,U,E){let q=(X-Y)/G-(H-Y)/(G+U)+(H-X)/U,N=(H-X)/U-(K-X)/(U+E)+(K-H)/E;q*=U,N*=U,W(X,H,q,N)},calc:function(Y){let X=Y*Y,H=X*Y;return J+Q*Y+Z*X+$*H}}}var aZ=/*@__PURE__*/new I,bY=/*@__PURE__*/new QH,hY=/*@__PURE__*/new QH,fY=/*@__PURE__*/new QH;class GW extends D8{constructor(J=[],Q=!1,Z="centripetal",$=0.5){super();this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=J,this.closed=Q,this.curveType=Z,this.tension=$}getPoint(J,Q=new I){let Z=Q,$=this.points,W=$.length,Y=(W-(this.closed?0:1))*J,X=Math.floor(Y),H=Y-X;if(this.closed)X+=X>0?0:(Math.floor(Math.abs(X)/W)+1)*W;else if(H===0&&X===W-1)X=W-2,H=1;let K,G;if(this.closed||X>0)K=$[(X-1)%W];else aZ.subVectors($[0],$[1]).add($[0]),K=aZ;let U=$[X%W],E=$[(X+1)%W];if(this.closed||X+2<W)G=$[(X+2)%W];else aZ.subVectors($[W-1],$[W-2]).add($[W-1]),G=aZ;if(this.curveType==="centripetal"||this.curveType==="chordal"){let q=this.curveType==="chordal"?0.5:0.25,N=Math.pow(K.distanceToSquared(U),q),k=Math.pow(U.distanceToSquared(E),q),V=Math.pow(E.distanceToSquared(G),q);if(k<0.0001)k=1;if(N<0.0001)N=k;if(V<0.0001)V=k;bY.initNonuniformCatmullRom(K.x,U.x,E.x,G.x,N,k,V),hY.initNonuniformCatmullRom(K.y,U.y,E.y,G.y,N,k,V),fY.initNonuniformCatmullRom(K.z,U.z,E.z,G.z,N,k,V)}else if(this.curveType==="catmullrom")bY.initCatmullRom(K.x,U.x,E.x,G.x,this.tension),hY.initCatmullRom(K.y,U.y,E.y,G.y,this.tension),fY.initCatmullRom(K.z,U.z,E.z,G.z,this.tension);return Z.set(bY.calc(H),hY.calc(H),fY.calc(H)),Z}copy(J){super.copy(J),this.points=[];for(let Q=0,Z=J.points.length;Q<Z;Q++){let $=J.points[Q];this.points.push($.clone())}return this.closed=J.closed,this.curveType=J.curveType,this.tension=J.tension,this}toJSON(){let J=super.toJSON();J.points=[];for(let Q=0,Z=this.points.length;Q<Z;Q++){let $=this.points[Q];J.points.push($.toArray())}return J.closed=this.closed,J.curveType=this.curveType,J.tension=this.tension,J}fromJSON(J){super.fromJSON(J),this.points=[];for(let Q=0,Z=J.points.length;Q<Z;Q++){let $=J.points[Q];this.points.push(new I().fromArray($))}return this.closed=J.closed,this.curveType=J.curveType,this.tension=J.tension,this}}function FG(J,Q,Z,$,W){let Y=($-Q)*0.5,X=(W-Z)*0.5,H=J*J,K=J*H;return(2*Z-2*$+Y+X)*K+(-3*Z+3*$-2*Y-X)*H+Y*J+Z}function qN(J,Q){let Z=1-J;return Z*Z*Q}function NN(J,Q){return 2*(1-J)*J*Q}function ON(J,Q){return J*J*Q}function JQ(J,Q,Z,$){return qN(J,Q)+NN(J,Z)+ON(J,$)}function RN(J,Q){let Z=1-J;return Z*Z*Z*Q}function kN(J,Q){let Z=1-J;return 3*Z*Z*J*Q}function VN(J,Q){return 3*(1-J)*J*J*Q}function FN(J,Q){return J*J*J*Q}function QQ(J,Q,Z,$,W){return RN(J,Q)+kN(J,Z)+VN(J,$)+FN(J,W)}class SQ extends D8{constructor(J=new i,Q=new i,Z=new i,$=new i){super();this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=J,this.v1=Q,this.v2=Z,this.v3=$}getPoint(J,Q=new i){let Z=Q,$=this.v0,W=this.v1,Y=this.v2,X=this.v3;return Z.set(QQ(J,$.x,W.x,Y.x,X.x),QQ(J,$.y,W.y,Y.y,X.y)),Z}copy(J){return super.copy(J),this.v0.copy(J.v0),this.v1.copy(J.v1),this.v2.copy(J.v2),this.v3.copy(J.v3),this}toJSON(){let J=super.toJSON();return J.v0=this.v0.toArray(),J.v1=this.v1.toArray(),J.v2=this.v2.toArray(),J.v3=this.v3.toArray(),J}fromJSON(J){return super.fromJSON(J),this.v0.fromArray(J.v0),this.v1.fromArray(J.v1),this.v2.fromArray(J.v2),this.v3.fromArray(J.v3),this}}class UW extends D8{constructor(J=new I,Q=new I,Z=new I,$=new I){super();this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=J,this.v1=Q,this.v2=Z,this.v3=$}getPoint(J,Q=new I){let Z=Q,$=this.v0,W=this.v1,Y=this.v2,X=this.v3;return Z.set(QQ(J,$.x,W.x,Y.x,X.x),QQ(J,$.y,W.y,Y.y,X.y),QQ(J,$.z,W.z,Y.z,X.z)),Z}copy(J){return super.copy(J),this.v0.copy(J.v0),this.v1.copy(J.v1),this.v2.copy(J.v2),this.v3.copy(J.v3),this}toJSON(){let J=super.toJSON();return J.v0=this.v0.toArray(),J.v1=this.v1.toArray(),J.v2=this.v2.toArray(),J.v3=this.v3.toArray(),J}fromJSON(J){return super.fromJSON(J),this.v0.fromArray(J.v0),this.v1.fromArray(J.v1),this.v2.fromArray(J.v2),this.v3.fromArray(J.v3),this}}class jQ extends D8{constructor(J=new i,Q=new i){super();this.isLineCurve=!0,this.type="LineCurve",this.v1=J,this.v2=Q}getPoint(J,Q=new i){let Z=Q;if(J===1)Z.copy(this.v2);else Z.copy(this.v2).sub(this.v1),Z.multiplyScalar(J).add(this.v1);return Z}getPointAt(J,Q){return this.getPoint(J,Q)}getTangent(J,Q=new i){return Q.subVectors(this.v2,this.v1).normalize()}getTangentAt(J,Q){return this.getTangent(J,Q)}copy(J){return super.copy(J),this.v1.copy(J.v1),this.v2.copy(J.v2),this}toJSON(){let J=super.toJSON();return J.v1=this.v1.toArray(),J.v2=this.v2.toArray(),J}fromJSON(J){return super.fromJSON(J),this.v1.fromArray(J.v1),this.v2.fromArray(J.v2),this}}class EW extends D8{constructor(J=new I,Q=new I){super();this.isLineCurve3=!0,this.type="LineCurve3",this.v1=J,this.v2=Q}getPoint(J,Q=new I){let Z=Q;if(J===1)Z.copy(this.v2);else Z.copy(this.v2).sub(this.v1),Z.multiplyScalar(J).add(this.v1);return Z}getPointAt(J,Q){return this.getPoint(J,Q)}getTangent(J,Q=new I){return Q.subVectors(this.v2,this.v1).normalize()}getTangentAt(J,Q){return this.getTangent(J,Q)}copy(J){return super.copy(J),this.v1.copy(J.v1),this.v2.copy(J.v2),this}toJSON(){let J=super.toJSON();return J.v1=this.v1.toArray(),J.v2=this.v2.toArray(),J}fromJSON(J){return super.fromJSON(J),this.v1.fromArray(J.v1),this.v2.fromArray(J.v2),this}}class vQ extends D8{constructor(J=new i,Q=new i,Z=new i){super();this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=J,this.v1=Q,this.v2=Z}getPoint(J,Q=new i){let Z=Q,$=this.v0,W=this.v1,Y=this.v2;return Z.set(JQ(J,$.x,W.x,Y.x),JQ(J,$.y,W.y,Y.y)),Z}copy(J){return super.copy(J),this.v0.copy(J.v0),this.v1.copy(J.v1),this.v2.copy(J.v2),this}toJSON(){let J=super.toJSON();return J.v0=this.v0.toArray(),J.v1=this.v1.toArray(),J.v2=this.v2.toArray(),J}fromJSON(J){return super.fromJSON(J),this.v0.fromArray(J.v0),this.v1.fromArray(J.v1),this.v2.fromArray(J.v2),this}}class yQ extends D8{constructor(J=new I,Q=new I,Z=new I){super();this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=J,this.v1=Q,this.v2=Z}getPoint(J,Q=new I){let Z=Q,$=this.v0,W=this.v1,Y=this.v2;return Z.set(JQ(J,$.x,W.x,Y.x),JQ(J,$.y,W.y,Y.y),JQ(J,$.z,W.z,Y.z)),Z}copy(J){return super.copy(J),this.v0.copy(J.v0),this.v1.copy(J.v1),this.v2.copy(J.v2),this}toJSON(){let J=super.toJSON();return J.v0=this.v0.toArray(),J.v1=this.v1.toArray(),J.v2=this.v2.toArray(),J}fromJSON(J){return super.fromJSON(J),this.v0.fromArray(J.v0),this.v1.fromArray(J.v1),this.v2.fromArray(J.v2),this}}class xQ extends D8{constructor(J=[]){super();this.isSplineCurve=!0,this.type="SplineCurve",this.points=J}getPoint(J,Q=new i){let Z=Q,$=this.points,W=($.length-1)*J,Y=Math.floor(W),X=W-Y,H=$[Y===0?Y:Y-1],K=$[Y],G=$[Y>$.length-2?$.length-1:Y+1],U=$[Y>$.length-3?$.length-1:Y+2];return Z.set(FG(X,H.x,K.x,G.x,U.x),FG(X,H.y,K.y,G.y,U.y)),Z}copy(J){super.copy(J),this.points=[];for(let Q=0,Z=J.points.length;Q<Z;Q++){let $=J.points[Q];this.points.push($.clone())}return this}toJSON(){let J=super.toJSON();J.points=[];for(let Q=0,Z=this.points.length;Q<Z;Q++){let $=this.points[Q];J.points.push($.toArray())}return J}fromJSON(J){super.fromJSON(J),this.points=[];for(let Q=0,Z=J.points.length;Q<Z;Q++){let $=J.points[Q];this.points.push(new i().fromArray($))}return this}}var E$=/*@__PURE__*/Object.freeze({__proto__:null,ArcCurve:KW,CatmullRomCurve3:GW,CubicBezierCurve:SQ,CubicBezierCurve3:UW,EllipseCurve:C7,LineCurve:jQ,LineCurve3:EW,QuadraticBezierCurve:vQ,QuadraticBezierCurve3:yQ,SplineCurve:xQ});class qW extends D8{constructor(){super();this.type="CurvePath",this.curves=[],this.autoClose=!1}add(J){this.curves.push(J)}closePath(){let J=this.curves[0].getPoint(0),Q=this.curves[this.curves.length-1].getPoint(1);if(!J.equals(Q)){let Z=J.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new E$[Z](Q,J))}return this}getPoint(J,Q){let Z=J*this.getLength(),$=this.getCurveLengths(),W=0;while(W<$.length){if($[W]>=Z){let Y=$[W]-Z,X=this.curves[W],H=X.getLength(),K=H===0?0:1-Y/H;return X.getPointAt(K,Q)}W++}return null}getLength(){let J=this.getCurveLengths();return J[J.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let J=[],Q=0;for(let Z=0,$=this.curves.length;Z<$;Z++)Q+=this.curves[Z].getLength(),J.push(Q);return this.cacheLengths=J,J}getSpacedPoints(J=40){let Q=[];for(let Z=0;Z<=J;Z++)Q.push(this.getPoint(Z/J));if(this.autoClose)Q.push(Q[0]);return Q}getPoints(J=12){let Q=[],Z;for(let $=0,W=this.curves;$<W.length;$++){let Y=W[$],X=Y.isEllipseCurve?J*2:Y.isLineCurve||Y.isLineCurve3?1:Y.isSplineCurve?J*Y.points.length:J,H=Y.getPoints(X);for(let K=0;K<H.length;K++){let G=H[K];if(Z&&Z.equals(G))continue;Q.push(G),Z=G}}if(this.autoClose&&Q.length>1&&!Q[Q.length-1].equals(Q[0]))Q.push(Q[0]);return Q}copy(J){super.copy(J),this.curves=[];for(let Q=0,Z=J.curves.length;Q<Z;Q++){let $=J.curves[Q];this.curves.push($.clone())}return this.autoClose=J.autoClose,this}toJSON(){let J=super.toJSON();J.autoClose=this.autoClose,J.curves=[];for(let Q=0,Z=this.curves.length;Q<Z;Q++){let $=this.curves[Q];J.curves.push($.toJSON())}return J}fromJSON(J){super.fromJSON(J),this.autoClose=J.autoClose,this.curves=[];for(let Q=0,Z=J.curves.length;Q<Z;Q++){let $=J.curves[Q];this.curves.push(new E$[$.type]().fromJSON($))}return this}}class $6 extends qW{constructor(J){super();if(this.type="Path",this.currentPoint=new i,J)this.setFromPoints(J)}setFromPoints(J){this.moveTo(J[0].x,J[0].y);for(let Q=1,Z=J.length;Q<Z;Q++)this.lineTo(J[Q].x,J[Q].y);return this}moveTo(J,Q){return this.currentPoint.set(J,Q),this}lineTo(J,Q){let Z=new jQ(this.currentPoint.clone(),new i(J,Q));return this.curves.push(Z),this.currentPoint.set(J,Q),this}quadraticCurveTo(J,Q,Z,$){let W=new vQ(this.currentPoint.clone(),new i(J,Q),new i(Z,$));return this.curves.push(W),this.currentPoint.set(Z,$),this}bezierCurveTo(J,Q,Z,$,W,Y){let X=new SQ(this.currentPoint.clone(),new i(J,Q),new i(Z,$),new i(W,Y));return this.curves.push(X),this.currentPoint.set(W,Y),this}splineThru(J){let Q=[this.currentPoint.clone()].concat(J),Z=new xQ(Q);return this.curves.push(Z),this.currentPoint.copy(J[J.length-1]),this}arc(J,Q,Z,$,W,Y){let X=this.currentPoint.x,H=this.currentPoint.y;return this.absarc(J+X,Q+H,Z,$,W,Y),this}absarc(J,Q,Z,$,W,Y){return this.absellipse(J,Q,Z,Z,$,W,Y),this}ellipse(J,Q,Z,$,W,Y,X,H){let K=this.currentPoint.x,G=this.currentPoint.y;return this.absellipse(J+K,Q+G,Z,$,W,Y,X,H),this}absellipse(J,Q,Z,$,W,Y,X,H){let K=new C7(J,Q,Z,$,W,Y,X,H);if(this.curves.length>0){let U=K.getPoint(0);if(!U.equals(this.currentPoint))this.lineTo(U.x,U.y)}this.curves.push(K);let G=K.getPoint(1);return this.currentPoint.copy(G),this}copy(J){return super.copy(J),this.currentPoint.copy(J.currentPoint),this}toJSON(){let J=super.toJSON();return J.currentPoint=this.currentPoint.toArray(),J}fromJSON(J){return super.fromJSON(J),this.currentPoint.fromArray(J.currentPoint),this}}class _7 extends gJ{constructor(J=[new i(0,-0.5),new i(0.5,0),new i(0,0.5)],Q=12,Z=0,$=Math.PI*2){super();this.type="LatheGeometry",this.parameters={points:J,segments:Q,phiStart:Z,phiLength:$},Q=Math.floor(Q),$=cJ($,0,Math.PI*2);let W=[],Y=[],X=[],H=[],K=[],G=1/Q,U=new I,E=new i,q=new I,N=new I,k=new I,V=0,R=0;for(let O=0;O<=J.length-1;O++)switch(O){case 0:V=J[O+1].x-J[O].x,R=J[O+1].y-J[O].y,q.x=R*1,q.y=-V,q.z=R*0,k.copy(q),q.normalize(),H.push(q.x,q.y,q.z);break;case J.length-1:H.push(k.x,k.y,k.z);break;default:V=J[O+1].x-J[O].x,R=J[O+1].y-J[O].y,q.x=R*1,q.y=-V,q.z=R*0,N.copy(q),q.x+=k.x,q.y+=k.y,q.z+=k.z,q.normalize(),H.push(q.x,q.y,q.z),k.copy(N)}for(let O=0;O<=Q;O++){let D=Z+O*G*$,F=Math.sin(D),C=Math.cos(D);for(let P=0;P<=J.length-1;P++){U.x=J[P].x*F,U.y=J[P].y,U.z=J[P].x*C,Y.push(U.x,U.y,U.z),E.x=O/Q,E.y=P/(J.length-1),X.push(E.x,E.y);let M=H[3*P+0]*F,w=H[3*P+1],v=H[3*P+0]*C;K.push(M,w,v)}}for(let O=0;O<Q;O++)for(let D=0;D<J.length-1;D++){let F=D+O*J.length,C=F,P=F+J.length,M=F+J.length+1,w=F+1;W.push(C,P,w),W.push(M,w,P)}this.setIndex(W),this.setAttribute("position",new zJ(Y,3)),this.setAttribute("uv",new zJ(X,2)),this.setAttribute("normal",new zJ(K,3))}copy(J){return super.copy(J),this.parameters=Object.assign({},J.parameters),this}static fromJSON(J){return new _7(J.points,J.segments,J.phiStart,J.phiLength)}}class bQ extends _7{constructor(J=1,Q=1,Z=4,$=8){let W=new $6;W.absarc(0,-Q/2,J,Math.PI*1.5,0),W.absarc(0,Q/2,J,0,Math.PI*0.5);super(W.getPoints(Z),$);this.type="CapsuleGeometry",this.parameters={radius:J,length:Q,capSegments:Z,radialSegments:$}}static fromJSON(J){return new bQ(J.radius,J.length,J.capSegments,J.radialSegments)}}class hQ extends gJ{constructor(J=1,Q=32,Z=0,$=Math.PI*2){super();this.type="CircleGeometry",this.parameters={radius:J,segments:Q,thetaStart:Z,thetaLength:$},Q=Math.max(3,Q);let W=[],Y=[],X=[],H=[],K=new I,G=new i;Y.push(0,0,0),X.push(0,0,1),H.push(0.5,0.5);for(let U=0,E=3;U<=Q;U++,E+=3){let q=Z+U/Q*$;K.x=J*Math.cos(q),K.y=J*Math.sin(q),Y.push(K.x,K.y,K.z),X.push(0,0,1),G.x=(Y[E]/J+1)/2,G.y=(Y[E+1]/J+1)/2,H.push(G.x,G.y)}for(let U=1;U<=Q;U++)W.push(U,U+1,0);this.setIndex(W),this.setAttribute("position",new zJ(Y,3)),this.setAttribute("normal",new zJ(X,3)),this.setAttribute("uv",new zJ(H,2))}copy(J){return super.copy(J),this.parameters=Object.assign({},J.parameters),this}static fromJSON(J){return new hQ(J.radius,J.segments,J.thetaStart,J.thetaLength)}}class I6 extends gJ{constructor(J=1,Q=1,Z=1,$=32,W=1,Y=!1,X=0,H=Math.PI*2){super();this.type="CylinderGeometry",this.parameters={radiusTop:J,radiusBottom:Q,height:Z,radialSegments:$,heightSegments:W,openEnded:Y,thetaStart:X,thetaLength:H};let K=this;$=Math.floor($),W=Math.floor(W);let G=[],U=[],E=[],q=[],N=0,k=[],V=Z/2,R=0;if(O(),Y===!1){if(J>0)D(!0);if(Q>0)D(!1)}this.setIndex(G),this.setAttribute("position",new zJ(U,3)),this.setAttribute("normal",new zJ(E,3)),this.setAttribute("uv",new zJ(q,2));function O(){let F=new I,C=new I,P=0,M=(Q-J)/Z;for(let w=0;w<=W;w++){let v=[],L=w/W,_=L*(Q-J)+J;for(let j=0;j<=$;j++){let p=j/$,l=p*H+X,c=Math.sin(l),r=Math.cos(l);C.x=_*c,C.y=-L*Z+V,C.z=_*r,U.push(C.x,C.y,C.z),F.set(c,M,r).normalize(),E.push(F.x,F.y,F.z),q.push(p,1-L),v.push(N++)}k.push(v)}for(let w=0;w<$;w++)for(let v=0;v<W;v++){let L=k[v][w],_=k[v+1][w],j=k[v+1][w+1],p=k[v][w+1];if(J>0||v!==0)G.push(L,_,p),P+=3;if(Q>0||v!==W-1)G.push(_,j,p),P+=3}K.addGroup(R,P,0),R+=P}function D(F){let C=N,P=new i,M=new I,w=0,v=F===!0?J:Q,L=F===!0?1:-1;for(let j=1;j<=$;j++)U.push(0,V*L,0),E.push(0,L,0),q.push(0.5,0.5),N++;let _=N;for(let j=0;j<=$;j++){let l=j/$*H+X,c=Math.cos(l),r=Math.sin(l);M.x=v*r,M.y=V*L,M.z=v*c,U.push(M.x,M.y,M.z),E.push(0,L,0),P.x=c*0.5+0.5,P.y=r*0.5*L+0.5,q.push(P.x,P.y),N++}for(let j=0;j<$;j++){let p=C+j,l=_+j;if(F===!0)G.push(l,l+1,p);else G.push(l+1,l,p);w+=3}K.addGroup(R,w,F===!0?1:2),R+=w}}copy(J){return super.copy(J),this.parameters=Object.assign({},J.parameters),this}static fromJSON(J){return new I6(J.radiusTop,J.radiusBottom,J.height,J.radialSegments,J.heightSegments,J.openEnded,J.thetaStart,J.thetaLength)}}class fQ extends I6{constructor(J=1,Q=1,Z=32,$=1,W=!1,Y=0,X=Math.PI*2){super(0,J,Q,Z,$,W,Y,X);this.type="ConeGeometry",this.parameters={radius:J,height:Q,radialSegments:Z,heightSegments:$,openEnded:W,thetaStart:Y,thetaLength:X}}static fromJSON(J){return new fQ(J.radius,J.height,J.radialSegments,J.heightSegments,J.openEnded,J.thetaStart,J.thetaLength)}}class V9 extends gJ{constructor(J=[],Q=[],Z=1,$=0){super();this.type="PolyhedronGeometry",this.parameters={vertices:J,indices:Q,radius:Z,detail:$};let W=[],Y=[];if(X($),K(Z),G(),this.setAttribute("position",new zJ(W,3)),this.setAttribute("normal",new zJ(W.slice(),3)),this.setAttribute("uv",new zJ(Y,2)),$===0)this.computeVertexNormals();else this.normalizeNormals();function X(O){let D=new I,F=new I,C=new I;for(let P=0;P<Q.length;P+=3)q(Q[P+0],D),q(Q[P+1],F),q(Q[P+2],C),H(D,F,C,O)}function H(O,D,F,C){let P=C+1,M=[];for(let w=0;w<=P;w++){M[w]=[];let v=O.clone().lerp(F,w/P),L=D.clone().lerp(F,w/P),_=P-w;for(let j=0;j<=_;j++)if(j===0&&w===P)M[w][j]=v;else M[w][j]=v.clone().lerp(L,j/_)}for(let w=0;w<P;w++)for(let v=0;v<2*(P-w)-1;v++){let L=Math.floor(v/2);if(v%2===0)E(M[w][L+1]),E(M[w+1][L]),E(M[w][L]);else E(M[w][L+1]),E(M[w+1][L+1]),E(M[w+1][L])}}function K(O){let D=new I;for(let F=0;F<W.length;F+=3)D.x=W[F+0],D.y=W[F+1],D.z=W[F+2],D.normalize().multiplyScalar(O),W[F+0]=D.x,W[F+1]=D.y,W[F+2]=D.z}function G(){let O=new I;for(let D=0;D<W.length;D+=3){O.x=W[D+0],O.y=W[D+1],O.z=W[D+2];let F=V(O)/2/Math.PI+0.5,C=R(O)/Math.PI+0.5;Y.push(F,1-C)}N(),U()}function U(){for(let O=0;O<Y.length;O+=6){let D=Y[O+0],F=Y[O+2],C=Y[O+4],P=Math.max(D,F,C),M=Math.min(D,F,C);if(P>0.9&&M<0.1){if(D<0.2)Y[O+0]+=1;if(F<0.2)Y[O+2]+=1;if(C<0.2)Y[O+4]+=1}}}function E(O){W.push(O.x,O.y,O.z)}function q(O,D){let F=O*3;D.x=J[F+0],D.y=J[F+1],D.z=J[F+2]}function N(){let O=new I,D=new I,F=new I,C=new I,P=new i,M=new i,w=new i;for(let v=0,L=0;v<W.length;v+=9,L+=6){O.set(W[v+0],W[v+1],W[v+2]),D.set(W[v+3],W[v+4],W[v+5]),F.set(W[v+6],W[v+7],W[v+8]),P.set(Y[L+0],Y[L+1]),M.set(Y[L+2],Y[L+3]),w.set(Y[L+4],Y[L+5]),C.copy(O).add(D).add(F).divideScalar(3);let _=V(C);k(P,L+0,O,_),k(M,L+2,D,_),k(w,L+4,F,_)}}function k(O,D,F,C){if(C<0&&O.x===1)Y[D]=O.x-1;if(F.x===0&&F.z===0)Y[D]=C/2/Math.PI+0.5}function V(O){return Math.atan2(O.z,-O.x)}function R(O){return Math.atan2(-O.y,Math.sqrt(O.x*O.x+O.z*O.z))}}copy(J){return super.copy(J),this.parameters=Object.assign({},J.parameters),this}static fromJSON(J){return new V9(J.vertices,J.indices,J.radius,J.details)}}class gQ extends V9{constructor(J=1,Q=0){let Z=(1+Math.sqrt(5))/2,$=1/Z,W=[-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-$,-Z,0,-$,Z,0,$,-Z,0,$,Z,-$,-Z,0,-$,Z,0,$,-Z,0,$,Z,0,-Z,0,-$,Z,0,-$,-Z,0,$,Z,0,$],Y=[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9];super(W,Y,J,Q);this.type="DodecahedronGeometry",this.parameters={radius:J,detail:Q}}static fromJSON(J){return new gQ(J.radius,J.detail)}}var rZ=/*@__PURE__*/new I,tZ=/*@__PURE__*/new I,gY=/*@__PURE__*/new I,eZ=/*@__PURE__*/new r0;class NW extends gJ{constructor(J=null,Q=1){super();if(this.type="EdgesGeometry",this.parameters={geometry:J,thresholdAngle:Q},J!==null){let $=Math.pow(10,4),W=Math.cos(Q6*Q),Y=J.getIndex(),X=J.getAttribute("position"),H=Y?Y.count:X.count,K=[0,0,0],G=["a","b","c"],U=[,,,],E={},q=[];for(let N=0;N<H;N+=3){if(Y)K[0]=Y.getX(N),K[1]=Y.getX(N+1),K[2]=Y.getX(N+2);else K[0]=N,K[1]=N+1,K[2]=N+2;let{a:k,b:V,c:R}=eZ;if(k.fromBufferAttribute(X,K[0]),V.fromBufferAttribute(X,K[1]),R.fromBufferAttribute(X,K[2]),eZ.getNormal(gY),U[0]=`${Math.round(k.x*$)},${Math.round(k.y*$)},${Math.round(k.z*$)}`,U[1]=`${Math.round(V.x*$)},${Math.round(V.y*$)},${Math.round(V.z*$)}`,U[2]=`${Math.round(R.x*$)},${Math.round(R.y*$)},${Math.round(R.z*$)}`,U[0]===U[1]||U[1]===U[2]||U[2]===U[0])continue;for(let O=0;O<3;O++){let D=(O+1)%3,F=U[O],C=U[D],P=eZ[G[O]],M=eZ[G[D]],w=`${F}_${C}`,v=`${C}_${F}`;if(v in E&&E[v]){if(gY.dot(E[v].normal)<=W)q.push(P.x,P.y,P.z),q.push(M.x,M.y,M.z);E[v]=null}else if(!(w in E))E[w]={index0:K[O],index1:K[D],normal:gY.clone()}}}for(let N in E)if(E[N]){let{index0:k,index1:V}=E[N];rZ.fromBufferAttribute(X,k),tZ.fromBufferAttribute(X,V),q.push(rZ.x,rZ.y,rZ.z),q.push(tZ.x,tZ.y,tZ.z)}this.setAttribute("position",new zJ(q,3))}}copy(J){return super.copy(J),this.parameters=Object.assign({},J.parameters),this}}class E9 extends $6{constructor(J){super(J);this.uuid=N8(),this.type="Shape",this.holes=[]}getPointsHoles(J){let Q=[];for(let Z=0,$=this.holes.length;Z<$;Z++)Q[Z]=this.holes[Z].getPoints(J);return Q}extractPoints(J){return{shape:this.getPoints(J),holes:this.getPointsHoles(J)}}copy(J){super.copy(J),this.holes=[];for(let Q=0,Z=J.holes.length;Q<Z;Q++){let $=J.holes[Q];this.holes.push($.clone())}return this}toJSON(){let J=super.toJSON();J.uuid=this.uuid,J.holes=[];for(let Q=0,Z=this.holes.length;Q<Z;Q++){let $=this.holes[Q];J.holes.push($.toJSON())}return J}fromJSON(J){super.fromJSON(J),this.uuid=J.uuid,this.holes=[];for(let Q=0,Z=J.holes.length;Q<Z;Q++){let $=J.holes[Q];this.holes.push(new $6().fromJSON($))}return this}}var DN={triangulate:function(J,Q,Z=2){let $=Q&&Q.length,W=$?Q[0]*Z:J.length,Y=oU(J,0,W,Z,!0),X=[];if(!Y||Y.next===Y.prev)return X;let H,K,G,U,E,q,N;if($)Y=_N(J,Q,Y,Z);if(J.length>80*Z){H=G=J[0],K=U=J[1];for(let k=Z;k<W;k+=Z){if(E=J[k],q=J[k+1],E<H)H=E;if(q<K)K=q;if(E>G)G=E;if(q>U)U=q}N=Math.max(G-H,U-K),N=N!==0?32767/N:0}return ZQ(Y,X,Z,H,K,N,0),X}};function oU(J,Q,Z,$,W){let Y,X;if(W===xN(J,Q,Z,$)>0)for(Y=Q;Y<Z;Y+=$)X=DG(Y,J[Y],J[Y+1],X);else for(Y=Z-$;Y>=Q;Y-=$)X=DG(Y,J[Y],J[Y+1],X);if(X&&OW(X,X.next))WQ(X),X=X.next;return X}function W6(J,Q){if(!J)return J;if(!Q)Q=J;let Z=J,$;do if($=!1,!Z.steiner&&(OW(Z,Z.next)||F0(Z.prev,Z,Z.next)===0)){if(WQ(Z),Z=Q=Z.prev,Z===Z.next)break;$=!0}else Z=Z.next;while($||Z!==Q);return Q}function ZQ(J,Q,Z,$,W,Y,X){if(!J)return;if(!X&&Y)PN(J,$,W,Y);let H=J,K,G;while(J.prev!==J.next){if(K=J.prev,G=J.next,Y?LN(J,$,W,Y):BN(J)){Q.push(K.i/Z|0),Q.push(J.i/Z|0),Q.push(G.i/Z|0),WQ(J),J=G.next,H=G.next;continue}if(J=G,J===H){if(!X)ZQ(W6(J),Q,Z,$,W,Y,1);else if(X===1)J=zN(W6(J),Q,Z),ZQ(J,Q,Z,$,W,Y,2);else if(X===2)CN(J,Q,Z,$,W,Y);break}}}function BN(J){let Q=J.prev,Z=J,$=J.next;if(F0(Q,Z,$)>=0)return!1;let W=Q.x,Y=Z.x,X=$.x,H=Q.y,K=Z.y,G=$.y,U=W<Y?W<X?W:X:Y<X?Y:X,E=H<K?H<G?H:G:K<G?K:G,q=W>Y?W>X?W:X:Y>X?Y:X,N=H>K?H>G?H:G:K>G?K:G,k=$.next;while(k!==Q){if(k.x>=U&&k.x<=q&&k.y>=E&&k.y<=N&&Z7(W,H,Y,K,X,G,k.x,k.y)&&F0(k.prev,k,k.next)>=0)return!1;k=k.next}return!0}function LN(J,Q,Z,$){let W=J.prev,Y=J,X=J.next;if(F0(W,Y,X)>=0)return!1;let H=W.x,K=Y.x,G=X.x,U=W.y,E=Y.y,q=X.y,N=H<K?H<G?H:G:K<G?K:G,k=U<E?U<q?U:q:E<q?E:q,V=H>K?H>G?H:G:K>G?K:G,R=U>E?U>q?U:q:E>q?E:q,O=cY(N,k,Q,Z,$),D=cY(V,R,Q,Z,$),F=J.prevZ,C=J.nextZ;while(F&&F.z>=O&&C&&C.z<=D){if(F.x>=N&&F.x<=V&&F.y>=k&&F.y<=R&&F!==W&&F!==X&&Z7(H,U,K,E,G,q,F.x,F.y)&&F0(F.prev,F,F.next)>=0)return!1;if(F=F.prevZ,C.x>=N&&C.x<=V&&C.y>=k&&C.y<=R&&C!==W&&C!==X&&Z7(H,U,K,E,G,q,C.x,C.y)&&F0(C.prev,C,C.next)>=0)return!1;C=C.nextZ}while(F&&F.z>=O){if(F.x>=N&&F.x<=V&&F.y>=k&&F.y<=R&&F!==W&&F!==X&&Z7(H,U,K,E,G,q,F.x,F.y)&&F0(F.prev,F,F.next)>=0)return!1;F=F.prevZ}while(C&&C.z<=D){if(C.x>=N&&C.x<=V&&C.y>=k&&C.y<=R&&C!==W&&C!==X&&Z7(H,U,K,E,G,q,C.x,C.y)&&F0(C.prev,C,C.next)>=0)return!1;C=C.nextZ}return!0}function zN(J,Q,Z){let $=J;do{let W=$.prev,Y=$.next.next;if(!OW(W,Y)&&aU(W,$,$.next,Y)&&$Q(W,Y)&&$Q(Y,W))Q.push(W.i/Z|0),Q.push($.i/Z|0),Q.push(Y.i/Z|0),WQ($),WQ($.next),$=J=Y;$=$.next}while($!==J);return W6($)}function CN(J,Q,Z,$,W,Y){let X=J;do{let H=X.next.next;while(H!==X.prev){if(X.i!==H.i&&jN(X,H)){let K=rU(X,H);X=W6(X,X.next),K=W6(K,K.next),ZQ(X,Q,Z,$,W,Y,0),ZQ(K,Q,Z,$,W,Y,0);return}H=H.next}X=X.next}while(X!==J)}function _N(J,Q,Z,$){let W=[],Y,X,H,K,G;for(Y=0,X=Q.length;Y<X;Y++){if(H=Q[Y]*$,K=Y<X-1?Q[Y+1]*$:J.length,G=oU(J,H,K,$,!1),G===G.next)G.steiner=!0;W.push(SN(G))}W.sort(MN);for(Y=0;Y<W.length;Y++)Z=IN(W[Y],Z);return Z}function MN(J,Q){return J.x-Q.x}function IN(J,Q){let Z=wN(J,Q);if(!Z)return Q;let $=rU(Z,J);return W6($,$.next),W6(Z,Z.next)}function wN(J,Q){let Z=Q,$=-1/0,W,Y=J.x,X=J.y;do{if(X<=Z.y&&X>=Z.next.y&&Z.next.y!==Z.y){let q=Z.x+(X-Z.y)*(Z.next.x-Z.x)/(Z.next.y-Z.y);if(q<=Y&&q>$){if($=q,W=Z.x<Z.next.x?Z:Z.next,q===Y)return W}}Z=Z.next}while(Z!==Q);if(!W)return null;let H=W,K=W.x,G=W.y,U=1/0,E;Z=W;do{if(Y>=Z.x&&Z.x>=K&&Y!==Z.x&&Z7(X<G?Y:$,X,K,G,X<G?$:Y,X,Z.x,Z.y)){if(E=Math.abs(X-Z.y)/(Y-Z.x),$Q(Z,J)&&(E<U||E===U&&(Z.x>W.x||Z.x===W.x&&AN(W,Z))))W=Z,U=E}Z=Z.next}while(Z!==H);return W}function AN(J,Q){return F0(J.prev,J,Q.prev)<0&&F0(Q.next,J,J.next)<0}function PN(J,Q,Z,$){let W=J;do{if(W.z===0)W.z=cY(W.x,W.y,Q,Z,$);W.prevZ=W.prev,W.nextZ=W.next,W=W.next}while(W!==J);W.prevZ.nextZ=null,W.prevZ=null,TN(W)}function TN(J){let Q,Z,$,W,Y,X,H,K,G=1;do{Z=J,J=null,Y=null,X=0;while(Z){X++,$=Z,H=0;for(Q=0;Q<G;Q++)if(H++,$=$.nextZ,!$)break;K=G;while(H>0||K>0&&$){if(H!==0&&(K===0||!$||Z.z<=$.z))W=Z,Z=Z.nextZ,H--;else W=$,$=$.nextZ,K--;if(Y)Y.nextZ=W;else J=W;W.prevZ=Y,Y=W}Z=$}Y.nextZ=null,G*=2}while(X>1);return J}function cY(J,Q,Z,$,W){return J=(J-Z)*W|0,Q=(Q-$)*W|0,J=(J|J<<8)&16711935,J=(J|J<<4)&252645135,J=(J|J<<2)&858993459,J=(J|J<<1)&1431655765,Q=(Q|Q<<8)&16711935,Q=(Q|Q<<4)&252645135,Q=(Q|Q<<2)&858993459,Q=(Q|Q<<1)&1431655765,J|Q<<1}function SN(J){let Q=J,Z=J;do{if(Q.x<Z.x||Q.x===Z.x&&Q.y<Z.y)Z=Q;Q=Q.next}while(Q!==J);return Z}function Z7(J,Q,Z,$,W,Y,X,H){return(W-X)*(Q-H)>=(J-X)*(Y-H)&&(J-X)*($-H)>=(Z-X)*(Q-H)&&(Z-X)*(Y-H)>=(W-X)*($-H)}function jN(J,Q){return J.next.i!==Q.i&&J.prev.i!==Q.i&&!vN(J,Q)&&($Q(J,Q)&&$Q(Q,J)&&yN(J,Q)&&(F0(J.prev,J,Q.prev)||F0(J,Q.prev,Q))||OW(J,Q)&&F0(J.prev,J,J.next)>0&&F0(Q.prev,Q,Q.next)>0)}function F0(J,Q,Z){return(Q.y-J.y)*(Z.x-Q.x)-(Q.x-J.x)*(Z.y-Q.y)}function OW(J,Q){return J.x===Q.x&&J.y===Q.y}function aU(J,Q,Z,$){let W=Q$(F0(J,Q,Z)),Y=Q$(F0(J,Q,$)),X=Q$(F0(Z,$,J)),H=Q$(F0(Z,$,Q));if(W!==Y&&X!==H)return!0;if(W===0&&J$(J,Z,Q))return!0;if(Y===0&&J$(J,$,Q))return!0;if(X===0&&J$(Z,J,$))return!0;if(H===0&&J$(Z,Q,$))return!0;return!1}function J$(J,Q,Z){return Q.x<=Math.max(J.x,Z.x)&&Q.x>=Math.min(J.x,Z.x)&&Q.y<=Math.max(J.y,Z.y)&&Q.y>=Math.min(J.y,Z.y)}function Q$(J){return J>0?1:J<0?-1:0}function vN(J,Q){let Z=J;do{if(Z.i!==J.i&&Z.next.i!==J.i&&Z.i!==Q.i&&Z.next.i!==Q.i&&aU(Z,Z.next,J,Q))return!0;Z=Z.next}while(Z!==J);return!1}function $Q(J,Q){return F0(J.prev,J,J.next)<0?F0(J,Q,J.next)>=0&&F0(J,J.prev,Q)>=0:F0(J,Q,J.prev)<0||F0(J,J.next,Q)<0}function yN(J,Q){let Z=J,$=!1,W=(J.x+Q.x)/2,Y=(J.y+Q.y)/2;do{if(Z.y>Y!==Z.next.y>Y&&Z.next.y!==Z.y&&W<(Z.next.x-Z.x)*(Y-Z.y)/(Z.next.y-Z.y)+Z.x)$=!$;Z=Z.next}while(Z!==J);return $}function rU(J,Q){let Z=new nY(J.i,J.x,J.y),$=new nY(Q.i,Q.x,Q.y),W=J.next,Y=Q.prev;return J.next=Q,Q.prev=J,Z.next=W,W.prev=Z,$.next=Z,Z.prev=$,Y.next=$,$.prev=Y,$}function DG(J,Q,Z,$){let W=new nY(J,Q,Z);if(!$)W.prev=W,W.next=W;else W.next=$.next,W.prev=$,$.next.prev=W,$.next=W;return W}function WQ(J){if(J.next.prev=J.prev,J.prev.next=J.next,J.prevZ)J.prevZ.nextZ=J.nextZ;if(J.nextZ)J.nextZ.prevZ=J.prevZ}function nY(J,Q,Z){this.i=J,this.x=Q,this.y=Z,this.prev=null,this.next=null,this.z=0,this.prevZ=null,this.nextZ=null,this.steiner=!1}function xN(J,Q,Z,$){let W=0;for(let Y=Q,X=Z-$;Y<Z;Y+=$)W+=(J[X]-J[Y])*(J[Y+1]+J[X+1]),X=Y;return W}class y8{static area(J){let Q=J.length,Z=0;for(let $=Q-1,W=0;W<Q;$=W++)Z+=J[$].x*J[W].y-J[W].x*J[$].y;return Z*0.5}static isClockWise(J){return y8.area(J)<0}static triangulateShape(J,Q){let Z=[],$=[],W=[];BG(J),LG(Z,J);let Y=J.length;Q.forEach(BG);for(let H=0;H<Q.length;H++)$.push(Y),Y+=Q[H].length,LG(Z,Q[H]);let X=DN.triangulate(Z,$);for(let H=0;H<X.length;H+=3)W.push(X.slice(H,H+3));return W}}function BG(J){let Q=J.length;if(Q>2&&J[Q-1].equals(J[0]))J.pop()}function LG(J,Q){for(let Z=0;Z<Q.length;Z++)J.push(Q[Z].x),J.push(Q[Z].y)}class pQ extends gJ{constructor(J=new E9([new i(0.5,0.5),new i(-0.5,0.5),new i(-0.5,-0.5),new i(0.5,-0.5)]),Q={}){super();this.type="ExtrudeGeometry",this.parameters={shapes:J,options:Q},J=Array.isArray(J)?J:[J];let Z=this,$=[],W=[];for(let X=0,H=J.length;X<H;X++){let K=J[X];Y(K)}this.setAttribute("position",new zJ($,3)),this.setAttribute("uv",new zJ(W,2)),this.computeVertexNormals();function Y(X){let H=[],K=Q.curveSegments!==void 0?Q.curveSegments:12,G=Q.steps!==void 0?Q.steps:1,U=Q.depth!==void 0?Q.depth:1,E=Q.bevelEnabled!==void 0?Q.bevelEnabled:!0,q=Q.bevelThickness!==void 0?Q.bevelThickness:0.2,N=Q.bevelSize!==void 0?Q.bevelSize:q-0.1,k=Q.bevelOffset!==void 0?Q.bevelOffset:0,V=Q.bevelSegments!==void 0?Q.bevelSegments:3,R=Q.extrudePath,O=Q.UVGenerator!==void 0?Q.UVGenerator:bN,D,F=!1,C,P,M,w;if(R)D=R.getSpacedPoints(G),F=!0,E=!1,C=R.computeFrenetFrames(G,!1),P=new I,M=new I,w=new I;if(!E)V=0,q=0,N=0,k=0;let v=X.extractPoints(K),L=v.shape,_=v.holes;if(!y8.isClockWise(L)){L=L.reverse();for(let $J=0,QJ=_.length;$J<QJ;$J++){let A=_[$J];if(y8.isClockWise(A))_[$J]=A.reverse()}}let p=y8.triangulateShape(L,_),l=L;for(let $J=0,QJ=_.length;$J<QJ;$J++){let A=_[$J];L=L.concat(A)}function c($J,QJ,A){if(!QJ)console.error("THREE.ExtrudeGeometry: vec does not exist");return $J.clone().addScaledVector(QJ,A)}let r=L.length,n=p.length;function WJ($J,QJ,A){let IJ,KJ,PJ,ZJ=$J.x-QJ.x,pJ=$J.y-QJ.y,VJ=A.x-$J.x,AJ=A.y-$J.y,S=ZJ*ZJ+pJ*pJ,B=ZJ*AJ-pJ*VJ;if(Math.abs(B)>Number.EPSILON){let h=Math.sqrt(S),t=Math.sqrt(VJ*VJ+AJ*AJ),JJ=QJ.x-pJ/h,s=QJ.y+ZJ/h,vJ=A.x-AJ/t,OJ=A.y+VJ/t,BJ=((vJ-JJ)*AJ-(OJ-s)*VJ)/(ZJ*AJ-pJ*VJ);IJ=JJ+ZJ*BJ-$J.x,KJ=s+pJ*BJ-$J.y;let uJ=IJ*IJ+KJ*KJ;if(uJ<=2)return new i(IJ,KJ);else PJ=Math.sqrt(uJ/2)}else{let h=!1;if(ZJ>Number.EPSILON){if(VJ>Number.EPSILON)h=!0}else if(ZJ<-Number.EPSILON){if(VJ<-Number.EPSILON)h=!0}else if(Math.sign(pJ)===Math.sign(AJ))h=!0;if(h)IJ=-pJ,KJ=ZJ,PJ=Math.sqrt(S);else IJ=ZJ,KJ=pJ,PJ=Math.sqrt(S/2)}return new i(IJ/PJ,KJ/PJ)}let d=[];for(let $J=0,QJ=l.length,A=QJ-1,IJ=$J+1;$J<QJ;$J++,A++,IJ++){if(A===QJ)A=0;if(IJ===QJ)IJ=0;d[$J]=WJ(l[$J],l[A],l[IJ])}let RJ=[],NJ,hJ=d.concat();for(let $J=0,QJ=_.length;$J<QJ;$J++){let A=_[$J];NJ=[];for(let IJ=0,KJ=A.length,PJ=KJ-1,ZJ=IJ+1;IJ<KJ;IJ++,PJ++,ZJ++){if(PJ===KJ)PJ=0;if(ZJ===KJ)ZJ=0;NJ[IJ]=WJ(A[IJ],A[PJ],A[ZJ])}RJ.push(NJ),hJ=hJ.concat(NJ)}for(let $J=0;$J<V;$J++){let QJ=$J/V,A=q*Math.cos(QJ*Math.PI/2),IJ=N*Math.sin(QJ*Math.PI/2)+k;for(let KJ=0,PJ=l.length;KJ<PJ;KJ++){let ZJ=c(l[KJ],d[KJ],IJ);wJ(ZJ.x,ZJ.y,-A)}for(let KJ=0,PJ=_.length;KJ<PJ;KJ++){let ZJ=_[KJ];NJ=RJ[KJ];for(let pJ=0,VJ=ZJ.length;pJ<VJ;pJ++){let AJ=c(ZJ[pJ],NJ[pJ],IJ);wJ(AJ.x,AJ.y,-A)}}}let eJ=N+k;for(let $J=0;$J<r;$J++){let QJ=E?c(L[$J],hJ[$J],eJ):L[$J];if(!F)wJ(QJ.x,QJ.y,0);else M.copy(C.normals[0]).multiplyScalar(QJ.x),P.copy(C.binormals[0]).multiplyScalar(QJ.y),w.copy(D[0]).add(M).add(P),wJ(w.x,w.y,w.z)}for(let $J=1;$J<=G;$J++)for(let QJ=0;QJ<r;QJ++){let A=E?c(L[QJ],hJ[QJ],eJ):L[QJ];if(!F)wJ(A.x,A.y,U/G*$J);else M.copy(C.normals[$J]).multiplyScalar(A.x),P.copy(C.binormals[$J]).multiplyScalar(A.y),w.copy(D[$J]).add(M).add(P),wJ(w.x,w.y,w.z)}for(let $J=V-1;$J>=0;$J--){let QJ=$J/V,A=q*Math.cos(QJ*Math.PI/2),IJ=N*Math.sin(QJ*Math.PI/2)+k;for(let KJ=0,PJ=l.length;KJ<PJ;KJ++){let ZJ=c(l[KJ],d[KJ],IJ);wJ(ZJ.x,ZJ.y,U+A)}for(let KJ=0,PJ=_.length;KJ<PJ;KJ++){let ZJ=_[KJ];NJ=RJ[KJ];for(let pJ=0,VJ=ZJ.length;pJ<VJ;pJ++){let AJ=c(ZJ[pJ],NJ[pJ],IJ);if(!F)wJ(AJ.x,AJ.y,U+A);else wJ(AJ.x,AJ.y+D[G-1].y,D[G-1].x+A)}}}o(),UJ();function o(){let $J=$.length/3;if(E){let QJ=0,A=r*QJ;for(let IJ=0;IJ<n;IJ++){let KJ=p[IJ];EJ(KJ[2]+A,KJ[1]+A,KJ[0]+A)}QJ=G+V*2,A=r*QJ;for(let IJ=0;IJ<n;IJ++){let KJ=p[IJ];EJ(KJ[0]+A,KJ[1]+A,KJ[2]+A)}}else{for(let QJ=0;QJ<n;QJ++){let A=p[QJ];EJ(A[2],A[1],A[0])}for(let QJ=0;QJ<n;QJ++){let A=p[QJ];EJ(A[0]+r*G,A[1]+r*G,A[2]+r*G)}}Z.addGroup($J,$.length/3-$J,0)}function UJ(){let $J=$.length/3,QJ=0;TJ(l,QJ),QJ+=l.length;for(let A=0,IJ=_.length;A<IJ;A++){let KJ=_[A];TJ(KJ,QJ),QJ+=KJ.length}Z.addGroup($J,$.length/3-$J,1)}function TJ($J,QJ){let A=$J.length;while(--A>=0){let IJ=A,KJ=A-1;if(KJ<0)KJ=$J.length-1;for(let PJ=0,ZJ=G+V*2;PJ<ZJ;PJ++){let pJ=r*PJ,VJ=r*(PJ+1),AJ=QJ+IJ+pJ,S=QJ+KJ+pJ,B=QJ+KJ+VJ,h=QJ+IJ+VJ;Q0(AJ,S,B,h)}}}function wJ($J,QJ,A){H.push($J),H.push(QJ),H.push(A)}function EJ($J,QJ,A){fJ($J),fJ(QJ),fJ(A);let IJ=$.length/3,KJ=O.generateTopUV(Z,$,IJ-3,IJ-2,IJ-1);sJ(KJ[0]),sJ(KJ[1]),sJ(KJ[2])}function Q0($J,QJ,A,IJ){fJ($J),fJ(QJ),fJ(IJ),fJ(QJ),fJ(A),fJ(IJ);let KJ=$.length/3,PJ=O.generateSideWallUV(Z,$,KJ-6,KJ-3,KJ-2,KJ-1);sJ(PJ[0]),sJ(PJ[1]),sJ(PJ[3]),sJ(PJ[1]),sJ(PJ[2]),sJ(PJ[3])}function fJ($J){$.push(H[$J*3+0]),$.push(H[$J*3+1]),$.push(H[$J*3+2])}function sJ($J){W.push($J.x),W.push($J.y)}}}copy(J){return super.copy(J),this.parameters=Object.assign({},J.parameters),this}toJSON(){let J=super.toJSON(),Q=this.parameters.shapes,Z=this.parameters.options;return hN(Q,Z,J)}static fromJSON(J,Q){let Z=[];for(let W=0,Y=J.shapes.length;W<Y;W++){let X=Q[J.shapes[W]];Z.push(X)}let $=J.options.extrudePath;if($!==void 0)J.options.extrudePath=new E$[$.type]().fromJSON($);return new pQ(Z,J.options)}}var bN={generateTopUV:function(J,Q,Z,$,W){let Y=Q[Z*3],X=Q[Z*3+1],H=Q[$*3],K=Q[$*3+1],G=Q[W*3],U=Q[W*3+1];return[new i(Y,X),new i(H,K),new i(G,U)]},generateSideWallUV:function(J,Q,Z,$,W,Y){let X=Q[Z*3],H=Q[Z*3+1],K=Q[Z*3+2],G=Q[$*3],U=Q[$*3+1],E=Q[$*3+2],q=Q[W*3],N=Q[W*3+1],k=Q[W*3+2],V=Q[Y*3],R=Q[Y*3+1],O=Q[Y*3+2];if(Math.abs(H-U)<Math.abs(X-G))return[new i(X,1-K),new i(G,1-E),new i(q,1-k),new i(V,1-O)];else return[new i(H,1-K),new i(U,1-E),new i(N,1-k),new i(R,1-O)]}};function hN(J,Q,Z){if(Z.shapes=[],Array.isArray(J))for(let $=0,W=J.length;$<W;$++){let Y=J[$];Z.shapes.push(Y.uuid)}else Z.shapes.push(J.uuid);if(Z.options=Object.assign({},Q),Q.extrudePath!==void 0)Z.options.extrudePath=Q.extrudePath.toJSON();return Z}class mQ extends V9{constructor(J=1,Q=0){let Z=(1+Math.sqrt(5))/2,$=[-1,Z,0,1,Z,0,-1,-Z,0,1,-Z,0,0,-1,Z,0,1,Z,0,-1,-Z,0,1,-Z,Z,0,-1,Z,0,1,-Z,0,-1,-Z,0,1],W=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super($,W,J,Q);this.type="IcosahedronGeometry",this.parameters={radius:J,detail:Q}}static fromJSON(J){return new mQ(J.radius,J.detail)}}class M7 extends V9{constructor(J=1,Q=0){let Z=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],$=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(Z,$,J,Q);this.type="OctahedronGeometry",this.parameters={radius:J,detail:Q}}static fromJSON(J){return new M7(J.radius,J.detail)}}class F9 extends gJ{constructor(J=1,Q=1,Z=1,$=1){super();this.type="PlaneGeometry",this.parameters={width:J,height:Q,widthSegments:Z,heightSegments:$};let W=J/2,Y=Q/2,X=Math.floor(Z),H=Math.floor($),K=X+1,G=H+1,U=J/X,E=Q/H,q=[],N=[],k=[],V=[];for(let R=0;R<G;R++){let O=R*E-Y;for(let D=0;D<K;D++){let F=D*U-W;N.push(F,-O,0),k.push(0,0,1),V.push(D/X),V.push(1-R/H)}}for(let R=0;R<H;R++)for(let O=0;O<X;O++){let D=O+K*R,F=O+K*(R+1),C=O+1+K*(R+1),P=O+1+K*R;q.push(D,F,P),q.push(F,C,P)}this.setIndex(q),this.setAttribute("position",new zJ(N,3)),this.setAttribute("normal",new zJ(k,3)),this.setAttribute("uv",new zJ(V,2))}copy(J){return super.copy(J),this.parameters=Object.assign({},J.parameters),this}static fromJSON(J){return new F9(J.width,J.height,J.widthSegments,J.heightSegments)}}class lQ extends gJ{constructor(J=0.5,Q=1,Z=32,$=1,W=0,Y=Math.PI*2){super();this.type="RingGeometry",this.parameters={innerRadius:J,outerRadius:Q,thetaSegments:Z,phiSegments:$,thetaStart:W,thetaLength:Y},Z=Math.max(3,Z),$=Math.max(1,$);let X=[],H=[],K=[],G=[],U=J,E=(Q-J)/$,q=new I,N=new i;for(let k=0;k<=$;k++){for(let V=0;V<=Z;V++){let R=W+V/Z*Y;q.x=U*Math.cos(R),q.y=U*Math.sin(R),H.push(q.x,q.y,q.z),K.push(0,0,1),N.x=(q.x/Q+1)/2,N.y=(q.y/Q+1)/2,G.push(N.x,N.y)}U+=E}for(let k=0;k<$;k++){let V=k*(Z+1);for(let R=0;R<Z;R++){let O=R+V,D=O,F=O+Z+1,C=O+Z+2,P=O+1;X.push(D,F,P),X.push(F,C,P)}}this.setIndex(X),this.setAttribute("position",new zJ(H,3)),this.setAttribute("normal",new zJ(K,3)),this.setAttribute("uv",new zJ(G,2))}copy(J){return super.copy(J),this.parameters=Object.assign({},J.parameters),this}static fromJSON(J){return new lQ(J.innerRadius,J.outerRadius,J.thetaSegments,J.phiSegments,J.thetaStart,J.thetaLength)}}class uQ extends gJ{constructor(J=new E9([new i(0,0.5),new i(-0.5,-0.5),new i(0.5,-0.5)]),Q=12){super();this.type="ShapeGeometry",this.parameters={shapes:J,curveSegments:Q};let Z=[],$=[],W=[],Y=[],X=0,H=0;if(Array.isArray(J)===!1)K(J);else for(let G=0;G<J.length;G++)K(J[G]),this.addGroup(X,H,G),X+=H,H=0;this.setIndex(Z),this.setAttribute("position",new zJ($,3)),this.setAttribute("normal",new zJ(W,3)),this.setAttribute("uv",new zJ(Y,2));function K(G){let U=$.length/3,E=G.extractPoints(Q),q=E.shape,N=E.holes;if(y8.isClockWise(q)===!1)q=q.reverse();for(let V=0,R=N.length;V<R;V++){let O=N[V];if(y8.isClockWise(O)===!0)N[V]=O.reverse()}let k=y8.triangulateShape(q,N);for(let V=0,R=N.length;V<R;V++){let O=N[V];q=q.concat(O)}for(let V=0,R=q.length;V<R;V++){let O=q[V];$.push(O.x,O.y,0),W.push(0,0,1),Y.push(O.x,O.y)}for(let V=0,R=k.length;V<R;V++){let O=k[V],D=O[0]+U,F=O[1]+U,C=O[2]+U;Z.push(D,F,C),H+=3}}}copy(J){return super.copy(J),this.parameters=Object.assign({},J.parameters),this}toJSON(){let J=super.toJSON(),Q=this.parameters.shapes;return fN(Q,J)}static fromJSON(J,Q){let Z=[];for(let $=0,W=J.shapes.length;$<W;$++){let Y=Q[J.shapes[$]];Z.push(Y)}return new uQ(Z,J.curveSegments)}}function fN(J,Q){if(Q.shapes=[],Array.isArray(J))for(let Z=0,$=J.length;Z<$;Z++){let W=J[Z];Q.shapes.push(W.uuid)}else Q.shapes.push(J.uuid);return Q}class I7 extends gJ{constructor(J=1,Q=32,Z=16,$=0,W=Math.PI*2,Y=0,X=Math.PI){super();this.type="SphereGeometry",this.parameters={radius:J,widthSegments:Q,heightSegments:Z,phiStart:$,phiLength:W,thetaStart:Y,thetaLength:X},Q=Math.max(3,Math.floor(Q)),Z=Math.max(2,Math.floor(Z));let H=Math.min(Y+X,Math.PI),K=0,G=[],U=new I,E=new I,q=[],N=[],k=[],V=[];for(let R=0;R<=Z;R++){let O=[],D=R/Z,F=0;if(R===0&&Y===0)F=0.5/Q;else if(R===Z&&H===Math.PI)F=-0.5/Q;for(let C=0;C<=Q;C++){let P=C/Q;U.x=-J*Math.cos($+P*W)*Math.sin(Y+D*X),U.y=J*Math.cos(Y+D*X),U.z=J*Math.sin($+P*W)*Math.sin(Y+D*X),N.push(U.x,U.y,U.z),E.copy(U).normalize(),k.push(E.x,E.y,E.z),V.push(P+F,1-D),O.push(K++)}G.push(O)}for(let R=0;R<Z;R++)for(let O=0;O<Q;O++){let D=G[R][O+1],F=G[R][O],C=G[R+1][O],P=G[R+1][O+1];if(R!==0||Y>0)q.push(D,F,P);if(R!==Z-1||H<Math.PI)q.push(F,C,P)}this.setIndex(q),this.setAttribute("position",new zJ(N,3)),this.setAttribute("normal",new zJ(k,3)),this.setAttribute("uv",new zJ(V,2))}copy(J){return super.copy(J),this.parameters=Object.assign({},J.parameters),this}static fromJSON(J){return new I7(J.radius,J.widthSegments,J.heightSegments,J.phiStart,J.phiLength,J.thetaStart,J.thetaLength)}}class dQ extends V9{constructor(J=1,Q=0){let Z=[1,1,1,-1,-1,1,-1,1,-1,1,-1,-1],$=[2,1,0,0,3,2,1,3,0,2,3,1];super(Z,$,J,Q);this.type="TetrahedronGeometry",this.parameters={radius:J,detail:Q}}static fromJSON(J){return new dQ(J.radius,J.detail)}}class cQ extends gJ{constructor(J=1,Q=0.4,Z=12,$=48,W=Math.PI*2){super();this.type="TorusGeometry",this.parameters={radius:J,tube:Q,radialSegments:Z,tubularSegments:$,arc:W},Z=Math.floor(Z),$=Math.floor($);let Y=[],X=[],H=[],K=[],G=new I,U=new I,E=new I;for(let q=0;q<=Z;q++)for(let N=0;N<=$;N++){let k=N/$*W,V=q/Z*Math.PI*2;U.x=(J+Q*Math.cos(V))*Math.cos(k),U.y=(J+Q*Math.cos(V))*Math.sin(k),U.z=Q*Math.sin(V),X.push(U.x,U.y,U.z),G.x=J*Math.cos(k),G.y=J*Math.sin(k),E.subVectors(U,G).normalize(),H.push(E.x,E.y,E.z),K.push(N/$),K.push(q/Z)}for(let q=1;q<=Z;q++)for(let N=1;N<=$;N++){let k=($+1)*q+N-1,V=($+1)*(q-1)+N-1,R=($+1)*(q-1)+N,O=($+1)*q+N;Y.push(k,V,O),Y.push(V,R,O)}this.setIndex(Y),this.setAttribute("position",new zJ(X,3)),this.setAttribute("normal",new zJ(H,3)),this.setAttribute("uv",new zJ(K,2))}copy(J){return super.copy(J),this.parameters=Object.assign({},J.parameters),this}static fromJSON(J){return new cQ(J.radius,J.tube,J.radialSegments,J.tubularSegments,J.arc)}}class nQ extends gJ{constructor(J=1,Q=0.4,Z=64,$=8,W=2,Y=3){super();this.type="TorusKnotGeometry",this.parameters={radius:J,tube:Q,tubularSegments:Z,radialSegments:$,p:W,q:Y},Z=Math.floor(Z),$=Math.floor($);let X=[],H=[],K=[],G=[],U=new I,E=new I,q=new I,N=new I,k=new I,V=new I,R=new I;for(let D=0;D<=Z;++D){let F=D/Z*W*Math.PI*2;O(F,W,Y,J,q),O(F+0.01,W,Y,J,N),V.subVectors(N,q),R.addVectors(N,q),k.crossVectors(V,R),R.crossVectors(k,V),k.normalize(),R.normalize();for(let C=0;C<=$;++C){let P=C/$*Math.PI*2,M=-Q*Math.cos(P),w=Q*Math.sin(P);U.x=q.x+(M*R.x+w*k.x),U.y=q.y+(M*R.y+w*k.y),U.z=q.z+(M*R.z+w*k.z),H.push(U.x,U.y,U.z),E.subVectors(U,q).normalize(),K.push(E.x,E.y,E.z),G.push(D/Z),G.push(C/$)}}for(let D=1;D<=Z;D++)for(let F=1;F<=$;F++){let C=($+1)*(D-1)+(F-1),P=($+1)*D+(F-1),M=($+1)*D+F,w=($+1)*(D-1)+F;X.push(C,P,w),X.push(P,M,w)}this.setIndex(X),this.setAttribute("position",new zJ(H,3)),this.setAttribute("normal",new zJ(K,3)),this.setAttribute("uv",new zJ(G,2));function O(D,F,C,P,M){let w=Math.cos(D),v=Math.sin(D),L=C/F*D,_=Math.cos(L);M.x=P*(2+_)*0.5*w,M.y=P*(2+_)*v*0.5,M.z=P*Math.sin(L)*0.5}}copy(J){return super.copy(J),this.parameters=Object.assign({},J.parameters),this}static fromJSON(J){return new nQ(J.radius,J.tube,J.tubularSegments,J.radialSegments,J.p,J.q)}}class sQ extends gJ{constructor(J=new yQ(new I(-1,-1,0),new I(-1,1,0),new I(1,1,0)),Q=64,Z=1,$=8,W=!1){super();this.type="TubeGeometry",this.parameters={path:J,tubularSegments:Q,radius:Z,radialSegments:$,closed:W};let Y=J.computeFrenetFrames(Q,W);this.tangents=Y.tangents,this.normals=Y.normals,this.binormals=Y.binormals;let X=new I,H=new I,K=new i,G=new I,U=[],E=[],q=[],N=[];k(),this.setIndex(N),this.setAttribute("position",new zJ(U,3)),this.setAttribute("normal",new zJ(E,3)),this.setAttribute("uv",new zJ(q,2));function k(){for(let D=0;D<Q;D++)V(D);V(W===!1?Q:0),O(),R()}function V(D){G=J.getPointAt(D/Q,G);let F=Y.normals[D],C=Y.binormals[D];for(let P=0;P<=$;P++){let M=P/$*Math.PI*2,w=Math.sin(M),v=-Math.cos(M);H.x=v*F.x+w*C.x,H.y=v*F.y+w*C.y,H.z=v*F.z+w*C.z,H.normalize(),E.push(H.x,H.y,H.z),X.x=G.x+Z*H.x,X.y=G.y+Z*H.y,X.z=G.z+Z*H.z,U.push(X.x,X.y,X.z)}}function R(){for(let D=1;D<=Q;D++)for(let F=1;F<=$;F++){let C=($+1)*(D-1)+(F-1),P=($+1)*D+(F-1),M=($+1)*D+F,w=($+1)*(D-1)+F;N.push(C,P,w),N.push(P,M,w)}}function O(){for(let D=0;D<=Q;D++)for(let F=0;F<=$;F++)K.x=D/Q,K.y=F/$,q.push(K.x,K.y)}}copy(J){return super.copy(J),this.parameters=Object.assign({},J.parameters),this}toJSON(){let J=super.toJSON();return J.path=this.parameters.path.toJSON(),J}static fromJSON(J){return new sQ(new E$[J.path.type]().fromJSON(J.path),J.tubularSegments,J.radius,J.radialSegments,J.closed)}}class RW extends gJ{constructor(J=null){super();if(this.type="WireframeGeometry",this.parameters={geometry:J},J!==null){let Q=[],Z=/*@__PURE__*/new Set,$=new I,W=new I;if(J.index!==null){let Y=J.attributes.position,X=J.index,H=J.groups;if(H.length===0)H=[{start:0,count:X.count,materialIndex:0}];for(let K=0,G=H.length;K<G;++K){let U=H[K],E=U.start,q=U.count;for(let N=E,k=E+q;N<k;N+=3)for(let V=0;V<3;V++){let R=X.getX(N+V),O=X.getX(N+(V+1)%3);if($.fromBufferAttribute(Y,R),W.fromBufferAttribute(Y,O),zG($,W,Z)===!0)Q.push($.x,$.y,$.z),Q.push(W.x,W.y,W.z)}}}else{let Y=J.attributes.position;for(let X=0,H=Y.count/3;X<H;X++)for(let K=0;K<3;K++){let G=3*X+K,U=3*X+(K+1)%3;if($.fromBufferAttribute(Y,G),W.fromBufferAttribute(Y,U),zG($,W,Z)===!0)Q.push($.x,$.y,$.z),Q.push(W.x,W.y,W.z)}}this.setAttribute("position",new zJ(Q,3))}}copy(J){return super.copy(J),this.parameters=Object.assign({},J.parameters),this}}function zG(J,Q,Z){let $=`${J.x},${J.y},${J.z}-${Q.x},${Q.y},${Q.z}`,W=`${Q.x},${Q.y},${Q.z}-${J.x},${J.y},${J.z}`;if(Z.has($)===!0||Z.has(W)===!0)return!1;else return Z.add($),Z.add(W),!0}var CG=/*@__PURE__*/Object.freeze({__proto__:null,BoxGeometry:h9,CapsuleGeometry:bQ,CircleGeometry:hQ,ConeGeometry:fQ,CylinderGeometry:I6,DodecahedronGeometry:gQ,EdgesGeometry:NW,ExtrudeGeometry:pQ,IcosahedronGeometry:mQ,LatheGeometry:_7,OctahedronGeometry:M7,PlaneGeometry:F9,PolyhedronGeometry:V9,RingGeometry:lQ,ShapeGeometry:uQ,SphereGeometry:I7,TetrahedronGeometry:dQ,TorusGeometry:cQ,TorusKnotGeometry:nQ,TubeGeometry:sQ,WireframeGeometry:RW});class kW extends C0{constructor(J){super();this.isShadowMaterial=!0,this.type="ShadowMaterial",this.color=new u(0),this.transparent=!0,this.fog=!0,this.setValues(J)}copy(J){return super.copy(J),this.color.copy(J.color),this.fog=J.fog,this}}class VW extends l0{constructor(J){super(J);this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class f9 extends C0{constructor(J){super();this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new u(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new u(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=0,this.normalScale=new i(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new W8,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(J)}copy(J){return super.copy(J),this.defines={STANDARD:""},this.color.copy(J.color),this.roughness=J.roughness,this.metalness=J.metalness,this.map=J.map,this.lightMap=J.lightMap,this.lightMapIntensity=J.lightMapIntensity,this.aoMap=J.aoMap,this.aoMapIntensity=J.aoMapIntensity,this.emissive.copy(J.emissive),this.emissiveMap=J.emissiveMap,this.emissiveIntensity=J.emissiveIntensity,this.bumpMap=J.bumpMap,this.bumpScale=J.bumpScale,this.normalMap=J.normalMap,this.normalMapType=J.normalMapType,this.normalScale.copy(J.normalScale),this.displacementMap=J.displacementMap,this.displacementScale=J.displacementScale,this.displacementBias=J.displacementBias,this.roughnessMap=J.roughnessMap,this.metalnessMap=J.metalnessMap,this.alphaMap=J.alphaMap,this.envMap=J.envMap,this.envMapRotation.copy(J.envMapRotation),this.envMapIntensity=J.envMapIntensity,this.wireframe=J.wireframe,this.wireframeLinewidth=J.wireframeLinewidth,this.wireframeLinecap=J.wireframeLinecap,this.wireframeLinejoin=J.wireframeLinejoin,this.flatShading=J.flatShading,this.fog=J.fog,this}}class e0 extends f9{constructor(J){super();this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new i(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return cJ(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(Q){this.ior=(1+0.4*Q)/(1-0.4*Q)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new u(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new u(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new u(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(J)}get anisotropy(){return this._anisotropy}set anisotropy(J){if(this._anisotropy>0!==J>0)this.version++;this._anisotropy=J}get clearcoat(){return this._clearcoat}set clearcoat(J){if(this._clearcoat>0!==J>0)this.version++;this._clearcoat=J}get iridescence(){return this._iridescence}set iridescence(J){if(this._iridescence>0!==J>0)this.version++;this._iridescence=J}get dispersion(){return this._dispersion}set dispersion(J){if(this._dispersion>0!==J>0)this.version++;this._dispersion=J}get sheen(){return this._sheen}set sheen(J){if(this._sheen>0!==J>0)this.version++;this._sheen=J}get transmission(){return this._transmission}set transmission(J){if(this._transmission>0!==J>0)this.version++;this._transmission=J}copy(J){return super.copy(J),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=J.anisotropy,this.anisotropyRotation=J.anisotropyRotation,this.anisotropyMap=J.anisotropyMap,this.clearcoat=J.clearcoat,this.clearcoatMap=J.clearcoatMap,this.clearcoatRoughness=J.clearcoatRoughness,this.clearcoatRoughnessMap=J.clearcoatRoughnessMap,this.clearcoatNormalMap=J.clearcoatNormalMap,this.clearcoatNormalScale.copy(J.clearcoatNormalScale),this.dispersion=J.dispersion,this.ior=J.ior,this.iridescence=J.iridescence,this.iridescenceMap=J.iridescenceMap,this.iridescenceIOR=J.iridescenceIOR,this.iridescenceThicknessRange=[...J.iridescenceThicknessRange],this.iridescenceThicknessMap=J.iridescenceThicknessMap,this.sheen=J.sheen,this.sheenColor.copy(J.sheenColor),this.sheenColorMap=J.sheenColorMap,this.sheenRoughness=J.sheenRoughness,this.sheenRoughnessMap=J.sheenRoughnessMap,this.transmission=J.transmission,this.transmissionMap=J.transmissionMap,this.thickness=J.thickness,this.thicknessMap=J.thicknessMap,this.attenuationDistance=J.attenuationDistance,this.attenuationColor.copy(J.attenuationColor),this.specularIntensity=J.specularIntensity,this.specularIntensityMap=J.specularIntensityMap,this.specularColor.copy(J.specularColor),this.specularColorMap=J.specularColorMap,this}}class FW extends C0{constructor(J){super();this.isMeshPhongMaterial=!0,this.type="MeshPhongMaterial",this.color=new u(16777215),this.specular=new u(1118481),this.shininess=30,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new u(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=0,this.normalScale=new i(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new W8,this.combine=0,this.reflectivity=1,this.refractionRatio=0.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(J)}copy(J){return super.copy(J),this.color.copy(J.color),this.specular.copy(J.specular),this.shininess=J.shininess,this.map=J.map,this.lightMap=J.lightMap,this.lightMapIntensity=J.lightMapIntensity,this.aoMap=J.aoMap,this.aoMapIntensity=J.aoMapIntensity,this.emissive.copy(J.emissive),this.emissiveMap=J.emissiveMap,this.emissiveIntensity=J.emissiveIntensity,this.bumpMap=J.bumpMap,this.bumpScale=J.bumpScale,this.normalMap=J.normalMap,this.normalMapType=J.normalMapType,this.normalScale.copy(J.normalScale),this.displacementMap=J.displacementMap,this.displacementScale=J.displacementScale,this.displacementBias=J.displacementBias,this.specularMap=J.specularMap,this.alphaMap=J.alphaMap,this.envMap=J.envMap,this.envMapRotation.copy(J.envMapRotation),this.combine=J.combine,this.reflectivity=J.reflectivity,this.refractionRatio=J.refractionRatio,this.wireframe=J.wireframe,this.wireframeLinewidth=J.wireframeLinewidth,this.wireframeLinecap=J.wireframeLinecap,this.wireframeLinejoin=J.wireframeLinejoin,this.flatShading=J.flatShading,this.fog=J.fog,this}}class DW extends C0{constructor(J){super();this.isMeshToonMaterial=!0,this.defines={TOON:""},this.type="MeshToonMaterial",this.color=new u(16777215),this.map=null,this.gradientMap=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new u(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=0,this.normalScale=new i(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.alphaMap=null,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(J)}copy(J){return super.copy(J),this.color.copy(J.color),this.map=J.map,this.gradientMap=J.gradientMap,this.lightMap=J.lightMap,this.lightMapIntensity=J.lightMapIntensity,this.aoMap=J.aoMap,this.aoMapIntensity=J.aoMapIntensity,this.emissive.copy(J.emissive),this.emissiveMap=J.emissiveMap,this.emissiveIntensity=J.emissiveIntensity,this.bumpMap=J.bumpMap,this.bumpScale=J.bumpScale,this.normalMap=J.normalMap,this.normalMapType=J.normalMapType,this.normalScale.copy(J.normalScale),this.displacementMap=J.displacementMap,this.displacementScale=J.displacementScale,this.displacementBias=J.displacementBias,this.alphaMap=J.alphaMap,this.wireframe=J.wireframe,this.wireframeLinewidth=J.wireframeLinewidth,this.wireframeLinecap=J.wireframeLinecap,this.wireframeLinejoin=J.wireframeLinejoin,this.fog=J.fog,this}}class BW extends C0{constructor(J){super();this.isMeshNormalMaterial=!0,this.type="MeshNormalMaterial",this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=0,this.normalScale=new i(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.flatShading=!1,this.setValues(J)}copy(J){return super.copy(J),this.bumpMap=J.bumpMap,this.bumpScale=J.bumpScale,this.normalMap=J.normalMap,this.normalMapType=J.normalMapType,this.normalScale.copy(J.normalScale),this.displacementMap=J.displacementMap,this.displacementScale=J.displacementScale,this.displacementBias=J.displacementBias,this.wireframe=J.wireframe,this.wireframeLinewidth=J.wireframeLinewidth,this.flatShading=J.flatShading,this}}class LW extends C0{constructor(J){super();this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new u(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new u(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=0,this.normalScale=new i(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new W8,this.combine=0,this.reflectivity=1,this.refractionRatio=0.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(J)}copy(J){return super.copy(J),this.color.copy(J.color),this.map=J.map,this.lightMap=J.lightMap,this.lightMapIntensity=J.lightMapIntensity,this.aoMap=J.aoMap,this.aoMapIntensity=J.aoMapIntensity,this.emissive.copy(J.emissive),this.emissiveMap=J.emissiveMap,this.emissiveIntensity=J.emissiveIntensity,this.bumpMap=J.bumpMap,this.bumpScale=J.bumpScale,this.normalMap=J.normalMap,this.normalMapType=J.normalMapType,this.normalScale.copy(J.normalScale),this.displacementMap=J.displacementMap,this.displacementScale=J.displacementScale,this.displacementBias=J.displacementBias,this.specularMap=J.specularMap,this.alphaMap=J.alphaMap,this.envMap=J.envMap,this.envMapRotation.copy(J.envMapRotation),this.combine=J.combine,this.reflectivity=J.reflectivity,this.refractionRatio=J.refractionRatio,this.wireframe=J.wireframe,this.wireframeLinewidth=J.wireframeLinewidth,this.wireframeLinecap=J.wireframeLinecap,this.wireframeLinejoin=J.wireframeLinejoin,this.flatShading=J.flatShading,this.fog=J.fog,this}}class iQ extends C0{constructor(J){super();this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=3200,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(J)}copy(J){return super.copy(J),this.depthPacking=J.depthPacking,this.map=J.map,this.alphaMap=J.alphaMap,this.displacementMap=J.displacementMap,this.displacementScale=J.displacementScale,this.displacementBias=J.displacementBias,this.wireframe=J.wireframe,this.wireframeLinewidth=J.wireframeLinewidth,this}}class oQ extends C0{constructor(J){super();this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(J)}copy(J){return super.copy(J),this.map=J.map,this.alphaMap=J.alphaMap,this.displacementMap=J.displacementMap,this.displacementScale=J.displacementScale,this.displacementBias=J.displacementBias,this}}class zW extends C0{constructor(J){super();this.isMeshMatcapMaterial=!0,this.defines={MATCAP:""},this.type="MeshMatcapMaterial",this.color=new u(16777215),this.matcap=null,this.map=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=0,this.normalScale=new i(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.alphaMap=null,this.flatShading=!1,this.fog=!0,this.setValues(J)}copy(J){return super.copy(J),this.defines={MATCAP:""},this.color.copy(J.color),this.matcap=J.matcap,this.map=J.map,this.bumpMap=J.bumpMap,this.bumpScale=J.bumpScale,this.normalMap=J.normalMap,this.normalMapType=J.normalMapType,this.normalScale.copy(J.normalScale),this.displacementMap=J.displacementMap,this.displacementScale=J.displacementScale,this.displacementBias=J.displacementBias,this.alphaMap=J.alphaMap,this.flatShading=J.flatShading,this.fog=J.fog,this}}class CW extends S0{constructor(J){super();this.isLineDashedMaterial=!0,this.type="LineDashedMaterial",this.scale=1,this.dashSize=3,this.gapSize=1,this.setValues(J)}copy(J){return super.copy(J),this.scale=J.scale,this.dashSize=J.dashSize,this.gapSize=J.gapSize,this}}function J6(J,Q,Z){if(!J||!Z&&J.constructor===Q)return J;if(typeof Q.BYTES_PER_ELEMENT==="number")return new Q(J);return Array.prototype.slice.call(J)}function tU(J){return ArrayBuffer.isView(J)&&!(J instanceof DataView)}function eU(J){function Q(W,Y){return J[W]-J[Y]}let Z=J.length,$=Array(Z);for(let W=0;W!==Z;++W)$[W]=W;return $.sort(Q),$}function sY(J,Q,Z){let $=J.length,W=new J.constructor($);for(let Y=0,X=0;X!==$;++Y){let H=Z[Y]*Q;for(let K=0;K!==Q;++K)W[X++]=J[H+K]}return W}function ZH(J,Q,Z,$){let W=1,Y=J[0];while(Y!==void 0&&Y[$]===void 0)Y=J[W++];if(Y===void 0)return;let X=Y[$];if(X===void 0)return;if(Array.isArray(X))do{if(X=Y[$],X!==void 0)Q.push(Y.time),Z.push.apply(Z,X);Y=J[W++]}while(Y!==void 0);else if(X.toArray!==void 0)do{if(X=Y[$],X!==void 0)Q.push(Y.time),X.toArray(Z,Z.length);Y=J[W++]}while(Y!==void 0);else do{if(X=Y[$],X!==void 0)Q.push(Y.time),Z.push(X);Y=J[W++]}while(Y!==void 0)}function gN(J,Q,Z,$,W=30){let Y=J.clone();Y.name=Q;let X=[];for(let K=0;K<Y.tracks.length;++K){let G=Y.tracks[K],U=G.getValueSize(),E=[],q=[];for(let N=0;N<G.times.length;++N){let k=G.times[N]*W;if(k<Z||k>=$)continue;E.push(G.times[N]);for(let V=0;V<U;++V)q.push(G.values[N*U+V])}if(E.length===0)continue;G.times=J6(E,G.times.constructor),G.values=J6(q,G.values.constructor),X.push(G)}Y.tracks=X;let H=1/0;for(let K=0;K<Y.tracks.length;++K)if(H>Y.tracks[K].times[0])H=Y.tracks[K].times[0];for(let K=0;K<Y.tracks.length;++K)Y.tracks[K].shift(-1*H);return Y.resetDuration(),Y}function pN(J,Q=0,Z=J,$=30){if($<=0)$=30;let W=Z.tracks.length,Y=Q/$;for(let X=0;X<W;++X){let H=Z.tracks[X],K=H.ValueTypeName;if(K==="bool"||K==="string")continue;let G=J.tracks.find(function(O){return O.name===H.name&&O.ValueTypeName===K});if(G===void 0)continue;let U=0,E=H.getValueSize();if(H.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline)U=E/3;let q=0,N=G.getValueSize();if(G.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline)q=N/3;let k=H.times.length-1,V;if(Y<=H.times[0]){let O=U,D=E-U;V=H.values.slice(O,D)}else if(Y>=H.times[k]){let O=k*E+U,D=O+E-U;V=H.values.slice(O,D)}else{let O=H.createInterpolant(),D=U,F=E-U;O.evaluate(Y),V=O.resultBuffer.slice(D,F)}if(K==="quaternion")new P0().fromArray(V).normalize().conjugate().toArray(V);let R=G.times.length;for(let O=0;O<R;++O){let D=O*N+q;if(K==="quaternion")P0.multiplyQuaternionsFlat(G.values,D,V,0,G.values,D);else{let F=N-q*2;for(let C=0;C<F;++C)G.values[D+C]-=V[C]}}}return J.blendMode=2501,J}var JE={convertArray:J6,isTypedArray:tU,getKeyframeOrder:eU,sortedArray:sY,flattenJSON:ZH,subclip:gN,makeClipAdditive:pN};class D9{constructor(J,Q,Z,$){this.parameterPositions=J,this._cachedIndex=0,this.resultBuffer=$!==void 0?$:new Q.constructor(Z),this.sampleValues=Q,this.valueSize=Z,this.settings=null,this.DefaultSettings_={}}evaluate(J){let Q=this.parameterPositions,Z=this._cachedIndex,$=Q[Z],W=Q[Z-1];J:{Q:{let Y;Z:{$:if(!(J<$)){for(let X=Z+2;;){if($===void 0){if(J<W)break $;return Z=Q.length,this._cachedIndex=Z,this.copySampleValue_(Z-1)}if(Z===X)break;if(W=$,$=Q[++Z],J<$)break Q}Y=Q.length;break Z}if(!(J>=W)){let X=Q[1];if(J<X)Z=2,W=X;for(let H=Z-2;;){if(W===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(Z===H)break;if($=W,W=Q[--Z-1],J>=W)break Q}Y=Z,Z=0;break Z}break J}while(Z<Y){let X=Z+Y>>>1;if(J<Q[X])Y=X;else Z=X+1}if($=Q[Z],W=Q[Z-1],W===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if($===void 0)return Z=Q.length,this._cachedIndex=Z,this.copySampleValue_(Z-1)}this._cachedIndex=Z,this.intervalChanged_(Z,W,$)}return this.interpolate_(Z,W,J,$)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(J){let Q=this.resultBuffer,Z=this.sampleValues,$=this.valueSize,W=J*$;for(let Y=0;Y!==$;++Y)Q[Y]=Z[W+Y];return Q}interpolate_(){throw Error("call to abstract method")}intervalChanged_(){}}class _W extends D9{constructor(J,Q,Z,$){super(J,Q,Z,$);this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:2400,endingEnd:2400}}intervalChanged_(J,Q,Z){let $=this.parameterPositions,W=J-2,Y=J+1,X=$[W],H=$[Y];if(X===void 0)switch(this.getSettings_().endingStart){case 2401:W=J,X=2*Q-Z;break;case 2402:W=$.length-2,X=Q+$[W]-$[W+1];break;default:W=J,X=Z}if(H===void 0)switch(this.getSettings_().endingEnd){case 2401:Y=J,H=2*Z-Q;break;case 2402:Y=1,H=Z+$[1]-$[0];break;default:Y=J-1,H=Q}let K=(Z-Q)*0.5,G=this.valueSize;this._weightPrev=K/(Q-X),this._weightNext=K/(H-Z),this._offsetPrev=W*G,this._offsetNext=Y*G}interpolate_(J,Q,Z,$){let W=this.resultBuffer,Y=this.sampleValues,X=this.valueSize,H=J*X,K=H-X,G=this._offsetPrev,U=this._offsetNext,E=this._weightPrev,q=this._weightNext,N=(Z-Q)/($-Q),k=N*N,V=k*N,R=-E*V+2*E*k-E*N,O=(1+E)*V+(-1.5-2*E)*k+(-0.5+E)*N+1,D=(-1-q)*V+(1.5+q)*k+0.5*N,F=q*V-q*k;for(let C=0;C!==X;++C)W[C]=R*Y[G+C]+O*Y[K+C]+D*Y[H+C]+F*Y[U+C];return W}}class aQ extends D9{constructor(J,Q,Z,$){super(J,Q,Z,$)}interpolate_(J,Q,Z,$){let W=this.resultBuffer,Y=this.sampleValues,X=this.valueSize,H=J*X,K=H-X,G=(Z-Q)/($-Q),U=1-G;for(let E=0;E!==X;++E)W[E]=Y[K+E]*U+Y[H+E]*G;return W}}class MW extends D9{constructor(J,Q,Z,$){super(J,Q,Z,$)}interpolate_(J){return this.copySampleValue_(J-1)}}class B8{constructor(J,Q,Z,$){if(J===void 0)throw Error("THREE.KeyframeTrack: track name is undefined");if(Q===void 0||Q.length===0)throw Error("THREE.KeyframeTrack: no keyframes in track named "+J);this.name=J,this.times=J6(Q,this.TimeBufferType),this.values=J6(Z,this.ValueBufferType),this.setInterpolation($||this.DefaultInterpolation)}static toJSON(J){let Q=J.constructor,Z;if(Q.toJSON!==this.toJSON)Z=Q.toJSON(J);else{Z={name:J.name,times:J6(J.times,Array),values:J6(J.values,Array)};let $=J.getInterpolation();if($!==J.DefaultInterpolation)Z.interpolation=$}return Z.type=J.ValueTypeName,Z}InterpolantFactoryMethodDiscrete(J){return new MW(this.times,this.values,this.getValueSize(),J)}InterpolantFactoryMethodLinear(J){return new aQ(this.times,this.values,this.getValueSize(),J)}InterpolantFactoryMethodSmooth(J){return new _W(this.times,this.values,this.getValueSize(),J)}setInterpolation(J){let Q;switch(J){case 2300:Q=this.InterpolantFactoryMethodDiscrete;break;case 2301:Q=this.InterpolantFactoryMethodLinear;break;case 2302:Q=this.InterpolantFactoryMethodSmooth;break}if(Q===void 0){let Z="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(J!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw Error(Z);return console.warn("THREE.KeyframeTrack:",Z),this}return this.createInterpolant=Q,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return 2300;case this.InterpolantFactoryMethodLinear:return 2301;case this.InterpolantFactoryMethodSmooth:return 2302}}getValueSize(){return this.values.length/this.times.length}shift(J){if(J!==0){let Q=this.times;for(let Z=0,$=Q.length;Z!==$;++Z)Q[Z]+=J}return this}scale(J){if(J!==1){let Q=this.times;for(let Z=0,$=Q.length;Z!==$;++Z)Q[Z]*=J}return this}trim(J,Q){let Z=this.times,$=Z.length,W=0,Y=$-1;while(W!==$&&Z[W]<J)++W;while(Y!==-1&&Z[Y]>Q)--Y;if(++Y,W!==0||Y!==$){if(W>=Y)Y=Math.max(Y,1),W=Y-1;let X=this.getValueSize();this.times=Z.slice(W,Y),this.values=this.values.slice(W*X,Y*X)}return this}validate(){let J=!0,Q=this.getValueSize();if(Q-Math.floor(Q)!==0)console.error("THREE.KeyframeTrack: Invalid value size in track.",this),J=!1;let Z=this.times,$=this.values,W=Z.length;if(W===0)console.error("THREE.KeyframeTrack: Track is empty.",this),J=!1;let Y=null;for(let X=0;X!==W;X++){let H=Z[X];if(typeof H==="number"&&isNaN(H)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,X,H),J=!1;break}if(Y!==null&&Y>H){console.error("THREE.KeyframeTrack: Out of order keys.",this,X,H,Y),J=!1;break}Y=H}if($!==void 0){if(tU($))for(let X=0,H=$.length;X!==H;++X){let K=$[X];if(isNaN(K)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,X,K),J=!1;break}}}return J}optimize(){let J=this.times.slice(),Q=this.values.slice(),Z=this.getValueSize(),$=this.getInterpolation()===2302,W=J.length-1,Y=1;for(let X=1;X<W;++X){let H=!1,K=J[X],G=J[X+1];if(K!==G&&(X!==1||K!==J[0]))if(!$){let U=X*Z,E=U-Z,q=U+Z;for(let N=0;N!==Z;++N){let k=Q[U+N];if(k!==Q[E+N]||k!==Q[q+N]){H=!0;break}}}else H=!0;if(H){if(X!==Y){J[Y]=J[X];let U=X*Z,E=Y*Z;for(let q=0;q!==Z;++q)Q[E+q]=Q[U+q]}++Y}}if(W>0){J[Y]=J[W];for(let X=W*Z,H=Y*Z,K=0;K!==Z;++K)Q[H+K]=Q[X+K];++Y}if(Y!==J.length)this.times=J.slice(0,Y),this.values=Q.slice(0,Y*Z);else this.times=J,this.values=Q;return this}clone(){let J=this.times.slice(),Q=this.values.slice(),$=new this.constructor(this.name,J,Q);return $.createInterpolant=this.createInterpolant,$}}B8.prototype.TimeBufferType=Float32Array;B8.prototype.ValueBufferType=Float32Array;B8.prototype.DefaultInterpolation=2301;class B9 extends B8{constructor(J,Q,Z){super(J,Q,Z)}}B9.prototype.ValueTypeName="bool";B9.prototype.ValueBufferType=Array;B9.prototype.DefaultInterpolation=2300;B9.prototype.InterpolantFactoryMethodLinear=void 0;B9.prototype.InterpolantFactoryMethodSmooth=void 0;class rQ extends B8{}rQ.prototype.ValueTypeName="color";class d8 extends B8{}d8.prototype.ValueTypeName="number";class IW extends D9{constructor(J,Q,Z,$){super(J,Q,Z,$)}interpolate_(J,Q,Z,$){let W=this.resultBuffer,Y=this.sampleValues,X=this.valueSize,H=(Z-Q)/($-Q),K=J*X;for(let G=K+X;K!==G;K+=4)P0.slerpFlat(W,0,Y,K-X,Y,K,H);return W}}class o8 extends B8{InterpolantFactoryMethodLinear(J){return new IW(this.times,this.values,this.getValueSize(),J)}}o8.prototype.ValueTypeName="quaternion";o8.prototype.InterpolantFactoryMethodSmooth=void 0;class L9 extends B8{constructor(J,Q,Z){super(J,Q,Z)}}L9.prototype.ValueTypeName="string";L9.prototype.ValueBufferType=Array;L9.prototype.DefaultInterpolation=2300;L9.prototype.InterpolantFactoryMethodLinear=void 0;L9.prototype.InterpolantFactoryMethodSmooth=void 0;class c8 extends B8{}c8.prototype.ValueTypeName="vector";class q9{constructor(J="",Q=-1,Z=[],$=2500){if(this.name=J,this.tracks=Z,this.duration=Q,this.blendMode=$,this.uuid=N8(),this.duration<0)this.resetDuration()}static parse(J){let Q=[],Z=J.tracks,$=1/(J.fps||1);for(let Y=0,X=Z.length;Y!==X;++Y)Q.push(lN(Z[Y]).scale($));let W=new this(J.name,J.duration,Q,J.blendMode);return W.uuid=J.uuid,W}static toJSON(J){let Q=[],Z=J.tracks,$={name:J.name,duration:J.duration,tracks:Q,uuid:J.uuid,blendMode:J.blendMode};for(let W=0,Y=Z.length;W!==Y;++W)Q.push(B8.toJSON(Z[W]));return $}static CreateFromMorphTargetSequence(J,Q,Z,$){let W=Q.length,Y=[];for(let X=0;X<W;X++){let H=[],K=[];H.push((X+W-1)%W,X,(X+1)%W),K.push(0,1,0);let G=eU(H);if(H=sY(H,1,G),K=sY(K,1,G),!$&&H[0]===0)H.push(W),K.push(K[0]);Y.push(new d8(".morphTargetInfluences["+Q[X].name+"]",H,K).scale(1/Z))}return new this(J,-1,Y)}static findByName(J,Q){let Z=J;if(!Array.isArray(J)){let $=J;Z=$.geometry&&$.geometry.animations||$.animations}for(let $=0;$<Z.length;$++)if(Z[$].name===Q)return Z[$];return null}static CreateClipsFromMorphTargetSequences(J,Q,Z){let $={},W=/^([\w-]*?)([\d]+)$/;for(let X=0,H=J.length;X<H;X++){let K=J[X],G=K.name.match(W);if(G&&G.length>1){let U=G[1],E=$[U];if(!E)$[U]=E=[];E.push(K)}}let Y=[];for(let X in $)Y.push(this.CreateFromMorphTargetSequence(X,$[X],Q,Z));return Y}static parseAnimation(J,Q){if(!J)return console.error("THREE.AnimationClip: No animation in JSONLoader data."),null;let Z=function(U,E,q,N,k){if(q.length!==0){let V=[],R=[];if(ZH(q,V,R,N),V.length!==0)k.push(new U(E,V,R))}},$=[],W=J.name||"default",Y=J.fps||30,X=J.blendMode,H=J.length||-1,K=J.hierarchy||[];for(let U=0;U<K.length;U++){let E=K[U].keys;if(!E||E.length===0)continue;if(E[0].morphTargets){let q={},N;for(N=0;N<E.length;N++)if(E[N].morphTargets)for(let k=0;k<E[N].morphTargets.length;k++)q[E[N].morphTargets[k]]=-1;for(let k in q){let V=[],R=[];for(let O=0;O!==E[N].morphTargets.length;++O){let D=E[N];V.push(D.time),R.push(D.morphTarget===k?1:0)}$.push(new d8(".morphTargetInfluence["+k+"]",V,R))}H=q.length*Y}else{let q=".bones["+Q[U].name+"]";Z(c8,q+".position",E,"pos",$),Z(o8,q+".quaternion",E,"rot",$),Z(c8,q+".scale",E,"scl",$)}}if($.length===0)return null;return new this(W,H,$,X)}resetDuration(){let J=this.tracks,Q=0;for(let Z=0,$=J.length;Z!==$;++Z){let W=this.tracks[Z];Q=Math.max(Q,W.times[W.times.length-1])}return this.duration=Q,this}trim(){for(let J=0;J<this.tracks.length;J++)this.tracks[J].trim(0,this.duration);return this}validate(){let J=!0;for(let Q=0;Q<this.tracks.length;Q++)J=J&&this.tracks[Q].validate();return J}optimize(){for(let J=0;J<this.tracks.length;J++)this.tracks[J].optimize();return this}clone(){let J=[];for(let Q=0;Q<this.tracks.length;Q++)J.push(this.tracks[Q].clone());return new this.constructor(this.name,this.duration,J,this.blendMode)}toJSON(){return this.constructor.toJSON(this)}}function mN(J){switch(J.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return d8;case"vector":case"vector2":case"vector3":case"vector4":return c8;case"color":return rQ;case"quaternion":return o8;case"bool":case"boolean":return B9;case"string":return L9}throw Error("THREE.KeyframeTrack: Unsupported typeName: "+J)}function lN(J){if(J.type===void 0)throw Error("THREE.KeyframeTrack: track type undefined, can not parse");let Q=mN(J.type);if(J.times===void 0){let Z=[],$=[];ZH(J.keys,Z,$,"value"),J.times=Z,J.values=$}if(Q.parse!==void 0)return Q.parse(J);else return new Q(J.name,J.times,J.values,J.interpolation)}var u8={enabled:!1,files:{},add:function(J,Q){if(this.enabled===!1)return;this.files[J]=Q},get:function(J){if(this.enabled===!1)return;return this.files[J]},remove:function(J){delete this.files[J]},clear:function(){this.files={}}};class tQ{constructor(J,Q,Z){let $=this,W=!1,Y=0,X=0,H=void 0,K=[];this.onStart=void 0,this.onLoad=J,this.onProgress=Q,this.onError=Z,this.itemStart=function(G){if(X++,W===!1){if($.onStart!==void 0)$.onStart(G,Y,X)}W=!0},this.itemEnd=function(G){if(Y++,$.onProgress!==void 0)$.onProgress(G,Y,X);if(Y===X){if(W=!1,$.onLoad!==void 0)$.onLoad()}},this.itemError=function(G){if($.onError!==void 0)$.onError(G)},this.resolveURL=function(G){if(H)return H(G);return G},this.setURLModifier=function(G){return H=G,this},this.addHandler=function(G,U){return K.push(G,U),this},this.removeHandler=function(G){let U=K.indexOf(G);if(U!==-1)K.splice(U,2);return this},this.getHandler=function(G){for(let U=0,E=K.length;U<E;U+=2){let q=K[U],N=K[U+1];if(q.global)q.lastIndex=0;if(q.test(G))return N}return null}}}var $H=/*@__PURE__*/new tQ;class h0{constructor(J){this.manager=J!==void 0?J:$H,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(J,Q){let Z=this;return new Promise(function($,W){Z.load(J,$,Q,W)})}parse(){}setCrossOrigin(J){return this.crossOrigin=J,this}setWithCredentials(J){return this.withCredentials=J,this}setPath(J){return this.path=J,this}setResourcePath(J){return this.resourcePath=J,this}setRequestHeader(J){return this.requestHeader=J,this}}h0.DEFAULT_MATERIAL_NAME="__DEFAULT";var H9={};class QE extends Error{constructor(J,Q){super(J);this.response=Q}}class Y8 extends h0{constructor(J){super(J)}load(J,Q,Z,$){if(J===void 0)J="";if(this.path!==void 0)J=this.path+J;J=this.manager.resolveURL(J);let W=u8.get(J);if(W!==void 0)return this.manager.itemStart(J),setTimeout(()=>{if(Q)Q(W);this.manager.itemEnd(J)},0),W;if(H9[J]!==void 0){H9[J].push({onLoad:Q,onProgress:Z,onError:$});return}H9[J]=[],H9[J].push({onLoad:Q,onProgress:Z,onError:$});let Y=new Request(J,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin"}),X=this.mimeType,H=this.responseType;fetch(Y).then((K)=>{if(K.status===200||K.status===0){if(K.status===0)console.warn("THREE.FileLoader: HTTP Status 0 received.");if(typeof ReadableStream>"u"||K.body===void 0||K.body.getReader===void 0)return K;let G=H9[J],U=K.body.getReader(),E=K.headers.get("X-File-Size")||K.headers.get("Content-Length"),q=E?parseInt(E):0,N=q!==0,k=0,V=new ReadableStream({start(R){O();function O(){U.read().then(({done:D,value:F})=>{if(D)R.close();else{k+=F.byteLength;let C=new ProgressEvent("progress",{lengthComputable:N,loaded:k,total:q});for(let P=0,M=G.length;P<M;P++){let w=G[P];if(w.onProgress)w.onProgress(C)}R.enqueue(F),O()}},(D)=>{R.error(D)})}}});return new Response(V)}else throw new QE(`fetch for "${K.url}" responded with ${K.status}: ${K.statusText}`,K)}).then((K)=>{switch(H){case"arraybuffer":return K.arrayBuffer();case"blob":return K.blob();case"document":return K.text().then((G)=>{return new DOMParser().parseFromString(G,X)});case"json":return K.json();default:if(X===void 0)return K.text();else{let U=/charset="?([^;"\s]*)"?/i.exec(X),E=U&&U[1]?U[1].toLowerCase():void 0,q=new TextDecoder(E);return K.arrayBuffer().then((N)=>q.decode(N))}}}).then((K)=>{u8.add(J,K);let G=H9[J];delete H9[J];for(let U=0,E=G.length;U<E;U++){let q=G[U];if(q.onLoad)q.onLoad(K)}}).catch((K)=>{let G=H9[J];if(G===void 0)throw this.manager.itemError(J),K;delete H9[J];for(let U=0,E=G.length;U<E;U++){let q=G[U];if(q.onError)q.onError(K)}this.manager.itemError(J)}).finally(()=>{this.manager.itemEnd(J)}),this.manager.itemStart(J)}setResponseType(J){return this.responseType=J,this}setMimeType(J){return this.mimeType=J,this}}class WH extends h0{constructor(J){super(J)}load(J,Q,Z,$){let W=this,Y=new Y8(this.manager);Y.setPath(this.path),Y.setRequestHeader(this.requestHeader),Y.setWithCredentials(this.withCredentials),Y.load(J,function(X){try{Q(W.parse(JSON.parse(X)))}catch(H){if($)$(H);else console.error(H);W.manager.itemError(J)}},Z,$)}parse(J){let Q=[];for(let Z=0;Z<J.length;Z++){let $=q9.parse(J[Z]);Q.push($)}return Q}}class YH extends h0{constructor(J){super(J)}load(J,Q,Z,$){let W=this,Y=[],X=new z7,H=new Y8(this.manager);H.setPath(this.path),H.setResponseType("arraybuffer"),H.setRequestHeader(this.requestHeader),H.setWithCredentials(W.withCredentials);let K=0;function G(U){H.load(J[U],function(E){let q=W.parse(E,!0);if(Y[U]={width:q.width,height:q.height,format:q.format,mipmaps:q.mipmaps},K+=1,K===6){if(q.mipmapCount===1)X.minFilter=1006;if(X.image=Y,X.format=q.format,X.needsUpdate=!0,Q)Q(X)}},Z,$)}if(Array.isArray(J))for(let U=0,E=J.length;U<E;++U)G(U);else H.load(J,function(U){let E=W.parse(U,!0);if(E.isCubemap){let q=E.mipmaps.length/E.mipmapCount;for(let N=0;N<q;N++){Y[N]={mipmaps:[]};for(let k=0;k<E.mipmapCount;k++)Y[N].mipmaps.push(E.mipmaps[N*E.mipmapCount+k]),Y[N].format=E.format,Y[N].width=E.width,Y[N].height=E.height}X.image=Y}else X.image.width=E.width,X.image.height=E.height,X.mipmaps=E.mipmaps;if(E.mipmapCount===1)X.minFilter=1006;if(X.format=E.format,X.needsUpdate=!0,Q)Q(X)},Z,$);return X}}class Y6 extends h0{constructor(J){super(J)}load(J,Q,Z,$){if(this.path!==void 0)J=this.path+J;J=this.manager.resolveURL(J);let W=this,Y=u8.get(J);if(Y!==void 0)return W.manager.itemStart(J),setTimeout(function(){if(Q)Q(Y);W.manager.itemEnd(J)},0),Y;let X=W7("img");function H(){if(G(),u8.add(J,this),Q)Q(this);W.manager.itemEnd(J)}function K(U){if(G(),$)$(U);W.manager.itemError(J),W.manager.itemEnd(J)}function G(){X.removeEventListener("load",H,!1),X.removeEventListener("error",K,!1)}if(X.addEventListener("load",H,!1),X.addEventListener("error",K,!1),J.slice(0,5)!=="data:"){if(this.crossOrigin!==void 0)X.crossOrigin=this.crossOrigin}return W.manager.itemStart(J),X.src=J,X}}class XH extends h0{constructor(J){super(J)}load(J,Q,Z,$){let W=new L6;W.colorSpace="srgb";let Y=new Y6(this.manager);Y.setCrossOrigin(this.crossOrigin),Y.setPath(this.path);let X=0;function H(K){Y.load(J[K],function(G){if(W.images[K]=G,X++,X===6){if(W.needsUpdate=!0,Q)Q(W)}},void 0,$)}for(let K=0;K<J.length;++K)H(K);return W}}class HH extends h0{constructor(J){super(J)}load(J,Q,Z,$){let W=this,Y=new p0,X=new Y8(this.manager);return X.setResponseType("arraybuffer"),X.setRequestHeader(this.requestHeader),X.setPath(this.path),X.setWithCredentials(W.withCredentials),X.load(J,function(H){let K;try{K=W.parse(H)}catch(G){if($!==void 0)$(G);else{console.error(G);return}}if(K.image!==void 0)Y.image=K.image;else if(K.data!==void 0)Y.image.width=K.width,Y.image.height=K.height,Y.image.data=K.data;if(Y.wrapS=K.wrapS!==void 0?K.wrapS:1001,Y.wrapT=K.wrapT!==void 0?K.wrapT:1001,Y.magFilter=K.magFilter!==void 0?K.magFilter:1006,Y.minFilter=K.minFilter!==void 0?K.minFilter:1006,Y.anisotropy=K.anisotropy!==void 0?K.anisotropy:1,K.colorSpace!==void 0)Y.colorSpace=K.colorSpace;if(K.flipY!==void 0)Y.flipY=K.flipY;if(K.format!==void 0)Y.format=K.format;if(K.type!==void 0)Y.type=K.type;if(K.mipmaps!==void 0)Y.mipmaps=K.mipmaps,Y.minFilter=1008;if(K.mipmapCount===1)Y.minFilter=1006;if(K.generateMipmaps!==void 0)Y.generateMipmaps=K.generateMipmaps;if(Y.needsUpdate=!0,Q)Q(Y,K)},Z,$),Y}}class eQ extends h0{constructor(J){super(J)}load(J,Q,Z,$){let W=new R0,Y=new Y6(this.manager);return Y.setCrossOrigin(this.crossOrigin),Y.setPath(this.path),Y.load(J,function(X){if(W.image=X,W.needsUpdate=!0,Q!==void 0)Q(W)},Z,$),W}}class a8 extends $0{constructor(J,Q=1){super();this.isLight=!0,this.type="Light",this.color=new u(J),this.intensity=Q}dispose(){}copy(J,Q){return super.copy(J,Q),this.color.copy(J.color),this.intensity=J.intensity,this}toJSON(J){let Q=super.toJSON(J);if(Q.object.color=this.color.getHex(),Q.object.intensity=this.intensity,this.groundColor!==void 0)Q.object.groundColor=this.groundColor.getHex();if(this.distance!==void 0)Q.object.distance=this.distance;if(this.angle!==void 0)Q.object.angle=this.angle;if(this.decay!==void 0)Q.object.decay=this.decay;if(this.penumbra!==void 0)Q.object.penumbra=this.penumbra;if(this.shadow!==void 0)Q.object.shadow=this.shadow.toJSON();if(this.target!==void 0)Q.object.target=this.target.uuid;return Q}}class wW extends a8{constructor(J,Q,Z){super(J,Z);this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy($0.DEFAULT_UP),this.updateMatrix(),this.groundColor=new u(Q)}copy(J,Q){return super.copy(J,Q),this.groundColor.copy(J.groundColor),this}}var pY=/*@__PURE__*/new SJ,_G=/*@__PURE__*/new I,MG=/*@__PURE__*/new I;class AW{constructor(J){this.camera=J,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new i(512,512),this.map=null,this.mapPass=null,this.matrix=new SJ,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new _6,this._frameExtents=new i(1,1),this._viewportCount=1,this._viewports=[new XJ(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(J){let Q=this.camera,Z=this.matrix;_G.setFromMatrixPosition(J.matrixWorld),Q.position.copy(_G),MG.setFromMatrixPosition(J.target.matrixWorld),Q.lookAt(MG),Q.updateMatrixWorld(),pY.multiplyMatrices(Q.projectionMatrix,Q.matrixWorldInverse),this._frustum.setFromProjectionMatrix(pY),Z.set(0.5,0,0,0.5,0,0.5,0,0.5,0,0,0.5,0.5,0,0,0,1),Z.multiply(pY)}getViewport(J){return this._viewports[J]}getFrameExtents(){return this._frameExtents}dispose(){if(this.map)this.map.dispose();if(this.mapPass)this.mapPass.dispose()}copy(J){return this.camera=J.camera.clone(),this.intensity=J.intensity,this.bias=J.bias,this.radius=J.radius,this.mapSize.copy(J.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){let J={};if(this.intensity!==1)J.intensity=this.intensity;if(this.bias!==0)J.bias=this.bias;if(this.normalBias!==0)J.normalBias=this.normalBias;if(this.radius!==1)J.radius=this.radius;if(this.mapSize.x!==512||this.mapSize.y!==512)J.mapSize=this.mapSize.toArray();return J.camera=this.camera.toJSON(!1).object,delete J.camera.matrix,J}}class ZE extends AW{constructor(){super(new O0(50,1,0.5,500));this.isSpotLightShadow=!0,this.focus=1}updateMatrices(J){let Q=this.camera,Z=Z6*2*J.angle*this.focus,$=this.mapSize.width/this.mapSize.height,W=J.distance||Q.far;if(Z!==Q.fov||$!==Q.aspect||W!==Q.far)Q.fov=Z,Q.aspect=$,Q.far=W,Q.updateProjectionMatrix();super.updateMatrices(J)}copy(J){return super.copy(J),this.focus=J.focus,this}}class w7 extends a8{constructor(J,Q,Z=0,$=Math.PI/3,W=0,Y=2){super(J,Q);this.isSpotLight=!0,this.type="SpotLight",this.position.copy($0.DEFAULT_UP),this.updateMatrix(),this.target=new $0,this.distance=Z,this.angle=$,this.penumbra=W,this.decay=Y,this.map=null,this.shadow=new ZE}get power(){return this.intensity*Math.PI}set power(J){this.intensity=J/Math.PI}dispose(){this.shadow.dispose()}copy(J,Q){return super.copy(J,Q),this.distance=J.distance,this.angle=J.angle,this.penumbra=J.penumbra,this.decay=J.decay,this.target=J.target.clone(),this.shadow=J.shadow.clone(),this}}var IG=/*@__PURE__*/new SJ,r7=/*@__PURE__*/new I,mY=/*@__PURE__*/new I;class $E extends AW{constructor(){super(new O0(90,1,0.5,500));this.isPointLightShadow=!0,this._frameExtents=new i(4,2),this._viewportCount=6,this._viewports=[new XJ(2,1,1,1),new XJ(0,1,1,1),new XJ(3,1,1,1),new XJ(1,1,1,1),new XJ(3,0,1,1),new XJ(1,0,1,1)],this._cubeDirections=[new I(1,0,0),new I(-1,0,0),new I(0,0,1),new I(0,0,-1),new I(0,1,0),new I(0,-1,0)],this._cubeUps=[new I(0,1,0),new I(0,1,0),new I(0,1,0),new I(0,1,0),new I(0,0,1),new I(0,0,-1)]}updateMatrices(J,Q=0){let Z=this.camera,$=this.matrix,W=J.distance||Z.far;if(W!==Z.far)Z.far=W,Z.updateProjectionMatrix();r7.setFromMatrixPosition(J.matrixWorld),Z.position.copy(r7),mY.copy(Z.position),mY.add(this._cubeDirections[Q]),Z.up.copy(this._cubeUps[Q]),Z.lookAt(mY),Z.updateMatrixWorld(),$.makeTranslation(-r7.x,-r7.y,-r7.z),IG.multiplyMatrices(Z.projectionMatrix,Z.matrixWorldInverse),this._frustum.setFromProjectionMatrix(IG)}}class A7 extends a8{constructor(J,Q,Z=0,$=2){super(J,Q);this.isPointLight=!0,this.type="PointLight",this.distance=Z,this.decay=$,this.shadow=new $E}get power(){return this.intensity*4*Math.PI}set power(J){this.intensity=J/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(J,Q){return super.copy(J,Q),this.distance=J.distance,this.decay=J.decay,this.shadow=J.shadow.clone(),this}}class r8 extends k7{constructor(J=-1,Q=1,Z=1,$=-1,W=0.1,Y=2000){super();this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=J,this.right=Q,this.top=Z,this.bottom=$,this.near=W,this.far=Y,this.updateProjectionMatrix()}copy(J,Q){return super.copy(J,Q),this.left=J.left,this.right=J.right,this.top=J.top,this.bottom=J.bottom,this.near=J.near,this.far=J.far,this.zoom=J.zoom,this.view=J.view===null?null:Object.assign({},J.view),this}setViewOffset(J,Q,Z,$,W,Y){if(this.view===null)this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1};this.view.enabled=!0,this.view.fullWidth=J,this.view.fullHeight=Q,this.view.offsetX=Z,this.view.offsetY=$,this.view.width=W,this.view.height=Y,this.updateProjectionMatrix()}clearViewOffset(){if(this.view!==null)this.view.enabled=!1;this.updateProjectionMatrix()}updateProjectionMatrix(){let J=(this.right-this.left)/(2*this.zoom),Q=(this.top-this.bottom)/(2*this.zoom),Z=(this.right+this.left)/2,$=(this.top+this.bottom)/2,W=Z-J,Y=Z+J,X=$+Q,H=$-Q;if(this.view!==null&&this.view.enabled){let K=(this.right-this.left)/this.view.fullWidth/this.zoom,G=(this.top-this.bottom)/this.view.fullHeight/this.zoom;W+=K*this.view.offsetX,Y=W+K*this.view.width,X-=G*this.view.offsetY,H=X-G*this.view.height}this.projectionMatrix.makeOrthographic(W,Y,X,H,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(J){let Q=super.toJSON(J);if(Q.object.zoom=this.zoom,Q.object.left=this.left,Q.object.right=this.right,Q.object.top=this.top,Q.object.bottom=this.bottom,Q.object.near=this.near,Q.object.far=this.far,this.view!==null)Q.object.view=Object.assign({},this.view);return Q}}class WE extends AW{constructor(){super(new r8(-5,5,5,-5,0.5,500));this.isDirectionalLightShadow=!0}}class P7 extends a8{constructor(J,Q){super(J,Q);this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy($0.DEFAULT_UP),this.updateMatrix(),this.target=new $0,this.shadow=new WE}dispose(){this.shadow.dispose()}copy(J){return super.copy(J),this.target=J.target.clone(),this.shadow=J.shadow.clone(),this}}class PW extends a8{constructor(J,Q){super(J,Q);this.isAmbientLight=!0,this.type="AmbientLight"}}class TW extends a8{constructor(J,Q,Z=10,$=10){super(J,Q);this.isRectAreaLight=!0,this.type="RectAreaLight",this.width=Z,this.height=$}get power(){return this.intensity*this.width*this.height*Math.PI}set power(J){this.intensity=J/(this.width*this.height*Math.PI)}copy(J){return super.copy(J),this.width=J.width,this.height=J.height,this}toJSON(J){let Q=super.toJSON(J);return Q.object.width=this.width,Q.object.height=this.height,Q}}class SW{constructor(){this.isSphericalHarmonics3=!0,this.coefficients=[];for(let J=0;J<9;J++)this.coefficients.push(new I)}set(J){for(let Q=0;Q<9;Q++)this.coefficients[Q].copy(J[Q]);return this}zero(){for(let J=0;J<9;J++)this.coefficients[J].set(0,0,0);return this}getAt(J,Q){let{x:Z,y:$,z:W}=J,Y=this.coefficients;return Q.copy(Y[0]).multiplyScalar(0.282095),Q.addScaledVector(Y[1],0.488603*$),Q.addScaledVector(Y[2],0.488603*W),Q.addScaledVector(Y[3],0.488603*Z),Q.addScaledVector(Y[4],1.092548*(Z*$)),Q.addScaledVector(Y[5],1.092548*($*W)),Q.addScaledVector(Y[6],0.315392*(3*W*W-1)),Q.addScaledVector(Y[7],1.092548*(Z*W)),Q.addScaledVector(Y[8],0.546274*(Z*Z-$*$)),Q}getIrradianceAt(J,Q){let{x:Z,y:$,z:W}=J,Y=this.coefficients;return Q.copy(Y[0]).multiplyScalar(0.886227),Q.addScaledVector(Y[1],1.023328*$),Q.addScaledVector(Y[2],1.023328*W),Q.addScaledVector(Y[3],1.023328*Z),Q.addScaledVector(Y[4],0.858086*Z*$),Q.addScaledVector(Y[5],0.858086*$*W),Q.addScaledVector(Y[6],0.743125*W*W-0.247708),Q.addScaledVector(Y[7],0.858086*Z*W),Q.addScaledVector(Y[8],0.429043*(Z*Z-$*$)),Q}add(J){for(let Q=0;Q<9;Q++)this.coefficients[Q].add(J.coefficients[Q]);return this}addScaledSH(J,Q){for(let Z=0;Z<9;Z++)this.coefficients[Z].addScaledVector(J.coefficients[Z],Q);return this}scale(J){for(let Q=0;Q<9;Q++)this.coefficients[Q].multiplyScalar(J);return this}lerp(J,Q){for(let Z=0;Z<9;Z++)this.coefficients[Z].lerp(J.coefficients[Z],Q);return this}equals(J){for(let Q=0;Q<9;Q++)if(!this.coefficients[Q].equals(J.coefficients[Q]))return!1;return!0}copy(J){return this.set(J.coefficients)}clone(){return new this.constructor().copy(this)}fromArray(J,Q=0){let Z=this.coefficients;for(let $=0;$<9;$++)Z[$].fromArray(J,Q+$*3);return this}toArray(J=[],Q=0){let Z=this.coefficients;for(let $=0;$<9;$++)Z[$].toArray(J,Q+$*3);return J}static getBasisAt(J,Q){let{x:Z,y:$,z:W}=J;Q[0]=0.282095,Q[1]=0.488603*$,Q[2]=0.488603*W,Q[3]=0.488603*Z,Q[4]=1.092548*Z*$,Q[5]=1.092548*$*W,Q[6]=0.315392*(3*W*W-1),Q[7]=1.092548*Z*W,Q[8]=0.546274*(Z*Z-$*$)}}class jW extends a8{constructor(J=new SW,Q=1){super(void 0,Q);this.isLightProbe=!0,this.sh=J}copy(J){return super.copy(J),this.sh.copy(J.sh),this}fromJSON(J){return this.intensity=J.intensity,this.sh.fromArray(J.sh),this}toJSON(J){let Q=super.toJSON(J);return Q.object.sh=this.sh.toArray(),Q}}class JZ extends h0{constructor(J){super(J);this.textures={}}load(J,Q,Z,$){let W=this,Y=new Y8(W.manager);Y.setPath(W.path),Y.setRequestHeader(W.requestHeader),Y.setWithCredentials(W.withCredentials),Y.load(J,function(X){try{Q(W.parse(JSON.parse(X)))}catch(H){if($)$(H);else console.error(H);W.manager.itemError(J)}},Z,$)}parse(J){let Q=this.textures;function Z(W){if(Q[W]===void 0)console.warn("THREE.MaterialLoader: Undefined texture",W);return Q[W]}let $=this.createMaterialFromType(J.type);if(J.uuid!==void 0)$.uuid=J.uuid;if(J.name!==void 0)$.name=J.name;if(J.color!==void 0&&$.color!==void 0)$.color.setHex(J.color);if(J.roughness!==void 0)$.roughness=J.roughness;if(J.metalness!==void 0)$.metalness=J.metalness;if(J.sheen!==void 0)$.sheen=J.sheen;if(J.sheenColor!==void 0)$.sheenColor=new u().setHex(J.sheenColor);if(J.sheenRoughness!==void 0)$.sheenRoughness=J.sheenRoughness;if(J.emissive!==void 0&&$.emissive!==void 0)$.emissive.setHex(J.emissive);if(J.specular!==void 0&&$.specular!==void 0)$.specular.setHex(J.specular);if(J.specularIntensity!==void 0)$.specularIntensity=J.specularIntensity;if(J.specularColor!==void 0&&$.specularColor!==void 0)$.specularColor.setHex(J.specularColor);if(J.shininess!==void 0)$.shininess=J.shininess;if(J.clearcoat!==void 0)$.clearcoat=J.clearcoat;if(J.clearcoatRoughness!==void 0)$.clearcoatRoughness=J.clearcoatRoughness;if(J.dispersion!==void 0)$.dispersion=J.dispersion;if(J.iridescence!==void 0)$.iridescence=J.iridescence;if(J.iridescenceIOR!==void 0)$.iridescenceIOR=J.iridescenceIOR;if(J.iridescenceThicknessRange!==void 0)$.iridescenceThicknessRange=J.iridescenceThicknessRange;if(J.transmission!==void 0)$.transmission=J.transmission;if(J.thickness!==void 0)$.thickness=J.thickness;if(J.attenuationDistance!==void 0)$.attenuationDistance=J.attenuationDistance;if(J.attenuationColor!==void 0&&$.attenuationColor!==void 0)$.attenuationColor.setHex(J.attenuationColor);if(J.anisotropy!==void 0)$.anisotropy=J.anisotropy;if(J.anisotropyRotation!==void 0)$.anisotropyRotation=J.anisotropyRotation;if(J.fog!==void 0)$.fog=J.fog;if(J.flatShading!==void 0)$.flatShading=J.flatShading;if(J.blending!==void 0)$.blending=J.blending;if(J.combine!==void 0)$.combine=J.combine;if(J.side!==void 0)$.side=J.side;if(J.shadowSide!==void 0)$.shadowSide=J.shadowSide;if(J.opacity!==void 0)$.opacity=J.opacity;if(J.transparent!==void 0)$.transparent=J.transparent;if(J.alphaTest!==void 0)$.alphaTest=J.alphaTest;if(J.alphaHash!==void 0)$.alphaHash=J.alphaHash;if(J.depthFunc!==void 0)$.depthFunc=J.depthFunc;if(J.depthTest!==void 0)$.depthTest=J.depthTest;if(J.depthWrite!==void 0)$.depthWrite=J.depthWrite;if(J.colorWrite!==void 0)$.colorWrite=J.colorWrite;if(J.blendSrc!==void 0)$.blendSrc=J.blendSrc;if(J.blendDst!==void 0)$.blendDst=J.blendDst;if(J.blendEquation!==void 0)$.blendEquation=J.blendEquation;if(J.blendSrcAlpha!==void 0)$.blendSrcAlpha=J.blendSrcAlpha;if(J.blendDstAlpha!==void 0)$.blendDstAlpha=J.blendDstAlpha;if(J.blendEquationAlpha!==void 0)$.blendEquationAlpha=J.blendEquationAlpha;if(J.blendColor!==void 0&&$.blendColor!==void 0)$.blendColor.setHex(J.blendColor);if(J.blendAlpha!==void 0)$.blendAlpha=J.blendAlpha;if(J.stencilWriteMask!==void 0)$.stencilWriteMask=J.stencilWriteMask;if(J.stencilFunc!==void 0)$.stencilFunc=J.stencilFunc;if(J.stencilRef!==void 0)$.stencilRef=J.stencilRef;if(J.stencilFuncMask!==void 0)$.stencilFuncMask=J.stencilFuncMask;if(J.stencilFail!==void 0)$.stencilFail=J.stencilFail;if(J.stencilZFail!==void 0)$.stencilZFail=J.stencilZFail;if(J.stencilZPass!==void 0)$.stencilZPass=J.stencilZPass;if(J.stencilWrite!==void 0)$.stencilWrite=J.stencilWrite;if(J.wireframe!==void 0)$.wireframe=J.wireframe;if(J.wireframeLinewidth!==void 0)$.wireframeLinewidth=J.wireframeLinewidth;if(J.wireframeLinecap!==void 0)$.wireframeLinecap=J.wireframeLinecap;if(J.wireframeLinejoin!==void 0)$.wireframeLinejoin=J.wireframeLinejoin;if(J.rotation!==void 0)$.rotation=J.rotation;if(J.linewidth!==void 0)$.linewidth=J.linewidth;if(J.dashSize!==void 0)$.dashSize=J.dashSize;if(J.gapSize!==void 0)$.gapSize=J.gapSize;if(J.scale!==void 0)$.scale=J.scale;if(J.polygonOffset!==void 0)$.polygonOffset=J.polygonOffset;if(J.polygonOffsetFactor!==void 0)$.polygonOffsetFactor=J.polygonOffsetFactor;if(J.polygonOffsetUnits!==void 0)$.polygonOffsetUnits=J.polygonOffsetUnits;if(J.dithering!==void 0)$.dithering=J.dithering;if(J.alphaToCoverage!==void 0)$.alphaToCoverage=J.alphaToCoverage;if(J.premultipliedAlpha!==void 0)$.premultipliedAlpha=J.premultipliedAlpha;if(J.forceSinglePass!==void 0)$.forceSinglePass=J.forceSinglePass;if(J.visible!==void 0)$.visible=J.visible;if(J.toneMapped!==void 0)$.toneMapped=J.toneMapped;if(J.userData!==void 0)$.userData=J.userData;if(J.vertexColors!==void 0)if(typeof J.vertexColors==="number")$.vertexColors=J.vertexColors>0?!0:!1;else $.vertexColors=J.vertexColors;if(J.uniforms!==void 0)for(let W in J.uniforms){let Y=J.uniforms[W];switch($.uniforms[W]={},Y.type){case"t":$.uniforms[W].value=Z(Y.value);break;case"c":$.uniforms[W].value=new u().setHex(Y.value);break;case"v2":$.uniforms[W].value=new i().fromArray(Y.value);break;case"v3":$.uniforms[W].value=new I().fromArray(Y.value);break;case"v4":$.uniforms[W].value=new XJ().fromArray(Y.value);break;case"m3":$.uniforms[W].value=new nJ().fromArray(Y.value);break;case"m4":$.uniforms[W].value=new SJ().fromArray(Y.value);break;default:$.uniforms[W].value=Y.value}}if(J.defines!==void 0)$.defines=J.defines;if(J.vertexShader!==void 0)$.vertexShader=J.vertexShader;if(J.fragmentShader!==void 0)$.fragmentShader=J.fragmentShader;if(J.glslVersion!==void 0)$.glslVersion=J.glslVersion;if(J.extensions!==void 0)for(let W in J.extensions)$.extensions[W]=J.extensions[W];if(J.lights!==void 0)$.lights=J.lights;if(J.clipping!==void 0)$.clipping=J.clipping;if(J.size!==void 0)$.size=J.size;if(J.sizeAttenuation!==void 0)$.sizeAttenuation=J.sizeAttenuation;if(J.map!==void 0)$.map=Z(J.map);if(J.matcap!==void 0)$.matcap=Z(J.matcap);if(J.alphaMap!==void 0)$.alphaMap=Z(J.alphaMap);if(J.bumpMap!==void 0)$.bumpMap=Z(J.bumpMap);if(J.bumpScale!==void 0)$.bumpScale=J.bumpScale;if(J.normalMap!==void 0)$.normalMap=Z(J.normalMap);if(J.normalMapType!==void 0)$.normalMapType=J.normalMapType;if(J.normalScale!==void 0){let W=J.normalScale;if(Array.isArray(W)===!1)W=[W,W];$.normalScale=new i().fromArray(W)}if(J.displacementMap!==void 0)$.displacementMap=Z(J.displacementMap);if(J.displacementScale!==void 0)$.displacementScale=J.displacementScale;if(J.displacementBias!==void 0)$.displacementBias=J.displacementBias;if(J.roughnessMap!==void 0)$.roughnessMap=Z(J.roughnessMap);if(J.metalnessMap!==void 0)$.metalnessMap=Z(J.metalnessMap);if(J.emissiveMap!==void 0)$.emissiveMap=Z(J.emissiveMap);if(J.emissiveIntensity!==void 0)$.emissiveIntensity=J.emissiveIntensity;if(J.specularMap!==void 0)$.specularMap=Z(J.specularMap);if(J.specularIntensityMap!==void 0)$.specularIntensityMap=Z(J.specularIntensityMap);if(J.specularColorMap!==void 0)$.specularColorMap=Z(J.specularColorMap);if(J.envMap!==void 0)$.envMap=Z(J.envMap);if(J.envMapRotation!==void 0)$.envMapRotation.fromArray(J.envMapRotation);if(J.envMapIntensity!==void 0)$.envMapIntensity=J.envMapIntensity;if(J.reflectivity!==void 0)$.reflectivity=J.reflectivity;if(J.refractionRatio!==void 0)$.refractionRatio=J.refractionRatio;if(J.lightMap!==void 0)$.lightMap=Z(J.lightMap);if(J.lightMapIntensity!==void 0)$.lightMapIntensity=J.lightMapIntensity;if(J.aoMap!==void 0)$.aoMap=Z(J.aoMap);if(J.aoMapIntensity!==void 0)$.aoMapIntensity=J.aoMapIntensity;if(J.gradientMap!==void 0)$.gradientMap=Z(J.gradientMap);if(J.clearcoatMap!==void 0)$.clearcoatMap=Z(J.clearcoatMap);if(J.clearcoatRoughnessMap!==void 0)$.clearcoatRoughnessMap=Z(J.clearcoatRoughnessMap);if(J.clearcoatNormalMap!==void 0)$.clearcoatNormalMap=Z(J.clearcoatNormalMap);if(J.clearcoatNormalScale!==void 0)$.clearcoatNormalScale=new i().fromArray(J.clearcoatNormalScale);if(J.iridescenceMap!==void 0)$.iridescenceMap=Z(J.iridescenceMap);if(J.iridescenceThicknessMap!==void 0)$.iridescenceThicknessMap=Z(J.iridescenceThicknessMap);if(J.transmissionMap!==void 0)$.transmissionMap=Z(J.transmissionMap);if(J.thicknessMap!==void 0)$.thicknessMap=Z(J.thicknessMap);if(J.anisotropyMap!==void 0)$.anisotropyMap=Z(J.anisotropyMap);if(J.sheenColorMap!==void 0)$.sheenColorMap=Z(J.sheenColorMap);if(J.sheenRoughnessMap!==void 0)$.sheenRoughnessMap=Z(J.sheenRoughnessMap);return $}setTextures(J){return this.textures=J,this}createMaterialFromType(J){return JZ.createMaterialFromType(J)}static createMaterialFromType(J){return new{ShadowMaterial:kW,SpriteMaterial:PQ,RawShaderMaterial:VW,ShaderMaterial:l0,PointsMaterial:M6,MeshPhysicalMaterial:e0,MeshStandardMaterial:f9,MeshPhongMaterial:FW,MeshToonMaterial:DW,MeshNormalMaterial:BW,MeshLambertMaterial:LW,MeshDepthMaterial:iQ,MeshDistanceMaterial:oQ,MeshBasicMaterial:b0,MeshMatcapMaterial:zW,LineDashedMaterial:CW,LineBasicMaterial:S0,Material:C0}[J]}}class b8{static decodeText(J){if(console.warn("THREE.LoaderUtils: decodeText() has been deprecated with r165 and will be removed with r175. Use TextDecoder instead."),typeof TextDecoder<"u")return(/*@__PURE__*/new TextDecoder()).decode(J);let Q="";for(let Z=0,$=J.length;Z<$;Z++)Q+=String.fromCharCode(J[Z]);try{return decodeURIComponent(escape(Q))}catch(Z){return Q}}static extractUrlBase(J){let Q=J.lastIndexOf("/");if(Q===-1)return"./";return J.slice(0,Q+1)}static resolveURL(J,Q){if(typeof J!=="string"||J==="")return"";if(/^https?:\/\//i.test(Q)&&/^\//.test(J))Q=Q.replace(/(^https?:\/\/[^\/]+).*/i,"$1");if(/^(https?:)?\/\//i.test(J))return J;if(/^data:.*,.*$/i.test(J))return J;if(/^blob:.*$/i.test(J))return J;return Q+J}}class vW extends gJ{constructor(){super();this.isInstancedBufferGeometry=!0,this.type="InstancedBufferGeometry",this.instanceCount=1/0}copy(J){return super.copy(J),this.instanceCount=J.instanceCount,this}toJSON(){let J=super.toJSON();return J.instanceCount=this.instanceCount,J.isInstancedBufferGeometry=!0,J}}class yW extends h0{constructor(J){super(J)}load(J,Q,Z,$){let W=this,Y=new Y8(W.manager);Y.setPath(W.path),Y.setRequestHeader(W.requestHeader),Y.setWithCredentials(W.withCredentials),Y.load(J,function(X){try{Q(W.parse(JSON.parse(X)))}catch(H){if($)$(H);else console.error(H);W.manager.itemError(J)}},Z,$)}parse(J){let Q={},Z={};function $(q,N){if(Q[N]!==void 0)return Q[N];let V=q.interleavedBuffers[N],R=W(q,V.buffer),O=Q7(V.type,R),D=new g8(O,V.stride);return D.uuid=V.uuid,Q[N]=D,D}function W(q,N){if(Z[N]!==void 0)return Z[N];let V=q.arrayBuffers[N],R=new Uint32Array(V).buffer;return Z[N]=R,R}let Y=J.isInstancedBufferGeometry?new vW:new gJ,X=J.data.index;if(X!==void 0){let q=Q7(X.type,X.array);Y.setIndex(new X0(q,1))}let H=J.data.attributes;for(let q in H){let N=H[q],k;if(N.isInterleavedBufferAttribute){let V=$(J.data,N.data);k=new O8(V,N.itemSize,N.offset,N.normalized)}else{let V=Q7(N.type,N.array);k=new(N.isInstancedBufferAttribute?x8:X0)(V,N.itemSize,N.normalized)}if(N.name!==void 0)k.name=N.name;if(N.usage!==void 0)k.setUsage(N.usage);Y.setAttribute(q,k)}let K=J.data.morphAttributes;if(K)for(let q in K){let N=K[q],k=[];for(let V=0,R=N.length;V<R;V++){let O=N[V],D;if(O.isInterleavedBufferAttribute){let F=$(J.data,O.data);D=new O8(F,O.itemSize,O.offset,O.normalized)}else{let F=Q7(O.type,O.array);D=new X0(F,O.itemSize,O.normalized)}if(O.name!==void 0)D.name=O.name;k.push(D)}Y.morphAttributes[q]=k}if(J.data.morphTargetsRelative)Y.morphTargetsRelative=!0;let U=J.data.groups||J.data.drawcalls||J.data.offsets;if(U!==void 0)for(let q=0,N=U.length;q!==N;++q){let k=U[q];Y.addGroup(k.start,k.count,k.materialIndex)}let E=J.data.boundingSphere;if(E!==void 0){let q=new I;if(E.center!==void 0)q.fromArray(E.center);Y.boundingSphere=new A0(q,E.radius)}if(J.name)Y.name=J.name;if(J.userData)Y.userData=J.userData;return Y}}class KH extends h0{constructor(J){super(J)}load(J,Q,Z,$){let W=this,Y=this.path===""?b8.extractUrlBase(J):this.path;this.resourcePath=this.resourcePath||Y;let X=new Y8(this.manager);X.setPath(this.path),X.setRequestHeader(this.requestHeader),X.setWithCredentials(this.withCredentials),X.load(J,function(H){let K=null;try{K=JSON.parse(H)}catch(U){if($!==void 0)$(U);console.error("THREE:ObjectLoader: Can't parse "+J+".",U.message);return}let G=K.metadata;if(G===void 0||G.type===void 0||G.type.toLowerCase()==="geometry"){if($!==void 0)$(Error("THREE.ObjectLoader: Can't load "+J));console.error("THREE.ObjectLoader: Can't load "+J);return}W.parse(K,Q)},Z,$)}async loadAsync(J,Q){let Z=this,$=this.path===""?b8.extractUrlBase(J):this.path;this.resourcePath=this.resourcePath||$;let W=new Y8(this.manager);W.setPath(this.path),W.setRequestHeader(this.requestHeader),W.setWithCredentials(this.withCredentials);let Y=await W.loadAsync(J,Q),X=JSON.parse(Y),H=X.metadata;if(H===void 0||H.type===void 0||H.type.toLowerCase()==="geometry")throw Error("THREE.ObjectLoader: Can't load "+J);return await Z.parseAsync(X)}parse(J,Q){let Z=this.parseAnimations(J.animations),$=this.parseShapes(J.shapes),W=this.parseGeometries(J.geometries,$),Y=this.parseImages(J.images,function(){if(Q!==void 0)Q(K)}),X=this.parseTextures(J.textures,Y),H=this.parseMaterials(J.materials,X),K=this.parseObject(J.object,W,H,X,Z),G=this.parseSkeletons(J.skeletons,K);if(this.bindSkeletons(K,G),this.bindLightTargets(K),Q!==void 0){let U=!1;for(let E in Y)if(Y[E].data instanceof HTMLImageElement){U=!0;break}if(U===!1)Q(K)}return K}async parseAsync(J){let Q=this.parseAnimations(J.animations),Z=this.parseShapes(J.shapes),$=this.parseGeometries(J.geometries,Z),W=await this.parseImagesAsync(J.images),Y=this.parseTextures(J.textures,W),X=this.parseMaterials(J.materials,Y),H=this.parseObject(J.object,$,X,Y,Q),K=this.parseSkeletons(J.skeletons,H);return this.bindSkeletons(H,K),this.bindLightTargets(H),H}parseShapes(J){let Q={};if(J!==void 0)for(let Z=0,$=J.length;Z<$;Z++){let W=new E9().fromJSON(J[Z]);Q[W.uuid]=W}return Q}parseSkeletons(J,Q){let Z={},$={};if(Q.traverse(function(W){if(W.isBone)$[W.uuid]=W}),J!==void 0)for(let W=0,Y=J.length;W<Y;W++){let X=new C6().fromJSON(J[W],$);Z[X.uuid]=X}return Z}parseGeometries(J,Q){let Z={};if(J!==void 0){let $=new yW;for(let W=0,Y=J.length;W<Y;W++){let X,H=J[W];switch(H.type){case"BufferGeometry":case"InstancedBufferGeometry":X=$.parse(H);break;default:if(H.type in CG)X=CG[H.type].fromJSON(H,Q);else console.warn(`THREE.ObjectLoader: Unsupported geometry type "${H.type}"`)}if(X.uuid=H.uuid,H.name!==void 0)X.name=H.name;if(H.userData!==void 0)X.userData=H.userData;Z[H.uuid]=X}}return Z}parseMaterials(J,Q){let Z={},$={};if(J!==void 0){let W=new JZ;W.setTextures(Q);for(let Y=0,X=J.length;Y<X;Y++){let H=J[Y];if(Z[H.uuid]===void 0)Z[H.uuid]=W.parse(H);$[H.uuid]=Z[H.uuid]}}return $}parseAnimations(J){let Q={};if(J!==void 0)for(let Z=0;Z<J.length;Z++){let $=J[Z],W=q9.parse($);Q[W.uuid]=W}return Q}parseImages(J,Q){let Z=this,$={},W;function Y(H){return Z.manager.itemStart(H),W.load(H,function(){Z.manager.itemEnd(H)},void 0,function(){Z.manager.itemError(H),Z.manager.itemEnd(H)})}function X(H){if(typeof H==="string"){let K=H,G=/^(\/\/)|([a-z]+:(\/\/)?)/i.test(K)?K:Z.resourcePath+K;return Y(G)}else if(H.data)return{data:Q7(H.type,H.data),width:H.width,height:H.height};else return null}if(J!==void 0&&J.length>0){let H=new tQ(Q);W=new Y6(H),W.setCrossOrigin(this.crossOrigin);for(let K=0,G=J.length;K<G;K++){let U=J[K],E=U.url;if(Array.isArray(E)){let q=[];for(let N=0,k=E.length;N<k;N++){let V=E[N],R=X(V);if(R!==null)if(R instanceof HTMLImageElement)q.push(R);else q.push(new p0(R.data,R.width,R.height))}$[U.uuid]=new G9(q)}else{let q=X(U.url);$[U.uuid]=new G9(q)}}}return $}async parseImagesAsync(J){let Q=this,Z={},$;async function W(Y){if(typeof Y==="string"){let X=Y,H=/^(\/\/)|([a-z]+:(\/\/)?)/i.test(X)?X:Q.resourcePath+X;return await $.loadAsync(H)}else if(Y.data)return{data:Q7(Y.type,Y.data),width:Y.width,height:Y.height};else return null}if(J!==void 0&&J.length>0){$=new Y6(this.manager),$.setCrossOrigin(this.crossOrigin);for(let Y=0,X=J.length;Y<X;Y++){let H=J[Y],K=H.url;if(Array.isArray(K)){let G=[];for(let U=0,E=K.length;U<E;U++){let q=K[U],N=await W(q);if(N!==null)if(N instanceof HTMLImageElement)G.push(N);else G.push(new p0(N.data,N.width,N.height))}Z[H.uuid]=new G9(G)}else{let G=await W(H.url);Z[H.uuid]=new G9(G)}}}return Z}parseTextures(J,Q){function Z(W,Y){if(typeof W==="number")return W;return console.warn("THREE.ObjectLoader.parseTexture: Constant should be in numeric form.",W),Y[W]}let $={};if(J!==void 0)for(let W=0,Y=J.length;W<Y;W++){let X=J[W];if(X.image===void 0)console.warn('THREE.ObjectLoader: No "image" specified for',X.uuid);if(Q[X.image]===void 0)console.warn("THREE.ObjectLoader: Undefined image",X.image);let H=Q[X.image],K=H.data,G;if(Array.isArray(K)){if(G=new L6,K.length===6)G.needsUpdate=!0}else{if(K&&K.data)G=new p0;else G=new R0;if(K)G.needsUpdate=!0}if(G.source=H,G.uuid=X.uuid,X.name!==void 0)G.name=X.name;if(X.mapping!==void 0)G.mapping=Z(X.mapping,uN);if(X.channel!==void 0)G.channel=X.channel;if(X.offset!==void 0)G.offset.fromArray(X.offset);if(X.repeat!==void 0)G.repeat.fromArray(X.repeat);if(X.center!==void 0)G.center.fromArray(X.center);if(X.rotation!==void 0)G.rotation=X.rotation;if(X.wrap!==void 0)G.wrapS=Z(X.wrap[0],wG),G.wrapT=Z(X.wrap[1],wG);if(X.format!==void 0)G.format=X.format;if(X.internalFormat!==void 0)G.internalFormat=X.internalFormat;if(X.type!==void 0)G.type=X.type;if(X.colorSpace!==void 0)G.colorSpace=X.colorSpace;if(X.minFilter!==void 0)G.minFilter=Z(X.minFilter,AG);if(X.magFilter!==void 0)G.magFilter=Z(X.magFilter,AG);if(X.anisotropy!==void 0)G.anisotropy=X.anisotropy;if(X.flipY!==void 0)G.flipY=X.flipY;if(X.generateMipmaps!==void 0)G.generateMipmaps=X.generateMipmaps;if(X.premultiplyAlpha!==void 0)G.premultiplyAlpha=X.premultiplyAlpha;if(X.unpackAlignment!==void 0)G.unpackAlignment=X.unpackAlignment;if(X.compareFunction!==void 0)G.compareFunction=X.compareFunction;if(X.userData!==void 0)G.userData=X.userData;$[X.uuid]=G}return $}parseObject(J,Q,Z,$,W){let Y;function X(E){if(Q[E]===void 0)console.warn("THREE.ObjectLoader: Undefined geometry",E);return Q[E]}function H(E){if(E===void 0)return;if(Array.isArray(E)){let q=[];for(let N=0,k=E.length;N<k;N++){let V=E[N];if(Z[V]===void 0)console.warn("THREE.ObjectLoader: Undefined material",V);q.push(Z[V])}return q}if(Z[E]===void 0)console.warn("THREE.ObjectLoader: Undefined material",E);return Z[E]}function K(E){if($[E]===void 0)console.warn("THREE.ObjectLoader: Undefined texture",E);return $[E]}let G,U;switch(J.type){case"Scene":if(Y=new k9,J.background!==void 0)if(Number.isInteger(J.background))Y.background=new u(J.background);else Y.background=K(J.background);if(J.environment!==void 0)Y.environment=K(J.environment);if(J.fog!==void 0){if(J.fog.type==="Fog")Y.fog=new AQ(J.fog.color,J.fog.near,J.fog.far);else if(J.fog.type==="FogExp2")Y.fog=new wQ(J.fog.color,J.fog.density);if(J.fog.name!=="")Y.fog.name=J.fog.name}if(J.backgroundBlurriness!==void 0)Y.backgroundBlurriness=J.backgroundBlurriness;if(J.backgroundIntensity!==void 0)Y.backgroundIntensity=J.backgroundIntensity;if(J.backgroundRotation!==void 0)Y.backgroundRotation.fromArray(J.backgroundRotation);if(J.environmentIntensity!==void 0)Y.environmentIntensity=J.environmentIntensity;if(J.environmentRotation!==void 0)Y.environmentRotation.fromArray(J.environmentRotation);break;case"PerspectiveCamera":if(Y=new O0(J.fov,J.aspect,J.near,J.far),J.focus!==void 0)Y.focus=J.focus;if(J.zoom!==void 0)Y.zoom=J.zoom;if(J.filmGauge!==void 0)Y.filmGauge=J.filmGauge;if(J.filmOffset!==void 0)Y.filmOffset=J.filmOffset;if(J.view!==void 0)Y.view=Object.assign({},J.view);break;case"OrthographicCamera":if(Y=new r8(J.left,J.right,J.top,J.bottom,J.near,J.far),J.zoom!==void 0)Y.zoom=J.zoom;if(J.view!==void 0)Y.view=Object.assign({},J.view);break;case"AmbientLight":Y=new PW(J.color,J.intensity);break;case"DirectionalLight":Y=new P7(J.color,J.intensity),Y.target=J.target||"";break;case"PointLight":Y=new A7(J.color,J.intensity,J.distance,J.decay);break;case"RectAreaLight":Y=new TW(J.color,J.intensity,J.width,J.height);break;case"SpotLight":Y=new w7(J.color,J.intensity,J.distance,J.angle,J.penumbra,J.decay),Y.target=J.target||"";break;case"HemisphereLight":Y=new wW(J.color,J.groundColor,J.intensity);break;case"LightProbe":Y=new jW().fromJSON(J);break;case"SkinnedMesh":if(G=X(J.geometry),U=H(J.material),Y=new F7(G,U),J.bindMode!==void 0)Y.bindMode=J.bindMode;if(J.bindMatrix!==void 0)Y.bindMatrix.fromArray(J.bindMatrix);if(J.skeleton!==void 0)Y.skeleton=J.skeleton;break;case"Mesh":G=X(J.geometry),U=H(J.material),Y=new N0(G,U);break;case"InstancedMesh":G=X(J.geometry),U=H(J.material);let{count:E,instanceMatrix:q,instanceColor:N}=J;if(Y=new D7(G,U,E),Y.instanceMatrix=new x8(new Float32Array(q.array),16),N!==void 0)Y.instanceColor=new x8(new Float32Array(N.array),N.itemSize);break;case"BatchedMesh":if(G=X(J.geometry),U=H(J.material),Y=new XW(J.maxInstanceCount,J.maxVertexCount,J.maxIndexCount,U),Y.geometry=G,Y.perObjectFrustumCulled=J.perObjectFrustumCulled,Y.sortObjects=J.sortObjects,Y._drawRanges=J.drawRanges,Y._reservedRanges=J.reservedRanges,Y._visibility=J.visibility,Y._active=J.active,Y._bounds=J.bounds.map((k)=>{let V=new z0;V.min.fromArray(k.boxMin),V.max.fromArray(k.boxMax);let R=new A0;return R.radius=k.sphereRadius,R.center.fromArray(k.sphereCenter),{boxInitialized:k.boxInitialized,box:V,sphereInitialized:k.sphereInitialized,sphere:R}}),Y._maxInstanceCount=J.maxInstanceCount,Y._maxVertexCount=J.maxVertexCount,Y._maxIndexCount=J.maxIndexCount,Y._geometryInitialized=J.geometryInitialized,Y._geometryCount=J.geometryCount,Y._matricesTexture=K(J.matricesTexture.uuid),J.colorsTexture!==void 0)Y._colorsTexture=K(J.colorsTexture.uuid);break;case"LOD":Y=new YW;break;case"Line":Y=new _8(X(J.geometry),H(J.material));break;case"LineLoop":Y=new B7(X(J.geometry),H(J.material));break;case"LineSegments":Y=new K8(X(J.geometry),H(J.material));break;case"PointCloud":case"Points":Y=new L7(X(J.geometry),H(J.material));break;case"Sprite":Y=new WW(H(J.material));break;case"Group":Y=new $8;break;case"Bone":Y=new z6;break;default:Y=new $0}if(Y.uuid=J.uuid,J.name!==void 0)Y.name=J.name;if(J.matrix!==void 0){if(Y.matrix.fromArray(J.matrix),J.matrixAutoUpdate!==void 0)Y.matrixAutoUpdate=J.matrixAutoUpdate;if(Y.matrixAutoUpdate)Y.matrix.decompose(Y.position,Y.quaternion,Y.scale)}else{if(J.position!==void 0)Y.position.fromArray(J.position);if(J.rotation!==void 0)Y.rotation.fromArray(J.rotation);if(J.quaternion!==void 0)Y.quaternion.fromArray(J.quaternion);if(J.scale!==void 0)Y.scale.fromArray(J.scale)}if(J.up!==void 0)Y.up.fromArray(J.up);if(J.castShadow!==void 0)Y.castShadow=J.castShadow;if(J.receiveShadow!==void 0)Y.receiveShadow=J.receiveShadow;if(J.shadow){if(J.shadow.intensity!==void 0)Y.shadow.intensity=J.shadow.intensity;if(J.shadow.bias!==void 0)Y.shadow.bias=J.shadow.bias;if(J.shadow.normalBias!==void 0)Y.shadow.normalBias=J.shadow.normalBias;if(J.shadow.radius!==void 0)Y.shadow.radius=J.shadow.radius;if(J.shadow.mapSize!==void 0)Y.shadow.mapSize.fromArray(J.shadow.mapSize);if(J.shadow.camera!==void 0)Y.shadow.camera=this.parseObject(J.shadow.camera)}if(J.visible!==void 0)Y.visible=J.visible;if(J.frustumCulled!==void 0)Y.frustumCulled=J.frustumCulled;if(J.renderOrder!==void 0)Y.renderOrder=J.renderOrder;if(J.userData!==void 0)Y.userData=J.userData;if(J.layers!==void 0)Y.layers.mask=J.layers;if(J.children!==void 0){let E=J.children;for(let q=0;q<E.length;q++)Y.add(this.parseObject(E[q],Q,Z,$,W))}if(J.animations!==void 0){let E=J.animations;for(let q=0;q<E.length;q++){let N=E[q];Y.animations.push(W[N])}}if(J.type==="LOD"){if(J.autoUpdate!==void 0)Y.autoUpdate=J.autoUpdate;let E=J.levels;for(let q=0;q<E.length;q++){let N=E[q],k=Y.getObjectByProperty("uuid",N.object);if(k!==void 0)Y.addLevel(k,N.distance,N.hysteresis)}}return Y}bindSkeletons(J,Q){if(Object.keys(Q).length===0)return;J.traverse(function(Z){if(Z.isSkinnedMesh===!0&&Z.skeleton!==void 0){let $=Q[Z.skeleton];if($===void 0)console.warn("THREE.ObjectLoader: No skeleton found with UUID:",Z.skeleton);else Z.bind($,Z.bindMatrix)}})}bindLightTargets(J){J.traverse(function(Q){if(Q.isDirectionalLight||Q.isSpotLight){let Z=Q.target,$=J.getObjectByProperty("uuid",Z);if($!==void 0)Q.target=$;else Q.target=new $0}})}}var uN={UVMapping:300,CubeReflectionMapping:301,CubeRefractionMapping:302,EquirectangularReflectionMapping:303,EquirectangularRefractionMapping:304,CubeUVReflectionMapping:306},wG={RepeatWrapping:1000,ClampToEdgeWrapping:1001,MirroredRepeatWrapping:1002},AG={NearestFilter:1003,NearestMipmapNearestFilter:1004,NearestMipmapLinearFilter:1005,LinearFilter:1006,LinearMipmapNearestFilter:1007,LinearMipmapLinearFilter:1008};class QZ extends h0{constructor(J){super(J);if(this.isImageBitmapLoader=!0,typeof createImageBitmap>"u")console.warn("THREE.ImageBitmapLoader: createImageBitmap() not supported.");if(typeof fetch>"u")console.warn("THREE.ImageBitmapLoader: fetch() not supported.");this.options={premultiplyAlpha:"none"}}setOptions(J){return this.options=J,this}load(J,Q,Z,$){if(J===void 0)J="";if(this.path!==void 0)J=this.path+J;J=this.manager.resolveURL(J);let W=this,Y=u8.get(J);if(Y!==void 0){if(W.manager.itemStart(J),Y.then){Y.then((K)=>{if(Q)Q(K);W.manager.itemEnd(J)}).catch((K)=>{if($)$(K)});return}return setTimeout(function(){if(Q)Q(Y);W.manager.itemEnd(J)},0),Y}let X={};X.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",X.headers=this.requestHeader;let H=fetch(J,X).then(function(K){return K.blob()}).then(function(K){return createImageBitmap(K,Object.assign(W.options,{colorSpaceConversion:"none"}))}).then(function(K){if(u8.add(J,K),Q)Q(K);return W.manager.itemEnd(J),K}).catch(function(K){if($)$(K);u8.remove(J),W.manager.itemError(J),W.manager.itemEnd(J)});u8.add(J,H),W.manager.itemStart(J)}}var Z$;class ZZ{static getContext(){if(Z$===void 0)Z$=new(window.AudioContext||window.webkitAudioContext);return Z$}static setContext(J){Z$=J}}class GH extends h0{constructor(J){super(J)}load(J,Q,Z,$){let W=this,Y=new Y8(this.manager);Y.setResponseType("arraybuffer"),Y.setPath(this.path),Y.setRequestHeader(this.requestHeader),Y.setWithCredentials(this.withCredentials),Y.load(J,function(H){try{let K=H.slice(0);ZZ.getContext().decodeAudioData(K,function(U){Q(U)}).catch(X)}catch(K){X(K)}},Z,$);function X(H){if($)$(H);else console.error(H);W.manager.itemError(J)}}}var PG=/*@__PURE__*/new SJ,TG=/*@__PURE__*/new SJ,o9=/*@__PURE__*/new SJ;class UH{constructor(){this.type="StereoCamera",this.aspect=1,this.eyeSep=0.064,this.cameraL=new O0,this.cameraL.layers.enable(1),this.cameraL.matrixAutoUpdate=!1,this.cameraR=new O0,this.cameraR.layers.enable(2),this.cameraR.matrixAutoUpdate=!1,this._cache={focus:null,fov:null,aspect:null,near:null,far:null,zoom:null,eyeSep:null}}update(J){let Q=this._cache;if(Q.focus!==J.focus||Q.fov!==J.fov||Q.aspect!==J.aspect*this.aspect||Q.near!==J.near||Q.far!==J.far||Q.zoom!==J.zoom||Q.eyeSep!==this.eyeSep){Q.focus=J.focus,Q.fov=J.fov,Q.aspect=J.aspect*this.aspect,Q.near=J.near,Q.far=J.far,Q.zoom=J.zoom,Q.eyeSep=this.eyeSep,o9.copy(J.projectionMatrix);let $=Q.eyeSep/2,W=$*Q.near/Q.focus,Y=Q.near*Math.tan(Q6*Q.fov*0.5)/Q.zoom,X,H;TG.elements[12]=-$,PG.elements[12]=$,X=-Y*Q.aspect+W,H=Y*Q.aspect+W,o9.elements[0]=2*Q.near/(H-X),o9.elements[8]=(H+X)/(H-X),this.cameraL.projectionMatrix.copy(o9),X=-Y*Q.aspect-W,H=Y*Q.aspect-W,o9.elements[0]=2*Q.near/(H-X),o9.elements[8]=(H+X)/(H-X),this.cameraR.projectionMatrix.copy(o9)}this.cameraL.matrixWorld.copy(J.matrixWorld).multiply(TG),this.cameraR.matrixWorld.copy(J.matrixWorld).multiply(PG)}}class xW extends O0{constructor(J=[]){super();this.isArrayCamera=!0,this.cameras=J,this.index=0}}class bW{constructor(J=!0){this.autoStart=J,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=SG(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let J=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){let Q=SG();J=(Q-this.oldTime)/1000,this.oldTime=Q,this.elapsedTime+=J}return J}}function SG(){return performance.now()}var a9=/*@__PURE__*/new I,jG=/*@__PURE__*/new P0,dN=/*@__PURE__*/new I,r9=/*@__PURE__*/new I;class EH extends $0{constructor(){super();this.type="AudioListener",this.context=ZZ.getContext(),this.gain=this.context.createGain(),this.gain.connect(this.context.destination),this.filter=null,this.timeDelta=0,this._clock=new bW}getInput(){return this.gain}removeFilter(){if(this.filter!==null)this.gain.disconnect(this.filter),this.filter.disconnect(this.context.destination),this.gain.connect(this.context.destination),this.filter=null;return this}getFilter(){return this.filter}setFilter(J){if(this.filter!==null)this.gain.disconnect(this.filter),this.filter.disconnect(this.context.destination);else this.gain.disconnect(this.context.destination);return this.filter=J,this.gain.connect(this.filter),this.filter.connect(this.context.destination),this}getMasterVolume(){return this.gain.gain.value}setMasterVolume(J){return this.gain.gain.setTargetAtTime(J,this.context.currentTime,0.01),this}updateMatrixWorld(J){super.updateMatrixWorld(J);let Q=this.context.listener,Z=this.up;if(this.timeDelta=this._clock.getDelta(),this.matrixWorld.decompose(a9,jG,dN),r9.set(0,0,-1).applyQuaternion(jG),Q.positionX){let $=this.context.currentTime+this.timeDelta;Q.positionX.linearRampToValueAtTime(a9.x,$),Q.positionY.linearRampToValueAtTime(a9.y,$),Q.positionZ.linearRampToValueAtTime(a9.z,$),Q.forwardX.linearRampToValueAtTime(r9.x,$),Q.forwardY.linearRampToValueAtTime(r9.y,$),Q.forwardZ.linearRampToValueAtTime(r9.z,$),Q.upX.linearRampToValueAtTime(Z.x,$),Q.upY.linearRampToValueAtTime(Z.y,$),Q.upZ.linearRampToValueAtTime(Z.z,$)}else Q.setPosition(a9.x,a9.y,a9.z),Q.setOrientation(r9.x,r9.y,r9.z,Z.x,Z.y,Z.z)}}class hW extends $0{constructor(J){super();this.type="Audio",this.listener=J,this.context=J.context,this.gain=this.context.createGain(),this.gain.connect(J.getInput()),this.autoplay=!1,this.buffer=null,this.detune=0,this.loop=!1,this.loopStart=0,this.loopEnd=0,this.offset=0,this.duration=void 0,this.playbackRate=1,this.isPlaying=!1,this.hasPlaybackControl=!0,this.source=null,this.sourceType="empty",this._startedAt=0,this._progress=0,this._connected=!1,this.filters=[]}getOutput(){return this.gain}setNodeSource(J){return this.hasPlaybackControl=!1,this.sourceType="audioNode",this.source=J,this.connect(),this}setMediaElementSource(J){return this.hasPlaybackControl=!1,this.sourceType="mediaNode",this.source=this.context.createMediaElementSource(J),this.connect(),this}setMediaStreamSource(J){return this.hasPlaybackControl=!1,this.sourceType="mediaStreamNode",this.source=this.context.createMediaStreamSource(J),this.connect(),this}setBuffer(J){if(this.buffer=J,this.sourceType="buffer",this.autoplay)this.play();return this}play(J=0){if(this.isPlaying===!0){console.warn("THREE.Audio: Audio is already playing.");return}if(this.hasPlaybackControl===!1){console.warn("THREE.Audio: this Audio has no playback control.");return}this._startedAt=this.context.currentTime+J;let Q=this.context.createBufferSource();return Q.buffer=this.buffer,Q.loop=this.loop,Q.loopStart=this.loopStart,Q.loopEnd=this.loopEnd,Q.onended=this.onEnded.bind(this),Q.start(this._startedAt,this._progress+this.offset,this.duration),this.isPlaying=!0,this.source=Q,this.setDetune(this.detune),this.setPlaybackRate(this.playbackRate),this.connect()}pause(){if(this.hasPlaybackControl===!1){console.warn("THREE.Audio: this Audio has no playback control.");return}if(this.isPlaying===!0){if(this._progress+=Math.max(this.context.currentTime-this._startedAt,0)*this.playbackRate,this.loop===!0)this._progress=this._progress%(this.duration||this.buffer.duration);this.source.stop(),this.source.onended=null,this.isPlaying=!1}return this}stop(J=0){if(this.hasPlaybackControl===!1){console.warn("THREE.Audio: this Audio has no playback control.");return}if(this._progress=0,this.source!==null)this.source.stop(this.context.currentTime+J),this.source.onended=null;return this.isPlaying=!1,this}connect(){if(this.filters.length>0){this.source.connect(this.filters[0]);for(let J=1,Q=this.filters.length;J<Q;J++)this.filters[J-1].connect(this.filters[J]);this.filters[this.filters.length-1].connect(this.getOutput())}else this.source.connect(this.getOutput());return this._connected=!0,this}disconnect(){if(this._connected===!1)return;if(this.filters.length>0){this.source.disconnect(this.filters[0]);for(let J=1,Q=this.filters.length;J<Q;J++)this.filters[J-1].disconnect(this.filters[J]);this.filters[this.filters.length-1].disconnect(this.getOutput())}else this.source.disconnect(this.getOutput());return this._connected=!1,this}getFilters(){return this.filters}setFilters(J){if(!J)J=[];if(this._connected===!0)this.disconnect(),this.filters=J.slice(),this.connect();else this.filters=J.slice();return this}setDetune(J){if(this.detune=J,this.isPlaying===!0&&this.source.detune!==void 0)this.source.detune.setTargetAtTime(this.detune,this.context.currentTime,0.01);return this}getDetune(){return this.detune}getFilter(){return this.getFilters()[0]}setFilter(J){return this.setFilters(J?[J]:[])}setPlaybackRate(J){if(this.hasPlaybackControl===!1){console.warn("THREE.Audio: this Audio has no playback control.");return}if(this.playbackRate=J,this.isPlaying===!0)this.source.playbackRate.setTargetAtTime(this.playbackRate,this.context.currentTime,0.01);return this}getPlaybackRate(){return this.playbackRate}onEnded(){this.isPlaying=!1,this._progress=0}getLoop(){if(this.hasPlaybackControl===!1)return console.warn("THREE.Audio: this Audio has no playback control."),!1;return this.loop}setLoop(J){if(this.hasPlaybackControl===!1){console.warn("THREE.Audio: this Audio has no playback control.");return}if(this.loop=J,this.isPlaying===!0)this.source.loop=this.loop;return this}setLoopStart(J){return this.loopStart=J,this}setLoopEnd(J){return this.loopEnd=J,this}getVolume(){return this.gain.gain.value}setVolume(J){return this.gain.gain.setTargetAtTime(J,this.context.currentTime,0.01),this}copy(J,Q){if(super.copy(J,Q),J.sourceType!=="buffer")return console.warn("THREE.Audio: Audio source type cannot be copied."),this;return this.autoplay=J.autoplay,this.buffer=J.buffer,this.detune=J.detune,this.loop=J.loop,this.loopStart=J.loopStart,this.loopEnd=J.loopEnd,this.offset=J.offset,this.duration=J.duration,this.playbackRate=J.playbackRate,this.hasPlaybackControl=J.hasPlaybackControl,this.sourceType=J.sourceType,this.filters=J.filters.slice(),this}clone(J){return new this.constructor(this.listener).copy(this,J)}}var t9=/*@__PURE__*/new I,vG=/*@__PURE__*/new P0,cN=/*@__PURE__*/new I,e9=/*@__PURE__*/new I;class qH extends hW{constructor(J){super(J);this.panner=this.context.createPanner(),this.panner.panningModel="HRTF",this.panner.connect(this.gain)}connect(){super.connect(),this.panner.connect(this.gain)}disconnect(){super.disconnect(),this.panner.disconnect(this.gain)}getOutput(){return this.panner}getRefDistance(){return this.panner.refDistance}setRefDistance(J){return this.panner.refDistance=J,this}getRolloffFactor(){return this.panner.rolloffFactor}setRolloffFactor(J){return this.panner.rolloffFactor=J,this}getDistanceModel(){return this.panner.distanceModel}setDistanceModel(J){return this.panner.distanceModel=J,this}getMaxDistance(){return this.panner.maxDistance}setMaxDistance(J){return this.panner.maxDistance=J,this}setDirectionalCone(J,Q,Z){return this.panner.coneInnerAngle=J,this.panner.coneOuterAngle=Q,this.panner.coneOuterGain=Z,this}updateMatrixWorld(J){if(super.updateMatrixWorld(J),this.hasPlaybackControl===!0&&this.isPlaying===!1)return;this.matrixWorld.decompose(t9,vG,cN),e9.set(0,0,1).applyQuaternion(vG);let Q=this.panner;if(Q.positionX){let Z=this.context.currentTime+this.listener.timeDelta;Q.positionX.linearRampToValueAtTime(t9.x,Z),Q.positionY.linearRampToValueAtTime(t9.y,Z),Q.positionZ.linearRampToValueAtTime(t9.z,Z),Q.orientationX.linearRampToValueAtTime(e9.x,Z),Q.orientationY.linearRampToValueAtTime(e9.y,Z),Q.orientationZ.linearRampToValueAtTime(e9.z,Z)}else Q.setPosition(t9.x,t9.y,t9.z),Q.setOrientation(e9.x,e9.y,e9.z)}}class NH{constructor(J,Q=2048){this.analyser=J.context.createAnalyser(),this.analyser.fftSize=Q,this.data=new Uint8Array(this.analyser.frequencyBinCount),J.getOutput().connect(this.analyser)}getFrequencyData(){return this.analyser.getByteFrequencyData(this.data),this.data}getAverageFrequency(){let J=0,Q=this.getFrequencyData();for(let Z=0;Z<Q.length;Z++)J+=Q[Z];return J/Q.length}}class fW{constructor(J,Q,Z){this.binding=J,this.valueSize=Z;let $,W,Y;switch(Q){case"quaternion":$=this._slerp,W=this._slerpAdditive,Y=this._setAdditiveIdentityQuaternion,this.buffer=new Float64Array(Z*6),this._workIndex=5;break;case"string":case"bool":$=this._select,W=this._select,Y=this._setAdditiveIdentityOther,this.buffer=Array(Z*5);break;default:$=this._lerp,W=this._lerpAdditive,Y=this._setAdditiveIdentityNumeric,this.buffer=new Float64Array(Z*5)}this._mixBufferRegion=$,this._mixBufferRegionAdditive=W,this._setIdentity=Y,this._origIndex=3,this._addIndex=4,this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,this.useCount=0,this.referenceCount=0}accumulate(J,Q){let Z=this.buffer,$=this.valueSize,W=J*$+$,Y=this.cumulativeWeight;if(Y===0){for(let X=0;X!==$;++X)Z[W+X]=Z[X];Y=Q}else{Y+=Q;let X=Q/Y;this._mixBufferRegion(Z,W,0,X,$)}this.cumulativeWeight=Y}accumulateAdditive(J){let Q=this.buffer,Z=this.valueSize,$=Z*this._addIndex;if(this.cumulativeWeightAdditive===0)this._setIdentity();this._mixBufferRegionAdditive(Q,$,0,J,Z),this.cumulativeWeightAdditive+=J}apply(J){let Q=this.valueSize,Z=this.buffer,$=J*Q+Q,W=this.cumulativeWeight,Y=this.cumulativeWeightAdditive,X=this.binding;if(this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,W<1){let H=Q*this._origIndex;this._mixBufferRegion(Z,$,H,1-W,Q)}if(Y>0)this._mixBufferRegionAdditive(Z,$,this._addIndex*Q,1,Q);for(let H=Q,K=Q+Q;H!==K;++H)if(Z[H]!==Z[H+Q]){X.setValue(Z,$);break}}saveOriginalState(){let J=this.binding,Q=this.buffer,Z=this.valueSize,$=Z*this._origIndex;J.getValue(Q,$);for(let W=Z,Y=$;W!==Y;++W)Q[W]=Q[$+W%Z];this._setIdentity(),this.cumulativeWeight=0,this.cumulativeWeightAdditive=0}restoreOriginalState(){let J=this.valueSize*3;this.binding.setValue(this.buffer,J)}_setAdditiveIdentityNumeric(){let J=this._addIndex*this.valueSize,Q=J+this.valueSize;for(let Z=J;Z<Q;Z++)this.buffer[Z]=0}_setAdditiveIdentityQuaternion(){this._setAdditiveIdentityNumeric(),this.buffer[this._addIndex*this.valueSize+3]=1}_setAdditiveIdentityOther(){let J=this._origIndex*this.valueSize,Q=this._addIndex*this.valueSize;for(let Z=0;Z<this.valueSize;Z++)this.buffer[Q+Z]=this.buffer[J+Z]}_select(J,Q,Z,$,W){if($>=0.5)for(let Y=0;Y!==W;++Y)J[Q+Y]=J[Z+Y]}_slerp(J,Q,Z,$){P0.slerpFlat(J,Q,J,Q,J,Z,$)}_slerpAdditive(J,Q,Z,$,W){let Y=this._workIndex*W;P0.multiplyQuaternionsFlat(J,Y,J,Q,J,Z),P0.slerpFlat(J,Q,J,Q,J,Y,$)}_lerp(J,Q,Z,$,W){let Y=1-$;for(let X=0;X!==W;++X){let H=Q+X;J[H]=J[H]*Y+J[Z+X]*$}}_lerpAdditive(J,Q,Z,$,W){for(let Y=0;Y!==W;++Y){let X=Q+Y;J[X]=J[X]+J[Z+Y]*$}}}var OH="\\[\\]\\.:\\/",nN=new RegExp("["+OH+"]","g"),RH="[^"+OH+"]",sN="[^"+OH.replace("\\.","")+"]",iN=/*@__PURE__*/ /((?:WC+[\/:])*)/.source.replace("WC",RH),oN=/*@__PURE__*/ /(WCOD+)?/.source.replace("WCOD",sN),aN=/*@__PURE__*/ /(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",RH),rN=/*@__PURE__*/ /\.(WC+)(?:\[(.+)\])?/.source.replace("WC",RH),tN=new RegExp("^"+iN+oN+aN+rN+"$"),eN=["material","materials","bones","map"];class YE{constructor(J,Q,Z){let $=Z||Y0.parseTrackName(Q);this._targetGroup=J,this._bindings=J.subscribe_(Q,$)}getValue(J,Q){this.bind();let Z=this._targetGroup.nCachedObjects_,$=this._bindings[Z];if($!==void 0)$.getValue(J,Q)}setValue(J,Q){let Z=this._bindings;for(let $=this._targetGroup.nCachedObjects_,W=Z.length;$!==W;++$)Z[$].setValue(J,Q)}bind(){let J=this._bindings;for(let Q=this._targetGroup.nCachedObjects_,Z=J.length;Q!==Z;++Q)J[Q].bind()}unbind(){let J=this._bindings;for(let Q=this._targetGroup.nCachedObjects_,Z=J.length;Q!==Z;++Q)J[Q].unbind()}}class Y0{constructor(J,Q,Z){this.path=Q,this.parsedPath=Z||Y0.parseTrackName(Q),this.node=Y0.findNode(J,this.parsedPath.nodeName),this.rootNode=J,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(J,Q,Z){if(!(J&&J.isAnimationObjectGroup))return new Y0(J,Q,Z);else return new Y0.Composite(J,Q,Z)}static sanitizeNodeName(J){return J.replace(/\s/g,"_").replace(nN,"")}static parseTrackName(J){let Q=tN.exec(J);if(Q===null)throw Error("PropertyBinding: Cannot parse trackName: "+J);let Z={nodeName:Q[2],objectName:Q[3],objectIndex:Q[4],propertyName:Q[5],propertyIndex:Q[6]},$=Z.nodeName&&Z.nodeName.lastIndexOf(".");if($!==void 0&&$!==-1){let W=Z.nodeName.substring($+1);if(eN.indexOf(W)!==-1)Z.nodeName=Z.nodeName.substring(0,$),Z.objectName=W}if(Z.propertyName===null||Z.propertyName.length===0)throw Error("PropertyBinding: can not parse propertyName from trackName: "+J);return Z}static findNode(J,Q){if(Q===void 0||Q===""||Q==="."||Q===-1||Q===J.name||Q===J.uuid)return J;if(J.skeleton){let Z=J.skeleton.getBoneByName(Q);if(Z!==void 0)return Z}if(J.children){let Z=function(W){for(let Y=0;Y<W.length;Y++){let X=W[Y];if(X.name===Q||X.uuid===Q)return X;let H=Z(X.children);if(H)return H}return null},$=Z(J.children);if($)return $}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(J,Q){J[Q]=this.targetObject[this.propertyName]}_getValue_array(J,Q){let Z=this.resolvedProperty;for(let $=0,W=Z.length;$!==W;++$)J[Q++]=Z[$]}_getValue_arrayElement(J,Q){J[Q]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(J,Q){this.resolvedProperty.toArray(J,Q)}_setValue_direct(J,Q){this.targetObject[this.propertyName]=J[Q]}_setValue_direct_setNeedsUpdate(J,Q){this.targetObject[this.propertyName]=J[Q],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(J,Q){this.targetObject[this.propertyName]=J[Q],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(J,Q){let Z=this.resolvedProperty;for(let $=0,W=Z.length;$!==W;++$)Z[$]=J[Q++]}_setValue_array_setNeedsUpdate(J,Q){let Z=this.resolvedProperty;for(let $=0,W=Z.length;$!==W;++$)Z[$]=J[Q++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(J,Q){let Z=this.resolvedProperty;for(let $=0,W=Z.length;$!==W;++$)Z[$]=J[Q++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(J,Q){this.resolvedProperty[this.propertyIndex]=J[Q]}_setValue_arrayElement_setNeedsUpdate(J,Q){this.resolvedProperty[this.propertyIndex]=J[Q],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(J,Q){this.resolvedProperty[this.propertyIndex]=J[Q],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(J,Q){this.resolvedProperty.fromArray(J,Q)}_setValue_fromArray_setNeedsUpdate(J,Q){this.resolvedProperty.fromArray(J,Q),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(J,Q){this.resolvedProperty.fromArray(J,Q),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(J,Q){this.bind(),this.getValue(J,Q)}_setValue_unbound(J,Q){this.bind(),this.setValue(J,Q)}bind(){let J=this.node,Q=this.parsedPath,Z=Q.objectName,$=Q.propertyName,W=Q.propertyIndex;if(!J)J=Y0.findNode(this.rootNode,Q.nodeName),this.node=J;if(this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!J){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(Z){let K=Q.objectIndex;switch(Z){case"materials":if(!J.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!J.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}J=J.material.materials;break;case"bones":if(!J.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}J=J.skeleton.bones;for(let G=0;G<J.length;G++)if(J[G].name===K){K=G;break}break;case"map":if("map"in J){J=J.map;break}if(!J.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!J.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}J=J.material.map;break;default:if(J[Z]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}J=J[Z]}if(K!==void 0){if(J[K]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,J);return}J=J[K]}}let Y=J[$];if(Y===void 0){let K=Q.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+K+"."+$+" but it wasn't found.",J);return}let X=this.Versioning.None;if(this.targetObject=J,J.isMaterial===!0)X=this.Versioning.NeedsUpdate;else if(J.isObject3D===!0)X=this.Versioning.MatrixWorldNeedsUpdate;let H=this.BindingType.Direct;if(W!==void 0){if($==="morphTargetInfluences"){if(!J.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!J.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}if(J.morphTargetDictionary[W]!==void 0)W=J.morphTargetDictionary[W]}H=this.BindingType.ArrayElement,this.resolvedProperty=Y,this.propertyIndex=W}else if(Y.fromArray!==void 0&&Y.toArray!==void 0)H=this.BindingType.HasFromToArray,this.resolvedProperty=Y;else if(Array.isArray(Y))H=this.BindingType.EntireArray,this.resolvedProperty=Y;else this.propertyName=$;this.getValue=this.GetterByBindingType[H],this.setValue=this.SetterByBindingTypeAndVersioning[H][X]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}Y0.Composite=YE;Y0.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};Y0.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};Y0.prototype.GetterByBindingType=[Y0.prototype._getValue_direct,Y0.prototype._getValue_array,Y0.prototype._getValue_arrayElement,Y0.prototype._getValue_toArray];Y0.prototype.SetterByBindingTypeAndVersioning=[[Y0.prototype._setValue_direct,Y0.prototype._setValue_direct_setNeedsUpdate,Y0.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Y0.prototype._setValue_array,Y0.prototype._setValue_array_setNeedsUpdate,Y0.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Y0.prototype._setValue_arrayElement,Y0.prototype._setValue_arrayElement_setNeedsUpdate,Y0.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Y0.prototype._setValue_fromArray,Y0.prototype._setValue_fromArray_setNeedsUpdate,Y0.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];class kH{constructor(){this.isAnimationObjectGroup=!0,this.uuid=N8(),this._objects=Array.prototype.slice.call(arguments),this.nCachedObjects_=0;let J={};this._indicesByUUID=J;for(let Z=0,$=arguments.length;Z!==$;++Z)J[arguments[Z].uuid]=Z;this._paths=[],this._parsedPaths=[],this._bindings=[],this._bindingsIndicesByPath={};let Q=this;this.stats={objects:{get total(){return Q._objects.length},get inUse(){return this.total-Q.nCachedObjects_}},get bindingsPerObject(){return Q._bindings.length}}}add(){let J=this._objects,Q=this._indicesByUUID,Z=this._paths,$=this._parsedPaths,W=this._bindings,Y=W.length,X=void 0,H=J.length,K=this.nCachedObjects_;for(let G=0,U=arguments.length;G!==U;++G){let E=arguments[G],q=E.uuid,N=Q[q];if(N===void 0){N=H++,Q[q]=N,J.push(E);for(let k=0,V=Y;k!==V;++k)W[k].push(new Y0(E,Z[k],$[k]))}else if(N<K){X=J[N];let k=--K,V=J[k];Q[V.uuid]=N,J[N]=V,Q[q]=k,J[k]=E;for(let R=0,O=Y;R!==O;++R){let D=W[R],F=D[k],C=D[N];if(D[N]=F,C===void 0)C=new Y0(E,Z[R],$[R]);D[k]=C}}else if(J[N]!==X)console.error("THREE.AnimationObjectGroup: Different objects with the same UUID ")}this.nCachedObjects_=K}remove(){let J=this._objects,Q=this._indicesByUUID,Z=this._bindings,$=Z.length,W=this.nCachedObjects_;for(let Y=0,X=arguments.length;Y!==X;++Y){let H=arguments[Y],K=H.uuid,G=Q[K];if(G!==void 0&&G>=W){let U=W++,E=J[U];Q[E.uuid]=G,J[G]=E,Q[K]=U,J[U]=H;for(let q=0,N=$;q!==N;++q){let k=Z[q],V=k[U],R=k[G];k[G]=V,k[U]=R}}}this.nCachedObjects_=W}uncache(){let J=this._objects,Q=this._indicesByUUID,Z=this._bindings,$=Z.length,W=this.nCachedObjects_,Y=J.length;for(let X=0,H=arguments.length;X!==H;++X){let K=arguments[X],G=K.uuid,U=Q[G];if(U!==void 0)if(delete Q[G],U<W){let E=--W,q=J[E],N=--Y,k=J[N];Q[q.uuid]=U,J[U]=q,Q[k.uuid]=E,J[E]=k,J.pop();for(let V=0,R=$;V!==R;++V){let O=Z[V],D=O[E],F=O[N];O[U]=D,O[E]=F,O.pop()}}else{let E=--Y,q=J[E];if(E>0)Q[q.uuid]=U;J[U]=q,J.pop();for(let N=0,k=$;N!==k;++N){let V=Z[N];V[U]=V[E],V.pop()}}}this.nCachedObjects_=W}subscribe_(J,Q){let Z=this._bindingsIndicesByPath,$=Z[J],W=this._bindings;if($!==void 0)return W[$];let Y=this._paths,X=this._parsedPaths,H=this._objects,K=H.length,G=this.nCachedObjects_,U=Array(K);$=W.length,Z[J]=$,Y.push(J),X.push(Q),W.push(U);for(let E=G,q=H.length;E!==q;++E){let N=H[E];U[E]=new Y0(N,J,Q)}return U}unsubscribe_(J){let Q=this._bindingsIndicesByPath,Z=Q[J];if(Z!==void 0){let $=this._paths,W=this._parsedPaths,Y=this._bindings,X=Y.length-1,H=Y[X],K=J[X];Q[K]=Z,Y[Z]=H,Y.pop(),W[Z]=W[X],W.pop(),$[Z]=$[X],$.pop()}}}class gW{constructor(J,Q,Z=null,$=Q.blendMode){this._mixer=J,this._clip=Q,this._localRoot=Z,this.blendMode=$;let W=Q.tracks,Y=W.length,X=Array(Y),H={endingStart:2400,endingEnd:2400};for(let K=0;K!==Y;++K){let G=W[K].createInterpolant(null);X[K]=G,G.settings=H}this._interpolantSettings=H,this._interpolants=X,this._propertyBindings=Array(Y),this._cacheIndex=null,this._byClipCacheIndex=null,this._timeScaleInterpolant=null,this._weightInterpolant=null,this.loop=2201,this._loopCount=-1,this._startTime=null,this.time=0,this.timeScale=1,this._effectiveTimeScale=1,this.weight=1,this._effectiveWeight=1,this.repetitions=1/0,this.paused=!1,this.enabled=!0,this.clampWhenFinished=!1,this.zeroSlopeAtStart=!0,this.zeroSlopeAtEnd=!0}play(){return this._mixer._activateAction(this),this}stop(){return this._mixer._deactivateAction(this),this.reset()}reset(){return this.paused=!1,this.enabled=!0,this.time=0,this._loopCount=-1,this._startTime=null,this.stopFading().stopWarping()}isRunning(){return this.enabled&&!this.paused&&this.timeScale!==0&&this._startTime===null&&this._mixer._isActiveAction(this)}isScheduled(){return this._mixer._isActiveAction(this)}startAt(J){return this._startTime=J,this}setLoop(J,Q){return this.loop=J,this.repetitions=Q,this}setEffectiveWeight(J){return this.weight=J,this._effectiveWeight=this.enabled?J:0,this.stopFading()}getEffectiveWeight(){return this._effectiveWeight}fadeIn(J){return this._scheduleFading(J,0,1)}fadeOut(J){return this._scheduleFading(J,1,0)}crossFadeFrom(J,Q,Z){if(J.fadeOut(Q),this.fadeIn(Q),Z){let $=this._clip.duration,W=J._clip.duration,Y=W/$,X=$/W;J.warp(1,Y,Q),this.warp(X,1,Q)}return this}crossFadeTo(J,Q,Z){return J.crossFadeFrom(this,Q,Z)}stopFading(){let J=this._weightInterpolant;if(J!==null)this._weightInterpolant=null,this._mixer._takeBackControlInterpolant(J);return this}setEffectiveTimeScale(J){return this.timeScale=J,this._effectiveTimeScale=this.paused?0:J,this.stopWarping()}getEffectiveTimeScale(){return this._effectiveTimeScale}setDuration(J){return this.timeScale=this._clip.duration/J,this.stopWarping()}syncWith(J){return this.time=J.time,this.timeScale=J.timeScale,this.stopWarping()}halt(J){return this.warp(this._effectiveTimeScale,0,J)}warp(J,Q,Z){let $=this._mixer,W=$.time,Y=this.timeScale,X=this._timeScaleInterpolant;if(X===null)X=$._lendControlInterpolant(),this._timeScaleInterpolant=X;let{parameterPositions:H,sampleValues:K}=X;return H[0]=W,H[1]=W+Z,K[0]=J/Y,K[1]=Q/Y,this}stopWarping(){let J=this._timeScaleInterpolant;if(J!==null)this._timeScaleInterpolant=null,this._mixer._takeBackControlInterpolant(J);return this}getMixer(){return this._mixer}getClip(){return this._clip}getRoot(){return this._localRoot||this._mixer._root}_update(J,Q,Z,$){if(!this.enabled){this._updateWeight(J);return}let W=this._startTime;if(W!==null){let H=(J-W)*Z;if(H<0||Z===0)Q=0;else this._startTime=null,Q=Z*H}Q*=this._updateTimeScale(J);let Y=this._updateTime(Q),X=this._updateWeight(J);if(X>0){let H=this._interpolants,K=this._propertyBindings;switch(this.blendMode){case 2501:for(let G=0,U=H.length;G!==U;++G)H[G].evaluate(Y),K[G].accumulateAdditive(X);break;case 2500:default:for(let G=0,U=H.length;G!==U;++G)H[G].evaluate(Y),K[G].accumulate($,X)}}}_updateWeight(J){let Q=0;if(this.enabled){Q=this.weight;let Z=this._weightInterpolant;if(Z!==null){let $=Z.evaluate(J)[0];if(Q*=$,J>Z.parameterPositions[1]){if(this.stopFading(),$===0)this.enabled=!1}}}return this._effectiveWeight=Q,Q}_updateTimeScale(J){let Q=0;if(!this.paused){Q=this.timeScale;let Z=this._timeScaleInterpolant;if(Z!==null){let $=Z.evaluate(J)[0];if(Q*=$,J>Z.parameterPositions[1])if(this.stopWarping(),Q===0)this.paused=!0;else this.timeScale=Q}}return this._effectiveTimeScale=Q,Q}_updateTime(J){let Q=this._clip.duration,Z=this.loop,$=this.time+J,W=this._loopCount,Y=Z===2202;if(J===0){if(W===-1)return $;return Y&&(W&1)===1?Q-$:$}if(Z===2200){if(W===-1)this._loopCount=0,this._setEndings(!0,!0,!1);J:{if($>=Q)$=Q;else if($<0)$=0;else{this.time=$;break J}if(this.clampWhenFinished)this.paused=!0;else this.enabled=!1;this.time=$,this._mixer.dispatchEvent({type:"finished",action:this,direction:J<0?-1:1})}}else{if(W===-1)if(J>=0)W=0,this._setEndings(!0,this.repetitions===0,Y);else this._setEndings(this.repetitions===0,!0,Y);if($>=Q||$<0){let X=Math.floor($/Q);$-=Q*X,W+=Math.abs(X);let H=this.repetitions-W;if(H<=0){if(this.clampWhenFinished)this.paused=!0;else this.enabled=!1;$=J>0?Q:0,this.time=$,this._mixer.dispatchEvent({type:"finished",action:this,direction:J>0?1:-1})}else{if(H===1){let K=J<0;this._setEndings(K,!K,Y)}else this._setEndings(!1,!1,Y);this._loopCount=W,this.time=$,this._mixer.dispatchEvent({type:"loop",action:this,loopDelta:X})}}else this.time=$;if(Y&&(W&1)===1)return Q-$}return $}_setEndings(J,Q,Z){let $=this._interpolantSettings;if(Z)$.endingStart=2401,$.endingEnd=2401;else{if(J)$.endingStart=this.zeroSlopeAtStart?2401:2400;else $.endingStart=2402;if(Q)$.endingEnd=this.zeroSlopeAtEnd?2401:2400;else $.endingEnd=2402}}_scheduleFading(J,Q,Z){let $=this._mixer,W=$.time,Y=this._weightInterpolant;if(Y===null)Y=$._lendControlInterpolant(),this._weightInterpolant=Y;let{parameterPositions:X,sampleValues:H}=Y;return X[0]=W,H[0]=Q,X[1]=W+J,H[1]=Z,this}}var J1=new Float32Array(1);class $Z extends I8{constructor(J){super();this._root=J,this._initMemoryManager(),this._accuIndex=0,this.time=0,this.timeScale=1}_bindAction(J,Q){let Z=J._localRoot||this._root,$=J._clip.tracks,W=$.length,Y=J._propertyBindings,X=J._interpolants,H=Z.uuid,K=this._bindingsByRootAndName,G=K[H];if(G===void 0)G={},K[H]=G;for(let U=0;U!==W;++U){let E=$[U],q=E.name,N=G[q];if(N!==void 0)++N.referenceCount,Y[U]=N;else{if(N=Y[U],N!==void 0){if(N._cacheIndex===null)++N.referenceCount,this._addInactiveBinding(N,H,q);continue}let k=Q&&Q._propertyBindings[U].binding.parsedPath;N=new fW(Y0.create(Z,q,k),E.ValueTypeName,E.getValueSize()),++N.referenceCount,this._addInactiveBinding(N,H,q),Y[U]=N}X[U].resultBuffer=N.buffer}}_activateAction(J){if(!this._isActiveAction(J)){if(J._cacheIndex===null){let Z=(J._localRoot||this._root).uuid,$=J._clip.uuid,W=this._actionsByClip[$];this._bindAction(J,W&&W.knownActions[0]),this._addInactiveAction(J,$,Z)}let Q=J._propertyBindings;for(let Z=0,$=Q.length;Z!==$;++Z){let W=Q[Z];if(W.useCount++===0)this._lendBinding(W),W.saveOriginalState()}this._lendAction(J)}}_deactivateAction(J){if(this._isActiveAction(J)){let Q=J._propertyBindings;for(let Z=0,$=Q.length;Z!==$;++Z){let W=Q[Z];if(--W.useCount===0)W.restoreOriginalState(),this._takeBackBinding(W)}this._takeBackAction(J)}}_initMemoryManager(){this._actions=[],this._nActiveActions=0,this._actionsByClip={},this._bindings=[],this._nActiveBindings=0,this._bindingsByRootAndName={},this._controlInterpolants=[],this._nActiveControlInterpolants=0;let J=this;this.stats={actions:{get total(){return J._actions.length},get inUse(){return J._nActiveActions}},bindings:{get total(){return J._bindings.length},get inUse(){return J._nActiveBindings}},controlInterpolants:{get total(){return J._controlInterpolants.length},get inUse(){return J._nActiveControlInterpolants}}}}_isActiveAction(J){let Q=J._cacheIndex;return Q!==null&&Q<this._nActiveActions}_addInactiveAction(J,Q,Z){let $=this._actions,W=this._actionsByClip,Y=W[Q];if(Y===void 0)Y={knownActions:[J],actionByRoot:{}},J._byClipCacheIndex=0,W[Q]=Y;else{let X=Y.knownActions;J._byClipCacheIndex=X.length,X.push(J)}J._cacheIndex=$.length,$.push(J),Y.actionByRoot[Z]=J}_removeInactiveAction(J){let Q=this._actions,Z=Q[Q.length-1],$=J._cacheIndex;Z._cacheIndex=$,Q[$]=Z,Q.pop(),J._cacheIndex=null;let W=J._clip.uuid,Y=this._actionsByClip,X=Y[W],H=X.knownActions,K=H[H.length-1],G=J._byClipCacheIndex;K._byClipCacheIndex=G,H[G]=K,H.pop(),J._byClipCacheIndex=null;let U=X.actionByRoot,E=(J._localRoot||this._root).uuid;if(delete U[E],H.length===0)delete Y[W];this._removeInactiveBindingsForAction(J)}_removeInactiveBindingsForAction(J){let Q=J._propertyBindings;for(let Z=0,$=Q.length;Z!==$;++Z){let W=Q[Z];if(--W.referenceCount===0)this._removeInactiveBinding(W)}}_lendAction(J){let Q=this._actions,Z=J._cacheIndex,$=this._nActiveActions++,W=Q[$];J._cacheIndex=$,Q[$]=J,W._cacheIndex=Z,Q[Z]=W}_takeBackAction(J){let Q=this._actions,Z=J._cacheIndex,$=--this._nActiveActions,W=Q[$];J._cacheIndex=$,Q[$]=J,W._cacheIndex=Z,Q[Z]=W}_addInactiveBinding(J,Q,Z){let $=this._bindingsByRootAndName,W=this._bindings,Y=$[Q];if(Y===void 0)Y={},$[Q]=Y;Y[Z]=J,J._cacheIndex=W.length,W.push(J)}_removeInactiveBinding(J){let Q=this._bindings,Z=J.binding,$=Z.rootNode.uuid,W=Z.path,Y=this._bindingsByRootAndName,X=Y[$],H=Q[Q.length-1],K=J._cacheIndex;if(H._cacheIndex=K,Q[K]=H,Q.pop(),delete X[W],Object.keys(X).length===0)delete Y[$]}_lendBinding(J){let Q=this._bindings,Z=J._cacheIndex,$=this._nActiveBindings++,W=Q[$];J._cacheIndex=$,Q[$]=J,W._cacheIndex=Z,Q[Z]=W}_takeBackBinding(J){let Q=this._bindings,Z=J._cacheIndex,$=--this._nActiveBindings,W=Q[$];J._cacheIndex=$,Q[$]=J,W._cacheIndex=Z,Q[Z]=W}_lendControlInterpolant(){let J=this._controlInterpolants,Q=this._nActiveControlInterpolants++,Z=J[Q];if(Z===void 0)Z=new aQ(new Float32Array(2),new Float32Array(2),1,J1),Z.__cacheIndex=Q,J[Q]=Z;return Z}_takeBackControlInterpolant(J){let Q=this._controlInterpolants,Z=J.__cacheIndex,$=--this._nActiveControlInterpolants,W=Q[$];J.__cacheIndex=$,Q[$]=J,W.__cacheIndex=Z,Q[Z]=W}clipAction(J,Q,Z){let $=Q||this._root,W=$.uuid,Y=typeof J==="string"?q9.findByName($,J):J,X=Y!==null?Y.uuid:J,H=this._actionsByClip[X],K=null;if(Z===void 0)if(Y!==null)Z=Y.blendMode;else Z=2500;if(H!==void 0){let U=H.actionByRoot[W];if(U!==void 0&&U.blendMode===Z)return U;if(K=H.knownActions[0],Y===null)Y=K._clip}if(Y===null)return null;let G=new gW(this,Y,Q,Z);return this._bindAction(G,K),this._addInactiveAction(G,X,W),G}existingAction(J,Q){let Z=Q||this._root,$=Z.uuid,W=typeof J==="string"?q9.findByName(Z,J):J,Y=W?W.uuid:J,X=this._actionsByClip[Y];if(X!==void 0)return X.actionByRoot[$]||null;return null}stopAllAction(){let J=this._actions,Q=this._nActiveActions;for(let Z=Q-1;Z>=0;--Z)J[Z].stop();return this}update(J){J*=this.timeScale;let Q=this._actions,Z=this._nActiveActions,$=this.time+=J,W=Math.sign(J),Y=this._accuIndex^=1;for(let K=0;K!==Z;++K)Q[K]._update($,J,W,Y);let X=this._bindings,H=this._nActiveBindings;for(let K=0;K!==H;++K)X[K].apply(Y);return this}setTime(J){this.time=0;for(let Q=0;Q<this._actions.length;Q++)this._actions[Q].time=0;return this.update(J)}getRoot(){return this._root}uncacheClip(J){let Q=this._actions,Z=J.uuid,$=this._actionsByClip,W=$[Z];if(W!==void 0){let Y=W.knownActions;for(let X=0,H=Y.length;X!==H;++X){let K=Y[X];this._deactivateAction(K);let G=K._cacheIndex,U=Q[Q.length-1];K._cacheIndex=null,K._byClipCacheIndex=null,U._cacheIndex=G,Q[G]=U,Q.pop(),this._removeInactiveBindingsForAction(K)}delete $[Z]}}uncacheRoot(J){let Q=J.uuid,Z=this._actionsByClip;for(let Y in Z){let X=Z[Y].actionByRoot,H=X[Q];if(H!==void 0)this._deactivateAction(H),this._removeInactiveAction(H)}let $=this._bindingsByRootAndName,W=$[Q];if(W!==void 0)for(let Y in W){let X=W[Y];X.restoreOriginalState(),this._removeInactiveBinding(X)}}uncacheAction(J,Q){let Z=this.existingAction(J,Q);if(Z!==null)this._deactivateAction(Z),this._removeInactiveAction(Z)}}class VH extends q7{constructor(J=1,Q=1,Z=1,$={}){super(J,Q,$);this.isRenderTarget3D=!0,this.depth=Z,this.texture=new N7(null,J,Q,Z),this.texture.isRenderTargetTexture=!0}}class FH extends q7{constructor(J=1,Q=1,Z=1,$={}){super(J,Q,$);this.isRenderTargetArray=!0,this.depth=Z,this.texture=new F6(null,J,Q,Z),this.texture.isRenderTargetTexture=!0}}class pW{constructor(J){this.value=J}clone(){return new pW(this.value.clone===void 0?this.value:this.value.clone())}}var Q1=0;class DH extends I8{constructor(){super();this.isUniformsGroup=!0,Object.defineProperty(this,"id",{value:Q1++}),this.name="",this.usage=35044,this.uniforms=[]}add(J){return this.uniforms.push(J),this}remove(J){let Q=this.uniforms.indexOf(J);if(Q!==-1)this.uniforms.splice(Q,1);return this}setName(J){return this.name=J,this}setUsage(J){return this.usage=J,this}dispose(){return this.dispatchEvent({type:"dispose"}),this}copy(J){this.name=J.name,this.usage=J.usage;let Q=J.uniforms;this.uniforms.length=0;for(let Z=0,$=Q.length;Z<$;Z++){let W=Array.isArray(Q[Z])?Q[Z]:[Q[Z]];for(let Y=0;Y<W.length;Y++)this.uniforms.push(W[Y].clone())}return this}clone(){return new this.constructor().copy(this)}}class BH extends g8{constructor(J,Q,Z=1){super(J,Q);this.isInstancedInterleavedBuffer=!0,this.meshPerAttribute=Z}copy(J){return super.copy(J),this.meshPerAttribute=J.meshPerAttribute,this}clone(J){let Q=super.clone(J);return Q.meshPerAttribute=this.meshPerAttribute,Q}toJSON(J){let Q=super.toJSON(J);return Q.isInstancedInterleavedBuffer=!0,Q.meshPerAttribute=this.meshPerAttribute,Q}}class LH{constructor(J,Q,Z,$,W){this.isGLBufferAttribute=!0,this.name="",this.buffer=J,this.type=Q,this.itemSize=Z,this.elementSize=$,this.count=W,this.version=0}set needsUpdate(J){if(J===!0)this.version++}setBuffer(J){return this.buffer=J,this}setType(J,Q){return this.type=J,this.elementSize=Q,this}setItemSize(J){return this.itemSize=J,this}setCount(J){return this.count=J,this}}var yG=/*@__PURE__*/new SJ;class zH{constructor(J,Q,Z=0,$=1/0){this.ray=new b9(J,Q),this.near=Z,this.far=$,this.camera=null,this.layers=new O7,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(J,Q){this.ray.set(J,Q)}setFromCamera(J,Q){if(Q.isPerspectiveCamera)this.ray.origin.setFromMatrixPosition(Q.matrixWorld),this.ray.direction.set(J.x,J.y,0.5).unproject(Q).sub(this.ray.origin).normalize(),this.camera=Q;else if(Q.isOrthographicCamera)this.ray.origin.set(J.x,J.y,(Q.near+Q.far)/(Q.near-Q.far)).unproject(Q),this.ray.direction.set(0,0,-1).transformDirection(Q.matrixWorld),this.camera=Q;else console.error("THREE.Raycaster: Unsupported camera type: "+Q.type)}setFromXRController(J){return yG.identity().extractRotation(J.matrixWorld),this.ray.origin.setFromMatrixPosition(J.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(yG),this}intersectObject(J,Q=!0,Z=[]){return iY(J,this,Z,Q),Z.sort(xG),Z}intersectObjects(J,Q=!0,Z=[]){for(let $=0,W=J.length;$<W;$++)iY(J[$],this,Z,Q);return Z.sort(xG),Z}}function xG(J,Q){return J.distance-Q.distance}function iY(J,Q,Z,$){let W=!0;if(J.layers.test(Q.layers)){if(J.raycast(Q,Z)===!1)W=!1}if(W===!0&&$===!0){let Y=J.children;for(let X=0,H=Y.length;X<H;X++)iY(Y[X],Q,Z,!0)}}class CH{constructor(J=1,Q=0,Z=0){return this.radius=J,this.phi=Q,this.theta=Z,this}set(J,Q,Z){return this.radius=J,this.phi=Q,this.theta=Z,this}copy(J){return this.radius=J.radius,this.phi=J.phi,this.theta=J.theta,this}makeSafe(){return this.phi=cJ(this.phi,0.000001,Math.PI-0.000001),this}setFromVector3(J){return this.setFromCartesianCoords(J.x,J.y,J.z)}setFromCartesianCoords(J,Q,Z){if(this.radius=Math.sqrt(J*J+Q*Q+Z*Z),this.radius===0)this.theta=0,this.phi=0;else this.theta=Math.atan2(J,Z),this.phi=Math.acos(cJ(Q/this.radius,-1,1));return this}clone(){return new this.constructor().copy(this)}}class _H{constructor(J=1,Q=0,Z=0){return this.radius=J,this.theta=Q,this.y=Z,this}set(J,Q,Z){return this.radius=J,this.theta=Q,this.y=Z,this}copy(J){return this.radius=J.radius,this.theta=J.theta,this.y=J.y,this}setFromVector3(J){return this.setFromCartesianCoords(J.x,J.y,J.z)}setFromCartesianCoords(J,Q,Z){return this.radius=Math.sqrt(J*J+Z*Z),this.theta=Math.atan2(J,Z),this.y=Q,this}clone(){return new this.constructor().copy(this)}}class mW{constructor(J,Q,Z,$){if(mW.prototype.isMatrix2=!0,this.elements=[1,0,0,1],J!==void 0)this.set(J,Q,Z,$)}identity(){return this.set(1,0,0,1),this}fromArray(J,Q=0){for(let Z=0;Z<4;Z++)this.elements[Z]=J[Z+Q];return this}set(J,Q,Z,$){let W=this.elements;return W[0]=J,W[2]=Q,W[1]=Z,W[3]=$,this}}var bG=/*@__PURE__*/new i;class MH{constructor(J=new i(1/0,1/0),Q=new i(-1/0,-1/0)){this.isBox2=!0,this.min=J,this.max=Q}set(J,Q){return this.min.copy(J),this.max.copy(Q),this}setFromPoints(J){this.makeEmpty();for(let Q=0,Z=J.length;Q<Z;Q++)this.expandByPoint(J[Q]);return this}setFromCenterAndSize(J,Q){let Z=bG.copy(Q).multiplyScalar(0.5);return this.min.copy(J).sub(Z),this.max.copy(J).add(Z),this}clone(){return new this.constructor().copy(this)}copy(J){return this.min.copy(J.min),this.max.copy(J.max),this}makeEmpty(){return this.min.x=this.min.y=1/0,this.max.x=this.max.y=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y}getCenter(J){return this.isEmpty()?J.set(0,0):J.addVectors(this.min,this.max).multiplyScalar(0.5)}getSize(J){return this.isEmpty()?J.set(0,0):J.subVectors(this.max,this.min)}expandByPoint(J){return this.min.min(J),this.max.max(J),this}expandByVector(J){return this.min.sub(J),this.max.add(J),this}expandByScalar(J){return this.min.addScalar(-J),this.max.addScalar(J),this}containsPoint(J){return J.x>=this.min.x&&J.x<=this.max.x&&J.y>=this.min.y&&J.y<=this.max.y}containsBox(J){return this.min.x<=J.min.x&&J.max.x<=this.max.x&&this.min.y<=J.min.y&&J.max.y<=this.max.y}getParameter(J,Q){return Q.set((J.x-this.min.x)/(this.max.x-this.min.x),(J.y-this.min.y)/(this.max.y-this.min.y))}intersectsBox(J){return J.max.x>=this.min.x&&J.min.x<=this.max.x&&J.max.y>=this.min.y&&J.min.y<=this.max.y}clampPoint(J,Q){return Q.copy(J).clamp(this.min,this.max)}distanceToPoint(J){return this.clampPoint(J,bG).distanceTo(J)}intersect(J){if(this.min.max(J.min),this.max.min(J.max),this.isEmpty())this.makeEmpty();return this}union(J){return this.min.min(J.min),this.max.max(J.max),this}translate(J){return this.min.add(J),this.max.add(J),this}equals(J){return J.min.equals(this.min)&&J.max.equals(this.max)}}var hG=/*@__PURE__*/new I,$$=/*@__PURE__*/new I;class IH{constructor(J=new I,Q=new I){this.start=J,this.end=Q}set(J,Q){return this.start.copy(J),this.end.copy(Q),this}copy(J){return this.start.copy(J.start),this.end.copy(J.end),this}getCenter(J){return J.addVectors(this.start,this.end).multiplyScalar(0.5)}delta(J){return J.subVectors(this.end,this.start)}distanceSq(){return this.start.distanceToSquared(this.end)}distance(){return this.start.distanceTo(this.end)}at(J,Q){return this.delta(Q).multiplyScalar(J).add(this.start)}closestPointToPointParameter(J,Q){hG.subVectors(J,this.start),$$.subVectors(this.end,this.start);let Z=$$.dot($$),W=$$.dot(hG)/Z;if(Q)W=cJ(W,0,1);return W}closestPointToPoint(J,Q,Z){let $=this.closestPointToPointParameter(J,Q);return this.delta(Z).multiplyScalar($).add(this.start)}applyMatrix4(J){return this.start.applyMatrix4(J),this.end.applyMatrix4(J),this}equals(J){return J.start.equals(this.start)&&J.end.equals(this.end)}clone(){return new this.constructor().copy(this)}}var fG=/*@__PURE__*/new I;class wH extends $0{constructor(J,Q){super();this.light=J,this.matrixAutoUpdate=!1,this.color=Q,this.type="SpotLightHelper";let Z=new gJ,$=[0,0,0,0,0,1,0,0,0,1,0,1,0,0,0,-1,0,1,0,0,0,0,1,1,0,0,0,0,-1,1];for(let Y=0,X=1,H=32;Y<H;Y++,X++){let K=Y/H*Math.PI*2,G=X/H*Math.PI*2;$.push(Math.cos(K),Math.sin(K),1,Math.cos(G),Math.sin(G),1)}Z.setAttribute("position",new zJ($,3));let W=new S0({fog:!1,toneMapped:!1});this.cone=new K8(Z,W),this.add(this.cone),this.update()}dispose(){this.cone.geometry.dispose(),this.cone.material.dispose()}update(){if(this.light.updateWorldMatrix(!0,!1),this.light.target.updateWorldMatrix(!0,!1),this.parent)this.parent.updateWorldMatrix(!0),this.matrix.copy(this.parent.matrixWorld).invert().multiply(this.light.matrixWorld);else this.matrix.copy(this.light.matrixWorld);this.matrixWorld.copy(this.light.matrixWorld);let J=this.light.distance?this.light.distance:1000,Q=J*Math.tan(this.light.angle);if(this.cone.scale.set(Q,Q,J),fG.setFromMatrixPosition(this.light.target.matrixWorld),this.cone.lookAt(fG),this.color!==void 0)this.cone.material.color.set(this.color);else this.cone.material.color.copy(this.light.color)}}var S9=/*@__PURE__*/new I,W$=/*@__PURE__*/new SJ,lY=/*@__PURE__*/new SJ;class AH extends K8{constructor(J){let Q=XE(J),Z=new gJ,$=[],W=[],Y=new u(0,0,1),X=new u(0,1,0);for(let K=0;K<Q.length;K++){let G=Q[K];if(G.parent&&G.parent.isBone)$.push(0,0,0),$.push(0,0,0),W.push(Y.r,Y.g,Y.b),W.push(X.r,X.g,X.b)}Z.setAttribute("position",new zJ($,3)),Z.setAttribute("color",new zJ(W,3));let H=new S0({vertexColors:!0,depthTest:!1,depthWrite:!1,toneMapped:!1,transparent:!0});super(Z,H);this.isSkeletonHelper=!0,this.type="SkeletonHelper",this.root=J,this.bones=Q,this.matrix=J.matrixWorld,this.matrixAutoUpdate=!1}updateMatrixWorld(J){let Q=this.bones,Z=this.geometry,$=Z.getAttribute("position");lY.copy(this.root.matrixWorld).invert();for(let W=0,Y=0;W<Q.length;W++){let X=Q[W];if(X.parent&&X.parent.isBone)W$.multiplyMatrices(lY,X.matrixWorld),S9.setFromMatrixPosition(W$),$.setXYZ(Y,S9.x,S9.y,S9.z),W$.multiplyMatrices(lY,X.parent.matrixWorld),S9.setFromMatrixPosition(W$),$.setXYZ(Y+1,S9.x,S9.y,S9.z),Y+=2}Z.getAttribute("position").needsUpdate=!0,super.updateMatrixWorld(J)}dispose(){this.geometry.dispose(),this.material.dispose()}}function XE(J){let Q=[];if(J.isBone===!0)Q.push(J);for(let Z=0;Z<J.children.length;Z++)Q.push.apply(Q,XE(J.children[Z]));return Q}class PH extends N0{constructor(J,Q,Z){let $=new I7(Q,4,2),W=new b0({wireframe:!0,fog:!1,toneMapped:!1});super($,W);this.light=J,this.color=Z,this.type="PointLightHelper",this.matrix=this.light.matrixWorld,this.matrixAutoUpdate=!1,this.update()}dispose(){this.geometry.dispose(),this.material.dispose()}update(){if(this.light.updateWorldMatrix(!0,!1),this.color!==void 0)this.material.color.set(this.color);else this.material.color.copy(this.light.color)}}var Z1=/*@__PURE__*/new I,gG=/*@__PURE__*/new u,pG=/*@__PURE__*/new u;class TH extends $0{constructor(J,Q,Z){super();this.light=J,this.matrix=J.matrixWorld,this.matrixAutoUpdate=!1,this.color=Z,this.type="HemisphereLightHelper";let $=new M7(Q);if($.rotateY(Math.PI*0.5),this.material=new b0({wireframe:!0,fog:!1,toneMapped:!1}),this.color===void 0)this.material.vertexColors=!0;let W=$.getAttribute("position"),Y=new Float32Array(W.count*3);$.setAttribute("color",new X0(Y,3)),this.add(new N0($,this.material)),this.update()}dispose(){this.children[0].geometry.dispose(),this.children[0].material.dispose()}update(){let J=this.children[0];if(this.color!==void 0)this.material.color.set(this.color);else{let Q=J.geometry.getAttribute("color");gG.copy(this.light.color),pG.copy(this.light.groundColor);for(let Z=0,$=Q.count;Z<$;Z++){let W=Z<$/2?gG:pG;Q.setXYZ(Z,W.r,W.g,W.b)}Q.needsUpdate=!0}this.light.updateWorldMatrix(!0,!1),J.lookAt(Z1.setFromMatrixPosition(this.light.matrixWorld).negate())}}class SH extends K8{constructor(J=10,Q=10,Z=4473924,$=8947848){Z=new u(Z),$=new u($);let W=Q/2,Y=J/Q,X=J/2,H=[],K=[];for(let E=0,q=0,N=-X;E<=Q;E++,N+=Y){H.push(-X,0,N,X,0,N),H.push(N,0,-X,N,0,X);let k=E===W?Z:$;k.toArray(K,q),q+=3,k.toArray(K,q),q+=3,k.toArray(K,q),q+=3,k.toArray(K,q),q+=3}let G=new gJ;G.setAttribute("position",new zJ(H,3)),G.setAttribute("color",new zJ(K,3));let U=new S0({vertexColors:!0,toneMapped:!1});super(G,U);this.type="GridHelper"}dispose(){this.geometry.dispose(),this.material.dispose()}}class jH extends K8{constructor(J=10,Q=16,Z=8,$=64,W=4473924,Y=8947848){W=new u(W),Y=new u(Y);let X=[],H=[];if(Q>1)for(let U=0;U<Q;U++){let E=U/Q*(Math.PI*2),q=Math.sin(E)*J,N=Math.cos(E)*J;X.push(0,0,0),X.push(q,0,N);let k=U&1?W:Y;H.push(k.r,k.g,k.b),H.push(k.r,k.g,k.b)}for(let U=0;U<Z;U++){let E=U&1?W:Y,q=J-J/Z*U;for(let N=0;N<$;N++){let k=N/$*(Math.PI*2),V=Math.sin(k)*q,R=Math.cos(k)*q;X.push(V,0,R),H.push(E.r,E.g,E.b),k=(N+1)/$*(Math.PI*2),V=Math.sin(k)*q,R=Math.cos(k)*q,X.push(V,0,R),H.push(E.r,E.g,E.b)}}let K=new gJ;K.setAttribute("position",new zJ(X,3)),K.setAttribute("color",new zJ(H,3));let G=new S0({vertexColors:!0,toneMapped:!1});super(K,G);this.type="PolarGridHelper"}dispose(){this.geometry.dispose(),this.material.dispose()}}var mG=/*@__PURE__*/new I,Y$=/*@__PURE__*/new I,lG=/*@__PURE__*/new I;class vH extends $0{constructor(J,Q,Z){super();if(this.light=J,this.matrix=J.matrixWorld,this.matrixAutoUpdate=!1,this.color=Z,this.type="DirectionalLightHelper",Q===void 0)Q=1;let $=new gJ;$.setAttribute("position",new zJ([-Q,Q,0,Q,Q,0,Q,-Q,0,-Q,-Q,0,-Q,Q,0],3));let W=new S0({fog:!1,toneMapped:!1});this.lightPlane=new _8($,W),this.add(this.lightPlane),$=new gJ,$.setAttribute("position",new zJ([0,0,0,0,0,1],3)),this.targetLine=new _8($,W),this.add(this.targetLine),this.update()}dispose(){this.lightPlane.geometry.dispose(),this.lightPlane.material.dispose(),this.targetLine.geometry.dispose(),this.targetLine.material.dispose()}update(){if(this.light.updateWorldMatrix(!0,!1),this.light.target.updateWorldMatrix(!0,!1),mG.setFromMatrixPosition(this.light.matrixWorld),Y$.setFromMatrixPosition(this.light.target.matrixWorld),lG.subVectors(Y$,mG),this.lightPlane.lookAt(Y$),this.color!==void 0)this.lightPlane.material.color.set(this.color),this.targetLine.material.color.set(this.color);else this.lightPlane.material.color.copy(this.light.color),this.targetLine.material.color.copy(this.light.color);this.targetLine.lookAt(Y$),this.targetLine.scale.z=lG.length()}}var X$=/*@__PURE__*/new I,L0=/*@__PURE__*/new k7;class yH extends K8{constructor(J){let Q=new gJ,Z=new S0({color:16777215,vertexColors:!0,toneMapped:!1}),$=[],W=[],Y={};X("n1","n2"),X("n2","n4"),X("n4","n3"),X("n3","n1"),X("f1","f2"),X("f2","f4"),X("f4","f3"),X("f3","f1"),X("n1","f1"),X("n2","f2"),X("n3","f3"),X("n4","f4"),X("p","n1"),X("p","n2"),X("p","n3"),X("p","n4"),X("u1","u2"),X("u2","u3"),X("u3","u1"),X("c","t"),X("p","c"),X("cn1","cn2"),X("cn3","cn4"),X("cf1","cf2"),X("cf3","cf4");function X(N,k){H(N),H(k)}function H(N){if($.push(0,0,0),W.push(0,0,0),Y[N]===void 0)Y[N]=[];Y[N].push($.length/3-1)}Q.setAttribute("position",new zJ($,3)),Q.setAttribute("color",new zJ(W,3));super(Q,Z);if(this.type="CameraHelper",this.camera=J,this.camera.updateProjectionMatrix)this.camera.updateProjectionMatrix();this.matrix=J.matrixWorld,this.matrixAutoUpdate=!1,this.pointMap=Y,this.update();let K=new u(16755200),G=new u(16711680),U=new u(43775),E=new u(16777215),q=new u(3355443);this.setColors(K,G,U,E,q)}setColors(J,Q,Z,$,W){let X=this.geometry.getAttribute("color");X.setXYZ(0,J.r,J.g,J.b),X.setXYZ(1,J.r,J.g,J.b),X.setXYZ(2,J.r,J.g,J.b),X.setXYZ(3,J.r,J.g,J.b),X.setXYZ(4,J.r,J.g,J.b),X.setXYZ(5,J.r,J.g,J.b),X.setXYZ(6,J.r,J.g,J.b),X.setXYZ(7,J.r,J.g,J.b),X.setXYZ(8,J.r,J.g,J.b),X.setXYZ(9,J.r,J.g,J.b),X.setXYZ(10,J.r,J.g,J.b),X.setXYZ(11,J.r,J.g,J.b),X.setXYZ(12,J.r,J.g,J.b),X.setXYZ(13,J.r,J.g,J.b),X.setXYZ(14,J.r,J.g,J.b),X.setXYZ(15,J.r,J.g,J.b),X.setXYZ(16,J.r,J.g,J.b),X.setXYZ(17,J.r,J.g,J.b),X.setXYZ(18,J.r,J.g,J.b),X.setXYZ(19,J.r,J.g,J.b),X.setXYZ(20,J.r,J.g,J.b),X.setXYZ(21,J.r,J.g,J.b),X.setXYZ(22,J.r,J.g,J.b),X.setXYZ(23,J.r,J.g,J.b),X.setXYZ(24,Q.r,Q.g,Q.b),X.setXYZ(25,Q.r,Q.g,Q.b),X.setXYZ(26,Q.r,Q.g,Q.b),X.setXYZ(27,Q.r,Q.g,Q.b),X.setXYZ(28,Q.r,Q.g,Q.b),X.setXYZ(29,Q.r,Q.g,Q.b),X.setXYZ(30,Q.r,Q.g,Q.b),X.setXYZ(31,Q.r,Q.g,Q.b),X.setXYZ(32,Z.r,Z.g,Z.b),X.setXYZ(33,Z.r,Z.g,Z.b),X.setXYZ(34,Z.r,Z.g,Z.b),X.setXYZ(35,Z.r,Z.g,Z.b),X.setXYZ(36,Z.r,Z.g,Z.b),X.setXYZ(37,Z.r,Z.g,Z.b),X.setXYZ(38,$.r,$.g,$.b),X.setXYZ(39,$.r,$.g,$.b),X.setXYZ(40,W.r,W.g,W.b),X.setXYZ(41,W.r,W.g,W.b),X.setXYZ(42,W.r,W.g,W.b),X.setXYZ(43,W.r,W.g,W.b),X.setXYZ(44,W.r,W.g,W.b),X.setXYZ(45,W.r,W.g,W.b),X.setXYZ(46,W.r,W.g,W.b),X.setXYZ(47,W.r,W.g,W.b),X.setXYZ(48,W.r,W.g,W.b),X.setXYZ(49,W.r,W.g,W.b),X.needsUpdate=!0}update(){let J=this.geometry,Q=this.pointMap,Z=1,$=1;L0.projectionMatrixInverse.copy(this.camera.projectionMatrixInverse);let W=this.camera.coordinateSystem===2000?-1:0;M0("c",Q,J,L0,0,0,W),M0("t",Q,J,L0,0,0,1),M0("n1",Q,J,L0,-1,-1,W),M0("n2",Q,J,L0,1,-1,W),M0("n3",Q,J,L0,-1,1,W),M0("n4",Q,J,L0,1,1,W),M0("f1",Q,J,L0,-1,-1,1),M0("f2",Q,J,L0,1,-1,1),M0("f3",Q,J,L0,-1,1,1),M0("f4",Q,J,L0,1,1,1),M0("u1",Q,J,L0,0.7,1.1,W),M0("u2",Q,J,L0,-0.7,1.1,W),M0("u3",Q,J,L0,0,2,W),M0("cf1",Q,J,L0,-1,0,1),M0("cf2",Q,J,L0,1,0,1),M0("cf3",Q,J,L0,0,-1,1),M0("cf4",Q,J,L0,0,1,1),M0("cn1",Q,J,L0,-1,0,W),M0("cn2",Q,J,L0,1,0,W),M0("cn3",Q,J,L0,0,-1,W),M0("cn4",Q,J,L0,0,1,W),J.getAttribute("position").needsUpdate=!0}dispose(){this.geometry.dispose(),this.material.dispose()}}function M0(J,Q,Z,$,W,Y,X){X$.set(W,Y,X).unproject($);let H=Q[J];if(H!==void 0){let K=Z.getAttribute("position");for(let G=0,U=H.length;G<U;G++)K.setXYZ(H[G],X$.x,X$.y,X$.z)}}var H$=/*@__PURE__*/new z0;class xH extends K8{constructor(J,Q=16776960){let Z=new Uint16Array([0,1,1,2,2,3,3,0,4,5,5,6,6,7,7,4,0,4,1,5,2,6,3,7]),$=new Float32Array(24),W=new gJ;W.setIndex(new X0(Z,1)),W.setAttribute("position",new X0($,3));super(W,new S0({color:Q,toneMapped:!1}));this.object=J,this.type="BoxHelper",this.matrixAutoUpdate=!1,this.update()}update(J){if(J!==void 0)console.warn("THREE.BoxHelper: .update() has no longer arguments.");if(this.object!==void 0)H$.setFromObject(this.object);if(H$.isEmpty())return;let{min:Q,max:Z}=H$,$=this.geometry.attributes.position,W=$.array;W[0]=Z.x,W[1]=Z.y,W[2]=Z.z,W[3]=Q.x,W[4]=Z.y,W[5]=Z.z,W[6]=Q.x,W[7]=Q.y,W[8]=Z.z,W[9]=Z.x,W[10]=Q.y,W[11]=Z.z,W[12]=Z.x,W[13]=Z.y,W[14]=Q.z,W[15]=Q.x,W[16]=Z.y,W[17]=Q.z,W[18]=Q.x,W[19]=Q.y,W[20]=Q.z,W[21]=Z.x,W[22]=Q.y,W[23]=Q.z,$.needsUpdate=!0,this.geometry.computeBoundingSphere()}setFromObject(J){return this.object=J,this.update(),this}copy(J,Q){return super.copy(J,Q),this.object=J.object,this}dispose(){this.geometry.dispose(),this.material.dispose()}}class bH extends K8{constructor(J,Q=16776960){let Z=new Uint16Array([0,1,1,2,2,3,3,0,4,5,5,6,6,7,7,4,0,4,1,5,2,6,3,7]),$=[1,1,1,-1,1,1,-1,-1,1,1,-1,1,1,1,-1,-1,1,-1,-1,-1,-1,1,-1,-1],W=new gJ;W.setIndex(new X0(Z,1)),W.setAttribute("position",new zJ($,3));super(W,new S0({color:Q,toneMapped:!1}));this.box=J,this.type="Box3Helper",this.geometry.computeBoundingSphere()}updateMatrixWorld(J){let Q=this.box;if(Q.isEmpty())return;Q.getCenter(this.position),Q.getSize(this.scale),this.scale.multiplyScalar(0.5),super.updateMatrixWorld(J)}dispose(){this.geometry.dispose(),this.material.dispose()}}class hH extends _8{constructor(J,Q=1,Z=16776960){let $=Z,W=[1,-1,0,-1,1,0,-1,-1,0,1,1,0,-1,1,0,-1,-1,0,1,-1,0,1,1,0],Y=new gJ;Y.setAttribute("position",new zJ(W,3)),Y.computeBoundingSphere();super(Y,new S0({color:$,toneMapped:!1}));this.type="PlaneHelper",this.plane=J,this.size=Q;let X=[1,1,0,-1,1,0,-1,-1,0,1,1,0,-1,-1,0,1,-1,0],H=new gJ;H.setAttribute("position",new zJ(X,3)),H.computeBoundingSphere(),this.add(new N0(H,new b0({color:$,opacity:0.2,transparent:!0,depthWrite:!1,toneMapped:!1})))}updateMatrixWorld(J){this.position.set(0,0,0),this.scale.set(0.5*this.size,0.5*this.size,1),this.lookAt(this.plane.normal),this.translateZ(-this.plane.constant),super.updateMatrixWorld(J)}dispose(){this.geometry.dispose(),this.material.dispose(),this.children[0].geometry.dispose(),this.children[0].material.dispose()}}var uG=/*@__PURE__*/new I,K$,uY;class fH extends $0{constructor(J=new I(0,0,1),Q=new I(0,0,0),Z=1,$=16776960,W=Z*0.2,Y=W*0.2){super();if(this.type="ArrowHelper",K$===void 0)K$=new gJ,K$.setAttribute("position",new zJ([0,0,0,0,1,0],3)),uY=new I6(0,0.5,1,5,1),uY.translate(0,-0.5,0);this.position.copy(Q),this.line=new _8(K$,new S0({color:$,toneMapped:!1})),this.line.matrixAutoUpdate=!1,this.add(this.line),this.cone=new N0(uY,new b0({color:$,toneMapped:!1})),this.cone.matrixAutoUpdate=!1,this.add(this.cone),this.setDirection(J),this.setLength(Z,W,Y)}setDirection(J){if(J.y>0.99999)this.quaternion.set(0,0,0,1);else if(J.y<-0.99999)this.quaternion.set(1,0,0,0);else{uG.set(J.z,0,-J.x).normalize();let Q=Math.acos(J.y);this.quaternion.setFromAxisAngle(uG,Q)}}setLength(J,Q=J*0.2,Z=Q*0.2){this.line.scale.set(1,Math.max(0.0001,J-Q),1),this.line.updateMatrix(),this.cone.scale.set(Z,Q,Z),this.cone.position.y=J,this.cone.updateMatrix()}setColor(J){this.line.material.color.set(J),this.cone.material.color.set(J)}copy(J){return super.copy(J,!1),this.line.copy(J.line),this.cone.copy(J.cone),this}dispose(){this.line.geometry.dispose(),this.line.material.dispose(),this.cone.geometry.dispose(),this.cone.material.dispose()}}class gH extends K8{constructor(J=1){let Q=[0,0,0,J,0,0,0,0,0,0,J,0,0,0,0,0,0,J],Z=[1,0,0,1,0.6,0,0,1,0,0.6,1,0,0,0,1,0,0.6,1],$=new gJ;$.setAttribute("position",new zJ(Q,3)),$.setAttribute("color",new zJ(Z,3));let W=new S0({vertexColors:!0,toneMapped:!1});super($,W);this.type="AxesHelper"}setColors(J,Q,Z){let $=new u,W=this.geometry.attributes.color.array;return $.set(J),$.toArray(W,0),$.toArray(W,3),$.set(Q),$.toArray(W,6),$.toArray(W,9),$.set(Z),$.toArray(W,12),$.toArray(W,15),this.geometry.attributes.color.needsUpdate=!0,this}dispose(){this.geometry.dispose(),this.material.dispose()}}class pH{constructor(){this.type="ShapePath",this.color=new u,this.subPaths=[],this.currentPath=null}moveTo(J,Q){return this.currentPath=new $6,this.subPaths.push(this.currentPath),this.currentPath.moveTo(J,Q),this}lineTo(J,Q){return this.currentPath.lineTo(J,Q),this}quadraticCurveTo(J,Q,Z,$){return this.currentPath.quadraticCurveTo(J,Q,Z,$),this}bezierCurveTo(J,Q,Z,$,W,Y){return this.currentPath.bezierCurveTo(J,Q,Z,$,W,Y),this}splineThru(J){return this.currentPath.splineThru(J),this}toShapes(J){function Q(R){let O=[];for(let D=0,F=R.length;D<F;D++){let C=R[D],P=new E9;P.curves=C.curves,O.push(P)}return O}function Z(R,O){let D=O.length,F=!1;for(let C=D-1,P=0;P<D;C=P++){let M=O[C],w=O[P],v=w.x-M.x,L=w.y-M.y;if(Math.abs(L)>Number.EPSILON){if(L<0)M=O[P],v=-v,w=O[C],L=-L;if(R.y<M.y||R.y>w.y)continue;if(R.y===M.y){if(R.x===M.x)return!0}else{let _=L*(R.x-M.x)-v*(R.y-M.y);if(_===0)return!0;if(_<0)continue;F=!F}}else{if(R.y!==M.y)continue;if(w.x<=R.x&&R.x<=M.x||M.x<=R.x&&R.x<=w.x)return!0}}return F}let $=y8.isClockWise,W=this.subPaths;if(W.length===0)return[];let Y,X,H,K=[];if(W.length===1)return X=W[0],H=new E9,H.curves=X.curves,K.push(H),K;let G=!$(W[0].getPoints());G=J?!G:G;let U=[],E=[],q=[],N=0,k;E[N]=void 0,q[N]=[];for(let R=0,O=W.length;R<O;R++)if(X=W[R],k=X.getPoints(),Y=$(k),Y=J?!Y:Y,Y){if(!G&&E[N])N++;if(E[N]={s:new E9,p:k},E[N].s.curves=X.curves,G)N++;q[N]=[]}else q[N].push({h:X,p:k[0]});if(!E[0])return Q(W);if(E.length>1){let R=!1,O=0;for(let D=0,F=E.length;D<F;D++)U[D]=[];for(let D=0,F=E.length;D<F;D++){let C=q[D];for(let P=0;P<C.length;P++){let M=C[P],w=!0;for(let v=0;v<E.length;v++)if(Z(M.p,E[v].p)){if(D!==v)O++;if(w)w=!1,U[v].push(M);else R=!0}if(w)U[D].push(M)}}if(O>0&&R===!1)q=U}let V;for(let R=0,O=E.length;R<O;R++){H=E[R].s,K.push(H),V=q[R];for(let D=0,F=V.length;D<F;D++)H.holes.push(V[D].h)}return K}}class mH extends I8{constructor(J,Q=null){super();this.object=J,this.domElement=Q,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(){}disconnect(){}dispose(){}update(){}}function $1(J,Q){let Z=J.image&&J.image.width?J.image.width/J.image.height:1;if(Z>Q)J.repeat.x=1,J.repeat.y=Z/Q,J.offset.x=0,J.offset.y=(1-J.repeat.y)/2;else J.repeat.x=Q/Z,J.repeat.y=1,J.offset.x=(1-J.repeat.x)/2,J.offset.y=0;return J}function W1(J,Q){let Z=J.image&&J.image.width?J.image.width/J.image.height:1;if(Z>Q)J.repeat.x=Q/Z,J.repeat.y=1,J.offset.x=(1-J.repeat.x)/2,J.offset.y=0;else J.repeat.x=1,J.repeat.y=Z/Q,J.offset.x=0,J.offset.y=(1-J.repeat.y)/2;return J}function Y1(J){return J.repeat.x=1,J.repeat.y=1,J.offset.x=0,J.offset.y=0,J}function lW(J,Q,Z,$){let W=X1($);switch(Z){case 1021:return J*Q;case 1024:return J*Q;case 1025:return J*Q*2;case 1028:return J*Q/W.components*W.byteLength;case 1029:return J*Q/W.components*W.byteLength;case 1030:return J*Q*2/W.components*W.byteLength;case 1031:return J*Q*2/W.components*W.byteLength;case 1022:return J*Q*3/W.components*W.byteLength;case 1023:return J*Q*4/W.components*W.byteLength;case 1033:return J*Q*4/W.components*W.byteLength;case 33776:case 33777:return Math.floor((J+3)/4)*Math.floor((Q+3)/4)*8;case 33778:case 33779:return Math.floor((J+3)/4)*Math.floor((Q+3)/4)*16;case 35841:case 35843:return Math.max(J,16)*Math.max(Q,8)/4;case 35840:case 35842:return Math.max(J,8)*Math.max(Q,8)/2;case 36196:case 37492:return Math.floor((J+3)/4)*Math.floor((Q+3)/4)*8;case 37496:return Math.floor((J+3)/4)*Math.floor((Q+3)/4)*16;case 37808:return Math.floor((J+3)/4)*Math.floor((Q+3)/4)*16;case 37809:return Math.floor((J+4)/5)*Math.floor((Q+3)/4)*16;case 37810:return Math.floor((J+4)/5)*Math.floor((Q+4)/5)*16;case 37811:return Math.floor((J+5)/6)*Math.floor((Q+4)/5)*16;case 37812:return Math.floor((J+5)/6)*Math.floor((Q+5)/6)*16;case 37813:return Math.floor((J+7)/8)*Math.floor((Q+4)/5)*16;case 37814:return Math.floor((J+7)/8)*Math.floor((Q+5)/6)*16;case 37815:return Math.floor((J+7)/8)*Math.floor((Q+7)/8)*16;case 37816:return Math.floor((J+9)/10)*Math.floor((Q+4)/5)*16;case 37817:return Math.floor((J+9)/10)*Math.floor((Q+5)/6)*16;case 37818:return Math.floor((J+9)/10)*Math.floor((Q+7)/8)*16;case 37819:return Math.floor((J+9)/10)*Math.floor((Q+9)/10)*16;case 37820:return Math.floor((J+11)/12)*Math.floor((Q+9)/10)*16;case 37821:return Math.floor((J+11)/12)*Math.floor((Q+11)/12)*16;case 36492:case 36494:case 36495:return Math.ceil(J/4)*Math.ceil(Q/4)*16;case 36283:case 36284:return Math.ceil(J/4)*Math.ceil(Q/4)*8;case 36285:case 36286:return Math.ceil(J/4)*Math.ceil(Q/4)*16}throw Error(`Unable to determine texture byte length for ${Z} format.`)}function X1(J){switch(J){case 1009:case 1010:return{byteLength:1,components:1};case 1012:case 1011:case 1016:return{byteLength:2,components:1};case 1017:case 1018:return{byteLength:2,components:4};case 1014:case 1013:case 1015:return{byteLength:4,components:1};case 35902:return{byteLength:4,components:3}}throw Error(`Unknown texture type ${J}.`)}var HE={contain:$1,cover:W1,fill:Y1,getByteLength:lW};if(typeof __THREE_DEVTOOLS__<"u")__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"173"}}));if(typeof window<"u")if(window.__THREE__)console.warn("WARNING: Multiple instances of Three.js being imported.");else window.__THREE__="173";function SE(){let J=null,Q=!1,Z=null,$=null;function W(Y,X){Z(Y,X),$=J.requestAnimationFrame(W)}return{start:function(){if(Q===!0)return;if(Z===null)return;$=J.requestAnimationFrame(W),Q=!0},stop:function(){J.cancelAnimationFrame($),Q=!1},setAnimationLoop:function(Y){Z=Y},setContext:function(Y){J=Y}}}function H1(J){let Q=/*@__PURE__*/new WeakMap;function Z(H,K){let{array:G,usage:U}=H,E=G.byteLength,q=J.createBuffer();J.bindBuffer(K,q),J.bufferData(K,G,U),H.onUploadCallback();let N;if(G instanceof Float32Array)N=J.FLOAT;else if(G instanceof Uint16Array)if(H.isFloat16BufferAttribute)N=J.HALF_FLOAT;else N=J.UNSIGNED_SHORT;else if(G instanceof Int16Array)N=J.SHORT;else if(G instanceof Uint32Array)N=J.UNSIGNED_INT;else if(G instanceof Int32Array)N=J.INT;else if(G instanceof Int8Array)N=J.BYTE;else if(G instanceof Uint8Array)N=J.UNSIGNED_BYTE;else if(G instanceof Uint8ClampedArray)N=J.UNSIGNED_BYTE;else throw Error("THREE.WebGLAttributes: Unsupported buffer data format: "+G);return{buffer:q,type:N,bytesPerElement:G.BYTES_PER_ELEMENT,version:H.version,size:E}}function $(H,K,G){let{array:U,updateRanges:E}=K;if(J.bindBuffer(G,H),E.length===0)J.bufferSubData(G,0,U);else{E.sort((N,k)=>N.start-k.start);let q=0;for(let N=1;N<E.length;N++){let k=E[q],V=E[N];if(V.start<=k.start+k.count+1)k.count=Math.max(k.count,V.start+V.count-k.start);else++q,E[q]=V}E.length=q+1;for(let N=0,k=E.length;N<k;N++){let V=E[N];J.bufferSubData(G,V.start*U.BYTES_PER_ELEMENT,U,V.start,V.count)}K.clearUpdateRanges()}K.onUploadCallback()}function W(H){if(H.isInterleavedBufferAttribute)H=H.data;return Q.get(H)}function Y(H){if(H.isInterleavedBufferAttribute)H=H.data;let K=Q.get(H);if(K)J.deleteBuffer(K.buffer),Q.delete(H)}function X(H,K){if(H.isInterleavedBufferAttribute)H=H.data;if(H.isGLBufferAttribute){let U=Q.get(H);if(!U||U.version<H.version)Q.set(H,{buffer:H.buffer,type:H.type,bytesPerElement:H.elementSize,version:H.version});return}let G=Q.get(H);if(G===void 0)Q.set(H,Z(H,K));else if(G.version<H.version){if(G.size!==H.array.byteLength)throw Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");$(G.buffer,H,K),G.version=H.version}}return{get:W,remove:Y,update:X}}var K1=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,G1=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,U1=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,E1=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,q1=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,N1=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,O1=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,R1=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,k1=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,V1=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,F1=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,D1=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,B1=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,L1=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,z1=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,C1=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,_1=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,M1=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,I1=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,w1=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,A1=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,P1=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,T1=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,S1=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,j1=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,v1=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,y1=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,x1=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,b1=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,h1=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,f1="gl_FragColor = linearToOutputTexel( gl_FragColor );",g1=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,p1=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,m1=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,l1=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,u1=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,d1=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,c1=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,n1=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,s1=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,i1=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,o1=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,a1=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,r1=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,t1=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,e1=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,JO=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,QO=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,ZO=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,$O=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,WO=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,YO=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,XO=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,HO=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,KO=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,GO=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,UO=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,EO=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,qO=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,NO=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,OO=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,RO=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,kO=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,VO=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,FO=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,DO=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,BO=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,LO=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,zO=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,CO=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,_O=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,MO=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,IO=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,wO=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,AO=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,PO=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,TO=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,SO=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,jO=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,vO=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,yO=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,xO=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,bO=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,hO=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,fO=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,gO=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,pO=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,mO=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,lO=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,uO=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,dO=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,cO=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,nO=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,sO=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,iO=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,oO=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,aO=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,rO=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,tO=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,eO=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,JR=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,QR=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,ZR=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,$R=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,WR=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,YR=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,XR=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,HR=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,KR=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,GR=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,UR=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,ER=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,qR=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,NR=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,OR=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,RR=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,kR=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,VR=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,FR=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,DR=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,BR=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,LR=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,zR=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,CR=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,_R=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,MR=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,IR=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,wR=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,AR=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,PR=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,TR=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,SR=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,jR=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,vR=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,yR=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,xR=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,bR=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,hR=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,fR=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,gR=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,pR=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,rJ={alphahash_fragment:K1,alphahash_pars_fragment:G1,alphamap_fragment:U1,alphamap_pars_fragment:E1,alphatest_fragment:q1,alphatest_pars_fragment:N1,aomap_fragment:O1,aomap_pars_fragment:R1,batching_pars_vertex:k1,batching_vertex:V1,begin_vertex:F1,beginnormal_vertex:D1,bsdfs:B1,iridescence_fragment:L1,bumpmap_pars_fragment:z1,clipping_planes_fragment:C1,clipping_planes_pars_fragment:_1,clipping_planes_pars_vertex:M1,clipping_planes_vertex:I1,color_fragment:w1,color_pars_fragment:A1,color_pars_vertex:P1,color_vertex:T1,common:S1,cube_uv_reflection_fragment:j1,defaultnormal_vertex:v1,displacementmap_pars_vertex:y1,displacementmap_vertex:x1,emissivemap_fragment:b1,emissivemap_pars_fragment:h1,colorspace_fragment:f1,colorspace_pars_fragment:g1,envmap_fragment:p1,envmap_common_pars_fragment:m1,envmap_pars_fragment:l1,envmap_pars_vertex:u1,envmap_physical_pars_fragment:JO,envmap_vertex:d1,fog_vertex:c1,fog_pars_vertex:n1,fog_fragment:s1,fog_pars_fragment:i1,gradientmap_pars_fragment:o1,lightmap_pars_fragment:a1,lights_lambert_fragment:r1,lights_lambert_pars_fragment:t1,lights_pars_begin:e1,lights_toon_fragment:QO,lights_toon_pars_fragment:ZO,lights_phong_fragment:$O,lights_phong_pars_fragment:WO,lights_physical_fragment:YO,lights_physical_pars_fragment:XO,lights_fragment_begin:HO,lights_fragment_maps:KO,lights_fragment_end:GO,logdepthbuf_fragment:UO,logdepthbuf_pars_fragment:EO,logdepthbuf_pars_vertex:qO,logdepthbuf_vertex:NO,map_fragment:OO,map_pars_fragment:RO,map_particle_fragment:kO,map_particle_pars_fragment:VO,metalnessmap_fragment:FO,metalnessmap_pars_fragment:DO,morphinstance_vertex:BO,morphcolor_vertex:LO,morphnormal_vertex:zO,morphtarget_pars_vertex:CO,morphtarget_vertex:_O,normal_fragment_begin:MO,normal_fragment_maps:IO,normal_pars_fragment:wO,normal_pars_vertex:AO,normal_vertex:PO,normalmap_pars_fragment:TO,clearcoat_normal_fragment_begin:SO,clearcoat_normal_fragment_maps:jO,clearcoat_pars_fragment:vO,iridescence_pars_fragment:yO,opaque_fragment:xO,packing:bO,premultiplied_alpha_fragment:hO,project_vertex:fO,dithering_fragment:gO,dithering_pars_fragment:pO,roughnessmap_fragment:mO,roughnessmap_pars_fragment:lO,shadowmap_pars_fragment:uO,shadowmap_pars_vertex:dO,shadowmap_vertex:cO,shadowmask_pars_fragment:nO,skinbase_vertex:sO,skinning_pars_vertex:iO,skinning_vertex:oO,skinnormal_vertex:aO,specularmap_fragment:rO,specularmap_pars_fragment:tO,tonemapping_fragment:eO,tonemapping_pars_fragment:JR,transmission_fragment:QR,transmission_pars_fragment:ZR,uv_pars_fragment:$R,uv_pars_vertex:WR,uv_vertex:YR,worldpos_vertex:XR,background_vert:HR,background_frag:KR,backgroundCube_vert:GR,backgroundCube_frag:UR,cube_vert:ER,cube_frag:qR,depth_vert:NR,depth_frag:OR,distanceRGBA_vert:RR,distanceRGBA_frag:kR,equirect_vert:VR,equirect_frag:FR,linedashed_vert:DR,linedashed_frag:BR,meshbasic_vert:LR,meshbasic_frag:zR,meshlambert_vert:CR,meshlambert_frag:_R,meshmatcap_vert:MR,meshmatcap_frag:IR,meshnormal_vert:wR,meshnormal_frag:AR,meshphong_vert:PR,meshphong_frag:TR,meshphysical_vert:SR,meshphysical_frag:jR,meshtoon_vert:vR,meshtoon_frag:yR,points_vert:xR,points_frag:bR,shadow_vert:hR,shadow_frag:fR,sprite_vert:gR,sprite_frag:pR},qJ={common:{diffuse:{value:/*@__PURE__*/new u(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:/*@__PURE__*/new nJ},alphaMap:{value:null},alphaMapTransform:{value:/*@__PURE__*/new nJ},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:/*@__PURE__*/new nJ}},envmap:{envMap:{value:null},envMapRotation:{value:/*@__PURE__*/new nJ},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:0.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:/*@__PURE__*/new nJ}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:/*@__PURE__*/new nJ}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:/*@__PURE__*/new nJ},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:/*@__PURE__*/new nJ},normalScale:{value:/*@__PURE__*/new i(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:/*@__PURE__*/new nJ},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:/*@__PURE__*/new nJ}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:/*@__PURE__*/new nJ}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:/*@__PURE__*/new nJ}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:0.00025},fogNear:{value:1},fogFar:{value:2000},fogColor:{value:/*@__PURE__*/new u(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:/*@__PURE__*/new u(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:/*@__PURE__*/new nJ},alphaTest:{value:0},uvTransform:{value:/*@__PURE__*/new nJ}},sprite:{diffuse:{value:/*@__PURE__*/new u(16777215)},opacity:{value:1},center:{value:/*@__PURE__*/new i(0.5,0.5)},rotation:{value:0},map:{value:null},mapTransform:{value:/*@__PURE__*/new nJ},alphaMap:{value:null},alphaMapTransform:{value:/*@__PURE__*/new nJ},alphaTest:{value:0}}},p8={basic:{uniforms:/*@__PURE__*/s0([qJ.common,qJ.specularmap,qJ.envmap,qJ.aomap,qJ.lightmap,qJ.fog]),vertexShader:rJ.meshbasic_vert,fragmentShader:rJ.meshbasic_frag},lambert:{uniforms:/*@__PURE__*/s0([qJ.common,qJ.specularmap,qJ.envmap,qJ.aomap,qJ.lightmap,qJ.emissivemap,qJ.bumpmap,qJ.normalmap,qJ.displacementmap,qJ.fog,qJ.lights,{emissive:{value:/*@__PURE__*/new u(0)}}]),vertexShader:rJ.meshlambert_vert,fragmentShader:rJ.meshlambert_frag},phong:{uniforms:/*@__PURE__*/s0([qJ.common,qJ.specularmap,qJ.envmap,qJ.aomap,qJ.lightmap,qJ.emissivemap,qJ.bumpmap,qJ.normalmap,qJ.displacementmap,qJ.fog,qJ.lights,{emissive:{value:/*@__PURE__*/new u(0)},specular:{value:/*@__PURE__*/new u(1118481)},shininess:{value:30}}]),vertexShader:rJ.meshphong_vert,fragmentShader:rJ.meshphong_frag},standard:{uniforms:/*@__PURE__*/s0([qJ.common,qJ.envmap,qJ.aomap,qJ.lightmap,qJ.emissivemap,qJ.bumpmap,qJ.normalmap,qJ.displacementmap,qJ.roughnessmap,qJ.metalnessmap,qJ.fog,qJ.lights,{emissive:{value:/*@__PURE__*/new u(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:rJ.meshphysical_vert,fragmentShader:rJ.meshphysical_frag},toon:{uniforms:/*@__PURE__*/s0([qJ.common,qJ.aomap,qJ.lightmap,qJ.emissivemap,qJ.bumpmap,qJ.normalmap,qJ.displacementmap,qJ.gradientmap,qJ.fog,qJ.lights,{emissive:{value:/*@__PURE__*/new u(0)}}]),vertexShader:rJ.meshtoon_vert,fragmentShader:rJ.meshtoon_frag},matcap:{uniforms:/*@__PURE__*/s0([qJ.common,qJ.bumpmap,qJ.normalmap,qJ.displacementmap,qJ.fog,{matcap:{value:null}}]),vertexShader:rJ.meshmatcap_vert,fragmentShader:rJ.meshmatcap_frag},points:{uniforms:/*@__PURE__*/s0([qJ.points,qJ.fog]),vertexShader:rJ.points_vert,fragmentShader:rJ.points_frag},dashed:{uniforms:/*@__PURE__*/s0([qJ.common,qJ.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:rJ.linedashed_vert,fragmentShader:rJ.linedashed_frag},depth:{uniforms:/*@__PURE__*/s0([qJ.common,qJ.displacementmap]),vertexShader:rJ.depth_vert,fragmentShader:rJ.depth_frag},normal:{uniforms:/*@__PURE__*/s0([qJ.common,qJ.bumpmap,qJ.normalmap,qJ.displacementmap,{opacity:{value:1}}]),vertexShader:rJ.meshnormal_vert,fragmentShader:rJ.meshnormal_frag},sprite:{uniforms:/*@__PURE__*/s0([qJ.sprite,qJ.fog]),vertexShader:rJ.sprite_vert,fragmentShader:rJ.sprite_frag},background:{uniforms:{uvTransform:{value:/*@__PURE__*/new nJ},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:rJ.background_vert,fragmentShader:rJ.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:/*@__PURE__*/new nJ}},vertexShader:rJ.backgroundCube_vert,fragmentShader:rJ.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:rJ.cube_vert,fragmentShader:rJ.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:rJ.equirect_vert,fragmentShader:rJ.equirect_frag},distanceRGBA:{uniforms:/*@__PURE__*/s0([qJ.common,qJ.displacementmap,{referencePosition:{value:/*@__PURE__*/new I},nearDistance:{value:1},farDistance:{value:1000}}]),vertexShader:rJ.distanceRGBA_vert,fragmentShader:rJ.distanceRGBA_frag},shadow:{uniforms:/*@__PURE__*/s0([qJ.lights,qJ.fog,{color:{value:/*@__PURE__*/new u(0)},opacity:{value:1}}]),vertexShader:rJ.shadow_vert,fragmentShader:rJ.shadow_frag}};p8.physical={uniforms:/*@__PURE__*/s0([p8.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:/*@__PURE__*/new nJ},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:/*@__PURE__*/new nJ},clearcoatNormalScale:{value:/*@__PURE__*/new i(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:/*@__PURE__*/new nJ},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:/*@__PURE__*/new nJ},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:/*@__PURE__*/new nJ},sheen:{value:0},sheenColor:{value:/*@__PURE__*/new u(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:/*@__PURE__*/new nJ},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:/*@__PURE__*/new nJ},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:/*@__PURE__*/new nJ},transmissionSamplerSize:{value:/*@__PURE__*/new i},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:/*@__PURE__*/new nJ},attenuationDistance:{value:0},attenuationColor:{value:/*@__PURE__*/new u(0)},specularColor:{value:/*@__PURE__*/new u(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:/*@__PURE__*/new nJ},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:/*@__PURE__*/new nJ},anisotropyVector:{value:/*@__PURE__*/new i},anisotropyMap:{value:null},anisotropyMapTransform:{value:/*@__PURE__*/new nJ}}]),vertexShader:rJ.meshphysical_vert,fragmentShader:rJ.meshphysical_frag};var uW={r:0,b:0,g:0},w6=/*@__PURE__*/new W8,mR=/*@__PURE__*/new SJ;function lR(J,Q,Z,$,W,Y,X){let H=new u(0),K=Y===!0?0:1,G,U,E=null,q=0,N=null;function k(F){let C=F.isScene===!0?F.background:null;if(C&&C.isTexture)C=(F.backgroundBlurriness>0?Z:Q).get(C);return C}function V(F){let C=!1,P=k(F);if(P===null)O(H,K);else if(P&&P.isColor)O(P,1),C=!0;let M=J.xr.getEnvironmentBlendMode();if(M==="additive")$.buffers.color.setClear(0,0,0,1,X);else if(M==="alpha-blend")$.buffers.color.setClear(0,0,0,0,X);if(J.autoClear||C)$.buffers.depth.setTest(!0),$.buffers.depth.setMask(!0),$.buffers.color.setMask(!0),J.clear(J.autoClearColor,J.autoClearDepth,J.autoClearStencil)}function R(F,C){let P=k(C);if(P&&(P.isCubeTexture||P.mapping===H7)){if(U===void 0)U=new N0(new h9(1,1,1),new l0({name:"BackgroundCubeMaterial",uniforms:B6(p8.backgroundCube.uniforms),vertexShader:p8.backgroundCube.vertexShader,fragmentShader:p8.backgroundCube.fragmentShader,side:n0,depthTest:!1,depthWrite:!1,fog:!1})),U.geometry.deleteAttribute("normal"),U.geometry.deleteAttribute("uv"),U.onBeforeRender=function(M,w,v){this.matrixWorld.copyPosition(v.matrixWorld)},Object.defineProperty(U.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),W.update(U);if(w6.copy(C.backgroundRotation),w6.x*=-1,w6.y*=-1,w6.z*=-1,P.isCubeTexture&&P.isRenderTargetTexture===!1)w6.y*=-1,w6.z*=-1;if(U.material.uniforms.envMap.value=P,U.material.uniforms.flipEnvMap.value=P.isCubeTexture&&P.isRenderTargetTexture===!1?-1:1,U.material.uniforms.backgroundBlurriness.value=C.backgroundBlurriness,U.material.uniforms.backgroundIntensity.value=C.backgroundIntensity,U.material.uniforms.backgroundRotation.value.setFromMatrix4(mR.makeRotationFromEuler(w6)),U.material.toneMapped=aJ.getTransfer(P.colorSpace)!==q0,E!==P||q!==P.version||N!==J.toneMapping)U.material.needsUpdate=!0,E=P,q=P.version,N=J.toneMapping;U.layers.enableAll(),F.unshift(U,U.geometry,U.material,0,0,null)}else if(P&&P.isTexture){if(G===void 0)G=new N0(new F9(2,2),new l0({name:"BackgroundMaterial",uniforms:B6(p8.background.uniforms),vertexShader:p8.background.vertexShader,fragmentShader:p8.background.fragmentShader,side:t0,depthTest:!1,depthWrite:!1,fog:!1})),G.geometry.deleteAttribute("normal"),Object.defineProperty(G.material,"map",{get:function(){return this.uniforms.t2D.value}}),W.update(G);if(G.material.uniforms.t2D.value=P,G.material.uniforms.backgroundIntensity.value=C.backgroundIntensity,G.material.toneMapped=aJ.getTransfer(P.colorSpace)!==q0,P.matrixAutoUpdate===!0)P.updateMatrix();if(G.material.uniforms.uvTransform.value.copy(P.matrix),E!==P||q!==P.version||N!==J.toneMapping)G.material.needsUpdate=!0,E=P,q=P.version,N=J.toneMapping;G.layers.enableAll(),F.unshift(G,G.geometry,G.material,0,0,null)}}function O(F,C){F.getRGB(uW,iX(J)),$.buffers.color.setClear(uW.r,uW.g,uW.b,C,X)}function D(){if(U!==void 0)U.geometry.dispose(),U.material.dispose(),U=void 0;if(G!==void 0)G.geometry.dispose(),G.material.dispose(),G=void 0}return{getClearColor:function(){return H},setClearColor:function(F,C=1){H.set(F),K=C,O(H,K)},getClearAlpha:function(){return K},setClearAlpha:function(F){K=F,O(H,K)},render:V,addToRenderList:R,dispose:D}}function uR(J,Q){let Z=J.getParameter(J.MAX_VERTEX_ATTRIBS),$={},W=q(null),Y=W,X=!1;function H(_,j,p,l,c){let r=!1,n=E(l,p,j);if(Y!==n)Y=n,G(Y.object);if(r=N(_,l,p,c),r)k(_,l,p,c);if(c!==null)Q.update(c,J.ELEMENT_ARRAY_BUFFER);if(r||X){if(X=!1,C(_,j,p,l),c!==null)J.bindBuffer(J.ELEMENT_ARRAY_BUFFER,Q.get(c).buffer)}}function K(){return J.createVertexArray()}function G(_){return J.bindVertexArray(_)}function U(_){return J.deleteVertexArray(_)}function E(_,j,p){let l=p.wireframe===!0,c=$[_.id];if(c===void 0)c={},$[_.id]=c;let r=c[j.id];if(r===void 0)r={},c[j.id]=r;let n=r[l];if(n===void 0)n=q(K()),r[l]=n;return n}function q(_){let j=[],p=[],l=[];for(let c=0;c<Z;c++)j[c]=0,p[c]=0,l[c]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:j,enabledAttributes:p,attributeDivisors:l,object:_,attributes:{},index:null}}function N(_,j,p,l){let c=Y.attributes,r=j.attributes,n=0,WJ=p.getAttributes();for(let d in WJ)if(WJ[d].location>=0){let NJ=c[d],hJ=r[d];if(hJ===void 0){if(d==="instanceMatrix"&&_.instanceMatrix)hJ=_.instanceMatrix;if(d==="instanceColor"&&_.instanceColor)hJ=_.instanceColor}if(NJ===void 0)return!0;if(NJ.attribute!==hJ)return!0;if(hJ&&NJ.data!==hJ.data)return!0;n++}if(Y.attributesNum!==n)return!0;if(Y.index!==l)return!0;return!1}function k(_,j,p,l){let c={},r=j.attributes,n=0,WJ=p.getAttributes();for(let d in WJ)if(WJ[d].location>=0){let NJ=r[d];if(NJ===void 0){if(d==="instanceMatrix"&&_.instanceMatrix)NJ=_.instanceMatrix;if(d==="instanceColor"&&_.instanceColor)NJ=_.instanceColor}let hJ={};if(hJ.attribute=NJ,NJ&&NJ.data)hJ.data=NJ.data;c[d]=hJ,n++}Y.attributes=c,Y.attributesNum=n,Y.index=l}function V(){let _=Y.newAttributes;for(let j=0,p=_.length;j<p;j++)_[j]=0}function R(_){O(_,0)}function O(_,j){let{newAttributes:p,enabledAttributes:l,attributeDivisors:c}=Y;if(p[_]=1,l[_]===0)J.enableVertexAttribArray(_),l[_]=1;if(c[_]!==j)J.vertexAttribDivisor(_,j),c[_]=j}function D(){let{newAttributes:_,enabledAttributes:j}=Y;for(let p=0,l=j.length;p<l;p++)if(j[p]!==_[p])J.disableVertexAttribArray(p),j[p]=0}function F(_,j,p,l,c,r,n){if(n===!0)J.vertexAttribIPointer(_,j,p,c,r);else J.vertexAttribPointer(_,j,p,l,c,r)}function C(_,j,p,l){V();let c=l.attributes,r=p.getAttributes(),n=j.defaultAttributeValues;for(let WJ in r){let d=r[WJ];if(d.location>=0){let RJ=c[WJ];if(RJ===void 0){if(WJ==="instanceMatrix"&&_.instanceMatrix)RJ=_.instanceMatrix;if(WJ==="instanceColor"&&_.instanceColor)RJ=_.instanceColor}if(RJ!==void 0){let{normalized:NJ,itemSize:hJ}=RJ,eJ=Q.get(RJ);if(eJ===void 0)continue;let{buffer:o,type:UJ,bytesPerElement:TJ}=eJ,wJ=UJ===J.INT||UJ===J.UNSIGNED_INT||RJ.gpuType===V$;if(RJ.isInterleavedBufferAttribute){let EJ=RJ.data,Q0=EJ.stride,fJ=RJ.offset;if(EJ.isInstancedInterleavedBuffer){for(let sJ=0;sJ<d.locationSize;sJ++)O(d.location+sJ,EJ.meshPerAttribute);if(_.isInstancedMesh!==!0&&l._maxInstanceCount===void 0)l._maxInstanceCount=EJ.meshPerAttribute*EJ.count}else for(let sJ=0;sJ<d.locationSize;sJ++)R(d.location+sJ);J.bindBuffer(J.ARRAY_BUFFER,o);for(let sJ=0;sJ<d.locationSize;sJ++)F(d.location+sJ,hJ/d.locationSize,UJ,NJ,Q0*TJ,(fJ+hJ/d.locationSize*sJ)*TJ,wJ)}else{if(RJ.isInstancedBufferAttribute){for(let EJ=0;EJ<d.locationSize;EJ++)O(d.location+EJ,RJ.meshPerAttribute);if(_.isInstancedMesh!==!0&&l._maxInstanceCount===void 0)l._maxInstanceCount=RJ.meshPerAttribute*RJ.count}else for(let EJ=0;EJ<d.locationSize;EJ++)R(d.location+EJ);J.bindBuffer(J.ARRAY_BUFFER,o);for(let EJ=0;EJ<d.locationSize;EJ++)F(d.location+EJ,hJ/d.locationSize,UJ,NJ,hJ*TJ,hJ/d.locationSize*EJ*TJ,wJ)}}else if(n!==void 0){let NJ=n[WJ];if(NJ!==void 0)switch(NJ.length){case 2:J.vertexAttrib2fv(d.location,NJ);break;case 3:J.vertexAttrib3fv(d.location,NJ);break;case 4:J.vertexAttrib4fv(d.location,NJ);break;default:J.vertexAttrib1fv(d.location,NJ)}}}}D()}function P(){v();for(let _ in $){let j=$[_];for(let p in j){let l=j[p];for(let c in l)U(l[c].object),delete l[c];delete j[p]}delete $[_]}}function M(_){if($[_.id]===void 0)return;let j=$[_.id];for(let p in j){let l=j[p];for(let c in l)U(l[c].object),delete l[c];delete j[p]}delete $[_.id]}function w(_){for(let j in $){let p=$[j];if(p[_.id]===void 0)continue;let l=p[_.id];for(let c in l)U(l[c].object),delete l[c];delete p[_.id]}}function v(){if(L(),X=!0,Y===W)return;Y=W,G(Y.object)}function L(){W.geometry=null,W.program=null,W.wireframe=!1}return{setup:H,reset:v,resetDefaultState:L,dispose:P,releaseStatesOfGeometry:M,releaseStatesOfProgram:w,initAttributes:V,enableAttribute:R,disableUnusedAttributes:D}}function dR(J,Q,Z){let $;function W(G){$=G}function Y(G,U){J.drawArrays($,G,U),Z.update(U,$,1)}function X(G,U,E){if(E===0)return;J.drawArraysInstanced($,G,U,E),Z.update(U,$,E)}function H(G,U,E){if(E===0)return;Q.get("WEBGL_multi_draw").multiDrawArraysWEBGL($,G,0,U,0,E);let N=0;for(let k=0;k<E;k++)N+=U[k];Z.update(N,$,1)}function K(G,U,E,q){if(E===0)return;let N=Q.get("WEBGL_multi_draw");if(N===null)for(let k=0;k<G.length;k++)X(G[k],U[k],q[k]);else{N.multiDrawArraysInstancedWEBGL($,G,0,U,0,q,0,E);let k=0;for(let V=0;V<E;V++)k+=U[V]*q[V];Z.update(k,$,1)}}this.setMode=W,this.render=Y,this.renderInstances=X,this.renderMultiDraw=H,this.renderMultiDrawInstances=K}function cR(J,Q,Z,$){let W;function Y(){if(W!==void 0)return W;if(Q.has("EXT_texture_filter_anisotropic")===!0){let w=Q.get("EXT_texture_filter_anisotropic");W=J.getParameter(w.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else W=0;return W}function X(w){if(w!==F8&&$.convert(w)!==J.getParameter(J.IMPLEMENTATION_COLOR_READ_FORMAT))return!1;return!0}function H(w){let v=w===G7&&(Q.has("EXT_color_buffer_half_float")||Q.has("EXT_color_buffer_float"));if(w!==X8&&$.convert(w)!==J.getParameter(J.IMPLEMENTATION_COLOR_READ_TYPE)&&w!==R9&&!v)return!1;return!0}function K(w){if(w==="highp"){if(J.getShaderPrecisionFormat(J.VERTEX_SHADER,J.HIGH_FLOAT).precision>0&&J.getShaderPrecisionFormat(J.FRAGMENT_SHADER,J.HIGH_FLOAT).precision>0)return"highp";w="mediump"}if(w==="mediump"){if(J.getShaderPrecisionFormat(J.VERTEX_SHADER,J.MEDIUM_FLOAT).precision>0&&J.getShaderPrecisionFormat(J.FRAGMENT_SHADER,J.MEDIUM_FLOAT).precision>0)return"mediump"}return"lowp"}let G=Z.precision!==void 0?Z.precision:"highp",U=K(G);if(U!==G)console.warn("THREE.WebGLRenderer:",G,"not supported, using",U,"instead."),G=U;let E=Z.logarithmicDepthBuffer===!0,q=Z.reverseDepthBuffer===!0&&Q.has("EXT_clip_control"),N=J.getParameter(J.MAX_TEXTURE_IMAGE_UNITS),k=J.getParameter(J.MAX_VERTEX_TEXTURE_IMAGE_UNITS),V=J.getParameter(J.MAX_TEXTURE_SIZE),R=J.getParameter(J.MAX_CUBE_MAP_TEXTURE_SIZE),O=J.getParameter(J.MAX_VERTEX_ATTRIBS),D=J.getParameter(J.MAX_VERTEX_UNIFORM_VECTORS),F=J.getParameter(J.MAX_VARYING_VECTORS),C=J.getParameter(J.MAX_FRAGMENT_UNIFORM_VECTORS),P=k>0,M=J.getParameter(J.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:Y,getMaxPrecision:K,textureFormatReadable:X,textureTypeReadable:H,precision:G,logarithmicDepthBuffer:E,reverseDepthBuffer:q,maxTextures:N,maxVertexTextures:k,maxTextureSize:V,maxCubemapSize:R,maxAttributes:O,maxVertexUniforms:D,maxVaryings:F,maxFragmentUniforms:C,vertexTextures:P,maxSamples:M}}function nR(J){let Q=this,Z=null,$=0,W=!1,Y=!1,X=new l8,H=new nJ,K={value:null,needsUpdate:!1};this.uniform=K,this.numPlanes=0,this.numIntersection=0,this.init=function(E,q){let N=E.length!==0||q||$!==0||W;return W=q,$=E.length,N},this.beginShadows=function(){Y=!0,U(null)},this.endShadows=function(){Y=!1},this.setGlobalState=function(E,q){Z=U(E,q,0)},this.setState=function(E,q,N){let{clippingPlanes:k,clipIntersection:V,clipShadows:R}=E,O=J.get(E);if(!W||k===null||k.length===0||Y&&!R)if(Y)U(null);else G();else{let D=Y?0:$,F=D*4,C=O.clippingState||null;K.value=C,C=U(k,q,F,N);for(let P=0;P!==F;++P)C[P]=Z[P];O.clippingState=C,this.numIntersection=V?this.numPlanes:0,this.numPlanes+=D}};function G(){if(K.value!==Z)K.value=Z,K.needsUpdate=$>0;Q.numPlanes=$,Q.numIntersection=0}function U(E,q,N,k){let V=E!==null?E.length:0,R=null;if(V!==0){if(R=K.value,k!==!0||R===null){let O=N+V*4,D=q.matrixWorldInverse;if(H.getNormalMatrix(D),R===null||R.length<O)R=new Float32Array(O);for(let F=0,C=N;F!==V;++F,C+=4)X.copy(E[F]).applyMatrix4(D,H),X.normal.toArray(R,C),R[C+3]=X.constant}K.value=R,K.needsUpdate=!0}return Q.numPlanes=V,Q.numIntersection=0,R}}function sR(J){let Q=/*@__PURE__*/new WeakMap;function Z(X,H){if(H===qQ)X.mapping=G6;else if(H===NQ)X.mapping=v9;return X}function $(X){if(X&&X.isTexture){let H=X.mapping;if(H===qQ||H===NQ)if(Q.has(X)){let K=Q.get(X).texture;return Z(K,X.mapping)}else{let K=X.image;if(K&&K.height>0){let G=new $W(K.height);return G.fromEquirectangularTexture(J,X),Q.set(X,G),X.addEventListener("dispose",W),Z(G.texture,X.mapping)}else return null}}return X}function W(X){let H=X.target;H.removeEventListener("dispose",W);let K=Q.get(H);if(K!==void 0)Q.delete(H),K.dispose()}function Y(){Q=/*@__PURE__*/new WeakMap}return{get:$,dispose:Y}}var S7=4,KE=[0.125,0.215,0.35,0.446,0.526,0.582],T6=20,lH=/*@__PURE__*/new r8,GE=/*@__PURE__*/new u,uH=null,dH=0,cH=0,nH=!1,P6=(1+Math.sqrt(5))/2,T7=1/P6,UE=[/*@__PURE__*/new I(-P6,T7,0),/*@__PURE__*/new I(P6,T7,0),/*@__PURE__*/new I(-T7,0,P6),/*@__PURE__*/new I(T7,0,P6),/*@__PURE__*/new I(0,P6,-T7),/*@__PURE__*/new I(0,P6,T7),/*@__PURE__*/new I(-1,1,-1),/*@__PURE__*/new I(1,1,-1),/*@__PURE__*/new I(-1,1,1),/*@__PURE__*/new I(1,1,1)];class nW{constructor(J){this._renderer=J,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(J,Q=0,Z=0.1,$=100){uH=this._renderer.getRenderTarget(),dH=this._renderer.getActiveCubeFace(),cH=this._renderer.getActiveMipmapLevel(),nH=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);let W=this._allocateTargets();if(W.depthBuffer=!0,this._sceneToCubeUV(J,Z,$,W),Q>0)this._blur(W,0,0,Q);return this._applyPMREM(W),this._cleanup(W),W}fromEquirectangular(J,Q=null){return this._fromTexture(J,Q)}fromCubemap(J,Q=null){return this._fromTexture(J,Q)}compileCubemapShader(){if(this._cubemapMaterial===null)this._cubemapMaterial=NE(),this._compileMaterial(this._cubemapMaterial)}compileEquirectangularShader(){if(this._equirectMaterial===null)this._equirectMaterial=qE(),this._compileMaterial(this._equirectMaterial)}dispose(){if(this._dispose(),this._cubemapMaterial!==null)this._cubemapMaterial.dispose();if(this._equirectMaterial!==null)this._equirectMaterial.dispose()}_setSize(J){this._lodMax=Math.floor(Math.log2(J)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){if(this._blurMaterial!==null)this._blurMaterial.dispose();if(this._pingPongRenderTarget!==null)this._pingPongRenderTarget.dispose();for(let J=0;J<this._lodPlanes.length;J++)this._lodPlanes[J].dispose()}_cleanup(J){this._renderer.setRenderTarget(uH,dH,cH),this._renderer.xr.enabled=nH,J.scissorTest=!1,dW(J,0,0,J.width,J.height)}_fromTexture(J,Q){if(J.mapping===G6||J.mapping===v9)this._setSize(J.image.length===0?16:J.image[0].width||J.image[0].image.width);else this._setSize(J.image.width/4);uH=this._renderer.getRenderTarget(),dH=this._renderer.getActiveCubeFace(),cH=this._renderer.getActiveMipmapLevel(),nH=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let Z=Q||this._allocateTargets();return this._textureToCubeUV(J,Z),this._applyPMREM(Z),this._cleanup(Z),Z}_allocateTargets(){let J=3*Math.max(this._cubeSize,112),Q=4*this._cubeSize,Z={magFilter:m0,minFilter:m0,generateMipmaps:!1,type:G7,format:F8,colorSpace:x0,depthBuffer:!1},$=EE(J,Q,Z);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==J||this._pingPongRenderTarget.height!==Q){if(this._pingPongRenderTarget!==null)this._dispose();this._pingPongRenderTarget=EE(J,Q,Z);let{_lodMax:W}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=iR(W)),this._blurMaterial=oR(W,J,Q)}return $}_compileMaterial(J){let Q=new N0(this._lodPlanes[0],J);this._renderer.compile(Q,lH)}_sceneToCubeUV(J,Q,Z,$){let X=new O0(90,1,Q,Z),H=[1,-1,1,1,1,1],K=[1,1,1,-1,-1,-1],G=this._renderer,U=G.autoClear,E=G.toneMapping;G.getClearColor(GE),G.toneMapping=n8,G.autoClear=!1;let q=new b0({name:"PMREM.Background",side:n0,depthWrite:!1,depthTest:!1}),N=new N0(new h9,q),k=!1,V=J.background;if(V){if(V.isColor)q.color.copy(V),J.background=null,k=!0}else q.color.copy(GE),k=!0;for(let R=0;R<6;R++){let O=R%3;if(O===0)X.up.set(0,H[R],0),X.lookAt(K[R],0,0);else if(O===1)X.up.set(0,0,H[R]),X.lookAt(0,K[R],0);else X.up.set(0,H[R],0),X.lookAt(0,0,K[R]);let D=this._cubeSize;if(dW($,O*D,R>2?D:0,D,D),G.setRenderTarget($),k)G.render(N,X);G.render(J,X)}N.geometry.dispose(),N.material.dispose(),G.toneMapping=E,G.autoClear=U,J.background=V}_textureToCubeUV(J,Q){let Z=this._renderer,$=J.mapping===G6||J.mapping===v9;if($){if(this._cubemapMaterial===null)this._cubemapMaterial=NE();this._cubemapMaterial.uniforms.flipEnvMap.value=J.isRenderTargetTexture===!1?-1:1}else if(this._equirectMaterial===null)this._equirectMaterial=qE();let W=$?this._cubemapMaterial:this._equirectMaterial,Y=new N0(this._lodPlanes[0],W),X=W.uniforms;X.envMap.value=J;let H=this._cubeSize;dW(Q,0,0,3*H,2*H),Z.setRenderTarget(Q),Z.render(Y,lH)}_applyPMREM(J){let Q=this._renderer,Z=Q.autoClear;Q.autoClear=!1;let $=this._lodPlanes.length;for(let W=1;W<$;W++){let Y=Math.sqrt(this._sigmas[W]*this._sigmas[W]-this._sigmas[W-1]*this._sigmas[W-1]),X=UE[($-W-1)%UE.length];this._blur(J,W-1,W,Y,X)}Q.autoClear=Z}_blur(J,Q,Z,$,W){let Y=this._pingPongRenderTarget;this._halfBlur(J,Y,Q,Z,$,"latitudinal",W),this._halfBlur(Y,J,Z,Z,$,"longitudinal",W)}_halfBlur(J,Q,Z,$,W,Y,X){let H=this._renderer,K=this._blurMaterial;if(Y!=="latitudinal"&&Y!=="longitudinal")console.error("blur direction must be either latitudinal or longitudinal!");let G=3,U=new N0(this._lodPlanes[$],K),E=K.uniforms,q=this._sizeLods[Z]-1,N=isFinite(W)?Math.PI/(2*q):2*Math.PI/(2*T6-1),k=W/N,V=isFinite(W)?1+Math.floor(G*k):T6;if(V>T6)console.warn(`sigmaRadians, ${W}, is too large and will clip, as it requested ${V} samples when the maximum is set to ${T6}`);let R=[],O=0;for(let M=0;M<T6;++M){let w=M/k,v=Math.exp(-w*w/2);if(R.push(v),M===0)O+=v;else if(M<V)O+=2*v}for(let M=0;M<R.length;M++)R[M]=R[M]/O;if(E.envMap.value=J.texture,E.samples.value=V,E.weights.value=R,E.latitudinal.value=Y==="latitudinal",X)E.poleAxis.value=X;let{_lodMax:D}=this;E.dTheta.value=N,E.mipInt.value=D-Z;let F=this._sizeLods[$],C=3*F*($>D-S7?$-D+S7:0),P=4*(this._cubeSize-F);dW(Q,C,P,3*F,2*F),H.setRenderTarget(Q),H.render(U,lH)}}function iR(J){let Q=[],Z=[],$=[],W=J,Y=J-S7+1+KE.length;for(let X=0;X<Y;X++){let H=Math.pow(2,W);Z.push(H);let K=1/H;if(X>J-S7)K=KE[X-J+S7-1];else if(X===0)K=0;$.push(K);let G=1/(H-2),U=-G,E=1+G,q=[U,U,E,U,E,E,U,U,E,E,U,E],N=6,k=6,V=3,R=2,O=1,D=new Float32Array(V*k*N),F=new Float32Array(R*k*N),C=new Float32Array(O*k*N);for(let M=0;M<N;M++){let w=M%3*2/3-1,v=M>2?0:-1,L=[w,v,0,w+0.6666666666666666,v,0,w+0.6666666666666666,v+1,0,w,v,0,w+0.6666666666666666,v+1,0,w,v+1,0];D.set(L,V*k*M),F.set(q,R*k*M);let _=[M,M,M,M,M,M];C.set(_,O*k*M)}let P=new gJ;if(P.setAttribute("position",new X0(D,V)),P.setAttribute("uv",new X0(F,R)),P.setAttribute("faceIndex",new X0(C,O)),Q.push(P),W>S7)W--}return{lodPlanes:Q,sizeLods:Z,sigmas:$}}function EE(J,Q,Z){let $=new H8(J,Q,Z);return $.texture.mapping=H7,$.texture.name="PMREM.cubeUv",$.scissorTest=!0,$}function dW(J,Q,Z,$,W){J.viewport.set(Q,Z,$,W),J.scissor.set(Q,Z,$,W)}function oR(J,Q,Z){let $=new Float32Array(T6),W=new I(0,1,0);return new l0({name:"SphericalGaussianBlur",defines:{n:T6,CUBEUV_TEXEL_WIDTH:1/Q,CUBEUV_TEXEL_HEIGHT:1/Z,CUBEUV_MAX_MIP:`${J}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:$},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:W}},vertexShader:oH(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:N9,depthTest:!1,depthWrite:!1})}function qE(){return new l0({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:oH(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:N9,depthTest:!1,depthWrite:!1})}function NE(){return new l0({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:oH(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:N9,depthTest:!1,depthWrite:!1})}function oH(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function aR(J){let Q=/*@__PURE__*/new WeakMap,Z=null;function $(H){if(H&&H.isTexture){let K=H.mapping,G=K===qQ||K===NQ,U=K===G6||K===v9;if(G||U){let E=Q.get(H),q=E!==void 0?E.texture.pmremVersion:0;if(H.isRenderTargetTexture&&H.pmremVersion!==q){if(Z===null)Z=new nW(J);return E=G?Z.fromEquirectangular(H,E):Z.fromCubemap(H,E),E.texture.pmremVersion=H.pmremVersion,Q.set(H,E),E.texture}else if(E!==void 0)return E.texture;else{let N=H.image;if(G&&N&&N.height>0||U&&N&&W(N)){if(Z===null)Z=new nW(J);return E=G?Z.fromEquirectangular(H):Z.fromCubemap(H),E.texture.pmremVersion=H.pmremVersion,Q.set(H,E),H.addEventListener("dispose",Y),E.texture}else return null}}}return H}function W(H){let K=0,G=6;for(let U=0;U<G;U++)if(H[U]!==void 0)K++;return K===G}function Y(H){let K=H.target;K.removeEventListener("dispose",Y);let G=Q.get(K);if(G!==void 0)Q.delete(K),G.dispose()}function X(){if(Q=/*@__PURE__*/new WeakMap,Z!==null)Z.dispose(),Z=null}return{get:$,dispose:X}}function rR(J){let Q={};function Z($){if(Q[$]!==void 0)return Q[$];let W;switch($){case"WEBGL_depth_texture":W=J.getExtension("WEBGL_depth_texture")||J.getExtension("MOZ_WEBGL_depth_texture")||J.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":W=J.getExtension("EXT_texture_filter_anisotropic")||J.getExtension("MOZ_EXT_texture_filter_anisotropic")||J.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":W=J.getExtension("WEBGL_compressed_texture_s3tc")||J.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||J.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":W=J.getExtension("WEBGL_compressed_texture_pvrtc")||J.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:W=J.getExtension($)}return Q[$]=W,W}return{has:function($){return Z($)!==null},init:function(){Z("EXT_color_buffer_float"),Z("WEBGL_clip_cull_distance"),Z("OES_texture_float_linear"),Z("EXT_color_buffer_half_float"),Z("WEBGL_multisampled_render_to_texture"),Z("WEBGL_render_shared_exponent")},get:function($){let W=Z($);if(W===null)V6("THREE.WebGLRenderer: "+$+" extension not supported.");return W}}}function tR(J,Q,Z,$){let W={},Y=/*@__PURE__*/new WeakMap;function X(E){let q=E.target;if(q.index!==null)Q.remove(q.index);for(let k in q.attributes)Q.remove(q.attributes[k]);q.removeEventListener("dispose",X),delete W[q.id];let N=Y.get(q);if(N)Q.remove(N),Y.delete(q);if($.releaseStatesOfGeometry(q),q.isInstancedBufferGeometry===!0)delete q._maxInstanceCount;Z.memory.geometries--}function H(E,q){if(W[q.id]===!0)return q;return q.addEventListener("dispose",X),W[q.id]=!0,Z.memory.geometries++,q}function K(E){let q=E.attributes;for(let N in q)Q.update(q[N],J.ARRAY_BUFFER)}function G(E){let q=[],N=E.index,k=E.attributes.position,V=0;if(N!==null){let D=N.array;V=N.version;for(let F=0,C=D.length;F<C;F+=3){let P=D[F+0],M=D[F+1],w=D[F+2];q.push(P,M,M,w,w,P)}}else if(k!==void 0){let D=k.array;V=k.version;for(let F=0,C=D.length/3-1;F<C;F+=3){let P=F+0,M=F+1,w=F+2;q.push(P,M,M,w,w,P)}}else return;let R=new((pX(q))?IQ:D6)(q,1);R.version=V;let O=Y.get(E);if(O)Q.remove(O);Y.set(E,R)}function U(E){let q=Y.get(E);if(q){let N=E.index;if(N!==null){if(q.version<N.version)G(E)}}else G(E);return Y.get(E)}return{get:H,update:K,getWireframeAttribute:U}}function eR(J,Q,Z){let $;function W(q){$=q}let Y,X;function H(q){Y=q.type,X=q.bytesPerElement}function K(q,N){J.drawElements($,N,Y,q*X),Z.update(N,$,1)}function G(q,N,k){if(k===0)return;J.drawElementsInstanced($,N,Y,q*X,k),Z.update(N,$,k)}function U(q,N,k){if(k===0)return;Q.get("WEBGL_multi_draw").multiDrawElementsWEBGL($,N,0,Y,q,0,k);let R=0;for(let O=0;O<k;O++)R+=N[O];Z.update(R,$,1)}function E(q,N,k,V){if(k===0)return;let R=Q.get("WEBGL_multi_draw");if(R===null)for(let O=0;O<q.length;O++)G(q[O]/X,N[O],V[O]);else{R.multiDrawElementsInstancedWEBGL($,N,0,Y,q,0,V,0,k);let O=0;for(let D=0;D<k;D++)O+=N[D]*V[D];Z.update(O,$,1)}}this.setMode=W,this.setIndex=H,this.render=K,this.renderInstances=G,this.renderMultiDraw=U,this.renderMultiDrawInstances=E}function Jk(J){let Q={geometries:0,textures:0},Z={frame:0,calls:0,triangles:0,points:0,lines:0};function $(Y,X,H){switch(Z.calls++,X){case J.TRIANGLES:Z.triangles+=H*(Y/3);break;case J.LINES:Z.lines+=H*(Y/2);break;case J.LINE_STRIP:Z.lines+=H*(Y-1);break;case J.LINE_LOOP:Z.lines+=H*Y;break;case J.POINTS:Z.points+=H*Y;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",X);break}}function W(){Z.calls=0,Z.triangles=0,Z.points=0,Z.lines=0}return{memory:Q,render:Z,programs:null,autoReset:!0,reset:W,update:$}}function Qk(J,Q,Z){let $=/*@__PURE__*/new WeakMap,W=new XJ;function Y(X,H,K){let G=X.morphTargetInfluences,U=H.morphAttributes.position||H.morphAttributes.normal||H.morphAttributes.color,E=U!==void 0?U.length:0,q=$.get(H);if(q===void 0||q.count!==E){let L=function(){w.dispose(),$.delete(H),H.removeEventListener("dispose",L)};if(q!==void 0)q.texture.dispose();let N=H.morphAttributes.position!==void 0,k=H.morphAttributes.normal!==void 0,V=H.morphAttributes.color!==void 0,R=H.morphAttributes.position||[],O=H.morphAttributes.normal||[],D=H.morphAttributes.color||[],F=0;if(N===!0)F=1;if(k===!0)F=2;if(V===!0)F=3;let C=H.attributes.position.count*F,P=1;if(C>Q.maxTextureSize)P=Math.ceil(C/Q.maxTextureSize),C=Q.maxTextureSize;let M=new Float32Array(C*P*4*E),w=new F6(M,C,P,E);w.type=R9,w.needsUpdate=!0;let v=F*4;for(let _=0;_<E;_++){let j=R[_],p=O[_],l=D[_],c=C*P*4*_;for(let r=0;r<j.count;r++){let n=r*v;if(N===!0)W.fromBufferAttribute(j,r),M[c+n+0]=W.x,M[c+n+1]=W.y,M[c+n+2]=W.z,M[c+n+3]=0;if(k===!0)W.fromBufferAttribute(p,r),M[c+n+4]=W.x,M[c+n+5]=W.y,M[c+n+6]=W.z,M[c+n+7]=0;if(V===!0)W.fromBufferAttribute(l,r),M[c+n+8]=W.x,M[c+n+9]=W.y,M[c+n+10]=W.z,M[c+n+11]=l.itemSize===4?W.w:1}}q={count:E,texture:w,size:new i(C,P)},$.set(H,q),H.addEventListener("dispose",L)}if(X.isInstancedMesh===!0&&X.morphTexture!==null)K.getUniforms().setValue(J,"morphTexture",X.morphTexture,Z);else{let N=0;for(let V=0;V<G.length;V++)N+=G[V];let k=H.morphTargetsRelative?1:1-N;K.getUniforms().setValue(J,"morphTargetBaseInfluence",k),K.getUniforms().setValue(J,"morphTargetInfluences",G)}K.getUniforms().setValue(J,"morphTargetsTexture",q.texture,Z),K.getUniforms().setValue(J,"morphTargetsTextureSize",q.size)}return{update:Y}}function Zk(J,Q,Z,$){let W=/*@__PURE__*/new WeakMap;function Y(K){let G=$.render.frame,U=K.geometry,E=Q.get(K,U);if(W.get(E)!==G)Q.update(E),W.set(E,G);if(K.isInstancedMesh){if(K.hasEventListener("dispose",H)===!1)K.addEventListener("dispose",H);if(W.get(K)!==G){if(Z.update(K.instanceMatrix,J.ARRAY_BUFFER),K.instanceColor!==null)Z.update(K.instanceColor,J.ARRAY_BUFFER);W.set(K,G)}}if(K.isSkinnedMesh){let q=K.skeleton;if(W.get(q)!==G)q.update(),W.set(q,G)}return E}function X(){W=/*@__PURE__*/new WeakMap}function H(K){let G=K.target;if(G.removeEventListener("dispose",H),Z.remove(G.instanceMatrix),G.instanceColor!==null)Z.remove(G.instanceColor)}return{update:Y,dispose:X}}var jE=/*@__PURE__*/new R0,OE=/*@__PURE__*/new TQ(1,1),vE=/*@__PURE__*/new F6,yE=/*@__PURE__*/new N7,xE=/*@__PURE__*/new L6,RE=[],kE=[],VE=new Float32Array(16),FE=new Float32Array(9),DE=new Float32Array(4);function j7(J,Q,Z){let $=J[0];if($<=0||$>0)return J;let W=Q*Z,Y=RE[W];if(Y===void 0)Y=new Float32Array(W),RE[W]=Y;if(Q!==0){$.toArray(Y,0);for(let X=1,H=0;X!==Q;++X)H+=Z,J[X].toArray(Y,H)}return Y}function j0(J,Q){if(J.length!==Q.length)return!1;for(let Z=0,$=J.length;Z<$;Z++)if(J[Z]!==Q[Z])return!1;return!0}function v0(J,Q){for(let Z=0,$=Q.length;Z<$;Z++)J[Z]=Q[Z]}function sW(J,Q){let Z=kE[Q];if(Z===void 0)Z=new Int32Array(Q),kE[Q]=Z;for(let $=0;$!==Q;++$)Z[$]=J.allocateTextureUnit();return Z}function $k(J,Q){let Z=this.cache;if(Z[0]===Q)return;J.uniform1f(this.addr,Q),Z[0]=Q}function Wk(J,Q){let Z=this.cache;if(Q.x!==void 0){if(Z[0]!==Q.x||Z[1]!==Q.y)J.uniform2f(this.addr,Q.x,Q.y),Z[0]=Q.x,Z[1]=Q.y}else{if(j0(Z,Q))return;J.uniform2fv(this.addr,Q),v0(Z,Q)}}function Yk(J,Q){let Z=this.cache;if(Q.x!==void 0){if(Z[0]!==Q.x||Z[1]!==Q.y||Z[2]!==Q.z)J.uniform3f(this.addr,Q.x,Q.y,Q.z),Z[0]=Q.x,Z[1]=Q.y,Z[2]=Q.z}else if(Q.r!==void 0){if(Z[0]!==Q.r||Z[1]!==Q.g||Z[2]!==Q.b)J.uniform3f(this.addr,Q.r,Q.g,Q.b),Z[0]=Q.r,Z[1]=Q.g,Z[2]=Q.b}else{if(j0(Z,Q))return;J.uniform3fv(this.addr,Q),v0(Z,Q)}}function Xk(J,Q){let Z=this.cache;if(Q.x!==void 0){if(Z[0]!==Q.x||Z[1]!==Q.y||Z[2]!==Q.z||Z[3]!==Q.w)J.uniform4f(this.addr,Q.x,Q.y,Q.z,Q.w),Z[0]=Q.x,Z[1]=Q.y,Z[2]=Q.z,Z[3]=Q.w}else{if(j0(Z,Q))return;J.uniform4fv(this.addr,Q),v0(Z,Q)}}function Hk(J,Q){let Z=this.cache,$=Q.elements;if($===void 0){if(j0(Z,Q))return;J.uniformMatrix2fv(this.addr,!1,Q),v0(Z,Q)}else{if(j0(Z,$))return;DE.set($),J.uniformMatrix2fv(this.addr,!1,DE),v0(Z,$)}}function Kk(J,Q){let Z=this.cache,$=Q.elements;if($===void 0){if(j0(Z,Q))return;J.uniformMatrix3fv(this.addr,!1,Q),v0(Z,Q)}else{if(j0(Z,$))return;FE.set($),J.uniformMatrix3fv(this.addr,!1,FE),v0(Z,$)}}function Gk(J,Q){let Z=this.cache,$=Q.elements;if($===void 0){if(j0(Z,Q))return;J.uniformMatrix4fv(this.addr,!1,Q),v0(Z,Q)}else{if(j0(Z,$))return;VE.set($),J.uniformMatrix4fv(this.addr,!1,VE),v0(Z,$)}}function Uk(J,Q){let Z=this.cache;if(Z[0]===Q)return;J.uniform1i(this.addr,Q),Z[0]=Q}function Ek(J,Q){let Z=this.cache;if(Q.x!==void 0){if(Z[0]!==Q.x||Z[1]!==Q.y)J.uniform2i(this.addr,Q.x,Q.y),Z[0]=Q.x,Z[1]=Q.y}else{if(j0(Z,Q))return;J.uniform2iv(this.addr,Q),v0(Z,Q)}}function qk(J,Q){let Z=this.cache;if(Q.x!==void 0){if(Z[0]!==Q.x||Z[1]!==Q.y||Z[2]!==Q.z)J.uniform3i(this.addr,Q.x,Q.y,Q.z),Z[0]=Q.x,Z[1]=Q.y,Z[2]=Q.z}else{if(j0(Z,Q))return;J.uniform3iv(this.addr,Q),v0(Z,Q)}}function Nk(J,Q){let Z=this.cache;if(Q.x!==void 0){if(Z[0]!==Q.x||Z[1]!==Q.y||Z[2]!==Q.z||Z[3]!==Q.w)J.uniform4i(this.addr,Q.x,Q.y,Q.z,Q.w),Z[0]=Q.x,Z[1]=Q.y,Z[2]=Q.z,Z[3]=Q.w}else{if(j0(Z,Q))return;J.uniform4iv(this.addr,Q),v0(Z,Q)}}function Ok(J,Q){let Z=this.cache;if(Z[0]===Q)return;J.uniform1ui(this.addr,Q),Z[0]=Q}function Rk(J,Q){let Z=this.cache;if(Q.x!==void 0){if(Z[0]!==Q.x||Z[1]!==Q.y)J.uniform2ui(this.addr,Q.x,Q.y),Z[0]=Q.x,Z[1]=Q.y}else{if(j0(Z,Q))return;J.uniform2uiv(this.addr,Q),v0(Z,Q)}}function kk(J,Q){let Z=this.cache;if(Q.x!==void 0){if(Z[0]!==Q.x||Z[1]!==Q.y||Z[2]!==Q.z)J.uniform3ui(this.addr,Q.x,Q.y,Q.z),Z[0]=Q.x,Z[1]=Q.y,Z[2]=Q.z}else{if(j0(Z,Q))return;J.uniform3uiv(this.addr,Q),v0(Z,Q)}}function Vk(J,Q){let Z=this.cache;if(Q.x!==void 0){if(Z[0]!==Q.x||Z[1]!==Q.y||Z[2]!==Q.z||Z[3]!==Q.w)J.uniform4ui(this.addr,Q.x,Q.y,Q.z,Q.w),Z[0]=Q.x,Z[1]=Q.y,Z[2]=Q.z,Z[3]=Q.w}else{if(j0(Z,Q))return;J.uniform4uiv(this.addr,Q),v0(Z,Q)}}function Fk(J,Q,Z){let $=this.cache,W=Z.allocateTextureUnit();if($[0]!==W)J.uniform1i(this.addr,W),$[0]=W;let Y;if(this.type===J.SAMPLER_2D_SHADOW)OE.compareFunction=t$,Y=OE;else Y=jE;Z.setTexture2D(Q||Y,W)}function Dk(J,Q,Z){let $=this.cache,W=Z.allocateTextureUnit();if($[0]!==W)J.uniform1i(this.addr,W),$[0]=W;Z.setTexture3D(Q||yE,W)}function Bk(J,Q,Z){let $=this.cache,W=Z.allocateTextureUnit();if($[0]!==W)J.uniform1i(this.addr,W),$[0]=W;Z.setTextureCube(Q||xE,W)}function Lk(J,Q,Z){let $=this.cache,W=Z.allocateTextureUnit();if($[0]!==W)J.uniform1i(this.addr,W),$[0]=W;Z.setTexture2DArray(Q||vE,W)}function zk(J){switch(J){case 5126:return $k;case 35664:return Wk;case 35665:return Yk;case 35666:return Xk;case 35674:return Hk;case 35675:return Kk;case 35676:return Gk;case 5124:case 35670:return Uk;case 35667:case 35671:return Ek;case 35668:case 35672:return qk;case 35669:case 35673:return Nk;case 5125:return Ok;case 36294:return Rk;case 36295:return kk;case 36296:return Vk;case 35678:case 36198:case 36298:case 36306:case 35682:return Fk;case 35679:case 36299:case 36307:return Dk;case 35680:case 36300:case 36308:case 36293:return Bk;case 36289:case 36303:case 36311:case 36292:return Lk}}function Ck(J,Q){J.uniform1fv(this.addr,Q)}function _k(J,Q){let Z=j7(Q,this.size,2);J.uniform2fv(this.addr,Z)}function Mk(J,Q){let Z=j7(Q,this.size,3);J.uniform3fv(this.addr,Z)}function Ik(J,Q){let Z=j7(Q,this.size,4);J.uniform4fv(this.addr,Z)}function wk(J,Q){let Z=j7(Q,this.size,4);J.uniformMatrix2fv(this.addr,!1,Z)}function Ak(J,Q){let Z=j7(Q,this.size,9);J.uniformMatrix3fv(this.addr,!1,Z)}function Pk(J,Q){let Z=j7(Q,this.size,16);J.uniformMatrix4fv(this.addr,!1,Z)}function Tk(J,Q){J.uniform1iv(this.addr,Q)}function Sk(J,Q){J.uniform2iv(this.addr,Q)}function jk(J,Q){J.uniform3iv(this.addr,Q)}function vk(J,Q){J.uniform4iv(this.addr,Q)}function yk(J,Q){J.uniform1uiv(this.addr,Q)}function xk(J,Q){J.uniform2uiv(this.addr,Q)}function bk(J,Q){J.uniform3uiv(this.addr,Q)}function hk(J,Q){J.uniform4uiv(this.addr,Q)}function fk(J,Q,Z){let $=this.cache,W=Q.length,Y=sW(Z,W);if(!j0($,Y))J.uniform1iv(this.addr,Y),v0($,Y);for(let X=0;X!==W;++X)Z.setTexture2D(Q[X]||jE,Y[X])}function gk(J,Q,Z){let $=this.cache,W=Q.length,Y=sW(Z,W);if(!j0($,Y))J.uniform1iv(this.addr,Y),v0($,Y);for(let X=0;X!==W;++X)Z.setTexture3D(Q[X]||yE,Y[X])}function pk(J,Q,Z){let $=this.cache,W=Q.length,Y=sW(Z,W);if(!j0($,Y))J.uniform1iv(this.addr,Y),v0($,Y);for(let X=0;X!==W;++X)Z.setTextureCube(Q[X]||xE,Y[X])}function mk(J,Q,Z){let $=this.cache,W=Q.length,Y=sW(Z,W);if(!j0($,Y))J.uniform1iv(this.addr,Y),v0($,Y);for(let X=0;X!==W;++X)Z.setTexture2DArray(Q[X]||vE,Y[X])}function lk(J){switch(J){case 5126:return Ck;case 35664:return _k;case 35665:return Mk;case 35666:return Ik;case 35674:return wk;case 35675:return Ak;case 35676:return Pk;case 5124:case 35670:return Tk;case 35667:case 35671:return Sk;case 35668:case 35672:return jk;case 35669:case 35673:return vk;case 5125:return yk;case 36294:return xk;case 36295:return bk;case 36296:return hk;case 35678:case 36198:case 36298:case 36306:case 35682:return fk;case 35679:case 36299:case 36307:return gk;case 35680:case 36300:case 36308:case 36293:return pk;case 36289:case 36303:case 36311:case 36292:return mk}}class bE{constructor(J,Q,Z){this.id=J,this.addr=Z,this.cache=[],this.type=Q.type,this.setValue=zk(Q.type)}}class hE{constructor(J,Q,Z){this.id=J,this.addr=Z,this.cache=[],this.type=Q.type,this.size=Q.size,this.setValue=lk(Q.type)}}class fE{constructor(J){this.id=J,this.seq=[],this.map={}}setValue(J,Q,Z){let $=this.seq;for(let W=0,Y=$.length;W!==Y;++W){let X=$[W];X.setValue(J,Q[X.id],Z)}}}var sH=/(\w+)(\])?(\[|\.)?/g;function BE(J,Q){J.seq.push(Q),J.map[Q.id]=Q}function uk(J,Q,Z){let $=J.name,W=$.length;sH.lastIndex=0;while(!0){let Y=sH.exec($),X=sH.lastIndex,H=Y[1],K=Y[2]==="]",G=Y[3];if(K)H=H|0;if(G===void 0||G==="["&&X+2===W){BE(Z,G===void 0?new bE(H,J,Q):new hE(H,J,Q));break}else{let E=Z.map[H];if(E===void 0)E=new fE(H),BE(Z,E);Z=E}}}class YZ{constructor(J,Q){this.seq=[],this.map={};let Z=J.getProgramParameter(Q,J.ACTIVE_UNIFORMS);for(let $=0;$<Z;++$){let W=J.getActiveUniform(Q,$),Y=J.getUniformLocation(Q,W.name);uk(W,Y,this)}}setValue(J,Q,Z,$){let W=this.map[Q];if(W!==void 0)W.setValue(J,Z,$)}setOptional(J,Q,Z){let $=Q[Z];if($!==void 0)this.setValue(J,Z,$)}static upload(J,Q,Z,$){for(let W=0,Y=Q.length;W!==Y;++W){let X=Q[W],H=Z[X.id];if(H.needsUpdate!==!1)X.setValue(J,H.value,$)}}static seqWithValue(J,Q){let Z=[];for(let $=0,W=J.length;$!==W;++$){let Y=J[$];if(Y.id in Q)Z.push(Y)}return Z}}function LE(J,Q,Z){let $=J.createShader(Q);return J.shaderSource($,Z),J.compileShader($),$}var dk=37297,ck=0;function nk(J,Q){let Z=J.split(`
`),$=[],W=Math.max(Q-6,0),Y=Math.min(Q+6,Z.length);for(let X=W;X<Y;X++){let H=X+1;$.push(`${H===Q?">":" "} ${H}: ${Z[X]}`)}return $.join(`
`)}var zE=/*@__PURE__*/new nJ;function sk(J){aJ._getMatrix(zE,aJ.workingColorSpace,J);let Q=`mat3( ${zE.elements.map((Z)=>Z.toFixed(4))} )`;switch(aJ.getTransfer(J)){case r$:return[Q,"LinearTransferOETF"];case q0:return[Q,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",J),[Q,"LinearTransferOETF"]}}function CE(J,Q,Z){let $=J.getShaderParameter(Q,J.COMPILE_STATUS),W=J.getShaderInfoLog(Q).trim();if($&&W==="")return"";let Y=/ERROR: 0:(\d+)/.exec(W);if(Y){let X=parseInt(Y[1]);return Z.toUpperCase()+`

`+W+`

`+nk(J.getShaderSource(Q),X)}else return W}function ik(J,Q){let Z=sk(Q);return[`vec4 ${J}( vec4 value ) {`,`	return ${Z[1]}( vec4( value.rgb * ${Z[0]}, value.a ) );`,"}"].join(`
`)}function ok(J,Q){let Z;switch(Q){case RX:Z="Linear";break;case kX:Z="Reinhard";break;case VX:Z="Cineon";break;case FX:Z="ACESFilmic";break;case BX:Z="AgX";break;case LX:Z="Neutral";break;case DX:Z="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",Q),Z="Linear"}return"vec3 "+J+"( vec3 color ) { return "+Z+"ToneMapping( color ); }"}var cW=/*@__PURE__*/new I;function ak(){aJ.getLuminanceCoefficients(cW);let J=cW.x.toFixed(4),Q=cW.y.toFixed(4),Z=cW.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${J}, ${Q}, ${Z} );`,"\treturn dot( weights, rgb );","}"].join(`
`)}function rk(J){return[J.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",J.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(WZ).join(`
`)}function tk(J){let Q=[];for(let Z in J){let $=J[Z];if($===!1)continue;Q.push("#define "+Z+" "+$)}return Q.join(`
`)}function ek(J,Q){let Z={},$=J.getProgramParameter(Q,J.ACTIVE_ATTRIBUTES);for(let W=0;W<$;W++){let Y=J.getActiveAttrib(Q,W),X=Y.name,H=1;if(Y.type===J.FLOAT_MAT2)H=2;if(Y.type===J.FLOAT_MAT3)H=3;if(Y.type===J.FLOAT_MAT4)H=4;Z[X]={type:Y.type,location:J.getAttribLocation(Q,X),locationSize:H}}return Z}function WZ(J){return J!==""}function _E(J,Q){let Z=Q.numSpotLightShadows+Q.numSpotLightMaps-Q.numSpotLightShadowsWithMaps;return J.replace(/NUM_DIR_LIGHTS/g,Q.numDirLights).replace(/NUM_SPOT_LIGHTS/g,Q.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,Q.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,Z).replace(/NUM_RECT_AREA_LIGHTS/g,Q.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,Q.numPointLights).replace(/NUM_HEMI_LIGHTS/g,Q.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,Q.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,Q.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,Q.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,Q.numPointLightShadows)}function ME(J,Q){return J.replace(/NUM_CLIPPING_PLANES/g,Q.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,Q.numClippingPlanes-Q.numClipIntersection)}var JV=/^[ \t]*#include +<([\w\d./]+)>/gm;function iH(J){return J.replace(JV,ZV)}var QV=/*@__PURE__*/new Map;function ZV(J,Q){let Z=rJ[Q];if(Z===void 0){let $=QV.get(Q);if($!==void 0)Z=rJ[$],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',Q,$);else throw Error("Can not resolve #include <"+Q+">")}return iH(Z)}var $V=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function IE(J){return J.replace($V,WV)}function WV(J,Q,Z,$){let W="";for(let Y=parseInt(Q);Y<parseInt(Z);Y++)W+=$.replace(/\[\s*i\s*\]/g,"[ "+Y+" ]").replace(/UNROLLED_LOOP_INDEX/g,Y);return W}function wE(J){let Q=`precision ${J.precision} float;
	precision ${J.precision} int;
	precision ${J.precision} sampler2D;
	precision ${J.precision} samplerCube;
	precision ${J.precision} sampler3D;
	precision ${J.precision} sampler2DArray;
	precision ${J.precision} sampler2DShadow;
	precision ${J.precision} samplerCubeShadow;
	precision ${J.precision} sampler2DArrayShadow;
	precision ${J.precision} isampler2D;
	precision ${J.precision} isampler3D;
	precision ${J.precision} isamplerCube;
	precision ${J.precision} isampler2DArray;
	precision ${J.precision} usampler2D;
	precision ${J.precision} usampler3D;
	precision ${J.precision} usamplerCube;
	precision ${J.precision} usampler2DArray;
	`;if(J.precision==="highp")Q+=`
#define HIGH_PRECISION`;else if(J.precision==="mediump")Q+=`
#define MEDIUM_PRECISION`;else if(J.precision==="lowp")Q+=`
#define LOW_PRECISION`;return Q}function YV(J){let Q="SHADOWMAP_TYPE_BASIC";if(J.shadowMapType===N$)Q="SHADOWMAP_TYPE_PCF";else if(J.shadowMapType===rY)Q="SHADOWMAP_TYPE_PCF_SOFT";else if(J.shadowMapType===h8)Q="SHADOWMAP_TYPE_VSM";return Q}function XV(J){let Q="ENVMAP_TYPE_CUBE";if(J.envMap)switch(J.envMapMode){case G6:case v9:Q="ENVMAP_TYPE_CUBE";break;case H7:Q="ENVMAP_TYPE_CUBE_UV";break}return Q}function HV(J){let Q="ENVMAP_MODE_REFLECTION";if(J.envMap)switch(J.envMapMode){case v9:Q="ENVMAP_MODE_REFRACTION";break}return Q}function KV(J){let Q="ENVMAP_BLENDING_NONE";if(J.envMap)switch(J.combine){case qX:Q="ENVMAP_BLENDING_MULTIPLY";break;case NX:Q="ENVMAP_BLENDING_MIX";break;case OX:Q="ENVMAP_BLENDING_ADD";break}return Q}function GV(J){let Q=J.envMapCubeUVHeight;if(Q===null)return null;let Z=Math.log2(Q)-2,$=1/Q;return{texelWidth:1/(3*Math.max(Math.pow(2,Z),112)),texelHeight:$,maxMip:Z}}function UV(J,Q,Z,$){let W=J.getContext(),Y=Z.defines,X=Z.vertexShader,H=Z.fragmentShader,K=YV(Z),G=XV(Z),U=HV(Z),E=KV(Z),q=GV(Z),N=rk(Z),k=tk(Y),V=W.createProgram(),R,O,D=Z.glslVersion?"#version "+Z.glslVersion+`
`:"";if(Z.isRawShaderMaterial){if(R=["#define SHADER_TYPE "+Z.shaderType,"#define SHADER_NAME "+Z.shaderName,k].filter(WZ).join(`
`),R.length>0)R+=`
`;if(O=["#define SHADER_TYPE "+Z.shaderType,"#define SHADER_NAME "+Z.shaderName,k].filter(WZ).join(`
`),O.length>0)O+=`
`}else R=[wE(Z),"#define SHADER_TYPE "+Z.shaderType,"#define SHADER_NAME "+Z.shaderName,k,Z.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",Z.batching?"#define USE_BATCHING":"",Z.batchingColor?"#define USE_BATCHING_COLOR":"",Z.instancing?"#define USE_INSTANCING":"",Z.instancingColor?"#define USE_INSTANCING_COLOR":"",Z.instancingMorph?"#define USE_INSTANCING_MORPH":"",Z.useFog&&Z.fog?"#define USE_FOG":"",Z.useFog&&Z.fogExp2?"#define FOG_EXP2":"",Z.map?"#define USE_MAP":"",Z.envMap?"#define USE_ENVMAP":"",Z.envMap?"#define "+U:"",Z.lightMap?"#define USE_LIGHTMAP":"",Z.aoMap?"#define USE_AOMAP":"",Z.bumpMap?"#define USE_BUMPMAP":"",Z.normalMap?"#define USE_NORMALMAP":"",Z.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",Z.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",Z.displacementMap?"#define USE_DISPLACEMENTMAP":"",Z.emissiveMap?"#define USE_EMISSIVEMAP":"",Z.anisotropy?"#define USE_ANISOTROPY":"",Z.anisotropyMap?"#define USE_ANISOTROPYMAP":"",Z.clearcoatMap?"#define USE_CLEARCOATMAP":"",Z.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",Z.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",Z.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",Z.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",Z.specularMap?"#define USE_SPECULARMAP":"",Z.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",Z.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",Z.roughnessMap?"#define USE_ROUGHNESSMAP":"",Z.metalnessMap?"#define USE_METALNESSMAP":"",Z.alphaMap?"#define USE_ALPHAMAP":"",Z.alphaHash?"#define USE_ALPHAHASH":"",Z.transmission?"#define USE_TRANSMISSION":"",Z.transmissionMap?"#define USE_TRANSMISSIONMAP":"",Z.thicknessMap?"#define USE_THICKNESSMAP":"",Z.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",Z.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",Z.mapUv?"#define MAP_UV "+Z.mapUv:"",Z.alphaMapUv?"#define ALPHAMAP_UV "+Z.alphaMapUv:"",Z.lightMapUv?"#define LIGHTMAP_UV "+Z.lightMapUv:"",Z.aoMapUv?"#define AOMAP_UV "+Z.aoMapUv:"",Z.emissiveMapUv?"#define EMISSIVEMAP_UV "+Z.emissiveMapUv:"",Z.bumpMapUv?"#define BUMPMAP_UV "+Z.bumpMapUv:"",Z.normalMapUv?"#define NORMALMAP_UV "+Z.normalMapUv:"",Z.displacementMapUv?"#define DISPLACEMENTMAP_UV "+Z.displacementMapUv:"",Z.metalnessMapUv?"#define METALNESSMAP_UV "+Z.metalnessMapUv:"",Z.roughnessMapUv?"#define ROUGHNESSMAP_UV "+Z.roughnessMapUv:"",Z.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+Z.anisotropyMapUv:"",Z.clearcoatMapUv?"#define CLEARCOATMAP_UV "+Z.clearcoatMapUv:"",Z.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+Z.clearcoatNormalMapUv:"",Z.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+Z.clearcoatRoughnessMapUv:"",Z.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+Z.iridescenceMapUv:"",Z.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+Z.iridescenceThicknessMapUv:"",Z.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+Z.sheenColorMapUv:"",Z.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+Z.sheenRoughnessMapUv:"",Z.specularMapUv?"#define SPECULARMAP_UV "+Z.specularMapUv:"",Z.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+Z.specularColorMapUv:"",Z.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+Z.specularIntensityMapUv:"",Z.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+Z.transmissionMapUv:"",Z.thicknessMapUv?"#define THICKNESSMAP_UV "+Z.thicknessMapUv:"",Z.vertexTangents&&Z.flatShading===!1?"#define USE_TANGENT":"",Z.vertexColors?"#define USE_COLOR":"",Z.vertexAlphas?"#define USE_COLOR_ALPHA":"",Z.vertexUv1s?"#define USE_UV1":"",Z.vertexUv2s?"#define USE_UV2":"",Z.vertexUv3s?"#define USE_UV3":"",Z.pointsUvs?"#define USE_POINTS_UV":"",Z.flatShading?"#define FLAT_SHADED":"",Z.skinning?"#define USE_SKINNING":"",Z.morphTargets?"#define USE_MORPHTARGETS":"",Z.morphNormals&&Z.flatShading===!1?"#define USE_MORPHNORMALS":"",Z.morphColors?"#define USE_MORPHCOLORS":"",Z.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+Z.morphTextureStride:"",Z.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+Z.morphTargetsCount:"",Z.doubleSided?"#define DOUBLE_SIDED":"",Z.flipSided?"#define FLIP_SIDED":"",Z.shadowMapEnabled?"#define USE_SHADOWMAP":"",Z.shadowMapEnabled?"#define "+K:"",Z.sizeAttenuation?"#define USE_SIZEATTENUATION":"",Z.numLightProbes>0?"#define USE_LIGHT_PROBES":"",Z.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",Z.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","\tattribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","\tattribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","\tuniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","\tattribute vec2 uv1;","#endif","#ifdef USE_UV2","\tattribute vec2 uv2;","#endif","#ifdef USE_UV3","\tattribute vec2 uv3;","#endif","#ifdef USE_TANGENT","\tattribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","\tattribute vec4 color;","#elif defined( USE_COLOR )","\tattribute vec3 color;","#endif","#ifdef USE_SKINNING","\tattribute vec4 skinIndex;","\tattribute vec4 skinWeight;","#endif",`
`].filter(WZ).join(`
`),O=[wE(Z),"#define SHADER_TYPE "+Z.shaderType,"#define SHADER_NAME "+Z.shaderName,k,Z.useFog&&Z.fog?"#define USE_FOG":"",Z.useFog&&Z.fogExp2?"#define FOG_EXP2":"",Z.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",Z.map?"#define USE_MAP":"",Z.matcap?"#define USE_MATCAP":"",Z.envMap?"#define USE_ENVMAP":"",Z.envMap?"#define "+G:"",Z.envMap?"#define "+U:"",Z.envMap?"#define "+E:"",q?"#define CUBEUV_TEXEL_WIDTH "+q.texelWidth:"",q?"#define CUBEUV_TEXEL_HEIGHT "+q.texelHeight:"",q?"#define CUBEUV_MAX_MIP "+q.maxMip+".0":"",Z.lightMap?"#define USE_LIGHTMAP":"",Z.aoMap?"#define USE_AOMAP":"",Z.bumpMap?"#define USE_BUMPMAP":"",Z.normalMap?"#define USE_NORMALMAP":"",Z.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",Z.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",Z.emissiveMap?"#define USE_EMISSIVEMAP":"",Z.anisotropy?"#define USE_ANISOTROPY":"",Z.anisotropyMap?"#define USE_ANISOTROPYMAP":"",Z.clearcoat?"#define USE_CLEARCOAT":"",Z.clearcoatMap?"#define USE_CLEARCOATMAP":"",Z.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",Z.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",Z.dispersion?"#define USE_DISPERSION":"",Z.iridescence?"#define USE_IRIDESCENCE":"",Z.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",Z.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",Z.specularMap?"#define USE_SPECULARMAP":"",Z.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",Z.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",Z.roughnessMap?"#define USE_ROUGHNESSMAP":"",Z.metalnessMap?"#define USE_METALNESSMAP":"",Z.alphaMap?"#define USE_ALPHAMAP":"",Z.alphaTest?"#define USE_ALPHATEST":"",Z.alphaHash?"#define USE_ALPHAHASH":"",Z.sheen?"#define USE_SHEEN":"",Z.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",Z.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",Z.transmission?"#define USE_TRANSMISSION":"",Z.transmissionMap?"#define USE_TRANSMISSIONMAP":"",Z.thicknessMap?"#define USE_THICKNESSMAP":"",Z.vertexTangents&&Z.flatShading===!1?"#define USE_TANGENT":"",Z.vertexColors||Z.instancingColor||Z.batchingColor?"#define USE_COLOR":"",Z.vertexAlphas?"#define USE_COLOR_ALPHA":"",Z.vertexUv1s?"#define USE_UV1":"",Z.vertexUv2s?"#define USE_UV2":"",Z.vertexUv3s?"#define USE_UV3":"",Z.pointsUvs?"#define USE_POINTS_UV":"",Z.gradientMap?"#define USE_GRADIENTMAP":"",Z.flatShading?"#define FLAT_SHADED":"",Z.doubleSided?"#define DOUBLE_SIDED":"",Z.flipSided?"#define FLIP_SIDED":"",Z.shadowMapEnabled?"#define USE_SHADOWMAP":"",Z.shadowMapEnabled?"#define "+K:"",Z.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",Z.numLightProbes>0?"#define USE_LIGHT_PROBES":"",Z.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",Z.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",Z.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",Z.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",Z.toneMapping!==n8?"#define TONE_MAPPING":"",Z.toneMapping!==n8?rJ.tonemapping_pars_fragment:"",Z.toneMapping!==n8?ok("toneMapping",Z.toneMapping):"",Z.dithering?"#define DITHERING":"",Z.opaque?"#define OPAQUE":"",rJ.colorspace_pars_fragment,ik("linearToOutputTexel",Z.outputColorSpace),ak(),Z.useDepthPacking?"#define DEPTH_PACKING "+Z.depthPacking:"",`
`].filter(WZ).join(`
`);if(X=iH(X),X=_E(X,Z),X=ME(X,Z),H=iH(H),H=_E(H,Z),H=ME(H,Z),X=IE(X),H=IE(H),Z.isRawShaderMaterial!==!0)D=`#version 300 es
`,R=[N,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+R,O=["#define varying in",Z.glslVersion===e$?"":"layout(location = 0) out highp vec4 pc_fragColor;",Z.glslVersion===e$?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+O;let F=D+R+X,C=D+O+H,P=LE(W,W.VERTEX_SHADER,F),M=LE(W,W.FRAGMENT_SHADER,C);if(W.attachShader(V,P),W.attachShader(V,M),Z.index0AttributeName!==void 0)W.bindAttribLocation(V,0,Z.index0AttributeName);else if(Z.morphTargets===!0)W.bindAttribLocation(V,0,"position");W.linkProgram(V);function w(j){if(J.debug.checkShaderErrors){let p=W.getProgramInfoLog(V).trim(),l=W.getShaderInfoLog(P).trim(),c=W.getShaderInfoLog(M).trim(),r=!0,n=!0;if(W.getProgramParameter(V,W.LINK_STATUS)===!1)if(r=!1,typeof J.debug.onShaderError==="function")J.debug.onShaderError(W,V,P,M);else{let WJ=CE(W,P,"vertex"),d=CE(W,M,"fragment");console.error("THREE.WebGLProgram: Shader Error "+W.getError()+" - VALIDATE_STATUS "+W.getProgramParameter(V,W.VALIDATE_STATUS)+`

Material Name: `+j.name+`
Material Type: `+j.type+`

Program Info Log: `+p+`
`+WJ+`
`+d)}else if(p!=="")console.warn("THREE.WebGLProgram: Program Info Log:",p);else if(l===""||c==="")n=!1;if(n)j.diagnostics={runnable:r,programLog:p,vertexShader:{log:l,prefix:R},fragmentShader:{log:c,prefix:O}}}W.deleteShader(P),W.deleteShader(M),v=new YZ(W,V),L=ek(W,V)}let v;this.getUniforms=function(){if(v===void 0)w(this);return v};let L;this.getAttributes=function(){if(L===void 0)w(this);return L};let _=Z.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){if(_===!1)_=W.getProgramParameter(V,dk);return _},this.destroy=function(){$.releaseStatesOfProgram(this),W.deleteProgram(V),this.program=void 0},this.type=Z.shaderType,this.name=Z.shaderName,this.id=ck++,this.cacheKey=Q,this.usedTimes=1,this.program=V,this.vertexShader=P,this.fragmentShader=M,this}var EV=0;class gE{constructor(){this.shaderCache=/*@__PURE__*/new Map,this.materialCache=/*@__PURE__*/new Map}update(J){let{vertexShader:Q,fragmentShader:Z}=J,$=this._getShaderStage(Q),W=this._getShaderStage(Z),Y=this._getShaderCacheForMaterial(J);if(Y.has($)===!1)Y.add($),$.usedTimes++;if(Y.has(W)===!1)Y.add(W),W.usedTimes++;return this}remove(J){let Q=this.materialCache.get(J);for(let Z of Q)if(Z.usedTimes--,Z.usedTimes===0)this.shaderCache.delete(Z.code);return this.materialCache.delete(J),this}getVertexShaderID(J){return this._getShaderStage(J.vertexShader).id}getFragmentShaderID(J){return this._getShaderStage(J.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(J){let Q=this.materialCache,Z=Q.get(J);if(Z===void 0)Z=/*@__PURE__*/new Set,Q.set(J,Z);return Z}_getShaderStage(J){let Q=this.shaderCache,Z=Q.get(J);if(Z===void 0)Z=new pE(J),Q.set(J,Z);return Z}}class pE{constructor(J){this.id=EV++,this.code=J,this.usedTimes=0}}function qV(J,Q,Z,$,W,Y,X){let H=new O7,K=new gE,G=/*@__PURE__*/new Set,U=[],E=W.logarithmicDepthBuffer,q=W.vertexTextures,N=W.precision,k={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function V(L){if(G.add(L),L===0)return"uv";return`uv${L}`}function R(L,_,j,p,l){let c=p.fog,r=l.geometry,n=L.isMeshStandardMaterial?p.environment:null,WJ=(L.isMeshStandardMaterial?Z:Q).get(L.envMap||n),d=!!WJ&&WJ.mapping===H7?WJ.image.height:null,RJ=k[L.type];if(L.precision!==null){if(N=W.getMaxPrecision(L.precision),N!==L.precision)console.warn("THREE.WebGLProgram.getParameters:",L.precision,"not supported, using",N,"instead.")}let NJ=r.morphAttributes.position||r.morphAttributes.normal||r.morphAttributes.color,hJ=NJ!==void 0?NJ.length:0,eJ=0;if(r.morphAttributes.position!==void 0)eJ=1;if(r.morphAttributes.normal!==void 0)eJ=2;if(r.morphAttributes.color!==void 0)eJ=3;let o,UJ,TJ,wJ;if(RJ){let G0=p8[RJ];o=G0.vertexShader,UJ=G0.fragmentShader}else o=L.vertexShader,UJ=L.fragmentShader,K.update(L),TJ=K.getVertexShaderID(L),wJ=K.getFragmentShaderID(L);let EJ=J.getRenderTarget(),Q0=J.state.buffers.depth.getReversed(),fJ=l.isInstancedMesh===!0,sJ=l.isBatchedMesh===!0,$J=!!L.map,QJ=!!L.matcap,A=!!WJ,IJ=!!L.aoMap,KJ=!!L.lightMap,PJ=!!L.bumpMap,ZJ=!!L.normalMap,pJ=!!L.displacementMap,VJ=!!L.emissiveMap,AJ=!!L.metalnessMap,S=!!L.roughnessMap,B=L.anisotropy>0,h=L.clearcoat>0,t=L.dispersion>0,JJ=L.iridescence>0,s=L.sheen>0,vJ=L.transmission>0,OJ=B&&!!L.anisotropyMap,BJ=h&&!!L.clearcoatMap,uJ=h&&!!L.clearcoatNormalMap,GJ=h&&!!L.clearcoatRoughnessMap,LJ=JJ&&!!L.iridescenceMap,Z0=JJ&&!!L.iridescenceThicknessMap,mJ=s&&!!L.sheenColorMap,_J=s&&!!L.sheenRoughnessMap,oJ=!!L.specularMap,J0=!!L.specularColorMap,V0=!!L.specularIntensityMap,y=vJ&&!!L.transmissionMap,HJ=vJ&&!!L.thicknessMap,a=!!L.gradientMap,e=!!L.alphaMap,DJ=L.alphaTest>0,FJ=!!L.alphaHash,tJ=!!L.extensions,D0=n8;if(L.toneMapped){if(EJ===null||EJ.isXRRenderTarget===!0)D0=J.toneMapping}let f0={shaderID:RJ,shaderType:L.type,shaderName:L.name,vertexShader:o,fragmentShader:UJ,defines:L.defines,customVertexShaderID:TJ,customFragmentShaderID:wJ,isRawShaderMaterial:L.isRawShaderMaterial===!0,glslVersion:L.glslVersion,precision:N,batching:sJ,batchingColor:sJ&&l._colorsTexture!==null,instancing:fJ,instancingColor:fJ&&l.instanceColor!==null,instancingMorph:fJ&&l.morphTexture!==null,supportsVertexTextures:q,outputColorSpace:EJ===null?J.outputColorSpace:EJ.isXRRenderTarget===!0?EJ.texture.colorSpace:x0,alphaToCoverage:!!L.alphaToCoverage,map:$J,matcap:QJ,envMap:A,envMapMode:A&&WJ.mapping,envMapCubeUVHeight:d,aoMap:IJ,lightMap:KJ,bumpMap:PJ,normalMap:ZJ,displacementMap:q&&pJ,emissiveMap:VJ,normalMapObjectSpace:ZJ&&L.normalMapType===TX,normalMapTangentSpace:ZJ&&L.normalMapType===PX,metalnessMap:AJ,roughnessMap:S,anisotropy:B,anisotropyMap:OJ,clearcoat:h,clearcoatMap:BJ,clearcoatNormalMap:uJ,clearcoatRoughnessMap:GJ,dispersion:t,iridescence:JJ,iridescenceMap:LJ,iridescenceThicknessMap:Z0,sheen:s,sheenColorMap:mJ,sheenRoughnessMap:_J,specularMap:oJ,specularColorMap:J0,specularIntensityMap:V0,transmission:vJ,transmissionMap:y,thicknessMap:HJ,gradientMap:a,opaque:L.transparent===!1&&L.blending===Y7&&L.alphaToCoverage===!1,alphaMap:e,alphaTest:DJ,alphaHash:FJ,combine:L.combine,mapUv:$J&&V(L.map.channel),aoMapUv:IJ&&V(L.aoMap.channel),lightMapUv:KJ&&V(L.lightMap.channel),bumpMapUv:PJ&&V(L.bumpMap.channel),normalMapUv:ZJ&&V(L.normalMap.channel),displacementMapUv:pJ&&V(L.displacementMap.channel),emissiveMapUv:VJ&&V(L.emissiveMap.channel),metalnessMapUv:AJ&&V(L.metalnessMap.channel),roughnessMapUv:S&&V(L.roughnessMap.channel),anisotropyMapUv:OJ&&V(L.anisotropyMap.channel),clearcoatMapUv:BJ&&V(L.clearcoatMap.channel),clearcoatNormalMapUv:uJ&&V(L.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:GJ&&V(L.clearcoatRoughnessMap.channel),iridescenceMapUv:LJ&&V(L.iridescenceMap.channel),iridescenceThicknessMapUv:Z0&&V(L.iridescenceThicknessMap.channel),sheenColorMapUv:mJ&&V(L.sheenColorMap.channel),sheenRoughnessMapUv:_J&&V(L.sheenRoughnessMap.channel),specularMapUv:oJ&&V(L.specularMap.channel),specularColorMapUv:J0&&V(L.specularColorMap.channel),specularIntensityMapUv:V0&&V(L.specularIntensityMap.channel),transmissionMapUv:y&&V(L.transmissionMap.channel),thicknessMapUv:HJ&&V(L.thicknessMap.channel),alphaMapUv:e&&V(L.alphaMap.channel),vertexTangents:!!r.attributes.tangent&&(ZJ||B),vertexColors:L.vertexColors,vertexAlphas:L.vertexColors===!0&&!!r.attributes.color&&r.attributes.color.itemSize===4,pointsUvs:l.isPoints===!0&&!!r.attributes.uv&&($J||e),fog:!!c,useFog:L.fog===!0,fogExp2:!!c&&c.isFogExp2,flatShading:L.flatShading===!0,sizeAttenuation:L.sizeAttenuation===!0,logarithmicDepthBuffer:E,reverseDepthBuffer:Q0,skinning:l.isSkinnedMesh===!0,morphTargets:r.morphAttributes.position!==void 0,morphNormals:r.morphAttributes.normal!==void 0,morphColors:r.morphAttributes.color!==void 0,morphTargetsCount:hJ,morphTextureStride:eJ,numDirLights:_.directional.length,numPointLights:_.point.length,numSpotLights:_.spot.length,numSpotLightMaps:_.spotLightMap.length,numRectAreaLights:_.rectArea.length,numHemiLights:_.hemi.length,numDirLightShadows:_.directionalShadowMap.length,numPointLightShadows:_.pointShadowMap.length,numSpotLightShadows:_.spotShadowMap.length,numSpotLightShadowsWithMaps:_.numSpotLightShadowsWithMaps,numLightProbes:_.numLightProbes,numClippingPlanes:X.numPlanes,numClipIntersection:X.numIntersection,dithering:L.dithering,shadowMapEnabled:J.shadowMap.enabled&&j.length>0,shadowMapType:J.shadowMap.type,toneMapping:D0,decodeVideoTexture:$J&&L.map.isVideoTexture===!0&&aJ.getTransfer(L.map.colorSpace)===q0,decodeVideoTextureEmissive:VJ&&L.emissiveMap.isVideoTexture===!0&&aJ.getTransfer(L.emissiveMap.colorSpace)===q0,premultipliedAlpha:L.premultipliedAlpha,doubleSided:L.side===T0,flipSided:L.side===n0,useDepthPacking:L.depthPacking>=0,depthPacking:L.depthPacking||0,index0AttributeName:L.index0AttributeName,extensionClipCullDistance:tJ&&L.extensions.clipCullDistance===!0&&$.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(tJ&&L.extensions.multiDraw===!0||sJ)&&$.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:$.has("KHR_parallel_shader_compile"),customProgramCacheKey:L.customProgramCacheKey()};return f0.vertexUv1s=G.has(1),f0.vertexUv2s=G.has(2),f0.vertexUv3s=G.has(3),G.clear(),f0}function O(L){let _=[];if(L.shaderID)_.push(L.shaderID);else _.push(L.customVertexShaderID),_.push(L.customFragmentShaderID);if(L.defines!==void 0)for(let j in L.defines)_.push(j),_.push(L.defines[j]);if(L.isRawShaderMaterial===!1)D(_,L),F(_,L),_.push(J.outputColorSpace);return _.push(L.customProgramCacheKey),_.join()}function D(L,_){L.push(_.precision),L.push(_.outputColorSpace),L.push(_.envMapMode),L.push(_.envMapCubeUVHeight),L.push(_.mapUv),L.push(_.alphaMapUv),L.push(_.lightMapUv),L.push(_.aoMapUv),L.push(_.bumpMapUv),L.push(_.normalMapUv),L.push(_.displacementMapUv),L.push(_.emissiveMapUv),L.push(_.metalnessMapUv),L.push(_.roughnessMapUv),L.push(_.anisotropyMapUv),L.push(_.clearcoatMapUv),L.push(_.clearcoatNormalMapUv),L.push(_.clearcoatRoughnessMapUv),L.push(_.iridescenceMapUv),L.push(_.iridescenceThicknessMapUv),L.push(_.sheenColorMapUv),L.push(_.sheenRoughnessMapUv),L.push(_.specularMapUv),L.push(_.specularColorMapUv),L.push(_.specularIntensityMapUv),L.push(_.transmissionMapUv),L.push(_.thicknessMapUv),L.push(_.combine),L.push(_.fogExp2),L.push(_.sizeAttenuation),L.push(_.morphTargetsCount),L.push(_.morphAttributeCount),L.push(_.numDirLights),L.push(_.numPointLights),L.push(_.numSpotLights),L.push(_.numSpotLightMaps),L.push(_.numHemiLights),L.push(_.numRectAreaLights),L.push(_.numDirLightShadows),L.push(_.numPointLightShadows),L.push(_.numSpotLightShadows),L.push(_.numSpotLightShadowsWithMaps),L.push(_.numLightProbes),L.push(_.shadowMapType),L.push(_.toneMapping),L.push(_.numClippingPlanes),L.push(_.numClipIntersection),L.push(_.depthPacking)}function F(L,_){if(H.disableAll(),_.supportsVertexTextures)H.enable(0);if(_.instancing)H.enable(1);if(_.instancingColor)H.enable(2);if(_.instancingMorph)H.enable(3);if(_.matcap)H.enable(4);if(_.envMap)H.enable(5);if(_.normalMapObjectSpace)H.enable(6);if(_.normalMapTangentSpace)H.enable(7);if(_.clearcoat)H.enable(8);if(_.iridescence)H.enable(9);if(_.alphaTest)H.enable(10);if(_.vertexColors)H.enable(11);if(_.vertexAlphas)H.enable(12);if(_.vertexUv1s)H.enable(13);if(_.vertexUv2s)H.enable(14);if(_.vertexUv3s)H.enable(15);if(_.vertexTangents)H.enable(16);if(_.anisotropy)H.enable(17);if(_.alphaHash)H.enable(18);if(_.batching)H.enable(19);if(_.dispersion)H.enable(20);if(_.batchingColor)H.enable(21);if(L.push(H.mask),H.disableAll(),_.fog)H.enable(0);if(_.useFog)H.enable(1);if(_.flatShading)H.enable(2);if(_.logarithmicDepthBuffer)H.enable(3);if(_.reverseDepthBuffer)H.enable(4);if(_.skinning)H.enable(5);if(_.morphTargets)H.enable(6);if(_.morphNormals)H.enable(7);if(_.morphColors)H.enable(8);if(_.premultipliedAlpha)H.enable(9);if(_.shadowMapEnabled)H.enable(10);if(_.doubleSided)H.enable(11);if(_.flipSided)H.enable(12);if(_.useDepthPacking)H.enable(13);if(_.dithering)H.enable(14);if(_.transmission)H.enable(15);if(_.sheen)H.enable(16);if(_.opaque)H.enable(17);if(_.pointsUvs)H.enable(18);if(_.decodeVideoTexture)H.enable(19);if(_.decodeVideoTextureEmissive)H.enable(20);if(_.alphaToCoverage)H.enable(21);L.push(H.mask)}function C(L){let _=k[L.type],j;if(_){let p=p8[_];j=oX.clone(p.uniforms)}else j=L.uniforms;return j}function P(L,_){let j;for(let p=0,l=U.length;p<l;p++){let c=U[p];if(c.cacheKey===_){j=c,++j.usedTimes;break}}if(j===void 0)j=new UV(J,_,L,Y),U.push(j);return j}function M(L){if(--L.usedTimes===0){let _=U.indexOf(L);U[_]=U[U.length-1],U.pop(),L.destroy()}}function w(L){K.remove(L)}function v(){K.dispose()}return{getParameters:R,getProgramCacheKey:O,getUniforms:C,acquireProgram:P,releaseProgram:M,releaseShaderCache:w,programs:U,dispose:v}}function NV(){let J=/*@__PURE__*/new WeakMap;function Q(X){return J.has(X)}function Z(X){let H=J.get(X);if(H===void 0)H={},J.set(X,H);return H}function $(X){J.delete(X)}function W(X,H,K){J.get(X)[H]=K}function Y(){J=/*@__PURE__*/new WeakMap}return{has:Q,get:Z,remove:$,update:W,dispose:Y}}function OV(J,Q){if(J.groupOrder!==Q.groupOrder)return J.groupOrder-Q.groupOrder;else if(J.renderOrder!==Q.renderOrder)return J.renderOrder-Q.renderOrder;else if(J.material.id!==Q.material.id)return J.material.id-Q.material.id;else if(J.z!==Q.z)return J.z-Q.z;else return J.id-Q.id}function AE(J,Q){if(J.groupOrder!==Q.groupOrder)return J.groupOrder-Q.groupOrder;else if(J.renderOrder!==Q.renderOrder)return J.renderOrder-Q.renderOrder;else if(J.z!==Q.z)return Q.z-J.z;else return J.id-Q.id}function PE(){let J=[],Q=0,Z=[],$=[],W=[];function Y(){Q=0,Z.length=0,$.length=0,W.length=0}function X(E,q,N,k,V,R){let O=J[Q];if(O===void 0)O={id:E.id,object:E,geometry:q,material:N,groupOrder:k,renderOrder:E.renderOrder,z:V,group:R},J[Q]=O;else O.id=E.id,O.object=E,O.geometry=q,O.material=N,O.groupOrder=k,O.renderOrder=E.renderOrder,O.z=V,O.group=R;return Q++,O}function H(E,q,N,k,V,R){let O=X(E,q,N,k,V,R);if(N.transmission>0)$.push(O);else if(N.transparent===!0)W.push(O);else Z.push(O)}function K(E,q,N,k,V,R){let O=X(E,q,N,k,V,R);if(N.transmission>0)$.unshift(O);else if(N.transparent===!0)W.unshift(O);else Z.unshift(O)}function G(E,q){if(Z.length>1)Z.sort(E||OV);if($.length>1)$.sort(q||AE);if(W.length>1)W.sort(q||AE)}function U(){for(let E=Q,q=J.length;E<q;E++){let N=J[E];if(N.id===null)break;N.id=null,N.object=null,N.geometry=null,N.material=null,N.group=null}}return{opaque:Z,transmissive:$,transparent:W,init:Y,push:H,unshift:K,finish:U,sort:G}}function RV(){let J=/*@__PURE__*/new WeakMap;function Q($,W){let Y=J.get($),X;if(Y===void 0)X=new PE,J.set($,[X]);else if(W>=Y.length)X=new PE,Y.push(X);else X=Y[W];return X}function Z(){J=/*@__PURE__*/new WeakMap}return{get:Q,dispose:Z}}function kV(){let J={};return{get:function(Q){if(J[Q.id]!==void 0)return J[Q.id];let Z;switch(Q.type){case"DirectionalLight":Z={direction:new I,color:new u};break;case"SpotLight":Z={position:new I,direction:new I,color:new u,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":Z={position:new I,color:new u,distance:0,decay:0};break;case"HemisphereLight":Z={direction:new I,skyColor:new u,groundColor:new u};break;case"RectAreaLight":Z={color:new u,position:new I,halfWidth:new I,halfHeight:new I};break}return J[Q.id]=Z,Z}}}function VV(){let J={};return{get:function(Q){if(J[Q.id]!==void 0)return J[Q.id];let Z;switch(Q.type){case"DirectionalLight":Z={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new i};break;case"SpotLight":Z={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new i};break;case"PointLight":Z={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new i,shadowCameraNear:1,shadowCameraFar:1000};break}return J[Q.id]=Z,Z}}}var FV=0;function DV(J,Q){return(Q.castShadow?2:0)-(J.castShadow?2:0)+(Q.map?1:0)-(J.map?1:0)}function BV(J){let Q=new kV,Z=VV(),$={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let G=0;G<9;G++)$.probe.push(new I);let W=new I,Y=new SJ,X=new SJ;function H(G){let U=0,E=0,q=0;for(let L=0;L<9;L++)$.probe[L].set(0,0,0);let N=0,k=0,V=0,R=0,O=0,D=0,F=0,C=0,P=0,M=0,w=0;G.sort(DV);for(let L=0,_=G.length;L<_;L++){let j=G[L],p=j.color,l=j.intensity,c=j.distance,r=j.shadow&&j.shadow.map?j.shadow.map.texture:null;if(j.isAmbientLight)U+=p.r*l,E+=p.g*l,q+=p.b*l;else if(j.isLightProbe){for(let n=0;n<9;n++)$.probe[n].addScaledVector(j.sh.coefficients[n],l);w++}else if(j.isDirectionalLight){let n=Q.get(j);if(n.color.copy(j.color).multiplyScalar(j.intensity),j.castShadow){let WJ=j.shadow,d=Z.get(j);d.shadowIntensity=WJ.intensity,d.shadowBias=WJ.bias,d.shadowNormalBias=WJ.normalBias,d.shadowRadius=WJ.radius,d.shadowMapSize=WJ.mapSize,$.directionalShadow[N]=d,$.directionalShadowMap[N]=r,$.directionalShadowMatrix[N]=j.shadow.matrix,D++}$.directional[N]=n,N++}else if(j.isSpotLight){let n=Q.get(j);n.position.setFromMatrixPosition(j.matrixWorld),n.color.copy(p).multiplyScalar(l),n.distance=c,n.coneCos=Math.cos(j.angle),n.penumbraCos=Math.cos(j.angle*(1-j.penumbra)),n.decay=j.decay,$.spot[V]=n;let WJ=j.shadow;if(j.map){if($.spotLightMap[P]=j.map,P++,WJ.updateMatrices(j),j.castShadow)M++}if($.spotLightMatrix[V]=WJ.matrix,j.castShadow){let d=Z.get(j);d.shadowIntensity=WJ.intensity,d.shadowBias=WJ.bias,d.shadowNormalBias=WJ.normalBias,d.shadowRadius=WJ.radius,d.shadowMapSize=WJ.mapSize,$.spotShadow[V]=d,$.spotShadowMap[V]=r,C++}V++}else if(j.isRectAreaLight){let n=Q.get(j);n.color.copy(p).multiplyScalar(l),n.halfWidth.set(j.width*0.5,0,0),n.halfHeight.set(0,j.height*0.5,0),$.rectArea[R]=n,R++}else if(j.isPointLight){let n=Q.get(j);if(n.color.copy(j.color).multiplyScalar(j.intensity),n.distance=j.distance,n.decay=j.decay,j.castShadow){let WJ=j.shadow,d=Z.get(j);d.shadowIntensity=WJ.intensity,d.shadowBias=WJ.bias,d.shadowNormalBias=WJ.normalBias,d.shadowRadius=WJ.radius,d.shadowMapSize=WJ.mapSize,d.shadowCameraNear=WJ.camera.near,d.shadowCameraFar=WJ.camera.far,$.pointShadow[k]=d,$.pointShadowMap[k]=r,$.pointShadowMatrix[k]=j.shadow.matrix,F++}$.point[k]=n,k++}else if(j.isHemisphereLight){let n=Q.get(j);n.skyColor.copy(j.color).multiplyScalar(l),n.groundColor.copy(j.groundColor).multiplyScalar(l),$.hemi[O]=n,O++}}if(R>0)if(J.has("OES_texture_float_linear")===!0)$.rectAreaLTC1=qJ.LTC_FLOAT_1,$.rectAreaLTC2=qJ.LTC_FLOAT_2;else $.rectAreaLTC1=qJ.LTC_HALF_1,$.rectAreaLTC2=qJ.LTC_HALF_2;$.ambient[0]=U,$.ambient[1]=E,$.ambient[2]=q;let v=$.hash;if(v.directionalLength!==N||v.pointLength!==k||v.spotLength!==V||v.rectAreaLength!==R||v.hemiLength!==O||v.numDirectionalShadows!==D||v.numPointShadows!==F||v.numSpotShadows!==C||v.numSpotMaps!==P||v.numLightProbes!==w)$.directional.length=N,$.spot.length=V,$.rectArea.length=R,$.point.length=k,$.hemi.length=O,$.directionalShadow.length=D,$.directionalShadowMap.length=D,$.pointShadow.length=F,$.pointShadowMap.length=F,$.spotShadow.length=C,$.spotShadowMap.length=C,$.directionalShadowMatrix.length=D,$.pointShadowMatrix.length=F,$.spotLightMatrix.length=C+P-M,$.spotLightMap.length=P,$.numSpotLightShadowsWithMaps=M,$.numLightProbes=w,v.directionalLength=N,v.pointLength=k,v.spotLength=V,v.rectAreaLength=R,v.hemiLength=O,v.numDirectionalShadows=D,v.numPointShadows=F,v.numSpotShadows=C,v.numSpotMaps=P,v.numLightProbes=w,$.version=FV++}function K(G,U){let E=0,q=0,N=0,k=0,V=0,R=U.matrixWorldInverse;for(let O=0,D=G.length;O<D;O++){let F=G[O];if(F.isDirectionalLight){let C=$.directional[E];C.direction.setFromMatrixPosition(F.matrixWorld),W.setFromMatrixPosition(F.target.matrixWorld),C.direction.sub(W),C.direction.transformDirection(R),E++}else if(F.isSpotLight){let C=$.spot[N];C.position.setFromMatrixPosition(F.matrixWorld),C.position.applyMatrix4(R),C.direction.setFromMatrixPosition(F.matrixWorld),W.setFromMatrixPosition(F.target.matrixWorld),C.direction.sub(W),C.direction.transformDirection(R),N++}else if(F.isRectAreaLight){let C=$.rectArea[k];C.position.setFromMatrixPosition(F.matrixWorld),C.position.applyMatrix4(R),X.identity(),Y.copy(F.matrixWorld),Y.premultiply(R),X.extractRotation(Y),C.halfWidth.set(F.width*0.5,0,0),C.halfHeight.set(0,F.height*0.5,0),C.halfWidth.applyMatrix4(X),C.halfHeight.applyMatrix4(X),k++}else if(F.isPointLight){let C=$.point[q];C.position.setFromMatrixPosition(F.matrixWorld),C.position.applyMatrix4(R),q++}else if(F.isHemisphereLight){let C=$.hemi[V];C.direction.setFromMatrixPosition(F.matrixWorld),C.direction.transformDirection(R),V++}}}return{setup:H,setupView:K,state:$}}function TE(J){let Q=new BV(J),Z=[],$=[];function W(U){G.camera=U,Z.length=0,$.length=0}function Y(U){Z.push(U)}function X(U){$.push(U)}function H(){Q.setup(Z)}function K(U){Q.setupView(Z,U)}let G={lightsArray:Z,shadowsArray:$,camera:null,lights:Q,transmissionRenderTarget:{}};return{init:W,state:G,setupLights:H,setupLightsView:K,pushLight:Y,pushShadow:X}}function LV(J){let Q=/*@__PURE__*/new WeakMap;function Z(W,Y=0){let X=Q.get(W),H;if(X===void 0)H=new TE(J),Q.set(W,[H]);else if(Y>=X.length)H=new TE(J),X.push(H);else H=X[Y];return H}function $(){Q=/*@__PURE__*/new WeakMap}return{get:Z,dispose:$}}var zV=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,CV=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function _V(J,Q,Z){let $=new _6,W=new i,Y=new i,X=new XJ,H=new iQ({depthPacking:AX}),K=new oQ,G={},U=Z.maxTextureSize,E={[t0]:n0,[n0]:t0,[T0]:T0},q=new l0({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new i},radius:{value:4}},vertexShader:zV,fragmentShader:CV}),N=q.clone();N.defines.HORIZONTAL_PASS=1;let k=new gJ;k.setAttribute("position",new X0(new Float32Array([-1,-1,0.5,3,-1,0.5,-1,3,0.5]),3));let V=new N0(k,q),R=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=N$;let O=this.type;this.render=function(M,w,v){if(R.enabled===!1)return;if(R.autoUpdate===!1&&R.needsUpdate===!1)return;if(M.length===0)return;let L=J.getRenderTarget(),_=J.getActiveCubeFace(),j=J.getActiveMipmapLevel(),p=J.state;p.setBlending(N9),p.buffers.color.setClear(1,1,1,1),p.buffers.depth.setTest(!0),p.setScissorTest(!1);let l=O!==h8&&this.type===h8,c=O===h8&&this.type!==h8;for(let r=0,n=M.length;r<n;r++){let WJ=M[r],d=WJ.shadow;if(d===void 0){console.warn("THREE.WebGLShadowMap:",WJ,"has no shadow.");continue}if(d.autoUpdate===!1&&d.needsUpdate===!1)continue;W.copy(d.mapSize);let RJ=d.getFrameExtents();if(W.multiply(RJ),Y.copy(d.mapSize),W.x>U||W.y>U){if(W.x>U)Y.x=Math.floor(U/RJ.x),W.x=Y.x*RJ.x,d.mapSize.x=Y.x;if(W.y>U)Y.y=Math.floor(U/RJ.y),W.y=Y.y*RJ.y,d.mapSize.y=Y.y}if(d.map===null||l===!0||c===!0){let hJ=this.type!==h8?{minFilter:i8,magFilter:i8}:{};if(d.map!==null)d.map.dispose();d.map=new H8(W.x,W.y,hJ),d.map.texture.name=WJ.name+".shadowMap",d.camera.updateProjectionMatrix()}J.setRenderTarget(d.map),J.clear();let NJ=d.getViewportCount();for(let hJ=0;hJ<NJ;hJ++){let eJ=d.getViewport(hJ);X.set(Y.x*eJ.x,Y.y*eJ.y,Y.x*eJ.z,Y.y*eJ.w),p.viewport(X),d.updateMatrices(WJ,hJ),$=d.getFrustum(),C(w,v,d.camera,WJ,this.type)}if(d.isPointLightShadow!==!0&&this.type===h8)D(d,v);d.needsUpdate=!1}O=this.type,R.needsUpdate=!1,J.setRenderTarget(L,_,j)};function D(M,w){let v=Q.update(V);if(q.defines.VSM_SAMPLES!==M.blurSamples)q.defines.VSM_SAMPLES=M.blurSamples,N.defines.VSM_SAMPLES=M.blurSamples,q.needsUpdate=!0,N.needsUpdate=!0;if(M.mapPass===null)M.mapPass=new H8(W.x,W.y);q.uniforms.shadow_pass.value=M.map.texture,q.uniforms.resolution.value=M.mapSize,q.uniforms.radius.value=M.radius,J.setRenderTarget(M.mapPass),J.clear(),J.renderBufferDirect(w,null,v,q,V,null),N.uniforms.shadow_pass.value=M.mapPass.texture,N.uniforms.resolution.value=M.mapSize,N.uniforms.radius.value=M.radius,J.setRenderTarget(M.map),J.clear(),J.renderBufferDirect(w,null,v,N,V,null)}function F(M,w,v,L){let _=null,j=v.isPointLight===!0?M.customDistanceMaterial:M.customDepthMaterial;if(j!==void 0)_=j;else if(_=v.isPointLight===!0?K:H,J.localClippingEnabled&&w.clipShadows===!0&&Array.isArray(w.clippingPlanes)&&w.clippingPlanes.length!==0||w.displacementMap&&w.displacementScale!==0||w.alphaMap&&w.alphaTest>0||w.map&&w.alphaTest>0){let p=_.uuid,l=w.uuid,c=G[p];if(c===void 0)c={},G[p]=c;let r=c[l];if(r===void 0)r=_.clone(),c[l]=r,w.addEventListener("dispose",P);_=r}if(_.visible=w.visible,_.wireframe=w.wireframe,L===h8)_.side=w.shadowSide!==null?w.shadowSide:w.side;else _.side=w.shadowSide!==null?w.shadowSide:E[w.side];if(_.alphaMap=w.alphaMap,_.alphaTest=w.alphaTest,_.map=w.map,_.clipShadows=w.clipShadows,_.clippingPlanes=w.clippingPlanes,_.clipIntersection=w.clipIntersection,_.displacementMap=w.displacementMap,_.displacementScale=w.displacementScale,_.displacementBias=w.displacementBias,_.wireframeLinewidth=w.wireframeLinewidth,_.linewidth=w.linewidth,v.isPointLight===!0&&_.isMeshDistanceMaterial===!0){let p=J.properties.get(_);p.light=v}return _}function C(M,w,v,L,_){if(M.visible===!1)return;if(M.layers.test(w.layers)&&(M.isMesh||M.isLine||M.isPoints)){if((M.castShadow||M.receiveShadow&&_===h8)&&(!M.frustumCulled||$.intersectsObject(M))){M.modelViewMatrix.multiplyMatrices(v.matrixWorldInverse,M.matrixWorld);let l=Q.update(M),c=M.material;if(Array.isArray(c)){let r=l.groups;for(let n=0,WJ=r.length;n<WJ;n++){let d=r[n],RJ=c[d.materialIndex];if(RJ&&RJ.visible){let NJ=F(M,RJ,L,_);M.onBeforeShadow(J,M,w,v,l,NJ,d),J.renderBufferDirect(v,null,l,NJ,M,d),M.onAfterShadow(J,M,w,v,l,NJ,d)}}}else if(c.visible){let r=F(M,c,L,_);M.onBeforeShadow(J,M,w,v,l,r,null),J.renderBufferDirect(v,null,l,r,M,null),M.onAfterShadow(J,M,w,v,l,r,null)}}}let p=M.children;for(let l=0,c=p.length;l<c;l++)C(p[l],w,v,L,_)}function P(M){M.target.removeEventListener("dispose",P);for(let v in G){let L=G[v],_=M.target.uuid;if(_ in L)L[_].dispose(),delete L[_]}}}var MV={[YQ]:XQ,[HQ]:UQ,[KQ]:EQ,[X7]:GQ,[XQ]:YQ,[UQ]:HQ,[EQ]:KQ,[GQ]:X7};function IV(J,Q){function Z(){let y=!1,HJ=new XJ,a=null,e=new XJ(0,0,0,0);return{setMask:function(DJ){if(a!==DJ&&!y)J.colorMask(DJ,DJ,DJ,DJ),a=DJ},setLocked:function(DJ){y=DJ},setClear:function(DJ,FJ,tJ,D0,f0){if(f0===!0)DJ*=D0,FJ*=D0,tJ*=D0;if(HJ.set(DJ,FJ,tJ,D0),e.equals(HJ)===!1)J.clearColor(DJ,FJ,tJ,D0),e.copy(HJ)},reset:function(){y=!1,a=null,e.set(-1,0,0,0)}}}function $(){let y=!1,HJ=!1,a=null,e=null,DJ=null;return{setReversed:function(FJ){if(HJ!==FJ){let tJ=Q.get("EXT_clip_control");if(HJ)tJ.clipControlEXT(tJ.LOWER_LEFT_EXT,tJ.ZERO_TO_ONE_EXT);else tJ.clipControlEXT(tJ.LOWER_LEFT_EXT,tJ.NEGATIVE_ONE_TO_ONE_EXT);let D0=DJ;DJ=null,this.setClear(D0)}HJ=FJ},getReversed:function(){return HJ},setTest:function(FJ){if(FJ)EJ(J.DEPTH_TEST);else Q0(J.DEPTH_TEST)},setMask:function(FJ){if(a!==FJ&&!y)J.depthMask(FJ),a=FJ},setFunc:function(FJ){if(HJ)FJ=MV[FJ];if(e!==FJ){switch(FJ){case YQ:J.depthFunc(J.NEVER);break;case XQ:J.depthFunc(J.ALWAYS);break;case HQ:J.depthFunc(J.LESS);break;case X7:J.depthFunc(J.LEQUAL);break;case KQ:J.depthFunc(J.EQUAL);break;case GQ:J.depthFunc(J.GEQUAL);break;case UQ:J.depthFunc(J.GREATER);break;case EQ:J.depthFunc(J.NOTEQUAL);break;default:J.depthFunc(J.LEQUAL)}e=FJ}},setLocked:function(FJ){y=FJ},setClear:function(FJ){if(DJ!==FJ){if(HJ)FJ=1-FJ;J.clearDepth(FJ),DJ=FJ}},reset:function(){y=!1,a=null,e=null,DJ=null,HJ=!1}}}function W(){let y=!1,HJ=null,a=null,e=null,DJ=null,FJ=null,tJ=null,D0=null,f0=null;return{setTest:function(G0){if(!y)if(G0)EJ(J.STENCIL_TEST);else Q0(J.STENCIL_TEST)},setMask:function(G0){if(HJ!==G0&&!y)J.stencilMask(G0),HJ=G0},setFunc:function(G0,Q9,m8){if(a!==G0||e!==Q9||DJ!==m8)J.stencilFunc(G0,Q9,m8),a=G0,e=Q9,DJ=m8},setOp:function(G0,Q9,m8){if(FJ!==G0||tJ!==Q9||D0!==m8)J.stencilOp(G0,Q9,m8),FJ=G0,tJ=Q9,D0=m8},setLocked:function(G0){y=G0},setClear:function(G0){if(f0!==G0)J.clearStencil(G0),f0=G0},reset:function(){y=!1,HJ=null,a=null,e=null,DJ=null,FJ=null,tJ=null,D0=null,f0=null}}}let Y=new Z,X=new $,H=new W,K=/*@__PURE__*/new WeakMap,G=/*@__PURE__*/new WeakMap,U={},E={},q=/*@__PURE__*/new WeakMap,N=[],k=null,V=!1,R=null,O=null,D=null,F=null,C=null,P=null,M=null,w=new u(0,0,0),v=0,L=!1,_=null,j=null,p=null,l=null,c=null,r=J.getParameter(J.MAX_COMBINED_TEXTURE_IMAGE_UNITS),n=!1,WJ=0,d=J.getParameter(J.VERSION);if(d.indexOf("WebGL")!==-1)WJ=parseFloat(/^WebGL (\d)/.exec(d)[1]),n=WJ>=1;else if(d.indexOf("OpenGL ES")!==-1)WJ=parseFloat(/^OpenGL ES (\d)/.exec(d)[1]),n=WJ>=2;let RJ=null,NJ={},hJ=J.getParameter(J.SCISSOR_BOX),eJ=J.getParameter(J.VIEWPORT),o=new XJ().fromArray(hJ),UJ=new XJ().fromArray(eJ);function TJ(y,HJ,a,e){let DJ=new Uint8Array(4),FJ=J.createTexture();J.bindTexture(y,FJ),J.texParameteri(y,J.TEXTURE_MIN_FILTER,J.NEAREST),J.texParameteri(y,J.TEXTURE_MAG_FILTER,J.NEAREST);for(let tJ=0;tJ<a;tJ++)if(y===J.TEXTURE_3D||y===J.TEXTURE_2D_ARRAY)J.texImage3D(HJ,0,J.RGBA,1,1,e,0,J.RGBA,J.UNSIGNED_BYTE,DJ);else J.texImage2D(HJ+tJ,0,J.RGBA,1,1,0,J.RGBA,J.UNSIGNED_BYTE,DJ);return FJ}let wJ={};wJ[J.TEXTURE_2D]=TJ(J.TEXTURE_2D,J.TEXTURE_2D,1),wJ[J.TEXTURE_CUBE_MAP]=TJ(J.TEXTURE_CUBE_MAP,J.TEXTURE_CUBE_MAP_POSITIVE_X,6),wJ[J.TEXTURE_2D_ARRAY]=TJ(J.TEXTURE_2D_ARRAY,J.TEXTURE_2D_ARRAY,1,1),wJ[J.TEXTURE_3D]=TJ(J.TEXTURE_3D,J.TEXTURE_3D,1,1),Y.setClear(0,0,0,1),X.setClear(1),H.setClear(0),EJ(J.DEPTH_TEST),X.setFunc(X7),PJ(!1),ZJ(q$),EJ(J.CULL_FACE),IJ(N9);function EJ(y){if(U[y]!==!0)J.enable(y),U[y]=!0}function Q0(y){if(U[y]!==!1)J.disable(y),U[y]=!1}function fJ(y,HJ){if(E[y]!==HJ){if(J.bindFramebuffer(y,HJ),E[y]=HJ,y===J.DRAW_FRAMEBUFFER)E[J.FRAMEBUFFER]=HJ;if(y===J.FRAMEBUFFER)E[J.DRAW_FRAMEBUFFER]=HJ;return!0}return!1}function sJ(y,HJ){let a=N,e=!1;if(y){if(a=q.get(HJ),a===void 0)a=[],q.set(HJ,a);let DJ=y.textures;if(a.length!==DJ.length||a[0]!==J.COLOR_ATTACHMENT0){for(let FJ=0,tJ=DJ.length;FJ<tJ;FJ++)a[FJ]=J.COLOR_ATTACHMENT0+FJ;a.length=DJ.length,e=!0}}else if(a[0]!==J.BACK)a[0]=J.BACK,e=!0;if(e)J.drawBuffers(a)}function $J(y){if(k!==y)return J.useProgram(y),k=y,!0;return!1}let QJ={[X6]:J.FUNC_ADD,[tY]:J.FUNC_SUBTRACT,[eY]:J.FUNC_REVERSE_SUBTRACT};QJ[JX]=J.MIN,QJ[QX]=J.MAX;let A={[ZX]:J.ZERO,[k8]:J.ONE,[$X]:J.SRC_COLOR,[V8]:J.SRC_ALPHA,[HX]:J.SRC_ALPHA_SATURATE,[YX]:J.DST_COLOR,[H6]:J.DST_ALPHA,[WX]:J.ONE_MINUS_SRC_COLOR,[O9]:J.ONE_MINUS_SRC_ALPHA,[XX]:J.ONE_MINUS_DST_COLOR,[K6]:J.ONE_MINUS_DST_ALPHA,[KX]:J.CONSTANT_COLOR,[GX]:J.ONE_MINUS_CONSTANT_COLOR,[UX]:J.CONSTANT_ALPHA,[EX]:J.ONE_MINUS_CONSTANT_ALPHA};function IJ(y,HJ,a,e,DJ,FJ,tJ,D0,f0,G0){if(y===N9){if(V===!0)Q0(J.BLEND),V=!1;return}if(V===!1)EJ(J.BLEND),V=!0;if(y!==R8){if(y!==R||G0!==L){if(O!==X6||C!==X6)J.blendEquation(J.FUNC_ADD),O=X6,C=X6;if(G0)switch(y){case Y7:J.blendFuncSeparate(J.ONE,J.ONE_MINUS_SRC_ALPHA,J.ONE,J.ONE_MINUS_SRC_ALPHA);break;case O$:J.blendFunc(J.ONE,J.ONE);break;case R$:J.blendFuncSeparate(J.ZERO,J.ONE_MINUS_SRC_COLOR,J.ZERO,J.ONE);break;case k$:J.blendFuncSeparate(J.ZERO,J.SRC_COLOR,J.ZERO,J.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",y);break}else switch(y){case Y7:J.blendFuncSeparate(J.SRC_ALPHA,J.ONE_MINUS_SRC_ALPHA,J.ONE,J.ONE_MINUS_SRC_ALPHA);break;case O$:J.blendFunc(J.SRC_ALPHA,J.ONE);break;case R$:J.blendFuncSeparate(J.ZERO,J.ONE_MINUS_SRC_COLOR,J.ZERO,J.ONE);break;case k$:J.blendFunc(J.ZERO,J.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",y);break}D=null,F=null,P=null,M=null,w.set(0,0,0),v=0,R=y,L=G0}return}if(DJ=DJ||HJ,FJ=FJ||a,tJ=tJ||e,HJ!==O||DJ!==C)J.blendEquationSeparate(QJ[HJ],QJ[DJ]),O=HJ,C=DJ;if(a!==D||e!==F||FJ!==P||tJ!==M)J.blendFuncSeparate(A[a],A[e],A[FJ],A[tJ]),D=a,F=e,P=FJ,M=tJ;if(D0.equals(w)===!1||f0!==v)J.blendColor(D0.r,D0.g,D0.b,f0),w.copy(D0),v=f0;R=y,L=!1}function KJ(y,HJ){y.side===T0?Q0(J.CULL_FACE):EJ(J.CULL_FACE);let a=y.side===n0;if(HJ)a=!a;PJ(a),y.blending===Y7&&y.transparent===!1?IJ(N9):IJ(y.blending,y.blendEquation,y.blendSrc,y.blendDst,y.blendEquationAlpha,y.blendSrcAlpha,y.blendDstAlpha,y.blendColor,y.blendAlpha,y.premultipliedAlpha),X.setFunc(y.depthFunc),X.setTest(y.depthTest),X.setMask(y.depthWrite),Y.setMask(y.colorWrite);let e=y.stencilWrite;if(H.setTest(e),e)H.setMask(y.stencilWriteMask),H.setFunc(y.stencilFunc,y.stencilRef,y.stencilFuncMask),H.setOp(y.stencilFail,y.stencilZFail,y.stencilZPass);VJ(y.polygonOffset,y.polygonOffsetFactor,y.polygonOffsetUnits),y.alphaToCoverage===!0?EJ(J.SAMPLE_ALPHA_TO_COVERAGE):Q0(J.SAMPLE_ALPHA_TO_COVERAGE)}function PJ(y){if(_!==y){if(y)J.frontFace(J.CW);else J.frontFace(J.CCW);_=y}}function ZJ(y){if(y!==oY){if(EJ(J.CULL_FACE),y!==j)if(y===q$)J.cullFace(J.BACK);else if(y===aY)J.cullFace(J.FRONT);else J.cullFace(J.FRONT_AND_BACK)}else Q0(J.CULL_FACE);j=y}function pJ(y){if(y!==p){if(n)J.lineWidth(y);p=y}}function VJ(y,HJ,a){if(y){if(EJ(J.POLYGON_OFFSET_FILL),l!==HJ||c!==a)J.polygonOffset(HJ,a),l=HJ,c=a}else Q0(J.POLYGON_OFFSET_FILL)}function AJ(y){if(y)EJ(J.SCISSOR_TEST);else Q0(J.SCISSOR_TEST)}function S(y){if(y===void 0)y=J.TEXTURE0+r-1;if(RJ!==y)J.activeTexture(y),RJ=y}function B(y,HJ,a){if(a===void 0)if(RJ===null)a=J.TEXTURE0+r-1;else a=RJ;let e=NJ[a];if(e===void 0)e={type:void 0,texture:void 0},NJ[a]=e;if(e.type!==y||e.texture!==HJ){if(RJ!==a)J.activeTexture(a),RJ=a;J.bindTexture(y,HJ||wJ[y]),e.type=y,e.texture=HJ}}function h(){let y=NJ[RJ];if(y!==void 0&&y.type!==void 0)J.bindTexture(y.type,null),y.type=void 0,y.texture=void 0}function t(){try{J.compressedTexImage2D.apply(J,arguments)}catch(y){console.error("THREE.WebGLState:",y)}}function JJ(){try{J.compressedTexImage3D.apply(J,arguments)}catch(y){console.error("THREE.WebGLState:",y)}}function s(){try{J.texSubImage2D.apply(J,arguments)}catch(y){console.error("THREE.WebGLState:",y)}}function vJ(){try{J.texSubImage3D.apply(J,arguments)}catch(y){console.error("THREE.WebGLState:",y)}}function OJ(){try{J.compressedTexSubImage2D.apply(J,arguments)}catch(y){console.error("THREE.WebGLState:",y)}}function BJ(){try{J.compressedTexSubImage3D.apply(J,arguments)}catch(y){console.error("THREE.WebGLState:",y)}}function uJ(){try{J.texStorage2D.apply(J,arguments)}catch(y){console.error("THREE.WebGLState:",y)}}function GJ(){try{J.texStorage3D.apply(J,arguments)}catch(y){console.error("THREE.WebGLState:",y)}}function LJ(){try{J.texImage2D.apply(J,arguments)}catch(y){console.error("THREE.WebGLState:",y)}}function Z0(){try{J.texImage3D.apply(J,arguments)}catch(y){console.error("THREE.WebGLState:",y)}}function mJ(y){if(o.equals(y)===!1)J.scissor(y.x,y.y,y.z,y.w),o.copy(y)}function _J(y){if(UJ.equals(y)===!1)J.viewport(y.x,y.y,y.z,y.w),UJ.copy(y)}function oJ(y,HJ){let a=G.get(HJ);if(a===void 0)a=/*@__PURE__*/new WeakMap,G.set(HJ,a);let e=a.get(y);if(e===void 0)e=J.getUniformBlockIndex(HJ,y.name),a.set(y,e)}function J0(y,HJ){let e=G.get(HJ).get(y);if(K.get(HJ)!==e)J.uniformBlockBinding(HJ,e,y.__bindingPointIndex),K.set(HJ,e)}function V0(){J.disable(J.BLEND),J.disable(J.CULL_FACE),J.disable(J.DEPTH_TEST),J.disable(J.POLYGON_OFFSET_FILL),J.disable(J.SCISSOR_TEST),J.disable(J.STENCIL_TEST),J.disable(J.SAMPLE_ALPHA_TO_COVERAGE),J.blendEquation(J.FUNC_ADD),J.blendFunc(J.ONE,J.ZERO),J.blendFuncSeparate(J.ONE,J.ZERO,J.ONE,J.ZERO),J.blendColor(0,0,0,0),J.colorMask(!0,!0,!0,!0),J.clearColor(0,0,0,0),J.depthMask(!0),J.depthFunc(J.LESS),X.setReversed(!1),J.clearDepth(1),J.stencilMask(4294967295),J.stencilFunc(J.ALWAYS,0,4294967295),J.stencilOp(J.KEEP,J.KEEP,J.KEEP),J.clearStencil(0),J.cullFace(J.BACK),J.frontFace(J.CCW),J.polygonOffset(0,0),J.activeTexture(J.TEXTURE0),J.bindFramebuffer(J.FRAMEBUFFER,null),J.bindFramebuffer(J.DRAW_FRAMEBUFFER,null),J.bindFramebuffer(J.READ_FRAMEBUFFER,null),J.useProgram(null),J.lineWidth(1),J.scissor(0,0,J.canvas.width,J.canvas.height),J.viewport(0,0,J.canvas.width,J.canvas.height),U={},RJ=null,NJ={},E={},q=/*@__PURE__*/new WeakMap,N=[],k=null,V=!1,R=null,O=null,D=null,F=null,C=null,P=null,M=null,w=new u(0,0,0),v=0,L=!1,_=null,j=null,p=null,l=null,c=null,o.set(0,0,J.canvas.width,J.canvas.height),UJ.set(0,0,J.canvas.width,J.canvas.height),Y.reset(),X.reset(),H.reset()}return{buffers:{color:Y,depth:X,stencil:H},enable:EJ,disable:Q0,bindFramebuffer:fJ,drawBuffers:sJ,useProgram:$J,setBlending:IJ,setMaterial:KJ,setFlipSided:PJ,setCullFace:ZJ,setLineWidth:pJ,setPolygonOffset:VJ,setScissorTest:AJ,activeTexture:S,bindTexture:B,unbindTexture:h,compressedTexImage2D:t,compressedTexImage3D:JJ,texImage2D:LJ,texImage3D:Z0,updateUBOMapping:oJ,uniformBlockBinding:J0,texStorage2D:uJ,texStorage3D:GJ,texSubImage2D:s,texSubImage3D:vJ,compressedTexSubImage2D:OJ,compressedTexSubImage3D:BJ,scissor:mJ,viewport:_J,reset:V0}}function wV(J,Q,Z,$,W,Y,X){let H=Q.has("WEBGL_multisampled_render_to_texture")?Q.get("WEBGL_multisampled_render_to_texture"):null,K=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),G=new i,U=/*@__PURE__*/new WeakMap,E,q=/*@__PURE__*/new WeakMap,N=!1;try{N=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch(S){}function k(S,B){return N?new OffscreenCanvas(S,B):W7("canvas")}function V(S,B,h){let t=1,JJ=AJ(S);if(JJ.width>h||JJ.height>h)t=h/Math.max(JJ.width,JJ.height);if(t<1)if(typeof HTMLImageElement<"u"&&S instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&S instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&S instanceof ImageBitmap||typeof VideoFrame<"u"&&S instanceof VideoFrame){let s=Math.floor(t*JJ.width),vJ=Math.floor(t*JJ.height);if(E===void 0)E=k(s,vJ);let OJ=B?k(s,vJ):E;return OJ.width=s,OJ.height=vJ,OJ.getContext("2d").drawImage(S,0,0,s,vJ),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+JJ.width+"x"+JJ.height+") to ("+s+"x"+vJ+")."),OJ}else{if("data"in S)console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+JJ.width+"x"+JJ.height+").");return S}return S}function R(S){return S.generateMipmaps}function O(S){J.generateMipmap(S)}function D(S){if(S.isWebGLCubeRenderTarget)return J.TEXTURE_CUBE_MAP;if(S.isWebGL3DRenderTarget)return J.TEXTURE_3D;if(S.isWebGLArrayRenderTarget||S.isCompressedArrayTexture)return J.TEXTURE_2D_ARRAY;return J.TEXTURE_2D}function F(S,B,h,t,JJ=!1){if(S!==null){if(J[S]!==void 0)return J[S];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+S+"'")}let s=B;if(B===J.RED){if(h===J.FLOAT)s=J.R32F;if(h===J.HALF_FLOAT)s=J.R16F;if(h===J.UNSIGNED_BYTE)s=J.R8}if(B===J.RED_INTEGER){if(h===J.UNSIGNED_BYTE)s=J.R8UI;if(h===J.UNSIGNED_SHORT)s=J.R16UI;if(h===J.UNSIGNED_INT)s=J.R32UI;if(h===J.BYTE)s=J.R8I;if(h===J.SHORT)s=J.R16I;if(h===J.INT)s=J.R32I}if(B===J.RG){if(h===J.FLOAT)s=J.RG32F;if(h===J.HALF_FLOAT)s=J.RG16F;if(h===J.UNSIGNED_BYTE)s=J.RG8}if(B===J.RG_INTEGER){if(h===J.UNSIGNED_BYTE)s=J.RG8UI;if(h===J.UNSIGNED_SHORT)s=J.RG16UI;if(h===J.UNSIGNED_INT)s=J.RG32UI;if(h===J.BYTE)s=J.RG8I;if(h===J.SHORT)s=J.RG16I;if(h===J.INT)s=J.RG32I}if(B===J.RGB_INTEGER){if(h===J.UNSIGNED_BYTE)s=J.RGB8UI;if(h===J.UNSIGNED_SHORT)s=J.RGB16UI;if(h===J.UNSIGNED_INT)s=J.RGB32UI;if(h===J.BYTE)s=J.RGB8I;if(h===J.SHORT)s=J.RGB16I;if(h===J.INT)s=J.RGB32I}if(B===J.RGBA_INTEGER){if(h===J.UNSIGNED_BYTE)s=J.RGBA8UI;if(h===J.UNSIGNED_SHORT)s=J.RGBA16UI;if(h===J.UNSIGNED_INT)s=J.RGBA32UI;if(h===J.BYTE)s=J.RGBA8I;if(h===J.SHORT)s=J.RGBA16I;if(h===J.INT)s=J.RGBA32I}if(B===J.RGB){if(h===J.UNSIGNED_INT_5_9_9_9_REV)s=J.RGB9_E5}if(B===J.RGBA){let vJ=JJ?r$:aJ.getTransfer(t);if(h===J.FLOAT)s=J.RGBA32F;if(h===J.HALF_FLOAT)s=J.RGBA16F;if(h===J.UNSIGNED_BYTE)s=vJ===q0?J.SRGB8_ALPHA8:J.RGBA8;if(h===J.UNSIGNED_SHORT_4_4_4_4)s=J.RGBA4;if(h===J.UNSIGNED_SHORT_5_5_5_1)s=J.RGB5_A1}if(s===J.R16F||s===J.R32F||s===J.RG16F||s===J.RG32F||s===J.RGBA16F||s===J.RGBA32F)Q.get("EXT_color_buffer_float");return s}function C(S,B){let h;if(S){if(B===null||B===q6||B===N6)h=J.DEPTH24_STENCIL8;else if(B===R9)h=J.DEPTH32F_STENCIL8;else if(B===K7)h=J.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")}else if(B===null||B===q6||B===N6)h=J.DEPTH_COMPONENT24;else if(B===R9)h=J.DEPTH_COMPONENT32F;else if(B===K7)h=J.DEPTH_COMPONENT16;return h}function P(S,B){if(R(S)===!0||S.isFramebufferTexture&&S.minFilter!==i8&&S.minFilter!==m0)return Math.log2(Math.max(B.width,B.height))+1;else if(S.mipmaps!==void 0&&S.mipmaps.length>0)return S.mipmaps.length;else if(S.isCompressedTexture&&Array.isArray(S.image))return B.mipmaps.length;else return 1}function M(S){let B=S.target;if(B.removeEventListener("dispose",M),v(B),B.isVideoTexture)U.delete(B)}function w(S){let B=S.target;B.removeEventListener("dispose",w),_(B)}function v(S){let B=$.get(S);if(B.__webglInit===void 0)return;let h=S.source,t=q.get(h);if(t){let JJ=t[B.__cacheKey];if(JJ.usedTimes--,JJ.usedTimes===0)L(S);if(Object.keys(t).length===0)q.delete(h)}$.remove(S)}function L(S){let B=$.get(S);J.deleteTexture(B.__webglTexture);let h=S.source,t=q.get(h);delete t[B.__cacheKey],X.memory.textures--}function _(S){let B=$.get(S);if(S.depthTexture)S.depthTexture.dispose(),$.remove(S.depthTexture);if(S.isWebGLCubeRenderTarget)for(let t=0;t<6;t++){if(Array.isArray(B.__webglFramebuffer[t]))for(let JJ=0;JJ<B.__webglFramebuffer[t].length;JJ++)J.deleteFramebuffer(B.__webglFramebuffer[t][JJ]);else J.deleteFramebuffer(B.__webglFramebuffer[t]);if(B.__webglDepthbuffer)J.deleteRenderbuffer(B.__webglDepthbuffer[t])}else{if(Array.isArray(B.__webglFramebuffer))for(let t=0;t<B.__webglFramebuffer.length;t++)J.deleteFramebuffer(B.__webglFramebuffer[t]);else J.deleteFramebuffer(B.__webglFramebuffer);if(B.__webglDepthbuffer)J.deleteRenderbuffer(B.__webglDepthbuffer);if(B.__webglMultisampledFramebuffer)J.deleteFramebuffer(B.__webglMultisampledFramebuffer);if(B.__webglColorRenderbuffer){for(let t=0;t<B.__webglColorRenderbuffer.length;t++)if(B.__webglColorRenderbuffer[t])J.deleteRenderbuffer(B.__webglColorRenderbuffer[t])}if(B.__webglDepthRenderbuffer)J.deleteRenderbuffer(B.__webglDepthRenderbuffer)}let h=S.textures;for(let t=0,JJ=h.length;t<JJ;t++){let s=$.get(h[t]);if(s.__webglTexture)J.deleteTexture(s.__webglTexture),X.memory.textures--;$.remove(h[t])}$.remove(S)}let j=0;function p(){j=0}function l(){let S=j;if(S>=W.maxTextures)console.warn("THREE.WebGLTextures: Trying to use "+S+" texture units while this GPU supports only "+W.maxTextures);return j+=1,S}function c(S){let B=[];return B.push(S.wrapS),B.push(S.wrapT),B.push(S.wrapR||0),B.push(S.magFilter),B.push(S.minFilter),B.push(S.anisotropy),B.push(S.internalFormat),B.push(S.format),B.push(S.type),B.push(S.generateMipmaps),B.push(S.premultiplyAlpha),B.push(S.flipY),B.push(S.unpackAlignment),B.push(S.colorSpace),B.join()}function r(S,B){let h=$.get(S);if(S.isVideoTexture)pJ(S);if(S.isRenderTargetTexture===!1&&S.version>0&&h.__version!==S.version){let t=S.image;if(t===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(t.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{UJ(h,S,B);return}}Z.bindTexture(J.TEXTURE_2D,h.__webglTexture,J.TEXTURE0+B)}function n(S,B){let h=$.get(S);if(S.version>0&&h.__version!==S.version){UJ(h,S,B);return}Z.bindTexture(J.TEXTURE_2D_ARRAY,h.__webglTexture,J.TEXTURE0+B)}function WJ(S,B){let h=$.get(S);if(S.version>0&&h.__version!==S.version){UJ(h,S,B);return}Z.bindTexture(J.TEXTURE_3D,h.__webglTexture,J.TEXTURE0+B)}function d(S,B){let h=$.get(S);if(S.version>0&&h.__version!==S.version){TJ(h,S,B);return}Z.bindTexture(J.TEXTURE_CUBE_MAP,h.__webglTexture,J.TEXTURE0+B)}let RJ={[U6]:J.REPEAT,[OQ]:J.CLAMP_TO_EDGE,[s8]:J.MIRRORED_REPEAT},NJ={[i8]:J.NEAREST,[RQ]:J.NEAREST_MIPMAP_NEAREST,[y9]:J.NEAREST_MIPMAP_LINEAR,[m0]:J.LINEAR,[E6]:J.LINEAR_MIPMAP_NEAREST,[M8]:J.LINEAR_MIPMAP_LINEAR},hJ={[SX]:J.NEVER,[hX]:J.ALWAYS,[jX]:J.LESS,[t$]:J.LEQUAL,[vX]:J.EQUAL,[bX]:J.GEQUAL,[yX]:J.GREATER,[xX]:J.NOTEQUAL};function eJ(S,B){if(B.type===R9&&Q.has("OES_texture_float_linear")===!1&&(B.magFilter===m0||B.magFilter===E6||B.magFilter===y9||B.magFilter===M8||B.minFilter===m0||B.minFilter===E6||B.minFilter===y9||B.minFilter===M8))console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device.");if(J.texParameteri(S,J.TEXTURE_WRAP_S,RJ[B.wrapS]),J.texParameteri(S,J.TEXTURE_WRAP_T,RJ[B.wrapT]),S===J.TEXTURE_3D||S===J.TEXTURE_2D_ARRAY)J.texParameteri(S,J.TEXTURE_WRAP_R,RJ[B.wrapR]);if(J.texParameteri(S,J.TEXTURE_MAG_FILTER,NJ[B.magFilter]),J.texParameteri(S,J.TEXTURE_MIN_FILTER,NJ[B.minFilter]),B.compareFunction)J.texParameteri(S,J.TEXTURE_COMPARE_MODE,J.COMPARE_REF_TO_TEXTURE),J.texParameteri(S,J.TEXTURE_COMPARE_FUNC,hJ[B.compareFunction]);if(Q.has("EXT_texture_filter_anisotropic")===!0){if(B.magFilter===i8)return;if(B.minFilter!==y9&&B.minFilter!==M8)return;if(B.type===R9&&Q.has("OES_texture_float_linear")===!1)return;if(B.anisotropy>1||$.get(B).__currentAnisotropy){let h=Q.get("EXT_texture_filter_anisotropic");J.texParameterf(S,h.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(B.anisotropy,W.getMaxAnisotropy())),$.get(B).__currentAnisotropy=B.anisotropy}}}function o(S,B){let h=!1;if(S.__webglInit===void 0)S.__webglInit=!0,B.addEventListener("dispose",M);let t=B.source,JJ=q.get(t);if(JJ===void 0)JJ={},q.set(t,JJ);let s=c(B);if(s!==S.__cacheKey){if(JJ[s]===void 0)JJ[s]={texture:J.createTexture(),usedTimes:0},X.memory.textures++,h=!0;JJ[s].usedTimes++;let vJ=JJ[S.__cacheKey];if(vJ!==void 0){if(JJ[S.__cacheKey].usedTimes--,vJ.usedTimes===0)L(B)}S.__cacheKey=s,S.__webglTexture=JJ[s].texture}return h}function UJ(S,B,h){let t=J.TEXTURE_2D;if(B.isDataArrayTexture||B.isCompressedArrayTexture)t=J.TEXTURE_2D_ARRAY;if(B.isData3DTexture)t=J.TEXTURE_3D;let JJ=o(S,B),s=B.source;Z.bindTexture(t,S.__webglTexture,J.TEXTURE0+h);let vJ=$.get(s);if(s.version!==vJ.__version||JJ===!0){Z.activeTexture(J.TEXTURE0+h);let OJ=aJ.getPrimaries(aJ.workingColorSpace),BJ=B.colorSpace===x9?null:aJ.getPrimaries(B.colorSpace),uJ=B.colorSpace===x9||OJ===BJ?J.NONE:J.BROWSER_DEFAULT_WEBGL;J.pixelStorei(J.UNPACK_FLIP_Y_WEBGL,B.flipY),J.pixelStorei(J.UNPACK_PREMULTIPLY_ALPHA_WEBGL,B.premultiplyAlpha),J.pixelStorei(J.UNPACK_ALIGNMENT,B.unpackAlignment),J.pixelStorei(J.UNPACK_COLORSPACE_CONVERSION_WEBGL,uJ);let GJ=V(B.image,!1,W.maxTextureSize);GJ=VJ(B,GJ);let LJ=Y.convert(B.format,B.colorSpace),Z0=Y.convert(B.type),mJ=F(B.internalFormat,LJ,Z0,B.colorSpace,B.isVideoTexture);eJ(t,B);let _J,oJ=B.mipmaps,J0=B.isVideoTexture!==!0,V0=vJ.__version===void 0||JJ===!0,y=s.dataReady,HJ=P(B,GJ);if(B.isDepthTexture){if(mJ=C(B.format===U7,B.type),V0)if(J0)Z.texStorage2D(J.TEXTURE_2D,1,mJ,GJ.width,GJ.height);else Z.texImage2D(J.TEXTURE_2D,0,mJ,GJ.width,GJ.height,0,LJ,Z0,null)}else if(B.isDataTexture)if(oJ.length>0){if(J0&&V0)Z.texStorage2D(J.TEXTURE_2D,HJ,mJ,oJ[0].width,oJ[0].height);for(let a=0,e=oJ.length;a<e;a++)if(_J=oJ[a],J0){if(y)Z.texSubImage2D(J.TEXTURE_2D,a,0,0,_J.width,_J.height,LJ,Z0,_J.data)}else Z.texImage2D(J.TEXTURE_2D,a,mJ,_J.width,_J.height,0,LJ,Z0,_J.data);B.generateMipmaps=!1}else if(J0){if(V0)Z.texStorage2D(J.TEXTURE_2D,HJ,mJ,GJ.width,GJ.height);if(y)Z.texSubImage2D(J.TEXTURE_2D,0,0,0,GJ.width,GJ.height,LJ,Z0,GJ.data)}else Z.texImage2D(J.TEXTURE_2D,0,mJ,GJ.width,GJ.height,0,LJ,Z0,GJ.data);else if(B.isCompressedTexture)if(B.isCompressedArrayTexture){if(J0&&V0)Z.texStorage3D(J.TEXTURE_2D_ARRAY,HJ,mJ,oJ[0].width,oJ[0].height,GJ.depth);for(let a=0,e=oJ.length;a<e;a++)if(_J=oJ[a],B.format!==F8)if(LJ!==null)if(J0){if(y)if(B.layerUpdates.size>0){let DJ=lW(_J.width,_J.height,B.format,B.type);for(let FJ of B.layerUpdates){let tJ=_J.data.subarray(FJ*DJ/_J.data.BYTES_PER_ELEMENT,(FJ+1)*DJ/_J.data.BYTES_PER_ELEMENT);Z.compressedTexSubImage3D(J.TEXTURE_2D_ARRAY,a,0,0,FJ,_J.width,_J.height,1,LJ,tJ)}B.clearLayerUpdates()}else Z.compressedTexSubImage3D(J.TEXTURE_2D_ARRAY,a,0,0,0,_J.width,_J.height,GJ.depth,LJ,_J.data)}else Z.compressedTexImage3D(J.TEXTURE_2D_ARRAY,a,mJ,_J.width,_J.height,GJ.depth,0,_J.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else if(J0){if(y)Z.texSubImage3D(J.TEXTURE_2D_ARRAY,a,0,0,0,_J.width,_J.height,GJ.depth,LJ,Z0,_J.data)}else Z.texImage3D(J.TEXTURE_2D_ARRAY,a,mJ,_J.width,_J.height,GJ.depth,0,LJ,Z0,_J.data)}else{if(J0&&V0)Z.texStorage2D(J.TEXTURE_2D,HJ,mJ,oJ[0].width,oJ[0].height);for(let a=0,e=oJ.length;a<e;a++)if(_J=oJ[a],B.format!==F8)if(LJ!==null)if(J0){if(y)Z.compressedTexSubImage2D(J.TEXTURE_2D,a,0,0,_J.width,_J.height,LJ,_J.data)}else Z.compressedTexImage2D(J.TEXTURE_2D,a,mJ,_J.width,_J.height,0,_J.data);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else if(J0){if(y)Z.texSubImage2D(J.TEXTURE_2D,a,0,0,_J.width,_J.height,LJ,Z0,_J.data)}else Z.texImage2D(J.TEXTURE_2D,a,mJ,_J.width,_J.height,0,LJ,Z0,_J.data)}else if(B.isDataArrayTexture)if(J0){if(V0)Z.texStorage3D(J.TEXTURE_2D_ARRAY,HJ,mJ,GJ.width,GJ.height,GJ.depth);if(y)if(B.layerUpdates.size>0){let a=lW(GJ.width,GJ.height,B.format,B.type);for(let e of B.layerUpdates){let DJ=GJ.data.subarray(e*a/GJ.data.BYTES_PER_ELEMENT,(e+1)*a/GJ.data.BYTES_PER_ELEMENT);Z.texSubImage3D(J.TEXTURE_2D_ARRAY,0,0,0,e,GJ.width,GJ.height,1,LJ,Z0,DJ)}B.clearLayerUpdates()}else Z.texSubImage3D(J.TEXTURE_2D_ARRAY,0,0,0,0,GJ.width,GJ.height,GJ.depth,LJ,Z0,GJ.data)}else Z.texImage3D(J.TEXTURE_2D_ARRAY,0,mJ,GJ.width,GJ.height,GJ.depth,0,LJ,Z0,GJ.data);else if(B.isData3DTexture)if(J0){if(V0)Z.texStorage3D(J.TEXTURE_3D,HJ,mJ,GJ.width,GJ.height,GJ.depth);if(y)Z.texSubImage3D(J.TEXTURE_3D,0,0,0,0,GJ.width,GJ.height,GJ.depth,LJ,Z0,GJ.data)}else Z.texImage3D(J.TEXTURE_3D,0,mJ,GJ.width,GJ.height,GJ.depth,0,LJ,Z0,GJ.data);else if(B.isFramebufferTexture){if(V0)if(J0)Z.texStorage2D(J.TEXTURE_2D,HJ,mJ,GJ.width,GJ.height);else{let{width:a,height:e}=GJ;for(let DJ=0;DJ<HJ;DJ++)Z.texImage2D(J.TEXTURE_2D,DJ,mJ,a,e,0,LJ,Z0,null),a>>=1,e>>=1}}else if(oJ.length>0){if(J0&&V0){let a=AJ(oJ[0]);Z.texStorage2D(J.TEXTURE_2D,HJ,mJ,a.width,a.height)}for(let a=0,e=oJ.length;a<e;a++)if(_J=oJ[a],J0){if(y)Z.texSubImage2D(J.TEXTURE_2D,a,0,0,LJ,Z0,_J)}else Z.texImage2D(J.TEXTURE_2D,a,mJ,LJ,Z0,_J);B.generateMipmaps=!1}else if(J0){if(V0){let a=AJ(GJ);Z.texStorage2D(J.TEXTURE_2D,HJ,mJ,a.width,a.height)}if(y)Z.texSubImage2D(J.TEXTURE_2D,0,0,0,LJ,Z0,GJ)}else Z.texImage2D(J.TEXTURE_2D,0,mJ,LJ,Z0,GJ);if(R(B))O(t);if(vJ.__version=s.version,B.onUpdate)B.onUpdate(B)}S.__version=B.version}function TJ(S,B,h){if(B.image.length!==6)return;let t=o(S,B),JJ=B.source;Z.bindTexture(J.TEXTURE_CUBE_MAP,S.__webglTexture,J.TEXTURE0+h);let s=$.get(JJ);if(JJ.version!==s.__version||t===!0){Z.activeTexture(J.TEXTURE0+h);let vJ=aJ.getPrimaries(aJ.workingColorSpace),OJ=B.colorSpace===x9?null:aJ.getPrimaries(B.colorSpace),BJ=B.colorSpace===x9||vJ===OJ?J.NONE:J.BROWSER_DEFAULT_WEBGL;J.pixelStorei(J.UNPACK_FLIP_Y_WEBGL,B.flipY),J.pixelStorei(J.UNPACK_PREMULTIPLY_ALPHA_WEBGL,B.premultiplyAlpha),J.pixelStorei(J.UNPACK_ALIGNMENT,B.unpackAlignment),J.pixelStorei(J.UNPACK_COLORSPACE_CONVERSION_WEBGL,BJ);let uJ=B.isCompressedTexture||B.image[0].isCompressedTexture,GJ=B.image[0]&&B.image[0].isDataTexture,LJ=[];for(let e=0;e<6;e++){if(!uJ&&!GJ)LJ[e]=V(B.image[e],!0,W.maxCubemapSize);else LJ[e]=GJ?B.image[e].image:B.image[e];LJ[e]=VJ(B,LJ[e])}let Z0=LJ[0],mJ=Y.convert(B.format,B.colorSpace),_J=Y.convert(B.type),oJ=F(B.internalFormat,mJ,_J,B.colorSpace),J0=B.isVideoTexture!==!0,V0=s.__version===void 0||t===!0,y=JJ.dataReady,HJ=P(B,Z0);eJ(J.TEXTURE_CUBE_MAP,B);let a;if(uJ){if(J0&&V0)Z.texStorage2D(J.TEXTURE_CUBE_MAP,HJ,oJ,Z0.width,Z0.height);for(let e=0;e<6;e++){a=LJ[e].mipmaps;for(let DJ=0;DJ<a.length;DJ++){let FJ=a[DJ];if(B.format!==F8)if(mJ!==null)if(J0){if(y)Z.compressedTexSubImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+e,DJ,0,0,FJ.width,FJ.height,mJ,FJ.data)}else Z.compressedTexImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+e,DJ,oJ,FJ.width,FJ.height,0,FJ.data);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()");else if(J0){if(y)Z.texSubImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+e,DJ,0,0,FJ.width,FJ.height,mJ,_J,FJ.data)}else Z.texImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+e,DJ,oJ,FJ.width,FJ.height,0,mJ,_J,FJ.data)}}}else{if(a=B.mipmaps,J0&&V0){if(a.length>0)HJ++;let e=AJ(LJ[0]);Z.texStorage2D(J.TEXTURE_CUBE_MAP,HJ,oJ,e.width,e.height)}for(let e=0;e<6;e++)if(GJ){if(J0){if(y)Z.texSubImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+e,0,0,0,LJ[e].width,LJ[e].height,mJ,_J,LJ[e].data)}else Z.texImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+e,0,oJ,LJ[e].width,LJ[e].height,0,mJ,_J,LJ[e].data);for(let DJ=0;DJ<a.length;DJ++){let tJ=a[DJ].image[e].image;if(J0){if(y)Z.texSubImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+e,DJ+1,0,0,tJ.width,tJ.height,mJ,_J,tJ.data)}else Z.texImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+e,DJ+1,oJ,tJ.width,tJ.height,0,mJ,_J,tJ.data)}}else{if(J0){if(y)Z.texSubImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+e,0,0,0,mJ,_J,LJ[e])}else Z.texImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+e,0,oJ,mJ,_J,LJ[e]);for(let DJ=0;DJ<a.length;DJ++){let FJ=a[DJ];if(J0){if(y)Z.texSubImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+e,DJ+1,0,0,mJ,_J,FJ.image[e])}else Z.texImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+e,DJ+1,oJ,mJ,_J,FJ.image[e])}}}if(R(B))O(J.TEXTURE_CUBE_MAP);if(s.__version=JJ.version,B.onUpdate)B.onUpdate(B)}S.__version=B.version}function wJ(S,B,h,t,JJ,s){let vJ=Y.convert(h.format,h.colorSpace),OJ=Y.convert(h.type),BJ=F(h.internalFormat,vJ,OJ,h.colorSpace),uJ=$.get(B),GJ=$.get(h);if(GJ.__renderTarget=B,!uJ.__hasExternalTextures){let LJ=Math.max(1,B.width>>s),Z0=Math.max(1,B.height>>s);if(JJ===J.TEXTURE_3D||JJ===J.TEXTURE_2D_ARRAY)Z.texImage3D(JJ,s,BJ,LJ,Z0,B.depth,0,vJ,OJ,null);else Z.texImage2D(JJ,s,BJ,LJ,Z0,0,vJ,OJ,null)}if(Z.bindFramebuffer(J.FRAMEBUFFER,S),ZJ(B))H.framebufferTexture2DMultisampleEXT(J.FRAMEBUFFER,t,JJ,GJ.__webglTexture,0,PJ(B));else if(JJ===J.TEXTURE_2D||JJ>=J.TEXTURE_CUBE_MAP_POSITIVE_X&&JJ<=J.TEXTURE_CUBE_MAP_NEGATIVE_Z)J.framebufferTexture2D(J.FRAMEBUFFER,t,JJ,GJ.__webglTexture,s);Z.bindFramebuffer(J.FRAMEBUFFER,null)}function EJ(S,B,h){if(J.bindRenderbuffer(J.RENDERBUFFER,S),B.depthBuffer){let t=B.depthTexture,JJ=t&&t.isDepthTexture?t.type:null,s=C(B.stencilBuffer,JJ),vJ=B.stencilBuffer?J.DEPTH_STENCIL_ATTACHMENT:J.DEPTH_ATTACHMENT,OJ=PJ(B);if(ZJ(B))H.renderbufferStorageMultisampleEXT(J.RENDERBUFFER,OJ,s,B.width,B.height);else if(h)J.renderbufferStorageMultisample(J.RENDERBUFFER,OJ,s,B.width,B.height);else J.renderbufferStorage(J.RENDERBUFFER,s,B.width,B.height);J.framebufferRenderbuffer(J.FRAMEBUFFER,vJ,J.RENDERBUFFER,S)}else{let t=B.textures;for(let JJ=0;JJ<t.length;JJ++){let s=t[JJ],vJ=Y.convert(s.format,s.colorSpace),OJ=Y.convert(s.type),BJ=F(s.internalFormat,vJ,OJ,s.colorSpace),uJ=PJ(B);if(h&&ZJ(B)===!1)J.renderbufferStorageMultisample(J.RENDERBUFFER,uJ,BJ,B.width,B.height);else if(ZJ(B))H.renderbufferStorageMultisampleEXT(J.RENDERBUFFER,uJ,BJ,B.width,B.height);else J.renderbufferStorage(J.RENDERBUFFER,BJ,B.width,B.height)}}J.bindRenderbuffer(J.RENDERBUFFER,null)}function Q0(S,B){if(B&&B.isWebGLCubeRenderTarget)throw Error("Depth Texture with cube render targets is not supported");if(Z.bindFramebuffer(J.FRAMEBUFFER,S),!(B.depthTexture&&B.depthTexture.isDepthTexture))throw Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");let t=$.get(B.depthTexture);if(t.__renderTarget=B,!t.__webglTexture||B.depthTexture.image.width!==B.width||B.depthTexture.image.height!==B.height)B.depthTexture.image.width=B.width,B.depthTexture.image.height=B.height,B.depthTexture.needsUpdate=!0;r(B.depthTexture,0);let JJ=t.__webglTexture,s=PJ(B);if(B.depthTexture.format===VQ)if(ZJ(B))H.framebufferTexture2DMultisampleEXT(J.FRAMEBUFFER,J.DEPTH_ATTACHMENT,J.TEXTURE_2D,JJ,0,s);else J.framebufferTexture2D(J.FRAMEBUFFER,J.DEPTH_ATTACHMENT,J.TEXTURE_2D,JJ,0);else if(B.depthTexture.format===U7)if(ZJ(B))H.framebufferTexture2DMultisampleEXT(J.FRAMEBUFFER,J.DEPTH_STENCIL_ATTACHMENT,J.TEXTURE_2D,JJ,0,s);else J.framebufferTexture2D(J.FRAMEBUFFER,J.DEPTH_STENCIL_ATTACHMENT,J.TEXTURE_2D,JJ,0);else throw Error("Unknown depthTexture format")}function fJ(S){let B=$.get(S),h=S.isWebGLCubeRenderTarget===!0;if(B.__boundDepthTexture!==S.depthTexture){let t=S.depthTexture;if(B.__depthDisposeCallback)B.__depthDisposeCallback();if(t){let JJ=()=>{delete B.__boundDepthTexture,delete B.__depthDisposeCallback,t.removeEventListener("dispose",JJ)};t.addEventListener("dispose",JJ),B.__depthDisposeCallback=JJ}B.__boundDepthTexture=t}if(S.depthTexture&&!B.__autoAllocateDepthBuffer){if(h)throw Error("target.depthTexture not supported in Cube render targets");Q0(B.__webglFramebuffer,S)}else if(h){B.__webglDepthbuffer=[];for(let t=0;t<6;t++)if(Z.bindFramebuffer(J.FRAMEBUFFER,B.__webglFramebuffer[t]),B.__webglDepthbuffer[t]===void 0)B.__webglDepthbuffer[t]=J.createRenderbuffer(),EJ(B.__webglDepthbuffer[t],S,!1);else{let JJ=S.stencilBuffer?J.DEPTH_STENCIL_ATTACHMENT:J.DEPTH_ATTACHMENT,s=B.__webglDepthbuffer[t];J.bindRenderbuffer(J.RENDERBUFFER,s),J.framebufferRenderbuffer(J.FRAMEBUFFER,JJ,J.RENDERBUFFER,s)}}else if(Z.bindFramebuffer(J.FRAMEBUFFER,B.__webglFramebuffer),B.__webglDepthbuffer===void 0)B.__webglDepthbuffer=J.createRenderbuffer(),EJ(B.__webglDepthbuffer,S,!1);else{let t=S.stencilBuffer?J.DEPTH_STENCIL_ATTACHMENT:J.DEPTH_ATTACHMENT,JJ=B.__webglDepthbuffer;J.bindRenderbuffer(J.RENDERBUFFER,JJ),J.framebufferRenderbuffer(J.FRAMEBUFFER,t,J.RENDERBUFFER,JJ)}Z.bindFramebuffer(J.FRAMEBUFFER,null)}function sJ(S,B,h){let t=$.get(S);if(B!==void 0)wJ(t.__webglFramebuffer,S,S.texture,J.COLOR_ATTACHMENT0,J.TEXTURE_2D,0);if(h!==void 0)fJ(S)}function $J(S){let B=S.texture,h=$.get(S),t=$.get(B);S.addEventListener("dispose",w);let JJ=S.textures,s=S.isWebGLCubeRenderTarget===!0,vJ=JJ.length>1;if(!vJ){if(t.__webglTexture===void 0)t.__webglTexture=J.createTexture();t.__version=B.version,X.memory.textures++}if(s){h.__webglFramebuffer=[];for(let OJ=0;OJ<6;OJ++)if(B.mipmaps&&B.mipmaps.length>0){h.__webglFramebuffer[OJ]=[];for(let BJ=0;BJ<B.mipmaps.length;BJ++)h.__webglFramebuffer[OJ][BJ]=J.createFramebuffer()}else h.__webglFramebuffer[OJ]=J.createFramebuffer()}else{if(B.mipmaps&&B.mipmaps.length>0){h.__webglFramebuffer=[];for(let OJ=0;OJ<B.mipmaps.length;OJ++)h.__webglFramebuffer[OJ]=J.createFramebuffer()}else h.__webglFramebuffer=J.createFramebuffer();if(vJ)for(let OJ=0,BJ=JJ.length;OJ<BJ;OJ++){let uJ=$.get(JJ[OJ]);if(uJ.__webglTexture===void 0)uJ.__webglTexture=J.createTexture(),X.memory.textures++}if(S.samples>0&&ZJ(S)===!1){h.__webglMultisampledFramebuffer=J.createFramebuffer(),h.__webglColorRenderbuffer=[],Z.bindFramebuffer(J.FRAMEBUFFER,h.__webglMultisampledFramebuffer);for(let OJ=0;OJ<JJ.length;OJ++){let BJ=JJ[OJ];h.__webglColorRenderbuffer[OJ]=J.createRenderbuffer(),J.bindRenderbuffer(J.RENDERBUFFER,h.__webglColorRenderbuffer[OJ]);let uJ=Y.convert(BJ.format,BJ.colorSpace),GJ=Y.convert(BJ.type),LJ=F(BJ.internalFormat,uJ,GJ,BJ.colorSpace,S.isXRRenderTarget===!0),Z0=PJ(S);J.renderbufferStorageMultisample(J.RENDERBUFFER,Z0,LJ,S.width,S.height),J.framebufferRenderbuffer(J.FRAMEBUFFER,J.COLOR_ATTACHMENT0+OJ,J.RENDERBUFFER,h.__webglColorRenderbuffer[OJ])}if(J.bindRenderbuffer(J.RENDERBUFFER,null),S.depthBuffer)h.__webglDepthRenderbuffer=J.createRenderbuffer(),EJ(h.__webglDepthRenderbuffer,S,!0);Z.bindFramebuffer(J.FRAMEBUFFER,null)}}if(s){Z.bindTexture(J.TEXTURE_CUBE_MAP,t.__webglTexture),eJ(J.TEXTURE_CUBE_MAP,B);for(let OJ=0;OJ<6;OJ++)if(B.mipmaps&&B.mipmaps.length>0)for(let BJ=0;BJ<B.mipmaps.length;BJ++)wJ(h.__webglFramebuffer[OJ][BJ],S,B,J.COLOR_ATTACHMENT0,J.TEXTURE_CUBE_MAP_POSITIVE_X+OJ,BJ);else wJ(h.__webglFramebuffer[OJ],S,B,J.COLOR_ATTACHMENT0,J.TEXTURE_CUBE_MAP_POSITIVE_X+OJ,0);if(R(B))O(J.TEXTURE_CUBE_MAP);Z.unbindTexture()}else if(vJ){for(let OJ=0,BJ=JJ.length;OJ<BJ;OJ++){let uJ=JJ[OJ],GJ=$.get(uJ);if(Z.bindTexture(J.TEXTURE_2D,GJ.__webglTexture),eJ(J.TEXTURE_2D,uJ),wJ(h.__webglFramebuffer,S,uJ,J.COLOR_ATTACHMENT0+OJ,J.TEXTURE_2D,0),R(uJ))O(J.TEXTURE_2D)}Z.unbindTexture()}else{let OJ=J.TEXTURE_2D;if(S.isWebGL3DRenderTarget||S.isWebGLArrayRenderTarget)OJ=S.isWebGL3DRenderTarget?J.TEXTURE_3D:J.TEXTURE_2D_ARRAY;if(Z.bindTexture(OJ,t.__webglTexture),eJ(OJ,B),B.mipmaps&&B.mipmaps.length>0)for(let BJ=0;BJ<B.mipmaps.length;BJ++)wJ(h.__webglFramebuffer[BJ],S,B,J.COLOR_ATTACHMENT0,OJ,BJ);else wJ(h.__webglFramebuffer,S,B,J.COLOR_ATTACHMENT0,OJ,0);if(R(B))O(OJ);Z.unbindTexture()}if(S.depthBuffer)fJ(S)}function QJ(S){let B=S.textures;for(let h=0,t=B.length;h<t;h++){let JJ=B[h];if(R(JJ)){let s=D(S),vJ=$.get(JJ).__webglTexture;Z.bindTexture(s,vJ),O(s),Z.unbindTexture()}}}let A=[],IJ=[];function KJ(S){if(S.samples>0){if(ZJ(S)===!1){let{textures:B,width:h,height:t}=S,JJ=J.COLOR_BUFFER_BIT,s=S.stencilBuffer?J.DEPTH_STENCIL_ATTACHMENT:J.DEPTH_ATTACHMENT,vJ=$.get(S),OJ=B.length>1;if(OJ)for(let BJ=0;BJ<B.length;BJ++)Z.bindFramebuffer(J.FRAMEBUFFER,vJ.__webglMultisampledFramebuffer),J.framebufferRenderbuffer(J.FRAMEBUFFER,J.COLOR_ATTACHMENT0+BJ,J.RENDERBUFFER,null),Z.bindFramebuffer(J.FRAMEBUFFER,vJ.__webglFramebuffer),J.framebufferTexture2D(J.DRAW_FRAMEBUFFER,J.COLOR_ATTACHMENT0+BJ,J.TEXTURE_2D,null,0);Z.bindFramebuffer(J.READ_FRAMEBUFFER,vJ.__webglMultisampledFramebuffer),Z.bindFramebuffer(J.DRAW_FRAMEBUFFER,vJ.__webglFramebuffer);for(let BJ=0;BJ<B.length;BJ++){if(S.resolveDepthBuffer){if(S.depthBuffer)JJ|=J.DEPTH_BUFFER_BIT;if(S.stencilBuffer&&S.resolveStencilBuffer)JJ|=J.STENCIL_BUFFER_BIT}if(OJ){J.framebufferRenderbuffer(J.READ_FRAMEBUFFER,J.COLOR_ATTACHMENT0,J.RENDERBUFFER,vJ.__webglColorRenderbuffer[BJ]);let uJ=$.get(B[BJ]).__webglTexture;J.framebufferTexture2D(J.DRAW_FRAMEBUFFER,J.COLOR_ATTACHMENT0,J.TEXTURE_2D,uJ,0)}if(J.blitFramebuffer(0,0,h,t,0,0,h,t,JJ,J.NEAREST),K===!0){if(A.length=0,IJ.length=0,A.push(J.COLOR_ATTACHMENT0+BJ),S.depthBuffer&&S.resolveDepthBuffer===!1)A.push(s),IJ.push(s),J.invalidateFramebuffer(J.DRAW_FRAMEBUFFER,IJ);J.invalidateFramebuffer(J.READ_FRAMEBUFFER,A)}}if(Z.bindFramebuffer(J.READ_FRAMEBUFFER,null),Z.bindFramebuffer(J.DRAW_FRAMEBUFFER,null),OJ)for(let BJ=0;BJ<B.length;BJ++){Z.bindFramebuffer(J.FRAMEBUFFER,vJ.__webglMultisampledFramebuffer),J.framebufferRenderbuffer(J.FRAMEBUFFER,J.COLOR_ATTACHMENT0+BJ,J.RENDERBUFFER,vJ.__webglColorRenderbuffer[BJ]);let uJ=$.get(B[BJ]).__webglTexture;Z.bindFramebuffer(J.FRAMEBUFFER,vJ.__webglFramebuffer),J.framebufferTexture2D(J.DRAW_FRAMEBUFFER,J.COLOR_ATTACHMENT0+BJ,J.TEXTURE_2D,uJ,0)}Z.bindFramebuffer(J.DRAW_FRAMEBUFFER,vJ.__webglMultisampledFramebuffer)}else if(S.depthBuffer&&S.resolveDepthBuffer===!1&&K){let B=S.stencilBuffer?J.DEPTH_STENCIL_ATTACHMENT:J.DEPTH_ATTACHMENT;J.invalidateFramebuffer(J.DRAW_FRAMEBUFFER,[B])}}}function PJ(S){return Math.min(W.maxSamples,S.samples)}function ZJ(S){let B=$.get(S);return S.samples>0&&Q.has("WEBGL_multisampled_render_to_texture")===!0&&B.__useRenderToTexture!==!1}function pJ(S){let B=X.render.frame;if(U.get(S)!==B)U.set(S,B),S.update()}function VJ(S,B){let{colorSpace:h,format:t,type:JJ}=S;if(S.isCompressedTexture===!0||S.isVideoTexture===!0)return B;if(h!==x0&&h!==x9)if(aJ.getTransfer(h)===q0){if(t!==F8||JJ!==X8)console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType.")}else console.error("THREE.WebGLTextures: Unsupported texture color space:",h);return B}function AJ(S){if(typeof HTMLImageElement<"u"&&S instanceof HTMLImageElement)G.width=S.naturalWidth||S.width,G.height=S.naturalHeight||S.height;else if(typeof VideoFrame<"u"&&S instanceof VideoFrame)G.width=S.displayWidth,G.height=S.displayHeight;else G.width=S.width,G.height=S.height;return G}this.allocateTextureUnit=l,this.resetTextureUnits=p,this.setTexture2D=r,this.setTexture2DArray=n,this.setTexture3D=WJ,this.setTextureCube=d,this.rebindTextures=sJ,this.setupRenderTarget=$J,this.updateRenderTargetMipmap=QJ,this.updateMultisampleRenderTarget=KJ,this.setupDepthRenderbuffer=fJ,this.setupFrameBufferTexture=wJ,this.useMultisampledRTT=ZJ}function mE(J,Q){function Z($,W=x9){let Y,X=aJ.getTransfer(W);if($===X8)return J.UNSIGNED_BYTE;if($===F$)return J.UNSIGNED_SHORT_4_4_4_4;if($===D$)return J.UNSIGNED_SHORT_5_5_5_1;if($===_X)return J.UNSIGNED_INT_5_9_9_9_REV;if($===zX)return J.BYTE;if($===CX)return J.SHORT;if($===K7)return J.UNSIGNED_SHORT;if($===V$)return J.INT;if($===q6)return J.UNSIGNED_INT;if($===R9)return J.FLOAT;if($===G7)return J.HALF_FLOAT;if($===MX)return J.ALPHA;if($===IX)return J.RGB;if($===F8)return J.RGBA;if($===O6)return J.LUMINANCE;if($===kQ)return J.LUMINANCE_ALPHA;if($===VQ)return J.DEPTH_COMPONENT;if($===U7)return J.DEPTH_STENCIL;if($===R6)return J.RED;if($===B$)return J.RED_INTEGER;if($===FQ)return J.RG;if($===L$)return J.RG_INTEGER;if($===z$)return J.RGBA_INTEGER;if($===DQ||$===BQ||$===LQ||$===zQ)if(X===q0)if(Y=Q.get("WEBGL_compressed_texture_s3tc_srgb"),Y!==null){if($===DQ)return Y.COMPRESSED_SRGB_S3TC_DXT1_EXT;if($===BQ)return Y.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if($===LQ)return Y.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if($===zQ)return Y.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(Y=Q.get("WEBGL_compressed_texture_s3tc"),Y!==null){if($===DQ)return Y.COMPRESSED_RGB_S3TC_DXT1_EXT;if($===BQ)return Y.COMPRESSED_RGBA_S3TC_DXT1_EXT;if($===LQ)return Y.COMPRESSED_RGBA_S3TC_DXT3_EXT;if($===zQ)return Y.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if($===C$||$===_$||$===M$||$===I$)if(Y=Q.get("WEBGL_compressed_texture_pvrtc"),Y!==null){if($===C$)return Y.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if($===_$)return Y.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if($===M$)return Y.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if($===I$)return Y.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if($===w$||$===A$||$===P$)if(Y=Q.get("WEBGL_compressed_texture_etc"),Y!==null){if($===w$||$===A$)return X===q0?Y.COMPRESSED_SRGB8_ETC2:Y.COMPRESSED_RGB8_ETC2;if($===P$)return X===q0?Y.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:Y.COMPRESSED_RGBA8_ETC2_EAC}else return null;if($===T$||$===S$||$===j$||$===v$||$===y$||$===x$||$===b$||$===h$||$===f$||$===g$||$===p$||$===m$||$===l$||$===u$)if(Y=Q.get("WEBGL_compressed_texture_astc"),Y!==null){if($===T$)return X===q0?Y.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:Y.COMPRESSED_RGBA_ASTC_4x4_KHR;if($===S$)return X===q0?Y.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:Y.COMPRESSED_RGBA_ASTC_5x4_KHR;if($===j$)return X===q0?Y.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:Y.COMPRESSED_RGBA_ASTC_5x5_KHR;if($===v$)return X===q0?Y.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:Y.COMPRESSED_RGBA_ASTC_6x5_KHR;if($===y$)return X===q0?Y.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:Y.COMPRESSED_RGBA_ASTC_6x6_KHR;if($===x$)return X===q0?Y.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:Y.COMPRESSED_RGBA_ASTC_8x5_KHR;if($===b$)return X===q0?Y.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:Y.COMPRESSED_RGBA_ASTC_8x6_KHR;if($===h$)return X===q0?Y.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:Y.COMPRESSED_RGBA_ASTC_8x8_KHR;if($===f$)return X===q0?Y.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:Y.COMPRESSED_RGBA_ASTC_10x5_KHR;if($===g$)return X===q0?Y.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:Y.COMPRESSED_RGBA_ASTC_10x6_KHR;if($===p$)return X===q0?Y.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:Y.COMPRESSED_RGBA_ASTC_10x8_KHR;if($===m$)return X===q0?Y.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:Y.COMPRESSED_RGBA_ASTC_10x10_KHR;if($===l$)return X===q0?Y.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:Y.COMPRESSED_RGBA_ASTC_12x10_KHR;if($===u$)return X===q0?Y.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:Y.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if($===CQ||$===d$||$===c$)if(Y=Q.get("EXT_texture_compression_bptc"),Y!==null){if($===CQ)return X===q0?Y.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:Y.COMPRESSED_RGBA_BPTC_UNORM_EXT;if($===d$)return Y.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if($===c$)return Y.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if($===wX||$===n$||$===s$||$===i$)if(Y=Q.get("EXT_texture_compression_rgtc"),Y!==null){if($===CQ)return Y.COMPRESSED_RED_RGTC1_EXT;if($===n$)return Y.COMPRESSED_SIGNED_RED_RGTC1_EXT;if($===s$)return Y.COMPRESSED_RED_GREEN_RGTC2_EXT;if($===i$)return Y.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;if($===N6)return J.UNSIGNED_INT_24_8;return J[$]!==void 0?J[$]:null}return{convert:Z}}var AV=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,PV=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class lE{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(J,Q,Z){if(this.texture===null){let $=new R0,W=J.properties.get($);if(W.__webglTexture=Q.texture,Q.depthNear!==Z.depthNear||Q.depthFar!==Z.depthFar)this.depthNear=Q.depthNear,this.depthFar=Q.depthFar;this.texture=$}}getMesh(J){if(this.texture!==null){if(this.mesh===null){let Q=J.cameras[0].viewport,Z=new l0({vertexShader:AV,fragmentShader:PV,uniforms:{depthColor:{value:this.texture},depthWidth:{value:Q.z},depthHeight:{value:Q.w}}});this.mesh=new N0(new F9(20,20),Z)}}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class uE extends I8{constructor(J,Q){super();let Z=this,$=null,W=1,Y=null,X="local-floor",H=1,K=null,G=null,U=null,E=null,q=null,N=null,k=new lE,V=Q.getContextAttributes(),R=null,O=null,D=[],F=[],C=new i,P=null,M=new O0;M.viewport=new XJ;let w=new O0;w.viewport=new XJ;let v=[M,w],L=new xW,_=null,j=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(o){let UJ=D[o];if(UJ===void 0)UJ=new V7,D[o]=UJ;return UJ.getTargetRaySpace()},this.getControllerGrip=function(o){let UJ=D[o];if(UJ===void 0)UJ=new V7,D[o]=UJ;return UJ.getGripSpace()},this.getHand=function(o){let UJ=D[o];if(UJ===void 0)UJ=new V7,D[o]=UJ;return UJ.getHandSpace()};function p(o){let UJ=F.indexOf(o.inputSource);if(UJ===-1)return;let TJ=D[UJ];if(TJ!==void 0)TJ.update(o.inputSource,o.frame,K||Y),TJ.dispatchEvent({type:o.type,data:o.inputSource})}function l(){$.removeEventListener("select",p),$.removeEventListener("selectstart",p),$.removeEventListener("selectend",p),$.removeEventListener("squeeze",p),$.removeEventListener("squeezestart",p),$.removeEventListener("squeezeend",p),$.removeEventListener("end",l),$.removeEventListener("inputsourceschange",c);for(let o=0;o<D.length;o++){let UJ=F[o];if(UJ===null)continue;F[o]=null,D[o].disconnect(UJ)}_=null,j=null,k.reset(),J.setRenderTarget(R),q=null,E=null,U=null,$=null,O=null,eJ.stop(),Z.isPresenting=!1,J.setPixelRatio(P),J.setSize(C.width,C.height,!1),Z.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(o){if(W=o,Z.isPresenting===!0)console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(o){if(X=o,Z.isPresenting===!0)console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return K||Y},this.setReferenceSpace=function(o){K=o},this.getBaseLayer=function(){return E!==null?E:q},this.getBinding=function(){return U},this.getFrame=function(){return N},this.getSession=function(){return $},this.setSession=async function(o){if($=o,$!==null){if(R=J.getRenderTarget(),$.addEventListener("select",p),$.addEventListener("selectstart",p),$.addEventListener("selectend",p),$.addEventListener("squeeze",p),$.addEventListener("squeezestart",p),$.addEventListener("squeezeend",p),$.addEventListener("end",l),$.addEventListener("inputsourceschange",c),V.xrCompatible!==!0)await Q.makeXRCompatible();if(P=J.getPixelRatio(),J.getSize(C),!(typeof XRWebGLBinding<"u"&&("createProjectionLayer"in XRWebGLBinding.prototype))){let TJ={antialias:V.antialias,alpha:!0,depth:V.depth,stencil:V.stencil,framebufferScaleFactor:W};q=new XRWebGLLayer($,Q,TJ),$.updateRenderState({baseLayer:q}),J.setPixelRatio(1),J.setSize(q.framebufferWidth,q.framebufferHeight,!1),O=new H8(q.framebufferWidth,q.framebufferHeight,{format:F8,type:X8,colorSpace:J.outputColorSpace,stencilBuffer:V.stencil})}else{let TJ=null,wJ=null,EJ=null;if(V.depth)EJ=V.stencil?Q.DEPTH24_STENCIL8:Q.DEPTH_COMPONENT24,TJ=V.stencil?U7:VQ,wJ=V.stencil?N6:q6;let Q0={colorFormat:Q.RGBA8,depthFormat:EJ,scaleFactor:W};U=new XRWebGLBinding($,Q),E=U.createProjectionLayer(Q0),$.updateRenderState({layers:[E]}),J.setPixelRatio(1),J.setSize(E.textureWidth,E.textureHeight,!1),O=new H8(E.textureWidth,E.textureHeight,{format:F8,type:X8,depthTexture:new TQ(E.textureWidth,E.textureHeight,wJ,void 0,void 0,void 0,void 0,void 0,void 0,TJ),stencilBuffer:V.stencil,colorSpace:J.outputColorSpace,samples:V.antialias?4:0,resolveDepthBuffer:E.ignoreDepthValues===!1})}O.isXRRenderTarget=!0,this.setFoveation(H),K=null,Y=await $.requestReferenceSpace(X),eJ.setContext($),eJ.start(),Z.isPresenting=!0,Z.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if($!==null)return $.environmentBlendMode},this.getDepthTexture=function(){return k.getDepthTexture()};function c(o){for(let UJ=0;UJ<o.removed.length;UJ++){let TJ=o.removed[UJ],wJ=F.indexOf(TJ);if(wJ>=0)F[wJ]=null,D[wJ].disconnect(TJ)}for(let UJ=0;UJ<o.added.length;UJ++){let TJ=o.added[UJ],wJ=F.indexOf(TJ);if(wJ===-1){for(let Q0=0;Q0<D.length;Q0++)if(Q0>=F.length){F.push(TJ),wJ=Q0;break}else if(F[Q0]===null){F[Q0]=TJ,wJ=Q0;break}if(wJ===-1)break}let EJ=D[wJ];if(EJ)EJ.connect(TJ)}}let r=new I,n=new I;function WJ(o,UJ,TJ){r.setFromMatrixPosition(UJ.matrixWorld),n.setFromMatrixPosition(TJ.matrixWorld);let wJ=r.distanceTo(n),EJ=UJ.projectionMatrix.elements,Q0=TJ.projectionMatrix.elements,fJ=EJ[14]/(EJ[10]-1),sJ=EJ[14]/(EJ[10]+1),$J=(EJ[9]+1)/EJ[5],QJ=(EJ[9]-1)/EJ[5],A=(EJ[8]-1)/EJ[0],IJ=(Q0[8]+1)/Q0[0],KJ=fJ*A,PJ=fJ*IJ,ZJ=wJ/(-A+IJ),pJ=ZJ*-A;if(UJ.matrixWorld.decompose(o.position,o.quaternion,o.scale),o.translateX(pJ),o.translateZ(ZJ),o.matrixWorld.compose(o.position,o.quaternion,o.scale),o.matrixWorldInverse.copy(o.matrixWorld).invert(),EJ[10]===-1)o.projectionMatrix.copy(UJ.projectionMatrix),o.projectionMatrixInverse.copy(UJ.projectionMatrixInverse);else{let VJ=fJ+ZJ,AJ=sJ+ZJ,S=KJ-pJ,B=PJ+(wJ-pJ),h=$J*sJ/AJ*VJ,t=QJ*sJ/AJ*VJ;o.projectionMatrix.makePerspective(S,B,h,t,VJ,AJ),o.projectionMatrixInverse.copy(o.projectionMatrix).invert()}}function d(o,UJ){if(UJ===null)o.matrixWorld.copy(o.matrix);else o.matrixWorld.multiplyMatrices(UJ.matrixWorld,o.matrix);o.matrixWorldInverse.copy(o.matrixWorld).invert()}this.updateCamera=function(o){if($===null)return;let{near:UJ,far:TJ}=o;if(k.texture!==null){if(k.depthNear>0)UJ=k.depthNear;if(k.depthFar>0)TJ=k.depthFar}if(L.near=w.near=M.near=UJ,L.far=w.far=M.far=TJ,_!==L.near||j!==L.far)$.updateRenderState({depthNear:L.near,depthFar:L.far}),_=L.near,j=L.far;M.layers.mask=o.layers.mask|2,w.layers.mask=o.layers.mask|4,L.layers.mask=M.layers.mask|w.layers.mask;let wJ=o.parent,EJ=L.cameras;d(L,wJ);for(let Q0=0;Q0<EJ.length;Q0++)d(EJ[Q0],wJ);if(EJ.length===2)WJ(L,M,w);else L.projectionMatrix.copy(M.projectionMatrix);RJ(o,L,wJ)};function RJ(o,UJ,TJ){if(TJ===null)o.matrix.copy(UJ.matrixWorld);else o.matrix.copy(TJ.matrixWorld),o.matrix.invert(),o.matrix.multiply(UJ.matrixWorld);if(o.matrix.decompose(o.position,o.quaternion,o.scale),o.updateMatrixWorld(!0),o.projectionMatrix.copy(UJ.projectionMatrix),o.projectionMatrixInverse.copy(UJ.projectionMatrixInverse),o.isPerspectiveCamera)o.fov=Z6*2*Math.atan(1/o.projectionMatrix.elements[5]),o.zoom=1}this.getCamera=function(){return L},this.getFoveation=function(){if(E===null&&q===null)return;return H},this.setFoveation=function(o){if(H=o,E!==null)E.fixedFoveation=o;if(q!==null&&q.fixedFoveation!==void 0)q.fixedFoveation=o},this.hasDepthSensing=function(){return k.texture!==null},this.getDepthSensingMesh=function(){return k.getMesh(L)};let NJ=null;function hJ(o,UJ){if(G=UJ.getViewerPose(K||Y),N=UJ,G!==null){let TJ=G.views;if(q!==null)J.setRenderTargetFramebuffer(O,q.framebuffer),J.setRenderTarget(O);let wJ=!1;if(TJ.length!==L.cameras.length)L.cameras.length=0,wJ=!0;for(let fJ=0;fJ<TJ.length;fJ++){let sJ=TJ[fJ],$J=null;if(q!==null)$J=q.getViewport(sJ);else{let A=U.getViewSubImage(E,sJ);if($J=A.viewport,fJ===0)J.setRenderTargetTextures(O,A.colorTexture,E.ignoreDepthValues?void 0:A.depthStencilTexture),J.setRenderTarget(O)}let QJ=v[fJ];if(QJ===void 0)QJ=new O0,QJ.layers.enable(fJ),QJ.viewport=new XJ,v[fJ]=QJ;if(QJ.matrix.fromArray(sJ.transform.matrix),QJ.matrix.decompose(QJ.position,QJ.quaternion,QJ.scale),QJ.projectionMatrix.fromArray(sJ.projectionMatrix),QJ.projectionMatrixInverse.copy(QJ.projectionMatrix).invert(),QJ.viewport.set($J.x,$J.y,$J.width,$J.height),fJ===0)L.matrix.copy(QJ.matrix),L.matrix.decompose(L.position,L.quaternion,L.scale);if(wJ===!0)L.cameras.push(QJ)}let EJ=$.enabledFeatures;if(EJ&&EJ.includes("depth-sensing")&&$.depthUsage=="gpu-optimized"&&U){let fJ=U.getDepthInformation(TJ[0]);if(fJ&&fJ.isValid&&fJ.texture)k.init(J,fJ,$.renderState)}}for(let TJ=0;TJ<D.length;TJ++){let wJ=F[TJ],EJ=D[TJ];if(wJ!==null&&EJ!==void 0)EJ.update(wJ,UJ,K||Y)}if(NJ)NJ(o,UJ);if(UJ.detectedPlanes)Z.dispatchEvent({type:"planesdetected",data:UJ});N=null}let eJ=new SE;eJ.setAnimationLoop(hJ),this.setAnimationLoop=function(o){NJ=o},this.dispose=function(){}}}var A6=/*@__PURE__*/new W8,TV=/*@__PURE__*/new SJ;function SV(J,Q){function Z(R,O){if(R.matrixAutoUpdate===!0)R.updateMatrix();O.value.copy(R.matrix)}function $(R,O){if(O.color.getRGB(R.fogColor.value,iX(J)),O.isFog)R.fogNear.value=O.near,R.fogFar.value=O.far;else if(O.isFogExp2)R.fogDensity.value=O.density}function W(R,O,D,F,C){if(O.isMeshBasicMaterial)Y(R,O);else if(O.isMeshLambertMaterial)Y(R,O);else if(O.isMeshToonMaterial)Y(R,O),E(R,O);else if(O.isMeshPhongMaterial)Y(R,O),U(R,O);else if(O.isMeshStandardMaterial){if(Y(R,O),q(R,O),O.isMeshPhysicalMaterial)N(R,O,C)}else if(O.isMeshMatcapMaterial)Y(R,O),k(R,O);else if(O.isMeshDepthMaterial)Y(R,O);else if(O.isMeshDistanceMaterial)Y(R,O),V(R,O);else if(O.isMeshNormalMaterial)Y(R,O);else if(O.isLineBasicMaterial){if(X(R,O),O.isLineDashedMaterial)H(R,O)}else if(O.isPointsMaterial)K(R,O,D,F);else if(O.isSpriteMaterial)G(R,O);else if(O.isShadowMaterial)R.color.value.copy(O.color),R.opacity.value=O.opacity;else if(O.isShaderMaterial)O.uniformsNeedUpdate=!1}function Y(R,O){if(R.opacity.value=O.opacity,O.color)R.diffuse.value.copy(O.color);if(O.emissive)R.emissive.value.copy(O.emissive).multiplyScalar(O.emissiveIntensity);if(O.map)R.map.value=O.map,Z(O.map,R.mapTransform);if(O.alphaMap)R.alphaMap.value=O.alphaMap,Z(O.alphaMap,R.alphaMapTransform);if(O.bumpMap){if(R.bumpMap.value=O.bumpMap,Z(O.bumpMap,R.bumpMapTransform),R.bumpScale.value=O.bumpScale,O.side===n0)R.bumpScale.value*=-1}if(O.normalMap){if(R.normalMap.value=O.normalMap,Z(O.normalMap,R.normalMapTransform),R.normalScale.value.copy(O.normalScale),O.side===n0)R.normalScale.value.negate()}if(O.displacementMap)R.displacementMap.value=O.displacementMap,Z(O.displacementMap,R.displacementMapTransform),R.displacementScale.value=O.displacementScale,R.displacementBias.value=O.displacementBias;if(O.emissiveMap)R.emissiveMap.value=O.emissiveMap,Z(O.emissiveMap,R.emissiveMapTransform);if(O.specularMap)R.specularMap.value=O.specularMap,Z(O.specularMap,R.specularMapTransform);if(O.alphaTest>0)R.alphaTest.value=O.alphaTest;let D=Q.get(O),F=D.envMap,C=D.envMapRotation;if(F){if(R.envMap.value=F,A6.copy(C),A6.x*=-1,A6.y*=-1,A6.z*=-1,F.isCubeTexture&&F.isRenderTargetTexture===!1)A6.y*=-1,A6.z*=-1;R.envMapRotation.value.setFromMatrix4(TV.makeRotationFromEuler(A6)),R.flipEnvMap.value=F.isCubeTexture&&F.isRenderTargetTexture===!1?-1:1,R.reflectivity.value=O.reflectivity,R.ior.value=O.ior,R.refractionRatio.value=O.refractionRatio}if(O.lightMap)R.lightMap.value=O.lightMap,R.lightMapIntensity.value=O.lightMapIntensity,Z(O.lightMap,R.lightMapTransform);if(O.aoMap)R.aoMap.value=O.aoMap,R.aoMapIntensity.value=O.aoMapIntensity,Z(O.aoMap,R.aoMapTransform)}function X(R,O){if(R.diffuse.value.copy(O.color),R.opacity.value=O.opacity,O.map)R.map.value=O.map,Z(O.map,R.mapTransform)}function H(R,O){R.dashSize.value=O.dashSize,R.totalSize.value=O.dashSize+O.gapSize,R.scale.value=O.scale}function K(R,O,D,F){if(R.diffuse.value.copy(O.color),R.opacity.value=O.opacity,R.size.value=O.size*D,R.scale.value=F*0.5,O.map)R.map.value=O.map,Z(O.map,R.uvTransform);if(O.alphaMap)R.alphaMap.value=O.alphaMap,Z(O.alphaMap,R.alphaMapTransform);if(O.alphaTest>0)R.alphaTest.value=O.alphaTest}function G(R,O){if(R.diffuse.value.copy(O.color),R.opacity.value=O.opacity,R.rotation.value=O.rotation,O.map)R.map.value=O.map,Z(O.map,R.mapTransform);if(O.alphaMap)R.alphaMap.value=O.alphaMap,Z(O.alphaMap,R.alphaMapTransform);if(O.alphaTest>0)R.alphaTest.value=O.alphaTest}function U(R,O){R.specular.value.copy(O.specular),R.shininess.value=Math.max(O.shininess,0.0001)}function E(R,O){if(O.gradientMap)R.gradientMap.value=O.gradientMap}function q(R,O){if(R.metalness.value=O.metalness,O.metalnessMap)R.metalnessMap.value=O.metalnessMap,Z(O.metalnessMap,R.metalnessMapTransform);if(R.roughness.value=O.roughness,O.roughnessMap)R.roughnessMap.value=O.roughnessMap,Z(O.roughnessMap,R.roughnessMapTransform);if(O.envMap)R.envMapIntensity.value=O.envMapIntensity}function N(R,O,D){if(R.ior.value=O.ior,O.sheen>0){if(R.sheenColor.value.copy(O.sheenColor).multiplyScalar(O.sheen),R.sheenRoughness.value=O.sheenRoughness,O.sheenColorMap)R.sheenColorMap.value=O.sheenColorMap,Z(O.sheenColorMap,R.sheenColorMapTransform);if(O.sheenRoughnessMap)R.sheenRoughnessMap.value=O.sheenRoughnessMap,Z(O.sheenRoughnessMap,R.sheenRoughnessMapTransform)}if(O.clearcoat>0){if(R.clearcoat.value=O.clearcoat,R.clearcoatRoughness.value=O.clearcoatRoughness,O.clearcoatMap)R.clearcoatMap.value=O.clearcoatMap,Z(O.clearcoatMap,R.clearcoatMapTransform);if(O.clearcoatRoughnessMap)R.clearcoatRoughnessMap.value=O.clearcoatRoughnessMap,Z(O.clearcoatRoughnessMap,R.clearcoatRoughnessMapTransform);if(O.clearcoatNormalMap){if(R.clearcoatNormalMap.value=O.clearcoatNormalMap,Z(O.clearcoatNormalMap,R.clearcoatNormalMapTransform),R.clearcoatNormalScale.value.copy(O.clearcoatNormalScale),O.side===n0)R.clearcoatNormalScale.value.negate()}}if(O.dispersion>0)R.dispersion.value=O.dispersion;if(O.iridescence>0){if(R.iridescence.value=O.iridescence,R.iridescenceIOR.value=O.iridescenceIOR,R.iridescenceThicknessMinimum.value=O.iridescenceThicknessRange[0],R.iridescenceThicknessMaximum.value=O.iridescenceThicknessRange[1],O.iridescenceMap)R.iridescenceMap.value=O.iridescenceMap,Z(O.iridescenceMap,R.iridescenceMapTransform);if(O.iridescenceThicknessMap)R.iridescenceThicknessMap.value=O.iridescenceThicknessMap,Z(O.iridescenceThicknessMap,R.iridescenceThicknessMapTransform)}if(O.transmission>0){if(R.transmission.value=O.transmission,R.transmissionSamplerMap.value=D.texture,R.transmissionSamplerSize.value.set(D.width,D.height),O.transmissionMap)R.transmissionMap.value=O.transmissionMap,Z(O.transmissionMap,R.transmissionMapTransform);if(R.thickness.value=O.thickness,O.thicknessMap)R.thicknessMap.value=O.thicknessMap,Z(O.thicknessMap,R.thicknessMapTransform);R.attenuationDistance.value=O.attenuationDistance,R.attenuationColor.value.copy(O.attenuationColor)}if(O.anisotropy>0){if(R.anisotropyVector.value.set(O.anisotropy*Math.cos(O.anisotropyRotation),O.anisotropy*Math.sin(O.anisotropyRotation)),O.anisotropyMap)R.anisotropyMap.value=O.anisotropyMap,Z(O.anisotropyMap,R.anisotropyMapTransform)}if(R.specularIntensity.value=O.specularIntensity,R.specularColor.value.copy(O.specularColor),O.specularColorMap)R.specularColorMap.value=O.specularColorMap,Z(O.specularColorMap,R.specularColorMapTransform);if(O.specularIntensityMap)R.specularIntensityMap.value=O.specularIntensityMap,Z(O.specularIntensityMap,R.specularIntensityMapTransform)}function k(R,O){if(O.matcap)R.matcap.value=O.matcap}function V(R,O){let D=Q.get(O).light;R.referencePosition.value.setFromMatrixPosition(D.matrixWorld),R.nearDistance.value=D.shadow.camera.near,R.farDistance.value=D.shadow.camera.far}return{refreshFogUniforms:$,refreshMaterialUniforms:W}}function jV(J,Q,Z,$){let W={},Y={},X=[],H=J.getParameter(J.MAX_UNIFORM_BUFFER_BINDINGS);function K(D,F){let C=F.program;$.uniformBlockBinding(D,C)}function G(D,F){let C=W[D.id];if(C===void 0)k(D),C=U(D),W[D.id]=C,D.addEventListener("dispose",R);let P=F.program;$.updateUBOMapping(D,P);let M=Q.render.frame;if(Y[D.id]!==M)q(D),Y[D.id]=M}function U(D){let F=E();D.__bindingPointIndex=F;let C=J.createBuffer(),P=D.__size,M=D.usage;return J.bindBuffer(J.UNIFORM_BUFFER,C),J.bufferData(J.UNIFORM_BUFFER,P,M),J.bindBuffer(J.UNIFORM_BUFFER,null),J.bindBufferBase(J.UNIFORM_BUFFER,F,C),C}function E(){for(let D=0;D<H;D++)if(X.indexOf(D)===-1)return X.push(D),D;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function q(D){let F=W[D.id],C=D.uniforms,P=D.__cache;J.bindBuffer(J.UNIFORM_BUFFER,F);for(let M=0,w=C.length;M<w;M++){let v=Array.isArray(C[M])?C[M]:[C[M]];for(let L=0,_=v.length;L<_;L++){let j=v[L];if(N(j,M,L,P)===!0){let p=j.__offset,l=Array.isArray(j.value)?j.value:[j.value],c=0;for(let r=0;r<l.length;r++){let n=l[r],WJ=V(n);if(typeof n==="number"||typeof n==="boolean")j.__data[0]=n,J.bufferSubData(J.UNIFORM_BUFFER,p+c,j.__data);else if(n.isMatrix3)j.__data[0]=n.elements[0],j.__data[1]=n.elements[1],j.__data[2]=n.elements[2],j.__data[3]=0,j.__data[4]=n.elements[3],j.__data[5]=n.elements[4],j.__data[6]=n.elements[5],j.__data[7]=0,j.__data[8]=n.elements[6],j.__data[9]=n.elements[7],j.__data[10]=n.elements[8],j.__data[11]=0;else n.toArray(j.__data,c),c+=WJ.storage/Float32Array.BYTES_PER_ELEMENT}J.bufferSubData(J.UNIFORM_BUFFER,p,j.__data)}}}J.bindBuffer(J.UNIFORM_BUFFER,null)}function N(D,F,C,P){let M=D.value,w=F+"_"+C;if(P[w]===void 0){if(typeof M==="number"||typeof M==="boolean")P[w]=M;else P[w]=M.clone();return!0}else{let v=P[w];if(typeof M==="number"||typeof M==="boolean"){if(v!==M)return P[w]=M,!0}else if(v.equals(M)===!1)return v.copy(M),!0}return!1}function k(D){let F=D.uniforms,C=0,P=16;for(let w=0,v=F.length;w<v;w++){let L=Array.isArray(F[w])?F[w]:[F[w]];for(let _=0,j=L.length;_<j;_++){let p=L[_],l=Array.isArray(p.value)?p.value:[p.value];for(let c=0,r=l.length;c<r;c++){let n=l[c],WJ=V(n),d=C%P,RJ=d%WJ.boundary,NJ=d+RJ;if(C+=RJ,NJ!==0&&P-NJ<WJ.storage)C+=P-NJ;p.__data=new Float32Array(WJ.storage/Float32Array.BYTES_PER_ELEMENT),p.__offset=C,C+=WJ.storage}}}let M=C%P;if(M>0)C+=P-M;return D.__size=C,D.__cache={},this}function V(D){let F={boundary:0,storage:0};if(typeof D==="number"||typeof D==="boolean")F.boundary=4,F.storage=4;else if(D.isVector2)F.boundary=8,F.storage=8;else if(D.isVector3||D.isColor)F.boundary=16,F.storage=12;else if(D.isVector4)F.boundary=16,F.storage=16;else if(D.isMatrix3)F.boundary=48,F.storage=48;else if(D.isMatrix4)F.boundary=64,F.storage=64;else if(D.isTexture)console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group.");else console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",D);return F}function R(D){let F=D.target;F.removeEventListener("dispose",R);let C=X.indexOf(F.__bindingPointIndex);X.splice(C,1),J.deleteBuffer(W[F.id]),delete W[F.id],delete Y[F.id]}function O(){for(let D in W)J.deleteBuffer(W[D]);X=[],W={},Y={}}return{bind:K,update:G,dispose:O}}class iW{constructor(J={}){let{canvas:Q=mX(),context:Z=null,depth:$=!0,stencil:W=!1,alpha:Y=!1,antialias:X=!1,premultipliedAlpha:H=!0,preserveDrawingBuffer:K=!1,powerPreference:G="default",failIfMajorPerformanceCaveat:U=!1,reverseDepthBuffer:E=!1}=J;this.isWebGLRenderer=!0;let q;if(Z!==null){if(typeof WebGLRenderingContext<"u"&&Z instanceof WebGLRenderingContext)throw Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");q=Z.getContextAttributes().alpha}else q=Y;let N=new Uint32Array(4),k=new Int32Array(4),V=null,R=null,O=[],D=[];this.domElement=Q,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=f8,this.toneMapping=n8,this.toneMappingExposure=1;let F=this,C=!1,P=0,M=0,w=null,v=-1,L=null,_=new XJ,j=new XJ,p=null,l=new u(0),c=0,r=Q.width,n=Q.height,WJ=1,d=null,RJ=null,NJ=new XJ(0,0,r,n),hJ=new XJ(0,0,r,n),eJ=!1,o=new _6,UJ=!1,TJ=!1;this.transmissionResolutionScale=1;let wJ=new SJ,EJ=new SJ,Q0=new I,fJ=new XJ,sJ={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},$J=!1;function QJ(){return w===null?WJ:1}let A=Z;function IJ(z,x){return Q.getContext(z,x)}try{let z={alpha:!0,depth:$,stencil:W,antialias:X,premultipliedAlpha:H,preserveDrawingBuffer:K,powerPreference:G,failIfMajorPerformanceCaveat:U};if("setAttribute"in Q)Q.setAttribute("data-engine",`three.js r${j9}`);if(Q.addEventListener("webglcontextlost",a,!1),Q.addEventListener("webglcontextrestored",e,!1),Q.addEventListener("webglcontextcreationerror",DJ,!1),A===null){if(A=IJ("webgl2",z),A===null)if(IJ("webgl2"))throw Error("Error creating WebGL context with your selected attributes.");else throw Error("Error creating WebGL context.")}}catch(z){throw console.error("THREE.WebGLRenderer: "+z.message),z}let KJ,PJ,ZJ,pJ,VJ,AJ,S,B,h,t,JJ,s,vJ,OJ,BJ,uJ,GJ,LJ,Z0,mJ,_J,oJ,J0,V0;function y(){if(KJ=new rR(A),KJ.init(),oJ=new mE(A,KJ),PJ=new cR(A,KJ,J,oJ),ZJ=new IV(A,KJ),PJ.reverseDepthBuffer&&E)ZJ.buffers.depth.setReversed(!0);pJ=new Jk(A),VJ=new NV,AJ=new wV(A,KJ,ZJ,VJ,PJ,oJ,pJ),S=new sR(F),B=new aR(F),h=new H1(A),J0=new uR(A,h),t=new tR(A,h,pJ,J0),JJ=new Zk(A,t,h,pJ),Z0=new Qk(A,PJ,AJ),uJ=new nR(VJ),s=new qV(F,S,B,KJ,PJ,J0,uJ),vJ=new SV(F,VJ),OJ=new RV,BJ=new LV(KJ),LJ=new lR(F,S,B,ZJ,JJ,q,H),GJ=new _V(F,JJ,PJ),V0=new jV(A,pJ,PJ,ZJ),mJ=new dR(A,KJ,pJ),_J=new eR(A,KJ,pJ),pJ.programs=s.programs,F.capabilities=PJ,F.extensions=KJ,F.properties=VJ,F.renderLists=OJ,F.shadowMap=GJ,F.state=ZJ,F.info=pJ}y();let HJ=new uE(F,A);this.xr=HJ,this.getContext=function(){return A},this.getContextAttributes=function(){return A.getContextAttributes()},this.forceContextLoss=function(){let z=KJ.get("WEBGL_lose_context");if(z)z.loseContext()},this.forceContextRestore=function(){let z=KJ.get("WEBGL_lose_context");if(z)z.restoreContext()},this.getPixelRatio=function(){return WJ},this.setPixelRatio=function(z){if(z===void 0)return;WJ=z,this.setSize(r,n,!1)},this.getSize=function(z){return z.set(r,n)},this.setSize=function(z,x,g=!0){if(HJ.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}if(r=z,n=x,Q.width=Math.floor(z*WJ),Q.height=Math.floor(x*WJ),g===!0)Q.style.width=z+"px",Q.style.height=x+"px";this.setViewport(0,0,z,x)},this.getDrawingBufferSize=function(z){return z.set(r*WJ,n*WJ).floor()},this.setDrawingBufferSize=function(z,x,g){r=z,n=x,WJ=g,Q.width=Math.floor(z*g),Q.height=Math.floor(x*g),this.setViewport(0,0,z,x)},this.getCurrentViewport=function(z){return z.copy(_)},this.getViewport=function(z){return z.copy(NJ)},this.setViewport=function(z,x,g,m){if(z.isVector4)NJ.set(z.x,z.y,z.z,z.w);else NJ.set(z,x,g,m);ZJ.viewport(_.copy(NJ).multiplyScalar(WJ).round())},this.getScissor=function(z){return z.copy(hJ)},this.setScissor=function(z,x,g,m){if(z.isVector4)hJ.set(z.x,z.y,z.z,z.w);else hJ.set(z,x,g,m);ZJ.scissor(j.copy(hJ).multiplyScalar(WJ).round())},this.getScissorTest=function(){return eJ},this.setScissorTest=function(z){ZJ.setScissorTest(eJ=z)},this.setOpaqueSort=function(z){d=z},this.setTransparentSort=function(z){RJ=z},this.getClearColor=function(z){return z.copy(LJ.getClearColor())},this.setClearColor=function(){LJ.setClearColor.apply(LJ,arguments)},this.getClearAlpha=function(){return LJ.getClearAlpha()},this.setClearAlpha=function(){LJ.setClearAlpha.apply(LJ,arguments)},this.clear=function(z=!0,x=!0,g=!0){let m=0;if(z){let b=!1;if(w!==null){let YJ=w.texture.format;b=YJ===z$||YJ===L$||YJ===B$}if(b){let YJ=w.texture.type,kJ=YJ===X8||YJ===q6||YJ===K7||YJ===N6||YJ===F$||YJ===D$,CJ=LJ.getClearColor(),MJ=LJ.getClearAlpha(),lJ=CJ.r,dJ=CJ.g,yJ=CJ.b;if(kJ)N[0]=lJ,N[1]=dJ,N[2]=yJ,N[3]=MJ,A.clearBufferuiv(A.COLOR,0,N);else k[0]=lJ,k[1]=dJ,k[2]=yJ,k[3]=MJ,A.clearBufferiv(A.COLOR,0,k)}else m|=A.COLOR_BUFFER_BIT}if(x)m|=A.DEPTH_BUFFER_BIT;if(g)m|=A.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295);A.clear(m)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){Q.removeEventListener("webglcontextlost",a,!1),Q.removeEventListener("webglcontextrestored",e,!1),Q.removeEventListener("webglcontextcreationerror",DJ,!1),LJ.dispose(),OJ.dispose(),BJ.dispose(),VJ.dispose(),S.dispose(),B.dispose(),JJ.dispose(),J0.dispose(),V0.dispose(),s.dispose(),HJ.dispose(),HJ.removeEventListener("sessionstart",m8),HJ.removeEventListener("sessionend",MK),m9.stop()};function a(z){z.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),C=!0}function e(){console.log("THREE.WebGLRenderer: Context Restored."),C=!1;let z=pJ.autoReset,x=GJ.enabled,g=GJ.autoUpdate,m=GJ.needsUpdate,b=GJ.type;y(),pJ.autoReset=z,GJ.enabled=x,GJ.autoUpdate=g,GJ.needsUpdate=m,GJ.type=b}function DJ(z){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",z.statusMessage)}function FJ(z){let x=z.target;x.removeEventListener("dispose",FJ),tJ(x)}function tJ(z){D0(z),VJ.remove(z)}function D0(z){let x=VJ.get(z).programs;if(x!==void 0){if(x.forEach(function(g){s.releaseProgram(g)}),z.isShaderMaterial)s.releaseShaderCache(z)}}this.renderBufferDirect=function(z,x,g,m,b,YJ){if(x===null)x=sJ;let kJ=b.isMesh&&b.matrixWorld.determinant()<0,CJ=W5(z,x,g,m,b);ZJ.setMaterial(m,kJ);let MJ=g.index,lJ=1;if(m.wireframe===!0){if(MJ=t.getWireframeAttribute(g),MJ===void 0)return;lJ=2}let dJ=g.drawRange,yJ=g.attributes.position,H0=dJ.start*lJ,U0=(dJ.start+dJ.count)*lJ;if(YJ!==null)H0=Math.max(H0,YJ.start*lJ),U0=Math.min(U0,(YJ.start+YJ.count)*lJ);if(MJ!==null)H0=Math.max(H0,0),U0=Math.min(U0,MJ.count);else if(yJ!==void 0&&yJ!==null)H0=Math.max(H0,0),U0=Math.min(U0,yJ.count);let I0=U0-H0;if(I0<0||I0===1/0)return;J0.setup(b,m,CJ,g,MJ);let B0,K0=mJ;if(MJ!==null)B0=h.get(MJ),K0=_J,K0.setIndex(B0);if(b.isMesh)if(m.wireframe===!0)ZJ.setLineWidth(m.wireframeLinewidth*QJ()),K0.setMode(A.LINES);else K0.setMode(A.TRIANGLES);else if(b.isLine){let xJ=m.linewidth;if(xJ===void 0)xJ=1;if(ZJ.setLineWidth(xJ*QJ()),b.isLineSegments)K0.setMode(A.LINES);else if(b.isLineLoop)K0.setMode(A.LINE_LOOP);else K0.setMode(A.LINE_STRIP)}else if(b.isPoints)K0.setMode(A.POINTS);else if(b.isSprite)K0.setMode(A.TRIANGLES);if(b.isBatchedMesh)if(b._multiDrawInstances!==null)K0.renderMultiDrawInstances(b._multiDrawStarts,b._multiDrawCounts,b._multiDrawCount,b._multiDrawInstances);else if(!KJ.get("WEBGL_multi_draw")){let{_multiDrawStarts:xJ,_multiDrawCounts:g0,_multiDrawCount:E0}=b,T8=MJ?h.get(MJ).bytesPerElement:1,h6=VJ.get(m).currentProgram.getUniforms();for(let U8=0;U8<E0;U8++)h6.setValue(A,"_gl_DrawID",U8),K0.render(xJ[U8]/T8,g0[U8])}else K0.renderMultiDraw(b._multiDrawStarts,b._multiDrawCounts,b._multiDrawCount);else if(b.isInstancedMesh)K0.renderInstances(H0,I0,b.count);else if(g.isInstancedBufferGeometry){let xJ=g._maxInstanceCount!==void 0?g._maxInstanceCount:1/0,g0=Math.min(g.instanceCount,xJ);K0.renderInstances(H0,I0,g0)}else K0.render(H0,I0)};function f0(z,x,g){if(z.transparent===!0&&z.side===T0&&z.forceSinglePass===!1)z.side=n0,z.needsUpdate=!0,BZ(z,x,g),z.side=t0,z.needsUpdate=!0,BZ(z,x,g),z.side=T0;else BZ(z,x,g)}this.compile=function(z,x,g=null){if(g===null)g=z;if(R=BJ.get(g),R.init(x),D.push(R),g.traverseVisible(function(b){if(b.isLight&&b.layers.test(x.layers)){if(R.pushLight(b),b.castShadow)R.pushShadow(b)}}),z!==g)z.traverseVisible(function(b){if(b.isLight&&b.layers.test(x.layers)){if(R.pushLight(b),b.castShadow)R.pushShadow(b)}});R.setupLights();let m=/*@__PURE__*/new Set;return z.traverse(function(b){if(!(b.isMesh||b.isPoints||b.isLine||b.isSprite))return;let YJ=b.material;if(YJ)if(Array.isArray(YJ))for(let kJ=0;kJ<YJ.length;kJ++){let CJ=YJ[kJ];f0(CJ,g,b),m.add(CJ)}else f0(YJ,g,b),m.add(YJ)}),D.pop(),R=null,m},this.compileAsync=function(z,x,g=null){let m=this.compile(z,x,g);return new Promise((b)=>{function YJ(){if(m.forEach(function(kJ){if(VJ.get(kJ).currentProgram.isReady())m.delete(kJ)}),m.size===0){b(z);return}setTimeout(YJ,10)}if(KJ.get("KHR_parallel_shader_compile")!==null)YJ();else setTimeout(YJ,10)})};let G0=null;function Q9(z){if(G0)G0(z)}function m8(){m9.stop()}function MK(){m9.start()}let m9=new SE;if(m9.setAnimationLoop(Q9),typeof self<"u")m9.setContext(self);this.setAnimationLoop=function(z){G0=z,HJ.setAnimationLoop(z),z===null?m9.stop():m9.start()},HJ.addEventListener("sessionstart",m8),HJ.addEventListener("sessionend",MK),this.render=function(z,x){if(x!==void 0&&x.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(C===!0)return;if(z.matrixWorldAutoUpdate===!0)z.updateMatrixWorld();if(x.parent===null&&x.matrixWorldAutoUpdate===!0)x.updateMatrixWorld();if(HJ.enabled===!0&&HJ.isPresenting===!0){if(HJ.cameraAutoUpdate===!0)HJ.updateCamera(x);x=HJ.getCamera()}if(z.isScene===!0)z.onBeforeRender(F,z,x,w);if(R=BJ.get(z,D.length),R.init(x),D.push(R),EJ.multiplyMatrices(x.projectionMatrix,x.matrixWorldInverse),o.setFromProjectionMatrix(EJ),TJ=this.localClippingEnabled,UJ=uJ.init(this.clippingPlanes,TJ),V=OJ.get(z,O.length),V.init(),O.push(V),HJ.enabled===!0&&HJ.isPresenting===!0){let YJ=F.xr.getDepthSensingMesh();if(YJ!==null)HY(YJ,x,-1/0,F.sortObjects)}if(HY(z,x,0,F.sortObjects),V.finish(),F.sortObjects===!0)V.sort(d,RJ);if($J=HJ.enabled===!1||HJ.isPresenting===!1||HJ.hasDepthSensing()===!1,$J)LJ.addToRenderList(V,z);if(this.info.render.frame++,UJ===!0)uJ.beginShadows();let g=R.state.shadowsArray;if(GJ.render(g,z,x),UJ===!0)uJ.endShadows();if(this.info.autoReset===!0)this.info.reset();let{opaque:m,transmissive:b}=V;if(R.setupLights(),x.isArrayCamera){let YJ=x.cameras;if(b.length>0)for(let kJ=0,CJ=YJ.length;kJ<CJ;kJ++){let MJ=YJ[kJ];wK(m,b,z,MJ)}if($J)LJ.render(z);for(let kJ=0,CJ=YJ.length;kJ<CJ;kJ++){let MJ=YJ[kJ];IK(V,z,MJ,MJ.viewport)}}else{if(b.length>0)wK(m,b,z,x);if($J)LJ.render(z);IK(V,z,x)}if(w!==null&&M===0)AJ.updateMultisampleRenderTarget(w),AJ.updateRenderTargetMipmap(w);if(z.isScene===!0)z.onAfterRender(F,z,x);if(J0.resetDefaultState(),v=-1,L=null,D.pop(),D.length>0){if(R=D[D.length-1],UJ===!0)uJ.setGlobalState(F.clippingPlanes,R.state.camera)}else R=null;if(O.pop(),O.length>0)V=O[O.length-1];else V=null};function HY(z,x,g,m){if(z.visible===!1)return;if(z.layers.test(x.layers)){if(z.isGroup)g=z.renderOrder;else if(z.isLOD){if(z.autoUpdate===!0)z.update(x)}else if(z.isLight){if(R.pushLight(z),z.castShadow)R.pushShadow(z)}else if(z.isSprite){if(!z.frustumCulled||o.intersectsSprite(z)){if(m)fJ.setFromMatrixPosition(z.matrixWorld).applyMatrix4(EJ);let kJ=JJ.update(z),CJ=z.material;if(CJ.visible)V.push(z,kJ,CJ,g,fJ.z,null)}}else if(z.isMesh||z.isLine||z.isPoints){if(!z.frustumCulled||o.intersectsObject(z)){let kJ=JJ.update(z),CJ=z.material;if(m){if(z.boundingSphere!==void 0){if(z.boundingSphere===null)z.computeBoundingSphere();fJ.copy(z.boundingSphere.center)}else{if(kJ.boundingSphere===null)kJ.computeBoundingSphere();fJ.copy(kJ.boundingSphere.center)}fJ.applyMatrix4(z.matrixWorld).applyMatrix4(EJ)}if(Array.isArray(CJ)){let MJ=kJ.groups;for(let lJ=0,dJ=MJ.length;lJ<dJ;lJ++){let yJ=MJ[lJ],H0=CJ[yJ.materialIndex];if(H0&&H0.visible)V.push(z,kJ,H0,g,fJ.z,yJ)}}else if(CJ.visible)V.push(z,kJ,CJ,g,fJ.z,null)}}}let YJ=z.children;for(let kJ=0,CJ=YJ.length;kJ<CJ;kJ++)HY(YJ[kJ],x,g,m)}function IK(z,x,g,m){let{opaque:b,transmissive:YJ,transparent:kJ}=z;if(R.setupLightsView(g),UJ===!0)uJ.setGlobalState(F.clippingPlanes,g);if(m)ZJ.viewport(_.copy(m));if(b.length>0)DZ(b,x,g);if(YJ.length>0)DZ(YJ,x,g);if(kJ.length>0)DZ(kJ,x,g);ZJ.buffers.depth.setTest(!0),ZJ.buffers.depth.setMask(!0),ZJ.buffers.color.setMask(!0),ZJ.setPolygonOffset(!1)}function wK(z,x,g,m){if((g.isScene===!0?g.overrideMaterial:null)!==null)return;if(R.state.transmissionRenderTarget[m.id]===void 0)R.state.transmissionRenderTarget[m.id]=new H8(1,1,{generateMipmaps:!0,type:KJ.has("EXT_color_buffer_half_float")||KJ.has("EXT_color_buffer_float")?G7:X8,minFilter:M8,samples:4,stencilBuffer:W,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:aJ.workingColorSpace});let YJ=R.state.transmissionRenderTarget[m.id],kJ=m.viewport||_;YJ.setSize(kJ.z*F.transmissionResolutionScale,kJ.w*F.transmissionResolutionScale);let CJ=F.getRenderTarget();if(F.setRenderTarget(YJ),F.getClearColor(l),c=F.getClearAlpha(),c<1)F.setClearColor(16777215,0.5);if(F.clear(),$J)LJ.render(g);let MJ=F.toneMapping;F.toneMapping=n8;let lJ=m.viewport;if(m.viewport!==void 0)m.viewport=void 0;if(R.setupLightsView(m),UJ===!0)uJ.setGlobalState(F.clippingPlanes,m);if(DZ(z,g,m),AJ.updateMultisampleRenderTarget(YJ),AJ.updateRenderTargetMipmap(YJ),KJ.has("WEBGL_multisampled_render_to_texture")===!1){let dJ=!1;for(let yJ=0,H0=x.length;yJ<H0;yJ++){let U0=x[yJ],I0=U0.object,B0=U0.geometry,K0=U0.material,xJ=U0.group;if(K0.side===T0&&I0.layers.test(m.layers)){let g0=K0.side;K0.side=n0,K0.needsUpdate=!0,AK(I0,g,m,B0,K0,xJ),K0.side=g0,K0.needsUpdate=!0,dJ=!0}}if(dJ===!0)AJ.updateMultisampleRenderTarget(YJ),AJ.updateRenderTargetMipmap(YJ)}if(F.setRenderTarget(CJ),F.setClearColor(l,c),lJ!==void 0)m.viewport=lJ;F.toneMapping=MJ}function DZ(z,x,g){let m=x.isScene===!0?x.overrideMaterial:null;for(let b=0,YJ=z.length;b<YJ;b++){let kJ=z[b],CJ=kJ.object,MJ=kJ.geometry,lJ=m===null?kJ.material:m,dJ=kJ.group;if(CJ.layers.test(g.layers))AK(CJ,x,g,MJ,lJ,dJ)}}function AK(z,x,g,m,b,YJ){if(z.onBeforeRender(F,x,g,m,b,YJ),z.modelViewMatrix.multiplyMatrices(g.matrixWorldInverse,z.matrixWorld),z.normalMatrix.getNormalMatrix(z.modelViewMatrix),b.onBeforeRender(F,x,g,m,z,YJ),b.transparent===!0&&b.side===T0&&b.forceSinglePass===!1)b.side=n0,b.needsUpdate=!0,F.renderBufferDirect(g,x,m,b,z,YJ),b.side=t0,b.needsUpdate=!0,F.renderBufferDirect(g,x,m,b,z,YJ),b.side=T0;else F.renderBufferDirect(g,x,m,b,z,YJ);z.onAfterRender(F,x,g,m,b,YJ)}function BZ(z,x,g){if(x.isScene!==!0)x=sJ;let m=VJ.get(z),b=R.state.lights,YJ=R.state.shadowsArray,kJ=b.state.version,CJ=s.getParameters(z,b.state,YJ,x,g),MJ=s.getProgramCacheKey(CJ),lJ=m.programs;if(m.environment=z.isMeshStandardMaterial?x.environment:null,m.fog=x.fog,m.envMap=(z.isMeshStandardMaterial?B:S).get(z.envMap||m.environment),m.envMapRotation=m.environment!==null&&z.envMap===null?x.environmentRotation:z.envMapRotation,lJ===void 0)z.addEventListener("dispose",FJ),lJ=/*@__PURE__*/new Map,m.programs=lJ;let dJ=lJ.get(MJ);if(dJ!==void 0){if(m.currentProgram===dJ&&m.lightsStateVersion===kJ)return TK(z,CJ),dJ}else CJ.uniforms=s.getUniforms(z),z.onBeforeCompile(CJ,F),dJ=s.acquireProgram(CJ,MJ),lJ.set(MJ,dJ),m.uniforms=CJ.uniforms;let yJ=m.uniforms;if(!z.isShaderMaterial&&!z.isRawShaderMaterial||z.clipping===!0)yJ.clippingPlanes=uJ.uniform;if(TK(z,CJ),m.needsLights=X5(z),m.lightsStateVersion=kJ,m.needsLights)yJ.ambientLightColor.value=b.state.ambient,yJ.lightProbe.value=b.state.probe,yJ.directionalLights.value=b.state.directional,yJ.directionalLightShadows.value=b.state.directionalShadow,yJ.spotLights.value=b.state.spot,yJ.spotLightShadows.value=b.state.spotShadow,yJ.rectAreaLights.value=b.state.rectArea,yJ.ltc_1.value=b.state.rectAreaLTC1,yJ.ltc_2.value=b.state.rectAreaLTC2,yJ.pointLights.value=b.state.point,yJ.pointLightShadows.value=b.state.pointShadow,yJ.hemisphereLights.value=b.state.hemi,yJ.directionalShadowMap.value=b.state.directionalShadowMap,yJ.directionalShadowMatrix.value=b.state.directionalShadowMatrix,yJ.spotShadowMap.value=b.state.spotShadowMap,yJ.spotLightMatrix.value=b.state.spotLightMatrix,yJ.spotLightMap.value=b.state.spotLightMap,yJ.pointShadowMap.value=b.state.pointShadowMap,yJ.pointShadowMatrix.value=b.state.pointShadowMatrix;return m.currentProgram=dJ,m.uniformsList=null,dJ}function PK(z){if(z.uniformsList===null){let x=z.currentProgram.getUniforms();z.uniformsList=YZ.seqWithValue(x.seq,z.uniforms)}return z.uniformsList}function TK(z,x){let g=VJ.get(z);g.outputColorSpace=x.outputColorSpace,g.batching=x.batching,g.batchingColor=x.batchingColor,g.instancing=x.instancing,g.instancingColor=x.instancingColor,g.instancingMorph=x.instancingMorph,g.skinning=x.skinning,g.morphTargets=x.morphTargets,g.morphNormals=x.morphNormals,g.morphColors=x.morphColors,g.morphTargetsCount=x.morphTargetsCount,g.numClippingPlanes=x.numClippingPlanes,g.numIntersection=x.numClipIntersection,g.vertexAlphas=x.vertexAlphas,g.vertexTangents=x.vertexTangents,g.toneMapping=x.toneMapping}function W5(z,x,g,m,b){if(x.isScene!==!0)x=sJ;AJ.resetTextureUnits();let YJ=x.fog,kJ=m.isMeshStandardMaterial?x.environment:null,CJ=w===null?F.outputColorSpace:w.isXRRenderTarget===!0?w.texture.colorSpace:x0,MJ=(m.isMeshStandardMaterial?B:S).get(m.envMap||kJ),lJ=m.vertexColors===!0&&!!g.attributes.color&&g.attributes.color.itemSize===4,dJ=!!g.attributes.tangent&&(!!m.normalMap||m.anisotropy>0),yJ=!!g.morphAttributes.position,H0=!!g.morphAttributes.normal,U0=!!g.morphAttributes.color,I0=n8;if(m.toneMapped){if(w===null||w.isXRRenderTarget===!0)I0=F.toneMapping}let B0=g.morphAttributes.position||g.morphAttributes.normal||g.morphAttributes.color,K0=B0!==void 0?B0.length:0,xJ=VJ.get(m),g0=R.state.lights;if(UJ===!0){if(TJ===!0||z!==L){let i0=z===L&&m.id===v;uJ.setState(m,z,i0)}}let E0=!1;if(m.version===xJ.__version){if(xJ.needsLights&&xJ.lightsStateVersion!==g0.state.version)E0=!0;else if(xJ.outputColorSpace!==CJ)E0=!0;else if(b.isBatchedMesh&&xJ.batching===!1)E0=!0;else if(!b.isBatchedMesh&&xJ.batching===!0)E0=!0;else if(b.isBatchedMesh&&xJ.batchingColor===!0&&b.colorTexture===null)E0=!0;else if(b.isBatchedMesh&&xJ.batchingColor===!1&&b.colorTexture!==null)E0=!0;else if(b.isInstancedMesh&&xJ.instancing===!1)E0=!0;else if(!b.isInstancedMesh&&xJ.instancing===!0)E0=!0;else if(b.isSkinnedMesh&&xJ.skinning===!1)E0=!0;else if(!b.isSkinnedMesh&&xJ.skinning===!0)E0=!0;else if(b.isInstancedMesh&&xJ.instancingColor===!0&&b.instanceColor===null)E0=!0;else if(b.isInstancedMesh&&xJ.instancingColor===!1&&b.instanceColor!==null)E0=!0;else if(b.isInstancedMesh&&xJ.instancingMorph===!0&&b.morphTexture===null)E0=!0;else if(b.isInstancedMesh&&xJ.instancingMorph===!1&&b.morphTexture!==null)E0=!0;else if(xJ.envMap!==MJ)E0=!0;else if(m.fog===!0&&xJ.fog!==YJ)E0=!0;else if(xJ.numClippingPlanes!==void 0&&(xJ.numClippingPlanes!==uJ.numPlanes||xJ.numIntersection!==uJ.numIntersection))E0=!0;else if(xJ.vertexAlphas!==lJ)E0=!0;else if(xJ.vertexTangents!==dJ)E0=!0;else if(xJ.morphTargets!==yJ)E0=!0;else if(xJ.morphNormals!==H0)E0=!0;else if(xJ.morphColors!==U0)E0=!0;else if(xJ.toneMapping!==I0)E0=!0;else if(xJ.morphTargetsCount!==K0)E0=!0}else E0=!0,xJ.__version=m.version;let T8=xJ.currentProgram;if(E0===!0)T8=BZ(m,x,b);let h6=!1,U8=!1,f7=!1,k0=T8.getUniforms(),L8=xJ.uniforms;if(ZJ.useProgram(T8.program))h6=!0,U8=!0,f7=!0;if(m.id!==v)v=m.id,U8=!0;if(h6||L!==z){if(ZJ.buffers.depth.getReversed())wJ.copy(z.projectionMatrix),uU(wJ),dU(wJ),k0.setValue(A,"projectionMatrix",wJ);else k0.setValue(A,"projectionMatrix",z.projectionMatrix);k0.setValue(A,"viewMatrix",z.matrixWorldInverse);let J8=k0.map.cameraPosition;if(J8!==void 0)J8.setValue(A,Q0.setFromMatrixPosition(z.matrixWorld));if(PJ.logarithmicDepthBuffer)k0.setValue(A,"logDepthBufFC",2/(Math.log(z.far+1)/Math.LN2));if(m.isMeshPhongMaterial||m.isMeshToonMaterial||m.isMeshLambertMaterial||m.isMeshBasicMaterial||m.isMeshStandardMaterial||m.isShaderMaterial)k0.setValue(A,"isOrthographic",z.isOrthographicCamera===!0);if(L!==z)L=z,U8=!0,f7=!0}if(b.isSkinnedMesh){k0.setOptional(A,b,"bindMatrix"),k0.setOptional(A,b,"bindMatrixInverse");let i0=b.skeleton;if(i0){if(i0.boneTexture===null)i0.computeBoneTexture();k0.setValue(A,"boneTexture",i0.boneTexture,AJ)}}if(b.isBatchedMesh){if(k0.setOptional(A,b,"batchingTexture"),k0.setValue(A,"batchingTexture",b._matricesTexture,AJ),k0.setOptional(A,b,"batchingIdTexture"),k0.setValue(A,"batchingIdTexture",b._indirectTexture,AJ),k0.setOptional(A,b,"batchingColorTexture"),b._colorsTexture!==null)k0.setValue(A,"batchingColorTexture",b._colorsTexture,AJ)}let z8=g.morphAttributes;if(z8.position!==void 0||z8.normal!==void 0||z8.color!==void 0)Z0.update(b,g,T8);if(U8||xJ.receiveShadow!==b.receiveShadow)xJ.receiveShadow=b.receiveShadow,k0.setValue(A,"receiveShadow",b.receiveShadow);if(m.isMeshGouraudMaterial&&m.envMap!==null)L8.envMap.value=MJ,L8.flipEnvMap.value=MJ.isCubeTexture&&MJ.isRenderTargetTexture===!1?-1:1;if(m.isMeshStandardMaterial&&m.envMap===null&&x.environment!==null)L8.envMapIntensity.value=x.environmentIntensity;if(U8){if(k0.setValue(A,"toneMappingExposure",F.toneMappingExposure),xJ.needsLights)Y5(L8,f7);if(YJ&&m.fog===!0)vJ.refreshFogUniforms(L8,YJ);vJ.refreshMaterialUniforms(L8,m,WJ,n,R.state.transmissionRenderTarget[z.id]),YZ.upload(A,PK(xJ),L8,AJ)}if(m.isShaderMaterial&&m.uniformsNeedUpdate===!0)YZ.upload(A,PK(xJ),L8,AJ),m.uniformsNeedUpdate=!1;if(m.isSpriteMaterial)k0.setValue(A,"center",b.center);if(k0.setValue(A,"modelViewMatrix",b.modelViewMatrix),k0.setValue(A,"normalMatrix",b.normalMatrix),k0.setValue(A,"modelMatrix",b.matrixWorld),m.isShaderMaterial||m.isRawShaderMaterial){let i0=m.uniformsGroups;for(let J8=0,KY=i0.length;J8<KY;J8++){let l9=i0[J8];V0.update(l9,T8),V0.bind(l9,T8)}}return T8}function Y5(z,x){z.ambientLightColor.needsUpdate=x,z.lightProbe.needsUpdate=x,z.directionalLights.needsUpdate=x,z.directionalLightShadows.needsUpdate=x,z.pointLights.needsUpdate=x,z.pointLightShadows.needsUpdate=x,z.spotLights.needsUpdate=x,z.spotLightShadows.needsUpdate=x,z.rectAreaLights.needsUpdate=x,z.hemisphereLights.needsUpdate=x}function X5(z){return z.isMeshLambertMaterial||z.isMeshToonMaterial||z.isMeshPhongMaterial||z.isMeshStandardMaterial||z.isShadowMaterial||z.isShaderMaterial&&z.lights===!0}this.getActiveCubeFace=function(){return P},this.getActiveMipmapLevel=function(){return M},this.getRenderTarget=function(){return w},this.setRenderTargetTextures=function(z,x,g){VJ.get(z.texture).__webglTexture=x,VJ.get(z.depthTexture).__webglTexture=g;let m=VJ.get(z);if(m.__hasExternalTextures=!0,m.__autoAllocateDepthBuffer=g===void 0,!m.__autoAllocateDepthBuffer){if(KJ.has("WEBGL_multisampled_render_to_texture")===!0)console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),m.__useRenderToTexture=!1}},this.setRenderTargetFramebuffer=function(z,x){let g=VJ.get(z);g.__webglFramebuffer=x,g.__useDefaultFramebuffer=x===void 0};let H5=A.createFramebuffer();this.setRenderTarget=function(z,x=0,g=0){w=z,P=x,M=g;let m=!0,b=null,YJ=!1,kJ=!1;if(z){let MJ=VJ.get(z);if(MJ.__useDefaultFramebuffer!==void 0)ZJ.bindFramebuffer(A.FRAMEBUFFER,null),m=!1;else if(MJ.__webglFramebuffer===void 0)AJ.setupRenderTarget(z);else if(MJ.__hasExternalTextures)AJ.rebindTextures(z,VJ.get(z.texture).__webglTexture,VJ.get(z.depthTexture).__webglTexture);else if(z.depthBuffer){let yJ=z.depthTexture;if(MJ.__boundDepthTexture!==yJ){if(yJ!==null&&VJ.has(yJ)&&(z.width!==yJ.image.width||z.height!==yJ.image.height))throw Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");AJ.setupDepthRenderbuffer(z)}}let lJ=z.texture;if(lJ.isData3DTexture||lJ.isDataArrayTexture||lJ.isCompressedArrayTexture)kJ=!0;let dJ=VJ.get(z).__webglFramebuffer;if(z.isWebGLCubeRenderTarget){if(Array.isArray(dJ[x]))b=dJ[x][g];else b=dJ[x];YJ=!0}else if(z.samples>0&&AJ.useMultisampledRTT(z)===!1)b=VJ.get(z).__webglMultisampledFramebuffer;else if(Array.isArray(dJ))b=dJ[g];else b=dJ;_.copy(z.viewport),j.copy(z.scissor),p=z.scissorTest}else _.copy(NJ).multiplyScalar(WJ).floor(),j.copy(hJ).multiplyScalar(WJ).floor(),p=eJ;if(g!==0)b=H5;if(ZJ.bindFramebuffer(A.FRAMEBUFFER,b)&&m)ZJ.drawBuffers(z,b);if(ZJ.viewport(_),ZJ.scissor(j),ZJ.setScissorTest(p),YJ){let MJ=VJ.get(z.texture);A.framebufferTexture2D(A.FRAMEBUFFER,A.COLOR_ATTACHMENT0,A.TEXTURE_CUBE_MAP_POSITIVE_X+x,MJ.__webglTexture,g)}else if(kJ){let MJ=VJ.get(z.texture),lJ=x;A.framebufferTextureLayer(A.FRAMEBUFFER,A.COLOR_ATTACHMENT0,MJ.__webglTexture,g,lJ)}else if(z!==null&&g!==0){let MJ=VJ.get(z.texture);A.framebufferTexture2D(A.FRAMEBUFFER,A.COLOR_ATTACHMENT0,A.TEXTURE_2D,MJ.__webglTexture,g)}v=-1},this.readRenderTargetPixels=function(z,x,g,m,b,YJ,kJ){if(!(z&&z.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let CJ=VJ.get(z).__webglFramebuffer;if(z.isWebGLCubeRenderTarget&&kJ!==void 0)CJ=CJ[kJ];if(CJ){ZJ.bindFramebuffer(A.FRAMEBUFFER,CJ);try{let MJ=z.texture,lJ=MJ.format,dJ=MJ.type;if(!PJ.textureFormatReadable(lJ)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!PJ.textureTypeReadable(dJ)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}if(x>=0&&x<=z.width-m&&(g>=0&&g<=z.height-b))A.readPixels(x,g,m,b,oJ.convert(lJ),oJ.convert(dJ),YJ)}finally{let MJ=w!==null?VJ.get(w).__webglFramebuffer:null;ZJ.bindFramebuffer(A.FRAMEBUFFER,MJ)}}},this.readRenderTargetPixelsAsync=async function(z,x,g,m,b,YJ,kJ){if(!(z&&z.isWebGLRenderTarget))throw Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let CJ=VJ.get(z).__webglFramebuffer;if(z.isWebGLCubeRenderTarget&&kJ!==void 0)CJ=CJ[kJ];if(CJ){let MJ=z.texture,lJ=MJ.format,dJ=MJ.type;if(!PJ.textureFormatReadable(lJ))throw Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!PJ.textureTypeReadable(dJ))throw Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(x>=0&&x<=z.width-m&&(g>=0&&g<=z.height-b)){ZJ.bindFramebuffer(A.FRAMEBUFFER,CJ);let yJ=A.createBuffer();A.bindBuffer(A.PIXEL_PACK_BUFFER,yJ),A.bufferData(A.PIXEL_PACK_BUFFER,YJ.byteLength,A.STREAM_READ),A.readPixels(x,g,m,b,oJ.convert(lJ),oJ.convert(dJ),0);let H0=w!==null?VJ.get(w).__webglFramebuffer:null;ZJ.bindFramebuffer(A.FRAMEBUFFER,H0);let U0=A.fenceSync(A.SYNC_GPU_COMMANDS_COMPLETE,0);return A.flush(),await lU(A,U0,4),A.bindBuffer(A.PIXEL_PACK_BUFFER,yJ),A.getBufferSubData(A.PIXEL_PACK_BUFFER,0,YJ),A.deleteBuffer(yJ),A.deleteSync(U0),YJ}else throw Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(z,x=null,g=0){if(z.isTexture!==!0)V6("WebGLRenderer: copyFramebufferToTexture function signature has changed."),x=arguments[0]||null,z=arguments[1];let m=Math.pow(2,-g),b=Math.floor(z.image.width*m),YJ=Math.floor(z.image.height*m),kJ=x!==null?x.x:0,CJ=x!==null?x.y:0;AJ.setTexture2D(z,0),A.copyTexSubImage2D(A.TEXTURE_2D,g,0,0,kJ,CJ,b,YJ),ZJ.unbindTexture()};let K5=A.createFramebuffer(),G5=A.createFramebuffer();if(this.copyTextureToTexture=function(z,x,g=null,m=null,b=0,YJ=null){if(z.isTexture!==!0)V6("WebGLRenderer: copyTextureToTexture function signature has changed."),m=arguments[0]||null,z=arguments[1],x=arguments[2],YJ=arguments[3]||0,g=null;if(YJ===null)if(b!==0)V6("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),YJ=b,b=0;else YJ=0;let kJ,CJ,MJ,lJ,dJ,yJ,H0,U0,I0,B0=z.isCompressedTexture?z.mipmaps[YJ]:z.image;if(g!==null)kJ=g.max.x-g.min.x,CJ=g.max.y-g.min.y,MJ=g.isBox3?g.max.z-g.min.z:1,lJ=g.min.x,dJ=g.min.y,yJ=g.isBox3?g.min.z:0;else{let z8=Math.pow(2,-b);if(kJ=Math.floor(B0.width*z8),CJ=Math.floor(B0.height*z8),z.isDataArrayTexture)MJ=B0.depth;else if(z.isData3DTexture)MJ=Math.floor(B0.depth*z8);else MJ=1;lJ=0,dJ=0,yJ=0}if(m!==null)H0=m.x,U0=m.y,I0=m.z;else H0=0,U0=0,I0=0;let K0=oJ.convert(x.format),xJ=oJ.convert(x.type),g0;if(x.isData3DTexture)AJ.setTexture3D(x,0),g0=A.TEXTURE_3D;else if(x.isDataArrayTexture||x.isCompressedArrayTexture)AJ.setTexture2DArray(x,0),g0=A.TEXTURE_2D_ARRAY;else AJ.setTexture2D(x,0),g0=A.TEXTURE_2D;A.pixelStorei(A.UNPACK_FLIP_Y_WEBGL,x.flipY),A.pixelStorei(A.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),A.pixelStorei(A.UNPACK_ALIGNMENT,x.unpackAlignment);let E0=A.getParameter(A.UNPACK_ROW_LENGTH),T8=A.getParameter(A.UNPACK_IMAGE_HEIGHT),h6=A.getParameter(A.UNPACK_SKIP_PIXELS),U8=A.getParameter(A.UNPACK_SKIP_ROWS),f7=A.getParameter(A.UNPACK_SKIP_IMAGES);A.pixelStorei(A.UNPACK_ROW_LENGTH,B0.width),A.pixelStorei(A.UNPACK_IMAGE_HEIGHT,B0.height),A.pixelStorei(A.UNPACK_SKIP_PIXELS,lJ),A.pixelStorei(A.UNPACK_SKIP_ROWS,dJ),A.pixelStorei(A.UNPACK_SKIP_IMAGES,yJ);let k0=z.isDataArrayTexture||z.isData3DTexture,L8=x.isDataArrayTexture||x.isData3DTexture;if(z.isDepthTexture){let z8=VJ.get(z),i0=VJ.get(x),J8=VJ.get(z8.__renderTarget),KY=VJ.get(i0.__renderTarget);ZJ.bindFramebuffer(A.READ_FRAMEBUFFER,J8.__webglFramebuffer),ZJ.bindFramebuffer(A.DRAW_FRAMEBUFFER,KY.__webglFramebuffer);for(let l9=0;l9<MJ;l9++){if(k0)A.framebufferTextureLayer(A.READ_FRAMEBUFFER,A.COLOR_ATTACHMENT0,VJ.get(z).__webglTexture,b,yJ+l9),A.framebufferTextureLayer(A.DRAW_FRAMEBUFFER,A.COLOR_ATTACHMENT0,VJ.get(x).__webglTexture,YJ,I0+l9);A.blitFramebuffer(lJ,dJ,kJ,CJ,H0,U0,kJ,CJ,A.DEPTH_BUFFER_BIT,A.NEAREST)}ZJ.bindFramebuffer(A.READ_FRAMEBUFFER,null),ZJ.bindFramebuffer(A.DRAW_FRAMEBUFFER,null)}else if(b!==0||z.isRenderTargetTexture||VJ.has(z)){let z8=VJ.get(z),i0=VJ.get(x);ZJ.bindFramebuffer(A.READ_FRAMEBUFFER,K5),ZJ.bindFramebuffer(A.DRAW_FRAMEBUFFER,G5);for(let J8=0;J8<MJ;J8++){if(k0)A.framebufferTextureLayer(A.READ_FRAMEBUFFER,A.COLOR_ATTACHMENT0,z8.__webglTexture,b,yJ+J8);else A.framebufferTexture2D(A.READ_FRAMEBUFFER,A.COLOR_ATTACHMENT0,A.TEXTURE_2D,z8.__webglTexture,b);if(L8)A.framebufferTextureLayer(A.DRAW_FRAMEBUFFER,A.COLOR_ATTACHMENT0,i0.__webglTexture,YJ,I0+J8);else A.framebufferTexture2D(A.DRAW_FRAMEBUFFER,A.COLOR_ATTACHMENT0,A.TEXTURE_2D,i0.__webglTexture,YJ);if(b!==0)A.blitFramebuffer(lJ,dJ,kJ,CJ,H0,U0,kJ,CJ,A.COLOR_BUFFER_BIT,A.NEAREST);else if(L8)A.copyTexSubImage3D(g0,YJ,H0,U0,I0+J8,lJ,dJ,kJ,CJ);else A.copyTexSubImage2D(g0,YJ,H0,U0,lJ,dJ,kJ,CJ)}ZJ.bindFramebuffer(A.READ_FRAMEBUFFER,null),ZJ.bindFramebuffer(A.DRAW_FRAMEBUFFER,null)}else if(L8)if(z.isDataTexture||z.isData3DTexture)A.texSubImage3D(g0,YJ,H0,U0,I0,kJ,CJ,MJ,K0,xJ,B0.data);else if(x.isCompressedArrayTexture)A.compressedTexSubImage3D(g0,YJ,H0,U0,I0,kJ,CJ,MJ,K0,B0.data);else A.texSubImage3D(g0,YJ,H0,U0,I0,kJ,CJ,MJ,K0,xJ,B0);else if(z.isDataTexture)A.texSubImage2D(A.TEXTURE_2D,YJ,H0,U0,kJ,CJ,K0,xJ,B0.data);else if(z.isCompressedTexture)A.compressedTexSubImage2D(A.TEXTURE_2D,YJ,H0,U0,B0.width,B0.height,K0,B0.data);else A.texSubImage2D(A.TEXTURE_2D,YJ,H0,U0,kJ,CJ,K0,xJ,B0);if(A.pixelStorei(A.UNPACK_ROW_LENGTH,E0),A.pixelStorei(A.UNPACK_IMAGE_HEIGHT,T8),A.pixelStorei(A.UNPACK_SKIP_PIXELS,h6),A.pixelStorei(A.UNPACK_SKIP_ROWS,U8),A.pixelStorei(A.UNPACK_SKIP_IMAGES,f7),YJ===0&&x.generateMipmaps)A.generateMipmap(g0);ZJ.unbindTexture()},this.copyTextureToTexture3D=function(z,x,g=null,m=null,b=0){if(z.isTexture!==!0)V6("WebGLRenderer: copyTextureToTexture3D function signature has changed."),g=arguments[0]||null,m=arguments[1]||null,z=arguments[2],x=arguments[3],b=arguments[4]||0;return V6('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(z,x,g,m,b)},this.initRenderTarget=function(z){if(VJ.get(z).__webglFramebuffer===void 0)AJ.setupRenderTarget(z)},this.initTexture=function(z){if(z.isCubeTexture)AJ.setTextureCube(z,0);else if(z.isData3DTexture)AJ.setTexture3D(z,0);else if(z.isDataArrayTexture||z.isCompressedArrayTexture)AJ.setTexture2DArray(z,0);else AJ.setTexture2D(z,0);ZJ.unbindTexture()},this.resetState=function(){P=0,M=0,w=null,ZJ.reset(),J0.reset()},typeof __THREE_DEVTOOLS__<"u")__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return fX}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(J){this._outputColorSpace=J;let Q=this.getContext();Q.drawingBufferColorspace=aJ._getDrawingBufferColorSpace(J),Q.unpackColorSpace=aJ._getUnpackColorSpace()}}var T=R5(dE(),1);function tH(J,Q){if(Q===a$)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),J;if(Q===k6||Q===E7){let Z=J.getIndex();if(Z===null){let X=[],H=J.getAttribute("position");if(H!==void 0){for(let K=0;K<H.count;K++)X.push(K);J.setIndex(X),Z=J.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),J}let $=Z.count-2,W=[];if(Q===k6)for(let X=1;X<=$;X++)W.push(Z.getX(0)),W.push(Z.getX(X)),W.push(Z.getX(X+1));else for(let X=0;X<$;X++)if(X%2===0)W.push(Z.getX(X)),W.push(Z.getX(X+1)),W.push(Z.getX(X+2));else W.push(Z.getX(X+2)),W.push(Z.getX(X+1)),W.push(Z.getX(X));if(W.length/3!==$)console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");let Y=J.clone();return Y.setIndex(W),Y.clearGroups(),Y}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",Q),J}class WK extends h0{constructor(J){super(J);this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(Q){return new tE(Q)}),this.register(function(Q){return new eE(Q)}),this.register(function(Q){return new Kq(Q)}),this.register(function(Q){return new Gq(Q)}),this.register(function(Q){return new Uq(Q)}),this.register(function(Q){return new Qq(Q)}),this.register(function(Q){return new Zq(Q)}),this.register(function(Q){return new $q(Q)}),this.register(function(Q){return new Wq(Q)}),this.register(function(Q){return new rE(Q)}),this.register(function(Q){return new Yq(Q)}),this.register(function(Q){return new Jq(Q)}),this.register(function(Q){return new Hq(Q)}),this.register(function(Q){return new Xq(Q)}),this.register(function(Q){return new oE(Q)}),this.register(function(Q){return new Eq(Q)}),this.register(function(Q){return new qq(Q)})}load(J,Q,Z,$){let W=this,Y;if(this.resourcePath!=="")Y=this.resourcePath;else if(this.path!==""){let K=b8.extractUrlBase(J);Y=b8.resolveURL(K,this.path)}else Y=b8.extractUrlBase(J);this.manager.itemStart(J);let X=function(K){if($)$(K);else console.error(K);W.manager.itemError(J),W.manager.itemEnd(J)},H=new Y8(this.manager);H.setPath(this.path),H.setResponseType("arraybuffer"),H.setRequestHeader(this.requestHeader),H.setWithCredentials(this.withCredentials),H.load(J,function(K){try{W.parse(K,Y,function(G){Q(G),W.manager.itemEnd(J)},X)}catch(G){X(G)}},Z,X)}setDRACOLoader(J){return this.dracoLoader=J,this}setKTX2Loader(J){return this.ktx2Loader=J,this}setMeshoptDecoder(J){return this.meshoptDecoder=J,this}register(J){if(this.pluginCallbacks.indexOf(J)===-1)this.pluginCallbacks.push(J);return this}unregister(J){if(this.pluginCallbacks.indexOf(J)!==-1)this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(J),1);return this}parse(J,Q,Z,$){let W,Y={},X={},H=/*@__PURE__*/new TextDecoder;if(typeof J==="string")W=JSON.parse(J);else if(J instanceof ArrayBuffer)if(H.decode(new Uint8Array(J,0,4))===Nq){try{Y[W0.KHR_BINARY_GLTF]=new Oq(J)}catch(U){if($)$(U);return}W=JSON.parse(Y[W0.KHR_BINARY_GLTF].content)}else W=JSON.parse(H.decode(J));else W=J;if(W.asset===void 0||W.asset.version[0]<2){if($)$(Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}let K=new Dq(W,{path:Q||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});K.fileLoader.setRequestHeader(this.requestHeader);for(let G=0;G<this.pluginCallbacks.length;G++){let U=this.pluginCallbacks[G](K);if(!U.name)console.error("THREE.GLTFLoader: Invalid plugin found: missing name");X[U.name]=U,Y[U.name]=!0}if(W.extensionsUsed)for(let G=0;G<W.extensionsUsed.length;++G){let U=W.extensionsUsed[G],E=W.extensionsRequired||[];switch(U){case W0.KHR_MATERIALS_UNLIT:Y[U]=new aE;break;case W0.KHR_DRACO_MESH_COMPRESSION:Y[U]=new Rq(W,this.dracoLoader);break;case W0.KHR_TEXTURE_TRANSFORM:Y[U]=new kq;break;case W0.KHR_MESH_QUANTIZATION:Y[U]=new Vq;break;default:if(E.indexOf(U)>=0&&X[U]===void 0)console.warn('THREE.GLTFLoader: Unknown extension "'+U+'".')}}K.setExtensions(Y),K.setPlugins(X),K.parse(Z,$)}parseAsync(J,Q){let Z=this;return new Promise(function($,W){Z.parse(J,Q,$,W)})}}function vV(){let J={};return{get:function(Q){return J[Q]},add:function(Q,Z){J[Q]=Z},remove:function(Q){delete J[Q]},removeAll:function(){J={}}}}var W0={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_DISPERSION:"KHR_materials_dispersion",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"};class oE{constructor(J){this.parser=J,this.name=W0.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){let J=this.parser,Q=this.parser.json.nodes||[];for(let Z=0,$=Q.length;Z<$;Z++){let W=Q[Z];if(W.extensions&&W.extensions[this.name]&&W.extensions[this.name].light!==void 0)J._addNodeRef(this.cache,W.extensions[this.name].light)}}_loadLight(J){let Q=this.parser,Z="light:"+J,$=Q.cache.get(Z);if($)return $;let W=Q.json,H=((W.extensions&&W.extensions[this.name]||{}).lights||[])[J],K,G=new u(16777215);if(H.color!==void 0)G.setRGB(H.color[0],H.color[1],H.color[2],x0);let U=H.range!==void 0?H.range:0;switch(H.type){case"directional":K=new P7(G),K.target.position.set(0,0,-1),K.add(K.target);break;case"point":K=new A7(G),K.distance=U;break;case"spot":K=new w7(G),K.distance=U,H.spot=H.spot||{},H.spot.innerConeAngle=H.spot.innerConeAngle!==void 0?H.spot.innerConeAngle:0,H.spot.outerConeAngle=H.spot.outerConeAngle!==void 0?H.spot.outerConeAngle:Math.PI/4,K.angle=H.spot.outerConeAngle,K.penumbra=1-H.spot.innerConeAngle/H.spot.outerConeAngle,K.target.position.set(0,0,-1),K.add(K.target);break;default:throw Error("THREE.GLTFLoader: Unexpected light type: "+H.type)}if(K.position.set(0,0,0),z9(K,H),H.intensity!==void 0)K.intensity=H.intensity;return K.name=Q.createUniqueName(H.name||"light_"+J),$=Promise.resolve(K),Q.cache.add(Z,$),$}getDependency(J,Q){if(J!=="light")return;return this._loadLight(Q)}createNodeAttachment(J){let Q=this,Z=this.parser,W=Z.json.nodes[J],X=(W.extensions&&W.extensions[this.name]||{}).light;if(X===void 0)return null;return this._loadLight(X).then(function(H){return Z._getNodeRef(Q.cache,X,H)})}}class aE{constructor(){this.name=W0.KHR_MATERIALS_UNLIT}getMaterialType(){return b0}extendParams(J,Q,Z){let $=[];J.color=new u(1,1,1),J.opacity=1;let W=Q.pbrMetallicRoughness;if(W){if(Array.isArray(W.baseColorFactor)){let Y=W.baseColorFactor;J.color.setRGB(Y[0],Y[1],Y[2],x0),J.opacity=Y[3]}if(W.baseColorTexture!==void 0)$.push(Z.assignTexture(J,"map",W.baseColorTexture,f8))}return Promise.all($)}}class rE{constructor(J){this.parser=J,this.name=W0.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(J,Q){let $=this.parser.json.materials[J];if(!$.extensions||!$.extensions[this.name])return Promise.resolve();let W=$.extensions[this.name].emissiveStrength;if(W!==void 0)Q.emissiveIntensity=W;return Promise.resolve()}}class tE{constructor(J){this.parser=J,this.name=W0.KHR_MATERIALS_CLEARCOAT}getMaterialType(J){let Z=this.parser.json.materials[J];if(!Z.extensions||!Z.extensions[this.name])return null;return e0}extendMaterialParams(J,Q){let Z=this.parser,$=Z.json.materials[J];if(!$.extensions||!$.extensions[this.name])return Promise.resolve();let W=[],Y=$.extensions[this.name];if(Y.clearcoatFactor!==void 0)Q.clearcoat=Y.clearcoatFactor;if(Y.clearcoatTexture!==void 0)W.push(Z.assignTexture(Q,"clearcoatMap",Y.clearcoatTexture));if(Y.clearcoatRoughnessFactor!==void 0)Q.clearcoatRoughness=Y.clearcoatRoughnessFactor;if(Y.clearcoatRoughnessTexture!==void 0)W.push(Z.assignTexture(Q,"clearcoatRoughnessMap",Y.clearcoatRoughnessTexture));if(Y.clearcoatNormalTexture!==void 0){if(W.push(Z.assignTexture(Q,"clearcoatNormalMap",Y.clearcoatNormalTexture)),Y.clearcoatNormalTexture.scale!==void 0){let X=Y.clearcoatNormalTexture.scale;Q.clearcoatNormalScale=new i(X,X)}}return Promise.all(W)}}class eE{constructor(J){this.parser=J,this.name=W0.KHR_MATERIALS_DISPERSION}getMaterialType(J){let Z=this.parser.json.materials[J];if(!Z.extensions||!Z.extensions[this.name])return null;return e0}extendMaterialParams(J,Q){let $=this.parser.json.materials[J];if(!$.extensions||!$.extensions[this.name])return Promise.resolve();let W=$.extensions[this.name];return Q.dispersion=W.dispersion!==void 0?W.dispersion:0,Promise.resolve()}}class Jq{constructor(J){this.parser=J,this.name=W0.KHR_MATERIALS_IRIDESCENCE}getMaterialType(J){let Z=this.parser.json.materials[J];if(!Z.extensions||!Z.extensions[this.name])return null;return e0}extendMaterialParams(J,Q){let Z=this.parser,$=Z.json.materials[J];if(!$.extensions||!$.extensions[this.name])return Promise.resolve();let W=[],Y=$.extensions[this.name];if(Y.iridescenceFactor!==void 0)Q.iridescence=Y.iridescenceFactor;if(Y.iridescenceTexture!==void 0)W.push(Z.assignTexture(Q,"iridescenceMap",Y.iridescenceTexture));if(Y.iridescenceIor!==void 0)Q.iridescenceIOR=Y.iridescenceIor;if(Q.iridescenceThicknessRange===void 0)Q.iridescenceThicknessRange=[100,400];if(Y.iridescenceThicknessMinimum!==void 0)Q.iridescenceThicknessRange[0]=Y.iridescenceThicknessMinimum;if(Y.iridescenceThicknessMaximum!==void 0)Q.iridescenceThicknessRange[1]=Y.iridescenceThicknessMaximum;if(Y.iridescenceThicknessTexture!==void 0)W.push(Z.assignTexture(Q,"iridescenceThicknessMap",Y.iridescenceThicknessTexture));return Promise.all(W)}}class Qq{constructor(J){this.parser=J,this.name=W0.KHR_MATERIALS_SHEEN}getMaterialType(J){let Z=this.parser.json.materials[J];if(!Z.extensions||!Z.extensions[this.name])return null;return e0}extendMaterialParams(J,Q){let Z=this.parser,$=Z.json.materials[J];if(!$.extensions||!$.extensions[this.name])return Promise.resolve();let W=[];Q.sheenColor=new u(0,0,0),Q.sheenRoughness=0,Q.sheen=1;let Y=$.extensions[this.name];if(Y.sheenColorFactor!==void 0){let X=Y.sheenColorFactor;Q.sheenColor.setRGB(X[0],X[1],X[2],x0)}if(Y.sheenRoughnessFactor!==void 0)Q.sheenRoughness=Y.sheenRoughnessFactor;if(Y.sheenColorTexture!==void 0)W.push(Z.assignTexture(Q,"sheenColorMap",Y.sheenColorTexture,f8));if(Y.sheenRoughnessTexture!==void 0)W.push(Z.assignTexture(Q,"sheenRoughnessMap",Y.sheenRoughnessTexture));return Promise.all(W)}}class Zq{constructor(J){this.parser=J,this.name=W0.KHR_MATERIALS_TRANSMISSION}getMaterialType(J){let Z=this.parser.json.materials[J];if(!Z.extensions||!Z.extensions[this.name])return null;return e0}extendMaterialParams(J,Q){let Z=this.parser,$=Z.json.materials[J];if(!$.extensions||!$.extensions[this.name])return Promise.resolve();let W=[],Y=$.extensions[this.name];if(Y.transmissionFactor!==void 0)Q.transmission=Y.transmissionFactor;if(Y.transmissionTexture!==void 0)W.push(Z.assignTexture(Q,"transmissionMap",Y.transmissionTexture));return Promise.all(W)}}class $q{constructor(J){this.parser=J,this.name=W0.KHR_MATERIALS_VOLUME}getMaterialType(J){let Z=this.parser.json.materials[J];if(!Z.extensions||!Z.extensions[this.name])return null;return e0}extendMaterialParams(J,Q){let Z=this.parser,$=Z.json.materials[J];if(!$.extensions||!$.extensions[this.name])return Promise.resolve();let W=[],Y=$.extensions[this.name];if(Q.thickness=Y.thicknessFactor!==void 0?Y.thicknessFactor:0,Y.thicknessTexture!==void 0)W.push(Z.assignTexture(Q,"thicknessMap",Y.thicknessTexture));Q.attenuationDistance=Y.attenuationDistance||1/0;let X=Y.attenuationColor||[1,1,1];return Q.attenuationColor=new u().setRGB(X[0],X[1],X[2],x0),Promise.all(W)}}class Wq{constructor(J){this.parser=J,this.name=W0.KHR_MATERIALS_IOR}getMaterialType(J){let Z=this.parser.json.materials[J];if(!Z.extensions||!Z.extensions[this.name])return null;return e0}extendMaterialParams(J,Q){let $=this.parser.json.materials[J];if(!$.extensions||!$.extensions[this.name])return Promise.resolve();let W=$.extensions[this.name];return Q.ior=W.ior!==void 0?W.ior:1.5,Promise.resolve()}}class Yq{constructor(J){this.parser=J,this.name=W0.KHR_MATERIALS_SPECULAR}getMaterialType(J){let Z=this.parser.json.materials[J];if(!Z.extensions||!Z.extensions[this.name])return null;return e0}extendMaterialParams(J,Q){let Z=this.parser,$=Z.json.materials[J];if(!$.extensions||!$.extensions[this.name])return Promise.resolve();let W=[],Y=$.extensions[this.name];if(Q.specularIntensity=Y.specularFactor!==void 0?Y.specularFactor:1,Y.specularTexture!==void 0)W.push(Z.assignTexture(Q,"specularIntensityMap",Y.specularTexture));let X=Y.specularColorFactor||[1,1,1];if(Q.specularColor=new u().setRGB(X[0],X[1],X[2],x0),Y.specularColorTexture!==void 0)W.push(Z.assignTexture(Q,"specularColorMap",Y.specularColorTexture,f8));return Promise.all(W)}}class Xq{constructor(J){this.parser=J,this.name=W0.EXT_MATERIALS_BUMP}getMaterialType(J){let Z=this.parser.json.materials[J];if(!Z.extensions||!Z.extensions[this.name])return null;return e0}extendMaterialParams(J,Q){let Z=this.parser,$=Z.json.materials[J];if(!$.extensions||!$.extensions[this.name])return Promise.resolve();let W=[],Y=$.extensions[this.name];if(Q.bumpScale=Y.bumpFactor!==void 0?Y.bumpFactor:1,Y.bumpTexture!==void 0)W.push(Z.assignTexture(Q,"bumpMap",Y.bumpTexture));return Promise.all(W)}}class Hq{constructor(J){this.parser=J,this.name=W0.KHR_MATERIALS_ANISOTROPY}getMaterialType(J){let Z=this.parser.json.materials[J];if(!Z.extensions||!Z.extensions[this.name])return null;return e0}extendMaterialParams(J,Q){let Z=this.parser,$=Z.json.materials[J];if(!$.extensions||!$.extensions[this.name])return Promise.resolve();let W=[],Y=$.extensions[this.name];if(Y.anisotropyStrength!==void 0)Q.anisotropy=Y.anisotropyStrength;if(Y.anisotropyRotation!==void 0)Q.anisotropyRotation=Y.anisotropyRotation;if(Y.anisotropyTexture!==void 0)W.push(Z.assignTexture(Q,"anisotropyMap",Y.anisotropyTexture));return Promise.all(W)}}class Kq{constructor(J){this.parser=J,this.name=W0.KHR_TEXTURE_BASISU}loadTexture(J){let Q=this.parser,Z=Q.json,$=Z.textures[J];if(!$.extensions||!$.extensions[this.name])return null;let W=$.extensions[this.name],Y=Q.options.ktx2Loader;if(!Y)if(Z.extensionsRequired&&Z.extensionsRequired.indexOf(this.name)>=0)throw Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");else return null;return Q.loadTextureImage(J,W.source,Y)}}class Gq{constructor(J){this.parser=J,this.name=W0.EXT_TEXTURE_WEBP,this.isSupported=null}loadTexture(J){let Q=this.name,Z=this.parser,$=Z.json,W=$.textures[J];if(!W.extensions||!W.extensions[Q])return null;let Y=W.extensions[Q],X=$.images[Y.source],H=Z.textureLoader;if(X.uri){let K=Z.options.manager.getHandler(X.uri);if(K!==null)H=K}return this.detectSupport().then(function(K){if(K)return Z.loadTextureImage(J,Y.source,H);if($.extensionsRequired&&$.extensionsRequired.indexOf(Q)>=0)throw Error("THREE.GLTFLoader: WebP required by asset but unsupported.");return Z.loadTexture(J)})}detectSupport(){if(!this.isSupported)this.isSupported=new Promise(function(J){let Q=new Image;Q.src="data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA",Q.onload=Q.onerror=function(){J(Q.height===1)}});return this.isSupported}}class Uq{constructor(J){this.parser=J,this.name=W0.EXT_TEXTURE_AVIF,this.isSupported=null}loadTexture(J){let Q=this.name,Z=this.parser,$=Z.json,W=$.textures[J];if(!W.extensions||!W.extensions[Q])return null;let Y=W.extensions[Q],X=$.images[Y.source],H=Z.textureLoader;if(X.uri){let K=Z.options.manager.getHandler(X.uri);if(K!==null)H=K}return this.detectSupport().then(function(K){if(K)return Z.loadTextureImage(J,Y.source,H);if($.extensionsRequired&&$.extensionsRequired.indexOf(Q)>=0)throw Error("THREE.GLTFLoader: AVIF required by asset but unsupported.");return Z.loadTexture(J)})}detectSupport(){if(!this.isSupported)this.isSupported=new Promise(function(J){let Q=new Image;Q.src="data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAABcAAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAEAAAABAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQAMAAAAABNjb2xybmNseAACAAIABoAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAAB9tZGF0EgAKCBgABogQEDQgMgkQAAAAB8dSLfI=",Q.onload=Q.onerror=function(){J(Q.height===1)}});return this.isSupported}}class Eq{constructor(J){this.name=W0.EXT_MESHOPT_COMPRESSION,this.parser=J}loadBufferView(J){let Q=this.parser.json,Z=Q.bufferViews[J];if(Z.extensions&&Z.extensions[this.name]){let $=Z.extensions[this.name],W=this.parser.getDependency("buffer",$.buffer),Y=this.parser.options.meshoptDecoder;if(!Y||!Y.supported)if(Q.extensionsRequired&&Q.extensionsRequired.indexOf(this.name)>=0)throw Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");else return null;return W.then(function(X){let H=$.byteOffset||0,K=$.byteLength||0,G=$.count,U=$.byteStride,E=new Uint8Array(X,H,K);if(Y.decodeGltfBufferAsync)return Y.decodeGltfBufferAsync(G,U,E,$.mode,$.filter).then(function(q){return q.buffer});else return Y.ready.then(function(){let q=new ArrayBuffer(G*U);return Y.decodeGltfBuffer(new Uint8Array(q),G,U,E,$.mode,$.filter),q})})}else return null}}class qq{constructor(J){this.name=W0.EXT_MESH_GPU_INSTANCING,this.parser=J}createNodeMesh(J){let Q=this.parser.json,Z=Q.nodes[J];if(!Z.extensions||!Z.extensions[this.name]||Z.mesh===void 0)return null;let $=Q.meshes[Z.mesh];for(let K of $.primitives)if(K.mode!==A8.TRIANGLES&&K.mode!==A8.TRIANGLE_STRIP&&K.mode!==A8.TRIANGLE_FAN&&K.mode!==void 0)return null;let Y=Z.extensions[this.name].attributes,X=[],H={};for(let K in Y)X.push(this.parser.getDependency("accessor",Y[K]).then((G)=>{return H[K]=G,H[K]}));if(X.length<1)return null;return X.push(this.parser.createNodeMesh(J)),Promise.all(X).then((K)=>{let G=K.pop(),U=G.isGroup?G.children:[G],E=K[0].count,q=[];for(let N of U){let k=new SJ,V=new I,R=new P0,O=new I(1,1,1),D=new D7(N.geometry,N.material,E);for(let F=0;F<E;F++){if(H.TRANSLATION)V.fromBufferAttribute(H.TRANSLATION,F);if(H.ROTATION)R.fromBufferAttribute(H.ROTATION,F);if(H.SCALE)O.fromBufferAttribute(H.SCALE,F);D.setMatrixAt(F,k.compose(V,R,O))}for(let F in H)if(F==="_COLOR_0"){let C=H[F];D.instanceColor=new x8(C.array,C.itemSize,C.normalized)}else if(F!=="TRANSLATION"&&F!=="ROTATION"&&F!=="SCALE")N.geometry.setAttribute(F,H[F]);$0.prototype.copy.call(D,N),this.parser.assignFinalMaterial(D),q.push(D)}if(G.isGroup)return G.clear(),G.add(...q),G;return q[0]})}}var Nq="glTF",HZ=12,cE={JSON:1313821514,BIN:5130562};class Oq{constructor(J){this.name=W0.KHR_BINARY_GLTF,this.content=null,this.body=null;let Q=new DataView(J,0,HZ),Z=/*@__PURE__*/new TextDecoder;if(this.header={magic:Z.decode(new Uint8Array(J.slice(0,4))),version:Q.getUint32(4,!0),length:Q.getUint32(8,!0)},this.header.magic!==Nq)throw Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");else if(this.header.version<2)throw Error("THREE.GLTFLoader: Legacy binary file detected.");let $=this.header.length-HZ,W=new DataView(J,HZ),Y=0;while(Y<$){let X=W.getUint32(Y,!0);Y+=4;let H=W.getUint32(Y,!0);if(Y+=4,H===cE.JSON){let K=new Uint8Array(J,HZ+Y,X);this.content=Z.decode(K)}else if(H===cE.BIN){let K=HZ+Y;this.body=J.slice(K,K+X)}Y+=X}if(this.content===null)throw Error("THREE.GLTFLoader: JSON content not found.")}}class Rq{constructor(J,Q){if(!Q)throw Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=W0.KHR_DRACO_MESH_COMPRESSION,this.json=J,this.dracoLoader=Q,this.dracoLoader.preload()}decodePrimitive(J,Q){let Z=this.json,$=this.dracoLoader,W=J.extensions[this.name].bufferView,Y=J.extensions[this.name].attributes,X={},H={},K={};for(let G in Y){let U=ZK[G]||G.toLowerCase();X[U]=Y[G]}for(let G in J.attributes){let U=ZK[G]||G.toLowerCase();if(Y[G]!==void 0){let E=Z.accessors[J.attributes[G]],q=v7[E.componentType];K[U]=q.name,H[U]=E.normalized===!0}}return Q.getDependency("bufferView",W).then(function(G){return new Promise(function(U,E){$.decodeDracoFile(G,function(q){for(let N in q.attributes){let k=q.attributes[N],V=H[N];if(V!==void 0)k.normalized=V}U(q)},X,K,x0,E)})})}}class kq{constructor(){this.name=W0.KHR_TEXTURE_TRANSFORM}extendTexture(J,Q){if((Q.texCoord===void 0||Q.texCoord===J.channel)&&Q.offset===void 0&&Q.rotation===void 0&&Q.scale===void 0)return J;if(J=J.clone(),Q.texCoord!==void 0)J.channel=Q.texCoord;if(Q.offset!==void 0)J.offset.fromArray(Q.offset);if(Q.rotation!==void 0)J.rotation=Q.rotation;if(Q.scale!==void 0)J.repeat.fromArray(Q.scale);return J.needsUpdate=!0,J}}class Vq{constructor(){this.name=W0.KHR_MESH_QUANTIZATION}}class YK extends D9{constructor(J,Q,Z,$){super(J,Q,Z,$)}copySampleValue_(J){let Q=this.resultBuffer,Z=this.sampleValues,$=this.valueSize,W=J*$*3+$;for(let Y=0;Y!==$;Y++)Q[Y]=Z[W+Y];return Q}interpolate_(J,Q,Z,$){let W=this.resultBuffer,Y=this.sampleValues,X=this.valueSize,H=X*2,K=X*3,G=$-Q,U=(Z-Q)/G,E=U*U,q=E*U,N=J*K,k=N-K,V=-2*q+3*E,R=q-E,O=1-V,D=R-E+U;for(let F=0;F!==X;F++){let C=Y[k+F+X],P=Y[k+F+H]*G,M=Y[N+F+X],w=Y[N+F]*G;W[F]=O*C+D*P+V*M+R*w}return W}}var yV=new P0;class Fq extends YK{interpolate_(J,Q,Z,$){let W=super.interpolate_(J,Q,Z,$);return yV.fromArray(W).normalize().toArray(W),W}}var A8={FLOAT:5126,FLOAT_MAT3:35675,FLOAT_MAT4:35676,FLOAT_VEC2:35664,FLOAT_VEC3:35665,FLOAT_VEC4:35666,LINEAR:9729,REPEAT:10497,SAMPLER_2D:35678,POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6,UNSIGNED_BYTE:5121,UNSIGNED_SHORT:5123},v7={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},nE={9728:i8,9729:m0,9984:RQ,9985:E6,9986:y9,9987:M8},sE={33071:OQ,33648:s8,10497:U6},eH={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},ZK={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},p9={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},xV={CUBICSPLINE:void 0,LINEAR:_Q,STEP:o$},JK={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function bV(J){if(J.DefaultMaterial===void 0)J.DefaultMaterial=new f9({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:t0});return J.DefaultMaterial}function S6(J,Q,Z){for(let $ in Z.extensions)if(J[$]===void 0)Q.userData.gltfExtensions=Q.userData.gltfExtensions||{},Q.userData.gltfExtensions[$]=Z.extensions[$]}function z9(J,Q){if(Q.extras!==void 0)if(typeof Q.extras==="object")Object.assign(J.userData,Q.extras);else console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+Q.extras)}function hV(J,Q,Z){let $=!1,W=!1,Y=!1;for(let G=0,U=Q.length;G<U;G++){let E=Q[G];if(E.POSITION!==void 0)$=!0;if(E.NORMAL!==void 0)W=!0;if(E.COLOR_0!==void 0)Y=!0;if($&&W&&Y)break}if(!$&&!W&&!Y)return Promise.resolve(J);let X=[],H=[],K=[];for(let G=0,U=Q.length;G<U;G++){let E=Q[G];if($){let q=E.POSITION!==void 0?Z.getDependency("accessor",E.POSITION):J.attributes.position;X.push(q)}if(W){let q=E.NORMAL!==void 0?Z.getDependency("accessor",E.NORMAL):J.attributes.normal;H.push(q)}if(Y){let q=E.COLOR_0!==void 0?Z.getDependency("accessor",E.COLOR_0):J.attributes.color;K.push(q)}}return Promise.all([Promise.all(X),Promise.all(H),Promise.all(K)]).then(function(G){let U=G[0],E=G[1],q=G[2];if($)J.morphAttributes.position=U;if(W)J.morphAttributes.normal=E;if(Y)J.morphAttributes.color=q;return J.morphTargetsRelative=!0,J})}function fV(J,Q){if(J.updateMorphTargets(),Q.weights!==void 0)for(let Z=0,$=Q.weights.length;Z<$;Z++)J.morphTargetInfluences[Z]=Q.weights[Z];if(Q.extras&&Array.isArray(Q.extras.targetNames)){let Z=Q.extras.targetNames;if(J.morphTargetInfluences.length===Z.length){J.morphTargetDictionary={};for(let $=0,W=Z.length;$<W;$++)J.morphTargetDictionary[Z[$]]=$}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function gV(J){let Q,Z=J.extensions&&J.extensions[W0.KHR_DRACO_MESH_COMPRESSION];if(Z)Q="draco:"+Z.bufferView+":"+Z.indices+":"+QK(Z.attributes);else Q=J.indices+":"+QK(J.attributes)+":"+J.mode;if(J.targets!==void 0)for(let $=0,W=J.targets.length;$<W;$++)Q+=":"+QK(J.targets[$]);return Q}function QK(J){let Q="",Z=Object.keys(J).sort();for(let $=0,W=Z.length;$<W;$++)Q+=Z[$]+":"+J[Z[$]]+";";return Q}function $K(J){switch(J){case Int8Array:return 0.007874015748031496;case Uint8Array:return 0.00392156862745098;case Int16Array:return 0.00003051850947599719;case Uint16Array:return 0.000015259021896696422;default:throw Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function pV(J){if(J.search(/\.jpe?g($|\?)/i)>0||J.search(/^data\:image\/jpeg/)===0)return"image/jpeg";if(J.search(/\.webp($|\?)/i)>0||J.search(/^data\:image\/webp/)===0)return"image/webp";if(J.search(/\.ktx2($|\?)/i)>0||J.search(/^data\:image\/ktx2/)===0)return"image/ktx2";return"image/png"}var mV=new SJ;class Dq{constructor(J={},Q={}){this.json=J,this.extensions={},this.plugins={},this.options=Q,this.cache=new vV,this.associations=/*@__PURE__*/new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let Z=!1,$=-1,W=!1,Y=-1;if(typeof navigator<"u"){let X=navigator.userAgent;Z=/^((?!chrome|android).)*safari/i.test(X)===!0;let H=X.match(/Version\/(\d+)/);$=Z&&H?parseInt(H[1],10):-1,W=X.indexOf("Firefox")>-1,Y=W?X.match(/Firefox\/([0-9]+)\./)[1]:-1}if(typeof createImageBitmap>"u"||Z&&$<17||W&&Y<98)this.textureLoader=new eQ(this.options.manager);else this.textureLoader=new QZ(this.options.manager);if(this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new Y8(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials")this.fileLoader.setWithCredentials(!0)}setExtensions(J){this.extensions=J}setPlugins(J){this.plugins=J}parse(J,Q){let Z=this,$=this.json,W=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(Y){return Y._markDefs&&Y._markDefs()}),Promise.all(this._invokeAll(function(Y){return Y.beforeRoot&&Y.beforeRoot()})).then(function(){return Promise.all([Z.getDependencies("scene"),Z.getDependencies("animation"),Z.getDependencies("camera")])}).then(function(Y){let X={scene:Y[0][$.scene||0],scenes:Y[0],animations:Y[1],cameras:Y[2],asset:$.asset,parser:Z,userData:{}};return S6(W,X,$),z9(X,$),Promise.all(Z._invokeAll(function(H){return H.afterRoot&&H.afterRoot(X)})).then(function(){for(let H of X.scenes)H.updateMatrixWorld();J(X)})}).catch(Q)}_markDefs(){let J=this.json.nodes||[],Q=this.json.skins||[],Z=this.json.meshes||[];for(let $=0,W=Q.length;$<W;$++){let Y=Q[$].joints;for(let X=0,H=Y.length;X<H;X++)J[Y[X]].isBone=!0}for(let $=0,W=J.length;$<W;$++){let Y=J[$];if(Y.mesh!==void 0){if(this._addNodeRef(this.meshCache,Y.mesh),Y.skin!==void 0)Z[Y.mesh].isSkinnedMesh=!0}if(Y.camera!==void 0)this._addNodeRef(this.cameraCache,Y.camera)}}_addNodeRef(J,Q){if(Q===void 0)return;if(J.refs[Q]===void 0)J.refs[Q]=J.uses[Q]=0;J.refs[Q]++}_getNodeRef(J,Q,Z){if(J.refs[Q]<=1)return Z;let $=Z.clone(),W=(Y,X)=>{let H=this.associations.get(Y);if(H!=null)this.associations.set(X,H);for(let[K,G]of Y.children.entries())W(G,X.children[K])};return W(Z,$),$.name+="_instance_"+J.uses[Q]++,$}_invokeOne(J){let Q=Object.values(this.plugins);Q.push(this);for(let Z=0;Z<Q.length;Z++){let $=J(Q[Z]);if($)return $}return null}_invokeAll(J){let Q=Object.values(this.plugins);Q.unshift(this);let Z=[];for(let $=0;$<Q.length;$++){let W=J(Q[$]);if(W)Z.push(W)}return Z}getDependency(J,Q){let Z=J+":"+Q,$=this.cache.get(Z);if(!$){switch(J){case"scene":$=this.loadScene(Q);break;case"node":$=this._invokeOne(function(W){return W.loadNode&&W.loadNode(Q)});break;case"mesh":$=this._invokeOne(function(W){return W.loadMesh&&W.loadMesh(Q)});break;case"accessor":$=this.loadAccessor(Q);break;case"bufferView":$=this._invokeOne(function(W){return W.loadBufferView&&W.loadBufferView(Q)});break;case"buffer":$=this.loadBuffer(Q);break;case"material":$=this._invokeOne(function(W){return W.loadMaterial&&W.loadMaterial(Q)});break;case"texture":$=this._invokeOne(function(W){return W.loadTexture&&W.loadTexture(Q)});break;case"skin":$=this.loadSkin(Q);break;case"animation":$=this._invokeOne(function(W){return W.loadAnimation&&W.loadAnimation(Q)});break;case"camera":$=this.loadCamera(Q);break;default:if($=this._invokeOne(function(W){return W!=this&&W.getDependency&&W.getDependency(J,Q)}),!$)throw Error("Unknown type: "+J);break}this.cache.add(Z,$)}return $}getDependencies(J){let Q=this.cache.get(J);if(!Q){let Z=this,$=this.json[J+(J==="mesh"?"es":"s")]||[];Q=Promise.all($.map(function(W,Y){return Z.getDependency(J,Y)})),this.cache.add(J,Q)}return Q}loadBuffer(J){let Q=this.json.buffers[J],Z=this.fileLoader;if(Q.type&&Q.type!=="arraybuffer")throw Error("THREE.GLTFLoader: "+Q.type+" buffer type is not supported.");if(Q.uri===void 0&&J===0)return Promise.resolve(this.extensions[W0.KHR_BINARY_GLTF].body);let $=this.options;return new Promise(function(W,Y){Z.load(b8.resolveURL(Q.uri,$.path),W,void 0,function(){Y(Error('THREE.GLTFLoader: Failed to load buffer "'+Q.uri+'".'))})})}loadBufferView(J){let Q=this.json.bufferViews[J];return this.getDependency("buffer",Q.buffer).then(function(Z){let $=Q.byteLength||0,W=Q.byteOffset||0;return Z.slice(W,W+$)})}loadAccessor(J){let Q=this,Z=this.json,$=this.json.accessors[J];if($.bufferView===void 0&&$.sparse===void 0){let Y=eH[$.type],X=v7[$.componentType],H=$.normalized===!0,K=new X($.count*Y);return Promise.resolve(new X0(K,Y,H))}let W=[];if($.bufferView!==void 0)W.push(this.getDependency("bufferView",$.bufferView));else W.push(null);if($.sparse!==void 0)W.push(this.getDependency("bufferView",$.sparse.indices.bufferView)),W.push(this.getDependency("bufferView",$.sparse.values.bufferView));return Promise.all(W).then(function(Y){let X=Y[0],H=eH[$.type],K=v7[$.componentType],G=K.BYTES_PER_ELEMENT,U=G*H,E=$.byteOffset||0,q=$.bufferView!==void 0?Z.bufferViews[$.bufferView].byteStride:void 0,N=$.normalized===!0,k,V;if(q&&q!==U){let R=Math.floor(E/q),O="InterleavedBuffer:"+$.bufferView+":"+$.componentType+":"+R+":"+$.count,D=Q.cache.get(O);if(!D)k=new K(X,R*q,$.count*q/G),D=new g8(k,q/G),Q.cache.add(O,D);V=new O8(D,H,E%q/G,N)}else{if(X===null)k=new K($.count*H);else k=new K(X,E,$.count*H);V=new X0(k,H,N)}if($.sparse!==void 0){let R=eH.SCALAR,O=v7[$.sparse.indices.componentType],D=$.sparse.indices.byteOffset||0,F=$.sparse.values.byteOffset||0,C=new O(Y[1],D,$.sparse.count*R),P=new K(Y[2],F,$.sparse.count*H);if(X!==null)V=new X0(V.array.slice(),V.itemSize,V.normalized);V.normalized=!1;for(let M=0,w=C.length;M<w;M++){let v=C[M];if(V.setX(v,P[M*H]),H>=2)V.setY(v,P[M*H+1]);if(H>=3)V.setZ(v,P[M*H+2]);if(H>=4)V.setW(v,P[M*H+3]);if(H>=5)throw Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}V.normalized=N}return V})}loadTexture(J){let Q=this.json,Z=this.options,W=Q.textures[J].source,Y=Q.images[W],X=this.textureLoader;if(Y.uri){let H=Z.manager.getHandler(Y.uri);if(H!==null)X=H}return this.loadTextureImage(J,W,X)}loadTextureImage(J,Q,Z){let $=this,W=this.json,Y=W.textures[J],X=W.images[Q],H=(X.uri||X.bufferView)+":"+Y.sampler;if(this.textureCache[H])return this.textureCache[H];let K=this.loadImageSource(Q,Z).then(function(G){if(G.flipY=!1,G.name=Y.name||X.name||"",G.name===""&&typeof X.uri==="string"&&X.uri.startsWith("data:image/")===!1)G.name=X.uri;let E=(W.samplers||{})[Y.sampler]||{};return G.magFilter=nE[E.magFilter]||m0,G.minFilter=nE[E.minFilter]||M8,G.wrapS=sE[E.wrapS]||U6,G.wrapT=sE[E.wrapT]||U6,G.generateMipmaps=!G.isCompressedTexture&&G.minFilter!==i8&&G.minFilter!==m0,$.associations.set(G,{textures:J}),G}).catch(function(){return null});return this.textureCache[H]=K,K}loadImageSource(J,Q){let Z=this,$=this.json,W=this.options;if(this.sourceCache[J]!==void 0)return this.sourceCache[J].then((U)=>U.clone());let Y=$.images[J],X=self.URL||self.webkitURL,H=Y.uri||"",K=!1;if(Y.bufferView!==void 0)H=Z.getDependency("bufferView",Y.bufferView).then(function(U){K=!0;let E=new Blob([U],{type:Y.mimeType});return H=X.createObjectURL(E),H});else if(Y.uri===void 0)throw Error("THREE.GLTFLoader: Image "+J+" is missing URI and bufferView");let G=Promise.resolve(H).then(function(U){return new Promise(function(E,q){let N=E;if(Q.isImageBitmapLoader===!0)N=function(k){let V=new R0(k);V.needsUpdate=!0,E(V)};Q.load(b8.resolveURL(U,W.path),N,void 0,q)})}).then(function(U){if(K===!0)X.revokeObjectURL(H);return z9(U,Y),U.userData.mimeType=Y.mimeType||pV(Y.uri),U}).catch(function(U){throw console.error("THREE.GLTFLoader: Couldn't load texture",H),U});return this.sourceCache[J]=G,G}assignTexture(J,Q,Z,$){let W=this;return this.getDependency("texture",Z.index).then(function(Y){if(!Y)return null;if(Z.texCoord!==void 0&&Z.texCoord>0)Y=Y.clone(),Y.channel=Z.texCoord;if(W.extensions[W0.KHR_TEXTURE_TRANSFORM]){let X=Z.extensions!==void 0?Z.extensions[W0.KHR_TEXTURE_TRANSFORM]:void 0;if(X){let H=W.associations.get(Y);Y=W.extensions[W0.KHR_TEXTURE_TRANSFORM].extendTexture(Y,X),W.associations.set(Y,H)}}if($!==void 0)Y.colorSpace=$;return J[Q]=Y,Y})}assignFinalMaterial(J){let{geometry:Q,material:Z}=J,$=Q.attributes.tangent===void 0,W=Q.attributes.color!==void 0,Y=Q.attributes.normal===void 0;if(J.isPoints){let X="PointsMaterial:"+Z.uuid,H=this.cache.get(X);if(!H)H=new M6,C0.prototype.copy.call(H,Z),H.color.copy(Z.color),H.map=Z.map,H.sizeAttenuation=!1,this.cache.add(X,H);Z=H}else if(J.isLine){let X="LineBasicMaterial:"+Z.uuid,H=this.cache.get(X);if(!H)H=new S0,C0.prototype.copy.call(H,Z),H.color.copy(Z.color),H.map=Z.map,this.cache.add(X,H);Z=H}if($||W||Y){let X="ClonedMaterial:"+Z.uuid+":";if($)X+="derivative-tangents:";if(W)X+="vertex-colors:";if(Y)X+="flat-shading:";let H=this.cache.get(X);if(!H){if(H=Z.clone(),W)H.vertexColors=!0;if(Y)H.flatShading=!0;if($){if(H.normalScale)H.normalScale.y*=-1;if(H.clearcoatNormalScale)H.clearcoatNormalScale.y*=-1}this.cache.add(X,H),this.associations.set(H,this.associations.get(Z))}Z=H}J.material=Z}getMaterialType(){return f9}loadMaterial(J){let Q=this,Z=this.json,$=this.extensions,W=Z.materials[J],Y,X={},H=W.extensions||{},K=[];if(H[W0.KHR_MATERIALS_UNLIT]){let U=$[W0.KHR_MATERIALS_UNLIT];Y=U.getMaterialType(),K.push(U.extendParams(X,W,Q))}else{let U=W.pbrMetallicRoughness||{};if(X.color=new u(1,1,1),X.opacity=1,Array.isArray(U.baseColorFactor)){let E=U.baseColorFactor;X.color.setRGB(E[0],E[1],E[2],x0),X.opacity=E[3]}if(U.baseColorTexture!==void 0)K.push(Q.assignTexture(X,"map",U.baseColorTexture,f8));if(X.metalness=U.metallicFactor!==void 0?U.metallicFactor:1,X.roughness=U.roughnessFactor!==void 0?U.roughnessFactor:1,U.metallicRoughnessTexture!==void 0)K.push(Q.assignTexture(X,"metalnessMap",U.metallicRoughnessTexture)),K.push(Q.assignTexture(X,"roughnessMap",U.metallicRoughnessTexture));Y=this._invokeOne(function(E){return E.getMaterialType&&E.getMaterialType(J)}),K.push(Promise.all(this._invokeAll(function(E){return E.extendMaterialParams&&E.extendMaterialParams(J,X)})))}if(W.doubleSided===!0)X.side=T0;let G=W.alphaMode||JK.OPAQUE;if(G===JK.BLEND)X.transparent=!0,X.depthWrite=!1;else if(X.transparent=!1,G===JK.MASK)X.alphaTest=W.alphaCutoff!==void 0?W.alphaCutoff:0.5;if(W.normalTexture!==void 0&&Y!==b0){if(K.push(Q.assignTexture(X,"normalMap",W.normalTexture)),X.normalScale=new i(1,1),W.normalTexture.scale!==void 0){let U=W.normalTexture.scale;X.normalScale.set(U,U)}}if(W.occlusionTexture!==void 0&&Y!==b0){if(K.push(Q.assignTexture(X,"aoMap",W.occlusionTexture)),W.occlusionTexture.strength!==void 0)X.aoMapIntensity=W.occlusionTexture.strength}if(W.emissiveFactor!==void 0&&Y!==b0){let U=W.emissiveFactor;X.emissive=new u().setRGB(U[0],U[1],U[2],x0)}if(W.emissiveTexture!==void 0&&Y!==b0)K.push(Q.assignTexture(X,"emissiveMap",W.emissiveTexture,f8));return Promise.all(K).then(function(){let U=new Y(X);if(W.name)U.name=W.name;if(z9(U,W),Q.associations.set(U,{materials:J}),W.extensions)S6($,U,W);return U})}createUniqueName(J){let Q=Y0.sanitizeNodeName(J||"");if(Q in this.nodeNamesUsed)return Q+"_"+ ++this.nodeNamesUsed[Q];else return this.nodeNamesUsed[Q]=0,Q}loadGeometries(J){let Q=this,Z=this.extensions,$=this.primitiveCache;function W(X){return Z[W0.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(X,Q).then(function(H){return iE(H,X,Q)})}let Y=[];for(let X=0,H=J.length;X<H;X++){let K=J[X],G=gV(K),U=$[G];if(U)Y.push(U.promise);else{let E;if(K.extensions&&K.extensions[W0.KHR_DRACO_MESH_COMPRESSION])E=W(K);else E=iE(new gJ,K,Q);$[G]={primitive:K,promise:E},Y.push(E)}}return Promise.all(Y)}loadMesh(J){let Q=this,Z=this.json,$=this.extensions,W=Z.meshes[J],Y=W.primitives,X=[];for(let H=0,K=Y.length;H<K;H++){let G=Y[H].material===void 0?bV(this.cache):this.getDependency("material",Y[H].material);X.push(G)}return X.push(Q.loadGeometries(Y)),Promise.all(X).then(function(H){let K=H.slice(0,H.length-1),G=H[H.length-1],U=[];for(let q=0,N=G.length;q<N;q++){let k=G[q],V=Y[q],R,O=K[q];if(V.mode===A8.TRIANGLES||V.mode===A8.TRIANGLE_STRIP||V.mode===A8.TRIANGLE_FAN||V.mode===void 0){if(R=W.isSkinnedMesh===!0?new F7(k,O):new N0(k,O),R.isSkinnedMesh===!0)R.normalizeSkinWeights();if(V.mode===A8.TRIANGLE_STRIP)R.geometry=tH(R.geometry,E7);else if(V.mode===A8.TRIANGLE_FAN)R.geometry=tH(R.geometry,k6)}else if(V.mode===A8.LINES)R=new K8(k,O);else if(V.mode===A8.LINE_STRIP)R=new _8(k,O);else if(V.mode===A8.LINE_LOOP)R=new B7(k,O);else if(V.mode===A8.POINTS)R=new L7(k,O);else throw Error("THREE.GLTFLoader: Primitive mode unsupported: "+V.mode);if(Object.keys(R.geometry.morphAttributes).length>0)fV(R,W);if(R.name=Q.createUniqueName(W.name||"mesh_"+J),z9(R,W),V.extensions)S6($,R,V);Q.assignFinalMaterial(R),U.push(R)}for(let q=0,N=U.length;q<N;q++)Q.associations.set(U[q],{meshes:J,primitives:q});if(U.length===1){if(W.extensions)S6($,U[0],W);return U[0]}let E=new $8;if(W.extensions)S6($,E,W);Q.associations.set(E,{meshes:J});for(let q=0,N=U.length;q<N;q++)E.add(U[q]);return E})}loadCamera(J){let Q,Z=this.json.cameras[J],$=Z[Z.type];if(!$){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}if(Z.type==="perspective")Q=new O0(JW.radToDeg($.yfov),$.aspectRatio||1,$.znear||1,$.zfar||2000000);else if(Z.type==="orthographic")Q=new r8(-$.xmag,$.xmag,$.ymag,-$.ymag,$.znear,$.zfar);if(Z.name)Q.name=this.createUniqueName(Z.name);return z9(Q,Z),Promise.resolve(Q)}loadSkin(J){let Q=this.json.skins[J],Z=[];for(let $=0,W=Q.joints.length;$<W;$++)Z.push(this._loadNodeShallow(Q.joints[$]));if(Q.inverseBindMatrices!==void 0)Z.push(this.getDependency("accessor",Q.inverseBindMatrices));else Z.push(null);return Promise.all(Z).then(function($){let W=$.pop(),Y=$,X=[],H=[];for(let K=0,G=Y.length;K<G;K++){let U=Y[K];if(U){X.push(U);let E=new SJ;if(W!==null)E.fromArray(W.array,K*16);H.push(E)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',Q.joints[K])}return new C6(X,H)})}loadAnimation(J){let Q=this.json,Z=this,$=Q.animations[J],W=$.name?$.name:"animation_"+J,Y=[],X=[],H=[],K=[],G=[];for(let U=0,E=$.channels.length;U<E;U++){let q=$.channels[U],N=$.samplers[q.sampler],k=q.target,V=k.node,R=$.parameters!==void 0?$.parameters[N.input]:N.input,O=$.parameters!==void 0?$.parameters[N.output]:N.output;if(k.node===void 0)continue;Y.push(this.getDependency("node",V)),X.push(this.getDependency("accessor",R)),H.push(this.getDependency("accessor",O)),K.push(N),G.push(k)}return Promise.all([Promise.all(Y),Promise.all(X),Promise.all(H),Promise.all(K),Promise.all(G)]).then(function(U){let E=U[0],q=U[1],N=U[2],k=U[3],V=U[4],R=[];for(let O=0,D=E.length;O<D;O++){let F=E[O],C=q[O],P=N[O],M=k[O],w=V[O];if(F===void 0)continue;if(F.updateMatrix)F.updateMatrix();let v=Z._createAnimationTracks(F,C,P,M,w);if(v)for(let L=0;L<v.length;L++)R.push(v[L])}return new q9(W,void 0,R)})}createNodeMesh(J){let Q=this.json,Z=this,$=Q.nodes[J];if($.mesh===void 0)return null;return Z.getDependency("mesh",$.mesh).then(function(W){let Y=Z._getNodeRef(Z.meshCache,$.mesh,W);if($.weights!==void 0)Y.traverse(function(X){if(!X.isMesh)return;for(let H=0,K=$.weights.length;H<K;H++)X.morphTargetInfluences[H]=$.weights[H]});return Y})}loadNode(J){let Q=this.json,Z=this,$=Q.nodes[J],W=Z._loadNodeShallow(J),Y=[],X=$.children||[];for(let K=0,G=X.length;K<G;K++)Y.push(Z.getDependency("node",X[K]));let H=$.skin===void 0?Promise.resolve(null):Z.getDependency("skin",$.skin);return Promise.all([W,Promise.all(Y),H]).then(function(K){let G=K[0],U=K[1],E=K[2];if(E!==null)G.traverse(function(q){if(!q.isSkinnedMesh)return;q.bind(E,mV)});for(let q=0,N=U.length;q<N;q++)G.add(U[q]);return G})}_loadNodeShallow(J){let Q=this.json,Z=this.extensions,$=this;if(this.nodeCache[J]!==void 0)return this.nodeCache[J];let W=Q.nodes[J],Y=W.name?$.createUniqueName(W.name):"",X=[],H=$._invokeOne(function(K){return K.createNodeMesh&&K.createNodeMesh(J)});if(H)X.push(H);if(W.camera!==void 0)X.push($.getDependency("camera",W.camera).then(function(K){return $._getNodeRef($.cameraCache,W.camera,K)}));return $._invokeAll(function(K){return K.createNodeAttachment&&K.createNodeAttachment(J)}).forEach(function(K){X.push(K)}),this.nodeCache[J]=Promise.all(X).then(function(K){let G;if(W.isBone===!0)G=new z6;else if(K.length>1)G=new $8;else if(K.length===1)G=K[0];else G=new $0;if(G!==K[0])for(let U=0,E=K.length;U<E;U++)G.add(K[U]);if(W.name)G.userData.name=W.name,G.name=Y;if(z9(G,W),W.extensions)S6(Z,G,W);if(W.matrix!==void 0){let U=new SJ;U.fromArray(W.matrix),G.applyMatrix4(U)}else{if(W.translation!==void 0)G.position.fromArray(W.translation);if(W.rotation!==void 0)G.quaternion.fromArray(W.rotation);if(W.scale!==void 0)G.scale.fromArray(W.scale)}if(!$.associations.has(G))$.associations.set(G,{});return $.associations.get(G).nodes=J,G}),this.nodeCache[J]}loadScene(J){let Q=this.extensions,Z=this.json.scenes[J],$=this,W=new $8;if(Z.name)W.name=$.createUniqueName(Z.name);if(z9(W,Z),Z.extensions)S6(Q,W,Z);let Y=Z.nodes||[],X=[];for(let H=0,K=Y.length;H<K;H++)X.push($.getDependency("node",Y[H]));return Promise.all(X).then(function(H){for(let G=0,U=H.length;G<U;G++)W.add(H[G]);let K=(G)=>{let U=/*@__PURE__*/new Map;for(let[E,q]of $.associations)if(E instanceof C0||E instanceof R0)U.set(E,q);return G.traverse((E)=>{let q=$.associations.get(E);if(q!=null)U.set(E,q)}),U};return $.associations=K(W),W})}_createAnimationTracks(J,Q,Z,$,W){let Y=[],X=J.name?J.name:J.uuid,H=[];if(p9[W.path]===p9.weights)J.traverse(function(E){if(E.morphTargetInfluences)H.push(E.name?E.name:E.uuid)});else H.push(X);let K;switch(p9[W.path]){case p9.weights:K=d8;break;case p9.rotation:K=o8;break;case p9.position:case p9.scale:K=c8;break;default:switch(Z.itemSize){case 1:K=d8;break;case 2:case 3:default:K=c8;break}break}let G=$.interpolation!==void 0?xV[$.interpolation]:_Q,U=this._getArrayFromAccessor(Z);for(let E=0,q=H.length;E<q;E++){let N=new K(H[E]+"."+p9[W.path],Q.array,U,G);if($.interpolation==="CUBICSPLINE")this._createCubicSplineTrackInterpolant(N);Y.push(N)}return Y}_getArrayFromAccessor(J){let Q=J.array;if(J.normalized){let Z=$K(Q.constructor),$=new Float32Array(Q.length);for(let W=0,Y=Q.length;W<Y;W++)$[W]=Q[W]*Z;Q=$}return Q}_createCubicSplineTrackInterpolant(J){J.createInterpolant=function(Z){return new(this instanceof o8?Fq:YK)(this.times,this.values,this.getValueSize()/3,Z)},J.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}}function lV(J,Q,Z){let $=Q.attributes,W=new z0;if($.POSITION!==void 0){let H=Z.json.accessors[$.POSITION],K=H.min,G=H.max;if(K!==void 0&&G!==void 0){if(W.set(new I(K[0],K[1],K[2]),new I(G[0],G[1],G[2])),H.normalized){let U=$K(v7[H.componentType]);W.min.multiplyScalar(U),W.max.multiplyScalar(U)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;let Y=Q.targets;if(Y!==void 0){let H=new I,K=new I;for(let G=0,U=Y.length;G<U;G++){let E=Y[G];if(E.POSITION!==void 0){let q=Z.json.accessors[E.POSITION],N=q.min,k=q.max;if(N!==void 0&&k!==void 0){if(K.setX(Math.max(Math.abs(N[0]),Math.abs(k[0]))),K.setY(Math.max(Math.abs(N[1]),Math.abs(k[1]))),K.setZ(Math.max(Math.abs(N[2]),Math.abs(k[2]))),q.normalized){let V=$K(v7[q.componentType]);K.multiplyScalar(V)}H.max(K)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}W.expandByVector(H)}J.boundingBox=W;let X=new A0;W.getCenter(X.center),X.radius=W.min.distanceTo(W.max)/2,J.boundingSphere=X}function iE(J,Q,Z){let $=Q.attributes,W=[];function Y(X,H){return Z.getDependency("accessor",X).then(function(K){J.setAttribute(H,K)})}for(let X in $){let H=ZK[X]||X.toLowerCase();if(H in J.attributes)continue;W.push(Y($[X],H))}if(Q.indices!==void 0&&!J.index){let X=Z.getDependency("accessor",Q.indices).then(function(H){J.setIndex(H)});W.push(X)}if(aJ.workingColorSpace!==x0&&"COLOR_0"in $)console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${aJ.workingColorSpace}" not supported.`);return z9(J,Q),lV(J,Q,Z),Promise.all(W).then(function(){return Q.targets!==void 0?hV(J,Q.targets,Z):J})}var uV=`
// 頂点シェーダーに入力される attribute 変数
//attribute vec4 position;       //!< 入力: 位置情報
//attribute vec2 uv;             //!< 入力: テクスチャー座標
//attribute vec3 normal;         //!< 入力: 法線ベクトル
// All provided by three.js ^^

// vertex color is not actually the color of the shape, as such
// it is a custom attribute _COLOR in the glTF

attribute vec4 _color;           //!< 入力: 頂点の色
attribute vec3 tangent;          //!< 入力: 異方位

// フラグメントシェーダーへの入力
varying   vec4 v_color;          //!< 出力: 頂点の色
varying   vec4 v_position;       //!< 出力: 位置情報
varying   vec3 v_normal;         //!< 出力: 法線ベクトル
varying   vec3 v_tangent;        //!< 出力: 異方位
varying   vec2 v_texCoord;       //!< 出力: テクスチャー座標

// ユニフォーム
//uniform mat3 normalMatrix;     //!< ユニフォーム: モデルの法線用行列
//uniform mat4 modelViewMatrix;  //!< ユニフォーム: プロジェクション行列
//uniform mat4 projectionMatrix; //!< ユニフォーム: モデル行列
// All provided by three.js ^^

// skinning_pars_vertex.glsl.js
#ifdef USE_SKINNING
    uniform mat4 bindMatrix;
    uniform mat4 bindMatrixInverse;
    uniform highp sampler2D boneTexture;
    mat4 getBoneMatrix( const in float i ) {
        int size = textureSize( boneTexture, 0 ).x;
        int j = int( i ) * 4;
        int x = j % size;
        int y = j / size;
        vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
        vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
        vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
        vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
        return mat4( v1, v2, v3, v4 );
    }
#endif

void main()
{

    // begin_vertex.glsl.js
    vec3 transformed = vec3( position );
// skinbase_vertex.glsl.js
#ifdef USE_SKINNING
    mat4 boneMatX = getBoneMatrix( skinIndex.x );
    mat4 boneMatY = getBoneMatrix( skinIndex.y );
    mat4 boneMatZ = getBoneMatrix( skinIndex.z );
    mat4 boneMatW = getBoneMatrix( skinIndex.w );
    // skinning_vertex.glsl.js
    vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
    vec4 skinned = vec4( 0.0 );
    skinned += boneMatX * skinVertex * skinWeight.x;
    skinned += boneMatY * skinVertex * skinWeight.y;
    skinned += boneMatZ * skinVertex * skinWeight.z;
    skinned += boneMatW * skinVertex * skinWeight.w;
    transformed = ( bindMatrixInverse * skinned ).xyz;
#endif

//#ifdef FFL_COORDINATE_MODE_NORMAL
    // 頂点座標を変換
    v_position = modelViewMatrix * vec4(transformed, 1.0);
    gl_Position =  projectionMatrix * v_position;

    vec3 objectNormal = normal;
    vec3 objectTangent = tangent.xyz;
// skinnormal_vertex.glsl.js
#ifdef USE_SKINNING
    mat4 skinMatrix = mat4( 0.0 );
    skinMatrix += skinWeight.x * boneMatX;
    skinMatrix += skinWeight.y * boneMatY;
    skinMatrix += skinWeight.z * boneMatZ;
    skinMatrix += skinWeight.w * boneMatW;
    skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;

    objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
    objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;

#endif

    // 法線も変換
    //v_normal = mat3(inverse(u_mv)) * a_normal;
    v_normal = normalize(normalMatrix * objectNormal);
//#elif defined(FFL_COORDINATE_MODE_NONE)
//    // 頂点座標を変換
//    gl_Position = vec4(a_position.x, a_position.y * -1.0, a_position.z, a_position.w);
//    v_position = a_position;
//
//    v_normal = a_normal;
//#endif

     // その他の情報も書き出す
    v_texCoord = uv;
    // safe normalize
    if (tangent != vec3(0.0, 0.0, 0.0))
    {
        v_tangent = normalize(normalMatrix * objectTangent);
    }
    else
    {
        v_tangent = vec3(0.0, 0.0, 0.0);
    }

    v_color = _color;
}
`,dV=`
//
//  sample.flg
//  Fragment shader
//  Copyright (c) 2014 Nintendo Co., Ltd. All rights reserved.
//
//

#ifdef GL_ES
precision mediump float;
#else
#   define lowp
#   define mediump
#   define highp
#endif


//
//  定数定義ファイル
//

/// シェーダーモード
#define FFL_SHADER_MODE_UR 0
#define FFL_SHADER_MODE_UB 1

/// 変調処理のマクロ
#define FFL_MODULATE_MODE_CONSTANT        0
#define FFL_MODULATE_MODE_TEXTURE_DIRECT  1
#define FFL_MODULATE_MODE_RGB_LAYERED     2
#define FFL_MODULATE_MODE_ALPHA           3
#define FFL_MODULATE_MODE_LUMINANCE_ALPHA 4
#define FFL_MODULATE_MODE_ALPHA_OPA       5

/// スペキュラのモード
#define FFL_SPECULAR_MODE_BLINN 0
#define FFL_SPECULAR_MODE_ANISO 1

/// ライトのON/OFF
#define FFL_LIGHT_MODE_DISABLE 0
#define FFL_LIGHT_MODE_ENABLE 1

/// フラグメントのディスカードモード
#define FFL_DISCARD_FRAGMENT_DISABLE 0
#define FFL_DISCARD_FRAGMENT_ENABLE  1

/// 座標変換モード
#define FFL_COORDINATE_MODE_NONE   0
#define FFL_COORDINATE_MODE_NORMAL 1

//
//  関数の定義ファイル
//

/**
 * @brief 異方性反射の反射率を計算します。
 * @param[in] light   ライトの向き
 * @param[in] tangent 接線
 * @param[in] eye     視線の向き
 * @param[in] power   鋭さ
 */
mediump float calculateAnisotropicSpecular(mediump vec3 light, mediump vec3 tangent, mediump vec3 eye, mediump float power )
{
	mediump float dotLT = dot(light, tangent);
	mediump float dotVT = dot(eye, tangent);
	mediump float dotLN = sqrt(1.0 - dotLT * dotLT);
	mediump float dotVR = dotLN*sqrt(1.0 - dotVT * dotVT) - dotLT * dotVT;

	return pow(max(0.0, dotVR), power);
}

/**
 * @brief 異方性反射の反射率を計算します。
 * @param[in] light   ライトの向き
 * @param[in] normal  法線
 * @param[in] eye     視線の向き
 * @param[in] power   鋭さ
 */
mediump float calculateBlinnSpecular(mediump vec3 light, mediump vec3 normal, mediump vec3 eye, mediump float power)
{
	return pow(max(dot(reflect(-light, normal), eye), 0.0), power);
}

/**
 * @brief 異方性反射、ブリン反射をブレンドします。
 * @param[in] blend ブレンド率
 * @param[in] blinn ブリンの値
 * @param[in] aniso 異方性の値
 */
mediump float calculateSpecularBlend(mediump float blend, mediump float blinn, mediump float aniso)
{
	return mix(aniso, blinn, blend);
}

/**
 * @brief アンビエントを計算します。
 * @param[in] light    ライト
 * @param[in] material マテリアル
 */
mediump vec3 calculateAmbientColor(mediump vec3 light, mediump vec3 material)
{
	return light * material;
}

/**
 * @brief 拡散を計算します。
 * @param[in] light    ライト
 * @param[in] material マテリアル
 * @param[in] ln       ライトと法線の内積
 */
mediump vec3 calculateDiffuseColor(mediump vec3 light, mediump vec3 material, mediump float ln)
{
	return light * material * ln;
}

/**
 * @brief 鏡面反射を計算します。
 * @param[in] light      ライト
 * @param[in] material   マテリアル
 * @param[in] reflection 反射率
 * @param[in] strength   幅
 */
mediump vec3 calculateSpecularColor(mediump vec3 light, mediump vec3 material, mediump float reflection, mediump float strength)
{
	return light * material * reflection * strength;
}

/**
 * @brief リムを計算します。
 * @param[in] color   リム色
 * @param[in] normalZ 法線のZ方向
 * @param[in] width   リム幅
 * @param[in] power   リムの鋭さ
 */
mediump vec3 calculateRimColor(mediump vec3 color, mediump float normalZ, mediump float width, mediump float power)
{
	return color * pow(width * (1.0 - abs(normalZ)), power);
}

/**
 * @brief ライト方向と法線の内積を求める
 * @note 特殊な実装になっています。
 */
mediump float calculateDot(mediump vec3 light, mediump vec3 normal)
{
	return max(dot(light, normal), 0.1);
}

// フラグメントシェーダーに入力される varying 変数
varying mediump vec4 v_color;          //!< 出力: 頂点の色
varying highp   vec4 v_position;       //!< 出力: 位置情報
varying highp   vec3 v_normal;         //!< 出力: 法線ベクトル
// NOTE: ^^ Those two need to be highp to avoid weird black dot issue on Android
varying mediump vec3 v_tangent;        //!< 出力: 異方位
varying mediump vec2 v_texCoord;       //!< 出力: テクスチャー座標

/// constカラー
uniform mediump vec4  u_const1; ///< constカラー1
uniform mediump vec4  u_const2; ///< constカラー2
uniform mediump vec4  u_const3; ///< constカラー3

/// ライト設定
uniform mediump vec3 u_light_ambient;  ///< カメラ空間のライト方向
uniform mediump vec3 u_light_diffuse;  ///< 拡散光用ライト
uniform mediump vec3 u_light_dir;
uniform bool u_light_enable;
uniform mediump vec3 u_light_specular; ///< 鏡面反射用ライト強度

/// マテリアル設定
uniform mediump vec3 u_material_ambient;         ///< 環境光用マテリアル設定
uniform mediump vec3 u_material_diffuse;         ///< 拡散光用マテリアル設定
uniform mediump vec3 u_material_specular;        ///< 鏡面反射用マテリアル設定
uniform int u_material_specular_mode;            ///< スペキュラの反射モード(CharModelに依存する設定のためub_modulateにしている)
uniform mediump float u_material_specular_power; ///< スペキュラの鋭さ(0.0を指定すると頂点カラーの設定が利用される)

/// 変調設定
uniform int u_mode;   ///< 描画モード

/// リム設定
uniform mediump vec3  u_rim_color;
uniform mediump float u_rim_power;

// サンプラー
uniform sampler2D s_texture;


// -------------------------------------------------------
// メイン文
void main()
{
    mediump vec4 color;

    mediump float specularPower    = u_material_specular_power;
    mediump float rimWidth         = v_color.a;

//#ifdef FFL_MODULATE_MODE_CONSTANT
    if(u_mode == FFL_MODULATE_MODE_CONSTANT)
    {
        color = u_const1;
    }
//#elif defined(FFL_MODULATE_MODE_TEXTURE_DIRECT)
    else if(u_mode == FFL_MODULATE_MODE_TEXTURE_DIRECT)
    {
        color = texture2D(s_texture, v_texCoord);
    }
//#elif defined(FFL_MODULATE_MODE_RGB_LAYERED)
    else if(u_mode == FFL_MODULATE_MODE_RGB_LAYERED)
    {
        color = texture2D(s_texture, v_texCoord);
        color = vec4(color.r * u_const1.rgb + color.g * u_const2.rgb + color.b * u_const3.rgb, color.a);
    }
//#elif defined(FFL_MODULATE_MODE_ALPHA)
    else if(u_mode == FFL_MODULATE_MODE_ALPHA)
    {
        color = texture2D(s_texture, v_texCoord);
        color = vec4(u_const1.rgb, color.r);
    }
//#elif defined(FFL_MODULATE_MODE_LUMINANCE_ALPHA)
    else if(u_mode == FFL_MODULATE_MODE_LUMINANCE_ALPHA)
    {
        color = texture2D(s_texture, v_texCoord);
        color = vec4(color.g * u_const1.rgb, color.r);
    }
//#elif defined(FFL_MODULATE_MODE_ALPHA_OPA)
    else if(u_mode == FFL_MODULATE_MODE_ALPHA_OPA)
    {
        color = texture2D(s_texture, v_texCoord);
        color = vec4(color.r * u_const1.rgb, 1.0);
    }
//#endif

    // avoids little outline around mask elements
    if(u_mode != FFL_MODULATE_MODE_CONSTANT && color.a == 0.0)
    {
        discard;
    }

//#ifdef FFL_LIGHT_MODE_ENABLE
    if(u_light_enable)
    {
        /// 環境光の計算
        mediump vec3 ambient = calculateAmbientColor(u_light_ambient.xyz, u_material_ambient.xyz);

        /// 法線ベクトルの正規化
        mediump vec3 norm = normalize(v_normal);

        /// 視線ベクトル
        mediump vec3 eye = normalize(-v_position.xyz);
        
        // ライトの向き
        mediump float fDot = calculateDot(u_light_dir, norm);

        /// Diffuse計算
        mediump vec3 diffuse = calculateDiffuseColor(u_light_diffuse.xyz, u_material_diffuse.xyz, fDot);
        
        /// Specular計算
        mediump float specularBlinn = calculateBlinnSpecular(u_light_dir, norm, eye, u_material_specular_power);
        
        /// Specularの値を確保する変数を宣言
        mediump float reflection;
        mediump float strength = v_color.g;
        if(u_material_specular_mode == 0)
        {
            /// Blinnモデルの場合
            strength = 1.0;
            reflection = specularBlinn;
        }
        else
        {
            /// Aisoモデルの場合
            mediump float specularAniso = calculateAnisotropicSpecular(u_light_dir, v_tangent, eye, u_material_specular_power);
            reflection = calculateSpecularBlend(v_color.r, specularBlinn, specularAniso);
        }
        /// Specularの色を取得
        mediump vec3 specular = calculateSpecularColor(u_light_specular.xyz, u_material_specular.xyz, reflection, strength);

        // リムの色を計算
        mediump vec3 rimColor = calculateRimColor(u_rim_color.rgb, norm.z, rimWidth, u_rim_power);

        // カラーの計算
        color.rgb = (ambient + diffuse) * color.rgb + specular + rimColor;
    }
//#endif

    gl_FragColor = color;
}
`;class P8 extends l0{static defaultLightAmbient=new u(0.73,0.73,0.73);static defaultLightDiffuse=new u(0.6,0.6,0.6);static defaultLightSpecular=new u(0.7,0.7,0.7);static defaultLightDir=new I(-0.4531539381,0.4226179123,0.7848858833);static defaultRimColor=new u(0.3,0.3,0.3);static defaultRimPower=2;static defaultLightDirection=this.defaultLightDir;static materialParams=[{ambient:new u(0.85,0.75,0.75),diffuse:new u(0.75,0.75,0.75),specular:new u(0.3,0.3,0.3),specularPower:1.2,specularMode:0},{ambient:new u(1,1,1),diffuse:new u(0.7,0.7,0.7),specular:new u(0,0,0),specularPower:40,specularMode:1},{ambient:new u(0.9,0.85,0.85),diffuse:new u(0.75,0.75,0.75),specular:new u(0.22,0.22,0.22),specularPower:1.5,specularMode:0},{ambient:new u(0.85,0.75,0.75),diffuse:new u(0.75,0.75,0.75),specular:new u(0.3,0.3,0.3),specularPower:1.2,specularMode:0},{ambient:new u(1,1,1),diffuse:new u(0.7,0.7,0.7),specular:new u(0.35,0.35,0.35),specularPower:10,specularMode:1},{ambient:new u(0.75,0.75,0.75),diffuse:new u(0.72,0.72,0.72),specular:new u(0.3,0.3,0.3),specularPower:1.5,specularMode:0},{ambient:new u(1,1,1),diffuse:new u(0.7,0.7,0.7),specular:new u(0,0,0),specularPower:40,specularMode:1},{ambient:new u(1,1,1),diffuse:new u(0.7,0.7,0.7),specular:new u(0,0,0),specularPower:40,specularMode:1},{ambient:new u(1,1,1),diffuse:new u(0.7,0.7,0.7),specular:new u(0,0,0),specularPower:40,specularMode:1},{ambient:new u(0.95622,0.95622,0.95622),diffuse:new u(0.49673,0.49673,0.49673),specular:new u(0.24099,0.24099,0.24099),specularPower:3,specularMode:0},{ambient:new u(0.95622,0.95622,0.95622),diffuse:new u(1.08497,1.08497,1.08497),specular:new u(0.2409,0.2409,0.2409),specularPower:3,specularMode:0}];static getBlendOptionsFromModulateType(J){if(J>=0&&J<=5)return{blending:R8,blendSrcAlpha:V8,blendDstAlpha:k8};else if(J>=6&&J<=8)return{blending:R8,blendSrc:V8,blendDst:O9,blendDstAlpha:k8};else if(J>=9&&J<=13)return{blending:R8,blendSrc:K6,blendSrcAlpha:V8,blendDst:H6};else if(J>=14&&J<=17)return{blending:R8,blendSrc:V8,blendDst:O9,blendSrcAlpha:k8,blendDstAlpha:k8};else return console.error("Unknown modulate type:",J),{}}modulateMode;modulateType;modulateColor;lightEnable;constructor(J={}){let Q=J.modulateMode??0,Z=J.modulateType??0,$=J.lightEnable??!0,W=J.lightDirection??P8.defaultLightDir.clone(),Y=J.map||null,X=J.customMaterial||null,H={};if(Array.isArray(J.modulateColor)&&J.modulateColor.length===3)H={u_const1:{value:J.modulateColor[0]},u_const2:{value:J.modulateColor[1]},u_const3:{value:J.modulateColor[2]}};else H={u_const1:{value:J.modulateColor||new XJ(1,1,1,1)}};let K=P8.materialParams[Z]||P8.materialParams[0];if(X)K=X;let G=Object.assign({},H,{u_light_ambient:{value:J.lightAmbient||P8.defaultLightAmbient},u_light_diffuse:{value:J.lightDiffuse||P8.defaultLightDiffuse},u_light_specular:{value:J.lightSpecular||P8.defaultLightSpecular},u_light_dir:{value:W},u_light_enable:{value:$},u_material_ambient:{value:K.ambient},u_material_diffuse:{value:K.diffuse},u_material_specular:{value:K.specular},u_material_specular_mode:{value:K.specularMode},u_material_specular_power:{value:K.specularPower},u_mode:{value:Q},u_rim_color:{value:P8.defaultRimColor},u_rim_power:{value:P8.defaultRimPower},s_texture:{value:Y}});super({vertexShader:J.vertexShader||uV,fragmentShader:J.fragmentShader||dV,uniforms:G,side:J.side||t0,...Q!==0?P8.getBlendOptionsFromModulateType(Z):{}});this.modulateMode=Q,this.modulateType=Z,this.modulateColor=J.modulateColor,this.lightEnable=$}get map(){return this.uniforms.s_texture.value}set map(J){this.uniforms.s_texture.value=J}get lightDirection(){return this.uniforms.u_light_dir.value}set lightDirection(J){this.uniforms.u_light_dir.value=J}}var cV=`
#define AGX_FEATURE_ALBEDO_TEXTURE
/**
 * @file    LUT.vsh
 * @brief   LUT
 * @since   2014/10/02
 *
 * Copyright (c)2014 Nintendo Co., Ltd. All rights reserved.
 */

// シェーダーの種類毎に設定されるマクロリスト
// AGX_FEATURE_VERTEX_COLOR         頂点カラーが有効
// AGX_FEATURE_ALBEDO_TEXTURE       アルベドテクスチャーが有効
// AGX_FEATURE_BUMP_TEXTURE         バンプテクスチャーが有効
// AGX_FEATURE_MASK_TEXTURE         マスクテクスチャーが有効
// AGX_FEATURE_ALPHA_TEXTURE        アルファテクスチャーが有効
// AGX_FEATURE_SPHERE_MAP_TEXTURE   スフィア環境マップが有効
// AGX_FEATURE_SKIN_MASK            肌マスクが有効（u_const1）
// AGX_FEATURE_HAIR_MASK            髪マスクが有効（u_const2）
// AGX_FEATURE_ALPHA_TEST           アルファテストが有効
// AGX_FEATURE_FADE_OUT_COLOR       フェードアウトカラーが有効（u_const3）
// AGX_FEATURE_DISABLE_LIGHT        ライトが無効
// AGX_FEATURE_ALPHA_COLOR_FILTER   アルベドアルファによる色替えが有効
// AGX_FEATURE_ALBEDO_ALPHA         アルベドのアルファをカラーのアルファに適用
// AGX_FEATURE_PREMULTIPLY_ALPHA    プレマルチプライアルファな描画
// AGX_FEATURE_MII                  Miiを描画する
// AGX_FEATURE_MII_CONSTANT         Miiを描画する：Constant
// AGX_FEATURE_MII_TEXTURE_DIRECT   Miiを描画する：Texture Direct
// AGX_FEATURE_MII_RGB_LAYERED      Miiを描画する：RGB Layered
// AGX_FEATURE_MII_ALPHA            Miiを描画する：Alpha
// AGX_FEATURE_MII_LUMINANCE_ALPHA  Miiを描画する：Luminance Alpha
// AGX_FEATURE_MII_ALPHA_OPA        Miiを描画する：Alpha Opa
//
// AGX_BONE_MAX     ボーンの最大数

#ifdef GL_ES
precision highp float;
#else
#   define lowp
#   define mediump
#   define highp
#endif

//#ifndef AGX_BONE_MAX
//#   define AGX_BONE_MAX 15
//#endif
#ifndef AGX_DIR_LIGHT_MAX
#   define AGX_DIR_LIGHT_MAX 2
#endif

// ----------------------------------------
// 頂点シェーダーに入力される attribute 変数
//attribute highp   vec3 position;   //!< 入力:[ 1 : 1 ] 位置情報
#if defined(AGX_FEATURE_ALBEDO_TEXTURE) || defined(AGX_FEATURE_BUMP_TEXTURE) || defined(AGX_FEATURE_MASK_TEXTURE) || defined(AGX_FEATURE_ALPHA_TEXTURE)
//attribute mediump vec2 uv;  //!< 入力:[ 1 : 5 ] テクスチャー座標
#endif
//attribute mediump vec3 normal;     //!< 入力:[ 1 : 2 ] 法線ベクトル
//attribute mediump vec4 aBoneIndex;  //!< 入力:[ 1 : 3 ] ボーンのインデックス（最大4つ）
//attribute mediump vec4 aBoneWeight; //!< 入力:[ 1 : 4 ] ボーンの影響度（最大4つ）
#if defined(AGX_FEATURE_VERTEX_COLOR)
//attribute lowp    vec4 _color;      //!< 入力:[ 1 : 6 ] 頂点カラー
#endif
#if defined(AGX_FEATURE_BUMP_TEXTURE)
//attribute mediump vec3 tangent;    //!< 入力:[ 1 : 7 ] 接線ベクトル
#endif

// ^^ Commented attributes are provided by three.js.

// ----------------------------------------
// 頂点シェーダーに入力される uniform 変数
//uniform highp   mat4 modelViewMatrix;                            //!< 入力:[ 4      /  4 :   4 ] モデルの合成行列
//uniform mat4 projectionMatrix;
//uniform highp   mat4 viewMatrix;                           //!< 入力:[ 4      /  4 :   8 ] モデルのビュー行列
//uniform mediump mat3 normalMatrix;                         //!< 入力:[ 3      /  3 :  11 ] モデルの法線用行列
//uniform highp   mat4 modelMatrix;                          //!< 入力:[ 4      /  4 :  15 ] モデルのワールド変換行列
//uniform lowp    int  uBoneCount;                            //!< 入力:[ 1      /  1 :  16 ] ボーンの個数
//uniform highp   mat4 uBoneMatrices[AGX_BONE_MAX];           //!< 入力:[ 4 x 15 / 60 :  76 ] ボーンの行列配列
//uniform mediump mat3 uBoneNormalMatrices[AGX_BONE_MAX];     //!< 入力:[ 3 x 15 / 45 : 121 ] ボーンの法線行列配列
// ^^ Unused in favor of three.js skinning.
uniform lowp    int  uDirLightCount;                        //!< 入力:[ 1      /  1 : 122 ] 方向ライトの数
uniform mediump vec4 uDirLightDirAndType0;//!< 入力:[ 1 x  2 /  2 : 124 ] 平行ライトの向く方向
uniform mediump vec4 uDirLightDirAndType1;//!< 入力:[ 1 x  2 /  2 : 124 ] 平行ライトの向く方向
uniform mediump vec3 uDirLightColor0;     //!< 入力:[ 1 x  2 /  2 : 126 ] 平行ライトのカラー
uniform mediump vec3 uDirLightColor1;     //!< 入力:[ 1 x  2 /  2 : 126 ] 平行ライトのカラー
uniform mediump vec3 uHSLightSkyColor;                      //!< 入力:[ 1      /  1 : 127 ] 半球ライトのスカイカラー
uniform mediump vec3 uHSLightGroundColor;                   //!< 入力:[ 1      /  1 : 128 ] 半球ライトのグラウンドカラー
//uniform mediump vec3 cameraPosition;                                //!< 入力:[ 1      /  1 : 129 ] カメラの位置
// ^^ previously uEyePt
uniform mediump float uAlpha;                               //!< 入力:[ 1      /  1 : 130 ] アルファ値

// ^^ Commented uniforms are provided by three.js.

// ----------------------------------------
// フラグメントシェーダーに渡される varying 変数
varying lowp    vec4    vModelColor;                            //!< 出力:[ 1 : 1 ] モデルの色
#if !defined(AGX_FEATURE_BUMP_TEXTURE)
varying mediump vec3    vNormal;                                //!< 出力:[ 1 : 2 ] モデルの法線
#endif
#if defined(AGX_FEATURE_ALBEDO_TEXTURE) || defined(AGX_FEATURE_BUMP_TEXTURE) || defined(AGX_FEATURE_MASK_TEXTURE) || defined(AGX_FEATURE_ALPHA_TEXTURE)
varying mediump vec2    vTexcoord0;                             //!< 出力:[ 1 : 3 ] テクスチャーUV
#endif
// camera
varying mediump vec3    vEyeVecWorldOrTangent;                  //!< 出力:[ 1 : 4 ] 視線ベクトル
#if !defined(AGX_FEATURE_DISABLE_LIGHT)
// punctual light
varying mediump vec3    vPunctualLightDirWorldOrTangent;        //!< 出力:[ 1 : 5 ] ライトの方向
varying mediump vec3    vPunctualLightHalfVecWorldOrTangent;    //!< 出力:[ 1 : 6 ] カメラとライトのハーフベクトル
// GI
varying mediump vec3    vGISpecularLightColor;                  //!< 出力:[ 1 : 7 ] GIフレネルで使用するカラー
// Lighting Result
varying mediump vec3    vDiffuseColor;                          //!< 出力:[ 1 : 8 ] ディフューズライティング結果
#endif
// Reflect
#if defined(AGX_FEATURE_SPHERE_MAP_TEXTURE)
varying lowp    vec3    vReflectDir;                            //!< 出力:[ 1 : 9 ] 環境マップの反射ベクトル
#endif

// skinning_pars_vertex.glsl.js
#ifdef USE_SKINNING
    uniform mat4 bindMatrix;
    uniform mat4 bindMatrixInverse;
    uniform highp sampler2D boneTexture;
    mat4 getBoneMatrix( const in float i ) {
        int size = textureSize( boneTexture, 0 ).x;
        int j = int( i ) * 4;
        int x = j % size;
        int y = j / size;
        vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
        vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
        vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
        vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
        return mat4( v1, v2, v3, v4 );
    }
#endif

// ------------------------------------------------------------
// 頂点シェーダーのエントリーポイント
// ------------------------------------------------------------
void main()
{
    // ------------------------------------------------------------
    // 頂点変換用の処理
    // ------------------------------------------------------------
    highp   vec4 position_;  //!< 最終的な頂点
    mediump vec3 normal_;    //!< 最終的な法線
    mediump vec3 tangent_;   //!< 最終的な接線
    highp   vec4 positionWorld; //!< ワールド空間上での頂点


    // begin_vertex.glsl.js
    vec3 transformed = vec3( position );
// skinbase_vertex.glsl.js
#ifdef USE_SKINNING
    mat4 boneMatX = getBoneMatrix( skinIndex.x );
    mat4 boneMatY = getBoneMatrix( skinIndex.y );
    mat4 boneMatZ = getBoneMatrix( skinIndex.z );
    mat4 boneMatW = getBoneMatrix( skinIndex.w );
    // skinning_vertex.glsl.js
    vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
    vec4 skinned = vec4( 0.0 );
    skinned += boneMatX * skinVertex * skinWeight.x;
    skinned += boneMatY * skinVertex * skinWeight.y;
    skinned += boneMatZ * skinVertex * skinWeight.z;
    skinned += boneMatW * skinVertex * skinWeight.w;
    transformed = ( bindMatrixInverse * skinned ).xyz;
#endif

    // ----------------------------------------
    // ボーンが存在しない場合は位置と法線に手を加えない
    position_ = vec4(transformed.xyz, 1.0);



    normal_ = normal;
#if defined(AGX_FEATURE_BUMP_TEXTURE)
    tangent_ = tangent.xyz;
#endif
    // skinnormal_vertex.glsl.js
#ifdef USE_SKINNING
    mat4 skinMatrix = mat4( 0.0 );
    skinMatrix += skinWeight.x * boneMatX;
    skinMatrix += skinWeight.y * boneMatY;
    skinMatrix += skinWeight.z * boneMatZ;
    skinMatrix += skinWeight.w * boneMatW;
    skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;

    normal_ = vec4( skinMatrix * vec4( normal_, 0.0 ) ).xyz;
#if defined(AGX_FEATURE_BUMP_TEXTURE)
    tangent_ = vec4( skinMatrix * vec4( tangent_, 0.0 ) ).xyz;
#endif // defined(AGX_FEATURE_BUMP_TEXTURE)
#endif // USE_SKINNING

    // ----------------------------------------
    // ワールド上での位置を求める
    positionWorld = modelMatrix * position_;
    // 最終結果を行う
    position_ = projectionMatrix * modelViewMatrix * position_;
    normal_   = normalize(normalMatrix * normal_);
#if defined(AGX_FEATURE_BUMP_TEXTURE)
    tangent  = normalize(normalMatrix * tangent_);
#endif

    // ----------------------------------------
    // 計算結果を保持させる
    gl_Position = position_;
#if !defined(AGX_FEATURE_BUMP_TEXTURE)
    vNormal     = normal_;
#endif
#if defined(AGX_FEATURE_ALBEDO_TEXTURE) || defined(AGX_FEATURE_BUMP_TEXTURE) || defined(AGX_FEATURE_MASK_TEXTURE) || defined(AGX_FEATURE_ALPHA_TEXTURE)
    // テクスチャー座標を設定する
    vTexcoord0 = uv;
#endif
    // モデルの色を指定する
#if defined(AGX_FEATURE_VERTEX_COLOR)
    lowp vec4 modelColor = aColor;

#else
    lowp vec4 modelColor = vec4(1.0, 1.0, 1.0, 1.0);
#endif

    // プリマルチプライドアルファ
#if defined(AGX_FEATURE_PREMULTIPLY_ALPHA)
    modelColor *= uAlpha;
#else
    modelColor.a *= uAlpha;
#endif


    // ------------------------------------------------------------
    // ライト用の処理
    // ------------------------------------------------------------
    mediump vec3 eyeVecWorld;   //!< ワールド状態での視線ベクトル
    mediump vec3 eyeVec;        //!< 最終的にフラグメントシェーダーに渡す視線ベクトル（バンプの有無によって、ワールド座標系になったり、タンジェント座標系になったりする）

    vec4 eye = modelViewMatrix * position_;

    // 視線ベクトルを取得する
    //eyeVecWorld = normalize(cameraPosition - positionWorld.xyz);
    eyeVecWorld = normalize(-(eye.xyz) - positionWorld.xyz);//normalize(cameraPosition - positionWorld.xyz);
    eyeVec = eyeVecWorld;

    lowp vec3 diffuseColor = vec3(0.0); // バーテックスシェーダーで計算できるディフューズの色をここに格納する

#   if defined(AGX_FEATURE_BUMP_TEXTURE)
    // Normal, Binormal, Tangent を取得する
    mediump vec3 n = normal;
    mediump vec3 t = tangent;
    mediump vec3 b = cross(n, t);
    // 接空間からローカルへ変換する行列を設定する（mat3(N, T, B)の逆行列）
    mediump mat3 tangentMatrix = mat3(t.x, b.x, n.x, t.y, b.y, n.y, t.z, b.z, n.z);
    // 視線ベクトルを接空間へ
    vEyeVecWorldOrTangent.xyz = tangentMatrix * eyeVec;
#else
    vEyeVecWorldOrTangent.xyz = eyeVec;
#endif

#if !defined(AGX_FEATURE_DISABLE_LIGHT)
    // punctual lightの設定
    if (uDirLightCount > 0)
    {
        mediump vec3 lightDir;

        // 方向ライト
        if (uDirLightDirAndType0.w < 0.0) { lightDir = uDirLightDirAndType0.xyz; }
        // 点光源ライト
        else                                { lightDir = uDirLightDirAndType0.xyz - positionWorld.xyz; }
        lightDir = normalize(lightDir);

#   if defined(AGX_FEATURE_BUMP_TEXTURE)
        // ライトを接空間へ
        vPunctualLightDirWorldOrTangent.xyz = tangentMatrix * lightDir;
#   else
        vPunctualLightDirWorldOrTangent.xyz = lightDir;
#   endif

        // Halfベクトルを求める
        vPunctualLightHalfVecWorldOrTangent.xyz = normalize(vPunctualLightDirWorldOrTangent.xyz + vEyeVecWorldOrTangent.xyz);

        // Diffuse計算
        diffuseColor += (uDirLightColor0.rgb * clamp(dot(lightDir, normal), 0.0, 1.0));
    }
    if (uDirLightCount > 1)
    {
        mediump vec3 lightDir;

        // 方向ライト
        if (uDirLightDirAndType1.w < 0.0) { lightDir = uDirLightDirAndType1.xyz; }
        // 点光源ライト
        else                                { lightDir = uDirLightDirAndType1.xyz - positionWorld.xyz; }
        lightDir = normalize(lightDir);

        diffuseColor += max(dot(lightDir, normal), 0.0) * uDirLightColor1;
    }
    // ライトは1.0を超えないように
    diffuseColor = min(diffuseColor, 1.0);
#endif

#if defined(AGX_FEATURE_SPHERE_MAP_TEXTURE)
    {
        // キューブ環境マップ用の反射ベクトルを求める
//        vReflectDir = reflect(normalize(positionWorld.xyz - cameraPosition), normal);

        // スフィア環境マップ用の反射ベクトルを求める
//        vReflectDir = normalize((uViewMatrix * vec4(normal, 0.0)).xyz) * 0.5 + 0.5;

        // ビュー座標系での位置と法線を取得
        mediump vec3 viewNormal   = normalize(mat3(uViewMatrix) * normal);
        mediump vec4 viewPosition = uViewMatrix * positionWorld;
        viewPosition = viewPosition / viewPosition.w;
        // ビュー座標系での頂点ベクトルを取得
        viewPosition.z = 1.0 - viewPosition.z;
        mediump vec3 viewPositionVec = normalize(viewPosition.xyz);
        // ビュー座標系での反射ベクトルを求める
        mediump vec3 viewReflect  = viewPositionVec - 2.0 * dot(viewPositionVec, viewNormal) * viewNormal;
        // 両面スフィア環境マップではないので、反射ベクトルを調整
        viewReflect = normalize(viewReflect - vec3(0.0, 0.0, 1.5));
        // 反射ベクトルをテクスチャー座標系へ
        vReflectDir = viewReflect * 0.5 + 0.5;

        // 公式
//        mediump vec3  viewPositionVec = normalize(vec3(uViewMatrix * positionWorld));
//        mediump vec3  viewReflectVec = viewPositionVec - 2.0 * dot(viewPositionVec, normal) * normal;
//        mediump float m = 2.0 * sqrt(viewReflectVec.x * viewReflectVec.x +
//                                     viewReflectVec.y * viewReflectVec.y +
//                                     (viewReflectVec.z + 1.0) * (viewReflectVec.z * 1.0));
//        vReflectDir = viewReflectVec / m + 0.5;

        // 別版
//        mediump vec3 posW = positionWorld.xyz;
//        mediump vec3 dir  = normalize(mat3(uViewMatrix) * normal);
//
//        mediump float radius     = 75.0;
//        mediump vec3  posWDir    = dot(dir, posW) * dir;
//        mediump vec3  posWDirV   = posW - posWDir;
//        mediump float lengthDir  = sqrt(radius * radius - dot(posWDirV, posWDirV)) - length(posWDir);
//        vReflectDir = normalize(posW + dir * lengthDir) * 0.5 + 0.5;
    }
#endif

#if !defined(AGX_FEATURE_DISABLE_LIGHT)
    // GIの計算
    {
        mediump vec3 hemiColor;
        mediump vec3 sky = uHSLightSkyColor;
        mediump vec3 ground = uHSLightGroundColor;

        {
            mediump float skyRatio = (normal.y + 1.0) * 0.5;
            hemiColor =  (sky * skyRatio + ground * (1.0 - skyRatio));
            diffuseColor += hemiColor;
        }

        {
//            mediump vec3 reflectDir = -reflect(normal, eyeVecWorld); // おそらくコレで良いはず
            mediump vec3 reflectDir = 2.0 * dot(eyeVecWorld, normal) * normal - eyeVecWorld; // 多少冗長でも、正しい計算で行なう

            mediump float skyRatio = (reflectDir.y + 1.0) * 0.5;
            hemiColor =  (sky * skyRatio + ground * (1.0 - skyRatio));
            vGISpecularLightColor.rgb = hemiColor;
        }
    }
#endif

    // モデルの色を設定
    vModelColor = modelColor;
#if !defined(AGX_FEATURE_DISABLE_LIGHT)
    vDiffuseColor.rgb = diffuseColor;
#endif
}
`,nV=`
#define AGX_FEATURE_ALBEDO_TEXTURE
#define AGX_FEATURE_MII
/**
 * @file    LUT.fsh
 * @brief   LUT
 * @since   2014/10/02
 *
 * Copyright (c)2014 Nintendo Co., Ltd. All rights reserved.
 */

// シェーダーの種類毎に設定されるマクロリスト
// AGX_FEATURE_VERTEX_COLOR         頂点カラーが有効
// AGX_FEATURE_ALBEDO_TEXTURE       アルベドテクスチャーが有効
// AGX_FEATURE_BUMP_TEXTURE         バンプテクスチャーが有効
// AGX_FEATURE_MASK_TEXTURE         マスクテクスチャーが有効
// AGX_FEATURE_ALPHA_TEXTURE        アルファテクスチャーが有効
// AGX_FEATURE_SPHERE_MAP_TEXTURE   スフィア環境マップが有効
// AGX_FEATURE_SKIN_MASK            肌マスクが有効（u_const1）
// AGX_FEATURE_HAIR_MASK            髪マスクが有効（u_const2）
// AGX_FEATURE_ALPHA_TEST           アルファテストが有効
// AGX_FEATURE_FADE_OUT_COLOR       フェードアウトカラーが有効（u_const3）
// AGX_FEATURE_DISABLE_LIGHT        ライトが無効
// AGX_FEATURE_ALPHA_COLOR_FILTER   アルベドアルファによる色替えが有効
// AGX_FEATURE_ALBEDO_ALPHA         アルベドのアルファをカラーのアルファに適用
// AGX_FEATURE_PREMULTIPLY_ALPHA    プレマルチプライアルファな描画
// AGX_FEATURE_MII                  Miiを描画する
// AGX_FEATURE_MII_CONSTANT         Miiを描画する：Constant
// AGX_FEATURE_MII_TEXTURE_DIRECT   Miiを描画する：Texture Direct
// AGX_FEATURE_MII_RGB_LAYERED      Miiを描画する：RGB Layered
// AGX_FEATURE_MII_ALPHA            Miiを描画する：Alpha
// AGX_FEATURE_MII_LUMINANCE_ALPHA  Miiを描画する：Luminance Alpha
// AGX_FEATURE_MII_ALPHA_OPA        Miiを描画する：Alpha Opa

#ifdef GL_ES
precision mediump float;
#else
#   define lowp
#   define mediump
#   define highp
#endif

/// 変調処理のマクロ
#define FFL_MODULATE_MODE_CONSTANT        0
#define FFL_MODULATE_MODE_TEXTURE_DIRECT  1
#define FFL_MODULATE_MODE_RGB_LAYERED     2
#define FFL_MODULATE_MODE_ALPHA           3
#define FFL_MODULATE_MODE_LUMINANCE_ALPHA 4
#define FFL_MODULATE_MODE_ALPHA_OPA       5

// ----------------------------------------
// フラグメントシェーダーに入力される uniform 変数
uniform int   uMode;   ///< 描画モード
uniform bool uAlphaTest;
uniform bool uLightEnable;
uniform mediump vec4    u_const1;            //!< 入力:[ 1 : 1 ] カラー0 (OR 肌カラー)
uniform mediump vec4    u_const2;            //!< 入力:[ 1 : 2 ] カラー1 (OR 髪カラー)
uniform mediump vec4    u_const3;            //!< 入力:[ 1 : 3 ] カラー2 (OR フェードアウトカラー)
//#if !defined(AGX_FEATURE_DISABLE_LIGHT)
uniform mediump vec3    uLightColor;        //!< 入力:[ 1 : 4 ] ライトの色
//#endif

#if defined(AGX_FEATURE_ALBEDO_TEXTURE)
uniform sampler2D       uAlbedoTexture;     //!< 入力: テクスチャー
#endif
#if defined(AGX_FEATURE_BUMP_TEXTURE)
uniform sampler2D       uNormalTexture;     //!< 入力: ノーマルマップ
#endif
#if defined(AGX_FEATURE_MASK_TEXTURE)
uniform sampler2D       uMaskTexture;       //!< 入力：マスクテクスチャー
#endif
#if defined(AGX_FEATURE_ALPHA_TEXTURE)
uniform sampler2D       uAlphaTexture;      //!< 入力：アルファテクスチャー
#endif
uniform sampler2D       uLUTSpecTexture;    //!< 入力: スペキュラーLUT
uniform sampler2D       uLUTFresTexture;    //!< 入力: フレネルLUT
#if defined(AGX_FEATURE_SPHERE_MAP_TEXTURE)
uniform sampler2D       uSphereMapTexture;  //!< 入力: スフィア環境マップ
#endif

// ----------------------------------------
// フラグメントシェーダーに渡される varying 変数
varying lowp    vec4    vModelColor;                            //!< 出力:[ 1 : 1 ] モデルの色
#if !defined(AGX_FEATURE_BUMP_TEXTURE)
varying mediump vec3    vNormal;                                //!< 出力:[ 1 : 2 ] モデルの法線
#endif
#if defined(AGX_FEATURE_ALBEDO_TEXTURE) || defined(AGX_FEATURE_BUMP_TEXTURE) || defined(AGX_FEATURE_MASK_TEXTURE) || defined(AGX_FEATURE_ALPHA_TEXTURE)
varying mediump vec2    vTexcoord0;                             //!< 出力:[ 1 : 3 ] テクスチャーUV
#endif
// camera
varying mediump vec3    vEyeVecWorldOrTangent;                  //!< 出力:[ 1 : 4 ] 視線ベクトル
//#if !defined(AGX_FEATURE_DISABLE_LIGHT)
// punctual light
varying mediump vec3    vPunctualLightDirWorldOrTangent;        //!< 出力:[ 1 : 5 ] ライトの方向
varying mediump vec3    vPunctualLightHalfVecWorldOrTangent;    //!< 出力:[ 1 : 6 ] カメラとライトのハーフベクトル
// GI
varying mediump vec3    vGISpecularLightColor;                  //!< 出力:[ 1 : 7 ] GIフレネルで使用するカラー
// Lighting Result
varying mediump vec3    vDiffuseColor;                          //!< 出力:[ 1 : 8 ] ディフューズライティング結果
//#endif
// Reflect
#if defined(AGX_FEATURE_SPHERE_MAP_TEXTURE)
varying lowp    vec3    vReflectDir;                            //!< 出力:[ 1 : 9 ] 環境マップの反射ベクトル
#endif

// ------------------------------------------------------------
// フラグメントシェーダーのエントリーポイント
// ------------------------------------------------------------
void main()
{

    // ディフューズカラーを取得
    lowp vec4 albedoColor = vec4(1.0, 1.0, 1.0, 1.0);

    // ============================================================
    //  Mii
    // ============================================================
#if defined(AGX_FEATURE_MII)

   //#if defined(AGX_FEATURE_MII_CONSTANT)
    if(uMode == FFL_MODULATE_MODE_CONSTANT)
    {
        albedoColor = vec4(u_const1.rgb, 1.0);
    }
    //#elif defined(AGX_FEATURE_MII_TEXTURE_DIRECT)
    else if(uMode == FFL_MODULATE_MODE_TEXTURE_DIRECT)
    {
        albedoColor = texture2D(uAlbedoTexture, vTexcoord0);
    }
    //#elif defined(AGX_FEATURE_MII_RGB_LAYERED)
    else if(uMode == FFL_MODULATE_MODE_RGB_LAYERED)
    {
        albedoColor = texture2D(uAlbedoTexture, vTexcoord0);
        albedoColor = vec4(albedoColor.r * u_const1.rgb + albedoColor.g * u_const2.rgb + albedoColor.b * u_const3.rgb,
                           albedoColor.a);
    }
    //#elif defined(AGX_FEATURE_MII_ALPHA)
    else if(uMode == FFL_MODULATE_MODE_ALPHA)
    {
        albedoColor = texture2D(uAlbedoTexture, vTexcoord0);
        albedoColor = vec4(u_const1.rgb, albedoColor.r);
    }
    //#elif defined(AGX_FEATURE_MII_LUMINANCE_ALPHA)
    else if(uMode == FFL_MODULATE_MODE_LUMINANCE_ALPHA)
    {
        albedoColor = texture2D(uAlbedoTexture, vTexcoord0);
        albedoColor = vec4(albedoColor.g * u_const1.rgb, albedoColor.r);
    }
    //#elif defined(AGX_FEATURE_MII_ALPHA_OPA)
    else if(uMode == FFL_MODULATE_MODE_ALPHA_OPA)
    {
        albedoColor = texture2D(uAlbedoTexture, vTexcoord0);
        albedoColor = vec4(albedoColor.r * u_const1.rgb, 1.0);
    }
//#endif

    albedoColor = albedoColor * vModelColor;
#endif

    // ============================================================
    //  Albedo Texture
    // ============================================================
#if !defined(AGX_FEATURE_MII) && defined(AGX_FEATURE_ALBEDO_TEXTURE)
    albedoColor = texture2D(uAlbedoTexture, vTexcoord0);
#endif
#if defined(AGX_FEATURE_ALPHA_TEXTURE)
    albedoColor.a   = texture2D(uAlphaTexture, vTexcoord0).r;
#endif

    // ============================================================
    //  Color Mask
    // ============================================================
    // ----------------------------------------
    // Deprecated
#if defined(AGX_FEATURE_ALPHA_COLOR_FILTER)
    // 一部の場所にColor0を反映する
    albedoColor.rgb = (albedoColor.rgb * albedoColor.a + u_const1.rgb * (1.0 - albedoColor.a));
    albedoColor.a = 1.0;
#elif defined(AGX_FEATURE_MASK_TEXTURE)
    lowp vec3  maskTextureColor = texture2D(uMaskTexture, vTexcoord0).rgb;

#   if defined(AGX_FEATURE_SKIN_MASK) && defined(AGX_FEATURE_HAIR_MASK)
    // 肌と髪両方マスクが存在する
    lowp float maskColorValue = maskTextureColor.g + maskTextureColor.b;
    lowp vec3  maskColor      = maskTextureColor.g * u_const1.rgb + maskTextureColor.b * u_const2.rgb;
    albedoColor.rgb = (albedoColor.rgb * (1.0 - maskColorValue) + maskColor);

#   elif defined(AGX_FEATURE_SKIN_MASK)
    // 肌しかマスクが存在しない
    albedoColor.rgb = (albedoColor.rgb * (1.0 - maskTextureColor.g) + maskTextureColor.g * u_const1.rgb);

#   elif defined(AGX_FEATURE_HAIR_MASK)
    // 髪しかマスクが存在しない
    albedoColor.rgb = (albedoColor.rgb * (1.0 - maskTextureColor.b) + maskTextureColor.b * u_const2.rgb);

#   endif
#endif

    // アルベドに頂点カラーを掛ける
    albedoColor *= vModelColor;

    // ============================================================
    //  Alpha test
    // ============================================================
//#if defined(AGX_FEATURE_ALPHA_TEST)
    if (uAlphaTest && albedoColor.a < 0.5) { discard; }
//#endif

    // ============================================================
    //  Bumpmap
    // ============================================================
    // 頂点からの情報
    lowp vec3 normalWorldOrTangent;
#if defined(AGX_FEATURE_BUMP_TEXTURE)
    // バンプマップから法線を取得する
    mediump vec3 bumpNormal = texture2D(uNormalTexture, vTexcoord0).rgb;

    // 法線の正規化は処理が重いのでいったん正規化しない様に...
//    normalWorldOrTangent = normalize(bumpNormal * 2.0 - 1.0);
    normalWorldOrTangent = bumpNormal * 2.0 - 1.0;

#else
    // 法線を正規化して取得する
    normalWorldOrTangent = normalize(vNormal);
#endif

    // ============================================================
    //  Lighting
    // ============================================================
    // 最終的なカラー情報
    lowp vec4 colorOut = vec4(0.0, 0.0, 0.0, albedoColor.a);  // 最終的に出力される色
    lowp vec3 fresnel  = vec3(0.0, 0.0, 0.0);   // フレネル
    lowp vec3 specular = vec3(0.0, 0.0, 0.0);   // スペキュラー

//#if !defined(AGX_FEATURE_DISABLE_LIGHT)
if (uLightEnable) {

    // BRDFの計算を行う（バンプマッピングの場合は接空間）
    lowp vec3 N = normalWorldOrTangent;
    lowp vec3 V = vEyeVecWorldOrTangent.xyz;//normalize(vEyeVecWorldOrTangent.xyz);
    lowp vec3 I = vPunctualLightDirWorldOrTangent.xyz;//normalize(vPunctualLightDirWorldOrTangent.xyz);
    lowp vec3 H = vPunctualLightHalfVecWorldOrTangent.xyz;//normalize(vPunctualLightHalfVecWorldOrTangent.xyz);


    // ----------------------------------------
    // punctual light
    // 平行光源や点光源などの厳密なライティング計算を行なうもの
    {
        lowp float fSpecular = dot(N, H);

        lowp float specularIntensity = texture2D(uLUTSpecTexture, vec2(fSpecular)).r;
        specular = (specularIntensity * uLightColor.rgb);
    }

    // ----------------------------------------
    // GI
    // 半球ライトやIBL、SHのように法線方向に半球積分された結果でライティング計算を行なうもの
    {
        lowp float fFresnel = dot(N, V);
        lowp float fresnelIntensity = texture2D(uLUTFresTexture, vec2(fFresnel)).r;

        fresnel = (fresnelIntensity * vGISpecularLightColor.rgb);
    }
}
//#endif

#if defined(AGX_FEATURE_SPHERE_MAP_TEXTURE)
    // スフィア環境マップ
    specular += texture2D(uSphereMapTexture, vReflectDir.xy).rgb;
#endif

    // ============================================================
    //  Specular Mask
    // ============================================================
#if !defined(AGX_FEATURE_ALPHA_COLOR_FILTER) && defined(AGX_FEATURE_MASK_TEXTURE)
    // スペキュラーマスク
    specular = specular * maskTextureColor.r + fresnel;
#else
    specular += fresnel;
#endif

    // ============================================================
    //  Output
    // ============================================================
//#if !defined(AGX_FEATURE_DISABLE_LIGHT)
if (uLightEnable)
    colorOut.rgb = vDiffuseColor.rgb * albedoColor.rgb + specular;
//#else
else
    colorOut.rgb = albedoColor.rgb;
//#endif

    // フェードアウトを実装する
#if defined(AGX_FEATURE_FADE_OUT_COLOR)
    colorOut.rgb = (colorOut.rgb * (1.0 - u_const3.a)) + (u_const3.rgb * u_const3.a);
#endif

    // 色を反映させる
    gl_FragColor = colorOut;

    //#include <tonemapping_fragment>
    //#include <colorspace_fragment>
}
`;class j6{keys;constructor(J){this.keys=J.sort((Q,Z)=>Q.x-Z.x)}interpolate(J,Q,Z,$,W){let Y=2*J*J*J-3*J*J+1,X=J*J*J-2*J*J+J,H=-2*J*J*J+3*J*J,K=J*J*J-J*J;return Y*Q+X*$+H*Z+K*W}clamp(J,Q,Z){return Math.min(Math.max(J,Q),Z)}generateLUT(J=512){let Q=new Uint8Array(J),Z=0;for(let $=0;$<J;$++){let W=$/(J-1);while(Z<this.keys.length-2&&W>this.keys[Z+1].x)Z++;let Y=this.keys[Z],X=this.keys[Z+1],H=(W-Y.x)/(X.x-Y.x);H=isNaN(H)?0:H;let K=this.interpolate(H,Y.y,X.y,Y.dx*(X.x-Y.x),X.dx*(X.x-Y.x));Q[$]=Math.round(this.clamp(K,0,1)*255)}return Q}}class jJ extends l0{static LUTSpecularTextureType={NONE:0,DEFAULT_02:1,SKIN_01:2,MAX:3};static LUTFresnelTextureType={NONE:0,DEFAULT_02:1,SKIN_01:2,MAX:3};static lutDefinitions={specular:{[jJ.LUTSpecularTextureType.NONE]:new j6([{x:0,y:0,dx:0,dy:0},{x:1,y:0,dx:0,dy:0}]),[jJ.LUTSpecularTextureType.DEFAULT_02]:new j6([{x:0,y:0,dx:0,dy:0},{x:0.05,y:0,dx:0,dy:0},{x:0.8,y:0.038,dx:0.157894736842105,dy:0.157894736842105},{x:1,y:0.11,dx:0,dy:0}]),[jJ.LUTSpecularTextureType.SKIN_01]:new j6([{x:0,y:0.03,dx:-0.105263157894737,dy:-0.105263157894737},{x:1,y:0,dx:0,dy:0}])},fresnel:{[jJ.LUTFresnelTextureType.NONE]:new j6([{x:0,y:0,dx:0,dy:0},{x:1,y:0,dx:0,dy:0}]),[jJ.LUTFresnelTextureType.DEFAULT_02]:new j6([{x:0,y:0.3,dx:-0.105263157894734,dy:-0.105263157894734},{x:0.175,y:0.23,dx:-0.626315789473681,dy:-0.626315789473681},{x:0.6,y:0.05,dx:-0.210526315789474,dy:-0.210526315789474},{x:1,y:0,dx:-0.105263157894737,dy:-0.105263157894737}]),[jJ.LUTFresnelTextureType.SKIN_01]:new j6([{x:0.005,y:0.35,dx:-0.105263157894734,dy:-0.105263157894734},{x:0.173,y:0.319,dx:-0.205263157894734,dy:-0.205263157894734},{x:0.552,y:0.051,dx:-0.210526315789474,dy:-0.210526315789474},{x:1,y:0.001,dx:0,dy:0}])}};static modulateToLUTSpecular=[jJ.LUTSpecularTextureType.SKIN_01,jJ.LUTSpecularTextureType.DEFAULT_02,jJ.LUTSpecularTextureType.SKIN_01,jJ.LUTSpecularTextureType.SKIN_01,jJ.LUTSpecularTextureType.DEFAULT_02,jJ.LUTSpecularTextureType.DEFAULT_02,jJ.LUTSpecularTextureType.DEFAULT_02,jJ.LUTSpecularTextureType.NONE,jJ.LUTSpecularTextureType.NONE,jJ.LUTSpecularTextureType.DEFAULT_02,jJ.LUTSpecularTextureType.DEFAULT_02];static modulateToLUTFresnel=[jJ.LUTFresnelTextureType.SKIN_01,jJ.LUTFresnelTextureType.DEFAULT_02,jJ.LUTFresnelTextureType.SKIN_01,jJ.LUTFresnelTextureType.SKIN_01,jJ.LUTFresnelTextureType.DEFAULT_02,jJ.LUTFresnelTextureType.DEFAULT_02,jJ.LUTFresnelTextureType.DEFAULT_02,jJ.LUTFresnelTextureType.NONE,jJ.LUTFresnelTextureType.NONE,jJ.LUTFresnelTextureType.DEFAULT_02,jJ.LUTFresnelTextureType.DEFAULT_02];static _lutTextures=null;static getLUTTextures(J=512){if(!jJ._lutTextures){let Q={specular:{},fresnel:{}},Z=Number(j9)<137?O6:R6;for(let[$,W]of Object.entries(jJ.lutDefinitions.specular)){let Y=W.generateLUT(J),X=new p0(Y,J,1,Z,X8);X.needsUpdate=!0,Q.specular[$]=X}for(let[$,W]of Object.entries(jJ.lutDefinitions.fresnel)){let Y=W.generateLUT(J),X=new p0(Y,J,1,Z,X8);X.needsUpdate=!0,Q.fresnel[$]=X}jJ._lutTextures=Q}return jJ._lutTextures}static defaultHSLightGroundColor=new u(0.87843,0.72157,0.5898);static defaultHSLightSkyColor=new u(0.87843,0.83451,0.80314);static defaultDirLightColor0=new u(0.35137,0.32392,0.32392);static defaultDirLightColor1=new u(0.10039,0.09255,0.09255);static defaultDirLightCount=2;static defaultDirLightDirAndType0=new XJ(-0.2,0.5,0.8,-1);static defaultDirLightDirAndType1=new XJ(0,-0.19612,0.98058,-1);static defaultLightColor=new u(0.35137,0.32392,0.32392);static defaultLightDirection=this.defaultDirLightDirAndType0;static getBlendOptionsFromModulateType(J){if(J>=0&&J<=5)return{blending:R8,blendSrcAlpha:V8,blendDstAlpha:k8};else if(J>=6&&J<=8)return{blending:R8,blendSrc:V8,blendDst:O9,blendDstAlpha:k8};else if(J>=9&&J<=13)return{blending:R8,blendSrc:K6,blendSrcAlpha:V8,blendDst:H6};else if(J>=14&&J<=17)return{blending:R8,blendSrc:V8,blendDst:O9,blendSrcAlpha:k8,blendDstAlpha:k8};else return console.error(`Unknown modulate type: ${J}.`),{}}modulateMode;modulateType;modulateColor;lightEnable;_side;constructor(J={}){let Q=J.modulateMode??0,Z=J.modulateType??0,$=J.lightEnable??!0,W=J.map||null,Y=Z>=6&&Z<=8?!0:J.alphaTest,X=Z===6?T0:J.side||t0,H={};if(Array.isArray(J.modulateColor)&&J.modulateColor.length===3)H={u_const1:{value:J.modulateColor[0]},u_const2:{value:J.modulateColor[1]},u_const3:{value:J.modulateColor[2]}};else H={u_const1:{value:J.modulateColor||new XJ(1,1,1,1)}};let K=jJ.getLUTTextures(),G=jJ.modulateToLUTSpecular[Z]??jJ.LUTSpecularTextureType.NONE,U=jJ.modulateToLUTFresnel[Z]??jJ.LUTFresnelTextureType.NONE,E=K.specular[G],q=K.fresnel[U],N=Object.assign({},H,{uBoneCount:{value:0},uAlpha:{value:1},uHSLightGroundColor:{value:J.hslightGroundColor||jJ.defaultHSLightGroundColor},uHSLightSkyColor:{value:J.hslightSkyColor||jJ.defaultHSLightSkyColor},uDirLightColor0:{value:J.dirLightColor0||jJ.defaultDirLightColor0},uDirLightColor1:{value:J.dirLightColor1||jJ.defaultDirLightColor1},uDirLightCount:{value:J.dirLightCount||jJ.defaultDirLightCount},uDirLightDirAndType0:{value:J.dirLightDirAndType0||jJ.defaultDirLightDirAndType0.clone()},uDirLightDirAndType1:{value:J.dirLightDirAndType1||jJ.defaultDirLightDirAndType1.clone()},uLightEnable:{value:$},uLightColor:{value:J.lightColor||jJ.defaultLightColor},uMode:{value:Q},uAlphaTest:{value:Y},uAlbedoTexture:{value:W},uLUTSpecTexture:{value:E},uLUTFresTexture:{value:q}});super({vertexShader:J.vertexShader||cV,fragmentShader:J.fragmentShader||nV,uniforms:N,side:X,...Q!==0?jJ.getBlendOptionsFromModulateType(Z):{}});this.modulateMode=Q,this.modulateType=Z,this.modulateColor=J.modulateColor,this.lightEnable=$,this._side=J.side}get map(){return this.uniforms.uAlbedoTexture.value}set map(J){this.uniforms.uAlbedoTexture.value=J}get lightDirection(){return this.uniforms.uDirLightDirAndType0.value}set lightDirection(J){this.uniforms.uDirLightDirAndType0.value=J,this.uniforms.uDirLightDirAndType0.value.w=-1}}var BB={specularMode:0},LB={ambient:new XJ(0.8,0.8,0.8,1),diffuse:new XJ(0.8,0.8,0.8,1),specular:new XJ(0.1,0.1,0.1,1),specularPower:0.01,specularMode:0},zB=[{ambient:new XJ(0.85,0.75,0.75,1),diffuse:new XJ(0.75,0.75,0.75,1),specular:new XJ(0.3,0.3,0.3,1),specularPower:1.2,specularMode:0},{ambient:new XJ(1,1,1,1),diffuse:new XJ(0.7,0.7,0.7,1),specular:new XJ(0,0,0,1),specularPower:40,specularMode:1},{ambient:new XJ(0.9,0.85,0.85,1),diffuse:new XJ(0.75,0.75,0.75,1),specular:new XJ(0.22,0.22,0.22,1),specularPower:1.5,specularMode:0},{ambient:new XJ(0.85,0.75,0.75,1),diffuse:new XJ(0.75,0.75,0.75,1),specular:new XJ(0.3,0.3,0.3,1),specularPower:1.2,specularMode:0},{ambient:new XJ(1,1,1,1),diffuse:new XJ(0.7,0.7,0.7,1),specular:new XJ(0.35,0.35,0.35,1),specularPower:10,specularMode:1},{ambient:new XJ(0.75,0.75,0.75,1),diffuse:new XJ(0.72,0.72,0.72,1),specular:new XJ(0.3,0.3,0.3,1),specularPower:1.5,specularMode:0},{ambient:new XJ(1,1,1,1),diffuse:new XJ(0.7,0.7,0.7,1),specular:new XJ(0,0,0,1),specularPower:40,specularMode:1},{ambient:new XJ(1,1,1,1),diffuse:new XJ(0.7,0.7,0.7,1),specular:new XJ(0,0,0,1),specularPower:40,specularMode:1},{ambient:new XJ(1,1,1,1),diffuse:new XJ(0.7,0.7,0.7,1),specular:new XJ(0,0,0,1),specularPower:40,specularMode:1},{ambient:new XJ(0.95622,0.95622,0.95622,1),diffuse:new XJ(0.49673,0.49673,0.49673,1),specular:new XJ(0.24099,0.24099,0.24099,1),specularPower:3,specularMode:0},{ambient:new XJ(0.95622,0.95622,0.95622,1),diffuse:new XJ(1.08497,1.08497,1.08497,1),specular:new XJ(0.2409,0.2409,0.2409,1),specularPower:3,specularMode:0}],CB=new XJ(0.73,0.73,0.73,1),_B=new XJ(0.6,0.6,0.6,1),MB=new XJ(0.7,0.7,0.7,1),IB=new XJ(0.5,0.5,0.5,1),wB=new XJ(0.9,0.9,0.9,1),AB=new XJ(1,1,1,1),PB=new I(-0.4531539381,0.4226179123,0.7848858833),TB=new I(-0.35,1,0.8),SB=new I(-0.5,0.366,0.785),jB=new XJ(0.3,0.3,0.3,1),vB=2,yB=[0.25098,0.27451,0.30588],xB=[0.43922,0.12549,0.06275];var bB=[0.75294,0.62745,0.18824],hB=[0.05126930067255049,0.061246141699984984,0.07618418934386001],fB=[0.1620327698875954,0.014443805936996105,0.0051820344376627735];var gB=[0.5271132835871205,0.3515313874944194,0.02955820686563641];var pB="#902010";var mB="#c0a030",lB={0:[0.824,0.118,0.078],1:[1,0.431,0.098],2:[1,0.847,0.125],3:[0.471,0.824,0.125],4:[0,0.471,0.188],5:[0.039,0.282,0.706],6:[0.235,0.667,0.871],7:[0.961,0.353,0.49],8:[0.451,0.157,0.678],9:[0.282,0.22,0.094],10:[0.878,0.878,0.878],11:[0.094,0.094,0.078]};var G8;if(typeof window>"u")G8=self;else G8=window;G8.FFLShaderMaterial=P8;G8.LUTShaderMaterial=jJ;var qZ={WiiU:{m:null,f:null},Switch:{m:null,f:null},Miitomo:{m:null,f:null}},sV=new WK;//! NOTE: THIS ASSUMES THE ROOT IS THE PUBLIC FOLDER
function Bq(J,Q){return`/assets/models/miiBody${J}_${Q}.glb`}async function Lq(J){let Q=await sV.loadAsync(J);var Z=new $Z(Q.scene);let $=Q.scene,W=Q.animations[0];Z.clipAction(W,$).stop();let X=Q.animations.find((K)=>K.name==="Wait"),H=Z.clipAction(X,$);return H.play(),H.timeScale=0,Z.update(),$}async function Aq(){qZ.Miitomo.m=await Lq(Bq("M","miitomo")),qZ.Miitomo.f=await Lq(Bq("F","miitomo"))}G8.bodyModels=qZ;function zq(J,Q="GeneratedType",Z=0){if(Z>5)return"";let $="  ".repeat(Z),W=`${$}/**
${$} * @typedef {Object} ${Q}
`;Object.keys(J).forEach((Y)=>{if(Y.startsWith("_"))return;let X=J[Y],H=typeof X,K;if(X===null)K="null";else if(Array.isArray(X)){let G=X.length>0?typeof X[0]:"any";if(typeof X[0]==="object"&&X[0]!==null)G=zq(X[0],`${Q}_${Y}_Item`,Z+1);K=`Array<${G}>`}else if(H==="object")K=zq(X,`${Q}_${Y}`,Z+1)||"Object";else K=H;W+=`${$} * @property {${K}} ${Y}
`}),W+=`${$} */
`,console.log(W)}function oB(typeName){if(typeof typeName!=="string")throw Error();eval(`
		const empty = new Uint8Array(${typeName}.size);
		generateJSDoc(${typeName}.unpack(empty), typeName);
	`)}if(T.default===void 0){let J=G8._}var GZ={OPA_BEARD:0,OPA_FACELINE:1,OPA_HAIR_NORMAL:2,OPA_FOREHEAD_NORMAL:3,XLU_MASK:4,XLU_NOSELINE:5,OPA_NOSE:6,OPA_HAT_NORMAL:7,XLU_GLASS:8,OPA_HAIR_CAP:9,OPA_FOREHEAD_CAP:10,OPA_HAT_CAP:11,MAX:12},v6={POSITION:0,TEXCOORD:1,NORMAL:2,TANGENT:3,COLOR:4,MAX:5},tW={NONE:0,BACK:1,FRONT:2,MAX:3},iV={CONSTANT:0,TEXTURE_DIRECT:1,RGB_LAYERED:2,ALPHA:3,LUMINANCE_ALPHA:4,ALPHA_OPA:5},b7={SHAPE_FACELINE:0,SHAPE_BEARD:1,SHAPE_NOSE:2,SHAPE_FOREHEAD:3,SHAPE_HAIR:4,SHAPE_CAP:5,SHAPE_MASK:6,SHAPE_NOSELINE:7,SHAPE_GLASS:8,MUSTACHE:9,MOUTH:10,EYEBROW:11,EYE:12,MOLE:13,FACE_MAKE:14,FACE_LINE:15,FACE_BEARD:16,FILL:17,SHAPE_MAX:9},NZ={MIDDLE:0,HIGH:1,MAX:2},OZ={NORMAL:0,MAX:70},Pq={NORMAL:1,HAT:2,FACE_ONLY:4,FLATTEN_NOSE:8,NEW_EXPRESSIONS:16,NEW_MASK_ONLY:32},oV=T.default.struct([T.default.uint32le("size"),T.default.uint32le("stride"),T.default.uintptr("ptr")]),aV=T.default.struct([T.default.struct("attributeBuffers",[oV],5)]),rV=T.default.struct([T.default.uint32le("primitiveType"),T.default.uint32le("indexCount"),T.default.uint32le("_8"),T.default.uintptr("pIndexBuffer")]),KK=T.default.struct([T.default.float32le("r"),T.default.float32le("g"),T.default.float32le("b"),T.default.float32le("a")]),t8=T.default.struct([T.default.float32le("x"),T.default.float32le("y"),T.default.float32le("z")]),tV=T.default.struct([T.default.uint32le("mode"),T.default.uint32le("type"),T.default.uintptr("pColorR"),T.default.uintptr("pColorG"),T.default.uintptr("pColorB"),T.default.uintptr("pTexture2D")]),e8=T.default.struct([T.default.struct("attributeBufferParam",[aV]),T.default.struct("modulateParam",[tV]),T.default.uint32le("cullMode"),T.default.struct("primitiveParam",[rV])]),Tq=T.default.struct([T.default.uint8("data",10)]),J9=T.default.struct([T.default.int32le("miiVersion"),T.default.struct("faceline",[T.default.int32le("type"),T.default.int32le("color"),T.default.int32le("texture"),T.default.int32le("make")]),T.default.struct("hair",[T.default.int32le("type"),T.default.int32le("color"),T.default.int32le("flip")]),T.default.struct("eye",[T.default.int32le("type"),T.default.int32le("color"),T.default.int32le("scale"),T.default.int32le("aspect"),T.default.int32le("rotate"),T.default.int32le("x"),T.default.int32le("y")]),T.default.struct("eyebrow",[T.default.int32le("type"),T.default.int32le("color"),T.default.int32le("scale"),T.default.int32le("aspect"),T.default.int32le("rotate"),T.default.int32le("x"),T.default.int32le("y")]),T.default.struct("nose",[T.default.int32le("type"),T.default.int32le("scale"),T.default.int32le("y")]),T.default.struct("mouth",[T.default.int32le("type"),T.default.int32le("color"),T.default.int32le("scale"),T.default.int32le("aspect"),T.default.int32le("y")]),T.default.struct("beard",[T.default.int32le("mustache"),T.default.int32le("type"),T.default.int32le("color"),T.default.int32le("scale"),T.default.int32le("y")]),T.default.struct("glass",[T.default.int32le("type"),T.default.int32le("color"),T.default.int32le("scale"),T.default.int32le("y")]),T.default.struct("mole",[T.default.int32le("type"),T.default.int32le("scale"),T.default.int32le("x"),T.default.int32le("y")]),T.default.struct("body",[T.default.int32le("height"),T.default.int32le("build")]),T.default.struct("personal",[T.default.char16le("name",22),T.default.char16le("creator",22),T.default.int32le("gender"),T.default.int32le("birthMonth"),T.default.int32le("birthDay"),T.default.int32le("favoriteColor"),T.default.uint8("favorite"),T.default.uint8("copyable"),T.default.uint8("ngWord"),T.default.uint8("localonly"),T.default.int32le("regionMove"),T.default.int32le("fontRegion"),T.default.int32le("roomIndex"),T.default.int32le("positionInRoom"),T.default.int32le("birthPlatform")]),T.default.struct("createID",[Tq]),T.default.uint16le("padding_0"),T.default.int32le("authorType"),T.default.uint8("authorID",8)]),ZY=96,GK=-2147483648,y7=(J)=>J|GK,x7=(J)=>J&~GK===0?J:J&~GK,XK=T.default.struct([T.default.char16le("name",22),T.default.char16le("creator",22),T.default.struct("createID",[Tq]),T.default.byte("_padding0",2),T.default.struct("skinColor",[KK]),T.default.uint32le("flags"),T.default.uint8("facelineType"),T.default.uint8("hairType"),T.default.byte("_padding1",2)]),eV=T.default.struct([T.default.uintptr("pTexture2DRenderBufferColorTargetDepthTarget",4)]),JF=T.default.struct([T.default.uintptr("pTextureFaceLine"),T.default.struct("drawParamFaceLine",[e8]),T.default.uintptr("pTextureFaceMake"),T.default.struct("drawParamFaceMake",[e8]),T.default.uintptr("pTextureFaceBeard"),T.default.struct("drawParamFaceBeard",[e8]),T.default.uintptr("pRenderTextureCompressorParam",2)]),Cq=T.default.struct([T.default.struct("drawParamRawMaskPartsEye",[e8],2),T.default.struct("drawParamRawMaskPartsEyebrow",[e8],2),T.default.struct("drawParamRawMaskPartsMouth",[e8]),T.default.struct("drawParamRawMaskPartsMustache",[e8],2),T.default.struct("drawParamRawMaskPartsMole",[e8]),T.default.struct("drawParamRawMaskPartsFill",[e8])]),Sq=T.default.struct([T.default.uint8("partsTextures",340),T.default.uintptr("pRawMaskDrawParam",OZ.MAX),T.default.byte("_remaining",284)]),KZ=T.default.struct([T.default.struct("maskTextures",[Sq]),T.default.struct("facelineTexture",[JF])]),QF=T.default.struct([T.default.uintptr("pRenderTextures",OZ.MAX)]),ZF=1073741823,y6=T.default.struct([T.default.uint32le("resolution"),T.default.uint32le("allExpressionFlag",3),T.default.uint32le("modelFlag"),T.default.uint32le("resourceType")]);y6.default={resolution:512,allExpressionFlag:new Uint32Array([1,0,0]),modelFlag:Pq.NORMAL,resourceType:NZ.HIGH};var aB=y6.default,$F=T.default.struct([T.default.struct("min",[t8]),T.default.struct("max",[t8])]),WF=T.default.struct([T.default.struct("hatTranslate",[t8]),T.default.struct("headFrontRotate",[t8]),T.default.struct("headFrontTranslate",[t8]),T.default.struct("headSideRotate",[t8]),T.default.struct("headSideTranslate",[t8]),T.default.struct("headTopRotate",[t8]),T.default.struct("headTopTranslate",[t8])]),$Y=T.default.struct([T.default.struct("charInfo",[J9]),T.default.struct("charModelDesc",[y6]),T.default.uint32le("expression"),T.default.uintptr("pTextureTempObject"),T.default.struct("drawParam",[e8],GZ.MAX),T.default.uintptr("pShapeData",GZ.MAX),T.default.struct("facelineRenderTexture",[eV]),T.default.uintptr("pCapGlassNoselineTextures",3),T.default.struct("maskTextures",[QF]),T.default.struct("beardHairFaceCenterPos",[t8],3),T.default.struct("partsTransform",[WF]),T.default.uint32le("modelType"),T.default.struct("boundingBox",[$F],3)]),jq={OFFICIAL:0,DEFAULT:1,MIDDLE_DB:2,STORE_DATA_OFFICIAL:3,STORE_DATA:4,BUFFER:5,DIRECT_POINTER:6},_q=T.default.struct([T.default.uint32le("dataSource"),T.default.uintptr("pBuffer"),T.default.uint16le("index")]),rB={MALE:0,FEMALE:1,ALL:2},tB={CHILD:0,ADULT:1,ELDER:2,ALL:3},eB={BLACK:0,WHITE:1,ASIAN:2,ALL:3},Mq=T.default.struct([T.default.uintptr("pData",NZ.MAX),T.default.uint32le("size",NZ.MAX)]),HK={R8_UNORM:0,R8_G8_UNORM:1,R8_G8_B8_A8_UNORM:2,MAX:3},Iq=T.default.struct([T.default.uint16le("width"),T.default.uint16le("height"),T.default.uint8("mipCount"),T.default.uint8("format"),T.default.uint8("isGX2Tiled"),T.default.byte("_padding",1),T.default.uint32le("imageSize"),T.default.uintptr("imagePtr"),T.default.uint32le("mipSize"),T.default.uintptr("mipPtr"),T.default.uint32le("mipLevelOffset",13)]),wq=T.default.struct([T.default.uintptr("pObj"),T.default.uint8("useOriginalTileMode"),T.default.byte("_padding",3),T.default.uintptr("pCreateFunc"),T.default.uintptr("pDeleteFunc")]);class vq{constructor(J=G8.Module){this.module=J,this.textures=/*@__PURE__*/new Map,this.textureCallbackPtr=null,this._setupTextureCallbacks()}_setupTextureCallbacks(){let J=this.module;this.createCallback=J.addFunction(this._textureCreateFunc.bind(this),"vppp"),this.deleteCallback=J.addFunction(this._textureDeleteFunc.bind(this),"vpp");let Q={pObj:0,useOriginalTileMode:!1,_padding:[0,0,0],pCreateFunc:this.createCallback,pDeleteFunc:this.deleteCallback},Z=wq.pack(Q);this.textureCallbackPtr=J._malloc(wq.size),J.HEAPU8.set(new Uint8Array(Z),this.textureCallbackPtr),J._FFLSetTextureCallback(this.textureCallbackPtr)}_getTextureFormat(J){let Q=Number(j9)<137,Z=Q?O6:R6,$=Q?kQ:FQ,Y={[HK.R8_UNORM]:Z,[HK.R8_G8_UNORM]:$,[HK.R8_G8_B8_A8_UNORM]:F8}[J];if(Y===void 0)throw Error(`_textureCreateFunc: Unexpected FFLTextureFormat value: ${J}`);return Y}_textureCreateFunc(J,Q,Z){let $=this.module.HEAPU8.subarray(Q,Q+Iq.size),W=Iq.unpack($),Y=this._getTextureFormat(W.format),X=this.module.HEAPU8.slice(W.imagePtr,W.imagePtr+W.imageSize),H=new p0(X,W.width,W.height,Y,X8);if(H.magFilter=m0,H.minFilter=m0,Number(j9)>=138)H.minFilter=M8,H.generateMipmaps=!1,this._addMipmaps(H,W);H.needsUpdate=!0,this.set(H.id,H),this.module.HEAPU32[Z/4]=H.id}_addMipmaps(J,Q){if(Q.mipPtr===0||Q.mipCount<2)return;let Z=[1,2,4][Q.format];if(!Z)throw Error(`_addMipmaps: Unexpected FFLTextureFormat value: ${Q.format}`);for(let $=1;$<Q.mipCount;$++){let W=Q.mipLevelOffset[$-1],Y=Math.max(1,Q.width>>$),X=Math.max(1,Q.height>>$),H=Y*X*Z,K=Q.mipPtr+W,G=this.module.HEAPU8.slice(K,K+H);J.mipmaps.push({data:G,width:Y,height:X})}}_textureDeleteFunc(J,Q){let Z=this.module.HEAPU32[Q/4],$=this.textures.get(Z)}get(J){let Q=this.textures.get(J);if(!Q)console.error("Unknown texture",J);return Q}set(J,Q){Q._dispose=Q.dispose.bind(Q),Q.dispose=()=>{this.delete(J)},this.textures.set(J,Q)}delete(J){let Q=this.textures.get(J);if(Q)Q._dispose(),Q.source=null,this.textures.delete(J)}}function qK(J,Q){let Z;if(typeof Q!=="number")Z=`Unexpected type for FFLResult from ${J}: ${typeof Q}`;else if(Q!==0)Z=`${J} failed with FFLResult: ${Q}`;if(Z)throw Error(Z)}async function YF(J,Q){let Z,$;try{if(J instanceof ArrayBuffer)J=new Uint8Array(J);if(J instanceof Uint8Array)console.warn("initializeFFL -> _loadDataIntoHeap: resource was passed as Uint8Array/ArrayBuffer. Please pass in a fetch Response instance for improved efficiency."),Z=J.length,$=Q._malloc(Z),console.debug(`loadDataIntoHeap: Loading from Uint8Array. Size: ${Z}, pointer: ${$}`),Q.HEAPU8.set(J,$);else if(J instanceof Response){if(!J.body)throw Error("Fetch response is not streamable.");let W=J.headers.get("Content-Length");if(!W)throw Error("Fetch response missing Content-Length.");Z=parseInt(W,10),$=Q._malloc(Z),console.debug(`loadDataIntoHeap: Streaming ${Z} bytes from fetch response. URL: ${J.url}, pointer: ${$}`);let Y=J.body.getReader(),X=$;while(!0){let{done:H,value:K}=await Y.read();if(H)break;Q.HEAPU8.set(K,X),X+=K.length}}else throw Error("loadDataIntoHeap: type is not Uint8Array or Response");return{pointer:$,size:Z}}catch(W){if($)Q._free($);throw W}}var JY;async function XF(J,Q=G8.Module){console.debug("initializeFFL: Entrypoint, waiting for module to be ready.");let Z;return new Promise(($)=>{if(!Q.calledRun&&!Q.onRuntimeInitialized)Q.onRuntimeInitialized=()=>{console.debug("initializeFFL: Emscripten runtime initialized, resolving."),$()},console.debug(`initializeFFL: module.calledRun: ${Q.calledRun}, module.onRuntimeInitialized: ${Q.onRuntimeInitialized} / << assigned and waiting.`);else console.debug("initializeFFL: Assuming module is ready."),$()}).then(async()=>{if(J instanceof Promise)J=await J}).then(()=>{return YF(J,Q)}).then(({pointer:$,size:W})=>{console.debug(`initializeFFL: Resource loaded into heap. Pointer: ${$}, Size: ${W}`);let Y={pData:[0,0],size:[0,0]};Y.pData[NZ.HIGH]=$,Y.size[NZ.HIGH]=W,JY=Y;let X=Mq.pack(Y);Z=Q._malloc(Mq.size),Q.HEAPU8.set(X,Z);let H=Q._FFLInitRes(0,Z);qK("FFLInitRes",H),Q._FFLInitResGPUStep(),Q._FFLSetNormalIsSnorm8_8_8_8(!0),Q._FFLSetTextureFlipY(!0)}).catch(($)=>{throw Q._free(),console.error("initializeFFL failed:",$),$}).finally(()=>{if(Z)Q._free(Z)})}async function yq(J=null,Q=G8.Module){if(!J&&typeof document<"u"){let $=document.querySelector("meta[itemprop=ffl-js-resource-fetch-path]");if(!$||!$.getAttribute("content"))throw Error('initializeFFLWithResource: Element not found or does not have "content" attribute with path to FFL resource: meta[itemprop=ffl-js-resource-fetch-path]');J=$.getAttribute("content")}if(!J)throw Error("initializeFFLWithResource: resourcePath must be a string");try{let $=await fetch(J);await XF($,Q),G8.FFLTextures=new vq(Q),console.debug("initializeFFLWithResource: FFLiManager and TextureManager initialized, exiting")}catch($){throw alert(`Error initializing FFL with resource: ${$}`),$}}function JL(J){if(!JY){console.warn("exitFFL was called when FFL is not initialized.");return}console.debug("exitFFL called, _resourceDesc:",JY),J._FFLExit(),JY.pData.forEach((Q)=>{if(Q)J._free(_fflResourcePtr)})}class UZ{constructor(J,Q=G8.Module,Z=G8.FFLShaderMaterial){this._module=Q,this._materialClass=Z,this._ptr=J,this.__ptr=J;let $=this._module.HEAPU8.subarray(J,J+$Y.size);this._model=$Y.unpack($),this._facelineTarget=null,this._maskTargets=Array(OZ.MAX).fill(null),this.meshes=new $8,this._addCharModelMeshes(Q)}_addCharModelMeshes(J){for(let Q=0;Q<GZ.MAX;Q++){let Z=this._model.drawParam[Q],$=xq(Z,this._materialClass,J);if(!$)continue;switch($.renderOrder=Z.modulateParam.type,Q){case GZ.OPA_FACELINE:{this._facelineID=$.id;break}case GZ.XLU_MASK:{this._maskID=$.id;break}}this.meshes.add($)}}_getTextureTempObjectPtr(){return this._model.pTextureTempObject}_getTextureTempObject(){let J=this._getTextureTempObjectPtr();return KZ.unpack(this._module.HEAPU8.subarray(J,J+KZ.size))}_getAdditionalInfo(){let J=this._module,Q=J._malloc(XK.size),Z=J._FFLGetAdditionalInfo(Q,jq.BUFFER,this._ptr,0,!1);qK("FFLGetAdditionalInfo",Z);let $=XK.unpack(J.HEAPU8.subarray(Q,Q+XK.size));return J._free(Q),$}_getPartsTransform(){let J=this._model.partsTransform;for(let Q in J){if(J[Q].x===void 0)throw Error();J[Q]=new I(J[Q].x,J[Q].y,J[Q].z)}return J}_getFacelineColor(){let J=this._module,Q=this._model.charInfo.faceline.color,Z=J._malloc(KK.size);J._FFLGetFacelineColor(Z,Q);let $=EZ(Z,J);return J._free(Z),new u().setRGB($.x,$.y,$.z)}_getFavoriteColor(J=!1){let Q=this._module,Z=this._model.charInfo.personal.favoriteColor,$=Q._malloc(KK.size);Q._FFLGetFavoriteColor($,Z);let W=EZ($,Q);return Q._free($),new u().setRGB(W.x,W.y,W.z,J===!1?f8:x0)}_getGender(){return this._model.charInfo.personal.gender}_getCharInfoUint8Array(){return J9.pack(this._model.charInfo)}_getPartsTexturesPtr(){return this._model.pTextureTempObject+KZ.fields.maskTextures.offset+Sq.fields.partsTextures.offset}_getFacelineTempObjectPtr(){return this._model.pTextureTempObject+KZ.fields.facelineTexture.offset}_getMaskTempObjectPtr(){return this._model.pTextureTempObject+KZ.fields.maskTextures.offset}_getBoundingBox(){let J=this._model.boundingBox[this._model.modelType],Q=new I(J.min.x,J.min.y,J.min.z),Z=new I(J.max.x,J.max.y,J.max.z);return new z0(Q,Z)}_getResolution(){return this._model.charModelDesc.resolution&ZF}_finalizeCharModel(){if(!this._ptr)return;this._module._FFLDeleteCharModel(this._ptr),this._module._free(this._ptr),this._ptr=null}_disposeTextures(){if(this._facelineTarget)this._facelineTarget.dispose(),this._facelineTarget=null;this._maskTargets.forEach((J,Q)=>{if(!J)return;J.dispose(),this._maskTargets[Q]=null})}dispose(){this._finalizeCharModel(),FK(this.meshes),this.meshes=null,this._disposeTextures()}getStoreData(){let J=this._getCharInfoUint8Array(),Q=this._module,Z=Q._malloc(J9.size),$=Q._malloc(ZY);Q.HEAPU8.set(J,Z);let W=Q._FFLpGetStoreDataFromCharInfo($,Z),Y=Q.HEAPU8.slice($,$+ZY);if(Q._free(Z),Q._free($),!W)throw Error("getStoreData: call to FFLpGetStoreDataFromCharInfo returned false, CharInfo verification probably failed");return Y}setExpression(J){this._model.expression=J;let Q=this._maskTargets[J];if(!Q||!Q.texture)throw Error(`setExpression: this._maskTargets[${J}].texture is not a valid texture`);let Z=this.meshes.getObjectById(this._maskID);if(!Z)throw Error("setExpression: this.meshes[FFLiShapeType.XLU_MASK] does not exist, cannot set expression on the mask");Z.material.map=Q.texture,Z.material.needsUpdate=!0}get expression(){return this._model.expression}set expression(J){throw Error("nope you cannot do this, try setExpression instead")}get facelineColor(){if(!this._facelineColor)this._facelineColor=this._getFacelineColor();return this._facelineColor}get favoriteColor(){if(!this._favoriteColor)this._favoriteColor=this._getFavoriteColor();return this._favoriteColor}get partsTransform(){if(!this._partsTransform)this._partsTransform=this._getPartsTransform();return this._partsTransform}get boundingBox(){if(!this._boundingBox)this._boundingBox=this._getBoundingBox();return this._boundingBox}static BodyScaleMode={Apply:0,Limit:1};getBodyScale(J=UZ.BodyScaleMode.Apply){let Q=this._model.charInfo.body.build,Z=this._model.charInfo.body.height,$=new I;switch(J){case UZ.BodyScaleMode.Apply:{$.x=Q*(Z*0.003671875+0.4)/128+Z*0.001796875+0.4,$.y=Z*0.006015625+0.5;break}case UZ.BodyScaleMode.Limit:{let W=Z/128;$.y=W*0.55+0.6,$.x=W*0.3+0.6,$.x=(W*0.6+0.8-$.x)*(Q/128)+$.x;break}default:throw Error(`getBodyScale: Unexpected value for scaleMode: ${J}`)}return $.z=$.x,$}}var eW={GrayNormal:0,BluePresent:1,RedRegular:2,GoldSpecial:3},QL={[eW.GrayNormal]:new u(4212558),[eW.BluePresent]:new u(2637946),[eW.RedRegular]:new u(7348245),[eW.GoldSpecial]:new u(12623920)};function HF(J,Q){let Z=Q._malloc(J9.size),$={dataSource:jq.DIRECT_POINTER,pBuffer:Z,index:0};if(!(J instanceof Uint8Array))try{if(typeof J!=="object")throw Error("_allocateModelSource: data passed in is not FFLiCharInfo object or Uint8Array");J=J9.pack(J)}catch(W){throw Q._free(Z),W}switch(J.length){case ZY:{let W=Q._malloc(ZY);Q.HEAPU8.set(J,W);let Y=Q._FFLpGetCharInfoFromStoreData(Z,W);if(Q._free(W),!Y)throw Q._free(Z),Error("_allocateModelSource: call to FFLpGetCharInfoFromStoreData returned false, CharInfo verification probably failed");break}case J9.size:Q.HEAPU8.set(J,Z);break;case QY.size+1:J=DF(J);case QY.size:{let W=QY.unpack(J),Y=FF(W);J=J9.pack(Y),Q.HEAPU8.set(J,Z);break}default:throw Q._free(Z),Error(`_allocateModelSource: Unknown data length: ${J.length}`)}return $}function KF(J,Q,Z=!1){let $=0,W=!1;if(typeof J==="number")$=J,W=!1;else W=!0,$=Q._malloc(J9.size),Q.HEAPU8.set(J,$);let Y=Q._FFLiVerifyCharInfoWithReason($,Z);if(W)Q._free($);if(Y!==0)throw Error(`FFLiVerifyCharInfoWithReason failed with result: ${Y}`)}function ZL(J,Q,Z,$){let W=J._malloc(J9.size);J._FFLiGetRandomCharInfo(W,Q,Z,$);let Y=J.HEAPU8.slice(W,W+J9.size);return J._free(W),Y}function GF(J){function Q($){if($>=OZ.MAX)throw Error(`makeExpressionFlag: input out of range: got ${$}, max: ${OZ.MAX}`)}let Z=new Uint32Array([0,0,0]);if(typeof J==="number")J=[J];else if(!Array.isArray(J))throw Error("makeExpressionFlag: expected array or single number");for(let $ of J){Q($);let W=Math.floor($/32),Y=$%32;Z[W]|=1<<Y}return Z}function NK(J,Q,Z,$=G8.Module,W=!0){Q=Q||y6.default;let Y=$._malloc(_q.size),X=$._malloc(y6.size),H=$._malloc($Y.size),K=HF(J,$),G=K.pBuffer,U=_q.pack(K);$.HEAPU8.set(U,Y),Q.modelFlag|=Pq.NEW_EXPRESSIONS;let E=y6.pack(Q);$.HEAPU8.set(E,X);try{if(W)KF(G,$,!1);let N=$._FFLInitCharModelCPUStep(H,Y,X);qK("FFLInitCharModelCPUStep",N)}catch(N){throw $._free(H),N}finally{$._free(Y),$._free(X),$._free(G)}let q=new UZ(H,$,Z);return q._data=J,q}function $L(J,Q,Z,$=null){let W;if(Q=Q||J._data,!Q)throw Error("updateCharModel: newData is null. It should be retrieved from charModel._data which is set by createCharModel.");let Y=J._model.charModelDesc.allExpressionFlag;switch(!0){case(Array.isArray($)||typeof $==="number"):$=GF($);case $ instanceof Uint32Array:Y=$;case!$:{W=J._model.charModelDesc,W.allExpressionFlag=Y;break}case typeof $==="object":{W=$;break}default:throw Error("updateCharModel: Unexpected type for descOrExpFlag")}J.dispose();let X=NK(Q,W,J._materialClass,J._module);return RK(X,Z,J._module),X}function xq(J,Q,Z){if(!J)throw Error("drawParamToMesh: drawParam may be null.");if(J.primitiveParam.indexCount===0)return null;let $=UF(J,Z),Y={[tW.NONE]:T0,[tW.BACK]:t0,[tW.FRONT]:n0,[tW.MAX]:T0}[J.cullMode];if(Y===void 0)throw Error(`drawParamToMesh: Unexpected value for FFLCullMode: ${J.cullMode}`);let X=EF(J.modulateParam),H={side:Y,map:X,...qF(J.modulateParam,Z)},K=new Q(H),G=new N0($,K);if(G.geometry.userData)G.geometry.userData.modulateType=J.modulateParam.type,G.geometry.userData.modulateMode=J.modulateParam.mode;return G}function UF(J,Q){let Z=J.attributeBufferParam.attributeBuffers,$=Z[v6.POSITION];if($.size===0)throw Error("_bindDrawParamGeometry: Position buffer must not have size of 0");let W=$.size/$.stride,Y=new gJ,X=J.primitiveParam.pIndexBuffer/2,H=J.primitiveParam.indexCount,K=Q.HEAPU16.subarray(X,X+H);return Y.setIndex(new D6(new Uint16Array(K),1)),Object.entries(Z).forEach(([G,U])=>{let E=parseInt(G);if(U.size===0&&E!==v6.POSITION)return;switch(E){case v6.POSITION:{let q=U.ptr/4,N=Q.HEAPF32.subarray(q,q+W*4),k=new g8(N,4);Y.setAttribute("position",new O8(k,3,0));break}case v6.NORMAL:{let q=Q.HEAP8.subarray(U.ptr,U.ptr+U.size);Y.setAttribute("normal",new R7(q,U.stride,!0));break}case v6.TANGENT:{let q=Q.HEAP8.subarray(U.ptr,U.ptr+U.size);Y.setAttribute("tangent",new R7(q,U.stride,!0));break}case v6.TEXCOORD:{let q=U.ptr/4,N=Q.HEAPF32.subarray(q,q+W*2);Y.setAttribute("uv",new zJ(N,U.stride/4));break}case v6.COLOR:{if(U.stride===0)break;let q=Q.HEAPU8.subarray(U.ptr,U.ptr+U.size);Y.setAttribute("_color",new MQ(q,U.stride,!0));break}}}),Y}function EF(J,Q=G8.FFLTextures){if(!J.pTexture2D||J.type===b7.SHAPE_FACELINE||J.type===b7.SHAPE_MASK)return null;let Z=J.pTexture2D,$=Q.get(Z);if(!$)throw Error(`_getTextureFromModulateParam: Texture not found for ${Z}.`);if([b7.SHAPE_FACELINE,b7.SHAPE_CAP,b7.SHAPE_GLASS].includes(J.type))$.wrapS=s8,$.wrapT=s8,$.needsUpdate=!0;return $}function qF(J,Q){let Z=new XJ(0,0,0,0);if(J.pColorR!==0){let W=J.pColorR/4,Y=Q.HEAPF32.subarray(W,W+4);Z=new XJ(Y[0],Y[1],Y[2],Y[3])}if(J.pColorG!==0&&J.pColorB!==0)Z=[EZ(J.pColorR,Q),EZ(J.pColorG,Q),EZ(J.pColorB,Q)];let $=!(J.mode!==iV.CONSTANT&&J.type>=b7.SHAPE_MAX);return{modulateMode:J.mode,modulateType:J.type,modulateColor:Z,lightEnable:$}}function EZ(J,Q){if(!J)return console.error("getVector4FromFFLColorPtr: Received null pointer"),new XJ(0,0,0,0);let Z=Q.HEAPF32.subarray(J/4,J/4+4);return new XJ(Z[0],Z[1],Z[2],Z[3])}var OK=!1;function RK(J,Q){let Z=J._module,$=J._getTextureTempObject();if(NF(J,$,Q,Z),OF(J,$,Q,Z),!OK)J._finalizeCharModel();J.setExpression(J.expression)}var UK=()=>null,EK=()=>null;function WL(J){UK=async(Q,Z)=>{let $=await DK(Q,Z,!0);J($),UK=()=>null}}function YL(J){EK=async(Q,Z)=>{let $=await DK(Q,Z,!0);J($),EK=()=>null}}function NF(J,Q,Z,$){let W=J._getFacelineTempObjectPtr();$._FFLiInvalidateTempObjectFacelineTexture(W);let Y=[Q.facelineTexture.drawParamFaceLine,Q.facelineTexture.drawParamFaceBeard,Q.facelineTexture.drawParamFaceMake].filter((q)=>q&&q.modulateParam.pTexture2D!==0);if(Y.length===0)return;let X=J.facelineColor,{scene:H}=bq(Y,X,J._materialClass,J._module,Z),K=J._getResolution()/2,G=J._getResolution(),U={depthBuffer:!1,stencilBuffer:!1,wrapS:s8,wrapT:s8},E=VK(H,kK(),Z,K,G,U);if(UK(E,Z),kF(J,E),!OK)$._FFLiDeleteTempObjectFacelineTexture(W,J._ptr,J._model.charModelDesc.resourceType);FK(H)}function OF(J,Q,Z,$){let W=J._getMaskTempObjectPtr(),Y=J._ptr+$Y.fields.charModelDesc.offset+y6.fields.allExpressionFlag.offset,X=[];for(let H=0;H<J._model.maskTextures.pRenderTextures.length;H++){if(J._model.maskTextures.pRenderTextures[H]===0)continue;let K=Q.maskTextures.pRawMaskDrawParam[H],G=Cq.unpack($.HEAPU8.subarray(K,K+Cq.size));$._FFLiInvalidateRawMask(K);let{target:U,scene:E}=RF(J,G,Z,$);J._maskTargets[H]=U,X.push(E)}if(X.forEach((H)=>{FK(H)}),!OK)$._FFLiDeleteTempObjectMaskTextures(W,Y,J._model.charModelDesc.resourceType),$._FFLiDeleteTextureTempObject(J._ptr)}function RF(J,Q,Z,$){let W=[Q.drawParamRawMaskPartsMustache[0],Q.drawParamRawMaskPartsMustache[1],Q.drawParamRawMaskPartsMouth,Q.drawParamRawMaskPartsEyebrow[0],Q.drawParamRawMaskPartsEyebrow[1],Q.drawParamRawMaskPartsEye[0],Q.drawParamRawMaskPartsEye[1],Q.drawParamRawMaskPartsMole].filter((G)=>G&&G.primitiveParam.indexCount!==0);if(W.length===0)return console.error("No mask drawParams found"),null;let Y={depthBuffer:!1,stencilBuffer:!1},{scene:X}=bq(W,null,J._materialClass,$),H=J._getResolution(),K=VK(X,kK(),Z,H,H,Y);return EK(K,Z),{target:K,scene:X}}function kF(J,Q){if(!Q||!Q.texture)throw Error("setFaceline: passed in RenderTarget is invalid");J._facelineTarget=Q;let Z=J.meshes.getObjectById(J._facelineID);if(!Z)throw Error("setFaceline: charModel.meshes[FFLiShapeType.OPA_FACELINE] does not exist");Z.material.map=Q.texture,Z.material.needsUpdate=!0}function bq(J,Q=null,Z,$){let W=new k9;W.background=Q||null;let Y=[];return J.forEach((X)=>{let H=xq(X,Z,$);if(H)W.add(H),Y.push(H)}),{scene:W,meshes:Y}}function kK(J=!1){let Q=new r8(-1,1,J?-1:1,J?1:-1,0.1,10);return Q.position.z=1,Q}function VK(J,Q,Z,$,W,Y={}){let X={minFilter:m0,magFilter:m0,...Y},H=new H8($,W,X),K=Z.getRenderTarget();return Z.setRenderTarget(H),Z.render(J,Q),Z.setRenderTarget(K),H}function FK(J,Q){if(J.traverse((Z)=>{if(!Z.isMesh)return;if(Z.geometry)Z.geometry.dispose();if(Z.material){if(Z.material.map)Z.material.map.dispose();Z.material.dispose()}}),Q&&Q instanceof k9)Q.remove(J);J.children=[]}function DK(J,Q,Z=!1){return new Promise(($)=>{let W=new k9;W.background=null;let Y=new b0({side:T0,map:J.texture,transparent:!0}),X=new F9(2,2),H=new N0(X,Y);W.add(H);let K=kK(Z),G=Q.getRenderTarget(),U=Q.outputColorSpace,E=new i;Q.getSize(E),Q.setRenderTarget(null),Q.outputColorSpace=aJ?aJ.workingColorSpace:null,Q.setSize(J.width,J.height,!1),Q.render(W,K);function q(){Y.dispose(),X.dispose(),W.remove(H),Q.outputColorSpace=U,Q.setSize(E.x,E.y,!1),Q.setRenderTarget(G)}if(typeof window>"u")Q.domElement.convertToBlob({type:"image/png"}).then((N)=>{$({type:"blob",result:N}),q()});else{let N=Q.domElement.toDataURL("image/png");$({type:"dataURL",result:N}),q()}})}function XL(J,Q){if(!Q)console.warn(`appendImageFromDataUrl: you did not specify "container" so we will use document.body, don't be surprised if your image ends up in brazil`),Q=document.body;let Z=new Image;Z.src=J,Q.appendChild(Z)}var C9={Face:0,MakeIcon:1,IconFovy45:2,AllBody:3};function VF(J,Q=1,Z=1){let $=Q/Z;switch(J){case C9.Face:{let Y=new O0(15,$,0.1,1000);return Y.position.set(0,34.5,380),Y.lookAt(0,34.3,0),Y}case C9.MakeIcon:{let Y=new O0(10,$,500,1000);return Y.position.set(0,34.5,600),Y.lookAt(0,34.5,0),Y}case C9.IconFovy45:{let W=new O0(45,$,50,1000);return W.position.set(0,34,110),W.lookAt(0,34,0),W}case C9.AllBody:{let Y=new O0(15,$,50,1500);return Y.position.set(0,50,900),Y.lookAt(0,105,0),Y}default:throw Error("getCameraForViewType: not implemented")}}function hq(J,Q,Z=C9.MakeIcon,$=256,W=256,Y=!1){return new Promise((X)=>{let H=new k9;H.background=null;let K=J._getGender();if(Y){let V,R,O,D;var G=J.getBodyScale();switch(K){case 0:{V=qZ.Miitomo.m.clone(!0),R=V.getObjectByName("body_m"),O=V.getObjectByName("hands_m"),D=V.getObjectByName("legs_m");break}case 1:{V=qZ.Miitomo.f.clone(!0),R=V.getObjectByName("body_f"),O=V.getObjectByName("hands_f"),D=V.getObjectByName("legs_f");break}}V.scale.set(G.x*10,G.y*10,G.z*10);var U=new z0().setFromObject(V);V.position.set(0,-U.max.y,0),H.add(V);var E=J._getFavoriteColor(!0);R.material=new jJ({modulateType:9,modulateMode:0,modulateColor:new XJ(E.r,E.g,E.b,1)}),D.material=new jJ({modulateType:10,modulateMode:0,modulateColor:new XJ(0.3,0.3,0.3,1)})}H.add(J.meshes.clone());let q=VF(Z),N=VK(H,q,Q,$,W),k=DK(N,Q);N.dispose(),X(k)})}var QY=T.default.struct([T.default.uint8("beardColor"),T.default.uint8("beardType"),T.default.uint8("build"),T.default.uint8("eyeAspect"),T.default.uint8("eyeColor"),T.default.uint8("eyeRotate"),T.default.uint8("eyeScale"),T.default.uint8("eyeType"),T.default.uint8("eyeX"),T.default.uint8("eyeY"),T.default.uint8("eyebrowAspect"),T.default.uint8("eyebrowColor"),T.default.uint8("eyebrowRotate"),T.default.uint8("eyebrowScale"),T.default.uint8("eyebrowType"),T.default.uint8("eyebrowX"),T.default.uint8("eyebrowY"),T.default.uint8("facelineColor"),T.default.uint8("facelineMake"),T.default.uint8("facelineType"),T.default.uint8("facelineWrinkle"),T.default.uint8("favoriteColor"),T.default.uint8("gender"),T.default.uint8("glassColor"),T.default.uint8("glassScale"),T.default.uint8("glassType"),T.default.uint8("glassY"),T.default.uint8("hairColor"),T.default.uint8("hairFlip"),T.default.uint8("hairType"),T.default.uint8("height"),T.default.uint8("moleScale"),T.default.uint8("moleType"),T.default.uint8("moleX"),T.default.uint8("moleY"),T.default.uint8("mouthAspect"),T.default.uint8("mouthColor"),T.default.uint8("mouthScale"),T.default.uint8("mouthType"),T.default.uint8("mouthY"),T.default.uint8("mustacheScale"),T.default.uint8("mustacheType"),T.default.uint8("mustacheY"),T.default.uint8("noseScale"),T.default.uint8("noseType"),T.default.uint8("noseY")]);function FF(J){return{miiVersion:0,faceline:{type:J.facelineType,color:J.facelineColor,texture:J.facelineWrinkle,make:J.facelineMake},hair:{type:J.hairType,color:y7(J.hairColor),flip:J.hairFlip},eye:{type:J.eyeType,color:y7(J.eyeColor),scale:J.eyeScale,aspect:J.eyeAspect,rotate:J.eyeRotate,x:J.eyeX,y:J.eyeY},eyebrow:{type:J.eyebrowType,color:y7(J.eyebrowColor),scale:J.eyebrowScale,aspect:J.eyebrowAspect,rotate:J.eyebrowRotate,x:J.eyebrowX,y:J.eyebrowY},nose:{type:J.noseType,scale:J.noseScale,y:J.noseY},mouth:{type:J.mouthType,color:y7(J.mouthColor),scale:J.mouthScale,aspect:J.mouthAspect,y:J.mouthY},beard:{mustache:J.mustacheType,type:J.beardType,color:y7(J.beardColor),scale:J.mustacheScale,y:J.mustacheY},glass:{type:J.glassType,color:y7(J.glassColor),scale:J.glassScale,y:J.glassY},mole:{type:J.moleType,scale:J.moleScale,x:J.moleX,y:J.moleY},body:{height:J.height,build:J.build},personal:{name:"",creator:"",gender:J.gender,birthMonth:0,birthDay:0,favoriteColor:J.favoriteColor,favorite:0,copyable:0,ngWord:0,localonly:0,regionMove:0,fontRegion:0,roomIndex:0,positionInRoom:0,birthPlatform:3},createID:{data:[,,,,,,,,,,].fill(0)},padding_0:0,authorType:0,authorID:[,,,,,,,,].fill(0)}}function DF(J){let Q=new Uint8Array(J),$=Q[0];for(let W=1;W<48;W++){let Y=Q[W],X=(Y-7+256)%256;Q[W-1]=X^$,$=Y}return Q.slice(0,QY.size)}function HL(J){return{beardColor:x7(J.beard.color),beardType:J.beard.type,build:J.body.build,eyeAspect:J.eye.aspect,eyeColor:x7(J.eye.color),eyeRotate:J.eye.rotate,eyeScale:J.eye.scale,eyeType:J.eye.type,eyeX:J.eye.x,eyeY:J.eye.y,eyebrowAspect:J.eyebrow.aspect,eyebrowColor:x7(J.eyebrow.color),eyebrowRotate:J.eyebrow.rotate,eyebrowScale:J.eyebrow.scale,eyebrowType:J.eyebrow.type,eyebrowX:J.eyebrow.x,eyebrowY:J.eyebrow.y,facelineColor:J.faceline.color,facelineMake:J.faceline.make,facelineType:J.faceline.type,facelineWrinkle:J.faceline.texture,favoriteColor:J.personal.favoriteColor,gender:J.personal.gender,glassColor:x7(J.glass.color),glassScale:J.glass.scale,glassType:J.glass.type,glassY:J.glass.y,hairColor:x7(J.hair.color),hairFlip:J.hair.flip,hairType:J.hair.type,height:J.body.height,moleScale:J.mole.scale,moleType:J.mole.type,moleX:J.mole.x,moleY:J.mole.y,mouthAspect:J.mouth.aspect,mouthColor:x7(J.mouth.color),mouthScale:J.mouth.scale,mouthType:J.mouth.type,mouthY:J.mouth.y,mustacheScale:J.beard.scale,mustacheType:J.beard.mustache,mustacheY:J.beard.y,noseScale:J.nose.scale,noseType:J.nose.type,noseY:J.nose.y}}var BF=(J)=>J.replace(/\s+/g,""),LF=(J)=>new Uint8Array(J.match(/.{1,2}/g).map((Q)=>parseInt(Q,16)));function zF(J){let Q=J.replace(/-/g,"+").replace(/_/g,"/"),Z=Q.padEnd(Q.length+(4-Q.length%4)%4,"=");return Uint8Array.from(atob(Z),($)=>$.charCodeAt(0))}var KL=(J)=>btoa(String.fromCharCode.apply(null,J));function GL(J){let Q,Z=BF(J);if(/^[0-9a-fA-F]+$/.test(Z))Q=LF(Z);else Q=zF(Z);return Q}var CK,$5,_K;function YB(){_K=new iW({antialias:!0,alpha:!0,canvas:$5})}self.onmessage=async(J)=>{let Q=J.data;switch(Q.type){case"Init":{CK=(await Promise.resolve().then(() => (Z5(),Q5))).default.Module,await Aq(),await yq(Q.resourcePath,CK),$5=Q.offscreenCanvas,YB(),postMessage({ready:!0});break}case"MakeIcon":{let Z={type:"dataURL",result:""},$;try{let W=Q.data;$=NK(W,void 0,jJ,CK,!1),RK($,_K);let Y=C9.MakeIcon;switch(Q.view){case"face":case"variableiconbody":Y=C9.MakeIcon;break;case"all_body_sugar":Y=C9.AllBody;break}let X=Q.width??512,H=Q.height??X,K=Q.view==="all_body_sugar";Z=await hq($,_K,Y,X,H,K)}catch(W){console.error("Library error: Could not make icon",W)}finally{$.dispose(),postMessage({id:Q.id,result:Z.result})}}}};
