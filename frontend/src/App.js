import GetForm from "./components/GetForm";
import VerifyForm from "./components/VerifyForm";

function App() {
    return (
        <>
            <h1 className="container text-center mb-3">Generate & Verify Code</h1>
            <div className="container d-flex justify-content-center py-4 border border-secondary">
                <GetForm />
            </div>
            <div className="container d-flex justify-content-center mt-5 py-4 border border-secondary">
                <VerifyForm />
            </div>
        </>
    );
}

export default App;
