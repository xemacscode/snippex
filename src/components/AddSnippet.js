import React, {useEffect, useState, Component} from 'react'
import './../styles/AddSnippet.css';
import TextField from '@material-ui/core/TextField';
// import Autocomplete from '@material-ui/lab/Autocomplete';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import { makeStyles } from '@material-ui/core/styles';
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-github";
import db from '../services/firebase';
import CreatableSelect from 'react-select/creatable';
import { compose } from 'redux';
import {firestoreConnect} from 'react-redux-firebase';
import { createSnippet } from '../actions/snippetActions';
import {connect} from 'react-redux';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
import {Redirect} from 'react-router-dom';
const filter = createFilterOptions();
class AddSnippet extends Component {

    // const [title, setTitle] = useState('');
    // const [language, setLanguage] = useState('');
    // const [content, setContent] = useState('');
    // const [folder, setFolder] = useState('');
    // const [privacy, setPrivacy] = useState('');
    // const [tags, setTags] = useState([]);

    state = {
        title: '',
        content: '',
        folder: '',
        language: '',
        privacy: '',
        tags: '',
        redirect: false
    }




    handleSubmit = (evt) => {
        evt.preventDefault();
        // alert(`Submitting Name ${title}`)       
        console.log('state', this.state);
        // let filteredArray = this.state.people.filter(item => item !== e.target.value)
        this.props.createSnippet(this.state);
        this.setState({
            redirect: true
        })
    }

    handleAceChange = (e) =>{
        this.setState({
            content: e
        })
    }

    

    onChange= (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }
    render () {
        const {folders} = this.props;
        const { redirect } = this.state;
        if (redirect) {
            return <Redirect to='/'/>;
          }
        return (
        <div className="addsnippet">
             <form onSubmit={this.handleSubmit}>
            <div className="addsnippet__title">Add New Snippet</div>
            <div className="addsnippet__row">
                <div className="addsnippet__rowCol70">
                    <TextField fullWidth  id="title" label="Title" onChange={this.onChange}/>            
                </div>
                <div className="addsnippet__rowCol30">
                <Autocomplete                    
                    id="language"
                    options={progLanguages}
                    onChange={(event,newValue) => {
                        if(typeof(newValue) === 'string'){
                            this.setState({
                                language: newValue
                            })
                        }else if(newValue && newValue.inputValue){
                            this.setState({
                                language: newValue.inputValue
                            })
                        }else{
                            this.setState({
                                language: newValue.class
                            })
                        }
                    }}
                    getOptionLabel={(option) => option.name}                       
                    renderInput={(params) => <TextField {...params} label="Language" variant="standard" />}
                    />
                </div>
            </div>
            <div className="addsnippet__rowSingle">
            <label htmlFor="field_content" className="label">Code</label>
            <AceEditor
                id="content"
                mode="java"
                theme="github"
                onChange={this.handleAceChange}
                name="UNIQUE_ID_OF_DIV"
                value={this.state.content}
                editorProps={{ $blockScrolling: true }}
            />
            </div>
            <div className="addsnippet__row">
                <div className="addsnippet__rowCol70">
                <Autocomplete
                    id="folder"
                    options={folders}
                    onChange={(event,newValue) => {
                        if(typeof(newValue) === 'string'){
                            this.setState({
                                folder: newValue
                            })
                        }else if(newValue && newValue.inputValue){
                            this.setState({
                                folder: newValue.inputValue
                            })
                        }else{
                            this.setState({
                                folder: newValue.name
                            })
                        }
                    }}
                    getOptionLabel={(option) => option.name}                    
                    renderInput={(params) => <TextField {...params} label="Folder" variant="standard" />}
                    /> 
                </div>
                <div className="addsnippet__rowCol30">
                <Autocomplete
                    id="privacy"
                    options={privacyAll}
                    onChange={(event,newValue) => {
                        if(typeof(newValue) === 'string'){
                            this.setState({
                                privacy: newValue
                            })
                        }else if(newValue && newValue.inputValue){
                            this.setState({
                                privacy: newValue.inputValue
                            })
                        }else{
                            this.setState({
                                privacy: newValue.class
                            })
                        }
                    }}
                    getOptionLabel={(option) => option.name}                    
                    renderInput={(params) => <TextField {...params} label="Privacy" variant="standard" />}
                    /> 
                </div>         
            </div>
            <div className="addsnippet__rowSingle">
            <TextField fullWidth  id="tags" label="Tags" onChange={this.onChange}/>       
            </div>
            <div className="addsnippet__rowBottom">
            <Button
                    variant="contained"
                    color="primary"
                    size="large"                            
                    id="btnSave"
                    type="submit"
                >Save Snippet
                </Button>
                <Button
                    id="btnCancel"
                    variant="contained"
                    color="default"
                    size="large"                            
                >Cancel
                </Button>
            </div>
            </form>
            
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
        createSnippet: (snippet) => dispatch(createSnippet(snippet))
    }
}

export default compose(connect(mapStateToProps,mapDispatchToProps), firestoreConnect(props => 
        
    [                                   
        {collection: 'folders'}       
    ]
    )) (AddSnippet);


const progLanguages = [
    {name: 'PHP', class: 'php'},
    {name: 'Java', class: 'java'},
    {name: 'Python', class: 'python'},
    {name: 'Javascript', class: 'javascript'},
    {name: 'Text', class: 'plaintext'},
    {name: 'C#', class: 'csharp'},
    {name: 'C', class: 'c'},
    {name: 'C++', class: 'cpp'},
    {name: 'Perl', class: 'perl'},
    {name: 'Kotlin', class: 'kotlin'},
    {name: 'Delphi', class: 'delphi'},
    {name: 'ActionScript', class: 'actionscript'},
    {name: 'CSS', class: 'css'},
]

const privacyAll = [
    {name: 'Public', class: 'public'},
    {name: 'Private', class: 'private'},
    {name: 'Unlisted', class: 'unlisted'}
]