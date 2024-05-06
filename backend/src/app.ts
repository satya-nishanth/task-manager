import Express, { json } from 'express';
import cors from 'cors';
import cookieSession from 'cookie-session';
import userRouter from 'route/user'
import taskRouter from 'route/task';
import path from "path";

const buildPath = path.join(__dirname,'..','..','frontend','build')

const app = Express();
app.use(Express.static(path.join(__dirname,'..','..','frontend','build')));
app.use(json());
app.use(cors());
app.use(
  cookieSession({
    signed: false,
  })
);
app.use("/user", userRouter)
app.use('/task', taskRouter);
app.get('*', (_, res) => {
    res.sendFile(`${buildPath}/index.html`)
})

export default app;
