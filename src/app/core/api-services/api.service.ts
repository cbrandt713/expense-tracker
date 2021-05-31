import { environment } from 'src/environments/environment';

export abstract class ApiService {
    baseUrl: string = environment.baseUrl;

    protected getUrl(endpoint: string): string {
        return `${this.baseUrl}${endpoint}`;
    }
}
