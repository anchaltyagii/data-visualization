import React, { useEffect, useState } from "react";
import "./style.css";

const Gamma: React.FC<{ data: any }> = ({ data }) => {
  const [classStats, setClassStats] = useState<{ [key: string]: any }>({});

  useEffect(() => {
    calculateGamma();
  }, []);

  // function for calculating gamma values
  const calculateGamma = () => {
    const newData = data.map((item: any) => {
      const { Ash, Hue, Magnesium } = item;
      const gamma: number = (Ash * Hue) / Magnesium;
      return { ...item, Gamma: gamma };
    });

    const stats: {
      [key: string]: { mean: number; median: number; mode: number[] };
    } = {};

    newData.forEach((item: any) => {
      const { Alcohol, Gamma } = item;

      if (!stats[Alcohol]) {
        stats[Alcohol] = {
          mean: 0,
          median: 0,
          mode: [],
        };
      }

      stats[Alcohol].mode.push(Gamma);
    });

    for (const alcoholClass in stats) {
      const classData = stats[alcoholClass];
      const { mode } = classData;

      // Calculate mean, median, and mode for Gamma
      const mean: number = calculateMean(mode);
      const median: number = calculateMedian(mode);
      const modeValues: number[] = calculateMode(mode);

      stats[alcoholClass] = {
        mean,
        median,
        mode: modeValues,
      };
    }

    setClassStats(stats);
  };

  const calculateMean = (arr: number[]): number => {
    const sum: number = arr.reduce((total, val) => total + val, 0);
    return sum / arr.length;
  };

  const calculateMedian = (arr: number[]): number => {
    const sortedArr: number[] = [...arr].sort((a, b) => a - b);
    const middleIndex: number = Math.floor(sortedArr.length / 2);
    if (sortedArr.length % 2 === 0) {
      return (sortedArr[middleIndex - 1] + sortedArr[middleIndex]) / 2;
    } else {
      return sortedArr[middleIndex];
    }
  };

  const calculateMode = (arr: number[]): any => {
    const countMap: { [key: number]: number } = {};
    arr.forEach((value) => {
      if (countMap[value]) {
        countMap[value]++;
      } else {
        countMap[value] = 1;
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
    if (modeValues.length === arr.length) {
      return null;
    } else {
      return modeValues;
    }
  };

  return (
    <div className="table-wrapper">
      <h2>Gamma Statistics by class</h2>
      <table>
        <thead>
          <tr>
            <th>Measures</th>
            {Object.keys(classStats).map((alcoholClass) => (
              <th key={alcoholClass}>{`Class ${alcoholClass}`}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <b>
                Gamma <br /> Mean
              </b>
            </td>
            {Object.keys(classStats).map((alcoholClass) => (
              <td key={alcoholClass}>
                {classStats[alcoholClass].mean.toFixed(3)}
              </td>
            ))}
          </tr>
          <tr>
            <td>
              <b>
                Gamma <br /> Median
              </b>
            </td>
            {Object.keys(classStats).map((alcoholClass) => (
              <td key={alcoholClass}>
                {classStats[alcoholClass].median.toFixed(3)}
              </td>
            ))}
          </tr>
          <tr>
            <td>
              <b>
                Gamma <br /> Mode
              </b>
            </td>
            {Object.keys(classStats).map((alcoholClass) => (
              <td key={alcoholClass}>
                {classStats[alcoholClass].mode === null ? (
                  <span>NA</span>
                ) : (
                  <span>{classStats[alcoholClass].mode.join(", ")}</span>
                )}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Gamma;
