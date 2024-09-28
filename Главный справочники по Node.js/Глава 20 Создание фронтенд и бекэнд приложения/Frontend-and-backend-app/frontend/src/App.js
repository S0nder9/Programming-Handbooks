import { useEffect, useState } from "react";
import "./App.css";

function App() {
    const [person, setPerson] = useState({});

    useEffect(() => {
        fetch("http://localhost:5000")
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Network response was not ok");
                }
                return res.json();
            })
            .then((data) => {
                console.log(data);
                setPerson(data);
            })
            .catch((err) => {
                console.error("Fetch error:", err);
            });
    }, []);

    return (
        <div className="App">
            <h1>
                {person && (
                    <>
                        {person.name} {person.isInstructor ? 'Instructor' : 'Not Instructor'}
                    </>
                )}
            </h1>
        </div>
    );
}

export default App;
