import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useSelector } from "react-redux";

const DeployedEmployee = () => {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Deployed Security Guard of Orion",
        color: "black",
      },
    },
  };

  const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const [monthData, setMonthData] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);

  const data = {
    labels,
    datasets: [
      {
        label: "No. Of Guards",
        data: monthData,
        borderColor: "#98BCCE",
        backgroundColor: "#96BACC",
      },
    ],
  };

  const checkDeployedMonth = (employee) => {
    const deployedMonth = employee.date_hired.split("-")[1];
    return deployedMonth;
  };

  const employeesData = useSelector((state) => state.employees.employeesData);

  useEffect(() => {
    const deployedEmployees = employeesData.filter(
      (employee) => employee.isEmployeeDeployed === true
    );

    deployedEmployees.forEach((employee) => {
      const deployedMonth = checkDeployedMonth(employee);

      setMonthData((prevMonthData) => {
        prevMonthData[deployedMonth - 1] += 1;
        return prevMonthData;
      });
    });
  }, [employeesData]);

  return (
    <div className="max-w-[500px] pb-20 mt-8">
      <Line options={options} data={data} />
    </div>
  );
};

export default DeployedEmployee;
