import { useState, useEffect } from "react";
import "./styles.css";

function App() {
  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(false);

  const [show, setShow] = useState(true);

  return (
    <div className="container">
      <h1>React 86 – AbortController</h1>

      <button onClick={() => setShow(!show)}>Toggle Component</button>

      {show && <UserFetcher />}
    </div>
  );
}

function UserFetcher() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    setLoading(true);
    fetch("https://jsonplaceholder.typicode.com/users/1", { signal })
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
        setLoading(false);
      })
      .catch((error) => {
        if (error.name === "AbortError") {
          console.log("Request aborted");
        } else {
          console.log("Error:", error);
        }
      });

    // cleanup
    return () => {
      controller.abort();
    };
  }, []);

  return (
    <div className="box">
      {loading && <p>Loading...</p>}
      {user && <p>{user.name}</p>}
    </div>
  );
}
export default App;
