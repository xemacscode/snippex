import React, {useContext} from 'react'
import './../styles/Snippets.css';
import AddSnippet from './AddSnippet';
import { useLocation } from 'react-router-dom'


// add snippets

import Welcome from './Welcome';
import ViewSnippets from './ViewSnippets';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

function Snippets() {   
    
    const query = useQuery();    

    return (
        <div className="snippets">
            {(function() {
                switch (query.get('page')) {
                case 'new':
                    return <AddSnippet/>;
                case 'home':
                    return <Welcome/>;
                case 'view':
                    return <ViewSnippets/>;
                default:
                    return <Welcome/>;
                }
            })()}
            {/* Welcome - display this if empty */}
            {/* <Welcome/> */}
            {/* Add Snippets */}            
            {/* View Snippets */}            
            {/* Edit */}
        </div>
    )
}

export default Snippets;
