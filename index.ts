import { PrismaClient } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";
import express from "express";

const prisma = new PrismaClient();
const app = express();
const bodyParser = require("body-parser");
app.use(express.json()); // pra garantir que nossa apliacacao vai resceber o tipo de dados json
app.set("view engine", "pug");
app.use(bodyParser.urlencoded({ extended: true }));
type StudentDTO = {
  name: string;
  email: string;
  grade: Decimal;
};
let allStudents: any;
app.get("/", async (req, res) => {
  allStudents = await prisma.student.findMany({
    orderBy: {
      name: "asc",
    },
  });
  res.render("students-view", { allStudents });
});

app.get("/register", async (req, res) => {
  res.render("register-student-view", {});
});
app.post("/register", async (req, res) => {
  const data: StudentDTO = req.body;
  try {
    await prisma.student.create({
      data: {
        name: data.name,
        email: data.email,
        grade: data.grade,
      },
    });
    res.redirect("/");
  } catch (error) {
    res.status(500).send("Erro ao realizar cadastro.");
    res.redirect("/");
  }
});

app.listen(3000, () => {
  console.log("Rodando na porta 3000.");
});
