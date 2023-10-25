import address from '../../models/AlreadyMinted';
import responseTemplate from '../responseTemplate';
import { AlreadyMintedType } from '../../models/AlreadyMinted';

const addAlreadyMintedToDB = async (user: string) => {
  const newAddress: AlreadyMintedType = {
    address: user,
  };

  try {
    const newAlreadyMinted = new address(newAddress);
    await newAlreadyMinted.save();
    return responseTemplate({
      status: 'success',
      message: 'User added to AlreadyMinted successfully',
      result: newAlreadyMinted,
    });
  } catch (e) {
    if (e instanceof Error) {
      return responseTemplate({
        status: 'error',
        message: e.message,
        result: {},
      });
    }
  }
};

export default addAlreadyMintedToDB;
