import React from 'react';

function Home(props){
    
    return(
        <div>
                {props.name ? "Vanga nanba "+ props.name.toUpperCase() : "Authorised aagala"}
        </div>
    );
}

export default Home;