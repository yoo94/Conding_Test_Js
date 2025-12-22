function solution(number, k) {
    const stack = [];
    let removeCount = k;
    
    for (const num of number) {
        // 현재 숫자가 스택의 top보다 크면 제거
        while (removeCount > 0 && stack.length > 0 && stack[stack.length - 1] < num) {
            stack. pop();
            removeCount--;
        }
        stack.push(num);
    }
    
    // 아직 제거할 개수가 남았으면 뒤에서 제거
    stack.splice(stack.length - removeCount, removeCount);
    
    return stack.join('');
}