import { initializeTerminalInputHandlers }  from "./terminal/terminalInput.js";
import { initializeTerminalWriter }         from "./terminal/terminalWriter.js";
import { initializeFilesystem }             from "./filesystem/filesystem.js";
import { terminalReady }                    from "./terminal/terminalReady.js";

initializeTerminalInputHandlers();
initializeTerminalWriter();
await initializeFilesystem();
terminalReady();

