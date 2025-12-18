import React from 'react'

export default async function NewsDetailsPage({
    params
}: {
    params: Promise<{ id: string }>
}) {

    const { id } = await params;

    return (
        <div>
            {id}
        </div>
    )
}
