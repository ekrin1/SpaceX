import type { Launch } from "../types/Launch";

export type State = {
  launches: Launch[];
  loading: boolean;
  error: string | null;
  modalOpen: boolean;
  selectedLaunch: Launch | null;
};

export type Action =
  | { type: "setLodaing" }
  | { type: "setError"; payload: string }
  | { type: "setLaunches"; payload: Launch[] }
  | { type: "openModal"; payload: Launch }
  | { type: "closeModal" };

export const initialState: State = {
  launches: [],
  loading: false,
  error: null,
  modalOpen: false,
  selectedLaunch: null,
};

export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "setLodaing":
      return { ...state, loading: true };

    case "setError":
      return { ...state, loading: false, error: action.payload };

    case "setLaunches":
      return { ...state, loading: false, error: null, launches: action.payload };

    case "openModal":
      return { ...state, modalOpen: true, selectedLaunch: action.payload };

    case "closeModal":
      return { ...state, modalOpen: false, selectedLaunch: null };

    default:
      return state;
  }
}
