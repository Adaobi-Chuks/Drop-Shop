import { Request, Response } from "express";
import cloudinary from "../configs/cloudinary.config";
import { generateAuthToken } from "../services/auth.service";
import { MAXAGE, MESSAGES } from "../configs/constants.config";
import Service from "../services/user.service";
import User from '../models/user.model';
const UserModel = User;
// Create an instance of the UserService class
const UserService = new Service(UserModel);
const {
    CREATED,
    DUPLICATE_EMAIL,
    DUPLICATE_PHONENUMBER,
    DUPLICATE_IMAGE
} = MESSAGES.USER

export default class UserController {

    async createUser(req: Request, res: Response) {
        const {email, phoneNumber} = req.body;

        //checks if another user with email exists
        if (await UserService.findOne({email})) {
            //sends an error if the email exists
            return res.status(409)
            .send({
                success: false,
                message: DUPLICATE_EMAIL
            });
        }
        //checks if another user with phoneNumber exists
        if (await UserService.findOne({phoneNumber})) {
            //sends an error if the userName exists
            return res.status(409)
            .send({
                success: false,
                message: DUPLICATE_PHONENUMBER
            });
        }

        let imageUrl;
        if (req.file) {
            // Upload file to Cloudinary
            const result = await cloudinary.uploader.upload(req.file.path);
            imageUrl = result.secure_url;
            
            //checks if another user with imageUrl exists
            if (await UserService.findOne({imageUrl})) {
                //sends an error if the email exists
                return res.status(409)
                .send({
                    success: false,
                    message: DUPLICATE_IMAGE
                });
            }
        }

        //create a new user
        const createdUser = await UserService.create( {
            ...req.body,
            imageUrl: imageUrl
        });
        
        const token = generateAuthToken(createdUser as any);
        res.cookie("token", token, {
            httpOnly: true, 
            maxAge: MAXAGE * 1000 
        });
    
        // Return success message
        return res.status(201)
        .send({
            success: true,
            message: CREATED,
            createdUser: createdUser
            
        });    
    }
}