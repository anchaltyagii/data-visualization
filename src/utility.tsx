export const calculateMean = (arr: number[]) => {
  const sum = arr.reduce((total, val) => total + val, 0);
  return sum / arr.length;
};

export const calculateMedian = (arr: number[]) => {
  const sortedArr = [...arr].sort((a, b) => a - b);
  const middleIndex = Math.floor(sortedArr.length / 2);
  if (sortedArr.length % 2 === 0) {
    return (sortedArr[middleIndex - 1] + sortedArr[middleIndex]) / 2;
  } else {
    return sortedArr[middleIndex];
  }
};

export const calculateMode = (arr: number[]) => {
  const countMap: { [key: number]: number } = {};
  arr.forEach((value) => {
    if (!isNaN(value)) {
      if (countMap[value]) {
        countMap[value]++;
      } else {
        countMap[value] = 1;
      }
    }
  });

  let maxFrequency: number = 0;
  const modeValues: number[] = [];

  for (const value in countMap) {
    const frequency: number = countMap[value];

    if (frequency > maxFrequency) {
      maxFrequency = frequency;
      modeValues.length = 0;
      modeValues.push(parseFloat(value));
    } else if (frequency === maxFrequency) {
      modeValues.push(parseFloat(value));
    }
  }

  return modeValues;
};