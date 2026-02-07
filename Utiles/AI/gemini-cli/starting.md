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

## Configuration File:
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
## Tools
Nanobanana
```bash
# Install
gemini extensions install https://github.com/gemini-cli-extensions/nanobanana

# List
gemini extensions list

export NANOBANANA_GEMINI_API_KEY=somekey


gemini
/nanobanana create a white t-shirt, front view. 
```

## References
- Oficial documentation
https://geminicli.com/docs/

- Samples
https://github.com/philschmid/gemini-samples

- Extensions
https://geminicli.com/extensions/


