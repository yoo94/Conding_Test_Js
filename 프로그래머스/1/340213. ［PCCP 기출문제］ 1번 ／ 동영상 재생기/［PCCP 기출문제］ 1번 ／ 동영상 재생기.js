function solution(video_len, pos, op_start, op_end, commands) {
  // toSec: "mm:ss" 형식 문자열을 초 단위 정수로 변환
  // 이유: 시/분/초를 분리해서 비교하면 경계 처리(예: 00:59, 01:00 등)에서 오류가 발생하기 쉬우므로
  //       모든 시간을 초로 통일하면 비교와 덧셈/뺄셈이 단순해짐.
  const toSec = t => {
    const [m, s] = t.split(':').map(Number); // "mm:ss"를 분과 초로 분리하여 숫자로 변환
    return m * 60 + s;                      // 분을 초로 환산하여 합산
  };

  // toMMSS: 초 단위 정수를 "mm:ss" 형식 문자열로 변환
  // 이유: 내부 연산은 초로 하지만 최종 출력은 문제 요구 형식인 "mm:ss"로 반환해야 하기 때문.
  const toMMSS = sec => {
    const m = String(Math.floor(sec / 60)).padStart(2, '0'); // 분 부분, 두 자리로 패딩
    const s = String(sec % 60).padStart(2, '0');            // 초 부분, 두 자리로 패딩
    return `${m}:${s}`;
  };

  // 입력 문자열들을 초 단위로 변환하여 변수에 저장
  // videoSec: 동영상 전체 길이(초)
  // opStart, opEnd: 오프닝 시작/끝(초)
  // current: 현재 재생 위치(초)
  const videoSec = toSec(video_len);
  const opStart = toSec(op_start);
  const opEnd = toSec(op_end);
  let current = toSec(pos);

  // 명령 처리 루프
  // 루프 내 처리 순서: (1) 오프닝 체크(현재 위치가 오프닝이면 건너뛰기)
  //                 (2) 명령 적용(next/prev)
  //                 (3) 범위 클램프(0 ~ videoSec)
  //                 (4) 명령 후 오프닝 재체크
  // 이유: 문제 설명에 따르면 오프닝 구간에 있으면 자동으로 op_end로 이동해야 하므로
  //       명령 적용 전후 모두 오프닝 여부를 확인해야 일관된 동작을 보장함.
  for (const order of commands) {
    // (1) 현재가 오프닝 구간이면 오프닝 끝으로 이동
    // 이유: 사용자가 오프닝 구간에 있을 때는 자동으로 오프닝 끝으로 이동해야 함.
    if (current >= opStart && current <= opEnd) current = opEnd;

    // (2) 명령 적용: next는 +10초, prev는 -10초
    // 이유: 문제에서 정의한 동작 그대로 구현.
    if (order === 'next') current += 10;
    else if (order === 'prev') current -= 10;

    // (3) 범위 클램프: 음수로 내려가면 0으로, 동영상 길이 초과하면 마지막 위치로 고정
    // 이유: prev로 0보다 작아질 수 있고 next로 동영상 길이를 넘길 수 있으므로 안전하게 제한.
    if (current < 0) current = 0;
    if (current > videoSec) current = videoSec;

    // (4) 명령 적용 후 다시 오프닝 구간인지 확인하고, 해당하면 opEnd로 이동
    // 이유: 명령 적용 결과가 오프닝 구간으로 들어갈 수 있으므로 재확인 필요.
    if (current >= opStart && current <= opEnd) current = opEnd;
  }

  // 최종 위치를 "mm:ss" 형식으로 반환
  return toMMSS(current);
}