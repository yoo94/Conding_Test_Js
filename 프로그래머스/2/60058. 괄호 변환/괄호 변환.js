function solution(p) {
    if(p.length < 1) return '';
    function isCorrect(u){
        let cnt = 0;
        for(const char of u){
            if(char === '(') cnt++;
            if(char === ')') cnt--;
            if(cnt< 0) return false;
        }
        return cnt === 0;
    }
    function splitUV(str){
        const s = str.split('')
        let idx = 0;
        let count = 0;
        for(; idx < s.length; idx++){
            if(s[idx] === ')') count++
            if(s[idx] === '(') count--
            if(count === 0) break;
        }
        const u = str.slice(0,idx + 1)
        const v = str.slice(idx + 1)
        
        return [u,v];
    }
    const [u,v] = splitUV(p);
    
    if(isCorrect(u)){
        return u + solution(v)
    }else{
        const value = u.slice(1,-1).split('').map((val)=>{
            return val ==='(' ? ')' : '('
        }).join('')
        return "("+solution(v)+")"+value
    }
    
}