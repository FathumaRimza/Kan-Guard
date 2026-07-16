import {
Chart as ChartJS,
CategoryScale,
LinearScale,
BarElement,
Title,
Tooltip,
Legend
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(
CategoryScale,
LinearScale,
BarElement,
Title,
Tooltip,
Legend
);

function DashboardCharts({stats}){

const data={

labels:[
"Users",
"Children",
"Reports",
"Alerts",
"Missing"
],

datasets:[
{
label:"ChildShield Statistics",
data:[
stats.totalUsers,
stats.totalChildren,
stats.totalReports,
stats.totalAlerts,
stats.missingChildren
]
}
]

};

return(

<div className="card shadow mt-4 p-4"
style={{
    background:"#FFFFFF",
    borderRadius:"20px"
}}

>

<h4 className="mb-3"
style={{
    color:"#4E8F90",
    fontWeight:"700"
}}
>
📊 System Statistics
</h4>

<Bar data={data}/>

</div>

);

}

export default DashboardCharts;