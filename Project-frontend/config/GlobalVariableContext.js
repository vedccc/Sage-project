import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';


const DeviceVariables = {
  AUTHORIZATION_REFRESH: '',
  MOVINGHUB_BASIC_AUTH:
    'Basic d1JqNXV2Y05zUjpiOHR0YlNMODVLSFl6UEFlSzNSc3VSMnZ4VnZkbk5jd05zekhYVGRW',
  MOVINGHUB_API_KEY: '9EhRgscH9XY6ketKudufhm9GpUB2qxrULxKrKSuD',
  MOVINGHUB_PARTNER_CODE: 'rkdd',
  DOCU_ISS_KEY: 'ec321027-c5db-4047-9601-40c1537eb35c',
  DOCU_SEC_KEY: 'f530bae3-30fe-4421-aa43-602248605b00',
  DOCU_AUTH_CODE:
    'eyJ0eXAiOiJNVCIsImFsZyI6IlJTMjU2Iiwia2lkIjoiNjgxODVmZjEtNGU1MS00Y2U5LWFmMWMtNjg5ODEyMjAzMzE3In0.AQoAAAABAAYABwAAjY129ebZSAgAABkUvvXm2UgCALmHo63uwxZNjvbtAp_HSZoVAAEAAAAYAAEAAAAFAAAADQAkAAAAZWMzMjEwMjctYzVkYi00MDQ3LTk2MDEtNDBjMTUzN2ViMzVjIgAkAAAAZWMzMjEwMjctYzVkYi00MDQ3LTk2MDEtNDBjMTUzN2ViMzVjNwAj0lCdoKwyQrqiaZaw23vLMACAOcFV7ebZSA.AinqF6u2MccpnTVQOVGg77hglkCSpkpfGB34rURrMPQ_AIS4lG93ieJm77wxavtbYBLu3NHs-IbISKjKIw443qhzE073eKkWi-Fyo1kWZLMmUpBSnSh39rICzkpKBhkQ_jvhDbc5ekZIY_KsOrfZYQt9GryHBh0Kd6Izf_oTj24q5BixK6IXzSRb9w7x4D-3eXTN4PJWsBr5yGx6qe2fam5vgR4lpcZQtfXMBYWwXmqt-UUJH2DVFQ3-dYmsl-QUJmGU5eyzSP6B3HovB64LJ2W6Uhy8IpCpI5ip8JFcx4jPI_9LxscUOeO7FWI935941GRm3Aqqp7KY8jyxZmJSpQ',
  DOCU_BASIC_AUTH:
    'Basic ZWMzMjEwMjctYzVkYi00MDQ3LTk2MDEtNDBjMTUzN2ViMzVjOmY1MzBiYWUzLTMwZmUtNDQyMS1hYTQzLTYwMjI0ODYwNWIwMA==',
  AUTHORIZATION_HEADER: '',
  DOCU_ACCESS_TOKEN: '',
  DOCU_REFRESH_TOKEN: '',
  DOCU_ACCOUNT_ID: '',
  USER_MOBILE_NO: '',
  USER_PROFILE_IMAGE: '',
  USER_ID: '',
  USER_FULL_NAME: '',
  USER_FIRST_NAME: '',
  USER_LAST_NAME: '',
  USER_MIDDLE_NAME: '',
  API_BASE_URL: 'x7tz-xape-92ts.a2.xano.io',
  BASE_URL: 'realtime-dem.proaxiom.tech',
  USER_EMAIL: '',
  API_KEY: 'lfipZvrX1Pf6jGjw3s',
  AUTHORIZATION: 'Basic dHJhY2tlcjpUZXN0ZXIwMQ==',
};

export const InitialDeviceVariables = {
  AUTHORIZATION_REFRESH: '',
  MOVINGHUB_BASIC_AUTH:
    'Basic d1JqNXV2Y05zUjpiOHR0YlNMODVLSFl6UEFlSzNSc3VSMnZ4VnZkbk5jd05zekhYVGRW',
  MOVINGHUB_API_KEY: '9EhRgscH9XY6ketKudufhm9GpUB2qxrULxKrKSuD',
  MOVINGHUB_PARTNER_CODE: 'rkdd',
  DOCU_ISS_KEY: 'ec321027-c5db-4047-9601-40c1537eb35c',
  DOCU_SEC_KEY: 'f530bae3-30fe-4421-aa43-602248605b00',
  DOCU_AUTH_CODE:
    'eyJ0eXAiOiJNVCIsImFsZyI6IlJTMjU2Iiwia2lkIjoiNjgxODVmZjEtNGU1MS00Y2U5LWFmMWMtNjg5ODEyMjAzMzE3In0.AQoAAAABAAYABwAAjY129ebZSAgAABkUvvXm2UgCALmHo63uwxZNjvbtAp_HSZoVAAEAAAAYAAEAAAAFAAAADQAkAAAAZWMzMjEwMjctYzVkYi00MDQ3LTk2MDEtNDBjMTUzN2ViMzVjIgAkAAAAZWMzMjEwMjctYzVkYi00MDQ3LTk2MDEtNDBjMTUzN2ViMzVjNwAj0lCdoKwyQrqiaZaw23vLMACAOcFV7ebZSA.AinqF6u2MccpnTVQOVGg77hglkCSpkpfGB34rURrMPQ_AIS4lG93ieJm77wxavtbYBLu3NHs-IbISKjKIw443qhzE073eKkWi-Fyo1kWZLMmUpBSnSh39rICzkpKBhkQ_jvhDbc5ekZIY_KsOrfZYQt9GryHBh0Kd6Izf_oTj24q5BixK6IXzSRb9w7x4D-3eXTN4PJWsBr5yGx6qe2fam5vgR4lpcZQtfXMBYWwXmqt-UUJH2DVFQ3-dYmsl-QUJmGU5eyzSP6B3HovB64LJ2W6Uhy8IpCpI5ip8JFcx4jPI_9LxscUOeO7FWI935941GRm3Aqqp7KY8jyxZmJSpQ',
  DOCU_BASIC_AUTH:
    'Basic ZWMzMjEwMjctYzVkYi00MDQ3LTk2MDEtNDBjMTUzN2ViMzVjOmY1MzBiYWUzLTMwZmUtNDQyMS1hYTQzLTYwMjI0ODYwNWIwMA==',
  AUTHORIZATION_HEADER: '',
  DOCU_ACCESS_TOKEN: '',
  DOCU_REFRESH_TOKEN: '',
  DOCU_ACCOUNT_ID: '',
  USER_MOBILE_NO: '',
  USER_PROFILE_IMAGE: '',
  USER_ID: '',
  USER_FULL_NAME: '',
  USER_FIRST_NAME: '',
  USER_LAST_NAME: '',
  API_BASE_URL: 'x7tz-xape-92ts.a2.xano.io',
  BASE_URL: 'realtime-dem.proaxiom.tech',
  USER_EMAIL: '',
  API_KEY: 'lfipZvrX1Pf6jGjw3s',
  AUTHORIZATION: 'Basic dHJhY2tlcjpUZXN0ZXIwMQ==',
};

export const AllApiKeys = [
  'MOVINGHUB_BASIC_AUTH',
  'MOVINGHUB_API_KEY',
  'MOVINGHUB_PARTNER_CODE',
  'DOCU_AUTH_CODE',
  'DOCU_BASIC_AUTH',
];
const AppVariables = { SEARCH: '', ERROR_MESSAGE: '', DATA: '', FILE: '' };
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
      case 'RESET':
        return { values: State.defaultValues, __loaded: true };
      case 'LOAD_FROM_ASYNC_STORAGE':
        return { values: { ...state.values, ...payload }, __loaded: true };
      case 'UPDATE':
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
        dispatch({ type: 'LOAD_FROM_ASYNC_STORAGE', payload });
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
    return <AppLoading />;
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
  const dispatch = React.useContext(GlobalVariableUpdater);
  console.log('dispatch', dispatch)
  return ({ key, value }) => {
    dispatch({ type: 'UPDATE', payload: { key, value } });
    return value;
  };
}

export function useValues() {
  return React.useContext(GlobalVariableContext);
}
