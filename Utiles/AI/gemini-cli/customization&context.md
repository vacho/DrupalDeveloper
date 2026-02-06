# Customization and context

gemini.md file defines how the model interprete the project.
- Technologies.
- Conventions.
- Guidelines apply to assist.

This file is automatically loaded and merge into gemini context


Initialize
```bash
# This generates a GEMINI.md
\init
```

Add files that contains contex
~/.gemini/settings.json
```yml
"Context": {
    "fileName": ["AGENTS.md", "CONTEXT.md", "GEMINI.md"]
}
```


Context 
```bash
# Show the files that the AI have into the context.
/memory list
# Show the content that the AI knows.
/memory show
# Add content to the context
/memory add Use only functions

```

## References
- A example of context in a explain mode
https://gist.github.com/philschmid/64ed5dd32ce741b0f97f00e9abfa2a30

- A example of context in a plan mode
https://gist.github.com/philschmid/379cf06d9d18a1ed67ff360118a575e5
