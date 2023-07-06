import { useState } from "react";


export default function Header() {
    const [buttonText, setButtonText] = useState("Dark");
    const themeTarget = document.getElementById("theme-target");
    const theme = themeTarget.getAttribute('data-bs-theme');

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">PokeDex</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbar-items">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbar-items">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="navItem">
                            <a className="nav-link" href="https://github.com/mccoycoding/block-26-alt">GitHub</a>
                        </li>
                    </ul>
                    <button id="toggle-theme" className="btn btn-dark" onClick={()=> {
                            if (theme === "dark"){
                                const button = document.getElementById('toggle-theme');
                                setButtonText("Dark")
                                themeTarget.setAttribute('data-bs-theme', 'light')
                                button.classList.remove('btn-light')
                                button.classList.add('btn-dark')
                            } else if (theme === "light"){
                                const button = document.getElementById('toggle-theme');
                                setButtonText("Light")
                                themeTarget.setAttribute('data-bs-theme', 'dark')
                                button.classList.remove('btn-dark')
                                button.classList.add('btn-light')
                            }
                        }}>{buttonText}</button>
                </div>
            </div> 
        </nav>
    )
}