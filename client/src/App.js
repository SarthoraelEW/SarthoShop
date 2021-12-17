import Routes from "./components/Routes/Index";
import { UidContext } from "./components/AppContext";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getClient } from "./actions/client.action";

function App() {
  const [uid, setUid] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchToken = async () => {
      await axios({
        method: "get",
        url: `${process.env.REACT_APP_API_URL}jwtid`,
        withCredentials: true
      })
      .then((res) => setUid(res.data))
      .catch((err) => console.log("No token"));
    }
    fetchToken();

    if (uid) dispatch(getClient(uid));
  }, [uid, dispatch]);

  return (
    <UidContext.Provider value={uid}>
      <Routes />
    </UidContext.Provider>
  );
}

export default App;