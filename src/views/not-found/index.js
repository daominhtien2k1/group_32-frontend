import { Link as RouterLink } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Button, Typography, Container, Box } from '@mui/material';
import Illustration_404 from 'assets/illustrations/illustration_404.svg';
// ----------------------------------------------------------------------

const StyledContent = styled('div')(({ theme }) => ({
    maxWidth: 480,
    margin: 'auto',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    padding: theme.spacing(12, 0)
}));

// ----------------------------------------------------------------------

export default function Page404() {
    return (
        <>
            <Container>
                <StyledContent sx={{ textAlign: 'center', alignItems: 'center' }}>
                    <Typography variant="h3" paragraph>
                        Xin lỗi, page không tìm thấy
                    </Typography>

                    <Typography sx={{ color: 'text.secondary' }}>
                        Xin lỗi, chúng tôi không thể tìm thấy trang bạn đang tìm kiếm. Có lẽ bạn đã nhập sai URL? Hãy chắc chắn đường dẫn
                        bạn nhập đúng
                    </Typography>

                    <Box component="img" src={Illustration_404} sx={{ height: 260, mx: 'auto', my: { xs: 5, sm: 10 } }} />

                    <Button to="/" size="large" variant="contained" component={RouterLink}>
                        Trở về trang chủ
                    </Button>
                </StyledContent>
            </Container>
        </>
    );
}
