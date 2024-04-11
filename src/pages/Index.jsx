import React, { useState } from "react";
import { Box, Heading, Input, Button, Flex, Text, Checkbox, IconButton, Spacer, VStack, HStack } from "@chakra-ui/react";
import { FaPlus, FaTrash, FaEdit } from "react-icons/fa";

const TodoApp = () => {
  const [todos, setTodos] = useState([
    { id: 1, text: "Buy groceries", completed: false },
    { id: 2, text: "Do laundry", completed: true },
    { id: 3, text: "Clean bathroom", completed: false },
  ]);
  const [newTodo, setNewTodo] = useState("");
  const [editTodo, setEditTodo] = useState(null);

  const addTodo = () => {
    if (newTodo.trim() !== "") {
      setTodos([...todos, { id: Date.now(), text: newTodo, completed: false }]);
      setNewTodo("");
    }
  };

  const toggleComplete = (id) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const updateTodo = () => {
    setTodos(todos.map((todo) => (todo.id === editTodo.id ? { ...todo, text: editTodo.text } : todo)));
    setEditTodo(null);
  };

  return (
    <Box maxWidth="500px" mx="auto" mt={8} p={4}>
      <Heading mb={8} textAlign="center">
        Todo App
      </Heading>
      <Flex mb={8}>
        <Input value={newTodo} onChange={(e) => setNewTodo(e.target.value)} placeholder="Enter a new task" mr={4} />
        <Button onClick={addTodo} colorScheme="blue" leftIcon={<FaPlus />}>
          Add
        </Button>
      </Flex>
      <VStack spacing={4} align="stretch">
        {todos.map((todo) => (
          <HStack key={todo.id}>
            <Checkbox isChecked={todo.completed} onChange={() => toggleComplete(todo.id)} />
            {editTodo?.id === todo.id ? (
              <Input value={editTodo.text} onChange={(e) => setEditTodo({ ...editTodo, text: e.target.value })} />
            ) : (
              <Text flex={1} textDecoration={todo.completed ? "line-through" : "none"}>
                {todo.text}
              </Text>
            )}
            <Spacer />
            {editTodo?.id === todo.id ? <IconButton icon={<FaEdit />} onClick={updateTodo} aria-label="Update todo" /> : <IconButton icon={<FaEdit />} onClick={() => setEditTodo(todo)} aria-label="Edit todo" />}
            <IconButton icon={<FaTrash />} onClick={() => deleteTodo(todo.id)} aria-label="Delete todo" />
          </HStack>
        ))}
      </VStack>
    </Box>
  );
};

export default TodoApp;
