import React, {useContext} from 'react'
import './../styles/ViewSnippets.css';
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-github";
import Highlight from 'react-highlight.js';
import Chip from '@material-ui/core/Chip';
import {connect} from 'react-redux';
import moment from 'moment';
import { useLocation } from 'react-router-dom'
import Loader from './Loader';
import {firestoreConnect} from 'react-redux-firebase';
import { compose } from 'redux';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

function ViewSnippets (props) {

    const query = useQuery();   
    const id = query.get('id');
    

    const language = 'javascript';
    const content = 'var three = 1 + 2; // This is a comment';

    
    const {snippets} = props;
    console.log('snippets', snippets);
    const snippetx = snippets && snippets.filter(snips => {
        // if(snips.id == id) return snips;
        return snips.id.includes(id);
    })

    const snippet = snippetx && snippetx[0]
    
    
    console.log('snippet', snippet);
    
    
    return (
        <div className="viewsnippet">
            
            {snippet ? 
                 <React.Fragment>
            <div className="viewsnippet__header">
                <div className="viewsnippet__title">{snippet.title} <span>{snippet?.privacy}</span></div>   
                <div className="viewsnippets__controls">
                    
                    <div className="a2a_kit a2a_kit_size_32 a2a_default_style">
                    <a className="a2a_dd" href="https://www.addtoany.com/share"></a>
                    <a className="a2a_button_facebook"></a>
                    <a className="a2a_button_twitter"></a>
                    <a className="a2a_button_email"></a>
                    </div>                   
                    

                    <a className="btn-snippet-action" href="#" ><img width="20" src="https://app.snipsave.com/static/media/icon-link.04884b60.svg" alt="Link"/></a>
                    <a className="btn-snippet-action" href="#" ><img width="15" src="https://app.snipsave.com/static/media/icon-pencil.42065722.svg" alt="Link"/></a>
                    <a className="btn-snippet-action" href="#" ><img width="20" src="https://app.snipsave.com/static/media/icon-embed.1bf0fcae.svg" alt="Link"/></a>
                    <a className="btn-snippet-action" href="#" ><img width="15" src="https://app.snipsave.com/static/media/icon-trash.c5a2bf40.svg" alt="Link"/></a>
                </div>
            </div>            
            <div className="viewsnippet__secondaryHeader">
                <div className="viewsnippet__dateCreated">Language: {snippet?.language} Created: {moment(snippet?.createAt.toDate()).calendar()} </div>
                <div className="viewsnippet__tags">Tags 
                <Chip label={snippet?.tags} /> 
                </div>
            </div>
            
            <div className="addsnippet__rowSingle">
                <Highlight language={snippet?.language}>
                {snippet?.content}
                </Highlight>            
            </div>
            </React.Fragment>
            : <Loader/>}            
            
        </div>
    )
}

const mapStateToProps = (state) => {
    console.log('state',state)
    return {        
        auth: state.firebase.auth,        
        snippets: state.firestore.ordered.snippets,        
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect(props => 
        
        [
        {                       
            collection: 'snippets'         
        }
        ]
        ))(ViewSnippets)
