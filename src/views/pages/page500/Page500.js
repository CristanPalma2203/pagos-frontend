import React from 'react'

const Page500 = () => {
  return (
    <body>
      <div className="error-page">
        <div className="container-floud">
          <div className="col-xs-12 ground-color text-center">
            <div className="container-error-page-404">
              <div className="clip"><div className="shadow-error-page"><span className="digit thirdDigit">5</span></div></div>
              <div className="clip"><div className="shadow-error-page"><span className="digit secondDigit">0</span></div></div>
              <div className="clip"><div className="shadow-error-page"><span className="digit firstDigit">0</span></div></div>
              <div className="msg">OH!<span className="triangle"></span></div>
            </div>
            <h2 className="h1">Houston, tenemos un problema!.</h2>
            <p className="text-muted float-left">La página que está buscando no está disponible temporalmente.</p>
            <div className='d-grid gap-2 col-2 mx-auto'>
              <a href="/#" className="btn box__button ">Go back</a>
            </div>
          </div>
        </div>
      </div>
    </body>
  )
}

export default Page500
