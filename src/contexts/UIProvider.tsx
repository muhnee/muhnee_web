import React, { FC, useReducer } from "react";
import moment, { Moment } from "moment";

type State = {
  addTransactionModalOpen: true | false;
  date: Moment;
};

type Action = {
  type: "@@UI/ADD_TRANSACTION_MODAL_OPEN" | "@@UI/ADD_TRANSACTION_MODAL_CLOSE";
  date?: Moment;
};

type Dispatch = (action: Action) => void;

const StateContext = React.createContext<State | undefined>(undefined);
const DispatchContext = React.createContext<Dispatch | undefined>(undefined);

export const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case "@@UI/ADD_TRANSACTION_MODAL_OPEN":
      if (action.date) {
        return { ...state, addTransactionModalOpen: true, date: action.date };
      }
      return { ...state };
    case "@@UI/ADD_TRANSACTION_MODAL_CLOSE":
      return { ...state, addTransactionModalOpen: false };
    default:
      return state;
  }
};

const initialState = {
  addTransactionModalOpen: false,
  date: moment()
};

const NotificationProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
};

function useState() {
  const context = React.useContext(StateContext);
  if (context === undefined) {
    throw new Error(
      "useNotificationState must be used within a NotificationProvider"
    );
  }
  return context;
}

function useUIDispatch() {
  const context = React.useContext(DispatchContext);
  if (context === undefined) {
    throw new Error(
      "useNotificationDispatch must be used within a NotificationProvider"
    );
  }
  return context;
}

export default NotificationProvider;

export { useUIDispatch, useState };
