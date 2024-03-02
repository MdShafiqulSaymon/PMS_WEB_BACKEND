import * as dotenv from "dotenv";
dotenv.config();
export const getRestClientPort = (): string => {
  return process.env.REST_SERVER_PORT ?? "7070";
};

export interface RDSServiceConfig {
  username: string;
  password: string;
  database: string;
  schema?: string;
}

export interface RDSConfig {
  rdsHost: string;
  rdsPort: string;
  services: {
    pmsConfig: RDSServiceConfig;
  };
}
export const getAppEnvironment = (): string => {
  return process.env.APP_ENVIRONMENT ?? 'development';
};
export const getRDSConfig = (): RDSConfig => {
  return {
    rdsHost: process.env.RDS_HOST,
    rdsPort: process.env.RDS_PORT,
    services: {
      pmsConfig: {
        username: process.env.PMS_DB_USER,
        password: process.env.PMS_DB_PASSWORD,
        database: process.env.PMS_DB,
      },
    },
  };
};
