function solution(A,B){
    let answer = 0;
    let AA = A.sort((a,b)=>{ return a-b })
    let BB = B.sort((a,b)=>{ return b-a })
    return AA.reduce((sum, a, i) => sum + a * BB[i], 0);

}