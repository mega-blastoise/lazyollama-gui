# TODO [3 - 16 - 2025]

Let's wrap up core API functionality today.

- ollama/clients
  - OllamaClient
    - Looking okay, clean up work and fix unit tests.
  - RPCController
    - Move to ollama/clients (Think about changing name to ollama/models)
    - Make more abstract, look at claude.ai chat
    - Set up Unit tests
    - Export common types

- What flows do we need to support?
-
- - Querying the remote model registry
- - Pulling a model into memory from the remote model registry
- - Starting a model
- - Stopping a model
- - Unloading a model
- - Prompting a model
- - Getting usage insights into memory and space usage of a model
- - Get a state of all local models

Unit tests for all of the above + API Documentation
