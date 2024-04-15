import { ApiRequest } from './apiRequest';

export class Users extends ApiRequest {
  public async create(body: any) {
    await this.authenticateCheck();
    return this.api.post('/users', body);
  }

  public async update(id: string, body: any) {
    await this.authenticateCheck();
    return this.api.put(`/users/${id}`, body);
  }

  public async delete(id: string) {
    await this.authenticateCheck();
    return this.api.delete(`/users/${id}`);
  }

  public async get(id: string) {
    await this.authenticateCheck();
    return this.api.get(`/users/${id}`);
  }

  public async list(query?: any) {
    await this.authenticateCheck();
    return this.api.get('/users');
  }

}
