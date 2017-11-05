var UJF = function(){
    this.version="0.0.1";
};
UJF.prototype={
    checkType(data){
        if(typeof data=="string")
        {
            console.log("字符串字面量");
        }
        else if(typeof data=="number")
        {
            console.log("数值字面量")
        }
        else if(typeof data=="boolean")
        {
            console.log("布尔值字面量");
        }
        else if(typeof data=="undefined")
        {
            console.log("undefined特殊类型");
        }
        else if(data instanceof Array)
        {
            console.log("数组对象子类型");
        }
        else if(data instanceof Function)
        {
            console.log("函数对象子类型");
        }
        else if(data instanceof Date)
        {
            console.log("日期对象子类型");
        }
        else if(data instanceof RegExp)
        {
            console.log("正则对象子类型");
        }
        else if(data instanceof Error)
        {
            console.log("错误对象子类型");
        }
        else if(Object.prototype.toString.call(data)=="[object Object]")
        {
            console.log("对象类型");
        }
        else if(Object.prototype.toString.call(data)=="[object Null]")
        {
            console.log("null特殊类型");
        }
        else if(Object.prototype.toString.call(data)=="[object Promise]")
        {
            console.log("promise类型");
        }
        else{
            console.log("未知类型")
        }
    },
    isArray(arr){
        var toString = Object.prototype.toString
        return toString.call(arr) === "[object Array]"
    },
    isArrayHasElement:function(arr){
        return UJF.prototype.isArray(arr) && arr.length>0
    },
    isObject:function(obj){
        return obj !== null && typeof obj === 'object'
    },
    isPromise(val){
        return val && typeof val.then === 'function'
    },
    arraySort:function(arr){
        arr = arr || []
        arr.sort((x,y)=>(x>y));
        return arr;
    },
    _arrayDinstinct:function(arr){
        var _arrNew=[]
        for(var i=0;i<arr.length;i++){
            if(arr[i] instanceof Object && Object.prototype.toString.call(arr[i])!=="[object Null]"){
                if(Object.prototype.toString.call(arr[i])=="[object Object]"){
                    arr.sort((x,y)=>(x.time>y.time));
                    arr.reduce(function(accumulator, currentValue, currentIndex, array){  
                        if(accumulator.time === currentValue.time){
                            array[currentIndex-1]=null;
                        }
                        //console.log(accumulator);
                        return currentValue;
                    });
                    return _arrNew = arr.filter((subarr)=>{return subarr!=null})
                }else{
                    console.log(new Error("UJI暂不支持当前类型数组去重。"))
                }
            }else{
                return [...new Set(this.arraySort(arr))];
            }
        }
        //return [...new Set(arr)];
    },
    deepCopyObj:function(original){
        let copy = {}
        Object.keys(original).forEach(key=>{
            copy[key] = original[key]
        })
        return copy
    },
    resolveUrl:function(Url){
        "use strict"
        
        //'http://m.manaowan.com/index.html?a=1&b=2&c=&d=xxx&'→"a=1&b=2&c=&d=xxx&"
        function getSearch(Url){
            let indexReg=/\?/
            let resultArr = indexReg.exec(Url)
            let searchStr = Url.substr(resultArr['index']+1)
            return searchStr
        }
        var mnwUrl = 'http://m.manaowan.com/index.html?a=1&b=2&c=&d=xxx&'
        var searchResult = getUrlParameter(mnwUrl)
        
        //"a=1&b=2&c=&d=xxx&"→["a=1","b=2","c=","d=xxx"]
        function getPara(result){
            if(result!==''){
                let paraReg=/\&/g
                let paraArr=[],
                    para='';
                let circle = ''
                paraArr = paraReg.exec(result)
                para = result.substring(0,paraArr.index)
                arr.push(para)
                circle = result.substr(paraArr['index']+1)
                getPara(circle)
            }else{
                console.log("遍历结束")
            }
        }
        var arr = []
        getPara(searchResult)
        
        //["a=1","b=2","c=","d=xxx"]→{"a":"1","b":"2","c":"","d":"xxx"}
        var obj = {}
        for(let i =0 ;i<arr.length;i++){
            let mid = arr[i]
            let key = mid.substring(0,mid.indexOf("="))
            let value = mid.substr(mid.indexOf("=")+1)
            obj[key] = value
        }
        return JSON.stringify(obj)        
    },
    cached:function(fn) {
        var cache = Object.create(null);
        return (function cachedFn (str) {
          var hit = cache[str];
          return hit || (cache[str] = fn(str))
        })
      },
    camlize:function(str){
        //return a new camlized string
        /*'hello-world-javascript' → 'helloWorldJavascript'*/ 
        var camelizeRE = /-(\w)/g
        var result = str.replace(camelizeRE,function(_,w,offset,str){/*Cannot use p2/p3/p4,only four key parameters:match,word(s),offset,str*/
            return w?w.toUpperCase():'';
            // return w?"-"+w.toUpperCase():'';
        })
        return result
    },
    hyphenate:function(str){
        var hyphenateRE = /\B([A-Z])/g;
        return str.replace(hyphenateRE, function(_,c){
            return c?"-"+c.toLowerCase():''
        })
        //str.replace(hyphenateRE,"-$1").toLowerCase()
    },
    hasOwn:function(obj,key){
        return Object.prototype.hasOwnProperty.call(obj,key)
    },
    toArray: function(list, start) {
        start = start || 0;
        var i = list.length - start;
        var ret = new Array(i);
        while (i--) {
          ret[i] = list[i + start];
        }
        return ret
    },
    getObjDetails:function(obj,getKey,getValue){
        // if(getKey&&getValue){
        //     return keysArr,valuesArr
        // }else{
        //     if(getKey&&!getValue){
        //         return keysArr
        //     }else if(!getKey&&getValue){
        //         return valuesArr
        //     }else{
        //         return []
        //     }
        // }
        var keysArr = [],valuesArr = [];
        var fullArr=[];
        for(var key in obj){
            keysArr.push(key)
            valuesArr.push(obj[key])
        }
        fullArr.push(keysArr)
        fullArr.push(valuesArr)
        return getKey&&getValue ? fullArr
               :getKey?keysArr
                :getValue?valuesArr
                :[]
    },
    extendObj:function(extendedObj,sourceObj){
        for(var key in sourceObj){
            extendedObj[key] = sourceObj[key]
        }
        return extendedObj
    },
    arrToObj:function(arr){
        var obj = {}
        for(var i = 0;i<arr.length;i++){
            obj[i]=arr[i]
        }
        return obj
    },
    no:function(a,b,c){
        return false;
    },
    identity:function(_){
        return _;
    },
    howToView:function(){
        
    },
    render:function(){

    },
    getData:function(){

    },
    setData:function(){

    },
    arrMin:function(arr){
        console.log(this)
        var min = Math.min.apply(null,arr)
        var idx = arr.indexOf(min)
        var obj ={}
        obj.min = min
        obj.idx = idx
        return obj
    }
}
// export default UJF
module.exports = UJF;