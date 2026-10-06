import { useEffect, useState } from "react";
import "./App.css";
import EmployeeCard from "./EmployeeCard";
import EmployeeForm from "./EmployeeForm";
import {
  getEmployees,
  addEmployee,
  updateEmployee,
  deleteEmployee,
} from "./api";
import type { Employee } from "./types";

function App() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [employeeToEdit, setEmployeeToEdit] =
    useState<Employee | null>(null);

  // GET employees
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        setLoading(true);

        const data = await getEmployees();

        setEmployees(data);
      } catch (error) {
        setError("Failed to load employees");
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  // POST employee
  const handleAddEmployee = async (
    employee: Omit<Employee, "id">
  ) => {
    try {
      const newEmployee = await addEmployee(employee);

      setEmployees((prev) => [...prev, newEmployee]);
    } catch (error) {
      setError("Failed to add employee");
    }
  };

  // PUT employee
  const handleUpdateEmployee = async (
    id: number,
    employee: Omit<Employee, "id">
  ) => {
    try {
      const updatedEmployee = await updateEmployee(id, employee);

      setEmployees((prev) =>
        prev.map((emp) =>
          emp.id === id ? { ...emp, ...updatedEmployee } : emp
        )
      );

      setEmployeeToEdit(null);
    } catch (error) {
      setError("Failed to update employee");
    }
  };

  // DELETE employee
  const handleDeleteEmployee = async (id: number) => {
    try {
      await deleteEmployee(id);

      setEmployees((prev) =>
        prev.filter((emp) => emp.id !== id)
      );
    } catch (error) {
      setError("Failed to delete employee");
    }
  };

  if (loading) {
    return <h2>Loading employees...</h2>;
  }

  return (
    <div className="container">
      <h1>Employee Management System</h1>

      {error && <p className="error">{error}</p>}

      <EmployeeForm
        employeeToEdit={employeeToEdit}
        onSave={handleAddEmployee}
        onUpdate={handleUpdateEmployee}
        onCancel={() => setEmployeeToEdit(null)}
      />

      <hr />

      <h2>Employees</h2>

      <div className="employee-list">
        {employees.map((employee) => (
          <EmployeeCard
            key={employee.id}
            employee={employee}
            onEdit={setEmployeeToEdit}
            onDelete={handleDeleteEmployee}
          />
        ))}
      </div>
    </div>
  );
}

export default App;