import { RequestHandler } from 'express';
import SorobanClient from 'soroban-client';
import dotenv from 'dotenv';

import address from '../../models/address';
import {
  transactionMintBuild,
  transactionBalanceBuild,
} from '../../utils/token/transactionBuild';
import getToken from '../../utils/token/getToken';
import returnObj from '../../utils/returnObj';
import getTransaction from '../../utils/token/getTransaction';
import addAddressToDb from '../../utils/address/addAddressToDb';
import { responseTransaction } from '../../utils/interfaces';

dotenv.config();

const server = new SorobanClient.Server(process.env.SOROBAN_SERVER);

const fee = 100000;

const mintToken: RequestHandler = async (req, res) => {
  try {
    const { addressUser } = req.body;

    const findAddress = await address.findOne({ address: addressUser });
    if (findAddress) {
      return res.json(returnObj(false, 'address exist in database', null));
    }

    const adminAddress: string | undefined = process.env.ADMIN_ADDRESS;

    const tokens = await getToken();

    const accountAdmin = await server.getAccount(adminAddress);

    const transactions: responseTransaction[] = [];

    for (let i = 0; i < tokens.length; i++) {
      const contract = new SorobanClient.Contract(tokens[i].address);
      const sequence = (BigInt(accountAdmin.sequence) + BigInt(i)).toString();
      const transactionMint = await transactionMintBuild(
        accountAdmin._accountId,
        sequence,
        fee,
        contract,
        addressUser,
      );

      await getTransaction(transactionMint, server);
    }

    for (let i = 0; i < tokens.length; i++) {
      const contract = new SorobanClient.Contract(tokens[i].address);
      const balance = await transactionBalanceBuild(
        accountAdmin,
        addressUser,
        10000,
        contract,
      );

      const responseTransaction: responseTransaction = {
        address: addressUser,
        name: tokens[i].name,
        symbol: tokens[i].symbol,
        decimals: tokens[i].decimals,
        balance: balance.toString(),
      };

      transactions.push(responseTransaction);
    }

    await addAddressToDb(addressUser);

    return res.json(transactions);
  } catch (e) {
    if (e instanceof Error) {
      console.log(e.message);
      return res.json(returnObj(false, e.message, null));
    }
  }
};

export default mintToken;
