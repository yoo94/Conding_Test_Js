function solution(p) {
  if (p === "") return "";

  function isCorrect(s) {
    let cnt = 0;
    for (let ch of s) {
      if (ch === "(") cnt++;
      else cnt--;
      if (cnt < 0) return false;
    }
    return cnt === 0;
  }

  function splitUV(s) {
    let cnt = 0;
    let idx = 0;
    for (; idx < s.length; idx++) {
      if (s[idx] === "(") cnt++;
      else cnt--;
      if (cnt === 0) break;
    }
    const u = s.slice(0, idx + 1);
    const v = s.slice(idx + 1);
    return [u, v];
  }

  const [u, v] = splitUV(p);
  if (isCorrect(u)) {
    return u + solution(v);
  } else {
    const inner = solution(v);
    const flipped = u
      .slice(1, -1)
      .split("")
      .map((c) => (c === "(" ? ")" : "("))
      .join("");
    return "(" + inner + ")" + flipped;
  }
}