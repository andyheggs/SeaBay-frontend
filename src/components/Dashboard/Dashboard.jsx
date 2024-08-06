//---------------------------------------------React Imports-----------------------------------------------// 
import { useContext } from 'react';


//-------------------------------------------Component Imports---------------------------------------------//
import { AuthedUserContext } from '../../App'

//--------------------------------------------Service Imports----------------------------------------------//

 

const Dashboard = () => {
    
    const user = useContext(AuthedUserContext)

    return (
        <main>
            <h1>Welcom to your Dashboard {user.username}</h1>

        </main>
    );

    
};    















//------------------------------------------------Exports--------------------------------------------------//

export default Dashboard;






