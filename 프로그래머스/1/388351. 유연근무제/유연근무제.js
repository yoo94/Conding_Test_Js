function solution(schedules, timelogs, startday) {
    let result = 0; // 상품을 받을 직원 수를 저장할 변수
    const n = schedules.length; // 직원수
    for (let i = 0; i < n; i++) {
        const schedule = schedules[i]; // i번째 직원의 출근 희망 시각 (예: 930 → 9시 30분)
        // 출근 인정 시각 계산: 희망 시각 + 10분
        let hour = Math.floor(schedule / 100); // 시(hour) 부분 추출
        let minute = schedule % 100 + 10; // 분(minute)에 10분 추가
        // 분이 60 이상이면 시를 1 증가시키고 분에서 60을 뺌
        if (minute >= 60) {
            hour += 1;
            minute -= 60;
        }
        const validTime = hour * 100 + minute; // 최종 출근 인정 시각 (예: 9시 40분 → 940)
        let isLate = false; // 지각 여부 플래그
        for (let j = 0; j < 7; j++) {
            let day = startday + j; // 이벤트 시작일부터 j일 후의 요일 계산 (1~7)
            if (day > 7) day -= 7; // 요일이 7(일요일)을 넘으면 다시 1부터 시작
            if (day === 6 || day === 7) continue; // 토요일(6), 일요일(7)은 이벤트 제외
            const time = timelogs[i][j]; // i번째 직원의 j일차 출근 시각
            if (time > validTime) { // 출근 인정 시각보다 늦게 출근했는지 확인
                isLate = true; // 지각 처리
                break; // 한 번이라도 지각하면 더 이상 확인할 필요 없음
            }
        }
        if (!isLate) result++; // 일주일 동안 지각하지 않았다면 상품 대상자
    }
    return result; // 상품을 받을 직원 수 반환
}