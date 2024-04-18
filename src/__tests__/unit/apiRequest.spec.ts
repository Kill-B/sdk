import { ApiRequest } from '../../apiRequest';

describe('ApiRequest', () => {
  let apiRequest: ApiRequest;

  beforeEach(() => {
    apiRequest = new ApiRequest({
      testEnv: true,
      credentials: {
        apiKey: 'test-api-key',
        email: 'test@test.com',
        password: 'test-password'
      }
    });
  });

  describe('env', () => {
    it('should return SANDBOX when testEnv is true', () => {
      expect(apiRequest.env).toEqual('SANDBOX');
    });

    it('should return PRODUCTION when testEnv is false', () => {
      apiRequest = new ApiRequest({
        testEnv: false,
        credentials: {
          apiKey: 'test-api-key',
          email: 'test@test.com',
          password: 'test-password'
        }
      });

      expect(apiRequest.env).toEqual('PRODUCTION');
    });
  });

  describe('setHost', () => {
    it('should return sandbox URL when testEnv is true', () => {
      const apiRequest = new ApiRequest({
        testEnv: true,
        credentials: {
          apiKey: 'test-api-key',
          email: 'test@test.com',
          password: 'test-password'
        }
      });

      const result = (apiRequest as any).setHost(true);

      expect(result).toEqual('https://sandbox.killb.app/api/v2');
    });

    it('should return production URL when testEnv is false', () => {
      const apiRequest = new ApiRequest({
        testEnv: false,
        credentials: {
          apiKey: 'test-api-key',
          email: 'test@test.com',
          password: 'test-password'
        }
      });

      const result = (apiRequest as any).setHost(false);

      expect(result).toEqual('https://killb.app/api/v2');
    });
  });

  describe('authenticate', () => {
    it('should authenticate and update config when credentials are valid', async () => {
      const apiRequest = new ApiRequest({
        testEnv: true,
        credentials: {
          apiKey: 'test-api-key',
          email: 'test@test.com',
          password: 'test-password'
        }
      });

      const mockResponse = {
        data: {
          accessToken: 'test-access-token',
          expiresIn: Date.now() + 10000
        }
      };

      // @ts-ignore
      jest.spyOn(apiRequest.api, 'post').mockResolvedValueOnce(mockResponse);


      await (apiRequest as any).authenticate();

      // @ts-ignore
      expect(apiRequest.config.accessToken).toEqual(mockResponse.data.accessToken);
      // @ts-ignore
      expect(apiRequest.config.expiresIn).toEqual(mockResponse.data.expiresIn);
    });

    it('should throw an error when credentials are invalid', async () => {
      const apiRequest = new ApiRequest({
        testEnv: true,
        credentials: {
          apiKey: 'test-api-key',
          email: 'test@test.com',
          password: 'wrong-password'
        }
      });

      const mockError = new Error('Invalid credentials');

      // @ts-ignore
      jest.spyOn(apiRequest.api, 'post').mockRejectedValueOnce(mockError);

      await expect((apiRequest as any).authenticate()).rejects.toThrow(mockError);
    });
  });

  describe('authenticateCheck', () => {
    it('should call authenticate when accessToken is missing', async () => {
      const apiRequest = new ApiRequest({
        testEnv: true,
        credentials: {
          apiKey: 'test-api-key',
          email: 'test@test.com',
          password: 'test-password'
        }
      });

      const spy = jest.spyOn(apiRequest as any, 'authenticate').mockResolvedValueOnce({});

      await (apiRequest as any).authenticateCheck();

      expect(spy).toHaveBeenCalled();
    });

    it('should call authenticate when expiresIn is missing', async () => {
      const apiRequest = new ApiRequest({
        testEnv: true,
        credentials: {
          apiKey: 'test-api-key',
          email: 'test@test.com',
          password: 'test-password'
        }
      });

      // @ts-ignore
      apiRequest.config.accessToken = 'test-access-token';

      const spy = jest.spyOn(apiRequest as any, 'authenticate').mockResolvedValueOnce({});;

      await (apiRequest as any).authenticateCheck();

      expect(spy).toHaveBeenCalled();
    });

    it('should call authenticate when expiresIn is in the past', async () => {
      const apiRequest = new ApiRequest({
        testEnv: true,
        credentials: {
          apiKey: 'test-api-key',
          email: 'test@test.com',
          password: 'test-password'
        }
      });

      // @ts-ignore
      apiRequest.config.accessToken = 'test-access-token';
      // @ts-ignore
      apiRequest.config.expiresIn = Date.now() - 10000;

      const spy = jest.spyOn(apiRequest as any, 'authenticate').mockResolvedValueOnce({});;

      await (apiRequest as any).authenticateCheck();

      expect(spy).toHaveBeenCalled();
    });

    it('should not call authenticate when accessToken and expiresIn are valid', async () => {
      const apiRequest = new ApiRequest({
        testEnv: true,
        credentials: {
          apiKey: 'test-api-key',
          email: 'test@test.com',
          password: 'test-password'
        }
      });

      // @ts-ignore
      apiRequest.config.accessToken = 'test-access-token';
      // @ts-ignore
      apiRequest.config.expiresIn = Date.now() + 10000;

      const spy = jest.spyOn(apiRequest as any, 'authenticate');

      await (apiRequest as any).authenticateCheck();

      expect(spy).not.toHaveBeenCalled();
    });
  });
});
