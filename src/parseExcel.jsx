import * as XLSX from "xlsx";


// Parse Excel file to extract structured data
export const parseExcel = (file, callback) => {
  const reader = new FileReader();

  reader.onload = (e) => {
    const data = new Uint8Array(e.target.result);
    const workbook = XLSX.read(data, { type: "array" });

    // Assume the first sheet contains the relevant data
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];

    // Convert the sheet data to JSON
    const rows = XLSX.utils.sheet_to_json(sheet, { header: 1 });

    if (!rows.length) {
      console.error("No data found in the sheet");
      callback(null, new Error("No data found in Excel file"));
      return;
    }

    // Map rows to structured data
    const structuredData = processExcelData(rows);
    callback(structuredData);
  };

  reader.onerror = (err) => {
    console.error("Error reading Excel file:", err);
    callback(null, err);
  };

  reader.readAsArrayBuffer(file);
};

// Process raw rows from Excel into structured data
const processExcelData = (rows) => {
  const headers = rows[0];
  const data = rows.slice(1).map((row) => {
    const entry = {};
    headers.forEach((header, index) => {
      entry[header] = row[index];
    });
    return entry;
  });

  // Ensure headers and data are processed as intended
  


  // Process data into Invoices, Products, and Customers
  const invoices = [];
  const products = [];
  const customers = [];

  data.forEach((row) => {
    // Ensure serialNumber exists in the row (it is already in the Excel file)
    if (row["Serial Number"]) {
      invoices.push({
        serialNumber: row["Serial Number"],  // Directly use the Serial Number from the file
        customerName: row["Party Name"],
        productName: row["Product Name"],
        quantity: row["Qty"],
        tax: row["Tax (%)"],
        totalAmount: row["Item Total Amount"],
        date: row["Invoice Date"],
      });
    }

    // Products tab extraction (check if "Product Name" exists in row)
    if (row["Product Name"]) {
      products.push({
        name: row["Product Name"],
        quantity: row["Qty"],
        unitPrice: row["Price with Tax"]/row["Qty"],
        tax: row["Tax (%)"],
        priceWithTax: row["Price with Tax"],
        Discount:row["Discount"],
      });
    }

    // Customers tab extraction (check if "Customer Name" exists in row)
    if (row["Party Name"]) {
      customers.push({
        customerName: row["Party Name"],
        phoneNumber: row["Phone Number"],
        totalPurchaseAmount: row["Item Total Amount"],
      });
    }
  });
    //console.log(invoices);
    //console.log(products);
    //console.log(customers);
  return { invoices, products, customers };
};
