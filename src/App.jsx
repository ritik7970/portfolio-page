import React, { useState } from "react";
import FileUpload from "./FileUpload";
import { parseExcel } from "./parseExcel";
import { parsePDF } from "./parsePDF";
import { parseImage } from "./parseImage";
import { useSelector } from "react-redux";
import Tabs from "./Tabs";
import InvoicesTable from "./InvoicesTable";
import ProductsTable from "./ProductsTable";
import CustomersTable from "./CustomersTable";

const App = () => {
  const [parsedData, setParsedData] = useState({
    invoices: [],
    products: [],
    customers: [],
  });
  const { invoices, products, customers } = useSelector((state) => state.data);
  const handleFile = (file) => {
    const fileType = file.type;

    if (fileType.includes("excel") || fileType.includes("spreadsheet")) {
      // Parse Excel
      parseExcel(file, (data) => {
        console.log("Excel Data:", data);
        setParsedData((prev) => ({ ...prev, invoices: data }));
      });
    } else if (fileType.includes("pdf")) {
      // Parse PDF
      parsePDF(file, (data) => {
        console.log("PDF Data:", data);
        // Update parsedData state with extracted data
      });
    } else if (fileType.includes("image")) {
      // Parse Image
      parseImage(file, (data) => {
        console.log("Image Data:", data);
        // Update parsedData state with extracted data
      });
    } else {
      alert("Unsupported file type. Please upload an Excel, PDF, or Image file.");
    }
  };
  const handleFileUpload = (file) => {
    parsePDF(file, (data, error) => {
      if (error) {
        console.error("Error extracting data from PDF:", error);
      } else {
        console.log("Extracted Data:", data);
      }
    });
  };
  return (
    <div>
      <h1>Automated Data Extraction</h1>
      <FileUpload handleFile={handleFile} />
      <h1>Automated Data Extraction and Invoice Management</h1>
      <Tabs >
      </Tabs>
      <pre>{JSON.stringify(parsedData, null, 2)}</pre>
    </div>
  );
};

export default App;
