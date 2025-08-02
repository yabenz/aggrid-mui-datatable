import { AgGridReact } from 'ag-grid-react';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import Papa from 'papaparse';

ModuleRegistry.registerModules([AllCommunityModule]);


import './App.css'
import { useState, useEffect, useRef } from 'react'

const CustomButtonComp = props => {

  function handleDeleteClick () {
    if (props.onDelete) {
      props.onDelete(props.node.rowIndex);
    }
  };

  return (
    <div>
      {props.node.rowIndex}
      <button>View</button>
      <button onClick={handleDeleteClick}>Delete</button>
    </div>
  );
};


function App() {

  const [rowData, setRowData] = useState([
    { make: "Renaut", model: "Model Y", price: 64950, electric: true },
    { make: "Ford", model: "F-Series", price: 33850, electric: false },
    { make: "Toyota", model: "Corolla", price: 29600, electric: false },
  ]);

  const [colDefs, setColDefs] = useState([
    { field: "make" },
    { field: "model" },
    { field: "price" },
    { field: "electric" }
  ]);


  const [csvData, setCsvData] = useState([]);
  const [rows, setRows] = useState([]);
  const rowDataRef = useRef(rowData);



  // Keeps track of the current rowData passed to handleDelete
  useEffect(() => {
    rowDataRef.current = rowData;
  }, [rowData]);

function handleDelete(rowIndex: number) {
  const updatedData = rowDataRef.current.filter((_, index) => index !== rowIndex);

  // console.log('rowData', rowDataRef.current)
  console.log('updatedData', updatedData)

  setRowData(updatedData);
}


  useEffect(() => {

    async function fetchData() {

      const response = await fetch('/data/ElectricCarData.csv')
      const file = await response.text()

      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: function (results) {

          setRowData(results.data);
          console.log('results.data ',results.data)

          let csvHeaders = Object.keys(results.data[0])

          // Adds Action column
          csvHeaders.push('Actions')

          // Converts the array of Header data to the Object format expected by Ag Grid Headers
          let aggHeaders = []
          for (let h of csvHeaders) {

            if(h === 'Actions'){
              aggHeaders.push({
                field: h,
                cellRenderer: CustomButtonComp,
                pinned: 'right',
                cellRendererParams: {
                  onDelete: handleDelete,
                }
              });
            }else{
              aggHeaders.push({ field: h })
            }
          }

          setColDefs(aggHeaders);
          // console.log('aggheaders ',aggHeaders)

        },
      });
    }

    fetchData()

  }, [])

  return (
    <div className='main-container'>
      <h1>AG Grid + MUI</h1>
      <div style={{ height: 500 }}>
        <AgGridReact rowData={rowData} columnDefs={colDefs} />
      </div>
    </div>
  )
}

export default App;