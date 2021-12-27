import Routes from "./components/Routes/Index";
import { useDispatch } from "react-redux";
import { getAllArticles } from "./actions/articles.action";

function App() {
  const dispatch = useDispatch();

  dispatch(getAllArticles());

  return (
    <Routes />
  );
}

export default App;