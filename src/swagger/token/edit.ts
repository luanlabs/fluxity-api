/**
 * @swagger
 * /testnet/token:
 *   put:
 *     summary: Changing the token logo from the list of claimable tokens.
 *     tags: [token]
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
 *                 required: true
 *                 example : /public/images/assets/fdai.svg
 *
 *     security:
 *       - Authorization : []
 *
 *     responses:
 *       200:
 *         description: Token changed logo successfully
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
 *                   example: Token changed logo successfully
 *                 result:
 *                   type: object
 *                   example: {
 *                     _id: 6539a4b453971c96d697f9c0,
 *                     address: CBBDKFZZPWJQADUXHS3CCIXYRYVKK2SOPIOUDNA5SWXRC7B7APZN3I3H,
 *                     symbol: fDAI,
 *                     name: FakeDAI,
 *                     decimals: 7,
 *                     logo: /public/images/assets/fdai.svg,
 *                     __v: 0
 *                   }
 *
 *       404:
 *         description: Token dose not exist on the database
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
 *                   example: Token dose not exist
 *                 result:
 *                   type: object
 *                   example: {}
 *
 *       412:
 *         description: Logo is invalid
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
 *                   example: Logo is invalid
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
 *                     example: Token Invalid ...
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
