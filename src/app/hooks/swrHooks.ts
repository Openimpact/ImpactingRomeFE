import useSWR, { SWRConfig, SWRConfiguration } from "swr";
const baseUrl = "";

const fetcher = (path: string) => {
  return fetch(`${baseUrl}/api/${path}`).then((res) => res.json());
};

export const useDotazioni = <T>(options?: SWRConfiguration) =>
  useSWR<T>("dotazioni_type", fetcher, options);
export const usePossibilita = <T>(options?: SWRConfiguration) =>
  useSWR<T>("possibilita_type", fetcher, options);
export const useOperatori = <T>(options?: SWRConfiguration) =>
  useSWR<T>("operatori", fetcher, options);
export const useProfessioni = <T>(options?: SWRConfiguration) =>
  useSWR<T>("profession", fetcher, options);
export const useAttivita = <T>(options?: SWRConfiguration) =>
  useSWR<T>("attivita_type", fetcher, options);
export const useTipologia = <T>(options?: SWRConfiguration) =>
  useSWR<T>("tipologia", fetcher, options);
export const useTipologiaType = <T>(options?: SWRConfiguration) =>
  useSWR<T>("tipologia_type", fetcher, options);
export const useSkillType = <T>(options?: SWRConfiguration) =>
  useSWR<T>("skill_type", fetcher, options);
export const useCampoType = <T>(options?: SWRConfiguration) =>
  useSWR<T>("campo_type", fetcher, options);
export const useSpazioProfile = <T>(id: string, options?: SWRConfiguration) =>
  useSWR<T>(`spazio-profile/${id}`, fetcher, options);
export const useSpaziSearch = <T>(q: string, options?: SWRConfiguration) =>
  useSWR<T>(`spazi/search/?q=${q}`, fetcher, options);
export const useOperatoriSearch = <T>(q: string, options?: SWRConfiguration) =>
  useSWR<T>(`operatori/search/?q=${q}`, fetcher, options);

export const useOperatoreProfile = <T>(
  id: string,
  options?: SWRConfiguration
) => useSWR<T>(`operatore-profile/${id}`, fetcher, options);

export const useOutcome = <T>(sdgs: number[], options?: SWRConfiguration) =>
  useSWR<T>(`outcome/${sdgs.join("-")}`, fetcher, options);

export const useIndicatori = <T>(
  outcome_id: string,
  options?: SWRConfiguration
) => useSWR<T>(`indicatori/${outcome_id}`, fetcher, options);

export const useProxy = <T>(options?: SWRConfiguration) =>
  useSWR<T>("proxy", fetcher, options);
