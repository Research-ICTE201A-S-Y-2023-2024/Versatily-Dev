import userRoles from "../models/userRoles_model.js"

export const createUserRole = async(req, res) =>{

    try{
        const {userRole_name} = req.body

        const existingRole = await userRoles.findOne({where: {role_name: userRole_name}})

        if (existingRole){
            return res.status(401).json({ message: "User role already exists!" });
        }

        const role = await userRoles.create({
            role_name: userRole_name
        })
        res.status(201).json({ message: 'User Role created successfully', role });
    } catch (error){
        
        res.status(500).json({ message: 'Internal server error' });
    }

}