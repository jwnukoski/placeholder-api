# Placeholder API   
A free API for developers to get random placeholder data.

## Production Setup
1. Copy .env.example to .env and change variables as needed.
2. Build and start the Docker containers:
``` bash
docker compose up -d
```

## Testing
The easiest way to run the unit tests is with [Bun](https://bun.sh/) and [Docker](https://www.docker.com/).  

1. Create development services:
```bash
docker compose -f docker-compose-dev.yml up -d
```  
1. Run units tests with Bun:
```bash
NODE_ENV=development bun test -t api
```

While this process can be improved, this will prevent you from hitting rate limits and keep services seperate.  
Note: This processes currently uses several insecure defaults and ports.

## Swagger Docs
Swagger documentation is defined in comments above each function in ./api.  
The docs container hosts these files.  