import { useState, useRef, ChangeEvent, FormEvent, KeyboardEvent, useEffect } from "react";
import "../App.css";
import * as XLSX from "xlsx";
// import { BarcodeScanner } from "react-barcode-scanner";
// import { useSymbologyScanner } from "@use-symbology-scanner/react";
// import { saveAs } from "file-saver";
import axios from 'axios';
// import { UserContextProvider } from './UserContext';
import { Navigate, useNavigate } from 'react-router-dom'



function App() {
  // const {setProductDetails, productDetails} = useState(null);

  const [inputs, setInputs] = useState({
    hu_code: "",
    date: "",
    material: "",
    spaBatch: "",
    supplierBatch: "",
    qty: "",
    location: "",
    startWidth: "",
    middleWidth: "",
    endWidth: "",
    length: "",
    notes: "",
  });

  const [formHistory, setFormHistory] = useState<any[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [showBarcodeScanner, setShowBarcodeScanner] = useState(false);

  const huCodeInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(inputs);

    // Send form data to the backend
    try {
      await axios.post('http://localhost:5000/auth/product/v1/all-product-details', 
      inputs);
      alert('Form submitted successfully');
    } catch (error) {
      console.error('Error submitting form', error);
      alert('Failed to submit form');
    }

    // Generate and download Excel file only when the submit button is clicked
    convertToExcel();
  };

  const handleRefresh = () => {
    setInputs({
      hu_code: "",
      date: "",
      material: "",
      spaBatch: "",
      supplierBatch: "",
      qty: "",
      location: "",
      startWidth: "",
      middleWidth: "",
      endWidth: "",
      length: "",
      notes: "",
    });

    if (huCodeInputRef.current) {
      huCodeInputRef.current.focus();
    }
  };

  const handleShowBarcodeScanner = () => {
    setShowBarcodeScanner(!showBarcodeScanner);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLFormElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
    }
  };

  const convertToExcel = () => {
    const allFormData = [...formHistory, inputs];
    const data = allFormData.map((formData, index) => ({
      ...formData,
      seq: index + 1,
    }));

    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

    const wbout = XLSX.write(wb, { bookType: "xlsx", type: "binary" });
    const fileName = "form-data.xlsx";
    const blob = new Blob([s2ab(wbout)], { type: "application/octet-stream" });

    // saveAs(blob, fileName);
  };

  const s2ab = (s: string) => {
    const buf = new ArrayBuffer(s.length);
    const view = new Uint8Array(buf);
    for (let i = 0; i !== s.length; ++i) view[i] = s.charCodeAt(i) & 0xff;
    return buf;
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleOk = () => {
    setIsEditing(false);
  };

  const handleScan = (data: any) => {
    console.log(data);
  }

  const handleError = (err: any) => {
    console.error(err)
  }

  // const ref = useRef(null)

  // const handleSymbol = (symbol: any, matchedSymbologies: any) => {
  //       console.log(`Scanned ${symbol}`)
  // }

  // useSymbologyScanner(handleSymbol, { target: ref })

  const createProduct = (e: any) => {

    fetch('http://localhost:5000/auth/product/v1/create-product', {
      credentials: 'include',
    }).then(response => {
      response.json().then(data => {
        // setProductDetails(data);
        console.log(response)
      }).catch(error => {
        console.error('Error parsing JSON:', error);
      });
    }).catch(error => {
      console.error('Error fetching data:', error);
    });
  }

  const handleLogout = () => {
    // Clear authentication tokens or any user session data here
    // For example, localStorage.removeItem('authToken');
    console.log('User logged out');
    // Redirect to login page
    window.location.href = '/login';
  };

  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <>



      <header>
        <div className="app-header">
        <button className="login-button" onClick={handleLogin}>Login</button>
          <span className="title-text">Inventory Management</span>
          <button className="logout-button" onClick={handleLogout}>Logout</button>
        </div>
      </header>

      {showBarcodeScanner && (
        <div className="barcode-scanner-container">
          {/* <div ref={ref}>
          </div> */}
        </div>
      )}

      <form onSubmit={handleSubmit} onKeyDown={handleKeyDown}>
        <div>
         
          <input
            type="text"
            name="hu_code"
            value={inputs.hu_code}
            onChange={handleChange}
            placeholder="Hu code"
            ref={huCodeInputRef}
          />
          <div className="button-box">
            <button type="button" onClick={handleShowBarcodeScanner}>
              {showBarcodeScanner ? "Hide Scanner" : "Show Scanner"}
            </button>
            <button type="button" className="button1" onClick={handleRefresh}>
              Refresh
            </button>
          </div>
        </div>
        <div className="form-row">
          <input
            type="date"
            name="date"
            value={inputs.date}
            onChange={handleChange}
            placeholder="Date"
          />
          <input
            type="text"
            name="material"
            value={inputs.material}
            onChange={handleChange}
            placeholder="Material"
          />
          <input
            type="text"
            name="spaBatch"
            value={inputs.spaBatch}
            onChange={handleChange}
            placeholder="Spa Batch"
          />
          <input
            type="text"
            name="supplierBatch"
            value={inputs.supplierBatch}
            onChange={handleChange}
            placeholder="Supplier Batch"
          />
          <input
            type="text"
            name="qty"
            value={inputs.qty}
            onChange={handleChange}
            placeholder="Qty"
          />
          <input
            type="text"
            name="location"
            value={inputs.location}
            onChange={handleChange}
            placeholder="Location"
          />
        </div>
        <table className="width-table">
          <tbody>
            <tr>
              <th>Start Width</th>
              <td>
                <input
                  type="text"
                  name="startWidth"
                  value={inputs.startWidth}
                  onChange={handleChange}
                  placeholder="Start"
                  disabled={!isEditing}
                />
                <div className="ok-edit-group">
                <button type="button" onClick={handleOk}>OK</button>
          <button type="button" onClick={handleEdit}>Edit</button>
          
        </div>
              </td>
              
            </tr>
            <tr>
              <th>Middle Width</th>
              <td>
                <input
                  type="text"
                  name="middleWidth"
                  value={inputs.middleWidth}
                  onChange={handleChange}
                  placeholder="Middle"
                  disabled={!isEditing}
                />
                <div className="ok-edit-group">
                <button type="button" onClick={handleOk}>OK</button>
          <button type="button" onClick={handleEdit}>Edit</button>
          
        </div>
              </td>
            </tr>
            <tr>
              <th>End Width</th>
              <td>
                <input
                  type="text"
                  name="endWidth"
                  value={inputs.endWidth}
                  onChange={handleChange}
                  placeholder="End"
                  disabled={!isEditing}
                />
                <div className="ok-edit-group">
                <button type="button" onClick={handleOk}>OK</button>
          <button type="button" onClick={handleEdit}>Edit</button>
          
        </div>
              </td>
            </tr>
          </tbody>
        </table>
        
        <div>
          <input
            type="text"
            name="length"
            value={inputs.length}
            onChange={handleChange}
            placeholder="Length"
          />
          <textarea
            name="notes"
            value={inputs.notes}
            onChange={handleChange}
            placeholder="Notes"
          />
        </div>
        <button type="button" onClick={handleEdit}>Edit</button>
        <button type="submit">Submit</button>
        
      </form>
    </>
  );
}

export default App;
