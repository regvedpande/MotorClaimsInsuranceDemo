export const groupBy = (items, key) => Object.entries(items.reduce((acc, item) => ({ ...acc, [item[key]]: (acc[item[key]] || 0) + 1 }), {})).map(([name, value]) => ({ name, value }));

export const sumBy = (items, key) => items.reduce((sum, item) => sum + Number(item[key] || 0), 0);

export const byRegion = (claims) => ['Mumbai', 'Pune', 'Delhi', 'Bangalore'].map((region) => {
  const list = claims.filter((claim) => claim.region === region);
  return {
    region,
    active: list.filter((claim) => !['Settled', 'Rejected'].includes(claim.status)).length,
    settled: list.filter((claim) => claim.status === 'Settled').length,
    rejected: list.filter((claim) => claim.status === 'Rejected').length,
    settlement: sumBy(list, 'netPayable'),
    avgTat: Math.round(list.reduce((sum, c) => sum + c.ageingDays, 0) / Math.max(list.length, 1))
  };
});
