import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Typography, Paper, Grid, Button, CircularProgress, Box } from "@mui/material";

export default function CarDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [headers, setHeaders] = useState<string[] | null>(null);
    const [carDetails, setCarDetails] = useState<Record<string, any> | null>(null);

    useEffect(() => {
        async function fetchCar() {
            try {
                const res = await fetch(`http://localhost:5000/api/data/${id}`);
                const carData = await res.json();
                setHeaders(carData.headers);
                setCarDetails(carData.data);
            } catch (error) {
                console.error("Failed to fetch car details:", error);
            }
        }

        if (id) {
            fetchCar();
        }
    }, [id]);

    if (!carDetails) {
        return (
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="80vh"
            >
                <CircularProgress />
            </Box>
        );
    }

    return (

            <div style={{backgroundColor:'ghostwhite', height:'100vh'}}>
                <Container maxWidth={false}  sx={{ pt: 11, maxWidth: 715 }}>
                    <Button variant="outlined" onClick={() => navigate("/")} sx={{ mb: 2, bgcolor: '#fff' }}>
                        ← Back
                    </Button>
                    <Paper elevation={3} sx={{ p: 4, borderRadius: '13px', backgroundColor:'#fff' }}>
                        <Typography variant="h4" gutterBottom>
                            Car Details
                        </Typography>
                        <Grid container spacing={5}>
                            {headers?.map((header) => (
                                <Grid key={header}>
                                    <Typography variant="subtitle2" color="text.secondary">
                                        {header}
                                    </Typography>
                                    <Typography variant="body1">
                                        {carDetails[header]}
                                    </Typography>
                                </Grid>
                            ))}
                        </Grid>
                    </Paper>
                </Container>
            </div>

    );
}
