import React from 'react'
import { useState, useEffect } from 'react'

const GetForm = () => {

    const [generatedCode, setGeneratedCode] = useState('')

    const getCode = async () => {
        try {
            const response = await fetch('https://code-generate-verify.onrender.com/api/codes/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            })

            if(!response.ok) {
                throw new Error('Failed to generate code')
            }

            const data = await response.json()
            setGeneratedCode(data.generatedCode)

        } catch (error) {
            console.log(error);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        getCode()
    }

    return (
        <div className="d-flex justify-content-center f-direction-column">
            <div className='col-auto border border-primary rounded text-center fs-4 mb-3 me-3' style={{width: "8rem"}}>
                {generatedCode}
            </div>

            <form onSubmit={handleSubmit}>
                <div className="col-auto">
                    <button type="submit" className="btn btn-primary mb-3">Generate Code</button>
                </div>
            </form>
        </div>
    )
}

export default GetForm
