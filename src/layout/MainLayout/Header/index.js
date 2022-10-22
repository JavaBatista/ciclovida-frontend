import PropTypes from 'prop-types';

// material-ui
import { useTheme } from '@mui/material/styles';
import { AppBar, IconButton, Toolbar, useMediaQuery } from '@mui/material';

// project import
import AppBarStyled from './AppBarStyled';
import HeaderContent from './HeaderContent';

// assets
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';

// ==============================|| MAIN LAYOUT - HEADER ||============================== //

const Header = () => {
    const theme = useTheme();

    const iconBackColor = 'grey.100';
    const iconBackColorOpen = 'grey.200';

    // common header
    const mainHeader = (
        <Toolbar>
            <HeaderContent />
        </Toolbar>
    );

    // app-bar params
    const appBar = {
        position: 'fixed',
        color: 'inherit',
        elevation: 0,
        sx: {
            borderBottom: `1px solid ${theme.palette.divider}`
            // boxShadow: theme.customShadows.z1
        }
    };

    return (
        <>
            {/* <AppBarStyled open={true} {...appBar}>
                {mainHeader}
            </AppBarStyled> */}
            <AppBar {...appBar}>{mainHeader}</AppBar>
        </>
    );
};

Header.propTypes = {
    open: PropTypes.bool,
    handleDrawerToggle: PropTypes.func
};

export default Header;
