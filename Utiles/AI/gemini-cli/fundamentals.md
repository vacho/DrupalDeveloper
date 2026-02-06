# Gemini cli
The tool to manage a cli/terminal.

Why Gemini CLI
- Free tier: 60 req/min 1000 req/day with google account.
- Powerful Gemini 2.5 Pro: Access to 1 M token context window.
- Open source.

Common use cases
- Manage files: copy, list, delete, order, identify the content(including images), rename.
- Generate basic images.
- Generate content: spreadsheeds, documents, etc.
- Generate the code for apps.

Configuration File:
~/.gemini/settings.json
```yml
# Add this to let checkpoint automatically
"general": {
    "checkpointing": {
        "enabled": true
    }
}
# Add this to let load context.
"Context": {
    "fileName": ["AGENTS.md", "CONTEXT.md", "GEMINI.md"]
}
```

## References
- Oficial documentation
https://geminicli.com/docs/

- Samples
https://github.com/philschmid/gemini-samples


