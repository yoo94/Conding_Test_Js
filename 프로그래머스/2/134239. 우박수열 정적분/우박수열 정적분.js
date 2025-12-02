function solution(k, ranges) {
    var width = [];
    var answer = [];
    const hailVal = hailstone(k);
    for(let i=0; i < hailVal.length -1; i++){
        let addVal = hailVal[i]  < hailVal[i+1] ? hailVal[i] : hailVal[i+1] 
        width.push(addVal+(Math.abs(hailVal[i] - hailVal[i+1])/2))
    }
    for(const [x,y] of ranges){
        let sum = 0
        if(x <= width.length+y){
            const sliceArray = width.slice(x,width.length+y);
            for(const value of sliceArray){
                sum += value
            }  
        }else{
            sum = -1
        }
        answer.push(sum)
    }
    return answer;
}
function hailstone(k){
    const rturnVal = [];
    while(k > 1){
        rturnVal.push(k);
        if(k % 2 === 0) k = k/2;
        else k = k * 3 + 1;
    }
    rturnVal.push(1)
    return rturnVal;
}