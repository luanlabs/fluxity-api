/**
 * @swagger
 * /testnet/token:
 *   post:
 *     summary: Adds an ERC20-like token to the list of claimable tokens.
 *     tags: [token (testnet)]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               token:
 *                 type: string
 *                 required: true
 *                 example : CBBDKFZZPWJQADUXHS3CCIXYRYVKK2SOPIOUDNA5SWXRC7B7APZN3I3H
 *               logo:
 *                 type: string
 *                 required: false
 *                 example : /public/images/assets/fusdc.svg
 *               claimable:
 *                 type: string
 *                 required: false
 *                 example : true
 *
 *     security:
 *       - Authorization : []
 *
 *
 *     responses:
 *       200:
 *         description: Token has been saved successfully
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
 *                   example: Token has been saved successfully
 *                 result:
 *                   type: object
 *                   example: {
 *                     address: CBBDKFZZPWJQADUXHS3CCIXYRYVKK2SOPIOUDNA5SWXRC7B7APZN3I3H,
 *                     symbol: fDAI,
 *                     name: FakeDAI,
 *                     decimals: 7,
 *                     logo: /public/images/assets/fdai.svg,
 *                     _id: 6539a4b453971c96d697f9c0,
 *                     claimable: true,
 *                     network: testnet,
 *                     __v: 0
 *                   }
 *
 *       400:
 *         description: Token already exists in the database
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
 *                   example: Token already exists
 *                 result:
 *                   type: object
 *                   example: {}
 *
 *       401:
 *         description: Authorization failed
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
 *                   example: Authorization failed
 *                 result:
 *                   type: object
 *                   example: {}
 *
 *       403:
 *         description: Access
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
 *                   example: Authorization failed
 *                 result:
 *                   type: object
 *                   example: {}
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
 *                     example: Failed to save the token
 *                   result:
 *                     type: object
 *                     example: {}
 *
 *
 *
 * components:
 *     securitySchemes:
 *       Authorization:
 *         type: apiKey
 *         name: authorization
 *         in: header
 *
 *
 */
