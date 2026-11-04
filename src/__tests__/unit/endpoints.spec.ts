import { Customer } from '../../customer';
import { Ramps } from '../../ramps';
import { Savings } from '../../savings';

const config = {
  testEnv: true,
  credentials: { email: 'test@test.com', password: 'test-password' }
};

describe('endpoint paths', () => {
  describe('Ramps.getById', () => {
    it('should GET api/v2/ramps/{id} and return the response data', async () => {
      const ramps = new Ramps(config);
      jest.spyOn(ramps as any, 'authenticateCheck').mockResolvedValue(undefined);
      const getSpy = jest.spyOn((ramps as any).api, 'get').mockResolvedValue({ data: { id: 'ramp-1' } });

      const result = await ramps.getById('ramp-1');

      expect(getSpy).toHaveBeenCalledWith('api/v2/ramps/ramp-1');
      expect(result).toEqual({ id: 'ramp-1' });
    });
  });

  describe('Customer.getBalances', () => {
    it('should GET api/v2/customers/balances and never POST', async () => {
      const customer = new Customer(config);
      jest.spyOn(customer as any, 'authenticateCheck').mockResolvedValue(undefined);
      const getSpy = jest.spyOn((customer as any).api, 'get').mockResolvedValue({ data: [{ currency: 'USD' }] });
      const postSpy = jest.spyOn((customer as any).api, 'post');

      const result = await customer.getBalances();

      expect(getSpy).toHaveBeenCalledWith('api/v2/customers/balances');
      expect(postSpy).not.toHaveBeenCalled();
      expect(result).toEqual([{ currency: 'USD' }]);
    });
  });

  describe('Savings.getBalance', () => {
    it('should GET api/v2/savings/{id}/balance and return the response data', async () => {
      const savings = new Savings(config);
      jest.spyOn(savings as any, 'authenticateCheck').mockResolvedValue(undefined);
      const getSpy = jest.spyOn((savings as any).api, 'get').mockResolvedValue({ data: { balance: '10' } });

      const result = await savings.getBalance('savings-1');

      expect(getSpy).toHaveBeenCalledWith('api/v2/savings/savings-1/balance');
      expect(result).toEqual({ balance: '10' });
    });
  });
});
