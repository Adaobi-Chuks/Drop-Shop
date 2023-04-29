interface IUser {
    id: number;
    fullName: string;
    email: string;
    password: string;
    phoneNumber: string;
    birthDate: Date;
    role: string;
    createdAt: Date;
    updatedAt: Date;
}

type IUserOpt = Omit<IUser, 'id' | 'createdAt' | 'updatedAt'>;

export {
    IUser,
    IUserOpt
};

// // properties for seller information
// interface SellerInfo {

// }

// // properties for buyer information
// interface BuyerInfo {

// }