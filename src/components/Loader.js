import React from 'react';
import './../styles/Loader.css';
import { WaveLoading } from 'react-loadingg';
function Loader() {
    return (
        <div className="loader">
            <WaveLoading className="loader__wave" />
       </div> 
)
}
export default Loader
