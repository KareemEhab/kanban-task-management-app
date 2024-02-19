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
  const [boards, setBoards] = useState<Board[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);

  async function createBoard(newData: Partial<Board>) {
    const response = await apiClient.post("/boards", newData);
    setBoards([...boards, response.data]);
  }

  async function updateBoard(newData: Partial<Board>, _id: string) {
    const response = await apiClient.put(`/boards/${_id}`, newData);
    const updatedBoards = boards.map((board) => {
      if (board._id === _id) {
        return { ...board, ...response.data };
      }
      return board;
    });
    setBoards(updatedBoards);
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

  return { boards, error, isLoading, createBoard, updateBoard };
};

export default useBoards;
