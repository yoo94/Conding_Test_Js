function solution(k, d) {
  let answer = 0;
  const limit = d * d;
  for (let x = 0; x <= d; x += k) {
    const maxY = Math.floor(Math.sqrt(limit - x * x));
    answer += Math.floor(maxY / k) + 1;
  }
  return answer;
}