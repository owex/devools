import React from 'react'

type Props = {
    title: string
}

const PageHeader = ({ title }: Props) => {
    return (
        <div className="md:flex md:items-center md:justify-between py-10">
            <div className="min-w-0 flex-1">
                <h1 className="text-3xl font-bold text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                    {title}
                </h1>
            </div>
        </div>
    )
}

export default PageHeader

