function solution(picks, minerals) {
  const groups = getGroup(minerals);

  const maxGroupsCanMine = picks[0] + picks[1] + picks[2];

  const usableGroups = groups.slice(0, maxGroupsCanMine);

  const groupsWithCost = usableGroups.map(group => {
    const diamondCost = group.reduce((sum, m) => sum + getTired('diamond', m), 0);
    const ironCost = group.reduce((sum, m) => sum + getTired('iron', m), 0);
    const stoneCost = group.reduce((sum, m) => sum + getTired('stone', m), 0);
    return { minerals: group, diamondCost, ironCost, stoneCost };
  });

  groupsWithCost.sort((a, b) => b.stoneCost - a.stoneCost);

  let totalTired = 0;

  for (let i = 0; i < groupsWithCost.length; i++) {
    const g = groupsWithCost[i];
    if (picks[0] > 0) {
      totalTired += g.diamondCost;
      picks[0]--;
    } else if (picks[1] > 0) {
      totalTired += g.ironCost;
      picks[1]--;
    } else if (picks[2] > 0) {
      totalTired += g.stoneCost;
      picks[2]--;
    } else {
      break;
    }
  }

  return totalTired;
}

function getTired(pick, mineral) {
  if (pick === 'diamond') {
    return 1;
  }
  if (pick === 'iron') {
    if (mineral === 'diamond') return 5;
    return 1;
  }
  if (pick === 'stone') {
    if (mineral === 'diamond') return 25;
    if (mineral === 'iron') return 5;
    return 1;
  }
  return 0;
}

function getGroup(minerals) {
  return minerals.reduce((acc, item, index) => {
    if (index % 5 === 0) {
      acc.push([]);
    }
    acc[acc.length - 1].push(item);
    return acc;
  }, []);
}
