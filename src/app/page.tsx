"use client";

import { useEffect, useState } from "react";
import {
  PlusIcon,
  TrashIcon,
  PencilIcon,
  CheckIcon,
  XIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import axios from "axios";
import { API_BASE_URL } from "@/lib/utils";

// 型
interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

// フロントのコード
export default function TodoApp() {
  // 状態管理
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingText, setEditingText] = useState("");

  // useEffectでGETリクエスト
  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/todos`)
      .then((response) => setTodos(response.data))
      .catch((error) => console.error("Error fetching todos:", error));
  }, []);

  // 新規Todo作成
  const addTodo = () => {
    if (newTodo.trim() !== "") {
      const newTodoItem = {
        id: Date.now().toString(),
        text: newTodo,
        completed: false,
      };
      setTodos([...todos, newTodoItem]);
      setNewTodo("");
      axios
        .post(`${API_BASE_URL}/todos`, newTodoItem)
        .then((response) => console.log("Todo added", response.data))
        .catch((error) => console.error("Error adding todo", error));
    }
  };

  // 完了ボタン
  const toggleTodo = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // 削除ボタン
  const deleteTodo = (id: string) => {
    console.log(id);
    setTodos(todos.filter((todo) => todo.id !== id));
    axios
      .delete(`${API_BASE_URL}/todos/${id}`)
      .then(() => console.log(`Todo with ID ${id} deleted`))
      .catch((error) => console.error("Error deleting todo:", error));
  };

  // 編集ボタン
  const startEditing = (id: string, text: string) => {
    setEditingId(id);
    setEditingText(text);
  };

  // 保存ボタン・チェック
  const saveEdit = () => {
    if (editingText.trim() !== "" && editingId !== null) {
      const updatedTodo = {
        text: editingText,
        completed: todos.find((todo) => todo.id === editingId)?.completed,
      };

      // フロントエンドの表示を即座に更新
      setTodos(
        todos.map((todo) =>
          todo.id === editingId ? { ...todo, text: editingText } : todo
        )
      );
      setEditingId(null);
      setEditingText("");

      // バックエンドにPUTリクエストを送信してデータを更新
      axios
        .put(`${API_BASE_URL}/todos/${editingId}`, updatedTodo)
        .then(() => {
          console.log(`Todo with ID ${editingId} updated`);
        })
        .catch((error) => {
          console.error("Error updating todo:", error);
        });
    }
  };

  // 編集のキャンセル・赤バツ
  const cancelEdit = () => {
    setEditingId(null);
    setEditingText("");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">タスクリスト</h1>
        <div className="flex mb-4">
          <Input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="新しいタスクを入力..."
            className="flex-grow mr-2"
            aria-label="新しいタスク"
          />
          <Button onClick={addTodo} aria-label="タスクを追加">
            <PlusIcon className="h-5 w-5" />
          </Button>
        </div>
        <ul className="space-y-2" role="list" aria-label="タスクリスト">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className="flex items-center bg-gray-50 p-3 rounded-md"
            >
              {editingId === todo.id ? (
                <>
                  <Input
                    type="text"
                    value={editingText}
                    onChange={(e) => setEditingText(e.target.value)}
                    className="flex-grow mr-2"
                    aria-label="タスクを編集"
                  />
                  <Button
                    onClick={saveEdit}
                    size="icon"
                    variant="ghost"
                    aria-label="編集を保存"
                  >
                    <CheckIcon className="h-5 w-5 text-green-500" />
                  </Button>
                  <Button
                    onClick={cancelEdit}
                    size="icon"
                    variant="ghost"
                    aria-label="編集をキャンセル"
                  >
                    <XIcon className="h-5 w-5 text-red-500" />
                  </Button>
                </>
              ) : (
                <>
                  <Checkbox
                    id={`todo-${todo.id}`}
                    checked={todo.completed}
                    onCheckedChange={() => toggleTodo(todo.id)}
                    aria-label={`タスク ${todo.text} を${
                      todo.completed ? "未完了" : "完了"
                    }としてマーク`}
                  />
                  <label
                    htmlFor={`todo-${todo.id}`}
                    className={`ml-2 flex-grow ${
                      todo.completed
                        ? "line-through text-gray-500"
                        : "text-gray-800"
                    }`}
                  >
                    {todo.text}
                  </label>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => startEditing(todo.id, todo.text)}
                    aria-label={`タスク ${todo.text} を編集`}
                  >
                    <PencilIcon className="h-5 w-5 text-gray-500" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => deleteTodo(todo.id)}
                    aria-label={`タスク ${todo.text} を削除`}
                  >
                    <TrashIcon className="h-5 w-5 text-gray-500" />
                  </Button>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
