import React, { useEffect, useState } from "react";
import { calculateMean, calculateMedian, calculateMode } from "../../utility";
import "./style.css";

const Flavanoids: React.FC<{ data: any }> = ({ data }) => {
  const [classStats, setClassStats] = useState<{ [key: string]: any }>({});

  useEffect(() => {
    calculateFlavanoids();
  }, []);

  // function for calculating flavanoids values
  const calculateFlavanoids = () => {
    const stats: { [key: string]: any } = {};

    data?.forEach((item: any) => {
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

      // Calculate mean, median, and mode for Gamma
      const mean = calculateMean(flavanoidsList);
      const median = calculateMedian(flavanoidsList);
      const mode = calculateMode(
        flavanoidsList.filter((value: any) => !isNaN(value))
      );

      // Round the values to three decimal places
      stats[alcoholClass] = {
        mean: mean.toFixed(3),
        median: median.toFixed(3),
        mode: mode.map((value) => value.toFixed(3)),
      };
    }

    setClassStats(stats);
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
              <td key={alcoholClass}>{classStats[alcoholClass].mean}</td>
            ))}
          </tr>
          <tr>
            <td>
              <b>
                Flavanoids <br /> Median
              </b>
            </td>
            {Object.keys(classStats).map((alcoholClass) => (
              <td key={alcoholClass}>{classStats[alcoholClass].median}</td>
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
