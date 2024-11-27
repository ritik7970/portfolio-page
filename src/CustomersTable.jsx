import React from "react";

const CustomersTable = ({ data }) => {
  // Ensure customers is a valid array
  if (!data || !Array.isArray(data)) {
    return <p>No customers to display.</p>;
  }

  return (
    <table border="1" width="100%" cellPadding="5">
      <thead>
        <tr>
          <th>Customer Name</th>
          <th>Phone Number</th>
          <th>Total Purchase Amount</th>
        </tr>
      </thead>
      <tbody>
        {data.map((customer, index) => (
          <tr key={index}>
            <td>{customer.customerName || "N/A"}</td>
            <td>{customer.phoneNumber || "N/A"}</td>
            <td>{customer.totalPurchaseAmount || "0.00"}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CustomersTable;
