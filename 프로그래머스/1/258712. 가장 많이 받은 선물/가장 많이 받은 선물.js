function solution(friends, gifts) {
    const n = friends.length;
    const idx = {};
    for (let i = 0; i < n; i++) idx[friends[i]] = i;
    console.log(idx)
    
    // 이름 별 인덱스
    const cnt = Array.from({ length: n }, () => Array(n).fill(0));
    // 인덱스별 선물 한
    const given = Array(n).fill(0);
    // 인덱스별 선물 받음
    const received = Array(n).fill(0);
    // 선물 지수
    const giftIndex = Array(n).fill(0);
    
    for (const g of gifts) {
        // "A B"
        const [a, b] = g.split(' ');
        const i = idx[a], j = idx[b];
        cnt[i][j] += 1;
        given[i] += 1;
        received[j] += 1;
    }
    console.log(cnt)
    console.log(given)
    console.log(received)
    for (let i = 0; i < n; i++) giftIndex[i] = given[i] - received[i];
    console.log(giftIndex)
    
    const nextReceive = Array(n).fill(0);

    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
          if (cnt[i][j] > cnt[j][i]) {
            // i가 j에게 더 많이 줬으므로 다음 달엔 i가 j로부터 1개 받음
            nextReceive[i] += 1;
          } else if (cnt[j][i] > cnt[i][j]) {
            nextReceive[j] += 1;
          } else {
            // 서로 준 수가 같하거나 주고받은 기록이 전혀 없는 경우
            if (giftIndex[i] > giftIndex[j]) nextReceive[i] += 1;
            else if (giftIndex[j] > giftIndex[i]) nextReceive[j] += 1;
            // 같으면 아무도 받지 않음
          }
        }
      }

      return Math.max(...nextReceive);
}
