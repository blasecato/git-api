import Private from "./scenes/Private/Private";
import { useState } from "react";
import Public from "./scenes/Public/Public";

function App() {
  const [isLogged, setLogged] = useState(true);

  return isLogged ? <Private /> : <Public setLogged={setLogged} />;
}

export default App;
