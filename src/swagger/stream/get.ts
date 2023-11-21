/**
 * @swagger
 * /testnet/stream:
 *   get:
 *     summary: Returns a list of streams
 *     tags: [stream]
 *     parameters:
 *       - name: status
 *         in: query
 *         description: Status values
 *         required: false
 *         explode: true
 *         schema:
 *           type: string
 *           enum:
 *             - pending
 *             - ongoing
 *             - expired
 *
 *       - name: sender
 *         in: query
 *         description: Sender address
 *         required: false
 *         explode: true
 *         schema:
 *           type: string
 *
 *       - name: receiver
 *         in: query
 *         description: Receiver address
 *         required: false
 *         explode: true
 *         schema:
 *           type: string
 *
 *       - name: token
 *         in: query
 *         description: Token contract address
 *         required: false
 *         explode: true
 *         schema:
 *           type: string
 *
 *       - name: address
 *         in: query
 *         description: If this parameter is entered, the sender and receiver parameters are not functional
 *         required: false
 *         explode: true
 *         schema:
 *           type: string
 *
 *
 *     responses:
 *
 *       200:
 *         description: Stream has been received successfully
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
 *                   example:
 *                 result:
 *                   type: object
 *                   example: [{
 *                     _id: "24",
 *                     amount: "119000000",
 *                     cancellable_date: 1699956257,
 *                     cliff_date: 1699956257,
 *                     end_date: 1700042657,
 *                     is_cancelled: false,
 *                     is_vesting: false,
 *                     rate: 86400,
 *                     receiver: "GDK3NJDFD3DG3OO5ZLSSSM56L7ULYKHVUH7UEWV3N5WQBMG4NP72A2O2",
 *                     sender: "GBLBJBTC2URCWUTIXY42W7M5GAZ2NIKTS4QF77BHHWHSBKKSPS2DTOHA",
 *                     start_date: 1699956257,
 *                     token: {
 *                         _id: 6539a4b453971c96d697f9c0,
 *                         address: CBBDKFZZPWJQADUXHS3CCIXYRYVKK2SOPIOUDNA5SWXRC7B7APZN3I3H,
 *                         symbol: fDAI,
 *                         name: FakeDAI,
 *                         decimals: 7,
 *                         logo: /public/images/assets/fdai.svg,
 *                         __v: 0
 *                     },
 *                     withdrawn: "0",
 *                     createdAt: "2023-11-14T10:25:26.494Z",
 *                     updatedAt: "2023-11-14T10:25:26.494Z",
 *                     __v: 0,
 *                     status: "ongoing"
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
 *                     example: Failed to get the stream
 *                   result:
 *                     type: object
 *                     example: {}
 *
 *
 */
