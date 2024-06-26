import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTask, deletetask, getTask, updatetask } from "../redux/taskSlice";
interface Task {
  id: number;
  text: string;
  completed: boolean;
}
export default function todoList() {
  const tasks = useSelector((state: any) => state.tasks.task);
  console.log(tasks);

  const dispatch = useDispatch();
  const [newTask, setNewTask] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showWarningModal, setShowWarningModal] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<null | number>(null);
  useEffect(() => {
    dispatch(getTask());
  }, []);
  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTask.trim() === "") {
      setShowWarningModal(true);
      return;
    }
    const addNew = {
      text: newTask,
      completed: false,
    };

    dispatch(addTask(addNew));
    setNewTask("");
  };

  const handleDeleteTask = (taskId: number) => {
    dispatch(deletetask(taskId));
    setShowDeleteModal(false);
  };

  return (
    <div>
      <section className="vh-100 gradient-custom">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col col-xl-10">
              <div className="card">
                <div className="card-body p-5">
                  <form
                    className="d-flex justify-content-center align-items-center mb-4"
                    onSubmit={handleAddTask}
                  >
                    <div className="form-outline flex-fill">
                      <input
                        type="text"
                        id="form2"
                        className="form-control"
                        value={newTask}
                        onChange={(e) => setNewTask(e.target.value)}
                      />
                      <label className="form-label" htmlFor="form2">
                        Nhập tên công việc
                      </label>
                    </div>
                    <button type="submit" className="btn btn-info ms-2">
                      Thêm
                    </button>
                  </form>

                  {/* Tabs navs */}
                  <ul className="nav nav-tabs mb-4 pb-2">
                    <li className="nav-item" role="presentation">
                      <a className="nav-link active" onClick={}>Tất cả</a>
                    </li>
                    <li className="nav-item" role="presentation">
                      <a className="nav-link">Đã hoàn thành</a>
                    </li>
                    <li className="nav-item" role="presentation">
                      <a className="nav-link">Chưa hoàn thành</a>
                    </li>
                  </ul>
                  {/* Tabs navs */}

                  {/* Tabs content */}
                  <div className="tab-content" id="ex1-content">
                    <div className="tab-pane fade show active">
                      <ul className="list-group mb-0">
                        {tasks.map((task: Task) => (
                          <li
                            key={task.id}
                            className="list-group-item d-flex align-items-center justify-content-between border-0 mb-2 rounded"
                            style={{ backgroundColor: "#f4f6f7" }}
                          >
                            <div>
                              <input
                                className="form-check-input me-2"
                                type="checkbox"
                                checked={task.completed}
                                onChange={() =>
                                  dispatch(
                                    updatetask({
                                      ...task,
                                      completed: !task.completed,
                                    })
                                  )
                                }
                              />
                              {task.completed ? (
                                <s>{task.text}</s>
                              ) : (
                                <span>{task.text}</span>
                              )}
                            </div>
                            <div className="d-flex gap-3">
                              <i className="fas fa-pen-to-square text-warning"></i>
                              <i
                                className="far fa-trash-can text-danger"
                                onClick={() => {
                                  setTaskToDelete(task.id);
                                  setShowDeleteModal(true);
                                }}
                              ></i>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Modal xác nhận xóa */}
      {showDeleteModal && (
        <div className="overlay">
          <div className="modal-custom">
            <div className="modal-header-custom">
              <h5>Xác nhận</h5>
              <i
                className="fas fa-xmark"
                onClick={() => setShowDeleteModal(false)}
              ></i>
            </div>
            <div className="modal-body-custom">
              <p>Bạn chắc chắn muốn xóa công việc này?</p>
            </div>
            <div className="modal-footer-footer">
              <button
                className="btn btn-light"
                onClick={() => setShowDeleteModal(false)}
              >
                Hủy
              </button>
              <button
                className="btn btn-danger"
                onClick={() =>
                  taskToDelete !== null && handleDeleteTask(taskToDelete)
                }
              >
                Xóa
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal cảnh báo lỗi */}
      {showWarningModal && (
        <div className="overlay">
          <div className="modal-custom">
            <div className="modal-header-custom">
              <h5>Cảnh báo</h5>
              <i
                className="fas fa-xmark"
                onClick={() => setShowWarningModal(false)}
              ></i>
            </div>
            <div className="modal-body-custom">
              <p>Tên công việc không được phép để trống.</p>
            </div>
            <div className="modal-footer-footer">
              <button
                className="btn btn-light"
                onClick={() => setShowWarningModal(false)}
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
