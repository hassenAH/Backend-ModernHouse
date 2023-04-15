import express from 'express';

import { register,unban,deleteOnce,
   ban,getAll,registerFourniseur, getOnce, 
   verify,patchOnce, login ,uploadImage,forgetPass,
   resetPass,changepass,FindCommande , countLastWeekUsers , month} from '../controllers/user.js';

import { body } from 'express-validator';
import { checkToken } from '../middlewares/auth.js';
import multer from '../middlewares/multer-config.js';
const router=express.Router();
/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The Auto-generated id of a User
 *         username:
 *           type: integer
 *           description: username of a user
 *         email:
 *           type: string
 *           descripton: email of a user
 *         password:
 *            type: string
 *            descripton: password of a user
 *         role:
 *            type: string
 *            descripton: role of a user
 *          
 *       example:
 *         username: hassenah
 *         email: hassenahmadi@ymail.com
 *         password: aaa
 *         company_name: modernhouse
 *         first_name: hassen
 *         last_name: ahmadi
 *         code_fiscal: 00012358
 *         telephone_number: 28727188
 *         categorie: plomberie
 * 
 *         
 *         
 *
 */
/**
 * @swagger
 *  tags:
 *    name: User
 *    description: users
 */
 /**
 * @swagger
 * /user:
 *   get:
 *     summary: Lists all the users
 *     tags: [User]
 *     responses:
 *       200:
 *         description: The list of the Users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
 /**
 * @swagger
 * /user:
 *   post:
 *     summary: Create a new User
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: The created User.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Some server error'
 */
 /**
 * @swagger
 * /user/fournisseur:
 *   post:
 *     summary: Create a new fournisseur
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: The created User.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Some server error'
 */
/**
 * @swagger
 * /user:
 *   put:
 *     summary: login 
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description:  User logged in.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Some server error
 */

/**
 * @swagger
 *   
 *  
 *  /{id}:
 *   get:
 *     summary: Get the User by id
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The User id
 *     responses:
 *       200:
 *         description: The User response by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: The User was not found
 *   patch:
 *    summary: Update the User by the id
 *    tags: [User]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The User id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Book'
 *    responses:
 *      200:
 *        description: The User was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *      404:
 *        description: The User was not found
 *      500:
 *        description: Some error happened
 *   delete:
 *     summary: Remove the User by id
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The User id
 *
 *     responses:
 *       200:
 *         description: The User was deleted
 *       404:
 *         description: The User was not found
 */
 /**
 * @swagger
 * /user/countLastWeekUsers/:
 *   get:
 *     summary: count  user registred from last week
 *     tags: [User]
 *     
 *     responses:
 *       200:
 *         description: users registred from last week
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: no users
 */
router.get('/countLastWeekUsers',countLastWeekUsers);
 /**
 * @swagger
 * /user/registerbymonth/:
 *   get:
 *     summary: count  user registred from last week
 *     tags: [User]
 *     
 *     responses:
 *       200:
 *         description: users registred from last week
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: no users
 */
  router.get('/registerbymonth',month);
/**
 * @swagger
 * /user/countLastWeekUsers/:
 *   get:
 *     summary: count  user registred from last week
 *     tags: [User]
 *     
 *     responses:
 *       200:
 *         description: users registred from last week
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: no users
 */
 router.get('/countLastWeekUsers',countLastWeekUsers);
router
    .route('/')
    .get(getAll)
    .post(register)
    .put(login);
router.post('/fournisseur',registerFourniseur);
/**
 * @swagger
 * /user/resetpwd:
 *   post:
 *     summary: send Code reset password
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: The code  was successfully sent
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Some server error
 */
 router.post('/resetpwd',resetPass)
 /**
 * @swagger
 * /user/changepwd:
 *   post:
 *     summary:  change password
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: The code  was successfully sent
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Some server error
 */
  router.post('/changepwd',changepass)
 /**
 * @swagger
 * /user/resetpassword:
 *   post:
 *     summary:   validate code for reset
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: The password update successfully sent
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Some server error
 */
  router.post('/resetpassword',forgetPass)
  /**
 * @swagger
 * /user/getcommandes/{id}:
 * 
 *   post:
 *     summary: Get all Commande
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: user id
 *     responses:
 *       200:
 *         description: commandes found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Some server error*
 */
   router.get('/getcommandes/:id',FindCommande)
router
    .route('/:id')
    .post(multer,uploadImage)
    .get(getOnce)
    .patch(patchOnce)
    .delete(deleteOnce);
    
/**
 * @swagger
 * /user/verify/{id}:
 *   get:
 *     summary: verify a user  by id
 *     tags: [User]
 *     parameters:
 *       - in : path
 *         name: id
 *         description: id of id
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: verified by  id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: User can not be found
 */
 router.get('/verify/:id',verify);
 /**
 * @swagger
 * /user/ban/{id}:
 *   get:
 *     summary: ban a user  by id
 *     tags: [User]
 *     parameters:
 *       - in : path
 *         name: id
 *         description: id of id
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: ban by  id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: User can not be found
 */
  router.get('/unban/:id',unban);
  /**
 * @swagger
 * /user/ban/{id}:
 *   get:
 *     summary: ban a user  by id
 *     tags: [User]
 *     parameters:
 *       - in : path
 *         name: id
 *         description: id of id
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: ban by  id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: User can not be found
 */
   router.get('/ban/:id',ban);
export default router;