const storage = require("./storage.js")
const extensions={

  nem:{
    id:"nem",
    name:"NEM",
    component:require("../component/nem.js"),
    icon:require("../res/coins/nem.png"),
    scheme:"nem"
  },

  hVuereau:{
    id:"hVuereau",
    name:"Bit ConIn",
    component:require("../component/h-vuereau.js"),
    icon:require("../res/zaifpay.png"),
    scheme:"h-vuereau"
  }
}
exports.get=extId=>{
  return extensions[extId]
}

exports.each=(fn)=>{
  for(let extName in extensions){
    if (extensions[extName]&&extensions[extName].id) {
      fn(extensions[extName])
    }
  }
}

exports.extStorage=(extId)=>({
  set:(key,data)=>storage.get("extData").then(d=>{
    if (!d) {
      d={}
    }
    if (!d[extId]) {
      d[extId]={}
    }
    d[extId][key]=data
    storage.set("extData",d)
  }),
  get:key=>storage.get("extData").then(d=>{
    if (!d) {
      return null
    }
    if (!d[extId]) {
      return null
    }
    return d[extId][key]
  })
})
