import { setInvoices, setProducts, setCustomers } from "./dataSlice"; // Adjust the import path
import { parseExcel } from "./parseExcel"; // Import your Excel parsing function
import { parsePDF } from "./parsePDF"; // Define or import a PDF parsing function
import { parseImage } from "./parseImage"; // Define or import an image parsing function

const handleFile = (file, dispatch) => {
  if (!file) {
    alert("No file selected. Please upload a valid file.");
    return;
  }

  const fileType = file.type;
  const fileName = file.name;
  const fileExtension = fileName.split(".").pop().toLowerCase();

  // Validate and process the file based on its type
  if (fileType.includes("excel") || fileType.includes("spreadsheet") || ["xls", "xlsx"].includes(fileExtension)) {
    parseExcel(file, (data, error) => {
      if (error) {
        console.error("Error parsing Excel file:", error);
        alert("Failed to parse Excel file. Please check the file format.");
        return;
      }
      console.log(data.invoices)
      dispatch(setInvoices(data.invoices));
      dispatch(setProducts(data.products));
      dispatch(setCustomers(data.customers));
      alert("Excel file uploaded and data processed successfully.");
    });
  } else if (fileType.includes("pdf") || fileExtension === "pdf") {
    
    parsePDF(file, (data, error) => {
      console.log("hi")
      if (error) {
        console.error("Error parsing pdf file:", error);
        alert("Failed to parse pdf file. Please check the file format.");
        return;
      }
      console.log(data.invoices)
      dispatch(setInvoices(data.invoices));
      dispatch(setProducts(data.products));
      dispatch(setCustomers(data.customers));
      alert("pdf file uploaded and data processed successfully.");
    });
  }
   else if (fileType.includes("image") || ["png", "jpg", "jpeg"].includes(fileExtension)) {
    parseImage(file, (data, error) => {
      if (error) {
        console.error("Error parsing image file:", error);
        alert("Failed to parse image file. Please check the file format.");
        return;
      }
      dispatch(setInvoices(data.invoices));
      dispatch(setProducts(data.products));
      dispatch(setCustomers(data.customers));
      // Dispatch parsed image data to Redux (implement as needed)
      alert("Image file uploaded and data processed successfully.");
    });
  } else {
    alert("Unsupported file type. Please upload an Excel, PDF, or Image file.");
  }
};

export default handleFile;
