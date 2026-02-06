# Commands

## From bash
```bash
# Install
npm install @google/gemini-cli

# Update
npm update -g @google/gemini-cli

# run as a headless
gemini -p "Can you show a resume for gemini.md"

# Run a specific model
gemini -m gemini-2.5.glash

# Start interactive session
gemini
# Type ! to shell mode
!
# Type ESC to out the shell mode

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

## Custom commands
- Place to global commands: `~/.gemini/commands/`
- Place to project commands: `<your-project-root>/.gemini/commands/`
- `~/.gemini/commands/test.toml` becomes the command `/test`
- `<project>/.gemini/commands/git/commit.toml` becomes the namespaced command `/git:commit`

### Basic command
```bash
vim ~/.gemini/commands/bug/fix.toml
```
```bash
# Invoked via: /bug:fix "Button is misaligned"
description = "Generates a fix for a given issue."
prompt = "Please provide a code fix for the issue described here: {{args}}."
```

### Calling an executable command
```bash
vim ~/.gemini/commands/bug/fix.toml
```
````bash
# Invoked via: /commit:message "Fixing..."
description = "Conventional commit form staged changes."
prompt = """
Please generate a conventional commit message based on the following git diff:

```diff
!{git diff --staged}
```
"""
````

### Injecting file content
```bash
vim <project>/.gemini/commands/review.toml
```

````bash
# In: <project>/.gemini/commands/review.toml
# Invoked via: /review FileCommandLoader.ts

description = "Reviews the provided context using a best practice guide."
prompt = """
You are an expert code reviewer.
Your task is to review {{args}}.
Use the following best practices when providing your review:

@{docs/best-practices.md}
"""
````

## References
- Custom commands
https://geminicli.com/docs/cli/custom-commands/

