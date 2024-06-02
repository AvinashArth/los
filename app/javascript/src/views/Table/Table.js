import React from "react";

const TableComponent = ({ data }) => {
  // Extract data from the provided JSON
  const { partner } = data;
  const lenders = partner && partner.lenders ? partner.lenders : {};
  const lenderNames = Object.keys(lenders);

  return (
    <div className="table-responsive">
      {/* <h2>Partner Details</h2> */}
      <table className="table table-text-small mb-0">
        <thead className="thead-primary table-sorting">
          <tr>
            <th>S.No.</th>
            <th>Lender</th>
            <th>Total Sent</th>
            <th>Approved</th>
            <th>Disbursed</th>
            <th>Rejected</th>
          </tr>
        </thead>
        <tbody>
          {lenderNames.map((lenderName,i) => (
            <tr key={lenderName}>
               <td>{i+1}</td>  
              <td>{lenderName}</td>
              <td>{lenders[lenderName].total_sent}</td>
              <td>{lenders[lenderName].approved}</td>
              <td>{lenders[lenderName].disbursed}</td>
              <td>{lenders[lenderName].rejected}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableComponent;
