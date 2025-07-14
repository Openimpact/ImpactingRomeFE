import { Operatori, Spazi } from "@/repos/types";

export interface Event {
  id: number;
  type: string;
  photo: string;
  name: string;
  location: Location;
  halls?: HallsEntity[] | null;
  facilities?: string[] | null;
  opening_hours: OpeningHours;
}
export interface Location {
  address: string;
  coordinates: Coordinates;
}
export interface Coordinates {
  latitude: number;
  longitude: number;
}
export interface HallsEntity {
  name: string;
  capacity: number;
  price: number;
}
export interface OpeningHours {
  monday: string;
  tuesday: string;
  wednesday: string;
  thursday: string;
  friday: string;
  saturday: string;
  sunday: string;
}
export interface IAction {
  type: ActionTypes;
  payload: any;
}

export enum ActionTypes {
  LOAD_DATA = "LOAD_DATA",
  SET_FILTER = "SET_FILTER",
  FILTER_CITY = "FILTER_CITY",
  FILTER_COUNTRY = "FILTER_COUNTRY",
  FILTER_DATA = "FILTER_DATA",
}
interface Filter<T> {
  value: string;
  key: keyof T;
  kind: string;
}

export interface IState<T> {
  filters: Filter<T>[];
  data: T[];
  filteredData: T[];
  loading: boolean;
  availableFilters: any[];
}

export const initialState: IState<any> = {
  filters: [],
  data: [],
  filteredData: [],
  loading: true,
  availableFilters: [],
};

const generateAvailableFilters = (
  data: any[],
  filterKeys: { key: string; kind: string }[]
) => {
  const addToFilter = (acc: any[], key: string, kind: string, value: any) => {
    const filter = acc.find((f: any) => f.id === key);

    if (filter) {
      const option = filter.options.find((o: any) => o.value === value);
      if (!option) {
        filter.options.push({
          value,
          label: value,
          checked: false,
        });
      }
    } else {
      acc.push({
        id: key,
        name: key,
        kind,
        options: [{ value, label: valueToLabel(value, kind) + "", checked: false }],
      });
    }
  };

  const valueToLabel = (value: any, kind: string) => {
    if(kind === "nested_number"){return value}
    if(kind === "checkbox"){
      if (typeof value === "string") {
        return value.trim() == "" ? "Non specificato" : value ;
      }
      return value ? "Si" : "No";
    }
    if (typeof value === "number") {
      return value + "";
    }
    if (typeof value === "boolean") {
      return value ? "Si" : "No";
    }
    if (typeof value === "object") {
      return value.name;
    }
    return value;
  }

  const accumulatedFilters = data.reduce((acc: any, curr: any) => {
    filterKeys.forEach(({ key, kind }) => {
      const value = curr[key];
      if (Array.isArray(value)) {
        value.forEach((item: any) => addToFilter(acc, key, kind, item));
      } else if (value !== undefined) {
        addToFilter(acc, key, kind, value);
      }

      if (typeof key === "string" && key.split(".").length > 1) {
        const result = DotNotationParser.get(curr, key);
        if (Array.isArray(result)) {
          result.forEach((item: any) => addToFilter(acc, key, kind, item));
        } else if (result !== undefined) {
          addToFilter(acc, key, kind, result);
        }
      }
    });

    return acc;
  }, []);

  return accumulatedFilters.map((filter: any) => {
    filter.options.sort(sortFilters);
    return filter;
  });
};

const sortFilters = (a: any, b: any) => {
  if (typeof a.value === "string" && typeof b.value === "string") {
    return a.value.localeCompare(b.value);
  }
  if (a.value < b.value) {
    return -1;
  }
  if (a.value > b.value) {
    return 1;
  }
  return 0;
};

const compareFilters = function <T>(a: Filter<T>, b: Filter<T>){
  if (a.key === b.key && a.value === b.value) {
    return true;
  }
  return false;
};

function reducer <T>( state: IState<T>, { type, payload }: IAction ):IState<T> {
  switch (type) {
    case ActionTypes.LOAD_DATA:
      return {
        ...state,
        data: payload,
        filteredData: payload,
        loading: false,
        availableFilters: generateAvailableFilters(payload, [
          { key: "wheelchair_accessible_entrance", kind: "checkbox" },
          { key: "type.spazi_type_id", kind: "checkbox" },
          /* { key: "facilities", kind: "checkbox" },
          { key: "halls.name", kind: "nested_number" },
          { key: "halls.capacity", kind: "nested_number" },
          { key: "halls.price", kind: "nested_number" } */
        ]),
      };
    case ActionTypes.SET_FILTER:
      return {
        ...state,
        filters: !state.filters.filter((x) => compareFilters<T>(x, payload)).length
          ? state.filters.concat(payload)
          : state.filters.filter((x) => !compareFilters<T>(x, payload)),
      };
    case ActionTypes.FILTER_DATA:
      return {
        ...state,
        filteredData: state.data.filter((eventData) => {
          if (!state.filters.length) return true;
          const filterGroups: { [key: string]: Filter<T>[] } =
            state.filters.reduce((acc, curr) => {
              if (
                //@ts-ignore
                typeof acc[curr.key] != "undefined" &&
                //@ts-ignore
                Array.isArray(acc[curr.key])
              ) {
                //@ts-ignore
                acc[curr.key].push(curr);
              } else {
                //@ts-ignore
                acc[curr.key] = [curr];
              }
              return acc;
            }, {} as { [key: string]: Filter<T>[] });

          const groups: Array<string> = Object.keys(filterGroups);

          return !!groups.every((filterGroupKey) => {
            return !!filterGroups[filterGroupKey].filter((filter: any) => {
              if (filter.kind === "nested_number") {
                const result = DotNotationParser.get(eventData, filter.key);
                console.log("FILTRO NUMERO", result);
                if (Array.isArray(result)) {
                  return result.includes(filter.value);
                } else {
                  return result == filter.value;
                }
              }
              if (filter.kind === "nested_type") {
                const result = DotNotationParser.get(eventData, filter.key);
                console.log("FILTRO NUMERO", result);
                if (Array.isArray(result)) {
                  return result.includes(filter.value);
                } else {
                  return result == filter.value;
                }
              }
              //@ts-ignore
              if (Array.isArray(eventData[filter.key])) {
                //@ts-ignore
                return eventData[filter.key].includes(filter.value);
              }
              //@ts-ignore
              if (typeof eventData[filter.key] == "string") {
                //console.log("FILTRO STRINGA");
                //@ts-ignore
                return eventData[filter.key].includes(filter.value);
              }

              //@ts-ignore
              return eventData[filter.key] == filter.value;
            }).length;
          });
        }),
      };
    default:
      return state;
  }
};

export default reducer;

type AnyObject = { [key: string]: any } | any;

class DotNotationParser {
  static get(obj: AnyObject, path: string, defaultValue?: any): any {
    if (!path || typeof path !== "string") return undefined;

    const keys = this.parseKeys(path);
    let result = obj;

    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];

      if (Array.isArray(result) && typeof key === "string") {
        return result.map((x) => x[key]); // Return the whole array if there's no numeric index
        //@ts-ignore
      } else if (result[key] !== undefined) {
        //@ts-ignore
        result = result[key];
      } else {
        return defaultValue;
      }
    }

    return result;
  }

  static set(obj: AnyObject, path: string, value: any): boolean {
    if (!path || typeof path !== "string") return false;

    const keys = this.parseKeys(path);
    let current = obj;

    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      const nextKey = keys[i + 1];

      if (i === keys.length - 1) {
        current[key] = value;
        return true;
      }

      if (current[key] === undefined) {
        if (typeof nextKey === "number") {
          current[key] = []; // Initialize as an empty array
        } else {
          current[key] = {}; // Initialize as an empty object
        }
      }

      current = current[key];
    }

    return false;
  }

  static parseKeys(path: string): Array<string | number> {
    let buffer = "";
    let keys: Array<string | number> = [];
    for (let i = 0; i < path.length; i++) {
      const char = path[i];
      if (char === ".") {
        keys.push(buffer);
        buffer = "";
      } else if (char === "[") {
        if (buffer.length) {
          keys.push(buffer);
          buffer = "";
        }
        let closeBracketIdx = path.indexOf("]", i);
        if (closeBracketIdx !== -1) {
          keys.push(Number(path.substring(i + 1, closeBracketIdx)));
          i = closeBracketIdx;
        }
      } else {
        buffer += char;
      }
    }
    if (buffer) keys.push(buffer);
    return keys;
  }
}
