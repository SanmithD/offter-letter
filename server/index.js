import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import "dotenv/config";
import express from "express";
import rateLimit from "express-rate-limit";
import { agent } from "./src/config/agent.config.js";
import { dbConnect } from "./src/config/db.config.js";
import { authorized } from "./src/middleware/auth.middleware.js";
import applyRouter from "./src/routes/apply.route.js";
import jobRouter from "./src/routes/job.route.js";
import userRouter from "./src/routes/user.route.js";
import { errorFunction } from "./src/utils/error.util.js";
import { systemInstructions } from "./src/utils/system.instructions.js";

const app = express();
const PORT = process.env.PORT || 3000;
dbConnect();

app.use(
  cors({
    // origin: process.env.NODE_ENV === 'production' ? process.env.CLIENT_URL : [process.env.CLIENT_URL, "http://localhost:5173/"].filter(Boolean),
    origin: "http://localhost:5173",
    methods: ["GET", "PUT", "POST", "DELETE", "PATCH"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many request, Please try again after 15 minutes",
});

app.use(limiter);

app.use("/api/auth", userRouter);
app.use("/api/jobs", jobRouter);
app.use("/api/apply", applyRouter);

app.post("/api/agent", authorized, async (req, res) => {
  try {
    const userMsg = req.body.msg;
    const userId = req.user._id;

    if (!userMsg) {
      return errorFunction(400, false, "Message is required", res);
    }
    
    const systemMessage = systemInstructions(userId);
    const result = await agent.invoke(
      {
        messages: [
          { role: "system", content: systemMessage },
          { role: "user", content: userMsg },
        ],
      },
      { returnIntermediateStep: true }
    );

    const finalAIMessage = result.messages.find(
      (msg) => msg.constructor.name === "AIMessage" && !msg.tool_calls?.length
    );

    const toolMessages = result.messages.filter(
      (msg) => msg.constructor.name === "ToolMessage"
    );

    let jobs = [];
    for (const toolMessage of toolMessages) {
      if (toolMessage?.content) {        
        try {
          if (/^[{\[]/.test(toolMessage.content.trim())) {
            const parsed = JSON.parse(toolMessage.content);
            
            if (parsed.result && Array.isArray(parsed.result)) {
              jobs = jobs.concat(parsed.result);
            } else if (Array.isArray(parsed)) {
              jobs = jobs.concat(parsed);
            }
          }
        } catch (error) {
          console.warn("Failed to parse toolMessage content:", error.message);
          console.warn("Content:", toolMessage.content.substring(0, 200));
        }
      }
    }

    if (jobs.length > 0) {
      const uniqueJobs = jobs.filter((job, index, self) => 
        index === self.findIndex(j => j._id?.toString() === job._id?.toString())
      );
      jobs = uniqueJobs;
    }

    const response = {
      success: true,
      message: finalAIMessage?.content || "No summary response generated.",
      jobs,
      debug: {
        totalMessages: result.messages.length,
        toolMessagesCount: toolMessages.length,
        finalMessageExists: !!finalAIMessage,
        jobsExtracted: jobs.length
      }
    };

    res.json(response);
  } catch (error) {
    console.log("Agent error:", error);
    return errorFunction(500, false, "Server error", res);
  }
});

app.listen(PORT, () => {
  console.log(`server running on http://localhost:${PORT}`);
});
