# The Count of Money

## Docker Commands
- Execute the commands at the root of the project ( T-POO-700-WEB-NCY_1 )

### Start the Application
```bash
docker compose -f docker-compose.yaml up
```

### Stop the Application
```bash
docker compose -f docker-compose.yaml down
```

### Force Application Rebuilding ( without cache )
```bash
docker compose -f docker-compose.yaml build --no-cache
```

### Basic Command
```bash
docker compose -f docker-compose.yaml <command> <dockername>
```

#### Useful Commands
- `up` : Create the application
- `down` : Down the application
- `build` : Build the application
- `start` : Start the application
- `stop` : Stop the application
- `restart` : Restart the application
- `exec` : Execute a command in the container