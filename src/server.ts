import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import os from "os";
import morgan from "morgan";
import indexRoutes from "./routes/indexRoutes";
import authRoutes from "./routes/authRoutes";
import verifyToken from "./middileware/authMiddileware";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use('/' ,indexRoutes)
app.use('/auth', authRoutes)

// Get local network IP dynamically
function getLocalIP(): string {
  const interfaces = os.networkInterfaces();
  for (const interfaceName in interfaces) {
    const networkInterfaces = interfaces[interfaceName];
    if (networkInterfaces) {
      for (const net of networkInterfaces) {
        if (net.family === "IPv4" && !net.internal) {
          return net.address; // Return the first non-internal IPv4 address
        }
      }
    }
  }
  return "localhost"; // Fallback to localhost
}

// Explicitly cast PORT to a number
const PORT: number = parseInt(process.env.PORT || "5000", 10);

// Start server and log dynamically detected URL
app.listen(PORT, () => {
  const localIP = getLocalIP();
  console.log(`🚀 Server running at:`);
  console.log(`   - Local:   http://localhost:${PORT}`);
  console.log(`   - Network: http://${localIP}:${PORT}`);
});

export default app;