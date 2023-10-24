import address from '../../models/address';
import returnObj from '../returnObj';
import { addressType } from '../interfaces';

const addAddressToDb = async (addressUser: string) => {
  const addressDetail: addressType = {
    address: addressUser,
  };

  try {
    const addressDb = new address(addressDetail);
    await addressDb.save();
    return returnObj(true, 'add token to database', addressDb);
  } catch (e) {
    if (e instanceof Error) {
      console.log(e.message);
      return returnObj(false, e.message, null);
    }
  }
};

export default addAddressToDb;
