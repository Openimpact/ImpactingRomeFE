const baseUrl = "";
const addTypeItems = (path: string) => (payload: any[]) =>
  fetch(`${baseUrl}${path}`, {
    method: "POST",
    body: JSON.stringify(payload.map((p) => ({ name: p }))),
  });
const addItems = (path: string) => (payload: any[]) =>
  fetch(`${baseUrl}${path}`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
export const addProfessioni = addTypeItems("/api/profession");
export const addSkillType = addTypeItems("/api/skill_type");
export const addCampoType = addTypeItems("/api/campo_type");
export const addTipologia = addTypeItems("/api/tipologia");
export const addTipologiaType = addTypeItems("/api/tipologia_type");
export const addDotazioni = addTypeItems("/api/dotazioni_type");
export const addPossibilita = addTypeItems("/api/possibilita_type");
export const addOutcome = addItems("/api/outcome");
