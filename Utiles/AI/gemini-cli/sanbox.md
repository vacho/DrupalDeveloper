# Sandbox
When enabled, the CLI runs in an isolated environment using a pre-built Docker or Podman image (or macOS Seatbelt on Apple systems). This ensures:
- Security: Prevents the AI from accidentally damaging the host system.
- Isolation: Limits file system access, typically only allowing writes within the project directory.
- Consistency: Provides a reproducible environment for running commands. 

## Ways to run
By command line
```bash
gemini --sandbox -p "analyze the code structure"
```
By ~/.gemini/settings.json file
```bash
"tools": {
    "sandbox": true
}
```
