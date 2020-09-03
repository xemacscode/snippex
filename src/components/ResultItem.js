import React from 'react'
import './../styles/ResultItem.css';
import { Link } from 'react-router-dom'
function ResultItem({id,name, language, folder}) {

    console.log('name ' + name);

    return (
        <Link to={`/snippex?page=view&id=${id}`}>
        <div className="result">
            <div className="result__title">{name}</div>
            <div className="result__metaData">
                <div className="result__metaData__lang">{language}</div>
                <div className="result__metaData__folder">{folder}</div>
            </div>
        </div>
        </Link>
    )
}

export default ResultItem;
