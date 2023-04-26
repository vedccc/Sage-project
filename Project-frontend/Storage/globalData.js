import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const DeviceVariables = {
  user_id: "jk8a3a",
  name: "ankit",
  email: "ankit@samyotech.com",
  country_code: "91",
  mobile: "8236020590",
  image:
    "http://phpstack-722834-2406701.cloudwaysapps.com/admin/assets/images/user/",
  password: "123456789",
  address: "",
  status: "1",
  latitude: "",
  longitude: "",
  landmark: "",
  device_type: "ios",
  device_token: "lkjlkjjlk",
  email_token: "",
  created_at: "2023-01-03 16:31:34",
};

export const InitialDeviceVariables = {
  
  user_id: "jk8a3a",
  name: "ankit",
  email: "ankit@samyotech.com",
  country_code: "91",
  mobile: "8236020590",
  image:
    "http://phpstack-722834-2406701.cloudwaysapps.com/admin/assets/images/user/",
  password: "123456",
  address: "",
  status: "1",
  latitude: "",
  longitude: "",
  landmark: "",
  device_type: "ios",
  device_token: "lkjlkjjlk",
  email_token: "",
  created_at: "2023-01-03 16:31:34",
};

const AppVariables = { SEARCH: "", ERROR_MESSAGE: "", DATA: "", FILE: "" };
const GlobalVariableContext = React.createContext();
const GlobalVariableUpdater = React.createContext();

// Attempt to parse a string as JSON. If the parse fails, return the string as-is.
// This is necessary to account for variables which are already present in local
// storage, but were not stored in JSON syntax (e.g. 'hello' instead of '"hello"').
function tryParseJson(str) {
  try {
    return JSON.parse(str);
  } catch {
    return str;
  }
}

class GlobalVariable {
  /**
   *  Filters an object of key-value pairs for those that should be
   *  persisted to storage, and persists them.
   *
   *  @param values Record<string, string>
   */
  static async syncToLocalStorage(values) {
    console.log("load storage");
    const update = Object.entries(values)
      .filter(([key]) => key in DeviceVariables)
      .map(([key, value]) => [key, JSON.stringify(value)]);

    if (update.length > 0) {
      await AsyncStorage.multiSet(update);
    }

    return update;
  }

  static async loadLocalStorage() {
    const entries = await AsyncStorage.multiGet(Object.keys(DeviceVariables));

    // If values isn't set, use the default. These will be written back to
    // storage on the next render.
    const withDefaults = entries.map(([key, value]) => [
      key,
      value ? tryParseJson(value) : DeviceVariables[key],
    ]);

    const result = Object.fromEntries(withDefaults);
    return result;
  }
}

class State {
  static defaultValues = {
    ...AppVariables,
    ...DeviceVariables,
  };

  static reducer(state, { type, payload }) {
    switch (type) {
      case "RESET":
        return { values: State.defaultValues, __loaded: true };
      case "LOAD_FROM_ASYNC_STORAGE":
        return { values: { ...state.values, ...payload }, __loaded: true };
      case "UPDATE":
        return state.__loaded
          ? {
              ...state,
              values: {
                ...state.values,
                [payload.key]: payload.value,
              },
            }
          : state;
      default:
        return state;
    }
  }

  static initialState = {
    __loaded: false,
    values: State.defaultValues,
  };
}

export function checkApiChanged(localData, setVariable) {
  const isChanged =
    JSON.stringify(localData) !== JSON.stringify(DeviceVariables);

  if (isChanged) {
    for (const key of AllApiKeys) {
      setVariable({
        key,
        value: DeviceVariables[key],
      });
    }
  }
}

export function GlobalVariableProvider({ children }) {
  const [state, dispatch] = React.useReducer(State.reducer, State.initialState);

  // This effect runs on mount to overwrite the default value of any
  // key that has a local value.
  React.useEffect(() => {
    async function initialStorageLoader() {
      try {
        const payload = await GlobalVariable.loadLocalStorage();
        dispatch({ type: "LOAD_FROM_ASYNC_STORAGE", payload });
      } catch (err) {
        console.error(err);
      }
    }
    initialStorageLoader();
  }, []);

  // This effect runs on every state update after the initial load. Gives us
  // best of both worlds: React state updates sync, but current state made
  // durable next async tick.
  React.useEffect(() => {
    async function syncToAsyncStorage() {
      console.log("check api");
      try {
        await GlobalVariable.syncToLocalStorage(state.values);
      } catch (err) {
        console.error(err);
      }
    }
    if (state.__loaded) {
      syncToAsyncStorage();
    }
  }, [state]);

  // We won't want an app to read a default state when there might be one
  // incoming from storage.
  if (!state.__loaded) {
    return;
  }

  return (
    <GlobalVariableUpdater.Provider value={dispatch}>
      <GlobalVariableContext.Provider value={state.values}>
        {children}
      </GlobalVariableContext.Provider>
    </GlobalVariableUpdater.Provider>
  );
}

// Hooks
export function useSetValue() {
  console.log("check dispath api ");
  const dispatch = React.useContext(GlobalVariableUpdater);
  console.log("dispatch", dispatch);
  return ({ key, value }) => {
    dispatch({ type: "UPDATE", payload: { key, value } });
    return value;
  };
}

export function useValues() {
  console.log("check Globalvariableprovider api2222");
  return React.useContext(GlobalVariableContext);
}
