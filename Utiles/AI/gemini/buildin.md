# Build-in commands

To init a gemini project with context information.
```bash
# Analize your project and init and md file with context to the model
/init

# Show all the markdown files that have context for the project
/memory list

# Show the context info
/memory

# update the memory knowledge
/memory refresh

# Compress the context in a summary
/compress
```

General commands
```bash
# Theming
/theme

# Change the configurations
/settings

# View stats of the models ussage
/stats

# Clear chat
/clear

# Copy the last result
/copy

# Save conversations
/chat list
/chat save chat_1
/chat resume chat_1
/chat delete chat_1
/chat share chat_1

# Execute command instantly
!
```

Directories
```bash
# Add another directories to gemini scope
gemini --include-directories ../

# Directories scope
/directory show

# Add directories
/directory add ../
```

Snapshots
```bash
# Create snapshots of the project that can be restored.
gemini --checkpoints

# Can move the files state between checkpoints
/restore
```

Tools
```bash
# List tools
/tools
# Use banana to generate pictures
/generate a picture of water
```

Extensions
```bash
# List extensions
/extensions

```