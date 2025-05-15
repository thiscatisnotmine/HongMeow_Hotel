import { useEffect, useState } from "react";

export default function CustomerPage() {
  const [customers, setCustomers] = useState([]);
  const [query, setQuery] = useState("");
  const api = "#";

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const q = params.get("q") || "";
    setQuery(q);
    if (q) search(q);
  }, []);

  const search = async (q) => {
    try {
      const res = await fetch(`${api}/customer/${q}`);
      const data = await res.json();
      setCustomers(data);
    } catch (err) {
      console.error("Error fetching customers:", err);
    }
  };

  const handleSearch = () => {
    if (!query.trim()) return alert("Please enter search query");
    window.location.search = `?q=${encodeURIComponent(query)}`;
  };

  const handleDelete = async (cid) => {
    if (!confirm("Are you sure you want to delete this customer?")) return;
    try {
      const res = await fetch(`${api}/customer/${cid}`, { method: "DELETE" });
      if (res.ok) setCustomers((prev) => prev.filter((c) => c.CusCID !== cid));
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  return (
    <div className="main-content">
      <div className="tab-inside">
        <button
          className="choice choice-cus"
          onClick={() => (location.href = "/customer")}
        >
          Customer
        </button>
        <button className="choice" onClick={() => (location.href = "/pet")}>
          Pet
        </button>
      </div>

      <div className="headline">
        <h2>Customer Profiles</h2>
        <div className="search-form">
          <input
            type="text"
            placeholder="search"
            className="search-inputs"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button className="search-icon" onClick={handleSearch}>
            <span className="material-symbols-outlined">search</span>
          </button>
        </div>
      </div>

      <div className="table-wrapper">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>View more & Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((c) => (
              <tr key={c.CusCID}>
                <td>{c.CusCID}</td>
                <td>{`${c.CusFname} ${c.CusLname}`}</td>
                <td>
                  <button
                    className="blue-btn"
                    onClick={() =>
                      (location.href = `/customer/profile/edit?customerID=${c.CusCID}`)
                    }
                  >
                    View More
                  </button>
                </td>
                <td>
                  <button
                    className="red-btn"
                    onClick={() => handleDelete(c.CusCID)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
