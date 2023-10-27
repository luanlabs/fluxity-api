/**
 * @swagger
 * /token:
 *   delete:
 *     summary: Delete token
 *     tags: [Apis]
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
 *                 example : GBLBJBTC2URCWUTIXY42W7M5GAZ2NIKTS4QF77BHHWHSBKKSPS2DTOHA
 *     responses:
 *       200:
 *         description: Deleted token
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
 *                   example: Deleted token successful
 *                 result:
 *                   type: object
 *                   example: {
 *                     _id: 6539a4b453971c96d697f9c0,
 *                     address: CBBDKFZZPWJQADUXHS3CCIXYRYVKK2SOPIOUDNA5SWXRC7B7APZN3I3H,
 *                     symbol: fDAI,
 *                     name: FakeDAI,
 *                     decimals: 7,
 *                     __v: 0
 *                   }
 *
 *       400:
 *         description: Token not exist
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
 *                   example: Token not exists
 *                 result:
 *                   type: object
 *                   example: {}
 *
 *       401:
 *         description: Authorization
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
 *                   example: Authorization not found
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
 *                   example: Access not found
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
 *
 *     securitySchemes:
 *       Authorization:
 *         type: apiKey
 *         name: authorization
 *         in: header
 *
 *
 */
