package com.ak.taskmanagement.task_management;

import java.util.List;
import java.util.Optional;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TaskService {

    @Autowired
    private TaskRepository taskRepository;

    public List<Task> getAllTasks(){
        return taskRepository.findAll();
    }

    public Task createTask(Task task){
        return taskRepository.save(task);
    }

     public Task updateTask(Long id, Task taskDetails) {
        Optional<Task> taskOptional = taskRepository.findById(id);
        
        if (taskOptional.isPresent()) {
            Task task = taskOptional.get();
            task.setTitle(taskDetails.getTitle());
            task.setDescription(taskDetails.getDescription());
            task.setCompleted(taskDetails.isCompleted());
            return taskRepository.save(task);
        } else {
            throw new RuntimeException("Task not found with id " + id);
        }
    }

    public void deleteTask(Long id) {
        if (taskRepository.existsById(id)) {
            taskRepository.deleteById(id);
        } else {
            throw new RuntimeException("Task not found with id " + id);
        }
    }
    
}
