export type Anagrafica = {
  address?: string | null;
  birthdate?: string | null;
  date_created?: string | null;
  date_updated?: string | null;
  email?: string | null;
  gender?: string | null;
  id: string;
  name?: string | null;
  surname?: string | null;
  telephone?: string | null;
  user_created?: string | DirectusUsers | null;
  user_id?: string | Operatori | null;
  user_updated?: string | DirectusUsers | null;
};

export type Associazioni = {
  date_created?: string | null;
  date_updated?: string | null;
  description?: string | null;
  id: string;
  logo?: string | DirectusFiles | null;
  name?: string | null;
  status: string;
  user_created?: string | DirectusUsers | null;
  user_updated?: string | DirectusUsers | null;
};

export type AttivitaType = {
  id: string;
  name?: string | null;
};

export type CampoType = {
  id: string;
  name?: string | null;
};

export type DotazioniType = {
  id: string;
  name?: string | null;
};

export type ImpactEvaluation = {
  budget?: number | null;
  content?: unknown | null;
  date_created?: string | null;
  date_updated?: string | null;
  descrizione?: string | null;
  id: string;
  name?: string | null;
  operatori: any[] | ImpactEvaluationOperatori[];
  spazi: any[] | ImpactEvaluationSpazi[];
  sroi?: number | null;
  user_created?: string | DirectusUsers | null;
  user_updated?: string | DirectusUsers | null;
};

export type ImpactEvaluationOperatori = {
  id: number;
  impactEvaluation_id?: string | ImpactEvaluation | null;
  operatori_id?: string | Operatori | null;
};

export type ImpactEvaluationSpazi = {
  id: number;
  impactEvaluation_id?: string | ImpactEvaluation | null;
  spazi_id?: string | Spazi | null;
};

export type Indicatori = {
  date_created?: string | null;
  date_updated?: string | null;
  id: string;
  name?: string | null;
  outcome?: string | Outcome | null;
  proxy: any[] | Proxy[];
  sort?: number | null;
  status: string;
  user_created?: string | DirectusUsers | null;
  user_updated?: string | DirectusUsers | null;
};

export type Operatori = {
  address?: string | null;
  anagrafica: any[] | Anagrafica[];
  associazioni: any[] | OperatoriAssociazioni[];
  campoType: any[] | OperatoriCampoType[];
  date_created?: string | null;
  date_updated?: string | null;
  email?: string | null;
  foundation?: string | null;
  id: string;
  main_image?: string | DirectusFiles | null;
  name?: string | null;
  professionType: any[] | OperatoriProfessionType[];
  skillType: any[] | OperatoriSkillType[];
  sort?: number | null;
  status: string;
  telephone?: string | null;
  user_created?: string | DirectusUsers | null;
  user_updated?: string | DirectusUsers | null;
};

export type OperatoriAssociazioni = {
  associazioni_id?: string | Associazioni | null;
  id: number;
  operatori_id?: string | Operatori | null;
};

export type OperatoriCampoType = {
  campo_type_id?: string | CampoType | null;
  id: number;
  operatori_id?: string | Operatori | null;
};

export type OperatoriProfessionType = {
  id: number;
  operatori_id?: string | Operatori | null;
  profession_type_id?: string | ProfessionType | null;
};

export type OperatoriSkillType = {
  id: number;
  operatori_id?: string | Operatori | null;
  skill_type_id?: string | SkillType | null;
};

export type Outcome = {
  date_created?: string | null;
  date_updated?: string | null;
  description?: string | null;
  id: string;
  indicatori: any[] | Indicatori[];
  name?: string | null;
  sdg?: string | null;
  sort?: number | null;
  status: string;
  user_created?: string | DirectusUsers | null;
  user_updated?: string | DirectusUsers | null;
};

export type PossibilitaType = {
  id: string;
  name?: string | null;
};

export type ProfessionType = {
  id: string;
  name?: string | null;
};

export type Proxy = {
  date_created?: string | null;
  date_updated?: string | null;
  id: string;
  indicatore?: string | Indicatori | null;
  name?: string | null;
  sort?: number | null;
  source?: string | null;
  status: string;
  user_created?: string | DirectusUsers | null;
  user_updated?: string | DirectusUsers | null;
  value?: number | null;
};

export type SkillType = {
  id: string;
  name?: string | null;
};

export type Spazi = {
  business_status?: string | null;
  coordinates?: string | null;
  date_created?: string | null;
  date_updated?: string | null;
  description?: string | null;
  formatted_address?: string | null;
  google_directions_url?: string | null;
  google_place_id?: string | null;
  google_rating?: number | null;
  id: string;
  images: any[] | SpaziFiles[];
  main_image?: string | DirectusFiles | null;
  name?: string | null;
  opening_hours?: string | null;
  sort?: number | null;
  status: string;
  type: any[] | SpaziSpaziType[];
  user_created?: string | DirectusUsers | null;
  user_updated?: string | DirectusUsers | null;
  website?: string | null;
  wheelchair_accessible_entrance?: boolean | null;
};

export type SpaziFiles = {
  directus_files_id?: string | DirectusFiles | null;
  id: number;
  spazi_id?: string | Spazi | null;
};

export type SpaziSpaziType = {
  id: number;
  spazi_id?: string | Spazi | null;
  spazi_type_id?: string | SpaziType | null;
};

export type SpaziType = {
  id: string;
  name?: string | null;
  sort?: number | null;
};

export type Submission = {
  content?: unknown | null;
  date_created?: string | null;
  date_updated?: string | null;
  id: string;
  sort?: number | null;
  status: string;
  user_created?: string | DirectusUsers | null;
  user_updated?: string | DirectusUsers | null;
};

export type DirectusActivity = {
  action: string;
  collection: string;
  comment?: string | null;
  id: number;
  ip?: string | null;
  item: string;
  origin?: string | null;
  revisions: any[] | DirectusRevisions[];
  timestamp: string;
  user?: string | DirectusUsers | null;
  user_agent?: string | null;
};

export type DirectusCollections = {
  accountability?: string | null;
  archive_app_filter: boolean;
  archive_field?: string | null;
  archive_value?: string | null;
  collapse: string;
  collection: string;
  color?: string | null;
  display_template?: string | null;
  group?: string | DirectusCollections | null;
  hidden: boolean;
  icon?: string | null;
  item_duplication_fields?: unknown | null;
  note?: string | null;
  singleton: boolean;
  sort?: number | null;
  sort_field?: string | null;
  translations?: unknown | null;
  unarchive_value?: string | null;
};

export type DirectusDashboards = {
  color?: string | null;
  date_created?: string | null;
  icon: string;
  id: string;
  name: string;
  note?: string | null;
  panels: any[] | DirectusPanels[];
  user_created?: string | DirectusUsers | null;
};

export type DirectusFields = {
  collection: string | DirectusCollections;
  conditions?: unknown | null;
  display?: string | null;
  display_options?: unknown | null;
  field: string;
  group?: string | DirectusFields | null;
  hidden: boolean;
  id: number;
  interface?: string | null;
  note?: string | null;
  options?: unknown | null;
  readonly: boolean;
  required?: boolean | null;
  sort?: number | null;
  special?: unknown | null;
  translations?: unknown | null;
  validation?: unknown | null;
  validation_message?: string | null;
  width?: string | null;
};

export type DirectusFiles = {
  charset?: string | null;
  description?: string | null;
  duration?: number | null;
  embed?: string | null;
  filename_disk?: string | null;
  filename_download: string;
  filesize?: number | null;
  folder?: string | DirectusFolders | null;
  height?: number | null;
  id: string;
  location?: string | null;
  metadata?: unknown | null;
  modified_by?: string | DirectusUsers | null;
  modified_on: string;
  storage: string;
  tags?: unknown | null;
  title?: string | null;
  type?: string | null;
  uploaded_by?: string | DirectusUsers | null;
  uploaded_on: string;
  width?: number | null;
};

export type DirectusFlows = {
  accountability?: string | null;
  color?: string | null;
  date_created?: string | null;
  description?: string | null;
  icon?: string | null;
  id: string;
  name: string;
  operation?: string | DirectusOperations | null;
  operations: any[] | DirectusOperations[];
  options?: unknown | null;
  status: string;
  trigger?: string | null;
  user_created?: string | DirectusUsers | null;
};

export type DirectusFolders = {
  id: string;
  name: string;
  parent?: string | DirectusFolders | null;
};

export type DirectusMigrations = {
  name: string;
  timestamp?: string | null;
  version: string;
};

export type DirectusNotifications = {
  collection?: string | null;
  id: number;
  item?: string | null;
  message?: string | null;
  recipient: string | DirectusUsers;
  sender?: string | DirectusUsers | null;
  status?: string | null;
  subject: string;
  timestamp?: string | null;
};

export type DirectusOperations = {
  date_created?: string | null;
  flow: string | DirectusFlows;
  id: string;
  key: string;
  name?: string | null;
  options?: unknown | null;
  position_x: number;
  position_y: number;
  reject?: string | DirectusOperations | null;
  resolve?: string | DirectusOperations | null;
  type: string;
  user_created?: string | DirectusUsers | null;
};

export type DirectusPanels = {
  color?: string | null;
  dashboard: string | DirectusDashboards;
  date_created?: string | null;
  height: number;
  icon?: string | null;
  id: string;
  name?: string | null;
  note?: string | null;
  options?: unknown | null;
  position_x: number;
  position_y: number;
  show_header: boolean;
  type: string;
  user_created?: string | DirectusUsers | null;
  width: number;
};

export type DirectusPermissions = {
  action: string;
  collection: string;
  fields?: unknown | null;
  id: number;
  permissions?: unknown | null;
  presets?: unknown | null;
  role?: string | DirectusRoles | null;
  validation?: unknown | null;
};

export type DirectusPresets = {
  bookmark?: string | null;
  collection?: string | null;
  color?: string | null;
  filter?: unknown | null;
  icon?: string | null;
  id: number;
  layout?: string | null;
  layout_options?: unknown | null;
  layout_query?: unknown | null;
  refresh_interval?: number | null;
  role?: string | DirectusRoles | null;
  search?: string | null;
  user?: string | DirectusUsers | null;
};

export type DirectusRelations = {
  id: number;
  junction_field?: string | null;
  many_collection: string;
  many_field: string;
  one_allowed_collections?: unknown | null;
  one_collection?: string | null;
  one_collection_field?: string | null;
  one_deselect_action: string;
  one_field?: string | null;
  sort_field?: string | null;
};

export type DirectusRevisions = {
  activity: number | DirectusActivity;
  collection: string;
  data?: unknown | null;
  delta?: unknown | null;
  id: number;
  item: string;
  parent?: number | DirectusRevisions | null;
};

export type DirectusRoles = {
  admin_access: boolean;
  app_access: boolean;
  description?: string | null;
  enforce_tfa: boolean;
  icon: string;
  id: string;
  ip_access?: unknown | null;
  name: string;
  users: any[] | DirectusUsers[];
};

export type DirectusSessions = {
  expires: string;
  ip?: string | null;
  origin?: string | null;
  share?: string | DirectusShares | null;
  token: string;
  user?: string | DirectusUsers | null;
  user_agent?: string | null;
};

export type DirectusSettings = {
  auth_login_attempts?: number | null;
  auth_password_policy?: string | null;
  basemaps?: unknown | null;
  custom_aspect_ratios?: unknown | null;
  custom_css?: string | null;
  default_language: string;
  id: number;
  mapbox_key?: string | null;
  module_bar?: unknown | null;
  project_color?: string | null;
  project_descriptor?: string | null;
  project_logo?: string | DirectusFiles | null;
  project_name: string;
  project_url?: string | null;
  public_background?: string | DirectusFiles | null;
  public_foreground?: string | DirectusFiles | null;
  public_note?: string | null;
  storage_asset_presets?: unknown | null;
  storage_asset_transform?: string | null;
  storage_default_folder?: string | DirectusFolders | null;
  translation_strings?: unknown | null;
};

export type DirectusShares = {
  collection?: string | DirectusCollections | null;
  date_created?: string | null;
  date_end?: string | null;
  date_start?: string | null;
  id: string;
  item?: string | null;
  max_uses?: number | null;
  name?: string | null;
  password?: string | null;
  role?: string | DirectusRoles | null;
  times_used?: number | null;
  user_created?: string | DirectusUsers | null;
};

export type DirectusUsers = {
  auth_data?: unknown | null;
  avatar?: string | DirectusFiles | null;
  description?: string | null;
  email?: string | null;
  email_notifications?: boolean | null;
  external_identifier?: string | null;
  first_name?: string | null;
  id: string;
  language?: string | null;
  last_access?: string | null;
  last_name?: string | null;
  last_page?: string | null;
  location?: string | null;
  password?: string | null;
  provider: string;
  role?: string | DirectusRoles | null;
  status: string;
  tags?: unknown | null;
  tfa_secret?: string | null;
  theme?: string | null;
  title?: string | null;
  token?: string | null;
};

export type DirectusWebhooks = {
  actions: unknown;
  collections: unknown;
  data: boolean;
  headers?: unknown | null;
  id: number;
  method: string;
  name: string;
  status: string;
  url: string;
};

export type JunctionDirectusUsersUndefined = {
  collection?: string | null;
  directus_users_id?: string | null;
  id: number;
  item?: string | null;
};

export type CustomDirectusTypes = {
  anagrafica: Anagrafica[];
  associazioni: Associazioni[];
  attivitaType: AttivitaType[];
  campoType: CampoType[];
  directus_activity: DirectusActivity[];
  directus_collections: DirectusCollections[];
  directus_dashboards: DirectusDashboards[];
  directus_fields: DirectusFields[];
  directus_files: DirectusFiles[];
  directus_flows: DirectusFlows[];
  directus_folders: DirectusFolders[];
  directus_migrations: DirectusMigrations[];
  directus_notifications: DirectusNotifications[];
  directus_operations: DirectusOperations[];
  directus_panels: DirectusPanels[];
  directus_permissions: DirectusPermissions[];
  directus_presets: DirectusPresets[];
  directus_relations: DirectusRelations[];
  directus_revisions: DirectusRevisions[];
  directus_roles: DirectusRoles[];
  directus_sessions: DirectusSessions[];
  directus_settings: DirectusSettings;
  directus_shares: DirectusShares[];
  directus_users: DirectusUsers[];
  directus_webhooks: DirectusWebhooks[];
  dotazioniType: DotazioniType[];
  impactEvaluation: ImpactEvaluation[];
  impactEvaluation_operatori: ImpactEvaluationOperatori[];
  impactEvaluation_spazi: ImpactEvaluationSpazi[];
  indicatori: Indicatori[];
  junction_directus_users_undefined: JunctionDirectusUsersUndefined[];
  operatori: Operatori[];
  operatori_associazioni: OperatoriAssociazioni[];
  operatori_campoType: OperatoriCampoType[];
  operatori_professionType: OperatoriProfessionType[];
  operatori_skillType: OperatoriSkillType[];
  outcome: Outcome[];
  possibilitaType: PossibilitaType[];
  professionType: ProfessionType[];
  proxy: Proxy[];
  skillType: SkillType[];
  spazi: Spazi[];
  spazi_files: SpaziFiles[];
  spazi_spaziType: SpaziSpaziType[];
  spaziType: SpaziType[];
  submission: Submission[];
};
