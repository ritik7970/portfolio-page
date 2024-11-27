import React, { useState } from "react";
import { useSelector } from "react-redux";
import InvoicesTable from "./InvoicesTable";
import ProductsTable from "./ProductsTable";
import CustomersTable from "./CustomersTable";
import { store } from "./redux";

const Tabs = () => {
  const [activeTab, setActiveTab] = useState("invoices");

  // Fetch data directly from Redux store
  const invoices = useSelector((state) => state.data.invoices);
  console.log(invoices)
  const products = useSelector((state) => state.data.products);
  const customers = useSelector((state) => state.data.customers);
    
  // Render the active tab content
  const renderActiveTab = () => {
    switch (activeTab) {
      case "invoices":
        return <InvoicesTable data={invoices} />;
      case "products":
        return <ProductsTable data={products} />;
      case "customers":
        return <CustomersTable data={customers} />;
      default:
        return <InvoicesTable data={invoices} />;
    }
  };

  return (
    <div>
      {/* Tab Buttons */}
      <div className="tabs">
        <button
          onClick={() => setActiveTab("invoices")}
          className={activeTab === "invoices" ? "active" : ""}
        >
          Invoices
        </button>
        <button
          onClick={() => setActiveTab("products")}
          className={activeTab === "products" ? "active" : ""}
        >
          Products
        </button>
        <button
          onClick={() => setActiveTab("customers")}
          className={activeTab === "customers" ? "active" : ""}
        >
          Customers
        </button>
      </div>

      {/* Display active tab content */}
      <div className="tab-content">{renderActiveTab()}</div>
    </div>
  );
};

export default Tabs;
