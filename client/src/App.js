import "./App.css";
import { Route, Routes } from "react-router-dom";
import { HomeContainer, NewPost } from "./container";
import { Header } from "./components";
import { firebaseAuth } from "./config/firebase.config";
import { useEffect, useState } from "react";
import { createUser } from "./sanity";
import { SET_USER } from "./context/actions/userAction";
import { useDispatch } from "react-redux";
import LoaderComp from "./Loader";

function App() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    const unsubscribe = firebaseAuth.onAuthStateChanged((user) => {
      if (user) {
        console.log("User :", user?.providerData[0]);
        dispatch(SET_USER(user?.providerData[0]));
        createUser(user?.providerData[0]).then(() => {
          // console.log(user?.providerData[0].uid);
          // console.log("New USer Created");
          setLoading(false);
        });
      } else {
        // Handle the case where there is no authenticated user
        setLoading(false);
      }
    });

    // Make sure to unsubscribe from the Firebase listener when the component unmounts.
    return () => unsubscribe();
  }, [dispatch]);

  if (loading) {
    return <LoaderComp />;
  }

  if (error) {
    // Handle and display the error appropriately
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="w-screen min-h-screen flex flex-col items-center justify-start">
      {/* header section */}
      <Header />

      {/* Main section */}
      <main className="w-full h-full flex items-center justify-center">
        <Routes>
          <Route exact path="/" element={<HomeContainer />} />
          <Route exact path="/newPost/*" element={<NewPost />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
