import type { Employee } from "./types";

type EmployeeCardProps = {
  employee: Employee;
  onEdit: (employee: Employee) => void;
  onDelete: (id: number) => void;
};

function EmployeeCard({
  employee,
  onEdit,
  onDelete,
}: EmployeeCardProps) {
  return (
    <div className="employee-card">
      <h3>
        {employee.firstName} {employee.lastName}
      </h3>

      <p>{employee.email}</p>

      <div className="card-actions">
        <button onClick={() => onEdit(employee)}>
          Edit
        </button>

        <button onClick={() => onDelete(employee.id)}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default EmployeeCard;