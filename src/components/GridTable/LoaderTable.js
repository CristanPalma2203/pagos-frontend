import React from 'react'
import { CTable, CPlaceholder, CSpinner } from '@coreui/react'
const LoaderTable = () => {
    return (
        <div>
            <CPlaceholder component="p" animation="glow">
                <CPlaceholder xs={12} />
            </CPlaceholder>
        </div>
    )
}

export default React.memo(LoaderTable)
