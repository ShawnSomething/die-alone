import React, { useState } from "react";

export const Main = () => {
    const [upload, setUpload] = useState(false)

    return (
        <>
            <div className="h-screen flex items-center justify-center">
                <h1 className="text-3xl">main</h1>
                <input type="file" />
            </div>
        </>
    )
}