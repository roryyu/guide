function Person(nickname){
    console.log('Person Function')
    const fns={...this.__proto__}
    const _chain=new Promise((resolve)=>{
        resolve({nickname})
    });
    Object.keys(fns).forEach(key => {
        _chain.__proto__[key]=fns[key]
    });
    _chain.__proto__.nickname=nickname;
    return _chain;
}
Person.prototype.f1=function(){
    return this.then((that)=>{
        console.log('f1 says :'+that.nickname);
        return that;
    })
}
Person.prototype.f2=function(){
    console.log('f2 says :'+this.nickname);
    return this;
}
Person.prototype.f3=function(){
    return this.then((that)=>{        
        return new Promise((resolve)=>{
            console.log('f3 says :'+that.nickname);
            resolve(that)
        });
    })
}
let p=new Person('Rory')
p.f1().f2().f1().f1().f3().f1().f2()
