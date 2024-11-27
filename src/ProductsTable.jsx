import React from "react";

const ProductsTable = ({ data }) => {
  // Ensure products is a valid array
  if (!data || !Array.isArray(data)) {
    return <p>No products to display.</p>;
  }

  return (
    <table border="1" width="100%" cellPadding="5">
      <thead>
        <tr>
          <th>Name</th>
          <th>Quantity</th>
          <th>Unit Price</th>
          <th>Tax</th>
          <th>Price with Tax</th>
          <th>Discount (Optional)</th>
        </tr>
      </thead>
      <tbody>
        {data.map((product, index) => (
          <tr key={index}>
            <td>{product.name || "N/A"}</td>
            <td>{product.quantity || "0"}</td>
            <td>{product.unitPrice || "0.00"}</td>
            <td>{product.tax || "0.00"}</td>
            <td>{product.priceWithTax || "0.00"}</td>
            <td>{product.discount || "N/A"}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProductsTable;
