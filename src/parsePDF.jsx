import { getDocument, GlobalWorkerOptions } from "pdfjs-dist";

// Set the worker source to the correct public path
GlobalWorkerOptions.workerSrc = "/pdf.worker.js";

export const parsePDF = (file, callback) => {
  if (!file || file.type !== "application/pdf") {
    alert("Please upload a valid PDF file.");
    return;
  }

  const reader = new FileReader();

  reader.onload = async (e) => {
    try {
      const arrayBuffer = e.target.result;
      const loadingTask = getDocument({ data: arrayBuffer });
      const pdfDocument = await loadingTask.promise;

      const numPages = pdfDocument.numPages;
      console.log(`PDF Loaded: ${numPages} pages`);

      let extractedText = "";

      // Iterate through all pages
      for (let pageNum = 1; pageNum <= numPages; pageNum++) {
        const page = await pdfDocument.getPage(pageNum);
        const textContent = await page.getTextContent();
        const pageText = textContent.items.map((item) => item.str).join(" ");
        extractedText += pageText + "\n";
      }

      // Process extracted text into structured data
      const processedData = processPDFData(extractedText);
     
      // Return the processed data via the callback
      callback(processedData, null);
    } catch (error) {
      console.error("Error processing PDF file:", error);
      callback(null, error); // Pass the error back
    }
  };

  reader.onerror = (err) => {
    console.error("File reading error:", err);
    callback(null, err);
  };

  reader.readAsArrayBuffer(file);
};

// Function to process raw extracted text into structured data
const processPDFData = (text) => {
  const lines = text.split("\n").map((line) => line.trim()).filter((line) => line);
    //console.log(lines)
  const invoices = [];
  const products = [];
  const customers = [];

  let invoiceData = {};
  let customerData = {};
  let currentProduct = {};

  lines.forEach((line,index) => {
    // Extract invoice details
   
    if (line.includes(" Invoice   #:  ")) {
      invoiceData.serialNumber = line.split(" Invoice   #:  ")[1]?.trim().slice(0, 11);
    }
    if (line.includes("Invoice   Date:")) {
      invoiceData.date = line.split("Invoice   Date:")[1]?.trim().slice(0, 13);
    }
    if (line.includes("Total Amount due:   ")) {
      invoiceData.totalAmount = line.split("Total Amount due:   ")[1].slice(0, 13);
      customerData.totalPurchaseAmount = line.split("Total Amount due:   ")[1].slice(0, 13);
    }

    // Extract customer details
    if (line.includes("Consignee")) {
      customerData.customerName = line.split("Consignee: ")[1]?.trim().split(" ")[0];
      invoiceData.customerName = customerData.customerName;
    }
    if (line.includes("Ph")) {
      customerData.phoneNumber = line.split("Ph:")[1]?.trim().split(" ")[0];
    }
    if (line.includes("Sl   Description   Rate/Item   Quantity   Taxable Value   GST   Amount")) {
      const abc = line.split("Sl   Description   Rate/Item   Quantity   Taxable Value   GST   Amount")[1]?.trim().split("Total Items / Qty")[0];
      //console.log("Extracted Products Section:", abc);
      
      // Split the extracted string into individual product lines
      const productLines = abc.split("  ");  // Use multiple spaces as delimiter
      //console.log("gfgvdf")
      //console.log(productLines)
      const products = [];
  
      // Regular expression to match product lines like:
      // "1 GEMS CHOCLATE POUCH 4.7619 1000.000 4761.90 238.10 (5%) 5000.00"
      const productRegex = /^(\d+)\s+([A-Za-z0-9\s]+?)\s+([\d.,]+)\s+([\d.,]+)\s+([\d.,]+)\s+\((\d+)%\)\s+([\d.,]+)/;
      console.log(productRegex)
      // Loop through each product line
      productLines.forEach((productLine,index) => {
        if(!isNaN(parseFloat(productLine)) && parseInt(productLine) <= 9){
          console.log("gfghfc")
          console.log(productLine)
        }
      });
       //console.log("z")
      //console.log(products); // You can now use the products array, e.g., dispatch to Redux
  }
  
    
    // Extract product details (match product rows with specific format)
    // if (/^\d+\s+\w+/.test(line)) {
    //   // Match product lines like: "1 GEMS CHOCLATE POUCH 4.7619 1,000.000 4,761.90 238.10 (5%) 5,000.00"
    //   const productParts = line.split(/\s{2,}/); // Split by two or more spaces for consistent parsing
    //   console.log(productParts)
    //   if (productParts.length >= 6) {
    //     const [sl, description, rate, quantity, taxableValue, gstWithPercent, amount] = productParts;
    //     const gstMatch = gstWithPercent.match(/([\d.,]+)\s*\((\d+)%\)/); // Match "238.10 (5%)"

    //     products.push({
    //       sl: sl.trim(),
    //       name: description.trim(),
    //       rate: parseFloat(rate.replace(/,/g, "")),
    //       quantity: parseFloat(quantity.replace(/,/g, "")),
    //       taxableValue: parseFloat(taxableValue.replace(/,/g, "")),
    //       gst: gstMatch ? parseFloat(gstMatch[1].replace(/,/g, "")) : 0,
    //       gstPercent: gstMatch ? parseFloat(gstMatch[2]) : 0,
    //       total: parseFloat(amount.replace(/,/g, "")),
    //     });
    //   }
    // }
  });
 // console.log(products)
  // Push invoice and customer data at the end of parsing
  invoices.push(invoiceData);
  customers.push(customerData);

  return { invoices, products, customers };
};
