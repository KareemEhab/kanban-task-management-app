import { CanceledError } from "axios";
import { useEffect, useState } from "react";
import apiClient from "../services/api-client";

export interface SubTask {
  _id: string;
  name: string;
  isDone: boolean;
}

export interface Task {
  _id: string;
  name: string;
  description: string;
  subTasks: Partial<SubTask>[];
  currentStatus: string;
}

export interface Board {
  _id: string;
  name: string;
  columns: string[];
  tasks: Partial<Task>[];
  dateCreated: string;
}

const useBoards = () => {
  const [boards, setBoards] = useState<Board[] | null>(null); // Initialize as null
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);

  async function createBoard(newData: Partial<Board>) {
    const response = await apiClient.post("/boards", newData);
    setBoards((prevBoards) => [...(prevBoards || []), response.data]); // Check if prevBoards is null
  }

  async function updateBoard(newData: Partial<Board>, _id: string) {
    const response = await apiClient.put(`/boards/${_id}`, newData);
    setBoards((prevBoards) => {
      if (!prevBoards) return null;
      return prevBoards.map((board) => {
        if (board._id === _id) {
          return { ...board, ...response.data };
        }
        return board;
      });
    });
  }

  async function deleteBoard(_id: string) {
    await apiClient.delete(`/boards/${_id}`);
    setBoards((prevBoards) => {
      if (!prevBoards) return null;
      return prevBoards.filter((board) => board._id !== _id);
    });
  }

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);

    apiClient
      .get("/boards", {
        signal: controller.signal,
      })
      .then((res) => {
        setBoards(res.data);
        setLoading(false);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err.message);
        setLoading(false);
      });

    return () => controller.abort();
  }, []);

  return { boards, error, isLoading, createBoard, updateBoard, deleteBoard };
};

export default useBoards;
