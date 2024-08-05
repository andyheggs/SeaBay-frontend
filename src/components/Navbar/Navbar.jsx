//---------------------------------------------React Imports-----------------------------------------------// 
import { useContext } from 'react';
import { Link } from 'react-router-dom';

//-------------------------------------------Component Imports---------------------------------------------//
import { AuthedUserContext } from '../../App';

//--------------------------------------------Service Imports----------------------------------------------//

const Navbar = (props) => {
    
    const user = useContext(AuthedUserContext)

    return (
        <main>
            <h1>Welcome to your Navbar</h1>
            <p>{user.username}</p>
        </main>
    );

    
};    















//------------------------------------------------Exports--------------------------------------------------//

export default Navbar;