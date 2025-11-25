function solution(players, callings) {
    const pos = new Map();
    players.forEach((player, idx) => pos.set(player, idx));

    for (const call of callings) {
        const idx = pos.get(call); //call한사람 인덱스
        if (idx > 0) {
            const frontPlayer = players[idx - 1]; //call한사람 앞에사람
            [players[idx - 1], players[idx]] = [players[idx], players[idx - 1]]; // 구조분해할당
            pos.set(call, idx - 1);
            pos.set(frontPlayer, idx);
        }
    }
    return players;
}