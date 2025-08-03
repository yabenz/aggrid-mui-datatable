import { AgGridReact } from 'ag-grid-react';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import { useNavigate } from 'react-router-dom';
import { Button, TextField, Box, Typography } from '@mui/material';
import type { ColDef } from 'ag-grid-community';
import Papa from 'papaparse';

ModuleRegistry.registerModules([AllCommunityModule]);

import { useState, useEffect, useRef } from 'react'

// Custon Ag Grid Buttons 'View' and 'Delete'
const CustomButtonComp = props => {

    function handleViewClick() {
        if (props.onView) {
            // props.onView(props.node.data.id);
        }
    };

    function handleDeleteClick() {
        if (props.onDelete) {
            // props.onDelete(props.node.data.id);
        }
    };


    return (
        <div>
            <Button onClick={handleViewClick} size='small' variant="contained" sx={{ fontSize: '0.65rem', padding: '2px 6px', minWidth: 'auto', margin: '0 5px 0 0' }}>
                View</Button>
            <Button onClick={handleDeleteClick} size='small' variant="outlined" sx={{ fontSize: '0.65rem', padding: '2px 6px', minWidth: 'auto' }}>
                Delete</Button>
        </div>
    );
};


export default function CSVDataGrid() {
    const [rowData, setRowData] = useState([
        { id: 1, make: "Renaut", model: "Model Y", price: 64950, electric: true },
        { id: 2, make: "Ford", model: "F-Series", price: 33850, electric: false },
        { id: 3, make: "Toyota", model: "Corolla", price: 29600, electric: false },
    ]);

    const [colDefs, setColDefs]  = useState<ColDef[]>([
        { field: "id" },
        { field: "make" },
        { field: "model" },
        { field: "price" },
        { field: "electric" }
    ]);


    const rowDataRef = useRef(rowData);
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [filterField, setFilterField] = useState('id');
    const [filterOperator, setFilterOperator] = useState('contains');
    const [filterValue, setFilterValue] = useState('');



    // Keeps track of the current rowData passed to handleDelete
    useEffect(() => {
        rowDataRef.current = rowData;
    }, [rowData]);

    function handleView(rowID: number) {
        navigate(`/cars/${rowID}`);

    }

    async function handleDelete(rowID: number) {

        try {
            const response = await fetch(`http://localhost:5000/api/data/${rowID}`, {
                method: 'DELETE',
            });

            const result = await response.json();

            if (result.success) {
                alert('Car deleted successfully');
                fetchData()
            } else {
                alert('Failed to delete');
            }
        } catch (error) {
            console.error('Error deleting car:', error);
        }
    };


    async function fetchData() {
    try {
        const response = await fetch('/data/ElectricCarData.csv');
        const file = await response.text();

        Papa.parse(file, {
            header: true,
            skipEmptyLines: true,
            complete: function (results) {
                setRowData(results.data);

                const headers = Object.keys(results.data[0] || {});
                headers.push('Actions'); // Add Actions column

                const aggHeaders = headers.map(h =>
                    h === 'Actions'
                        ? {
                            field: h,
                            cellRenderer: CustomButtonComp,
                            cellRendererParams: {
                                onDelete: handleDelete,
                                onView: handleView,
                            },
                        }
                        : { field: h }
                );
                setColDefs(aggHeaders);
            },
        });
    } catch (error) {
        console.error('Error fetching or parsing CSV:', error);
    }
}



    // Fetch initial daba from DB
    useEffect(() => {
        fetchData()
    }, [])


    function handleSearch() {
        const filtered = rowDataRef.current.filter((row) =>
            Object.values(row).some((val) =>
                String(val).toLowerCase().includes(searchTerm.toLowerCase())
            )
        );
        setRowData(filtered);
    }

    function applyFilter() {
        const filter = {
            field: filterField,
            operator: filterOperator,
            value: filterOperator === 'is_empty' ? '' : filterValue,
        };
        fetchData(filter);
    }


    return (
        <Box sx={{ p: 5, bgcolor: 'ghostwhite', height: '90vh' }}>


            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Typography variant="h1" sx={{ fontSize: '3rem', pb: 5 }}>
                    <Button variant="outlined" onClick={() => navigate("/")} sx={{ m: 2, bgcolor: '#fff' }}>
                        ← Back
                    </Button>
                    Test CSV
                </Typography>
            </Box>

            <Box sx={{ mb: 2, display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
                {/* Search Form */}
                <form onSubmit={(e) => { e.preventDefault(); handleSearch(); }} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <TextField
                        label="Search"
                        variant="outlined"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        size="small"
                        sx={{ minWidth: 120 }}
                    />
                    <Button type="submit" variant="contained" >
                        Search
                    </Button>
                    <Button onClick={() => { setSearchTerm(''); setFilterValue(''); fetchData(); }} variant="outlined" >
                        Reset
                    </Button>
                </form>


            </Box>


            {/* === Your existing AgGridReact === */}
            <div className="main-container" style={{ height: 470, width: '100%' }}>
                <AgGridReact
                    rowData={rowData}
                    columnDefs={colDefs}
                    defaultColDef={{ maxWidth: 130 }}
                    pagination={true}
                    paginationPageSize={9}
                />
            </div>
            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'end' }}>
                <Button variant="outlined" onClick={() => navigate("/")} sx={{ m: 1, bgcolor: '#fff' }}>
                    ← Back
                </Button>
            </Box>
        </Box>
    );


}