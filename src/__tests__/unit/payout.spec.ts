import { Payout } from '../../payout';

const config = {
  testEnv: true,
  credentials: { email: 'test@test.com', password: 'test-password' }
};

const authResponse = { accessToken: 'test-token', expiresIn: 3600000 };
const payoutResponse = { id: 'payout-1', status: 'pending' };

describe('Payout', () => {
  let payout: Payout;

  beforeEach(() => {
    payout = new Payout(config);
  });

  describe('create', () => {
    it('should call authenticateCheck before the API call', async () => {
      const checkSpy = jest.spyOn(payout as any, 'authenticateCheck').mockResolvedValue(undefined);
      jest.spyOn((payout as any).api, 'post').mockResolvedValue({ data: payoutResponse });

      const body = { amount: 100 } as any;
      await payout.create(body);

      expect(checkSpy).toHaveBeenCalledTimes(1);
    });

    it('should not re-authenticate on sequential calls when token is valid', async () => {
      jest.spyOn((payout as any).api, 'post').mockResolvedValueOnce({ data: authResponse });
      const authenticateSpy = jest.spyOn(payout as any, 'authenticate');

      await (payout as any).authenticate();
      expect(authenticateSpy).toHaveBeenCalledTimes(1);

      await (payout as any).authenticateCheck();
      expect(authenticateSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('list', () => {
    it('should call authenticateCheck before the API call', async () => {
      const checkSpy = jest.spyOn(payout as any, 'authenticateCheck').mockResolvedValue(undefined);
      jest.spyOn((payout as any).api, 'get').mockResolvedValue({ data: [payoutResponse] });

      await payout.list();

      expect(checkSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('getById', () => {
    it('should call authenticateCheck before the API call', async () => {
      const checkSpy = jest.spyOn(payout as any, 'authenticateCheck').mockResolvedValue(undefined);
      jest.spyOn((payout as any).api, 'get').mockResolvedValue({ data: payoutResponse });

      await payout.getById('payout-1');

      expect(checkSpy).toHaveBeenCalledTimes(1);
    });
  });
});
