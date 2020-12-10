import { TRouter } from '@utils/models';
import { ver } from './version.controller';

const routes: TRouter = {
  resource: '',
  routes: [
    {
      path: '',
      method: 'get',
      handler: ver,
    },
  ],
};

export default routes;
