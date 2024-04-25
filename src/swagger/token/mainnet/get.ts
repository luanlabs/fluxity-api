/**
 * @swagger
 * /mainnet/token:
 *   get:
 *     summary: Returns the list of the claimable tokens.
 *     tags: [token (mainnet)]
 *
 *     responses:
 *       200:
 *         description: Token has been received successfully
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
 *                   example: Token received successfully
 *                 result:
 *                   type: object
 *                   example: [{
 *                     _id: 6539a4b453971c96d697f9c0,
 *                     address: CBBDKFZZPWJQADUXHS3CCIXYRYVKK2SOPIOUDNA5SWXRC7B7APZN3I3H,
 *                     symbol: fDAI,
 *                     name: FakeDAI,
 *                     decimals: 7,
 *                     logo: /public/images/assets/fdai.svg,
 *                     claimable: false,
 *                     network: mainnet,
 *                     __v: 0
 *                   },]
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
 *                     example: Failed to get the token
 *                   result:
 *                     type: object
 *                     example: {}
 *
 *
 */
