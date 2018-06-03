/* Still need firebase credentials so extend the non-prod environment */
import { environment as devEnvironment } from './environment';

export const environment = {
  ...devEnvironment,
  production: true,
};
