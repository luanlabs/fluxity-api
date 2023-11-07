/**
 * @swagger
 * /testnet/token/mint:
 *   post:
 *     summary: Mints a new token and transfers the tokens to the specified destination address.
 *     tags: [token]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user:
 *                 type: string
 *                 required: true
 *                 example : GBLBJBTC2URCWUTIXY42W7M5GAZ2NIKTS4QF77BHHWHSBKKSPS2DTOHA
 *     responses:
 *       200:
 *         description: Token has been minted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: Tokens minted successfully
 *                 result:
 *                   type: array
 *                   example: [{
 *                     _id: "6538cee619e2c76fe6cad499",
 *                     "address": "CASS3CUNR7W4ASUCEGOMK3TUWITT7KKDS6DQ2TS27UPKRAAKTSHHUJPB",
 *                     symbol: fDAI,
 *                     name: FakeDAI,
 *                     decimals: 7,
 *                     __v: 0
 *                   },]
 *
 *       400:
 *         description: User has already minted the fake tokens
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 message:
 *                   type: string
 *                   example: User has already minted tokens
 *                 result:
 *                   type: object
 *                   example: {}
 *
 *
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *                 type: object
 *                 properties:
 *                   status:
 *                     type: string
 *                     example: error
 *                   message:
 *                     type: string
 *                     example: Address invalid ...
 *                   result:
 *                     type: object
 *                     example: {}
 *
 *
 */
