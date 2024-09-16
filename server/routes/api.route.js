const {PrismaClient} = require("@prisma/client");
const router = require("express").Router();
const jwt = require("jsonwebtoken");

const prisma = new PrismaClient();

/**
 * @Login Api
 */
const SECRET_KEY = process.env.JWT_SECRETE_KEY;

function authenticateJWT(req, res, next) {
  const token = req.cookies.token;

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

router.post("/login", async (req, res) => {
  const {user_name, password} = req.body;

  try {
    // Find user by user_name
    const user = await prisma.user.findUnique({
      where: {user_name: user_name, password},
    });

    if (user && user.password === password) {
      // Generate JWT token
      const accessToken = jwt.sign(
        {userId: user.id, username: user.user_name},
        SECRET_KEY,
        {
          expiresIn: "1d",
        }
      );
      res
        .cookie("token", accessToken, {
          httpOnly: true,
          secure: false,
        })
        .send({success: true});
    } else {
      res.sendStatus(403); // Forbidden
    }
  } catch (error) {
    // Handle unexpected errors

    res.status(500).send("Error logging in");
    console.log(error);
  }
});

router.post("/logout", (req, res) => {
  res.cookie("token", "", {expires: new Date(0), httpOnly: true, path: "/"});
  res.status(200).send({success: true});
});

router.get("/profile", authenticateJWT, async (req, res) => {
  try {
    // Assuming user information is available in req.user after authentication
    const username = req.user;

    if (username) {
      res.json(username);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    console.error("Profile error:", error);
    res.status(500).send("Error retrieving profile");
  }
});

/**
 * @Users Api Call
 */
router.get("/users", async (req, res, next) => {
  try {
    const users = await prisma.user.findMany({
      include: {
        job_title: true,
        user_type: true,
      },
      orderBy: {
        id: "asc",
      },
    });
    res.json(users);
  } catch (err) {
    console.log(err);
  }
});

router.post("/users", async (req, res, next) => {
  const input = req.body;

  try {
    if (Array.isArray(input)) {
      const results = await Promise.all(
        input.map(async user => {
          const {
            id,
            user_name,
            first_name,
            last_name,
            email,
            job_id,
            user_type_id,
            tenant_id,
            order,
          } = user;

          let jobId = await prisma.job_title.findUnique({
            where: {
              id: Number(job_id),
            },
          });
          let userTypeId = await prisma.user_type.findUnique({
            where: {
              id: Number(user_type_id),
            },
          });
          const userId = id;
          const isTimeStamp = userId > 1e10;
          if (isTimeStamp) {
            return prisma.user.create({
              data: {
                user_name,
                first_name,
                last_name,
                email,
                password: "",
                job_id: jobId.id,
                user_type_id: userTypeId.id,
                tenant_id,
                order,
              },
            });
          } else {
            return prisma.user.update({
              where: {
                id: id,
              },
              data: {
                user_name,
                first_name,
                last_name,
                email,
                job_id: jobId.id,
                user_type_id: userTypeId.id,
                tenant_id,
                order,
              },
            });
          }
        })
      );
      res.json(results);
    } else {
      const {
        id,
        user_name,
        first_name,
        middle_name,
        last_name,
        job_title,
        job_id,
        email,
        password,
        conf_password,
        user_type,
        user_type_id,
        tenant_id,
        order,
      } = input;
      if (job_id && job_title) {
        await prisma.job_title.upsert({
          where: {id: job_id},
          update: {title: job_title},
          create: {id: job_id, title: job_title},
        });
      }

      // Handle userType upsert if provided
      if (user_type_id && user_type) {
        await prisma.user_type.upsert({
          where: {id: user_type_id},
          update: {type: user_type},
          create: {id: user_type_id, type: user_type},
        });
      }

      let user;
      if (id) {
        user = await prisma.user.update({
          where: {id: id},
          data: {
            user_name,
            first_name,
            middle_name,
            last_name,
            email,
            password,
            conf_password,
            tenant_id,
            order,
            job_title: job_id ? {connect: {id: job_id}} : undefined,
            user_type: user_type_id ? {connect: {id: user_type_id}} : undefined,
          },
        });
      } else {
        user = await prisma.user.create({
          data: {
            user_name,
            first_name,
            middle_name,
            last_name,
            email,
            password,
            conf_password,
            tenant_id,
            order,
            job_title: job_id ? {connect: {id: job_id}} : undefined,
            user_type: user_type_id ? {connect: {id: user_type_id}} : undefined,
          },
        });
      }
      res.json(user);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({message: "An Error Occurred"});
  }
});

router.put("/users", async (req, res, next) => {
  const users = req.body;

  try {
    const updatePromise = users.map(async user => {
      const {
        id,
        job_id,
        user_type_id,
        user_name,
        first_name,
        last_name,
        email,
        tenant_id,
      } = user;

      let jobId = await prisma.job_title.findUnique({
        where: {
          id: Number(job_id),
        },
      });
      let userTypeId = await prisma.user_type.findUnique({
        where: {
          id: Number(user_type_id),
        },
      });

      return prisma.user.update({
        where: {
          id: id,
        },
        data: {
          user_name,
          first_name,
          last_name,
          email,
          job_id: jobId.id,
          user_type_id: userTypeId.id,
          tenant_id,
        },
      });
    });

    const updatedUsers = await Promise.all(updatePromise);
    res.json(updatedUsers);
    console.log(updatedUsers);
  } catch (error) {
    console.error(error);
    res.status(500).json({message: "An error occurred"});
  }
});

router.patch("/users/:id", async (req, res, next) => {
  const {first_name, last_name, job_title, job_id} = req.body;

  try {
    const {id} = req.params;
    if (job_title) {
      await prisma.job_title.update({
        where: {
          id: job_id,
        },
        data: {
          title: job_title,
        },
      });
    }
    const updateUser = await prisma.user.update({
      where: {
        id: Number(id),
      },
      data: {
        first_name,
        last_name,
      },
      include: {
        job_title: true,
      },
    });
    res.json(updateUser);
  } catch (error) {
    console.log(error);
  }
});

router.delete("/users/:id", async (req, res, next) => {
  try {
    const {id} = req.params;
    const deleteUser = await prisma.user.delete({
      where: {
        id: Number(id),
      },
    });
    res.json(deleteUser);
    console.log(id);
  } catch (error) {
    console.log(error);
  }
});

/**
 * @Employees API CALL
 */

router.get("/employees", async (req, res, next) => {
  const departmentId = req.query.departmentId
    ? parseInt(req.query.departmentId)
    : null;

  try {
    const employees = await prisma.employee.findMany({
      where: departmentId
        ? {
            departmentId: departmentId,
          }
        : undefined,
      include: {
        department: true,
      },
    });
    res.json(employees);
  } catch (err) {
    console.log(err);
    next(err); // Pass the error to the next middleware for proper error handling
  }
});

router.post("/employees", async (req, res, next) => {
  const {id, emp_name, email, first_name, last_name, job_title, departmentId} =
    req.body;
  try {
    let department = await prisma.department.findUnique({
      where: {
        id: departmentId,
      },
    });

    const employee = await prisma.employee.create({
      data: {
        id,
        emp_name,
        email,
        first_name,
        last_name,
        job_title,
        departmentId: department.id,
      },
    });
    res.json(employee);
  } catch (error) {
    console.log(error);
  }
});

router.patch("/employees/:id", async (req, res, next) => {
  const {id} = req.params;
  const {emp_name, email, first_name, last_name, job_title, departmentId} =
    req.body;
  try {
    // Update the employee record
    const updatedEmployee = await prisma.employee.update({
      where: {id: Number(id)},
      data: {
        id: Number(id),
        emp_name,
        email,
        first_name,
        last_name,
        job_title,
        departmentId: Number(departmentId),
      },
      include: {department: true},
    });

    res.json(updatedEmployee);
  } catch (error) {
    console.error(error);
    res.status(500).json({message: "An error occurred"});
  }
});

router.delete("/employees/:id", async (req, res, next) => {
  try {
    const {id} = req.params;
    const deleteUser = await prisma.employee.delete({
      where: {
        id: Number(id),
      },
    });
    res.json(deleteUser);
    console.log(id);
  } catch (error) {
    console.log(error);
  }
});

/**
 * @Department API Call
 */
router.get("/departments", async (req, res, next) => {
  try {
    const departments = await prisma.department.findMany({
      orderBy: {
        id: "asc",
      },
    });
    res.json(departments);
  } catch (err) {
    console.log(err);
  }
});

router.post("/departments", async (req, res, next) => {
  try {
    const department = await prisma.department.create({
      data: req.body,
    });
    res.json(department);
  } catch (error) {
    console.log(error);
  }
});

router.patch("/departments/:id", async (req, res, next) => {
  try {
    const {id} = req.params;
    const updateDept = await prisma.department.update({
      where: {
        id: Number(id),
      },
      data: req.body,
    });
    res.json(updateDept);
  } catch (error) {
    console.log(error);
  }
});

router.delete("/departments/:id", async (req, res, next) => {
  try {
    const {id} = req.params;
    await prisma.employee.deleteMany({
      where: {departmentId: parseInt(id)},
    });
    const deleteDept = await prisma.department.delete({
      where: {
        id: Number(id),
      },
    });
    res.json(deleteDept);
    console.log(id);
  } catch (error) {
    console.log(error);
  }
});

/**
 * @GET_TITLE_AND_USER_TYPES
 */

router.get("/jobTitle", async (req, res, next) => {
  try {
    const titles = await prisma.job_title.findMany();
    res.json(titles);
  } catch (err) {
    console.log(err);
  }
});

router.get("/userTypes", async (req, res, next) => {
  try {
    const types = await prisma.user_type.findMany();
    res.json(types);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
