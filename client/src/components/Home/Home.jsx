import React from 'react';
//import Spinner from "../../components/Spinner/spinner";

function Home(props){
    
    return(
        <div>
                {props.name  ? "Vanga nanba " + props.name : "Not authorised"} 
        </div>
    );
}

export default Home;