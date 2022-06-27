import { Router } from "express";
import { userRouter } from "../../../modules/users/routes/user.routes";
import { permissionRouter } from "../../../modules/permissions/routes/permission.routes";
import { productRouter } from "../../../modules/products/routes/product.routes";
import { roleRouter } from "../../../modules/roles/routes/role.routes";
import { sessionRouter } from "../../../modules/users/routes/session.routes";

const router = Router();

router.use("/user", userRouter);
router.use("/permission", permissionRouter);
router.use("/product", productRouter);
router.use("/role", roleRouter);
router.use("/session", sessionRouter);

export { router };
