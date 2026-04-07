import { initializeTerminalInputHandlers }  from "./terminal/terminalInput.js";
import { initializeTerminalWriter }         from "./terminal/terminalWriter.js";
import { initializeFilesystem }             from "./filesystem/filesystem.js";

initializeTerminalInputHandlers();
initializeTerminalWriter();
await initializeFilesystem();

