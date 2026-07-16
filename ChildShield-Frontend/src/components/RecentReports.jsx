function RecentReports({ reports }) {

    return (

        <div className="card shadow mt-4"
        style={{
            borderRadius:"20px",
        
        
        }}
        >

            <div className="card-header"
            style={{
background:"#4E8F90",
color:"white",
borderTopLeftRadius:"20px",
borderTopRightRadius:"20px"
}}
            
            >

                <h5 className="mb-0"
                style={{
                    marginBottom:0,
                    fontWeight:"700",
                    

                }}
                
                >
                    📋 Recent Safety Reports
                </h5>

            </div>

            <div className="card-body">

                {

                    reports.length === 0 ?

                    (

                        <p className="text-muted">
                            No reports available.
                        </p>

                    )

                    :

                    (

                        <table className="table table-hover align-middle">

                            <thead>

                                <tr>

                                    <th>Title</th>
                                    <th>Category</th>
                                    <th>Status</th>

                                </tr>

                            </thead>

                            <tbody>

                                {

                                    reports.map((report)=>(

                                        <tr key={report._id}>

                                            <td>
                                                {report.title}
                                            </td>

                                            <td>
                                                {report.category}
                                            </td>

                                           <td>

<span
className="badge"
style={{
background:
report.status==="Resolved"
?"#78B7B5"
:
report.status==="Pending"
?"#D6AF5C"
:
"#4E8F90",
padding:"8px 14px",
borderRadius:"20px"
}}
>

{report.status}

</span>

</td>

                                        </tr>

                                    ))

                                }

                            </tbody>

                        </table>

                    )

                }

            </div>

        </div>

    );

}

export default RecentReports;