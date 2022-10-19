import { useRoutes } from 'react-router-dom';
import { useSelector } from 'react-redux';

// project import
import LoginRoutes from './LoginRoutes';
import MainRoutes from './MainRoutes';

// ==============================|| ROUTING RENDER ||============================== //

export default function ThemeRoutes() {
    
    const isLoggedIn = useSelector((state) => state.session.isLoggedIn);
    // console.log(isLoggedIn);

    return useRoutes([LoginRoutes, MainRoutes(isLoggedIn) ]);
}
