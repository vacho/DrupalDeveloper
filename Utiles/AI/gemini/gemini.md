# Gemini cli
The tool to manage a cli/terminal.

Why Gemini CLI
- Free tier: 60 req/min 1000 req/day with google account.
- Powerful Gemini 2.5 Pro: Access to 1 M token context window.
- Open source.

Configuration File:
~/.gemini/settings.json
```yml
# Add this to let checkpoint automatically
"general": {
    "checkpointing": {
        "enabled": true
    }
}
```

## Commands
From bash
```bash
# Install
npm install @google/gemini-cli

# run as a headless
gemini -p "Can you show a resume for gemini.md"

# Run a specific model
gemini -m gemini-2.5.glash

# Start interactive session
gemini

# Let to excecute all commands without asking (create, edit file, excecute scripts)
gemini --yolo
gemini --approval-mode yolo
# Ask each time for permission
gemini --approval-mode default
# Let cread or edit filesd without asking
gemini --approval-mode autoedit

# Let shell command to run
gemini --allowed-tools="ShellTool"
gemini --allowed-tools="run_shell_command(git)"

# Specify the output format
gemini --output-format json "List the 3 mayor salers of microchips in the world"

# Advance monitoring
gemini --telemetry


```
From GUI
```bash
```

## References
- Oficial documentation
https://geminicli.com/docs/
