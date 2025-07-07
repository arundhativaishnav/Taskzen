import {Task } from '../models/Tasks.js';

export const AddTask = async (req ,res) =>{
    try {
        const {  title, description, importance, urgency } = req.body;

        if(!title || !title.trim()){
            return res.status(400).json({ message: 'Title is required' }); 
        }

        const newTask = await Task.create({
            user:req.user._id, // Assuming req.user is set by the protect middleware
            title:title.trim(),
            description: description?.trim(),
            importance,
            urgency
        })
        return res.status(201).json({
            message: 'Task created successfully',
            task: newTask
        });
        
    } catch (error) {
        res.status(500).json({
            message: 'Internal server error',
            error: error.message
        });
        console.log(error);
    }
}

export const getMyTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ user: req.user._id }).sort({ timestamp: -1 });
        return res.status(200).json(tasks);
    } catch (error) {
        return res.status(500).json({
            message: 'Internal server error',
            error: error.message
        });
        console.log(error);
    }
}
export const getTaskById = async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, user: req.user._id });
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching task', error: err.message });
  }
};
export const updateTask = async (req, res) => {
    try {
        const task = await Task.findByIdAndUpdate({
            _id : req.params.id,
        user: req.user._id
        }, req.body,{new :true});

        if(!task){
            return res.status(404).json({
                message: 'Task not found'
            })
        }
        res.json(task);
    } catch (error) {
        res.status(500).json({
            message: 'Internal server error',
            error: error.message
        });
        console.log(error);
    }
}

export const deleteTask = async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete({
            _id : req.params.id,
            user: req.user._id
        }); 
        if(!task){
            return res.status(404).json({
                message: 'Task not found'
            })
        }
        res.json({
            message: 'Task deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            message: 'Internal server error',
            error: error.message
        });
        console.log(error);
    }
}

export const markTaskAsCompleted = async (req, res) => {
    try {
        const taskId = req.params.id;
        const userId = req.user.id;

        const task = await Task.findOneAndUpdate({
            _id : taskId,
            user: userId
        });
        if(!task){
            return res.status(400).json({
                message: 'Task not found or you do not have permission to update this task'
            })
        }
        task.cpmleted = true ;
        await task.save();
        res.json({
            message: 'Task marked as completed successfully',
            task
        });

    } catch (error) {
        res.status(500).json({
            message: 'Internal server error',
            error: error.message    
        });
        console.log(error);
        
    }
}