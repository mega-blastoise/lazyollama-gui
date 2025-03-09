# LazyOllama

![LazyOllama Logo](https://via.placeholder.com/150x150)

A Docker-based solution for easily managing Ollama models through a simple web interface.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> This project is not affiliated with, endorsed, or maintained by the Ollama team.

## Table of Contents

- [LazyOllama](#lazyollama)
  - [Table of Contents](#table-of-contents)
  - [Background](#background)
  - [Motivation](#motivation)
  - [Features](#features)
  - [Installation](#installation)
    - [Prerequisites](#prerequisites)
      - [Docker](#docker)
      - [Hardware Requirements](#hardware-requirements)
    - [Quick Start](#quick-start)
  - [Usage](#usage)
    - [Web Interface](#web-interface)
    - [API](#api)
      - [Load a model](#load-a-model)
      - [Unload a model](#unload-a-model)
      - [List running models](#list-running-models)
  - [Architecture](#architecture)
  - [Contributing](#contributing)
  - [License](#license)
  - [Opinions _(These are ours, if you like them, take them with you. If you don't, then you've equally grown, just in the other direction.)_](#opinions-these-are-ours-if-you-like-them-take-them-with-you-if-you-dont-then-youve-equally-grown-just-in-the-other-direction)

## Background

LazyOllama simplifies the management of Ollama models by providing a containerized environment with an intuitive web interface and a powerful API. It allows you to spin up and shut down models on demand, saving system resources when models aren't actively being used.

## Motivation

1. Run models locally on your own hardware instead of paying for tokens
2. Easily manage multiple Ollama models through a user-friendly interface
3. Control resource usage by spinning down models when not in use
4. Streamline the deployment process with Docker

## Features

- 🐳 Docker-based deployment for easy setup
- 🚀 Built with Bun for optimal performance
- 💻 React-based web interface for model management
- 🔄 RPC pattern for efficient API communication
- 📊 Model usage statistics and monitoring
- 🔌 On-demand model loading and unloading

## Installation

### Prerequisites

#### Docker

You can check if you have Docker installed by running the following command:

```bash
docker --version
```

Expected output:

```
Docker version 28.0.1, build 068a01e
```

You can check if Docker is running with:

```bash
docker ps
```

If you don't have Docker installed, [follow the instructions for installing Docker Desktop](https://docs.docker.com/desktop/).

#### Hardware Requirements

- **CPU**: 4+ cores recommended
- **RAM**: 8GB minimum, 16GB+ recommended for larger models
- **Storage**: 10GB+ free space for models
- **GPU**: Optional but recommended for better performance

### Quick Start

1. Clone the repository:

```bash
git clone https://github.com/yourusername/lazy-ollama.git
cd lazy-ollama
```

2. Start the containers:

```bash
docker-compose up -d
```

3. Access the web interface at [http://localhost:3000](http://localhost:3000)

## Usage

### Web Interface

The web interface provides a simple dashboard for:

- Viewing available models
- Starting and stopping models
- Monitoring resource usage
- Configuring model parameters
- Testing model responses

![Dashboard Screenshot](https://via.placeholder.com/800x450)

### API

LazyOllama provides a RESTful API for programmatically managing your models:

#### Load a model

```bash
curl -X POST http://localhost:8000/api/models/load \
  -H "Content-Type: application/json" \
  -d '{"model": "llama2"}'
```

#### Unload a model

```bash
curl -X POST http://localhost:8000/api/models/unload \
  -H "Content-Type: application/json" \
  -d '{"model": "llama2"}'
```

#### List running models

```bash
curl http://localhost:8000/api/models
```

See the [API documentation](docs/api.md) for more details.

## Architecture

LazyOllama consists of three main components:

1. **Ollama Container**: Runs the Ollama service which manages the actual models
2. **API Server**: A Bun-based server that communicates with Ollama using RPC patterns
3. **Web Interface**: A React application for user-friendly model management

```
┌─────────────────┐      ┌─────────────────┐      ┌─────────────────┐
│                 │      │                 │      │                 │
│  Web Interface  │◄────►│   API Server    │◄────►│ Ollama Service  │
│    (React)      │      │     (Bun)       │      │   (Docker)      │
│                 │      │                 │      │                 │
└─────────────────┘      └─────────────────┘      └─────────────────┘
```

## Contributing

We welcome contributions to LazyOllama! Please see our [Contributing Guide](CONTRIBUTING.md) for more details.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Opinions _(These are ours, if you like them, take them with you. If you don't, then you've equally grown, just in the other direction.)_

1. This project does not use a linter like eslint. When I was younger, and more venerable, I would have launched into a rant about how linting in the js ecosystem specifically is an anti DX construct, that maintain the effect of slowing down the competent javascript developer. I still hold that opinion, but I'm older and tired, so no rant.  
2. You only need to know about 5% of something to get started.  
