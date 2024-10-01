

### Docker Compose

---

# Docker Compose - Habit Tracker Application

## Running Both Services Together

To run both the backend and frontend services together using Docker Compose:

1. **Build and Start Containers:**

   ```bash
   docker-compose up --build
   ```

2. **Access Services:**

   - **Frontend:** `http://localhost:3000`
   - **Backend:** `http://localhost:8000`

## Cleaning Up

To stop and remove containers:

```bash
docker-compose down
```

---