import Tesseract from "tesseract.js";

export const parseImage = (file, callback) => {
  Tesseract.recognize(file, "eng", {
    logger: (m) => console.log(m), // Log progress (optional)
  })
    .then(({ data: { text } }) => {
      const processedData = processImageData(text);
      callback(processedData, null); // Pass structured data back
    })
    .catch((err) => {
      console.error("Error parsing image: ", err);
      callback(null, err); // Pass the error back
    });
};

// Function to process raw text into structured data
const processImageData = (text) => {
  // Split text into lines for easier processing
  const lines = text.split("\n").map((line) => line.trim()).filter((line) => line);
   console.log(lines)
  const invoices = [];
  const products = [];
  const customers = [];

  let invoiceData = {};
  let customerData = {};
  let currentProduct = null;

  lines.forEach((line) => {
    // Extract invoice details
    if (line.includes("BILL NO.")) {
      invoiceData.serialNumber = line.split("BILL NO.")[1]?.trim();
    }
    if (line.includes("DATE:")) {
      invoiceData.date = line.split("DATE:")[1]?.trim();
    }
    if (line.includes("TOTAL AMOUNT:")) {
      invoiceData.totalAmount = line.split("TOTAL AMOUNT:")[1]?.replace(/[^0-9.,]/g, "").trim();
      customerData.totalPurchaseAmount = line.split("TOTAL AMOUNT:")[1]?.replace(/[^0-9.,]/g, "").trim();
    }

    // Extract customer details
    if (line.includes("NAVE")) {
      customerData.customerName = line.split("NAVE:")[1]?.trim();
      invoiceData.customerName = line.split("NAVE:")[1]?.trim();
    }
    if (line.includes("MOBILE")) {
      customerData.phoneNumber = line.split("es) MOBILE: ")[1]?.trim();
    }

    // Extract product details
    if (/\d+\.\d+\s+\d+/.test(line)) {
      // Match product lines like: "iPHONE 16 1.0 79990.00 69183.35"
      const parts = line.split(/\s+/);
      currentProduct = {
        name: parts[0], // Assuming first part is product name
        quantity: parseFloat(parts[1]),
        price: parseFloat(parts[2]),
        amount: parseFloat(parts[3]),
      };
    }

    // Handling discounts for products
    if (line.includes("Disc(") && currentProduct) {
      const discount = parseFloat(line.match(/Disc\((\d+)%\)/)?.[1] || "0");
      currentProduct.discount = discount;
      products.push(currentProduct); // Save product with discount
      currentProduct = null; // Reset
    }
  });

  invoices.push(invoiceData); // Add invoice data
  customers.push(customerData); // Add customer data

  return { invoices, products, customers };
};

// Utility function to extract values based on a keyword
const extractValue = (line, keyword) => {
  const regex = new RegExp(`${keyword}\\s*:\\s*(.+)`, "i");
  const match = line.match(regex);
  return match ? match[1].trim() : null;
};
