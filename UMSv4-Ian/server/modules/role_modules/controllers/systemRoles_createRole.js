import systemRoles from "../models/systemRoles_model";

export const createUserRole = async(req, res) =>{

    try{
        const {systemRole_name, systemRole_prefix} = req.body

        const existingRole = await systemRoles.findOne({where: {role_name: userRole_name}})

        if (existingRole){
            return res.status(401).json({ message: "System role already exists!" });
        }

        const role = await userRoles.create({
            role_name: systemRole_name,
            role_prefix: systemRole_prefix
        })
        res.status(201).json({ message: 'System Role created successfully', role });
    } catch (error){
        
        res.status(500).json({ message: 'Internal server error' });
    }

}