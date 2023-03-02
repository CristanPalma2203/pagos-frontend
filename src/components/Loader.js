import React from 'react'

const Loader = () => {
    return (
            <div className="loader-wrapper">
                <div className="loader">
                    <div className="roller"></div>
                    <div className="roller"></div>
                </div>
            </div>
    )
}

export default React.memo(Loader)
