import "./Header.css"

function Header({ rightContent }) {
    return (
        <header className="header">
            <h1 className="header__title">HitZone</h1>
            {rightContent && (
                <div className="header__right">
                    {rightContent}
                </div>
            )}
        </header>
    )
}

export default Header
