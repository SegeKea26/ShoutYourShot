import "./Footer.css"

function Footer() {
    return (
        <footer className="footer">
            <p className="footer__text">By Segers Keano</p>
            <svg className="footer__svg" width="402" height="202" viewBox="0 0 402 202" fill="none" xmlns="http://www.w3.org/2000/svg">
                <ellipse cx="201" cy="201.5" rx="201" ry="201.5" fill="var(--red)" />
                <ellipse cx="200.5" cy="202" rx="184.5" ry="185" fill="var(--black)" />
                <ellipse cx="201" cy="201.5" rx="136" ry="136.5" fill="var(--green)" />
                <ellipse cx="201" cy="201.5" rx="121" ry="121.5" fill="var(--black)" />
                <ellipse cx="201" cy="201.5" rx="50" ry="50.5" fill="var(--green)" />
                <ellipse cx="200.5" cy="202" rx="31.5" ry="32" fill="var(--red)" />
            </svg>
        </footer>
    )
}

export default Footer
