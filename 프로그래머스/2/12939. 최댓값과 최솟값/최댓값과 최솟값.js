function solution(s) {
    const list = s.split(' ');
    console.log(list)
    var answer = Math.min(...list) + ' '+ Math.max(...list);
    return answer;
}