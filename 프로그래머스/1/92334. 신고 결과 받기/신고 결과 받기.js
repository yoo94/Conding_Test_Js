function solution(id_list, report, k) {
    const result = [];
    const list = new Map();
    const email_list = new Map();
    id_list.forEach((val,idx)=>{
        list.set(val,{count:0,who:[]})
    }) 
    id_list.forEach((val,idx)=>{
        email_list.set(val,0)
    })    
    for(const fromTo of report){
       const sp = fromTo.split(' ')
       if(!list.get(sp[1]).who.includes(sp[0])){
           list.get(sp[1]).count = list.get(sp[1]).count + 1
           list.get(sp[1]).who.push(sp[0])
       }
    }
    for(const value of list){
        if(value[1].count >= k){
            for(const who of value[1].who){
                email_list.set(who,email_list.get(who) + 1)
            }
        }
    }
    console.log(email_list)
    for(const email of email_list){
        result.push(email[1])
    }
    return result;
}