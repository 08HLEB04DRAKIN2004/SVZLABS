import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';

function Footer() {
    return (
        <Box component="footer" sx={{ bgcolor: '#333', py: 6, color: '#fff' }}>
            <Container maxWidth="lg">
                <Grid container spacing={4} justifyContent="space-between">
                    <Grid item xs={12} sm={4}>
                        <Typography variant="h6">
                            Учёт допуска к опасным работам
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Typography variant="body1">
                            Телефон: +375 (29) 123-45-67
                        </Typography>
                        <Typography variant="body1">
                            Email: example@example.com
                        </Typography>
                        <Typography variant="body1">
                            Рабочее время: Пн-Пт 9:00 - 17:00
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Typography variant="body1">
                            Адрес: ул. Опасная, 123, Место, Страна
                        </Typography>
                        <Link href="https://github.com/example" target="_blank" rel="noopener">
                            GitHub
                        </Link>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}

export default Footer;
