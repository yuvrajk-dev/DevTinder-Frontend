import { BrowserRouter, Route, Routes } from "react-router";
import Body from "./pages/Body";
import Login from "./pages/Login";
import Feed from "./pages/Feed";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";

function App() {
  return (
    <>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Body />}>
            <Route path="/" element={<Feed />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
