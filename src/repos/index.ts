const directus_token: string = process.env.NEXT_DIRECTUS_TOKEN ?? "";
export const directus_url: string =
  process.env.NEXT_PUBLIC_DIRECTUS_URL ?? "http://localhost:8055";
//const directus_token = "Qhtoy7_YxXjkwNoR1JHBM7OJGz_7RKoo";
//export const directus_url = "https://impacting-rome.rizo.tech";

import { createDirectus, rest, staticToken, uploadFiles } from "@directus/sdk";
import { CustomDirectusTypes } from "./types";
import { Repository } from "./Repository";

// Client with REST support
export const system_client = createDirectus<CustomDirectusTypes>(directus_url)
  .with(rest({ credentials: "include" }))
  .with(staticToken(directus_token));

export const uploadImage = async (rawFile: File, attributes?: any) => {
  const formData = new FormData();
  formData.append("file", rawFile);
  if (attributes) {
    Object.keys(attributes).forEach((key) => {
      formData.append(key, attributes[key]);
    });
  }
  const result = await system_client.request(uploadFiles(formData));
  return result;
};
export const SpaziRepository = new Repository<"spazi">(system_client, "spazi");
export const AnagraficaRepository = new Repository<"anagrafica">(
  system_client,
  "anagrafica",
);
export const OperatoriRepository = new Repository<"operatori">(
  system_client,
  "operatori",
);
export const AttivitaTypeRepository = new Repository<"attivitaType">(
  system_client,
  "attivitaType",
);
export const DotazioniTypeRepository = new Repository<"dotazioniType">(
  system_client,
  "dotazioniType",
);
export const PossibilitaTypeRepository = new Repository<"possibilitaType">(
  system_client,
  "possibilitaType",
);
export const CampoTypeRepository = new Repository<"campoType">(
  system_client,
  "campoType",
);
export const ProfessionTypeRepository = new Repository<"professionType">(
  system_client,
  "professionType",
);
export const SkillTypeRepository = new Repository<"skillType">(
  system_client,
  "skillType",
);
export const SpaziTypeRepository = new Repository<"spaziType">(
  system_client,
  "spaziType",
);

export const OutcomeRepository = new Repository<"outcome">(
  system_client,
  "outcome",
);

export const IndicatoriRepository = new Repository<"indicatori">(
  system_client,
  "indicatori",
);

export const ProxyRepository = new Repository<"proxy">(system_client, "proxy");
