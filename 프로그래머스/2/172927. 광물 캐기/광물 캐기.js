function solution(picks, minerals) {
    // 총 사용 가능한 곡괭이 수 (다이아, 철, 돌 총합)
    // 각 곡괭이당 최대 5개 광물 채굴 가능하므로 이 값만큼의 그룹만 처리하면 된다.
    const totalPicks = picks[0] + picks[1] + picks[2];

    // 1. 광물들을 5개씩 그룹으로 나누어, 각 그룹에 대해 (costIfDiamond, costIfIron, costIfStone)를 계산
    const groups = []; // 각 원소는 [costIfDiamond, costIfIron, costIfStone]

    // i는 그룹 시작 인덱스 (0, 5, 10, ...)
    for (let i = 0; i < minerals.length && groups.length < totalPicks; i += 5) {
        // 현재 그룹은 minerals[i .. i+4] (있으면) 까지
        const chunk = minerals.slice(i, i + 5);

        // 그룹 내 광물 종류 개수 세기
        let dCount = 0;
        let iCount = 0;
        let sCount = 0;
        for (const m of chunk) {
            if (m === "diamond") dCount++;
            else if (m === "iron") iCount++;
            else if (m === "stone") sCount++;
        }

        // 곡괭이별 피로도 계산 (문제의 표에 따른 값)
        // 다이아 곡괭이: 모든 광물에 대해 피로도 1
        const costIfDiamond = dCount + iCount + sCount;

        // 철 곡괭이: diamond -> 5, iron -> 1, stone -> 1
        const costIfIron = dCount * 5 + iCount * 1 + sCount * 1;

        // 돌 곡괭이: diamond -> 25, iron -> 5, stone -> 1
        const costIfStone = dCount * 25 + iCount * 5 + sCount * 1;

        // 그룹의 세 비용을 저장
        groups.push([costIfDiamond, costIfIron, costIfStone]);
    }

    // 2. '돌 곡괭이로 캘 때 비용'이 큰 그룹부터 처리하도록 정렬
    //    이유: 돌 곡괭이가 가장 비싸므로, 돌 곡괭이로 캤을 때 피해가 큰 그룹을
    //    우선적으로 좋은 곡괭이(다이아/철)로 커버하면 전체 피로를 줄일 수 있다.
    groups.sort((a, b) => b[2] - a[2]); // costIfStone 기준 내림차순

    // 3. 정렬된 그룹 순으로 사용 가능한 가장 좋은 곡괭이를 사용해 피로 누적
    let tired = 0;
    for (const [costD, costI, costS] of groups) {
        if (picks[0] > 0) {
            // 다이아 곡괭이 사용 가능하면 가장 좋으므로 사용
            tired += costD;
            picks[0]--; // 사용한 곡괭이 개수 차감
        } else if (picks[1] > 0) {
            // 다이아 없고 철 곡괭이 사용 가능
            tired += costI;
            picks[1]--;
        } else {
            // 다이아, 철 모두 없으면 돌 곡괭이만 사용
            tired += costS;
            picks[2]--;
        }
    }

    return tired;
}