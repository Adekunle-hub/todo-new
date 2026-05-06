import express from "express"
import { Router } from "express"
import { createTodo, getTodos, getTodo, updateTodo, deleteTodo } from "../controller/todoController.js"

const router = Router()


router.post('/', createTodo);
router.get('/', getTodos);
router.get('/:id', getTodo);
router.put('/:id', updateTodo);
router.delete('/:id', deleteTodo);


export default router