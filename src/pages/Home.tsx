
import { useNavigate } from 'react-router-dom';
import { Button, Box, Typography } from '@mui/material';
import DataGrid from '../components/DataGrid'


export default function Home() {

    const navigate = useNavigate();

    return (
        <Box sx={{ p: 5, bgcolor: 'ghostwhite', height: '90vh' }}>

            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Typography variant="h1" sx={{ fontSize: '3rem', pb: 5 }}>Ag-Grid + MUI</Typography>
            </Box>

            <DataGrid />

            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'end' }}>
                <Button variant="outlined" onClick={() => navigate("/csv-data-grid")} sx={{ m: 1, bgcolor: '#fff' }}>
                    CSV Test →
                </Button>
            </Box>
        </Box>
    );


}