export interface IDiscoveryHomePageData {
  banners: IDiscoveryBanner[];
  categories: ICategory[];
}

export interface IDiscoveryBanner {
  bannerId: string;
  src: string;
  href: string;
  hrefType: string;
  rank: number;
  useSystemBrowser: boolean;
  title?: string;
  theme?: 'light' | 'dark';
}

export interface ICategory {
  categoryId: string;
  name: string;
  dapps: IDApp[];
  dappInfo?: {
    information?: string;
    link?: string;
    showLink?: boolean;
  };
}

export interface IDApp {
  dappId: string;
  name: string;
  url: string;
  logo: string;
  originLogo: string;
  description: string;
  networkIds: string[];
  categories: ICategory[];
  tags: IDAppTag[];
  keyword?: string;
}

export interface IDAppTag {
  tagId: string;
  name: string;
  type: string;
}

export interface IDiscoveryListParams {
  cursor?: string;
  limit?: number;
  category: string;
  network?: string;
}

export enum EHostSecurityLevel {
  High = 'high',
  Medium = 'medium',
  Security = 'security',
  Unknown = 'unknown',
}
export interface IAttackType {
  name: string;
  description: string;
}

export interface IHostSecurityCheckSources {
  name: string;
  riskLevel: EHostSecurityLevel;
}

export interface IHostSecurity {
  host: string;
  level: EHostSecurityLevel;
  attackTypes: IAttackType[];
  phishingSite: boolean;
  checkSources: IHostSecurityCheckSources[];
  alert: string;
  detail?: {
    title: string;
    content: string;
  };
  projectName: string;
}
