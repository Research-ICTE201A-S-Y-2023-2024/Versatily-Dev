import Workbench from "../models/workbenchModel.js";

export const getAllWorkbench = async (request, response) => {
    try {
        const workbench = await Workbench.findAll();
        response.json(workbench);
    } catch (error) {
        response.json({
            message: error.message
        })
    }
}

export const getWorkbenchById = async (request, response) => {
    try {
        const workbench = await Workbench.findOne({
            where: {
                id: request.params.id
            }
        });
    
        if (!workbench) {
            return response.status(404).json({ msg: "Workbench not found" });
        }
    
        response.json(workbench);
    } catch (error) {
        response.status(500).json({ msg: error.message });
    }
}

// create Workbench
export const saveWorkbench = async (request, response) => {
    const {workbenchID, status} = request.body;

    if (!workbenchID || !status) {
        return response.status(400).json({ msg: "workbenchID and status are required fields" });
    }

    try {
        await Workbench.create({
            workbenchID,
            status,
            createdAt: new Date(),
            updatedAt: new Date()
        });

        return response.status(201).json({ msg: "Workbench Created Successfully" });
    } catch (error) {
        console.error(error);
        return response.status(500).json({ msg: error.message });
    }
}

// update Workbench
export const updateWorkbench = async (request, response) => {
    try {
        const workbench = await Workbench.findByPk(request.params.id);
        
        if(!workbench) {
            return response.status(404).json({message: "Workbench not found"});
        }
        await workbench.update(request.body);
        response.json({message: "Workbench updated succesfully"});
    } catch (error) {
        response.status(400).json({
            message: error.message
        })
    }
}

// Delete Workbench
export const deleteWorkbench = async (request, response) => {
    try {
        const workbench = await Workbench.findByPk(request.params.id);

        if(!workbench) {
            return response.status(404).json({message: "Workbench not found"});
        }
        await workbench.destroy();
        response.json({message: "Workbench deleted successfully"});
    } catch (error) {
        response.status(400).json({
            message: error.message
        });
    }
}