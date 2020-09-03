import React, {useState, useEffect, setState, Component} from 'react';
import './../styles/Sidebar.css';
import {Avatar, IconButton} from '@material-ui/core';
import {connect} from 'react-redux';
import {signOut} from '../actions/authActions';
// import DonutLargeIcon from '@material-ui/icons/DonutLarge';
// import ChatIcon from '@material-ui/icons/Chat';
// import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchOutlined from '@material-ui/icons/Search'
import ResultItem from './ResultItem';

import { Link } from 'react-router-dom'
import {Redirect} from 'react-router-dom';
import { compose } from 'redux';
import {firestoreConnect} from 'react-redux-firebase';
import { createFolder } from '../actions/folderActions';
import { deepOrange, deepPurple } from '@material-ui/core/colors';
import { withStyles } from '@material-ui/core/styles';
import { lang } from 'moment';

class Sidebar extends Component{

    // const [snippets, setSnippets] = useContext(SnippetContext);    
    // const [snippetsPartial, setSnippetsPartial] = useState([]);    
    // const [page, setPage] = useContext(SnippetContext);    

    state = {
        toggle: false,
        foldername: '',
        search: null
    }

    componentDidMount(){
        const { snippets} = this.props;
        this.setState({ snipps: snippets });
    }

    handleNameChange =(e) => {
        this.setState({
            foldername: e.target.value
        })
    }

    handleSearch = (e) => {
        this.setState({
            search: e.target.value
        })
    }

    handleFormSubmit = (e) => {
        e.preventDefault();
        // alert(folderName);

        this.props.createFolder(this.state.foldername);

        //setFolderName('');
        //setToggle(!toggle);
        this.setState({
            toggle: false
        })
    }

    toggleForm =() => {
        //setToggle(!toggle);
        this.setState({
            toggle: !this.state.toggle
        })
    }  
    
    
    
    // let filteredSnippets = snippets.filter(v => {                        
    //     return v.data.title.toLowerCase().includes(keyword);            
    // });

    handleClick = () => {
        console.log(this.props);
        this.props.signOut();
    }
    
    handleFolderClick = (e) => {                      
        if(e.fn != undefined){
            this.setState({search: e.fn});    
        }     
    }    
    

    render() {
        
        const {authError, auth, snippets, folders} = this.props;        

        if(!auth.uid) return <Redirect to="/signin"></Redirect>
        const ints = this.props.profile.initials;
        

        const items = snippets?.filter((data) => {
            if(this.state.search == null)
                return data
            else if(data.folder?.toLowerCase().includes(this.state.search.toLowerCase()) || data.title?.toLowerCase().includes(this.state.search?.toLowerCase()) || data.language?.toLowerCase().includes(this.state.search?.toLowerCase()) || data.tags?.toLowerCase().includes(this.state.search?.toLowerCase()))
                return data
        }).map(data => {
            return (
                <ResultItem key={data?.id} id={data?.id} name={data?.title} language={data?.language} folder={data?.folder} />
            )
        })

        let langs = [...new Set(snippets?.map(item => item.language))]
        let tags = [...new Set(snippets?.map(item => item.tags))]


        return (        
        <div className="sidebar">
            <div className="sidebar__first">
                <div className="sidebar__header">
                    <Avatar  className="sidebar__avatar"  alt="avatar">{ints?.toUpperCase()}</Avatar>
                    <div className="sidebar__headerRight">
                    <Link to="/snippex">
                        <h2>Snippex</h2>         
                        </Link>
                    </div>
                </div>
                <div className="sidebar__options">
                    <Link to="/snippex?page=new">
                    <button className="sidebar__optionsNew">New Snippet</button>
                    </Link>
                </div>
                <div className="sidebar__snippets">
    <h5>All Snippets <span className="sidebar__snippetsCount">{snippets?.length}</span></h5>
                </div>
                <form onSubmit={this.handleFormSubmit}>
                <div className="sidebar__folders">
                    <h5>Folders 
                        {!this.state.toggle ? 
                        <span onClick={this.toggleForm} className="sidebar__foldersAdd">+ Add</span> :
                        <span onClick={this.toggleForm} className="sidebar__foldersAdd">x Close </span>
                        }
                    </h5>
                    {this.state.toggle == true &&
                        <div className="sidebar__foldersForm">
                            
                            <input id="inputSaveFolder"  onChange={this.handleNameChange} type="text"/>                             
                            <button id="btnSaveFolder" type="submit">Save</button>
                            
                        </div>
                    }
                    <div className="sidebar__foldersAll">
                    {
                        folders && folders.map(folder => {             
                            let fn = folder.name;               
                            return <h4 onClick={() => this.handleFolderClick({fn})} key={folder.id}>{folder.name}</h4>                            
                        })
                    }
                    </div>
                </div>
                </form>
                <h5 className="sidebar__mainTabs">Languages <span className="sidebar__snippetsCount">{langs?.length}</span></h5>
                <div className="sidebar__languages">
                    
                    {
                        langs && langs.map(lang => {
                            let fn = lang;               
                            return <h4 onClick={() => this.handleFolderClick({fn})} >{lang}</h4>                            
                        })
                    }
                </div>
                <h5  className="sidebar__mainTabs">Tags <span className="sidebar__snippetsCount">{tags?.length}</span></h5>
                <div className="sidebar__languages">
                    
                    {
                        tags && tags.map(tag => {
                            let fn = tag;               
                            return <h4 onClick={() => this.handleFolderClick({fn})} >{tag}</h4>                            
                        })
                    }
                </div>
                <div>
                <div className="sidebar__menus">
                    <a onClick={this.handleClick} >Logout</a> 
                </div>
            </div>
            </div>
            <div className="sidebar__second">
                <div className="sidebar__searchContainer">
                    <div className="sidebar__search">
                        <SearchOutlined />
                        <input onChange={this.handleSearch}  placeholder="Search snippet" type="text"/>
                    </div>
                </div>
                <div className="sidebar__resultContainer">                    
                {items}                  
                </div>
                
            </div>
           
        </div>
    )
                }
}

const mapStateToProps = (state) => {
    console.log('state',state)
    return {        
        auth: state.firebase.auth,
        profile: state.firebase.profile,
        snippets: state.firestore.ordered.snippets,
        folders: state.firestore.ordered.folders
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        signOut: () => dispatch(signOut()),
        createFolder: (folder) => dispatch(createFolder(folder))
    }
}
export default compose(connect(mapStateToProps,mapDispatchToProps), firestoreConnect(props => 
        
    [
    {                       
        collection: 'snippets'},
        {collection: 'folders'}       
    ]
    )) (Sidebar);
