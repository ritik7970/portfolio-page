import React from "react";

const InvoicesTable = ({ data }) => {
  // Ensure data is a valid array
  if (!data || !Array.isArray(data)) {
    return <p>No invoices to display.</p>;
  }

  return (
    <table border="1" width="100%" cellPadding="5">
      <thead>
        <tr>
          <th>Serial Number</th>
          <th>Customer Name</th>
          <th>Product Name</th>
          <th>Quantity</th>
          <th>Tax</th>
          <th>Total Amount</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        {data.map((invoice, index) => (
          <tr key={index}>
            {/* Ensure each field accesses the correct property */}
            <td>{invoice.serialNumber || "N/A"}</td>
            <td>{invoice.customerName || "N/A"}</td>
            <td>{invoice.productName || "N/A"}</td>
            <td>{invoice.qty || "0"}</td>
            <td>{invoice.tax || "0"}</td>
            <td>{invoice.totalAmount || "0.00"}</td>
            <td>{invoice.date || "N/A"}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default InvoicesTable;
