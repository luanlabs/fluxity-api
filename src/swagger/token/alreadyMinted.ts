/**
 * @swagger
 * /token/already-minted:
 *   post:
 *     summary: Returns if user has already minted tokens.
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
 *
 *     responses:
 *       200:
 *         description: Returns true if user has already minted tokens
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
 *                   example: User has already minted tokens
 *                 result:
 *                   type: object
 *                   example: {
 *                     minted: true
 *                   }
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
 *                     example: Failed to get user already minted tokens
 *                   result:
 *                     type: object
 *                     example: {}
 *
 *
 */
