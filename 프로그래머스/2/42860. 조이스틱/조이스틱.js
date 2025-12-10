function solution(name) {
    let count = 0;
    let n = name.length;
    // 특수 케이스:  모든 문자가 A인 경우
    let hasNonA = false;
    for (let i = 0; i < n; i++) {
        if (name[i] !== 'A') {
            hasNonA = true;
            break;
        }
    }

    if (! hasNonA) {
        return 0;  // 모두 A면 0 반환
    }
    // 각 문자를 변경하는데 필요한 조작 횟수
    for (let i = 0; i < n; i++) {
        let char = name.charCodeAt(i) - 65;
        count += Math.min(char, 26 - char);
    }
    
    // 커서 이동의 최소 횟수
    let move = n - 1; // 처음부터 끝까지
    
    for (let i = 0; i < n; i++) {
        if (name[i] !== 'A') {
            // i번째부터 뒤로 연속된 A의 시작점 찾기
            let next = i + 1;
            while (next < n && name[next] === 'A') {
                next++;
            }
            if (next === n) {
                // i 이후가 모두 A인 경우
                move = Math.min(move, i);
            } else {
                move = Math.min(move, i + (n - next) + Math.min(i, n - next));
            }
            i = next - 1; // 다음 A가 아닌 부분으로 점프
        }
    }
    
    count += move;
    return count;
}