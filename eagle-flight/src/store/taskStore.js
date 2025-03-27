import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useTaskStore = defineStore('taskStore', () => {
    const selectedTask = ref(null);

    function setSelectedTask(task) {
        selectedTask.value = task;
    }

    function cancelSelectedTask() {
        selectedTask.value = null;
    }

    return { selectedTask, setSelectedTask, cancelSelectedTask };
});
