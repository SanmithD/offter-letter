import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import "dotenv/config";
import express from "express";
import { agent } from "./src/config/agent.config.js";
import { dbConnect } from "./src/config/db.config.js";
import { authorized } from "./src/middleware/auth.middleware.js";
import jobRouter from "./src/routes/job.route.js";
import userRouter from "./src/routes/user.route.js";
import { errorFunction } from "./src/utils/error.util.js";

const app = express();
const PORT = process.env.PORT || 3000;
dbConnect();

app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", userRouter);
app.use("/api/job", jobRouter);

app.post("/api/agent", authorized, async (req, res) => {
  try {
    const userMsg = req.body.msg;
    const userId = req.user._id;

    if (!userMsg) {
      return errorFunction(400, false, "Message is required", res);
    }
    const systemMessage = `You are a helpful job search assistant. You can help users find jobs based on their skills, salary requirements, or general search criteria. The current user ID is ${userId}. When using the search_by_skill tool, always use this user ID.

        IMPORTANT: After calling any tool and getting results, you MUST provide a conversational response that summarizes and presents the results to the user in a friendly, readable format. Always end with a complete response, don't just call tools without explaining the results.`;

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

    const toolMessage = result.messages.find(
      (msg) => msg.constructor.name === "ToolMessage"
    );

    let jobs = [];
    if (toolMessage?.content) {
      try {
        const parsed = JSON.parse(toolMessage.content);
        jobs = parsed.result || [];
      } catch (err) {
        console.warn("Failed to parse toolMessage content:", err.message);
      }
    }

    res.json({
      success: true,
      message: finalAIMessage?.content || "No summary response generated.",
      jobs,
    });
  } catch (error) {
    console.log("Agent error:", error);
    return errorFunction(500, false, "Server error", res);
  }
});

app.listen(PORT, () => {
  console.log(`server running on http://localhost:${PORT}`);
});
