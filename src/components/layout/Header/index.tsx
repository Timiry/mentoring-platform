import { AppBar, Toolbar, Button, Box, Link } from '@mui/material';

//import LogoImage from "../../ui/Logo";

const Header = ({ isAuthenticated }: { isAuthenticated: boolean }) => {
  isAuthenticated = true;
    return (
        <AppBar position="fixed" sx={{ backgroundColor: '#FFFFFF' }}>
            <Toolbar>
                <Box sx={{ flexGrow: 1 }}>
                    <Link href="/" sx={{ textDecoration: 'none',  color: 'button.primary'}}>
                        <img src='/logo.png' width='50px' style={{ paddingTop: '4px' }} />
                        <img src='/logo_text.png' height='50px' style={{ paddingTop: '4px' }} />
                    </Link>
                </Box>
                {isAuthenticated ? (
                    <Box>
                        <Button sx={{ color: 'button.primary'}} href="/catalog">Каталог</Button>
                        <Button sx={{ color: 'button.primary'}} href="/messenger">Мессенджер</Button>
                        <Button sx={{ color: 'button.primary'}} href="/profile">Профиль</Button>
                        <Button sx={{ color: 'button.primary'}} href="/become-mentor">Стать ментором</Button>
                    </Box>
                ) : (
                    <Box>
                        <Button href="/login">Вход</Button>
                        <Button href="/register">Регистрация</Button>
                    </Box>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default Header;