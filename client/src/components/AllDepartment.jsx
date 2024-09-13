import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const depts = [
  {
    id: "01",
    name: "Allu Khan",
    action: "",
  },
  {
    id: "02",
    firstName: "Allu Khan",
    action: "",
  },
  {
    id: "03",
    firstName: "Unpaid",
    action: "",
  },
];
const AllDepartment = () => {
  return (
    <div className="m-6 border rounded">
      <h2 className="text-2xl bold text-center p-6">Departments Table</h2>
      <hr className="mx-4" />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Id</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {depts.map(dept => (
            <TableRow key={dept.id}>
              <TableCell>{dept.id}</TableCell>
              <TableCell>{dept.name}</TableCell>

              <TableCell>{dept.action}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AllDepartment;
