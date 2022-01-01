import Routes from "./components/Routes/Index";
import { CookiesProvider } from 'react-cookie';
import { useDispatch } from "react-redux";
import { getAllArticles } from "./actions/articles.action";

function App() {
  const dispatch = useDispatch();

  dispatch(getAllArticles());

  return (
    <CookiesProvider>
      <Routes />
    </CookiesProvider>
  );
}

export default App;
