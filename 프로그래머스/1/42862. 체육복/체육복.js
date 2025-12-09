function solution(n, lost, reserve) {
    var answer = 0;
    // 여벌이있는데 도둑맞은 놈들 제거.
    let fileteredReserve = reserve.filter((val)=>{
        return !lost.includes(val)
    })
    let fileteredLost = lost.filter((val)=>{
        return !reserve.includes(val)
    })
    fileteredLost.sort((a,b)=>{return a-b})
    fileteredReserve.sort((a,b)=>{return a-b})
    for(const fReserve of fileteredReserve){
        console.log(fReserve)
        if(fReserve - 1 > 0 && fileteredLost.indexOf(fReserve - 1) > -1){
            console.log("도와줄사람=",fReserve)
            console.log("받은사람=",fReserve-1)
            fileteredLost.splice(fileteredLost.indexOf(fReserve-1),1)
            console.log("남은도움받을사람=",fileteredLost)
        }
        else if(fReserve < n && fileteredLost.indexOf(fReserve + 1) > -1){
            console.log("-도와줄사람=",fReserve)
            console.log("-받은사람=",fReserve+1)
            fileteredLost.splice(fileteredLost.indexOf(fReserve+1),1)
            console.log("-남은도움받을사람=",fileteredLost)
        }
        if(fileteredLost.length === 0) return n;
    }
    
    return n-fileteredLost.length;
}