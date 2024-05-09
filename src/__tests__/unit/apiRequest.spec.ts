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

      expect(result).toEqual('https://teste-94u93qnn.uc.gateway.dev');
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

    it('should call authenticate method just one time', async () => {
      const apiRequest = new ApiRequest({
        testEnv: true,
        credentials: {
          apiKey: 'test-api-key',
          email: 'test@test.com',
          password: 'test-password'
        }
      });
      const authResponse = {  accessToken: 'test', expiresIn: 3600000 };
      // @ts-ignore
      const requestSpy = jest.spyOn(apiRequest.api as any, 'post').mockResolvedValueOnce({ data: authResponse });
      const authenticateSpy = jest.spyOn(apiRequest as any, 'authenticate');
      const response = await (apiRequest as any).authenticate();
      expect(response).toEqual(authResponse);
      expect(requestSpy).toHaveBeenCalled();

      await (apiRequest as any).authenticateCheck();
      expect(authenticateSpy).toHaveBeenCalledTimes(1);
    });
  });
});
