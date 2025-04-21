import { defineStore } from 'pinia';
import { ref } from 'vue';
import taskServices from '@/services/eagle-flight/taskServices'

export const useTaskStore = defineStore('taskStore', () => {
    const selectedTask = ref(null);
    const allTasks = ref([]);

    getTasks()
    function getTasks() {
        taskServices.getAll().then(
            response => {
                allTasks.value = response.data
            }
        ).catch(
            error => {
                console.log(error)
            }
        )
    }

    function setSelectedTask(task) {
        selectedTask.value = task;
    }

    function cancelSelectedTask() {
        selectedTask.value = null;
    }

    return { selectedTask, allTasks, setSelectedTask, cancelSelectedTask, getTasks };
});
