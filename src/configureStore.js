import EndpointRepository from "./Http/EndpointRepository";
import StoreFactory from "./redux/StoreFactory";
import reducers from './redux/reducers';

import endpoints from './config/endpoints';

EndpointRepository.save(endpoints);
const config = StoreFactory(reducers, ['usuario', 'subMenu']);
export default config;