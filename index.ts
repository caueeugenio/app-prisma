import { PrismaClient } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";
import express from "express";

const prisma = new PrismaClient();
const app = express();

app.use(express.json()); // pra garantir que nossa apliacacao vai resceber o tipo de dados json
app.set("view engine", "pug");
type StudentDTO = {
  name: string;
  email: string;
  grade: Decimal;
};
let allStudents: any;
app.get("/", async (req, res) => {
  allStudents = await prisma.student.findMany();
  res.render("students-view", { allStudents });
//   res.send(allStudents);
});

app.post("/", async (req, res) => {
  const data: StudentDTO = req.body;
  const student = await prisma.student.create({
    data: {
      name: data.name,
      email: data.email,
      grade: data.grade,
    },
  });
  res.send(student);
});

app.listen(3000, () => {
  console.log("Rodando na porta 3000.");
});
