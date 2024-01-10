import React from 'react'
import { useState } from 'react'

const VerifyForm = () => {

    const [enteredCode, setEnteredCode] = useState('')
    const [resultStatus, setResultStatus] = useState('')
    const [result, setResult] = useState('Result will be shown here')

    const verifyCode = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/codes/use', {
                method: 'POST',
                body: JSON.stringify({ code: enteredCode }),
                headers: {
                    'Content-Type': 'application/json',
                },
            })

            if(!response.ok) {
                throw new Error('Failed to verify code')
            }

            const data = await response.json()
            setResult(data.message)
            setResultStatus(data.status)

            // console.log(data, result, resultStatus)

        } catch (error) {
            console.log(error)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        verifyCode()
        setEnteredCode('')
    }

    return (
        <div>
            <form className="row g-3" onSubmit={handleSubmit}>
                <div className="col-auto">
                    <input 
                        className="form-control" 
                        type="text" 
                        placeholder="type your code here" 
                        aria-label="default input example"
                        value={enteredCode}
                        onChange={(e) => setEnteredCode(e.target.value)}
                    />
                </div>
                <div className="col-auto">
                    <button type="submit" className="btn btn-success mb-3">Verify Code</button>
                </div>
            </form>

            <div>  
                { resultStatus === 'success' ? 
                    <div className="alert alert-success" role="alert">
                        {result}
                    </div> :
                    <div className="alert alert-warning" role="alert">
                        {result}
                    </div>
                }
            </div>

        </div>
    )
}

export default VerifyForm
