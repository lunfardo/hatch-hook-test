export const runExpensiveTaskAndGetValue = () => {
  const dumbArray = Array.from(Array(200000).keys());
  return dumbArray.reduce((acc, value) => acc + value, 0);
};
