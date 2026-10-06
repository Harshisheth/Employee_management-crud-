    import { useEffect, useState } from "react";
import type { Employee } from "./types";

type EmployeeFormProps = {
  employeeToEdit: Employee | null;
  onSave: (employee: Omit<Employee, "id">) => void;
  onUpdate: (id: number, employee: Omit<Employee, "id">) => void;
  onCancel: () => void;
};

function EmployeeForm({
  employeeToEdit,
  onSave,
  onUpdate,
  onCancel,
}: EmployeeFormProps) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (employeeToEdit) {
      setFirstName(employeeToEdit.firstName);
      setLastName(employeeToEdit.lastName);
      setEmail(employeeToEdit.email);
    } else {
      setFirstName("");
      setLastName("");
      setEmail("");
    }
  }, [employeeToEdit]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const employeeData = {
      firstName,
      lastName,
      email,
    };

    if (employeeToEdit) {
      onUpdate(employeeToEdit.id, employeeData);
    } else {
      onSave(employeeData);
    }

    setFirstName("");
    setLastName("");
    setEmail("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>
        {employeeToEdit ? "Edit Employee" : "Add Employee"}
      </h2>

      <input
        type="text"
        placeholder="First Name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />

      <input
        type="text"
        placeholder="Last Name"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <button type="submit">
        {employeeToEdit ? "Update" : "Add"}
      </button>

      {employeeToEdit && (
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      )}
    </form>
  );
}

export default EmployeeForm;