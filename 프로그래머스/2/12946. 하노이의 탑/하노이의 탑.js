function solution(n) {
  const answer = [];

  function move(num, from, to, via) {
    if (num === 1) {
      // 원판 1개면 바로 옮긴다
      answer.push([from, to]);
    } else {
      // 1단계: 작은 원판들을 보조 기둥으로
      move(num - 1, from, via, to);
      // 2단계: 가장 큰 원판을 목표 기둥으로
      answer.push([from, to]);
      // 3단계: 작은 원판들을 목표 기둥으로
      move(num - 1, via, to, from);
    }
  }

  move(n, 1, 3, 2); // n개를 1번에서 3번으로 옮기기 시작
  return answer;
}