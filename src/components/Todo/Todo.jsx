import { useState, useEffect } from "react";
import "./Todo1.css";
import { TodoForm } from "./TodoForm";
import { TodoList } from "./TodoList";
import { TodoDate } from "./TodoDate";
import { getLocalStorageTodoData, setLocalStorageTodoData } from "./TodoLocal";
import PopupReminder from "./TodoReminder";
import useSound from 'use-sound';
import soundFile from './sound.mp3';

export const Todo = () => {
  const [task, setTask] = useState(() => getLocalStorageTodoData());
  const [reminder, setReminder] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [play, { stop }] = useSound(soundFile);

  useEffect(() => {
    const reminderInterval = setInterval(() => {
      console.log("Reminder triggered!");
      setReminder("Reminder: You have tasks to complete!");
      setShowPopup(true);
    
      play(); // Play the sound when the reminder is triggered
    }, 2  * 60 * 1000); // Trigger every 5 hours

    return () => {
      clearInterval(reminderInterval);
    };
  }, [task]);

  // ... rest of the code remains the same ...

  const handleReminderClose = () => {
    setShowPopup(false);
    stop(); // Stop the sound when the reminder is closed
  };

  // ... rest of the code remains the same ...

  const handleFormSubmit = (inputValue) => {
    const { id, content, checked } = inputValue;

    //to check if the input field is empty or not
    if (!content) return;

    // to check if the data is already existing or not
    // if (task.includes(inputValue)) return;
    const ifTodoContentMatched = task.find(
      (curTask) => curTask.content === content
    );
    if (ifTodoContentMatched) return;

    setTask((prevTask) => [
      ...prevTask,
      { id, content, checked, reminder: false },
    ]);
  };

  //todo add data to localStorage
  setLocalStorageTodoData(task);

  //todo handleDeleteTodo function
  const handleDeleteTodo = (value) => {
    const updatedTask = task.filter((curTask) => curTask.content !== value);
    setTask(updatedTask);
  };

  //todo handleClearTodoData functionality
  const handleClearTodoData = () => {
    setTask([]);
  };

  //todo handleCheckedTodo functionality
  const handleCheckedTodo = (content) => {
    const updatedTask = task.map((curTask) => {
      if (curTask.content === content) {
        return { ...curTask, checked: !curTask.checked };
      } else {
        return curTask;
      }
    });
    setTask(updatedTask);
  };

  const handleReminder = (taskId) => {
    setTask((prevTask) =>
      prevTask.map((taskItem) =>
        taskItem.id === taskId ? { ...taskItem, reminder: true } : taskItem
      )
    );
  };

 

  return (
    <section className="todo-container">
     
      {showPopup && (
        <PopupReminder reminder={reminder} onClose={handleReminderClose} />
      )}
      <header>
        <h1>Todo List</h1>
        <TodoDate />
      </header>

      <TodoForm onAddTodo={handleFormSubmit} />

      <section className="myUnOrdList">
        <ul>
          {task.map((curTask) => {
            return (
              <TodoList
                key={curTask.id}
                data={curTask.content}
                checked={curTask.checked}
                reminder={curTask.reminder}
                onHandleDeleteTodo={handleDeleteTodo}
                onHandleCheckedTodo={handleCheckedTodo}
                onHandleReminder={() => handleReminder(curTask.id)}
              />
            );
          })}
        </ul>
      </section>
      <section>
        <button className="clear-btn" onClick={handleClearTodoData}>
          Clear all
        </button>
      </section>
      {reminder && <p>{reminder}</p>}
    </section>
  );
};