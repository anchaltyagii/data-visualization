import React, { useEffect, useState } from "react";

const Flavanoids: React.FC<{ data: any }> = ({ data }) => {
  const [classStats, setClassStats] = useState<{ [key: string]: any }>({});

  useEffect(() => {
    calculateStats();
  }, []);

  const calculateStats = () => {
    const stats: { [key: string]: any } = {};

    data.forEach((item: any) => {
      let { Alcohol, Flavanoids } = item;
      Flavanoids = Number(0.0 + Flavanoids);

      if (!stats[Alcohol]) {
        stats[Alcohol] = {
          count: 0,
          totalFlavanoids: 0,
          flavanoidsList: [] as number[],
        };
      }

      stats[Alcohol].count++;
      stats[Alcohol].totalFlavanoids += Flavanoids;
      stats[Alcohol].flavanoidsList.push(Flavanoids);
    });

    for (const alcoholClass in stats) {
      const classData = stats[alcoholClass];
      const { count, totalFlavanoids, flavanoidsList } = classData;

      const mean = totalFlavanoids / count;

      const sortedFlavanoids = flavanoidsList
        .filter((value: any) => !isNaN(value)) // Filter out non-numeric values
        .sort((a: any, b: any) => a - b);
      const middleIndex = Math.floor(count / 2);
      const median =
        count % 2 === 0
          ? (sortedFlavanoids[middleIndex - 1] +
              sortedFlavanoids[middleIndex]) /
            2
          : sortedFlavanoids[middleIndex];

      const mode = calculateMode(
        flavanoidsList.filter((value: any) => !isNaN(value))
      );

      stats[alcoholClass] = {
        mean,
        median,
        mode,
      };
    }

    setClassStats(stats);
  };

  const calculateMode = (arr: number[]) => {
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

    let maxFrequency = 0;
    const modeValues: number[] = [];

    for (const value in countMap) {
      const frequency = countMap[value];

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

  return (
    <div className="table-wrapper">
      <h2>Flavanoids Statistics by Class</h2>
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
                Flavanoids <br /> Mean
              </b>
            </td>
            {Object.keys(classStats).map((alcoholClass) => (
              <td key={alcoholClass}>
                {classStats[alcoholClass].mean.toFixed(2)}
              </td>
            ))}
          </tr>
          <tr>
            <td>
              <b>
                Flavanoids <br /> Median
              </b>
            </td>
            {Object.keys(classStats).map((alcoholClass) => (
              <td key={alcoholClass}>
                {classStats[alcoholClass].median.toFixed(2)}
              </td>
            ))}
          </tr>
          <tr>
            <td>
              <b>
                Flavanoids <br /> Mode
              </b>
            </td>
            {Object.keys(classStats).map((alcoholClass) => (
              <td key={alcoholClass}>
                {classStats[alcoholClass].mode.join(", ")}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Flavanoids;
