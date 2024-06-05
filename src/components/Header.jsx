import React from "react";
import { Link } from 'react-router-dom';

export default function Header() {
    return (
        <div>
            <Link to="/" >Home&nbsp;</Link>
            <Link to="/quiz" >Quiz</Link>
        </div>
    )
}