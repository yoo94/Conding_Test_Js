function solution(data, col, row_begin, row_end) {
    let bit = []
    let answer = 0;
    col--
    data.sort((a,b)=>{
        if(a[col] === b[col]) return b[0] - a[0]
        return a[col] - b[col]
    })
    
    data.forEach((tuple,idx)=>{
        let count = 0;
        let num = idx + 1;
        if(num <=row_end   && num >= row_begin ){
            for(const value of tuple){
              count += value % num
             }
         bit.push(count);
        }
    })
    console.log(bit)
    for(let i = 0; i < bit.length; i++){
        if( i === 0){
            answer = bit[i]
        }
        else{
            answer ^= bit[i]
        }
        console.log(answer)
    }
    return answer;
}