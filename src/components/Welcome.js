import React from 'react';
import Button from '@material-ui/core/Button';
import CodeIcon from '@material-ui/icons/Code';
import './../styles/Welcome.css';
import { Link } from 'react-router-dom'

function Welcome() {
    return (
        <div className="welcome">
            <div className="welcome__content">
                <h3>Welcome to your Dashboard.</h3>
                    <Link to="/snippex?page=new">
                    <Button
                        variant="contained"
                        color="primary"
                        size="large"        
                        startIcon={<CodeIcon />}
                    >Create Snippet
                    </Button>
                </Link>
            </div>
        </div>
    )
}

export default Welcome
