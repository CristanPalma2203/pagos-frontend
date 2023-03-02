import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  return (
    <CFooter>
      <div>
        <a href="https://www.senasa.gob.hn/" target="_blank" rel="noopener noreferrer" className = "aFooter">
          SENASA
        </a>
        <span className="ms-1">&copy; 2022.</span>
      </div>
      <div className="ms-auto">
        <span className="me-1">Desarrollado con apoyo de</span>
        <a  target="_blank"  className = "aFooter" rel="noopener noreferrer">
          USAID
        </a>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
