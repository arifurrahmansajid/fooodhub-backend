import { toNodeHandler } from "better-auth/node";
import express, { Application, Request, Response } from "express";
import { auth } from "./lib/auth";
import { authRouter } from "./modules/auth/auth.router";
import { mealRouter } from "./modules/meal/meal.route";
import { categoryRouter } from "./modules/category/category.route";
import { providerProfileRouter } from "./modules/providerProfile/providerProfile.route";
import { errorHandler } from "./middlewares/errorHandler";
import { addressRouter } from "./modules/address/address.route";
import { orderRouter } from "./modules/order/order.route";
import { providerRouter } from "./modules/provider/provider.route";
import { adminRouter } from "./modules/admin/admin.route";
import cors from "cors";

const app: Application = express();

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      process.env.FRONTEND_URL as string
    ].filter(Boolean),
    credentials: true,
  })
);

app.use(express.json());

app.get('/favicon.ico', (req: Request, res: Response) => {
  res.status(204).end();
});

// Auth Routes
app.use('/api/auth/', authRouter);
app.all('/api/auth/{*any}', toNodeHandler(auth));

// Provider-Profile Routes
app.use('/api/providers', providerProfileRouter)

// Meal Routes
app.use('/api/meals', mealRouter);

// Category Routes
app.use('/api/categories', categoryRouter)

// Address Routes
app.use('/api/addresses', addressRouter);

// Order Routes
app.use('/api/orders', orderRouter)

// Provider Routes
app.use('/api/provider', providerRouter)

// Admin Routes
app.use('/api/admin', adminRouter)

app.get("/", (req: Request, res: Response) => {
  res.status(200).send("Hello there!");
})

app.use(errorHandler);

export default app;