// user-controller.ts
import { Request, Response } from 'express';
import { UserServices } from '../../service/user.service';
import { ResponseParser } from '../../util/response-parser';

const userServices = new UserServices();

const AddUsers = async (req: Request, res: Response) => {
    const id = req.params.id;
    const { username, password, permissionId } = req.body;

    try {
        const isAdmin = await userServices.isAdmin(parseInt(id));

        if (!isAdmin) {
            ResponseParser.parseAndSend(403, false, "Sorry, you are not an admin", "ERR40301", {}, res);
            return;
        }

        const newUser = await userServices.addUser(username, password, permissionId);
        ResponseParser.parseAndSend(200, true, "User added successfully", "SUC20001", { user: newUser }, res);
    } catch (error) {
        console.error("Error in AddUsers controller:", error);
        ResponseParser.parseAndSend(500, false, "Internal server error", "ERR50001", {}, res);
    }
};

const RemoveUser = async (req: Request, res: Response) => {
    const id = req.params.id;

    try {
        await userServices.removeUser(parseInt(id));
        ResponseParser.parseAndSend(200, true, "User deleted successfully", "SUC20002", {}, res);
    } catch (error) {
        console.error("Error in RemoveUser controller:", error);
        ResponseParser.parseAndSend(404, false, "Bad request", "ERR40401", {}, res);
    }
};

export { AddUsers, RemoveUser };
