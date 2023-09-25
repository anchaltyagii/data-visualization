import React, { useEffect, useState } from "react";
import { calculateMean, calculateMedian, calculateMode } from "../../utility";
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
      const gamma2 = gamma.toFixed(3);
      return { ...item, Gamma: gamma2 };
    });

    const stats: { [key: string]: any } = {};

    newData.forEach((item: any) => {
      let { Alcohol, Gamma } = item;
      Gamma = Number(0.0 + Gamma);

      if (!stats[Alcohol]) {
        stats[Alcohol] = {
          gammaList: [] as number[],
        };
      }

      stats[Alcohol].gammaList.push(Gamma);
    });

    for (const alcoholClass in stats) {
      const classData = stats[alcoholClass];
      const { gammaList } = classData;

      // Calculate mean, median, and mode for Gamma
      const mean = calculateMean(gammaList);
      const median = calculateMedian(gammaList);
      const mode = calculateMode(gammaList);

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
      <h2>Gamma Statistics by Class</h2>
      <table>
        <thead>
          <tr>
            <th>Measures</th>
            {Object.keys(classStats).map((alcoholClass) => (
              <th
                key={alcoholClass}
                style={{ width: "200px" }}
              >{`Class ${alcoholClass}`}</th>
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
              <td key={alcoholClass}>{classStats[alcoholClass].mean}</td>
            ))}
          </tr>
          <tr>
            <td>
              <b>
                Gamma <br /> Median
              </b>
            </td>
            {Object.keys(classStats).map((alcoholClass) => (
              <td key={alcoholClass}>{classStats[alcoholClass].median}</td>
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
                {classStats[alcoholClass].mode.join(", ")}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Gamma;
