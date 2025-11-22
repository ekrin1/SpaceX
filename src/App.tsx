import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import './App.css';
import LaunchList from './components/cards/LaunchList';
import { reducer, initialState  } from './hooks/Reducer';
import { useEffect, useReducer } from "react";


function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "setLodaing" });

      try {
        const response = await fetch(
          "https://api.spacexdata.com/v3/launches?launch_year=2020"
        );

        const resJson = await response.json();

        dispatch({ type: "setLaunches", payload: resJson });
      } catch {
        dispatch({ type: "setError", payload: "Failed to load launches" });
      }
    };

    fetchData();
  }, []);

  return (
    <MantineProvider>
      <div className="container">

        {state.loading && <p>Loading...</p>}

        {state.error && <p>{state.error}</p>}

        <LaunchList data={state.launches} />
      </div>
    </MantineProvider>
  );
}

export default App;
