import { configureStore } from "@reduxjs/toolkit";
import dataReducer from "./dataSlice";
import { useDispatch } from "react-redux";
import { setInvoices } from "./redux";
import { parseExcel } from "./parseExcel";
const store = configureStore({
  reducer: {
   
    data: dataReducer,
  },
});
const handleFileUpload = (file) => {
  // Parse Excel file and get invoices data
  parseExcelFile(file).then((parsedData) => {
    // Dispatch the data to Redux store
    dispatch(setInvoices(parsedData));
  });
};
export default store;
