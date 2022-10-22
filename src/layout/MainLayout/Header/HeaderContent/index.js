// material-ui
import { Box } from '@mui/material';

// project import
import Profile from './Profile';

// ==============================|| HEADER - CONTENT ||============================== //

const HeaderContent = () => {
    return (
        <>
            {/* O Box existe para manter o espaçamento. Mantem o perfil a direita */}
            <Box sx={{ width: '100%', ml: { xs: 0, md: 1 } }} />
            <Profile />
        </>
    );
};

export default HeaderContent;
