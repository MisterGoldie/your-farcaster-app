import React, { ReactNode } from 'react'

interface PageWrapperProps {
    children: ReactNode
}

const PageWrapper: React.FC<PageWrapperProps> = ({ children }) => {
    return (
        <div className="min-h-screen flex items-center justify-center">
            {children}
        </div>
    )
}

export default PageWrapper
